(() => {
  document.querySelectorAll('[data-z-carousel]').forEach(gallery => {
  const prefix = `z-${gallery.dataset.zCarousel}`;
  const track = document.getElementById(`${prefix}-track`);
  if (!track) return;
  const slides = [...track.children];
  const controls = gallery.querySelector('.z-places-controls');
  const previous = document.getElementById(`${prefix}-prev`);
  const next = document.getElementById(`${prefix}-next`);
  const position = document.getElementById(`${prefix}-position`);
  const mobile = matchMedia('(max-width: 600px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0, pending = false;
  function update() {
    pending = false;
    if (!mobile.matches) return;
    const start = track.getBoundingClientRect().left + parseFloat(getComputedStyle(track).paddingLeft);
    current = slides.reduce((best, slide, index) => Math.abs(slide.getBoundingClientRect().left - start) < Math.abs(slides[best].getBoundingClientRect().left - start) ? index : best, 0);
    previous.setAttribute('aria-disabled', String(current === 0));
    next.setAttribute('aria-disabled', String(current === slides.length - 1));
    position.textContent = `${current + 1} / ${slides.length}`;
  }
  function schedule() {
    if (!pending) { pending = true; requestAnimationFrame(update); }
  }
  function move(delta) {
    if (!mobile.matches) return;
    const target = Math.max(0, Math.min(slides.length - 1, current + delta));
    const offset = slides[target].getBoundingClientRect().left - track.getBoundingClientRect().left - parseFloat(getComputedStyle(track).paddingLeft);
    track.scrollTo({left: track.scrollLeft + offset, behavior: reduced.matches || document.documentElement.classList.contains('calme') ? 'instant' : 'smooth'});
  }
  function layout() {
    controls.hidden = !mobile.matches;
    if (mobile.matches) track.setAttribute('tabindex', '0');
    else { track.removeAttribute('tabindex'); track.scrollLeft = 0; }
    schedule();
  }
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', event => {
    if (!mobile.matches || event.target !== track || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
  });
  track.addEventListener('scroll', schedule, {passive: true});
  mobile.addEventListener('change', layout);
  new ResizeObserver(schedule).observe(track);
  layout();
  });
})();
