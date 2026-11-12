(() => {
  const track = document.getElementById('falc-method-track');
  if (!track) return;
  const slides = [...track.children];
  const controls = document.querySelector('.falc-carousel-controls');
  const previous = document.getElementById('falc-method-prev');
  const next = document.getElementById('falc-method-next');
  const position = document.getElementById('falc-method-position');
  const mobile = matchMedia('(max-width: 600px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let current = 0;
  let pending = false;
  function update() {
    pending = false;
    if (!mobile.matches) return;
    const start = track.getBoundingClientRect().left + parseFloat(getComputedStyle(track).paddingLeft);
    current = slides.reduce((best, slide, index) =>
      Math.abs(slide.getBoundingClientRect().left - start) < Math.abs(slides[best].getBoundingClientRect().left - start) ? index : best, 0);
    previous.setAttribute('aria-disabled', String(current === 0));
    next.setAttribute('aria-disabled', String(current === slides.length - 1));
    position.textContent = `${current + 1} / ${slides.length}`;
  }
  function schedule() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(update);
  }
  function move(delta) {
    if (!mobile.matches) return;
    const target = Math.max(0, Math.min(slides.length - 1, current + delta));
    const padding = parseFloat(getComputedStyle(track).paddingLeft);
    const distance = slides[target].getBoundingClientRect().left - track.getBoundingClientRect().left - padding;
    const calm = document.documentElement.classList.contains('calme');
    track.scrollTo({ left: track.scrollLeft + distance, behavior: reduced.matches || calm ? 'instant' : 'smooth' });
  }
  function layout() {
    controls.hidden = !mobile.matches;
    if (mobile.matches) track.setAttribute('tabindex', '0');
    else {
      if (controls.contains(document.activeElement)) document.getElementById('demarche').focus({ preventScroll: true });
      track.removeAttribute('tabindex');
      track.scrollLeft = 0;
    }
    schedule();
  }
  document.getElementById('demarche').setAttribute('tabindex', '-1');
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', event => {
    if (!mobile.matches || event.target !== track || !['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    move(event.key === 'ArrowRight' ? 1 : -1);
  });
  track.addEventListener('scroll', schedule, { passive: true });
  mobile.addEventListener('change', layout);
  new ResizeObserver(schedule).observe(track);
  layout();
})();
