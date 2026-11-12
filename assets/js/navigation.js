(() => {
const $ = (id) => document.getElementById(id);
const menuToggle = $("menu-toggle");
if (!menuToggle) return;
const navigationPanel = $("mobile-navigation");
const navigationHeader = menuToggle.closest(".top");
function setNavigation(open, restoreFocus = false) {
  navigationHeader.classList.toggle("menu-open", open);
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.setAttribute("aria-label", open ? "Fermer le menu" : "Ouvrir le menu");
  if (!open) $("comfort").open = false;
  if (restoreFocus) menuToggle.focus();
}
navigationHeader.classList.add("nav-ready");
menuToggle.addEventListener("click", () => {
  setNavigation(menuToggle.getAttribute("aria-expanded") !== "true");
});
navigationPanel.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    setNavigation(false);
    const href = link.getAttribute("href");
    if (!href || !href.startsWith("#")) return;
    const target = document.querySelector(href);
    if (target) {
      if (!target.hasAttribute("tabindex")) target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  });
});
navigationHeader.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && navigationHeader.classList.contains("menu-open")) {
    event.preventDefault();
    setNavigation(false, true);
  }
});
document.addEventListener("click", (event) => {
  if (!navigationHeader.contains(event.target)) setNavigation(false);
});
})();
