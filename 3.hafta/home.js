(() => {
  const hero = document.querySelector('.hero-art');
  if (!hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  hero.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - .5;
    const y = (event.clientY - bounds.top) / bounds.height - .5;
    hero.style.setProperty('--ry', `${x * 8}deg`);
    hero.style.setProperty('--rx', `${-y * 6}deg`);
  });
  hero.addEventListener('pointerleave', () => {
    hero.style.setProperty('--ry', '0deg');
    hero.style.setProperty('--rx', '0deg');
  });
})();
