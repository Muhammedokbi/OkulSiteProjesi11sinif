document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  document.querySelectorAll('.project-card, .nav-link, .social-link, .primary-btn, .secondary-btn').forEach((item) => {
    item.addEventListener('mouseenter', () => {
      item.style.transform = 'translateY(-2px)';
    });

    item.addEventListener('mouseleave', () => {
      item.style.transform = '';
    });
  });
});
