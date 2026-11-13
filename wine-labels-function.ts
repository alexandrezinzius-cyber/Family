// Fonction Supabase "wine-labels" : récupère gratuitement l'image d'étiquette d'une bouteille
// à partir de sa page Vivino (ou d'une recherche Vivino). Aucun secret, aucune clé requise.
// À déployer dans Supabase > Edge Functions (nom exact : wine-labels). Décocher « Verify JWT » n'est pas nécessaire.

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...CORS, 'Content-Type': 'application/json' } });
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';
const okHost = (u: URL) => /(^|\.)vivino\.com$/.test(u.hostname);

async function get(url: string, accept = 'text/html') {
  const r = await fetch(url, { headers: { 'User-Agent': UA, Accept: accept, 'Accept-Language': 'fr-FR,fr;q=0.9' }, redirect: 'follow' });
  return r;
}
const abs = (u: string) => (u.startsWith('//') ? 'https:' + u : u);

function imageFromHtml(html: string): string | null {
  const og = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
  if (og) return abs(og[1].replace(/&amp;/g, '&'));
  const lbl = html.match(/(?:\/\/|https:\/\/)thumbs\.vivino\.com\/[^"'\s)]+\.(?:png|jpe?g|webp)/i) || html.match(/(?:\/\/|https:\/\/)images\.vivino\.com\/[^"'\s)]+\.(?:png|jpe?g|webp)/i);
  return lbl ? abs(lbl[0]) : null;
}

async function findPage(query: string): Promise<string | null> {
  const r = await get('https://www.vivino.com/search/wines?q=' + encodeURIComponent(query));
  if (!r.ok) return null;
  const m = (await r.text()).match(/href=["'](\/(?:[a-z]{2}\/)?[^"']*\/w\/\d+[^"']*)["']/i);
  return m ? 'https://www.vivino.com' + m[1] : null;
}

async function labelFor(b: { id: string; url?: string; query?: string }) {
  try {
    let page = b.url || '';
    if (page) { const u = new URL(page); if (!okHost(u)) return { id: b.id, ok: false, error: 'lien non Vivino' }; }
    else if (b.query) page = (await findPage(b.query)) || '';
    if (!page) return { id: b.id, ok: false, error: 'bouteille introuvable sur Vivino' };

    let img: string | null = null, why = '';
    const r = await get(page);
    if (r.ok) img = imageFromHtml(await r.text()); else why = 'Vivino a répondu ' + r.status;
    if (!img) { // repli : lecteur de pages public gratuit
      try { const j = await get('https://r.jina.ai/' + page, 'text/plain'); if (j.ok) { const t = await j.text(); const m = t.match(/https?:\/\/(?:thumbs|images)\.vivino\.com\/[^\s)"']+\.(?:png|jpe?g|webp)/i); if (m) img = m[0]; } } catch (_) { /* ignore */ }
    }
    if (!img) return { id: b.id, ok: false, error: why || 'aucune étiquette trouvée' };
    const u = new URL(img);
    if (!okHost(u)) return { id: b.id, ok: false, error: 'image hors Vivino' };
    const ir = await get(img, 'image/*');
    if (!ir.ok) return { id: b.id, ok: false, error: 'image indisponible (' + ir.status + ')' };
    const mime = (ir.headers.get('content-type') || 'image/jpeg').split(';')[0];
    if (!/^image\//.test(mime)) return { id: b.id, ok: false, error: 'réponse non image' };
    const buf = new Uint8Array(await ir.arrayBuffer());
    if (buf.length > 3_000_000) return { id: b.id, ok: false, error: 'image trop lourde' };
    let bin = ''; for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
    return { id: b.id, ok: true, mime, data: btoa(bin) };
  } catch (e) { return { id: b.id, ok: false, error: String((e as Error).message || e).slice(0, 120) }; }
}

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  try {
    const { bottles } = await req.json();
    if (!Array.isArray(bottles) || !bottles.length) return json({ error: 'aucune bouteille' }, 400);
    const results = [];
    for (const b of bottles.slice(0, 4)) results.push(await labelFor(b));
    return json({ results });
  } catch (e) { return json({ error: String((e as Error).message || e) }, 400); }
});
