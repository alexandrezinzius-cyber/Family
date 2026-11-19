var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
(function() {
  "use strict";
  const __m = {};
  __m.util = /* @__PURE__ */ (() => {
    const $ = (s, r = document) => r.querySelector(s);
    const $$ = (s, r = document) => [...r.querySelectorAll(s)];
    const esc = (s) => String(s != null ? s : "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
    const pick = (a) => a[Math.floor(Math.random() * a.length)];
    const shuffle = (a) => {
      a = [...a];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };
    const PEOPLE = ["Famille", "Emilie", "Alexandre", "Hugo", "Gaspard"];
    const DAYS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
    const parseYmd = (s) => {
      const [y, m, d] = s.split("-").map(Number);
      return new Date(y, m - 1, d);
    };
    const addDays = (d, n) => {
      const x = new Date(d);
      x.setDate(x.getDate() + n);
      return x;
    };
    const weekStartSaturday = (d) => addDays(new Date(d.getFullYear(), d.getMonth(), d.getDate()), -((d.getDay() + 1) % 7));
    const fmtLong = (d) => d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
    const fmtShort = (d) => d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" });
    const fmtTime = (iso) => new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
    const toLocalInput = (iso) => {
      const d = new Date(iso);
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString().slice(0, 16);
    };
    let toastTimer;
    function toast(msg, kind = "") {
      const t = $("#toast");
      if (!t) return;
      t.textContent = msg;
      t.className = "show " + kind;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => t.className = "", 2800);
    }
    const isOpen = (d) => !!(d.open || d.hasAttribute("open"));
    function openModal(html, { wide = false, onMount } = {}) {
      const dlg = $("#dlg");
      $("#dlgBody").innerHTML = html;
      dlg.classList.toggle("wide", wide);
      if (!isOpen(dlg)) {
        if (typeof dlg.showModal === "function") dlg.showModal();
        else {
          dlg.setAttribute("open", "");
          dlg.classList.add("fallback");
          document.body.style.overflow = "hidden";
        }
      }
      onMount && onMount($("#dlgBody"));
    }
    const closeModal = () => {
      const d = $("#dlg");
      if (!isOpen(d)) return;
      if (typeof d.close === "function") d.close();
      else {
        d.removeAttribute("open");
        document.body.style.overflow = "";
      }
    };
    function fieldHTML(f, v = "") {
      const val = v != null ? v : "";
      const req = f.required ? "required" : "";
      let input;
      if (f.type === "select") input = `<select name="${f.name}" ${req}>${f.options.map((o) => {
        const [ov, ol] = Array.isArray(o) ? o : [o, o];
        return `<option value="${esc(ov)}" ${String(ov) === String(val) ? "selected" : ""}>${esc(ol)}</option>`;
      }).join("")}</select>`;
      else if (f.type === "textarea") input = `<textarea name="${f.name}" rows="${f.rows || 4}" placeholder="${esc(f.placeholder || "")}" ${req}>${esc(val)}</textarea>`;
      else if (f.type === "checkbox") return `<label class="field check ${f.full ? "full" : ""}"><input type="checkbox" name="${f.name}" ${val ? "checked" : ""}> <span>${esc(f.label)}</span></label>`;
      else if (f.type === "file") input = `<input type="file" name="${f.name}" accept="image/*">`;
      else input = `<input type="${f.type || "text"}" name="${f.name}" value="${esc(val)}" placeholder="${esc(f.placeholder || "")}" ${f.list ? `list="${f.list}"` : ""} ${f.step ? `step="${f.step}"` : ""} ${req}>`;
      return `<label class="field ${f.full ? "full" : ""}"><span>${esc(f.label)}</span>${input}${f.hint ? `<small>${esc(f.hint)}</small>` : ""}</label>`;
    }
    function formDialog({ title, fields, values = {}, submitLabel = "Enregistrer", onSubmit, extra = "", wide = false, onMount, danger }) {
      const html = `<form id="genForm" class="genform"><h2 class="script">${esc(title)}</h2>
    <div class="fields">${fields.map((f) => fieldHTML(f, values[f.name])).join("")}</div>
    ${extra}
    <div class="formactions">${danger ? `<button type="button" class="btn danger" data-danger>${esc(danger.label)}</button>` : ""}<span class="grow"></span>
    <button type="button" class="btn ghost" data-close>Annuler</button><button class="btn primary">${esc(submitLabel)}</button></div></form>`;
      openModal(html, {
        wide,
        onMount: (root) => {
          const form = $("#genForm", root);
          $("[data-close]", root).onclick = closeModal;
          if (danger) $("[data-danger]", root).onclick = async () => {
            if (confirm(danger.confirm || "Supprimer ?")) {
              await danger.run();
              closeModal();
            }
          };
          form.onsubmit = async (e) => {
            e.preventDefault();
            const btn = form.querySelector("button.primary");
            btn.disabled = true;
            const out = {};
            for (const f of fields) {
              if (f.type === "file") {
                out[f.name] = form.elements[f.name].files[0] || null;
                continue;
              }
              if (f.type === "checkbox") {
                out[f.name] = form.elements[f.name].checked;
                continue;
              }
              let v = form.elements[f.name].value;
              if (f.type === "number") v = v === "" ? null : Number(v);
              else if (typeof v === "string") {
                v = v.trim();
                if (v === "") v = null;
              }
              out[f.name] = v;
            }
            try {
              await onSubmit(out);
              closeModal();
            } catch (err) {
              console.error(err);
              toast(err.message || "Erreur", "err");
              btn.disabled = false;
            }
          };
          onMount && onMount(root, form);
        }
      });
    }
    async function compressImage(file, max = 1100, quality = 0.82) {
      const bmp = window.createImageBitmap ? await createImageBitmap(file) : await new Promise((res, rej) => {
        const im = new Image();
        im.onload = () => res(im);
        im.onerror = rej;
        im.src = URL.createObjectURL(file);
      });
      bmp.width = bmp.width || bmp.naturalWidth;
      bmp.height = bmp.height || bmp.naturalHeight;
      const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
      const c = document.createElement("canvas");
      c.width = Math.round(bmp.width * k);
      c.height = Math.round(bmp.height * k);
      c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
      return new Promise((res) => c.toBlob(res, "image/jpeg", quality));
    }
    const ingredientLines = (text) => String(text || "").split(/\r?\n/).map((l) => l.replace(/^[\s\-•*·–]+/, "").trim()).filter((l) => l && !/:$/.test(l));
    const norm = (t) => String(t || "").toLowerCase().replace(/œ/g, "oe").normalize("NFD").replace(/[̀-ͯ]/g, "");
    const PROCESSED = /(concentr|coulis|puree|concass|boite|conserve|sauce|pelee|sech|surgel|confit|jus de|huile|sirop|compote|confiture|vinaigre|bouillon|cube|poudre|\blait|creme|fromage|beurre|\bfarine\b|sucre|\bpate|\bvin\b|moutarde|ketchup|cornichon|lardon|jambon|saucisse|chocolat|miel|\bsel\b|poivre|epice|paprika|cumin|curry|muscade|raclette|mozzarella|parmesan|emmental|comte)/;
    const FRESH = /(carotte|poireau|courgette|aubergine|tomate|salade|laitue|radis|betterave|betrave|\bchou|celeri|oignon|echalote|\bail\b|pomme|poire|citron|\boranges?\b|clementine|mandarine|kiwi|banane|fraise|framboise|cerise|abricot|peche|nectarine|melon|raisin|figue|fruit|legume|persil|basilic|coriandre|menthe|ciboulette|thym|romarin|gingembre|cebette|ciboule|champignon|epinard|haricots? verts?|poivron|concombre|navet|potiron|courge|butternut|patate|endive|fenouil|panais|asperge|artichaut|avocat|mache|brocoli|petits? pois|\bmais\b|poulet|volaille|canard|dinde|pintade|caille|magret|aiguillette|\boeuf)/;
    const guessShop = (line) => {
      const n = norm(line);
      return !PROCESSED.test(n) && FRESH.test(n) ? "March\xE9" : "Supermarch\xE9";
    };
    return { $, $$, esc, pick, shuffle, PEOPLE, DAYS, ymd, parseYmd, addDays, weekStartSaturday, fmtLong, fmtShort, fmtTime, toLocalInput, toast, openModal, closeModal, fieldHTML, formDialog, compressImage, ingredientLines, norm, guessShop };
  })();
  __m.season = (() => {
    const strip = (s) => String(s || "").toLowerCase().replace(/œ/g, "oe").normalize("NFD").replace(/[̀-ͯ]/g, "");
    const PRODUCE = [
      ["poireau", "poireau", "9-4"],
      ["courge", "courge(?!tte)|potiron|potimarron|butternut|citrouille", "9-2"],
      ["chou-fleur", "chou.?fleur", "9-4"],
      ["brocoli", "brocoli", "9-3"],
      ["chou", "\\bchou(?!.?fleur)", "10-3"],
      ["c\xE9leri", "celeri", "9-3"],
      ["betterave", "betterave|betrave", "9-4"],
      ["navet", "navet", "10-4"],
      ["panais", "panais", "10-3"],
      ["topinambour", "topinambour", "10-3"],
      ["endive", "endive", "11-3"],
      ["fenouil", "fenouil", "10-3"],
      ["m\xE2che", "mache", "10-3"],
      ["\xE9pinard", "epinard", "3-6,9-11"],
      ["pomme", "\\bpommes?\\b(?!\\s+(de terre|dauphine|noisette))", "9-4"],
      ["poire", "\\bpoires?\\b", "9-3"],
      ["orange", "\\boranges?\\b", "11-3"],
      ["cl\xE9mentine", "clementine|mandarine", "11-2"],
      ["kiwi", "kiwi", "11-4"],
      ["pamplemousse", "pamplemousse", "11-3"],
      ["ch\xE2taigne", "chataigne|marron", "10-12"],
      ["coing", "coing", "10-12"],
      ["champignon des bois", "cepe|girolle|chanterelle|morille", "9-11"],
      ["tomate", "tomate", "6-9"],
      ["courgette", "courgette", "6-10"],
      ["aubergine", "aubergine", "7-10"],
      ["poivron", "poivron", "7-10"],
      ["concombre", "concombre", "6-9"],
      ["haricot vert", "haricots? verts?", "6-10"],
      ["petit pois", "petits? pois", "5-7"],
      ["asperge", "asperge", "4-6"],
      ["artichaut", "artichaut", "5-9"],
      ["ma\xEFs", "\\bmais\\b", "7-10"],
      ["radis", "radis", "3-10"],
      ["salade", "salade|laitue", "4-10"],
      ["fraise", "fraise", "4-7"],
      ["framboise", "framboise", "6-8"],
      ["cerise", "cerise", "5-7"],
      ["abricot", "abricot", "6-8"],
      ["p\xEAche", "peche|nectarine", "6-9"],
      ["melon", "melon", "6-9"],
      ["past\xE8que", "pasteque", "7-9"],
      ["figue", "figue", "8-10"],
      ["raisin", "raisin", "8-10"]
    ].map(([name, re, months]) => ({ name, re: new RegExp(re), months }));
    const inSeason = (months, m) => months.split(",").some((r) => {
      const [a, b] = r.split("-").map(Number);
      return a <= b ? m >= a && m <= b : m >= a || m <= b;
    });
    const PROCESSED = /(concentr|coulis|puree|concass|boite|conserve|sauce|pelee|sech|surgel|confit|jus de|huile|sirop|compote|confiture|vinaigre|bouillon|cube)/;
    const MONTHS = ["janvier", "f\xE9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\xFBt", "septembre", "octobre", "novembre", "d\xE9cembre"];
    const seasonalNames = (m) => PRODUCE.filter((p) => inSeason(p.months, m)).map((p) => p.name);
    function scoreRecipe(recipe, month) {
      const text = strip(recipe.ingredients).split("\n").filter((l) => !PROCESSED.test(l)).join("\n");
      let score = 0;
      const hits = [];
      for (const p of PRODUCE) {
        if (!p.re.test(text)) continue;
        if (inSeason(p.months, month)) {
          score++;
          hits.push(p.name);
        } else score--;
      }
      return { score: Math.max(-3, Math.min(4, score)), hits };
    }
    return { MONTHS, seasonalNames, scoreRecipe };
  })();
  __m.db = (() => {
    const TABLES = ["cellar_items", "recipes", "meal_plans", "shopping_items", "family_events", "playlists", "family_notes"];
    const CACHE_KEY = "family-cache-v3";
    const store = {
      sb: null,
      user: null,
      familyId: null,
      t: Object.fromEntries(TABLES.map((k) => [k, []])),
      sync: "offline"
      // offline | connecting | live
    };
    const listeners = /* @__PURE__ */ new Set();
    const onChange = (fn) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    };
    const emit = (table) => listeners.forEach((f) => f(table));
    const setSync = (s) => {
      store.sync = s;
      emit("_sync");
    };
    function createClientFromConfig() {
      const cfg = window.APP_CONFIG || {};
      const url = cfg.SUPABASE_URL || window.SUPABASE_URL;
      const key = cfg.SUPABASE_PUBLISHABLE_KEY || cfg.SUPABASE_ANON_KEY || window.SUPABASE_ANON_KEY;
      if (!window.supabase) {
        store.configError = "La biblioth\xE8que Supabase ne s\u2019est pas charg\xE9e (v\xE9rifiez la connexion).";
        return null;
      }
      if (!url || !key || /VOTRE/.test(url + key)) {
        store.configError = "Configuration Supabase \xE0 v\xE9rifier dans config.js (URL ou cl\xE9 manquante).";
        return null;
      }
      store.sb = window.supabase.createClient(url, key, { auth: { persistSession: true, autoRefreshToken: true } });
      return store.sb;
    }
    function readCache() {
      var _a;
      try {
        const c = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
        if (c && c.uid === ((_a = store.user) == null ? void 0 : _a.id)) TABLES.forEach((k) => {
          store.t[k] = c.t[k] || [];
        });
      } catch (e) {
      }
    }
    let cacheTimer;
    function writeCache() {
      clearTimeout(cacheTimer);
      cacheTimer = setTimeout(() => {
        var _a;
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ uid: (_a = store.user) == null ? void 0 : _a.id, t: store.t }));
        } catch (e) {
        }
      }, 600);
    }
    function clearCache() {
      try {
        localStorage.removeItem(CACHE_KEY);
      } catch (e) {
      }
      TABLES.forEach((k) => store.t[k] = []);
    }
    async function loadFamily() {
      const { data, error } = await store.sb.from("profiles").select("family_id,display_name").eq("id", store.user.id).maybeSingle();
      if (error) throw error;
      store.familyId = (data == null ? void 0 : data.family_id) || null;
      store.displayName = (data == null ? void 0 : data.display_name) || "";
      return store.familyId;
    }
    async function loadAll() {
      readCache();
      emit("*");
      const results = await Promise.all(TABLES.map((k) => store.sb.from(k).select("*")));
      results.forEach((r, i) => {
        if (r.error) console.error(TABLES[i], r.error);
        else store.t[TABLES[i]] = r.data;
      });
      writeCache();
      emit("*");
      const failed = results.find((r) => r.error);
      if (failed) throw failed.error;
    }
    let channel, pollTimer;
    function startRealtime() {
      stopRealtime();
      setSync("connecting");
      channel = store.sb.channel("family-sync");
      TABLES.forEach((table) => channel.on("postgres_changes", { event: "*", schema: "public", table }, (p) => applyChange(table, p)));
      channel.subscribe((status) => {
        if (status === "SUBSCRIBED") {
          setSync("live");
          loadAll().catch(() => {
          });
        } else if (["CHANNEL_ERROR", "TIMED_OUT", "CLOSED"].includes(status)) setSync("offline");
      });
      document.addEventListener("visibilitychange", onVisible);
      window.addEventListener("online", onVisible);
      pollTimer = setInterval(() => {
        if (!document.hidden) loadAll().catch(() => {
        });
      }, 12e4);
    }
    function stopRealtime() {
      if (channel) {
        store.sb.removeChannel(channel);
        channel = null;
      }
      clearInterval(pollTimer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", onVisible);
      setSync("offline");
    }
    const onVisible = () => {
      if (!document.hidden && store.user) loadAll().catch(() => {
      });
    };
    function applyChange(table, p) {
      const rows = store.t[table];
      if (p.eventType === "DELETE") store.t[table] = rows.filter((r) => r.id !== p.old.id);
      else {
        const i = rows.findIndex((r) => r.id === p.new.id);
        if (i >= 0) rows[i] = p.new;
        else rows.push(p.new);
      }
      writeCache();
      emit(table);
    }
    const upsertLocal = (table, row) => {
      const rows = store.t[table];
      const i = rows.findIndex((r) => r.id === row.id);
      if (i >= 0) rows[i] = row;
      else rows.push(row);
    };
    async function add(table, row) {
      const { data, error } = await store.sb.from(table).insert(row).select().single();
      if (error) throw error;
      upsertLocal(table, data);
      writeCache();
      emit(table);
      return data;
    }
    async function addMany(table, rows, { ignoreDuplicates = false } = {}) {
      if (!rows.length) return [];
      const q = ignoreDuplicates ? store.sb.from(table).upsert(rows, { onConflict: "family_id,external_id", ignoreDuplicates: true }).select() : store.sb.from(table).insert(rows).select();
      const { data, error } = await q;
      if (error) throw error;
      (data || []).forEach((r) => upsertLocal(table, r));
      writeCache();
      emit(table);
      return data || [];
    }
    async function patch(table, id, changes) {
      const old = store.t[table].find((r) => r.id === id);
      if (old) {
        upsertLocal(table, __spreadValues(__spreadValues({}, old), changes));
        emit(table);
      }
      const { data, error } = await store.sb.from(table).update(changes).eq("id", id).select().single();
      if (error) {
        if (old) {
          upsertLocal(table, old);
          emit(table);
        }
        throw error;
      }
      upsertLocal(table, data);
      writeCache();
      emit(table);
      return data;
    }
    async function del(table, id) {
      const old = store.t[table].find((r) => r.id === id);
      store.t[table] = store.t[table].filter((r) => r.id !== id);
      emit(table);
      const { error } = await store.sb.from(table).delete().eq("id", id);
      if (error) {
        if (old) {
          store.t[table].push(old);
          emit(table);
        }
        throw error;
      }
      writeCache();
    }
    async function uploadPhoto(blob, folder = "misc", mime = "image/jpeg") {
      const ext = { "image/png": "png", "image/webp": "webp", "image/gif": "gif" }[mime] || "jpg";
      const path = `${folder}/${crypto.randomUUID()}.${ext}`;
      const { error } = await store.sb.storage.from("photos").upload(path, blob, { contentType: mime, cacheControl: "31536000" });
      if (error) throw error;
      return store.sb.storage.from("photos").getPublicUrl(path).data.publicUrl;
    }
    return { TABLES, store, onChange, createClientFromConfig, clearCache, loadFamily, loadAll, startRealtime, stopRealtime, add, addMany, patch, del, uploadPhoto };
  })();
  __m.ext = (() => {
    const { pick } = __m.util;
    const db = __m.db;
    const MEAL = "https://www.themealdb.com/api/json/v1/1/";
    const COCK = "https://www.thecocktaildb.com/api/json/v1/1/";
    async function getJSON(url) {
      const r = await fetch(url);
      if (!r.ok) throw new Error("Service indisponible (" + r.status + ")");
      return r.json();
    }
    const MEAL_CATS = {
      "Entr\xE9e": ["Starter"],
      "Plat": ["Beef", "Chicken", "Lamb", "Pork", "Pasta", "Seafood", "Vegetarian", "Miscellaneous"],
      "Dessert": ["Dessert"],
      "Accompagnement": ["Side"],
      "Ap\xE9ro": ["Starter", "Side"],
      "Brunch": ["Breakfast"]
    };
    const PAIRING = {
      Rouge: ["Beef", "Lamb", "Pork"],
      Blanc: ["Seafood", "Chicken", "Vegetarian"],
      "Ros\xE9": ["Pasta", "Chicken", "Starter"],
      Effervescent: ["Starter", "Seafood"],
      Liquoreux: ["Dessert"],
      "Fortifi\xE9": ["Dessert"],
      Spiritueux: ["Dessert"]
    };
    const SPIRIT_MAP = { whisky: "Whiskey", whiskey: "Whiskey", scotch: "Scotch", bourbon: "Bourbon", rhum: "Rum", rum: "Rum", gin: "Gin", vodka: "Vodka", tequila: "Tequila", cognac: "Cognac", brandy: "Brandy", champagne: "Champagne", "cr\xE9mant": "Champagne", prosecco: "Prosecco", porto: "Port", "vin": "Wine" };
    function normMeal(m) {
      const ing = [];
      for (let i = 1; i <= 20; i++) {
        const n = (m["strIngredient" + i] || "").trim();
        if (n) ing.push(`${(m["strMeasure" + i] || "").trim()} ${n}`.trim());
      }
      return {
        kind: "recipe",
        title: m.strMeal,
        category: m.strCategory,
        area: m.strArea,
        ingredients: ing.join("\n"),
        instructions: (m.strInstructions || "").replace(/\r/g, "").replace(/\n{2,}/g, "\n").trim(),
        photo_url: m.strMealThumb,
        source_url: m.strSource || (m.strYoutube || null),
        id: m.idMeal,
        lang: "en"
      };
    }
    function normCocktail(c) {
      const ing = [];
      for (let i = 1; i <= 15; i++) {
        const n = (c["strIngredient" + i] || "").trim();
        if (n) ing.push(`${(c["strMeasure" + i] || "").trim()} ${n}`.trim());
      }
      const fr = (c.strInstructionsFR || "").trim();
      return {
        kind: "cocktail",
        title: c.strDrink,
        category: c.strAlcoholic === "Alcoholic" ? "Cocktail avec alcool" : "Cocktail sans alcool",
        area: [c.strGlass, c.strCategory].filter(Boolean).join(" \xB7 "),
        ingredients: ing.join("\n"),
        instructions: fr || (c.strInstructions || "").trim(),
        photo_url: c.strDrinkThumb,
        source_url: null,
        id: c.idDrink,
        lang: fr ? "fr" : "en"
      };
    }
    const FR_TERM = { Beef: "boeuf", Chicken: "poulet", Lamb: "agneau", Pork: "porc", Pasta: "p\xE2tes", Seafood: "poisson", Vegetarian: "l\xE9gumes", Miscellaneous: "gratin", Starter: "entr\xE9e", Side: "accompagnement", Dessert: "dessert", Breakfast: "brunch" };
    const FR_TYPE = { Starter: "entree", Side: "accompagnement", Dessert: "dessert", Breakfast: "" };
    const FR_SPIRIT = { Whiskey: "whisky", Scotch: "whisky", Bourbon: "bourbon", Rum: "rhum", Gin: "gin", Vodka: "vodka", Tequila: "tequila", Cognac: "cognac", Brandy: "cognac", Champagne: "champagne", Prosecco: "prosecco", Port: "porto", Wine: "vin" };
    const PROXIES = [(u) => "https://api.allorigins.win/raw?url=" + encodeURIComponent(u), (u) => "https://corsproxy.io/?" + encodeURIComponent(u)];
    const withTimeout = (p, ms, label) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error(label + " : pas de r\xE9ponse en " + ms / 1e3 + " s")), ms))]);
    async function viaProxy(url) {
      let last = "relais indisponible";
      for (const mk of PROXIES) {
        try {
          const r = await withTimeout(fetch(mk(url)), 12e3, "relais");
          if (r.ok) {
            const t = await r.text();
            if (t.length > 2e3) return t;
            last = "page vide";
          } else last = "relais " + r.status;
        } catch (err) {
          last = err.message || "relais indisponible";
        }
      }
      throw new Error("Marmiton inaccessible (" + last + ")");
    }
    const htmlDec = (s) => {
      const t = document.createElement("textarea");
      t.innerHTML = String(s == null ? "" : s);
      return t.value.trim();
    };
    function ldRecipe(html) {
      const re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
      let m;
      const nodes = [];
      const walk = (x) => {
        if (Array.isArray(x)) x.forEach(walk);
        else if (x && typeof x === "object") {
          nodes.push(x);
          if (x["@graph"]) walk(x["@graph"]);
        }
      };
      while (m = re.exec(html)) {
        try {
          walk(JSON.parse(m[1]));
        } catch (err) {
        }
      }
      return nodes.find((n) => [].concat(n["@type"] || []).indexOf("Recipe") >= 0);
    }
    const ldImg = (i) => !i ? null : typeof i === "string" ? i : Array.isArray(i) ? ldImg(i[0]) : i.url || null;
    const ldSteps = (x) => Array.isArray(x) ? x.reduce((a, y) => a.concat(ldSteps(y)), []) : typeof x === "string" ? [htmlDec(x)] : x && x.itemListElement ? ldSteps(x.itemListElement) : x && x.text ? [htmlDec(x.text)] : [];
    async function marmitonDirect(q, type, exclude) {
      const base = "https://www.marmiton.org";
      const search = async (withType) => {
        const html = await viaProxy(`${base}/recettes/recherche.aspx?aqt=${encodeURIComponent(q)}${withType && type ? "&type=" + type : ""}`);
        const out = [], re = /href=["'](\/recettes\/recette_[a-z0-9\-]+_\d+\.aspx)["']/gi;
        let m;
        while (m = re.exec(html)) {
          const u = base + m[1];
          if (out.indexOf(u) < 0 && (exclude || []).indexOf(u) < 0) out.push(u);
        }
        return out;
      };
      let links = await search(true);
      if (!links.length) links = await search(false);
      if (!links.length) throw new Error("aucune recette trouv\xE9e sur Marmiton");
      const cands = shuffleArr(links.slice(0, 14)).slice(0, 3);
      const got = [];
      await Promise.all(cands.map(async (url) => {
        try {
          const r = ldRecipe(await viaProxy(url));
          if (!r) return;
          const ar = r.aggregateRating || {}, rating = Number(ar.ratingValue);
          got.push({ kind: "recipe", title: htmlDec(r.name), category: "Marmiton", area: htmlDec([].concat(r.recipeCategory || []).join(" \xB7 ")), ingredients: (r.recipeIngredient || []).map(htmlDec).join("\n"), instructions: ldSteps(r.recipeInstructions).filter(Boolean).join("\n"), photo_url: ldImg(r.image), source_url: url, id: url, lang: "fr", source: "Marmiton", rating: rating > 0 ? Math.round(rating * 10) / 10 : null, ratingCount: Number(ar.ratingCount || ar.reviewCount || 0) || null });
        } catch (err) {
        }
      }));
      const ok = got.filter((g) => g.ingredients);
      if (!ok.length) throw new Error("fiches Marmiton illisibles");
      ok.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      return ok.filter((g) => (g.rating || 0) >= 4)[0] || ok[0];
    }
    const shuffleArr = (a) => {
      a = a.slice();
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = a[i];
        a[i] = a[j];
        a[j] = t;
      }
      return a;
    };
    async function marmiton(q, type, exclude) {
      let fnErr = "";
      try {
        const { data, error } = await Promise.race([db.store.sb.functions.invoke(window.FN_MARMITON || "marmiton", { body: { q, type, exclude } }), new Promise((_, rej) => setTimeout(() => rej(new Error("pas de r\xE9ponse en 25 s")), 25e3))]);
        if (error) {
          let msg = error.message || "erreur";
          try {
            const b = error.context && await error.context.json();
            if (b && b.error) msg = b.error;
          } catch (x) {
          }
          throw new Error(msg);
        }
        if (data && data.idea) return data.idea;
        throw new Error(data && data.error || "r\xE9ponse vide");
      } catch (err) {
        fnErr = err.message || "erreur";
      }
      try {
        return await marmitonDirect(q, type, exclude);
      } catch (err) {
        throw new Error(`fonction : ${fnErr} \xB7 acc\xE8s direct : ${err.message}`);
      }
    }
    const FALLBACK = (err) => `Marmiton indisponible (${String(err && err.message || err || "erreur").slice(0, 140)}) : id\xE9e issue de TheMealDB.`;
    async function randomMeal(cats = MEAL_CATS["Plat"], exclude = [], opts = {}) {
      const cat = pick(cats);
      try {
        return await marmiton(opts.query || FR_TERM[cat] || "plat", FR_TYPE[cat] === void 0 ? "platprincipal" : FR_TYPE[cat], exclude);
      } catch (err) {
        console.warn("Marmiton", err);
        var why = err;
      }
      const idea = await randomMealDB(cats, exclude);
      idea.note = FALLBACK(why);
      return idea;
    }
    async function randomMealDB(cats, exclude) {
      var _a;
      for (let t = 0; t < 4; t++) {
        const list = await getJSON(MEAL + "filter.php?c=" + encodeURIComponent(pick(cats)));
        const cand = (list.meals || []).filter((m) => !exclude.includes(m.idMeal));
        if (!cand.length) continue;
        const d = await getJSON(MEAL + "lookup.php?i=" + pick(cand).idMeal);
        if ((_a = d.meals) == null ? void 0 : _a[0]) return normMeal(d.meals[0]);
      }
      throw new Error("Aucune id\xE9e trouv\xE9e, r\xE9essayez.");
    }
    async function randomCocktail(o = {}) {
      const { alcoholic = true, ingredient = null } = o;
      try {
        return await marmiton(ingredient && FR_SPIRIT[ingredient] ? "cocktail " + FR_SPIRIT[ingredient] : alcoholic ? "cocktail alcool" : "cocktail sans alcool", "", o.exclude || []);
      } catch (err) {
        console.warn("Marmiton", err);
        var why = err;
      }
      const idea = await randomCocktailDB(o);
      idea.note = FALLBACK(why).replace("TheMealDB", "TheCocktailDB");
      return idea;
    }
    async function randomCocktailDB({ alcoholic = true, ingredient = null } = {}) {
      var _a;
      let ids;
      if (ingredient) {
        const l = await getJSON(COCK + "filter.php?i=" + encodeURIComponent(ingredient));
        ids = l.drinks;
      }
      if (!ids || !ids.length) ids = (await getJSON(COCK + "filter.php?a=" + (alcoholic ? "Alcoholic" : "Non_Alcoholic"))).drinks;
      for (let t = 0; t < 4; t++) {
        const d = await getJSON(COCK + "lookup.php?i=" + pick(ids).idDrink);
        const c = (_a = d.drinks) == null ? void 0 : _a[0];
        if (c) return normCocktail(c);
      }
      throw new Error("Aucun cocktail trouv\xE9, r\xE9essayez.");
    }
    async function tr(text) {
      const chunks = [];
      let cur = "";
      for (const line of text.split("\n")) {
        if ((cur + "\n" + line).length > 1200 && cur) {
          chunks.push(cur);
          cur = line;
        } else cur = cur ? cur + "\n" + line : line;
      }
      if (cur) chunks.push(cur);
      const out = [];
      for (const c of chunks) {
        const r = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fr&dt=t&q=" + encodeURIComponent(c));
        if (!r.ok) throw new Error("translate " + r.status);
        const d = await r.json();
        out.push(d[0].map((x) => x[0]).join(""));
      }
      return out.join("\n");
    }
    async function translateIdea(idea) {
      if (idea.lang === "fr") return idea;
      try {
        const [title, ingredients, instructions] = await Promise.all([tr(idea.title), tr(idea.ingredients), tr(idea.instructions)]);
        return __spreadProps(__spreadValues({}, idea), { title, ingredients, instructions, lang: "fr", translated: true });
      } catch (e) {
        console.warn("Traduction indisponible", e);
        return idea;
      }
    }
    return { MEAL_CATS, PAIRING, SPIRIT_MAP, randomMeal, randomCocktail, translateIdea };
  })();
  __m.ingredients = (() => {
    const { norm } = __m.util;
    const UNITS = [
      [/^kg\b\.?/, "g", 1e3],
      [/^(?:g|gr|grammes?)\b\.?/, "g", 1],
      [/^mg\b\.?/, "g", 1e-3],
      [/^(?:l|litres?)\b\.?/, "ml", 1e3],
      [/^dl\b\.?/, "ml", 100],
      [/^cl\b\.?/, "ml", 10],
      [/^ml\b\.?/, "ml", 1],
      [/^(?:c\.a\.?(?=\s)|c\.?\s*a\.?\s*soupe|c\.?\s*a\.?\s*s\b\.?|c\.?s\b\.?|cs\b|cuil(?:l?eres?)?\.?\s*a\.?\s*soupe|cuil(?:l?eres?)?\.?\s*a\.?\s*s\b\.?|tbsp)/, "cas", 1],
      [/^(?:c\.?\s*a\.?\s*cafe|c\.?\s*a\.?\s*c\b\.?|c\.?c\b\.?|cc\b|cuil(?:l?eres?)?\.?\s*a\.?\s*cafe|cuil(?:l?eres?)?\.?\s*a\.?\s*c\b\.?|tsp)/, "cac", 1],
      [/^pinc(?:ees?\b|\.)/, "pinc\xE9e", 1],
      [/^bou(?:quets?\b|\.)/, "bouquet", 1],
      [/^bottes?\b/, "botte", 1],
      [/^boites?\b/, "bo\xEEte", 1],
      [/^gousses?\b/, "gousse", 1],
      [/^tran(?:ches?\b|\.)/, "tranche", 1],
      [/^filets?\b/, "filet", 1],
      [/^(?:sachets?|sac\.)/, "sachet", 1],
      [/^pots?\b/, "pot", 1],
      [/^paquets?\b/, "paquet", 1],
      [/^bocal(?:aux)?\b/, "bocal", 1],
      [/^brins?\b/, "brin", 1],
      [/^branches?\b/, "branche", 1],
      [/^feuilles?\b/, "feuille", 1],
      [/^verres?\b/, "verre", 1],
      [/^tasses?\b/, "tasse", 1],
      [/^poign(?:ees?|e)\b/, "poign\xE9e", 1],
      [/^morceaux?\b/, "morceau", 1],
      [/^cubes?\b/, "cube", 1],
      [/^rouleaux?\b/, "rouleau", 1],
      [/^tiges?\b/, "tige", 1],
      [/^batons?\b/, "b\xE2ton", 1],
      [/^(?:pieces?|portions?|p\.)(?=\s|$)/, "n", 1]
    ];
    const WORDS = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6 };
    const FRACS = { "\xBD": 0.5, "\xBC": 0.25, "\xBE": 0.75, "\u2153": 1 / 3 };
    const SKIP = /^(?:(?:gros |fin |fleur de |du moulin )?(?:sel|poivre)\b.*|eau\b.*|blender|pic(?:s)? a brochette|bol|robot.*|ustensile.*)$/;
    const TYPOS = [[/\bcarrotes?\b/gi, "carotte"], [/\bspagh?ett?hi\b/gi, "spaghetti"], [/\bsaussices?\b/gi, "saucisse"], [/\bboulghour\b/gi, "boulgour"], [/\bcebette\b/gi, "c\xE9bette"], [/\bchampignons? de pari\b/gi, "champignons de Paris"], [/\bpoigne\b/gi, "poign\xE9e"]];
    const PREP = /^(?:a|au|aux|de|du|des|d['’]|en|pour|selon|avec|sans|ou)\b/i;
    const PARTICIPLE = /(?:e|ee|es|ees)\s*$/i;
    const isSkippedName = (name) => SKIP.test(norm(name).replace(/\(.*?\)/g, "").trim());
    function splitLine(s) {
      if (/^[\d½¼¾⅓]/.test(s) || !/[,+]|\s+et\s+/i.test(s)) return [s];
      const parts = s.split(/\s*(?:,|\+|\s+et\s+)\s*/i).map((x) => x.trim()).filter(Boolean);
      if (parts.length < 2 || parts.length > 6) return [s];
      if (parts.some((p) => PREP.test(p) || /^\d/.test(p) || p.split(/\s+/).length > 4 || /(?:é|ée|és|ées)$/i.test(p) || /^(?:facultatif|environ)/i.test(norm(p)))) return [s];
      return parts;
    }
    function parseOne(s0) {
      let s = s0.replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}️‍]/gu, " ").replace(/[’‘ʼ´`]/g, "'").replace(/\s+/g, " ").trim();
      s = s.replace(/^[^:\d]{3,26}:\s+(?=\S)/, "");
      const notes = [];
      s = s.replace(/\(([^)]*)\)/g, (m2, t) => {
        if (t.trim()) notes.push(t.trim());
        return " ";
      }).replace(/\s+/g, " ").trim();
      s = s.replace(/^(\d+(?:[.,]\d+)?)\s*(?:ou|à|-)\s*\d+(?:[.,]\d+)?(?!\d)/i, "$1");
      const altM = s.match(/\s+ou\s+.*$/i);
      const alt = altM ? altM[0].trim() : "";
      s = s.replace(/\s+ou\s+.*$/i, "");
      for (const [re, to] of TYPOS) s = s.replace(re, to);
      if (!/^[\d½¼¾⅓]/.test(s) && /^(?:(?:une?|petite?s?|grande?s?|belle|bonne|grosse?)\s+)?(?:pinc[ée]e(?!s)|bouquet|gousse(?!s)|bo[iî]te|tranche(?!s)|poign[ée]e?|botte|branche|brin|feuille(?!s)|pot|paquet|sachet|filet|morceau|c\.a\.(?=\s)|c\.?\s*[àa]\.?\s*(?:s|c|soupe|caf[ée])\b|c\.?[cs]\.?(?=\s)|cuill?\.?)/i.test(norm(s))) s = "1 " + s.replace(/^(?:(?:une?|petite?s?|grande?s?|belle|bonne|grosse?|quelques?)\s+)/i, "");
      let n = norm(s), qty = null, pos = 0, m;
      if (m = n.match(/^(\d+)\s*([½¼¾⅓])/)) {
        qty = +m[1] + FRACS[m[2]];
        pos = m[0].length;
      } else if (m = n.match(/^([½¼¾⅓])/)) {
        qty = FRACS[m[1]];
        pos = m[0].length;
      } else if (m = n.match(/^(\d+)\s*\/\s*(\d+)/)) {
        qty = +m[1] / +m[2];
        pos = m[0].length;
      } else if (m = n.match(/^(\d+(?:[.,]\d+)?)(?:\s*(?:a|-|ou)\s*\d+(?:[.,]\d+)?)?/)) {
        qty = parseFloat(m[1].replace(",", "."));
        pos = m[0].length;
      } else if (m = n.match(/^(un|une|deux|trois|quatre|cinq|six)\s+(?=pincee|bouquet|gousse|boite|tranche|poignee|botte|branche|brin|feuille|verre|tasse|pot|paquet|sachet|filet|morceau|cuil|c\.?\s?[asc]\b)/)) {
        qty = WORDS[m[1]];
        pos = m[0].length;
      }
      let rest = n.slice(pos).replace(/^\s+/, ""), fam = "n", u0 = "";
      if (qty !== null) {
        const adj = rest.replace(/^(?:grosse?|petite?|belle|bonne|grande?)\s+/, "");
        if (adj !== rest && UNITS.some(([re]) => re.test(adj))) rest = adj;
        for (const [re, f, k] of UNITS) {
          const u = rest.match(re);
          if (u) {
            fam = f;
            if (f === "ml") u0 = { 1e3: "l", 100: "dl", 10: "cl", 1: "ml" }[k];
            qty *= k;
            rest = rest.slice(u[0].length).replace(/^\s+/, "");
            if (f === "cas" || f === "cac") rest = rest.replace(/^(?:soupe|cafe)\b\s*/, "");
            break;
          }
        }
        const sz = rest.match(/^(?:de|d')\s*(\d+(?:[.,]\d+)?)\s*(kg|g|ml|cl|l)\b\s*/);
        if (sz && ["pot", "bo\xEEte", "sachet", "paquet", "bocal"].includes(fam)) {
          const u2 = UNITS.find(([re]) => re.test(sz[2])), v = parseFloat(sz[1].replace(",", ".")) * (u2 ? u2[2] : 1);
          qty = qty * v;
          fam = u2 ? u2[1] : "n";
          rest = rest.slice(sz[0].length);
        }
      }
      let name;
      name = s.slice(Math.min(n.length - rest.length, s.length));
      name = name.replace(/^\s*(?:de la |de l'|du |des |de |d')\s*/i, "").replace(/^\s*(?:de |d')/i, "");
      const tail = name.match(/\s+(\d+(?:[.,]\d+)?)\s*(branches?|feuilles?|gousses?|brins?|filets?)\b\.?/i);
      if (tail) {
        if (qty === null) {
          qty = parseFloat(tail[1].replace(",", "."));
          fam = norm(tail[2]).replace(/s$/, "").replace("branche", "branche");
          fam = { branche: "branche", feuille: "feuille", gousse: "gousse", brin: "brin", filet: "filet" }[fam] || "n";
        }
        name = name.replace(tail[0], " ");
      }
      name = name.replace(/\b(\w+) \1\b/gi, "$1").replace(/\b(?:facultatif|selon son go[uû]t|au go[uû]t|pour la d[ée]co(?:ration)?|environ|[àa] volont[ée])\b/gi, " ").replace(/\s+/g, " ").replace(/[.,;:+\-–\s]+$/, "").replace(/^[.,;:+\-–\s]+/, "").trim();
      if (!name) name = s0.replace(/[^\wÀ-ÿ' ]/g, " ").trim();
      return { qty, fam, name, note: notes.join(", "), alt, u: u0 };
    }
    function parseIngredient(line) {
      const raw = String(line || "").replace(/^[\s\-•*·–]+/, "").trim();
      if (!raw || /:$/.test(raw)) return [];
      return splitLine(raw.replace(/’/g, "'")).map(parseOne).filter((p) => p.name).map((p) => __spreadProps(__spreadValues({}, p), { skip: isSkippedName(p.name) }));
    }
    const DROP = new Set("belle bonne petit petite petits petites grand grande gros grosse jeune jeunes moyen moyenne taille entier entiere frais fraiche fraiches fraichement cru crue crus cuit cuite hache hachee haches hachees cisele ciselee ciselees emince eminee eminees rape rapee rapes pele pelee peles coupe coupee bien mur mure mures bio biologique extra quelque quelques un une".split(" "));
    const RULES = [
      [/^huile de olive/, "huile d\u2019olive"],
      [/^huile( de cuisson| vegetal)?$/, "huile"],
      [/^lait( entier| demi.ecreme| ecreme| frais)?$/, "lait"],
      [/^lait de coco/, "lait de coco"],
      [/^creme (fraiche|epais)/, "cr\xE8me \xE9paisse"],
      [/^creme( entiere?| liquide| fleurette| fluide)*$/, "cr\xE8me liquide"],
      [/^farine/, "farine"],
      [/^oignon( jaune| blanc| doux)?$/, "oignon"],
      [/^oignon rouge/, "oignon rouge"],
      [/^echalote/, "\xE9chalote"],
      [/^poireau/, "poireau"],
      [/^persil/, "persil"],
      [/^(?:feuille de )?basilic/, "basilic"],
      [/^menthe/, "menthe"],
      [/^tomate.* concass|^pulpe de tomate|^pulpe tomate|^coulis? de tomate|^couli de tomate|^tomate pele|^de de tomate/, "tomates concass\xE9es"],
      [/^(?:double )?concentre de tomate|^boite de concentre de tomate/, "concentr\xE9 de tomate"],
      [/^puree de tomate/, "pur\xE9e de tomate"],
      [/^tomate( multicolore| rond| grappe)?$/, "tomate"],
      [/^pomme de terre/, "pomme de terre"],
      [/^patate douce/, "patate douce"],
      [/^lardon|^laniere de bacon/, "lardons"],
      [/^oeuf( entier)?$/, "\u0153uf"],
      [/^jaune de oeuf/, "jaune d\u2019\u0153uf"],
      [/^blanc de oeuf/, "blanc d\u2019\u0153uf"],
      [/^(?:bouillon|cube).*legume/, "bouillon de l\xE9gumes"],
      [/^(?:bouillon|cube).*(?:poulet|volaille)/, "bouillon de poulet"],
      [/^(?:bouillon|cube).*boeuf/, "bouillon de b\u0153uf"],
      [/^bouillon$/, "bouillon"],
      [/^(?:tranche )?jambon blanc/, "jambon blanc"],
      [/^(?:tranche )?jambon cru/, "jambon cru"],
      [/^vin blanc/, "vin blanc"],
      [/^vin rouge/, "vin rouge"],
      [/^thon/, "thon"],
      [/^miel/, "miel"],
      [/^herbe.? (?:de provence|aromatique)/, "herbes de provence"],
      [/^(?:noix de )?muscade/, "muscade"],
      [/^pate (?:coquillage|torsade|penne|macaroni|coquillette)|^pate$/, "p\xE2tes"],
      [/^(?:pousse de )?epinard/, "\xE9pinards"],
      [/^parmesan/, "parmesan"],
      [/^thym/, "thym"],
      [/^laurier/, "laurier"],
      [/^carotte/, "carotte"],
      [/^champignon/, "champignons"],
      [/^lentille vert/, "lentilles vertes"],
      [/^lentille corail/, "lentilles corail"],
      [/^lentille$/, "lentilles"],
      [/^poi chiche|^pois chiche/, "pois chiches"],
      [/^petit poi|^petit pois/, "petits pois"],
      [/^sauce tomate (?:au |de )?basilic|^sauce tomate$/, "sauce tomate"],
      [/^tomate seche|^tomate sechee/, "tomates s\xE9ch\xE9es"],
      [/^noix de beurre|^beurre (?:doux|demi.sel|sale|mou|ramolli|fondu)?$/, "beurre"],
      [/^vinaigre (?:de )?balsamique/, "vinaigre balsamique"],
      [/^vinaigre (?:de )?vin blanc/, "vinaigre de vin blanc"],
      [/^poivron (?:rouge|vert|jaune|orange)s?$|^poivron$/, "poivron"],
      [/^gruyere/, "gruy\xE8re"],
      [/^emmental/, "emmental"],
      [/^comte/, "comt\xE9"],
      [/^creme de coco|^lait de coco/, "lait de coco"],
      [/^citron vert/, "citron vert"],
      [/^citron$/, "citron"],
      [/^spaghetti/, "spaghetti"],
      [/^saucisse$/, "saucisse"]
    ];
    const sing = (w) => w.length > 3 && /[s]$/.test(w) && !/(?:ss|us|is|ois|ais)$/.test(w) && !/^(?:mais|bras|pois|riz|jus|anis|cassis|brebis|couscous|tapas|noix|gruyere)$/.test(w) ? w.slice(0, -1) : w;
    function canonical(name) {
      if (/petits? pois/i.test(norm(name))) return { display: "petits pois", key: "petit pois" };
      let s = String(name).replace(/’/g, "'").replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}️]/gu, " ");
      s = s.replace(/(?:^|\s)[àa] chair \w+/gi, " ").replace(/\bde taille (?:moyenne|normale)\b/gi, " ");
      const toks = s.split(/\s+/).filter(Boolean).filter((t) => {
        const x = norm(t).replace(/[^a-z]/g, "");
        return !(DROP.has(x) || DROP.has(x.replace(/s$/, "")));
      });
      while (toks.length && /^(?:de|d'|du|des|a|au|aux|en|et)$/i.test(norm(toks[toks.length - 1]))) toks.pop();
      const key0 = toks.map((t) => norm(t).replace(/[,;]/g, "")).join(" ").replace(/\bd'/g, "de ").replace(/\s+/g, " ").trim();
      const keyS = key0.split(" ").map(sing).join(" ");
      const hit = RULES.find(([re]) => re.test(keyS));
      if (hit && hit[1]) return { display: hit[1], key: norm(hit[1]).split(" ").map(sing).join(" ") };
      const HEADS = /^(oeuf|courgette|carotte|oignon|tomate|pomme|poire|poivron|aubergine|citron|orange|echalote|banane|concombre|navet|avocat|endive|kiwi|clementine|patate|saucisse|artichaut|betterave|figue|peche|abricot|fraise|cuisse|escalope|crepe|poireau)s?$/;
      const ADJ = /^(rouge|vert|jaune|blanc|noir|douce|violette|cerise|sechee|seche|fumee|briseee|brisee|feuilletee|sablee|confit)s$/;
      const disp = toks.map((t, k) => {
        const x = norm(t);
        return k === 0 && HEADS.test(x) && /s$/i.test(t) && !/(?:us|is)$/.test(x) || k > 0 && ADJ.test(x) ? t.slice(0, -1) : t;
      }).join(" ").replace(/^./, (c) => c.toLowerCase());
      return { display: disp || name, key: keyS };
    }
    return { isSkippedName, parseIngredient, canonical };
  })();
  __m.shopping = (() => {
    const db = __m.db;
    const { ingredientLines, guessShop, norm } = __m.util;
    const { parseIngredient, canonical, isSkippedName } = __m.ingredients;
    const isSkipped = (name) => isSkippedName(name);
    function parseLine(line) {
      const items = parseIngredient(line);
      if (!items.length) return null;
      const p = items[0], c = canonical(p.name);
      return { qty: p.qty, fam: p.fam, unit: p.fam, name: c.display, key: c.key, skip: p.skip };
    }
    const parseLines = (line) => parseIngredient(line).map((p) => {
      const c = canonical(p.name);
      return { qty: p.qty, fam: p.fam === "n" && p.qty !== null && /^bouillon/.test(c.display) ? "cube" : p.fam, unit: p.fam, name: c.display, key: c.key, skip: p.skip };
    });
    const PLURAL = { morceau: "morceaux", rouleau: "rouleaux" };
    const fmtNum = (x) => (Math.round(x * 100) / 100).toString().replace(".", ",");
    const FR = { 0.25: "\xBC", 0.5: "\xBD", 0.75: "\xBE", 0.33: "\u2153", 0.67: "\u2154" };
    const fmtFrac = (x) => {
      const w = Math.floor(x), f = Math.round((x - w) * 100) / 100;
      return FR[f] ? w ? `${w}${FR[f]}` : FR[f] : fmtNum(x);
    };
    function formatQty(qty, fam, u) {
      if (qty === null || qty === void 0) return "";
      if (fam === "g") return qty >= 1e3 ? `${fmtNum(qty / 1e3)} kg` : `${fmtNum(qty)} g`;
      if (fam === "ml") return qty >= 1e3 ? `${fmtNum(qty / 1e3)} l` : qty >= 10 ? `${fmtNum(qty / 10)} cl` : `${fmtNum(qty)} ml`;
      if (fam === "cas") return `${fmtFrac(qty)} c. \xE0 s.`;
      if (fam === "cac") return `${fmtFrac(qty)} c. \xE0 c.`;
      if (fam === "n") return fmtFrac(qty);
      return `${fmtFrac(qty)} ${qty > 1 ? PLURAL[fam] || fam + "s" : fam}`;
    }
    const LIQUID = /^(huile|lait|creme|vinaigre|vin |vin$|bouillon|jus |sauce soja|eau|cafe|biere|cidre)/;
    const TO_ML = { cas: 15, cac: 5, verre: 200, tasse: 240, filet: 10 };
    function combine(list, key) {
      const liquid = LIQUID.test(key), out = {};
      list.forEach((a) => {
        let { qty, fam } = a;
        if (liquid && TO_ML[fam] && !(fam === "filet" && qty > 3)) {
          qty *= TO_ML[fam];
          fam = "ml";
        } else if (liquid && fam === "g") fam = "ml";
        out[fam] = (out[fam] || 0) + qty;
      });
      return Object.keys(out).map((f) => ({ fam: f, qty: out[f] }));
    }
    const amountsText = (list) => list.map((a) => list.length > 1 && a.fam === "n" ? `${formatQty(a.qty, "n")} pi\xE8ce${a.qty > 1 ? "s" : ""}` : formatQty(a.qty, a.fam)).join(" + ") || null;
    const amountsOf = (row) => !row.quantity ? [] : String(row.quantity).split(/\s*\+\s*/).map((part) => {
      const p = parseLine(part + " " + row.name);
      return p && p.qty !== null ? { qty: p.qty, fam: p.fam } : null;
    }).filter(Boolean);
    const keyOf = (row) => canonical(row.name).key;
    const addTitle = (t, title) => !title || (t || "").split(", ").includes(title) ? t : [t, title].filter(Boolean).join(", ").slice(0, 120);
    const itemLabel = (row) => {
      if (!row.quantity) return row.name;
      const first = amountsOf(row)[0], name = first ? plural(row.name, first.qty, first.fam) : row.name;
      if (/^[\d.,/\s½¼¾]+$/.test(row.quantity)) return `${row.quantity} ${name}`;
      return `${row.quantity} ${VOWEL.test(name) ? "d\u2019" : "de "}${name}`;
    };
    async function addLines(lines, title, { dropSaltPepper = true, shop = null } = {}) {
      const parsed = lines.reduce((a, l) => a.concat(parseLines(l)), []).filter((p) => !(dropSaltPepper && p.skip));
      const existing = db.store.t.shopping_items.filter((i) => !i.checked).map((row) => ({ row, key: keyOf(row), name: row.name, amounts: amountsOf(row), title: row.recipe_title, dirty: false }));
      const fresh = [];
      let count = 0;
      for (const p of parsed) {
        const hit = existing.find((x) => x.key === p.key) || fresh.find((x) => x.key === p.key);
        const am = p.qty !== null ? [{ qty: p.qty, fam: p.fam }] : [];
        if (!hit) {
          fresh.push({ key: p.key, name: p.name, amounts: am, title });
          count++;
          continue;
        }
        hit.amounts = hit.amounts.concat(am);
        hit.dirty = true;
        count++;
        const t = addTitle(hit.title, title);
        if (t !== hit.title) hit.title = t;
      }
      for (const x of existing.filter((e) => e.dirty)) await db.patch("shopping_items", x.row.id, { quantity: amountsText(combine(x.amounts, x.key)), recipe_title: x.title || null });
      await db.addMany("shopping_items", fresh.map((f) => ({ name: f.name, quantity: amountsText(combine(f.amounts, f.key)), shop: shop || guessShop(f.name), recipe_title: f.title || null, checked: false })));
      return count;
    }
    const addIngredients = (recipe) => addLines(ingredientLines(recipe.ingredients), recipe.title);
    async function tidyList() {
      const rows = db.store.t.shopping_items.filter((i) => !i.checked);
      let removed = 0, merged = 0, moved = 0;
      const groups = [];
      for (const row of rows) {
        const p = parseLine(row.name);
        if (!p || p.skip) {
          await db.del("shopping_items", row.id);
          removed++;
          continue;
        }
        const c = canonical(row.name), g = groups.find((x) => x.key === c.key);
        const am = amountsOf(row);
        if (g) {
          g.amounts = g.amounts.concat(am);
          g.title = addTitle(g.title, row.recipe_title);
          g.drop.push(row.id);
        } else groups.push({ key: c.key, name: c.display, row, amounts: am, title: row.recipe_title, drop: [] });
      }
      for (const g of groups) {
        for (const id of g.drop) {
          await db.del("shopping_items", id);
          merged++;
        }
        const shop = guessShop(g.name), quantity = amountsText(combine(g.amounts, g.key));
        if (g.drop.length || g.row.name !== g.name || (g.row.quantity || null) !== quantity || g.row.shop !== shop) {
          if (g.row.shop !== shop) moved++;
          await db.patch("shopping_items", g.row.id, { name: g.name, quantity, shop, recipe_title: g.title || null });
        }
      }
      return { removed, merged, moved };
    }
    const VOWEL = /^(?:[aeiouyàâäéèêëîïôöùûüœ]|huile|herbe|huitre|huître)/i;
    const COUNTABLE = /^(œuf|courgette|carotte|oignon|tomate|pomme de terre|pomme|poire|poivron|aubergine|citron|orange|échalote|champignon|banane|concombre|navet|avocat|endive|kiwi|clémentine|patate|tranche|filet|gousse|cuisse|escalope|saucisse|tortilla|crêpe|poireau|artichaut|betterave|figue|pêche|abricot|fraise|brin|feuille|bûche|pâte(?= (?:brisée|feuilletée|sablée)))\b/i;
    const VEG_KG = /^(pomme de terre|carotte|tomate|courgette|oignon|aubergine|poireau|champignon|patate|navet|betterave|pomme|poire)\b/i;
    const plural = (name, qty, fam) => {
      const m = name.match(COUNTABLE);
      if (!m) return name;
      const need = fam === "n" && qty > 1 || fam === "g" && qty >= 250 && VEG_KG.test(name);
      if (!need) return name;
      const head = m[0], rest = name.slice(head.length);
      const adj = (r) => r.replace(/\b(rouge|vert|jaune|blanc|noir|douce|violette|cerise|séchée|brisée|feuilletée|sablée|fumée|confit)\b/gi, (w) => /s$/i.test(w) ? w : w + "s");
      if (/^pomme de terre/i.test(head)) return "pommes de terre" + rest;
      return (/[sxz]$/i.test(head) ? head : head + "s") + adj(rest);
    };
    const TYPO = [[/\bcarrotes?\b/gi, (m) => /s$/i.test(m) ? "carottes" : "carotte"], [/\bsauss?ices?\b/gi, (m) => /s$/i.test(m) ? "saucisses" : "saucisse"], [/\bsaussice/gi, "saucisse"], [/\bspagh?etthi/gi, "spaghetti"], [/\bbou?lghour\b/gi, "boulgour"], [/\bcebettes?\b/gi, "ciboule"], [/\bpari\b/gi, "Paris"], [/\bpoigne\b/gi, "poign\xE9e"], [/\brapé(s?)\b/gi, "r\xE2p\xE9$1"], [/\bpinc\.?(?=\s)/gi, "pinc\xE9e"], [/\btran\.(?=\s)/gi, "tranche"], [/\bpommes? de terres?\b/gi, (m) => /^pommes/i.test(m) ? "pommes de terre" : "pomme de terre"], [/\boeufs?\b/gi, (m) => /s$/i.test(m) ? "\u0153ufs" : "\u0153uf"], [/\bboeuf\b/gi, "b\u0153uf"], [/\blegumes?\b/gi, (m) => /s$/i.test(m) ? "l\xE9gumes" : "l\xE9gume"], [/\bherbes? de provence\b/gi, "herbes de Provence"], [/\bcreme\b/gi, "cr\xE8me"], [/\bpate\b/gi, "p\xE2te"], [/\bsouple\b/gi, "souple"]];
    const SPOON_S = /\b(?:c\.?\s?à\.?\s?s\b\.?|c\.?\s?a\.?\s?s\b\.?|c\.à\.s\.?|cs\b\.?|c\.s\b\.?|cuill?[èe]res?(?:\(s\))?\.?\s+à\s+soupe|cuill?[èe]re?\.?\s+à\s+s\b\.?|cuil\.?\s+à\s+soupe|c\.?\s+à\s+soupe|tbsp)/gi;
    const SPOON_C = /\b(?:c\.?\s?à\.?\s?c\b\.?|c\.?\s?a\.?\s?c\b\.?|c\.à\.c\.?|cc\b\.?|c\.c\b\.?|càc\b|cuill?[èe]res?(?:\(s\))?\.?\s+à\s+caf[ée]|cuil\.?\s+à\s+caf[ée]|c\.?\s+à\s+caf[ée]|tsp)/gi;
    const FRAC = { "1/2": "\xBD", "1/4": "\xBC", "3/4": "\xBE", "1/3": "\u2153", "2/3": "\u2154", "0.5": "\xBD", "0,5": "\xBD", "0.25": "\xBC", "0,25": "\xBC", "0.75": "\xBE" };
    const num = (t) => parseFloat(String(t).replace(",", "."));
    function harmonizeLine(line) {
      let t = String(line || "").replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}️‍]/gu, " ").replace(/\s+/g, " ").replace(/^[\s\-•*·–]+/, "").trim();
      if (!t || /:$/.test(t)) return t;
      t = t.replace(/(\w)[’‘ʼ´`'](?=\w)/g, "$1\u2019");
      for (const [re, to] of TYPO) t = t.replace(re, to);
      t = t.replace(SPOON_S, "c. \xE0 s.").replace(SPOON_C, "c. \xE0 c.").replace(/c\. à (s|c)\.\s*\./g, "c. \xE0 $1.").replace(/(c\. à s\.) [Ss]oupe\b/, "$1");
      t = t.replace(/(\d)\s*(kg|g|gr|grammes?|mg)\b\.?/gi, (m2, n, u) => `${n} ${/^kg$/i.test(u) ? "kg" : /^mg$/i.test(u) ? "mg" : "g"}`);
      t = t.replace(/(\d+(?:[.,]\d+)?|\d+\/\d+|[½¼¾⅓⅔])\s*(ml|cl|dl|l|litres?)\b\.?/gi, (m2, n, u) => {
        var _a;
        const v = (_a = { "\xBD": 0.5, "\xBC": 0.25, "\xBE": 0.75, "\u2153": 1 / 3, "\u2154": 2 / 3 }[n]) != null ? _a : n.includes("/") ? n.split("/")[0] / n.split("/")[1] : num(n);
        const ml = v * { ml: 1, cl: 10, dl: 100, l: 1e3, litre: 1e3, litres: 1e3 }[u.toLowerCase()];
        return formatQty(Math.round(ml * 100) / 100, "ml");
      });
      t = t.replace(/(^|\s)(\d+)\s*(1\/2|1\/4|3\/4)(?=\s)/g, (m2, a, w, f) => `${a}${w}${FRAC[f]}`).replace(/(^|\s)(1\/2|1\/4|3\/4|1\/3|2\/3|0[.,]5|0[.,]25|0[.,]75)(?=\s)/g, (m2, a, f) => a + FRAC[f]);
      t = t.replace(/^((?:\d+[\d.,/½¼¾⅓⅔]*|[½¼¾⅓⅔])\s*(?:à\s*\d+\s*)?(?:g|kg|mg|cl|l|ml|c\. à s\.|c\. à c\.))\s+(?!de\b|d’|du\b|des\b|d'|\()(\S)/i, (m2, q, c) => `${q} ${/^[aeiouyàâéèêëîïôöùûüœh]/i.test(c) ? "d\u2019" : "de "}${c}`);
      t = t.replace(/^((?:[\d½¼¾⅓⅔][^a-zA-ZÀ-ÿ]*(?:\s*(?:kg|mg|g|cl|l|ml|c\. à s\.|c\. à c\.)\s+(?:de |d’)?)?)|(?:(?:de |d’)))?([A-ZÀ-ÝŒ])(?=[a-zà-ÿœ])/, (m2, a, c) => (a || "") + c.toLowerCase());
      const UW = "pinc\xE9e|tranche|gousse|branche|feuille|brin|sachet|bo\xEEte|botte|bouquet|paquet|pot|verre|tasse|poign\xE9e|morceau|cube|rouleau|tige|b\xE2ton|portion";
      let m = t.match(new RegExp("^(\\d+(?:[.,]\\d+)?)\\s+(" + UW + ")(?=\\s|$)(\\s+(?:de |d\u2019)?)?([A-Z\xC0-\xDD\u0152](?=[a-z\xE0-\xFF\u0153]))?"));
      if (m) {
        const q = num(m[1]);
        t = m[1] + " " + m[2] + (q > 1 && !/s$/.test(m[2]) ? "s" : "") + (m[3] || "") + (m[4] ? m[4].toLowerCase() : "") + t.slice(m[0].length);
      } else if ((m = t.match(/^(\d+(?:[.,]\d+)?)\s+(?![a-zà-ÿ]\.)([^\s].*)$/)) && num(m[1]) > 1 && COUNTABLE.test(m[2].replace(/^[A-ZÀ-ÝŒ]/, (c) => c.toLowerCase()))) {
        t = m[1] + " " + plural(m[2].replace(/^[A-ZÀ-ÝŒ]/, (c) => c.toLowerCase()), num(m[1]), "n");
      }
      t = t.replace(/^(\d+(?:[.,]\d+)?\s+(?:bouillon|œuf)s?\s)/i, (a, b) => b).replace(/ (Bœuf|Poulet|Légumes|Volaille)\b/g, (a, w) => " " + w.toLowerCase());
      return t.replace(/\s+/g, " ").replace(/\s+([,.;])/g, "$1").replace(/\s*\.$/, "").trim();
    }
    const harmonizeIngredients = (text) => String(text || "").split(/\r?\n/).map((l) => l.trim() ? harmonizeLine(l) : "").filter((l, i, a) => l || i && a[i - 1]).join("\n").trim();
    return { isSkipped, parseLine, parseLines, formatQty, itemLabel, addLines, addIngredients, tidyList, harmonizeLine, harmonizeIngredients };
  })();
  __m.scan = (() => {
    const { esc } = __m.util;
    const { harmonizeIngredients } = __m.shopping;
    const SRC = "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js";
    const LANG = "https://tessdata.projectnaptha.com/4.0.0_fast";
    let loading = null;
    function loadLib() {
      if (window.Tesseract) return Promise.resolve();
      return loading || (loading = new Promise((res, rej) => {
        const s = document.createElement("script");
        s.src = SRC;
        s.onload = res;
        s.onerror = () => {
          loading = null;
          rej(new Error("biblioth\xE8que de lecture indisponible (connexion ?)"));
        };
        document.head.appendChild(s);
      }));
    }
    async function prepare(file, max = 1800) {
      const bmp = window.createImageBitmap ? await createImageBitmap(file) : await new Promise((res, rej) => {
        const im = new Image();
        im.onload = () => res(im);
        im.onerror = rej;
        im.src = URL.createObjectURL(file);
      });
      const w0 = bmp.width || bmp.naturalWidth, h0 = bmp.height || bmp.naturalHeight, k = Math.min(1, max / Math.max(w0, h0));
      const c = document.createElement("canvas");
      c.width = Math.round(w0 * k);
      c.height = Math.round(h0 * k);
      const x = c.getContext("2d");
      x.drawImage(bmp, 0, 0, c.width, c.height);
      const d = x.getImageData(0, 0, c.width, c.height), p = d.data;
      let lo = 255, hi = 0;
      for (let i = 0; i < p.length; i += 4) {
        const g = p[i] * 0.3 + p[i + 1] * 0.59 + p[i + 2] * 0.11 | 0;
        p[i] = g;
        if (g < lo) lo = g;
        if (g > hi) hi = g;
      }
      const span = Math.max(40, hi - lo);
      for (let i = 0; i < p.length; i += 4) {
        const v = Math.max(0, Math.min(255, (p[i] - lo) * 255 / span));
        p[i] = p[i + 1] = p[i + 2] = v;
      }
      x.putImageData(d, 0, 0);
      return c;
    }
    async function ocr(file, onProgress) {
      onProgress && onProgress("Chargement du lecteur de texte (la premi\xE8re fois, quelques Mo)\u2026");
      await loadLib();
      const canvas = await prepare(file);
      const r = await window.Tesseract.recognize(canvas, "fra", { langPath: LANG, logger: (m) => {
        if (onProgress && m.status === "recognizing text") onProgress(`Lecture de la photo\u2026 ${Math.round((m.progress || 0) * 100)} %`);
        else if (onProgress && /loading|initializ/.test(m.status || "")) onProgress("Pr\xE9paration du lecteur\u2026");
      } });
      return String(r && r.data && r.data.text || "");
    }
    const NOISE = /(mis en bouteille|propri[ée]taire|r[ée]colt|produit (de|en)|contient|sulfite|alc\.?|\bvol\b|%|enceinte|grossesse|www\.|\.com|\.fr\b|e\s?\d{2,3}\s?ml|\bcl\b|lot\b|recyc|trier|consommation|abus|sant[ée]|imported|product of)/i;
    const REGIONS = [["Bordeaux", "France"], ["M\xE9doc", "France"], ["Haut-M\xE9doc", "France"], ["Margaux", "France"], ["Pauillac", "France"], ["Saint-Est\xE8phe", "France"], ["Saint-Julien", "France"], ["Pomerol", "France"], ["Saint-\xC9milion", "France"], ["Pessac-L\xE9ognan", "France"], ["Graves", "France"], ["Sauternes", "France"], ["Bourgogne", "France"], ["Chablis", "France"], ["Meursault", "France"], ["Pommard", "France"], ["Gevrey-Chambertin", "France"], ["Beaujolais", "France"], ["Morgon", "France"], ["Brouilly", "France"], ["C\xF4tes du Rh\xF4ne", "France"], ["Ch\xE2teauneuf-du-Pape", "France"], ["Gigondas", "France"], ["Hermitage", "France"], ["Sancerre", "France"], ["Pouilly-Fum\xE9", "France"], ["Vouvray", "France"], ["Chinon", "France"], ["Muscadet", "France"], ["Alsace", "France"], ["Languedoc", "France"], ["Minervois", "France"], ["Corbi\xE8res", "France"], ["Provence", "France"], ["Bandol", "France"], ["Cahors", "France"], ["Madiran", "France"], ["Juran\xE7on", "France"], ["Champagne", "France"], ["Cr\xE9mant", "France"], ["Chianti", "Italie"], ["Barolo", "Italie"], ["Barbaresco", "Italie"], ["Prosecco", "Italie"], ["Toscana", "Italie"], ["Rioja", "Espagne"], ["Ribera del Duero", "Espagne"], ["Cava", "Espagne"], ["Douro", "Portugal"], ["Porto", "Portugal"], ["Mosel", "Allemagne"], ["Napa", "\xC9tats-Unis"], ["Mendoza", "Argentine"], ["Marlborough", "Nouvelle-Z\xE9lande"]];
    const noacc = (t) => String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
    function parseWine(text) {
      const out = {}, raw = String(text || "");
      const lines = raw.split(/\r?\n/).map((l) => l.replace(/[^\wÀ-ÿ'’.,;:()&\/%°\- ]/g, " ").replace(/\s+/g, " ").trim()).filter((l) => l.length > 2 && (l.match(/[A-Za-zÀ-ÿ]/g) || []).length >= Math.ceil(l.length * 0.5));
      const all = noacc(raw);
      const vint = raw.match(/\b(19[5-9]\d|20[0-3]\d)\b/g);
      if (vint) out.vintage = Number(vint[vint.length - 1]);
      let m = raw.match(/\b(\d{2,3})\s?(cl|ml)\b/i);
      if (m) {
        const cl = m[2].toLowerCase() === "ml" ? Math.round(Number(m[1]) / 10) : Number(m[1]);
        if ([20, 37, 50, 70, 75, 150, 300].includes(cl) || cl >= 10 && cl <= 300) out.bottle_size = `${cl} cl`;
      }
      if (/magnum/.test(all)) out.bottle_size = "150 cl";
      if (/champagne|cremant|prosecco|\bcava\b|brut\b|methode traditionnelle|petillant/.test(all)) out.wine_type = "Effervescent";
      else if (/sauternes|liquoreux|moelleux|vendanges tardives/.test(all)) out.wine_type = "Liquoreux";
      else if (/porto|banyuls|xeres|sherry|maury|pineau|muscat de/.test(all)) out.wine_type = "Fortifi\xE9";
      else if (/whisky|whiskey|cognac|armagnac|\brhum\b|\bgin\b|vodka|calvados|tequila/.test(all)) out.wine_type = "Spiritueux";
      else if (/\brose\b/.test(all)) out.wine_type = "Ros\xE9";
      else if (/\bblanc\b|blanc de/.test(all)) out.wine_type = "Blanc";
      else if (/\brouge\b/.test(all)) out.wine_type = "Rouge";
      const ac = raw.match(/(?:A\.?O\.?[CP]\.?|Appellation)\s+([A-Za-zÀ-ÿ'’\- ]{3,40}?)\s+(?:Contr[ôo]l[ée]e|Prot[ée]g[ée]e|A\.?O\.?[CP])/i);
      const hit = REGIONS.find(([r]) => all.indexOf(noacc(r)) >= 0);
      if (ac) {
        out.region = ac[1].trim().toLowerCase().replace(/(^|[\s\-])([a-zà-ÿ])/g, (s, a, b) => a + b.toUpperCase());
        const h2 = REGIONS.find(([r]) => noacc(ac[1]).indexOf(noacc(r)) >= 0);
        out.country = h2 ? h2[1] : "France";
      } else if (hit) {
        out.region = hit[0];
        out.country = hit[1];
      }
      if (!out.country) {
        if (/italia|italy|\bdocg?\b|\bigt\b/.test(all)) out.country = "Italie";
        else if (/espana|spain|denominacion/.test(all)) out.country = "Espagne";
        else if (/portugal/.test(all)) out.country = "Portugal";
        else if (/deutsch|germany|qualitatswein/.test(all)) out.country = "Allemagne";
        else if (/\bfrance\b|\baoc\b|\baop\b/.test(all)) out.country = "France";
      }
      const cand = lines.filter((l) => !NOISE.test(l) && !/^(\d|[a-z]\s)/.test(l) && l.length <= 48);
      const prod = cand.find((l) => /(ch[aâ]teau|domaine|clos\b|maison|\bmas\b|cave |cuv[ée]e)/i.test(l));
      if (prod) out.producer = prod.replace(/\b\d{4}\b/g, "").trim();
      const rest = cand.filter((l) => l !== prod && !(out.region && noacc(l) === noacc(out.region)) && !/^(appellation|grand vin|vin de)/i.test(l) && !/\b(A\.?O\.?[CP]|contr[ôo]l|prot[ée]g[ée]e)/i.test(l) && !/\b(19|20)\d\d\b/.test(l));
      const upper = rest.filter((l) => l === l.toUpperCase()).sort((a, b) => b.length - a.length)[0];
      out.name = (upper || rest.sort((a, b) => b.length - a.length)[0] || out.producer || "").replace(/\s+/g, " ");
      if (out.name) out.name = out.name.toLowerCase().replace(/(^|[\s'’\-])([a-zà-ÿ])/g, (s, a, b) => a + b.toUpperCase());
      return out;
    }
    function parseRecipe(text) {
      const out = {};
      const lines = String(text || "").split(/\r?\n/).map((l) => l.replace(/[^\wÀ-ÿ'’.,;:()&\/%°€\-–•½¼¾+ ]/g, " ").replace(/\s+/g, " ").trim()).filter((l) => l.length > 1);
      if (!lines.length) return out;
      const iIng = lines.findIndex((l) => /^ingr[ée]dients?\b/i.test(l)), iPrep = lines.findIndex((l, i) => i > iIng && /^(pr[ée]paration|recette|d[ée]roulement|instructions?|[ée]tapes?|progression)\b/i.test(l));
      const head = lines.slice(0, iIng > 0 ? iIng : 1);
      const title = head.find((l) => l.length > 3 && !/^(pour|temps|pr[ée]paration|cuisson|\d)/i.test(l)) || lines[0];
      out.title = title.replace(/[.:]+$/, "").replace(/^./, (c) => c.toUpperCase());
      const all = lines.join(" ");
      let m = all.match(/(?:pour\s+)?(\d{1,2})\s*(?:personnes?|pers\b\.?|parts?|portions?|convives)/i);
      if (m) out.servings = Number(m[1]);
      m = all.match(/pr[ée]paration\s*:?\s*(\d+)\s*(h|min)/i);
      if (m) out.prep_minutes = m[2].toLowerCase() === "h" ? Number(m[1]) * 60 : Number(m[1]);
      m = all.match(/cuisson\s*:?\s*(\d+)\s*(h|min)/i);
      if (m) out.cook_minutes = m[2].toLowerCase() === "h" ? Number(m[1]) * 60 : Number(m[1]);
      let ing = [], steps = [];
      if (iIng >= 0) {
        ing = lines.slice(iIng + 1, iPrep > iIng ? iPrep : void 0);
        if (iPrep > iIng) steps = lines.slice(iPrep + 1);
      } else {
        const body = lines.filter((l) => l !== title);
        ing = body.filter((l) => /^(\d|[-•]\s|[½¼¾]|une?\s|quelques|sel|poivre)/i.test(l) && l.length < 60);
        steps = body.filter((l) => ing.indexOf(l) < 0 && l.length > 25);
      }
      const ingOut = [];
      ing.forEach((l) => {
        if (/^(pour|temps|cuisson|pr[ée]paration)\b/i.test(l)) return;
        ingOut.push(l.replace(/^[-•]\s*/, ""));
      });
      out.ingredients = harmonizeIngredients(ingOut.join("\n"));
      const joined = steps.join(" ").replace(/(\d+)\s*[.)]\s+(?=[A-ZÉÈÀ])/g, "\n").replace(/\.\s+(?=[A-ZÉÈÀ])/g, ".\n");
      out.instructions = joined.split("\n").map((s) => s.trim()).filter(Boolean).join("\n");
      return out;
    }
    const scanBox = (label) => `<div class="scanbox"><b>${esc(label)}</b><div class="scanbtns"><label class="btn small">Prendre une photo<input type="file" accept="image/*" capture="environment" id="scanCam" hidden></label><label class="btn small">Choisir une photo<input type="file" accept="image/*" id="scanPick" hidden></label></div><div id="scanMsg" class="muted small">La fiche est remplie automatiquement ; v\xE9rifiez les champs avant d\u2019enregistrer.</div></div>`;
    function bindScan(root, run) {
      const msg = (t) => {
        const m = root.querySelector("#scanMsg");
        if (m) m.textContent = t;
      };
      const go = async (e) => {
        const f = e.target.files && e.target.files[0];
        e.target.value = "";
        if (!f) return;
        try {
          msg("Lecture en cours\u2026");
          const n = await run(f, msg);
          msg(n ? `${n} champ${n > 1 ? "s" : ""} rempli${n > 1 ? "s" : ""} : v\xE9rifiez et corrigez si besoin.` : "Peu de texte reconnu : essayez une photo plus nette, bien \xE9clair\xE9e et de face, ou saisissez la fiche \xE0 la main.");
        } catch (err) {
          console.error(err);
          msg("Lecture impossible sur cet appareil (" + (err.message || "erreur") + "). Saisissez la fiche \xE0 la main.");
        }
      };
      ["#scanCam", "#scanPick"].forEach((s) => {
        const i = root.querySelector(s);
        if (i) i.onchange = go;
      });
    }
    function fillForm(form, values) {
      let n = 0;
      Object.keys(values).forEach((k) => {
        const el = form.elements[k], v = values[k];
        if (!el || v === void 0 || v === null || v === "") return;
        if (el.value && String(el.value).trim() && !(k === "wine_type" || k === "category")) return;
        el.value = v;
        n++;
      });
      return n;
    }
    return { ocr, parseWine, parseRecipe, scanBox, bindScan, fillForm };
  })();
  __m.seed = (() => {
    const db = __m.db;
    async function importFile(table, file) {
      const key = table === "recipes" ? "recipes" : "cellar";
      const rows = window.SEED && window.SEED[key] ? window.SEED[key] : await (await fetch(file)).json();
      const withFamily = rows.map((r) => __spreadProps(__spreadValues({}, r), { family_id: db.store.familyId }));
      let n = 0;
      for (let i = 0; i < withFamily.length; i += 40) {
        const res = await db.addMany(table, withFamily.slice(i, i + 40), { ignoreDuplicates: true });
        n += res.length;
      }
      return n;
    }
    const importRecipes = () => importFile("recipes", "data/recipes.json");
    const importCellar = () => importFile("cellar_items", "data/cellar.json");
    return { importRecipes, importCellar };
  })();
  __m.ideas = (() => {
    const { esc, openModal, closeModal, toast } = __m.util;
    const { translateIdea } = __m.ext;
    const db = __m.db;
    const { harmonizeIngredients } = __m.shopping;
    const ratingHTML = (idea) => idea.rating ? ` <span class="chip rating">\u2605 ${String(idea.rating).replace(".", ",")}/5${idea.ratingCount ? ` \xB7 ${idea.ratingCount} avis` : ""}</span>` : "";
    const ideaCardHTML = (idea) => {
      const ing = String(harmonizeIngredients(idea.ingredients) || "").split("\n").filter(Boolean);
      const steps = String(idea.instructions || "").split("\n").filter(Boolean);
      return `<div class="idea">
    ${idea.photo_url ? `<img class="ideaphoto" src="${esc(idea.photo_url)}" alt="" loading="lazy">` : ""}
    <div class="ideabody">
      <span class="chip">${esc(idea.source === "Marmiton" ? "Marmiton" : idea.kind === "cocktail" ? idea.category : "Id\xE9e recette")}</span>${ratingHTML(idea)}
      <h3 class="script">${esc(idea.title)}</h3>
      ${idea.area ? `<p class="muted">${esc(idea.area)}</p>` : ""}
      <h4>Ingr\xE9dients</h4><ul>${ing.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
      <h4>Pr\xE9paration</h4>${steps.map((s) => `<p>${esc(s)}</p>`).join("")}
      ${idea.lang === "en" ? '<p class="muted small">Texte en anglais (traduction automatique indisponible).</p>' : idea.translated ? '<p class="muted small">Traduit automatiquement.</p>' : ""}
      ${idea.note ? `<p class="muted small">${esc(idea.note)}</p>` : ""}
      ${idea.source_url ? `<p><a href="${esc(idea.source_url)}" target="_blank" rel="noopener">${idea.source === "Marmiton" ? "Voir sur Marmiton \u2197" : "Source \u2197"}</a></p>` : ""}
    </div></div>`;
    };
    async function saveIdeaAsRecipe(idea, category) {
      return db.add("recipes", {
        title: idea.title,
        category: category || (idea.kind === "cocktail" ? idea.category : "Plat"),
        ingredients: harmonizeIngredients(idea.ingredients),
        instructions: idea.instructions,
        photo_url: idea.photo_url,
        source_url: idea.source_url,
        notes: idea.source === "Marmiton" ? `Marmiton${idea.rating ? " \xB7 note " + String(idea.rating).replace(".", ",") + "/5" : ""}` : "Id\xE9e trouv\xE9e sur internet",
        servings: idea.kind === "cocktail" ? 1 : null
      });
    }
    async function openIdea(fetcher, { title = "Une id\xE9e pour vous", saveCategory } = {}) {
      let token = 0, idea = null;
      const load = async () => {
        const my = ++token;
        idea = null;
        openModal(`<div class="ideabox"><h2 class="script">${esc(title)}</h2><div class="loading"><span class="spinner"></span> Recherche en cours\u2026</div></div>`, { wide: true });
        try {
          idea = await fetcher();
          if (my !== token) return;
          paint();
          const t = await translateIdea(idea);
          if (my !== token) return;
          if (t !== idea) {
            idea = t;
            paint();
          }
        } catch (e) {
          console.error(e);
          if (my === token) openModal(`<div class="ideabox"><h2 class="script">${esc(title)}</h2><p class="muted">Impossible de r\xE9cup\xE9rer une id\xE9e pour le moment (${esc(e.message)}). V\xE9rifiez la connexion et r\xE9essayez.</p>
        <div class="formactions"><span class="grow"></span><button class="btn ghost" data-close>Fermer</button><button class="btn primary" data-again>R\xE9essayer</button></div></div>`, { wide: true, onMount: bind });
        }
      };
      const paint = () => openModal(`<div class="ideabox"><h2 class="script">${esc(title)}</h2>${ideaCardHTML(idea)}
    <div class="formactions"><button class="btn ghost" data-close>Fermer</button><span class="grow"></span>
    <button class="btn" data-again>\u21BB Une autre id\xE9e</button><button class="btn primary" data-save>\uFF0B Ajouter \xE0 mes recettes</button></div></div>`, { wide: true, onMount: bind });
      const bind = (root) => {
        var _a, _b, _c;
        (_a = root.querySelector("[data-close]")) == null ? void 0 : _a.addEventListener("click", closeModal);
        (_b = root.querySelector("[data-again]")) == null ? void 0 : _b.addEventListener("click", load);
        (_c = root.querySelector("[data-save]")) == null ? void 0 : _c.addEventListener("click", async (e) => {
          e.target.disabled = true;
          try {
            await saveIdeaAsRecipe(idea, saveCategory);
            toast("Ajout\xE9 \xE0 votre carnet de recettes");
            closeModal();
          } catch (err) {
            toast(err.message, "err");
            e.target.disabled = false;
          }
        });
      };
      await load();
    }
    return { ratingHTML, ideaCardHTML, saveIdeaAsRecipe, openIdea };
  })();
  __m.recipes = (() => {
    const { $, $$, esc, toast, openModal, closeModal, formDialog, compressImage, ymd, DAYS } = __m.util;
    const db = __m.db;
    const { scanBox, bindScan, fillForm, ocr, parseRecipe } = __m.scan;
    const { openIdea } = __m.ideas;
    const { randomMeal, randomCocktail, MEAL_CATS } = __m.ext;
    const { importRecipes } = __m.seed;
    const { addIngredients, harmonizeIngredients } = __m.shopping;
    const CATEGORIES = ["Entr\xE9e", "Plat", "Dessert", "Accompagnement", "Ap\xE9ro", "Brunch", "Cocktail avec alcool", "Cocktail sans alcool"];
    let cat = "", query = "", favOnly = false;
    const recipes = () => db.store.t.recipes;
    const filtered = () => {
      const q = query.toLowerCase();
      return recipes().filter((r) => (!cat || r.category === cat) && (!favOnly || r.favorite) && (!q || [r.title, r.ingredients, r.category].join(" ").toLowerCase().includes(q))).sort((a, b) => a.title.localeCompare(b.title, "fr"));
    };
    const minutes = (r) => r.total_minutes || (r.prep_minutes || 0) + (r.cook_minutes || 0) || null;
    const cardHTML = (r) => `<button class="rcard glass" data-id="${r.id}">
  ${r.photo_url ? `<img src="${esc(r.photo_url)}" alt="" loading="lazy">` : `<div class="noimg script">${esc(r.title.slice(0, 1))}</div>`}
  <div class="rbody"><b>${esc(r.title)}</b><small>${esc(r.category || "")}${minutes(r) ? ` \xB7 ${minutes(r)} min` : ""}${r.servings ? ` \xB7 ${r.servings} pers.` : ""}</small></div>${r.favorite ? '<span class="fav">\u2665</span>' : ""}</button>`;
    const gridHTML = () => filtered().map(cardHTML).join("") || '<div class="empty">Aucune recette trouv\xE9e.</div>';
    function html() {
      const mealCat = MEAL_CATS[cat] ? cat : "Plat";
      const imp = recipes().length === 0 ? `<div class="card glass accent"><h3 class="script">Premier d\xE9marrage</h3><p>Votre sauvegarde MyRecipeBox (81 recettes avec photos) est pr\xEAte \xE0 \xEAtre import\xE9e.</p><button class="btn primary" id="impRec">Importer mes recettes</button></div>` : "";
      return `${imp}<div class="bar wrapbar">
    <input type="search" id="rq" placeholder="Rechercher une recette ou un ingr\xE9dient\u2026" value="${esc(query)}">
    <button class="btn" id="ideaMeal">Id\xE9e de ${mealCat.toLowerCase()}</button>
    <button class="btn" id="ideaAlc">Cocktail</button><button class="btn" id="ideaNoAlc">Sans alcool</button>
    <button class="btn" id="harmBtn" title="\xC9crire tous les ingr\xE9dients de la m\xEAme fa\xE7on">Harmoniser</button><button class="btn" id="scanRec">Scanner une recette</button><button class="btn primary" id="addRec">\uFF0B Recette</button></div>
  <div class="chips" id="rchips"><button data-c="" class="${!cat && !favOnly ? "on" : ""}">Toutes (${recipes().length})</button><button data-fav class="${favOnly ? "on" : ""}">\u2665 Favorites</button>
    ${CATEGORIES.map((c) => `<button data-c="${esc(c)}" class="${cat === c ? "on" : ""}">${esc(c)}</button>`).join("")}</div>
  <div class="rgrid" id="rgrid">${gridHTML()}</div>`;
    }
    function lines(t) {
      return String(t || "").split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
    }
    function openRecipe(id) {
      const r = recipes().find((x) => x.id === id);
      if (!r) return;
      const chips = [r.category, r.servings && `${r.servings} pers.`, r.prep_minutes && `pr\xE9paration ${r.prep_minutes} min`, r.cook_minutes && `cuisson ${r.cook_minutes} min`].filter(Boolean);
      openModal(`<div class="detail recipe">
    ${r.photo_url ? `<img class="rphoto" src="${esc(r.photo_url)}" alt="">` : ""}
    <div class="rhead"><h2 class="script">${esc(r.title)}</h2><button class="iconbtn" data-act="fav" aria-label="Favori">${r.favorite ? "\u2665" : "\u2661"}</button></div>
    <div class="chips static">${chips.map((c) => `<span class="chip">${esc(c)}</span>`).join("")}</div>
    <div class="stars" data-stars>${[1, 2, 3, 4, 5].map((n) => `<button data-star="${n}" class="${n <= (r.rating || 0) ? "on" : ""}" aria-label="${n} \xE9toiles">\u2605</button>`).join("")}</div>
    ${r.description ? `<p>${esc(r.description)}</p>` : ""}
    <div class="two"><div><h4>Ingr\xE9dients</h4><ul>${lines(r.ingredients).map((l) => `<li>${esc(l)}</li>`).join("") || '<li class="muted">\u2014</li>'}</ul></div>
    <div><h4>Pr\xE9paration</h4>${lines(r.instructions).map((l, i) => `<p><b class="num">${i + 1}</b> ${esc(l)}</p>`).join("") || '<p class="muted">\u2014</p>'}</div></div>
    ${r.notes ? `<h4>Notes</h4><p>${esc(r.notes)}</p>` : ""}${r.nutrition ? `<details><summary>Valeurs nutritionnelles</summary><pre>${esc(r.nutrition)}</pre></details>` : ""}
    ${r.source_url ? `<p><a href="${esc(r.source_url)}" target="_blank" rel="noopener">Recette d\u2019origine \u2197</a></p>` : ""}
    <div class="formactions wrap"><button class="btn" data-act="plan">Planifier</button><button class="btn" data-act="shop">Ajouter aux courses</button><span class="grow"></span>
      <button class="btn" data-act="edit">Modifier</button><button class="btn ghost" data-close>Fermer</button></div></div>`, {
        wide: true,
        onMount: (root) => {
          $("[data-close]", root).onclick = closeModal;
          root.onclick = async (e) => {
            var _a;
            const star = e.target.closest("[data-star]");
            if (star) {
              const n = +star.dataset.star;
              await db.patch("recipes", r.id, { rating: n === r.rating ? 0 : n });
              return openRecipe(id);
            }
            const a = (_a = e.target.closest("[data-act]")) == null ? void 0 : _a.dataset.act;
            if (!a) return;
            if (a === "fav") {
              await db.patch("recipes", r.id, { favorite: !r.favorite });
              openRecipe(id);
            }
            if (a === "edit") editRecipe(r);
            if (a === "shop") {
              const n = await addIngredients(r);
              toast(n ? `${n} ingr\xE9dient${n > 1 ? "s" : ""} ajout\xE9${n > 1 ? "s" : ""} aux courses` : "D\xE9j\xE0 dans la liste de courses");
            }
            if (a === "plan") planRecipe(r);
          };
        }
      });
    }
    function planRecipe(r) {
      formDialog({
        title: "Planifier \xAB " + r.title + " \xBB",
        submitLabel: "Planifier",
        fields: [{ name: "meal_date", label: "Jour", type: "date", required: true }, { name: "meal_type", label: "Repas", type: "select", options: [["soir", "D\xEEner"], ["midi", "D\xE9jeuner"]] }, { name: "servings", label: "Portions", type: "number" }],
        values: { meal_date: ymd(/* @__PURE__ */ new Date()), meal_type: "soir", servings: 3 },
        onSubmit: async (v) => {
          await db.add("meal_plans", __spreadProps(__spreadValues({}, v), { recipe_id: r.id, title: r.title }));
          toast("Ajout\xE9 au menu");
        }
      });
    }
    function editRecipe(r = {}, opts = {}) {
      formDialog({
        extra: r.id ? "" : scanBox("Remplir depuis une photo de la recette"),
        onMount: (root, form) => {
          bindScan(root, async (file, msg) => {
            const p = parseRecipe(await ocr(file, msg));
            return fillForm(form, p);
          });
          if (opts.scan) {
            const cam = root.querySelector("#scanCam");
            if (cam) cam.click();
          }
        },
        title: r.id ? "Modifier la recette" : "Nouvelle recette",
        wide: true,
        values: __spreadValues({ category: "Plat" }, r),
        fields: [
          { name: "title", label: "Nom", required: true, full: true },
          { name: "category", label: "Cat\xE9gorie", type: "select", options: CATEGORIES },
          { name: "servings", label: "Portions", type: "number" },
          { name: "prep_minutes", label: "Pr\xE9paration (min)", type: "number" },
          { name: "cook_minutes", label: "Cuisson (min)", type: "number" },
          { name: "ingredients", label: "Ingr\xE9dients (un par ligne)", type: "textarea", rows: 7, full: true },
          { name: "instructions", label: "Pr\xE9paration (une \xE9tape par ligne)", type: "textarea", rows: 8, full: true },
          { name: "notes", label: "Notes", type: "textarea", rows: 2, full: true },
          { name: "source_url", label: "Lien de la recette", full: true },
          { name: "photo", label: "Photo", type: "file", full: true }
        ],
        danger: r.id ? { label: "Supprimer", confirm: "Supprimer cette recette ?", run: () => db.del("recipes", r.id) } : null,
        onSubmit: async (v) => {
          const photo = v.photo;
          delete v.photo;
          if (photo) v.photo_url = await db.uploadPhoto(await compressImage(photo), "recipes");
          v.total_minutes = (v.prep_minutes || 0) + (v.cook_minutes || 0) || null;
          if (r.id) await db.patch("recipes", r.id, v);
          else await db.add("recipes", v);
          toast("Recette enregistr\xE9e \u2014 synchronis\xE9e");
        }
      });
    }
    function bind(root, rerender) {
      root.onclick = (e) => {
        const c = e.target.closest(".rcard");
        if (c) return openRecipe(c.dataset.id);
      };
      $("#rchips", root).onclick = (e) => {
        const b = e.target.closest("button");
        if (!b) return;
        if ("fav" in b.dataset) favOnly = !favOnly;
        else {
          cat = b.dataset.c;
          favOnly = false;
        }
        rerender();
      };
      const q = $("#rq", root);
      q.oninput = () => {
        query = q.value;
        $("#rgrid", root).innerHTML = gridHTML();
      };
      $("#addRec", root).onclick = () => editRecipe();
      $("#scanRec", root).onclick = () => editRecipe({}, { scan: true });
      $("#harmBtn", root).onclick = async () => {
        let n = 0;
        for (const r of recipes()) {
          const h = harmonizeIngredients(r.ingredients);
          if (h && h !== r.ingredients) {
            await db.patch("recipes", r.id, { ingredients: h });
            n++;
          }
        }
        toast(n ? `${n} recette${n > 1 ? "s" : ""} harmonis\xE9e${n > 1 ? "s" : ""}` : "Tous les ingr\xE9dients sont d\xE9j\xE0 harmonis\xE9s");
      };
      $("#ideaMeal", root).onclick = () => {
        const k = MEAL_CATS[cat] ? cat : "Plat";
        openIdea(() => randomMeal(MEAL_CATS[k]), { title: `Id\xE9e de ${k.toLowerCase()}`, saveCategory: k });
      };
      $("#ideaAlc", root).onclick = () => openIdea(() => randomCocktail({ alcoholic: true }), { title: "Id\xE9e de cocktail" });
      $("#ideaNoAlc", root).onclick = () => openIdea(() => randomCocktail({ alcoholic: false }), { title: "Id\xE9e de cocktail sans alcool" });
      const imp = $("#impRec", root);
      if (imp) imp.onclick = async () => {
        imp.disabled = true;
        imp.textContent = "Import en cours\u2026";
        try {
          const n = await importRecipes();
          toast(`${n} recettes import\xE9es`);
        } catch (err) {
          toast(err.message, "err");
          imp.disabled = false;
        }
      };
    }
    return { CATEGORIES, cardHTML, html, openRecipe, editRecipe, bind };
  })();
  __m.cellar = (() => {
    const { $, $$, esc, toast, openModal, closeModal, formDialog, compressImage, pick, norm } = __m.util;
    const db = __m.db;
    const { scanBox, bindScan, fillForm, ocr, parseWine } = __m.scan;
    const { openIdea } = __m.ideas;
    const { randomMeal, randomCocktail, PAIRING, SPIRIT_MAP } = __m.ext;
    const { importCellar } = __m.seed;
    const TYPES = ["Rouge", "Blanc", "Ros\xE9", "Effervescent", "Liquoreux", "Fortifi\xE9", "Spiritueux"];
    const CATS = ["Vin", "Champagne", "Cr\xE9mant", "Whisky", "Rhum", "Gin", "Cognac", "Vodka", "Tequila", "Liqueur", "Autre"];
    const KIND_LABEL = { cave: "Cave \xE0 vin", placard: "Placard", exterieur: "Ext\xE9rieur" };
    const GLASS = {
      Rouge: ["#6b1230", "#7d1a1a"],
      Blanc: ["#a9b64a", "#d9c77a"],
      "Ros\xE9": ["#e39aae", "#e9b3c0"],
      Effervescent: ["#c9b36a", "#d8b23a"],
      Liquoreux: ["#d99a2b", "#e8c25a"],
      "Fortifi\xE9": ["#6e3a1c", "#3b1f10"],
      Spiritueux: ["#a8662f", "#2a2a2a"]
    };
    let view = "cave", query = "", typeFilter = "";
    const items = () => db.store.t.cellar_items;
    const inCave = () => items().filter((b) => b.location_kind === "cave");
    const slotInfo = (n) => `\xC9tag\xE8re ${Math.ceil(n / 4)} \xB7 position ${(n - 1) % 4 + 1}`;
    const bottleTitle = (b) => [b.producer, b.name].filter(Boolean).join(" \u2014 ");
    function cabinetSVG() {
      const bySlot = Object.fromEntries(inCave().filter((b) => b.slot).map((b) => [b.slot, b]));
      let s = `<svg class="cabinet" viewBox="0 0 640 840" role="img" aria-label="Cave \xE0 vin de 28 bouteilles">
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
  <text x="320" y="50" text-anchor="middle" fill="#7fd0ff" font-family="ui-monospace,Menlo,monospace" font-size="16" letter-spacing="1.5">12 \xB0C \xB7 ${inCave().filter((b) => b.slot).length}/28</text>
  <rect x="34" y="74" width="572" height="700" rx="16" fill="url(#inside)" stroke="#0a0f16" stroke-width="3"/>
  <rect x="46" y="80" width="548" height="5" rx="2.5" fill="#e8f4ff"/><rect x="46" y="85" width="548" height="70" fill="url(#led)"/>`;
      for (let r = 0; r < 7; r++) {
        const base = 96 + r * 96 + 76;
        s += `<rect x="40" y="${base}" width="560" height="14" rx="3" fill="url(#wood)"/><rect x="40" y="${base + 14}" width="560" height="6" fill="#000" opacity=".25"/>`;
        s += `<text x="52" y="${base - 66}" fill="#bcd3f2" opacity=".55" font-size="10" font-family="system-ui,sans-serif" letter-spacing="1">\xC9TAG\xC8RE ${r + 1}</text>`;
        for (let c = 0; c < 4; c++) {
          const n = r * 4 + c + 1, x = 58 + c * 132, y = base - 40, b = bySlot[n];
          const body = `M${x + 8},${y} H${x + 78} Q${x + 98},${y + 2} ${x + 102},${y + 13} V${y + 25} Q${x + 98},${y + 36} ${x + 78},${y + 38} H${x + 8} Q${x},${y + 38} ${x},${y + 30} V${y + 8} Q${x},${y} ${x + 8},${y}Z`;
          s += `<g class="slot ${b ? "filled" : ""}" data-slot="${n}" tabindex="0" role="button" aria-label="${b ? esc(bottleTitle(b)) : "Emplacement libre " + n}"><title>${b ? esc(bottleTitle(b) + (b.vintage ? " " + b.vintage : "")) : "Libre \u2014 " + slotInfo(n)}</title>`;
          if (b) {
            const [glass, foil] = GLASS[b.wine_type] || GLASS.Rouge;
            s += `<path d="${body}" fill="${glass}" stroke="rgba(0,0,0,.45)"/>
          <rect x="${x + 100}" y="${y + 13}" width="28" height="12" rx="2" fill="${glass}" stroke="rgba(0,0,0,.4)"/>
          <rect x="${x + 108}" y="${y + 11.5}" width="20" height="15" rx="2" fill="${foil}"/>
          <rect x="${x + 16}" y="${y + 6}" width="46" height="26" rx="3" fill="#f4ecd9"/>
          <text x="${x + 39}" y="${y + 17.5}" text-anchor="middle" font-size="6.5" fill="#3b3226" font-family="Georgia,serif">${esc((b.producer || b.name).length > 14 ? (b.producer || b.name).slice(0, 13) + "\u2026" : b.producer || b.name)}</text>
          <text x="${x + 39}" y="${y + 27}" text-anchor="middle" font-size="8" font-weight="700" fill="#7a2a2a" font-family="Georgia,serif">${b.vintage || "NV"}</text>
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
  <g stroke="#0a0f16" stroke-width="3" opacity=".7">${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => `<line x1="${180 + i * 20}" y1="786" x2="${180 + i * 20}" y2="802"/>`).join("")}</g>
  <rect x="60" y="808" width="46" height="20" rx="5" fill="#0b0f15"/><rect x="534" y="808" width="46" height="20" rx="5" fill="#0b0f15"/></svg>`;
      return s;
    }
    const totalValue = () => items().reduce((t, b) => t + (Number(b.estimated_value) || 0) * (b.quantity || 1), 0);
    const stat = (n, l) => `<div class="stat glass"><b>${n}</b><span>${l}</span></div>`;
    const qty = (b) => b.quantity || 1;
    const sum = (a) => a.reduce((t, b) => t + qty(b), 0);
    function rowHTML(b) {
      const where = b.location_kind === "cave" ? b.slot ? slotInfo(b.slot) : "Cave \xB7 \xE0 placer" : [KIND_LABEL[b.location_kind], b.place_label].filter(Boolean).join(" \xB7 ");
      return `<button class="row bottle" data-id="${b.id}">${b.photo_url ? `<img class="thumb" src="${esc(b.photo_url)}" alt="" loading="lazy">` : `<span class="dot" style="background:${(GLASS[b.wine_type] || GLASS.Rouge)[0]}"></span>`}
    <span class="grow"><b>${esc(b.name)}</b> ${b.vintage ? `<span class="muted">${b.vintage}</span>` : ""}<br><small>${esc([b.producer, b.wine_type, b.country].filter(Boolean).join(" \xB7 "))}</small></span>
    <span class="where"><small>${esc(where)}${b.position_note ? ` \u2014 <i>${esc(b.position_note)}</i>` : ""}</small></span>${b.estimated_value ? `<span class="chip price">${Number(b.estimated_value).toLocaleString("fr-FR")} \u20AC</span>` : ""}${qty(b) > 1 ? `<span class="chip">\xD7${qty(b)}</span>` : ""}</button>`;
    }
    const b64blob = (b64, mime) => {
      const s = atob(b64), a = new Uint8Array(s.length);
      for (let i = 0; i < s.length; i++) a[i] = s.charCodeAt(i);
      return new Blob([a], { type: mime });
    };
    const labelQuery = (b) => [b.producer, b.name, b.vintage].filter(Boolean).join(" ");
    let fnMissing = false;
    const timeout = (p, ms, label) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error(label + " : pas de r\xE9ponse (" + ms / 1e3 + " s)")), ms))]);
    const words = (t) => norm(t).split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !/^(chateau|domaine|cuvee|vin|les|des|the|and|rouge|blanc|rose)$/.test(w));
    async function offLabel(b) {
      const q = [b.producer, b.name].filter(Boolean).join(" ");
      const r = await timeout(fetch("https://world.openfoodfacts.org/cgi/search.pl?search_simple=1&action=process&json=1&page_size=10&fields=product_name,brands,image_front_url,categories_tags&search_terms=" + encodeURIComponent(q)), 8e3, "Open Food Facts");
      if (!r.ok) throw new Error("Open Food Facts " + r.status);
      const want = words(q);
      if (!want.length) return null;
      let best = null, bestScore = 0;
      for (const p of (await r.json()).products || []) {
        if (!p.image_front_url) continue;
        const have = words((p.product_name || "") + " " + (p.brands || ""));
        const hit = want.filter((w) => have.includes(w)).length, score = hit / want.length;
        const wine = (p.categories_tags || []).some((t) => /wine|vin|alcoholic|spirit/.test(t));
        if (score > bestScore && (score >= 0.6 || wine && score >= 0.5) && hit >= Math.min(2, want.length)) {
          best = p.image_front_url;
          bestScore = score;
        }
      }
      return best;
    }
    async function vivinoViaRelay(b) {
      if (!b.vivino_url || !/^https:\/\/(www\.)?vivino\.com\//.test(b.vivino_url)) return null;
      const r = await timeout(fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent(b.vivino_url)), 8e3, "relais Vivino");
      if (!r.ok) return null;
      const h = await r.text();
      const m = h.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) || h.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
      return m ? m[1].startsWith("//") ? "https:" + m[1] : m[1] : null;
    }
    async function labelFor(b) {
      let why = "";
      if (!fnMissing) {
        try {
          const { data, error } = await timeout(db.store.sb.functions.invoke(window.FN_LABELS || "wine-labels", { body: { bottles: [{ id: b.id, url: b.vivino_url || void 0, query: labelQuery(b) }] } }), 2e4, "fonction wine-labels");
          if (error) throw error;
          const r = data.results[0];
          if (r.ok) return { url: await db.uploadPhoto(b64blob(r.data, r.mime), "bottles", r.mime) };
          why = r.error;
        } catch (e) {
          if (/not found|404|Failed to send|fetch|relay/i.test(e.message || "")) fnMissing = true;
          why = fnMissing ? "fonction \xAB wine-labels \xBB non install\xE9e" : e.message || "erreur";
        }
      }
      try {
        const u = await offLabel(b);
        if (u) return { url: u };
        why = why || "absente d\u2019Open Food Facts";
      } catch (e) {
        why = why || e.message;
      }
      try {
        const u = await vivinoViaRelay(b);
        if (u) return { url: u };
      } catch (e) {
      }
      return { error: why || "introuvable" };
    }
    async function fetchLabels(list, onProgress) {
      let done = 0;
      const fails = [], queue = [...list];
      const worker = async () => {
        while (queue.length) {
          const b = queue.shift();
          try {
            const r = await labelFor(b);
            if (!r.url) {
              fails.push({ b, error: r.error });
              onProgress && onProgress(done, fails.length);
              continue;
            }
            for (const same of items().filter((x) => !x.photo_url && labelQuery(x) === labelQuery(b))) await db.patch("cellar_items", same.id, { photo_url: r.url });
            done++;
          } catch (e) {
            fails.push({ b, error: e.message || "erreur" });
          }
          onProgress && onProgress(done, fails.length);
        }
      };
      await Promise.all([worker(), worker()]);
      return { done, fails };
    }
    async function labelsSheet() {
      const seen = /* @__PURE__ */ new Set(), todo = items().filter((b) => !b.photo_url && !seen.has(labelQuery(b)) && seen.add(labelQuery(b)));
      if (!todo.length) return toast("Toutes les bouteilles ont d\xE9j\xE0 une \xE9tiquette");
      const paint = (d, f) => {
        const el = $("#lblProg");
        if (el) el.textContent = `${d + f} / ${todo.length} trait\xE9es \xB7 ${d} \xE9tiquette${d > 1 ? "s" : ""} trouv\xE9e${d > 1 ? "s" : ""} \xB7 ${f} introuvable${f > 1 ? "s" : ""}`;
      };
      openModal(`<div class="ideabox"><h2 class="script">Recherche des \xE9tiquettes</h2><div class="loading"><span class="spinner"></span> <span id="lblProg">0 / ${todo.length} trait\xE9es</span></div><p class="muted small">Cela peut prendre une minute ; vous pouvez fermer cette fen\xEAtre, la recherche continue.</p></div>`);
      const { done, fails } = await fetchLabels(todo, paint);
      const why = {};
      fails.forEach((f) => why[f.error] = (why[f.error] || 0) + 1);
      openModal(`<h2 class="script">${done} \xE9tiquette${done > 1 ? "s" : ""} r\xE9cup\xE9r\xE9e${done > 1 ? "s" : ""}</h2>${fails.length ? `<p class="muted">${fails.length} bouteille${fails.length > 1 ? "s" : ""} sans \xE9tiquette. Raisons :</p>
    ${Object.entries(why).map(([k, n]) => `<p><b>${n}</b> \xD7 ${esc(k)}</p>`).join("")}<p class="muted small">Vous pouvez ajouter la photo \xE0 la main (fiche de la bouteille \u203A Photo).</p><ul class="plain">${fails.slice(0, 40).map((f) => `<li>${esc(f.b.name)} ${f.b.vintage || ""}</li>`).join("")}</ul>` : ""}<div class="formactions"><span class="grow"></span><button class="btn primary" data-close>OK</button></div>`, { onMount: (r) => {
        $("[data-close]", r).onclick = closeModal;
      } });
    }
    function caveView() {
      const placed = inCave().filter((b) => b.slot), loose = inCave().filter((b) => !b.slot);
      return `<div class="cave-layout"><div class="cabinetwrap">${cabinetSVG()}</div>
   <div class="cave-side"><div class="card glass"><h3 class="script">Ma cave \xE0 vin</h3><p class="muted">28 emplacements \xB7 ${placed.length} occup\xE9s \xB7 ${28 - placed.length} libres. Touchez une bouteille pour voir sa fiche, ou un emplacement libre pour y ranger une bouteille.</p>
     <div class="legend">${TYPES.slice(0, 6).map((t) => `<span><i style="background:${GLASS[t][0]}"></i>${t}</span>`).join("")}</div></div>
     <div class="card glass"><h3>\xC0 placer dans la cave (${loose.length})</h3>${loose.map(rowHTML).join("") || '<p class="muted">Toutes les bouteilles de la cave ont un emplacement.</p>'}</div></div></div>`;
    }
    function groupedList(kind) {
      const list = items().filter((b) => b.location_kind === kind);
      const groups = {};
      list.forEach((b) => {
        var _a;
        return (groups[_a = b.place_label || "Sans pr\xE9cision"] || (groups[_a] = [])).push(b);
      });
      const note = kind === "exterieur" ? "Indiquez la position pr\xE9cise (ex. \xAB 2e rack \xE0 gauche, dans la remise \xBB)." : "Rangement sans position pr\xE9cise : on note seulement le placard ou le carton.";
      return `<div class="card glass"><h3 class="script">${kind === "placard" ? "Placards" : "Ext\xE9rieur"}</h3><p class="muted">${note}</p>
    <button class="btn primary" data-add="${kind}">\uFF0B Ajouter dans ${kind === "placard" ? "un placard" : "l\u2019ext\xE9rieur"}</button></div>
    ${Object.entries(groups).map(([g, l]) => `<div class="card glass"><h3>${esc(g)} <span class="chip">${sum(l)} bouteille${sum(l) > 1 ? "s" : ""}</span></h3>${l.map(rowHTML).join("")}</div>`).join("") || `<div class="empty">Rien ici pour le moment.</div>`}`;
    }
    function filtered() {
      const q = query.toLowerCase();
      return items().filter((b) => (!typeFilter || b.wine_type === typeFilter) && (!q || [b.name, b.producer, b.country, b.region, b.vintage, b.place_label].join(" ").toLowerCase().includes(q))).sort((a, b) => (a.producer || a.name).localeCompare(b.producer || b.name, "fr"));
    }
    const listHTML = () => filtered().map(rowHTML).join("") || '<div class="empty">Aucune bouteille.</div>';
    function inventoryView() {
      const value = items().reduce((t, b) => t + (Number(b.estimated_value) || 0) * qty(b), 0);
      return `<div class="card glass"><div class="toolbar"><input type="search" id="cq" placeholder="Rechercher (domaine, cuv\xE9e, r\xE9gion\u2026)" value="${esc(query)}">
    <select id="ctype"><option value="">Tous les types</option>${TYPES.map((t) => `<option ${t === typeFilter ? "selected" : ""}>${t}</option>`).join("")}</select></div>
    <p class="muted small">${filtered().length} r\xE9f\xE9rence${filtered().length > 1 ? "s" : ""}${value ? ` \xB7 valeur estim\xE9e totale ${value.toLocaleString("fr-FR")} \u20AC` : ""}</p>
    <div id="clist">${listHTML()}</div></div>`;
    }
    function html() {
      const all = items();
      const imp = all.length === 0 ? `<div class="card glass accent"><h3 class="script">Premier d\xE9marrage</h3><p>Votre export Vivino (36 lignes : 30 bouteilles en cave, le reste en placard) est pr\xEAt \xE0 \xEAtre import\xE9.</p><button class="btn primary" id="impCellar">Importer ma cave Vivino</button></div>` : "";
      return `<div class="stats">${stat(sum(all), "bouteilles")}${stat(inCave().filter((b) => b.slot).length + "/28", "cave \xE0 vin")}${stat(sum(all.filter((b) => b.location_kind === "placard")), "en placard")}${stat(sum(all.filter((b) => b.location_kind === "exterieur")), "\xE0 l\u2019ext\xE9rieur")}${stat(totalValue() ? totalValue().toLocaleString("fr-FR") + " \u20AC" : "\u2014", "valeur estim\xE9e")}</div>
  ${imp}
  <div class="bar"><div class="seg" id="cseg">${[["cave", "Cave \xE0 vin"], ["placard", "Placards"], ["exterieur", "Ext\xE9rieur"], ["tout", "Inventaire"]].map(([k, l]) => `<button data-v="${k}" class="${view === k ? "on" : ""}">${l}</button>`).join("")}</div>
   <span class="grow"></span><button class="btn" id="scanBtn">Scanner une bouteille</button><button class="btn" id="labelBtn">\xC9tiquettes</button><button class="btn" id="priceBtn">Prix des bouteilles</button><button class="btn" id="cocktailBtn">Id\xE9e de cocktail</button><button class="btn primary" data-add="${view === "placard" || view === "exterieur" ? view : "cave"}">\uFF0B Bouteille</button></div>
  <div id="cview">${view === "cave" ? caveView() : view === "tout" ? inventoryView() : groupedList(view)}</div>`;
    }
    function bottleFields(b) {
      const taken = new Set(inCave().filter((x) => x.slot && x.id !== b.id).map((x) => x.slot));
      const slots = [["", "\u2014 \xE0 placer plus tard \u2014"]];
      for (let n = 1; n <= 28; n++) if (!taken.has(n)) slots.push([n, `n\xB0${n} \xB7 ${slotInfo(n)}`]);
      const places = [...new Set(items().filter((x) => x.place_label).map((x) => x.place_label))];
      return {
        datalist: `<datalist id="placelist">${["Placard", "Carton placard", "En vrac placard de gauche", "Garage", "Cellier", ...places].filter((v, i, a) => a.indexOf(v) === i).map((p) => `<option value="${esc(p)}">`).join("")}</datalist>`,
        fields: [
          { name: "name", label: "Nom / cuv\xE9e", required: true, full: true },
          { name: "producer", label: "Domaine / producteur" },
          { name: "vintage", label: "Mill\xE9sime", type: "number", placeholder: "2020" },
          { name: "wine_type", label: "Type", type: "select", options: TYPES },
          { name: "category", label: "Cat\xE9gorie", type: "select", options: CATS },
          { name: "country", label: "Pays" },
          { name: "region", label: "R\xE9gion / appellation" },
          { name: "bottle_size", label: "Format", placeholder: "75 cl" },
          { name: "quantity", label: "Quantit\xE9", type: "number", step: 1 },
          { name: "location_kind", label: "Lieu de rangement", type: "select", options: [["cave", "Cave \xE0 vin (28 emplacements)"], ["placard", "Placard"], ["exterieur", "Ext\xE9rieur"]] },
          { name: "slot", label: "Emplacement dans la cave", type: "select", options: slots },
          { name: "place_label", label: "Placard / lieu", list: "placelist", placeholder: "ex. Carton placard" },
          { name: "position_note", label: "Position pr\xE9cise (annotation)", placeholder: "ex. 2e rack \xE0 gauche, en bas", full: true },
          { name: "purchase_price", label: "Prix d\u2019achat (\u20AC)", type: "number", step: "0.01" },
          { name: "estimated_value", label: "Valeur estim\xE9e (\u20AC)", type: "number", step: "0.01" },
          { name: "acquired_on", label: "Date d\u2019achat", type: "date" },
          { name: "drinking_window", label: "Fen\xEAtre de d\xE9gustation", placeholder: "2025\u20132032" },
          { name: "serving_temperature", label: "Temp\xE9rature de service", placeholder: "16\u201318 \xB0C" },
          { name: "food_pairing", label: "Accords mets-vins" },
          { name: "notes", label: "Notes de d\xE9gustation", type: "textarea", full: true },
          { name: "vivino_url", label: "Lien Vivino", full: true },
          { name: "photo", label: "Photo (\xE9tiquette, bouteille)", type: "file", full: true }
        ]
      };
    }
    function editBottle(b = {}, preset = {}, opts = {}) {
      let scanned = null;
      const base = __spreadValues(__spreadValues({ wine_type: "Rouge", category: "Vin", bottle_size: "75 cl", quantity: 1, location_kind: "cave" }, b), preset);
      const { fields, datalist } = bottleFields(b);
      formDialog({
        title: b.id ? "Modifier la bouteille" : "Ajouter une bouteille",
        fields,
        values: base,
        extra: (b.id ? "" : scanBox("Remplir depuis une photo de l\u2019\xE9tiquette")) + datalist,
        wide: true,
        danger: b.id ? { label: "Supprimer", confirm: "Supprimer cette bouteille ?", run: () => db.del("cellar_items", b.id) } : null,
        onMount: (root, form) => {
          const sync = () => {
            const k = form.elements.location_kind.value;
            const show = (name, on) => form.elements[name].closest("label").classList.toggle("hidden", !on);
            show("slot", k === "cave");
            show("place_label", k !== "cave");
            show("position_note", k !== "placard");
          };
          form.elements.location_kind.onchange = sync;
          sync();
          bindScan(root, async (file, msg) => {
            scanned = file;
            const text = await ocr(file, msg);
            const p = parseWine(text);
            if (p.wine_type) form.elements.wine_type.value = p.wine_type;
            delete p.wine_type;
            return fillForm(form, p) + (p.wine_type ? 0 : 0);
          });
          if (opts.scan) {
            const cam = root.querySelector("#scanCam");
            if (cam) cam.click();
          }
        },
        onSubmit: async (v) => {
          const photo = v.photo || scanned;
          delete v.photo;
          if (v.location_kind !== "cave") v.slot = null;
          else v.slot = v.slot ? Number(v.slot) : null;
          if (v.location_kind === "cave") v.place_label = null;
          if (photo) v.photo_url = await db.uploadPhoto(await compressImage(photo), "bottles");
          v.quantity = v.quantity || 1;
          if (Number(v.estimated_value || 0) !== Number(b.estimated_value || 0)) {
            v.price_source = v.estimated_value ? "manual" : null;
            v.price_updated_at = (/* @__PURE__ */ new Date()).toISOString();
          }
          let saved;
          if (b.id) {
            await db.patch("cellar_items", b.id, v);
            saved = __spreadValues(__spreadValues({}, b), v);
          } else saved = await db.add("cellar_items", v);
          toast("Enregistr\xE9 \u2014 synchronis\xE9 sur tous les appareils");
          if (!saved.photo_url && saved.name) fetchLabels([saved]).catch(() => {
          });
        }
      });
    }
    function detail(b) {
      const row = (l, v) => v ? `<div class="kv"><span>${l}</span><b>${esc(v)}</b></div>` : "";
      const where = b.location_kind === "cave" ? b.slot ? `Cave \xE0 vin \xB7 ${slotInfo(b.slot)} (n\xB0${b.slot})` : "Cave \xE0 vin \xB7 \xE0 placer" : [KIND_LABEL[b.location_kind], b.place_label].filter(Boolean).join(" \xB7 ");
      openModal(`<div class="detail">
    <div class="detailhead">${b.photo_url ? `<img src="${esc(b.photo_url)}" alt="">` : `<div class="bigdot" style="background:${(GLASS[b.wine_type] || GLASS.Rouge)[0]}"></div>`}
      <div><span class="chip">${esc(b.wine_type)} \xB7 ${esc(b.category || "")}</span><h2 class="script">${esc(b.name)}</h2><p class="muted">${esc([b.producer, b.vintage].filter(Boolean).join(" \xB7 "))}</p></div></div>
    ${row("Emplacement", where)}${row("Position pr\xE9cise", b.position_note)}${row("Quantit\xE9", qty(b) > 1 ? qty(b) : "")}${row("Pays / r\xE9gion", [b.country, b.region].filter(Boolean).join(" \xB7 "))}${row("Format", b.bottle_size)}
    ${row("Prix d\u2019achat", b.purchase_price ? b.purchase_price + " \u20AC" : "")}${row("Source du prix", b.price_note)}${row("Valeur estim\xE9e (par bouteille)", b.estimated_value ? `${b.estimated_value} \u20AC${b.price_updated_at ? ` \xB7 ${b.price_source === "web" ? "estimation web" : "saisi"} le ${new Date(b.price_updated_at).toLocaleDateString("fr-FR")}` : ""}` : "")}${row("Date d\u2019achat", b.acquired_on)}
    ${row("\xC0 boire", b.drinking_window)}${row("Service", b.serving_temperature)}${row("Accords", b.food_pairing)}${row("Notes", b.notes)}${row("Source du prix", b.price_note)}
    ${b.vivino_url ? `<p><a href="${esc(b.vivino_url)}" target="_blank" rel="noopener">Voir sur Vivino \u2197</a></p>` : ""}
    <div class="formactions wrap"><button class="btn" data-act="meal">Id\xE9e de plat</button><button class="btn" data-act="cocktail">Id\xE9e de cocktail</button><span class="grow"></span>
      <button class="btn" data-act="drunk">Bue / sortie</button><button class="btn" data-act="edit">Modifier</button><button class="btn ghost" data-close>Fermer</button></div></div>`, {
        onMount: (root) => {
          $("[data-close]", root).onclick = closeModal;
          root.onclick = async (e) => {
            var _a;
            const a = (_a = e.target.closest("[data-act]")) == null ? void 0 : _a.dataset.act;
            if (!a) return;
            if (a === "edit") editBottle(b);
            if (a === "meal") openIdea(() => randomMeal(PAIRING[b.wine_type] || ["Beef"]), { title: `Un plat pour \xAB ${b.name} \xBB`, saveCategory: "Plat" });
            if (a === "cocktail") openIdea(() => randomCocktail({ ingredient: spiritOf(b) }), { title: `Un cocktail avec \xAB ${b.name} \xBB` });
            if (a === "drunk") {
              if (!confirm(qty(b) > 1 ? "Retirer une bouteille ?" : "Retirer cette bouteille de la cave ?")) return;
              if (qty(b) > 1) await db.patch("cellar_items", b.id, { quantity: qty(b) - 1 });
              else await db.del("cellar_items", b.id);
              closeModal();
              toast("Sant\xE9 ! Bouteille retir\xE9e");
            }
          };
        }
      });
    }
    function spiritOf(b) {
      const txt = [b.category, b.name, b.producer].join(" ").toLowerCase();
      const k = Object.keys(SPIRIT_MAP).find((k2) => txt.includes(k2));
      return k ? SPIRIT_MAP[k] : b.wine_type === "Effervescent" ? "Champagne" : null;
    }
    function pickSlot(n) {
      const loose = inCave().filter((b) => !b.slot);
      openModal(`<div class="detail"><h2 class="script">Emplacement ${n}</h2><p class="muted">${slotInfo(n)}</p>
    ${loose.length ? `<h4>Ranger une bouteille existante</h4>${loose.map(rowHTML).join("")}` : ""}
    <div class="formactions"><button class="btn ghost" data-close>Annuler</button><span class="grow"></span><button class="btn primary" id="newHere">\uFF0B Nouvelle bouteille ici</button></div></div>`, {
        onMount: (root) => {
          $("[data-close]", root).onclick = closeModal;
          $("#newHere", root).onclick = () => editBottle({}, { location_kind: "cave", slot: n });
          $$(".bottle", root).forEach((el) => el.onclick = async () => {
            await db.patch("cellar_items", el.dataset.id, { slot: n });
            closeModal();
            toast("Bouteille rang\xE9e");
          });
        }
      });
    }
    const priceKey = (b) => [b.producer, b.name, b.vintage, b.bottle_size].join("|");
    const searchUrl = (b) => "https://www.google.com/search?tbm=shop&q=" + encodeURIComponent(["vin", b.producer, b.name, b.vintage].filter(Boolean).join(" "));
    function priceSheet() {
      const groups = /* @__PURE__ */ new Map();
      items().forEach((b) => {
        const k = priceKey(b);
        if (!groups.has(k)) groups.set(k, { b, ids: [] });
        groups.get(k).ids.push(b.id);
      });
      const rows = [...groups.values()].sort((x, y) => (x.b.producer || x.b.name).localeCompare(y.b.producer || y.b.name, "fr"));
      openModal(`<div class="detail"><h2 class="script">Prix des bouteilles</h2>
    <p class="muted">Prix moyen d\u2019<b>une</b> bouteille, en euros. Le lien \xAB Prix \xBB ouvre une recherche (Google Shopping) et \xAB Vivino \xBB la page Vivino : notez ce que vous trouvez, puis enregistrez. La valeur totale de la cave se recalcule aussit\xF4t.</p>
    <label class="field check"><input type="checkbox" id="onlyMissing"> <span>Afficher seulement les bouteilles sans prix</span></label>
    <div class="pricelist">${rows.map(({ b }) => {
        var _a;
        return `<div class="prow2" data-has="${b.estimated_value ? 1 : 0}"><span class="grow"><b>${esc(b.name)}</b> ${b.vintage ? `<span class="muted">${b.vintage}</span>` : ""}<br><small>${esc([b.producer, b.price_updated_at && "prix du " + new Date(b.price_updated_at).toLocaleDateString("fr-FR")].filter(Boolean).join(" \xB7 "))}</small></span>
      <a class="iconbtn" href="${esc(searchUrl(b))}" target="_blank" rel="noopener" title="Chercher le prix">Prix</a>${b.vivino_url ? `<a class="iconbtn" href="${esc(b.vivino_url)}" target="_blank" rel="noopener" title="Page Vivino">Vivino</a>` : ""}
      <input type="number" min="0" step="0.5" inputmode="decimal" data-k="${esc(priceKey(b))}" value="${(_a = b.estimated_value) != null ? _a : ""}" placeholder="\u2014" aria-label="Prix"><span>\u20AC</span></div>`;
      }).join("")}</div>
    <div class="formactions"><button class="btn ghost" data-close>Annuler</button><span class="grow"></span><button class="btn primary" id="savePrices">Enregistrer les prix</button></div></div>`, {
        wide: true,
        onMount: (root) => {
          $("[data-close]", root).onclick = closeModal;
          $("#onlyMissing", root).onchange = (e) => $$(".prow2", root).forEach((r) => r.classList.toggle("hidden", e.target.checked && r.dataset.has === "1"));
          $("#savePrices", root).onclick = async (e) => {
            e.target.disabled = true;
            let n = 0;
            try {
              for (const inp of $$("input[data-k]", root)) {
                const g = groups.get(inp.dataset.k), val = inp.value === "" ? null : Number(inp.value);
                if (Number(g.b.estimated_value || 0) === Number(val || 0)) continue;
                for (const id of g.ids) await db.patch("cellar_items", id, { estimated_value: val, price_source: val ? "manual" : null, price_updated_at: (/* @__PURE__ */ new Date()).toISOString() });
                n++;
              }
              closeModal();
              toast(n ? `${n} prix enregistr\xE9${n > 1 ? "s" : ""} \u2014 synchronis\xE9` : "Aucun changement");
            } catch (err) {
              toast(err.message, "err");
              e.target.disabled = false;
            }
          };
        }
      });
    }
    function bind(root, rerender) {
      const by = (id) => items().find((b) => b.id === id);
      $("#cseg", root).onclick = (e) => {
        var _a;
        const v = (_a = e.target.closest("[data-v]")) == null ? void 0 : _a.dataset.v;
        if (v) {
          view = v;
          rerender();
        }
      };
      root.onclick = (e) => {
        const slot = e.target.closest("[data-slot]");
        if (slot) {
          const n = +slot.dataset.slot, b = inCave().find((x) => x.slot === n);
          return b ? detail(b) : pickSlot(n);
        }
        const row = e.target.closest(".bottle");
        if (row) return detail(by(row.dataset.id));
        const add = e.target.closest("[data-add]");
        if (add) return editBottle({}, { location_kind: add.dataset.add });
      };
      root.onkeydown = (e) => {
        var _a;
        if ((e.key === "Enter" || e.key === " ") && ((_a = e.target.dataset) == null ? void 0 : _a.slot)) {
          e.preventDefault();
          e.target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        }
      };
      $("#priceBtn", root).onclick = priceSheet;
      $("#scanBtn", root).onclick = () => editBottle({}, { location_kind: view === "placard" || view === "exterieur" ? view : "cave" }, { scan: true });
      $("#labelBtn", root).onclick = labelsSheet;
      $("#cocktailBtn", root).onclick = () => {
        const spirits = items().map(spiritOf).filter(Boolean);
        openIdea(() => randomCocktail({ ingredient: spirits.length ? pick(spirits) : null }), { title: "Un cocktail pour ce soir" });
      };
      const imp = $("#impCellar", root);
      if (imp) imp.onclick = async () => {
        imp.disabled = true;
        imp.textContent = "Import en cours\u2026";
        try {
          const n = await importCellar();
          toast(`${n} lignes import\xE9es`);
        } catch (e) {
          toast(e.message, "err");
          imp.disabled = false;
        }
      };
      const q = $("#cq", root);
      if (q) q.oninput = () => {
        query = q.value;
        $("#clist", root).innerHTML = listHTML();
      };
      const t = $("#ctype", root);
      if (t) t.onchange = () => {
        typeFilter = t.value;
        rerender();
      };
    }
    return { TYPES, html, editBottle, bind };
  })();
  __m.menus = (() => {
    const { $, $$, esc, toast, openModal, closeModal, formDialog, ymd, parseYmd, addDays, weekStartSaturday, fmtLong, fmtShort, shuffle, pick, DAYS, guessShop } = __m.util;
    const db = __m.db;
    const { randomMeal, MEAL_CATS, translateIdea } = __m.ext;
    const { addIngredients, addLines, itemLabel, tidyList } = __m.shopping;
    const { scoreRecipe, seasonalNames, MONTHS } = __m.season;
    const { openRecipe } = __m.recipes;
    const { openIdea, saveIdeaAsRecipe, ratingHTML } = __m.ideas;
    const today = /* @__PURE__ */ new Date();
    let weekStart = weekStartSaturday(today.getDay() === 5 ? addDays(today, 1) : today);
    const plans = () => db.store.t.meal_plans;
    const recipes = () => db.store.t.recipes;
    const recipeById = (id) => recipes().find((r) => r.id === id);
    const TYPE_LABEL = { midi: "D\xE9jeuner", soir: "D\xEEner" };
    const weekDays = (ws) => Array.from({ length: 7 }, (_, i) => addDays(ws, i));
    const typesOf = (d) => d.getDay() === 6 || d.getDay() === 0 ? ["midi", "soir"] : ["soir"];
    const planAt = (date, type) => plans().find((p) => p.meal_date === date && p.meal_type === type);
    function mealCell(d, type) {
      const p = planAt(ymd(d), type), r = (p == null ? void 0 : p.recipe_id) ? recipeById(p.recipe_id) : null;
      return `<div class="meal ${p ? "filled" : ""}" data-date="${ymd(d)}" data-type="${type}">
    <small class="mtype">${TYPE_LABEL[type]}</small>
    ${p ? `<div class="mrow">${(r == null ? void 0 : r.photo_url) ? `<img src="${esc(r.photo_url)}" alt="" loading="lazy">` : ""}<span><b>${esc(p.title || (r == null ? void 0 : r.title) || "Repas")}</b><small>${p.servings || 3} pers.</small></span></div>` : '<span class="plus">\uFF0B</span>'}</div>`;
    }
    function shoppingHTML() {
      const list = [...db.store.t.shopping_items].sort((a, b) => (a.shop || "").localeCompare(b.shop || "") || a.name.localeCompare(b.name, "fr"));
      const shops = [...new Set(list.map((i) => i.shop || "Supermarch\xE9"))];
      const checked = list.filter((i) => i.checked).length;
      return `<div class="card glass"><div class="sectionhead"><h3 class="script">Liste de courses</h3><span><button class="btn small" id="reshop">Ranger la liste (fusion, sans sel/poivre)</button> ${checked ? `<button class="btn small" id="clearChecked">Retirer les ${checked} coch\xE9s</button>` : ""}</span></div>
    <form id="shopForm" class="inlineform"><input name="name" placeholder="Ajouter un article\u2026" required><select name="shop"><option>March\xE9</option><option selected>Supermarch\xE9</option></select><button class="btn primary">Ajouter</button></form>
    ${shops.map((s) => `<h4>${s === "March\xE9" ? "" : ""} ${esc(s)}</h4>${list.filter((i) => (i.shop || "Supermarch\xE9") === s).map((i) => `<div class="shopitem ${i.checked ? "done" : ""}"><button class="tick" data-check="${i.id}" aria-label="Cocher">${i.checked ? "\u2713" : ""}</button><span class="grow">${esc(itemLabel(i))}${i.recipe_title ? `<small> \xB7 ${esc(i.recipe_title)}</small>` : ""}</span><button class="x" data-rm="${i.id}" aria-label="Supprimer">\xD7</button></div>`).join("")}`).join("") || '<div class="empty">La liste est vide.</div>'}</div>`;
    }
    function html() {
      const days = weekDays(weekStart);
      const empty = !days.some((d) => planAt(ymd(d), "soir"));
      const banner = today.getDay() === 5 && ymd(weekStart) === ymd(weekStartSaturday(addDays(today, 1))) && empty ? `<div class="card glass accent"><b>C\u2019est vendredi !</b> On pr\xE9pare les menus de la semaine qui commence demain ? <button class="btn primary" data-propose>Proposer les menus</button></div>` : "";
      return `${banner}<div class="bar"><div class="seg"><button id="wprev" aria-label="Semaine pr\xE9c\xE9dente">\u2039</button><button id="wnow">Cette semaine</button><button id="wnext" aria-label="Semaine suivante">\u203A</button></div>
    <b class="weeklabel">${fmtShort(weekStart)} \u2192 ${fmtShort(addDays(weekStart, 6))}</b><span class="grow"></span>
    <button class="btn" id="weekShop">Courses de la semaine</button><button class="btn primary" data-propose>Proposer les menus</button></div>
  <div class="week">${days.map((d) => `<div class="daycard glass ${ymd(d) === ymd(today) ? "today" : ""}"><h4>${esc(fmtLong(d))}</h4>${typesOf(d).map((t) => mealCell(d, t)).join("")}</div>`).join("")}</div>
  <p class="muted small">De saison en ${MONTHS[seasonMonth() - 1]} : ${esc(seasonalNames(seasonMonth()).join(", "))}.</p>
  <p class="muted small">Chaque d\xEEner est pr\xE9vu pour 3 personnes. Novembre \xE0 mars : soupe le dimanche et le lundi soir. Les propositions utilisent d\u2019abord votre carnet, en \xE9vitant ce que vous avez cuisin\xE9 ces trois derni\xE8res semaines.</p>
  ${shoppingHTML()}`;
    }
    function editSlot(date, type) {
      const p = planAt(date, type);
      formDialog({
        title: `${TYPE_LABEL[type]} \u2014 ${fmtLong(parseYmd(date))}`,
        fields: [
          { name: "recipe_id", label: "Recette du carnet", type: "select", full: true, options: [["", "\u2014 titre libre \u2014"], ...[...recipes()].sort((a, b) => a.title.localeCompare(b.title, "fr")).map((r) => [r.id, r.title])] },
          { name: "title", label: "Ou titre libre", placeholder: "ex. Restaurant, restes, pizza\u2026", full: true },
          { name: "servings", label: "Portions", type: "number" }
        ],
        values: { recipe_id: (p == null ? void 0 : p.recipe_id) || "", title: (p == null ? void 0 : p.recipe_id) ? "" : p == null ? void 0 : p.title, servings: (p == null ? void 0 : p.servings) || 3 },
        extra: (p == null ? void 0 : p.recipe_id) ? '<p><button type="button" class="btn small" id="openR">Voir la recette</button></p>' : "",
        onMount: (root) => {
          const b = $("#openR", root);
          if (b) b.onclick = () => openRecipe(p.recipe_id);
        },
        danger: p ? { label: "Retirer ce repas", confirm: "Retirer ce repas du menu ?", run: () => db.del("meal_plans", p.id) } : null,
        onSubmit: async (v) => {
          const r = v.recipe_id ? recipeById(v.recipe_id) : null;
          const row = { recipe_id: (r == null ? void 0 : r.id) || null, title: (r == null ? void 0 : r.title) || v.title, servings: v.servings || 3 };
          if (!row.title) throw new Error("Choisissez une recette ou saisissez un titre");
          if (p) await db.patch("meal_plans", p.id, row);
          else await db.add("meal_plans", __spreadProps(__spreadValues({}, row), { meal_date: date, meal_type: type }));
        }
      });
    }
    const isSoup = (r) => /soupe|velout|potage|bouillon/i.test(r.title);
    let prop = [], propWeb = false;
    function pools() {
      const mine = recipes().filter((r) => !/^cocktail/i.test(r.category || ""));
      const recent = new Set(plans().filter((p) => p.recipe_id && parseYmd(p.meal_date) >= addDays(weekStart, -21) && parseYmd(p.meal_date) < weekStart).map((p) => p.recipe_id));
      return {
        recent,
        soups: mine.filter(isSoup),
        dinners: mine.filter((r) => (r.category === "Plat" || !r.category) && !isSoup(r)),
        lunches: mine.filter((r) => ["Brunch", "Ap\xE9ro", "Entr\xE9e"].includes(r.category) || r.category === "Plat" && r.total_minutes && r.total_minutes <= 30 && !isSoup(r))
      };
    }
    const seasonMonth = () => addDays(weekStart, 3).getMonth() + 1;
    function pickFrom(pool, used, recent) {
      const free = pool.filter((r) => !used.has(r.id));
      const fresh = free.filter((r) => !recent.has(r.id));
      const base = fresh.length ? fresh : free;
      if (!base.length) return null;
      const m = seasonMonth();
      const w = base.map((r) => Math.max(0.15, 1 + 0.7 * scoreRecipe(r, m).score + (r.favorite ? 0.5 : 0)));
      let x = Math.random() * w.reduce((a, b) => a + b, 0);
      for (let i = 0; i < base.length; i++) {
        x -= w[i];
        if (x <= 0) return base[i];
      }
      return base[base.length - 1];
    }
    const fromRecipe = (date, type, r, servings = 3) => ({ date, type, servings, recipe_id: (r == null ? void 0 : r.id) || null, title: (r == null ? void 0 : r.title) || "", photo_url: (r == null ? void 0 : r.photo_url) || null, web: null, seasonal: r ? scoreRecipe(r, seasonMonth()).hits : [] });
    async function buildProposal(withWeb) {
      const { recent, soups, dinners, lunches } = pools();
      const used = /* @__PURE__ */ new Set(), out = [];
      const winter = [10, 11, 0, 1, 2].includes(weekStart.getMonth()) || [10, 11, 0, 1, 2].includes(addDays(weekStart, 6).getMonth());
      const soup = winter ? pickFrom(soups, /* @__PURE__ */ new Set(), recent) : null;
      for (const d of weekDays(weekStart)) for (const type of typesOf(d)) {
        const date = ymd(d), dow = d.getDay();
        if (winter && type === "soir" && (dow === 0 || dow === 1)) {
          out.push(soup ? fromRecipe(date, type, soup) : { date, type, servings: 3, recipe_id: null, title: "Soupe maison", photo_url: null, web: null });
          continue;
        }
        const pool = type === "midi" ? lunches.length ? lunches : dinners : dinners;
        const r = pickFrom(pool, used, recent);
        if (r) used.add(r.id);
        out.push(fromRecipe(date, type, r));
      }
      if (withWeb) {
        const targets = out.filter((e) => e.type === "soir" && [3, 5].includes(parseYmd(e.date).getDay()));
        await Promise.all(targets.map(async (e) => {
          try {
            await setWeb(e);
          } catch (err) {
            console.warn(err);
          }
        }));
      }
      return out;
    }
    async function setWeb(e) {
      const idea = await translateIdea(await randomMeal(MEAL_CATS["Plat"], prop.filter((x) => x.web).map((x) => x.web.id), { query: pick(seasonalNames((/* @__PURE__ */ new Date()).getMonth() + 1)) }));
      Object.assign(e, { web: idea, recipe_id: null, title: idea.title, photo_url: idea.photo_url });
    }
    const entryRow = (e, i) => {
      var _a;
      return `<div class="prow"><span class="pday">${esc(fmtShort(parseYmd(e.date)))}<small>${TYPE_LABEL[e.type]}</small></span>
  ${e.photo_url ? `<img src="${esc(e.photo_url)}" alt="">` : '<span class="thumb"></span>'}
  <span class="grow"><b>${esc(e.title || "\u2014 rien de trouv\xE9 \u2014")}</b>${e.web ? `<small><span class="chip">${e.web.source === "Marmiton" ? "Marmiton" : "id\xE9e internet"}</span>${ratingHTML(e.web)}</small>` : e.recipe_id ? `<small>de votre carnet${((_a = e.seasonal) == null ? void 0 : _a.length) ? ` \xB7 de saison : ${esc(e.seasonal.slice(0, 3).join(", "))}` : ""}</small>` : ""}</span>
  <button class="iconbtn" data-reroll="${i}" aria-label="Autre proposition">\u21BB</button><button class="iconbtn" data-drop="${i}" aria-label="Retirer">\xD7</button></div>`;
    };
    async function showProposal() {
      openModal(`<div class="detail"><h2 class="script">Menus de la semaine</h2><div class="loading"><span class="spinner"></span> Je pr\xE9pare des propositions\u2026</div></div>`, { wide: true });
      prop = [];
      prop = await buildProposal(propWeb);
      paintProposal();
    }
    function paintProposal() {
      openModal(`<div class="detail"><h2 class="script">Menus de la semaine</h2><p class="muted">Du ${esc(fmtShort(weekStart))} au ${esc(fmtShort(addDays(weekStart, 6)))} Changez ce qui ne vous pla\xEEt pas avec \u21BB, puis validez.</p>
    ${prop.map(entryRow).join("")}
    <label class="field check"><input type="checkbox" id="pWeb" ${propWeb ? "checked" : ""}> <span>Inclure 2 id\xE9es de recettes trouv\xE9es sur internet</span></label>
    <label class="field check"><input type="checkbox" id="pOver"> <span>Remplacer les repas d\xE9j\xE0 planifi\xE9s</span></label>
    <label class="field check"><input type="checkbox" id="pShop" checked> <span>Ajouter les ingr\xE9dients \xE0 la liste de courses</span></label>
    <div class="formactions wrap"><button class="btn ghost" data-close>Annuler</button><span class="grow"></span><button class="btn" id="pAgain">\u21BB Tout r\xE9g\xE9n\xE9rer</button><button class="btn primary" id="pOk">Valider ces menus</button></div></div>`, {
        wide: true,
        onMount: (root) => {
          $("[data-close]", root).onclick = closeModal;
          $("#pWeb", root).onchange = (e) => {
            propWeb = e.target.checked;
            showProposal();
          };
          $("#pAgain", root).onclick = showProposal;
          root.onclick = async (e) => {
            const rr = e.target.closest("[data-reroll]"), dr = e.target.closest("[data-drop]");
            if (dr) {
              prop.splice(+dr.dataset.drop, 1);
              return paintProposal();
            }
            if (!rr) return;
            const en = prop[+rr.dataset.reroll];
            rr.disabled = true;
            try {
              if (en.web) await setWeb(en);
              else {
                const { recent, dinners, lunches } = pools();
                const used = new Set(prop.map((x) => x.recipe_id).filter(Boolean));
                const r = pickFrom(en.type === "midi" && lunches.length ? lunches : dinners, used, recent);
                if (r) Object.assign(en, fromRecipe(en.date, en.type, r));
              }
            } catch (err) {
              toast(err.message, "err");
            }
            paintProposal();
          };
          $("#pOk", root).onclick = async (ev) => {
            ev.target.disabled = true;
            try {
              await validateProposal($("#pOver", root).checked, $("#pShop", root).checked);
            } catch (err) {
              toast(err.message, "err");
              ev.target.disabled = false;
            }
          };
        }
      });
    }
    async function validateProposal(overwrite, shop) {
      let added = 0, ingredients = 0;
      const rows = [];
      for (const e of prop) {
        if (!e.title) continue;
        const ex = planAt(e.date, e.type);
        if (ex && !overwrite) continue;
        if (ex) await db.del("meal_plans", ex.id);
        let recipe = e.recipe_id ? recipeById(e.recipe_id) : null;
        if (e.web) recipe = await saveIdeaAsRecipe(e.web, "Plat");
        rows.push({ meal_date: e.date, meal_type: e.type, recipe_id: (recipe == null ? void 0 : recipe.id) || null, title: (recipe == null ? void 0 : recipe.title) || e.title, servings: e.servings });
        if (shop && recipe) ingredients += await addIngredients(recipe);
      }
      added = (await db.addMany("meal_plans", rows)).length;
      closeModal();
      toast(`${added} repas planifi\xE9s${shop ? ` \xB7 ${ingredients} ingr\xE9dients ajout\xE9s aux courses` : ""}`);
    }
    function bind(root, rerender) {
      $("#wprev", root).onclick = () => {
        weekStart = addDays(weekStart, -7);
        rerender();
      };
      $("#wnext", root).onclick = () => {
        weekStart = addDays(weekStart, 7);
        rerender();
      };
      $("#wnow", root).onclick = () => {
        weekStart = weekStartSaturday(today.getDay() === 5 ? addDays(today, 1) : today);
        rerender();
      };
      $$("[data-propose]", root).forEach((b) => b.onclick = () => showProposal());
      $("#weekShop", root).onclick = async () => {
        let n = 0;
        const ids = new Set(weekDays(weekStart).flatMap((d) => plans().filter((p) => p.meal_date === ymd(d) && p.recipe_id).map((p) => p.recipe_id)));
        for (const id of ids) {
          const r = recipeById(id);
          if (r) n += await addIngredients(r);
        }
        toast(ids.size ? `${n} ingr\xE9dient${n > 1 ? "s" : ""} ajout\xE9${n > 1 ? "s" : ""} \xE0 la liste` : "Aucune recette planifi\xE9e cette semaine");
      };
      root.onclick = async (e) => {
        const m = e.target.closest(".meal");
        if (m) return editSlot(m.dataset.date, m.dataset.type);
        const c = e.target.closest("[data-check]");
        if (c) {
          const it = db.store.t.shopping_items.find((i) => i.id === c.dataset.check);
          return db.patch("shopping_items", it.id, { checked: !it.checked });
        }
        const x = e.target.closest("[data-rm]");
        if (x) return db.del("shopping_items", x.dataset.rm);
        if (e.target.id === "reshop") {
          const r = await tidyList();
          const t = [];
          if (r.removed) t.push(`${r.removed} sel/poivre/eau retir\xE9${r.removed > 1 ? "s" : ""}`);
          if (r.merged) t.push(`${r.merged} doublon${r.merged > 1 ? "s" : ""} fusionn\xE9${r.merged > 1 ? "s" : ""}`);
          if (r.moved) t.push(`${r.moved} reclass\xE9${r.moved > 1 ? "s" : ""}`);
          return toast(t.length ? t.join(" \xB7 ") : "La liste est d\xE9j\xE0 bien rang\xE9e");
        }
        if (e.target.id === "clearChecked") for (const i of db.store.t.shopping_items.filter((i2) => i2.checked)) await db.del("shopping_items", i.id);
      };
      $("#shopForm", root).onsubmit = async (e) => {
        e.preventDefault();
        const f = e.target;
        const txt = f.elements.name.value.trim();
        if (txt) await addLines([txt], null, { dropSaltPepper: false, shop: f.elements.shop.value });
        f.reset();
        f.elements.name.focus();
      };
    }
    return { html, bind };
  })();
  __m.news = (() => {
    const { $, $$, esc, toast, ymd, addDays } = __m.util;
    const API = "https://api.rss2json.com/v1/api.json?count=12&rss_url=";
    const FEEDS = {
      "\xC0 la une": ["https://www.francetvinfo.fr/titres.rss", "https://www.lemonde.fr/rss/une.xml"],
      "Politique": ["https://www.francetvinfo.fr/politique.rss"],
      "Monde": ["https://www.francetvinfo.fr/monde.rss"],
      "\xC9conomie": ["https://www.francetvinfo.fr/economie.rss"],
      "Sport": ["https://www.francetvinfo.fr/sports.rss"],
      "Culture": ["https://www.francetvinfo.fr/culture.rss"]
    };
    const KEY = "family-news";
    let sec = "\xC0 la une", loading = false, error = "", mem = null, reading = -1, paused = false, queue = [];
    const slotOf = (d) => {
      const h = d.getHours();
      return h >= 18 ? ymd(d) + "-18" : h >= 6 ? ymd(d) + "-06" : ymd(addDays(d, -1)) + "-18";
    };
    const read = () => {
      try {
        return JSON.parse(localStorage.getItem(KEY)) || mem;
      } catch (e) {
        return mem;
      }
    };
    const write = (v) => {
      mem = v;
      try {
        localStorage.setItem(KEY, JSON.stringify(v));
      } catch (e) {
      }
    };
    const dec = (s) => {
      const t = document.createElement("textarea");
      t.innerHTML = s;
      return t.value;
    };
    const clean = (s) => dec(String(s || "").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").replace(/\s*(Lire la suite|Lire l’article|Read more|\[…\]|\.\.\.)\s*$/i, "").trim();
    const blurb = (desc, title) => {
      let t = clean(desc);
      if (!t || t === title) return "";
      if (t.length > 240) {
        const cut = t.slice(0, 240), i = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(" "));
        t = cut.slice(0, i > 120 ? i : 240).replace(/[,;:]$/, "") + (cut.lastIndexOf(". ") > 120 ? "." : "\u2026");
      }
      return t;
    };
    const timeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error("d\xE9lai d\xE9pass\xE9")), ms))]);
    async function getFeed(url) {
      const r = await timeout(fetch(API + encodeURIComponent(url)), 12e3);
      if (!r.ok) throw new Error("service de flux " + r.status);
      const j = await r.json();
      if (j.status && j.status !== "ok") throw new Error(j.message || "flux indisponible");
      const src = /lemonde/.test(url) ? "Le Monde" : "France Info";
      return (j.items || []).map((i) => ({ title: clean(i.title), text: blurb(i.description || i.content, clean(i.title)), link: i.link, date: i.pubDate, src, img: i.thumbnail || i.enclosure && i.enclosure.link || "" })).filter((i) => i.title);
    }
    async function build() {
      const out = {};
      let ok = 0, last = "";
      await Promise.all(Object.entries(FEEDS).map(async ([name, urls]) => {
        const lists = (await Promise.all(urls.map((u) => getFeed(u).catch((e) => {
          last = e.message;
          return [];
        })))).filter((l) => l.length);
        const seen = {}, items = [];
        for (let k = 0; items.length < (name === "\xC0 la une" ? 8 : 5) && lists.some((l) => k < l.length); k++) lists.forEach((l) => {
          const i = l[k];
          if (i && !seen[i.title.toLowerCase()] && items.length < (name === "\xC0 la une" ? 8 : 5)) {
            seen[i.title.toLowerCase()] = 1;
            items.push(i);
          }
        });
        if (items.length) {
          out[name] = items;
          ok++;
        }
      }));
      if (!ok) throw new Error(last || "aucun flux disponible");
      return out;
    }
    async function refresh(force) {
      const now = /* @__PURE__ */ new Date(), c = read();
      if (loading || !force && c && c.slot === slotOf(now)) return false;
      loading = true;
      error = "";
      try {
        write({ slot: slotOf(now), at: now.toISOString(), sections: await build() });
        return true;
      } catch (e) {
        error = e.message || "erreur";
        return false;
      } finally {
        loading = false;
      }
    }
    const tts = () => typeof window !== "undefined" && window.speechSynthesis && window.SpeechSynthesisUtterance ? window.speechSynthesis : null;
    function stopReading() {
      queue = [];
      reading = -1;
      paused = false;
      const s = tts();
      if (s) try {
        s.cancel();
      } catch (e) {
      }
    }
    function frVoice() {
      const s = tts();
      const v = s && s.getVoices && s.getVoices() || [];
      return v.find((x) => /^fr[-_]FR/i.test(x.lang) && /(thomas|amelie|audrey|marie|google)/i.test(x.name)) || v.find((x) => /^fr[-_]FR/i.test(x.lang)) || v.find((x) => /^fr/i.test(x.lang)) || null;
    }
    function speakQueue(parts, onStep) {
      const s = tts();
      if (!s) return toast("La lecture vocale n\u2019est pas disponible sur cet appareil", "err");
      stopReading();
      queue = parts.slice();
      const next = () => {
        if (!queue.length) {
          reading = -1;
          onStep(-1);
          return;
        }
        const p = queue.shift();
        reading = p.idx;
        onStep(p.idx);
        const u = new window.SpeechSynthesisUtterance(p.text);
        u.lang = "fr-FR";
        u.rate = 1;
        const v = frVoice();
        if (v) u.voice = v;
        u.onend = next;
        u.onerror = () => {
          reading = -1;
          onStep(-1);
        };
        s.speak(u);
      };
      next();
    }
    const longDate = (d) => {
      const t = d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
      return t;
    };
    function scriptFor(c) {
      const parts = [], when = new Date(c.at);
      parts.push({ idx: -1, text: `Voici l\u2019actualit\xE9 du ${longDate(when)}, \xE9dition de ${when.getHours() >= 18 || when.getHours() < 6 ? "dix-huit" : "six"} heures.` });
      (c.sections["\xC0 la une"] || []).slice(0, 6).forEach((i, k) => parts.push({ idx: k, text: `${i.title}. ${i.text || ""}` }));
      Object.entries(c.sections).filter(([k]) => k !== "\xC0 la une").forEach(([k, items]) => {
        parts.push({ idx: -1, text: k + "." });
        items.slice(0, 3).forEach((i) => parts.push({ idx: -1, text: i.title + "." }));
      });
      parts.push({ idx: -1, text: "C\u2019\xE9tait l\u2019essentiel de l\u2019actualit\xE9." });
      return parts;
    }
    const ago = (iso) => {
      const m = Math.round((Date.now() - new Date(iso)) / 6e4);
      return m < 1 ? "\xE0 l\u2019instant" : m < 60 ? `il y a ${m} min` : m < 1440 ? `il y a ${Math.round(m / 60)} h` : new Date(iso).toLocaleDateString("fr-FR");
    };
    const news = {
      html() {
        const c = read();
        const head = `<div class="bar newsbar"><div class="grow"><b>${c ? `\xC9dition de ${new Date(c.at).getHours() >= 18 || new Date(c.at).getHours() < 6 ? "18 h" : "6 h"}` : "Actualit\xE9s"}</b><br><small class="muted">${loading ? "Mise \xE0 jour\u2026" : c ? `Mis \xE0 jour ${esc(ago(c.at))} \xB7 prochaine \xE9dition \xE0 ${(/* @__PURE__ */ new Date()).getHours() >= 6 && (/* @__PURE__ */ new Date()).getHours() < 18 ? "18 h" : "6 h"}` : "Pas encore de r\xE9sum\xE9"}</small></div>
      <button class="btn primary" id="nRead">${queue.length || reading >= 0 ? "Arr\xEAter" : "\xC9couter le r\xE9sum\xE9"}</button><button class="btn" id="nPause" ${queue.length ? "" : "hidden"}>${paused ? "Reprendre" : "Pause"}</button><button class="btn" id="nRefresh">\u21BB Actualiser</button></div>`;
        const warn = error ? `<div class="card glass warn">Impossible de mettre \xE0 jour : ${esc(error)}. ${c ? "Le dernier r\xE9sum\xE9 reste affich\xE9." : "R\xE9essayez dans un instant."}</div>` : "";
        if (!c) return head + warn + `<div class="empty">${loading ? "Chargement des titres du jour\u2026" : "Appuyez sur \xAB Actualiser \xBB pour charger l\u2019actualit\xE9."}</div>`;
        const first = c.sections["\xC0 la une"] || [];
        const brief = `<div class="card glass newsbrief"><h3 class="script">En bref</h3><ol>${first.slice(0, 5).map((i) => `<li>${esc(i.title)}</li>`).join("")}</ol></div>`;
        const secs = Object.keys(c.sections);
        const items = c.sections[sec] || [];
        return head + warn + brief + `<div class="chips">${secs.map((k) => `<button data-sec="${esc(k)}" class="${k === sec ? "on" : ""}">${esc(k)}</button>`).join("")}</div>
      <div class="newslist">${items.map((i, k) => `<article class="card glass news ${sec === "\xC0 la une" && k === reading ? "reading" : ""}" data-k="${k}">${i.img ? `<img src="${esc(i.img)}" alt="" loading="lazy" onerror="this.remove()">` : ""}<div class="grow"><b>${esc(i.title)}</b>${i.text ? `<p>${esc(i.text)}</p>` : ""}<small class="muted">${esc(i.src)}${i.date ? " \xB7 " + esc(new Date(String(i.date).replace(" ", "T")).toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })) : ""} \xB7 <a href="${esc(i.link)}" target="_blank" rel="noopener">Lire \u2197</a></small></div><button class="iconbtn" data-say="${k}" aria-label="Lire cet article"></button></article>`).join("")}</div>
      <p class="muted small">R\xE9sum\xE9 automatique des titres et chap\xF4s publi\xE9s par France Info et Le Monde. Mis \xE0 jour \xE0 chaque \xE9dition (6 h et 18 h) \xE0 l\u2019ouverture de la page.</p>`;
      },
      bind(root, rerender) {
        const redraw = () => {
          const y = window.pageYOffset;
          rerender();
          window.scrollTo(0, y);
        };
        const c = read();
        if (!loading && (!c || c.slot !== slotOf(/* @__PURE__ */ new Date()))) {
          const p = refresh(false);
          redraw();
          p.then(redraw);
        }
        $("#nRefresh", root).onclick = () => {
          stopReading();
          const p = refresh(true);
          redraw();
          p.then((ok) => {
            redraw();
            if (ok) toast("Actualit\xE9 mise \xE0 jour");
          });
        };
        $("#nRead", root).onclick = () => {
          if (queue.length || reading >= 0) {
            stopReading();
            return redraw();
          }
          const cur = read();
          if (!cur) return toast("Rien \xE0 lire pour le moment", "err");
          speakQueue(scriptFor(cur), (idx) => {
            $$("#content .news.reading").forEach((e) => e.classList.remove("reading"));
            const el = idx >= 0 && sec === "\xC0 la une" ? $(`#content .news[data-k="${idx}"]`) : null;
            if (el) el.classList.add("reading");
            if (idx === -1 && !queue.length) redraw();
          });
          redraw();
        };
        const pz = $("#nPause", root);
        pz.onclick = () => {
          const s = tts();
          if (!s) return;
          if (paused) {
            s.resume();
            paused = false;
          } else {
            s.pause();
            paused = true;
          }
          pz.textContent = paused ? "Reprendre" : "Pause";
        };
        $$("[data-sec]", root).forEach((b) => b.onclick = () => {
          sec = b.dataset.sec;
          redraw();
        });
        $$("[data-say]", root).forEach((b) => b.onclick = () => {
          const i = (read().sections[sec] || [])[+b.dataset.say];
          if (i) speakQueue([{ idx: -1, text: `${i.title}. ${i.text || ""}` }], () => {
          });
        });
      }
    };
    return { slotOf, refresh, stopReading, news };
  })();
  __m.misc = (() => {
    const { $, $$, esc, toast, formDialog, openModal, closeModal, ymd, parseYmd, addDays, fmtLong, fmtTime, toLocalInput, PEOPLE } = __m.util;
    const db = __m.db;
    const t = (k) => db.store.t[k];
    const pIndex = (o) => Math.max(0, PEOPLE.indexOf(o));
    const ART = {
      courses: '<polygon points="40,92 150,92 160,200 30,200" fill="#d4e9dc"/><polygon points="150,92 176,102 186,200 160,200" fill="#a6c9b4"/><polygon points="40,92 150,92 152,108 38,108" fill="#e4f1e8"/><path d="M62 94C62 60 130 60 130 94" fill="none" stroke="#98bda7" stroke-width="7" stroke-linecap="round"/><polygon points="56,94 62,22 76,24 76,94" fill="#8aa68c"/><polygon points="76,94 82,30 98,34 92,94" fill="#a8c0a1"/><polygon points="56,94 59,68 76,72 76,94" fill="#f3f0e1"/><polygon points="76,94 78,72 92,74 92,94" fill="#e4e8d6"/><polygon points="98,94 104,40 124,34 130,94" fill="#ecdeb9"/><polygon points="104,40 124,34 128,56 106,62" fill="#f5ebcf"/><polygon points="132,94 136,58 162,54 164,94" fill="#f1f6ef"/><polygon points="136,58 162,54 152,44 140,46" fill="#d8e8da"/>',
      agenda: '<polygon points="30,60 190,60 190,200 30,200" fill="#fbf0d6"/><polygon points="30,60 190,60 190,96 30,96" fill="#f2b878"/><polygon points="30,96 190,96 190,104 30,104" fill="#e19f5c"/><rect x="58" y="34" width="16" height="44" rx="8" fill="#c9694d"/><rect x="146" y="34" width="16" height="44" rx="8" fill="#c9694d"/><g fill="#e9d6ab"><rect x="48" y="122" width="22" height="18" rx="4"/><rect x="88" y="122" width="22" height="18" rx="4"/><rect x="128" y="122" width="22" height="18" rx="4"/><rect x="48" y="156" width="22" height="18" rx="4"/><rect x="88" y="156" width="22" height="18" rx="4"/></g><rect x="128" y="156" width="22" height="18" rx="4" fill="#e59a6d"/>',
      menu: '<circle cx="118" cy="128" r="76" fill="#f2a493"/><circle cx="118" cy="128" r="60" fill="#f7b9aa"/><polygon points="80,110 100,88 128,92 150,106 156,134 138,156 108,160 86,146" fill="#e7c876"/><polygon points="100,88 128,92 118,110" fill="#cfb865"/><polygon points="138,156 156,134 160,150 146,166" fill="#a9bd9c"/><polygon points="86,146 108,160 96,170 80,160" fill="#a9bd9c"/><polygon points="40,70 48,70 50,110 38,110" fill="#fbf3e6"/><polygon points="38,110 50,110 46,200 42,200" fill="#fbf3e6"/><polygon points="62,70 74,200 66,200 56,114 56,70" fill="#fbf3e6"/>',
      recettes: '<polygon points="46,92 176,92 168,196 54,196" fill="#e3c25c"/><polygon points="120,92 176,92 168,196 130,196" fill="#cfab43"/><polygon points="40,70 182,70 176,92 46,92" fill="#f1d676"/><polygon points="40,70 182,70 170,58 52,58" fill="#f7e49a"/><polygon points="98,58 124,58 118,40 104,40" fill="#fbf1cf"/><polygon points="30,104 46,100 46,120 30,124" fill="#fbf3e2"/><polygon points="182,96 198,92 198,112 182,116" fill="#fbf3e2"/><polygon points="150,60 196,14 204,24 164,70" fill="#b87642"/>',
      cave: '<polygon points="20,40 190,40 190,200 20,200" fill="#ea8b7e"/><polygon points="34,54 176,54 176,110 34,110" fill="#c25a4f"/><polygon points="34,124 176,124 176,200 34,200" fill="#c25a4f"/><polygon points="20,112 190,112 190,122 20,122" fill="#f3b3a8"/><polygon points="10,40 30,28 190,28 190,40" fill="#f3b3a8"/><polygon points="40,70 112,70 130,76 130,94 112,98 40,98" fill="#3e6d55"/><polygon points="40,70 52,70 52,98 40,98" fill="#f0e4c8"/><polygon points="78,70 104,70 104,98 78,98" fill="#e9e3cf"/><polygon points="44,146 116,146 134,152 134,172 116,176 44,176" fill="#3e6d55"/><polygon points="44,146 56,146 56,176 44,176" fill="#f0e4c8"/><polygon points="82,146 108,146 108,176 82,176" fill="#e9e3cf"/>',
      news: '<polygon points="28,40 150,40 150,200 28,200" fill="#f7f3e8"/><polygon points="150,70 190,70 190,200 150,200" fill="#e8e0cc"/><rect x="44" y="56" width="90" height="16" rx="3" fill="#2f5e86"/><rect x="44" y="86" width="42" height="36" rx="3" fill="#9cc3e2"/><g fill="#b9c7d3"><rect x="94" y="86" width="40" height="6" rx="3"/><rect x="94" y="100" width="40" height="6" rx="3"/><rect x="94" y="114" width="40" height="6" rx="3"/><rect x="44" y="134" width="90" height="6" rx="3"/><rect x="44" y="148" width="90" height="6" rx="3"/><rect x="44" y="162" width="60" height="6" rx="3"/></g><circle cx="150" cy="150" r="26" fill="#e9a24f"/><polygon points="142,138 142,162 164,150" fill="#fbf0d6"/>',
      playlists: '<circle cx="108" cy="116" r="88" fill="#3d4272"/><circle cx="108" cy="116" r="70" fill="none" stroke="#5a5f9a" stroke-width="3"/><circle cx="108" cy="116" r="54" fill="none" stroke="#5a5f9a" stroke-width="3"/><circle cx="108" cy="116" r="36" fill="#e9cf7b"/><circle cx="108" cy="116" r="7" fill="#3d4272"/><polygon points="108,116 196,92 196,66" fill="#4d5290" opacity=".55"/><path d="M150 40v46a14 14 0 1 1-8-12.5V34l40-10v40" fill="none" stroke="#f6f0dc" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>',
      maison: '<polygon points="30,98 150,98 150,200 30,200" fill="#f4ecd9"/><polygon points="150,98 190,112 190,200 150,200" fill="#dccfb2"/><polygon points="20,98 90,36 160,98" fill="#2d5b4e"/><polygon points="90,36 160,98 190,112 110,40" fill="#234a3f"/><polygon points="72,36 108,36 108,10 94,10" fill="#2d5b4e" opacity="0"/><rect x="48" y="124" width="26" height="34" rx="3" fill="#e8c76c"/><rect x="104" y="124" width="26" height="34" rx="3" fill="#e8c76c"/><polygon points="74,200 74,158 100,158 100,200" fill="#2d5b4e"/><polygon points="76,62 102,62 102,86 76,86" fill="#e8c76c"/>'
    };
    const TILES = [
      ["menus", "Courses", "courses", "#c6edd8", "#8fc3a6"],
      ["agenda", "Calendrier", "agenda", "#fcf0c8", "#f6cd8b"],
      ["menus", "Menu", "menu", "#f3b3a4", "#e5806f"],
      ["recipes", "Recettes", "recettes", "#faf0b0", "#f4e08e"],
      ["cellar", "Cave \xE0 vin", "cave", "#f1a7a0", "#ee7f72"],
      ["music", "Playlists", "playlists", "#e1dcf6", "#aeb0ee"],
      ["news", "Actualit\xE9", "news", "#d6e9f8", "#9ec8e8"],
      ["homebook", "Maison", "maison", "#cfe8e0", "#8fc5b5"]
    ];
    const home = {
      html(user) {
        const now = /* @__PURE__ */ new Date(), key = ymd(now);
        const meals = t("meal_plans").filter((p) => p.meal_date === key).sort((a, b) => (a.meal_type === "midi" ? -1 : 1) - (b.meal_type === "midi" ? -1 : 1));
        const events = t("family_events").filter((e) => e.starts_at && new Date(e.starts_at) >= new Date(now.getFullYear(), now.getMonth(), now.getDate())).sort((a, b) => a.starts_at.localeCompare(b.starts_at)).slice(0, 5);
        const todo = t("shopping_items").filter((i) => !i.checked).length;
        const badge = { Courses: todo, Calendrier: events.length };
        const tile = ([go, title, art, c1, c2]) => `<button class="mtile" data-go="${go}" style="background:linear-gradient(155deg,${c1},${c2})"><b>${title}</b>${badge[title] ? `<span class="badge">${badge[title]}</span>` : ""}<svg class="art" viewBox="0 0 200 200" aria-hidden="true">${ART[art]}</svg></button>`;
        return `<div class="mtiles">${TILES.map(tile).join("")}</div>
    <div class="grid2 homecards">
     <div class="card glass"><h3 class="script">Aujourd\u2019hui \xE0 table</h3>${meals.map((m) => `<div class="row"><span class="chip">${m.meal_type === "midi" ? "D\xE9jeuner" : "D\xEEner"}</span><b class="grow">${esc(m.title || "")}</b></div>`).join("") || '<p class="muted">Rien de planifi\xE9 aujourd\u2019hui.</p>'}<div class="bar" style="margin:12px 0 0"><button class="btn primary small" data-go="menus">Pr\xE9parer les menus de la semaine</button></div></div>
     <div class="card glass"><h3 class="script">\xC0 venir</h3>${events.map((e) => `<div class="row"><span class="dot p${pIndex(e.owner)}"></span><span class="grow"><b>${esc(e.title)}</b><br><small>${esc(fmtLong(new Date(e.starts_at)))} \xB7 ${esc(fmtTime(e.starts_at))}</small></span></div>`).join("") || '<p class="muted">Aucun rendez-vous \xE0 venir.</p>'}</div>
    </div>`;
      },
      bind(root, _rerender, go) {
        $$("[data-go]", root).forEach((b) => b.onclick = () => go(b.dataset.go));
      }
    };
    let month = /* @__PURE__ */ new Date();
    month.setDate(1);
    const agenda = {
      html() {
        const first = new Date(month.getFullYear(), month.getMonth(), 1), pad = (first.getDay() + 6) % 7;
        const start = addDays(first, -pad), key = ymd(/* @__PURE__ */ new Date());
        const byDay = {};
        t("family_events").forEach((e) => {
          var _a;
          if (e.starts_at) (byDay[_a = ymd(new Date(e.starts_at))] || (byDay[_a] = [])).push(e);
        });
        const cells = Array.from({ length: 42 }, (_, i) => addDays(start, i));
        const monthEvents = t("family_events").filter((e) => e.starts_at && new Date(e.starts_at).getMonth() === month.getMonth() && new Date(e.starts_at).getFullYear() === month.getFullYear()).sort((a, b) => a.starts_at.localeCompare(b.starts_at));
        return `<div class="bar"><div class="seg"><button id="mprev" aria-label="Mois pr\xE9c\xE9dent">\u2039</button><button id="mnow">Aujourd\u2019hui</button><button id="mnext" aria-label="Mois suivant">\u203A</button></div>
      <b class="weeklabel">${esc(month.toLocaleDateString("fr-FR", { month: "long", year: "numeric" }))}</b><span class="grow"></span><button class="btn primary" id="addEv">\uFF0B Rendez-vous</button></div>
      <div class="legend">${PEOPLE.map((p, i) => `<span><i class="p${i}"></i>${p}</span>`).join("")}</div>
      <div class="month glass">${["lun", "mar", "mer", "jeu", "ven", "sam", "dim"].map((d) => `<div class="dow">${d}</div>`).join("")}
      ${cells.map((d) => `<button class="day ${d.getMonth() !== month.getMonth() ? "off" : ""} ${ymd(d) === key ? "today" : ""}" data-day="${ymd(d)}"><span>${d.getDate()}</span><div class="dots">${(byDay[ymd(d)] || []).slice(0, 4).map((e) => `<i class="p${pIndex(e.owner)}"></i>`).join("")}</div></button>`).join("")}</div>
      <div class="card glass"><h3 class="script">Ce mois-ci</h3>${monthEvents.map((e) => `<button class="row evrow" data-ev="${e.id}"><span class="dot p${pIndex(e.owner)}"></span><span class="grow"><b>${esc(e.title)}</b><br><small>${esc(fmtLong(new Date(e.starts_at)))} \xB7 ${esc(fmtTime(e.starts_at))} \xB7 ${esc(e.owner || "")}</small></span></button>`).join("") || '<p class="muted">Aucun rendez-vous ce mois-ci.</p>'}
      <p class="muted small">La synchronisation avec Google Agenda n\u2019est pas encore branch\xE9e : les rendez-vous saisis ici sont partag\xE9s entre vos appareils.</p></div>`;
      },
      bind(root, rerender) {
        $("#mprev", root).onclick = () => {
          month = new Date(month.getFullYear(), month.getMonth() - 1, 1);
          rerender();
        };
        $("#mnext", root).onclick = () => {
          month = new Date(month.getFullYear(), month.getMonth() + 1, 1);
          rerender();
        };
        $("#mnow", root).onclick = () => {
          month = /* @__PURE__ */ new Date();
          month.setDate(1);
          rerender();
        };
        $("#addEv", root).onclick = () => editEvent({}, ymd(/* @__PURE__ */ new Date()));
        root.onclick = (e) => {
          const d = e.target.closest("[data-day]");
          if (d) return editEvent({}, d.dataset.day);
          const ev = e.target.closest("[data-ev]");
          if (ev) return editEvent(t("family_events").find((x) => x.id === ev.dataset.ev));
        };
      }
    };
    function editEvent(ev = {}, day) {
      formDialog({
        title: ev.id ? "Modifier le rendez-vous" : "Nouveau rendez-vous",
        fields: [
          { name: "title", label: "Intitul\xE9", required: true, full: true },
          { name: "owner", label: "Pour", type: "select", options: PEOPLE },
          { name: "starts_at", label: "D\xE9but", type: "datetime-local", required: true },
          { name: "ends_at", label: "Fin", type: "datetime-local" }
        ],
        values: __spreadProps(__spreadValues({ owner: "Famille" }, ev), { starts_at: ev.starts_at ? toLocalInput(ev.starts_at) : `${day}T09:00`, ends_at: ev.ends_at ? toLocalInput(ev.ends_at) : "" }),
        danger: ev.id ? { label: "Supprimer", confirm: "Supprimer ce rendez-vous ?", run: () => db.del("family_events", ev.id) } : null,
        onSubmit: async (v) => {
          const row = { title: v.title, owner: v.owner, starts_at: new Date(v.starts_at).toISOString(), ends_at: v.ends_at ? new Date(v.ends_at).toISOString() : null };
          if (ev.id) await db.patch("family_events", ev.id, row);
          else await db.add("family_events", row);
        }
      });
    }
    function spotifyInfo(raw) {
      const t2 = String(raw || "").trim();
      let m = t2.match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(?:embed\/)?(playlist|album|track|artist|show|episode)\/([A-Za-z0-9]{10,30})/) || t2.match(/spotify:(playlist|album|track|artist|show|episode):([A-Za-z0-9]{10,30})/);
      if (m) return { type: m[1], id: m[2], web: `https://open.spotify.com/${m[1]}/${m[2]}`, embed: `https://open.spotify.com/embed/${m[1]}/${m[2]}` };
      if (/^[A-Za-z0-9]{22}$/.test(t2)) return { type: "playlist", id: t2, web: `https://open.spotify.com/playlist/${t2}`, embed: `https://open.spotify.com/embed/playlist/${t2}` };
      m = t2.match(/https?:\/\/(?:spotify\.link|spoti\.fi)\/\S+/);
      return m ? { type: "short", web: m[0] } : null;
    }
    const music = {
      html() {
        return `<div class="bar"><span class="muted">\xAB \xC9couter \xBB lance la playlist ici ; \xAB Spotify \xBB l\u2019ouvre dans l\u2019appli. Pour une playlist priv\xE9e, connectez-vous \xE0 Spotify dans ce navigateur.</span><span class="grow"></span><button class="btn primary" id="addPl">\uFF0B Playlist</button></div>
      <div class="plgrid">${t("playlists").map((p) => {
          const i = spotifyInfo(p.spotify_url);
          return `<div class="card glass pl"><span class="ico"></span><div class="grow"><b>${esc(p.title)}</b><br><small>${esc(p.owner || "Famille")}${i ? "" : " \xB7 lien non reconnu"}</small></div>${i && i.embed ? `<button class="btn primary small" data-play="${p.id}">\xC9couter</button>` : ""}<a class="btn small" href="${esc(i ? i.web : p.spotify_url)}">Spotify \u2197</a><button class="iconbtn" data-edit="${p.id}" aria-label="Modifier">\u22EF</button></div>`;
        }).join("") || '<div class="empty">Ajoutez le lien de vos playlists Spotify.</div>'}</div>`;
      },
      bind(root) {
        const edit = (p = {}) => formDialog({
          title: p.id ? "Modifier la playlist" : "Nouvelle playlist",
          values: __spreadValues({ owner: "Famille" }, p),
          fields: [{ name: "title", label: "Nom", required: true, full: true }, { name: "spotify_url", label: "Lien Spotify", required: true, full: true, placeholder: "https://open.spotify.com/playlist/\u2026", hint: "Dans Spotify : \u22EF \u203A Partager \u203A Copier le lien de la playlist" }, { name: "owner", label: "\xC0 qui", type: "select", options: PEOPLE }],
          danger: p.id ? { label: "Supprimer", confirm: "Supprimer cette playlist ?", run: () => db.del("playlists", p.id) } : null,
          onSubmit: async (v) => {
            const i = spotifyInfo(v.spotify_url);
            if (!i) throw new Error("Lien Spotify non reconnu : collez le lien \xAB Copier le lien de la playlist \xBB.");
            v.spotify_url = i.web;
            if (p.id) await db.patch("playlists", p.id, v);
            else await db.add("playlists", v);
          }
        });
        const play = (p) => {
          const i = spotifyInfo(p.spotify_url);
          openModal(`<h2 class="script">${esc(p.title)}</h2><iframe class="spframe" src="${esc(i.embed)}" width="100%" height="380" frameborder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe><div class="formactions"><a class="btn" href="${esc(i.web)}">Ouvrir dans Spotify \u2197</a><span class="grow"></span><button class="btn primary" data-close>Fermer</button></div>`, { wide: true, onMount: (r) => {
            $("[data-close]", r).onclick = closeModal;
          } });
        };
        $("#addPl", root).onclick = () => edit();
        root.onclick = (e) => {
          const b = e.target.closest("[data-edit]");
          if (b) return edit(t("playlists").find((x) => x.id === b.dataset.edit));
          const pl = e.target.closest("[data-play]");
          if (pl) play(t("playlists").find((x) => x.id === pl.dataset.play));
        };
      }
    };
    const homebook = {
      html() {
        return `<div class="card glass accent"><b>Espace de notes partag\xE9.</b> Pratique pour les garanties, contacts d\u2019artisans, codes d\u2019appareils m\xE9nagers\u2026 N\u2019y saisissez pas d\u2019informations financi\xE8res ou tr\xE8s sensibles (mots de passe, num\xE9ros de compte).</div>
      <div class="bar"><span class="grow"></span><button class="btn primary" id="addNote">\uFF0B Note</button></div>
      <div class="notes">${[...t("family_notes")].sort((a, b) => (b.created_at || "").localeCompare(a.created_at || "")).map((n) => `<button class="note glass" data-note="${n.id}"><b class="script">${esc(n.title || "Sans titre")}</b><p>${esc((n.body || "").slice(0, 220))}</p></button>`).join("") || '<div class="empty">Aucune note pour le moment.</div>'}</div>`;
      },
      bind(root) {
        const edit = (n = {}) => formDialog({
          title: n.id ? "Modifier la note" : "Nouvelle note",
          values: n,
          fields: [{ name: "title", label: "Titre", required: true, full: true }, { name: "body", label: "Note", type: "textarea", rows: 8, full: true }],
          danger: n.id ? { label: "Supprimer", confirm: "Supprimer cette note ?", run: () => db.del("family_notes", n.id) } : null,
          onSubmit: async (v) => {
            if (n.id) await db.patch("family_notes", n.id, v);
            else await db.add("family_notes", v);
          }
        });
        $("#addNote", root).onclick = () => edit();
        root.onclick = (e) => {
          const b = e.target.closest("[data-note]");
          if (b) edit(t("family_notes").find((x) => x.id === b.dataset.note));
        };
      }
    };
    return { home, agenda, spotifyInfo, music, homebook };
  })();
  __m.app = (() => {
    const { $, $$, esc, toast, openModal, closeModal } = __m.util;
    const db = __m.db;
    const cellar = __m.cellar;
    const recipes = __m.recipes;
    const menus = __m.menus;
    const { news, stopReading } = __m.news;
    const { home, agenda, music, homebook } = __m.misc;
    const PAGES = {
      home: { icon: "", label: "Accueil", title: "Bonjour \xE0 tous", mod: home, tables: ["meal_plans", "family_events", "shopping_items", "recipes", "cellar_items"] },
      cellar: { icon: "", label: "Cave & spiritueux", title: "Notre cave", mod: cellar, tables: ["cellar_items"] },
      recipes: { icon: "", label: "Recettes", title: "Le carnet de recettes", mod: recipes, tables: ["recipes"] },
      menus: { icon: "", label: "Menus & courses", title: "\xC0 table !", mod: menus, tables: ["meal_plans", "shopping_items", "recipes"] },
      news: { icon: "", label: "Actualit\xE9s", title: "L\u2019actualit\xE9 du jour", mod: news, tables: [] },
      agenda: { icon: "", label: "Agenda", title: "L\u2019agenda familial", mod: agenda, tables: ["family_events"] },
      music: { icon: "", label: "Playlists", title: "Nos playlists", mod: music, tables: ["playlists"] },
      homebook: { icon: "", label: "Maison", title: "La maison", mod: homebook, tables: ["family_notes"] }
    };
    let page = "home";
    try {
      const p = localStorage.getItem("family-page");
      if (PAGES[p]) page = p;
    } catch (e) {
    }
    function go(p) {
      $("#nav").classList.add("hidden");
      if (p !== page) stopReading();
      page = p;
      try {
        localStorage.setItem("family-page", p);
      } catch (e) {
      }
      render();
      window.scrollTo(0, 0);
    }
    function render() {
      const P = PAGES[page], root = $("#content");
      $$("#nav button").forEach((b) => b.classList.toggle("active", b.dataset.page === page));
      if (page === "home") {
        const d = (/* @__PURE__ */ new Date()).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
        $("#heading").textContent = d.charAt(0).toUpperCase() + d.slice(1);
        $("#subheading").textContent = "Emilie \xB7 Alexandre \xB7 Hugo \xB7 Gaspard";
      } else {
        $("#heading").textContent = P.title;
        $("#subheading").textContent = "";
      }
      $("#floatnav").classList.toggle("onhome", page === "home");
      root.innerHTML = P.mod.html();
      P.mod.bind(root, render, go);
    }
    let renderTimer;
    function scheduleRender(table) {
      if (table === "_sync") return paintSync();
      if (table !== "*" && !PAGES[page].tables.includes(table)) return;
      clearTimeout(renderTimer);
      renderTimer = setTimeout(() => {
        const a = document.activeElement;
        if (a && $("#content").contains(a) && /input|textarea|select/i.test(a.tagName)) return;
        if (!$("#appShell").classList.contains("hidden")) {
          const y = window.pageYOffset;
          render();
          window.scrollTo(0, y);
        }
      }, 60);
    }
    function paintSync() {
      const m = { live: ["\u25CF Synchronis\xE9", "live"], connecting: ["\u25CF Connexion\u2026", "wait"], offline: ["\u25CF Hors ligne", "off"] }[db.store.sync];
      ["syncBadge", "syncBadge2"].forEach((id) => {
        const el = $("#" + id);
        el.textContent = m[0];
        el.className = "sync " + m[1];
      });
    }
    function showLogin(msg = "") {
      $("#appShell").classList.add("hidden");
      $("#loginScreen").classList.remove("hidden");
      $("#loginMessage").textContent = msg;
    }
    async function enter(user) {
      db.store.user = user;
      $("#loginScreen").classList.add("hidden");
      $("#appShell").classList.remove("hidden");
      $("#signedInAs").textContent = user.email || "";
      $("#banner").innerHTML = "";
      render();
      paintSync();
      try {
        if (!await db.loadFamily()) {
          $("#banner").innerHTML = `<div class="card glass warn"><b>Votre compte n\u2019est rattach\xE9 \xE0 aucune famille.</b> Ex\xE9cutez le script <code>supabase/002_family_sync.sql</code> dans le SQL Editor de Supabase, puis rechargez la page.</div>`;
          return;
        }
        await db.loadAll();
        db.startRealtime();
      } catch (e) {
        console.error(e);
        const missing = /relation|does not exist|schema cache|permission|42P01|PGRST/i.test(e.message || "");
        $("#banner").innerHTML = `<div class="card glass warn"><b>Impossible de charger les donn\xE9es.</b> ${missing ? "Les tables ne sont pas pr\xEAtes : ex\xE9cutez <code>supabase/002_family_sync.sql</code> dans le SQL Editor de Supabase." : esc(e.message || "")}</div>`;
        db.startRealtime();
      }
    }
    function detectFlexGap() {
      const d = document.createElement("div");
      d.style.cssText = "display:flex;flex-direction:column;gap:1px;position:absolute;visibility:hidden";
      for (let i = 0; i < 2; i++) {
        const c = document.createElement("i");
        c.style.height = "1px";
        d.appendChild(c);
      }
      document.body.appendChild(d);
      const ok = d.scrollHeight === 3;
      document.body.removeChild(d);
      if (!ok) document.documentElement.classList.add("no-flexgap");
    }
    async function boot() {
      detectFlexGap();
      $("#nav").innerHTML = Object.entries(PAGES).map(([k, p]) => `<button data-page="${k}"><span>${p.label}</span></button>`).join("");
      $("#nav").onclick = (e) => {
        const b = e.target.closest("[data-page]");
        if (b) go(b.dataset.page);
      };
      $("#menuBtn").onclick = (e) => {
        e.stopPropagation();
        $("#nav").classList.toggle("hidden");
      };
      document.addEventListener("click", (e) => {
        if (!e.target.closest("#nav") && !e.target.closest("#menuBtn")) $("#nav").classList.add("hidden");
      });
      $("#homeBtn").onclick = $("#homeBtn2").onclick = () => go("home");
      $("#familyPill").onclick = () => go("home");
      $("#dlg").addEventListener("click", (e) => {
        if (e.target.id === "dlg") closeModal();
      });
      db.onChange(scheduleRender);
      const sb = db.createClientFromConfig();
      if (!sb) return showLogin(db.store.configError || "Configuration Supabase \xE0 v\xE9rifier dans config.js");
      $("#loginForm").onsubmit = async (e) => {
        e.preventDefault();
        $("#loginMessage").textContent = "Connexion\u2026";
        const { data, error } = await sb.auth.signInWithPassword({ email: $("#email").value.trim(), password: $("#password").value });
        if (error) $("#loginMessage").textContent = /invalid login/i.test(error.message) ? "E-mail ou mot de passe incorrect." : error.message;
        else enter(data.user);
      };
      const logout = async () => {
        closeModal();
        db.stopRealtime();
        await sb.auth.signOut();
        db.clearCache();
        db.store.user = null;
        showLogin();
      };
      $("#userBtn").onclick = () => openModal(`<h2 class="script">Mon compte</h2><p class="muted">${esc(db.store.user && db.store.user.email || "")}</p><p><span id="syncBadge3" class="sync ${esc(db.store.sync === "live" ? "live" : db.store.sync === "connecting" ? "wait" : "off")}">${db.store.sync === "live" ? "\u25CF Synchronis\xE9 sur tous vos appareils" : db.store.sync === "connecting" ? "\u25CF Connexion\u2026" : "\u25CF Hors ligne"}</span></p><div class="formactions"><button class="btn ghost" data-close>Fermer</button><span class="grow"></span><button class="btn danger" id="logoutBtn">Se d\xE9connecter</button></div>`, { onMount: (r) => {
        $("[data-close]", r).onclick = closeModal;
        $("#logoutBtn", r).onclick = logout;
      } });
      $("#loginMessage").textContent = "";
      const { data: { session } } = await sb.auth.getSession();
      if (session) enter(session.user);
      else showLogin();
    }
    boot();
  })();
})();
