// Idées de recettes et de cocktails depuis internet (TheMealDB / TheCocktailDB, gratuits, sans clé)
// + traduction automatique en français (Google Translate non officiel). Si la traduction échoue,
// le texte original reste affiché.
import { pick } from './util.js';

const MEAL = 'https://www.themealdb.com/api/json/v1/1/';
const COCK = 'https://www.thecocktaildb.com/api/json/v1/1/';

async function getJSON(url) {
  const r = await fetch(url);
  if (!r.ok) throw new Error('Service indisponible (' + r.status + ')');
  return r.json();
}

// catégorie de l'appli -> catégories TheMealDB
export const MEAL_CATS = {
  'Entrée': ['Starter'], 'Plat': ['Beef', 'Chicken', 'Lamb', 'Pork', 'Pasta', 'Seafood', 'Vegetarian', 'Miscellaneous'],
  'Dessert': ['Dessert'], 'Accompagnement': ['Side'], 'Apéro': ['Starter', 'Side'], 'Brunch': ['Breakfast'],
};
// type de vin -> idées de plats
export const PAIRING = {
  Rouge: ['Beef', 'Lamb', 'Pork'], Blanc: ['Seafood', 'Chicken', 'Vegetarian'], 'Rosé': ['Pasta', 'Chicken', 'Starter'],
  Effervescent: ['Starter', 'Seafood'], Liquoreux: ['Dessert'], 'Fortifié': ['Dessert'], Spiritueux: ['Dessert'],
};
// spiritueux -> ingrédient TheCocktailDB
export const SPIRIT_MAP = { whisky: 'Whiskey', whiskey: 'Whiskey', scotch: 'Scotch', bourbon: 'Bourbon', rhum: 'Rum', rum: 'Rum', gin: 'Gin', vodka: 'Vodka', tequila: 'Tequila', cognac: 'Cognac', brandy: 'Brandy', champagne: 'Champagne', 'crémant': 'Champagne', prosecco: 'Prosecco', porto: 'Port', 'vin': 'Wine' };

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

export async function randomMeal(cats = MEAL_CATS['Plat'], exclude = []) {
  for (let t = 0; t < 4; t++) {
    const list = await getJSON(MEAL + 'filter.php?c=' + encodeURIComponent(pick(cats)));
    const cand = (list.meals || []).filter(m => !exclude.includes(m.idMeal));
    if (!cand.length) continue;
    const d = await getJSON(MEAL + 'lookup.php?i=' + pick(cand).idMeal);
    if (d.meals?.[0]) return normMeal(d.meals[0]);
  }
  throw new Error('Aucune idée trouvée, réessayez.');
}

export async function randomCocktail({ alcoholic = true, ingredient = null } = {}) {
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

export async function translateIdea(idea) {
  if (idea.lang === 'fr') return idea;
  try {
    const [title, ingredients, instructions] = await Promise.all([tr(idea.title), tr(idea.ingredients), tr(idea.instructions)]);
    return { ...idea, title, ingredients, instructions, lang: 'fr', translated: true };
  } catch (e) { console.warn('Traduction indisponible', e); return idea; }
}
