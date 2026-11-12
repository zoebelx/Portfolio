(() => {
  const root = document.documentElement;
  const defaults = {
    big: false,
    calm: false,
    theme: "dark",
  };
  let prefs = { ...defaults };
  try {
    Object.assign(prefs, JSON.parse(localStorage.getItem("pf-prefs") || "{}"));
  } catch (_) {}
  delete prefs.font;
  root.classList.remove("lisible");
  delete prefs.color;
  root.classList.remove("daltonien");
  function apply() {
    root.dataset.theme = prefs.theme === "light" ? "light" : "dark";
    for (const [key, cls] of [
      ["big", "grand"],
      ["calm", "calme"],
    ])
      root.classList.toggle(cls, !!prefs[key]);
    const states = {
      theme: prefs.theme !== "light",
      big: prefs.big,
      calm: prefs.calm,
    };
    for (const [key, value] of Object.entries(states))
      document
        .getElementById(`t-${key}`)
        ?.setAttribute("aria-pressed", String(!!value));
    document.dispatchEvent(
      new CustomEvent("comfortchange", { detail: { ...prefs } }),
    );
  }
  apply();
  document.addEventListener("DOMContentLoaded", () => {
    let menu = document.getElementById("comfort");
    if (!menu) {
      const bar = document.createElement("div");
      bar.className = "project-comfort-bar";
      bar.innerHTML =
        '<details class="comfort" id="comfort"><summary>Confort de lecture</summary><div class="panel"><button class="toggle" id="t-theme" type="button">Thème sombre</button><button class="toggle" id="t-big" type="button">Texte plus grand</button><button class="toggle" id="t-calm" type="button">Moins d’animations</button></div></details>';
      const main = document.querySelector("main");
      const back = main?.querySelector(":scope > .back-link");
      if (back) bar.prepend(back);
      main?.prepend(bar);
      menu = document.getElementById("comfort");
    }
    for (const key of ["theme", "big", "calm"]) {
      document.getElementById(`t-${key}`)?.addEventListener("click", () => {
        prefs[key] =
          key === "theme"
            ? prefs.theme === "light"
              ? "dark"
              : "light"
            : !prefs[key];
        try {
          localStorage.setItem("pf-prefs", JSON.stringify(prefs));
        } catch (_) {}
        apply();
      });
    }
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && menu?.open) {
        event.preventDefault();
        menu.open = false;
        menu.querySelector("summary").focus();
      }
    });
    document.addEventListener("click", (event) => {
      if (menu && !menu.contains(event.target)) menu.open = false;
    });
    apply();
  });
})();
