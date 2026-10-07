(() => {
  const track = document.querySelector('#planet-track');
  const previous = document.querySelector('#prev-planet');
  const next = document.querySelector('#next-planet');
  const current = document.querySelector('#current-slide');
  const progress = document.querySelector('#track-progress');
  if (!track || !previous || !next || !current || !progress) return;

  const cards = [...track.querySelectorAll('.destination-card')];
  const move = direction => {
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({ left: direction * (cards[0].getBoundingClientRect().width + gap), behavior: 'smooth' });
  };
  previous.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('scroll', () => {
    const max = track.scrollWidth - track.clientWidth;
    const ratio = max > 0 ? track.scrollLeft / max : 0;
    const index = Math.min(cards.length - 1, Math.round(ratio * (cards.length - 1)));
    current.textContent = String(index + 1).padStart(2, '0');
    progress.style.width = `${((index + 1) / cards.length) * 100}%`;
  }, { passive: true });
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight') move(1);
    if (event.key === 'ArrowLeft') move(-1);
  });
})();
