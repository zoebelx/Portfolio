(() => {
  const links = document.querySelectorAll('[data-z-shot]');
  if (!links.length) return;
  const dialog = document.createElement('dialog');
  dialog.className = 'z-shot-dialog';
  dialog.setAttribute('aria-label', 'Capture du jeu original');
  const close = document.createElement('button');
  close.className = 'btn';
  close.textContent = 'Fermer ×';
  const image = document.createElement('img');
  dialog.append(close, image);
  document.body.append(dialog);
  let opener;
  links.forEach(link => {
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', event => {
      event.preventDefault();
      opener = link;
      image.src = link.href;
      image.alt = link.querySelector('img').alt;
      dialog.showModal();
    });
  });
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const bounds = dialog.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => opener?.focus({preventScroll: true}));
})();
