// Liste de courses : ajout des ingrédients d'une recette
import * as db from './db.js';
import { ingredientLines, guessShop } from './util.js';

export async function addIngredients(recipe) {
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
