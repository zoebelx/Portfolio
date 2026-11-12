(() => {
  const journey = document.querySelector('.project-journey');
  if (!journey) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let calm = false;
  try { calm = Boolean(JSON.parse(localStorage.getItem('pf-prefs') || '{}').calm); } catch (_) {}
  if (reduced.matches || calm) return;

  const targets = Array.from(journey.querySelectorAll([
    '.project-section > h2', '.project-section > p',
    '.prototype-section > div > h2', '.prototype-section > div > p',
    '.prototype-section > figure', '.play-cards > li', '.game-practical',
    '.game-carousel', '.association-roles > div', '.future-outside', '.table-launch'
  ].join(',')));
  targets.forEach(element => {
    element.classList.add('reveal-item');
    const group = element.parentElement;
    if (group.matches('.play-cards, .association-roles')) {
      element.style.setProperty('--reveal-delay', `${Array.from(group.children).indexOf(element) * 120}ms`);
    }
  });

  let scheduled = false;
  function update() {
    scheduled = false;
    const trigger = window.innerHeight * .72;
    targets.forEach(element => {
      const bounds = element.getBoundingClientRect();
      if (bounds.top < trigger) element.classList.add('is-revealed');
    });
  }
  function schedule() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  }
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule);
  window.addEventListener('pageshow', schedule);
  journey.addEventListener('focusin', event => {
    const element = event.target.closest('.reveal-item');
    if (element) element.classList.add('is-revealed');
  });
  reduced.addEventListener('change', event => {
    if (event.matches) targets.forEach(element => element.classList.add('is-revealed'));
  });
  update();
})();
