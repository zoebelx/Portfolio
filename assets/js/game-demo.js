(() => {
  // Valeurs des cartes Personnages ; actions et effets des cartes finales.
  const player = {
    id: "cathy",
    code: "C",
    name: "Cathy",
    role: "Mère",
    relation: 8,
    energy: 6,
    color: "#b89cc5",
  };
  const rounds = [
    {
      title: "Les bouteilles dans la chambre",
      image: "evenements/page-03.png",
      context:
        "Vous repérez des bouteilles pleines et vides dans la chambre de Fiona. Comment réagissez-vous ?",
      actions: [
        {
          id: "repos",
          title: "Repos",
          text: "Je note cette information mais je n’agis pas pour l’instant.",
          allowed: "KPCIJ",
          energy: 3,
          score: 0,
          relation: 0,
          feedback:
            "Cathy prend un temps de repos pour préserver son énergie. Dans cette carte, la relation avec Fiona reste inchangée.",
        },
        {
          id: "question",
          title: "Question",
          text: "Je la questionne frontalement : « Quand as-tu bu ? Où ? Avec qui ? »",
          allowed: "KPCIJ",
          energy: -1,
          score: -2,
          relation: -2,
          feedback:
            "Dans ce scénario, Fiona trouve les questions intrusives et envisage de cacher les bouteilles pour éviter un nouvel interrogatoire.",
        },
        {
          id: "psy",
          title: "Question psy",
          text: "Je demande à Fiona si elle se fait accompagner par un psychologue, car elle ne semble pas très en forme.",
          allowed: "KPC",
          energy: -1,
          score: 3,
          relation: 3,
          feedback:
            "Dans cette situation du prototype, Fiona est touchée par cette attention et décide de chercher un psychologue.",
        },
      ],
    },
  ];
  const get = (id) => document.getElementById(id),
    dialog = get("turn-dialog");
  if (!dialog) return;
  const zoom = get("demo-card-zoom"),
    asset = (path) => `../assets/images/ethylink/${path}`;
  const sign = (value) => (value > 0 ? `+${value}` : String(value));
  let selected = null,
    step = 1,
    flipped = false,
    lastZoomOpener;
  function renderBoard(action = null) {
    const relation = Math.max(
      0,
      Math.min(10, player.relation + (action ? action.relation : 0)),
    );
    const energy = Math.max(0, player.energy + (action ? action.energy : 0));
    get("player-board").style.setProperty("--player-color", player.color);
    get("board-relation-value").textContent = action ? `${player.relation} → ${relation}/10` : `${relation}/10`;
    get("board-energy-value").textContent = action ? `${player.energy} → ${energy} jetons` : `${energy} jetons`;
    get("board-pawn").style.setProperty(
      "--relation-steps",
      String(10 - relation),
    );
    const previousPawn = get("board-pawn-before");
    previousPawn.style.setProperty(
      "--relation-steps",
      String(10 - player.relation),
    );
    previousPawn.hidden = !action || relation === player.relation;
    get("board-energy").replaceChildren(
      ...Array.from({ length: Math.max(player.energy, energy) }, (_, i) => {
        const token = document.createElement("span");
        token.textContent = "ϟ";
        token.className =
          i >= energy
            ? "energy-token is-spent"
            : i >= player.energy
              ? "energy-token is-gained"
              : "energy-token";
        token.setAttribute("aria-hidden", "true");
        return token;
      }),
    );
    get("board-energy").setAttribute(
      "aria-label",
      `${energy} jetons énergie restants`,
    );
    get("board-change").textContent = action && player.relation + action.relation > 10
      ? "La relation est plafonnée à 10 sur la plaquette." : "";
  }
  const panels = ["table-choice-zone", "turn-flip-panel"];
  const headings = [
    "table-choice-title",
    "turn-flip-title",
  ];
  function openZoom(src, title, alt, opener) {
    get("demo-zoom-title").textContent = title;
    get("demo-zoom-image").src = src;
    get("demo-zoom-image").alt = alt;
    lastZoomOpener = opener;
    zoom.showModal();
  }
  function updateFlip() {
    if (selected === null) return;
    const action = rounds[0].actions[selected];
    get("turn-selected-image").src = asset(
      `demo/${action.id}-${flipped ? "verso" : "recto"}.png`,
    );
    get("turn-selected-image").classList.toggle("is-flipped", flipped);
    get("turn-selected-image").alt =
      `${flipped ? "Verso" : "Recto"} de la carte ${action.title}`;
    get("turn-result").hidden = false;
  }
  function showStep(next, focus = true) {
    if (next === 2 && selected === null) return;
    step = next;
    dialog.classList.toggle('is-result', step === 2);
    if (step === 2) flipped = true;
    panels.forEach((id, i) => {
      get(id).hidden = i !== step - 1;
    });
    dialog.querySelectorAll(".turn-steps li").forEach((li, i) => {
      li.classList.toggle("is-complete", i < step - 1);
      if (i === step - 1) li.setAttribute("aria-current", "step");
      else li.removeAttribute("aria-current");
    });
    if (step === 2) updateFlip();
    if (step === 2 && flipped) {
      const action = rounds[0].actions[selected];
      renderBoard(action);
      get("turn-flip-title").textContent = `Votre choix : ${action.title}`;
      get("turn-feedback").textContent = action.feedback;
    }
    if (focus) {
      dialog.scrollTop = 0;
      get(headings[step - 1]).focus({ preventScroll: true });
    }
  }
  function renderHand() {
    get("turn-options").replaceChildren(
      ...rounds[0].actions.map((action, i) => {
        const allowed =
          action.allowed.includes(player.code) &&
          player.energy + action.energy >= 0;
        const card = document.createElement("article");
        card.className = "table-card";
        const button = document.createElement("button");
        button.type = "button";
        button.className = "choose-card";
        button.disabled = !allowed;
        button.setAttribute("aria-pressed", String(selected === i));
        button.setAttribute(
          "aria-label",
          `Choisir ${action.title}. ${action.text} Énergie : ${sign(action.energy)}.`,
        );
        const image = document.createElement("img");
        image.src = asset(`demo/${action.id}-recto.png`);
        image.alt = "";
        const caption = document.createElement("span");
        caption.className = "choose-caption";
        caption.textContent = action.title;
        const description = document.createElement('span');
        description.className = 'choose-description';
        description.textContent = action.text;
        const cost = document.createElement('span');
        cost.className = 'choose-cost';
        cost.textContent = action.energy > 0 ? `Récupérer ${action.energy} jetons d’énergie` : `Dépenser ${Math.abs(action.energy)} jeton d’énergie`;
        const imageSpace = document.createElement('span');
        imageSpace.className = 'choose-art-space';
        imageSpace.setAttribute('aria-hidden', 'true');
        button.append(imageSpace, caption, description, cost);
        button.addEventListener("click", () => {
          selected = i;
          flipped = false;
          get("turn-options")
            .querySelectorAll(".choose-card")
            .forEach((choice, j) => {
              choice.setAttribute("aria-pressed", String(i === j));
              choice.querySelector(".choose-caption").textContent =
                i === j
                  ? `✓ ${rounds[0].actions[j].title}`
                  : rounds[0].actions[j].title;
            });
          get("turn-selection").textContent = `Votre choix : ${action.title}`;
          get("turn-confirm").disabled = false;
        });
        const enlarge = document.createElement("button");
        enlarge.type = "button";
        enlarge.className = "card-art-zoom";
        enlarge.setAttribute('aria-haspopup', 'dialog');
        const zoomIcon = document.createElement('span');
        zoomIcon.textContent = '↗';
        zoomIcon.setAttribute('aria-hidden', 'true');
        enlarge.append(image, zoomIcon);
        enlarge.setAttribute("aria-label", `Agrandir ${action.title}`);
        enlarge.addEventListener("click", () =>
          openZoom(image.src, action.title, action.text, enlarge),
        );
        card.append(button, enlarge);
        return card;
      }),
    );
  }
  function reset() {
    selected = null;
    flipped = false;
    renderBoard();
    renderHand();
    get("turn-confirm").disabled = true;
    get("turn-selection").textContent = "Choisissez une carte.";
  }
  get("turn-context").textContent = rounds[0].context;
  get("turn-open").addEventListener("click", () => {
    reset();
    showStep(1, false);
    dialog.showModal();
    document.body.classList.add("table-open");
    get("table-choice-title").focus({ preventScroll: true });
    dialog.scrollTop = 0;
  });
  get("turn-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => {
    document.body.classList.remove("table-open");
    get("turn-open").focus({ preventScroll: true });
  });
  get("turn-confirm").addEventListener("click", () => showStep(2));
  get("turn-retry").addEventListener("click", () => {
    reset();
    showStep(1);
  });
  get("event-card-zoom").addEventListener("click", (event) =>
    openZoom(
      asset(rounds[0].image),
      rounds[0].title,
      rounds[0].context,
      event.currentTarget,
    ),
  );
  get("turn-selected-zoom").addEventListener("click", (event) =>
    openZoom(
      get("turn-selected-image").src,
      rounds[0].actions[selected].title,
      get("turn-selected-image").alt,
      event.currentTarget,
    ),
  );
  get("demo-zoom-close").addEventListener("click", () => zoom.close());
  zoom.addEventListener("close", () =>
    lastZoomOpener?.focus({ preventScroll: true }),
  );
  [dialog, zoom].forEach((modal) =>
    modal.addEventListener("click", (event) => {
      const b = modal.getBoundingClientRect();
      if (
        event.target === modal &&
        (event.clientX < b.left ||
          event.clientX > b.right ||
          event.clientY < b.top ||
          event.clientY > b.bottom)
      )
        modal.close();
    }),
  );
  reset();
  showStep(1, false);
})();
