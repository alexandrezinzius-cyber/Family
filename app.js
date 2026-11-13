(function () {
"use strict";
const __m = {};
// ===== util.js =====
__m.util = (() => {
// Petits utilitaires partagés
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pick = a => a[Math.floor(Math.random() * a.length)];
const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

const PEOPLE = ['Famille', 'Emilie', 'Alexandre', 'Hugo', 'Gaspard'];
const DAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

// ---- dates (toujours en heure locale, format AAAA-MM-JJ) ----
const ymd = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const parseYmd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
const weekStartSaturday = d => addDays(new Date(d.getFullYear(), d.getMonth(), d.getDate()), -((d.getDay() + 1) % 7));
const fmtLong = d => d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
const fmtShort = d => d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
const fmtTime = iso => new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
const toLocalInput = iso => { const d = new Date(iso); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 16); };

// ---- notifications ----
let toastTimer;
function toast(msg, kind = '') {
  const t = $('#toast'); if (!t) return;
  t.textContent = msg; t.className = 'show ' + kind;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => (t.className = ''), 2800);
}

// ---- fenêtre de dialogue ----
function openModal(html, { wide = false, onMount } = {}) {
  const dlg = $('#dlg');
  $('#dlgBody').innerHTML = html;
  dlg.classList.toggle('wide', wide);
  if (!dlg.open) dlg.showModal();
  onMount && onMount($('#dlgBody'));
}
const closeModal = () => { const d = $('#dlg'); if (d.open) d.close(); };

// ---- formulaires générés ----
// fields: [{name,label,type,options,placeholder,required,hint,list,full,step}]
function fieldHTML(f, v = '') {
  const val = v ?? '';
  const req = f.required ? 'required' : '';
  let input;
  if (f.type === 'select') input = `<select name="${f.name}" ${req}>${f.options.map(o => { const [ov, ol] = Array.isArray(o) ? o : [o, o]; return `<option value="${esc(ov)}" ${String(ov) === String(val) ? 'selected' : ''}>${esc(ol)}</option>`; }).join('')}</select>`;
  else if (f.type === 'textarea') input = `<textarea name="${f.name}" rows="${f.rows || 4}" placeholder="${esc(f.placeholder || '')}" ${req}>${esc(val)}</textarea>`;
  else if (f.type === 'checkbox') return `<label class="field check ${f.full ? 'full' : ''}"><input type="checkbox" name="${f.name}" ${val ? 'checked' : ''}> <span>${esc(f.label)}</span></label>`;
  else if (f.type === 'file') input = `<input type="file" name="${f.name}" accept="image/*">`;
  else input = `<input type="${f.type || 'text'}" name="${f.name}" value="${esc(val)}" placeholder="${esc(f.placeholder || '')}" ${f.list ? `list="${f.list}"` : ''} ${f.step ? `step="${f.step}"` : ''} ${req}>`;
  return `<label class="field ${f.full ? 'full' : ''}"><span>${esc(f.label)}</span>${input}${f.hint ? `<small>${esc(f.hint)}</small>` : ''}</label>`;
}

function formDialog({ title, fields, values = {}, submitLabel = 'Enregistrer', onSubmit, extra = '', wide = false, onMount, danger }) {
  const html = `<form id="genForm" class="genform"><h2 class="script">${esc(title)}</h2>
    <div class="fields">${fields.map(f => fieldHTML(f, values[f.name])).join('')}</div>
    ${extra}
    <div class="formactions">${danger ? `<button type="button" class="btn danger" data-danger>${esc(danger.label)}</button>` : ''}<span class="grow"></span>
    <button type="button" class="btn ghost" data-close>Annuler</button><button class="btn primary">${esc(submitLabel)}</button></div></form>`;
  openModal(html, {
    wide, onMount: root => {
      const form = $('#genForm', root);
      $('[data-close]', root).onclick = closeModal;
      if (danger) $('[data-danger]', root).onclick = async () => { if (confirm(danger.confirm || 'Supprimer ?')) { await danger.run(); closeModal(); } };
      form.onsubmit = async e => {
        e.preventDefault();
        const btn = form.querySelector('button.primary'); btn.disabled = true;
        const out = {};
        for (const f of fields) {
          if (f.type === 'file') { out[f.name] = form.elements[f.name].files[0] || null; continue; }
          if (f.type === 'checkbox') { out[f.name] = form.elements[f.name].checked; continue; }
          let v = form.elements[f.name].value;
          if (f.type === 'number') v = v === '' ? null : Number(v);
          else if (typeof v === 'string') { v = v.trim(); if (v === '') v = null; }
          out[f.name] = v;
        }
        try { await onSubmit(out); closeModal(); } catch (err) { console.error(err); toast(err.message || 'Erreur', 'err'); btn.disabled = false; }
      };
      onMount && onMount(root, form);
    }
  });
}

// ---- images : réduction avant envoi ----
async function compressImage(file, max = 1100, quality = 0.82) {
  const bmp = await createImageBitmap(file);
  const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const c = document.createElement('canvas'); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
  c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
  return new Promise(res => c.toBlob(res, 'image/jpeg', quality));
}

// ---- ingrédients ----
const ingredientLines = text => String(text || '').split(/\r?\n/).map(l => l.replace(/^[\s\-•*·–]+/, '').trim()).filter(l => l && !/:$/.test(l));

// Marché : fruits, légumes, herbes fraîches, volaille, œufs. Supermarché : tout le reste.
const norm = t => String(t || '').toLowerCase().replace(/œ/g, 'oe').normalize('NFD').replace(/[̀-ͯ]/g, '');
const PROCESSED = /(concentr|coulis|puree|concass|boite|conserve|sauce|pelee|sech|surgel|confit|jus de|huile|sirop|compote|confiture|vinaigre|bouillon|cube|poudre|\blait|creme|fromage|beurre|\bfarine\b|sucre|\bpate|\bvin\b|moutarde|ketchup|cornichon|lardon|jambon|saucisse|chocolat|miel|\bsel\b|poivre|epice|paprika|cumin|curry|muscade|raclette|mozzarella|parmesan|emmental|comte)/;
const FRESH = /(carotte|poireau|courgette|aubergine|tomate|salade|laitue|radis|betterave|betrave|\bchou|celeri|oignon|echalote|\bail\b|pomme|poire|citron|\boranges?\b|clementine|mandarine|kiwi|banane|fraise|framboise|cerise|abricot|peche|nectarine|melon|raisin|figue|fruit|legume|persil|basilic|coriandre|menthe|ciboulette|thym|romarin|gingembre|cebette|ciboule|champignon|epinard|haricots? verts?|poivron|concombre|navet|potiron|courge|butternut|patate|endive|fenouil|panais|asperge|artichaut|avocat|mache|brocoli|petits? pois|\bmais\b|poulet|volaille|canard|dinde|pintade|caille|magret|aiguillette|\boeuf)/;
const guessShop = line => { const n = norm(line); return !PROCESSED.test(n) && FRESH.test(n) ? 'Marché' : 'Supermarché'; };

return { $, $$, esc, pick, shuffle, PEOPLE, DAYS, ymd, parseYmd, addDays, weekStartSaturday, fmtLong, fmtShort, fmtTime, toLocalInput, toast, openModal, closeModal, fieldHTML, formDialog, compressImage, ingredientLines, guessShop };
})();
// ===== season.js =====
__m.season = (() => {
// Fruits et légumes de saison (France métropolitaine) : sert à choisir les recettes proposées
const strip = s => String(s || '').toLowerCase().replace(/œ/g, 'oe').normalize('NFD').replace(/[̀-ͯ]/g, '');

// [nom affiché, motif (sans accents), mois de saison]
const PRODUCE = [
  ['poireau', 'poireau', '9-4'], ['courge', 'courge(?!tte)|potiron|potimarron|butternut|citrouille', '9-2'],
  ['chou-fleur', 'chou.?fleur', '9-4'], ['brocoli', 'brocoli', '9-3'], ['chou', '\\bchou(?!.?fleur)', '10-3'],
  ['céleri', 'celeri', '9-3'], ['betterave', 'betterave|betrave', '9-4'], ['navet', 'navet', '10-4'], ['panais', 'panais', '10-3'],
  ['topinambour', 'topinambour', '10-3'], ['endive', 'endive', '11-3'], ['fenouil', 'fenouil', '10-3'], ['mâche', 'mache', '10-3'],
  ['épinard', 'epinard', '3-6,9-11'], ['pomme', '\\bpommes?\\b(?!\\s+(de terre|dauphine|noisette))', '9-4'], ['poire', '\\bpoires?\\b', '9-3'],
  ['orange', '\\boranges?\\b', '11-3'], ['clémentine', 'clementine|mandarine', '11-2'], ['kiwi', 'kiwi', '11-4'], ['pamplemousse', 'pamplemousse', '11-3'],
  ['châtaigne', 'chataigne|marron', '10-12'], ['coing', 'coing', '10-12'], ['champignon des bois', 'cepe|girolle|chanterelle|morille', '9-11'],
  ['tomate', 'tomate', '6-9'], ['courgette', 'courgette', '6-10'], ['aubergine', 'aubergine', '7-10'], ['poivron', 'poivron', '7-10'],
  ['concombre', 'concombre', '6-9'], ['haricot vert', 'haricots? verts?', '6-10'], ['petit pois', 'petits? pois', '5-7'], ['asperge', 'asperge', '4-6'],
  ['artichaut', 'artichaut', '5-9'], ['maïs', '\\bmais\\b', '7-10'], ['radis', 'radis', '3-10'], ['salade', 'salade|laitue', '4-10'],
  ['fraise', 'fraise', '4-7'], ['framboise', 'framboise', '6-8'], ['cerise', 'cerise', '5-7'], ['abricot', 'abricot', '6-8'], ['pêche', 'peche|nectarine', '6-9'],
  ['melon', 'melon', '6-9'], ['pastèque', 'pasteque', '7-9'], ['figue', 'figue', '8-10'], ['raisin', 'raisin', '8-10'],
].map(([name, re, months]) => ({ name, re: new RegExp(re), months }));

const inSeason = (months, m) => months.split(',').some(r => { const [a, b] = r.split('-').map(Number); return a <= b ? m >= a && m <= b : m >= a || m <= b; });
// lignes d'ingrédients transformés (conserves, sauces…) : ne comptent pas comme produit frais
const PROCESSED = /(concentr|coulis|puree|concass|boite|conserve|sauce|pelee|sech|surgel|confit|jus de|huile|sirop|compote|confiture|vinaigre|bouillon|cube)/;

const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
const seasonalNames = m => PRODUCE.filter(p => inSeason(p.months, m)).map(p => p.name);

// score > 0 : recette de saison ; score < 0 : produits hors saison
function scoreRecipe(recipe, month) {
  const text = strip(recipe.ingredients).split('\n').filter(l => !PROCESSED.test(l)).join('\n');
  let score = 0; const hits = [];
  for (const p of PRODUCE) {
    if (!p.re.test(text)) continue;
    if (inSeason(p.months, month)) { score++; hits.push(p.name); } else score--;
  }
  return { score: Math.max(-3, Math.min(4, score)), hits };
}

return { MONTHS, seasonalNames, scoreRecipe };
})();
// ===== db.js =====
__m.db = (() => {
// Couche de données : Supabase + synchronisation temps réel entre appareils
const TABLES = ['cellar_items', 'recipes', 'meal_plans', 'shopping_items', 'family_events', 'playlists', 'family_notes'];
const CACHE_KEY = 'family-cache-v3';

const store = {
  sb: null, user: null, familyId: null,
  t: Object.fromEntries(TABLES.map(k => [k, []])),
  sync: 'offline', // offline | connecting | live
};

const listeners = new Set();
const onChange = fn => { listeners.add(fn); return () => listeners.delete(fn); };
const emit = table => listeners.forEach(f => f(table));
const setSync = s => { store.sync = s; emit('_sync'); };

// ---- configuration & client ----
function createClientFromConfig() {
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
function clearCache() { try { localStorage.removeItem(CACHE_KEY); } catch (e) { /* ignore */ } TABLES.forEach(k => (store.t[k] = [])); }

// ---- chargement ----
async function loadFamily() {
  const { data, error } = await store.sb.from('profiles').select('family_id,display_name').eq('id', store.user.id).maybeSingle();
  if (error) throw error;
  store.familyId = data?.family_id || null;
  store.displayName = data?.display_name || '';
  return store.familyId;
}

async function loadAll() {
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
function startRealtime() {
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
function stopRealtime() {
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

async function add(table, row) {
  const { data, error } = await store.sb.from(table).insert(row).select().single();
  if (error) throw error;
  upsertLocal(table, data); writeCache(); emit(table); return data;
}
async function addMany(table, rows, { ignoreDuplicates = false } = {}) {
  if (!rows.length) return [];
  const q = ignoreDuplicates
    ? store.sb.from(table).upsert(rows, { onConflict: 'family_id,external_id', ignoreDuplicates: true }).select()
    : store.sb.from(table).insert(rows).select();
  const { data, error } = await q;
  if (error) throw error;
  (data || []).forEach(r => upsertLocal(table, r)); writeCache(); emit(table); return data || [];
}
async function patch(table, id, changes) {
  const old = store.t[table].find(r => r.id === id);
  if (old) { upsertLocal(table, { ...old, ...changes }); emit(table); } // optimiste
  const { data, error } = await store.sb.from(table).update(changes).eq('id', id).select().single();
  if (error) { if (old) { upsertLocal(table, old); emit(table); } throw error; }
  upsertLocal(table, data); writeCache(); emit(table); return data;
}
async function del(table, id) {
  const old = store.t[table].find(r => r.id === id);
  store.t[table] = store.t[table].filter(r => r.id !== id); emit(table);
  const { error } = await store.sb.from(table).delete().eq('id', id);
  if (error) { if (old) { store.t[table].push(old); emit(table); } throw error; }
  writeCache();
}

// ---- photos ----
async function uploadPhoto(blob, folder = 'misc') {
  const path = `${folder}/${crypto.randomUUID()}.jpg`;
  const { error } = await store.sb.storage.from('photos').upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000' });
  if (error) throw error;
  return store.sb.storage.from('photos').getPublicUrl(path).data.publicUrl;
}

return { TABLES, store, onChange, createClientFromConfig, clearCache, loadFamily, loadAll, startRealtime, stopRealtime, add, addMany, patch, del, uploadPhoto };
})();
// ===== ext.js =====
__m.ext = (() => {
// Idées de recettes et de cocktails depuis internet (TheMealDB / TheCocktailDB, gratuits, sans clé)
// + traduction automatique en français (Google Translate non officiel). Si la traduction échoue,
// le texte original reste affiché.
const { pick } = __m.util;

const MEAL = 'https://www.themealdb.com/api/json/v1/1/';
const COCK = 'https://www.thecocktaildb.com/api/json/v1/1/';

async function getJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error('Service indisponible (' + r.status + ')');
  return r.json();
}

// catégorie de l'appli -> catégories TheMealDB
const MEAL_CATS = {
  'Entrée': ['Starter'], 'Plat': ['Beef', 'Chicken', 'Lamb', 'Pork', 'Pasta', 'Seafood', 'Vegetarian', 'Miscellaneous'],
  'Dessert': ['Dessert'], 'Accompagnement': ['Side'], 'Apéro': ['Starter', 'Side'], 'Brunch': ['Breakfast'],
};
// type de vin -> idées de plats
const PAIRING = {
  Rouge: ['Beef', 'Lamb', 'Pork'], Blanc: ['Seafood', 'Chicken', 'Vegetarian'], 'Rosé': ['Pasta', 'Chicken', 'Starter'],
  Effervescent: ['Starter', 'Seafood'], Liquoreux: ['Dessert'], 'Fortifié': ['Dessert'], Spiritueux: ['Dessert'],
};
// spiritueux -> ingrédient TheCocktailDB
const SPIRIT_MAP = { whisky: 'Whiskey', whiskey: 'Whiskey', scotch: 'Scotch', bourbon: 'Bourbon', rhum: 'Rum', rum: 'Rum', gin: 'Gin', vodka: 'Vodka', tequila: 'Tequila', cognac: 'Cognac', brandy: 'Brandy', champagne: 'Champagne', 'crémant': 'Champagne', prosecco: 'Prosecco', porto: 'Port', 'vin': 'Wine' };

function normMeal(m) {
  const ing = [];
  for (let i = 1; i <= 20; i++) { const n = (m['strIngredient' + i] || '').trim(); if (n) ing.push(`${(m['strMeasure' + i] || '').trim()} ${n}`.trim()); }
  return {
    kind: 'recipe', title: m.strMeal, category: m.strCategory, area: m.strArea,
    ingredients: ing.join('\n'), instructions: (m.strInstructions || '').replace(/\r/g, '').replace(/\n{2,}/g, '\n').trim(),
    photo_url: m.strMealThumb, source_url: m.strSource || (m.strYoutube || null), id: m.idMeal, lang: 'en',
  };
}
function normCocktail(c) {
  const ing = [];
  for (let i = 1; i <= 15; i++) { const n = (c['strIngredient' + i] || '').trim(); if (n) ing.push(`${(c['strMeasure' + i] || '').trim()} ${n}`.trim()); }
  const fr = (c.strInstructionsFR || '').trim();
  return {
    kind: 'cocktail', title: c.strDrink, category: c.strAlcoholic === 'Alcoholic' ? 'Cocktail avec alcool' : 'Cocktail sans alcool',
    area: [c.strGlass, c.strCategory].filter(Boolean).join(' · '),
    ingredients: ing.join('\n'), instructions: fr || (c.strInstructions || '').trim(),
    photo_url: c.strDrinkThumb, source_url: null, id: c.idDrink, lang: fr ? 'fr' : 'en',
  };
}

async function randomMeal(cats = MEAL_CATS['Plat'], exclude = []) {
  for (let t = 0; t < 4; t++) {
    const list = await getJSON(MEAL + 'filter.php?c=' + encodeURIComponent(pick(cats)));
    const cand = (list.meals || []).filter(m => !exclude.includes(m.idMeal));
    if (!cand.length) continue;
    const d = await getJSON(MEAL + 'lookup.php?i=' + pick(cand).idMeal);
    if (d.meals?.[0]) return normMeal(d.meals[0]);
  }
  throw new Error('Aucune idée trouvée, réessayez.');
}

async function randomCocktail({ alcoholic = true, ingredient = null } = {}) {
  let ids;
  if (ingredient) {
    const l = await getJSON(COCK + 'filter.php?i=' + encodeURIComponent(ingredient));
    ids = l.drinks;
  }
  if (!ids || !ids.length) ids = (await getJSON(COCK + 'filter.php?a=' + (alcoholic ? 'Alcoholic' : 'Non_Alcoholic'))).drinks;
  for (let t = 0; t < 4; t++) {
    const d = await getJSON(COCK + 'lookup.php?i=' + pick(ids).idDrink);
    const c = d.drinks?.[0];
    if (c) return normCocktail(c);
  }
  throw new Error('Aucun cocktail trouvé, réessayez.');
}

// ---- traduction ----
async function tr(text) {
  const chunks = []; let cur = '';
  for (const line of text.split('\n')) { if ((cur + '\n' + line).length > 1200 && cur) { chunks.push(cur); cur = line; } else cur = cur ? cur + '\n' + line : line; }
  if (cur) chunks.push(cur);
  const out = [];
  for (const c of chunks) {
    const r = await fetch('https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fr&dt=t&q=' + encodeURIComponent(c));
    if (!r.ok) throw new Error('translate ' + r.status);
    const d = await r.json();
    out.push(d[0].map(x => x[0]).join(''));
  }
  return out.join('\n');
}

async function translateIdea(idea) {
  if (idea.lang === 'fr') return idea;
  try {
    const [title, ingredients, instructions] = await Promise.all([tr(idea.title), tr(idea.ingredients), tr(idea.instructions)]);
    return { ...idea, title, ingredients, instructions, lang: 'fr', translated: true };
  } catch (e) { console.warn('Traduction indisponible', e); return idea; }
}

return { MEAL_CATS, PAIRING, SPIRIT_MAP, randomMeal, randomCocktail, translateIdea };
})();
// ===== shopping.js =====
__m.shopping = (() => {
// Liste de courses : ajout des ingrédients d'une recette
const db = __m.db;
const { ingredientLines, guessShop } = __m.util;

async function addIngredients(recipe) {
  const existing = new Set(db.store.t.shopping_items.filter(i => !i.checked).map(i => i.name.toLowerCase()));
  const rows = [];
  for (const l of ingredientLines(recipe.ingredients)) {
    if (existing.has(l.toLowerCase())) continue;
    existing.add(l.toLowerCase());
    rows.push({ name: l, shop: guessShop(l), recipe_title: recipe.title, checked: false });
  }
  await db.addMany('shopping_items', rows);
  return rows.length;
}

return { addIngredients };
})();
// ===== seed.js =====
__m.seed = (() => {
// Import initial : recettes MyRecipeBox et cave Vivino (fichiers dans /data)
const db = __m.db;

async function importFile(table, file) {
  const key = table === 'recipes' ? 'recipes' : 'cellar';
  const rows = window.SEED && window.SEED[key] ? window.SEED[key] : await (await fetch(file)).json();
  const withFamily = rows.map(r => ({ ...r, family_id: db.store.familyId }));
  let n = 0;
  for (let i = 0; i < withFamily.length; i += 40) {
    const res = await db.addMany(table, withFamily.slice(i, i + 40), { ignoreDuplicates: true });
    n += res.length;
  }
  return n;
}
const importRecipes = () => importFile('recipes', 'data/recipes.json');
const importCellar = () => importFile('cellar_items', 'data/cellar.json');

return { importRecipes, importCellar };
})();
// ===== ideas.js =====
__m.ideas = (() => {
// Fenêtre "idée de recette / cocktail" réutilisée par la cave, les recettes et les menus
const { esc, openModal, closeModal, toast } = __m.util;
const { translateIdea } = __m.ext;
const db = __m.db;

const ideaCardHTML = idea => {
  const ing = String(idea.ingredients || '').split('\n').filter(Boolean);
  const steps = String(idea.instructions || '').split('\n').filter(Boolean);
  return `<div class="idea">
    ${idea.photo_url ? `<img class="ideaphoto" src="${esc(idea.photo_url)}" alt="" loading="lazy">` : ''}
    <div class="ideabody">
      <span class="chip">${esc(idea.kind === 'cocktail' ? idea.category : 'Idée recette')}</span>
      <h3 class="script">${esc(idea.title)}</h3>
      ${idea.area ? `<p class="muted">${esc(idea.area)}</p>` : ''}
      <h4>Ingrédients</h4><ul>${ing.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
      <h4>Préparation</h4>${steps.map(s => `<p>${esc(s)}</p>`).join('')}
      ${idea.lang === 'en' ? '<p class="muted small">Texte en anglais (traduction automatique indisponible).</p>' : idea.translated ? '<p class="muted small">Traduit automatiquement.</p>' : ''}
      ${idea.source_url ? `<p><a href="${esc(idea.source_url)}" target="_blank" rel="noopener">Source ↗</a></p>` : ''}
    </div></div>`;
};

async function saveIdeaAsRecipe(idea, category) {
  return db.add('recipes', {
    title: idea.title, category: category || (idea.kind === 'cocktail' ? idea.category : 'Plat'),
    ingredients: idea.ingredients, instructions: idea.instructions, photo_url: idea.photo_url,
    source_url: idea.source_url, notes: 'Idée trouvée sur internet', servings: idea.kind === 'cocktail' ? 1 : null,
  });
}

// fetcher : async () => idea
async function openIdea(fetcher, { title = 'Une idée pour vous', saveCategory } = {}) {
  let token = 0, idea = null;
  const load = async () => {
    const my = ++token; idea = null;
    openModal(`<div class="ideabox"><h2 class="script">${esc(title)}</h2><div class="loading"><span class="spinner"></span> Recherche en cours…</div></div>`, { wide: true });
    try {
      idea = await fetcher();
      if (my !== token) return;
      paint();
      const t = await translateIdea(idea);
      if (my !== token) return;
      if (t !== idea) { idea = t; paint(); }
    } catch (e) {
      console.error(e);
      if (my === token) openModal(`<div class="ideabox"><h2 class="script">${esc(title)}</h2><p class="muted">Impossible de récupérer une idée pour le moment (${esc(e.message)}). Vérifiez la connexion et réessayez.</p>
        <div class="formactions"><span class="grow"></span><button class="btn ghost" data-close>Fermer</button><button class="btn primary" data-again>Réessayer</button></div></div>`, { wide: true, onMount: bind });
    }
  };
  const paint = () => openModal(`<div class="ideabox"><h2 class="script">${esc(title)}</h2>${ideaCardHTML(idea)}
    <div class="formactions"><button class="btn ghost" data-close>Fermer</button><span class="grow"></span>
    <button class="btn" data-again>↻ Une autre idée</button><button class="btn primary" data-save>＋ Ajouter à mes recettes</button></div></div>`, { wide: true, onMount: bind });
  const bind = root => {
    root.querySelector('[data-close]')?.addEventListener('click', closeModal);
    root.querySelector('[data-again]')?.addEventListener('click', load);
    root.querySelector('[data-save]')?.addEventListener('click', async e => {
      e.target.disabled = true;
      try { await saveIdeaAsRecipe(idea, saveCategory); toast('Ajouté à votre carnet de recettes'); closeModal(); } catch (err) { toast(err.message, 'err'); e.target.disabled = false; }
    });
  };
  await load();
}

return { ideaCardHTML, saveIdeaAsRecipe, openIdea };
})();
// ===== recipes.js =====
__m.recipes = (() => {
// Module Recettes : carnet, recherche, idées depuis internet, cocktails
const { $, $$, esc, toast, openModal, closeModal, formDialog, compressImage, ymd, DAYS } = __m.util;
const db = __m.db;
const { openIdea } = __m.ideas;
const { randomMeal, randomCocktail, MEAL_CATS } = __m.ext;
const { importRecipes } = __m.seed;
const { addIngredients } = __m.shopping;

const CATEGORIES = ['Entrée', 'Plat', 'Dessert', 'Accompagnement', 'Apéro', 'Brunch', 'Cocktail avec alcool', 'Cocktail sans alcool'];
let cat = '', query = '', favOnly = false;
const recipes = () => db.store.t.recipes;

const filtered = () => {
  const q = query.toLowerCase();
  return recipes().filter(r => (!cat || r.category === cat) && (!favOnly || r.favorite) && (!q || [r.title, r.ingredients, r.category].join(' ').toLowerCase().includes(q)))
    .sort((a, b) => a.title.localeCompare(b.title, 'fr'));
};
const minutes = r => r.total_minutes || ((r.prep_minutes || 0) + (r.cook_minutes || 0)) || null;

const cardHTML = r => `<button class="rcard glass" data-id="${r.id}">
  ${r.photo_url ? `<img src="${esc(r.photo_url)}" alt="" loading="lazy">` : `<div class="noimg script">${esc(r.title.slice(0, 1))}</div>`}
  <div class="rbody"><b>${esc(r.title)}</b><small>${esc(r.category || '')}${minutes(r) ? ` · ${minutes(r)} min` : ''}${r.servings ? ` · ${r.servings} pers.` : ''}</small></div>${r.favorite ? '<span class="fav">♥</span>' : ''}</button>`;
const gridHTML = () => filtered().map(cardHTML).join('') || '<div class="empty">Aucune recette trouvée.</div>';

function html() {
  const mealCat = MEAL_CATS[cat] ? cat : 'Plat';
  const imp = recipes().length === 0 ? `<div class="card glass accent"><h3 class="script">Premier démarrage</h3><p>Votre sauvegarde MyRecipeBox (81 recettes avec photos) est prête à être importée.</p><button class="btn primary" id="impRec">Importer mes recettes</button></div>` : '';
  return `${imp}<div class="bar wrapbar">
    <input type="search" id="rq" placeholder="Rechercher une recette ou un ingrédient…" value="${esc(query)}">
    <button class="btn" id="ideaMeal">✨ Idée de ${mealCat.toLowerCase()}</button>
    <button class="btn" id="ideaAlc">🍸 Cocktail</button><button class="btn" id="ideaNoAlc">🥤 Sans alcool</button>
    <button class="btn primary" id="addRec">＋ Recette</button></div>
  <div class="chips" id="rchips"><button data-c="" class="${!cat && !favOnly ? 'on' : ''}">Toutes (${recipes().length})</button><button data-fav class="${favOnly ? 'on' : ''}">♥ Favorites</button>
    ${CATEGORIES.map(c => `<button data-c="${esc(c)}" class="${cat === c ? 'on' : ''}">${esc(c)}</button>`).join('')}</div>
  <div class="rgrid" id="rgrid">${gridHTML()}</div>`;
}

function lines(t) { return String(t || '').split(/\r?\n/).map(s => s.trim()).filter(Boolean); }

function openRecipe(id) {
  const r = recipes().find(x => x.id === id); if (!r) return;
  const chips = [r.category, r.servings && `${r.servings} pers.`, r.prep_minutes && `préparation ${r.prep_minutes} min`, r.cook_minutes && `cuisson ${r.cook_minutes} min`].filter(Boolean);
  openModal(`<div class="detail recipe">
    ${r.photo_url ? `<img class="rphoto" src="${esc(r.photo_url)}" alt="">` : ''}
    <div class="rhead"><h2 class="script">${esc(r.title)}</h2><button class="iconbtn" data-act="fav" aria-label="Favori">${r.favorite ? '♥' : '♡'}</button></div>
    <div class="chips static">${chips.map(c => `<span class="chip">${esc(c)}</span>`).join('')}</div>
    <div class="stars" data-stars>${[1, 2, 3, 4, 5].map(n => `<button data-star="${n}" class="${n <= (r.rating || 0) ? 'on' : ''}" aria-label="${n} étoiles">★</button>`).join('')}</div>
    ${r.description ? `<p>${esc(r.description)}</p>` : ''}
    <div class="two"><div><h4>Ingrédients</h4><ul>${lines(r.ingredients).map(l => `<li>${esc(l)}</li>`).join('') || '<li class="muted">—</li>'}</ul></div>
    <div><h4>Préparation</h4>${lines(r.instructions).map((l, i) => `<p><b class="num">${i + 1}</b> ${esc(l)}</p>`).join('') || '<p class="muted">—</p>'}</div></div>
    ${r.notes ? `<h4>Notes</h4><p>${esc(r.notes)}</p>` : ''}${r.nutrition ? `<details><summary>Valeurs nutritionnelles</summary><pre>${esc(r.nutrition)}</pre></details>` : ''}
    ${r.source_url ? `<p><a href="${esc(r.source_url)}" target="_blank" rel="noopener">Recette d’origine ↗</a></p>` : ''}
    <div class="formactions wrap"><button class="btn" data-act="plan">📅 Planifier</button><button class="btn" data-act="shop">🛒 Ajouter aux courses</button><span class="grow"></span>
      <button class="btn" data-act="edit">Modifier</button><button class="btn ghost" data-close>Fermer</button></div></div>`, {
    wide: true,
    onMount: root => {
      $('[data-close]', root).onclick = closeModal;
      root.onclick = async e => {
        const star = e.target.closest('[data-star]'); if (star) { const n = +star.dataset.star; await db.patch('recipes', r.id, { rating: n === r.rating ? 0 : n }); return openRecipe(id); }
        const a = e.target.closest('[data-act]')?.dataset.act; if (!a) return;
        if (a === 'fav') { await db.patch('recipes', r.id, { favorite: !r.favorite }); openRecipe(id); }
        if (a === 'edit') editRecipe(r);
        if (a === 'shop') { const n = await addIngredients(r); toast(n ? `${n} ingrédient${n > 1 ? 's' : ''} ajouté${n > 1 ? 's' : ''} aux courses` : 'Déjà dans la liste de courses'); }
        if (a === 'plan') planRecipe(r);
      };
    },
  });
}

function planRecipe(r) {
  formDialog({
    title: 'Planifier « ' + r.title + ' »', submitLabel: 'Planifier',
    fields: [{ name: 'meal_date', label: 'Jour', type: 'date', required: true }, { name: 'meal_type', label: 'Repas', type: 'select', options: [['soir', 'Dîner'], ['midi', 'Déjeuner']] }, { name: 'servings', label: 'Portions', type: 'number' }],
    values: { meal_date: ymd(new Date()), meal_type: 'soir', servings: 3 },
    onSubmit: async v => { await db.add('meal_plans', { ...v, recipe_id: r.id, title: r.title }); toast('Ajouté au menu'); },
  });
}

function editRecipe(r = {}) {
  formDialog({
    title: r.id ? 'Modifier la recette' : 'Nouvelle recette', wide: true,
    values: { category: 'Plat', ...r },
    fields: [
      { name: 'title', label: 'Nom', required: true, full: true }, { name: 'category', label: 'Catégorie', type: 'select', options: CATEGORIES }, { name: 'servings', label: 'Portions', type: 'number' },
      { name: 'prep_minutes', label: 'Préparation (min)', type: 'number' }, { name: 'cook_minutes', label: 'Cuisson (min)', type: 'number' },
      { name: 'ingredients', label: 'Ingrédients (un par ligne)', type: 'textarea', rows: 7, full: true }, { name: 'instructions', label: 'Préparation (une étape par ligne)', type: 'textarea', rows: 8, full: true },
      { name: 'notes', label: 'Notes', type: 'textarea', rows: 2, full: true }, { name: 'source_url', label: 'Lien de la recette', full: true },
      { name: 'photo', label: 'Photo', type: 'file', full: true },
    ],
    danger: r.id ? { label: 'Supprimer', confirm: 'Supprimer cette recette ?', run: () => db.del('recipes', r.id) } : null,
    onSubmit: async v => {
      const photo = v.photo; delete v.photo;
      if (photo) v.photo_url = await db.uploadPhoto(await compressImage(photo), 'recipes');
      v.total_minutes = (v.prep_minutes || 0) + (v.cook_minutes || 0) || null;
      if (r.id) await db.patch('recipes', r.id, v); else await db.add('recipes', v);
      toast('Recette enregistrée — synchronisée');
    },
  });
}

function bind(root, rerender) {
  root.onclick = e => {
    const c = e.target.closest('.rcard'); if (c) return openRecipe(c.dataset.id);
  };
  $('#rchips', root).onclick = e => {
    const b = e.target.closest('button'); if (!b) return;
    if ('fav' in b.dataset) favOnly = !favOnly; else { cat = b.dataset.c; favOnly = false; }
    rerender();
  };
  const q = $('#rq', root); q.oninput = () => { query = q.value; $('#rgrid', root).innerHTML = gridHTML(); };
  $('#addRec', root).onclick = () => editRecipe();
  $('#ideaMeal', root).onclick = () => { const k = MEAL_CATS[cat] ? cat : 'Plat'; openIdea(() => randomMeal(MEAL_CATS[k]), { title: `Idée de ${k.toLowerCase()}`, saveCategory: k }); };
  $('#ideaAlc', root).onclick = () => openIdea(() => randomCocktail({ alcoholic: true }), { title: 'Idée de cocktail' });
  $('#ideaNoAlc', root).onclick = () => openIdea(() => randomCocktail({ alcoholic: false }), { title: 'Idée de cocktail sans alcool' });
  const imp = $('#impRec', root); if (imp) imp.onclick = async () => { imp.disabled = true; imp.textContent = 'Import en cours…'; try { const n = await importRecipes(); toast(`${n} recettes importées`); } catch (err) { toast(err.message, 'err'); imp.disabled = false; } };
}

return { CATEGORIES, cardHTML, html, openRecipe, editRecipe, bind };
})();
// ===== cellar.js =====
__m.cellar = (() => {
// Module Cave : cave à vin (28 bouteilles), placards, extérieur
const { $, $$, esc, toast, openModal, closeModal, formDialog, compressImage, pick } = __m.util;
const db = __m.db;
const { openIdea } = __m.ideas;
const { randomMeal, randomCocktail, PAIRING, SPIRIT_MAP } = __m.ext;
const { importCellar } = __m.seed;

const TYPES = ['Rouge', 'Blanc', 'Rosé', 'Effervescent', 'Liquoreux', 'Fortifié', 'Spiritueux'];
const CATS = ['Vin', 'Champagne', 'Crémant', 'Whisky', 'Rhum', 'Gin', 'Cognac', 'Vodka', 'Tequila', 'Liqueur', 'Autre'];
const KIND_LABEL = { cave: 'Cave à vin', placard: 'Placard', exterieur: 'Extérieur' };
// couleurs du verre par type de bouteille [verre, capsule]
const GLASS = {
  Rouge: ['#6b1230', '#7d1a1a'], Blanc: ['#a9b64a', '#d9c77a'], 'Rosé': ['#e39aae', '#e9b3c0'],
  Effervescent: ['#c9b36a', '#d8b23a'], Liquoreux: ['#d99a2b', '#e8c25a'], 'Fortifié': ['#6e3a1c', '#3b1f10'], Spiritueux: ['#a8662f', '#2a2a2a'],
};
let view = 'cave', query = '', typeFilter = '';
const items = () => db.store.t.cellar_items;
const inCave = () => items().filter(b => b.location_kind === 'cave');
const slotInfo = n => `Étagère ${Math.ceil(n / 4)} · position ${((n - 1) % 4) + 1}`;
const bottleTitle = b => [b.producer, b.name].filter(Boolean).join(' — ');

// ---------------------------------------------------------------- image de la cave à vin (SVG)
function cabinetSVG() {
  const bySlot = Object.fromEntries(inCave().filter(b => b.slot).map(b => [b.slot, b]));
  let s = `<svg class="cabinet" viewBox="0 0 640 840" role="img" aria-label="Cave à vin de 28 bouteilles">
  <defs>
    <linearGradient id="steel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#3a4558"/><stop offset=".5" stop-color="#1f2733"/><stop offset="1" stop-color="#0f141b"/></linearGradient>
    <linearGradient id="inside" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#52698a"/><stop offset=".35" stop-color="#2a3850"/><stop offset="1" stop-color="#151c2a"/></linearGradient>
    <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9a56b"/><stop offset=".5" stop-color="#b9824a"/><stop offset="1" stop-color="#8a5a30"/></linearGradient>
    <linearGradient id="led" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e6f3ff" stop-opacity=".55"/><stop offset="1" stop-color="#e6f3ff" stop-opacity="0"/></linearGradient>
    <linearGradient id="glare" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".18"/><stop offset=".35" stop-color="#fff" stop-opacity=".02"/><stop offset=".55" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="chrome" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8d98a8"/><stop offset=".5" stop-color="#e3e9f2"/><stop offset="1" stop-color="#8d98a8"/></linearGradient>
  </defs>
  <rect x="12" y="10" width="616" height="800" rx="38" fill="url(#steel)" stroke="#080b10" stroke-width="2"/>
  <rect x="190" y="26" width="260" height="36" rx="11" fill="#070b11"/>
  <text x="320" y="50" text-anchor="middle" fill="#7fd0ff" font-family="ui-monospace,Menlo,monospace" font-size="16" letter-spacing="1.5">12 °C · ${inCave().filter(b => b.slot).length}/28</text>
  <rect x="34" y="74" width="572" height="700" rx="16" fill="url(#inside)" stroke="#0a0f16" stroke-width="3"/>
  <rect x="46" y="80" width="548" height="5" rx="2.5" fill="#e8f4ff"/><rect x="46" y="85" width="548" height="70" fill="url(#led)"/>`;
  for (let r = 0; r < 7; r++) {
    const base = 96 + r * 96 + 76;
    s += `<rect x="40" y="${base}" width="560" height="14" rx="3" fill="url(#wood)"/><rect x="40" y="${base + 14}" width="560" height="6" fill="#000" opacity=".25"/>`;
    s += `<text x="52" y="${base - 66}" fill="#bcd3f2" opacity=".55" font-size="10" font-family="system-ui,sans-serif" letter-spacing="1">ÉTAGÈRE ${r + 1}</text>`;
    for (let c = 0; c < 4; c++) {
      const n = r * 4 + c + 1, x = 58 + c * 132, y = base - 40, b = bySlot[n];
      const body = `M${x + 8},${y} H${x + 78} Q${x + 98},${y + 2} ${x + 102},${y + 13} V${y + 25} Q${x + 98},${y + 36} ${x + 78},${y + 38} H${x + 8} Q${x},${y + 38} ${x},${y + 30} V${y + 8} Q${x},${y} ${x + 8},${y}Z`;
      s += `<g class="slot ${b ? 'filled' : ''}" data-slot="${n}" tabindex="0" role="button" aria-label="${b ? esc(bottleTitle(b)) : 'Emplacement libre ' + n}"><title>${b ? esc(bottleTitle(b) + (b.vintage ? ' ' + b.vintage : '')) : 'Libre — ' + slotInfo(n)}</title>`;
      if (b) {
        const [glass, foil] = GLASS[b.wine_type] || GLASS.Rouge;
        s += `<path d="${body}" fill="${glass}" stroke="rgba(0,0,0,.45)"/>
          <rect x="${x + 100}" y="${y + 13}" width="28" height="12" rx="2" fill="${glass}" stroke="rgba(0,0,0,.4)"/>
          <rect x="${x + 108}" y="${y + 11.5}" width="20" height="15" rx="2" fill="${foil}"/>
          <rect x="${x + 16}" y="${y + 6}" width="46" height="26" rx="3" fill="#f4ecd9"/>
          <text x="${x + 39}" y="${y + 17.5}" text-anchor="middle" font-size="6.5" fill="#3b3226" font-family="Georgia,serif">${esc(((b.producer || b.name).length > 14 ? (b.producer || b.name).slice(0, 13) + '…' : (b.producer || b.name)))}</text>
          <text x="${x + 39}" y="${y + 27}" text-anchor="middle" font-size="8" font-weight="700" fill="#7a2a2a" font-family="Georgia,serif">${b.vintage || 'NV'}</text>
          <rect x="${x + 6}" y="${y + 3}" width="76" height="4" rx="2" fill="#fff" opacity=".22"/>`;
      } else {
        s += `<path d="${body}" fill="rgba(255,255,255,.04)" stroke="rgba(255,255,255,.2)" stroke-dasharray="4 4"/>
          <rect x="${x + 100}" y="${y + 13}" width="28" height="12" rx="2" fill="none" stroke="rgba(255,255,255,.14)" stroke-dasharray="3 3"/>`;
      }
      s += `<rect class="hit" x="${x - 4}" y="${y - 6}" width="134" height="58" fill="transparent"/>
        <text x="${x + 64}" y="${base + 10.5}" text-anchor="middle" font-size="9" font-weight="600" fill="#4a2c12" font-family="system-ui,sans-serif" pointer-events="none">${n}</text></g>`;
    }
  }
  s += `<path d="M40,74 H330 L120,774 H40 Z" fill="url(#glare)" pointer-events="none"/><path d="M420,74 H520 L300,774 H230 Z" fill="url(#glare)" opacity=".6" pointer-events="none"/>
  <rect x="34" y="74" width="572" height="700" rx="16" fill="none" stroke="#8fa6c4" stroke-opacity=".35" stroke-width="2" pointer-events="none"/>
  <rect x="610" y="270" width="10" height="240" rx="5" fill="url(#chrome)"/>
  <g stroke="#0a0f16" stroke-width="3" opacity=".7">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(i => `<line x1="${180 + i * 20}" y1="786" x2="${180 + i * 20}" y2="802"/>`).join('')}</g>
  <rect x="60" y="808" width="46" height="20" rx="5" fill="#0b0f15"/><rect x="534" y="808" width="46" height="20" rx="5" fill="#0b0f15"/></svg>`;
  return s;
}

// ---------------------------------------------------------------- vues
const totalValue = () => items().reduce((t, b) => t + (Number(b.estimated_value) || 0) * (b.quantity || 1), 0);
const stat = (n, l) => `<div class="stat glass"><b>${n}</b><span>${l}</span></div>`;
const qty = b => b.quantity || 1;
const sum = a => a.reduce((t, b) => t + qty(b), 0);

function rowHTML(b) {
  const where = b.location_kind === 'cave' ? (b.slot ? slotInfo(b.slot) : 'Cave · à placer') : [KIND_LABEL[b.location_kind], b.place_label].filter(Boolean).join(' · ');
  return `<button class="row bottle" data-id="${b.id}"><span class="dot" style="background:${(GLASS[b.wine_type] || GLASS.Rouge)[0]}"></span>
    <span class="grow"><b>${esc(b.name)}</b> ${b.vintage ? `<span class="muted">${b.vintage}</span>` : ''}<br><small>${esc([b.producer, b.wine_type, b.country].filter(Boolean).join(' · '))}</small></span>
    <span class="where"><small>${esc(where)}${b.position_note ? ` — <i>${esc(b.position_note)}</i>` : ''}</small></span>${b.estimated_value ? `<span class="chip price">${Number(b.estimated_value).toLocaleString('fr-FR')} €</span>` : ''}${qty(b) > 1 ? `<span class="chip">×${qty(b)}</span>` : ''}</button>`;
}

function caveView() {
  const placed = inCave().filter(b => b.slot), loose = inCave().filter(b => !b.slot);
  return `<div class="cave-layout"><div class="cabinetwrap">${cabinetSVG()}</div>
   <div class="cave-side"><div class="card glass"><h3 class="script">Ma cave à vin</h3><p class="muted">28 emplacements · ${placed.length} occupés · ${28 - placed.length} libres. Touchez une bouteille pour voir sa fiche, ou un emplacement libre pour y ranger une bouteille.</p>
     <div class="legend">${TYPES.slice(0, 6).map(t => `<span><i style="background:${GLASS[t][0]}"></i>${t}</span>`).join('')}</div></div>
     <div class="card glass"><h3>À placer dans la cave (${loose.length})</h3>${loose.map(rowHTML).join('') || '<p class="muted">Toutes les bouteilles de la cave ont un emplacement.</p>'}</div></div></div>`;
}

function groupedList(kind) {
  const list = items().filter(b => b.location_kind === kind);
  const groups = {}; list.forEach(b => (groups[b.place_label || 'Sans précision'] ||= []).push(b));
  const note = kind === 'exterieur' ? 'Indiquez la position précise (ex. « 2e rack à gauche, dans la remise »).' : 'Rangement sans position précise : on note seulement le placard ou le carton.';
  return `<div class="card glass"><h3 class="script">${kind === 'placard' ? 'Placards' : 'Extérieur'}</h3><p class="muted">${note}</p>
    <button class="btn primary" data-add="${kind}">＋ Ajouter dans ${kind === 'placard' ? 'un placard' : 'l’extérieur'}</button></div>
    ${Object.entries(groups).map(([g, l]) => `<div class="card glass"><h3>${esc(g)} <span class="chip">${sum(l)} bouteille${sum(l) > 1 ? 's' : ''}</span></h3>${l.map(rowHTML).join('')}</div>`).join('') || `<div class="empty">Rien ici pour le moment.</div>`}`;
}

function filtered() {
  const q = query.toLowerCase();
  return items().filter(b => (!typeFilter || b.wine_type === typeFilter) && (!q || [b.name, b.producer, b.country, b.region, b.vintage, b.place_label].join(' ').toLowerCase().includes(q)))
    .sort((a, b) => (a.producer || a.name).localeCompare(b.producer || b.name, 'fr'));
}
const listHTML = () => filtered().map(rowHTML).join('') || '<div class="empty">Aucune bouteille.</div>';

function inventoryView() {
  const value = items().reduce((t, b) => t + (Number(b.estimated_value) || 0) * qty(b), 0);
  return `<div class="card glass"><div class="toolbar"><input type="search" id="cq" placeholder="Rechercher (domaine, cuvée, région…)" value="${esc(query)}">
    <select id="ctype"><option value="">Tous les types</option>${TYPES.map(t => `<option ${t === typeFilter ? 'selected' : ''}>${t}</option>`).join('')}</select></div>
    <p class="muted small">${filtered().length} référence${filtered().length > 1 ? 's' : ''}${value ? ` · valeur estimée totale ${value.toLocaleString('fr-FR')} €` : ''}</p>
    <div id="clist">${listHTML()}</div></div>`;
}

function html() {
  const all = items();
  const imp = all.length === 0 ? `<div class="card glass accent"><h3 class="script">Premier démarrage</h3><p>Votre export Vivino (36 lignes : 30 bouteilles en cave, le reste en placard) est prêt à être importé.</p><button class="btn primary" id="impCellar">Importer ma cave Vivino</button></div>` : '';
  return `<div class="stats">${stat(sum(all), 'bouteilles')}${stat(inCave().filter(b => b.slot).length + '/28', 'cave à vin')}${stat(sum(all.filter(b => b.location_kind === 'placard')), 'en placard')}${stat(sum(all.filter(b => b.location_kind === 'exterieur')), 'à l’extérieur')}${stat(totalValue() ? totalValue().toLocaleString('fr-FR') + ' €' : '—', 'valeur estimée')}</div>
  ${imp}
  <div class="bar"><div class="seg" id="cseg">${[['cave', 'Cave à vin'], ['placard', 'Placards'], ['exterieur', 'Extérieur'], ['tout', 'Inventaire']].map(([k, l]) => `<button data-v="${k}" class="${view === k ? 'on' : ''}">${l}</button>`).join('')}</div>
   <span class="grow"></span><button class="btn" id="priceBtn">💶 Prix des bouteilles</button><button class="btn" id="cocktailBtn">🍸 Idée de cocktail</button><button class="btn primary" data-add="${view === 'placard' || view === 'exterieur' ? view : 'cave'}">＋ Bouteille</button></div>
  <div id="cview">${view === 'cave' ? caveView() : view === 'tout' ? inventoryView() : groupedList(view)}</div>`;
}

// ---------------------------------------------------------------- formulaires
function bottleFields(b) {
  const taken = new Set(inCave().filter(x => x.slot && x.id !== b.id).map(x => x.slot));
  const slots = [['', '— à placer plus tard —']]; for (let n = 1; n <= 28; n++) if (!taken.has(n)) slots.push([n, `n°${n} · ${slotInfo(n)}`]);
  const places = [...new Set(items().filter(x => x.place_label).map(x => x.place_label))];
  return {
    datalist: `<datalist id="placelist">${['Placard', 'Carton placard', 'En vrac placard de gauche', 'Garage', 'Cellier', ...places].filter((v, i, a) => a.indexOf(v) === i).map(p => `<option value="${esc(p)}">`).join('')}</datalist>`,
    fields: [
      { name: 'name', label: 'Nom / cuvée', required: true, full: true }, { name: 'producer', label: 'Domaine / producteur' },
      { name: 'vintage', label: 'Millésime', type: 'number', placeholder: '2020' },
      { name: 'wine_type', label: 'Type', type: 'select', options: TYPES }, { name: 'category', label: 'Catégorie', type: 'select', options: CATS },
      { name: 'country', label: 'Pays' }, { name: 'region', label: 'Région / appellation' },
      { name: 'bottle_size', label: 'Format', placeholder: '75 cl' }, { name: 'quantity', label: 'Quantité', type: 'number', step: 1 },
      { name: 'location_kind', label: 'Lieu de rangement', type: 'select', options: [['cave', 'Cave à vin (28 emplacements)'], ['placard', 'Placard'], ['exterieur', 'Extérieur']] },
      { name: 'slot', label: 'Emplacement dans la cave', type: 'select', options: slots },
      { name: 'place_label', label: 'Placard / lieu', list: 'placelist', placeholder: 'ex. Carton placard' },
      { name: 'position_note', label: 'Position précise (annotation)', placeholder: 'ex. 2e rack à gauche, en bas', full: true },
      { name: 'purchase_price', label: 'Prix d’achat (€)', type: 'number', step: '0.01' }, { name: 'estimated_value', label: 'Valeur estimée (€)', type: 'number', step: '0.01' },
      { name: 'acquired_on', label: 'Date d’achat', type: 'date' }, { name: 'drinking_window', label: 'Fenêtre de dégustation', placeholder: '2025–2032' },
      { name: 'serving_temperature', label: 'Température de service', placeholder: '16–18 °C' }, { name: 'food_pairing', label: 'Accords mets-vins' },
      { name: 'notes', label: 'Notes de dégustation', type: 'textarea', full: true }, { name: 'vivino_url', label: 'Lien Vivino', full: true },
      { name: 'photo', label: 'Photo (étiquette, bouteille)', type: 'file', full: true },
    ],
  };
}

function editBottle(b = {}, preset = {}) {
  const base = { wine_type: 'Rouge', category: 'Vin', bottle_size: '75 cl', quantity: 1, location_kind: 'cave', ...b, ...preset };
  const { fields, datalist } = bottleFields(b);
  formDialog({
    title: b.id ? 'Modifier la bouteille' : 'Ajouter une bouteille', fields, values: base, extra: datalist, wide: true,
    danger: b.id ? { label: 'Supprimer', confirm: 'Supprimer cette bouteille ?', run: () => db.del('cellar_items', b.id) } : null,
    onMount: (root, form) => {
      const sync = () => {
        const k = form.elements.location_kind.value;
        const show = (name, on) => form.elements[name].closest('label').classList.toggle('hidden', !on);
        show('slot', k === 'cave'); show('place_label', k !== 'cave'); show('position_note', k !== 'placard');
      };
      form.elements.location_kind.onchange = sync; sync();
    },
    onSubmit: async v => {
      const photo = v.photo; delete v.photo;
      if (v.location_kind !== 'cave') v.slot = null; else v.slot = v.slot ? Number(v.slot) : null;
      if (v.location_kind === 'cave') v.place_label = null;
      if (photo) v.photo_url = await db.uploadPhoto(await compressImage(photo), 'bottles');
      v.quantity = v.quantity || 1;
      if (Number(v.estimated_value || 0) !== Number(b.estimated_value || 0)) { v.price_source = v.estimated_value ? 'manual' : null; v.price_updated_at = new Date().toISOString(); }
      if (b.id) await db.patch('cellar_items', b.id, v); else await db.add('cellar_items', v);
      toast('Enregistré — synchronisé sur tous les appareils');
    },
  });
}

function detail(b) {
  const row = (l, v) => v ? `<div class="kv"><span>${l}</span><b>${esc(v)}</b></div>` : '';
  const where = b.location_kind === 'cave' ? (b.slot ? `Cave à vin · ${slotInfo(b.slot)} (n°${b.slot})` : 'Cave à vin · à placer') : [KIND_LABEL[b.location_kind], b.place_label].filter(Boolean).join(' · ');
  openModal(`<div class="detail">
    <div class="detailhead">${b.photo_url ? `<img src="${esc(b.photo_url)}" alt="">` : `<div class="bigdot" style="background:${(GLASS[b.wine_type] || GLASS.Rouge)[0]}"></div>`}
      <div><span class="chip">${esc(b.wine_type)} · ${esc(b.category || '')}</span><h2 class="script">${esc(b.name)}</h2><p class="muted">${esc([b.producer, b.vintage].filter(Boolean).join(' · '))}</p></div></div>
    ${row('Emplacement', where)}${row('Position précise', b.position_note)}${row('Quantité', qty(b) > 1 ? qty(b) : '')}${row('Pays / région', [b.country, b.region].filter(Boolean).join(' · '))}${row('Format', b.bottle_size)}
    ${row('Prix d’achat', b.purchase_price ? b.purchase_price + ' €' : '')}${row('Source du prix', b.price_note)}${row('Valeur estimée (par bouteille)', b.estimated_value ? `${b.estimated_value} €${b.price_updated_at ? ` · ${b.price_source === 'web' ? 'estimation web' : 'saisi'} le ${new Date(b.price_updated_at).toLocaleDateString('fr-FR')}` : ''}` : '')}${row('Date d’achat', b.acquired_on)}
    ${row('À boire', b.drinking_window)}${row('Service', b.serving_temperature)}${row('Accords', b.food_pairing)}${row('Notes', b.notes)}${row('Source du prix', b.price_note)}
    ${b.vivino_url ? `<p><a href="${esc(b.vivino_url)}" target="_blank" rel="noopener">Voir sur Vivino ↗</a></p>` : ''}
    <div class="formactions wrap"><button class="btn" data-act="meal">🍽 Idée de plat</button><button class="btn" data-act="cocktail">🍸 Idée de cocktail</button><span class="grow"></span>
      <button class="btn" data-act="drunk">Bue / sortie</button><button class="btn" data-act="edit">Modifier</button><button class="btn ghost" data-close>Fermer</button></div></div>`, {
    onMount: root => {
      $('[data-close]', root).onclick = closeModal;
      root.onclick = async e => {
        const a = e.target.closest('[data-act]')?.dataset.act; if (!a) return;
        if (a === 'edit') editBottle(b);
        if (a === 'meal') openIdea(() => randomMeal(PAIRING[b.wine_type] || ['Beef']), { title: `Un plat pour « ${b.name} »`, saveCategory: 'Plat' });
        if (a === 'cocktail') openIdea(() => randomCocktail({ ingredient: spiritOf(b) }), { title: `Un cocktail avec « ${b.name} »` });
        if (a === 'drunk') {
          if (!confirm(qty(b) > 1 ? 'Retirer une bouteille ?' : 'Retirer cette bouteille de la cave ?')) return;
          if (qty(b) > 1) await db.patch('cellar_items', b.id, { quantity: qty(b) - 1 }); else await db.del('cellar_items', b.id);
          closeModal(); toast('Santé ! Bouteille retirée');
        }
      };
    },
  });
}

function spiritOf(b) {
  const txt = [b.category, b.name, b.producer].join(' ').toLowerCase();
  const k = Object.keys(SPIRIT_MAP).find(k => txt.includes(k));
  return k ? SPIRIT_MAP[k] : (b.wine_type === 'Effervescent' ? 'Champagne' : null);
}

function pickSlot(n) {
  const loose = inCave().filter(b => !b.slot);
  openModal(`<div class="detail"><h2 class="script">Emplacement ${n}</h2><p class="muted">${slotInfo(n)}</p>
    ${loose.length ? `<h4>Ranger une bouteille existante</h4>${loose.map(rowHTML).join('')}` : ''}
    <div class="formactions"><button class="btn ghost" data-close>Annuler</button><span class="grow"></span><button class="btn primary" id="newHere">＋ Nouvelle bouteille ici</button></div></div>`, {
    onMount: root => {
      $('[data-close]', root).onclick = closeModal;
      $('#newHere', root).onclick = () => editBottle({}, { location_kind: 'cave', slot: n });
      $$('.bottle', root).forEach(el => el.onclick = async () => { await db.patch('cellar_items', el.dataset.id, { slot: n }); closeModal(); toast('Bouteille rangée'); });
    },
  });
}


// ---------------------------------------------------------------- prix (saisie rapide, gratuit)
const priceKey = b => [b.producer, b.name, b.vintage, b.bottle_size].join('|');
const searchUrl = b => 'https://www.google.com/search?tbm=shop&q=' + encodeURIComponent(['vin', b.producer, b.name, b.vintage].filter(Boolean).join(' '));

function priceSheet() {
  const groups = new Map();
  items().forEach(b => { const k = priceKey(b); if (!groups.has(k)) groups.set(k, { b, ids: [] }); groups.get(k).ids.push(b.id); });
  const rows = [...groups.values()].sort((x, y) => (x.b.producer || x.b.name).localeCompare(y.b.producer || y.b.name, 'fr'));
  openModal(`<div class="detail"><h2 class="script">Prix des bouteilles</h2>
    <p class="muted">Prix moyen d’<b>une</b> bouteille, en euros. Le bouton 🔎 ouvre une recherche de prix (Google Shopping) et 🍇 la page Vivino : notez ce que vous trouvez, puis enregistrez. La valeur totale de la cave se recalcule aussitôt.</p>
    <label class="field check"><input type="checkbox" id="onlyMissing"> <span>Afficher seulement les bouteilles sans prix</span></label>
    <div class="pricelist">${rows.map(({ b }) => `<div class="prow2" data-has="${b.estimated_value ? 1 : 0}"><span class="grow"><b>${esc(b.name)}</b> ${b.vintage ? `<span class="muted">${b.vintage}</span>` : ''}<br><small>${esc([b.producer, b.price_updated_at && 'prix du ' + new Date(b.price_updated_at).toLocaleDateString('fr-FR')].filter(Boolean).join(' · '))}</small></span>
      <a class="iconbtn" href="${esc(searchUrl(b))}" target="_blank" rel="noopener" title="Chercher le prix">🔎</a>${b.vivino_url ? `<a class="iconbtn" href="${esc(b.vivino_url)}" target="_blank" rel="noopener" title="Page Vivino">🍇</a>` : ''}
      <input type="number" min="0" step="0.5" inputmode="decimal" data-k="${esc(priceKey(b))}" value="${b.estimated_value ?? ''}" placeholder="—" aria-label="Prix"><span>€</span></div>`).join('')}</div>
    <div class="formactions"><button class="btn ghost" data-close>Annuler</button><span class="grow"></span><button class="btn primary" id="savePrices">Enregistrer les prix</button></div></div>`, {
    wide: true,
    onMount: root => {
      $('[data-close]', root).onclick = closeModal;
      $('#onlyMissing', root).onchange = e => $$('.prow2', root).forEach(r => r.classList.toggle('hidden', e.target.checked && r.dataset.has === '1'));
      $('#savePrices', root).onclick = async e => {
        e.target.disabled = true; let n = 0;
        try {
          for (const inp of $$('input[data-k]', root)) {
            const g = groups.get(inp.dataset.k), val = inp.value === '' ? null : Number(inp.value);
            if (Number(g.b.estimated_value || 0) === Number(val || 0)) continue;
            for (const id of g.ids) await db.patch('cellar_items', id, { estimated_value: val, price_source: val ? 'manual' : null, price_updated_at: new Date().toISOString() });
            n++;
          }
          closeModal(); toast(n ? `${n} prix enregistré${n > 1 ? 's' : ''} — synchronisé` : 'Aucun changement');
        } catch (err) { toast(err.message, 'err'); e.target.disabled = false; }
      };
    },
  });
}

// ---------------------------------------------------------------- événements
function bind(root, rerender) {
  const by = id => items().find(b => b.id === id);
  $('#cseg', root).onclick = e => { const v = e.target.closest('[data-v]')?.dataset.v; if (v) { view = v; rerender(); } };
  root.onclick = e => {
    const slot = e.target.closest('[data-slot]'); if (slot) { const n = +slot.dataset.slot, b = inCave().find(x => x.slot === n); return b ? detail(b) : pickSlot(n); }
    const row = e.target.closest('.bottle'); if (row) return detail(by(row.dataset.id));
    const add = e.target.closest('[data-add]'); if (add) return editBottle({}, { location_kind: add.dataset.add });
  };
  root.onkeydown = e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset?.slot) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click', { bubbles: true })); } };
  $('#priceBtn', root).onclick = priceSheet;
  $('#cocktailBtn', root).onclick = () => {
    const spirits = items().map(spiritOf).filter(Boolean);
    openIdea(() => randomCocktail({ ingredient: spirits.length ? pick(spirits) : null }), { title: 'Un cocktail pour ce soir' });
  };
  const imp = $('#impCellar', root); if (imp) imp.onclick = async () => { imp.disabled = true; imp.textContent = 'Import en cours…'; try { const n = await importCellar(); toast(`${n} lignes importées`); } catch (e) { toast(e.message, 'err'); imp.disabled = false; } };
  const q = $('#cq', root); if (q) q.oninput = () => { query = q.value; $('#clist', root).innerHTML = listHTML(); };
  const t = $('#ctype', root); if (t) t.onchange = () => { typeFilter = t.value; rerender(); };
}

return { TYPES, html, editBottle, bind };
})();
// ===== menus.js =====
__m.menus = (() => {
// Module Menus & courses : semaine du samedi au vendredi, propositions automatiques, liste de courses
const { $, $$, esc, toast, openModal, closeModal, formDialog, ymd, parseYmd, addDays, weekStartSaturday, fmtLong, fmtShort, shuffle, pick, DAYS, guessShop } = __m.util;
const db = __m.db;
const { randomMeal, MEAL_CATS, translateIdea } = __m.ext;
const { addIngredients } = __m.shopping;
const { scoreRecipe, seasonalNames, MONTHS } = __m.season;
const { openRecipe } = __m.recipes;
const { openIdea, saveIdeaAsRecipe } = __m.ideas;

const today = new Date();
// le vendredi, on prépare déjà la semaine qui commence demain
let weekStart = weekStartSaturday(today.getDay() === 5 ? addDays(today, 1) : today);
const plans = () => db.store.t.meal_plans;
const recipes = () => db.store.t.recipes;
const recipeById = id => recipes().find(r => r.id === id);
const TYPE_LABEL = { midi: 'Déjeuner', soir: 'Dîner' };

const weekDays = ws => Array.from({ length: 7 }, (_, i) => addDays(ws, i));
const typesOf = d => (d.getDay() === 6 || d.getDay() === 0 ? ['midi', 'soir'] : ['soir']);
const planAt = (date, type) => plans().find(p => p.meal_date === date && p.meal_type === type);

// ---------------------------------------------------------------- page
function mealCell(d, type) {
  const p = planAt(ymd(d), type), r = p?.recipe_id ? recipeById(p.recipe_id) : null;
  return `<div class="meal ${p ? 'filled' : ''}" data-date="${ymd(d)}" data-type="${type}">
    <small class="mtype">${TYPE_LABEL[type]}</small>
    ${p ? `<div class="mrow">${r?.photo_url ? `<img src="${esc(r.photo_url)}" alt="" loading="lazy">` : ''}<span><b>${esc(p.title || r?.title || 'Repas')}</b><small>${p.servings || 3} pers.</small></span></div>` : '<span class="plus">＋</span>'}</div>`;
}

function shoppingHTML() {
  const list = [...db.store.t.shopping_items].sort((a, b) => (a.shop || '').localeCompare(b.shop || '') || a.name.localeCompare(b.name, 'fr'));
  const shops = [...new Set(list.map(i => i.shop || 'Supermarché'))];
  const checked = list.filter(i => i.checked).length;
  return `<div class="card glass"><div class="sectionhead"><h3 class="script">Liste de courses</h3><span><button class="btn small" id="reshop">↻ Reclasser marché / supermarché</button> ${checked ? `<button class="btn small" id="clearChecked">Retirer les ${checked} cochés</button>` : ''}</span></div>
    <form id="shopForm" class="inlineform"><input name="name" placeholder="Ajouter un article…" required><select name="shop"><option>Marché</option><option selected>Supermarché</option></select><button class="btn primary">Ajouter</button></form>
    ${shops.map(s => `<h4>${s === 'Marché' ? '🥕' : '🛒'} ${esc(s)}</h4>${list.filter(i => (i.shop || 'Supermarché') === s).map(i => `<div class="shopitem ${i.checked ? 'done' : ''}"><button class="tick" data-check="${i.id}" aria-label="Cocher">${i.checked ? '✓' : ''}</button><span class="grow">${esc(i.name)}${i.recipe_title ? `<small> · ${esc(i.recipe_title)}</small>` : ''}</span><button class="x" data-rm="${i.id}" aria-label="Supprimer">×</button></div>`).join('')}`).join('') || '<div class="empty">La liste est vide.</div>'}</div>`;
}

function html() {
  const days = weekDays(weekStart);
  const empty = !days.some(d => planAt(ymd(d), 'soir'));
  const banner = today.getDay() === 5 && ymd(weekStart) === ymd(weekStartSaturday(addDays(today, 1))) && empty
    ? `<div class="card glass accent"><b>C’est vendredi !</b> On prépare les menus de la semaine qui commence demain ? <button class="btn primary" data-propose>✨ Proposer les menus</button></div>` : '';
  return `${banner}<div class="bar"><div class="seg"><button id="wprev" aria-label="Semaine précédente">‹</button><button id="wnow">Cette semaine</button><button id="wnext" aria-label="Semaine suivante">›</button></div>
    <b class="weeklabel">${fmtShort(weekStart)} → ${fmtShort(addDays(weekStart, 6))}</b><span class="grow"></span>
    <button class="btn" id="weekShop">🛒 Courses de la semaine</button><button class="btn primary" data-propose>✨ Proposer les menus</button></div>
  <div class="week">${days.map(d => `<div class="daycard glass ${ymd(d) === ymd(today) ? 'today' : ''}"><h4>${esc(fmtLong(d))}</h4>${typesOf(d).map(t => mealCell(d, t)).join('')}</div>`).join('')}</div>
  <p class="muted small">🥕 De saison en ${MONTHS[seasonMonth() - 1]} : ${esc(seasonalNames(seasonMonth()).join(', '))}.</p>
  <p class="muted small">Chaque dîner est prévu pour 3 personnes. Novembre à mars : soupe le dimanche et le lundi soir. Les propositions utilisent d’abord votre carnet, en évitant ce que vous avez cuisiné ces trois dernières semaines.</p>
  ${shoppingHTML()}`;
}

// ---------------------------------------------------------------- édition d'un repas
function editSlot(date, type) {
  const p = planAt(date, type);
  formDialog({
    title: `${TYPE_LABEL[type]} — ${fmtLong(parseYmd(date))}`,
    fields: [
      { name: 'recipe_id', label: 'Recette du carnet', type: 'select', full: true, options: [['', '— titre libre —'], ...[...recipes()].sort((a, b) => a.title.localeCompare(b.title, 'fr')).map(r => [r.id, r.title])] },
      { name: 'title', label: 'Ou titre libre', placeholder: 'ex. Restaurant, restes, pizza…', full: true }, { name: 'servings', label: 'Portions', type: 'number' },
    ],
    values: { recipe_id: p?.recipe_id || '', title: p?.recipe_id ? '' : p?.title, servings: p?.servings || 3 },
    extra: p?.recipe_id ? '<p><button type="button" class="btn small" id="openR">Voir la recette</button></p>' : '',
    onMount: root => { const b = $('#openR', root); if (b) b.onclick = () => openRecipe(p.recipe_id); },
    danger: p ? { label: 'Retirer ce repas', confirm: 'Retirer ce repas du menu ?', run: () => db.del('meal_plans', p.id) } : null,
    onSubmit: async v => {
      const r = v.recipe_id ? recipeById(v.recipe_id) : null;
      const row = { recipe_id: r?.id || null, title: r?.title || v.title, servings: v.servings || 3 };
      if (!row.title) throw new Error('Choisissez une recette ou saisissez un titre');
      if (p) await db.patch('meal_plans', p.id, row); else await db.add('meal_plans', { ...row, meal_date: date, meal_type: type });
    },
  });
}

// ---------------------------------------------------------------- propositions
const isSoup = r => /soupe|velout|potage|bouillon/i.test(r.title);
let prop = [], propWeb = false;

function pools() {
  const mine = recipes().filter(r => !/^cocktail/i.test(r.category || ''));
  const recent = new Set(plans().filter(p => p.recipe_id && parseYmd(p.meal_date) >= addDays(weekStart, -21) && parseYmd(p.meal_date) < weekStart).map(p => p.recipe_id));
  return {
    recent, soups: mine.filter(isSoup),
    dinners: mine.filter(r => (r.category === 'Plat' || !r.category) && !isSoup(r)),
    lunches: mine.filter(r => ['Brunch', 'Apéro', 'Entrée'].includes(r.category) || (r.category === 'Plat' && r.total_minutes && r.total_minutes <= 30 && !isSoup(r))),
  };
}
const seasonMonth = () => addDays(weekStart, 3).getMonth() + 1;
// tirage pondéré : les recettes riches en fruits et légumes de saison sont favorisées, celles hors saison pénalisées
function pickFrom(pool, used, recent) {
  const free = pool.filter(r => !used.has(r.id));
  const fresh = free.filter(r => !recent.has(r.id));
  const base = fresh.length ? fresh : free;
  if (!base.length) return null;
  const m = seasonMonth();
  const w = base.map(r => Math.max(0.15, 1 + 0.7 * scoreRecipe(r, m).score + (r.favorite ? 0.5 : 0)));
  let x = Math.random() * w.reduce((a, b) => a + b, 0);
  for (let i = 0; i < base.length; i++) { x -= w[i]; if (x <= 0) return base[i]; }
  return base[base.length - 1];
}
const fromRecipe = (date, type, r, servings = 3) => ({ date, type, servings, recipe_id: r?.id || null, title: r?.title || '', photo_url: r?.photo_url || null, web: null, seasonal: r ? scoreRecipe(r, seasonMonth()).hits : [] });

async function buildProposal(withWeb) {
  const { recent, soups, dinners, lunches } = pools();
  const used = new Set(), out = [];
  const winter = [10, 11, 0, 1, 2].includes(weekStart.getMonth()) || [10, 11, 0, 1, 2].includes(addDays(weekStart, 6).getMonth());
  const soup = winter ? pickFrom(soups, new Set(), recent) : null;
  for (const d of weekDays(weekStart)) for (const type of typesOf(d)) {
    const date = ymd(d), dow = d.getDay();
    if (winter && type === 'soir' && (dow === 0 || dow === 1)) { // soupe dimanche + lundi (6 portions au total)
      out.push(soup ? fromRecipe(date, type, soup) : { date, type, servings: 3, recipe_id: null, title: 'Soupe maison', photo_url: null, web: null });
      continue;
    }
    const pool = type === 'midi' ? (lunches.length ? lunches : dinners) : dinners;
    const r = pickFrom(pool, used, recent); if (r) used.add(r.id);
    out.push(fromRecipe(date, type, r));
  }
  if (withWeb) { // 2 dîners en idées internet (mercredi et vendredi par défaut)
    const targets = out.filter(e => e.type === 'soir' && [3, 5].includes(parseYmd(e.date).getDay()));
    await Promise.all(targets.map(async e => { try { await setWeb(e); } catch (err) { console.warn(err); } }));
  }
  return out;
}
async function setWeb(e) {
  const idea = await translateIdea(await randomMeal(MEAL_CATS['Plat'], prop.filter(x => x.web).map(x => x.web.id)));
  Object.assign(e, { web: idea, recipe_id: null, title: idea.title, photo_url: idea.photo_url });
}

const entryRow = (e, i) => `<div class="prow"><span class="pday">${esc(fmtShort(parseYmd(e.date)))}<small>${TYPE_LABEL[e.type]}</small></span>
  ${e.photo_url ? `<img src="${esc(e.photo_url)}" alt="">` : '<span class="thumb"></span>'}
  <span class="grow"><b>${esc(e.title || '— rien de trouvé —')}</b>${e.web ? '<small><span class="chip">idée internet</span></small>' : e.recipe_id ? `<small>de votre carnet${e.seasonal?.length ? ` · 🌿 de saison : ${esc(e.seasonal.slice(0, 3).join(', '))}` : ''}</small>` : ''}</span>
  <button class="iconbtn" data-reroll="${i}" aria-label="Autre proposition">↻</button><button class="iconbtn" data-drop="${i}" aria-label="Retirer">×</button></div>`;

async function showProposal() {
  openModal(`<div class="detail"><h2 class="script">Menus de la semaine</h2><div class="loading"><span class="spinner"></span> Je prépare des propositions…</div></div>`, { wide: true });
  prop = [];
  prop = await buildProposal(propWeb);
  paintProposal();
}
function paintProposal() {
  openModal(`<div class="detail"><h2 class="script">Menus de la semaine</h2><p class="muted">Du ${esc(fmtShort(weekStart))} au ${esc(fmtShort(addDays(weekStart, 6)))} Changez ce qui ne vous plaît pas avec ↻, puis validez.</p>
    ${prop.map(entryRow).join('')}
    <label class="field check"><input type="checkbox" id="pWeb" ${propWeb ? 'checked' : ''}> <span>Inclure 2 idées de recettes trouvées sur internet</span></label>
    <label class="field check"><input type="checkbox" id="pOver"> <span>Remplacer les repas déjà planifiés</span></label>
    <label class="field check"><input type="checkbox" id="pShop" checked> <span>Ajouter les ingrédients à la liste de courses</span></label>
    <div class="formactions wrap"><button class="btn ghost" data-close>Annuler</button><span class="grow"></span><button class="btn" id="pAgain">↻ Tout régénérer</button><button class="btn primary" id="pOk">Valider ces menus</button></div></div>`, {
    wide: true,
    onMount: root => {
      $('[data-close]', root).onclick = closeModal;
      $('#pWeb', root).onchange = e => { propWeb = e.target.checked; showProposal(); };
      $('#pAgain', root).onclick = showProposal;
      root.onclick = async e => {
        const rr = e.target.closest('[data-reroll]'), dr = e.target.closest('[data-drop]');
        if (dr) { prop.splice(+dr.dataset.drop, 1); return paintProposal(); }
        if (!rr) return;
        const en = prop[+rr.dataset.reroll]; rr.disabled = true;
        try {
          if (en.web) await setWeb(en);
          else {
            const { recent, dinners, lunches } = pools(); const used = new Set(prop.map(x => x.recipe_id).filter(Boolean));
            const r = pickFrom(en.type === 'midi' && lunches.length ? lunches : dinners, used, recent);
            if (r) Object.assign(en, fromRecipe(en.date, en.type, r));
          }
        } catch (err) { toast(err.message, 'err'); }
        paintProposal();
      };
      $('#pOk', root).onclick = async ev => { ev.target.disabled = true; try { await validateProposal($('#pOver', root).checked, $('#pShop', root).checked); } catch (err) { toast(err.message, 'err'); ev.target.disabled = false; } };
    },
  });
}

async function validateProposal(overwrite, shop) {
  let added = 0, ingredients = 0; const rows = [];
  for (const e of prop) {
    if (!e.title) continue;
    const ex = planAt(e.date, e.type);
    if (ex && !overwrite) continue;
    if (ex) await db.del('meal_plans', ex.id);
    let recipe = e.recipe_id ? recipeById(e.recipe_id) : null;
    if (e.web) recipe = await saveIdeaAsRecipe(e.web, 'Plat'); // l'idée internet entre dans le carnet
    rows.push({ meal_date: e.date, meal_type: e.type, recipe_id: recipe?.id || null, title: recipe?.title || e.title, servings: e.servings });
    if (shop && recipe) ingredients += await addIngredients(recipe);
  }
  added = (await db.addMany('meal_plans', rows)).length;
  closeModal(); toast(`${added} repas planifiés${shop ? ` · ${ingredients} ingrédients ajoutés aux courses` : ''}`);
}

// ---------------------------------------------------------------- événements
function bind(root, rerender) {
  $('#wprev', root).onclick = () => { weekStart = addDays(weekStart, -7); rerender(); };
  $('#wnext', root).onclick = () => { weekStart = addDays(weekStart, 7); rerender(); };
  $('#wnow', root).onclick = () => { weekStart = weekStartSaturday(today.getDay() === 5 ? addDays(today, 1) : today); rerender(); };
  $$('[data-propose]', root).forEach(b => b.onclick = () => showProposal());
  $('#weekShop', root).onclick = async () => {
    let n = 0; const ids = new Set(weekDays(weekStart).flatMap(d => plans().filter(p => p.meal_date === ymd(d) && p.recipe_id).map(p => p.recipe_id)));
    for (const id of ids) { const r = recipeById(id); if (r) n += await addIngredients(r); }
    toast(ids.size ? `${n} ingrédient${n > 1 ? 's' : ''} ajouté${n > 1 ? 's' : ''} à la liste` : 'Aucune recette planifiée cette semaine');
  };
  root.onclick = async e => {
    const m = e.target.closest('.meal'); if (m) return editSlot(m.dataset.date, m.dataset.type);
    const c = e.target.closest('[data-check]'); if (c) { const it = db.store.t.shopping_items.find(i => i.id === c.dataset.check); return db.patch('shopping_items', it.id, { checked: !it.checked }); }
    const x = e.target.closest('[data-rm]'); if (x) return db.del('shopping_items', x.dataset.rm);
    if (e.target.id === 'reshop') { let n = 0; for (const i of db.store.t.shopping_items) { const sh = guessShop(i.name); if (sh !== i.shop) { await db.patch('shopping_items', i.id, { shop: sh }); n++; } } return toast(n ? `${n} article${n > 1 ? 's' : ''} reclassé${n > 1 ? 's' : ''}` : 'Tout est déjà bien classé'); }
    if (e.target.id === 'clearChecked') for (const i of db.store.t.shopping_items.filter(i => i.checked)) await db.del('shopping_items', i.id);
  };
  $('#shopForm', root).onsubmit = async e => {
    e.preventDefault(); const f = e.target;
    await db.add('shopping_items', { name: f.elements.name.value.trim(), shop: f.elements.shop.value, checked: false }); f.reset(); f.elements.name.focus();
  };
}

return { html, bind };
})();
// ===== misc.js =====
__m.misc = (() => {
// Modules : Accueil, Agenda, Playlists, Maison
const { $, $$, esc, toast, formDialog, ymd, parseYmd, addDays, fmtLong, fmtTime, toLocalInput, PEOPLE } = __m.util;
const db = __m.db;

const t = k => db.store.t[k];
const pIndex = o => Math.max(0, PEOPLE.indexOf(o));

// ================================================================ ACCUEIL
const home = {
  html(user) {
    const now = new Date(), key = ymd(now);
    const h = now.getHours(), hello = h < 5 || h >= 18 ? 'Bonsoir' : 'Bonjour';
    const meals = t('meal_plans').filter(p => p.meal_date === key).sort((a, b) => (a.meal_type === 'midi' ? -1 : 1) - (b.meal_type === 'midi' ? -1 : 1));
    const events = t('family_events').filter(e => e.starts_at && new Date(e.starts_at) >= new Date(now.getFullYear(), now.getMonth(), now.getDate())).sort((a, b) => a.starts_at.localeCompare(b.starts_at)).slice(0, 5);
    const todo = t('shopping_items').filter(i => !i.checked).length;
    const bottles = t('cellar_items').reduce((n, b) => n + (b.quantity || 1), 0);
    const tile = (go, icon, title, desc) => `<button class="tile glass" data-go="${go}"><span class="ico">${icon}</span><b>${title}</b><small>${desc}</small></button>`;
    return `<div class="hero glass"><p class="script big">${hello}${db.store.displayName ? ' ' + esc(db.store.displayName[0].toUpperCase() + db.store.displayName.slice(1)) : ''},</p><p>le carnet de bord d’Emilie, Alexandre, Hugo & Gaspard.</p>
      <div class="bar"><button class="btn primary" data-go="menus">✨ Préparer les menus de la semaine</button><button class="btn" data-go="recipes">Trouver une idée de recette</button></div></div>
    <div class="grid2">
     <div class="card glass"><h3 class="script">Aujourd’hui à table</h3>${meals.map(m => `<div class="row"><span class="chip">${m.meal_type === 'midi' ? 'Déjeuner' : 'Dîner'}</span><b class="grow">${esc(m.title || '')}</b></div>`).join('') || '<p class="muted">Rien de planifié aujourd’hui.</p>'}</div>
     <div class="card glass"><h3 class="script">À venir</h3>${events.map(e => `<div class="row"><span class="dot p${pIndex(e.owner)}"></span><span class="grow"><b>${esc(e.title)}</b><br><small>${esc(fmtLong(new Date(e.starts_at)))} · ${esc(fmtTime(e.starts_at))}</small></span></div>`).join('') || '<p class="muted">Aucun rendez-vous à venir.</p>'}</div>
    </div>
    <div class="stats"><div class="stat glass"><b>${t('recipes').length}</b><span>recettes</span></div><div class="stat glass"><b>${bottles}</b><span>bouteilles</span></div><div class="stat glass"><b>${todo}</b><span>courses à faire</span></div></div>
    <div class="tiles">${tile('cellar', '🍷', 'Cave & spiritueux', 'Cave à vin, placards, extérieur')}${tile('recipes', '📖', 'Recettes', 'Carnet, idées, cocktails')}${tile('menus', '🍽', 'Menus & courses', 'Du samedi au vendredi')}${tile('agenda', '🗓', 'Agenda', 'Les rendez-vous de tous')}${tile('music', '🎵', 'Playlists', 'Spotify en famille')}${tile('homebook', '🏡', 'Maison', 'Notes & infos utiles')}</div>`;
  },
  bind(root, _rerender, go) { $$('[data-go]', root).forEach(b => (b.onclick = () => go(b.dataset.go))); },
};

// ================================================================ AGENDA
let month = new Date(); month.setDate(1);
const agenda = {
  html() {
    const first = new Date(month.getFullYear(), month.getMonth(), 1), pad = (first.getDay() + 6) % 7;
    const start = addDays(first, -pad), key = ymd(new Date());
    const byDay = {}; t('family_events').forEach(e => { if (e.starts_at) (byDay[ymd(new Date(e.starts_at))] ||= []).push(e); });
    const cells = Array.from({ length: 42 }, (_, i) => addDays(start, i));
    const monthEvents = t('family_events').filter(e => e.starts_at && new Date(e.starts_at).getMonth() === month.getMonth() && new Date(e.starts_at).getFullYear() === month.getFullYear()).sort((a, b) => a.starts_at.localeCompare(b.starts_at));
    return `<div class="bar"><div class="seg"><button id="mprev" aria-label="Mois précédent">‹</button><button id="mnow">Aujourd’hui</button><button id="mnext" aria-label="Mois suivant">›</button></div>
      <b class="weeklabel">${esc(month.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }))}</b><span class="grow"></span><button class="btn primary" id="addEv">＋ Rendez-vous</button></div>
      <div class="legend">${PEOPLE.map((p, i) => `<span><i class="p${i}"></i>${p}</span>`).join('')}</div>
      <div class="month glass">${['lun', 'mar', 'mer', 'jeu', 'ven', 'sam', 'dim'].map(d => `<div class="dow">${d}</div>`).join('')}
      ${cells.map(d => `<button class="day ${d.getMonth() !== month.getMonth() ? 'off' : ''} ${ymd(d) === key ? 'today' : ''}" data-day="${ymd(d)}"><span>${d.getDate()}</span><div class="dots">${(byDay[ymd(d)] || []).slice(0, 4).map(e => `<i class="p${pIndex(e.owner)}"></i>`).join('')}</div></button>`).join('')}</div>
      <div class="card glass"><h3 class="script">Ce mois-ci</h3>${monthEvents.map(e => `<button class="row evrow" data-ev="${e.id}"><span class="dot p${pIndex(e.owner)}"></span><span class="grow"><b>${esc(e.title)}</b><br><small>${esc(fmtLong(new Date(e.starts_at)))} · ${esc(fmtTime(e.starts_at))} · ${esc(e.owner || '')}</small></span></button>`).join('') || '<p class="muted">Aucun rendez-vous ce mois-ci.</p>'}
      <p class="muted small">La synchronisation avec Google Agenda n’est pas encore branchée : les rendez-vous saisis ici sont partagés entre vos appareils.</p></div>`;
  },
  bind(root, rerender) {
    $('#mprev', root).onclick = () => { month = new Date(month.getFullYear(), month.getMonth() - 1, 1); rerender(); };
    $('#mnext', root).onclick = () => { month = new Date(month.getFullYear(), month.getMonth() + 1, 1); rerender(); };
    $('#mnow', root).onclick = () => { month = new Date(); month.setDate(1); rerender(); };
    $('#addEv', root).onclick = () => editEvent({}, ymd(new Date()));
    root.onclick = e => {
      const d = e.target.closest('[data-day]'); if (d) return editEvent({}, d.dataset.day);
      const ev = e.target.closest('[data-ev]'); if (ev) return editEvent(t('family_events').find(x => x.id === ev.dataset.ev));
    };
  },
};

function editEvent(ev = {}, day) {
  formDialog({
    title: ev.id ? 'Modifier le rendez-vous' : 'Nouveau rendez-vous',
    fields: [{ name: 'title', label: 'Intitulé', required: true, full: true }, { name: 'owner', label: 'Pour', type: 'select', options: PEOPLE },
      { name: 'starts_at', label: 'Début', type: 'datetime-local', required: true }, { name: 'ends_at', label: 'Fin', type: 'datetime-local' }],
    values: { owner: 'Famille', ...ev, starts_at: ev.starts_at ? toLocalInput(ev.starts_at) : `${day}T09:00`, ends_at: ev.ends_at ? toLocalInput(ev.ends_at) : '' },
    danger: ev.id ? { label: 'Supprimer', confirm: 'Supprimer ce rendez-vous ?', run: () => db.del('family_events', ev.id) } : null,
    onSubmit: async v => {
      const row = { title: v.title, owner: v.owner, starts_at: new Date(v.starts_at).toISOString(), ends_at: v.ends_at ? new Date(v.ends_at).toISOString() : null };
      if (ev.id) await db.patch('family_events', ev.id, row); else await db.add('family_events', row);
    },
  });
}

// ================================================================ PLAYLISTS
const music = {
  html() {
    return `<div class="bar"><span class="muted">Les liens Spotify s’ouvrent directement dans l’appli Spotify ou Safari.</span><span class="grow"></span><button class="btn primary" id="addPl">＋ Playlist</button></div>
      <div class="plgrid">${t('playlists').map(p => `<div class="card glass pl"><span class="ico">🎵</span><div class="grow"><b>${esc(p.title)}</b><br><small>${esc(p.owner || 'Famille')}</small></div><a class="btn primary small" href="${esc(p.spotify_url)}" target="_blank" rel="noopener">Écouter ↗</a><button class="iconbtn" data-edit="${p.id}" aria-label="Modifier">⋯</button></div>`).join('') || '<div class="empty">Ajoutez le lien de vos playlists Spotify.</div>'}</div>`;
  },
  bind(root) {
    const edit = (p = {}) => formDialog({
      title: p.id ? 'Modifier la playlist' : 'Nouvelle playlist', values: { owner: 'Famille', ...p },
      fields: [{ name: 'title', label: 'Nom', required: true, full: true }, { name: 'spotify_url', label: 'Lien Spotify', required: true, full: true, placeholder: 'https://open.spotify.com/playlist/…' }, { name: 'owner', label: 'À qui', type: 'select', options: PEOPLE }],
      danger: p.id ? { label: 'Supprimer', confirm: 'Supprimer cette playlist ?', run: () => db.del('playlists', p.id) } : null,
      onSubmit: async v => { if (!/^https?:\/\//.test(v.spotify_url)) throw new Error('Le lien doit commencer par https://'); if (p.id) await db.patch('playlists', p.id, v); else await db.add('playlists', v); },
    });
    $('#addPl', root).onclick = () => edit();
    root.onclick = e => { const b = e.target.closest('[data-edit]'); if (b) edit(t('playlists').find(x => x.id === b.dataset.edit)); };
  },
};

// ================================================================ MAISON
const homebook = {
  html() {
    return `<div class="card glass accent"><b>Espace de notes partagé.</b> Pratique pour les garanties, contacts d’artisans, codes d’appareils ménagers… N’y saisissez pas d’informations financières ou très sensibles (mots de passe, numéros de compte).</div>
      <div class="bar"><span class="grow"></span><button class="btn primary" id="addNote">＋ Note</button></div>
      <div class="notes">${[...t('family_notes')].sort((a, b) => (b.created_at || '').localeCompare(a.created_at || '')).map(n => `<button class="note glass" data-note="${n.id}"><b class="script">${esc(n.title || 'Sans titre')}</b><p>${esc((n.body || '').slice(0, 220))}</p></button>`).join('') || '<div class="empty">Aucune note pour le moment.</div>'}</div>`;
  },
  bind(root) {
    const edit = (n = {}) => formDialog({
      title: n.id ? 'Modifier la note' : 'Nouvelle note', values: n,
      fields: [{ name: 'title', label: 'Titre', required: true, full: true }, { name: 'body', label: 'Note', type: 'textarea', rows: 8, full: true }],
      danger: n.id ? { label: 'Supprimer', confirm: 'Supprimer cette note ?', run: () => db.del('family_notes', n.id) } : null,
      onSubmit: async v => { if (n.id) await db.patch('family_notes', n.id, v); else await db.add('family_notes', v); },
    });
    $('#addNote', root).onclick = () => edit();
    root.onclick = e => { const b = e.target.closest('[data-note]'); if (b) edit(t('family_notes').find(x => x.id === b.dataset.note)); };
  },
};

return { home, agenda, music, homebook };
})();
// ===== app.js =====
__m.app = (() => {
// Point d'entrée : connexion, navigation, synchronisation
const { $, $$, esc, toast } = __m.util;
const db = __m.db;
const cellar = __m.cellar;
const recipes = __m.recipes;
const menus = __m.menus;
const { home, agenda, music, homebook } = __m.misc;

const PAGES = {
  home: { icon: '⌂', label: 'Accueil', title: 'Bonjour à tous', mod: home, tables: ['meal_plans', 'family_events', 'shopping_items', 'recipes', 'cellar_items'] },
  cellar: { icon: '🍷', label: 'Cave & spiritueux', title: 'Notre cave', mod: cellar, tables: ['cellar_items'] },
  recipes: { icon: '📖', label: 'Recettes', title: 'Le carnet de recettes', mod: recipes, tables: ['recipes'] },
  menus: { icon: '🍽', label: 'Menus & courses', title: 'À table !', mod: menus, tables: ['meal_plans', 'shopping_items', 'recipes'] },
  agenda: { icon: '🗓', label: 'Agenda', title: 'L’agenda familial', mod: agenda, tables: ['family_events'] },
  music: { icon: '🎵', label: 'Playlists', title: 'Nos playlists', mod: music, tables: ['playlists'] },
  homebook: { icon: '🏡', label: 'Maison', title: 'La maison', mod: homebook, tables: ['family_notes'] },
};
let page = 'home';
try { const p = localStorage.getItem('family-page'); if (PAGES[p]) page = p; } catch (e) { /* ignore */ }

// ---------------------------------------------------------------- affichage
function go(p) { page = p; try { localStorage.setItem('family-page', p); } catch (e) { /* ignore */ } render(); window.scrollTo({ top: 0 }); }

function render() {
  const P = PAGES[page], root = $('#content');
  $$('#nav button').forEach(b => b.classList.toggle('active', b.dataset.page === page));
  $('#heading').textContent = P.title;
  root.innerHTML = P.mod.html();
  P.mod.bind(root, render, go);
}

let renderTimer;
function scheduleRender(table) {
  if (table === '_sync') return paintSync();
  if (table !== '*' && !PAGES[page].tables.includes(table)) return;
  clearTimeout(renderTimer);
  renderTimer = setTimeout(() => {
    const a = document.activeElement;
    if (a && $('#content').contains(a) && /input|textarea|select/i.test(a.tagName)) return; // ne pas interrompre une saisie
    if (!$('#appShell').classList.contains('hidden')) { const y = window.scrollY; render(); window.scrollTo({ top: y }); }
  }, 60);
}

function paintSync() {
  const m = { live: ['● Synchronisé', 'live'], connecting: ['● Connexion…', 'wait'], offline: ['● Hors ligne', 'off'] }[db.store.sync];
  ['syncBadge', 'syncBadge2'].forEach(id => { const el = $('#' + id); el.textContent = m[0]; el.className = 'sync ' + m[1]; });
}

function showLogin(msg = '') {
  $('#appShell').classList.add('hidden'); $('#loginScreen').classList.remove('hidden'); $('#loginMessage').textContent = msg;
}

// ---------------------------------------------------------------- session
async function enter(user) {
  db.store.user = user;
  $('#loginScreen').classList.add('hidden'); $('#appShell').classList.remove('hidden');
  $('#signedInAs').textContent = user.email || '';
  $('#banner').innerHTML = '';
  render(); paintSync();
  try {
    if (!(await db.loadFamily())) {
      $('#banner').innerHTML = `<div class="card glass warn"><b>Votre compte n’est rattaché à aucune famille.</b> Exécutez le script <code>supabase/002_family_sync.sql</code> dans le SQL Editor de Supabase, puis rechargez la page.</div>`;
      return;
    }
    await db.loadAll();
    db.startRealtime();
  } catch (e) {
    console.error(e);
    const missing = /relation|does not exist|schema cache|permission|42P01|PGRST/i.test(e.message || '');
    $('#banner').innerHTML = `<div class="card glass warn"><b>Impossible de charger les données.</b> ${missing ? 'Les tables ne sont pas prêtes : exécutez <code>supabase/002_family_sync.sql</code> dans le SQL Editor de Supabase.' : esc(e.message || '')}</div>`;
    db.startRealtime();
  }
}

async function boot() {
  $('#nav').innerHTML = Object.entries(PAGES).map(([k, p]) => `<button data-page="${k}"><span class="ico">${p.icon}</span><span>${p.label}</span></button>`).join('');
  $('#nav').onclick = e => { const b = e.target.closest('[data-page]'); if (b) go(b.dataset.page); };
  $('#dlg').addEventListener('click', e => { if (e.target.id === 'dlg') $('#dlg').close(); }); // clic hors de la fenêtre
  db.onChange(scheduleRender);

  const sb = db.createClientFromConfig();
  if (!sb) return showLogin(db.store.configError || 'Configuration Supabase à vérifier dans config.js');

  $('#loginForm').onsubmit = async e => {
    e.preventDefault(); $('#loginMessage').textContent = 'Connexion…';
    const { data, error } = await sb.auth.signInWithPassword({ email: $('#email').value.trim(), password: $('#password').value });
    if (error) $('#loginMessage').textContent = /invalid login/i.test(error.message) ? 'E-mail ou mot de passe incorrect.' : error.message; else enter(data.user);
  };
  $('#logoutBtn').onclick = async () => { db.stopRealtime(); await sb.auth.signOut(); db.clearCache(); db.store.user = null; showLogin(); };

  $("#loginMessage").textContent = "";
  const { data: { session } } = await sb.auth.getSession();
  if (session) enter(session.user); else showLogin();
}
boot();

})();
})();
