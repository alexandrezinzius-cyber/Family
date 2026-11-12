// Couche de données : Supabase + synchronisation temps réel entre appareils
export const TABLES = ['cellar_items', 'recipes', 'meal_plans', 'shopping_items', 'family_events', 'playlists', 'family_notes'];
const CACHE_KEY = 'family-cache-v3';

export const store = {
  sb: null, user: null, familyId: null,
  t: Object.fromEntries(TABLES.map(k => [k, []])),
  sync: 'offline', // offline | connecting | live
};

const listeners = new Set();
export const onChange = fn => { listeners.add(fn); return () => listeners.delete(fn); };
const emit = table => listeners.forEach(f => f(table));
const setSync = s => { store.sync = s; emit('_sync'); };

// ---- configuration & client ----
export function createClientFromConfig() {
  const cfg = window.APP_CONFIG || {};
  const url = cfg.SUPABASE_URL || window.SUPABASE_URL;
  const key = cfg.SUPABASE_PUBLISHABLE_KEY || cfg.SUPABASE_ANON_KEY || window.SUPABASE_ANON_KEY;
  if (!window.supabase) { store.configError = 'La bibliothèque Supabase ne s’est pas chargée (vérifiez la connexion).'; return null; }
  if (!url || !key || /VOTRE/.test(url + key)) { store.configError = 'Configuration Supabase à vérifier dans config.js (URL ou clé manquante).'; return null; }
  store.sb = window.supabase.createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true } });
  return store.sb;
}

// ---- cache local (affichage immédiat + lecture hors ligne) ----
function readCache() {
  try { const c = JSON.parse(localStorage.getItem(CACHE_KEY) || 'null'); if (c && c.uid === store.user?.id) TABLES.forEach(k => { store.t[k] = c.t[k] || []; }); } catch (e) { /* ignore */ }
}
let cacheTimer;
function writeCache() {
  clearTimeout(cacheTimer);
  cacheTimer = setTimeout(() => { try { localStorage.setItem(CACHE_KEY, JSON.stringify({ uid: store.user?.id, t: store.t })); } catch (e) { /* quota */ } }, 600);
}
export function clearCache() { try { localStorage.removeItem(CACHE_KEY); } catch (e) { /* ignore */ } TABLES.forEach(k => (store.t[k] = [])); }

// ---- chargement ----
export async function loadFamily() {
  const { data, error } = await store.sb.from('profiles').select('family_id,display_name').eq('id', store.user.id).maybeSingle();
  if (error) throw error;
  store.familyId = data?.family_id || null;
  store.displayName = data?.display_name || '';
  return store.familyId;
}

export async function loadAll() {
  readCache();
  emit('*');
  const results = await Promise.all(TABLES.map(k => store.sb.from(k).select('*')));
  results.forEach((r, i) => { if (r.error) console.error(TABLES[i], r.error); else store.t[TABLES[i]] = r.data; });
  writeCache();
  emit('*');
  const failed = results.find(r => r.error);
  if (failed) throw failed.error;
}

// ---- temps réel ----
let channel, pollTimer;
export function startRealtime() {
  stopRealtime();
  setSync('connecting');
  channel = store.sb.channel('family-sync');
  TABLES.forEach(table => channel.on('postgres_changes', { event: '*', schema: 'public', table }, p => applyChange(table, p)));
  channel.subscribe(status => {
    if (status === 'SUBSCRIBED') { setSync('live'); loadAll().catch(() => {}); } // rattrape ce qui a pu être manqué
    else if (['CHANNEL_ERROR', 'TIMED_OUT', 'CLOSED'].includes(status)) setSync('offline');
  });
  // filet de sécurité : rechargement au retour sur l'appli / au retour du réseau / toutes les 2 min
  document.addEventListener('visibilitychange', onVisible);
  window.addEventListener('online', onVisible);
  pollTimer = setInterval(() => { if (!document.hidden) loadAll().catch(() => {}); }, 120000);
}
export function stopRealtime() {
  if (channel) { store.sb.removeChannel(channel); channel = null; }
  clearInterval(pollTimer);
  document.removeEventListener('visibilitychange', onVisible);
  window.removeEventListener('online', onVisible);
  setSync('offline');
}
const onVisible = () => { if (!document.hidden && store.user) loadAll().catch(() => {}); };

function applyChange(table, p) {
  const rows = store.t[table];
  if (p.eventType === 'DELETE') store.t[table] = rows.filter(r => r.id !== p.old.id);
  else { const i = rows.findIndex(r => r.id === p.new.id); if (i >= 0) rows[i] = p.new; else rows.push(p.new); }
  writeCache(); emit(table);
}

// ---- écriture (mise à jour locale immédiate, puis serveur) ----
const upsertLocal = (table, row) => { const rows = store.t[table]; const i = rows.findIndex(r => r.id === row.id); if (i >= 0) rows[i] = row; else rows.push(row); };

export async function add(table, row) {
  const { data, error } = await store.sb.from(table).insert(row).select().single();
  if (error) throw error;
  upsertLocal(table, data); writeCache(); emit(table); return data;
}
export async function addMany(table, rows, { ignoreDuplicates = false } = {}) {
  if (!rows.length) return [];
  const q = ignoreDuplicates
    ? store.sb.from(table).upsert(rows, { onConflict: 'family_id,external_id', ignoreDuplicates: true }).select()
    : store.sb.from(table).insert(rows).select();
  const { data, error } = await q;
  if (error) throw error;
  (data || []).forEach(r => upsertLocal(table, r)); writeCache(); emit(table); return data || [];
}
export async function patch(table, id, changes) {
  const old = store.t[table].find(r => r.id === id);
  if (old) { upsertLocal(table, { ...old, ...changes }); emit(table); } // optimiste
  const { data, error } = await store.sb.from(table).update(changes).eq('id', id).select().single();
  if (error) { if (old) { upsertLocal(table, old); emit(table); } throw error; }
  upsertLocal(table, data); writeCache(); emit(table); return data;
}
export async function del(table, id) {
  const old = store.t[table].find(r => r.id === id);
  store.t[table] = store.t[table].filter(r => r.id !== id); emit(table);
  const { error } = await store.sb.from(table).delete().eq('id', id);
  if (error) { if (old) { store.t[table].push(old); emit(table); } throw error; }
  writeCache();
}

// ---- photos ----
export async function uploadPhoto(blob, folder = 'misc') {
  const path = `${folder}/${crypto.randomUUID()}.jpg`;
  const { error } = await store.sb.storage.from('photos').upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000' });
  if (error) throw error;
  return store.sb.storage.from('photos').getPublicUrl(path).data.publicUrl;
}
