const applicationForm = document.querySelector('#kayit-formu');
const formStatus = document.querySelector('#form-durum');

applicationForm.addEventListener('submit', (event) => {
  event.preventDefault();
  if (!applicationForm.reportValidity()) return;

  formStatus.textContent = 'Form hazırlandı. Bu demo başvuruyu sunucuya göndermez ve bilgilerini kaydetmez.';
  formStatus.classList.add('form-durum-basarili');
});

applicationForm.addEventListener('input', () => {
  formStatus.textContent = 'Bu demo formu bilgileri sunucuya göndermez.';
  formStatus.classList.remove('form-durum-basarili');
});

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const tiltTargets = [...document.querySelectorAll('.magic-stage, .buyu-karti')];
  tiltTargets.forEach((target) => {
    target.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      const bounds = target.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      target.style.setProperty('--ry', `${x * 7}deg`);
      target.style.setProperty('--rx', `${-y * 6}deg`);
    });
    target.addEventListener('pointerleave', () => {
      target.style.setProperty('--ry', '0deg');
      target.style.setProperty('--rx', '0deg');
    });
  });
}
