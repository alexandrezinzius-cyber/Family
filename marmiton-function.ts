// Fonction Supabase "marmiton" : propose une recette (ou un cocktail) de Marmiton avec sa note.
// À déployer dans Supabase > Edge Functions (nom exact : marmiton). Aucun secret nécessaire.
// Marmiton n'a pas d'API publique : la fonction lit les pages publiques (résultats de recherche puis fiche recette)
// et garde un lien vers la recette d'origine. Si Marmiton refuse l'accès, l'appli se rabat sur TheMealDB.

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...CORS, 'Content-Type': 'application/json' } });
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';
const BASE = 'https://www.marmiton.org';
const shuffle = <T,>(a: T[]) => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const page = async (url: string) => {
  let status = 0;
  try {
    const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: 'text/html,application/xhtml+xml', 'Accept-Language': 'fr-FR,fr;q=0.9' }, redirect: 'follow' });
    status = r.status;
    if (r.ok) { const t = await r.text(); if (t.length > 2000) return t; }
  } catch (_) { /* repli ci-dessous */ }
  // repli : lecteur de pages public (autre adresse IP), renvoie le HTML d'origine
  const j = await fetch('https://r.jina.ai/' + url, { headers: { 'X-Return-Format': 'html', Accept: 'text/html' } });
  if (!j.ok) throw new Error(`Marmiton a refusé l'accès (direct ${status || 'erreur'}, relais ${j.status})`);
  return j.text();
};
const dec = (s: string) => String(s ?? '').replace(/&#(\d+);/g, (_, n) => String.fromCharCode(+n)).replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
  .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ').replace(/\s+\n/g, '\n').trim();

function jsonLd(html: string): any[] {
  const out: any[] = [];
  for (const m of html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)) {
    try { const d = JSON.parse(m[1]); const walk = (x: any) => { if (Array.isArray(x)) x.forEach(walk); else if (x && typeof x === 'object') { out.push(x); if (x['@graph']) walk(x['@graph']); } }; walk(d); } catch (_) { /* ignore */ }
  }
  return out;
}
const isRecipe = (n: any) => [].concat(n?.['@type'] || []).includes('Recipe' as never);
const img = (i: any): string | null => (!i ? null : typeof i === 'string' ? i : Array.isArray(i) ? img(i[0]) : i.url || null);
function steps(r: any): string {
  const walk = (x: any): string[] => Array.isArray(x) ? x.flatMap(walk) : typeof x === 'string' ? [dec(x)] : x?.itemListElement ? walk(x.itemListElement) : x?.text ? [dec(x.text)] : [];
  return walk(r.recipeInstructions).filter(Boolean).join('\n');
}

// commentaires des internautes : d'abord le balisage JSON-LD (review), sinon les blocs « avis » de la page
function reviewsOf(r: any, html: string) {
  const out: { author: string; rating: number | null; text: string; date: string }[] = [];
  for (const v of (Array.isArray(r.review) ? r.review : r.review ? [r.review] : []) as any[]) {
    const text = dec(v?.reviewBody || v?.description || '');
    if (text) out.push({ author: dec(v?.author?.name || v?.author || ''), rating: Number(v?.reviewRating?.ratingValue) || null, text, date: String(v?.datePublished || '').slice(0, 10) });
  }
  if (!out.length) {
    for (const m of html.matchAll(/<(?:div|p|span)[^>]+class=["'][^"']*(?:review|comment|avis)[^"']*(?:content|text|body)[^"']*["'][^>]*>([\s\S]*?)<\/(?:div|p|span)>/gi)) {
      const text = dec(m[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '));
      if (text.length > 25 && !out.some(o => o.text === text)) out.push({ author: '', rating: null, text, date: '' });
      if (out.length >= 8) break;
    }
  }
  return out.slice(0, 8);
}

async function fetchRecipe(url: string) {
  const html = await page(url);
  const r = jsonLd(html).find(isRecipe);
  if (!r) throw new Error('fiche illisible');
  const ar = r.aggregateRating || {};
  const rating = Number(ar.ratingValue); const count = Number(ar.ratingCount || ar.reviewCount || 0);
  return {
    kind: 'recipe', title: dec(r.name), category: 'Marmiton', area: dec([].concat(r.recipeCategory || []).join(' · ')),
    ingredients: (r.recipeIngredient || []).map(dec).join('\n'), instructions: steps(r), photo_url: img(r.image),
    source_url: url, id: url, lang: 'fr', source: 'Marmiton', reviews: reviewsOf(r, html), rating: Number.isFinite(rating) && rating > 0 ? Math.round(rating * 10) / 10 : null, ratingCount: count || null,
  };
}

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  try {
    const { q, type, exclude = [], minRating = 4, mode } = await req.json();
    if (!q) return json({ error: 'requête vide' }, 400);
    if (mode === 'search') { // recherche libre : jusqu'à 8 fiches avec note et commentaires
      const html = await page(`${BASE}/recettes/recherche.aspx?aqt=${encodeURIComponent(q)}${type ? '&type=' + encodeURIComponent(type) : ''}`);
      const links = [...new Set([...html.matchAll(/href=["'](\/recettes\/recette_[a-z0-9\-]+_\d+\.aspx)["']/gi)].map(m => BASE + m[1]))].slice(0, 8);
      if (!links.length) return json({ error: 'aucune recette trouvée' }, 404);
      const got = (await Promise.allSettled(links.map(fetchRecipe))).flatMap(r => (r.status === 'fulfilled' ? [r.value] : []));
      if (!got.length) return json({ error: 'fiches illisibles' }, 502);
      got.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
      return json({ results: got });
    }
    const run = async (withType: boolean) => {
      const html = await page(`${BASE}/recettes/recherche.aspx?aqt=${encodeURIComponent(q)}${withType && type ? '&type=' + encodeURIComponent(type) : ''}`);
      const links = [...new Set([...html.matchAll(/href=["'](\/recettes\/recette_[a-z0-9\-]+_\d+\.aspx)["']/gi)].map(m => BASE + m[1]))].filter(u => !exclude.includes(u));
      return links;
    };
    let links = await run(true); if (!links.length) links = await run(false);
    if (!links.length) return json({ error: 'aucune recette trouvée' }, 404);
    const cands = shuffle(links.slice(0, 14)).slice(0, 4);
    const got = (await Promise.allSettled(cands.map(fetchRecipe))).flatMap(r => (r.status === 'fulfilled' && r.value.ingredients ? [r.value] : []));
    if (!got.length) return json({ error: 'fiches illisibles' }, 502);
    got.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    return json({ idea: got.find(g => (g.rating ?? 0) >= minRating) || got[0] });
  } catch (e) { return json({ error: String((e as Error).message || e) }, 502); }
});
