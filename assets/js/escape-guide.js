(() => {
  const journey = document.querySelector('.story-journey');
  if (!journey) return;
  const intro = document.querySelector('.story-intro');
  const views = [...journey.querySelectorAll('[data-view]')];
  const examples = [...journey.querySelectorAll('[data-example]')];
  const links = [...document.querySelectorAll('.preview-nav a')];
  const exampleLinks = [...journey.querySelectorAll('.card-examples a')];
  const cards = [...journey.querySelectorAll('[data-card]')];
  const result = document.getElementById('observe-result');
  const explanation = document.getElementById('observe-explanation');
  const combination = document.getElementById('combine-result');
  const reveal = journey.querySelector('[data-reveal]');
  const status = journey.querySelector('.story-status');
  let selectedExample = 'observer';
  result.hidden = explanation.hidden = combination.hidden = true;
  journey.querySelector('.card-examples').hidden = false;
  function show(hash, focus = false) {
    const id = hash.replace('#', '');
    const example = examples.find(panel => panel.id === id);
    if (example) selectedExample = example.id;
    const viewId = example || id === 'jouer' ? 'jouer' : views.some(view => view.id === id) ? id : 'cadeau';
    intro.hidden = viewId !== 'cadeau';
    views.forEach(view => { view.hidden = view.id !== viewId; });
    examples.forEach(panel => { panel.hidden = panel.id !== selectedExample; });
    const active = viewId === 'cadeau' ? '#apercu' : `#${viewId}`;
    links.forEach(link => {
      if (link.hash === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    exampleLinks.forEach(link => {
      if (link.hash === `#${selectedExample}`) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
    status.textContent = '';
    if (focus) {
      const target = example || (viewId === 'cadeau' ? intro : document.getElementById(viewId));
      target.querySelector('h1, h2, h3').focus({preventScroll: true});
      const scrollTarget = example ? document.getElementById('jouer') : target;
      scrollTarget.scrollIntoView({behavior: 'instant', block: 'start'});
    }
  }
  intro.querySelector('h1').tabIndex = -1;
  document.querySelector('main').addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const allowed = ['apercu', ...views.map(view => view.id), ...examples.map(panel => panel.id)];
    if (!allowed.includes(link.hash.slice(1))) return;
    event.preventDefault();
    window.history.pushState(null, '', link.hash);
    show(link.hash, true);
  });
  window.addEventListener('popstate', () => show(location.hash, true));
  window.addEventListener('hashchange', () => show(location.hash, true));
  show(location.hash);
  const contribution = document.getElementById('conception');
  const stages = [...contribution.querySelectorAll('.making-entry')];
  const stageNames = ['Imaginer', 'Prototyper', 'Tester et offrir'];
  const carousel = document.createElement('div');
  carousel.className = 'making-carousel';
  carousel.setAttribute('role', 'region');
  carousel.setAttribute('aria-roledescription', 'carrousel');
  carousel.setAttribute('aria-label', 'Les étapes de ma création');
  const controls = document.createElement('div');
  controls.className = 'making-carousel-controls';
  const previous = document.createElement('button');
  previous.type = 'button'; previous.className = 'btn'; previous.textContent = '←';
  previous.setAttribute('aria-label', 'Étape précédente');
  const position = document.createElement('p');
  position.setAttribute('role', 'status'); position.setAttribute('aria-live', 'polite');
  const following = document.createElement('button');
  following.type = 'button'; following.className = 'btn'; following.textContent = '→';
  following.setAttribute('aria-label', 'Étape suivante');
  const shortcuts = document.createElement('div');
  shortcuts.className = 'making-carousel-shortcuts';
  shortcuts.setAttribute('role', 'group'); shortcuts.setAttribute('aria-label', 'Choisir une étape');
  let stageIndex = 0;
  const shortcutsButtons = stages.map((stage, index) => {
    stage.setAttribute('role', 'group');
    stage.setAttribute('aria-roledescription', 'diapositive');
    stage.setAttribute('aria-label', `${index + 1} sur ${stages.length} : ${stageNames[index]}`);
    const button = document.createElement('button');
    button.type = 'button'; button.textContent = stageNames[index];
    button.setAttribute('aria-label', stageNames[index]);
    button.addEventListener('click', () => showStage(index));
    shortcuts.append(button);
    return button;
  });
  function showStage(index) {
    stageIndex = Math.max(0, Math.min(stages.length - 1, index));
    stages.forEach((stage, i) => { stage.hidden = i !== stageIndex; });
    shortcutsButtons.forEach((button, i) => {
      if (i === stageIndex) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    previous.setAttribute('aria-disabled', String(stageIndex === 0));
    following.setAttribute('aria-disabled', String(stageIndex === stages.length - 1));
    position.textContent = `${stageIndex + 1} / ${stages.length} · ${stageNames[stageIndex]}`;
  }
  previous.addEventListener('click', () => showStage(stageIndex - 1));
  following.addEventListener('click', () => showStage(stageIndex + 1));
  controls.append(previous, position, following);
  stages[0].before(carousel);
  carousel.append(shortcuts, ...stages, controls);
  carousel.addEventListener('keydown', event => {
    if (event.target.closest('.making-photos')) return;
    if (event.altKey || event.ctrlKey || event.metaKey || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    showStage(stageIndex + (event.key === 'ArrowRight' ? 1 : -1));
  });
  let touchStart;
  carousel.addEventListener('touchstart', event => {
    if (event.target.closest('.making-photos')) { touchStart = null; return; }
    touchStart = event.touches.length === 1 ? {x: event.touches[0].clientX, y: event.touches[0].clientY} : null;
  }, {passive: true});
  carousel.addEventListener('touchend', event => {
    if (!touchStart) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) showStage(stageIndex + (dx < 0 ? 1 : -1));
    touchStart = null;
  }, {passive: true});
  showStage(0);
  const phone = matchMedia('(max-width: 700px)');
  contribution.querySelectorAll('.making-photos').forEach(gallery => {
    const photos = [...gallery.querySelectorAll('figure')];
    const navigation = document.createElement('div');
    navigation.className = 'making-photo-controls';
    const before = document.createElement('button');
    before.type = 'button'; before.textContent = '←'; before.setAttribute('aria-label', 'Photo précédente');
    const count = document.createElement('span'); count.setAttribute('role', 'status');
    const after = document.createElement('button');
    after.type = 'button'; after.textContent = '→'; after.setAttribute('aria-label', 'Photo suivante');
    let photoIndex = 0;
    function updatePhotos() {
      if (!phone.matches) { gallery.style.height = ''; return; }
      if (!gallery.clientWidth) return;
      photoIndex = photos.reduce((best, photo, index) => Math.abs(photo.getBoundingClientRect().left - gallery.getBoundingClientRect().left) < Math.abs(photos[best].getBoundingClientRect().left - gallery.getBoundingClientRect().left) ? index : best, 0);
      count.textContent = `Photo ${photoIndex + 1} / ${photos.length}`;
      before.disabled = photoIndex === 0; after.disabled = photoIndex === photos.length - 1;
      const height = `${Math.ceil(photos[photoIndex].getBoundingClientRect().height)}px`;
      if (gallery.style.height !== height) gallery.style.height = height;
    }
    function movePhoto(delta) {
      photoIndex = Math.max(0, Math.min(photos.length - 1, photoIndex + delta));
      gallery.scrollTo({left: photos[photoIndex].offsetLeft - photos[0].offsetLeft, behavior: 'instant'});
      updatePhotos();
    }
    before.addEventListener('click', () => movePhoto(-1));
    after.addEventListener('click', () => movePhoto(1));
    gallery.addEventListener('scroll', updatePhotos, {passive: true});
    new ResizeObserver(updatePhotos).observe(gallery);
    phone.addEventListener('change', updatePhotos);
    navigation.append(before, count, after); gallery.after(navigation);
    count.textContent = `Photo 1 / ${photos.length}`; before.disabled = true;
  });
  reveal.hidden = false;
  reveal.addEventListener('click', () => {
    result.hidden = explanation.hidden = false;
    reveal.setAttribute('aria-expanded', 'true');
    status.textContent = 'Carte 53 révélée : les pétales donnent une piste vers un indice du jeu.';
  });
  journey.querySelectorAll('[data-explain]').forEach(button => {
    const answer = document.getElementById(button.dataset.explain);
    answer.hidden = true;
    button.hidden = false;
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') !== 'true';
      button.setAttribute('aria-expanded', String(expanded));
      answer.hidden = !expanded;
      if (expanded) status.textContent = answer.textContent;
    });
  });
  cards.forEach(card => {
    card.disabled = false;
    card.addEventListener('click', () => {
      const selected = card.getAttribute('aria-pressed') !== 'true';
      card.setAttribute('aria-pressed', String(selected));
      card.querySelector('.choice-label').textContent = selected ? `✓ ${card.dataset.card}` : `Choisir · ${card.dataset.card}`;
      const complete = cards.every(item => item.getAttribute('aria-pressed') === 'true');
      combination.hidden = !complete;
      status.textContent = complete ? '60 plus 28 égale 88. Exemple fictif : aucune carte 88 n’est révélée.' : 'Choisissez les deux cartes pour afficher leur association.';
    });
  });
  const dialog = document.createElement('dialog');
  dialog.className = 'escape-zoom';
  dialog.setAttribute('aria-label', 'Image agrandie');
  const close = document.createElement('button');
  close.type = 'button'; close.className = 'btn'; close.textContent = 'Fermer ×';
  const enlarged = document.createElement('img');
  dialog.append(close, enlarged); document.body.append(dialog);
  let opener;
  journey.querySelectorAll('.story-visual img').forEach(img => {
    const zoom = document.createElement('a');
    zoom.href = img.src; zoom.className = 'escape-zoom-link';
    zoom.setAttribute('aria-haspopup', 'dialog');
    zoom.setAttribute('aria-label', `Agrandir : ${img.alt}`);
    zoom.textContent = '⤢';
    if (img.closest('#conception')) zoom.classList.add('making-photo-zoom');
    const choice = img.closest('.card-choice');
    if (choice) {
      const wrapper = document.createElement('div');
      wrapper.className = 'story-card choice-wrapper';
      choice.before(wrapper); wrapper.append(choice, zoom);
      choice.classList.remove('story-card');
    } else if (img.parentElement.classList.contains('gift-cards')) {
      const wrapper = document.createElement('div'); wrapper.className = 'gift-card';
      img.before(wrapper); wrapper.append(img, zoom);
    } else {
      img.parentElement.classList.add('zoomable-card'); img.after(zoom);
    }
    zoom.addEventListener('click', event => {
      event.preventDefault(); opener = zoom;
      enlarged.src = img.src; enlarged.alt = img.alt; dialog.showModal();
    });
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    const r = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom)) dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus({preventScroll: true}));
})();
