(() => {
  const form = document.querySelector('#academy-application');
  const status = document.querySelector('#application-status');
  if (form && status) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      status.textContent = 'Aday dosyan hazır. Bu demo başvurusu gönderilmez ve kaydedilmez.';
      status.classList.add('success');
    });
    form.addEventListener('input', () => {
      status.textContent = 'Demo formudur; bilgiler gönderilmez ve kaydedilmez.';
      status.classList.remove('success');
    });
  }

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.hero-profile').forEach(card => {
    card.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      card.style.setProperty('--ry', `${x * 4}deg`);
      card.style.setProperty('--rx', `${-y * 3}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--rx', '0deg');
    });
  });
})();
