(() => {
  const bar = document.querySelector('.preview-sticky');
  if (!bar) return;
  const mobile = window.matchMedia('(max-width: 700px)');
  const menu = document.createElement('div');
  menu.className = 'project-menu';
  menu.id = 'project-menu';
  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'project-menu-toggle';
  toggle.setAttribute('aria-controls', menu.id);
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Ouvrir le menu du projet');
  toggle.innerHTML = '<span aria-hidden="true">☰</span>';
  menu.append(bar.querySelector('.preview-nav'), bar.querySelector('.comfort'));
  bar.append(toggle, menu);
  bar.classList.add('has-project-menu');
  function closeMenu(restoreFocus = false) {
    bar.classList.remove('is-menu-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Ouvrir le menu du projet');
    toggle.firstElementChild.textContent = '☰';
    menu.querySelector('.comfort').open = false;
    if (restoreFocus) toggle.focus();
  }
  toggle.addEventListener('click', () => {
    if (bar.classList.contains('is-menu-open')) return closeMenu();
    bar.classList.add('is-menu-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Fermer le menu du projet');
    toggle.firstElementChild.textContent = '×';
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && bar.classList.contains('is-menu-open')) {
      closeMenu(true);
    }
  });
  document.addEventListener('click', event => {
    if (!bar.contains(event.target)) closeMenu();
  });
  mobile.addEventListener('change', () => closeMenu());
  const links = Array.from(bar.querySelectorAll('.preview-nav a'));
  const sections = links.map(link => document.querySelector(link.hash));
  links.forEach((link, index) => link.addEventListener('click', () => {
    if (!mobile.matches) return;
    closeMenu();
    const section = sections[index];
    if (section) {
      if (!section.hasAttribute('tabindex')) section.setAttribute('tabindex', '-1');
      section.focus({ preventScroll: true });
    }
  }));
  let pending = false;
  function update() {
    pending = false;
    const offset = bar.getBoundingClientRect().height + 16;
    document.documentElement.style.setProperty('--project-nav-offset', `${offset}px`);
    if (bar.hasAttribute('data-step-navigation')) return;
    let current = 0;
    sections.forEach((section, index) => {
      if (section && section.getBoundingClientRect().top <= offset + 24) current = index;
    });
    const last = sections[sections.length - 1];
    if (last && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2
      && last.getBoundingClientRect().top < window.innerHeight) current = sections.length - 1;
    links.forEach((link, index) => {
      if (index === current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(update);
  }
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule);
  new ResizeObserver(schedule).observe(bar);
  update();
})();
