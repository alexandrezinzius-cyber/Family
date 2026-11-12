// Fonction Supabase "wine-prices" : lit le prix moyen d'une bouteille sur sa page Vivino.
// À déployer dans Supabase > Edge Functions (nom exact : wine-prices). Voir README.
// ATTENTION : lit des pages publiques de vivino.com ; Vivino peut changer sa page ou bloquer les requêtes.

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15';
const json = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { ...CORS, 'Content-Type': 'application/json' } });

type Found = { price: number; currency: string; how: string };

function fromJsonLd(html: string): Found | null {
  for (const m of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      const parsed = JSON.parse(m[1]);
      for (const o of Array.isArray(parsed) ? parsed : [parsed]) {
        const offers = o?.offers; if (!offers) continue;
        for (const of_ of Array.isArray(offers) ? offers : [offers]) {
          const p = parseFloat(of_.price ?? of_.lowPrice);
          if (p > 0) return { price: p, currency: of_.priceCurrency || 'EUR', how: 'json-ld' };
        }
      }
    } catch (_) { /* ignore */ }
  }
  return null;
}

function fromEmbedded(html: string): Found | null {
  const patterns: [RegExp, string][] = [
    [/"price"\s*:\s*\{[^{}]*?"amount"\s*:\s*([0-9]+(?:\.[0-9]+)?)[^{}]*?"currency"\s*:\s*\{[^{}]*?"code"\s*:\s*"([A-Z]{3})"/, 'price.amount'],
    [/"price"\s*:\s*\{[^{}]*?"amount"\s*:\s*([0-9]+(?:\.[0-9]+)?)/, 'price.amount'],
    [/"median"\s*:\s*\{[^{}]*?"amount"\s*:\s*([0-9]+(?:\.[0-9]+)?)/, 'median'],
    [/property="product:price:amount"\s+content="([0-9.]+)"/, 'meta'],
    [/"price"\s*:\s*([0-9]+(?:\.[0-9]+)?)\s*,\s*"(?:price)?[cC]urrency"\s*:\s*"([A-Z]{3})"/, 'price+currency'],
  ];
  for (const [re, how] of patterns) {
    const m = html.match(re);
    if (m && parseFloat(m[1]) > 0) return { price: parseFloat(m[1]), currency: m[2] || 'EUR', how };
  }
  return null;
}

async function lookup(url: string) {
  try {
    const u = new URL(url);
    if (!/(^|\.)vivino\.com$/.test(u.hostname)) return { url, ok: false, error: 'lien non Vivino' };
    const ctrl = new AbortController(); const t = setTimeout(() => ctrl.abort(), 9000);
    const r = await fetch(u.toString(), { headers: { 'User-Agent': UA, 'Accept-Language': 'fr-FR,fr;q=0.9', Accept: 'text/html' }, redirect: 'follow', signal: ctrl.signal });
    clearTimeout(t);
    if (!r.ok) return { url, ok: false, error: `HTTP ${r.status}` };
    const html = await r.text();
    const found = fromJsonLd(html) || fromEmbedded(html);
    if (!found) return { url, ok: false, error: 'prix introuvable sur la page' };
    return { url, ok: true, price: Math.round(found.price * 100) / 100, currency: found.currency, how: found.how };
  } catch (e) { return { url, ok: false, error: String((e as Error).message || e) }; }
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  let body: { urls?: string[] };
  try { body = await req.json(); } catch (_) { return json({ error: 'JSON invalide' }, 400); }
  const urls = [...new Set(body.urls || [])].slice(0, 10);
  const results = [];
  for (const u of urls) { results.push(await lookup(u)); await new Promise((r) => setTimeout(r, 400)); } // une requête à la fois, poliment
  return json({ results });
});
