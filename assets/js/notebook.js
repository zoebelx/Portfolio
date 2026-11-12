(() => {
  const book = document.querySelector('.notebook');
  const pages = Array.from(book.querySelectorAll('.book-page'));
  const previous = document.getElementById('book-prev');
  const next = document.getElementById('book-next');
  const status = document.getElementById('book-status');
  let current = 0;
  let turning = false;
  function update() {
    pages.forEach((page, i) => { page.hidden = i !== current; });
    previous.disabled = current === 0;
    next.disabled = current === pages.length - 1;
    status.textContent = `${current + 1} / ${pages.length}`;
  }
  async function turn(direction) {
    const destination = current + direction;
    if (turning || destination < 0 || destination >= pages.length) return;
    turning = true;
    const animate = !document.documentElement.classList.contains('calme') &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    try {
      if (animate) await pages[current].animate([
        { transform: 'rotateY(0)', opacity: 1 },
        { transform: `rotateY(${-direction * 35}deg)`, opacity: 0 },
      ], { duration: 180, easing: 'ease-in' }).finished;
      current = destination;
      update();
      if (animate) await pages[current].animate([
        { transform: `rotateY(${direction * 25}deg)`, opacity: 0 },
        { transform: 'rotateY(0)', opacity: 1 },
      ], { duration: 240, easing: 'ease-out' }).finished;
    } finally {
      turning = false;
    }
  }
  previous.addEventListener('click', () => turn(-1));
  next.addEventListener('click', () => turn(1));
  book.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault();
      turn(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  let touchStart = null;
  const sheets = book.querySelector('.book-pages');
  sheets.addEventListener('touchstart', (event) => {
    touchStart = event.touches.length === 1
      ? { x: event.touches[0].clientX, y: event.touches[0].clientY } : null;
  }, { passive: true });
  sheets.addEventListener('touchend', (event) => {
    if (!touchStart) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5)
      turn(dx < 0 ? 1 : -1);
  }, { passive: true });
  sheets.addEventListener('touchcancel', () => { touchStart = null; });
  book.classList.add('is-ready');
  book.querySelector('.book-controls').hidden = false;
  book.querySelector('.book-help').hidden = false;
  update();
})();
