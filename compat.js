/* Compatibilité anciens navigateurs (iOS 9+) : petits remplaçants + client Supabase léger. ES5 uniquement. */
(function (w) {
  'use strict';
  function def(o, n, f) { if (!o[n]) { try { Object.defineProperty(o, n, { value: f, writable: true, configurable: true }); } catch (e) { o[n] = f; } } }

  if (!w.crypto && w.msCrypto) w.crypto = w.msCrypto;
  if (w.crypto && !w.crypto.randomUUID) w.crypto.randomUUID = function () { var a = new Uint8Array(16); w.crypto.getRandomValues(a); a[6] = (a[6] & 15) | 64; a[8] = (a[8] & 63) | 128; var h = []; for (var i = 0; i < 16; i++) h.push((a[i] + 256).toString(16).slice(1)); return h.slice(0, 4).join('') + '-' + h.slice(4, 6).join('') + '-' + h.slice(6, 8).join('') + '-' + h.slice(8, 10).join('') + '-' + h.slice(10).join(''); };

  def(Object, 'entries', function (o) { return Object.keys(o).map(function (k) { return [k, o[k]]; }); });
  def(Object, 'values', function (o) { return Object.keys(o).map(function (k) { return o[k]; }); });
  def(Object, 'fromEntries', function (it) { var o = {}; var a = Array.isArray(it) ? it : Array.from(it); a.forEach(function (e) { o[e[0]] = e[1]; }); return o; });
  def(Array.prototype, 'includes', function (x, from) { var a = this; for (var i = from || 0; i < a.length; i++) if (a[i] === x || (x !== x && a[i] !== a[i])) return true; return false; });
  def(Array.prototype, 'flat', function (d) { d = d === undefined ? 1 : d; var out = []; (function f(a, n) { a.forEach(function (x) { if (Array.isArray(x) && n > 0) f(x, n - 1); else out.push(x); }); })(this, d); return out; });
  def(Array.prototype, 'flatMap', function (fn, t) { return Array.prototype.concat.apply([], Array.prototype.map.call(this, fn, t)); });
  def(String.prototype, 'padStart', function (n, s) { var r = String(this); s = s === undefined ? ' ' : String(s); if (!s) return r; var p = ''; while (p.length < n - r.length) p += s; return p.slice(0, Math.max(0, n - r.length)) + r; });
  def(String.prototype, 'padEnd', function (n, s) { var r = String(this); s = s === undefined ? ' ' : String(s); if (!s) return r; var p = ''; while (p.length < n - r.length) p += s; return r + p.slice(0, Math.max(0, n - r.length)); });
  def(String.prototype, 'trimStart', function () { return this.replace(/^\s+/, ''); });
  def(String.prototype, 'trimEnd', function () { return this.replace(/\s+$/, ''); });
  def(String.prototype, 'replaceAll', function (a, b) { return a instanceof RegExp ? this.replace(a, b) : this.split(a).join(b); });
  def(Number, 'isFinite', function (x) { return typeof x === 'number' && isFinite(x); });
  if (w.Promise && !w.Promise.prototype['finally']) w.Promise.prototype['finally'] = function (f) { var P = this.constructor; return this.then(function (v) { return P.resolve(f()).then(function () { return v; }); }, function (e) { return P.resolve(f()).then(function () { throw e; }); }); };
  if (w.Element && !Element.prototype.closest) Element.prototype.closest = function (s) { var e = this; while (e && e.nodeType === 1) { if ((e.matches || e.webkitMatchesSelector).call(e, s)) return e; e = e.parentNode; } return null; };
  if (w.HTMLCanvasElement && !HTMLCanvasElement.prototype.toBlob) HTMLCanvasElement.prototype.toBlob = function (cb, type, q) { var c = this; setTimeout(function () { var d = atob(c.toDataURL(type, q).split(',')[1]), a = new Uint8Array(d.length); for (var i = 0; i < d.length; i++) a[i] = d.charCodeAt(i); cb(new Blob([a], { type: type || 'image/png' })); }); };
  if (!w.visualViewport) { /* rien */ }

  // ---- fetch minimal (XMLHttpRequest) ----
  if (!w.fetch) {
    w.fetch = function (url, o) {
      o = o || {};
      return new Promise(function (resolve, reject) {
        var x = new XMLHttpRequest();
        x.open(o.method || 'GET', typeof url === 'string' ? url : url.url, true);
        var h = o.headers || {};
        if (h.forEach && typeof h.forEach === 'function' && !Array.isArray(h)) h.forEach(function (v, k) { x.setRequestHeader(k, v); }); else Object.keys(h).forEach(function (k) { x.setRequestHeader(k, h[k]); });
        x.onload = function () {
          var txt = x.responseText, st = x.status, heads = x.getAllResponseHeaders() || '';
          resolve({ ok: st >= 200 && st < 300, status: st, statusText: x.statusText, url: x.responseURL || url,
            headers: { get: function (n) { return x.getResponseHeader(n); } },
            text: function () { return Promise.resolve(txt); }, json: function () { return new Promise(function (res, rej) { try { res(JSON.parse(txt)); } catch (e) { rej(e); } }); },
            blob: function () { return Promise.resolve(new Blob([txt])); }, clone: function () { return this; }, _heads: heads });
        };
        x.onerror = x.ontimeout = function () { reject(new TypeError('Failed to fetch')); };
        x.send(o.body === undefined ? null : o.body);
      });
    };
  }

  // ---- client Supabase léger (iPad anciens / repli si la bibliothèque officielle ne se charge pas) ----
  function mini(url, key) {
    url = String(url).replace(/\/+$/, '');
    var SK = 'sb-mini-' + (url.replace(/^https?:\/\//, '').split('.')[0]) + '-auth';
    function load() { try { return JSON.parse(localStorage.getItem(SK) || 'null'); } catch (e) { return null; } }
    function save(s) { try { if (s) localStorage.setItem(SK, JSON.stringify(s)); else localStorage.removeItem(SK); } catch (e) { /* ignore */ } }
    function J(r) { return r.text().then(function (t) { var d = null; try { d = t ? JSON.parse(t) : null; } catch (e) { d = { message: t }; } return { ok: r.ok, status: r.status, d: d }; }); }
    function err(x) { var d = x.d || {}; return { message: d.message || d.msg || d.error_description || d.error || ('Erreur ' + x.status), code: d.code || d.error_code, details: d.details, hint: d.hint, status: x.status }; }
    function net(e) { return { message: (e && e.message) || 'Failed to fetch', status: 0 }; }
    function mk(r) { var s = { access_token: r.access_token, refresh_token: r.refresh_token, expires_at: Math.floor(Date.now() / 1000) + (r.expires_in || 3600), user: r.user }; save(s); return s; }
    function refresh(s) {
      return fetch(url + '/auth/v1/token?grant_type=refresh_token', { method: 'POST', headers: { apikey: key, 'Content-Type': 'application/json' }, body: JSON.stringify({ refresh_token: s.refresh_token }) }).then(J).then(function (x) { if (x.ok && x.d && x.d.access_token) return mk(x.d); if (x.status >= 400 && x.status < 500) save(null); return x.ok ? null : s; }, function () { return s; });
    }
    function session() { var s = load(); if (!s) return Promise.resolve(null); if (s.expires_at - 60 > Date.now() / 1000) return Promise.resolve(s); return refresh(s); }
    var auth = {
      signInWithPassword: function (c) {
        return fetch(url + '/auth/v1/token?grant_type=password', { method: 'POST', headers: { apikey: key, 'Content-Type': 'application/json' }, body: JSON.stringify({ email: c.email, password: c.password }) }).then(J).then(function (x) {
          if (!x.ok || !x.d || !x.d.access_token) { var e = err(x); if (x.status === 400 && !/invalid/i.test(e.message)) e.message = 'Invalid login credentials'; return { data: { user: null, session: null }, error: e }; }
          var s = mk(x.d); return { data: { user: s.user, session: s }, error: null };
        }, function (e) { return { data: { user: null, session: null }, error: net(e) }; });
      },
      getSession: function () { return session().then(function (s) { return { data: { session: s }, error: null }; }); },
      signOut: function () { var s = load(); save(null); if (s) fetch(url + '/auth/v1/logout', { method: 'POST', headers: { apikey: key, Authorization: 'Bearer ' + s.access_token } }).then(null, function () { }); return Promise.resolve({ error: null }); },
      onAuthStateChange: function () { return { data: { subscription: { unsubscribe: function () { } } } }; }
    };
    function headers(extra) { return session().then(function (s) { var h = { apikey: key, Authorization: 'Bearer ' + (s ? s.access_token : key) }; for (var k in extra) h[k] = extra[k]; return h; }); }
    function q(v) { v = String(v); return /^[A-Za-z0-9_.:@ -]*$/.test(v) ? v : '"' + v.replace(/"/g, '\\"') + '"'; }

    function from(table) {
      var st = { method: 'GET', filters: [], cols: '*', body: null, prefer: [], returning: false, one: null, onConflict: null };
      var b = {
        select: function (c) { if (st.method === 'GET') st.cols = c || '*'; else { st.returning = true; st.cols = c || '*'; } return b; },
        insert: function (rows) { st.method = 'POST'; st.body = rows; return b; },
        upsert: function (rows, o) { o = o || {}; st.method = 'POST'; st.body = rows; st.onConflict = o.onConflict || null; st.prefer.push('resolution=' + (o.ignoreDuplicates ? 'ignore' : 'merge') + '-duplicates'); return b; },
        update: function (ch) { st.method = 'PATCH'; st.body = ch; return b; },
        'delete': function () { st.method = 'DELETE'; return b; },
        eq: function (c, v) { st.filters.push(encodeURIComponent(c) + '=eq.' + encodeURIComponent(String(v))); return b; },
        'in': function (c, a) { st.filters.push(encodeURIComponent(c) + '=in.(' + encodeURIComponent(a.map(q).join(',')) + ')'); return b; },
        single: function () { st.one = 'single'; return b; },
        maybeSingle: function () { st.one = 'maybe'; return b; },
        then: function (ok, ko) { return run().then(ok, ko); }
      };
      function run() {
        var u = url + '/rest/v1/' + encodeURIComponent(table), p = st.filters.slice();
        if (st.method === 'GET' || st.returning) p.push('select=' + encodeURIComponent(st.cols));
        if (st.onConflict) p.push('on_conflict=' + encodeURIComponent(st.onConflict));
        if (p.length) u += '?' + p.join('&');
        var pref = st.prefer.slice(); if (st.method !== 'GET') pref.push(st.returning ? 'return=representation' : 'return=minimal');
        var ex = {}; if (pref.length) ex.Prefer = pref.join(','); if (st.body !== null) ex['Content-Type'] = 'application/json';
        return headers(ex).then(function (h) { return fetch(u, { method: st.method, headers: h, body: st.body !== null ? JSON.stringify(st.body) : undefined }); }).then(J).then(function (x) {
          if (!x.ok) return { data: null, error: err(x), status: x.status };
          var d = x.d;
          if (st.one) { var a = Array.isArray(d) ? d : (d ? [d] : []); if (st.one === 'single' && a.length !== 1) return { data: null, error: { message: 'JSON object requested, multiple (or no) rows returned', code: 'PGRST116', status: 406 } }; d = a.length ? a[0] : null; }
          return { data: d === undefined ? null : d, error: null, status: x.status };
        }, function (e) { return { data: null, error: net(e) }; });
      }
      return b;
    }

    function enc(p) { return p.split('/').map(encodeURIComponent).join('/'); }
    var storage = { from: function (bucket) { return {
      upload: function (path, blob, o) { o = o || {}; return headers({ 'Content-Type': o.contentType || 'application/octet-stream', 'cache-control': 'max-age=' + (o.cacheControl || '3600'), 'x-upsert': o.upsert ? 'true' : 'false' }).then(function (h) { return fetch(url + '/storage/v1/object/' + bucket + '/' + enc(path), { method: 'POST', headers: h, body: blob }); }).then(J).then(function (x) { return x.ok ? { data: x.d, error: null } : { data: null, error: err(x) }; }, function (e) { return { data: null, error: net(e) }; }); },
      getPublicUrl: function (path) { return { data: { publicUrl: url + '/storage/v1/object/public/' + bucket + '/' + enc(path) } }; }
    }; } };
    var functions = { invoke: function (name, o) { o = o || {}; return headers({ 'Content-Type': 'application/json' }).then(function (h) { return fetch(url + '/functions/v1/' + name, { method: 'POST', headers: h, body: JSON.stringify(o.body || {}) }); }).then(J).then(function (x) { return x.ok ? { data: x.d, error: null } : { data: null, error: { message: (x.d && (x.d.message || x.d.error)) || 'Edge Function returned a non-2xx status code', status: x.status } }; }, function (e) { return { data: null, error: { message: 'Failed to send a request to the Edge Function' } }; }); } };
    // pas de temps réel : le site recharge les données toutes les 30 s
    function channel() { var c = { on: function () { return c; }, subscribe: function (cb) { setTimeout(function () { cb && cb('SUBSCRIBED'); }, 0); return c; } }; return c; }
    return { auth: auth, from: from, storage: storage, functions: functions, channel: channel, removeChannel: function () { }, __mini: true };
  }

  // détection : grille CSS et « gap » sur flex (absents des vieux Safari) -> classes pour les styles de secours
  function feat() {
    var h = document.documentElement, ok = true;
    try { ok = !!(w.CSS && CSS.supports && (CSS.supports('display', 'grid') || CSS.supports('display', '-ms-grid'))); } catch (e) { ok = false; }
    if (!ok) h.className += ' nogrid';
    try {
      var d = document.createElement('div'); d.style.cssText = 'display:flex;flex-direction:column;row-gap:1px;position:absolute;left:-99px;top:0';
      d.innerHTML = '<i style="display:block;height:1px"></i><i style="display:block;height:1px"></i>';
      document.body.appendChild(d); var g = d.offsetHeight === 3; document.body.removeChild(d);
      if (!g) h.className += ' nogap';
    } catch (e) { h.className += ' nogap'; }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', feat); else feat();
  w.__miniSupabase = { createClient: mini };
})(window);
