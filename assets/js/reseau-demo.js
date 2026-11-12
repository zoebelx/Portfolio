(() => {
  const inputCanvas = document.getElementById("network-input");
  if (!inputCanvas) return;
  const get = (id) => document.getElementById(id),
    outputCanvas = get("network-output");
  const inputContext = inputCanvas.getContext("2d"),
    outputContext = outputCanvas.getContext("2d");
  if (!inputContext || !outputContext) return;
  const data = RESEAU_DATA,
    engine = ReseauEngine;
  let input = data.patterns[0].slice(),
    output = null,
    paintValue = null,
    cursor = 0,
    revision = 0;
  function draw(context, state, reference = null, focus = false) {
    for (let i = 0; i < 256; i++) {
      const x = (i % 16) * 24,
        y = Math.floor(i / 16) * 24;
      context.fillStyle = state?.[i] ? "#111111" : "#ffffff";
      context.fillRect(x, y, 24, 24);
      context.strokeStyle = "#b8b8b8";
      context.lineWidth = 0.6;
      context.strokeRect(x + 0.3, y + 0.3, 23.4, 23.4);
      if (reference && state[i] !== reference[i]) {
        context.strokeStyle = "#c77d1e";
        context.lineWidth = 3;
        context.strokeRect(x + 2, y + 2, 20, 20);
      }
    }
    if (focus) {
      const x = (cursor % 16) * 24,
        y = Math.floor(cursor / 16) * 24;
      context.strokeStyle = "#e8a63d";
      context.lineWidth = 3;
      context.strokeRect(x + 2, y + 2, 20, 20);
    }
  }
  function redraw() {
    draw(inputContext, input, null, document.activeElement === inputCanvas);
    draw(outputContext, output, output ? input : null);
  }
  function changed(text) {
    get("network-status").classList.remove("is-error");
    revision++;
    output = null;
    redraw();
    get("network-status").textContent = text;
  }
  function load() {
    input = data.patterns[Number(get("network-letter").value)].slice();
    changed("Lettre chargée. Cliquez sur les cases pour modifier le dessin.");
  }
  for (let i = 0; i < 26; i++) {
    const option = document.createElement("option");
    option.value = String(i);
    option.textContent = String.fromCharCode(65 + i);
    get("network-letter").appendChild(option);
  }
  get("network-load")?.addEventListener("click", load);
  get("network-random").addEventListener("click", () => {
    get("network-letter").value = String(Math.floor(Math.random() * 26));
    load();
  });
  get("network-letter").addEventListener("change", load);
  get("network-reset").addEventListener("click", load);
  function cell(event) {
    const r = inputCanvas.getBoundingClientRect();
    return (
      Math.max(
        0,
        Math.min(15, Math.floor(((event.clientY - r.top) / r.height) * 16)),
      ) *
        16 +
      Math.max(
        0,
        Math.min(15, Math.floor(((event.clientX - r.left) / r.width) * 16)),
      )
    );
  }
  inputCanvas.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    inputCanvas.focus({ preventScroll: true });
    cursor = cell(event);
    paintValue = 1 - input[cursor];
    input[cursor] = paintValue;
    inputCanvas.setPointerCapture(event.pointerId);
    changed(
      "Dessin modifié. Lancez le réseau pour essayer de le reconstruire.",
    );
  });
  inputCanvas.addEventListener("pointermove", (event) => {
    if (paintValue === null) return;
    cursor = cell(event);
    if (input[cursor] !== paintValue) {
      input[cursor] = paintValue;
      changed(
        "Dessin modifié. Lancez le réseau pour essayer de le reconstruire.",
      );
    }
  });
  ["pointerup", "pointercancel", "lostpointercapture"].forEach((type) =>
    inputCanvas.addEventListener(type, () => {
      paintValue = null;
    }),
  );
  inputCanvas.addEventListener("focus", redraw);
  inputCanvas.addEventListener("blur", redraw);
  inputCanvas.addEventListener("keydown", (event) => {
    const keys = { ArrowUp: -16, ArrowDown: 16, ArrowLeft: -1, ArrowRight: 1 };
    if (event.key in keys) {
      event.preventDefault();
      const row = Math.floor(cursor / 16),
        col = cursor % 16;
      if (
        (event.key === "ArrowLeft" && col === 0) ||
        (event.key === "ArrowRight" && col === 15) ||
        (event.key === "ArrowUp" && row === 0) ||
        (event.key === "ArrowDown" && row === 15)
      )
        return;
      cursor += keys[event.key];
      redraw();
    } else if (event.key === " ") {
      event.preventDefault();
      if (event.repeat) return;
      input[cursor] = 1 - input[cursor];
      changed(
        `Pixel ligne ${Math.floor(cursor / 16) + 1}, colonne ${(cursor % 16) + 1} inversé.`,
      );
    }
  });
  get("network-run").addEventListener("click", async () => {
    if (!input.some(Boolean)) {
      get("network-status").textContent =
        "Dessinez ou chargez une lettre avant de lancer le réseau.";
      return;
    }
    const version = revision,
      button = get("network-run");
    button.disabled = true;
    get("network-status").textContent = "Le réseau met à jour ses cellules…";
    try {
      await new Promise(requestAnimationFrame);
      const result = engine.recall(input, data);
      if (version !== revision) return;
      output = result.state;
      redraw();
      const letter = engine.identify(output, data.patterns);
      const startingLetter = String.fromCharCode(
        65 + Number(get("network-letter").value),
      );
      get("network-status").textContent = !result.stable
        ? "Le réseau n’a pas réussi à reconnaître la lettre. Réinitialisez-la et essayez avec moins de modifications."
        : letter && letter !== startingLetter
          ? `Le réseau a confondu votre ${startingLetter} avec un ${letter}. Ce modèle peut se tromper : essayez avec moins de modifications.`
          : letter
            ? `Lettre reconnue : ${letter}.`
            : `Le réseau ne reconnaît pas cette lettre. Réinitialisez-la et essayez avec moins de modifications.`;
      const status = get("network-status");
      status.classList.toggle(
        "is-error",
        !result.stable || !letter || letter !== startingLetter,
      );
      if (status.classList.contains("is-error"))
        status.focus({ preventScroll: false });
      outputCanvas.setAttribute(
        "aria-label",
        letter
          ? `Résultat du réseau : lettre ${letter}.`
          : "Sortie du réseau sans correspondance exacte avec une lettre apprise.",
      );
    } finally {
      button.disabled = false;
    }
  });
  redraw();
})();
