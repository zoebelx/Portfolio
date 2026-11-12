(() => {
  const track = document.getElementById('game-track');
  if (!track) return;
  const slides = Array.from(track.children);
  const prev = document.getElementById('game-prev');
  const next = document.getElementById('game-next');
  const position = document.getElementById('game-position');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  function update() {
    const left = track.getBoundingClientRect().left;
    current = slides.reduce((best, slide, i) =>
      Math.abs(slide.getBoundingClientRect().left - left) <
      Math.abs(slides[best].getBoundingClientRect().left - left) ? i : best, 0);
    prev.disabled = current === 0;
    next.disabled = current === slides.length - 1;
    position.textContent = `${current + 1} / ${slides.length}`;
  }
  function move(delta) {
    const index = Math.max(0, Math.min(slides.length - 1, current + delta));
    const offset = slides[index].getBoundingClientRect().left - track.getBoundingClientRect().left;
    const calm = document.documentElement.classList.contains('calme');
    track.scrollTo({left: track.scrollLeft + offset, behavior: reduced.matches || calm ? 'instant' : 'smooth'});
  }
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      move(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  let scheduled = false;
  track.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { update(); scheduled = false; });
  }, {passive: true});
  new ResizeObserver(update).observe(track);
  const lightbox = document.getElementById('game-lightbox');
  const full = document.getElementById('lightbox-image');
  const bookControls = document.getElementById('book-controls');
  const bookPrev = document.getElementById('book-prev');
  const bookNext = document.getElementById('book-next');
  let bookPage = 1;
  let bookStart = 1;
  let bookPages = 0;
  let bookFolder = '';
  let bookTitle = '';
  function showPage(page) {
    bookPage = Math.max(1, Math.min(bookPages, page));
    full.src = `../assets/images/ethylink/${bookFolder}/page-${String(bookStart + bookPage - 1).padStart(2, '0')}.png`;
    full.alt = `${bookTitle} — page ${bookPage} sur ${bookPages}`;
    bookPrev.disabled = bookPage === 1;
    bookNext.disabled = bookPage === bookPages;
    document.getElementById('book-position').textContent = `Page ${bookPage} / ${bookPages}`;
    if (bookPage < bookPages) {
      const preload = new Image();
      preload.src = `../assets/images/ethylink/${bookFolder}/page-${String(bookStart + bookPage).padStart(2, '0')}.png`;
    }
  }
  full.addEventListener('load', () => {
    full.classList.remove('book-page-turn');
    if (bookPages) { void full.offsetWidth; full.classList.add('book-page-turn'); }
  });
  bookPrev.addEventListener('click', () => showPage(bookPage - 1));
  bookNext.addEventListener('click', () => showPage(bookPage + 1));
  lightbox.addEventListener('keydown', event => {
    if (!bookPages || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    showPage(bookPage + (event.key === 'ArrowRight' ? 1 : -1));
  });
  let opener;
  track.querySelectorAll('.game-preview').forEach(button => {
    const slide = button.closest('.game-slide');
    const title = slide.querySelector('h3').textContent;
    const isBook = Boolean(button.dataset.book);
    button.setAttribute('aria-label', isBook ? `Feuilleter : ${title}` : `Agrandir : ${title}`);
    button.querySelector('.preview-hint').textContent = isBook ? `Feuilleter · ${button.dataset.pages} pages` : 'Agrandir l’image';
    button.addEventListener('click', () => {
      const image = button.querySelector('img');
      bookPages = isBook ? Number(button.dataset.pages) : 0;
      bookStart = Number(button.dataset.start) || 1;
      bookFolder = isBook ? button.dataset.book : '';
      bookTitle = title;
      bookControls.hidden = !isBook;
      lightbox.classList.toggle('book-reader', isBook);
      if (isBook) showPage(1);
      else { full.src = image.src; full.alt = image.alt; }
      document.getElementById('lightbox-title').textContent = title;
      document.getElementById('lightbox-description').textContent = slide.querySelector('.game-caption p').textContent;
      opener = button;
      lightbox.showModal();
      document.body.classList.add('lightbox-open');
    });
  });
  const practicesLink = document.getElementById('open-practices');
  if (practicesLink) practicesLink.addEventListener('click', () => {
    const preview = track.querySelector('[data-book="livret"]');
    if (preview) { preview.click(); opener = practicesLink; }
  });
  document.getElementById('lightbox-close').addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', event => {
    const bounds = lightbox.getBoundingClientRect();
    if (event.target === lightbox && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) lightbox.close();
  });
  lightbox.addEventListener('close', () => {
    document.body.classList.remove('lightbox-open');
    if (opener) opener.focus({preventScroll: true});
  });
  const journeyLinks = Array.from(document.querySelectorAll('.journey-nav a'));
  const journey = document.querySelector('.project-journey');
  const chapters = Array.from(document.querySelectorAll('.journey-chapter'));
  if (journey && chapters.length) {
    let journeyScheduled = false;
    let routeDirty = true;
    let routeLength = 0;
    const ns = 'http://www.w3.org/2000/svg';
    const route = document.createElementNS(ns, 'svg');
    route.classList.add('journey-route');
    route.setAttribute('aria-hidden', 'true');
    const routeBase = document.createElementNS(ns, 'path');
    const routeFill = document.createElementNS(ns, 'path');
    routeBase.classList.add('route-base');
    routeFill.classList.add('route-fill');
    route.append(routeBase, routeFill);
    journey.prepend(route);
    journey.classList.add('has-route');
    function drawRoute() {
      const parent = journey.getBoundingClientRect();
      const points = chapters.map(chapter => {
        const marker = chapter.querySelector('.journey-marker').getBoundingClientRect();
        return {x: marker.left + marker.width / 2 - parent.left, y: marker.top + marker.height / 2 - parent.top};
      });
      route.setAttribute('viewBox', `0 0 ${journey.clientWidth} ${journey.offsetHeight}`);
      let path = `M ${points[0].x} ${points[0].y}`;
      for (let i = 1; i < points.length; i++) {
        const from = points[i - 1], to = points[i];
        const gapY = chapters[i - 1].offsetTop + chapters[i - 1].offsetHeight - 22;
        const direction = Math.sign(to.x - from.x);
        const radius = Math.min(44, Math.abs(to.x - from.x) / 3, Math.max(8,(to.y-gapY)*.75));
        if (!direction) path += ` L ${to.x} ${to.y}`;
        else path += ` L ${from.x} ${gapY-radius} Q ${from.x} ${gapY}, ${from.x+direction*radius} ${gapY} L ${to.x-direction*radius} ${gapY} Q ${to.x} ${gapY}, ${to.x} ${gapY+radius} L ${to.x} ${to.y}`;
      }
      routeBase.setAttribute('d', path);
      routeFill.setAttribute('d', path);
      routeLength = routeFill.getTotalLength();
      routeFill.style.strokeDasharray = String(routeLength);
      routeDirty = false;
    }
    function updateJourney() {
      journeyScheduled = false;
      if (routeDirty) drawRoute();
      const cursor = window.innerHeight * .38;
      const bounds = journey.getBoundingClientRect();
      const length = Math.max(1, journey.offsetHeight - 48);
      const progress = Math.max(0, Math.min(1, (cursor - bounds.top - 16) / length));
      journey.style.setProperty('--journey-progress', String(progress));
      // Locate the reading position along the curved path, including its bends.
      let low = 0, high = routeLength;
      const localY = cursor - bounds.top;
      for (let i = 0; i < 14; i++) { const middle = (low + high) / 2; if (routeFill.getPointAtLength(middle).y < localY) low = middle; else high = middle; }
      routeFill.style.strokeDashoffset = String(routeLength - (low + high) / 2);
      let active = 0;
      chapters.forEach((chapter, i) => { if (chapter.getBoundingClientRect().top <= cursor) active = i; });
      chapters.forEach((chapter, i) => {
        chapter.classList.toggle('is-current', i === active);
        chapter.classList.toggle('is-passed', i < active);
      });
      journeyLinks.forEach((link, i) => {
        if (i === active) link.setAttribute('aria-current', 'step');
        else link.removeAttribute('aria-current');
      });
    }
    function scheduleJourney() {
      if (!journeyScheduled) { journeyScheduled = true; requestAnimationFrame(updateJourney); }
    }
    window.addEventListener('scroll', scheduleJourney, {passive: true});
    function resizeJourney() { routeDirty = true; scheduleJourney(); }
    window.addEventListener('resize', resizeJourney);
    new ResizeObserver(resizeJourney).observe(journey);
    updateJourney();
  }
  update();
})();
