// Module Recettes : carnet, recherche, idées depuis internet, cocktails
import { $, $$, esc, toast, openModal, closeModal, formDialog, compressImage, ymd, DAYS } from './util.js';
import * as db from './db.js';
import { openIdea } from './ideas.js';
import { randomMeal, randomCocktail, MEAL_CATS } from './ext.js';
import { importRecipes } from './seed.js';
import { addIngredients } from './shopping.js';

export const CATEGORIES = ['Entrée', 'Plat', 'Dessert', 'Accompagnement', 'Apéro', 'Brunch', 'Cocktail avec alcool', 'Cocktail sans alcool'];
let cat = '', query = '', favOnly = false;
const recipes = () => db.store.t.recipes;

const filtered = () => {
  const q = query.toLowerCase();
  return recipes().filter(r => (!cat || r.category === cat) && (!favOnly || r.favorite) && (!q || [r.title, r.ingredients, r.category].join(' ').toLowerCase().includes(q)))
    .sort((a, b) => a.title.localeCompare(b.title, 'fr'));
};
const minutes = r => r.total_minutes || ((r.prep_minutes || 0) + (r.cook_minutes || 0)) || null;

export const cardHTML = r => `<button class="rcard glass" data-id="${r.id}">
  ${r.photo_url ? `<img src="${esc(r.photo_url)}" alt="" loading="lazy">` : `<div class="noimg script">${esc(r.title.slice(0, 1))}</div>`}
  <div class="rbody"><b>${esc(r.title)}</b><small>${esc(r.category || '')}${minutes(r) ? ` · ${minutes(r)} min` : ''}${r.servings ? ` · ${r.servings} pers.` : ''}</small></div>${r.favorite ? '<span class="fav">♥</span>' : ''}</button>`;
const gridHTML = () => filtered().map(cardHTML).join('') || '<div class="empty">Aucune recette trouvée.</div>';

export function html() {
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

export function openRecipe(id) {
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

export function editRecipe(r = {}) {
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

export function bind(root, rerender) {
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
