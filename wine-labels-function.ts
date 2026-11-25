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

// ---- prix : lit le prix affiché sur la page Vivino de la bouteille (gratuit, sans clé)
const plausible = (n: number) => Number.isFinite(n) && n >= 2 && n <= 20000;
function priceFromHtml(html: string): number | null {
  const pats: RegExp[] = [
    /"lowPrice"\s*:\s*"?(\d+(?:[.,]\d+)?)/, /"price"\s*:\s*\{[^}]*?"amount"\s*:\s*(\d+(?:\.\d+)?)/, /"amount"\s*:\s*(\d+(?:\.\d+)?)\s*,\s*"currency"/,
    /"price"\s*:\s*"?(\d+(?:[.,]\d+)?)"?\s*,\s*"priceCurrency"/, /"priceCurrency"[^}]{0,40}"price"\s*:\s*"?(\d+(?:[.,]\d+)?)/,
    /property=["']product:price:amount["'][^>]+content=["'](\d+(?:[.,]\d+)?)/i, /"price"\s*:\s*(\d+(?:\.\d+)?)/,
  ];
  for (const re of pats) { const m = html.match(re); if (m) { const n = parseFloat(m[1].replace(',', '.')); if (plausible(n)) return Math.round(n * 100) / 100; } }
  const t = html.match(/(\d{1,4}(?:[.,]\d{1,2})?)\s?€|€\s?(\d{1,4}(?:[.,]\d{1,2})?)/);
  if (t) { const n = parseFloat((t[1] || t[2]).replace(',', '.')); if (plausible(n)) return Math.round(n * 100) / 100; }
  return null;
}
// ---- Wine-Searcher (2e source) : page de recherche « find/<mots>/<millésime> », prix moyen affiché (devise convertie en euros)
const FX: Record<string, number> = { EUR: 1, USD: 0.93, GBP: 1.17, CHF: 1.06 };
function wsPrice(html: string): number | null {
  let cur = 'EUR'; const c = html.match(/"priceCurrency"\s*:\s*"([A-Z]{3})"/) || html.match(/Avg Price[^<]{0,80}?(USD|EUR|GBP|CHF|\$|€|£)/i);
  if (c) cur = ({ '$': 'USD', '€': 'EUR', '£': 'GBP' } as Record<string, string>)[c[1]] || c[1].toUpperCase();
  const pats: RegExp[] = [/Avg Price[^0-9]{0,200}?(\d[\d.,]*)/i, /Prix moyen[^0-9]{0,200}?(\d[\d.,]*)/i, /"lowPrice"\s*:\s*"?(\d+(?:\.\d+)?)/, /"price"\s*:\s*"?(\d+(?:\.\d+)?)"?/];
  for (const re of pats) { const m = html.match(re); if (m) { const n = parseFloat(m[1].replace(/,(?=\d{3}\b)/g, '').replace(',', '.')); if (plausible(n)) return Math.round(n * (FX[cur] || 1) * 100) / 100; } }
  return null;
}
async function wineSearcherPrice(query: string, vintage?: string) {
  const words = query.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').trim().split(/\s+/).filter(Boolean).slice(0, 8).join('+');
  if (!words) return null;
  const page = 'https://www.wine-searcher.com/find/' + words + (vintage ? '/' + vintage : '') + '/france';
  let price: number | null = null;
  try { const r = await get(page + '?Xcurrencycode=EUR'); if (r.ok) price = wsPrice(await r.text()); } catch (_) { /* ignore */ }
  if (price === null) { try { const j = await get('https://r.jina.ai/' + page, 'text/plain'); if (j.ok) price = wsPrice(await j.text()); } catch (_) { /* ignore */ } }
  return price === null ? null : { price, page };
}
async function priceFor(b: { key: string; url?: string; query?: string; name?: string; vintage?: string }) {
  let vivErr = '', vivPage = '';
  try {
    let pageUrl = b.url || '';
    if (pageUrl) { const u = new URL(pageUrl); if (!okHost(u)) pageUrl = ''; }
    if (!pageUrl && b.query) pageUrl = (await findPage(b.query)) || '';
    if (pageUrl) {
      vivPage = pageUrl; let price: number | null = null;
      const r = await get(pageUrl);
      if (r.ok) price = priceFromHtml(await r.text()); else vivErr = 'Vivino a répondu ' + r.status;
      if (price === null) { try { const j = await get('https://r.jina.ai/' + pageUrl, 'text/plain'); if (j.ok) price = priceFromHtml(await j.text()); } catch (_) { /* ignore */ } }
      if (price !== null) return { key: b.key, ok: true, price, source: 'Vivino', page: pageUrl };
      vivErr = vivErr || 'aucun prix affiché sur Vivino';
    } else vivErr = 'introuvable sur Vivino';
  } catch (e) { vivErr = String((e as Error).message || e).slice(0, 80); }
  try {
    const w = b.query ? await wineSearcherPrice(b.query.replace(/\b(19|20)\d{2}\b/g, '').trim(), b.vintage) : null;
    if (w) return { key: b.key, ok: true, price: w.price, source: 'Wine-Searcher', page: w.page };
  } catch (_) { /* ignore */ }
  return { key: b.key, ok: false, error: vivErr + ' ; Wine-Searcher : aucun prix', page: vivPage || undefined };
}

// Relais pour le tableau de bord (météo, radar) : utile aux vieux appareils (iPad iOS 9) qui n'acceptent plus les certificats d'Open-Meteo / RainViewer.
const PX = /^(api\.open-meteo\.com|geocoding-api\.open-meteo\.com|api\.rainviewer\.com)$/;
const TX = /^(tilecache\.rainviewer\.com|[a-d]\.basemaps\.cartocdn\.com)$/;
async function tileData(url: string) {
  const u = new URL(url); if (u.protocol !== 'https:' || !TX.test(u.hostname)) return null;
  const r = await fetch(u, { headers: { 'User-Agent': UA } }); if (!r.ok) return null;
  const buf = new Uint8Array(await r.arrayBuffer()); let bin = '';
  for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000));
  return 'data:' + (r.headers.get('content-type') || 'image/png') + ';base64,' + btoa(bin);
}

Deno.serve(async req => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  try {
    const body = await req.json();
    if (typeof body.proxy === 'string') {
      const u = new URL(body.proxy); if (u.protocol !== 'https:' || !PX.test(u.hostname)) return json({ error: 'hôte non autorisé' }, 400);
      const r = await fetch(u, { headers: { 'User-Agent': UA, Accept: 'application/json' } });
      return new Response(await r.text(), { status: r.status, headers: { ...CORS, 'Content-Type': 'application/json' } });
    }
    if (typeof body.ics === 'string') { // lecture d'un agenda iCal public (les agendas bloquent l'accès direct depuis un site)
      let u: URL; try { u = new URL(body.ics.replace(/^webcal:\/\//i, 'https://')); } catch { return json({ error: 'lien invalide' }, 400); }
      if (u.protocol !== 'https:' || /^(localhost|127\.|10\.|192\.168\.|169\.254\.|172\.(1[6-9]|2\d|3[01])\.|\[)/i.test(u.hostname) || !u.hostname.includes('.')) return json({ error: 'hôte non autorisé' }, 400);
      const r = await fetch(u, { headers: { 'User-Agent': UA, Accept: 'text/calendar,*/*' }, redirect: 'follow' });
      if (!r.ok) return json({ error: 'agenda inaccessible (' + r.status + ')' }, 200);
      const text = (await r.text()).slice(0, 3_000_000);
      if (!/BEGIN:VCALENDAR/.test(text)) return json({ error: 'ce lien ne renvoie pas un calendrier iCal' }, 200);
      return json({ text });
    }
    if (typeof body.resolve === 'string') { // suit la redirection d'un lien court Deezer
      const u = new URL(body.resolve); if (u.protocol !== 'https:' || !/^(link\.deezer\.com|deezer\.page\.link|(www\.)?deezer\.com)$/.test(u.hostname)) return json({ error: 'hôte non autorisé' }, 400);
      const r = await fetch(u, { headers: { 'User-Agent': UA }, redirect: 'follow' });
      let url = r.url; const m = (await r.text().catch(() => '')).match(/deezer\.com\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?(playlist|album|track)\/(\d+)/);
      if (!/deezer\.com\/(?:[a-z]{2}(?:-[a-z]{2})?\/)?(playlist|album|track)\/\d+/.test(url) && m) url = 'https://www.deezer.com/' + m[1] + '/' + m[2];
      return json({ url });
    }
    if (Array.isArray(body.tiles)) {
      const tiles = await Promise.all(body.tiles.slice(0, 20).map((u: string) => tileData(String(u)).catch(() => null)));
      return json({ tiles });
    }
    if (Array.isArray(body.prices)) {
      const results = [];
      for (const b of body.prices.slice(0, 4)) results.push(await priceFor(b));
      return json({ results });
    }
    const { bottles } = body;
    if (!Array.isArray(bottles) || !bottles.length) return json({ error: 'aucune bouteille' }, 400);
    const results = [];
    for (const b of bottles.slice(0, 4)) results.push(await labelFor(b));
    return json({ results });
  } catch (e) { return json({ error: String((e as Error).message || e) }, 400); }
});
