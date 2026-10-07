(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = document.querySelectorAll('.oyun-karti');
  cards.forEach(card => {
    card.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      card.style.setProperty('--tilt-y', `${(x - .5) * 8}deg`);
      card.style.setProperty('--tilt-x', `${(.5 - y) * 7}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--tilt-x', '0deg');
    });
  });
})();
