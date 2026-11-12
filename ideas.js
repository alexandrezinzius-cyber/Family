// Fenêtre "idée de recette / cocktail" réutilisée par la cave, les recettes et les menus
import { esc, openModal, closeModal, toast } from './util.js';
import { translateIdea } from './ext.js';
import * as db from './db.js';

export const ideaCardHTML = idea => {
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

export async function saveIdeaAsRecipe(idea, category) {
  return db.add('recipes', {
    title: idea.title, category: category || (idea.kind === 'cocktail' ? idea.category : 'Plat'),
    ingredients: idea.ingredients, instructions: idea.instructions, photo_url: idea.photo_url,
    source_url: idea.source_url, notes: 'Idée trouvée sur internet', servings: idea.kind === 'cocktail' ? 1 : null,
  });
}

// fetcher : async () => idea
export async function openIdea(fetcher, { title = 'Une idée pour vous', saveCategory } = {}) {
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
