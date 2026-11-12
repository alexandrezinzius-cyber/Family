// Modules : Accueil, Agenda, Playlists, Maison
import { $, $$, esc, toast, formDialog, ymd, parseYmd, addDays, fmtLong, fmtTime, toLocalInput, PEOPLE } from './util.js';
import * as db from './db.js';

const t = k => db.store.t[k];
const pIndex = o => Math.max(0, PEOPLE.indexOf(o));

// ================================================================ ACCUEIL
export const home = {
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
export const agenda = {
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
export const music = {
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
export const homebook = {
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
