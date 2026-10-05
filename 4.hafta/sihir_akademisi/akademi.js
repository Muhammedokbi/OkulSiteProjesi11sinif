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
