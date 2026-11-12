// Petits utilitaires partagés
export const $ = (s, r = document) => r.querySelector(s);
export const $$ = (s, r = document) => [...r.querySelectorAll(s)];
export const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
export const pick = a => a[Math.floor(Math.random() * a.length)];
export const shuffle = a => { a = [...a]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

export const PEOPLE = ['Famille', 'Emilie', 'Alexandre', 'Hugo', 'Gaspard'];
export const DAYS = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];

// ---- dates (toujours en heure locale, format AAAA-MM-JJ) ----
export const ymd = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
export const parseYmd = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
export const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x; };
export const weekStartSaturday = d => addDays(new Date(d.getFullYear(), d.getMonth(), d.getDate()), -((d.getDay() + 1) % 7));
export const fmtLong = d => d.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' });
export const fmtShort = d => d.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric', month: 'short' });
export const fmtTime = iso => new Date(iso).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
export const toLocalInput = iso => { const d = new Date(iso); d.setMinutes(d.getMinutes() - d.getTimezoneOffset()); return d.toISOString().slice(0, 16); };

// ---- notifications ----
let toastTimer;
export function toast(msg, kind = '') {
  const t = $('#toast'); if (!t) return;
  t.textContent = msg; t.className = 'show ' + kind;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => (t.className = ''), 2800);
}

// ---- fenêtre de dialogue ----
export function openModal(html, { wide = false, onMount } = {}) {
  const dlg = $('#dlg');
  $('#dlgBody').innerHTML = html;
  dlg.classList.toggle('wide', wide);
  if (!dlg.open) dlg.showModal();
  onMount && onMount($('#dlgBody'));
}
export const closeModal = () => { const d = $('#dlg'); if (d.open) d.close(); };

// ---- formulaires générés ----
// fields: [{name,label,type,options,placeholder,required,hint,list,full,step}]
export function fieldHTML(f, v = '') {
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

export function formDialog({ title, fields, values = {}, submitLabel = 'Enregistrer', onSubmit, extra = '', wide = false, onMount, danger }) {
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
export async function compressImage(file, max = 1100, quality = 0.82) {
  const bmp = await createImageBitmap(file);
  const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
  const c = document.createElement('canvas'); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
  c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
  return new Promise(res => c.toBlob(res, 'image/jpeg', quality));
}

// ---- ingrédients ----
export const ingredientLines = text => String(text || '').split(/\r?\n/).map(l => l.replace(/^[\s\-•*·–]+/, '').trim()).filter(l => l && !/:$/.test(l));

const MARCHE = /(carotte|poireau|courgette|aubergine|tomate|salade|radis|betterave|betrave|chou|céleri|celeri|oignon|échalote|echalote|ail\b|pomme|poire|citron|orange|fruit|légume|legume|herbe|persil|basilic|coriandre|menthe|champignon|épinard|epinard|haricot|poivron|concombre|navet|potiron|courge|butternut|patate|poulet|volaille|canard|pintade|dinde|lapin|œuf|oeuf)/i;
export const guessShop = line => (MARCHE.test(line) ? 'Marché' : 'Supermarché');
