"use strict";
// Étape 1 : titres par thème via flux RSS (sans IA).
// Dans l'APK (Capacitor), la lecture directe des flux fonctionne ; en page web simple,
// on bascule sur rss2json (gratuit, limité) faute d'autorisation CORS des médias.
const $ = s => document.querySelector(s);
const CLE_CACHE = "actu_cache_v1", CLE_FAV = "actu_fav_v1", CLE_VU = "actu_vu_v1";
const lire = (k, d) => { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } };
const ecrire = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} };

let themeActif = "breaking";
let articles = lire(CLE_CACHE, { date: null, items: [] }).items;
let favoris = new Set(lire(CLE_FAV, []));
const dejaVus = new Set(lire(CLE_VU, []));

const nettoyer = h => { const d = document.createElement("div"); d.innerHTML = h || ""; return (d.textContent || "").replace(/\s+/g, " ").trim(); };
const tronquer = (t, n) => t.length > n ? t.slice(0, n - 1).trimEnd() + "…" : t;

function avecDelai(url, ms = 12000) {
  const c = new AbortController(), t = setTimeout(() => c.abort(), ms);
  return fetch(url, { signal: c.signal }).finally(() => clearTimeout(t));
}

async function lireFlux(src) {
  // 0) relais Cloudflare, s'il est configuré (PROXY_URL dans sources.js)
  if (typeof PROXY_URL === "string" && PROXY_URL) {
    const r = await avecDelai(PROXY_URL + "?url=" + encodeURIComponent(src.url), 15000);
    if (!r.ok) throw new Error("refusé par le site (code " + r.status + ")");
    const items = analyserXml(await r.text(), src);
    if (!items.length) throw new Error("réponse vide ou page non XML (adresse du flux à revoir)");
    return items;
  }
  // 1) lecture directe (APK)
  try {
    const r = await avecDelai(src.url);
    if (r.ok) return analyserXml(await r.text(), src);
  } catch {}
  // 2) repli : rss2json
  const r2 = await avecDelai("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent(src.url));
  const j = await r2.json();
  if (j.status !== "ok") throw new Error("flux indisponible");
  return j.items.map(i => creer(src, i.title, i.link, i.pubDate, i.description));
}

function analyserXml(xml, src) {
  const doc = new DOMParser().parseFromString(xml, "text/xml");
  const noeuds = [...doc.querySelectorAll("item, entry")];
  return noeuds.map(n => {
    const t = s => n.querySelector(s)?.textContent || "";
    const lien = t("link") || n.querySelector("link")?.getAttribute("href") || "";
    return creer(src, t("title"), lien, t("pubDate") || t("published") || t("updated"), t("description") || t("summary"));
  });
}

function creer(src, titre, lien, date, desc) {
  const d = new Date(date);
  return {
    id: lien || titre, titre: nettoyer(titre), lien, theme: src.theme, source: src.name, lang: src.lang, etat: !!src.etat,
    date: isNaN(d) ? Date.now() : d.getTime(), extrait: tronquer(nettoyer(desc), 220)
  };
}

function dedoublonner(liste) {
  const vus = new Map();
  for (const a of liste) {
    const cle = a.titre.toLowerCase().replace(/[^\p{L}\p{N} ]/gu, "").split(" ").filter(m => m.length > 3).slice(0, 8).join(" ");
    if (!cle) continue;
    if (vus.has(cle)) { vus.get(cle).autres.push(a.source); continue; }
    a.autres = [];
    vus.set(cle, a);
  }
  return [...vus.values()];
}

async function actualiser() {
  $("#etat").textContent = "Mise à jour…";
  // 5 flux en parallèle au maximum, pour ne pas saturer le service de repli
  let tous = [], echecs = [], suivant = 0;
  const ouvrier = async () => {
    while (suivant < SOURCES.length) {
      const src = SOURCES[suivant++];
      try { tous = tous.concat((await lireFlux(src)).slice(0, 15)); }
      catch (e) { echecs.push(src.name + " — " + (e && e.name === "AbortError" ? "délai dépassé" : (e && e.message) || "erreur")); }
    }
  };
  await Promise.all(Array.from({ length: 5 }, ouvrier));
  if (tous.length) {
    tous.sort((a, b) => b.date - a.date);
    articles = dedoublonner(tous);
    ecrire(CLE_CACHE, { date: Date.now(), items: articles });
    $("#maj").textContent = "Dernière mise à jour : " + new Date().toLocaleString("fr-FR");
  }
  const etat = $("#etat");
  etat.textContent = echecs.length ? `${echecs.length} source(s) injoignable(s) — toucher pour la liste` : "À jour";
  etat.onclick = () => { if (echecs.length) alert("Sources injoignables :\n\n" + echecs.join("\n")); };
  afficher();
}

function afficher() {
  const q = $("#q").value.trim().toLowerCase(), lg = $("#lang").value;
  const unJour = Date.now() - 36 * 3600e3;
  let liste = articles.filter(a => a.theme === themeActif || (themeActif === "fav" && favoris.has(a.id)));
  if (lg) liste = liste.filter(a => a.lang === lg);
  if (q) liste = liste.filter(a => (a.titre + " " + a.extrait).toLowerCase().includes(q));
  const zone = $("#liste");
  zone.innerHTML = "";
  if (!liste.length) { zone.innerHTML = '<div class="vide">Aucun article. Appuyez sur ↻ pour actualiser.</div>'; return; }
  for (const a of liste.slice(0, 80)) {
    const el = document.createElement("article");
    if (!dejaVus.has(a.id) && a.date > unJour) el.className = "nouveau";
    const h = document.createElement("h2");
    const lien = document.createElement("a");
    lien.href = a.lien; lien.target = "_blank"; lien.rel = "noopener"; lien.textContent = a.titre;
    if (a.lang === "ar") h.className = "ar";
    h.appendChild(lien);
    const meta = document.createElement("div"); meta.className = "meta";
    const heure = new Date(a.date).toLocaleString("fr-FR", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
    const autres = a.autres?.length ? ` · aussi : ${[...new Set(a.autres)].join(", ")}` : "";
    meta.textContent = `${a.source}${a.etat ? " (média d'État)" : ""} · ${heure}${autres}`;
    const etoile = document.createElement("button"); etoile.className = "etoile";
    etoile.textContent = favoris.has(a.id) ? "★" : "☆";
    etoile.onclick = () => { favoris.has(a.id) ? favoris.delete(a.id) : favoris.add(a.id); ecrire(CLE_FAV, [...favoris]); etoile.textContent = favoris.has(a.id) ? "★" : "☆"; };
    meta.appendChild(etoile);
    el.append(h, meta);
    if (a.extrait) { const p = document.createElement("p"); p.className = "res" + (a.lang === "ar" ? " ar" : ""); p.textContent = a.extrait; el.appendChild(p); }
    lien.addEventListener("click", () => { dejaVus.add(a.id); ecrire(CLE_VU, [...dejaVus].slice(-1000)); el.classList.remove("nouveau"); });
    zone.appendChild(el);
  }
}

function exporter() {
  const lignes = articles.filter(a => a.theme === themeActif || (themeActif === "fav" && favoris.has(a.id))).slice(0, 80)
    .map(a => `${a.titre}\n${a.source} — ${new Date(a.date).toLocaleString("fr-FR")}\n${a.lien}\n`);
  const blob = new Blob([lignes.join("\n")], { type: "text/plain;charset=utf-8" });
  const u = URL.createObjectURL(blob), a = document.createElement("a");
  a.href = u; a.download = `actualites_${themeActif}_${new Date().toISOString().slice(0, 10)}.txt`; a.click();
  setTimeout(() => URL.revokeObjectURL(u), 1000);
}

function init() {
  const nav = $("#tabs");
  [...THEMES, { id: "fav", label: "★ Favoris" }].forEach(t => {
    const b = document.createElement("button"); b.textContent = t.label; b.dataset.id = t.id;
    b.onclick = () => { themeActif = t.id; nav.querySelectorAll("button").forEach(x => x.classList.toggle("on", x === b)); afficher(); };
    if (t.id === themeActif) b.classList.add("on");
    nav.appendChild(b);
  });
  $("#q").oninput = afficher; $("#lang").onchange = afficher;
  $("#refresh").onclick = actualiser; $("#exp").onclick = exporter;
  const c = lire(CLE_CACHE, { date: null });
  $("#maj").textContent = c.date ? "Dernière mise à jour : " + new Date(c.date).toLocaleString("fr-FR") : "Pas encore de données";
  afficher();
  if (!c.date || Date.now() - c.date > 3 * 3600e3) actualiser();
}
init();
