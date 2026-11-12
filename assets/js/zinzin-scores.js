(() => {
  const key = "zinzin-demo-scores-v1";
  const list = document.getElementById("z-scores");
  if (!list) return;
  let scores = [];
  let available = true;
  try {
    const stored = JSON.parse(localStorage.getItem(key) || "[]");
    if (Array.isArray(stored))
      scores = stored
        .filter(
          (s) =>
            s &&
            typeof s.name === "string" &&
            Number.isFinite(s.ms) &&
            s.ms > 0 &&
            s.ms <= 180000,
        )
        .sort((a, b) => a.ms - b.ms)
        .slice(0, 10);
  } catch (_) {
    available = false;
  }
  const format = (ms) =>
    `${Math.floor(ms / 60000)} min ${((ms % 60000) / 1000).toFixed(1)} s`;
  function render() {
    list.replaceChildren();
    scores.forEach((score) => {
      const item = document.createElement("li");
      const name = document.createElement("span");
      name.textContent = score.name;
      const time = document.createElement("strong");
      time.textContent = format(score.ms);
      item.append(name, time);
      list.append(item);
    });
    document.getElementById("z-scores-empty").hidden = scores.length > 0;
  }
  const dialog = document.createElement("dialog");
  dialog.className = "z-score-dialog";
  dialog.setAttribute("aria-labelledby", "z-score-title");
  dialog.innerHTML =
    '<h2 id="z-score-title">Mission accomplie !</h2><p id="z-score-time"></p><form><label for="z-score-name">Votre pseudo</label><input id="z-score-name" name="pseudo" maxlength="24" required autocomplete="nickname"><p>Top 10 enregistré dans ce navigateur uniquement.</p><div class="cta"><button class="btn primary" type="submit">Enregistrer mon temps</button><button class="btn" type="button">Passer</button></div><p role="status" id="z-score-feedback"></p></form>';
  document.body.append(dialog);
  let pending = null;
  const form = dialog.querySelector("form");
  const input = dialog.querySelector("input");
  const submit = dialog.querySelector('[type="submit"]');
  dialog
    .querySelector('[type="button"]')
    .addEventListener("click", () => dialog.close());
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = input.value.trim();
    if (!name || pending === null) {
      input.focus();
      return;
    }
    scores.push({ name: name.slice(0, 24), ms: pending });
    scores.sort((a, b) => a.ms - b.ms);
    scores = scores.slice(0, 10);
    pending = null;
    submit.disabled = true;
    try {
      localStorage.setItem(key, JSON.stringify(scores));
    } catch (_) {
      available = false;
    }
    render();
    document.getElementById("z-leaderboard-panel").open = true;
    if (available) dialog.close();
    else
      document.getElementById("z-score-feedback").textContent =
        "Temps conservé pour cette visite. Le navigateur empêche son enregistrement durable.";
  });
  window.ZinzinScores = {
    finish(ms) {
      pending = Math.max(1, Math.min(180000, Math.round(ms)));
      document.getElementById("z-score-time").textContent =
        `Vaisseau relancé en ${format(pending)}.`;
      document.getElementById("z-score-feedback").textContent = "";
      submit.disabled = false;
      dialog.showModal();
      input.focus();
    },
  };
  render();
})();
