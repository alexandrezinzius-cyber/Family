// Module Menus & courses : semaine du samedi au vendredi, propositions automatiques, liste de courses
import { $, $$, esc, toast, openModal, closeModal, formDialog, ymd, parseYmd, addDays, weekStartSaturday, fmtLong, fmtShort, shuffle, pick, DAYS } from './util.js';
import * as db from './db.js';
import { randomMeal, MEAL_CATS, translateIdea } from './ext.js';
import { addIngredients } from './shopping.js';
import { openRecipe } from './recipes.js';
import { openIdea, saveIdeaAsRecipe } from './ideas.js';

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
  return `<div class="card glass"><div class="sectionhead"><h3 class="script">Liste de courses</h3>${checked ? `<button class="btn small" id="clearChecked">Retirer les ${checked} cochés</button>` : ''}</div>
    <form id="shopForm" class="inlineform"><input name="name" placeholder="Ajouter un article…" required><select name="shop"><option>Marché</option><option selected>Supermarché</option></select><button class="btn primary">Ajouter</button></form>
    ${shops.map(s => `<h4>${s === 'Marché' ? '🥕' : '🛒'} ${esc(s)}</h4>${list.filter(i => (i.shop || 'Supermarché') === s).map(i => `<div class="shopitem ${i.checked ? 'done' : ''}"><button class="tick" data-check="${i.id}" aria-label="Cocher">${i.checked ? '✓' : ''}</button><span class="grow">${esc(i.name)}${i.recipe_title ? `<small> · ${esc(i.recipe_title)}</small>` : ''}</span><button class="x" data-rm="${i.id}" aria-label="Supprimer">×</button></div>`).join('')}`).join('') || '<div class="empty">La liste est vide.</div>'}</div>`;
}

export function html() {
  const days = weekDays(weekStart);
  const empty = !days.some(d => planAt(ymd(d), 'soir'));
  const banner = today.getDay() === 5 && ymd(weekStart) === ymd(weekStartSaturday(addDays(today, 1))) && empty
    ? `<div class="card glass accent"><b>C’est vendredi !</b> On prépare les menus de la semaine qui commence demain ? <button class="btn primary" data-propose>✨ Proposer les menus</button></div>` : '';
  return `${banner}<div class="bar"><div class="seg"><button id="wprev" aria-label="Semaine précédente">‹</button><button id="wnow">Cette semaine</button><button id="wnext" aria-label="Semaine suivante">›</button></div>
    <b class="weeklabel">${fmtShort(weekStart)} → ${fmtShort(addDays(weekStart, 6))}</b><span class="grow"></span>
    <button class="btn" id="weekShop">🛒 Courses de la semaine</button><button class="btn primary" data-propose>✨ Proposer les menus</button></div>
  <div class="week">${days.map(d => `<div class="daycard glass ${ymd(d) === ymd(today) ? 'today' : ''}"><h4>${esc(fmtLong(d))}</h4>${typesOf(d).map(t => mealCell(d, t)).join('')}</div>`).join('')}</div>
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
function pickFrom(pool, used, recent) {
  const free = pool.filter(r => !used.has(r.id));
  const fresh = free.filter(r => !recent.has(r.id));
  const base = fresh.length ? fresh : free;
  const favs = base.filter(r => r.favorite);
  return base.length ? (favs.length && Math.random() < 0.45 ? pick(favs) : pick(base)) : null;
}
const fromRecipe = (date, type, r, servings = 3) => ({ date, type, servings, recipe_id: r?.id || null, title: r?.title || '', photo_url: r?.photo_url || null, web: null });

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
  <span class="grow"><b>${esc(e.title || '— rien de trouvé —')}</b>${e.web ? '<small><span class="chip">idée internet</span></small>' : e.recipe_id ? '<small>de votre carnet</small>' : ''}</span>
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
export function bind(root, rerender) {
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
    if (e.target.id === 'clearChecked') for (const i of db.store.t.shopping_items.filter(i => i.checked)) await db.del('shopping_items', i.id);
  };
  $('#shopForm', root).onsubmit = async e => {
    e.preventDefault(); const f = e.target;
    await db.add('shopping_items', { name: f.elements.name.value.trim(), shop: f.elements.shop.value, checked: false }); f.reset(); f.elements.name.focus();
  };
}
