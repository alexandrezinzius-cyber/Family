// Module Cave : cave à vin (28 bouteilles), placards, extérieur
import { $, $$, esc, toast, openModal, closeModal, formDialog, compressImage, pick } from './util.js';
import * as db from './db.js';
import { openIdea } from './ideas.js';
import { randomMeal, randomCocktail, PAIRING, SPIRIT_MAP } from './ext.js';
import { importCellar } from './seed.js';

export const TYPES = ['Rouge', 'Blanc', 'Rosé', 'Effervescent', 'Liquoreux', 'Fortifié', 'Spiritueux'];
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
const stat = (n, l) => `<div class="stat glass"><b>${n}</b><span>${l}</span></div>`;
const qty = b => b.quantity || 1;
const sum = a => a.reduce((t, b) => t + qty(b), 0);

function rowHTML(b) {
  const where = b.location_kind === 'cave' ? (b.slot ? slotInfo(b.slot) : 'Cave · à placer') : [KIND_LABEL[b.location_kind], b.place_label].filter(Boolean).join(' · ');
  return `<button class="row bottle" data-id="${b.id}"><span class="dot" style="background:${(GLASS[b.wine_type] || GLASS.Rouge)[0]}"></span>
    <span class="grow"><b>${esc(b.name)}</b> ${b.vintage ? `<span class="muted">${b.vintage}</span>` : ''}<br><small>${esc([b.producer, b.wine_type, b.country].filter(Boolean).join(' · '))}</small></span>
    <span class="where"><small>${esc(where)}${b.position_note ? ` — <i>${esc(b.position_note)}</i>` : ''}</small></span>${qty(b) > 1 ? `<span class="chip">×${qty(b)}</span>` : ''}</button>`;
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

export function html() {
  const all = items();
  const imp = all.length === 0 ? `<div class="card glass accent"><h3 class="script">Premier démarrage</h3><p>Votre export Vivino (36 lignes : 30 bouteilles en cave, le reste en placard) est prêt à être importé.</p><button class="btn primary" id="impCellar">Importer ma cave Vivino</button></div>` : '';
  return `<div class="stats">${stat(sum(all), 'bouteilles')}${stat(inCave().filter(b => b.slot).length + '/28', 'cave à vin')}${stat(sum(all.filter(b => b.location_kind === 'placard')), 'en placard')}${stat(sum(all.filter(b => b.location_kind === 'exterieur')), 'à l’extérieur')}</div>
  ${imp}
  <div class="bar"><div class="seg" id="cseg">${[['cave', 'Cave à vin'], ['placard', 'Placards'], ['exterieur', 'Extérieur'], ['tout', 'Inventaire']].map(([k, l]) => `<button data-v="${k}" class="${view === k ? 'on' : ''}">${l}</button>`).join('')}</div>
   <span class="grow"></span><button class="btn" id="cocktailBtn">🍸 Idée de cocktail</button><button class="btn primary" data-add="${view === 'placard' || view === 'exterieur' ? view : 'cave'}">＋ Bouteille</button></div>
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

export function editBottle(b = {}, preset = {}) {
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
    ${row('Prix d’achat', b.purchase_price ? b.purchase_price + ' €' : '')}${row('Valeur estimée', b.estimated_value ? b.estimated_value + ' €' : '')}${row('Date d’achat', b.acquired_on)}
    ${row('À boire', b.drinking_window)}${row('Service', b.serving_temperature)}${row('Accords', b.food_pairing)}${row('Notes', b.notes)}
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

// ---------------------------------------------------------------- événements
export function bind(root, rerender) {
  const by = id => items().find(b => b.id === id);
  $('#cseg', root).onclick = e => { const v = e.target.closest('[data-v]')?.dataset.v; if (v) { view = v; rerender(); } };
  root.onclick = e => {
    const slot = e.target.closest('[data-slot]'); if (slot) { const n = +slot.dataset.slot, b = inCave().find(x => x.slot === n); return b ? detail(b) : pickSlot(n); }
    const row = e.target.closest('.bottle'); if (row) return detail(by(row.dataset.id));
    const add = e.target.closest('[data-add]'); if (add) return editBottle({}, { location_kind: add.dataset.add });
  };
  root.onkeydown = e => { if ((e.key === 'Enter' || e.key === ' ') && e.target.dataset?.slot) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click', { bubbles: true })); } };
  $('#cocktailBtn', root).onclick = () => {
    const spirits = items().map(spiritOf).filter(Boolean);
    openIdea(() => randomCocktail({ ingredient: spirits.length ? pick(spirits) : null }), { title: 'Un cocktail pour ce soir' });
  };
  const imp = $('#impCellar', root); if (imp) imp.onclick = async () => { imp.disabled = true; imp.textContent = 'Import en cours…'; try { const n = await importCellar(); toast(`${n} lignes importées`); } catch (e) { toast(e.message, 'err'); imp.disabled = false; } };
  const q = $('#cq', root); if (q) q.oninput = () => { query = q.value; $('#clist', root).innerHTML = listHTML(); };
  const t = $('#ctype', root); if (t) t.onchange = () => { typeFilter = t.value; rerender(); };
}
