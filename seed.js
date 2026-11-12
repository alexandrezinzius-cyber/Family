// Import initial : recettes MyRecipeBox et cave Vivino (fichiers dans /data)
import * as db from './db.js';

async function importFile(table, file) {
  const rows = await (await fetch(file)).json();
  const withFamily = rows.map(r => ({ ...r, family_id: db.store.familyId }));
  let n = 0;
  for (let i = 0; i < withFamily.length; i += 40) {
    const res = await db.addMany(table, withFamily.slice(i, i + 40), { ignoreDuplicates: true });
    n += res.length;
  }
  return n;
}
export const importRecipes = () => importFile('recipes', 'data/recipes.json');
export const importCellar = () => importFile('cellar_items', 'data/cellar.json');
