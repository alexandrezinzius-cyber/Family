// Point d'entrée : connexion, navigation, synchronisation
import { $, $$, esc, toast } from './util.js';
import * as db from './db.js';
import * as cellar from './cellar.js';
import * as recipes from './recipes.js';
import * as menus from './menus.js';
import { home, agenda, music, homebook } from './misc.js';

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
