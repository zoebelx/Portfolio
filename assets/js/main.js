/* Pour ajouter une capture : img:"data:image/..." ou un fichier publié à côté de la page. Pour un lien : lien:"https://..." */
const FAMILLES = {
  ecole: { label: "École", color: "var(--f-ecole)", on: "var(--on-ecole)" },
  association: {
    label: "Association",
    color: "var(--f-perso)",
    on: "var(--on-perso)",
  },
  perso: { label: "Perso", color: "var(--f-perso)", on: "var(--on-perso)" },
  stage: { label: "Stage", color: "var(--f-rech)", on: "var(--on-rech)" },
};
const PROJETS = [
  {
    id: "falc",
    fam: "stage",
    date: "2026",
    titre: "FALC",
    accroche:
      "Analyser une enquête sur l’usage du « facile à lire et à comprendre » à l’école primaire.",
    img: "assets/images/Falc.png",
    faits: [
      "Stage de première année · équipe de trois · appui à une thèse.",
      "Analyser 2 849 réponses et comparer les enquêtes de 2021 et 2025.",
      "Tri des données, ACM avec R et comparaison des enquêtes.",
      "Personas et document de synthèse des démarches remis à la doctorante.",
    ],
    contribution: [
      "Tri des données",
      "Analyse des correspondances multiples (ACM) avec R",
      "Comparaison des enquêtes de 2021 et 2025",
    ],
    tags: ["R", "Analyse de données", "ACM"],
    lien: "projets/falc.html",
    lienLabel: "Découvrir la démarche",
    interne: true,
  },
  {
    id: "truth",
    fam: "ecole",
    date: "2025/2026",
    titre: "TRUTH",
    accroche:
      "Un jeu de société pour sensibiliser aux fausses informations.",
    img: "assets/images/Truth.webp",
    faits: [
      "Projet transdisciplinaire de première année à l’ENSC · équipe de quatre.",
      "Répartition des tâches du groupe et participation à la conception du jeu.",
      "Conception du jeu, tests utilisateurs pour identifier les modifications nécessaires et rédaction collective d’un article scientifique.",
    ],
    contributionIndex: 1,
    compactWork: true,
    contribution: [
      "Gestion de projet",
      "Participation à la conception du jeu en équipe",
    ],
    collectiveLabel: "Travail collectif",
    tags: ["Gestion de projet", "Conception de jeu", "Tests utilisateurs"],
    lien: "https://zoebelx.github.io/TRUTH_SiteWeb/",
    lienLabel: "Découvrir le jeu",
  },
  {
    id: "addylink",
    fam: "association",
    date: "Depuis 2025",
    titre: "Addylink",
    accroche:
      "Des jeux sérieux pour aider les aidants de personnes en situation d’addiction.",
    img: "assets/images/addylink.webp",
    faits: [
      "Projet associatif en cours de création, issu d’un projet transpromotionnel de 2025 mené en première année à l’ENSC.",
      "Conception du fonctionnement des personnages, fabrication laser d’éléments du jeu, participation aux tests et à leur analyse. Aujourd’hui : communication du projet associatif.",
      "Création d’Ethy’link en équipe et tests du prototype auprès de professionnels de santé à Bordeaux.",
      "Je bénéficie du statut étudiant-entrepreneur.",
    ],
    contributionIndex: 1,
    compactWork: true,
    contribution: [
      "Fonctionnement des personnages",
      "Fabrication et tests",
      "Communication",
    ],
    collectiveLabel: "En équipe",
    tags: ["Communication", "Conception de jeu", "Travail en équipe"],
    lien: "projets/addylink.html",
    lienLabel: "Découvrir Addylink",
    interne: true,
  },
  {
    id: "zinzin",
    fam: "ecole",
    date: "2026",
    titre: "Zinzin",
    accroche:
      "Explorer un vaisseau, trouver la clé et s’échapper : un jeu C# dans la console.",
    img: "assets/images/Zinzins.png",
    thumbnail: "assets/images/zinzin/Capture_ensembleJeu.png",
    faits: [
      "Projet de programmation avancée à l’ENSC, développé en binôme avec Jan de Greave.",
      "Développement du changement d’étage, de l’interface, de la carte interactive, de l’actualisation des interactions et du classement final.",
      "Développement en C# d’un jeu d’exploration : retrouver une clé et rejoindre le bon poste de pilotage avant la fin du chronomètre.",
    ],
    contributionIndex: 1,
    compactWork: true,
    contribution: [
      "Changement d’étage",
      "Interface et carte interactive",
      "Interactions et classement",
    ],
    collectiveLabel: "En équipe",
    tags: ["C#", "Conception d’interface", "Programmation objet"],
    lien: "projets/zinzin.html",
    lienLabel: "Découvrir et jouer",
    interne: true,
  },
  {
    id: "emotism",
    highlightFact: 2,
    img: "assets/images/emotism-logo.png",
    thumbnail: "assets/images/emotism-jeu.png",
    fam: "ecole",
    date: "En cours",
    titre: "Emotism",
    accroche:
      "Un jeu en cours de création pour aider les personnes autistes à gérer leurs émotions.",
    faits: [
      "Projet transpromotionnel à l’ENSC : quatre étudiants de première année et quatre de deuxième année.",
      "Concevoir un jeu vidéo pour aider les personnes autistes à mieux gérer leurs émotions.",
      "Je développe le code du jeu sur Unity et participe à la gestion du projet ainsi qu’aux retours de séance.",
      "Des échanges avec des professionnels nous aident à comprendre l’autisme et les difficultés rencontrées par les personnes concernées.",
    ],
    tags: ["Unity", "Conception de jeu", "Travail en équipe"],
  },
  {
    id: "licence",
    fam: "ecole",
    date: "2025",
    titre: "Projets Python de licence",
    accroche:
      "Reconnaître des lettres altérées et rechercher un itinéraire court entre 15 villes.",
    img: "assets/images/projetlience.png",
    faits: [
      "Deux projets individuels réalisés en Python pendant ma licence.",
      "Réseau récurrent : passage des lettres de 6 × 6 à 16 × 16 pixels et réalisation de l’interface de reconnaissance avec Tkinter.",
      "Algorithme génétique : sélection, croisements et mutations pour rechercher un circuit court entre 15 villes.",
    ],
    tags: ["Python", "Réseaux de neurones", "Algorithmique"],
    lien: "projets/licence.html",
    lienLabel: "Essayer le réseau",
    interne: true,
  },
  {
    id: "escape",
    highlightFact: 1,
    lien: "projets/escape.html",
    lienLabel: "Découvrir le jeu",
    interne: true,
    fam: "perso",
    date: "2026",
    titre: "Escape game inspiré d’Unlock",
    accroche:
      "Un escape game conçu de A à Z, des énigmes au site de jeu et à la boîte.",
    img: "assets/images/Unlock.png",
    faits: [
      "Projet personnel réalisé en solo : un escape game de cartes inspiré du format Unlock.",
      "Conception du jeu de A à Z : énigmes, design, fonctionnement et site web utilisé pendant la partie.",
      "Fabrication d’une boîte pour le jeu avec une imprimante laser à l’EirLab, à l’ENSEIRB-MATMECA.",
    ],
    tags: ["Conception de jeu", "Développement web", "Fabrication"],
  },
];
const PROJECT_ORDER = [
  "addylink",
  "truth",
  "falc",
  "zinzin",
  "emotism",
  "escape",
  "licence",
];
PROJETS.sort(
  (a, b) => PROJECT_ORDER.indexOf(a.id) - PROJECT_ORDER.indexOf(b.id),
);

/* ---------- motifs ---------- */
function rng(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function glyph(seed, n) {
  const size = 120,
    c = size / n,
    r = rng(seed * 104729 + 7);
  let s =
    '<svg viewBox="0 0 ' +
    size +
    " " +
    size +
    '" aria-hidden="true" focusable="false">';
  for (let i = 0; i < n; i++)
    for (let j = 0; j < n; j++) {
      const x = j * c,
        y = i * c,
        cx = x + c / 2,
        cy = y + c / 2,
        t = Math.floor(r() * 7),
        rot = Math.floor(r() * 4) * 90;
      s +=
        '<rect x="' +
        x +
        '" y="' +
        y +
        '" width="' +
        c +
        '" height="' +
        c +
        '" style="fill:none;stroke:var(--line);stroke-width:1"/>';
      const g = '<g transform="rotate(' + rot + " " + cx + " " + cy + ')">';
      if (t === 1 || t === 2) {
        s +=
          g +
          '<path d="M' +
          x +
          " " +
          y +
          " L" +
          (x + c) +
          " " +
          y +
          " A" +
          c +
          " " +
          c +
          " 0 0 1 " +
          x +
          " " +
          (y + c) +
          ' Z" style="fill:var(--accent)"/></g>';
      } else if (t === 3) {
        s +=
          '<circle cx="' +
          cx +
          '" cy="' +
          cy +
          '" r="' +
          (c * 0.27).toFixed(1) +
          '" style="fill:var(--ink)"/>';
      } else if (t === 4) {
        s +=
          '<rect x="' +
          (x + c * 0.2).toFixed(1) +
          '" y="' +
          (y + c * 0.2).toFixed(1) +
          '" width="' +
          (c * 0.6).toFixed(1) +
          '" height="' +
          (c * 0.6).toFixed(1) +
          '" style="fill:none;stroke:var(--ink);stroke-width:2"/>';
      } else if (t === 5) {
        s +=
          g +
          '<polygon points="' +
          x +
          "," +
          (y + c) +
          " " +
          (x + c) +
          "," +
          (y + c) +
          " " +
          (x + c) +
          "," +
          y +
          '" style="fill:var(--ink)"/></g>';
      }
    }
  return s + "</svg>";
}
/* ---------- liste ---------- */
const $ = function (id) {
  return document.getElementById(id);
};
let salutationAnimated = false;
function animerSalutation() {
  if (salutationAnimated) return;
  salutationAnimated = true;
  const prefix = $("greeting-prefix"),
    name = $("greeting-name"),
    end = $("greeting-end");
  const parts = [
    [prefix, "Heyyy, je suis "],
    [name, "Zoé"],
    [end, " !"],
  ];
  let part = 0,
    index = 0;
  function next() {
    if (part >= parts.length) return;
    const target = parts[part][0],
      text = parts[part][1];
    target.textContent = text.slice(0, index + 1);
    index++;
    if (index < text.length) window.setTimeout(next, 75);
    else {
      part++;
      index = 0;
      window.setTimeout(next, 140);
    }
  }
  next();
}
const PROJECT_SKILLS = {
  falc: ["R", "Analyse de donn\u00e9es", "ACM"],
  truth: ["Gestion de projet", "Conception de jeu", "Tests utilisateurs"],
  addylink: ["Communication", "Conception de jeu"],
  zinzin: ["C#", "Conception d’interface"],
  emotism: ["Unity", "Conception de jeu"],
  escape: ["Conception de jeu", "Développement web", "Fabrication"],
  licence: ["Python", "R\u00e9seaux de neurones", "Algorithmique"],
};
const PROJECT_PREVIEWS = {
  addylink: {
    description: "Addylink est un projet associatif de jeux sérieux pour les aidants. Ethy’link en est le premier jeu, consacré aux proches de personnes alcoolodépendantes.",
    imageCaption: "Prototype Ethy’link",
    roleLines: [
      { label: "Ethy’link", text: "Conception du fonctionnement des personnages, fabrication d’éléments du jeu et participation aux tests." },
      { label: "Addylink", text: "Communication du projet associatif." },
    ],
    meta: "Depuis 2025 · Association en cours de création",
  },
  falc: {
    role: "Nettoyage des données, comparaison des enquêtes de 2021 et 2025 et analyse des correspondances multiples avec R.",
    meta: "2026 · Stage avec une doctorante de l’ENSC · Équipe de trois",
    logo: "assets/images/Falc.png",
    hideImage: true,
  },
  truth: {
    role: "Répartition des tâches et participation à la conception du jeu en équipe.",
    meta: "2025–2026 · Projet ENSC · Équipe de quatre",
    note: "En équipe : prototype testé auprès d’utilisateurs et rédaction d’un article scientifique.",
  },
  zinzin: {
    role: "Développement de l’exploration entre étages, de l’interface et de la carte interactive, ainsi que du classement.",
    image: "assets/images/zinzin/Capture_Jeu.png",
    imageAlt: "Vue rapprochée d’une salle du vaisseau dans Zinzin.",
    imageMode: "scene",
    meta: "2026 · Projet C# · En binôme avec Jan de Greave",
  },
  emotism: {
    image: "assets/images/emotism-jeu.png",
    imageAlt: "Interface d’Emotism : personnage, cartes émotions et carnet des émotions.",
    imageMode: "screenshot",
    role: "Je développe le code du jeu sur Unity et participe à la gestion du projet ainsi qu’aux retours de séance.",
    meta: "En cours · Projet ENSC · Équipe de huit",
    note: "Des échanges avec des professionnels nous aident à comprendre les difficultés rencontrées par les personnes concernées.",
  },
  escape: {
    description: "Une enquête créée comme cadeau d’anniversaire, autour de souvenirs et d’énigmes à partager.",
    image: "assets/images/escape/observer.webp",
    imageAlt: "Carte 81 de mon escape game : le réfrigérateur et ses indices.",
    imageMode: "portrait",
    role: "Création des énigmes, des cartes et du site utilisé pendant la partie, puis fabrication de la boîte du jeu.",
    meta: "2026 · Projet personnel · Réalisé en solo",
  },
  licence: {
    role: "Adaptation du réseau de lettres en 16 × 16 pixels et création de son interface Tkinter. Développement d’un algorithme génétique pour rechercher un circuit entre quinze villes.",
    meta: "2025 · Licence · Deux projets individuels en Python",
    secondaryLink: {
      href: "https://projetacademique.my.canva.site/l2scienceco/",
      label: "Découvrir mes deux projets Python ↗",
    },
  },
};
const rowsEl = $("cards");
PROJETS.forEach(function (p, i) {
  const f = FAMILLES[p.fam];
  const li = document.createElement("li");
  li.dataset.fam = p.fam;
  li.dataset.id = p.id;
  li.innerHTML =
    '<button class="card" type="button" data-id="' +
    p.id +
    '" style="--fam:' +
    f.color +
    ";--on-fam:" +
    f.on +
    '">' +
    '<span class="band"><span>' +
    f.label +
    '</span><span class="date">' +
    p.date +
    "</span></span>" +
    '<span class="tile">' +
    (p.id === "escape"
      ? '<span class="tile-cards"><img alt="" src="assets/images/escape/velos.webp" loading="lazy"><img alt="" src="assets/images/escape/observer.webp" loading="lazy"></span>'
      : p.img
      ? '<img alt="" src="' +
        (p.thumbnail || p.img) +
        '" loading="lazy" width="400" height="250">'
      : glyph(i + 11, 4)) +
    "</span>" +
    '<span class="t">' +
    p.titre +
    "</span>" +
    '<span class="a">' +
    p.accroche +
    "</span>" +
    '<span class="card-skills">' +
    PROJECT_SKILLS[p.id]
      .map(function (skill) {
        return "<span>" + skill + "</span>";
      })
      .join("") +
    "</span></button>";
  rowsEl.appendChild(li);
});

/* ---------- filtres ---------- */
let filtre = "tout";
let tri = "recent";
function sortedProjects() {
  const projects = PROJETS.slice();
  const ongoing = (p) => (p.id === "addylink" ? 2 : p.id === "emotism" ? 1 : 0);
  const year = (p) =>
    p.id === "emotism"
      ? 2026
      : Math.max(0, ...(p.date.match(/\d{4}/g) || []).map(Number));
  if (tri === "name")
    projects.sort((a, b) =>
      a.titre.localeCompare(b.titre, "fr", { sensitivity: "base" }),
    );
  else if (tri === "recent" || tri === "oldest")
    projects.sort(
      (a, b) =>
        (tri === "recent"
          ? ongoing(b) - ongoing(a)
          : ongoing(a) - ongoing(b)) ||
        (tri === "recent" ? year(b) - year(a) : year(a) - year(b)) ||
        a.titre.localeCompare(b.titre, "fr"),
    );
  return projects;
}
const filtersEl = $("filters");
[["tout", "Tout"]]
  .concat(
    Object.keys(FAMILLES).map(function (k) {
      return [k, FAMILLES[k].label];
    }),
  )
  .forEach(function (o) {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "chip";
    b.dataset.f = o[0];
    b.textContent = o[1];
    b.setAttribute("aria-pressed", o[0] === "tout" ? "true" : "false");
    filtersEl.appendChild(b);
  });
function visibles() {
  return sortedProjects().filter((p) => filtre === "tout" || p.fam === filtre);
}
function applyFilter() {
  const activeChoices = (filtre !== "tout" ? 1 : 0) + (tri !== "recent" ? 1 : 0);
  $("filters-toggle").textContent = "Filtrer et trier" + (activeChoices ? " · " + activeChoices : "");
  $("mobile-reset-filters").hidden = activeChoices === 0;
  const ids = new Set(
    visibles().map(function (p) {
      return p.id;
    }),
  );
  rowsEl.querySelectorAll(":scope > li").forEach(function (li) {
    li.hidden = !ids.has(li.dataset.id);
  });
  const cardsById = new Map(
    Array.from(rowsEl.children, (li) => [li.dataset.id, li]),
  );
  sortedProjects().forEach((p) => rowsEl.appendChild(cardsById.get(p.id)));
  $("reset-filters").hidden = activeChoices === 0;
  $("empty-projects").hidden = ids.size > 0;
  filtersEl.querySelectorAll(".chip").forEach(function (c) {
    c.setAttribute("aria-pressed", c.dataset.f === filtre ? "true" : "false");
  });
  const n = visibles().length;
  $("count").textContent =
    n +
    (n === 1 ? " projet" : " projets") +
    (filtre !== "tout" ? " sur " + PROJETS.length : "");
}
filtersEl.addEventListener("click", function (e) {
  const c = e.target.closest(".chip");
  if (!c) return;
  filtre = c.dataset.f;
  applyFilter();
});
function resetFilters() {
  filtre = "tout";
  tri = "recent";
  $("project-sort").value = tri;
  applyFilter();
}
$("reset-filters").addEventListener("click", resetFilters);
$("mobile-reset-filters").addEventListener("click", resetFilters);
const projectTools = $("project-tools");
function closeFilters() {
  projectTools.classList.remove("filters-open");
  $("filters-toggle").setAttribute("aria-expanded", "false");
  $("filters-toggle").focus({ preventScroll: true });
}
$("filters-toggle").addEventListener("click", function () {
  const open = projectTools.classList.toggle("filters-open");
  this.setAttribute("aria-expanded", String(open));
});
$("filters-apply").addEventListener("click", closeFilters);
projectTools.addEventListener("keydown", function (event) {
  if (event.key === "Escape" && projectTools.classList.contains("filters-open")) {
    event.preventDefault();
    closeFilters();
  }
});
projectTools.classList.add("filters-enhanced");
applyFilter();
$("project-sort").addEventListener("change", function () {
  tri = this.value;
  applyFilter();
});

/* ---------- fiche ---------- */
const dlg = $("detail");
let courant = null;
function ouvrir(id) {
  const idx = PROJETS.findIndex(function (p) {
    return p.id === id;
  });
  if (idx < 0) return;
  const p = PROJETS[idx],
    f = FAMILLES[p.fam];
  courant = id;
  dlg.style.setProperty("--fam", f.color);
  dlg.style.setProperty("--on-fam", f.on);
  dlg.className = "detail-preview";
  dlg.dataset.project = p.id;
  $("d-fam").textContent = f.label;
  const preview = PROJECT_PREVIEWS[p.id];
  const art = $("d-art");
  art.replaceChildren();
  art.hidden = !!preview.hideImage;
  art.dataset.mode = preview.imageMode || "wide";
  if (!art.hidden) {
    const imagePath = preview.image || p.img;
    const link = document.createElement("a");
    link.href = imagePath;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", "Agrandir l’image du projet " + p.titre + " (nouvel onglet)");
    const img = document.createElement("img");
    img.src = imagePath;
    img.alt = preview.imageAlt || "Visuel du projet " + p.titre;
    link.appendChild(img);
    art.appendChild(link);
    if (preview.imageCaption) {
      const caption = document.createElement("figcaption");
      caption.textContent = preview.imageCaption;
      art.appendChild(caption);
    }
  }
  $("d-title").textContent = p.titre;
  $("d-tag").textContent = preview.description || p.accroche;
  const logo = $("d-logo");
  logo.hidden = !preview.logo;
  if (preview.logo) logo.src = preview.logo;
  else logo.removeAttribute("src");
  const role = $("d-role");
  role.replaceChildren();
  for (const line of preview.roleLines || [{ text: preview.role }]) {
    const paragraph = document.createElement("p");
    if (line.label) {
      const label = document.createElement("strong");
      label.textContent = line.label + " : ";
      paragraph.appendChild(label);
    }
    paragraph.appendChild(document.createTextNode(line.text));
    role.appendChild(paragraph);
  }
  $("d-meta").textContent = preview.meta;
  $("d-note").textContent = preview.note || "";
  $("d-note").hidden = !preview.note;
  const shown = visibles();
  $("d-position").textContent = `${shown.findIndex((item) => item.id === p.id) + 1} / ${shown.length}`;
  $("d-prev").disabled = shown.length < 2;
  $("d-next").disabled = shown.length < 2;
  const a = $("d-link");
  if (p.lien) {
    a.href = p.lien;
    a.textContent = (p.lienLabel || "Visiter le site du projet") + (p.interne ? "" : " ↗");
    if (p.interne) {
      a.removeAttribute("target");
      a.removeAttribute("rel");
    } else {
      a.target = "_blank";
      a.rel = "noopener";
    }
    a.hidden = false;
  } else {
    a.hidden = true;
  }
  const secondary = $("d-secondary-link");
  secondary.hidden = !preview.secondaryLink;
  if (preview.secondaryLink) {
    secondary.href = preview.secondaryLink.href;
    secondary.textContent = preview.secondaryLink.label;
  } else {
    secondary.removeAttribute("href");
    secondary.textContent = "";
  }
  if (!dlg.open) dlg.showModal();
  else {
    const s = dlg.querySelector(".sheet");
    s.style.animation = "none";
    void s.offsetWidth;
    s.style.animation = "";
  }
  dlg.querySelector(".sheet").scrollTop = 0;
}
function voisin(d) {
  const v = visibles();
  const i = v.findIndex(function (p) {
    return p.id === courant;
  });
  if (i < 0 || !v.length) return;
  ouvrir(v[(i + d + v.length) % v.length].id);
}
rowsEl.addEventListener("click", function (e) {
  const b = e.target.closest(".card");
  if (b) ouvrir(b.dataset.id);
});
$("d-close").addEventListener("click", function () {
  dlg.close();
});
$("d-prev").addEventListener("click", function () {
  voisin(-1);
});
$("d-next").addEventListener("click", function () {
  voisin(1);
});
// Navigation uniquement dans la fiche ouverte et parmi les projets filtres.
dlg.addEventListener("keydown", function (e) {
  if (
    !dlg.open ||
    e.defaultPrevented ||
    e.altKey ||
    e.ctrlKey ||
    e.metaKey ||
    e.shiftKey
  )
    return;
  if (e.target.closest("input,textarea,select,[contenteditable]")) return;
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
    e.preventDefault();
    if (!e.repeat) voisin(e.key === "ArrowRight" ? 1 : -1);
  }
});
let swipeTotal = 0,
  swipeUsed = false,
  swipeTimer;
function resetProjectSwipe() {
  swipeTotal = 0;
  swipeUsed = false;
  clearTimeout(swipeTimer);
}
dlg.addEventListener(
  "wheel",
  function (e) {
    if (!dlg.open || e.ctrlKey || e.metaKey) return;
    if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) * 1.25) return;
    e.preventDefault();
    clearTimeout(swipeTimer);
    swipeTimer = setTimeout(resetProjectSwipe, 220);
    if (swipeUsed) return;
    const delta =
      e.deltaX *
      (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? dlg.clientWidth : 1);
    if (swipeTotal && Math.sign(delta) !== Math.sign(swipeTotal))
      swipeTotal = 0;
    swipeTotal += delta;
    if (Math.abs(swipeTotal) >= 65) {
      swipeUsed = true;
      voisin(swipeTotal > 0 ? 1 : -1);
    }
  },
  { passive: false },
);
dlg.addEventListener("close", resetProjectSwipe);
dlg.addEventListener("click", function (e) {
  if (e.target === dlg) dlg.close();
});

/* ---------- contact ---------- */
$("email-open").addEventListener("click", function (event) {
  event.preventDefault();
  $("email-dialog").showModal();
});
$("email-dialog").addEventListener("close", function () {
  $("email-open").focus();
});
$("copy").addEventListener("click", function () {
  const txt = $("addr").textContent,
    msg = $("copied");
  function ok() {
    msg.textContent = "Adresse copiée.";
  }
  function manuel() {
    const r = document.createRange();
    r.selectNodeContents($("addr"));
    const s = window.getSelection();
    s.removeAllRanges();
    s.addRange(r);
    msg.textContent = "Adresse sélectionnée, copie-la avec Ctrl+C.";
  }
  try {
    navigator.clipboard.writeText(txt).then(ok, manuel);
  } catch (e) {
    manuel();
  }
});

/* ---------- intro ---------- */
const intro = $("intro");
const pageWrap = document.querySelector("body>.wrap");
const skipLink = document.querySelector("body>.skip-link");
function lockIntro(locked) {
  pageWrap.inert = locked;
  if (skipLink) skipLink.inert = locked;
}
intro.setAttribute("role", "dialog");
intro.setAttribute("aria-modal", "true");
intro.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    e.preventDefault();
    fermerIntro(false);
    return;
  }
  if (e.key === "Tab") {
    const items = Array.from(
      intro.querySelectorAll("button:not([hidden]),a"),
    ).filter((el) => el.getClientRects().length);
    const first = items[0],
      last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }
});
const introReveal = $("intro-reveal");
const introContinue = $("intro-continue");
const introSkip = $("intro-skip");
let introCloseTimer;
let introReturnFocus = null;
$("intro-replay").addEventListener("click", function () {
  clearTimeout(introCloseTimer);
  introReturnFocus = this;
  document.documentElement.removeAttribute("data-intro-seen");
  intro.hidden = false;
  intro.classList.remove("done", "reveal");
  introReveal.hidden = false;
  introContinue.hidden = true;
  introSkip.hidden = false;
  document.body.classList.add("intro-open");
  lockIntro(true);
  introReveal.focus({ preventScroll: true });
});
function ouvrirIntroNet() {
  intro.classList.add("reveal");
  introReveal.hidden = true;
  introContinue.hidden = false;
  introSkip.hidden = true;
  introContinue.focus();
}
function fermerIntro(scrollToPortfolio) {
  if (intro.hidden || intro.classList.contains("done")) return;
  const replaying = !!introReturnFocus;
  lockIntro(false);
  (introReturnFocus || $("top")).focus({ preventScroll: true });
  introReturnFocus = null;
  animerSalutation();
  document.body.classList.remove("intro-open");
  intro.classList.add("done");
  introCloseTimer = window.setTimeout(function () {
    intro.hidden = true;
  }, 720);
  if (scrollToPortfolio && !replaying) {
    const target = $("top");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
const skipDailyIntro = document.documentElement.dataset.introSeen === "true";
if (skipDailyIntro || window.location.hash) {
  intro.hidden = true;
  lockIntro(false);
  animerSalutation();
} else {
  document.body.classList.add("intro-open");
  lockIntro(true);
  introReveal.focus();
  try {
    const now = new Date();
    const today = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    localStorage.setItem("pf-intro-day", today);
  } catch (_) {}
}
introReveal.addEventListener("click", ouvrirIntroNet);
introContinue.addEventListener("click", function () {
  fermerIntro(true);
});
introSkip.addEventListener("click", function (e) {
  e.preventDefault();
  fermerIntro();
});
window.addEventListener(
  "wheel",
  function (e) {
    if (!intro.hidden && !intro.classList.contains("done") && intro.classList.contains("reveal") && e.deltaY > 0) fermerIntro(false);
  },
  { passive: true },
);
if (window.location.hash) {
  const target = document.getElementById(window.location.hash.slice(1));
  if (target)
    requestAnimationFrame(function () {
      target.scrollIntoView({ behavior: "instant", block: "start" });
    });
  intro.hidden = true;
  lockIntro(false);
  document.body.classList.remove("intro-open");
}

