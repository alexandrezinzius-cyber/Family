"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = function (obj, key, value) { return key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value: value }) : obj[key] = value; };
var __spreadValues = function (a, b) {
    var e_1, _d;
    for (var prop in b || (b = {}))
        if (__hasOwnProp.call(b, prop))
            __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
        try {
            for (var _e = __values(__getOwnPropSymbols(b)), _f = _e.next(); !_f.done; _f = _e.next()) {
                var prop = _f.value;
                if (__propIsEnum.call(b, prop))
                    __defNormalProp(a, prop, b[prop]);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_f && !_f.done && (_d = _e.return)) _d.call(_e);
            }
            finally { if (e_1) throw e_1.error; }
        }
    return a;
};
var __spreadProps = function (a, b) { return __defProps(a, __getOwnPropDescs(b)); };
(function () {
    "use strict";
    var __m = {};
    __m.util = /* @__PURE__ */ (function () {
        var $ = function (s, r) {
            if (r === void 0) { r = document; }
            return r.querySelector(s);
        };
        var $$ = function (s, r) {
            if (r === void 0) { r = document; }
            return __spreadArray([], __read(r.querySelectorAll(s)), false);
        };
        var esc = function (s) { return String(s != null ? s : "").replace(/[&<>"']/g, function (c) { return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]; }); };
        var pick = function (a) { return a[Math.floor(Math.random() * a.length)]; };
        var shuffle = function (a) {
            var _d;
            a = __spreadArray([], __read(a), false);
            for (var i = a.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                _d = __read([a[j], a[i]], 2), a[i] = _d[0], a[j] = _d[1];
            }
            return a;
        };
        var PEOPLE = ["Famille", "Emilie", "Alexandre", "Hugo", "Gaspard"];
        var DAYS = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
        var ymd = function (d) { return "".concat(d.getFullYear(), "-").concat(String(d.getMonth() + 1).padStart(2, "0"), "-").concat(String(d.getDate()).padStart(2, "0")); };
        var parseYmd = function (s) {
            var _d = __read(s.split("-").map(Number), 3), y = _d[0], m = _d[1], d = _d[2];
            return new Date(y, m - 1, d);
        };
        var addDays = function (d, n) {
            var x = new Date(d);
            x.setDate(x.getDate() + n);
            return x;
        };
        var weekStartSaturday = function (d) { return addDays(new Date(d.getFullYear(), d.getMonth(), d.getDate()), -((d.getDay() + 1) % 7)); };
        var fmtLong = function (d) { return d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" }); };
        var fmtShort = function (d) { return d.toLocaleDateString("fr-FR", { weekday: "short", day: "numeric", month: "short" }); };
        var fmtTime = function (iso) { return new Date(iso).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }); };
        var toLocalInput = function (iso) {
            var d = new Date(iso);
            d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
            return d.toISOString().slice(0, 16);
        };
        var toastTimer;
        function toast(msg, kind) {
            if (kind === void 0) { kind = ""; }
            var t = $("#toast");
            if (!t)
                return;
            t.textContent = msg;
            t.className = "show " + kind;
            clearTimeout(toastTimer);
            toastTimer = setTimeout(function () { return t.className = ""; }, 2800);
        }
        var isOpen = function (d) { return !!(d.open || d.hasAttribute("open")); };
        function openModal(html, _d) {
            var _e = _d === void 0 ? {} : _d, _f = _e.wide, wide = _f === void 0 ? false : _f, onMount = _e.onMount;
            var dlg = $("#dlg");
            $("#dlgBody").innerHTML = html;
            dlg.classList.toggle("wide", wide);
            if (!isOpen(dlg)) {
                if (typeof dlg.showModal === "function")
                    dlg.showModal();
                else {
                    dlg.setAttribute("open", "");
                    dlg.classList.add("fallback");
                    document.body.style.overflow = "hidden";
                }
            }
            onMount && onMount($("#dlgBody"));
        }
        var closeModal = function () {
            var d = $("#dlg");
            if (!isOpen(d))
                return;
            if (typeof d.close === "function")
                d.close();
            else {
                d.removeAttribute("open");
                document.body.style.overflow = "";
            }
        };
        function fieldHTML(f, v) {
            if (v === void 0) { v = ""; }
            var val = v != null ? v : "";
            var req = f.required ? "required" : "";
            var input;
            if (f.type === "select")
                input = "<select name=\"".concat(f.name, "\" ").concat(req, ">").concat(f.options.map(function (o) {
                    var _d = __read(Array.isArray(o) ? o : [o, o], 2), ov = _d[0], ol = _d[1];
                    return "<option value=\"".concat(esc(ov), "\" ").concat(String(ov) === String(val) ? "selected" : "", ">").concat(esc(ol), "</option>");
                }).join(""), "</select>");
            else if (f.type === "textarea")
                input = "<textarea name=\"".concat(f.name, "\" rows=\"").concat(f.rows || 4, "\" placeholder=\"").concat(esc(f.placeholder || ""), "\" ").concat(req, ">").concat(esc(val), "</textarea>");
            else if (f.type === "checkbox")
                return "<label class=\"field check ".concat(f.full ? "full" : "", "\"><input type=\"checkbox\" name=\"").concat(f.name, "\" ").concat(val ? "checked" : "", "> <span>").concat(esc(f.label), "</span></label>");
            else if (f.type === "file")
                input = "<input type=\"file\" name=\"".concat(f.name, "\" accept=\"image/*\">");
            else
                input = "<input type=\"".concat(f.type || "text", "\" name=\"").concat(f.name, "\" value=\"").concat(esc(val), "\" placeholder=\"").concat(esc(f.placeholder || ""), "\" ").concat(f.list ? "list=\"".concat(f.list, "\"") : "", " ").concat(f.step ? "step=\"".concat(f.step, "\"") : "", " ").concat(req, ">");
            return "<label class=\"field ".concat(f.full ? "full" : "", "\"><span>").concat(esc(f.label), "</span>").concat(input).concat(f.hint ? "<small>".concat(esc(f.hint), "</small>") : "", "</label>");
        }
        function formDialog(_d) {
            var _this = this;
            var title = _d.title, fields = _d.fields, _e = _d.values, values = _e === void 0 ? {} : _e, _f = _d.submitLabel, submitLabel = _f === void 0 ? "Enregistrer" : _f, onSubmit = _d.onSubmit, _g = _d.extra, extra = _g === void 0 ? "" : _g, _h = _d.wide, wide = _h === void 0 ? false : _h, onMount = _d.onMount, danger = _d.danger;
            var html = "<form id=\"genForm\" class=\"genform\"><h2 class=\"script\">".concat(esc(title), "</h2>\n    <div class=\"fields\">").concat(fields.map(function (f) { return fieldHTML(f, values[f.name]); }).join(""), "</div>\n    ").concat(extra, "\n    <div class=\"formactions\">").concat(danger ? "<button type=\"button\" class=\"btn danger\" data-danger>".concat(esc(danger.label), "</button>") : "", "<span class=\"grow\"></span>\n    <button type=\"button\" class=\"btn ghost\" data-close>Annuler</button><button class=\"btn primary\">").concat(esc(submitLabel), "</button></div></form>");
            openModal(html, {
                wide: wide,
                onMount: function (root) {
                    var form = $("#genForm", root);
                    $("[data-close]", root).onclick = closeModal;
                    if (danger)
                        $("[data-danger]", root).onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        if (!confirm(danger.confirm || "Supprimer ?")) return [3 /*break*/, 2];
                                        return [4 /*yield*/, danger.run()];
                                    case 1:
                                        _d.sent();
                                        closeModal();
                                        _d.label = 2;
                                    case 2: return [2 /*return*/];
                                }
                            });
                        }); };
                    form.onsubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var btn, out, fields_1, fields_1_1, f, v, err_1;
                        var e_2, _d;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    e.preventDefault();
                                    btn = form.querySelector("button.primary");
                                    btn.disabled = true;
                                    out = {};
                                    try {
                                        for (fields_1 = __values(fields), fields_1_1 = fields_1.next(); !fields_1_1.done; fields_1_1 = fields_1.next()) {
                                            f = fields_1_1.value;
                                            if (f.type === "file") {
                                                out[f.name] = form.elements[f.name].files[0] || null;
                                                continue;
                                            }
                                            if (f.type === "checkbox") {
                                                out[f.name] = form.elements[f.name].checked;
                                                continue;
                                            }
                                            v = form.elements[f.name].value;
                                            if (f.type === "number")
                                                v = v === "" ? null : Number(v);
                                            else if (typeof v === "string") {
                                                v = v.trim();
                                                if (v === "")
                                                    v = null;
                                            }
                                            out[f.name] = v;
                                        }
                                    }
                                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                                    finally {
                                        try {
                                            if (fields_1_1 && !fields_1_1.done && (_d = fields_1.return)) _d.call(fields_1);
                                        }
                                        finally { if (e_2) throw e_2.error; }
                                    }
                                    _e.label = 1;
                                case 1:
                                    _e.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, onSubmit(out)];
                                case 2:
                                    _e.sent();
                                    closeModal();
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_1 = _e.sent();
                                    console.error(err_1);
                                    toast(err_1.message || "Erreur", "err");
                                    btn.disabled = false;
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); };
                    onMount && onMount(root, form);
                }
            });
        }
        function compressImage(file_1) {
            return __awaiter(this, arguments, void 0, function (file, max, quality) {
                var bmp, _d, k, c;
                if (max === void 0) { max = 1100; }
                if (quality === void 0) { quality = 0.82; }
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (!window.createImageBitmap) return [3 /*break*/, 2];
                            return [4 /*yield*/, createImageBitmap(file)];
                        case 1:
                            _d = _e.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, new Promise(function (res, rej) {
                                var im = new Image();
                                im.onload = function () { return res(im); };
                                im.onerror = rej;
                                im.src = URL.createObjectURL(file);
                            })];
                        case 3:
                            _d = _e.sent();
                            _e.label = 4;
                        case 4:
                            bmp = _d;
                            bmp.width = bmp.width || bmp.naturalWidth;
                            bmp.height = bmp.height || bmp.naturalHeight;
                            k = Math.min(1, max / Math.max(bmp.width, bmp.height));
                            c = document.createElement("canvas");
                            c.width = Math.round(bmp.width * k);
                            c.height = Math.round(bmp.height * k);
                            c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
                            return [2 /*return*/, new Promise(function (res) { return c.toBlob(res, "image/jpeg", quality); })];
                    }
                });
            });
        }
        var ingredientLines = function (text) { return String(text || "").split(/\r?\n/).map(function (l) { return l.replace(/^[\s\-•*·–]+/, "").trim(); }).filter(function (l) { return l && !/:$/.test(l); }); };
        var norm = function (t) { return String(t || "").toLowerCase().replace(/œ/g, "oe").normalize("NFD").replace(/[̀-ͯ]/g, ""); };
        var PROCESSED = /(concentr|coulis|puree|concass|boite|conserve|sauce|pelee|sech|surgel|confit|jus de|huile|sirop|compote|confiture|vinaigre|bouillon|cube|poudre|\blait|creme|fromage|beurre|\bfarine\b|sucre|\bpate|\bvin\b|moutarde|ketchup|cornichon|lardon|jambon|saucisse|chocolat|miel|\bsel\b|poivre|epice|paprika|cumin|curry|muscade|raclette|mozzarella|parmesan|emmental|comte)/;
        var FRESH = /(carotte|poireau|courgette|aubergine|tomate|salade|laitue|radis|betterave|betrave|\bchou|celeri|oignon|echalote|\bail\b|pomme|poire|citron|\boranges?\b|clementine|mandarine|kiwi|banane|fraise|framboise|cerise|abricot|peche|nectarine|melon|raisin|figue|fruit|legume|persil|basilic|coriandre|menthe|ciboulette|thym|romarin|gingembre|cebette|ciboule|champignon|epinard|haricots? verts?|poivron|concombre|navet|potiron|courge|butternut|patate|endive|fenouil|panais|asperge|artichaut|avocat|mache|brocoli|petits? pois|\bmais\b|poulet|volaille|canard|dinde|pintade|caille|magret|aiguillette|\boeuf)/;
        var guessShop = function (line) {
            var n = norm(line);
            return !PROCESSED.test(n) && FRESH.test(n) ? "March\xE9" : "Supermarch\xE9";
        };
        return { $: $, $$: $$, esc: esc, pick: pick, shuffle: shuffle, PEOPLE: PEOPLE, DAYS: DAYS, ymd: ymd, parseYmd: parseYmd, addDays: addDays, weekStartSaturday: weekStartSaturday, fmtLong: fmtLong, fmtShort: fmtShort, fmtTime: fmtTime, toLocalInput: toLocalInput, toast: toast, openModal: openModal, closeModal: closeModal, fieldHTML: fieldHTML, formDialog: formDialog, compressImage: compressImage, ingredientLines: ingredientLines, norm: norm, guessShop: guessShop };
    })();
    __m.season = (function () {
        var strip = function (s) { return String(s || "").toLowerCase().replace(/œ/g, "oe").normalize("NFD").replace(/[̀-ͯ]/g, ""); };
        var PRODUCE = [
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
        ].map(function (_d) {
            var _e = __read(_d, 3), name = _e[0], re = _e[1], months = _e[2];
            return ({ name: name, re: new RegExp(re), months: months });
        });
        var inSeason = function (months, m) { return months.split(",").some(function (r) {
            var _d = __read(r.split("-").map(Number), 2), a = _d[0], b = _d[1];
            return a <= b ? m >= a && m <= b : m >= a || m <= b;
        }); };
        var PROCESSED = /(concentr|coulis|puree|concass|boite|conserve|sauce|pelee|sech|surgel|confit|jus de|huile|sirop|compote|confiture|vinaigre|bouillon|cube)/;
        var MONTHS = ["janvier", "f\xE9vrier", "mars", "avril", "mai", "juin", "juillet", "ao\xFBt", "septembre", "octobre", "novembre", "d\xE9cembre"];
        var seasonalNames = function (m) { return PRODUCE.filter(function (p) { return inSeason(p.months, m); }).map(function (p) { return p.name; }); };
        function scoreRecipe(recipe, month) {
            var e_3, _d;
            var text = strip(recipe.ingredients).split("\n").filter(function (l) { return !PROCESSED.test(l); }).join("\n");
            var score = 0;
            var hits = [];
            try {
                for (var PRODUCE_1 = __values(PRODUCE), PRODUCE_1_1 = PRODUCE_1.next(); !PRODUCE_1_1.done; PRODUCE_1_1 = PRODUCE_1.next()) {
                    var p = PRODUCE_1_1.value;
                    if (!p.re.test(text))
                        continue;
                    if (inSeason(p.months, month)) {
                        score++;
                        hits.push(p.name);
                    }
                    else
                        score--;
                }
            }
            catch (e_3_1) { e_3 = { error: e_3_1 }; }
            finally {
                try {
                    if (PRODUCE_1_1 && !PRODUCE_1_1.done && (_d = PRODUCE_1.return)) _d.call(PRODUCE_1);
                }
                finally { if (e_3) throw e_3.error; }
            }
            return { score: Math.max(-3, Math.min(4, score)), hits: hits };
        }
        return { MONTHS: MONTHS, seasonalNames: seasonalNames, scoreRecipe: scoreRecipe };
    })();
    __m.db = (function () {
        var TABLES = ["cellar_items", "recipes", "meal_plans", "shopping_items", "family_events", "playlists", "family_notes"];
        var CACHE_KEY = "family-cache-v3";
        var store = {
            sb: null,
            user: null,
            familyId: null,
            t: Object.fromEntries(TABLES.map(function (k) { return [k, []]; })),
            sync: "offline"
            // offline | connecting | live
        };
        var listeners = /* @__PURE__ */ new Set();
        var onChange = function (fn) {
            listeners.add(fn);
            return function () { return listeners.delete(fn); };
        };
        var emit = function (table) { return listeners.forEach(function (f) { return f(table); }); };
        var setSync = function (s) {
            store.sync = s;
            emit("_sync");
        };
        function createClientFromConfig() {
            var cfg = window.APP_CONFIG || {};
            var url = cfg.SUPABASE_URL || window.SUPABASE_URL;
            var key = cfg.SUPABASE_PUBLISHABLE_KEY || cfg.SUPABASE_ANON_KEY || window.SUPABASE_ANON_KEY;
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
                var c_1 = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");
                if (c_1 && c_1.uid === ((_a = store.user) == null ? void 0 : _a.id))
                    TABLES.forEach(function (k) {
                        store.t[k] = c_1.t[k] || [];
                    });
            }
            catch (e) {
            }
        }
        var cacheTimer;
        function writeCache() {
            clearTimeout(cacheTimer);
            cacheTimer = setTimeout(function () {
                var _a;
                try {
                    localStorage.setItem(CACHE_KEY, JSON.stringify({ uid: (_a = store.user) == null ? void 0 : _a.id, t: store.t }));
                }
                catch (e) {
                }
            }, 600);
        }
        function clearCache() {
            try {
                localStorage.removeItem(CACHE_KEY);
            }
            catch (e) {
            }
            TABLES.forEach(function (k) { return store.t[k] = []; });
        }
        function loadFamily() {
            return __awaiter(this, void 0, void 0, function () {
                var _d, data, error;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, store.sb.from("profiles").select("family_id,display_name").eq("id", store.user.id).maybeSingle()];
                        case 1:
                            _d = _e.sent(), data = _d.data, error = _d.error;
                            if (error)
                                throw error;
                            store.familyId = (data == null ? void 0 : data.family_id) || null;
                            store.displayName = (data == null ? void 0 : data.display_name) || "";
                            return [2 /*return*/, store.familyId];
                    }
                });
            });
        }
        function loadAll() {
            return __awaiter(this, void 0, void 0, function () {
                var results, failed;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            readCache();
                            emit("*");
                            return [4 /*yield*/, Promise.all(TABLES.map(function (k) { return store.sb.from(k).select("*"); }))];
                        case 1:
                            results = _d.sent();
                            results.forEach(function (r, i) {
                                if (r.error)
                                    console.error(TABLES[i], r.error);
                                else
                                    store.t[TABLES[i]] = r.data;
                            });
                            writeCache();
                            emit("*");
                            failed = results.find(function (r) { return r.error; });
                            if (failed)
                                throw failed.error;
                            return [2 /*return*/];
                    }
                });
            });
        }
        var channel, pollTimer;
        function startRealtime() {
            stopRealtime();
            setSync("connecting");
            channel = store.sb.channel("family-sync");
            TABLES.forEach(function (table) { return channel.on("postgres_changes", { event: "*", schema: "public", table: table }, function (p) { return applyChange(table, p); }); });
            channel.subscribe(function (status) {
                if (status === "SUBSCRIBED") {
                    setSync("live");
                    loadAll().catch(function () {
                    });
                }
                else if (["CHANNEL_ERROR", "TIMED_OUT", "CLOSED"].includes(status))
                    setSync("offline");
            });
            document.addEventListener("visibilitychange", onVisible);
            window.addEventListener("online", onVisible);
            pollTimer = setInterval(function () {
                if (!document.hidden)
                    loadAll().catch(function () {
                    });
            }, store.sb && store.sb.__mini ? 3e4 : 12e4);
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
        var onVisible = function () {
            if (!document.hidden && store.user)
                loadAll().catch(function () {
                });
        };
        function applyChange(table, p) {
            var rows = store.t[table];
            if (p.eventType === "DELETE")
                store.t[table] = rows.filter(function (r) { return r.id !== p.old.id; });
            else {
                var i = rows.findIndex(function (r) { return r.id === p.new.id; });
                if (i >= 0)
                    rows[i] = p.new;
                else
                    rows.push(p.new);
            }
            writeCache();
            emit(table);
        }
        var upsertLocal = function (table, row) {
            var rows = store.t[table];
            var i = rows.findIndex(function (r) { return r.id === row.id; });
            if (i >= 0)
                rows[i] = row;
            else
                rows.push(row);
        };
        function add(table, row) {
            return __awaiter(this, void 0, void 0, function () {
                var _d, data, error;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0: return [4 /*yield*/, store.sb.from(table).insert(row).select().single()];
                        case 1:
                            _d = _e.sent(), data = _d.data, error = _d.error;
                            if (error)
                                throw error;
                            upsertLocal(table, data);
                            writeCache();
                            emit(table);
                            return [2 /*return*/, data];
                    }
                });
            });
        }
        function addMany(table_1, rows_1) {
            return __awaiter(this, arguments, void 0, function (table, rows, _d) {
                var q, _e, data, error;
                var _f = _d === void 0 ? {} : _d, _g = _f.ignoreDuplicates, ignoreDuplicates = _g === void 0 ? false : _g;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            if (!rows.length)
                                return [2 /*return*/, []];
                            q = ignoreDuplicates ? store.sb.from(table).upsert(rows, { onConflict: "family_id,external_id", ignoreDuplicates: true }).select() : store.sb.from(table).insert(rows).select();
                            return [4 /*yield*/, q];
                        case 1:
                            _e = _h.sent(), data = _e.data, error = _e.error;
                            if (error)
                                throw error;
                            (data || []).forEach(function (r) { return upsertLocal(table, r); });
                            writeCache();
                            emit(table);
                            return [2 /*return*/, data || []];
                    }
                });
            });
        }
        function patch(table, id, changes) {
            return __awaiter(this, void 0, void 0, function () {
                var old, _d, data, error;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            old = store.t[table].find(function (r) { return r.id === id; });
                            if (old) {
                                upsertLocal(table, __spreadValues(__spreadValues({}, old), changes));
                                emit(table);
                            }
                            return [4 /*yield*/, store.sb.from(table).update(changes).eq("id", id).select().single()];
                        case 1:
                            _d = _e.sent(), data = _d.data, error = _d.error;
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
                            return [2 /*return*/, data];
                    }
                });
            });
        }
        function del(table, id) {
            return __awaiter(this, void 0, void 0, function () {
                var old, error;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            old = store.t[table].find(function (r) { return r.id === id; });
                            store.t[table] = store.t[table].filter(function (r) { return r.id !== id; });
                            emit(table);
                            return [4 /*yield*/, store.sb.from(table).delete().eq("id", id)];
                        case 1:
                            error = (_d.sent()).error;
                            if (error) {
                                if (old) {
                                    store.t[table].push(old);
                                    emit(table);
                                }
                                throw error;
                            }
                            writeCache();
                            return [2 /*return*/];
                    }
                });
            });
        }
        function delMany(table, ids) {
            return __awaiter(this, void 0, void 0, function () {
                var old, set, i, error;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (!ids.length)
                                return [2 /*return*/, 0];
                            old = store.t[table].filter(function (r) { return ids.indexOf(r.id) >= 0; }), set = new Set(ids);
                            store.t[table] = store.t[table].filter(function (r) { return !set.has(r.id); });
                            emit(table);
                            i = 0;
                            _d.label = 1;
                        case 1:
                            if (!(i < ids.length)) return [3 /*break*/, 4];
                            return [4 /*yield*/, store.sb.from(table).delete().in("id", ids.slice(i, i + 100))];
                        case 2:
                            error = (_d.sent()).error;
                            if (error) {
                                old.forEach(function (r) {
                                    if (!store.t[table].some(function (x) { return x.id === r.id; }))
                                        store.t[table].push(r);
                                });
                                emit(table);
                                throw error;
                            }
                            _d.label = 3;
                        case 3:
                            i += 100;
                            return [3 /*break*/, 1];
                        case 4:
                            writeCache();
                            return [2 /*return*/, ids.length];
                    }
                });
            });
        }
        function uploadPhoto(blob_1) {
            return __awaiter(this, arguments, void 0, function (blob, folder, mime) {
                var ext, path, error;
                if (folder === void 0) { folder = "misc"; }
                if (mime === void 0) { mime = "image/jpeg"; }
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            ext = { "image/png": "png", "image/webp": "webp", "image/gif": "gif" }[mime] || "jpg";
                            path = "".concat(folder, "/").concat(crypto.randomUUID(), ".").concat(ext);
                            return [4 /*yield*/, store.sb.storage.from("photos").upload(path, blob, { contentType: mime, cacheControl: "31536000" })];
                        case 1:
                            error = (_d.sent()).error;
                            if (error)
                                throw error;
                            return [2 /*return*/, store.sb.storage.from("photos").getPublicUrl(path).data.publicUrl];
                    }
                });
            });
        }
        return { TABLES: TABLES, store: store, onChange: onChange, createClientFromConfig: createClientFromConfig, clearCache: clearCache, loadFamily: loadFamily, loadAll: loadAll, startRealtime: startRealtime, stopRealtime: stopRealtime, add: add, addMany: addMany, patch: patch, del: del, delMany: delMany, uploadPhoto: uploadPhoto };
    })();
    __m.ext = (function () {
        var pick = __m.util.pick;
        var db = __m.db;
        var MEAL = "https://www.themealdb.com/api/json/v1/1/";
        var COCK = "https://www.thecocktaildb.com/api/json/v1/1/";
        function getJSON(url) {
            return __awaiter(this, void 0, void 0, function () {
                var r;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, fetch(url)];
                        case 1:
                            r = _d.sent();
                            if (!r.ok)
                                throw new Error("Service indisponible (" + r.status + ")");
                            return [2 /*return*/, r.json()];
                    }
                });
            });
        }
        var MEAL_CATS = {
            "Entr\xE9e": ["Starter"],
            "Plat": ["Beef", "Chicken", "Lamb", "Pork", "Pasta", "Seafood", "Vegetarian", "Miscellaneous"],
            "Dessert": ["Dessert"],
            "Accompagnement": ["Side"],
            "Ap\xE9ro": ["Starter", "Side"],
            "Brunch": ["Breakfast"]
        };
        var PAIRING = {
            Rouge: ["Beef", "Lamb", "Pork"],
            Blanc: ["Seafood", "Chicken", "Vegetarian"],
            "Ros\xE9": ["Pasta", "Chicken", "Starter"],
            Effervescent: ["Starter", "Seafood"],
            Liquoreux: ["Dessert"],
            "Fortifi\xE9": ["Dessert"],
            Spiritueux: ["Dessert"]
        };
        var SPIRIT_MAP = { whisky: "Whiskey", whiskey: "Whiskey", scotch: "Scotch", bourbon: "Bourbon", rhum: "Rum", rum: "Rum", gin: "Gin", vodka: "Vodka", tequila: "Tequila", cognac: "Cognac", brandy: "Brandy", champagne: "Champagne", "cr\xE9mant": "Champagne", prosecco: "Prosecco", porto: "Port", "vin": "Wine" };
        function normMeal(m) {
            var ing = [];
            for (var i = 1; i <= 20; i++) {
                var n = (m["strIngredient" + i] || "").trim();
                if (n)
                    ing.push("".concat((m["strMeasure" + i] || "").trim(), " ").concat(n).trim());
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
            var ing = [];
            for (var i = 1; i <= 15; i++) {
                var n = (c["strIngredient" + i] || "").trim();
                if (n)
                    ing.push("".concat((c["strMeasure" + i] || "").trim(), " ").concat(n).trim());
            }
            var fr = (c.strInstructionsFR || "").trim();
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
        var FR_TERM = { Beef: "boeuf", Chicken: "poulet", Lamb: "agneau", Pork: "porc", Pasta: "p\xE2tes", Seafood: "poisson", Vegetarian: "l\xE9gumes", Miscellaneous: "gratin", Starter: "entr\xE9e", Side: "accompagnement", Dessert: "dessert", Breakfast: "brunch" };
        var FR_TYPE = { Starter: "entree", Side: "accompagnement", Dessert: "dessert", Breakfast: "" };
        var FR_SPIRIT = { Whiskey: "whisky", Scotch: "whisky", Bourbon: "bourbon", Rum: "rhum", Gin: "gin", Vodka: "vodka", Tequila: "tequila", Cognac: "cognac", Brandy: "cognac", Champagne: "champagne", Prosecco: "prosecco", Port: "porto", Wine: "vin" };
        var PROXIES = [function (u) { return "https://api.allorigins.win/raw?url=" + encodeURIComponent(u); }, function (u) { return "https://corsproxy.io/?" + encodeURIComponent(u); }];
        var withTimeout = function (p, ms, label) { return Promise.race([p, new Promise(function (_, rej) { return setTimeout(function () { return rej(new Error(label + " : pas de r\xE9ponse en " + ms / 1e3 + " s")); }, ms); })]); };
        function viaProxy(url) {
            return __awaiter(this, void 0, void 0, function () {
                var last, PROXIES_1, PROXIES_1_1, mk, r, t, err_2, e_4_1;
                var e_4, _d;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            last = "relais indisponible";
                            _e.label = 1;
                        case 1:
                            _e.trys.push([1, 11, 12, 13]);
                            PROXIES_1 = __values(PROXIES), PROXIES_1_1 = PROXIES_1.next();
                            _e.label = 2;
                        case 2:
                            if (!!PROXIES_1_1.done) return [3 /*break*/, 10];
                            mk = PROXIES_1_1.value;
                            _e.label = 3;
                        case 3:
                            _e.trys.push([3, 8, , 9]);
                            return [4 /*yield*/, withTimeout(fetch(mk(url)), 12e3, "relais")];
                        case 4:
                            r = _e.sent();
                            if (!r.ok) return [3 /*break*/, 6];
                            return [4 /*yield*/, r.text()];
                        case 5:
                            t = _e.sent();
                            if (t.length > 2e3)
                                return [2 /*return*/, t];
                            last = "page vide";
                            return [3 /*break*/, 7];
                        case 6:
                            last = "relais " + r.status;
                            _e.label = 7;
                        case 7: return [3 /*break*/, 9];
                        case 8:
                            err_2 = _e.sent();
                            last = err_2.message || "relais indisponible";
                            return [3 /*break*/, 9];
                        case 9:
                            PROXIES_1_1 = PROXIES_1.next();
                            return [3 /*break*/, 2];
                        case 10: return [3 /*break*/, 13];
                        case 11:
                            e_4_1 = _e.sent();
                            e_4 = { error: e_4_1 };
                            return [3 /*break*/, 13];
                        case 12:
                            try {
                                if (PROXIES_1_1 && !PROXIES_1_1.done && (_d = PROXIES_1.return)) _d.call(PROXIES_1);
                            }
                            finally { if (e_4) throw e_4.error; }
                            return [7 /*endfinally*/];
                        case 13: throw new Error("Marmiton inaccessible (" + last + ")");
                    }
                });
            });
        }
        var htmlDec = function (s) {
            var t = document.createElement("textarea");
            t.innerHTML = String(s == null ? "" : s);
            return t.value.trim();
        };
        function ldRecipe(html) {
            var re = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
            var m;
            var nodes = [];
            var walk = function (x) {
                if (Array.isArray(x))
                    x.forEach(walk);
                else if (x && typeof x === "object") {
                    nodes.push(x);
                    if (x["@graph"])
                        walk(x["@graph"]);
                }
            };
            while (m = re.exec(html)) {
                try {
                    walk(JSON.parse(m[1]));
                }
                catch (err) {
                }
            }
            return nodes.find(function (n) { return [].concat(n["@type"] || []).indexOf("Recipe") >= 0; });
        }
        var ldImg = function (i) { return !i ? null : typeof i === "string" ? i : Array.isArray(i) ? ldImg(i[0]) : i.url || null; };
        var ldSteps = function (x) { return Array.isArray(x) ? x.reduce(function (a, y) { return a.concat(ldSteps(y)); }, []) : typeof x === "string" ? [htmlDec(x)] : x && x.itemListElement ? ldSteps(x.itemListElement) : x && x.text ? [htmlDec(x.text)] : []; };
        function marmitonDirect(q, type, exclude) {
            return __awaiter(this, void 0, void 0, function () {
                var base, search, links, cands, got, ok;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            base = "https://www.marmiton.org";
                            search = function (withType) { return __awaiter(_this, void 0, void 0, function () {
                                var html, out, re, m, u;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0: return [4 /*yield*/, viaProxy("".concat(base, "/recettes/recherche.aspx?aqt=").concat(encodeURIComponent(q)).concat(withType && type ? "&type=" + type : ""))];
                                        case 1:
                                            html = _d.sent();
                                            out = [], re = /href=["'](\/recettes\/recette_[a-z0-9\-]+_\d+\.aspx)["']/gi;
                                            while (m = re.exec(html)) {
                                                u = base + m[1];
                                                if (out.indexOf(u) < 0 && (exclude || []).indexOf(u) < 0)
                                                    out.push(u);
                                            }
                                            return [2 /*return*/, out];
                                    }
                                });
                            }); };
                            return [4 /*yield*/, search(true)];
                        case 1:
                            links = _d.sent();
                            if (!!links.length) return [3 /*break*/, 3];
                            return [4 /*yield*/, search(false)];
                        case 2:
                            links = _d.sent();
                            _d.label = 3;
                        case 3:
                            if (!links.length)
                                throw new Error("aucune recette trouv\xE9e sur Marmiton");
                            cands = shuffleArr(links.slice(0, 14)).slice(0, 3);
                            got = [];
                            return [4 /*yield*/, Promise.all(cands.map(function (url) { return __awaiter(_this, void 0, void 0, function () {
                                    var r, _d, ar, rating, err_3;
                                    return __generator(this, function (_e) {
                                        switch (_e.label) {
                                            case 0:
                                                _e.trys.push([0, 2, , 3]);
                                                _d = ldRecipe;
                                                return [4 /*yield*/, viaProxy(url)];
                                            case 1:
                                                r = _d.apply(void 0, [_e.sent()]);
                                                if (!r)
                                                    return [2 /*return*/];
                                                ar = r.aggregateRating || {}, rating = Number(ar.ratingValue);
                                                got.push({ kind: "recipe", title: htmlDec(r.name), category: "Marmiton", area: htmlDec([].concat(r.recipeCategory || []).join(" \xB7 ")), ingredients: (r.recipeIngredient || []).map(htmlDec).join("\n"), instructions: ldSteps(r.recipeInstructions).filter(Boolean).join("\n"), photo_url: ldImg(r.image), source_url: url, id: url, lang: "fr", source: "Marmiton", rating: rating > 0 ? Math.round(rating * 10) / 10 : null, ratingCount: Number(ar.ratingCount || ar.reviewCount || 0) || null });
                                                return [3 /*break*/, 3];
                                            case 2:
                                                err_3 = _e.sent();
                                                return [3 /*break*/, 3];
                                            case 3: return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 4:
                            _d.sent();
                            ok = got.filter(function (g) { return g.ingredients; });
                            if (!ok.length)
                                throw new Error("fiches Marmiton illisibles");
                            ok.sort(function (a, b) { return (b.rating || 0) - (a.rating || 0); });
                            return [2 /*return*/, ok.filter(function (g) { return (g.rating || 0) >= 4; })[0] || ok[0]];
                    }
                });
            });
        }
        var shuffleArr = function (a) {
            a = a.slice();
            for (var i = a.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var t = a[i];
                a[i] = a[j];
                a[j] = t;
            }
            return a;
        };
        function marmiton(q, type, exclude) {
            return __awaiter(this, void 0, void 0, function () {
                var fnErr, _d, data, error, msg, b, _e, x_1, err_4, err_5;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            fnErr = "";
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 9, , 10]);
                            return [4 /*yield*/, Promise.race([db.store.sb.functions.invoke(window.FN_MARMITON || "marmiton", { body: { q: q, type: type, exclude: exclude } }), new Promise(function (_, rej) { return setTimeout(function () { return rej(new Error("pas de r\xE9ponse en 25 s")); }, 25e3); })])];
                        case 2:
                            _d = _f.sent(), data = _d.data, error = _d.error;
                            if (!error) return [3 /*break*/, 8];
                            msg = error.message || "erreur";
                            _f.label = 3;
                        case 3:
                            _f.trys.push([3, 6, , 7]);
                            _e = error.context;
                            if (!_e) return [3 /*break*/, 5];
                            return [4 /*yield*/, error.context.json()];
                        case 4:
                            _e = (_f.sent());
                            _f.label = 5;
                        case 5:
                            b = _e;
                            if (b && b.error)
                                msg = b.error;
                            return [3 /*break*/, 7];
                        case 6:
                            x_1 = _f.sent();
                            return [3 /*break*/, 7];
                        case 7: throw new Error(msg);
                        case 8:
                            if (data && data.idea)
                                return [2 /*return*/, data.idea];
                            throw new Error(data && data.error || "r\xE9ponse vide");
                        case 9:
                            err_4 = _f.sent();
                            fnErr = err_4.message || "erreur";
                            return [3 /*break*/, 10];
                        case 10:
                            _f.trys.push([10, 12, , 13]);
                            return [4 /*yield*/, marmitonDirect(q, type, exclude)];
                        case 11: return [2 /*return*/, _f.sent()];
                        case 12:
                            err_5 = _f.sent();
                            throw new Error("fonction : ".concat(fnErr, " \u00B7 acc\u00E8s direct : ").concat(err_5.message));
                        case 13: return [2 /*return*/];
                    }
                });
            });
        }
        function marmitonSearch(q, type) {
            return __awaiter(this, void 0, void 0, function () {
                var _d, data, error, msg, b, _e, x_2;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0: return [4 /*yield*/, Promise.race([db.store.sb.functions.invoke(window.FN_MARMITON || "marmiton", { body: { q: q, type: type || void 0, mode: "search" } }), new Promise(function (_, rej) { return setTimeout(function () { return rej(new Error("pas de r\xE9ponse en 40 s")); }, 4e4); })])];
                        case 1:
                            _d = _f.sent(), data = _d.data, error = _d.error;
                            if (!error) return [3 /*break*/, 7];
                            msg = error.message || "erreur";
                            _f.label = 2;
                        case 2:
                            _f.trys.push([2, 5, , 6]);
                            _e = error.context;
                            if (!_e) return [3 /*break*/, 4];
                            return [4 /*yield*/, error.context.json()];
                        case 3:
                            _e = (_f.sent());
                            _f.label = 4;
                        case 4:
                            b = _e;
                            if (b && b.error)
                                msg = b.error;
                            return [3 /*break*/, 6];
                        case 5:
                            x_2 = _f.sent();
                            return [3 /*break*/, 6];
                        case 6: throw new Error(msg);
                        case 7:
                            if (data && data.results)
                                return [2 /*return*/, data.results];
                            throw new Error(data && data.error || "r\xE9ponse vide");
                    }
                });
            });
        }
        var FALLBACK = function (err) { return "Marmiton indisponible (".concat(String(err && err.message || err || "erreur").slice(0, 140), ") : id\u00E9e issue de TheMealDB."); };
        function randomMeal() {
            return __awaiter(this, arguments, void 0, function (cats, exclude, opts) {
                var cat, err_6, why, idea;
                if (cats === void 0) { cats = MEAL_CATS["Plat"]; }
                if (exclude === void 0) { exclude = []; }
                if (opts === void 0) { opts = {}; }
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            cat = pick(cats);
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, marmiton(opts.query || FR_TERM[cat] || "plat", FR_TYPE[cat] === void 0 ? "platprincipal" : FR_TYPE[cat], exclude)];
                        case 2: return [2 /*return*/, _d.sent()];
                        case 3:
                            err_6 = _d.sent();
                            console.warn("Marmiton", err_6);
                            why = err_6;
                            return [3 /*break*/, 4];
                        case 4: return [4 /*yield*/, randomMealDB(cats, exclude)];
                        case 5:
                            idea = _d.sent();
                            idea.note = FALLBACK(why);
                            return [2 /*return*/, idea];
                    }
                });
            });
        }
        var marmitonMeal = function (query, exclude) {
            if (exclude === void 0) { exclude = []; }
            return marmiton(query || "plat", "platprincipal", exclude);
        };
        function randomMealDB(cats, exclude) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, t, list, cand, d;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            t = 0;
                            _d.label = 1;
                        case 1:
                            if (!(t < 4)) return [3 /*break*/, 5];
                            return [4 /*yield*/, getJSON(MEAL + "filter.php?c=" + encodeURIComponent(pick(cats)))];
                        case 2:
                            list = _d.sent();
                            cand = (list.meals || []).filter(function (m) { return !exclude.includes(m.idMeal); });
                            if (!cand.length)
                                return [3 /*break*/, 4];
                            return [4 /*yield*/, getJSON(MEAL + "lookup.php?i=" + pick(cand).idMeal)];
                        case 3:
                            d = _d.sent();
                            if ((_a = d.meals) == null ? void 0 : _a[0])
                                return [2 /*return*/, normMeal(d.meals[0])];
                            _d.label = 4;
                        case 4:
                            t++;
                            return [3 /*break*/, 1];
                        case 5: throw new Error("Aucune id\xE9e trouv\xE9e, r\xE9essayez.");
                    }
                });
            });
        }
        function randomCocktail() {
            return __awaiter(this, arguments, void 0, function (o) {
                var _d, alcoholic, _e, ingredient, err_7, why, idea;
                if (o === void 0) { o = {}; }
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            _d = o.alcoholic, alcoholic = _d === void 0 ? true : _d, _e = o.ingredient, ingredient = _e === void 0 ? null : _e;
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, marmiton(ingredient && FR_SPIRIT[ingredient] ? "cocktail " + FR_SPIRIT[ingredient] : alcoholic ? "cocktail alcool" : "cocktail sans alcool", "", o.exclude || [])];
                        case 2: return [2 /*return*/, _f.sent()];
                        case 3:
                            err_7 = _f.sent();
                            console.warn("Marmiton", err_7);
                            why = err_7;
                            return [3 /*break*/, 4];
                        case 4: return [4 /*yield*/, randomCocktailDB(o)];
                        case 5:
                            idea = _f.sent();
                            idea.note = FALLBACK(why).replace("TheMealDB", "TheCocktailDB");
                            return [2 /*return*/, idea];
                    }
                });
            });
        }
        function randomCocktailDB() {
            return __awaiter(this, arguments, void 0, function (_d) {
                var _a, ids, l, t, d, c;
                var _e = _d === void 0 ? {} : _d, _f = _e.alcoholic, alcoholic = _f === void 0 ? true : _f, _g = _e.ingredient, ingredient = _g === void 0 ? null : _g;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            if (!ingredient) return [3 /*break*/, 2];
                            return [4 /*yield*/, getJSON(COCK + "filter.php?i=" + encodeURIComponent(ingredient))];
                        case 1:
                            l = _h.sent();
                            ids = l.drinks;
                            _h.label = 2;
                        case 2:
                            if (!(!ids || !ids.length)) return [3 /*break*/, 4];
                            return [4 /*yield*/, getJSON(COCK + "filter.php?a=" + (alcoholic ? "Alcoholic" : "Non_Alcoholic"))];
                        case 3:
                            ids = (_h.sent()).drinks;
                            _h.label = 4;
                        case 4:
                            t = 0;
                            _h.label = 5;
                        case 5:
                            if (!(t < 4)) return [3 /*break*/, 8];
                            return [4 /*yield*/, getJSON(COCK + "lookup.php?i=" + pick(ids).idDrink)];
                        case 6:
                            d = _h.sent();
                            c = (_a = d.drinks) == null ? void 0 : _a[0];
                            if (c)
                                return [2 /*return*/, normCocktail(c)];
                            _h.label = 7;
                        case 7:
                            t++;
                            return [3 /*break*/, 5];
                        case 8: throw new Error("Aucun cocktail trouv\xE9, r\xE9essayez.");
                    }
                });
            });
        }
        function tr(text) {
            return __awaiter(this, void 0, void 0, function () {
                var chunks, cur, _d, _e, line, out, chunks_1, chunks_1_1, c, r, d, e_5_1;
                var e_6, _f, e_5, _g;
                return __generator(this, function (_h) {
                    switch (_h.label) {
                        case 0:
                            chunks = [];
                            cur = "";
                            try {
                                for (_d = __values(text.split("\n")), _e = _d.next(); !_e.done; _e = _d.next()) {
                                    line = _e.value;
                                    if ((cur + "\n" + line).length > 1200 && cur) {
                                        chunks.push(cur);
                                        cur = line;
                                    }
                                    else
                                        cur = cur ? cur + "\n" + line : line;
                                }
                            }
                            catch (e_6_1) { e_6 = { error: e_6_1 }; }
                            finally {
                                try {
                                    if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                                }
                                finally { if (e_6) throw e_6.error; }
                            }
                            if (cur)
                                chunks.push(cur);
                            out = [];
                            _h.label = 1;
                        case 1:
                            _h.trys.push([1, 7, 8, 9]);
                            chunks_1 = __values(chunks), chunks_1_1 = chunks_1.next();
                            _h.label = 2;
                        case 2:
                            if (!!chunks_1_1.done) return [3 /*break*/, 6];
                            c = chunks_1_1.value;
                            return [4 /*yield*/, fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=fr&dt=t&q=" + encodeURIComponent(c))];
                        case 3:
                            r = _h.sent();
                            if (!r.ok)
                                throw new Error("translate " + r.status);
                            return [4 /*yield*/, r.json()];
                        case 4:
                            d = _h.sent();
                            out.push(d[0].map(function (x) { return x[0]; }).join(""));
                            _h.label = 5;
                        case 5:
                            chunks_1_1 = chunks_1.next();
                            return [3 /*break*/, 2];
                        case 6: return [3 /*break*/, 9];
                        case 7:
                            e_5_1 = _h.sent();
                            e_5 = { error: e_5_1 };
                            return [3 /*break*/, 9];
                        case 8:
                            try {
                                if (chunks_1_1 && !chunks_1_1.done && (_g = chunks_1.return)) _g.call(chunks_1);
                            }
                            finally { if (e_5) throw e_5.error; }
                            return [7 /*endfinally*/];
                        case 9: return [2 /*return*/, out.join("\n")];
                    }
                });
            });
        }
        function translateIdea(idea) {
            return __awaiter(this, void 0, void 0, function () {
                var _d, title, ingredients, instructions, e_7;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (idea.lang === "fr")
                                return [2 /*return*/, idea];
                            _e.label = 1;
                        case 1:
                            _e.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, Promise.all([tr(idea.title), tr(idea.ingredients), tr(idea.instructions)])];
                        case 2:
                            _d = __read.apply(void 0, [_e.sent(), 3]), title = _d[0], ingredients = _d[1], instructions = _d[2];
                            return [2 /*return*/, __spreadProps(__spreadValues({}, idea), { title: title, ingredients: ingredients, instructions: instructions, lang: "fr", translated: true })];
                        case 3:
                            e_7 = _e.sent();
                            console.warn("Traduction indisponible", e_7);
                            return [2 /*return*/, idea];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        }
        return { MEAL_CATS: MEAL_CATS, PAIRING: PAIRING, SPIRIT_MAP: SPIRIT_MAP, marmitonSearch: marmitonSearch, randomMeal: randomMeal, marmitonMeal: marmitonMeal, randomCocktail: randomCocktail, translateIdea: translateIdea };
    })();
    __m.ingredients = (function () {
        var norm = __m.util.norm;
        var UNITS = [
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
        var WORDS = { un: 1, une: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6 };
        var FRACS = { "\xBD": 0.5, "\xBC": 0.25, "\xBE": 0.75, "\u2153": 1 / 3 };
        var SKIP = /^(?:(?:gros |fin |fleur de |du moulin )?(?:sel|poivre)\b.*|eau\b.*|blender|pic(?:s)? a brochette|bol|robot.*|ustensile.*)$/;
        var TYPOS = [[/\bcarrotes?\b/gi, "carotte"], [/\bspagh?ett?hi\b/gi, "spaghetti"], [/\bsaussices?\b/gi, "saucisse"], [/\bboulghour\b/gi, "boulgour"], [/\bcebette\b/gi, "c\xE9bette"], [/\bchampignons? de pari\b/gi, "champignons de Paris"], [/\bpoigne\b/gi, "poign\xE9e"]];
        var PREP = /^(?:a|au|aux|de|du|des|d['’]|en|pour|selon|avec|sans|ou)\b/i;
        var PARTICIPLE = /(?:e|ee|es|ees)\s*$/i;
        var isSkippedName = function (name) { return SKIP.test(norm(name).replace(/\(.*?\)/g, "").trim()); };
        function splitLine(s) {
            if (/^[\d½¼¾⅓]/.test(s) || !/[,+]|\s+et\s+/i.test(s))
                return [s];
            var parts = s.split(/\s*(?:,|\+|\s+et\s+)\s*/i).map(function (x) { return x.trim(); }).filter(Boolean);
            if (parts.length < 2 || parts.length > 6)
                return [s];
            if (parts.some(function (p) { return PREP.test(p) || /^\d/.test(p) || p.split(/\s+/).length > 4 || /(?:é|ée|és|ées)$/i.test(p) || /^(?:facultatif|environ)/i.test(norm(p)); }))
                return [s];
            return parts;
        }
        function parseOne(s0) {
            var e_8, _d, e_9, _e;
            var s = s0.replace(/(?:[\uD83C-\uD83F][\uDC00-\uDFFF]|[\u2600-\u27BF️‍])/g, " ").replace(/[’‘ʼ´`]/g, "'").replace(/\s+/g, " ").trim();
            s = s.replace(/^[^:\d]{3,26}:\s+(?=\S)/, "");
            var notes = [];
            s = s.replace(/\(([^)]*)\)/g, function (m2, t) {
                if (t.trim())
                    notes.push(t.trim());
                return " ";
            }).replace(/\s+/g, " ").trim();
            s = s.replace(/^(\d+(?:[.,]\d+)?)\s*(?:ou|à|-)\s*\d+(?:[.,]\d+)?(?!\d)/i, "$1");
            var altM = s.match(/\s+ou\s+.*$/i);
            var alt = altM ? altM[0].trim() : "";
            s = s.replace(/\s+ou\s+.*$/i, "");
            try {
                for (var TYPOS_1 = __values(TYPOS), TYPOS_1_1 = TYPOS_1.next(); !TYPOS_1_1.done; TYPOS_1_1 = TYPOS_1.next()) {
                    var _f = __read(TYPOS_1_1.value, 2), re = _f[0], to = _f[1];
                    s = s.replace(re, to);
                }
            }
            catch (e_8_1) { e_8 = { error: e_8_1 }; }
            finally {
                try {
                    if (TYPOS_1_1 && !TYPOS_1_1.done && (_d = TYPOS_1.return)) _d.call(TYPOS_1);
                }
                finally { if (e_8) throw e_8.error; }
            }
            if (!/^[\d½¼¾⅓]/.test(s) && /^(?:(?:une?|petite?s?|grande?s?|belle|bonne|grosse?)\s+)?(?:pinc[ée]e(?!s)|bouquet|gousse(?!s)|bo[iî]te|tranche(?!s)|poign[ée]e?|botte|branche|brin|feuille(?!s)|pot|paquet|sachet|filet|morceau|c\.a\.(?=\s)|c\.?\s*[àa]\.?\s*(?:s|c|soupe|caf[ée])\b|c\.?[cs]\.?(?=\s)|cuill?\.?)/i.test(norm(s)))
                s = "1 " + s.replace(/^(?:(?:une?|petite?s?|grande?s?|belle|bonne|grosse?|quelques?)\s+)/i, "");
            var n = norm(s), qty = null, pos = 0, m;
            if (m = n.match(/^(\d+)\s*([½¼¾⅓])/)) {
                qty = +m[1] + FRACS[m[2]];
                pos = m[0].length;
            }
            else if (m = n.match(/^([½¼¾⅓])/)) {
                qty = FRACS[m[1]];
                pos = m[0].length;
            }
            else if (m = n.match(/^(\d+)\s*\/\s*(\d+)/)) {
                qty = +m[1] / +m[2];
                pos = m[0].length;
            }
            else if (m = n.match(/^(\d+(?:[.,]\d+)?)(?:\s*(?:a|-|ou)\s*\d+(?:[.,]\d+)?)?/)) {
                qty = parseFloat(m[1].replace(",", "."));
                pos = m[0].length;
            }
            else if (m = n.match(/^(un|une|deux|trois|quatre|cinq|six)\s+(?=pincee|bouquet|gousse|boite|tranche|poignee|botte|branche|brin|feuille|verre|tasse|pot|paquet|sachet|filet|morceau|cuil|c\.?\s?[asc]\b)/)) {
                qty = WORDS[m[1]];
                pos = m[0].length;
            }
            var rest = n.slice(pos).replace(/^\s+/, ""), fam = "n", u0 = "";
            if (qty !== null) {
                var adj_1 = rest.replace(/^(?:grosse?|petite?|belle|bonne|grande?)\s+/, "");
                if (adj_1 !== rest && UNITS.some(function (_d) {
                    var _e = __read(_d, 1), re = _e[0];
                    return re.test(adj_1);
                }))
                    rest = adj_1;
                try {
                    for (var UNITS_1 = __values(UNITS), UNITS_1_1 = UNITS_1.next(); !UNITS_1_1.done; UNITS_1_1 = UNITS_1.next()) {
                        var _g = __read(UNITS_1_1.value, 3), re = _g[0], f = _g[1], k = _g[2];
                        var u = rest.match(re);
                        if (u) {
                            fam = f;
                            if (f === "ml")
                                u0 = { 1e3: "l", 100: "dl", 10: "cl", 1: "ml" }[k];
                            qty *= k;
                            rest = rest.slice(u[0].length).replace(/^\s+/, "");
                            if (f === "cas" || f === "cac")
                                rest = rest.replace(/^(?:soupe|cafe)\b\s*/, "");
                            break;
                        }
                    }
                }
                catch (e_9_1) { e_9 = { error: e_9_1 }; }
                finally {
                    try {
                        if (UNITS_1_1 && !UNITS_1_1.done && (_e = UNITS_1.return)) _e.call(UNITS_1);
                    }
                    finally { if (e_9) throw e_9.error; }
                }
                var sz_1 = rest.match(/^(?:de|d')\s*(\d+(?:[.,]\d+)?)\s*(kg|g|ml|cl|l)\b\s*/);
                if (sz_1 && ["pot", "bo\xEEte", "sachet", "paquet", "bocal"].includes(fam)) {
                    var u2 = UNITS.find(function (_d) {
                        var _e = __read(_d, 1), re = _e[0];
                        return re.test(sz_1[2]);
                    }), v = parseFloat(sz_1[1].replace(",", ".")) * (u2 ? u2[2] : 1);
                    qty = qty * v;
                    fam = u2 ? u2[1] : "n";
                    rest = rest.slice(sz_1[0].length);
                }
            }
            var name;
            name = s.slice(Math.min(n.length - rest.length, s.length));
            name = name.replace(/^\s*(?:de la |de l'|du |des |de |d')\s*/i, "").replace(/^\s*(?:de |d')/i, "");
            var tail = name.match(/\s+(\d+(?:[.,]\d+)?)\s*(branches?|feuilles?|gousses?|brins?|filets?)\b\.?/i);
            if (tail) {
                if (qty === null) {
                    qty = parseFloat(tail[1].replace(",", "."));
                    fam = norm(tail[2]).replace(/s$/, "").replace("branche", "branche");
                    fam = { branche: "branche", feuille: "feuille", gousse: "gousse", brin: "brin", filet: "filet" }[fam] || "n";
                }
                name = name.replace(tail[0], " ");
            }
            name = name.replace(/\b(\w+) \1\b/gi, "$1").replace(/\b(?:facultatif|selon son go[uû]t|au go[uû]t|pour la d[ée]co(?:ration)?|environ|[àa] volont[ée])\b/gi, " ").replace(/\s+/g, " ").replace(/[.,;:+\-–\s]+$/, "").replace(/^[.,;:+\-–\s]+/, "").trim();
            if (!name)
                name = s0.replace(/[^\wÀ-ÿ' ]/g, " ").trim();
            return { qty: qty, fam: fam, name: name, note: notes.join(", "), alt: alt, u: u0 };
        }
        function parseIngredient(line) {
            var raw = String(line || "").replace(/^[\s\-•*·–]+/, "").trim();
            if (!raw || /:$/.test(raw))
                return [];
            return splitLine(raw.replace(/’/g, "'")).map(parseOne).filter(function (p) { return p.name; }).map(function (p) { return __spreadProps(__spreadValues({}, p), { skip: isSkippedName(p.name) }); });
        }
        var DROP = new Set("fait faite belle bonne petit petite petits petites grand grande gros grosse jeune jeunes moyen moyenne taille entier entiere frais fraiche fraiches fraichement cru crue crus cuit cuite hache hachee haches hachees cisele ciselee ciselees emince eminee eminees rape rapee rapes pele pelee peles coupe coupee bien mur mure mures bio biologique extra quelque quelques un une".split(" "));
        var RULES = [
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
        var sing = function (w) { return w === "brocolis" ? "brocoli" : /^choux/.test(w) ? sing(w.replace(/^choux/, "chou")) : w.length > 3 && /[s]$/.test(w) && !/(?:ss|us|is|ois|ais)$/.test(w) && !/^(?:mais|bras|pois|riz|jus|anis|cassis|brebis|couscous|tapas|noix|gruyere)$/.test(w) ? w.slice(0, -1) : w; };
        function canonical(name) {
            if (/petits? pois/i.test(norm(name)))
                return { display: "petits pois", key: "petit pois" };
            var s = String(name).replace(/’/g, "'").replace(/(?:[\uD83C-\uD83F][\uDC00-\uDFFF]|[\u2600-\u27BF️])/g, " ");
            s = s.replace(/(?:^|\s)[àa] chair \w+/gi, " ").replace(/\bde taille (?:moyenne|normale)\b/gi, " ");
            var toks = s.split(/\s+/).filter(Boolean).filter(function (t) {
                var x = norm(t).replace(/[^a-z]/g, "");
                return !(DROP.has(x) || DROP.has(x.replace(/s$/, "")));
            });
            while (toks.length && /^(?:de|d'|du|des|a|au|aux|en|et)$/i.test(norm(toks[toks.length - 1])))
                toks.pop();
            var key0 = toks.map(function (t) { return norm(t).replace(/[,;]/g, ""); }).join(" ").replace(/\bd'/g, "de ").replace(/\s+/g, " ").trim();
            var keyS = key0.split(" ").map(sing).join(" ");
            var hit = RULES.find(function (_d) {
                var _e = __read(_d, 1), re = _e[0];
                return re.test(keyS);
            });
            if (hit && hit[1])
                return { display: hit[1], key: norm(hit[1]).split(" ").map(sing).join(" ") };
            var HEADS = /^(oeuf|courgette|carotte|oignon|tomate|pomme|poire|poivron|aubergine|citron|orange|echalote|banane|concombre|navet|avocat|endive|kiwi|clementine|patate|saucisse|artichaut|betterave|figue|peche|abricot|fraise|cuisse|escalope|crepe|poireau)s?$/;
            var ADJ = /^(rouge|vert|jaune|blanc|noir|douce|violette|cerise|sechee|seche|fumee|briseee|brisee|feuilletee|sablee|confit)s$/;
            var disp = toks.map(function (t, k) {
                var x = norm(t);
                return k === 0 && HEADS.test(x) && /s$/i.test(t) && !/(?:us|is)$/.test(x) || k > 0 && ADJ.test(x) ? t.slice(0, -1) : t;
            }).join(" ").replace(/^./, function (c) { return c.toLowerCase(); });
            return { display: disp || name, key: keyS };
        }
        return { isSkippedName: isSkippedName, parseIngredient: parseIngredient, canonical: canonical };
    })();
    __m.shopping = (function () {
        var db = __m.db;
        var _d = __m.util, ingredientLines = _d.ingredientLines, guessShop = _d.guessShop, norm = _d.norm;
        var _e = __m.ingredients, parseIngredient = _e.parseIngredient, canonical = _e.canonical, isSkippedName = _e.isSkippedName;
        var isSkipped = function (name) { return isSkippedName(name); };
        function parseLine(line) {
            var items = parseIngredient(line);
            if (!items.length)
                return null;
            var p = items[0], c = canonical(p.name);
            return { qty: p.qty, fam: p.fam, unit: p.fam, name: c.display, key: c.key, skip: p.skip };
        }
        var parseLines = function (line) { return parseIngredient(line).map(function (p) {
            var c = canonical(p.name);
            return { qty: p.qty, fam: p.fam === "n" && p.qty !== null && /^bouillon/.test(c.display) ? "cube" : p.fam, unit: p.fam, name: c.display, key: c.key, skip: p.skip };
        }); };
        var PLURAL = { morceau: "morceaux", rouleau: "rouleaux" };
        var fmtNum = function (x) { return (Math.round(x * 100) / 100).toString().replace(".", ","); };
        var FR = { 0.25: "\xBC", 0.5: "\xBD", 0.75: "\xBE", 0.33: "\u2153", 0.67: "\u2154" };
        var fmtFrac = function (x) {
            var w = Math.floor(x), f = Math.round((x - w) * 100) / 100;
            return FR[f] ? w ? "".concat(w).concat(FR[f]) : FR[f] : fmtNum(x);
        };
        function formatQty(qty, fam, u) {
            if (qty === null || qty === void 0)
                return "";
            if (fam === "kg")
                return "".concat(fmtNum(Math.round(qty * 100) / 100), " kg");
            if (fam === "g")
                return qty >= 1e3 ? "".concat(fmtNum(qty / 1e3), " kg") : "".concat(fmtNum(qty), " g");
            if (fam === "ml")
                return qty >= 1e3 ? "".concat(fmtNum(qty / 1e3), " l") : qty >= 10 ? "".concat(fmtNum(qty / 10), " cl") : "".concat(fmtNum(qty), " ml");
            if (fam === "cas")
                return "".concat(fmtFrac(qty), " c. \u00E0 s.");
            if (fam === "cac")
                return "".concat(fmtFrac(qty), " c. \u00E0 c.");
            if (fam === "n")
                return fmtFrac(qty);
            return "".concat(fmtFrac(qty), " ").concat(qty > 1 ? PLURAL[fam] || fam + "s" : fam);
        }
        var LIQUID = /^(huile|lait|creme|vinaigre|vin |vin$|bouillon|jus |sauce soja|eau|cafe|biere|cidre)/;
        var TO_ML = { cas: 15, cac: 5, verre: 200, tasse: 240, filet: 10 };
        var VEG = /^(carotte|oignon|echalote|pomme de terre|patate|tomate|courgette|aubergine|poivron|poireau|champignon|epinard|concombre|navet|betterave|chou|brocoli|celeri|fenouil|butternut|potiron|courge|haricot vert|radis|salade|endive|avocat|artichaut|petit pois|asperge|panais|topinambour|citrouille|mais)/;
        var NOT_VEG = /(concasse|seche|coulis|puree|concentre|sauce|pulpe|poudre|conserve|jus|confit|cornichon|chips|chapelure|boite)/;
        var PIECE_KG = { carotte: 0.1, oignon: 0.12, echalote: 0.04, "pomme de terre": 0.15, patate: 0.3, tomate: 0.12, courgette: 0.25, aubergine: 0.3, poivron: 0.2, poireau: 0.2, champignon: 0.025, concombre: 0.35, navet: 0.15, betterave: 0.15, chou: 1, brocoli: 0.4, celeri: 0.5, fenouil: 0.3, butternut: 1, potiron: 1.5, courge: 1, radis: 0.015, salade: 0.25, endive: 0.1, avocat: 0.2, artichaut: 0.25, panais: 0.15, topinambour: 0.1 };
        var isVeg = function (key) { return VEG.test(key) && !NOT_VEG.test(key); };
        function combine(list, key) {
            var liquid = LIQUID.test(key), veg = isVeg(key), out = {};
            list.forEach(function (a) {
                var qty = a.qty, fam = a.fam;
                if (veg) {
                    var per = Object.keys(PIECE_KG).find(function (k) { return key.indexOf(k) === 0; });
                    if (fam === "g") {
                        qty /= 1e3;
                        fam = "kg";
                    }
                    else if (fam === "n" && per) {
                        qty *= PIECE_KG[per];
                        fam = "kg";
                    }
                }
                else if (liquid && TO_ML[fam] && !(fam === "filet" && qty > 3)) {
                    qty *= TO_ML[fam];
                    fam = "ml";
                }
                else if (liquid && fam === "g")
                    fam = "ml";
                out[fam] = (out[fam] || 0) + qty;
            });
            return Object.keys(out).map(function (f) { return ({ fam: f, qty: out[f] }); });
        }
        var amountsText = function (list) { return list.map(function (a) { return list.length > 1 && a.fam === "n" ? "".concat(formatQty(a.qty, "n"), " pi\u00E8ce").concat(a.qty > 1 ? "s" : "") : formatQty(a.qty, a.fam); }).join(" + ") || null; };
        var amountsOf = function (row) { return !row.quantity ? [] : String(row.quantity).split(/\s*\+\s*/).map(function (part) {
            var p = parseLine(part + " " + row.name);
            return p && p.qty !== null ? { qty: p.qty, fam: p.fam } : null;
        }).filter(Boolean); };
        var keyOf = function (row) { return canonical(row.name).key; };
        var addTitle = function (t, title) { return !title || (t || "").split(", ").includes(title) ? t : [t, title].filter(Boolean).join(", ").slice(0, 120); };
        var itemLabel = function (row) {
            if (!row.quantity)
                return row.name;
            var first = amountsOf(row)[0], name = first ? plural(row.name, first.qty, first.fam) : row.name;
            if (/^[\d.,/\s½¼¾]+$/.test(row.quantity))
                return "".concat(row.quantity, " ").concat(name);
            return "".concat(row.quantity, " ").concat(VOWEL.test(name) ? "d\u2019" : "de ").concat(name);
        };
        function addLines(lines_1, title_1) {
            return __awaiter(this, arguments, void 0, function (lines, title, _d) {
                var parsed, existing, fresh, count, _loop_1, parsed_1, parsed_1_1, p, _e, _f, x, e_10_1;
                var e_11, _g, e_10, _h;
                var _j = _d === void 0 ? {} : _d, _k = _j.dropSaltPepper, dropSaltPepper = _k === void 0 ? true : _k, _l = _j.shop, shop = _l === void 0 ? null : _l;
                return __generator(this, function (_m) {
                    switch (_m.label) {
                        case 0:
                            parsed = lines.reduce(function (a, l) { return a.concat(parseLines(l)); }, []).filter(function (p) { return !(dropSaltPepper && p.skip); });
                            existing = db.store.t.shopping_items.filter(function (i) { return !i.checked; }).map(function (row) { return ({ row: row, key: keyOf(row), name: row.name, amounts: amountsOf(row), title: row.recipe_title, dirty: false }); });
                            fresh = [];
                            count = 0;
                            _loop_1 = function (p) {
                                var hit = existing.find(function (x) { return x.key === p.key; }) || fresh.find(function (x) { return x.key === p.key; });
                                var am = p.qty !== null ? [{ qty: p.qty, fam: p.fam }] : [];
                                if (!hit) {
                                    fresh.push({ key: p.key, name: p.name, amounts: am, title: title });
                                    count++;
                                    return "continue";
                                }
                                hit.amounts = hit.amounts.concat(am);
                                hit.dirty = true;
                                count++;
                                var t = addTitle(hit.title, title);
                                if (t !== hit.title)
                                    hit.title = t;
                            };
                            try {
                                for (parsed_1 = __values(parsed), parsed_1_1 = parsed_1.next(); !parsed_1_1.done; parsed_1_1 = parsed_1.next()) {
                                    p = parsed_1_1.value;
                                    _loop_1(p);
                                }
                            }
                            catch (e_11_1) { e_11 = { error: e_11_1 }; }
                            finally {
                                try {
                                    if (parsed_1_1 && !parsed_1_1.done && (_g = parsed_1.return)) _g.call(parsed_1);
                                }
                                finally { if (e_11) throw e_11.error; }
                            }
                            _m.label = 1;
                        case 1:
                            _m.trys.push([1, 6, 7, 8]);
                            _e = __values(existing.filter(function (e) { return e.dirty; })), _f = _e.next();
                            _m.label = 2;
                        case 2:
                            if (!!_f.done) return [3 /*break*/, 5];
                            x = _f.value;
                            return [4 /*yield*/, db.patch("shopping_items", x.row.id, { quantity: amountsText(combine(x.amounts, x.key)), recipe_title: x.title || null })];
                        case 3:
                            _m.sent();
                            _m.label = 4;
                        case 4:
                            _f = _e.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_10_1 = _m.sent();
                            e_10 = { error: e_10_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (_f && !_f.done && (_h = _e.return)) _h.call(_e);
                            }
                            finally { if (e_10) throw e_10.error; }
                            return [7 /*endfinally*/];
                        case 8: return [4 /*yield*/, db.addMany("shopping_items", fresh.map(function (f) { return ({ name: f.name, quantity: amountsText(combine(f.amounts, f.key)), shop: shop || guessShop(f.name), recipe_title: f.title || null, checked: false }); }))];
                        case 9:
                            _m.sent();
                            return [2 /*return*/, count];
                    }
                });
            });
        }
        var addIngredients = function (recipe) { return addLines(ingredientLines(recipe.ingredients), recipe.title); };
        function tidyList() {
            return __awaiter(this, arguments, void 0, function (_d) {
                var rows, removed, merged, moved, groups, _loop_2, rows_1, rows_1_1, row, e_12_1, groups_1, groups_1_1, g, _e, _f, id, e_13_1, shop, quantity, e_14_1;
                var e_12, _g, e_14, _h, e_13, _j;
                var _k = _d === void 0 ? {} : _d, _l = _k.auto, auto = _l === void 0 ? false : _l;
                return __generator(this, function (_m) {
                    switch (_m.label) {
                        case 0:
                            rows = db.store.t.shopping_items.filter(function (i) { return !i.checked; });
                            removed = 0, merged = 0, moved = 0;
                            groups = [];
                            _loop_2 = function (row) {
                                var p, c, g, am;
                                return __generator(this, function (_o) {
                                    switch (_o.label) {
                                        case 0:
                                            p = parseLine(row.name);
                                            if (!(!p || p.skip)) return [3 /*break*/, 3];
                                            if (!!auto) return [3 /*break*/, 2];
                                            return [4 /*yield*/, db.del("shopping_items", row.id)];
                                        case 1:
                                            _o.sent();
                                            removed++;
                                            _o.label = 2;
                                        case 2: return [2 /*return*/, "continue"];
                                        case 3:
                                            c = canonical(row.name), g = groups.find(function (x) { return x.key === c.key; });
                                            am = amountsOf(row);
                                            if (g) {
                                                g.amounts = g.amounts.concat(am);
                                                g.title = addTitle(g.title, row.recipe_title);
                                                g.drop.push(row.id);
                                            }
                                            else
                                                groups.push({ key: c.key, name: c.display, row: row, amounts: am, title: row.recipe_title, drop: [] });
                                            return [2 /*return*/];
                                    }
                                });
                            };
                            _m.label = 1;
                        case 1:
                            _m.trys.push([1, 6, 7, 8]);
                            rows_1 = __values(rows), rows_1_1 = rows_1.next();
                            _m.label = 2;
                        case 2:
                            if (!!rows_1_1.done) return [3 /*break*/, 5];
                            row = rows_1_1.value;
                            return [5 /*yield**/, _loop_2(row)];
                        case 3:
                            _m.sent();
                            _m.label = 4;
                        case 4:
                            rows_1_1 = rows_1.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_12_1 = _m.sent();
                            e_12 = { error: e_12_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (rows_1_1 && !rows_1_1.done && (_g = rows_1.return)) _g.call(rows_1);
                            }
                            finally { if (e_12) throw e_12.error; }
                            return [7 /*endfinally*/];
                        case 8:
                            _m.trys.push([8, 21, 22, 23]);
                            groups_1 = __values(groups), groups_1_1 = groups_1.next();
                            _m.label = 9;
                        case 9:
                            if (!!groups_1_1.done) return [3 /*break*/, 20];
                            g = groups_1_1.value;
                            _m.label = 10;
                        case 10:
                            _m.trys.push([10, 15, 16, 17]);
                            _e = (e_13 = void 0, __values(g.drop)), _f = _e.next();
                            _m.label = 11;
                        case 11:
                            if (!!_f.done) return [3 /*break*/, 14];
                            id = _f.value;
                            return [4 /*yield*/, db.del("shopping_items", id)];
                        case 12:
                            _m.sent();
                            merged++;
                            _m.label = 13;
                        case 13:
                            _f = _e.next();
                            return [3 /*break*/, 11];
                        case 14: return [3 /*break*/, 17];
                        case 15:
                            e_13_1 = _m.sent();
                            e_13 = { error: e_13_1 };
                            return [3 /*break*/, 17];
                        case 16:
                            try {
                                if (_f && !_f.done && (_j = _e.return)) _j.call(_e);
                            }
                            finally { if (e_13) throw e_13.error; }
                            return [7 /*endfinally*/];
                        case 17:
                            shop = guessShop(g.name), quantity = amountsText(combine(g.amounts, g.key));
                            if (!(g.drop.length || g.row.name !== g.name || (g.row.quantity || null) !== quantity || g.row.shop !== shop)) return [3 /*break*/, 19];
                            if (g.row.shop !== shop)
                                moved++;
                            return [4 /*yield*/, db.patch("shopping_items", g.row.id, { name: g.name, quantity: quantity, shop: shop, recipe_title: g.title || null })];
                        case 18:
                            _m.sent();
                            _m.label = 19;
                        case 19:
                            groups_1_1 = groups_1.next();
                            return [3 /*break*/, 9];
                        case 20: return [3 /*break*/, 23];
                        case 21:
                            e_14_1 = _m.sent();
                            e_14 = { error: e_14_1 };
                            return [3 /*break*/, 23];
                        case 22:
                            try {
                                if (groups_1_1 && !groups_1_1.done && (_h = groups_1.return)) _h.call(groups_1);
                            }
                            finally { if (e_14) throw e_14.error; }
                            return [7 /*endfinally*/];
                        case 23: return [2 /*return*/, { removed: removed, merged: merged, moved: moved }];
                    }
                });
            });
        }
        var VOWEL = /^(?:[aeiouyàâäéèêëîïôöùûüœ]|huile|herbe|huitre|huître)/i;
        var COUNTABLE = /^(œuf|courgette|carotte|oignon|tomate|pomme de terre|pomme|poire|poivron|aubergine|citron|orange|échalote|champignon|banane|concombre|navet|avocat|endive|kiwi|clémentine|patate|tranche|filet|gousse|cuisse|escalope|saucisse|tortilla|crêpe|poireau|artichaut|betterave|figue|pêche|abricot|fraise|brin|feuille|bûche|pâte(?= (?:brisée|feuilletée|sablée)))\b/i;
        var VEG_KG = /^(pomme de terre|carotte|tomate|courgette|oignon|aubergine|poireau|champignon|patate|navet|betterave|pomme|poire|artichaut|concombre|endive|avocat|échalote|poivron|radis)\b/i;
        var plural = function (name, qty, fam) {
            var m = name.match(COUNTABLE);
            if (!m)
                return name;
            var need = fam === "n" && qty > 1 || fam === "g" && qty > 0 && VEG_KG.test(name);
            if (!need)
                return name;
            var head = m[0], rest = name.slice(head.length);
            var adj = function (r) { return r.replace(/\b(rouge|vert|jaune|blanc|noir|douce|violette|cerise|séchée|brisée|feuilletée|sablée|fumée|confit)\b/gi, function (w) { return /s$/i.test(w) ? w : w + "s"; }); };
            if (/^pomme de terre/i.test(head))
                return "pommes de terre" + rest;
            return (/[sxz]$/i.test(head) ? head : head + "s") + adj(rest);
        };
        var TYPO = [[/\bsauss?ices?\b/gi, function (m) { return /s$/i.test(m) ? "saucisses" : "saucisse"; }], [/\bsaussice/gi, "saucisse"], [/\bspagh?etthi/gi, "spaghetti"], [/\bbou?lghour\b/gi, "boulgour"], [/\bcebettes?(?![A-Za-zÀ-ÿ])/gi, "c\xE9bette"], [/\bpari\b/gi, "Paris"], [/\bpoigne\b/gi, "poign\xE9e"], [/(^|[^A-Za-zÀ-ÿ])rap[ée](s?)(?![A-Za-zÀ-ÿ])/gi, "$1r\xE2p\xE9$2"], [/(^|[^A-Za-zÀ-ÿ])s[èe]ch[ée](e?s?)(?![A-Za-zÀ-ÿ])/gi, "$1s\xE9ch\xE9$2"], [/(^|[^A-Za-zÀ-ÿ])pinc[ée](?![A-Za-zÀ-ÿ])/gi, "$1pinc\xE9e"], [/(^|[^A-Za-zÀ-ÿ])bou\.?(?=\s)/gi, "$1bouquet"], [/(^|[^A-Za-zÀ-ÿ])carr?ott?es?(?![A-Za-zÀ-ÿ])/gi, function (m, a) { return a + (/s$/i.test(m) ? "carottes" : "carotte"); }], [/\bpinc\.?(?=\s)/gi, "pinc\xE9e"], [/\btran\.(?=\s)/gi, "tranche"], [/\bpommes? de terres?\b/gi, function (m) { return /^pommes/i.test(m) ? "pommes de terre" : "pomme de terre"; }], [/\boeufs?\b/gi, function (m) { return /s$/i.test(m) ? "\u0153ufs" : "\u0153uf"; }], [/\bboeuf\b/gi, "b\u0153uf"], [/bouillon de legumes?(?![A-Za-zÀ-ÿ])/gi, "bouillon de l\xE9gumes"], [/tomates? s[èée]ch[ée]e?s?(?![A-Za-zÀ-ÿ])/gi, function (m) { return /s$/i.test(m) ? "tomates s\xE9ch\xE9es" : "tomate s\xE9ch\xE9e"; }], [/\blegumes?\b/gi, function (m) { return /s$/i.test(m) ? "l\xE9gumes" : "l\xE9gume"; }], [/\bherbes? de provence\b/gi, "herbes de Provence"], [/\bcreme\b/gi, "cr\xE8me"], [/\bpate\b/gi, "p\xE2te"], [/\bsouple\b/gi, "souple"]];
        var SPOON_S = /\b(?:c\.?\s?à\.?\s?s\b\.?|c\.?\s?a\.?\s?s\b\.?|c\.à\.s\.?|cs\b\.?|c\.s\b\.?|cuill?[èe]res?(?:\(s\))?\.?\s+à\s+soupe|cuill?[èe]re?\.?\s+à\s+s\b\.?|cuil\.?\s+à\s+soupe|c\.?\s+à\s+soupe|tbsp)/gi;
        var SPOON_C = /\b(?:c\.?\s?à\.?\s?c\b\.?|c\.?\s?a\.?\s?c\b\.?|c\.à\.c\.?|cc\b\.?|c\.c\b\.?|càc\b|cuill?[èe]res?(?:\(s\))?\.?\s+à\s+caf[ée]|cuil\.?\s+à\s+caf[ée]|c\.?\s+à\s+caf[ée]|tsp)/gi;
        var FRAC = { "1/2": "\xBD", "1/4": "\xBC", "3/4": "\xBE", "1/3": "\u2153", "2/3": "\u2154", "0.5": "\xBD", "0,5": "\xBD", "0.25": "\xBC", "0,25": "\xBC", "0.75": "\xBE" };
        var fixAdj = function (w, pl) {
            var l = w.toLowerCase();
            var b = l.replace(/^sèch/, "s\xE9ch").replace(/s$/, "");
            if (/^(séché|concassé)$/.test(b))
                b += "e";
            if (/^(émincé)$/.test(b))
                b += pl ? "" : "";
            return pl ? /^(?:émincé)$/.test(b) ? b + "s" : b + "s" : b;
        };
        var num = function (t) { return parseFloat(String(t).replace(",", ".")); };
        function harmonizeLine(line) {
            var e_15, _d;
            var t = String(line || "").replace(/(?:[\uD83C-\uD83F][\uDC00-\uDFFF]|[\u2600-\u27BF️‍])/g, " ").replace(/\s+/g, " ").replace(/^[\s\-•*·–]+/, "").trim();
            if (!t || /:$/.test(t))
                return t;
            t = t.replace(/(\w)[’‘ʼ´`'](?=\w)/g, "$1\u2019");
            try {
                for (var TYPO_1 = __values(TYPO), TYPO_1_1 = TYPO_1.next(); !TYPO_1_1.done; TYPO_1_1 = TYPO_1.next()) {
                    var _e = __read(TYPO_1_1.value, 2), re = _e[0], to = _e[1];
                    t = t.replace(re, to);
                }
            }
            catch (e_15_1) { e_15 = { error: e_15_1 }; }
            finally {
                try {
                    if (TYPO_1_1 && !TYPO_1_1.done && (_d = TYPO_1.return)) _d.call(TYPO_1);
                }
                finally { if (e_15) throw e_15.error; }
            }
            t = t.replace(SPOON_S, "c. \xE0 s.").replace(SPOON_C, "c. \xE0 c.").replace(/c\. à (s|c)\.\s*\./g, "c. \xE0 $1.").replace(/(c\. à s\.) [Ss]oupe\b/, "$1");
            t = t.replace(/^(\d+)\.(\d+)(?=\s)/, "$1,$2");
            t = t.replace(/(\d+(?:[.,]\d+)?)\s*(kg|g|gr|grammes?|mg)\b\.?/gi, function (m2, n, u) {
                var v = num(n), un = /^kg$/i.test(u) ? "kg" : /^mg$/i.test(u) ? "mg" : "g";
                if (un === "g" && v >= 1e3) {
                    v /= 1e3;
                    un = "kg";
                    return "".concat(String(Math.round(v * 100) / 100).replace(".", ","), " kg");
                }
                return "".concat(n.replace(".", ","), " ").concat(un);
            });
            t = t.replace(/(\d+(?:[.,]\d+)?|\d+\/\d+|[½¼¾⅓⅔])\s*(ml|cl|dl|l|litres?)\b\.?/gi, function (m2, n, u) {
                var _a;
                var v = (_a = { "\xBD": 0.5, "\xBC": 0.25, "\xBE": 0.75, "\u2153": 1 / 3, "\u2154": 2 / 3 }[n]) != null ? _a : n.includes("/") ? n.split("/")[0] / n.split("/")[1] : num(n);
                var ml = v * { ml: 1, cl: 10, dl: 100, l: 1e3, litre: 1e3, litres: 1e3 }[u.toLowerCase()];
                return formatQty(Math.round(ml * 100) / 100, "ml");
            });
            t = t.replace(/(^|\s)(\d+)\s*(1\/2|1\/4|3\/4)(?=\s)/g, function (m2, a, w, f) { return "".concat(a).concat(w).concat(FRAC[f]); }).replace(/(^|\s)(1\/2|1\/4|3\/4|1\/3|2\/3|0[.,]5|0[.,]25|0[.,]75)(?=\s)/g, function (m2, a, f) { return a + FRAC[f]; });
            t = t.replace(/^((?:\d+[\d.,/½¼¾⅓⅔]*|[½¼¾⅓⅔])\s*(?:à\s*\d+\s*)?(?:g|kg|mg|cl|l|ml|c\. à s\.|c\. à c\.))\s+(?!de\b|d’|du\b|des\b|d'|\()(\S)/i, function (m2, q, c) { return "".concat(q, " ").concat(/^[aeiouyàâéèêëîïôöùûüœh]/i.test(c) ? "d\u2019" : "de ").concat(c); });
            t = t.replace(/^((?:[\d½¼¾⅓⅔][^a-zA-ZÀ-ÿ]*(?:\s*(?:kg|mg|g|cl|l|ml|c\. à s\.|c\. à c\.)\s+(?:de |d’)?)?)|(?:(?:de |d’)))?([A-ZÀ-ÝŒ])(?=[a-zà-ÿœ])/, function (m2, a, c) { return (a || "") + c.toLowerCase(); });
            t = t.replace(/^(\d+)\s+bouillons?\s+cubes?\s+de\s+/i, function (m2, n) { return "".concat(n, " ").concat(+n > 1 ? "cubes" : "cube", " de bouillon de "); });
            t = t.replace(/^(\d+)\s+bouquets?\s+garnis?\b/i, function (m2, n) { return "".concat(n, " ").concat(+n > 1 ? "bouquets garnis" : "bouquet garni"); });
            var UW = "pinc\xE9e|tranche|gousse|branche|feuille|brin|sachet|bo\xEEte|botte|bouquet|paquet|pot|verre|tasse|poign\xE9e|morceau|cube|rouleau|tige|b\xE2ton|portion";
            var m = t.match(new RegExp("^(\\d+(?:[.,]\\d+)?)\\s+(" + UW + ")(?=\\s|$)(\\s+(?:de |d\u2019)?)?([A-Z\xC0-\xDD\u0152](?=[a-z\xE0-\xFF\u0153]))?"));
            if (m) {
                var q = num(m[1]);
                t = m[1] + " " + m[2] + (q > 1 && !/s$/.test(m[2]) ? "s" : "") + (m[3] || "") + (m[4] ? m[4].toLowerCase() : "") + t.slice(m[0].length);
            }
            else {
                var AG_1 = /(^|\s)(sèchées?|séchées?|séché|sèché|concassées?|concassé|rouges?|verts?|vertes?|jaunes?|blancs?|noirs?|douces?|violettes?|cerises?|fumées?|fumés?|brisées?|feuilletées?|sablées?|émincés?|émincées?)(?![A-Za-zÀ-ÿ])/gi;
                var agr_1 = function (r, pl) { return r.replace(AG_1, function (x, sp, w) {
                    return sp + fixAdj(w, pl);
                }); };
                var PLG = /^(pomme de terre|carotte|tomate|courgette|oignon|aubergine|poireau|champignon|patate|navet|betterave|pomme|poire|lardon|poivron|échalote|endive|concombre|crevette|avocat)(s?)(?![A-Za-zÀ-ÿ])/i;
                var PLN = /^(pomme de terre|carotte|tomate|courgette|oignon|aubergine|poireau|champignon|patate|navet|betterave|pomme|poire|lardon|poivron|échalote|endive|concombre|crevette|avocat|œuf|saucisse|reblochon|cornichon|chipolata|tortilla|banane|citron|orange|clémentine|kiwi|figue|abricot|pêche|fraise|artichaut|crêpe|escalope|cuisse|paupiette|merguez|brochette)(s?)(?![A-Za-zÀ-ÿ])/i;
                var apply = function (name, pl, re) {
                    var h = name.match(re);
                    if (!h)
                        return name;
                    var head = h[1].toLowerCase(), rest = name.slice(h[0].length);
                    if (pl)
                        head = head === "pomme de terre" ? "pommes de terre" : /s$/.test(head) ? head : head + "s";
                    return head + agr_1(rest, pl);
                };
                var m2 = void 0;
                if (m2 = t.match(/^((?:\d+(?:[.,]\d+)?|[½¼¾⅓⅔])(?:\s*(?:à|-)\s*\d+(?:[.,]\d+)?)?)\s+(?!(?:kg|mg|g|cl|ml|l|c\. à|pincée|tranche|gousse|branche|feuille|brin|sachet|boîte|botte|bouquet|paquet|pot|verre|tasse|poignée|morceau|cube|rouleau|tige|bâton|portion|petite|petit|grosse?|bon)\b)(\S.*)$/i)) {
                    var q = num(m2[1]);
                    t = m2[1] + " " + apply(m2[2].replace(/^[A-ZÀ-ÝŒ](?=[a-zà-ÿœ])/, function (c) { return c.toLowerCase(); }), q > 1, PLN);
                }
                else if (m2 = t.match(/^(\S+\s+(?:kg|g)\s+(?:de |d’))(.*)$/))
                    t = m2[1] + apply(m2[2], true, PLG);
            }
            t = t.replace(/^(\d+(?:[.,]\d+)?\s+(?:bouillon|œuf)s?\s)/i, function (a, b) { return b; }).replace(/ (Bœuf|Poulet|Légumes|Volaille)\b/g, function (a, w) { return " " + w.toLowerCase(); });
            t = t.replace(new RegExp("^((?:\\d+[.,]?\\d*|[\xBD\xBC\xBE\u2153\u2154])\\s+(?:" + UW + ")s?)\\s+(?!de\\b|d\u2019|du\\b|des\\b|garni|\\(|de la\\b|\xE0\\b|aux?\\b|petite|petit|grosse?|bien|bonne|belle)([A-Za-z\xC0-\xFF\u0152\u0153])", "i"), function (m2, q, c) { return "".concat(q, " ").concat(/^[aeiouyàâéèêëîïôöùûüœh]/i.test(c) ? "d\u2019" : "de ").concat(c); });
            t = t.replace(/(cubes? de bouillon[^()]*?) \(cubes?\)/i, "$1");
            var PROPER = /^(Paris|Provence|Dijon|Toulouse|Morteau|Montbéliard|Savoie|Bourgogne|Jean|Louis|Jean-Louis|Amiotte|Frankfort|Parmigiano|Reggiano|Dauphiné|Arborio|Rocamadour|Monsieur|Combava|Bretonne|Fontenay|Mille|QS)$/;
            t = t.replace(/(^|[\s(])([A-ZÀ-ÝŒ][a-zà-ÿœ’-]+)/g, function (m2, a, w) { return PROPER.test(w) ? m2 : a + w[0].toLowerCase() + w.slice(1); });
            return t.replace(/\s+/g, " ").replace(/\s+([,.;])/g, "$1").replace(/\s*\.$/, "").trim();
        }
        var harmonizeIngredients = function (text) { return String(text || "").split(/\r?\n/).map(function (l) { return l.trim() ? harmonizeLine(l) : ""; }).filter(function (l, i, a) { return l || i && a[i - 1]; }).join("\n").trim(); };
        var QTY0 = /^(\d+\s*[½¼¾⅓⅔]|\d+(?:[.,]\d+)?(?:\s*\/\s*\d+)?|[½¼¾⅓⅔])(\s*(?:à|-)\s*(\d+(?:[.,]\d+)?))?/;
        var toNum = function (t) {
            t = String(t).trim();
            var fr = { "\xBD": 0.5, "\xBC": 0.25, "\xBE": 0.75, "\u2153": 1 / 3, "\u2154": 2 / 3 };
            var m = t.match(/^(\d+)\s*([½¼¾⅓⅔])$/);
            if (m)
                return +m[1] + fr[m[2]];
            if (fr[t])
                return fr[t];
            m = t.match(/^(\d+)\s*\/\s*(\d+)$/);
            if (m)
                return m[1] / m[2];
            return parseFloat(t.replace(",", "."));
        };
        var niceNum = function (v, unit) {
            if (unit) {
                var r = v < 10 ? Math.round(v * 10) / 10 : Math.round(v);
                return String(r).replace(".", ",");
            }
            var q = Math.round(v * 4) / 4, w = Math.floor(q), f = q - w, fr = f === 0.25 ? "\xBC" : f === 0.5 ? "\xBD" : f === 0.75 ? "\xBE" : "";
            return (w ? String(w) : "") + fr || "\xBC";
        };
        function scaleIngredients(text, from, to) {
            if (!from || !to || from === to)
                return String(text || "");
            var k = to / from;
            return String(text || "").split(/\r?\n/).map(function (line) {
                var t = line.trim(), m = t.match(QTY0);
                if (!m || /^(?:\d+\s*(?:°|h\b))/.test(t))
                    return line;
                var rest = t.slice(m[0].length), unit = /^\s*(?:kg|mg|g|cl|ml|l|dl|c\. à)/i.test(rest);
                var a = toNum(m[1]) * k, b = m[3] ? toNum(m[3]) * k : null;
                var head = b !== null ? "".concat(niceNum(a, unit), " \u00E0 ").concat(niceNum(b, unit)) : niceNum(a, unit);
                return harmonizeLine(head + rest);
            }).join("\n");
        }
        return { isSkipped: isSkipped, parseLine: parseLine, parseLines: parseLines, formatQty: formatQty, itemLabel: itemLabel, addLines: addLines, addIngredients: addIngredients, tidyList: tidyList, harmonizeLine: harmonizeLine, harmonizeIngredients: harmonizeIngredients, scaleIngredients: scaleIngredients };
    })();
    __m.scan = (function () {
        var esc = __m.util.esc;
        var harmonizeIngredients = __m.shopping.harmonizeIngredients;
        var SRC = "https://cdn.jsdelivr.net/npm/tesseract.js@5.1.1/dist/tesseract.min.js";
        var LANG = "https://tessdata.projectnaptha.com/4.0.0_fast";
        var loading = null;
        function loadLib() {
            if (window.Tesseract)
                return Promise.resolve();
            return loading || (loading = new Promise(function (res, rej) {
                var s = document.createElement("script");
                s.src = SRC;
                s.onload = res;
                s.onerror = function () {
                    loading = null;
                    rej(new Error("biblioth\xE8que de lecture indisponible (connexion ?)"));
                };
                document.head.appendChild(s);
            }));
        }
        function prepare(file_1) {
            return __awaiter(this, arguments, void 0, function (file, max) {
                var bmp, _d, w0, h0, k, c, x, d, p, lo, hi, i, g, span, i, v;
                if (max === void 0) { max = 1800; }
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            if (!window.createImageBitmap) return [3 /*break*/, 2];
                            return [4 /*yield*/, createImageBitmap(file)];
                        case 1:
                            _d = _e.sent();
                            return [3 /*break*/, 4];
                        case 2: return [4 /*yield*/, new Promise(function (res, rej) {
                                var im = new Image();
                                im.onload = function () { return res(im); };
                                im.onerror = rej;
                                im.src = URL.createObjectURL(file);
                            })];
                        case 3:
                            _d = _e.sent();
                            _e.label = 4;
                        case 4:
                            bmp = _d;
                            w0 = bmp.width || bmp.naturalWidth, h0 = bmp.height || bmp.naturalHeight, k = Math.min(1, max / Math.max(w0, h0));
                            c = document.createElement("canvas");
                            c.width = Math.round(w0 * k);
                            c.height = Math.round(h0 * k);
                            x = c.getContext("2d");
                            x.drawImage(bmp, 0, 0, c.width, c.height);
                            d = x.getImageData(0, 0, c.width, c.height), p = d.data;
                            lo = 255, hi = 0;
                            for (i = 0; i < p.length; i += 4) {
                                g = p[i] * 0.3 + p[i + 1] * 0.59 + p[i + 2] * 0.11 | 0;
                                p[i] = g;
                                if (g < lo)
                                    lo = g;
                                if (g > hi)
                                    hi = g;
                            }
                            span = Math.max(40, hi - lo);
                            for (i = 0; i < p.length; i += 4) {
                                v = Math.max(0, Math.min(255, (p[i] - lo) * 255 / span));
                                p[i] = p[i + 1] = p[i + 2] = v;
                            }
                            x.putImageData(d, 0, 0);
                            return [2 /*return*/, c];
                    }
                });
            });
        }
        function ocr(file, onProgress) {
            return __awaiter(this, void 0, void 0, function () {
                var canvas, r;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            onProgress && onProgress("Chargement du lecteur de texte (la premi\xE8re fois, quelques Mo)\u2026");
                            return [4 /*yield*/, loadLib()];
                        case 1:
                            _d.sent();
                            return [4 /*yield*/, prepare(file)];
                        case 2:
                            canvas = _d.sent();
                            return [4 /*yield*/, window.Tesseract.recognize(canvas, "fra", { langPath: LANG, logger: function (m) {
                                        if (onProgress && m.status === "recognizing text")
                                            onProgress("Lecture de la photo\u2026 ".concat(Math.round((m.progress || 0) * 100), " %"));
                                        else if (onProgress && /loading|initializ/.test(m.status || ""))
                                            onProgress("Pr\xE9paration du lecteur\u2026");
                                    } })];
                        case 3:
                            r = _d.sent();
                            return [2 /*return*/, String(r && r.data && r.data.text || "")];
                    }
                });
            });
        }
        var NOISE = /(mis en bouteille|propri[ée]taire|r[ée]colt|produit (de|en)|contient|sulfite|alc\.?|\bvol\b|%|enceinte|grossesse|www\.|\.com|\.fr\b|e\s?\d{2,3}\s?ml|\bcl\b|lot\b|recyc|trier|consommation|abus|sant[ée]|imported|product of)/i;
        var REGIONS = [["Bordeaux", "France"], ["M\xE9doc", "France"], ["Haut-M\xE9doc", "France"], ["Margaux", "France"], ["Pauillac", "France"], ["Saint-Est\xE8phe", "France"], ["Saint-Julien", "France"], ["Pomerol", "France"], ["Saint-\xC9milion", "France"], ["Pessac-L\xE9ognan", "France"], ["Graves", "France"], ["Sauternes", "France"], ["Bourgogne", "France"], ["Chablis", "France"], ["Meursault", "France"], ["Pommard", "France"], ["Gevrey-Chambertin", "France"], ["Beaujolais", "France"], ["Morgon", "France"], ["Brouilly", "France"], ["C\xF4tes du Rh\xF4ne", "France"], ["Ch\xE2teauneuf-du-Pape", "France"], ["Gigondas", "France"], ["Hermitage", "France"], ["Sancerre", "France"], ["Pouilly-Fum\xE9", "France"], ["Vouvray", "France"], ["Chinon", "France"], ["Muscadet", "France"], ["Alsace", "France"], ["Languedoc", "France"], ["Minervois", "France"], ["Corbi\xE8res", "France"], ["Provence", "France"], ["Bandol", "France"], ["Cahors", "France"], ["Madiran", "France"], ["Juran\xE7on", "France"], ["Champagne", "France"], ["Cr\xE9mant", "France"], ["Chianti", "Italie"], ["Barolo", "Italie"], ["Barbaresco", "Italie"], ["Prosecco", "Italie"], ["Toscana", "Italie"], ["Rioja", "Espagne"], ["Ribera del Duero", "Espagne"], ["Cava", "Espagne"], ["Douro", "Portugal"], ["Porto", "Portugal"], ["Mosel", "Allemagne"], ["Napa", "\xC9tats-Unis"], ["Mendoza", "Argentine"], ["Marlborough", "Nouvelle-Z\xE9lande"]];
        var noacc = function (t) { return String(t).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };
        function parseWine(text) {
            var out = {}, raw = String(text || "");
            var lines = raw.split(/\r?\n/).map(function (l) { return l.replace(/[^\wÀ-ÿ'’.,;:()&\/%°\- ]/g, " ").replace(/\s+/g, " ").trim(); }).filter(function (l) { return l.length > 2 && (l.match(/[A-Za-zÀ-ÿ]/g) || []).length >= Math.ceil(l.length * 0.5); });
            var all = noacc(raw);
            var vint = raw.match(/\b(19[5-9]\d|20[0-3]\d)\b/g);
            if (vint)
                out.vintage = Number(vint[vint.length - 1]);
            var m = raw.match(/\b(\d{2,3})\s?(cl|ml)\b/i);
            if (m) {
                var cl = m[2].toLowerCase() === "ml" ? Math.round(Number(m[1]) / 10) : Number(m[1]);
                if ([20, 37, 50, 70, 75, 150, 300].includes(cl) || cl >= 10 && cl <= 300)
                    out.bottle_size = "".concat(cl, " cl");
            }
            if (/magnum/.test(all))
                out.bottle_size = "150 cl";
            if (/champagne|cremant|prosecco|\bcava\b|brut\b|methode traditionnelle|petillant/.test(all))
                out.wine_type = "Effervescent";
            else if (/sauternes|liquoreux|moelleux|vendanges tardives/.test(all))
                out.wine_type = "Liquoreux";
            else if (/porto|banyuls|xeres|sherry|maury|pineau|muscat de/.test(all))
                out.wine_type = "Fortifi\xE9";
            else if (/whisky|whiskey|cognac|armagnac|\brhum\b|\bgin\b|vodka|calvados|tequila/.test(all))
                out.wine_type = "Spiritueux";
            else if (/\brose\b/.test(all))
                out.wine_type = "Ros\xE9";
            else if (/\bblanc\b|blanc de/.test(all))
                out.wine_type = "Blanc";
            else if (/\brouge\b/.test(all))
                out.wine_type = "Rouge";
            var ac = raw.match(/(?:A\.?O\.?[CP]\.?|Appellation)\s+([A-Za-zÀ-ÿ'’\- ]{3,40}?)\s+(?:Contr[ôo]l[ée]e|Prot[ée]g[ée]e|A\.?O\.?[CP])/i);
            var hit = REGIONS.find(function (_d) {
                var _e = __read(_d, 1), r = _e[0];
                return all.indexOf(noacc(r)) >= 0;
            });
            if (ac) {
                out.region = ac[1].trim().toLowerCase().replace(/(^|[\s\-])([a-zà-ÿ])/g, function (s, a, b) { return a + b.toUpperCase(); });
                var h2 = REGIONS.find(function (_d) {
                    var _e = __read(_d, 1), r = _e[0];
                    return noacc(ac[1]).indexOf(noacc(r)) >= 0;
                });
                out.country = h2 ? h2[1] : "France";
            }
            else if (hit) {
                out.region = hit[0];
                out.country = hit[1];
            }
            if (!out.country) {
                if (/italia|italy|\bdocg?\b|\bigt\b/.test(all))
                    out.country = "Italie";
                else if (/espana|spain|denominacion/.test(all))
                    out.country = "Espagne";
                else if (/portugal/.test(all))
                    out.country = "Portugal";
                else if (/deutsch|germany|qualitatswein/.test(all))
                    out.country = "Allemagne";
                else if (/\bfrance\b|\baoc\b|\baop\b/.test(all))
                    out.country = "France";
            }
            var cand = lines.filter(function (l) { return !NOISE.test(l) && !/^(\d|[a-z]\s)/.test(l) && l.length <= 48; });
            var prod = cand.find(function (l) { return /(ch[aâ]teau|domaine|clos\b|maison|\bmas\b|cave |cuv[ée]e)/i.test(l); });
            if (prod)
                out.producer = prod.replace(/\b\d{4}\b/g, "").trim();
            var rest = cand.filter(function (l) { return l !== prod && !(out.region && noacc(l) === noacc(out.region)) && !/^(appellation|grand vin|vin de)/i.test(l) && !/\b(A\.?O\.?[CP]|contr[ôo]l|prot[ée]g[ée]e)/i.test(l) && !/\b(19|20)\d\d\b/.test(l); });
            var upper = rest.filter(function (l) { return l === l.toUpperCase(); }).sort(function (a, b) { return b.length - a.length; })[0];
            out.name = (upper || rest.sort(function (a, b) { return b.length - a.length; })[0] || out.producer || "").replace(/\s+/g, " ");
            if (out.name)
                out.name = out.name.toLowerCase().replace(/(^|[\s'’\-])([a-zà-ÿ])/g, function (s, a, b) { return a + b.toUpperCase(); });
            return out;
        }
        function parseRecipe(text) {
            var out = {};
            var lines = String(text || "").split(/\r?\n/).map(function (l) { return l.replace(/[^\wÀ-ÿ'’.,;:()&\/%°€\-–•½¼¾+ ]/g, " ").replace(/\s+/g, " ").trim(); }).filter(function (l) { return l.length > 1; });
            if (!lines.length)
                return out;
            var iIng = lines.findIndex(function (l) { return /^ingr[ée]dients?\b/i.test(l); }), iPrep = lines.findIndex(function (l, i) { return i > iIng && /^(pr[ée]paration|recette|d[ée]roulement|instructions?|[ée]tapes?|progression)\b/i.test(l); });
            var head = lines.slice(0, iIng > 0 ? iIng : 1);
            var title = head.find(function (l) { return l.length > 3 && !/^(pour|temps|pr[ée]paration|cuisson|\d)/i.test(l); }) || lines[0];
            out.title = title.replace(/[.:]+$/, "").replace(/^./, function (c) { return c.toUpperCase(); });
            var all = lines.join(" ");
            var m = all.match(/(?:pour\s+)?(\d{1,2})\s*(?:personnes?|pers\b\.?|parts?|portions?|convives)/i);
            if (m)
                out.servings = Number(m[1]);
            m = all.match(/pr[ée]paration\s*:?\s*(\d+)\s*(h|min)/i);
            if (m)
                out.prep_minutes = m[2].toLowerCase() === "h" ? Number(m[1]) * 60 : Number(m[1]);
            m = all.match(/cuisson\s*:?\s*(\d+)\s*(h|min)/i);
            if (m)
                out.cook_minutes = m[2].toLowerCase() === "h" ? Number(m[1]) * 60 : Number(m[1]);
            var ing = [], steps = [];
            if (iIng >= 0) {
                ing = lines.slice(iIng + 1, iPrep > iIng ? iPrep : void 0);
                if (iPrep > iIng)
                    steps = lines.slice(iPrep + 1);
            }
            else {
                var body = lines.filter(function (l) { return l !== title; });
                ing = body.filter(function (l) { return /^(\d|[-•]\s|[½¼¾]|une?\s|quelques|sel|poivre)/i.test(l) && l.length < 60; });
                steps = body.filter(function (l) { return ing.indexOf(l) < 0 && l.length > 25; });
            }
            var ingOut = [];
            ing.forEach(function (l) {
                if (/^(pour|temps|cuisson|pr[ée]paration)\b/i.test(l))
                    return;
                ingOut.push(l.replace(/^[-•]\s*/, ""));
            });
            out.ingredients = harmonizeIngredients(ingOut.join("\n"));
            var joined = steps.join(" ").replace(/(\d+)\s*[.)]\s+(?=[A-ZÉÈÀ])/g, "\n").replace(/\.\s+(?=[A-ZÉÈÀ])/g, ".\n");
            out.instructions = joined.split("\n").map(function (s) { return s.trim(); }).filter(Boolean).join("\n");
            return out;
        }
        var scanBox = function (label) { return "<div class=\"scanbox\"><b>".concat(esc(label), "</b><div class=\"scanbtns\"><label class=\"btn small\">Prendre une photo<input type=\"file\" accept=\"image/*\" capture=\"environment\" id=\"scanCam\" hidden></label><label class=\"btn small\">Choisir une photo<input type=\"file\" accept=\"image/*\" id=\"scanPick\" hidden></label></div><div id=\"scanMsg\" class=\"muted small\">La fiche est remplie automatiquement ; v\u00E9rifiez les champs avant d\u2019enregistrer.</div></div>"); };
        function bindScan(root, run) {
            var _this = this;
            var msg = function (t) {
                var m = root.querySelector("#scanMsg");
                if (m)
                    m.textContent = t;
            };
            var go = function (e) { return __awaiter(_this, void 0, void 0, function () {
                var f, n, err_8;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            f = e.target.files && e.target.files[0];
                            e.target.value = "";
                            if (!f)
                                return [2 /*return*/];
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 3, , 4]);
                            msg("Lecture en cours\u2026");
                            return [4 /*yield*/, run(f, msg)];
                        case 2:
                            n = _d.sent();
                            msg(n ? "".concat(n, " champ").concat(n > 1 ? "s" : "", " rempli").concat(n > 1 ? "s" : "", " : v\u00E9rifiez et corrigez si besoin.") : "Peu de texte reconnu : essayez une photo plus nette, bien \xE9clair\xE9e et de face, ou saisissez la fiche \xE0 la main.");
                            return [3 /*break*/, 4];
                        case 3:
                            err_8 = _d.sent();
                            console.error(err_8);
                            msg("Lecture impossible sur cet appareil (" + (err_8.message || "erreur") + "). Saisissez la fiche \xE0 la main.");
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
            ["#scanCam", "#scanPick"].forEach(function (s) {
                var i = root.querySelector(s);
                if (i)
                    i.onchange = go;
            });
        }
        function fillForm(form, values) {
            var n = 0;
            Object.keys(values).forEach(function (k) {
                var el = form.elements[k], v = values[k];
                if (!el || v === void 0 || v === null || v === "")
                    return;
                if (el.value && String(el.value).trim() && !(k === "wine_type" || k === "category"))
                    return;
                el.value = v;
                n++;
            });
            return n;
        }
        return { ocr: ocr, parseWine: parseWine, parseRecipe: parseRecipe, scanBox: scanBox, bindScan: bindScan, fillForm: fillForm };
    })();
    __m.seed = (function () {
        var db = __m.db;
        function importFile(table, file) {
            return __awaiter(this, void 0, void 0, function () {
                var key, rows, _d, withFamily, n, i, res;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            key = table === "recipes" ? "recipes" : "cellar";
                            if (!(window.SEED && window.SEED[key])) return [3 /*break*/, 1];
                            _d = window.SEED[key];
                            return [3 /*break*/, 4];
                        case 1: return [4 /*yield*/, fetch(file)];
                        case 2: return [4 /*yield*/, (_e.sent()).json()];
                        case 3:
                            _d = _e.sent();
                            _e.label = 4;
                        case 4:
                            rows = _d;
                            withFamily = rows.map(function (r) { return __spreadProps(__spreadValues({}, r), { family_id: db.store.familyId }); });
                            n = 0;
                            i = 0;
                            _e.label = 5;
                        case 5:
                            if (!(i < withFamily.length)) return [3 /*break*/, 8];
                            return [4 /*yield*/, db.addMany(table, withFamily.slice(i, i + 40), { ignoreDuplicates: true })];
                        case 6:
                            res = _e.sent();
                            n += res.length;
                            _e.label = 7;
                        case 7:
                            i += 40;
                            return [3 /*break*/, 5];
                        case 8: return [2 /*return*/, n];
                    }
                });
            });
        }
        var importRecipes = function () { return importFile("recipes", "data/recipes.json"); };
        var importCellar = function () { return importFile("cellar_items", "data/cellar.json"); };
        return { importRecipes: importRecipes, importCellar: importCellar };
    })();
    __m.ideas = (function () {
        var _d = __m.util, esc = _d.esc, openModal = _d.openModal, closeModal = _d.closeModal, toast = _d.toast;
        var _e = __m.ext, translateIdea = _e.translateIdea, marmitonSearch = _e.marmitonSearch;
        var db = __m.db;
        var _f = __m.shopping, harmonizeIngredients = _f.harmonizeIngredients, addIngredients = _f.addIngredients, scaleIngredients = _f.scaleIngredients;
        var ratingHTML = function (idea) { return idea.rating ? " <span class=\"chip rating\">\u2605 ".concat(String(idea.rating).replace(".", ","), "/5").concat(idea.ratingCount ? " \u00B7 ".concat(idea.ratingCount, " avis") : "", "</span>") : ""; };
        var stars = function (n) { return n ? " <span class=\"chip rating\">\u2605 ".concat(String(n).replace(".", ","), "/5</span>") : ""; };
        var reviewsHTML = function (idea) { return idea.source !== "Marmiton" ? "" : idea.reviews && idea.reviews.length ? "<h4>Commentaires des internautes</h4>".concat(idea.reviews.map(function (r) { return "<div class=\"review\"><b>".concat(esc(r.author || "Internaute"), "</b>").concat(stars(r.rating)).concat(r.date ? " <small class=\"muted\">".concat(esc(r.date), "</small>") : "", "<p>").concat(esc(r.text), "</p></div>"); }).join("")) : "<p class=\"muted small\">Pas de commentaires r\u00E9cup\u00E9r\u00E9s pour cette recette.".concat(idea.source_url ? " Ils sont lisibles sur la page Marmiton." : "", "</p>"); };
        var ideaCardHTML = function (idea) {
            var ing = String(harmonizeIngredients(idea.ingredients) || "").split("\n").filter(Boolean);
            var steps = String(idea.instructions || "").split("\n").filter(Boolean);
            return "<div class=\"idea\">\n    ".concat(idea.photo_url ? "<img class=\"ideaphoto\" src=\"".concat(esc(idea.photo_url), "\" alt=\"\" loading=\"lazy\">") : "", "\n    <div class=\"ideabody\">\n      <span class=\"chip\">").concat(esc(idea.source === "Marmiton" ? "Marmiton" : idea.kind === "cocktail" ? idea.category : "Id\xE9e recette"), "</span>").concat(ratingHTML(idea), "\n      <h3 class=\"script\">").concat(esc(idea.title), "</h3>\n      ").concat(idea.area ? "<p class=\"muted\">".concat(esc(idea.area), "</p>") : "", "\n      ").concat(idea.kind === "cocktail" ? "" : "<div class=\"servings\">Pour <button class=\"btn sm\" data-sv=\"-\" aria-label=\"Moins\">\u2212</button> <b id=\"svN\">".concat(idea.servings || 4, "</b> <span id=\"svL\">personne").concat((idea.servings || 4) > 1 ? "s" : "", "</span> <button class=\"btn sm\" data-sv=\"+\" aria-label=\"Plus\">+</button>").concat(idea.servings ? "" : ' <small class="muted">(nombre non pr\xE9cis\xE9 par la source)</small>', "</div>"), "\n      <h4>Ingr\u00E9dients</h4><ul id=\"ingList\">").concat(ing.map(function (i) { return "<li>".concat(esc(i), "</li>"); }).join(""), "</ul>\n      <h4>Pr\u00E9paration</h4>").concat(steps.map(function (s) { return "<p>".concat(esc(s), "</p>"); }).join(""), "\n      ").concat(idea.lang === "en" ? '<p class="muted small">Texte en anglais (traduction automatique indisponible).</p>' : idea.translated ? '<p class="muted small">Traduit automatiquement.</p>' : "", "\n      ").concat(reviewsHTML(idea), "\n      ").concat(idea.note ? "<p class=\"muted small\">".concat(esc(idea.note), "</p>") : "", "\n      ").concat(idea.source_url ? "<p><a href=\"".concat(esc(idea.source_url), "\" target=\"_blank\" rel=\"noopener\">").concat(idea.source === "Marmiton" ? "Voir sur Marmiton \u2197" : "Source \u2197", "</a></p>") : "", "\n    </div></div>");
        };
        function bindServings(root, idea) {
            var minus = root.querySelector('[data-sv="-"]'), plus = root.querySelector('[data-sv="+"]');
            if (!minus || !plus)
                return;
            if (!idea.baseIngredients) {
                idea.baseIngredients = harmonizeIngredients(idea.ingredients);
                idea.baseServings = idea.servings || 4;
                idea.servings = idea.baseServings;
            }
            var apply = function (n) {
                n = Math.max(1, Math.min(40, n));
                idea.servings = n;
                idea.ingredients = scaleIngredients(idea.baseIngredients, idea.baseServings, n);
                root.querySelector("#svN").textContent = n;
                root.querySelector("#svL").textContent = n > 1 ? "personnes" : "personne";
                root.querySelector("#ingList").innerHTML = String(idea.ingredients).split("\n").filter(Boolean).map(function (i) { return "<li>".concat(esc(i), "</li>"); }).join("");
            };
            minus.onclick = function () { return apply((idea.servings || 4) - 1); };
            plus.onclick = function () { return apply((idea.servings || 4) + 1); };
        }
        function saveIdeaAsRecipe(idea, category) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_d) {
                    return [2 /*return*/, db.add("recipes", {
                            title: idea.title,
                            category: category || (idea.kind === "cocktail" ? idea.category : "Plat"),
                            ingredients: harmonizeIngredients(idea.ingredients),
                            instructions: idea.instructions,
                            photo_url: idea.photo_url,
                            source_url: idea.source_url,
                            notes: idea.source === "Marmiton" ? "Marmiton".concat(idea.rating ? " \xB7 note " + String(idea.rating).replace(".", ",") + "/5" : "") : "Id\xE9e trouv\xE9e sur internet",
                            servings: idea.kind === "cocktail" ? 1 : idea.servings || null
                        })];
                });
            });
        }
        function openIdea(fetcher_1) {
            return __awaiter(this, arguments, void 0, function (fetcher, _d) {
                var token, idea, load, paint, bind;
                var _this = this;
                var _e = _d === void 0 ? {} : _d, _f = _e.title, title = _f === void 0 ? "Une id\xE9e pour vous" : _f, saveCategory = _e.saveCategory;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            token = 0, idea = null;
                            load = function () { return __awaiter(_this, void 0, void 0, function () {
                                var my, t, e_16;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            my = ++token;
                                            idea = null;
                                            openModal("<div class=\"ideabox\"><h2 class=\"script\">".concat(esc(title), "</h2><div class=\"loading\"><span class=\"spinner\"></span> Recherche en cours\u2026</div></div>"), { wide: true });
                                            _d.label = 1;
                                        case 1:
                                            _d.trys.push([1, 4, , 5]);
                                            return [4 /*yield*/, fetcher()];
                                        case 2:
                                            idea = _d.sent();
                                            if (my !== token)
                                                return [2 /*return*/];
                                            paint();
                                            return [4 /*yield*/, translateIdea(idea)];
                                        case 3:
                                            t = _d.sent();
                                            if (my !== token)
                                                return [2 /*return*/];
                                            if (t !== idea) {
                                                idea = t;
                                                paint();
                                            }
                                            return [3 /*break*/, 5];
                                        case 4:
                                            e_16 = _d.sent();
                                            console.error(e_16);
                                            if (my === token)
                                                openModal("<div class=\"ideabox\"><h2 class=\"script\">".concat(esc(title), "</h2><p class=\"muted\">Impossible de r\u00E9cup\u00E9rer une id\u00E9e pour le moment (").concat(esc(e_16.message), "). V\u00E9rifiez la connexion et r\u00E9essayez.</p>\n        <div class=\"formactions\"><span class=\"grow\"></span><button class=\"btn ghost\" data-close>Fermer</button><button class=\"btn primary\" data-again>R\u00E9essayer</button></div></div>"), { wide: true, onMount: bind });
                                            return [3 /*break*/, 5];
                                        case 5: return [2 /*return*/];
                                    }
                                });
                            }); };
                            paint = function () { return openModal("<div class=\"ideabox\"><h2 class=\"script\">".concat(esc(title), "</h2>").concat(ideaCardHTML(idea), "\n    <div class=\"formactions\"><button class=\"btn ghost\" data-close>Fermer</button><span class=\"grow\"></span>\n    <button class=\"btn\" data-again>\u21BB Une autre id\u00E9e</button><button class=\"btn primary\" data-save>\uFF0B Ajouter \u00E0 mes recettes</button></div></div>"), { wide: true, onMount: bind }); };
                            bind = function (root) {
                                var _a, _b, _c;
                                if (idea)
                                    bindServings(root, idea);
                                (_a = root.querySelector("[data-close]")) == null ? void 0 : _a.addEventListener("click", closeModal);
                                (_b = root.querySelector("[data-again]")) == null ? void 0 : _b.addEventListener("click", load);
                                (_c = root.querySelector("[data-save]")) == null ? void 0 : _c.addEventListener("click", function (e) { return __awaiter(_this, void 0, void 0, function () {
                                    var err_9;
                                    return __generator(this, function (_d) {
                                        switch (_d.label) {
                                            case 0:
                                                e.target.disabled = true;
                                                _d.label = 1;
                                            case 1:
                                                _d.trys.push([1, 3, , 4]);
                                                return [4 /*yield*/, saveIdeaAsRecipe(idea, saveCategory)];
                                            case 2:
                                                _d.sent();
                                                toast("Ajout\xE9 \xE0 votre carnet de recettes");
                                                closeModal();
                                                return [3 /*break*/, 4];
                                            case 3:
                                                err_9 = _d.sent();
                                                toast(err_9.message, "err");
                                                e.target.disabled = false;
                                                return [3 /*break*/, 4];
                                            case 4: return [2 /*return*/];
                                        }
                                    });
                                }); });
                            };
                            return [4 /*yield*/, load()];
                        case 1:
                            _g.sent();
                            return [2 /*return*/];
                    }
                });
            });
        }
        function openMarmitonSearch(initial) {
            var _this = this;
            if (initial === void 0) { initial = ""; }
            var TYPES = [["", "Tout"], ["entree", "Entr\xE9e"], ["platprincipal", "Plat"], ["dessert", "Dessert"]];
            var results = [], q = initial, type = "", busy = false, err = "";
            var draw = function () { return openModal("<div class=\"ideabox\"><h2 class=\"script\">Chercher sur Marmiton</h2>\n    <form id=\"mq\" class=\"inlineform\"><input name=\"q\" placeholder=\"ex. gratin dauphinois, tarte aux poireaux\u2026\" value=\"".concat(esc(q), "\" required><select name=\"type\">").concat(TYPES.map(function (t) { return "<option value=\"".concat(t[0], "\" ").concat(t[0] === type ? "selected" : "", ">").concat(t[1], "</option>"); }).join(""), "</select><button class=\"btn primary\">Chercher</button></form>\n    ").concat(busy ? '<div class="loading"><span class="spinner"></span> Recherche en cours\u2026</div>' : err ? "<p class=\"muted\">".concat(esc(err), "</p>") : results.length ? "<div class=\"mres\">".concat(results.map(function (r, i) { return "<button class=\"mrow2\" data-i=\"".concat(i, "\">").concat(r.photo_url ? "<img src=\"".concat(esc(r.photo_url), "\" alt=\"\" loading=\"lazy\">") : '<span class="noimg"></span>', "<span class=\"grow\"><b>").concat(esc(r.title), "</b><br><small>").concat(r.rating ? "\u2605 ".concat(String(r.rating).replace(".", ","), "/5").concat(r.ratingCount ? " \u00B7 ".concat(r.ratingCount, " avis") : "") : "pas de note").concat(r.area ? " \xB7 " + esc(r.area) : "", "</small></span></button>"); }).join(""), "</div>") : '<p class="muted small">Les r\xE9sultats s\u2019affichent tri\xE9s par note.</p>', "\n    <div class=\"formactions\"><span class=\"grow\"></span><button class=\"btn ghost\" data-close>Fermer</button></div></div>"), { wide: true, onMount: function (root) {
                    root.querySelector("[data-close]").onclick = closeModal;
                    root.querySelector("#mq").onsubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var x_3;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    e.preventDefault();
                                    q = e.target.elements.q.value.trim();
                                    type = e.target.elements.type.value;
                                    if (!q)
                                        return [2 /*return*/];
                                    busy = true;
                                    err = "";
                                    results = [];
                                    draw();
                                    _d.label = 1;
                                case 1:
                                    _d.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, marmitonSearch(q, type)];
                                case 2:
                                    results = _d.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    x_3 = _d.sent();
                                    err = "Recherche impossible (".concat(String(x_3.message || x_3).slice(0, 140), "). V\u00E9rifiez que la fonction Marmiton est bien en ligne.");
                                    return [3 /*break*/, 4];
                                case 4:
                                    busy = false;
                                    draw();
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    root.querySelectorAll("[data-i]").forEach(function (b) {
                        b.onclick = function () { return detail(results[+b.dataset.i]); };
                    });
                } }); };
            var detail = function (idea) { return openModal("<div class=\"ideabox\"><h2 class=\"script\">Marmiton</h2>".concat(ideaCardHTML(idea), "\n    <div class=\"formactions wrap\"><button class=\"btn ghost\" data-back>\u2039 R\u00E9sultats</button><button class=\"btn ghost\" data-close>Fermer</button><span class=\"grow\"></span><button class=\"btn\" data-shop>Ajouter aux courses</button><button class=\"btn primary\" data-save>\uFF0B Ajouter \u00E0 mes recettes</button></div></div>"), { wide: true, onMount: function (root) {
                    bindServings(root, idea);
                    root.querySelector("[data-back]").onclick = draw;
                    root.querySelector("[data-close]").onclick = closeModal;
                    root.querySelector("[data-shop]").onclick = function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var n, x_4;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    e.target.disabled = true;
                                    _d.label = 1;
                                case 1:
                                    _d.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, addIngredients({ ingredients: idea.ingredients, title: idea.title })];
                                case 2:
                                    n = _d.sent();
                                    toast("".concat(n, " ingr\u00E9dient").concat(n > 1 ? "s" : "", " ajout\u00E9").concat(n > 1 ? "s" : "", " \u00E0 la liste de courses"));
                                    return [3 /*break*/, 4];
                                case 3:
                                    x_4 = _d.sent();
                                    toast(x_4.message, "err");
                                    return [3 /*break*/, 4];
                                case 4:
                                    e.target.disabled = false;
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    root.querySelector("[data-save]").onclick = function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var x_5;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    e.target.disabled = true;
                                    _d.label = 1;
                                case 1:
                                    _d.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, saveIdeaAsRecipe(idea)];
                                case 2:
                                    _d.sent();
                                    toast("Ajout\xE9 \xE0 votre carnet de recettes");
                                    return [3 /*break*/, 4];
                                case 3:
                                    x_5 = _d.sent();
                                    toast(x_5.message, "err");
                                    e.target.disabled = false;
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); };
                } }); };
            draw();
        }
        return { ratingHTML: ratingHTML, reviewsHTML: reviewsHTML, ideaCardHTML: ideaCardHTML, bindServings: bindServings, saveIdeaAsRecipe: saveIdeaAsRecipe, openIdea: openIdea, openMarmitonSearch: openMarmitonSearch };
    })();
    __m.vivino = (function () {
        var norm = __m.util.norm;
        function parseCSV(text) {
            var t = String(text || "").replace(/^﻿/, "");
            var first = t.split(/\r?\n/)[0] || "";
            var sep = (first.match(/;/g) || []).length > (first.match(/,/g) || []).length ? ";" : (first.match(/\t/g) || []).length > (first.match(/,/g) || []).length ? "	" : ",";
            var rows = [];
            var row = [], cur = "", q = false;
            for (var i = 0; i < t.length; i++) {
                var c = t[i];
                if (q) {
                    if (c === '"') {
                        if (t[i + 1] === '"') {
                            cur += '"';
                            i++;
                        }
                        else
                            q = false;
                    }
                    else
                        cur += c;
                }
                else if (c === '"')
                    q = true;
                else if (c === sep) {
                    row.push(cur);
                    cur = "";
                }
                else if (c === "\n" || c === "\r") {
                    if (c === "\r" && t[i + 1] === "\n")
                        i++;
                    row.push(cur);
                    cur = "";
                    if (row.some(function (x) { return x !== ""; }))
                        rows.push(row);
                    row = [];
                }
                else
                    cur += c;
            }
            row.push(cur);
            if (row.some(function (x) { return x !== ""; }))
                rows.push(row);
            if (!rows.length)
                return [];
            var head = rows[0].map(function (h) { return norm(h).replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim(); });
            return rows.slice(1).map(function (r) {
                var o = {};
                head.forEach(function (h, i) {
                    o[h] = (r[i] || "").trim();
                });
                return o;
            });
        }
        var pickField = function (o, names) {
            var e_17, _d, e_18, _e;
            var _loop_3 = function (n) {
                var k = Object.keys(o).find(function (h) { return h === n; });
                if (k && o[k] !== "")
                    return { value: o[k] };
            };
            try {
                for (var names_1 = __values(names), names_1_1 = names_1.next(); !names_1_1.done; names_1_1 = names_1.next()) {
                    var n = names_1_1.value;
                    var state_1 = _loop_3(n);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
            }
            catch (e_17_1) { e_17 = { error: e_17_1 }; }
            finally {
                try {
                    if (names_1_1 && !names_1_1.done && (_d = names_1.return)) _d.call(names_1);
                }
                finally { if (e_17) throw e_17.error; }
            }
            var _loop_4 = function (n) {
                var k = Object.keys(o).find(function (h) { return h.indexOf(n) >= 0; });
                if (k && o[k] !== "")
                    return { value: o[k] };
            };
            try {
                for (var names_2 = __values(names), names_2_1 = names_2.next(); !names_2_1.done; names_2_1 = names_2.next()) {
                    var n = names_2_1.value;
                    var state_2 = _loop_4(n);
                    if (typeof state_2 === "object")
                        return state_2.value;
                }
            }
            catch (e_18_1) { e_18 = { error: e_18_1 }; }
            finally {
                try {
                    if (names_2_1 && !names_2_1.done && (_e = names_2.return)) _e.call(names_2);
                }
                finally { if (e_18) throw e_18.error; }
            }
            return "";
        };
        var vivinoId = function (url) {
            var m = String(url || "").match(/(?:\/wines\/|\/w\/)(\d+)/);
            return m ? m[1] : "";
        };
        var numOf = function (v) {
            var n = parseFloat(String(v || "").replace(",", "."));
            return Number.isFinite(n) ? n : null;
        };
        var keyOf = function (producer, name, vintage) { return norm([producer, name, vintage || ""].join(" ")).replace(/[^a-z0-9]/g, ""); };
        function readRows(csvRows) {
            return csvRows.map(function (o) {
                var url = pickField(o, ["link to wine", "wine url", "vivino url", "wine link", "url", "link"]);
                var name = pickField(o, ["wine name", "wine", "name", "nom"]);
                return {
                    producer: pickField(o, ["winery", "producer", "producteur", "domaine"]),
                    name: name,
                    url: url,
                    id: vivinoId(url),
                    vintage: numOf(pickField(o, ["vintage", "year", "millesime"])),
                    qty: numOf(pickField(o, ["quantity", "qty", "bottles", "nombre", "quantite"])),
                    rating: numOf(pickField(o, ["your rating", "user rating", "my rating", "rating", "note"])),
                    comment: pickField(o, ["your review", "review", "comment", "tasting note", "commentaire"]),
                    type: pickField(o, ["wine type", "type", "style"]),
                    country: pickField(o, ["country", "pays"]),
                    region: pickField(o, ["region", "region name"]),
                    price: numOf(pickField(o, ["price", "purchase price", "prix"])),
                    drink: pickField(o, ["drink", "drinking window", "apogee"])
                };
            }).filter(function (r) { return r.name; });
        }
        var TYPE_MAP = { red: "Rouge", white: "Blanc", rose: "Ros\xE9", sparkling: "P\xE9tillant", rouge: "Rouge", blanc: "Blanc", dessert: "Liquoreux", fortified: "Fortifi\xE9" };
        var noteOf = function (r) { return ["Vivino" + (r.rating ? " : \u2605 ".concat(String(r.rating).replace(".", ","), "/5") : ""), r.comment].filter(Boolean).join(" \u2014 "); };
        var tokens = function () {
            var t = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                t[_i] = arguments[_i];
            }
            return new Set(norm(t.join(" ")).replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter(function (w) { return w.length > 2 && !/^(chateau|domaine|cuvee|rouge|blanc|vin|cave|les|des|the|de|du|la|le)$/.test(w); }));
        };
        var similar = function (a, b) {
            if (!a.size || !b.size)
                return 0;
            var i = 0;
            a.forEach(function (w) {
                if (b.has(w))
                    i++;
            });
            return i / (a.size + b.size - i);
        };
        var SLOT_ROW = function (b) { return b.location_kind === "cave" && b.slot; };
        var qtyOf = function (b) { return Number(b.quantity) || 1; };
        function planSync(rows0, existing, _d) {
            var e_19, _e;
            var _f = _d === void 0 ? {} : _d, _g = _f.cellarFile, cellarFile = _g === void 0 ? true : _g, _h = _f.freeSlots, freeSlots = _h === void 0 ? [] : _h;
            var rows = rows0;
            if (cellarFile) {
                var m_1 = /* @__PURE__ */ new Map();
                rows0.forEach(function (r) {
                    var k = r.id || keyOf(r.producer, r.name, r.vintage), q = r.qty > 0 ? r.qty : 1;
                    if (m_1.has(k)) {
                        var o = m_1.get(k);
                        o.qty += q;
                        o.rating = o.rating || r.rating;
                        o.comment = o.comment || r.comment;
                    }
                    else
                        m_1.set(k, __spreadProps(__spreadValues({}, r), { qty: q }));
                });
                rows = __spreadArray([], __read(m_1.values()), false);
            }
            var groups = /* @__PURE__ */ new Map();
            var addTo = function (k, b) {
                if (!k)
                    return;
                if (!groups.has(k))
                    groups.set(k, []);
                if (groups.get(k).indexOf(b) < 0)
                    groups.get(k).push(b);
            };
            existing.forEach(function (b) {
                addTo(vivinoId(b.vivino_url), b);
                addTo(keyOf(b.producer, b.name, b.vintage), b);
            });
            var tok = existing.map(function (b) { return ({ b: b, t: tokens(b.producer, b.name) }); });
            var findRows = function (r) {
                var g1 = r.id && groups.get(r.id) || [], g2 = groups.get(keyOf(r.producer, r.name, r.vintage)) || [];
                var g = g1.concat(g2.filter(function (b) { return g1.indexOf(b) < 0 && !vivinoId(b.vivino_url); }));
                if (g.length)
                    return g;
                var t = tokens(r.producer, r.name);
                var c = tok.filter(function (x) { return (Number(x.b.vintage) || null) === (r.vintage || null); }).map(function (x) { return ({ b: x.b, s: similar(t, x.t) }); }).filter(function (x) { return x.s >= 0.6; }).sort(function (x, y) { return y.s - x.s; });
                return c.length ? existing.filter(function (b) { return keyOf(b.producer, b.name, b.vintage) === keyOf(c[0].b.producer, c[0].b.name, c[0].b.vintage); }) : null;
            };
            var add = [], update = [], remove = [], seen = /* @__PURE__ */ new Set();
            var same = 0, unmatched = 0, slots = freeSlots.slice();
            var newRow = function (r, quantity, base) {
                var slot = slots.length ? slots.shift() : null;
                return { name: r.name, producer: r.producer || null, vintage: r.vintage || null, country: r.country || null, region: r.region || null, wine_type: TYPE_MAP[norm(r.type)] || (r.type || base && base.wine_type || null), category: "Vin", bottle_size: base && base.bottle_size || "75 cl", quantity: slot ? 1 : quantity, vivino_url: r.url || base && base.vivino_url || null, location_kind: slot ? "cave" : "placard", slot: slot || null, place_label: slot ? null : "\xC0 ranger", purchase_price: r.price || null, drinking_window: r.drink || null, notes: r.rating || r.comment ? noteOf(r) : null, external_id: r.id ? "vivino-" + r.id : null };
            };
            var _loop_5 = function (r) {
                var g = findRows(r);
                if (!g) {
                    if (!cellarFile || !(r.qty > 0)) {
                        unmatched++;
                        return "continue";
                    }
                    for (var i = 0; i < r.qty; i++) {
                        var n = newRow(r, 1);
                        add.push(n);
                    }
                    return "continue";
                }
                g.forEach(function (b) { return seen.add(b.id); });
                var changed = false;
                var line = r.rating || r.comment ? noteOf(r) : "";
                g.forEach(function (b) {
                    var patch = {};
                    if (line) {
                        var old = String(b.notes || "").split("\n").filter(function (l) { return !/^Vivino\b/.test(l.trim()); }).join("\n").trim(), nn = [old, line].filter(Boolean).join("\n");
                        if (nn !== (b.notes || ""))
                            patch.notes = nn;
                    }
                    if (r.url && !b.vivino_url)
                        patch.vivino_url = r.url;
                    if (r.drink && !b.drinking_window)
                        patch.drinking_window = r.drink;
                    if (Object.keys(patch).length) {
                        update.push({ id: b.id, name: b.name, patch: patch });
                        changed = true;
                    }
                });
                if (cellarFile && r.qty > 0) {
                    var T = g.reduce(function (t, b) { return t + qtyOf(b); }, 0), diff = r.qty - T;
                    if (diff > 0) {
                        for (var i = 0; i < diff; i++)
                            add.push(newRow(r, 1, g[0]));
                        changed = true;
                    }
                    else if (diff < 0) {
                        var need_1 = -diff;
                        changed = true;
                        __spreadArray([], __read(g), false).sort(function (x, y) { return (SLOT_ROW(x) ? 1 : 0) - (SLOT_ROW(y) ? 1 : 0); }).forEach(function (b) {
                            if (need_1 <= 0)
                                return;
                            var take = Math.min(qtyOf(b), need_1);
                            need_1 -= take;
                            remove.push({ id: b.id, name: b.name, vintage: b.vintage, slot: SLOT_ROW(b) ? b.slot : null, newQty: qtyOf(b) - take });
                        });
                    }
                }
                if (!changed)
                    same++;
            };
            try {
                for (var rows_2 = __values(rows), rows_2_1 = rows_2.next(); !rows_2_1.done; rows_2_1 = rows_2.next()) {
                    var r = rows_2_1.value;
                    _loop_5(r);
                }
            }
            catch (e_19_1) { e_19 = { error: e_19_1 }; }
            finally {
                try {
                    if (rows_2_1 && !rows_2_1.done && (_e = rows_2.return)) _e.call(rows_2);
                }
                finally { if (e_19) throw e_19.error; }
            }
            if (cellarFile)
                existing.forEach(function (b) {
                    if (!seen.has(b.id) && !remove.some(function (x) { return x.id === b.id; }))
                        remove.push({ id: b.id, name: b.name, vintage: b.vintage, slot: SLOT_ROW(b) ? b.slot : null, newQty: 0, absent: true });
                });
            return { add: add, update: update, remove: remove, same: same, unmatched: unmatched, missing: remove.filter(function (x) { return x.absent; }).length };
        }
        var isCellarFile = function (csvRows, fileName) {
            if (fileName === void 0) { fileName = ""; }
            var h = csvRows[0] ? Object.keys(csvRows[0]).join("|") : "";
            return /quantity|qty|bottles|quantite/.test(h) || /cellar|cave/i.test(fileName) || !/rating|review|comment|note/.test(h);
        };
        return { parseCSV: parseCSV, vivinoId: vivinoId, keyOf: keyOf, readRows: readRows, planSync: planSync, isCellarFile: isCellarFile };
    })();
    __m.drink = (function () {
        var norm = __m.util.norm;
        var CAVE_TEMP = 18;
        var RULES = {
            Rouge: [
                [/barolo|barbaresco|brunello|amarone|sassicaia|taurasi/, 8, 25, "grand vin italien"],
                [/pauillac|saint.?julien|margaux|saint.?estephe|pomerol|pessac|grand cru classe|premier cru classe/, 7, 22, "grand Bordeaux"],
                [/saint.?emilion|haut.?medoc|medoc|listrac|moulis|graves|fronsac|canon/, 5, 15, "Bordeaux"],
                [/chambertin|romanee|musigny|echezeaux|clos vougeot|corton|richebourg|grands.?echezeaux/, 8, 25, "grand cru de Bourgogne"],
                [/gevrey|nuits|vosne|chambolle|volnay|pommard|aloxe|savigny|beaune|morey|santenay|chorey|marsannay|bourgogne/, 4, 12, "Bourgogne"],
                [/crozes|saint.?joseph/, 3, 10, "Rh\xF4ne nord"],
                [/hermitage|cote.?rotie|cornas/, 7, 22, "Rh\xF4ne nord (grand)"],
                [/chateauneuf|gigondas|vacqueyras|vinsobres|rasteau|cairanne/, 4, 14, "Rh\xF4ne sud"],
                [/cotes du rhone|ventoux|luberon|costieres|lirac|tavel|duche d uzes/, 2, 7, "C\xF4tes-du-Rh\xF4ne"],
                [/moulin.?a.?vent|morgon|fleurie|brouilly|chiroubles|julienas|chenas|regnie|saint.?amour/, 2, 7, "cru du Beaujolais"],
                [/beaujolais/, 0, 3, "Beaujolais"],
                [/chinon|bourgueil|saumur|anjou|touraine|cabernet franc/, 2, 9, "Loire"],
                [/cahors|madiran|malbec|irouleguy|tursan/, 4, 13, "Sud-Ouest"],
                [/bergerac|buzet|gaillac|fronton|saint.?mont|marmandais|pecharmant/, 2, 8, "Sud-Ouest"],
                [/languedoc|minervois|corbieres|fitou|faugeres|saint.?chinian|pic saint.?loup|roussillon|collioure|cotes du roussillon|terrasses du larzac|la clape/, 3, 10, "Languedoc-Roussillon"],
                [/provence|bandol|cotes de provence|coteaux varois|pierrevert/, 2, 8, "Provence"],
                [/gran reserva/, 8, 20, "Rioja Gran Reserva"],
                [/reserva|rioja|ribera|priorat/, 4, 14, "Espagne"],
                [/chianti|sangiovese|montepulciano|valpolicella|primitivo|nero d avola|rosso|barbera|dolcetto/, 3, 9, "Italie"],
                [/bordeaux|castillon|cotes de bourg|blaye|entre.?deux.?mers/, 3, 10, "Bordeaux"],
                [/savoie|mondeuse|arbois|jura/, 2, 7, "Savoie / Jura"],
                [/alsace|pinot noir/, 2, 7, "Pinot noir"]
            ],
            Blanc: [
                [/montrachet|corton.?charlemagne|meursault|puligny|chassagne/, 5, 16, "grand blanc de Bourgogne"],
                [/chablis/, 2, 9, "Chablis"],
                [/pouilly.?fuisse|saint.?veran|macon|vire|bourgogne|rully|montagny|aligote/, 2, 8, "Bourgogne blanc"],
                [/condrieu|hermitage|saint.?joseph|crozes/, 3, 12, "Rh\xF4ne nord blanc"],
                [/cotes du rhone|ventoux|luberon|chateauneuf/, 1, 5, "Rh\xF4ne blanc"],
                [/savennieres|vouvray|montlouis|chenin|coteaux du layon/, 3, 15, "chenin de Loire"],
                [/sancerre|pouilly.?fume|menetou|quincy|reuilly|sauvignon/, 1, 4, "Sauvignon"],
                [/muscadet|gros plant/, 1, 5, "Muscadet"],
                [/riesling|alsace|pinot gris|gewurztraminer|sylvaner|muscat/, 3, 12, "Alsace"],
                [/vin jaune/, 10, 50, "vin jaune"],
                [/savagnin|jura|arbois|chateau.?chalon/, 4, 15, "Jura"],
                [/pessac|graves|haut.?brion|chevalier|sauternes/, 4, 15, "Bordeaux blanc de garde"],
                [/bordeaux|entre.?deux.?mers/, 1, 5, "Bordeaux blanc"],
                [/picpoul|gascogne|colombard|igp|pays d oc|vin de france|chardonnay/, 1, 4, "blanc de fra\xEEcheur"],
                [/languedoc|roussillon|corbieres|minervois/, 1, 6, "Languedoc"],
                [/provence/, 1, 3, "Provence"]
            ],
            "Ros\xE9": [[/bandol/, 1, 4, "ros\xE9 de Bandol"], [/tavel/, 1, 4, "ros\xE9 de Tavel"], [/./, 0, 2, "ros\xE9"]],
            Effervescent: [
                [/champagne.*(millesime|vintage|grand cru)|millesime.*champagne|dom perignon|cristal|clicquot la grande|krug/, 5, 18, "champagne mill\xE9sim\xE9"],
                [/champagne/, 0, 4, "champagne non mill\xE9sim\xE9"],
                [/cremant|prosecco|cava|asti|blanquette|clairette|petillant|franciacorta|pet nat|mousseux/, 0, 3, "effervescent de fra\xEEcheur"],
                [/./, 0, 3, "effervescent"]
            ],
            Liquoreux: [[/sauternes|barsac|monbazillac|tokaj|jurancon|coteaux du layon|quarts de chaume|bonnezeaux|vendanges tardives|selection de grains/, 6, 30, "grand liquoreux"], [/./, 4, 20, "vin doux"]],
            "Fortifi\xE9": [[/vintage|colheita/, 15, 50, "porto vintage"], [/lbv|late bottled/, 4, 15, "porto LBV"], [/tawny|ruby|porto|port/, 0, 20, "porto"], [/banyuls|maury|rivesaltes|muscat de/, 3, 25, "vin doux naturel"], [/madere|madeira/, 10, 80, "mad\xE8re"], [/xeres|sherry|jerez|fino|amontillado/, 0, 15, "x\xE9r\xE8s"], [/./, 3, 25, "vin fortifi\xE9"]]
        };
        var STATES = {
            drink: { color: "#2e9e4f", label: "\xC0 consommer", short: "Vert" },
            keep: { color: "#e8892b", label: "\xC0 conserver", short: "Orange" },
            past: { color: "#d33a3a", label: "Apr\xE8s apog\xE9e", short: "Rouge" },
            unknown: { color: "#9aa3a8", label: "Maturit\xE9 inconnue", short: "Gris" }
        };
        var years = function (t) { return (String(t || "").match(/(?:19|20)\d{2}/g) || []).map(Number); };
        function drinkStatus(b, now) {
            if (now === void 0) { now = new Date(); }
            var year = now.getFullYear();
            if (!b || b.wine_type === "Spiritueux" || b.category === "Spiritueux")
                return __spreadProps(__spreadValues({ state: "unknown" }, STATES.unknown), { label: "Se conserve", why: "Spiritueux : pas d\u2019\xE9volution en bouteille ferm\xE9e." });
            var vintage = Number(b.vintage) || null;
            var type = RULES[b.wine_type] ? b.wine_type : "Rouge";
            var text = norm([b.name, b.producer, b.region, b.country, b.notes].join(" ")).replace(/[^a-z0-9 ]/g, " ");
            var from, to, why;
            var w = years(b.drinking_window);
            if (w.length >= 2) {
                var base2 = vintage || w[0];
                from = w[0] - base2;
                to = w[1] - base2;
                why = "Fen\u00EAtre indiqu\u00E9e sur la fiche : ".concat(w[0], "\u2013").concat(w[1], ".");
            }
            else if (w.length === 1 && vintage) {
                from = 0;
                to = w[0] - vintage;
                why = "\u00C0 boire avant ".concat(w[0], " (fiche).");
            }
            else {
                var rule = RULES[type].find(function (r) { return r[0].test(text); }) || __spreadArray([null], __read({ Rouge: [3, 8, "rouge"], Blanc: [2, 5, "blanc"] }[type] || [2, 8, "vin"]), false);
                from = rule[1];
                to = rule[2];
                why = "Estimation : ".concat(rule[3], " (").concat(from, "\u2013").concat(to, " ans apr\u00E8s le mill\u00E9sime).");
                if (!vintage && type === "Effervescent" && b.acquired_on)
                    vintage = Number(String(b.acquired_on).slice(0, 4)) || null;
            }
            if (!vintage)
                return __spreadProps(__spreadValues({ state: "unknown" }, STATES.unknown), { why: "Mill\xE9sime inconnu : impossible d\u2019estimer la maturit\xE9." });
            var age = year - vintage, ready = vintage + from, end = vintage + to, peak = Math.round(vintage + from + (to - from) * 0.45);
            var base = { from: ready, to: end, peak: peak, age: age, why: why };
            if (age < from)
                return __spreadProps(__spreadValues(__spreadValues({ state: "keep" }, STATES.keep), base), { detail: "\u00C0 garder jusqu\u2019en ".concat(ready, " (apog\u00E9e vers ").concat(peak, ").") });
            if (age > to)
                return __spreadProps(__spreadValues(__spreadValues({ state: "past" }, STATES.past), base), { detail: "Apog\u00E9e d\u00E9pass\u00E9e depuis ".concat(end, " : \u00E0 boire sans attendre.") });
            return __spreadProps(__spreadValues(__spreadValues({ state: "drink" }, STATES.drink), base), { label: to - age <= 1 && to > from ? "\xC0 consommer vite" : "\xC0 consommer", detail: "Pr\u00EAt jusqu\u2019en ".concat(end, " (apog\u00E9e vers ").concat(peak, ").") });
        }
        var drinkSummary = function (list) { return list.reduce(function (o, b) {
            var s = drinkStatus(b).state;
            o[s] = (o[s] || 0) + (Number(b.quantity) || 1);
            return o;
        }, { drink: 0, keep: 0, past: 0, unknown: 0 }); };
        return { CAVE_TEMP: CAVE_TEMP, STATES: STATES, drinkStatus: drinkStatus, drinkSummary: drinkSummary };
    })();
    __m.recipes = (function () {
        var _d = __m.util, $ = _d.$, $$ = _d.$$, esc = _d.esc, toast = _d.toast, openModal = _d.openModal, closeModal = _d.closeModal, formDialog = _d.formDialog, compressImage = _d.compressImage, ymd = _d.ymd, DAYS = _d.DAYS;
        var db = __m.db;
        var _e = __m.scan, scanBox = _e.scanBox, bindScan = _e.bindScan, fillForm = _e.fillForm, ocr = _e.ocr, parseRecipe = _e.parseRecipe;
        var _f = __m.ideas, openIdea = _f.openIdea, openMarmitonSearch = _f.openMarmitonSearch;
        var _g = __m.ext, randomMeal = _g.randomMeal, randomCocktail = _g.randomCocktail, MEAL_CATS = _g.MEAL_CATS;
        var importRecipes = __m.seed.importRecipes;
        var _h = __m.shopping, addIngredients = _h.addIngredients, harmonizeIngredients = _h.harmonizeIngredients;
        var CATEGORIES = ["Entr\xE9e", "Plat", "Dessert", "Accompagnement", "Ap\xE9ro", "Brunch", "Cocktail avec alcool", "Cocktail sans alcool"];
        var cat = "", query = "", favOnly = false;
        var recipes = function () { return db.store.t.recipes; };
        var filtered = function () {
            var q = query.toLowerCase();
            return recipes().filter(function (r) { return (!cat || r.category === cat) && (!favOnly || r.favorite) && (!q || [r.title, r.ingredients, r.category].join(" ").toLowerCase().includes(q)); }).sort(function (a, b) { return a.title.localeCompare(b.title, "fr"); });
        };
        var minutes = function (r) { return r.total_minutes || (r.prep_minutes || 0) + (r.cook_minutes || 0) || null; };
        var cardHTML = function (r) { return "<button class=\"rcard glass\" data-id=\"".concat(r.id, "\">\n  ").concat(r.photo_url ? "<img src=\"".concat(esc(r.photo_url), "\" alt=\"\" loading=\"lazy\">") : "<div class=\"noimg script\">".concat(esc(r.title.slice(0, 1)), "</div>"), "\n  <div class=\"rbody\"><b>").concat(esc(r.title), "</b><small>").concat(esc(r.category || "")).concat(minutes(r) ? " \u00B7 ".concat(minutes(r), " min") : "").concat(r.servings ? " \u00B7 ".concat(r.servings, " pers.") : "", "</small></div>").concat(r.favorite ? '<span class="fav">\u2665</span>' : "", "</button>"); };
        var gridHTML = function () { return filtered().map(cardHTML).join("") || '<div class="empty">Aucune recette trouv\xE9e.</div>'; };
        function html() {
            var mealCat = MEAL_CATS[cat] ? cat : "Plat";
            var imp = recipes().length === 0 ? "<div class=\"card glass accent\"><h3 class=\"script\">Premier d\u00E9marrage</h3><p>Votre sauvegarde MyRecipeBox (81 recettes avec photos) est pr\u00EAte \u00E0 \u00EAtre import\u00E9e.</p><button class=\"btn primary\" id=\"impRec\">Importer mes recettes</button></div>" : "";
            return "".concat(imp, "<div class=\"bar wrapbar\">\n    <input type=\"search\" id=\"rq\" placeholder=\"Rechercher une recette ou un ingr\u00E9dient\u2026\" value=\"").concat(esc(query), "\">\n    <button class=\"btn\" id=\"ideaMeal\">Id\u00E9e de ").concat(mealCat.toLowerCase(), "</button>\n    <button class=\"btn\" id=\"searchMarm\">Chercher sur Marmiton</button><button class=\"btn\" id=\"ideaAlc\">Cocktail</button><button class=\"btn\" id=\"ideaNoAlc\">Sans alcool</button>\n    <button class=\"btn\" id=\"harmBtn\" title=\"\u00C9crire tous les ingr\u00E9dients de la m\u00EAme fa\u00E7on\">Harmoniser</button><button class=\"btn\" id=\"scanRec\">Scanner une recette</button><button class=\"btn primary\" id=\"addRec\">\uFF0B Recette</button></div>\n  <div class=\"chips\" id=\"rchips\"><button data-c=\"\" class=\"").concat(!cat && !favOnly ? "on" : "", "\">Toutes (").concat(recipes().length, ")</button><button data-fav class=\"").concat(favOnly ? "on" : "", "\">\u2665 Favorites</button>\n    ").concat(CATEGORIES.map(function (c) { return "<button data-c=\"".concat(esc(c), "\" class=\"").concat(cat === c ? "on" : "", "\">").concat(esc(c), "</button>"); }).join(""), "</div>\n  <div class=\"rgrid\" id=\"rgrid\">").concat(gridHTML(), "</div>");
        }
        function lines(t) {
            return String(t || "").split(/\r?\n/).map(function (s) { return s.trim(); }).filter(Boolean);
        }
        function openRecipe(id) {
            var _this = this;
            var r = recipes().find(function (x) { return x.id === id; });
            if (!r)
                return;
            var chips = [r.category, r.servings && "".concat(r.servings, " pers."), r.prep_minutes && "pr\u00E9paration ".concat(r.prep_minutes, " min"), r.cook_minutes && "cuisson ".concat(r.cook_minutes, " min")].filter(Boolean);
            openModal("<div class=\"detail recipe\">\n    ".concat(r.photo_url ? "<img class=\"rphoto\" src=\"".concat(esc(r.photo_url), "\" alt=\"\">") : "", "\n    <div class=\"rhead\"><h2 class=\"script\">").concat(esc(r.title), "</h2><button class=\"iconbtn\" data-act=\"fav\" aria-label=\"Favori\">").concat(r.favorite ? "\u2665" : "\u2661", "</button></div>\n    <div class=\"chips static\">").concat(chips.map(function (c) { return "<span class=\"chip\">".concat(esc(c), "</span>"); }).join(""), "</div>\n    <div class=\"stars\" data-stars>").concat([1, 2, 3, 4, 5].map(function (n) { return "<button data-star=\"".concat(n, "\" class=\"").concat(n <= (r.rating || 0) ? "on" : "", "\" aria-label=\"").concat(n, " \u00E9toiles\">\u2605</button>"); }).join(""), "</div>\n    ").concat(r.description ? "<p>".concat(esc(r.description), "</p>") : "", "\n    <div class=\"two\"><div><h4>Ingr\u00E9dients</h4><ul>").concat(lines(r.ingredients).map(function (l) { return "<li>".concat(esc(l), "</li>"); }).join("") || '<li class="muted">\u2014</li>', "</ul></div>\n    <div><h4>Pr\u00E9paration</h4>").concat(lines(r.instructions).map(function (l, i) { return "<p><b class=\"num\">".concat(i + 1, "</b> ").concat(esc(l), "</p>"); }).join("") || '<p class="muted">\u2014</p>', "</div></div>\n    ").concat(r.notes ? "<h4>Notes</h4><p>".concat(esc(r.notes), "</p>") : "").concat(r.nutrition ? "<details><summary>Valeurs nutritionnelles</summary><pre>".concat(esc(r.nutrition), "</pre></details>") : "", "\n    ").concat(r.source_url ? "<p><a href=\"".concat(esc(r.source_url), "\" target=\"_blank\" rel=\"noopener\">Recette d\u2019origine \u2197</a></p>") : "", "\n    <div class=\"formactions wrap\"><button class=\"btn\" data-act=\"plan\">Planifier</button><button class=\"btn\" data-act=\"shop\">Ajouter aux courses</button><span class=\"grow\"></span>\n      <button class=\"btn\" data-act=\"edit\">Modifier</button><button class=\"btn ghost\" data-close>Fermer</button></div></div>"), {
                wide: true,
                onMount: function (root) {
                    $("[data-close]", root).onclick = closeModal;
                    root.onclick = function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, star, n, a, n;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    star = e.target.closest("[data-star]");
                                    if (!star) return [3 /*break*/, 2];
                                    n = +star.dataset.star;
                                    return [4 /*yield*/, db.patch("recipes", r.id, { rating: n === r.rating ? 0 : n })];
                                case 1:
                                    _d.sent();
                                    return [2 /*return*/, openRecipe(id)];
                                case 2:
                                    a = (_a = e.target.closest("[data-act]")) == null ? void 0 : _a.dataset.act;
                                    if (!a)
                                        return [2 /*return*/];
                                    if (!(a === "fav")) return [3 /*break*/, 4];
                                    return [4 /*yield*/, db.patch("recipes", r.id, { favorite: !r.favorite })];
                                case 3:
                                    _d.sent();
                                    openRecipe(id);
                                    _d.label = 4;
                                case 4:
                                    if (a === "edit")
                                        editRecipe(r);
                                    if (!(a === "shop")) return [3 /*break*/, 6];
                                    return [4 /*yield*/, addIngredients(r)];
                                case 5:
                                    n = _d.sent();
                                    toast(n ? "".concat(n, " ingr\u00E9dient").concat(n > 1 ? "s" : "", " ajout\u00E9").concat(n > 1 ? "s" : "", " aux courses") : "D\xE9j\xE0 dans la liste de courses");
                                    _d.label = 6;
                                case 6:
                                    if (a === "plan")
                                        planRecipe(r);
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                }
            });
        }
        function planRecipe(r) {
            var _this = this;
            formDialog({
                title: "Planifier \xAB " + r.title + " \xBB",
                submitLabel: "Planifier",
                fields: [{ name: "meal_date", label: "Jour", type: "date", required: true }, { name: "meal_type", label: "Repas", type: "select", options: [["soir", "D\xEEner"], ["midi", "D\xE9jeuner"]] }, { name: "servings", label: "Portions", type: "number" }],
                values: { meal_date: ymd(/* @__PURE__ */ new Date()), meal_type: "soir", servings: 3 },
                onSubmit: function (v) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0: return [4 /*yield*/, db.add("meal_plans", __spreadProps(__spreadValues({}, v), { recipe_id: r.id, title: r.title }))];
                            case 1:
                                _d.sent();
                                toast("Ajout\xE9 au menu");
                                return [2 /*return*/];
                        }
                    });
                }); }
            });
        }
        function editRecipe(r, opts) {
            var _this = this;
            if (r === void 0) { r = {}; }
            if (opts === void 0) { opts = {}; }
            formDialog({
                extra: r.id ? "" : scanBox("Remplir depuis une photo de la recette"),
                onMount: function (root, form) {
                    bindScan(root, function (file, msg) { return __awaiter(_this, void 0, void 0, function () {
                        var p, _d;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    _d = parseRecipe;
                                    return [4 /*yield*/, ocr(file, msg)];
                                case 1:
                                    p = _d.apply(void 0, [_e.sent()]);
                                    return [2 /*return*/, fillForm(form, p)];
                            }
                        });
                    }); });
                    if (opts.scan) {
                        var cam = root.querySelector("#scanCam");
                        if (cam)
                            cam.click();
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
                danger: r.id ? { label: "Supprimer", confirm: "Supprimer cette recette ?", run: function () { return db.del("recipes", r.id); } } : null,
                onSubmit: function (v) { return __awaiter(_this, void 0, void 0, function () {
                    var photo, _d, _e, _f;
                    return __generator(this, function (_g) {
                        switch (_g.label) {
                            case 0:
                                photo = v.photo;
                                delete v.photo;
                                if (!photo) return [3 /*break*/, 3];
                                _d = v;
                                _f = (_e = db).uploadPhoto;
                                return [4 /*yield*/, compressImage(photo)];
                            case 1: return [4 /*yield*/, _f.apply(_e, [_g.sent(), "recipes"])];
                            case 2:
                                _d.photo_url = _g.sent();
                                _g.label = 3;
                            case 3:
                                v.total_minutes = (v.prep_minutes || 0) + (v.cook_minutes || 0) || null;
                                if (!r.id) return [3 /*break*/, 5];
                                return [4 /*yield*/, db.patch("recipes", r.id, v)];
                            case 4:
                                _g.sent();
                                return [3 /*break*/, 7];
                            case 5: return [4 /*yield*/, db.add("recipes", v)];
                            case 6:
                                _g.sent();
                                _g.label = 7;
                            case 7:
                                toast("Recette enregistr\xE9e \u2014 synchronis\xE9e");
                                return [2 /*return*/];
                        }
                    });
                }); }
            });
        }
        function bind(root, rerender) {
            var _this = this;
            root.onclick = function (e) {
                var c = e.target.closest(".rcard");
                if (c)
                    return openRecipe(c.dataset.id);
            };
            $("#rchips", root).onclick = function (e) {
                var b = e.target.closest("button");
                if (!b)
                    return;
                if ("fav" in b.dataset)
                    favOnly = !favOnly;
                else {
                    cat = b.dataset.c;
                    favOnly = false;
                }
                rerender();
            };
            var q = $("#rq", root);
            q.oninput = function () {
                query = q.value;
                $("#rgrid", root).innerHTML = gridHTML();
            };
            $("#addRec", root).onclick = function () { return editRecipe(); };
            $("#scanRec", root).onclick = function () { return editRecipe({}, { scan: true }); };
            $("#harmBtn", root).onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                var n, _d, _e, r, h, e_20_1;
                var e_20, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            n = 0;
                            _g.label = 1;
                        case 1:
                            _g.trys.push([1, 6, 7, 8]);
                            _d = __values(recipes()), _e = _d.next();
                            _g.label = 2;
                        case 2:
                            if (!!_e.done) return [3 /*break*/, 5];
                            r = _e.value;
                            h = harmonizeIngredients(r.ingredients);
                            if (!(h && h !== r.ingredients)) return [3 /*break*/, 4];
                            return [4 /*yield*/, db.patch("recipes", r.id, { ingredients: h })];
                        case 3:
                            _g.sent();
                            n++;
                            _g.label = 4;
                        case 4:
                            _e = _d.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_20_1 = _g.sent();
                            e_20 = { error: e_20_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                            }
                            finally { if (e_20) throw e_20.error; }
                            return [7 /*endfinally*/];
                        case 8:
                            toast(n ? "".concat(n, " recette").concat(n > 1 ? "s" : "", " harmonis\u00E9e").concat(n > 1 ? "s" : "") : "Tous les ingr\xE9dients sont d\xE9j\xE0 harmonis\xE9s");
                            return [2 /*return*/];
                    }
                });
            }); };
            $("#ideaMeal", root).onclick = function () {
                var k = MEAL_CATS[cat] ? cat : "Plat";
                openIdea(function () { return randomMeal(MEAL_CATS[k]); }, { title: "Id\u00E9e de ".concat(k.toLowerCase()), saveCategory: k });
            };
            $("#searchMarm", root).onclick = function () { return openMarmitonSearch(query); };
            $("#ideaAlc", root).onclick = function () { return openIdea(function () { return randomCocktail({ alcoholic: true }); }, { title: "Id\xE9e de cocktail" }); };
            $("#ideaNoAlc", root).onclick = function () { return openIdea(function () { return randomCocktail({ alcoholic: false }); }, { title: "Id\xE9e de cocktail sans alcool" }); };
            var imp = $("#impRec", root);
            if (imp)
                imp.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                    var n, err_10;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                imp.disabled = true;
                                imp.textContent = "Import en cours\u2026";
                                _d.label = 1;
                            case 1:
                                _d.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, importRecipes()];
                            case 2:
                                n = _d.sent();
                                toast("".concat(n, " recettes import\u00E9es"));
                                return [3 /*break*/, 4];
                            case 3:
                                err_10 = _d.sent();
                                toast(err_10.message, "err");
                                imp.disabled = false;
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); };
        }
        return { CATEGORIES: CATEGORIES, cardHTML: cardHTML, html: html, openRecipe: openRecipe, editRecipe: editRecipe, bind: bind };
    })();
    __m.cellar = (function () {
        var _d = __m.util, $ = _d.$, $$ = _d.$$, esc = _d.esc, toast = _d.toast, openModal = _d.openModal, closeModal = _d.closeModal, formDialog = _d.formDialog, compressImage = _d.compressImage, pick = _d.pick, norm = _d.norm;
        var db = __m.db;
        var _e = __m.scan, scanBox = _e.scanBox, bindScan = _e.bindScan, fillForm = _e.fillForm, ocr = _e.ocr, parseWine = _e.parseWine;
        var openIdea = __m.ideas.openIdea;
        var _f = __m.ext, randomMeal = _f.randomMeal, randomCocktail = _f.randomCocktail, PAIRING = _f.PAIRING, SPIRIT_MAP = _f.SPIRIT_MAP;
        var importCellar = __m.seed.importCellar;
        var _g = __m.drink, drinkStatus = _g.drinkStatus, drinkSummary = _g.drinkSummary, STATES = _g.STATES, CAVE_TEMP = _g.CAVE_TEMP;
        var _h = __m.vivino, parseCSV = _h.parseCSV, readRows = _h.readRows, planSync = _h.planSync, isCellarFile = _h.isCellarFile;
        var TYPES = ["Rouge", "Blanc", "Ros\xE9", "Effervescent", "Liquoreux", "Fortifi\xE9", "Spiritueux"];
        var CATS = ["Vin", "Champagne", "Cr\xE9mant", "Whisky", "Rhum", "Gin", "Cognac", "Vodka", "Tequila", "Liqueur", "Autre"];
        var KIND_LABEL = { cave: "Cave \xE0 vin", placard: "Placard", exterieur: "Ext\xE9rieur" };
        var GLASS = {
            Rouge: ["#6b1230", "#7d1a1a"],
            Blanc: ["#a9b64a", "#d9c77a"],
            "Ros\xE9": ["#e39aae", "#e9b3c0"],
            Effervescent: ["#c9b36a", "#d8b23a"],
            Liquoreux: ["#d99a2b", "#e8c25a"],
            "Fortifi\xE9": ["#6e3a1c", "#3b1f10"],
            Spiritueux: ["#a8662f", "#2a2a2a"]
        };
        var view = "cave", query = "", typeFilter = "";
        var items = function () { return db.store.t.cellar_items; };
        var inCave = function () { return items().filter(function (b) { return b.location_kind === "cave"; }); };
        var slotInfo = function (n) { return "\u00C9tag\u00E8re ".concat(Math.ceil(n / 4), " \u00B7 position ").concat((n - 1) % 4 + 1); };
        var bottleTitle = function (b) { return [b.producer, b.name].filter(Boolean).join(" \u2014 "); };
        function cabinetSVG() {
            var bySlot = Object.fromEntries(inCave().filter(function (b) { return b.slot; }).map(function (b) { return [b.slot, b]; }));
            var s = "<svg class=\"cabinet\" viewBox=\"0 0 640 840\" role=\"img\" aria-label=\"Cave \u00E0 vin de 28 bouteilles\">\n  <defs>\n    <linearGradient id=\"steel\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#3a4558\"/><stop offset=\".5\" stop-color=\"#1f2733\"/><stop offset=\"1\" stop-color=\"#0f141b\"/></linearGradient>\n    <linearGradient id=\"inside\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#52698a\"/><stop offset=\".35\" stop-color=\"#2a3850\"/><stop offset=\"1\" stop-color=\"#151c2a\"/></linearGradient>\n    <linearGradient id=\"wood\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#d9a56b\"/><stop offset=\".5\" stop-color=\"#b9824a\"/><stop offset=\"1\" stop-color=\"#8a5a30\"/></linearGradient>\n    <linearGradient id=\"led\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\"><stop offset=\"0\" stop-color=\"#e6f3ff\" stop-opacity=\".55\"/><stop offset=\"1\" stop-color=\"#e6f3ff\" stop-opacity=\"0\"/></linearGradient>\n    <linearGradient id=\"glare\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"1\"><stop offset=\"0\" stop-color=\"#fff\" stop-opacity=\".18\"/><stop offset=\".35\" stop-color=\"#fff\" stop-opacity=\".02\"/><stop offset=\".55\" stop-color=\"#fff\" stop-opacity=\".1\"/><stop offset=\"1\" stop-color=\"#fff\" stop-opacity=\"0\"/></linearGradient>\n    <linearGradient id=\"chrome\" x1=\"0\" y1=\"0\" x2=\"1\" y2=\"0\"><stop offset=\"0\" stop-color=\"#8d98a8\"/><stop offset=\".5\" stop-color=\"#e3e9f2\"/><stop offset=\"1\" stop-color=\"#8d98a8\"/></linearGradient>\n  </defs>\n  <rect x=\"12\" y=\"10\" width=\"616\" height=\"800\" rx=\"38\" fill=\"url(#steel)\" stroke=\"#080b10\" stroke-width=\"2\"/>\n  <rect x=\"190\" y=\"26\" width=\"260\" height=\"36\" rx=\"11\" fill=\"#070b11\"/>\n  <text x=\"320\" y=\"50\" text-anchor=\"middle\" fill=\"#7fd0ff\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"16\" letter-spacing=\"1.5\">".concat(CAVE_TEMP, " \u00B0C \u00B7 ").concat(inCave().filter(function (b) { return b.slot; }).length, "/28</text>\n  <rect x=\"34\" y=\"74\" width=\"572\" height=\"700\" rx=\"16\" fill=\"url(#inside)\" stroke=\"#0a0f16\" stroke-width=\"3\"/>\n  <rect x=\"46\" y=\"80\" width=\"548\" height=\"5\" rx=\"2.5\" fill=\"#e8f4ff\"/><rect x=\"46\" y=\"85\" width=\"548\" height=\"70\" fill=\"url(#led)\"/>");
            for (var r = 0; r < 7; r++) {
                var base = 96 + r * 96 + 76;
                s += "<rect x=\"40\" y=\"".concat(base, "\" width=\"560\" height=\"14\" rx=\"3\" fill=\"url(#wood)\"/><rect x=\"40\" y=\"").concat(base + 14, "\" width=\"560\" height=\"6\" fill=\"#000\" opacity=\".25\"/>");
                s += "<text x=\"52\" y=\"".concat(base - 66, "\" fill=\"#bcd3f2\" opacity=\".55\" font-size=\"10\" font-family=\"system-ui,sans-serif\" letter-spacing=\"1\">\u00C9TAG\u00C8RE ").concat(r + 1, "</text>");
                var _loop_6 = function (c) {
                    var n = r * 4 + c + 1, x = 58 + c * 132, y = base - 40, b = bySlot[n];
                    var body = "M".concat(x + 8, ",").concat(y, " H").concat(x + 78, " Q").concat(x + 98, ",").concat(y + 2, " ").concat(x + 102, ",").concat(y + 13, " V").concat(y + 25, " Q").concat(x + 98, ",").concat(y + 36, " ").concat(x + 78, ",").concat(y + 38, " H").concat(x + 8, " Q").concat(x, ",").concat(y + 38, " ").concat(x, ",").concat(y + 30, " V").concat(y + 8, " Q").concat(x, ",").concat(y, " ").concat(x + 8, ",").concat(y, "Z");
                    s += "<g class=\"slot ".concat(b ? "filled" : "", "\" data-slot=\"").concat(n, "\" tabindex=\"0\" role=\"button\" aria-label=\"").concat(b ? esc(bottleTitle(b)) : "Emplacement libre " + n, "\"><title>").concat(b ? esc(bottleTitle(b) + (b.vintage ? " " + b.vintage : "")) : "Libre \u2014 " + slotInfo(n), "</title>");
                    if (b) {
                        var _d = __read(GLASS[b.wine_type] || GLASS.Rouge, 2), glass = _d[0], foil = _d[1];
                        s += "<path d=\"".concat(body, "\" fill=\"").concat(glass, "\" stroke=\"rgba(0,0,0,.45)\"/>\n          <rect x=\"").concat(x + 100, "\" y=\"").concat(y + 13, "\" width=\"28\" height=\"12\" rx=\"2\" fill=\"").concat(glass, "\" stroke=\"rgba(0,0,0,.4)\"/>\n          <rect x=\"").concat(x + 108, "\" y=\"").concat(y + 11.5, "\" width=\"20\" height=\"15\" rx=\"2\" fill=\"").concat(foil, "\"/>\n          <rect x=\"").concat(x + 16, "\" y=\"").concat(y + 6, "\" width=\"46\" height=\"26\" rx=\"3\" fill=\"#f4ecd9\"/>\n          <text x=\"").concat(x + 39, "\" y=\"").concat(y + 17.5, "\" text-anchor=\"middle\" font-size=\"6.5\" fill=\"#3b3226\" font-family=\"Georgia,serif\">").concat(esc((b.producer || b.name).length > 14 ? (b.producer || b.name).slice(0, 13) + "\u2026" : b.producer || b.name), "</text>\n          <text x=\"").concat(x + 39, "\" y=\"").concat(y + 27, "\" text-anchor=\"middle\" font-size=\"8\" font-weight=\"700\" fill=\"#7a2a2a\" font-family=\"Georgia,serif\">").concat(b.vintage || "NV", "</text>\n          <rect x=\"").concat(x + 6, "\" y=\"").concat(y + 3, "\" width=\"76\" height=\"4\" rx=\"2\" fill=\"#fff\" opacity=\".22\"/>\n          ").concat((function (d) { return d.state === "unknown" ? "" : "<circle cx=\"".concat(x + 70, "\" cy=\"").concat(y + 19, "\" r=\"5\" fill=\"").concat(d.color, "\" stroke=\"#fff\" stroke-width=\"1.5\"/>"); })(drinkStatus(b)));
                    }
                    else {
                        s += "<path d=\"".concat(body, "\" fill=\"rgba(255,255,255,.04)\" stroke=\"rgba(255,255,255,.2)\" stroke-dasharray=\"4 4\"/>\n          <rect x=\"").concat(x + 100, "\" y=\"").concat(y + 13, "\" width=\"28\" height=\"12\" rx=\"2\" fill=\"none\" stroke=\"rgba(255,255,255,.14)\" stroke-dasharray=\"3 3\"/>");
                    }
                    s += "<rect class=\"hit\" x=\"".concat(x - 4, "\" y=\"").concat(y - 6, "\" width=\"134\" height=\"58\" fill=\"transparent\"/>\n        <text x=\"").concat(x + 64, "\" y=\"").concat(base + 10.5, "\" text-anchor=\"middle\" font-size=\"9\" font-weight=\"600\" fill=\"#4a2c12\" font-family=\"system-ui,sans-serif\" pointer-events=\"none\">").concat(n, "</text></g>");
                };
                for (var c = 0; c < 4; c++) {
                    _loop_6(c);
                }
            }
            s += "<path d=\"M40,74 H330 L120,774 H40 Z\" fill=\"url(#glare)\" pointer-events=\"none\"/><path d=\"M420,74 H520 L300,774 H230 Z\" fill=\"url(#glare)\" opacity=\".6\" pointer-events=\"none\"/>\n  <rect x=\"34\" y=\"74\" width=\"572\" height=\"700\" rx=\"16\" fill=\"none\" stroke=\"#8fa6c4\" stroke-opacity=\".35\" stroke-width=\"2\" pointer-events=\"none\"/>\n  <rect x=\"610\" y=\"270\" width=\"10\" height=\"240\" rx=\"5\" fill=\"url(#chrome)\"/>\n  <g stroke=\"#0a0f16\" stroke-width=\"3\" opacity=\".7\">".concat([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(function (i) { return "<line x1=\"".concat(180 + i * 20, "\" y1=\"786\" x2=\"").concat(180 + i * 20, "\" y2=\"802\"/>"); }).join(""), "</g>\n  <rect x=\"60\" y=\"808\" width=\"46\" height=\"20\" rx=\"5\" fill=\"#0b0f15\"/><rect x=\"534\" y=\"808\" width=\"46\" height=\"20\" rx=\"5\" fill=\"#0b0f15\"/></svg>");
            return s;
        }
        var totalValue = function () { return items().reduce(function (t, b) { return t + (Number(b.estimated_value) || 0) * (b.quantity || 1); }, 0); };
        var stat = function (n, l) { return "<div class=\"stat glass\"><b>".concat(n, "</b><span>").concat(l, "</span></div>"); };
        var qty = function (b) { return b.quantity || 1; };
        var sum = function (a) { return a.reduce(function (t, b) { return t + qty(b); }, 0); };
        var drinkPill = function (b) {
            var d = drinkStatus(b);
            return d.state === "unknown" ? "" : "<span class=\"chip drink\" title=\"".concat(esc(d.detail || d.why), "\"><i style=\"background:").concat(d.color, "\"></i>").concat(d.label, "</span>");
        };
        function rowHTML(b) {
            var where = b.location_kind === "cave" ? b.slot ? slotInfo(b.slot) : "Cave \xB7 \xE0 placer" : [KIND_LABEL[b.location_kind], b.place_label].filter(Boolean).join(" \xB7 ");
            return "<button class=\"row bottle\" data-id=\"".concat(b.id, "\">").concat(b.photo_url ? "<img class=\"thumb\" src=\"".concat(esc(b.photo_url), "\" alt=\"\" loading=\"lazy\">") : "<span class=\"dot\" style=\"background:".concat((GLASS[b.wine_type] || GLASS.Rouge)[0], "\"></span>"), "\n    <span class=\"grow\"><b>").concat(esc(b.name), "</b> ").concat(b.vintage ? "<span class=\"muted\">".concat(b.vintage, "</span>") : "", "<br><small>").concat(esc([b.producer, b.wine_type, b.country].filter(Boolean).join(" \xB7 ")), "</small></span>\n    <span class=\"where\"><small>").concat(esc(where)).concat(b.position_note ? " \u2014 <i>".concat(esc(b.position_note), "</i>") : "", "</small></span>").concat(b.estimated_value ? "<span class=\"chip price\">".concat(Number(b.estimated_value).toLocaleString("fr-FR"), " \u20AC</span>") : "").concat(drinkPill(b)).concat(qty(b) > 1 ? "<span class=\"chip\">\u00D7".concat(qty(b), "</span>") : "", "</button>");
        }
        var b64blob = function (b64, mime) {
            var s = atob(b64), a = new Uint8Array(s.length);
            for (var i = 0; i < s.length; i++)
                a[i] = s.charCodeAt(i);
            return new Blob([a], { type: mime });
        };
        var labelQuery = function (b) { return [b.producer, b.name, b.vintage].filter(Boolean).join(" "); };
        var fnMissing = false;
        var timeout = function (p, ms, label) { return Promise.race([p, new Promise(function (_, rej) { return setTimeout(function () { return rej(new Error(label + " : pas de r\xE9ponse (" + ms / 1e3 + " s)")); }, ms); })]); };
        var words = function (t) { return norm(t).split(/[^a-z0-9]+/).filter(function (w) { return w.length > 2 && !/^(chateau|domaine|cuvee|vin|les|des|the|and|rouge|blanc|rose)$/.test(w); }); };
        function offLabel(b) {
            return __awaiter(this, void 0, void 0, function () {
                var q, r, want, best, bestScore, _loop_7, _d, _e, p, e_21_1;
                var e_21, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            q = [b.producer, b.name].filter(Boolean).join(" ");
                            return [4 /*yield*/, timeout(fetch("https://world.openfoodfacts.org/cgi/search.pl?search_simple=1&action=process&json=1&page_size=10&fields=product_name,brands,image_front_url,categories_tags&search_terms=" + encodeURIComponent(q)), 8e3, "Open Food Facts")];
                        case 1:
                            r = _g.sent();
                            if (!r.ok)
                                throw new Error("Open Food Facts " + r.status);
                            want = words(q);
                            if (!want.length)
                                return [2 /*return*/, null];
                            best = null, bestScore = 0;
                            _loop_7 = function (p) {
                                if (!p.image_front_url)
                                    return "continue";
                                var have = words((p.product_name || "") + " " + (p.brands || ""));
                                var hit = want.filter(function (w) { return have.includes(w); }).length, score = hit / want.length;
                                var wine = (p.categories_tags || []).some(function (t) { return /wine|vin|alcoholic|spirit/.test(t); });
                                if (score > bestScore && (score >= 0.6 || wine && score >= 0.5) && hit >= Math.min(2, want.length)) {
                                    best = p.image_front_url;
                                    bestScore = score;
                                }
                            };
                            _g.label = 2;
                        case 2:
                            _g.trys.push([2, 7, 8, 9]);
                            return [4 /*yield*/, r.json()];
                        case 3:
                            _d = __values.apply(void 0, [(_g.sent()).products || []]), _e = _d.next();
                            _g.label = 4;
                        case 4:
                            if (!!_e.done) return [3 /*break*/, 6];
                            p = _e.value;
                            _loop_7(p);
                            _g.label = 5;
                        case 5:
                            _e = _d.next();
                            return [3 /*break*/, 4];
                        case 6: return [3 /*break*/, 9];
                        case 7:
                            e_21_1 = _g.sent();
                            e_21 = { error: e_21_1 };
                            return [3 /*break*/, 9];
                        case 8:
                            try {
                                if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                            }
                            finally { if (e_21) throw e_21.error; }
                            return [7 /*endfinally*/];
                        case 9: return [2 /*return*/, best];
                    }
                });
            });
        }
        function vivinoViaRelay(b) {
            return __awaiter(this, void 0, void 0, function () {
                var r, h, m;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            if (!b.vivino_url || !/^https:\/\/(www\.)?vivino\.com\//.test(b.vivino_url))
                                return [2 /*return*/, null];
                            return [4 /*yield*/, timeout(fetch("https://api.allorigins.win/raw?url=" + encodeURIComponent(b.vivino_url)), 8e3, "relais Vivino")];
                        case 1:
                            r = _d.sent();
                            if (!r.ok)
                                return [2 /*return*/, null];
                            return [4 /*yield*/, r.text()];
                        case 2:
                            h = _d.sent();
                            m = h.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) || h.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
                            return [2 /*return*/, m ? m[1].startsWith("//") ? "https:" + m[1] : m[1] : null];
                    }
                });
            });
        }
        function labelFor(b) {
            return __awaiter(this, void 0, void 0, function () {
                var why, _d, data, error, r, e_22, u, e_23, u, e_24;
                var _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            why = "";
                            if (!!fnMissing) return [3 /*break*/, 6];
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 5, , 6]);
                            return [4 /*yield*/, timeout(db.store.sb.functions.invoke(window.FN_LABELS || "wine-labels", { body: { bottles: [{ id: b.id, url: b.vivino_url || void 0, query: labelQuery(b) }] } }), 2e4, "fonction wine-labels")];
                        case 2:
                            _d = _f.sent(), data = _d.data, error = _d.error;
                            if (error)
                                throw error;
                            r = data.results[0];
                            if (!r.ok) return [3 /*break*/, 4];
                            _e = {};
                            return [4 /*yield*/, db.uploadPhoto(b64blob(r.data, r.mime), "bottles", r.mime)];
                        case 3: return [2 /*return*/, (_e.url = _f.sent(), _e)];
                        case 4:
                            why = r.error;
                            return [3 /*break*/, 6];
                        case 5:
                            e_22 = _f.sent();
                            if (/not found|404|Failed to send|fetch|relay/i.test(e_22.message || ""))
                                fnMissing = true;
                            why = fnMissing ? "fonction \xAB wine-labels \xBB non install\xE9e" : e_22.message || "erreur";
                            return [3 /*break*/, 6];
                        case 6:
                            _f.trys.push([6, 8, , 9]);
                            return [4 /*yield*/, offLabel(b)];
                        case 7:
                            u = _f.sent();
                            if (u)
                                return [2 /*return*/, { url: u }];
                            why = why || "absente d\u2019Open Food Facts";
                            return [3 /*break*/, 9];
                        case 8:
                            e_23 = _f.sent();
                            why = why || e_23.message;
                            return [3 /*break*/, 9];
                        case 9:
                            _f.trys.push([9, 11, , 12]);
                            return [4 /*yield*/, vivinoViaRelay(b)];
                        case 10:
                            u = _f.sent();
                            if (u)
                                return [2 /*return*/, { url: u }];
                            return [3 /*break*/, 12];
                        case 11:
                            e_24 = _f.sent();
                            return [3 /*break*/, 12];
                        case 12: return [2 /*return*/, { error: why || "introuvable" }];
                    }
                });
            });
        }
        function fetchLabels(list, onProgress) {
            return __awaiter(this, void 0, void 0, function () {
                var done, fails, queue, worker;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            done = 0;
                            fails = [], queue = __spreadArray([], __read(list), false);
                            worker = function () { return __awaiter(_this, void 0, void 0, function () {
                                var _loop_8;
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            _loop_8 = function () {
                                                var b, r, _e, _f, same, e_25_1, e_26;
                                                var e_25, _g;
                                                return __generator(this, function (_h) {
                                                    switch (_h.label) {
                                                        case 0:
                                                            b = queue.shift();
                                                            _h.label = 1;
                                                        case 1:
                                                            _h.trys.push([1, 11, , 12]);
                                                            return [4 /*yield*/, labelFor(b)];
                                                        case 2:
                                                            r = _h.sent();
                                                            if (!r.url) {
                                                                fails.push({ b: b, error: r.error });
                                                                onProgress && onProgress(done, fails.length);
                                                                return [2 /*return*/, "continue"];
                                                            }
                                                            _h.label = 3;
                                                        case 3:
                                                            _h.trys.push([3, 8, 9, 10]);
                                                            _e = (e_25 = void 0, __values(items().filter(function (x) { return !x.photo_url && labelQuery(x) === labelQuery(b); }))), _f = _e.next();
                                                            _h.label = 4;
                                                        case 4:
                                                            if (!!_f.done) return [3 /*break*/, 7];
                                                            same = _f.value;
                                                            return [4 /*yield*/, db.patch("cellar_items", same.id, { photo_url: r.url })];
                                                        case 5:
                                                            _h.sent();
                                                            _h.label = 6;
                                                        case 6:
                                                            _f = _e.next();
                                                            return [3 /*break*/, 4];
                                                        case 7: return [3 /*break*/, 10];
                                                        case 8:
                                                            e_25_1 = _h.sent();
                                                            e_25 = { error: e_25_1 };
                                                            return [3 /*break*/, 10];
                                                        case 9:
                                                            try {
                                                                if (_f && !_f.done && (_g = _e.return)) _g.call(_e);
                                                            }
                                                            finally { if (e_25) throw e_25.error; }
                                                            return [7 /*endfinally*/];
                                                        case 10:
                                                            done++;
                                                            return [3 /*break*/, 12];
                                                        case 11:
                                                            e_26 = _h.sent();
                                                            fails.push({ b: b, error: e_26.message || "erreur" });
                                                            return [3 /*break*/, 12];
                                                        case 12:
                                                            onProgress && onProgress(done, fails.length);
                                                            return [2 /*return*/];
                                                    }
                                                });
                                            };
                                            _d.label = 1;
                                        case 1:
                                            if (!queue.length) return [3 /*break*/, 3];
                                            return [5 /*yield**/, _loop_8()];
                                        case 2:
                                            _d.sent();
                                            return [3 /*break*/, 1];
                                        case 3: return [2 /*return*/];
                                    }
                                });
                            }); };
                            return [4 /*yield*/, Promise.all([worker(), worker()])];
                        case 1:
                            _d.sent();
                            return [2 /*return*/, { done: done, fails: fails }];
                    }
                });
            });
        }
        function labelsSheet() {
            return __awaiter(this, void 0, void 0, function () {
                var seen, todo, paint, _d, done, fails, why;
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            seen = new Set(), todo = items().filter(function (b) { return !b.photo_url && !seen.has(labelQuery(b)) && seen.add(labelQuery(b)); });
                            if (!todo.length)
                                return [2 /*return*/, toast("Toutes les bouteilles ont d\xE9j\xE0 une \xE9tiquette")];
                            paint = function (d, f) {
                                var el = $("#lblProg");
                                if (el)
                                    el.textContent = "".concat(d + f, " / ").concat(todo.length, " trait\u00E9es \u00B7 ").concat(d, " \u00E9tiquette").concat(d > 1 ? "s" : "", " trouv\u00E9e").concat(d > 1 ? "s" : "", " \u00B7 ").concat(f, " introuvable").concat(f > 1 ? "s" : "");
                            };
                            openModal("<div class=\"ideabox\"><h2 class=\"script\">Recherche des \u00E9tiquettes</h2><div class=\"loading\"><span class=\"spinner\"></span> <span id=\"lblProg\">0 / ".concat(todo.length, " trait\u00E9es</span></div><p class=\"muted small\">Cela peut prendre une minute ; vous pouvez fermer cette fen\u00EAtre, la recherche continue.</p></div>"));
                            return [4 /*yield*/, fetchLabels(todo, paint)];
                        case 1:
                            _d = _e.sent(), done = _d.done, fails = _d.fails;
                            why = {};
                            fails.forEach(function (f) { return why[f.error] = (why[f.error] || 0) + 1; });
                            openModal("<h2 class=\"script\">".concat(done, " \u00E9tiquette").concat(done > 1 ? "s" : "", " r\u00E9cup\u00E9r\u00E9e").concat(done > 1 ? "s" : "", "</h2>").concat(fails.length ? "<p class=\"muted\">".concat(fails.length, " bouteille").concat(fails.length > 1 ? "s" : "", " sans \u00E9tiquette. Raisons :</p>\n    ").concat(Object.entries(why).map(function (_d) {
                                var _e = __read(_d, 2), k = _e[0], n = _e[1];
                                return "<p><b>".concat(n, "</b> \u00D7 ").concat(esc(k), "</p>");
                            }).join(""), "<p class=\"muted small\">Vous pouvez ajouter la photo \u00E0 la main (fiche de la bouteille \u203A Photo).</p><ul class=\"plain\">").concat(fails.slice(0, 40).map(function (f) { return "<li>".concat(esc(f.b.name), " ").concat(f.b.vintage || "", "</li>"); }).join(""), "</ul>") : "", "<div class=\"formactions\"><span class=\"grow\"></span><button class=\"btn primary\" data-close>OK</button></div>"), { onMount: function (r) {
                                    $("[data-close]", r).onclick = closeModal;
                                } });
                            return [2 /*return*/];
                    }
                });
            });
        }
        function drinkCard() {
            var sum2 = drinkSummary(items().filter(function (b) { return b.category !== "Spiritueux" && b.wine_type !== "Spiritueux"; }));
            var li = function (k) { return "<div class=\"drinkline\"><i style=\"background:".concat(STATES[k].color, "\"></i><b>").concat(sum2[k], "</b> ").concat(STATES[k].label.toLowerCase(), "</div>"); };
            return "<div class=\"card glass\"><h3>Maturit\u00E9 des bouteilles</h3>".concat(li("drink")).concat(li("keep")).concat(li("past")).concat(sum2.unknown ? li("unknown") : "", "\n    <p class=\"muted small\">Vert : \u00E0 boire maintenant. Orange : \u00E0 garder, pas encore pr\u00EAte. Rouge : apog\u00E9e d\u00E9pass\u00E9e, \u00E0 boire sans attendre. Estimation selon le type de vin, l\u2019appellation et le mill\u00E9sime ; une fen\u00EAtre saisie sur la fiche (ex. 2025\u20132032) est prioritaire.</p></div>");
        }
        function caveView() {
            var placed = inCave().filter(function (b) { return b.slot; }), loose = inCave().filter(function (b) { return !b.slot; });
            return "<div class=\"cave-layout\"><div class=\"cabinetwrap\">".concat(cabinetSVG(), "</div>\n   <div class=\"cave-side\"><div class=\"card glass\"><h3 class=\"script\">Ma cave \u00E0 vin</h3><p class=\"muted\">28 emplacements \u00B7 ").concat(placed.length, " occup\u00E9s \u00B7 ").concat(28 - placed.length, " libres. Touchez une bouteille pour voir sa fiche, ou un emplacement libre pour y ranger une bouteille.</p>\n     <p class=\"cavetemp\"><b>").concat(CAVE_TEMP, " \u00B0C</b> \u00B7 temp\u00E9rature de la cave</p>\n     <div class=\"legend\">").concat(TYPES.slice(0, 6).map(function (t) { return "<span><i style=\"background:".concat(GLASS[t][0], "\"></i>").concat(t, "</span>"); }).join(""), "</div></div>\n     ").concat(drinkCard(), "\n     <div class=\"card glass\"><h3>\u00C0 placer dans la cave (").concat(loose.length, ")</h3>").concat(loose.map(rowHTML).join("") || '<p class="muted">Toutes les bouteilles de la cave ont un emplacement.</p>', "</div></div></div>");
        }
        function groupedList(kind) {
            var list = items().filter(function (b) { return b.location_kind === kind; });
            var groups = {};
            list.forEach(function (b) {
                var _a;
                return (groups[_a = b.place_label || "Sans pr\xE9cision"] || (groups[_a] = [])).push(b);
            });
            var note = kind === "exterieur" ? "Indiquez la position pr\xE9cise (ex. \xAB 2e rack \xE0 gauche, dans la remise \xBB)." : "Rangement sans position pr\xE9cise : on note seulement le placard ou le carton.";
            return "<div class=\"card glass\"><h3 class=\"script\">".concat(kind === "placard" ? "Placards" : "Ext\xE9rieur", "</h3><p class=\"muted\">").concat(note, "</p>\n    <button class=\"btn primary\" data-add=\"").concat(kind, "\">\uFF0B Ajouter dans ").concat(kind === "placard" ? "un placard" : "l\u2019ext\xE9rieur", "</button></div>\n    ").concat(Object.entries(groups).map(function (_d) {
                var _e = __read(_d, 2), g = _e[0], l = _e[1];
                return "<div class=\"card glass\"><h3>".concat(esc(g), " <span class=\"chip\">").concat(sum(l), " bouteille").concat(sum(l) > 1 ? "s" : "", "</span></h3>").concat(l.map(rowHTML).join(""), "</div>");
            }).join("") || "<div class=\"empty\">Rien ici pour le moment.</div>");
        }
        function filtered() {
            var q = query.toLowerCase();
            return items().filter(function (b) { return (!typeFilter || b.wine_type === typeFilter) && (!q || [b.name, b.producer, b.country, b.region, b.vintage, b.place_label].join(" ").toLowerCase().includes(q)); }).sort(function (a, b) { return (a.producer || a.name).localeCompare(b.producer || b.name, "fr"); });
        }
        var listHTML = function () { return filtered().map(rowHTML).join("") || '<div class="empty">Aucune bouteille.</div>'; };
        function inventoryView() {
            var value = items().reduce(function (t, b) { return t + (Number(b.estimated_value) || 0) * qty(b); }, 0);
            return "<div class=\"card glass\"><div class=\"toolbar\"><input type=\"search\" id=\"cq\" placeholder=\"Rechercher (domaine, cuv\u00E9e, r\u00E9gion\u2026)\" value=\"".concat(esc(query), "\">\n    <select id=\"ctype\"><option value=\"\">Tous les types</option>").concat(TYPES.map(function (t) { return "<option ".concat(t === typeFilter ? "selected" : "", ">").concat(t, "</option>"); }).join(""), "</select></div>\n    <p class=\"muted small\">").concat(filtered().length, " r\u00E9f\u00E9rence").concat(filtered().length > 1 ? "s" : "").concat(value ? " \u00B7 valeur estim\u00E9e totale ".concat(value.toLocaleString("fr-FR"), " \u20AC") : "", "</p>\n    <div id=\"clist\">").concat(listHTML(), "</div></div>");
        }
        var recapSort = "pos", recapFilter = "";
        var posRank = function (b) { return b.location_kind === "cave" ? b.slot || 99 : b.location_kind === "placard" ? 200 : 300; };
        var posText = function (b) { return b.location_kind === "cave" ? b.slot ? "".concat(slotInfo(b.slot), " (n\u00B0").concat(b.slot, ")") : "Cave \xB7 \xE0 placer" : [KIND_LABEL[b.location_kind], b.place_label].filter(Boolean).join(" \xB7 "); };
        var MAT_RANK = { drink: 0, keep: 1, past: 2, unknown: 3 };
        function recapView() {
            var rows = items().map(function (b) { return ({ b: b, d: drinkStatus(b) }); });
            if (recapFilter)
                rows = rows.filter(function (x) { return x.d.state === recapFilter; });
            var cmp = {
                pos: function (x, y) { return posRank(x.b) - posRank(y.b) || String(x.b.place_label || "").localeCompare(String(y.b.place_label || ""), "fr"); },
                mat: function (x, y) { return MAT_RANK[x.d.state] - MAT_RANK[y.d.state] || posRank(x.b) - posRank(y.b); },
                name: function (x, y) { return bottleTitle(x.b).localeCompare(bottleTitle(y.b), "fr"); },
                year: function (x, y) { return (x.b.vintage || 9999) - (y.b.vintage || 9999); }
            }[recapSort];
            rows.sort(cmp);
            var opt = function (v, l, cur) { return "<option value=\"".concat(v, "\" ").concat(v === cur ? "selected" : "", ">").concat(l, "</option>"); };
            return "<div class=\"card glass\"><div class=\"toolbar\"><label class=\"muted small\">Trier par <select id=\"rsort\">".concat(opt("pos", "Position", recapSort)).concat(opt("mat", "\xC0 boire d\u2019abord", recapSort)).concat(opt("name", "Nom", recapSort)).concat(opt("year", "Ann\xE9e", recapSort), "</select></label>\n    <label class=\"muted small\">Afficher <select id=\"rfilter\">").concat(opt("", "Tout", recapFilter)).concat(opt("drink", "\xC0 consommer", recapFilter)).concat(opt("keep", "\xC0 conserver", recapFilter)).concat(opt("past", "Apr\xE8s apog\xE9e", recapFilter), "</select></label>\n    <span class=\"grow\"></span><button class=\"btn\" id=\"rprint\">Imprimer</button></div>\n    <div class=\"recap\"><table class=\"rtable\"><thead><tr><th>Position</th><th>Vin</th><th>Ann\u00E9e</th><th>Maturit\u00E9</th></tr></thead><tbody>").concat(rows.map(function (_d) {
                var b = _d.b, d = _d.d;
                return "<tr data-id=\"".concat(b.id, "\"><td>").concat(esc(posText(b)), "</td><td><b>").concat(esc(b.name), "</b>").concat(b.producer ? "<br><small class=\"muted\">".concat(esc(b.producer), "</small>") : "").concat(qty(b) > 1 ? " <small class=\"muted\">\u00D7 ".concat(qty(b), "</small>") : "", "</td><td>").concat(b.vintage || "\u2014", "</td><td>").concat(d.state === "unknown" ? '<span class="muted">\u2014</span>' : "<span class=\"chip drink\" title=\"".concat(esc(d.detail || d.why || ""), "\"><i style=\"background:").concat(d.color, "\"></i>").concat(d.label, "</span>"), "</td></tr>");
            }).join("") || '<tr><td colspan="4" class="muted">Aucune bouteille</td></tr>', "</tbody></table></div>\n    <p class=\"muted small\">").concat(rows.length, " ligne").concat(rows.length > 1 ? "s" : "", "</p></div>");
        }
        function html() {
            var all = items();
            var imp = all.length === 0 ? "<div class=\"card glass accent\"><h3 class=\"script\">Premier d\u00E9marrage</h3><p>Votre export Vivino (36 lignes : 30 bouteilles en cave, le reste en placard) est pr\u00EAt \u00E0 \u00EAtre import\u00E9.</p><button class=\"btn primary\" id=\"impCellar\">Importer ma cave Vivino</button></div>" : "";
            return "<div class=\"stats\">".concat(stat(sum(all), "bouteilles")).concat(stat(inCave().filter(function (b) { return b.slot; }).length + "/28", "cave \xE0 vin")).concat(stat(sum(all.filter(function (b) { return b.location_kind === "placard"; })), "en placard")).concat(stat(sum(all.filter(function (b) { return b.location_kind === "exterieur"; })), "\xE0 l\u2019ext\xE9rieur")).concat(stat(CAVE_TEMP + " \xB0C", "temp\xE9rature de la cave")).concat(stat(totalValue() ? totalValue().toLocaleString("fr-FR") + " \u20AC" : "\u2014", "valeur estim\xE9e"), "</div>\n  ").concat(imp, "\n  <div class=\"bar\"><div class=\"seg\" id=\"cseg\">").concat([["cave", "Cave \xE0 vin"], ["placard", "Placards"], ["exterieur", "Ext\xE9rieur"], ["liste", "R\xE9capitulatif"], ["tout", "Inventaire"]].map(function (_d) {
                var _e = __read(_d, 2), k = _e[0], l = _e[1];
                return "<button data-v=\"".concat(k, "\" class=\"").concat(view === k ? "on" : "", "\">").concat(l, "</button>");
            }).join(""), "</div>\n   <span class=\"grow\"></span><button class=\"btn\" id=\"scanBtn\">Scanner une bouteille</button><button class=\"btn\" id=\"vivSync\">Mettre \u00E0 jour depuis Vivino</button><button class=\"btn\" id=\"labelBtn\">\u00C9tiquettes</button><button class=\"btn\" id=\"priceBtn\">Prix des bouteilles</button><button class=\"btn\" id=\"cocktailBtn\">Id\u00E9e de cocktail</button><button class=\"btn primary\" data-add=\"").concat(view === "placard" || view === "exterieur" ? view : "cave", "\">\uFF0B Bouteille</button></div>\n  <div id=\"cview\">").concat(view === "cave" ? caveView() : view === "tout" ? inventoryView() : view === "liste" ? recapView() : groupedList(view), "</div>");
        }
        function bottleFields(b) {
            var taken = new Set(inCave().filter(function (x) { return x.slot && x.id !== b.id; }).map(function (x) { return x.slot; }));
            var slots = [["", "\u2014 \xE0 placer plus tard \u2014"]];
            for (var n = 1; n <= 28; n++)
                if (!taken.has(n))
                    slots.push([n, "n\u00B0".concat(n, " \u00B7 ").concat(slotInfo(n))]);
            var places = __spreadArray([], __read(new Set(items().filter(function (x) { return x.place_label; }).map(function (x) { return x.place_label; }))), false);
            return {
                datalist: "<datalist id=\"placelist\">".concat(__spreadArray(["Placard", "Carton placard", "En vrac placard de gauche", "Garage", "Cellier"], __read(places), false).filter(function (v, i, a) { return a.indexOf(v) === i; }).map(function (p) { return "<option value=\"".concat(esc(p), "\">"); }).join(""), "</datalist>"),
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
        function editBottle(b, preset, opts) {
            var _this = this;
            if (b === void 0) { b = {}; }
            if (preset === void 0) { preset = {}; }
            if (opts === void 0) { opts = {}; }
            var scanned = null;
            var base = __spreadValues(__spreadValues({ wine_type: "Rouge", category: "Vin", bottle_size: "75 cl", quantity: 1, location_kind: "cave" }, b), preset);
            var _d = bottleFields(b), fields = _d.fields, datalist = _d.datalist;
            formDialog({
                title: b.id ? "Modifier la bouteille" : "Ajouter une bouteille",
                fields: fields,
                values: base,
                extra: (b.id ? "" : scanBox("Remplir depuis une photo de l\u2019\xE9tiquette")) + datalist,
                wide: true,
                danger: b.id ? { label: "Supprimer", confirm: "Supprimer cette bouteille ?", run: function () { return db.del("cellar_items", b.id); } } : null,
                onMount: function (root, form) {
                    var sync = function () {
                        var k = form.elements.location_kind.value;
                        var show = function (name, on) { return form.elements[name].closest("label").classList.toggle("hidden", !on); };
                        show("slot", k === "cave");
                        show("place_label", k !== "cave");
                        show("position_note", k !== "placard");
                    };
                    form.elements.location_kind.onchange = sync;
                    sync();
                    bindScan(root, function (file, msg) { return __awaiter(_this, void 0, void 0, function () {
                        var text, p;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    scanned = file;
                                    return [4 /*yield*/, ocr(file, msg)];
                                case 1:
                                    text = _d.sent();
                                    p = parseWine(text);
                                    if (p.wine_type)
                                        form.elements.wine_type.value = p.wine_type;
                                    delete p.wine_type;
                                    return [2 /*return*/, fillForm(form, p) + (p.wine_type ? 0 : 0)];
                            }
                        });
                    }); });
                    if (opts.scan) {
                        var cam = root.querySelector("#scanCam");
                        if (cam)
                            cam.click();
                    }
                },
                onSubmit: function (v) { return __awaiter(_this, void 0, void 0, function () {
                    var photo, _d, _e, _f, saved;
                    return __generator(this, function (_g) {
                        switch (_g.label) {
                            case 0:
                                photo = v.photo || scanned;
                                delete v.photo;
                                if (v.location_kind !== "cave")
                                    v.slot = null;
                                else
                                    v.slot = v.slot ? Number(v.slot) : null;
                                if (v.location_kind === "cave")
                                    v.place_label = null;
                                if (!photo) return [3 /*break*/, 3];
                                _d = v;
                                _f = (_e = db).uploadPhoto;
                                return [4 /*yield*/, compressImage(photo)];
                            case 1: return [4 /*yield*/, _f.apply(_e, [_g.sent(), "bottles"])];
                            case 2:
                                _d.photo_url = _g.sent();
                                _g.label = 3;
                            case 3:
                                v.quantity = v.quantity || 1;
                                if (Number(v.estimated_value || 0) !== Number(b.estimated_value || 0)) {
                                    v.price_source = v.estimated_value ? "manual" : null;
                                    v.price_updated_at = ( /* @__PURE__ */new Date()).toISOString();
                                }
                                if (!b.id) return [3 /*break*/, 5];
                                return [4 /*yield*/, db.patch("cellar_items", b.id, v)];
                            case 4:
                                _g.sent();
                                saved = __spreadValues(__spreadValues({}, b), v);
                                return [3 /*break*/, 7];
                            case 5: return [4 /*yield*/, db.add("cellar_items", v)];
                            case 6:
                                saved = _g.sent();
                                _g.label = 7;
                            case 7:
                                toast("Enregistr\xE9 \u2014 synchronis\xE9 sur tous les appareils");
                                if (!saved.photo_url && saved.name)
                                    fetchLabels([saved]).catch(function () {
                                    });
                                return [2 /*return*/];
                        }
                    });
                }); }
            });
        }
        var drinkRowHTML = function (b) {
            var d = drinkStatus(b);
            return "<div class=\"kv\"><span>Maturit\u00E9</span><b><i class=\"ddot\" style=\"background:".concat(d.color, "\"></i>").concat(esc(d.label), "</b></div><p class=\"muted small\">").concat(esc(d.detail || ""), " ").concat(esc(d.why || ""), "</p>");
        };
        function detail(b) {
            var _this = this;
            var row = function (l, v) { return v ? "<div class=\"kv\"><span>".concat(l, "</span><b>").concat(esc(v), "</b></div>") : ""; };
            var where = b.location_kind === "cave" ? b.slot ? "Cave \u00E0 vin \u00B7 ".concat(slotInfo(b.slot), " (n\u00B0").concat(b.slot, ")") : "Cave \xE0 vin \xB7 \xE0 placer" : [KIND_LABEL[b.location_kind], b.place_label].filter(Boolean).join(" \xB7 ");
            openModal("<div class=\"detail\">\n    <div class=\"detailhead\">".concat(b.photo_url ? "<img src=\"".concat(esc(b.photo_url), "\" alt=\"\">") : "<div class=\"bigdot\" style=\"background:".concat((GLASS[b.wine_type] || GLASS.Rouge)[0], "\"></div>"), "\n      <div><span class=\"chip\">").concat(esc(b.wine_type), " \u00B7 ").concat(esc(b.category || ""), "</span><h2 class=\"script\">").concat(esc(b.name), "</h2><p class=\"muted\">").concat(esc([b.producer, b.vintage].filter(Boolean).join(" \xB7 ")), "</p></div></div>\n    ").concat(row("Emplacement", where)).concat(row("Position pr\xE9cise", b.position_note)).concat(row("Quantit\xE9", qty(b) > 1 ? qty(b) : "")).concat(row("Pays / r\xE9gion", [b.country, b.region].filter(Boolean).join(" \xB7 "))).concat(row("Format", b.bottle_size), "\n    ").concat(row("Prix d\u2019achat", b.purchase_price ? b.purchase_price + " \u20AC" : "")).concat(row("Source du prix", b.price_note)).concat(row("Valeur estim\xE9e (par bouteille)", b.estimated_value ? "".concat(b.estimated_value, " \u20AC").concat(b.price_updated_at ? " \u00B7 ".concat(b.price_source === "web" ? "estimation web" : "saisi", " le ").concat(new Date(b.price_updated_at).toLocaleDateString("fr-FR")) : "") : "")).concat(row("Date d\u2019achat", b.acquired_on), "\n    ").concat(drinkRowHTML(b)).concat(row("\xC0 boire", b.drinking_window)).concat(row("Service", b.serving_temperature)).concat(row("Accords", b.food_pairing)).concat(row("Notes", b.notes)).concat(row("Source du prix", b.price_note), "\n    ").concat(b.vivino_url ? "<p><a href=\"".concat(esc(b.vivino_url), "\" target=\"_blank\" rel=\"noopener\">Voir sur Vivino \u2197</a></p>") : "", "\n    <div class=\"formactions wrap\"><button class=\"btn\" data-act=\"meal\">Id\u00E9e de plat</button><button class=\"btn\" data-act=\"cocktail\">Id\u00E9e de cocktail</button><span class=\"grow\"></span>\n      <button class=\"btn\" data-act=\"drunk\">Bue / sortie</button><button class=\"btn\" data-act=\"edit\">Modifier</button><button class=\"btn ghost\" data-close>Fermer</button></div></div>"), {
                onMount: function (root) {
                    $("[data-close]", root).onclick = closeModal;
                    root.onclick = function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var _a, a;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    a = (_a = e.target.closest("[data-act]")) == null ? void 0 : _a.dataset.act;
                                    if (!a)
                                        return [2 /*return*/];
                                    if (a === "edit")
                                        editBottle(b);
                                    if (a === "meal")
                                        openIdea(function () { return randomMeal(PAIRING[b.wine_type] || ["Beef"]); }, { title: "Un plat pour \u00AB ".concat(b.name, " \u00BB"), saveCategory: "Plat" });
                                    if (a === "cocktail")
                                        openIdea(function () { return randomCocktail({ ingredient: spiritOf(b) }); }, { title: "Un cocktail avec \u00AB ".concat(b.name, " \u00BB") });
                                    if (!(a === "drunk")) return [3 /*break*/, 5];
                                    if (!confirm(qty(b) > 1 ? "Retirer une bouteille ?" : "Retirer cette bouteille de la cave ?"))
                                        return [2 /*return*/];
                                    if (!(qty(b) > 1)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, db.patch("cellar_items", b.id, { quantity: qty(b) - 1 })];
                                case 1:
                                    _d.sent();
                                    return [3 /*break*/, 4];
                                case 2: return [4 /*yield*/, db.del("cellar_items", b.id)];
                                case 3:
                                    _d.sent();
                                    _d.label = 4;
                                case 4:
                                    closeModal();
                                    toast("Sant\xE9 ! Bouteille retir\xE9e");
                                    _d.label = 5;
                                case 5: return [2 /*return*/];
                            }
                        });
                    }); };
                }
            });
        }
        function spiritOf(b) {
            var txt = [b.category, b.name, b.producer].join(" ").toLowerCase();
            var k = Object.keys(SPIRIT_MAP).find(function (k2) { return txt.includes(k2); });
            return k ? SPIRIT_MAP[k] : b.wine_type === "Effervescent" ? "Champagne" : null;
        }
        function pickSlot(n) {
            var _this = this;
            var loose = inCave().filter(function (b) { return !b.slot; });
            openModal("<div class=\"detail\"><h2 class=\"script\">Emplacement ".concat(n, "</h2><p class=\"muted\">").concat(slotInfo(n), "</p>\n    ").concat(loose.length ? "<h4>Ranger une bouteille existante</h4>".concat(loose.map(rowHTML).join("")) : "", "\n    <div class=\"formactions\"><button class=\"btn ghost\" data-close>Annuler</button><span class=\"grow\"></span><button class=\"btn primary\" id=\"newHere\">\uFF0B Nouvelle bouteille ici</button></div></div>"), {
                onMount: function (root) {
                    $("[data-close]", root).onclick = closeModal;
                    $("#newHere", root).onclick = function () { return editBottle({}, { location_kind: "cave", slot: n }); };
                    $$(".bottle", root).forEach(function (el) { return el.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0: return [4 /*yield*/, db.patch("cellar_items", el.dataset.id, { slot: n })];
                                case 1:
                                    _d.sent();
                                    closeModal();
                                    toast("Bouteille rang\xE9e");
                                    return [2 /*return*/];
                            }
                        });
                    }); }; });
                }
            });
        }
        var readText = function (f) { return new Promise(function (res, rej) {
            var r = new FileReader();
            r.onload = function () { return res(String(r.result)); };
            r.onerror = function () { return rej(new Error("lecture impossible")); };
            r.readAsText(f);
        }); };
        function vivinoSync() {
            var _this = this;
            var files = [], plan = null;
            openModal("<div class=\"detail\"><h2 class=\"script\">Mettre \u00E0 jour depuis Vivino</h2>\n    <p class=\"muted\">Vivino ne permet pas de relier un compte \u00E0 un autre site : on utilise ses exports. Dans l\u2019application Vivino, ouvrez votre cave puis \u00AB Exporter la cave \u00BB (fichier CSV), et si vous voulez vos notes et commentaires, demandez \u00AB Exporter mes donn\u00E9es \u00BB dans les r\u00E9glages du compte, puis d\u00E9zippez le fichier re\u00E7u. Choisissez ensuite ici les fichiers <b>.csv</b> (vous pouvez en s\u00E9lectionner plusieurs). <b>Les emplacements des bouteilles d\u00E9j\u00E0 rang\u00E9es ne sont jamais modifi\u00E9s</b> (Vivino ne les conna\u00EEt pas).</p>\n    <input type=\"file\" id=\"vivFiles\" accept=\".csv,text/csv,text/plain\" multiple>\n    <label class=\"field check\"><input type=\"checkbox\" id=\"vivSlots\" checked> <span>Ranger les nouvelles bouteilles dans les emplacements libres de la cave</span></label>\n    <label class=\"field check\"><input type=\"checkbox\" id=\"vivRemove\"> <span>Retirer les bouteilles en trop ou absentes de l\u2019export (bues)</span></label>\n    <div id=\"vivOut\" class=\"muted small\"></div>\n    <div class=\"formactions\"><button class=\"btn ghost\" data-close>Fermer</button><span class=\"grow\"></span><button class=\"btn primary\" id=\"vivApply\" disabled>Appliquer</button></div></div>", {
                wide: true,
                onMount: function (root) {
                    var out = $("#vivOut", root), apply = $("#vivApply", root);
                    var wh = function (b) { return b.slot ? slotInfo(b.slot) : b.location_kind === "cave" ? "cave, \xE0 placer" : KIND_LABEL[b.location_kind] || ""; };
                    var compute = function () { return __awaiter(_this, void 0, void 0, function () {
                        var msgs, useSlots, taken, free, n, files_1, files_1_1, f, csv, rows, cellarFile, _d, base, p, e_27_1, det, err_11;
                        var e_27, _e;
                        return __generator(this, function (_f) {
                            switch (_f.label) {
                                case 0:
                                    if (!files.length)
                                        return [2 /*return*/];
                                    out.textContent = "Lecture\u2026";
                                    apply.disabled = true;
                                    plan = { add: [], update: [], remove: [], same: 0, unmatched: 0, missing: 0 };
                                    msgs = [], useSlots = $("#vivSlots", root).checked;
                                    _f.label = 1;
                                case 1:
                                    _f.trys.push([1, 10, , 11]);
                                    taken = new Set(inCave().filter(function (x) { return x.slot; }).map(function (x) { return x.slot; }));
                                    free = [];
                                    if (useSlots) {
                                        for (n = 1; n <= 28; n++)
                                            if (!taken.has(n))
                                                free.push(n);
                                    }
                                    _f.label = 2;
                                case 2:
                                    _f.trys.push([2, 7, 8, 9]);
                                    files_1 = __values(files), files_1_1 = files_1.next();
                                    _f.label = 3;
                                case 3:
                                    if (!!files_1_1.done) return [3 /*break*/, 6];
                                    f = files_1_1.value;
                                    _d = parseCSV;
                                    return [4 /*yield*/, readText(f)];
                                case 4:
                                    csv = _d.apply(void 0, [_f.sent()]), rows = readRows(csv), cellarFile = isCellarFile(csv, f.name);
                                    if (!rows.length) {
                                        msgs.push(esc("".concat(f.name, " : aucune bouteille reconnue (colonnes : ").concat(csv[0] ? Object.keys(csv[0]).slice(0, 8).join(", ") : "vide", ")")));
                                        return [3 /*break*/, 5];
                                    }
                                    base = items().concat(plan.add.map(function (a) { return __spreadProps(__spreadValues({}, a), { id: "new-" + plan.add.indexOf(a) }); }));
                                    p = planSync(rows, base, { cellarFile: cellarFile, freeSlots: free.filter(function (n) { return !plan.add.some(function (a) { return a.slot === n; }); }) });
                                    plan.add = plan.add.concat(p.add);
                                    plan.update = plan.update.concat(p.update);
                                    plan.same += p.same;
                                    plan.unmatched += p.unmatched;
                                    if (cellarFile) {
                                        plan.remove = p.remove.filter(function (x) { return String(x.id).indexOf("new-") !== 0; });
                                        plan.missing = p.missing;
                                    }
                                    msgs.push(esc("".concat(f.name, " : ").concat(rows.length, " lignes (").concat(cellarFile ? "cave" : "notes / commentaires", ")")));
                                    _f.label = 5;
                                case 5:
                                    files_1_1 = files_1.next();
                                    return [3 /*break*/, 3];
                                case 6: return [3 /*break*/, 9];
                                case 7:
                                    e_27_1 = _f.sent();
                                    e_27 = { error: e_27_1 };
                                    return [3 /*break*/, 9];
                                case 8:
                                    try {
                                        if (files_1_1 && !files_1_1.done && (_e = files_1.return)) _e.call(files_1);
                                    }
                                    finally { if (e_27) throw e_27.error; }
                                    return [7 /*endfinally*/];
                                case 9:
                                    det = function (t, arr, fn) { return arr.length ? "<details><summary>".concat(t, " (").concat(arr.length, ")</summary><ul>").concat(arr.map(function (x) { return "<li>".concat(fn(x), "</li>"); }).join(""), "</ul></details>") : ""; };
                                    out.innerHTML = msgs.map(function (m) { return "<div>".concat(m, "</div>"); }).join("") + det("Nouvelles bouteilles", plan.add, function (a) { return "".concat(esc(a.name), " ").concat(a.vintage || "", " \u2192 ").concat(a.slot ? slotInfo(a.slot) : "Placard \xB7 \xC0 ranger"); }) + det("Notes / liens mis \xE0 jour", plan.update, function (u) { return esc(u.name); }) + det("\xC0 retirer (cochez l\u2019option ci-dessus pour les appliquer)", plan.remove, function (x) { return "".concat(esc(x.name), " ").concat(x.vintage || "").concat(x.slot ? " (" + slotInfo(x.slot) + ")" : "", " \u2014 ").concat(x.absent ? "absente de l\u2019export" : "quantit\xE9 Vivino plus faible : " + x.newQty + " restante(s)"); }) + "<p><b>".concat(plan.add.length, "</b> nouvelle(s), <b>").concat(plan.update.length, "</b> mise(s) \u00E0 jour, <b>").concat(plan.remove.length, "</b> \u00E0 retirer, ").concat(plan.same, " inchang\u00E9e(s).</p>");
                                    apply.disabled = !(plan.add.length || plan.update.length || plan.remove.length && $("#vivRemove", root).checked);
                                    return [3 /*break*/, 11];
                                case 10:
                                    err_11 = _f.sent();
                                    out.textContent = "Erreur : " + err_11.message;
                                    return [3 /*break*/, 11];
                                case 11: return [2 /*return*/];
                            }
                        });
                    }); };
                    $("[data-close]", root).onclick = closeModal;
                    $("#vivFiles", root).onchange = function (e) {
                        files = __spreadArray([], __read(e.target.files), false);
                        compute();
                    };
                    $("#vivSlots", root).onchange = compute;
                    $("#vivRemove", root).onchange = function () {
                        if (plan)
                            apply.disabled = !(plan.add.length || plan.update.length || plan.remove.length && $("#vivRemove", root).checked);
                    };
                    apply.onclick = function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var doRemove, _d, _e, u, e_28_1, removed, del, _f, _g, x, e_29_1, err_12;
                        var e_28, _h, e_29, _j;
                        return __generator(this, function (_k) {
                            switch (_k.label) {
                                case 0:
                                    e.target.disabled = true;
                                    _k.label = 1;
                                case 1:
                                    _k.trys.push([1, 21, , 22]);
                                    doRemove = $("#vivRemove", root).checked;
                                    if (!plan.add.length) return [3 /*break*/, 3];
                                    return [4 /*yield*/, db.addMany("cellar_items", plan.add.map(function (a) {
                                            var r = __spreadValues({}, a);
                                            if (!r.external_id)
                                                delete r.external_id;
                                            return r;
                                        }))];
                                case 2:
                                    _k.sent();
                                    _k.label = 3;
                                case 3:
                                    _k.trys.push([3, 8, 9, 10]);
                                    _d = __values(plan.update), _e = _d.next();
                                    _k.label = 4;
                                case 4:
                                    if (!!_e.done) return [3 /*break*/, 7];
                                    u = _e.value;
                                    return [4 /*yield*/, db.patch("cellar_items", u.id, u.patch)];
                                case 5:
                                    _k.sent();
                                    _k.label = 6;
                                case 6:
                                    _e = _d.next();
                                    return [3 /*break*/, 4];
                                case 7: return [3 /*break*/, 10];
                                case 8:
                                    e_28_1 = _k.sent();
                                    e_28 = { error: e_28_1 };
                                    return [3 /*break*/, 10];
                                case 9:
                                    try {
                                        if (_e && !_e.done && (_h = _d.return)) _h.call(_d);
                                    }
                                    finally { if (e_28) throw e_28.error; }
                                    return [7 /*endfinally*/];
                                case 10:
                                    removed = 0;
                                    if (!doRemove) return [3 /*break*/, 20];
                                    del = plan.remove.filter(function (x) { return x.newQty <= 0; }).map(function (x) { return x.id; });
                                    _k.label = 11;
                                case 11:
                                    _k.trys.push([11, 16, 17, 18]);
                                    _f = __values(plan.remove.filter(function (x2) { return x2.newQty > 0; })), _g = _f.next();
                                    _k.label = 12;
                                case 12:
                                    if (!!_g.done) return [3 /*break*/, 15];
                                    x = _g.value;
                                    return [4 /*yield*/, db.patch("cellar_items", x.id, { quantity: x.newQty })];
                                case 13:
                                    _k.sent();
                                    removed++;
                                    _k.label = 14;
                                case 14:
                                    _g = _f.next();
                                    return [3 /*break*/, 12];
                                case 15: return [3 /*break*/, 18];
                                case 16:
                                    e_29_1 = _k.sent();
                                    e_29 = { error: e_29_1 };
                                    return [3 /*break*/, 18];
                                case 17:
                                    try {
                                        if (_g && !_g.done && (_j = _f.return)) _j.call(_f);
                                    }
                                    finally { if (e_29) throw e_29.error; }
                                    return [7 /*endfinally*/];
                                case 18:
                                    if (!del.length) return [3 /*break*/, 20];
                                    return [4 /*yield*/, db.delMany("cellar_items", del)];
                                case 19:
                                    _k.sent();
                                    removed += del.length;
                                    _k.label = 20;
                                case 20:
                                    toast("".concat(plan.add.length, " ajout\u00E9e(s), ").concat(plan.update.length, " mise(s) \u00E0 jour").concat(doRemove ? ", " + removed + " retir\xE9e(s)" : ""));
                                    closeModal();
                                    return [3 /*break*/, 22];
                                case 21:
                                    err_12 = _k.sent();
                                    toast(err_12.message, "err");
                                    e.target.disabled = false;
                                    return [3 /*break*/, 22];
                                case 22: return [2 /*return*/];
                            }
                        });
                    }); };
                }
            });
        }
        var priceKey = function (b) { return [b.producer, b.name, b.vintage, b.bottle_size].join("|"); };
        var searchUrl = function (b) { return "https://www.google.com/search?tbm=shop&q=" + encodeURIComponent(["vin", b.producer, b.name, b.vintage].filter(Boolean).join(" ")); };
        function priceSheet() {
            var _this = this;
            var groups = /* @__PURE__ */ new Map();
            items().forEach(function (b) {
                var k = priceKey(b);
                if (!groups.has(k))
                    groups.set(k, { b: b, ids: [] });
                groups.get(k).ids.push(b.id);
            });
            var rows = __spreadArray([], __read(groups.values()), false).sort(function (x, y) { return (x.b.producer || x.b.name).localeCompare(y.b.producer || y.b.name, "fr"); });
            openModal("<div class=\"detail\"><h2 class=\"script\">Prix des bouteilles</h2>\n    <p class=\"muted\">Prix moyen d\u2019<b>une</b> bouteille, en euros. Le lien \u00AB Prix \u00BB ouvre une recherche (Google Shopping) et \u00AB Vivino \u00BB la page Vivino : notez ce que vous trouvez, puis enregistrez. La valeur totale de la cave se recalcule aussit\u00F4t.</p>\n    <label class=\"field check\"><input type=\"checkbox\" id=\"onlyMissing\"> <span>Afficher seulement les bouteilles sans prix</span></label>\n    <div class=\"pricelist\">".concat(rows.map(function (_d) {
                var b = _d.b;
                var _a;
                return "<div class=\"prow2\" data-has=\"".concat(b.estimated_value ? 1 : 0, "\"><span class=\"grow\"><b>").concat(esc(b.name), "</b> ").concat(b.vintage ? "<span class=\"muted\">".concat(b.vintage, "</span>") : "", "<br><small>").concat(esc([b.producer, b.price_updated_at && "prix du " + new Date(b.price_updated_at).toLocaleDateString("fr-FR")].filter(Boolean).join(" \xB7 ")), "</small></span>\n      <a class=\"iconbtn\" href=\"").concat(esc(searchUrl(b)), "\" target=\"_blank\" rel=\"noopener\" title=\"Chercher le prix\">Prix</a>").concat(b.vivino_url ? "<a class=\"iconbtn\" href=\"".concat(esc(b.vivino_url), "\" target=\"_blank\" rel=\"noopener\" title=\"Page Vivino\">Vivino</a>") : "", "\n      <input type=\"number\" min=\"0\" step=\"0.5\" inputmode=\"decimal\" data-k=\"").concat(esc(priceKey(b)), "\" value=\"").concat((_a = b.estimated_value) != null ? _a : "", "\" placeholder=\"\u2014\" aria-label=\"Prix\"><span>\u20AC</span></div>");
            }).join(""), "</div>\n    <p id=\"pstat\" class=\"muted small\"></p><div class=\"formactions wrap\"><button class=\"btn ghost\" data-close>Annuler</button><button class=\"btn\" id=\"vivPrices\">Chercher les prix sur Vivino</button><span class=\"grow\"></span><button class=\"btn primary\" id=\"savePrices\">Enregistrer les prix</button></div></div>"), {
                wide: true,
                onMount: function (root) {
                    $("[data-close]", root).onclick = closeModal;
                    $("#onlyMissing", root).onchange = function (e) { return $$(".prow2", root).forEach(function (r) { return r.classList.toggle("hidden", e.target.checked && r.dataset.has === "1"); }); };
                    $("#vivPrices", root).onclick = function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var btn, st, only, todo, ok, fail, last, i, part, _d, data, error, _loop_9, _e, _f, r, x_6;
                        var e_30, _g;
                        return __generator(this, function (_h) {
                            switch (_h.label) {
                                case 0:
                                    btn = e.target, st = $("#pstat", root), only = $("#onlyMissing", root).checked;
                                    todo = __spreadArray([], __read(groups.entries()), false).filter(function (_d) {
                                        var _e = __read(_d, 2), k = _e[0], g = _e[1];
                                        return !only || !g.b.estimated_value;
                                    });
                                    btn.disabled = true;
                                    ok = 0, fail = 0, last = "";
                                    i = 0;
                                    _h.label = 1;
                                case 1:
                                    if (!(i < todo.length)) return [3 /*break*/, 6];
                                    part = todo.slice(i, i + 3);
                                    st.textContent = "Recherche sur Vivino\u2026 ".concat(Math.min(i + 3, todo.length), " / ").concat(todo.length);
                                    _h.label = 2;
                                case 2:
                                    _h.trys.push([2, 4, , 5]);
                                    return [4 /*yield*/, Promise.race([db.store.sb.functions.invoke(window.FN_LABELS || "wine-labels", { body: { prices: part.map(function (_d) {
                                                        var _e = __read(_d, 2), k = _e[0], g = _e[1];
                                                        return ({ key: k, url: g.b.vivino_url || void 0, query: [g.b.producer, g.b.name, g.b.vintage].filter(Boolean).join(" ") });
                                                    }) } }), new Promise(function (_, rej) { return setTimeout(function () { return rej(new Error("pas de r\xE9ponse en 40 s")); }, 4e4); })])];
                                case 3:
                                    _d = _h.sent(), data = _d.data, error = _d.error;
                                    if (error)
                                        throw new Error(error.message || "erreur");
                                    _loop_9 = function (r) {
                                        if (r.ok) {
                                            var inp = $$("input[data-k]", root).find(function (x) { return x.dataset.k === r.key; });
                                            if (inp) {
                                                inp.value = r.price;
                                                inp.classList.add("found");
                                            }
                                            ok++;
                                        }
                                        else {
                                            fail++;
                                            last = r.error || last;
                                        }
                                    };
                                    try {
                                        for (_e = (e_30 = void 0, __values(data && data.results || [])), _f = _e.next(); !_f.done; _f = _e.next()) {
                                            r = _f.value;
                                            _loop_9(r);
                                        }
                                    }
                                    catch (e_30_1) { e_30 = { error: e_30_1 }; }
                                    finally {
                                        try {
                                            if (_f && !_f.done && (_g = _e.return)) _g.call(_e);
                                        }
                                        finally { if (e_30) throw e_30.error; }
                                    }
                                    return [3 /*break*/, 5];
                                case 4:
                                    x_6 = _h.sent();
                                    fail += part.length;
                                    last = x_6.message || String(x_6);
                                    return [3 /*break*/, 5];
                                case 5:
                                    i += 3;
                                    return [3 /*break*/, 1];
                                case 6:
                                    btn.disabled = false;
                                    st.textContent = "".concat(ok, " prix trouv\u00E9").concat(ok > 1 ? "s" : "", " sur Vivino").concat(fail ? ", ".concat(fail, " introuvable").concat(fail > 1 ? "s" : "").concat(last ? " (" + last.slice(0, 90) + ")" : "") : "", ". V\u00E9rifiez puis cliquez sur \u00AB Enregistrer les prix \u00BB.");
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    $("#savePrices", root).onclick = function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var n, _d, _e, inp, g, val, _f, _g, id, e_31_1, e_32_1, err_13;
                        var e_32, _h, e_31, _j;
                        return __generator(this, function (_k) {
                            switch (_k.label) {
                                case 0:
                                    e.target.disabled = true;
                                    n = 0;
                                    _k.label = 1;
                                case 1:
                                    _k.trys.push([1, 17, , 18]);
                                    _k.label = 2;
                                case 2:
                                    _k.trys.push([2, 14, 15, 16]);
                                    _d = __values($$("input[data-k]", root)), _e = _d.next();
                                    _k.label = 3;
                                case 3:
                                    if (!!_e.done) return [3 /*break*/, 13];
                                    inp = _e.value;
                                    g = groups.get(inp.dataset.k), val = inp.value === "" ? null : Number(inp.value);
                                    if (Number(g.b.estimated_value || 0) === Number(val || 0))
                                        return [3 /*break*/, 12];
                                    _k.label = 4;
                                case 4:
                                    _k.trys.push([4, 9, 10, 11]);
                                    _f = (e_31 = void 0, __values(g.ids)), _g = _f.next();
                                    _k.label = 5;
                                case 5:
                                    if (!!_g.done) return [3 /*break*/, 8];
                                    id = _g.value;
                                    return [4 /*yield*/, db.patch("cellar_items", id, { estimated_value: val, price_source: val ? "manual" : null, price_updated_at: ( /* @__PURE__ */new Date()).toISOString() })];
                                case 6:
                                    _k.sent();
                                    _k.label = 7;
                                case 7:
                                    _g = _f.next();
                                    return [3 /*break*/, 5];
                                case 8: return [3 /*break*/, 11];
                                case 9:
                                    e_31_1 = _k.sent();
                                    e_31 = { error: e_31_1 };
                                    return [3 /*break*/, 11];
                                case 10:
                                    try {
                                        if (_g && !_g.done && (_j = _f.return)) _j.call(_f);
                                    }
                                    finally { if (e_31) throw e_31.error; }
                                    return [7 /*endfinally*/];
                                case 11:
                                    n++;
                                    _k.label = 12;
                                case 12:
                                    _e = _d.next();
                                    return [3 /*break*/, 3];
                                case 13: return [3 /*break*/, 16];
                                case 14:
                                    e_32_1 = _k.sent();
                                    e_32 = { error: e_32_1 };
                                    return [3 /*break*/, 16];
                                case 15:
                                    try {
                                        if (_e && !_e.done && (_h = _d.return)) _h.call(_d);
                                    }
                                    finally { if (e_32) throw e_32.error; }
                                    return [7 /*endfinally*/];
                                case 16:
                                    closeModal();
                                    toast(n ? "".concat(n, " prix enregistr\u00E9").concat(n > 1 ? "s" : "", " \u2014 synchronis\u00E9") : "Aucun changement");
                                    return [3 /*break*/, 18];
                                case 17:
                                    err_13 = _k.sent();
                                    toast(err_13.message, "err");
                                    e.target.disabled = false;
                                    return [3 /*break*/, 18];
                                case 18: return [2 /*return*/];
                            }
                        });
                    }); };
                }
            });
        }
        function bind(root, rerender) {
            var _this = this;
            var by = function (id) { return items().find(function (b) { return b.id === id; }); };
            var rs = $("#rsort", root);
            if (rs)
                rs.onchange = function () {
                    recapSort = rs.value;
                    rerender();
                };
            var rf = $("#rfilter", root);
            if (rf)
                rf.onchange = function () {
                    recapFilter = rf.value;
                    rerender();
                };
            var rp = $("#rprint", root);
            if (rp)
                rp.onclick = function () { return window.print(); };
            $$(".rtable tr[data-id]", root).forEach(function (tr) {
                tr.style.cursor = "pointer";
                tr.onclick = function () {
                    var b = items().find(function (x) { return x.id === tr.dataset.id; });
                    if (b)
                        detail(b);
                };
            });
            $("#cseg", root).onclick = function (e) {
                var _a;
                var v = (_a = e.target.closest("[data-v]")) == null ? void 0 : _a.dataset.v;
                if (v) {
                    view = v;
                    rerender();
                }
            };
            root.onclick = function (e) {
                var slot = e.target.closest("[data-slot]");
                if (slot) {
                    var n_1 = +slot.dataset.slot, b = inCave().find(function (x) { return x.slot === n_1; });
                    return b ? detail(b) : pickSlot(n_1);
                }
                var row = e.target.closest(".bottle");
                if (row)
                    return detail(by(row.dataset.id));
                var add = e.target.closest("[data-add]");
                if (add)
                    return editBottle({}, { location_kind: add.dataset.add });
            };
            root.onkeydown = function (e) {
                var _a;
                if ((e.key === "Enter" || e.key === " ") && ((_a = e.target.dataset) == null ? void 0 : _a.slot)) {
                    e.preventDefault();
                    e.target.dispatchEvent(new MouseEvent("click", { bubbles: true }));
                }
            };
            $("#priceBtn", root).onclick = priceSheet;
            $("#vivSync", root).onclick = vivinoSync;
            $("#scanBtn", root).onclick = function () { return editBottle({}, { location_kind: view === "placard" || view === "exterieur" ? view : "cave" }, { scan: true }); };
            $("#labelBtn", root).onclick = labelsSheet;
            $("#cocktailBtn", root).onclick = function () {
                var spirits = items().map(spiritOf).filter(Boolean);
                openIdea(function () { return randomCocktail({ ingredient: spirits.length ? pick(spirits) : null }); }, { title: "Un cocktail pour ce soir" });
            };
            var imp = $("#impCellar", root);
            if (imp)
                imp.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                    var n, e_33;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                imp.disabled = true;
                                imp.textContent = "Import en cours\u2026";
                                _d.label = 1;
                            case 1:
                                _d.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, importCellar()];
                            case 2:
                                n = _d.sent();
                                toast("".concat(n, " lignes import\u00E9es"));
                                return [3 /*break*/, 4];
                            case 3:
                                e_33 = _d.sent();
                                toast(e_33.message, "err");
                                imp.disabled = false;
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                }); };
            var q = $("#cq", root);
            if (q)
                q.oninput = function () {
                    query = q.value;
                    $("#clist", root).innerHTML = listHTML();
                };
            var t = $("#ctype", root);
            if (t)
                t.onchange = function () {
                    typeFilter = t.value;
                    rerender();
                };
        }
        return { TYPES: TYPES, html: html, editBottle: editBottle, bind: bind };
    })();
    __m.menus = (function () {
        var _d = __m.util, $ = _d.$, $$ = _d.$$, esc = _d.esc, toast = _d.toast, openModal = _d.openModal, closeModal = _d.closeModal, formDialog = _d.formDialog, ymd = _d.ymd, parseYmd = _d.parseYmd, addDays = _d.addDays, weekStartSaturday = _d.weekStartSaturday, fmtLong = _d.fmtLong, fmtShort = _d.fmtShort, shuffle = _d.shuffle, pick = _d.pick, DAYS = _d.DAYS, guessShop = _d.guessShop;
        var db = __m.db;
        var _e = __m.ext, marmitonMeal = _e.marmitonMeal, translateIdea = _e.translateIdea;
        var _f = __m.shopping, addIngredients = _f.addIngredients, scaleIngredients = _f.scaleIngredients;
        var _g = __m.season, scoreRecipe = _g.scoreRecipe, seasonalNames = _g.seasonalNames, MONTHS = _g.MONTHS;
        var openRecipe = __m.recipes.openRecipe;
        var _h = __m.ideas, openIdea = _h.openIdea, saveIdeaAsRecipe = _h.saveIdeaAsRecipe, ratingHTML = _h.ratingHTML;
        var today = /* @__PURE__ */ new Date();
        var weekStart = weekStartSaturday(today.getDay() === 5 ? addDays(today, 1) : today);
        var plans = function () { return db.store.t.meal_plans; };
        var recipes = function () { return db.store.t.recipes; };
        var recipeById = function (id) { return recipes().find(function (r) { return r.id === id; }); };
        var TYPE_LABEL = { midi: "D\xE9jeuner", soir: "D\xEEner" };
        var weekDays = function (ws) { return Array.from({ length: 7 }, function (_, i) { return addDays(ws, i); }); };
        var typesOf = function (d) { return d.getDay() === 6 || d.getDay() === 0 ? ["midi", "soir"] : ["soir"]; };
        var planAt = function (date, type) { return plans().find(function (p) { return p.meal_date === date && p.meal_type === type; }); };
        function mealCell(d, type) {
            var _a;
            var p = planAt(ymd(d), type), r = (p == null ? void 0 : p.recipe_id) ? recipeById(p.recipe_id) : null;
            return "<div class=\"meal ".concat(p ? "filled" : "", "\" data-date=\"").concat(ymd(d), "\" data-type=\"").concat(type, "\">\n    <small class=\"mtype\">").concat(TYPE_LABEL[type], "</small>\n    ").concat(p ? "<div class=\"mrow\">".concat((r == null ? void 0 : r.photo_url) ? "<img src=\"".concat(esc(r.photo_url), "\" alt=\"\" loading=\"lazy\">") : "", "<span><b>").concat(esc(p.title || (r == null ? void 0 : r.title) || "Repas"), "</b><small>").concat(p.servings || 3, " pers.</small></span></div>") : (SECOND_EVENING.includes(d.getDay()) && type === "soir" && (((_a = planAt(ymd(addDays(d, -1)), "soir")) == null ? void 0 : _a.servings) || 0) >= 6 ? '<small class="muted">\u21B3 suite du repas de la veille</small>' : "") + '<span class="plus">\uFF0B</span>', "</div>");
        }
        function html() {
            var days = weekDays(weekStart);
            var empty = !days.some(function (d) { return planAt(ymd(d), "soir"); });
            var banner = today.getDay() === 5 && ymd(weekStart) === ymd(weekStartSaturday(addDays(today, 1))) && empty ? "<div class=\"card glass accent\"><b>C\u2019est vendredi !</b> On pr\u00E9pare les menus de la semaine qui commence demain ? <button class=\"btn primary\" data-propose>Proposer les menus</button></div>" : "";
            return "".concat(banner, "<div class=\"bar\"><div class=\"seg\"><button id=\"wprev\" aria-label=\"Semaine pr\u00E9c\u00E9dente\">\u2039</button><button id=\"wnow\">Cette semaine</button><button id=\"wnext\" aria-label=\"Semaine suivante\">\u203A</button></div>\n    <b class=\"weeklabel\">").concat(fmtShort(weekStart), " \u2192 ").concat(fmtShort(addDays(weekStart, 6)), "</b><span class=\"grow\"></span>\n    <button class=\"btn\" id=\"weekShop\">Ajouter les courses de la semaine</button><button class=\"btn\" id=\"toList\">Voir la liste de courses</button><button class=\"btn danger\" id=\"clearPlan\">Supprimer tous les repas</button><button class=\"btn primary\" data-propose>Proposer les menus</button></div>\n  <div class=\"week\">").concat(days.map(function (d) { return "<div class=\"daycard glass ".concat(ymd(d) === ymd(today) ? "today" : "", "\"><h4>").concat(esc(fmtLong(d)), "</h4>").concat(typesOf(d).map(function (t) { return mealCell(d, t); }).join(""), "</div>"); }).join(""), "</div>\n  <p class=\"muted small\">De saison en ").concat(MONTHS[seasonMonth() - 1], " : ").concat(esc(seasonalNames(seasonMonth()).join(", ")), ".</p>\n  <p class=\"muted small\">Un d\u00EEner suffit pour deux soirs : la proposition automatique pr\u00E9voit un repas le dimanche (dimanche + lundi), le mardi (mardi + mercredi) et le jeudi (jeudi + vendredi), pour 6 portions, et un d\u00EEner le samedi. Vous pouvez planifier n\u2019importe quel soir \u00E0 la main en touchant la case. Novembre \u00E0 mars : soupe le dimanche et le lundi soir. Les propositions utilisent d\u2019abord votre carnet, en \u00E9vitant ce que vous avez cuisin\u00E9 ces trois derni\u00E8res semaines.</p>");
        }
        function editSlot(date, type) {
            var _this = this;
            var p = planAt(date, type);
            formDialog({
                title: "".concat(TYPE_LABEL[type], " \u2014 ").concat(fmtLong(parseYmd(date))),
                fields: [
                    { name: "recipe_id", label: "Recette du carnet", type: "select", full: true, options: __spreadArray([["", "\u2014 titre libre \u2014"]], __read(__spreadArray([], __read(recipes()), false).sort(function (a, b) { return a.title.localeCompare(b.title, "fr"); }).map(function (r) { return [r.id, r.title]; })), false) },
                    { name: "title", label: "Ou titre libre", placeholder: "ex. Restaurant, restes, pizza\u2026", full: true },
                    { name: "servings", label: "Portions", type: "number" }
                ],
                values: { recipe_id: (p == null ? void 0 : p.recipe_id) || "", title: (p == null ? void 0 : p.recipe_id) ? "" : p == null ? void 0 : p.title, servings: (p == null ? void 0 : p.servings) || 3 },
                extra: (p == null ? void 0 : p.recipe_id) ? '<p><button type="button" class="btn small" id="openR">Voir la recette</button></p>' : "",
                onMount: function (root) {
                    var b = $("#openR", root);
                    if (b)
                        b.onclick = function () { return openRecipe(p.recipe_id); };
                },
                danger: p ? { label: "Retirer ce repas", confirm: "Retirer ce repas du menu ?", run: function () { return db.del("meal_plans", p.id); } } : null,
                onSubmit: function (v) { return __awaiter(_this, void 0, void 0, function () {
                    var r, row;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                r = v.recipe_id ? recipeById(v.recipe_id) : null;
                                row = { recipe_id: (r == null ? void 0 : r.id) || null, title: (r == null ? void 0 : r.title) || v.title, servings: v.servings || 3 };
                                if (!row.title)
                                    throw new Error("Choisissez une recette ou saisissez un titre");
                                if (!p) return [3 /*break*/, 2];
                                return [4 /*yield*/, db.patch("meal_plans", p.id, row)];
                            case 1:
                                _d.sent();
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, db.add("meal_plans", __spreadProps(__spreadValues({}, row), { meal_date: date, meal_type: type }))];
                            case 3:
                                _d.sent();
                                _d.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); }
            });
        }
        var isSoup = function (r) { return /soupe|velout|potage|bouillon/i.test(r.title); };
        var prop = [], propWebN = 2, webError = "";
        function pools() {
            var mine = recipes().filter(function (r) { return !/^cocktail/i.test(r.category || ""); });
            var recent = new Set(plans().filter(function (p) { return p.recipe_id && parseYmd(p.meal_date) >= addDays(weekStart, -21) && parseYmd(p.meal_date) < weekStart; }).map(function (p) { return p.recipe_id; }));
            return {
                recent: recent,
                soups: mine.filter(isSoup),
                dinners: mine.filter(function (r) { return (r.category === "Plat" || !r.category) && !isSoup(r); }),
                lunches: mine.filter(function (r) { return ["Brunch", "Ap\xE9ro", "Entr\xE9e"].includes(r.category) || r.category === "Plat" && r.total_minutes && r.total_minutes <= 30 && !isSoup(r); })
            };
        }
        var seasonMonth = function () { return addDays(weekStart, 3).getMonth() + 1; };
        function pickFrom(pool, used, recent) {
            var free = pool.filter(function (r) { return !used.has(r.id); });
            var fresh = free.filter(function (r) { return !recent.has(r.id); });
            var base = fresh.length ? fresh : free;
            if (!base.length)
                return null;
            var m = seasonMonth();
            var w = base.map(function (r) { return Math.max(0.15, 1 + 0.7 * scoreRecipe(r, m).score + (r.favorite ? 0.5 : 0)); });
            var x = Math.random() * w.reduce(function (a, b) { return a + b; }, 0);
            for (var i = 0; i < base.length; i++) {
                x -= w[i];
                if (x <= 0)
                    return base[i];
            }
            return base[base.length - 1];
        }
        var SECOND_EVENING = [1, 3, 5];
        var fromRecipe = function (date, type, r, servings) {
            if (servings === void 0) { servings = 3; }
            return ({ date: date, type: type, servings: servings, covers: servings >= 6 ? 2 : 1, recipe_id: (r == null ? void 0 : r.id) || null, title: (r == null ? void 0 : r.title) || "", photo_url: (r == null ? void 0 : r.photo_url) || null, web: null, seasonal: r ? scoreRecipe(r, seasonMonth()).hits : [] });
        };
        function buildProposal(withWeb) {
            return __awaiter(this, void 0, void 0, function () {
                var _d, recent, soups, dinners, lunches, used, out, winter, soup, _e, _f, d, _g, _h, type, date, dow, pool, r, pref_1, rank_1, soir, midi, targets, i, err_14;
                var e_34, _j, e_35, _k;
                return __generator(this, function (_l) {
                    switch (_l.label) {
                        case 0:
                            _d = pools(), recent = _d.recent, soups = _d.soups, dinners = _d.dinners, lunches = _d.lunches;
                            used = new Set(), out = [];
                            winter = [10, 11, 0, 1, 2].includes(weekStart.getMonth()) || [10, 11, 0, 1, 2].includes(addDays(weekStart, 6).getMonth());
                            soup = winter ? pickFrom(soups, /* @__PURE__ */ new Set(), recent) : null;
                            try {
                                for (_e = __values(weekDays(weekStart)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                    d = _f.value;
                                    try {
                                        for (_g = (e_35 = void 0, __values(typesOf(d))), _h = _g.next(); !_h.done; _h = _g.next()) {
                                            type = _h.value;
                                            date = ymd(d), dow = d.getDay();
                                            if (type === "soir" && SECOND_EVENING.includes(dow))
                                                continue;
                                            if (winter && type === "soir" && dow === 0) {
                                                out.push(soup ? fromRecipe(date, type, soup, 6) : { date: date, type: type, servings: 6, covers: 2, recipe_id: null, title: "Soupe maison", photo_url: null, web: null });
                                                continue;
                                            }
                                            pool = type === "midi" ? lunches.length ? lunches : dinners : dinners;
                                            r = pickFrom(pool, used, recent);
                                            if (r)
                                                used.add(r.id);
                                            out.push(fromRecipe(date, type, r, type === "soir" && dow !== 6 ? 6 : 3));
                                        }
                                    }
                                    catch (e_35_1) { e_35 = { error: e_35_1 }; }
                                    finally {
                                        try {
                                            if (_h && !_h.done && (_k = _g.return)) _k.call(_g);
                                        }
                                        finally { if (e_35) throw e_35.error; }
                                    }
                                }
                            }
                            catch (e_34_1) { e_34 = { error: e_34_1 }; }
                            finally {
                                try {
                                    if (_f && !_f.done && (_j = _e.return)) _j.call(_e);
                                }
                                finally { if (e_34) throw e_34.error; }
                            }
                            webError = "";
                            if (!(withWeb > 0)) return [3 /*break*/, 6];
                            pref_1 = [3, 5, 2, 4, 6, 0, 1], rank_1 = function (e) { return pref_1.indexOf(parseYmd(e.date).getDay()); };
                            soir = out.filter(function (e) { return e.type === "soir" && !(e.recipe_id === null && e.title === "Soupe maison") && !(winter && soup && e.recipe_id === soup.id); }).sort(function (x, y) { return rank_1(x) - rank_1(y); });
                            midi = out.filter(function (e) { return e.type === "midi"; }).sort(function (x, y) { return rank_1(x) - rank_1(y); });
                            targets = soir.concat(midi).slice(0, withWeb);
                            i = 0;
                            _l.label = 1;
                        case 1:
                            if (!(i < targets.length)) return [3 /*break*/, 6];
                            _l.label = 2;
                        case 2:
                            _l.trys.push([2, 4, , 5]);
                            return [4 /*yield*/, setWeb(targets[i], out)];
                        case 3:
                            _l.sent();
                            return [3 /*break*/, 5];
                        case 4:
                            err_14 = _l.sent();
                            console.warn(err_14);
                            webError = err_14.message || String(err_14);
                            return [3 /*break*/, 6];
                        case 5:
                            i++;
                            return [3 /*break*/, 1];
                        case 6: return [2 /*return*/, out];
                    }
                });
            });
        }
        function setWeb(e_36) {
            return __awaiter(this, arguments, void 0, function (e, list) {
                var idea, _d;
                if (list === void 0) { list = prop; }
                return __generator(this, function (_e) {
                    switch (_e.label) {
                        case 0:
                            _d = translateIdea;
                            return [4 /*yield*/, marmitonMeal(pick(seasonalNames(( /* @__PURE__ */new Date()).getMonth() + 1)), list.filter(function (x) { return x.web; }).map(function (x) { return x.web.id; }))];
                        case 1: return [4 /*yield*/, _d.apply(void 0, [_e.sent()])];
                        case 2:
                            idea = _e.sent();
                            Object.assign(e, { web: idea, recipe_id: null, title: idea.title, photo_url: idea.photo_url });
                            return [2 /*return*/];
                    }
                });
            });
        }
        var entryRow = function (e, i) {
            var _a;
            return "<div class=\"prow\"><span class=\"pday\">".concat(esc(fmtShort(parseYmd(e.date))), "<small>").concat(TYPE_LABEL[e.type]).concat(e.covers === 2 ? " \xB7 2 soirs" : "", "</small></span>\n  ").concat(e.photo_url ? "<img src=\"".concat(esc(e.photo_url), "\" alt=\"\">") : '<span class="thumb"></span>', "\n  <span class=\"grow\"><b>").concat(esc(e.title || "\u2014 rien de trouv\xE9 \u2014"), "</b>").concat(e.web ? "<small><span class=\"chip\">".concat(e.web.source === "Marmiton" ? "Marmiton" : "id\xE9e internet", "</span>").concat(ratingHTML(e.web), "</small>") : e.recipe_id ? "<small>de votre carnet".concat(((_a = e.seasonal) == null ? void 0 : _a.length) ? " \u00B7 de saison : ".concat(esc(e.seasonal.slice(0, 3).join(", "))) : "", "</small>") : "", "</span>\n  <button class=\"iconbtn\" data-reroll=\"").concat(i, "\" aria-label=\"Autre proposition\">\u21BB</button><button class=\"iconbtn\" data-drop=\"").concat(i, "\" aria-label=\"Retirer\">\u00D7</button></div>");
        };
        function showProposal() {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            openModal("<div class=\"detail\"><h2 class=\"script\">Menus de la semaine</h2><div class=\"loading\"><span class=\"spinner\"></span> Je pr\u00E9pare des propositions\u2026".concat(propWebN ? " (recherche de ".concat(propWebN, " recette").concat(propWebN > 1 ? "s" : "", " sur Marmiton, cela peut prendre un moment)") : "", "</div></div>"), { wide: true });
                            prop = [];
                            return [4 /*yield*/, buildProposal(propWebN)];
                        case 1:
                            prop = _d.sent();
                            paintProposal();
                            return [2 /*return*/];
                    }
                });
            });
        }
        function paintProposal() {
            var _this = this;
            openModal("<div class=\"detail\"><h2 class=\"script\">Menus de la semaine</h2><p class=\"muted\">Du ".concat(esc(fmtShort(weekStart)), " au ").concat(esc(fmtShort(addDays(weekStart, 6))), " Changez ce qui ne vous pla\u00EEt pas avec \u21BB, puis validez.</p>\n    ").concat(prop.map(entryRow).join(""), "\n    <label class=\"field\"><span>Recettes trouv\u00E9es sur Marmiton</span><select id=\"pWebN\">").concat([0, 1, 2, 3, 4, 5, 6, 7].map(function (n) { return "<option value=\"".concat(n, "\" ").concat(n === propWebN ? "selected" : "", ">").concat(n === 0 ? "Aucune (uniquement mon carnet)" : n, "</option>"); }).join(""), "</select></label>\n    ").concat(webError ? "<p class=\"muted small\">Marmiton n\u2019a pas r\u00E9pondu (".concat(esc(webError.slice(0, 120)), ") : le reste vient de votre carnet.</p>") : "", "\n    <label class=\"field check\"><input type=\"checkbox\" id=\"pOver\"> <span>Remplacer les repas d\u00E9j\u00E0 planifi\u00E9s</span></label>\n    <label class=\"field check\"><input type=\"checkbox\" id=\"pShop\" checked> <span>Ajouter les ingr\u00E9dients \u00E0 la liste de courses</span></label>\n    <div class=\"formactions wrap\"><button class=\"btn ghost\" data-close>Annuler</button><span class=\"grow\"></span><button class=\"btn\" id=\"pAgain\">\u21BB Tout r\u00E9g\u00E9n\u00E9rer</button><button class=\"btn primary\" id=\"pOk\">Valider ces menus</button></div></div>"), {
                wide: true,
                onMount: function (root) {
                    $("[data-close]", root).onclick = closeModal;
                    $("#pWebN", root).onchange = function (e) {
                        propWebN = Number(e.target.value);
                        showProposal();
                    };
                    $("#pAgain", root).onclick = showProposal;
                    root.onclick = function (e) { return __awaiter(_this, void 0, void 0, function () {
                        var rr, dr, en, _d, recent, dinners, lunches, used, r, err_15;
                        return __generator(this, function (_e) {
                            switch (_e.label) {
                                case 0:
                                    rr = e.target.closest("[data-reroll]"), dr = e.target.closest("[data-drop]");
                                    if (dr) {
                                        prop.splice(+dr.dataset.drop, 1);
                                        return [2 /*return*/, paintProposal()];
                                    }
                                    if (!rr)
                                        return [2 /*return*/];
                                    en = prop[+rr.dataset.reroll];
                                    rr.disabled = true;
                                    _e.label = 1;
                                case 1:
                                    _e.trys.push([1, 5, , 6]);
                                    if (!en.web) return [3 /*break*/, 3];
                                    return [4 /*yield*/, setWeb(en)];
                                case 2:
                                    _e.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    _d = pools(), recent = _d.recent, dinners = _d.dinners, lunches = _d.lunches;
                                    used = new Set(prop.map(function (x) { return x.recipe_id; }).filter(Boolean));
                                    r = pickFrom(en.type === "midi" && lunches.length ? lunches : dinners, used, recent);
                                    if (r)
                                        Object.assign(en, fromRecipe(en.date, en.type, r, en.servings));
                                    _e.label = 4;
                                case 4: return [3 /*break*/, 6];
                                case 5:
                                    err_15 = _e.sent();
                                    toast(err_15.message, "err");
                                    return [3 /*break*/, 6];
                                case 6:
                                    paintProposal();
                                    return [2 /*return*/];
                            }
                        });
                    }); };
                    $("#pOk", root).onclick = function (ev) { return __awaiter(_this, void 0, void 0, function () {
                        var err_16;
                        return __generator(this, function (_d) {
                            switch (_d.label) {
                                case 0:
                                    ev.target.disabled = true;
                                    _d.label = 1;
                                case 1:
                                    _d.trys.push([1, 3, , 4]);
                                    return [4 /*yield*/, validateProposal($("#pOver", root).checked, $("#pShop", root).checked)];
                                case 2:
                                    _d.sent();
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_16 = _d.sent();
                                    toast(err_16.message, "err");
                                    ev.target.disabled = false;
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    }); };
                }
            });
        }
        function validateProposal(overwrite, shop) {
            return __awaiter(this, void 0, void 0, function () {
                var added, ingredients, rows, prop_1, prop_1_1, e, ex, recipe, _d, e_36_1;
                var e_36, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            added = 0, ingredients = 0;
                            rows = [];
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 10, 11, 12]);
                            prop_1 = __values(prop), prop_1_1 = prop_1.next();
                            _f.label = 2;
                        case 2:
                            if (!!prop_1_1.done) return [3 /*break*/, 9];
                            e = prop_1_1.value;
                            if (!e.title)
                                return [3 /*break*/, 8];
                            ex = planAt(e.date, e.type);
                            if (ex && !overwrite)
                                return [3 /*break*/, 8];
                            if (!ex) return [3 /*break*/, 4];
                            return [4 /*yield*/, db.del("meal_plans", ex.id)];
                        case 3:
                            _f.sent();
                            _f.label = 4;
                        case 4:
                            recipe = e.recipe_id ? recipeById(e.recipe_id) : null;
                            if (!e.web) return [3 /*break*/, 6];
                            return [4 /*yield*/, saveIdeaAsRecipe(e.web, "Plat")];
                        case 5:
                            recipe = _f.sent();
                            _f.label = 6;
                        case 6:
                            rows.push({ meal_date: e.date, meal_type: e.type, recipe_id: (recipe == null ? void 0 : recipe.id) || null, title: (recipe == null ? void 0 : recipe.title) || e.title, servings: e.servings });
                            if (!(shop && recipe)) return [3 /*break*/, 8];
                            _d = ingredients;
                            return [4 /*yield*/, addIngredients(e.covers === 2 ? __spreadProps(__spreadValues({}, recipe), { ingredients: scaleIngredients(recipe.ingredients, recipe.servings || 4, e.servings) }) : recipe)];
                        case 7:
                            ingredients = _d + _f.sent();
                            _f.label = 8;
                        case 8:
                            prop_1_1 = prop_1.next();
                            return [3 /*break*/, 2];
                        case 9: return [3 /*break*/, 12];
                        case 10:
                            e_36_1 = _f.sent();
                            e_36 = { error: e_36_1 };
                            return [3 /*break*/, 12];
                        case 11:
                            try {
                                if (prop_1_1 && !prop_1_1.done && (_e = prop_1.return)) _e.call(prop_1);
                            }
                            finally { if (e_36) throw e_36.error; }
                            return [7 /*endfinally*/];
                        case 12: return [4 /*yield*/, db.addMany("meal_plans", rows)];
                        case 13:
                            added = (_f.sent()).length;
                            closeModal();
                            toast("".concat(added, " repas planifi\u00E9s").concat(shop ? " \u00B7 ".concat(ingredients, " ingr\u00E9dients ajout\u00E9s aux courses") : ""));
                            return [2 /*return*/];
                    }
                });
            });
        }
        function bind(root, rerender, go) {
            var _this = this;
            $("#toList", root).onclick = function () { return go("courses"); };
            $("#clearPlan", root).onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                var all, err_17;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            all = db.store.t.meal_plans;
                            if (!all.length)
                                return [2 /*return*/, toast("Aucun repas planifi\xE9")];
                            if (!confirm("Supprimer les ".concat(all.length, " repas planifi\u00E9s (toutes les semaines) ? Vos recettes ne sont pas supprim\u00E9es.")))
                                return [2 /*return*/];
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, db.delMany("meal_plans", all.map(function (p) { return p.id; }))];
                        case 2:
                            _d.sent();
                            toast("Planning vid\xE9");
                            return [3 /*break*/, 4];
                        case 3:
                            err_17 = _d.sent();
                            toast(err_17.message, "err");
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
            $("#wprev", root).onclick = function () {
                weekStart = addDays(weekStart, -7);
                rerender();
            };
            $("#wnext", root).onclick = function () {
                weekStart = addDays(weekStart, 7);
                rerender();
            };
            $("#wnow", root).onclick = function () {
                weekStart = weekStartSaturday(today.getDay() === 5 ? addDays(today, 1) : today);
                rerender();
            };
            $$("[data-propose]", root).forEach(function (b) { return b.onclick = function () { return showProposal(); }; });
            $("#weekShop", root).onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                var n, ids, ids_1, ids_1_1, id, r, _d, e_37_1;
                var e_37, _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            n = 0;
                            ids = new Set(weekDays(weekStart).flatMap(function (d) { return plans().filter(function (p) { return p.meal_date === ymd(d) && p.recipe_id; }).map(function (p) { return p.recipe_id; }); }));
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 6, 7, 8]);
                            ids_1 = __values(ids), ids_1_1 = ids_1.next();
                            _f.label = 2;
                        case 2:
                            if (!!ids_1_1.done) return [3 /*break*/, 5];
                            id = ids_1_1.value;
                            r = recipeById(id);
                            if (!r) return [3 /*break*/, 4];
                            _d = n;
                            return [4 /*yield*/, addIngredients(r)];
                        case 3:
                            n = _d + _f.sent();
                            _f.label = 4;
                        case 4:
                            ids_1_1 = ids_1.next();
                            return [3 /*break*/, 2];
                        case 5: return [3 /*break*/, 8];
                        case 6:
                            e_37_1 = _f.sent();
                            e_37 = { error: e_37_1 };
                            return [3 /*break*/, 8];
                        case 7:
                            try {
                                if (ids_1_1 && !ids_1_1.done && (_e = ids_1.return)) _e.call(ids_1);
                            }
                            finally { if (e_37) throw e_37.error; }
                            return [7 /*endfinally*/];
                        case 8:
                            toast(ids.size ? "".concat(n, " ingr\u00E9dient").concat(n > 1 ? "s" : "", " ajout\u00E9").concat(n > 1 ? "s" : "", " \u00E0 la liste de courses") : "Aucune recette planifi\xE9e cette semaine");
                            return [2 /*return*/];
                    }
                });
            }); };
            root.onclick = function (e) { return __awaiter(_this, void 0, void 0, function () {
                var m;
                return __generator(this, function (_d) {
                    m = e.target.closest(".meal");
                    if (m)
                        return [2 /*return*/, editSlot(m.dataset.date, m.dataset.type)];
                    return [2 /*return*/];
                });
            }); };
        }
        return { html: html, bind: bind };
    })();
    __m.courses = (function () {
        var _d = __m.util, $ = _d.$, esc = _d.esc, toast = _d.toast;
        var db = __m.db;
        var _e = __m.shopping, addLines = _e.addLines, itemLabel = _e.itemLabel, tidyList = _e.tidyList;
        function html() {
            var list = __spreadArray([], __read(db.store.t.shopping_items), false).sort(function (a, b) { return (a.shop || "").localeCompare(b.shop || "") || a.name.localeCompare(b.name, "fr"); });
            var shops = __spreadArray([], __read(new Set(list.map(function (i) { return i.shop || "Supermarch\xE9"; }))), false);
            var checked = list.filter(function (i) { return i.checked; }).length;
            return "<div class=\"card glass\"><div class=\"sectionhead\"><h3 class=\"script\">Liste de courses</h3><span><button class=\"btn small\" id=\"reshop\">Ranger la liste (fusion, sans sel/poivre)</button> ".concat(list.length ? '<button class="btn small danger" id="clearAll">Tout supprimer</button> ' : "").concat(checked ? "<button class=\"btn small\" id=\"clearChecked\">Retirer les ".concat(checked, " coch\u00E9s</button>") : "", "</span></div>\n    <form id=\"shopForm\" class=\"inlineform\"><input name=\"name\" placeholder=\"Ajouter un article\u2026\" required><select name=\"shop\"><option>March\u00E9</option><option selected>Supermarch\u00E9</option></select><button class=\"btn primary\">Ajouter</button></form>\n    ").concat(shops.map(function (s) { return "<h4>".concat(s === "March\xE9" ? "" : "", " ").concat(esc(s), "</h4>").concat(list.filter(function (i) { return (i.shop || "Supermarch\xE9") === s; }).map(function (i) { return "<div class=\"shopitem ".concat(i.checked ? "done" : "", "\"><button class=\"tick\" data-check=\"").concat(i.id, "\" aria-label=\"Cocher\">").concat(i.checked ? "\u2713" : "", "</button><span class=\"grow\">").concat(esc(itemLabel(i))).concat(i.recipe_title ? "<small> \u00B7 ".concat(esc(i.recipe_title), "</small>") : "", "</span><button class=\"x\" data-rm=\"").concat(i.id, "\" aria-label=\"Supprimer\">\u00D7</button></div>"); }).join("")); }).join("") || '<div class="empty">La liste est vide.</div>', "</div>");
        }
        var autoDone = false;
        function bind(root, rerender, go) {
            var _this = this;
            if (!autoDone) {
                autoDone = true;
                tidyList({ auto: true }).then(function (r) {
                    if (r.merged)
                        toast("".concat(r.merged, " doublon").concat(r.merged > 1 ? "s" : "", " fusionn\u00E9").concat(r.merged > 1 ? "s" : "", " dans la liste"));
                }).catch(function () {
                });
            }
            root.onclick = function (e) { return __awaiter(_this, void 0, void 0, function () {
                var c, it, x, r, t, _d, _e, i, e_38_1;
                var e_38, _f;
                return __generator(this, function (_g) {
                    switch (_g.label) {
                        case 0:
                            c = e.target.closest("[data-check]");
                            if (c) {
                                it = db.store.t.shopping_items.find(function (i) { return i.id === c.dataset.check; });
                                return [2 /*return*/, db.patch("shopping_items", it.id, { checked: !it.checked })];
                            }
                            x = e.target.closest("[data-rm]");
                            if (x)
                                return [2 /*return*/, db.del("shopping_items", x.dataset.rm)];
                            if (!(e.target.id === "reshop")) return [3 /*break*/, 2];
                            return [4 /*yield*/, tidyList()];
                        case 1:
                            r = _g.sent();
                            t = [];
                            if (r.removed)
                                t.push("".concat(r.removed, " sel/poivre/eau retir\u00E9").concat(r.removed > 1 ? "s" : ""));
                            if (r.merged)
                                t.push("".concat(r.merged, " doublon").concat(r.merged > 1 ? "s" : "", " fusionn\u00E9").concat(r.merged > 1 ? "s" : ""));
                            if (r.moved)
                                t.push("".concat(r.moved, " reclass\u00E9").concat(r.moved > 1 ? "s" : ""));
                            return [2 /*return*/, toast(t.length ? t.join(" \xB7 ") : "La liste est d\xE9j\xE0 bien rang\xE9e")];
                        case 2:
                            if (!(e.target.id === "clearAll")) return [3 /*break*/, 5];
                            if (!confirm("Supprimer les ".concat(db.store.t.shopping_items.length, " articles de la liste de courses ?"))) return [3 /*break*/, 4];
                            return [4 /*yield*/, db.delMany("shopping_items", db.store.t.shopping_items.map(function (i) { return i.id; }))];
                        case 3:
                            _g.sent();
                            toast("Liste de courses vid\xE9e");
                            _g.label = 4;
                        case 4: return [2 /*return*/];
                        case 5:
                            if (!(e.target.id === "clearChecked")) return [3 /*break*/, 13];
                            _g.label = 6;
                        case 6:
                            _g.trys.push([6, 11, 12, 13]);
                            _d = __values(db.store.t.shopping_items.filter(function (i2) { return i2.checked; })), _e = _d.next();
                            _g.label = 7;
                        case 7:
                            if (!!_e.done) return [3 /*break*/, 10];
                            i = _e.value;
                            return [4 /*yield*/, db.del("shopping_items", i.id)];
                        case 8:
                            _g.sent();
                            _g.label = 9;
                        case 9:
                            _e = _d.next();
                            return [3 /*break*/, 7];
                        case 10: return [3 /*break*/, 13];
                        case 11:
                            e_38_1 = _g.sent();
                            e_38 = { error: e_38_1 };
                            return [3 /*break*/, 13];
                        case 12:
                            try {
                                if (_e && !_e.done && (_f = _d.return)) _f.call(_d);
                            }
                            finally { if (e_38) throw e_38.error; }
                            return [7 /*endfinally*/];
                        case 13: return [2 /*return*/];
                    }
                });
            }); };
            $("#shopForm", root).onsubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
                var f, txt;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            e.preventDefault();
                            f = e.target;
                            txt = f.elements.name.value.trim();
                            if (!txt) return [3 /*break*/, 2];
                            return [4 /*yield*/, addLines([txt], null, { dropSaltPepper: false, shop: f.elements.shop.value })];
                        case 1:
                            _d.sent();
                            _d.label = 2;
                        case 2:
                            f.reset();
                            f.elements.name.focus();
                            return [2 /*return*/];
                    }
                });
            }); };
        }
        return { html: html, bind: bind };
    })();
    __m.news = (function () {
        var _d = __m.util, $ = _d.$, $$ = _d.$$, esc = _d.esc, toast = _d.toast, ymd = _d.ymd, addDays = _d.addDays;
        var API = "https://api.rss2json.com/v1/api.json?count=12&rss_url=";
        var FEEDS = {
            "\xC0 la une": ["https://www.francetvinfo.fr/titres.rss", "https://www.lemonde.fr/rss/une.xml"],
            "Politique": ["https://www.francetvinfo.fr/politique.rss"],
            "Monde": ["https://www.francetvinfo.fr/monde.rss"],
            "\xC9conomie": ["https://www.francetvinfo.fr/economie.rss"],
            "Sport": ["https://www.francetvinfo.fr/sports.rss"],
            "Culture": ["https://www.francetvinfo.fr/culture.rss"]
        };
        var KEY = "family-news";
        var sec = "\xC0 la une", loading = false, error = "", mem = null, reading = -1, paused = false, queue = [];
        var slotOf = function (d) {
            var h = d.getHours();
            return h >= 18 ? ymd(d) + "-18" : h >= 6 ? ymd(d) + "-06" : ymd(addDays(d, -1)) + "-18";
        };
        var read = function () {
            try {
                return JSON.parse(localStorage.getItem(KEY)) || mem;
            }
            catch (e) {
                return mem;
            }
        };
        var write = function (v) {
            mem = v;
            try {
                localStorage.setItem(KEY, JSON.stringify(v));
            }
            catch (e) {
            }
        };
        var dec = function (s) {
            var t = document.createElement("textarea");
            t.innerHTML = s;
            return t.value;
        };
        var clean = function (s) { return dec(String(s || "").replace(/<[^>]*>/g, " ")).replace(/\s+/g, " ").replace(/\s*(Lire la suite|Lire l’article|Read more|\[…\]|\.\.\.)\s*$/i, "").trim(); };
        var blurb = function (desc, title) {
            var t = clean(desc);
            if (!t || t === title)
                return "";
            if (t.length > 240) {
                var cut = t.slice(0, 240), i = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf(" "));
                t = cut.slice(0, i > 120 ? i : 240).replace(/[,;:]$/, "") + (cut.lastIndexOf(". ") > 120 ? "." : "\u2026");
            }
            return t;
        };
        var timeout = function (p, ms) { return Promise.race([p, new Promise(function (_, rej) { return setTimeout(function () { return rej(new Error("d\xE9lai d\xE9pass\xE9")); }, ms); })]); };
        function getFeed(url) {
            return __awaiter(this, void 0, void 0, function () {
                var r, j, src;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0: return [4 /*yield*/, timeout(fetch(API + encodeURIComponent(url)), 12e3)];
                        case 1:
                            r = _d.sent();
                            if (!r.ok)
                                throw new Error("service de flux " + r.status);
                            return [4 /*yield*/, r.json()];
                        case 2:
                            j = _d.sent();
                            if (j.status && j.status !== "ok")
                                throw new Error(j.message || "flux indisponible");
                            src = /lemonde/.test(url) ? "Le Monde" : "France Info";
                            return [2 /*return*/, (j.items || []).map(function (i) { return ({ title: clean(i.title), text: blurb(i.description || i.content, clean(i.title)), link: i.link, date: i.pubDate, src: src, img: i.thumbnail || i.enclosure && i.enclosure.link || "" }); }).filter(function (i) { return i.title; })];
                    }
                });
            });
        }
        function build() {
            return __awaiter(this, void 0, void 0, function () {
                var out, ok, last;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            out = {};
                            ok = 0, last = "";
                            return [4 /*yield*/, Promise.all(Object.entries(FEEDS).map(function (_d) { return __awaiter(_this, [_d], void 0, function (_e) {
                                    var lists, seen, items, _loop_10, out_k_1, inc_1, k, state_3;
                                    var _f = __read(_e, 2), name = _f[0], urls = _f[1];
                                    return __generator(this, function (_g) {
                                        switch (_g.label) {
                                            case 0: return [4 /*yield*/, Promise.all(urls.map(function (u) { return getFeed(u).catch(function (e) {
                                                    last = e.message;
                                                    return [];
                                                }); }))];
                                            case 1:
                                                lists = (_g.sent()).filter(function (l) { return l.length; });
                                                seen = {}, items = [];
                                                _loop_10 = function (k) {
                                                    if (inc_1)
                                                        k++;
                                                    else
                                                        inc_1 = true;
                                                    if (!(items.length < (name === "\xC0 la une" ? 8 : 5) && lists.some(function (l) { return k < l.length; })))
                                                        return out_k_1 = k, "break";
                                                    lists.forEach(function (l) {
                                                        var i = l[k];
                                                        if (i && !seen[i.title.toLowerCase()] && items.length < (name === "\xC0 la une" ? 8 : 5)) {
                                                            seen[i.title.toLowerCase()] = 1;
                                                            items.push(i);
                                                        }
                                                    });
                                                    out_k_1 = k;
                                                };
                                                inc_1 = false;
                                                for (k = 0;;) {
                                                    state_3 = _loop_10(k);
                                                    k = out_k_1;
                                                    if (state_3 === "break")
                                                        break;
                                                }
                                                if (items.length) {
                                                    out[name] = items;
                                                    ok++;
                                                }
                                                return [2 /*return*/];
                                        }
                                    });
                                }); }))];
                        case 1:
                            _d.sent();
                            if (!ok)
                                throw new Error(last || "aucun flux disponible");
                            return [2 /*return*/, out];
                    }
                });
            });
        }
        function refresh(force) {
            return __awaiter(this, void 0, void 0, function () {
                var now, c, _d, e_39;
                var _e;
                return __generator(this, function (_f) {
                    switch (_f.label) {
                        case 0:
                            now = new Date(), c = read();
                            if (loading || !force && c && c.slot === slotOf(now))
                                return [2 /*return*/, false];
                            loading = true;
                            error = "";
                            _f.label = 1;
                        case 1:
                            _f.trys.push([1, 3, 4, 5]);
                            _d = write;
                            _e = { slot: slotOf(now), at: now.toISOString() };
                            return [4 /*yield*/, build()];
                        case 2:
                            _d.apply(void 0, [(_e.sections = _f.sent(), _e)]);
                            return [2 /*return*/, true];
                        case 3:
                            e_39 = _f.sent();
                            error = e_39.message || "erreur";
                            return [2 /*return*/, false];
                        case 4:
                            loading = false;
                            return [7 /*endfinally*/];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        var tts = function () { return typeof window !== "undefined" && window.speechSynthesis && window.SpeechSynthesisUtterance ? window.speechSynthesis : null; };
        function stopReading() {
            queue = [];
            reading = -1;
            paused = false;
            var s = tts();
            if (s)
                try {
                    s.cancel();
                }
                catch (e) {
                }
        }
        function frVoice() {
            var s = tts();
            var v = s && s.getVoices && s.getVoices() || [];
            return v.find(function (x) { return /^fr[-_]FR/i.test(x.lang) && /(thomas|amelie|audrey|marie|google)/i.test(x.name); }) || v.find(function (x) { return /^fr[-_]FR/i.test(x.lang); }) || v.find(function (x) { return /^fr/i.test(x.lang); }) || null;
        }
        function speakQueue(parts, onStep) {
            var s = tts();
            if (!s)
                return toast("La lecture vocale n\u2019est pas disponible sur cet appareil", "err");
            stopReading();
            queue = parts.slice();
            var next = function () {
                if (!queue.length) {
                    reading = -1;
                    onStep(-1);
                    return;
                }
                var p = queue.shift();
                reading = p.idx;
                onStep(p.idx);
                var u = new window.SpeechSynthesisUtterance(p.text);
                u.lang = "fr-FR";
                u.rate = 1;
                var v = frVoice();
                if (v)
                    u.voice = v;
                u.onend = next;
                u.onerror = function () {
                    reading = -1;
                    onStep(-1);
                };
                s.speak(u);
            };
            next();
        }
        var longDate = function (d) {
            var t = d.toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
            return t;
        };
        function scriptFor(c) {
            var parts = [], when = new Date(c.at);
            parts.push({ idx: -1, text: "Voici l\u2019actualit\u00E9 du ".concat(longDate(when), ", \u00E9dition de ").concat(when.getHours() >= 18 || when.getHours() < 6 ? "dix-huit" : "six", " heures.") });
            (c.sections["\xC0 la une"] || []).slice(0, 6).forEach(function (i, k) { return parts.push({ idx: k, text: "".concat(i.title, ". ").concat(i.text || "") }); });
            Object.entries(c.sections).filter(function (_d) {
                var _e = __read(_d, 1), k = _e[0];
                return k !== "\xC0 la une";
            }).forEach(function (_d) {
                var _e = __read(_d, 2), k = _e[0], items = _e[1];
                parts.push({ idx: -1, text: k + "." });
                items.slice(0, 3).forEach(function (i) { return parts.push({ idx: -1, text: i.title + "." }); });
            });
            parts.push({ idx: -1, text: "C\u2019\xE9tait l\u2019essentiel de l\u2019actualit\xE9." });
            return parts;
        }
        var ago = function (iso) {
            var m = Math.round((Date.now() - new Date(iso)) / 6e4);
            return m < 1 ? "\xE0 l\u2019instant" : m < 60 ? "il y a ".concat(m, " min") : m < 1440 ? "il y a ".concat(Math.round(m / 60), " h") : new Date(iso).toLocaleDateString("fr-FR");
        };
        var news = {
            html: function () {
                var c = read();
                var head = "<div class=\"bar newsbar\"><div class=\"grow\"><b>".concat(c ? "\u00C9dition de ".concat(new Date(c.at).getHours() >= 18 || new Date(c.at).getHours() < 6 ? "18 h" : "6 h") : "Actualit\xE9s", "</b><br><small class=\"muted\">").concat(loading ? "Mise \xE0 jour\u2026" : c ? "Mis \u00E0 jour ".concat(esc(ago(c.at)), " \u00B7 prochaine \u00E9dition \u00E0 ").concat(( /* @__PURE__ */new Date()).getHours() >= 6 && ( /* @__PURE__ */new Date()).getHours() < 18 ? "18 h" : "6 h") : "Pas encore de r\xE9sum\xE9", "</small></div>\n      <button class=\"btn primary\" id=\"nRead\">").concat(queue.length || reading >= 0 ? "Arr\xEAter" : "\xC9couter le r\xE9sum\xE9", "</button><button class=\"btn\" id=\"nPause\" ").concat(queue.length ? "" : "hidden", ">").concat(paused ? "Reprendre" : "Pause", "</button><button class=\"btn\" id=\"nRefresh\">\u21BB Actualiser</button></div>");
                var warn = error ? "<div class=\"card glass warn\">Impossible de mettre \u00E0 jour : ".concat(esc(error), ". ").concat(c ? "Le dernier r\xE9sum\xE9 reste affich\xE9." : "R\xE9essayez dans un instant.", "</div>") : "";
                if (!c)
                    return head + warn + "<div class=\"empty\">".concat(loading ? "Chargement des titres du jour\u2026" : "Appuyez sur \xAB Actualiser \xBB pour charger l\u2019actualit\xE9.", "</div>");
                var first = c.sections["\xC0 la une"] || [];
                var brief = "<div class=\"card glass newsbrief\"><h3 class=\"script\">En bref</h3><ol>".concat(first.slice(0, 5).map(function (i) { return "<li>".concat(esc(i.title), "</li>"); }).join(""), "</ol></div>");
                var secs = Object.keys(c.sections);
                var items = c.sections[sec] || [];
                return head + warn + brief + "<div class=\"chips\">".concat(secs.map(function (k) { return "<button data-sec=\"".concat(esc(k), "\" class=\"").concat(k === sec ? "on" : "", "\">").concat(esc(k), "</button>"); }).join(""), "</div>\n      <div class=\"newslist\">").concat(items.map(function (i, k) { return "<article class=\"card glass news ".concat(sec === "\xC0 la une" && k === reading ? "reading" : "", "\" data-k=\"").concat(k, "\">").concat(i.img ? "<img src=\"".concat(esc(i.img), "\" alt=\"\" loading=\"lazy\" onerror=\"this.remove()\">") : "", "<div class=\"grow\"><b>").concat(esc(i.title), "</b>").concat(i.text ? "<p>".concat(esc(i.text), "</p>") : "", "<small class=\"muted\">").concat(esc(i.src)).concat(i.date ? " \xB7 " + esc(new Date(String(i.date).replace(" ", "T")).toLocaleString("fr-FR", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })) : "", " \u00B7 <a href=\"").concat(esc(i.link), "\" target=\"_blank\" rel=\"noopener\">Lire \u2197</a></small></div><button class=\"iconbtn\" data-say=\"").concat(k, "\" aria-label=\"Lire cet article\"></button></article>"); }).join(""), "</div>\n      <p class=\"muted small\">R\u00E9sum\u00E9 automatique des titres et chap\u00F4s publi\u00E9s par France Info et Le Monde. Mis \u00E0 jour \u00E0 chaque \u00E9dition (6 h et 18 h) \u00E0 l\u2019ouverture de la page.</p>");
            },
            bind: function (root, rerender) {
                var redraw = function () {
                    var y = window.pageYOffset;
                    rerender();
                    window.scrollTo(0, y);
                };
                var c = read();
                if (!loading && (!c || c.slot !== slotOf(/* @__PURE__ */ new Date()))) {
                    var p = refresh(false);
                    redraw();
                    p.then(redraw);
                }
                $("#nRefresh", root).onclick = function () {
                    stopReading();
                    var p = refresh(true);
                    redraw();
                    p.then(function (ok) {
                        redraw();
                        if (ok)
                            toast("Actualit\xE9 mise \xE0 jour");
                    });
                };
                $("#nRead", root).onclick = function () {
                    if (queue.length || reading >= 0) {
                        stopReading();
                        return redraw();
                    }
                    var cur = read();
                    if (!cur)
                        return toast("Rien \xE0 lire pour le moment", "err");
                    speakQueue(scriptFor(cur), function (idx) {
                        $$("#content .news.reading").forEach(function (e) { return e.classList.remove("reading"); });
                        var el = idx >= 0 && sec === "\xC0 la une" ? $("#content .news[data-k=\"".concat(idx, "\"]")) : null;
                        if (el)
                            el.classList.add("reading");
                        if (idx === -1 && !queue.length)
                            redraw();
                    });
                    redraw();
                };
                var pz = $("#nPause", root);
                pz.onclick = function () {
                    var s = tts();
                    if (!s)
                        return;
                    if (paused) {
                        s.resume();
                        paused = false;
                    }
                    else {
                        s.pause();
                        paused = true;
                    }
                    pz.textContent = paused ? "Reprendre" : "Pause";
                };
                $$("[data-sec]", root).forEach(function (b) { return b.onclick = function () {
                    sec = b.dataset.sec;
                    redraw();
                }; });
                $$("[data-say]", root).forEach(function (b) { return b.onclick = function () {
                    var i = (read().sections[sec] || [])[+b.dataset.say];
                    if (i)
                        speakQueue([{ idx: -1, text: "".concat(i.title, ". ").concat(i.text || "") }], function () {
                        });
                }; });
            }
        };
        return { slotOf: slotOf, refresh: refresh, stopReading: stopReading, news: news };
    })();
    __m.misc = (function () {
        var _d = __m.util, $ = _d.$, $$ = _d.$$, esc = _d.esc, toast = _d.toast, formDialog = _d.formDialog, openModal = _d.openModal, closeModal = _d.closeModal, ymd = _d.ymd, parseYmd = _d.parseYmd, addDays = _d.addDays, fmtLong = _d.fmtLong, fmtTime = _d.fmtTime, toLocalInput = _d.toLocalInput, PEOPLE = _d.PEOPLE;
        var db = __m.db;
        var t = function (k) { return db.store.t[k]; };
        var pIndex = function (o) { return Math.max(0, PEOPLE.indexOf(o)); };
        var ART = {
            courses: '<polygon points="40,92 150,92 160,200 30,200" fill="#d4e9dc"/><polygon points="150,92 176,102 186,200 160,200" fill="#a6c9b4"/><polygon points="40,92 150,92 152,108 38,108" fill="#e4f1e8"/><path d="M62 94C62 60 130 60 130 94" fill="none" stroke="#98bda7" stroke-width="7" stroke-linecap="round"/><polygon points="56,94 62,22 76,24 76,94" fill="#8aa68c"/><polygon points="76,94 82,30 98,34 92,94" fill="#a8c0a1"/><polygon points="56,94 59,68 76,72 76,94" fill="#f3f0e1"/><polygon points="76,94 78,72 92,74 92,94" fill="#e4e8d6"/><polygon points="98,94 104,40 124,34 130,94" fill="#ecdeb9"/><polygon points="104,40 124,34 128,56 106,62" fill="#f5ebcf"/><polygon points="132,94 136,58 162,54 164,94" fill="#f1f6ef"/><polygon points="136,58 162,54 152,44 140,46" fill="#d8e8da"/>',
            agenda: '<polygon points="30,60 190,60 190,200 30,200" fill="#fbf0d6"/><polygon points="30,60 190,60 190,96 30,96" fill="#f2b878"/><polygon points="30,96 190,96 190,104 30,104" fill="#e19f5c"/><rect x="58" y="34" width="16" height="44" rx="8" fill="#c9694d"/><rect x="146" y="34" width="16" height="44" rx="8" fill="#c9694d"/><g fill="#e9d6ab"><rect x="48" y="122" width="22" height="18" rx="4"/><rect x="88" y="122" width="22" height="18" rx="4"/><rect x="128" y="122" width="22" height="18" rx="4"/><rect x="48" y="156" width="22" height="18" rx="4"/><rect x="88" y="156" width="22" height="18" rx="4"/></g><rect x="128" y="156" width="22" height="18" rx="4" fill="#e59a6d"/>',
            menu: '<circle cx="118" cy="128" r="76" fill="#f2a493"/><circle cx="118" cy="128" r="60" fill="#f7b9aa"/><polygon points="80,110 100,88 128,92 150,106 156,134 138,156 108,160 86,146" fill="#e7c876"/><polygon points="100,88 128,92 118,110" fill="#cfb865"/><polygon points="138,156 156,134 160,150 146,166" fill="#a9bd9c"/><polygon points="86,146 108,160 96,170 80,160" fill="#a9bd9c"/><polygon points="40,70 48,70 50,110 38,110" fill="#fbf3e6"/><polygon points="38,110 50,110 46,200 42,200" fill="#fbf3e6"/><polygon points="62,70 74,200 66,200 56,114 56,70" fill="#fbf3e6"/>',
            recettes: '<polygon points="46,92 176,92 168,196 54,196" fill="#e3c25c"/><polygon points="120,92 176,92 168,196 130,196" fill="#cfab43"/><polygon points="40,70 182,70 176,92 46,92" fill="#f1d676"/><polygon points="40,70 182,70 170,58 52,58" fill="#f7e49a"/><polygon points="98,58 124,58 118,40 104,40" fill="#fbf1cf"/><polygon points="30,104 46,100 46,120 30,124" fill="#fbf3e2"/><polygon points="182,96 198,92 198,112 182,116" fill="#fbf3e2"/><polygon points="150,60 196,14 204,24 164,70" fill="#b87642"/>',
            cave: '<polygon points="20,40 190,40 190,200 20,200" fill="#ea8b7e"/><polygon points="34,54 176,54 176,110 34,110" fill="#c25a4f"/><polygon points="34,124 176,124 176,200 34,200" fill="#c25a4f"/><polygon points="20,112 190,112 190,122 20,122" fill="#f3b3a8"/><polygon points="10,40 30,28 190,28 190,40" fill="#f3b3a8"/><polygon points="40,70 112,70 130,76 130,94 112,98 40,98" fill="#3e6d55"/><polygon points="40,70 52,70 52,98 40,98" fill="#f0e4c8"/><polygon points="78,70 104,70 104,98 78,98" fill="#e9e3cf"/><polygon points="44,146 116,146 134,152 134,172 116,176 44,176" fill="#3e6d55"/><polygon points="44,146 56,146 56,176 44,176" fill="#f0e4c8"/><polygon points="82,146 108,146 108,176 82,176" fill="#e9e3cf"/>',
            news: '<polygon points="28,40 150,40 150,200 28,200" fill="#f7f3e8"/><polygon points="150,70 190,70 190,200 150,200" fill="#e8e0cc"/><rect x="44" y="56" width="90" height="16" rx="3" fill="#2f5e86"/><rect x="44" y="86" width="42" height="36" rx="3" fill="#9cc3e2"/><g fill="#b9c7d3"><rect x="94" y="86" width="40" height="6" rx="3"/><rect x="94" y="100" width="40" height="6" rx="3"/><rect x="94" y="114" width="40" height="6" rx="3"/><rect x="44" y="134" width="90" height="6" rx="3"/><rect x="44" y="148" width="90" height="6" rx="3"/><rect x="44" y="162" width="60" height="6" rx="3"/></g><circle cx="150" cy="150" r="26" fill="#e9a24f"/><polygon points="142,138 142,162 164,150" fill="#fbf0d6"/>',
            playlists: '<circle cx="108" cy="116" r="88" fill="#3d4272"/><circle cx="108" cy="116" r="70" fill="none" stroke="#5a5f9a" stroke-width="3"/><circle cx="108" cy="116" r="54" fill="none" stroke="#5a5f9a" stroke-width="3"/><circle cx="108" cy="116" r="36" fill="#e9cf7b"/><circle cx="108" cy="116" r="7" fill="#3d4272"/><polygon points="108,116 196,92 196,66" fill="#4d5290" opacity=".55"/><path d="M150 40v46a14 14 0 1 1-8-12.5V34l40-10v40" fill="none" stroke="#f6f0dc" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>',
            maison: '<polygon points="30,98 150,98 150,200 30,200" fill="#f4ecd9"/><polygon points="150,98 190,112 190,200 150,200" fill="#dccfb2"/><polygon points="20,98 90,36 160,98" fill="#2d5b4e"/><polygon points="90,36 160,98 190,112 110,40" fill="#234a3f"/><polygon points="72,36 108,36 108,10 94,10" fill="#2d5b4e" opacity="0"/><rect x="48" y="124" width="26" height="34" rx="3" fill="#e8c76c"/><rect x="104" y="124" width="26" height="34" rx="3" fill="#e8c76c"/><polygon points="74,200 74,158 100,158 100,200" fill="#2d5b4e"/><polygon points="76,62 102,62 102,86 76,86" fill="#e8c76c"/>'
        };
        var TILES = [
            ["recipes", "Recettes", "recettes", "#faf0b0", "#f4e08e"],
            ["menus", "Planning", "menu", "#f3b3a4", "#e5806f"],
            ["courses", "Courses", "courses", "#c6edd8", "#8fc3a6"],
            ["cellar", "Cave \xE0 vin", "cave", "#f1a7a0", "#ee7f72"],
            ["agenda", "Calendrier", "agenda", "#fcf0c8", "#f6cd8b"],
            ["news", "Actualit\xE9", "news", "#d6e9f8", "#9ec8e8"],
            ["homebook", "Maison", "maison", "#cfe8e0", "#8fc5b5"],
            ["music", "Playlists", "playlists", "#e1dcf6", "#aeb0ee"]
        ];
        var home = {
            html: function (user) {
                var now = /* @__PURE__ */ new Date(), key = ymd(now);
                var meals = t("meal_plans").filter(function (p) { return p.meal_date === key; }).sort(function (a, b) { return (a.meal_type === "midi" ? -1 : 1) - (b.meal_type === "midi" ? -1 : 1); });
                var events = t("family_events").filter(function (e) { return e.starts_at && new Date(e.starts_at) >= new Date(now.getFullYear(), now.getMonth(), now.getDate()); }).sort(function (a, b) { return a.starts_at.localeCompare(b.starts_at); }).slice(0, 5);
                var todo = t("shopping_items").filter(function (i) { return !i.checked; }).length;
                var badge = { Courses: todo, Calendrier: events.length };
                var tile = function (_d) {
                    var _e = __read(_d, 5), go = _e[0], title = _e[1], art = _e[2], c1 = _e[3], c2 = _e[4];
                    return "<button class=\"mtile\" data-go=\"".concat(go, "\" style=\"background:linear-gradient(155deg,").concat(c1, ",").concat(c2, ")\"><b>").concat(title, "</b>").concat(badge[title] ? "<span class=\"badge\">".concat(badge[title], "</span>") : "", "<svg class=\"art\" viewBox=\"0 0 200 200\" aria-hidden=\"true\">").concat(ART[art], "</svg></button>");
                };
                return "<div class=\"mtiles\">".concat(TILES.map(tile).join(""), "</div>\n    <div class=\"grid2 homecards\">\n     <div class=\"card glass\"><h3 class=\"script\">Aujourd\u2019hui \u00E0 table</h3>").concat(meals.map(function (m) { return "<div class=\"row\"><span class=\"chip\">".concat(m.meal_type === "midi" ? "D\xE9jeuner" : "D\xEEner", "</span><b class=\"grow\">").concat(esc(m.title || ""), "</b></div>"); }).join("") || '<p class="muted">Rien de planifi\xE9 aujourd\u2019hui.</p>', "<div class=\"bar\" style=\"margin:12px 0 0\"><button class=\"btn primary small\" data-go=\"menus\">Pr\u00E9parer les menus de la semaine</button></div></div>\n     <div class=\"card glass\"><h3 class=\"script\">\u00C0 venir</h3>").concat(events.map(function (e) { return "<div class=\"row\"><span class=\"dot p".concat(pIndex(e.owner), "\"></span><span class=\"grow\"><b>").concat(esc(e.title), "</b><br><small>").concat(esc(fmtLong(new Date(e.starts_at))), " \u00B7 ").concat(esc(fmtTime(e.starts_at)), "</small></span></div>"); }).join("") || '<p class="muted">Aucun rendez-vous \xE0 venir.</p>', "</div>\n    </div>");
            },
            bind: function (root, _rerender, go) {
                $$("[data-go]", root).forEach(function (b) { return b.onclick = function () { return go(b.dataset.go); }; });
            }
        };
        var month = /* @__PURE__ */ new Date();
        month.setDate(1);
        var agenda = {
            html: function () {
                var first = new Date(month.getFullYear(), month.getMonth(), 1), pad = (first.getDay() + 6) % 7;
                var start = addDays(first, -pad), key = ymd(/* @__PURE__ */ new Date());
                var byDay = {};
                t("family_events").forEach(function (e) {
                    var _a;
                    if (e.starts_at)
                        (byDay[_a = ymd(new Date(e.starts_at))] || (byDay[_a] = [])).push(e);
                });
                var cells = Array.from({ length: 42 }, function (_, i) { return addDays(start, i); });
                var monthEvents = t("family_events").filter(function (e) { return e.starts_at && new Date(e.starts_at).getMonth() === month.getMonth() && new Date(e.starts_at).getFullYear() === month.getFullYear(); }).sort(function (a, b) { return a.starts_at.localeCompare(b.starts_at); });
                return "<div class=\"bar\"><div class=\"seg\"><button id=\"mprev\" aria-label=\"Mois pr\u00E9c\u00E9dent\">\u2039</button><button id=\"mnow\">Aujourd\u2019hui</button><button id=\"mnext\" aria-label=\"Mois suivant\">\u203A</button></div>\n      <b class=\"weeklabel\">".concat(esc(month.toLocaleDateString("fr-FR", { month: "long", year: "numeric" })), "</b><span class=\"grow\"></span><button class=\"btn primary\" id=\"addEv\">\uFF0B Rendez-vous</button></div>\n      <div class=\"legend\">").concat(PEOPLE.map(function (p, i) { return "<span><i class=\"p".concat(i, "\"></i>").concat(p, "</span>"); }).join(""), "</div>\n      <div class=\"month glass\">").concat(["lun", "mar", "mer", "jeu", "ven", "sam", "dim"].map(function (d) { return "<div class=\"dow\">".concat(d, "</div>"); }).join(""), "\n      ").concat(cells.map(function (d) { return "<button class=\"day ".concat(d.getMonth() !== month.getMonth() ? "off" : "", " ").concat(ymd(d) === key ? "today" : "", "\" data-day=\"").concat(ymd(d), "\"><span>").concat(d.getDate(), "</span><div class=\"dots\">").concat((byDay[ymd(d)] || []).slice(0, 4).map(function (e) { return "<i class=\"p".concat(pIndex(e.owner), "\"></i>"); }).join(""), "</div></button>"); }).join(""), "</div>\n      <div class=\"card glass\"><h3 class=\"script\">Ce mois-ci</h3>").concat(monthEvents.map(function (e) { return "<button class=\"row evrow\" data-ev=\"".concat(e.id, "\"><span class=\"dot p").concat(pIndex(e.owner), "\"></span><span class=\"grow\"><b>").concat(esc(e.title), "</b><br><small>").concat(esc(fmtLong(new Date(e.starts_at))), " \u00B7 ").concat(esc(fmtTime(e.starts_at)), " \u00B7 ").concat(esc(e.owner || ""), "</small></span></button>"); }).join("") || '<p class="muted">Aucun rendez-vous ce mois-ci.</p>', "\n      <p class=\"muted small\">La synchronisation avec Google Agenda n\u2019est pas encore branch\u00E9e : les rendez-vous saisis ici sont partag\u00E9s entre vos appareils.</p></div>");
            },
            bind: function (root, rerender) {
                $("#mprev", root).onclick = function () {
                    month = new Date(month.getFullYear(), month.getMonth() - 1, 1);
                    rerender();
                };
                $("#mnext", root).onclick = function () {
                    month = new Date(month.getFullYear(), month.getMonth() + 1, 1);
                    rerender();
                };
                $("#mnow", root).onclick = function () {
                    month = /* @__PURE__ */ new Date();
                    month.setDate(1);
                    rerender();
                };
                $("#addEv", root).onclick = function () { return editEvent({}, ymd(/* @__PURE__ */ new Date())); };
                root.onclick = function (e) {
                    var d = e.target.closest("[data-day]");
                    if (d)
                        return editEvent({}, d.dataset.day);
                    var ev = e.target.closest("[data-ev]");
                    if (ev)
                        return editEvent(t("family_events").find(function (x) { return x.id === ev.dataset.ev; }));
                };
            }
        };
        function editEvent(ev, day) {
            var _this = this;
            if (ev === void 0) { ev = {}; }
            formDialog({
                title: ev.id ? "Modifier le rendez-vous" : "Nouveau rendez-vous",
                fields: [
                    { name: "title", label: "Intitul\xE9", required: true, full: true },
                    { name: "owner", label: "Pour", type: "select", options: PEOPLE },
                    { name: "starts_at", label: "D\xE9but", type: "datetime-local", required: true },
                    { name: "ends_at", label: "Fin", type: "datetime-local" }
                ],
                values: __spreadProps(__spreadValues({ owner: "Famille" }, ev), { starts_at: ev.starts_at ? toLocalInput(ev.starts_at) : "".concat(day, "T09:00"), ends_at: ev.ends_at ? toLocalInput(ev.ends_at) : "" }),
                danger: ev.id ? { label: "Supprimer", confirm: "Supprimer ce rendez-vous ?", run: function () { return db.del("family_events", ev.id); } } : null,
                onSubmit: function (v) { return __awaiter(_this, void 0, void 0, function () {
                    var row;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                row = { title: v.title, owner: v.owner, starts_at: new Date(v.starts_at).toISOString(), ends_at: v.ends_at ? new Date(v.ends_at).toISOString() : null };
                                if (!ev.id) return [3 /*break*/, 2];
                                return [4 /*yield*/, db.patch("family_events", ev.id, row)];
                            case 1:
                                _d.sent();
                                return [3 /*break*/, 4];
                            case 2: return [4 /*yield*/, db.add("family_events", row)];
                            case 3:
                                _d.sent();
                                _d.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); }
            });
        }
        function spotifyInfo(raw) {
            var t2 = String(raw || "").trim();
            var m = t2.match(/open\.spotify\.com\/(?:intl-[a-z]+\/)?(?:embed\/)?(playlist|album|track|artist|show|episode)\/([A-Za-z0-9]{10,30})/) || t2.match(/spotify:(playlist|album|track|artist|show|episode):([A-Za-z0-9]{10,30})/);
            if (m)
                return { type: m[1], id: m[2], web: "https://open.spotify.com/".concat(m[1], "/").concat(m[2]), embed: "https://open.spotify.com/embed/".concat(m[1], "/").concat(m[2]) };
            if (/^[A-Za-z0-9]{22}$/.test(t2))
                return { type: "playlist", id: t2, web: "https://open.spotify.com/playlist/".concat(t2), embed: "https://open.spotify.com/embed/playlist/".concat(t2) };
            m = t2.match(/https?:\/\/(?:spotify\.link|spoti\.fi)\/\S+/);
            return m ? { type: "short", web: m[0] } : null;
        }
        var music = {
            html: function () {
                return "<div class=\"bar\"><span class=\"muted\">\u00AB \u00C9couter \u00BB lance la playlist ici ; \u00AB Spotify \u00BB l\u2019ouvre dans l\u2019appli. Pour une playlist priv\u00E9e, connectez-vous \u00E0 Spotify dans ce navigateur.</span><span class=\"grow\"></span><button class=\"btn primary\" id=\"addPl\">\uFF0B Playlist</button></div>\n      <div class=\"plgrid\">".concat(t("playlists").map(function (p) {
                    var i = spotifyInfo(p.spotify_url);
                    return "<div class=\"card glass pl\"><span class=\"ico\"></span><div class=\"grow\"><b>".concat(esc(p.title), "</b><br><small>").concat(esc(p.owner || "Famille")).concat(i ? "" : " \xB7 lien non reconnu", "</small></div>").concat(i && i.embed ? "<button class=\"btn primary small\" data-play=\"".concat(p.id, "\">\u00C9couter</button>") : "", "<a class=\"btn small\" href=\"").concat(esc(i ? i.web : p.spotify_url), "\">Spotify \u2197</a><button class=\"iconbtn\" data-edit=\"").concat(p.id, "\" aria-label=\"Modifier\">\u22EF</button></div>");
                }).join("") || '<div class="empty">Ajoutez le lien de vos playlists Spotify.</div>', "</div>");
            },
            bind: function (root) {
                var _this = this;
                var edit = function (p) {
                    if (p === void 0) { p = {}; }
                    return formDialog({
                        title: p.id ? "Modifier la playlist" : "Nouvelle playlist",
                        values: __spreadValues({ owner: "Famille" }, p),
                        fields: [{ name: "title", label: "Nom", required: true, full: true }, { name: "spotify_url", label: "Lien Spotify", required: true, full: true, placeholder: "https://open.spotify.com/playlist/\u2026", hint: "Dans Spotify : \u22EF \u203A Partager \u203A Copier le lien de la playlist" }, { name: "owner", label: "\xC0 qui", type: "select", options: PEOPLE }],
                        danger: p.id ? { label: "Supprimer", confirm: "Supprimer cette playlist ?", run: function () { return db.del("playlists", p.id); } } : null,
                        onSubmit: function (v) { return __awaiter(_this, void 0, void 0, function () {
                            var i;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        i = spotifyInfo(v.spotify_url);
                                        if (!i)
                                            throw new Error("Lien Spotify non reconnu : collez le lien \xAB Copier le lien de la playlist \xBB.");
                                        v.spotify_url = i.web;
                                        if (!p.id) return [3 /*break*/, 2];
                                        return [4 /*yield*/, db.patch("playlists", p.id, v)];
                                    case 1:
                                        _d.sent();
                                        return [3 /*break*/, 4];
                                    case 2: return [4 /*yield*/, db.add("playlists", v)];
                                    case 3:
                                        _d.sent();
                                        _d.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }
                    });
                };
                var play = function (p) {
                    var i = spotifyInfo(p.spotify_url);
                    openModal("<h2 class=\"script\">".concat(esc(p.title), "</h2><iframe class=\"spframe\" src=\"").concat(esc(i.embed), "\" width=\"100%\" height=\"380\" frameborder=\"0\" allow=\"autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture\" loading=\"lazy\"></iframe><div class=\"formactions\"><a class=\"btn\" href=\"").concat(esc(i.web), "\">Ouvrir dans Spotify \u2197</a><span class=\"grow\"></span><button class=\"btn primary\" data-close>Fermer</button></div>"), { wide: true, onMount: function (r) {
                            $("[data-close]", r).onclick = closeModal;
                        } });
                };
                $("#addPl", root).onclick = function () { return edit(); };
                root.onclick = function (e) {
                    var b = e.target.closest("[data-edit]");
                    if (b)
                        return edit(t("playlists").find(function (x) { return x.id === b.dataset.edit; }));
                    var pl = e.target.closest("[data-play]");
                    if (pl)
                        play(t("playlists").find(function (x) { return x.id === pl.dataset.play; }));
                };
            }
        };
        var homebook = {
            html: function () {
                return "<div class=\"card glass accent\"><b>Espace de notes partag\u00E9.</b> Pratique pour les garanties, contacts d\u2019artisans, codes d\u2019appareils m\u00E9nagers\u2026 N\u2019y saisissez pas d\u2019informations financi\u00E8res ou tr\u00E8s sensibles (mots de passe, num\u00E9ros de compte).</div>\n      <div class=\"bar\"><span class=\"grow\"></span><button class=\"btn primary\" id=\"addNote\">\uFF0B Note</button></div>\n      <div class=\"notes\">".concat(__spreadArray([], __read(t("family_notes")), false).sort(function (a, b) { return (b.created_at || "").localeCompare(a.created_at || ""); }).map(function (n) { return "<button class=\"note glass\" data-note=\"".concat(n.id, "\"><b class=\"script\">").concat(esc(n.title || "Sans titre"), "</b><p>").concat(esc((n.body || "").slice(0, 220)), "</p></button>"); }).join("") || '<div class="empty">Aucune note pour le moment.</div>', "</div>");
            },
            bind: function (root) {
                var _this = this;
                var edit = function (n) {
                    if (n === void 0) { n = {}; }
                    return formDialog({
                        title: n.id ? "Modifier la note" : "Nouvelle note",
                        values: n,
                        fields: [{ name: "title", label: "Titre", required: true, full: true }, { name: "body", label: "Note", type: "textarea", rows: 8, full: true }],
                        danger: n.id ? { label: "Supprimer", confirm: "Supprimer cette note ?", run: function () { return db.del("family_notes", n.id); } } : null,
                        onSubmit: function (v) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        if (!n.id) return [3 /*break*/, 2];
                                        return [4 /*yield*/, db.patch("family_notes", n.id, v)];
                                    case 1:
                                        _d.sent();
                                        return [3 /*break*/, 4];
                                    case 2: return [4 /*yield*/, db.add("family_notes", v)];
                                    case 3:
                                        _d.sent();
                                        _d.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }
                    });
                };
                $("#addNote", root).onclick = function () { return edit(); };
                root.onclick = function (e) {
                    var b = e.target.closest("[data-note]");
                    if (b)
                        edit(t("family_notes").find(function (x) { return x.id === b.dataset.note; }));
                };
            }
        };
        return { home: home, agenda: agenda, spotifyInfo: spotifyInfo, music: music, homebook: homebook };
    })();
    __m.app = (function () {
        var _d = __m.util, $ = _d.$, $$ = _d.$$, esc = _d.esc, toast = _d.toast, openModal = _d.openModal, closeModal = _d.closeModal;
        var db = __m.db;
        var cellar = __m.cellar;
        var recipes = __m.recipes;
        var menus = __m.menus;
        var courses = __m.courses;
        var _e = __m.news, news = _e.news, stopReading = _e.stopReading;
        var _f = __m.misc, home = _f.home, agenda = _f.agenda, music = _f.music, homebook = _f.homebook;
        var PAGES = {
            home: { icon: "", label: "Accueil", title: "Bonjour \xE0 tous", mod: home, tables: ["meal_plans", "family_events", "shopping_items", "recipes", "cellar_items"] },
            recipes: { icon: "", label: "Recettes", title: "Le carnet de recettes", mod: recipes, tables: ["recipes"] },
            menus: { icon: "", label: "Planning de la semaine", title: "Le planning des repas", mod: menus, tables: ["meal_plans", "recipes"] },
            courses: { icon: "", label: "Liste de courses", title: "La liste de courses", mod: courses, tables: ["shopping_items"] },
            cellar: { icon: "", label: "Cave & spiritueux", title: "Notre cave", mod: cellar, tables: ["cellar_items"] },
            agenda: { icon: "", label: "Agenda", title: "L\u2019agenda familial", mod: agenda, tables: ["family_events"] },
            news: { icon: "", label: "Actualit\xE9s", title: "L\u2019actualit\xE9 du jour", mod: news, tables: [] },
            homebook: { icon: "", label: "Maison", title: "La maison", mod: homebook, tables: ["family_notes"] },
            music: { icon: "", label: "Playlists", title: "Nos playlists", mod: music, tables: ["playlists"] }
        };
        var page = "home";
        try {
            var p = localStorage.getItem("family-page");
            if (PAGES[p])
                page = p;
        }
        catch (e) {
        }
        function go(p) {
            $("#nav").classList.add("hidden");
            if (p !== page)
                stopReading();
            page = p;
            try {
                localStorage.setItem("family-page", p);
            }
            catch (e) {
            }
            render();
            window.scrollTo(0, 0);
        }
        function render() {
            var P = PAGES[page], root = $("#content");
            $$("#nav button").forEach(function (b) { return b.classList.toggle("active", b.dataset.page === page); });
            if (page === "home") {
                var d = ( /* @__PURE__ */new Date()).toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" });
                $("#heading").textContent = d.charAt(0).toUpperCase() + d.slice(1);
                $("#subheading").textContent = "Emilie \xB7 Alexandre \xB7 Hugo \xB7 Gaspard";
            }
            else {
                $("#heading").textContent = P.title;
                $("#subheading").textContent = "";
            }
            $("#floatnav").classList.toggle("onhome", page === "home");
            root.innerHTML = P.mod.html();
            P.mod.bind(root, render, go);
        }
        var renderTimer;
        function scheduleRender(table) {
            if (table === "_sync")
                return paintSync();
            if (table !== "*" && !PAGES[page].tables.includes(table))
                return;
            clearTimeout(renderTimer);
            renderTimer = setTimeout(function () {
                var a = document.activeElement;
                if (a && $("#content").contains(a) && /input|textarea|select/i.test(a.tagName))
                    return;
                if (!$("#appShell").classList.contains("hidden")) {
                    var y = window.pageYOffset;
                    render();
                    window.scrollTo(0, y);
                }
            }, 60);
        }
        function paintSync() {
            var m = { live: ["\u25CF Synchronis\xE9", "live"], connecting: ["\u25CF Connexion\u2026", "wait"], offline: ["\u25CF Hors ligne", "off"] }[db.store.sync];
            ["syncBadge", "syncBadge2"].forEach(function (id) {
                var el = $("#" + id);
                el.textContent = m[0];
                el.className = "sync " + m[1];
            });
        }
        function showLogin(msg) {
            if (msg === void 0) { msg = ""; }
            $("#appShell").classList.add("hidden");
            $("#loginScreen").classList.remove("hidden");
            $("#loginMessage").textContent = msg;
        }
        function enter(user) {
            return __awaiter(this, void 0, void 0, function () {
                var e_40, missing;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            db.store.user = user;
                            $("#loginScreen").classList.add("hidden");
                            $("#appShell").classList.remove("hidden");
                            $("#signedInAs").textContent = user.email || "";
                            $("#banner").innerHTML = "";
                            render();
                            paintSync();
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 4, , 5]);
                            return [4 /*yield*/, db.loadFamily()];
                        case 2:
                            if (!(_d.sent())) {
                                $("#banner").innerHTML = "<div class=\"card glass warn\"><b>Votre compte n\u2019est rattach\u00E9 \u00E0 aucune famille.</b> Ex\u00E9cutez le script <code>supabase/002_family_sync.sql</code> dans le SQL Editor de Supabase, puis rechargez la page.</div>";
                                return [2 /*return*/];
                            }
                            return [4 /*yield*/, db.loadAll()];
                        case 3:
                            _d.sent();
                            db.startRealtime();
                            return [3 /*break*/, 5];
                        case 4:
                            e_40 = _d.sent();
                            console.error(e_40);
                            missing = /relation|does not exist|schema cache|permission|42P01|PGRST/i.test(e_40.message || "");
                            $("#banner").innerHTML = "<div class=\"card glass warn\"><b>Impossible de charger les donn\u00E9es.</b> ".concat(missing ? "Les tables ne sont pas pr\xEAtes : ex\xE9cutez <code>supabase/002_family_sync.sql</code> dans le SQL Editor de Supabase." : esc(e_40.message || ""), "</div>");
                            db.startRealtime();
                            return [3 /*break*/, 5];
                        case 5: return [2 /*return*/];
                    }
                });
            });
        }
        function detectFlexGap() {
            var d = document.createElement("div");
            d.style.cssText = "display:flex;flex-direction:column;gap:1px;position:absolute;visibility:hidden";
            for (var i = 0; i < 2; i++) {
                var c = document.createElement("i");
                c.style.height = "1px";
                d.appendChild(c);
            }
            document.body.appendChild(d);
            var ok = d.scrollHeight === 3;
            document.body.removeChild(d);
            if (!ok)
                document.documentElement.classList.add("no-flexgap");
        }
        function boot() {
            return __awaiter(this, void 0, void 0, function () {
                var sb, logout, session;
                var _this = this;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            detectFlexGap();
                            $("#nav").innerHTML = Object.entries(PAGES).map(function (_d) {
                                var _e = __read(_d, 2), k = _e[0], p = _e[1];
                                return "<button data-page=\"".concat(k, "\"><span>").concat(p.label, "</span></button>");
                            }).join("");
                            $("#nav").onclick = function (e) {
                                var b = e.target.closest("[data-page]");
                                if (b)
                                    go(b.dataset.page);
                            };
                            $("#menuBtn").onclick = function (e) {
                                e.stopPropagation();
                                $("#nav").classList.toggle("hidden");
                            };
                            document.addEventListener("click", function (e) {
                                if (!e.target.closest("#nav") && !e.target.closest("#menuBtn"))
                                    $("#nav").classList.add("hidden");
                            });
                            $("#homeBtn").onclick = $("#homeBtn2").onclick = function () { return go("home"); };
                            $("#familyPill").onclick = function () { return go("home"); };
                            $("#dlg").addEventListener("click", function (e) {
                                if (e.target.id === "dlg")
                                    closeModal();
                            });
                            db.onChange(scheduleRender);
                            sb = db.createClientFromConfig();
                            if (!sb)
                                return [2 /*return*/, showLogin(db.store.configError || "Configuration Supabase \xE0 v\xE9rifier dans config.js")];
                            $("#loginForm").onsubmit = function (e) { return __awaiter(_this, void 0, void 0, function () {
                                var _d, data, error;
                                return __generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            e.preventDefault();
                                            $("#loginMessage").textContent = "Connexion\u2026";
                                            return [4 /*yield*/, sb.auth.signInWithPassword({ email: $("#email").value.trim(), password: $("#password").value })];
                                        case 1:
                                            _d = _e.sent(), data = _d.data, error = _d.error;
                                            if (error)
                                                $("#loginMessage").textContent = /invalid login/i.test(error.message) ? "E-mail ou mot de passe incorrect." : error.message;
                                            else
                                                enter(data.user);
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            logout = function () { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_d) {
                                    switch (_d.label) {
                                        case 0:
                                            closeModal();
                                            db.stopRealtime();
                                            return [4 /*yield*/, sb.auth.signOut()];
                                        case 1:
                                            _d.sent();
                                            db.clearCache();
                                            db.store.user = null;
                                            showLogin();
                                            return [2 /*return*/];
                                    }
                                });
                            }); };
                            $("#userBtn").onclick = function () { return openModal("<h2 class=\"script\">Mon compte</h2><p class=\"muted\">".concat(esc(db.store.user && db.store.user.email || ""), "</p><p><span id=\"syncBadge3\" class=\"sync ").concat(esc(db.store.sync === "live" ? "live" : db.store.sync === "connecting" ? "wait" : "off"), "\">").concat(db.store.sync === "live" ? "\u25CF Synchronis\xE9 sur tous vos appareils" : db.store.sync === "connecting" ? "\u25CF Connexion\u2026" : "\u25CF Hors ligne", "</span></p><div class=\"formactions\"><button class=\"btn ghost\" data-close>Fermer</button><span class=\"grow\"></span><button class=\"btn danger\" id=\"logoutBtn\">Se d\u00E9connecter</button></div>"), { onMount: function (r) {
                                    $("[data-close]", r).onclick = closeModal;
                                    $("#logoutBtn", r).onclick = logout;
                                } }); };
                            $("#loginMessage").textContent = "";
                            return [4 /*yield*/, sb.auth.getSession()];
                        case 1:
                            session = (_d.sent()).data.session;
                            if (session)
                                enter(session.user);
                            else
                                showLogin();
                            return [2 /*return*/];
                    }
                });
            });
        }
        boot();
    })();
})();
