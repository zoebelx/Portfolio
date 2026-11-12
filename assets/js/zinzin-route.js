(() => {
  const chapters = Array.from(document.querySelectorAll('.z-chapter'));
  const links = Array.from(document.querySelectorAll('.z-route-nav a'));
  if (!chapters.length) return;
  let scheduled = false;
  function update() {
    scheduled = false;
    let active = 0;
    chapters.forEach((chapter, i) => {
      if (chapter.getBoundingClientRect().top < window.innerHeight * .4) active = i;
    });
    chapters.forEach((chapter,i) => {
      chapter.classList.toggle('is-current',i === active);
      chapter.classList.toggle('is-passed',i < active);
    });
    links.forEach((link,i) => {
      if (i === active) link.setAttribute('aria-current','step');
      else link.removeAttribute('aria-current');
    });
  }
  function schedule() {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  }
  window.addEventListener('scroll',schedule,{passive:true});
  window.addEventListener('resize',schedule);
  window.addEventListener('pageshow',schedule);
  update();
})();
