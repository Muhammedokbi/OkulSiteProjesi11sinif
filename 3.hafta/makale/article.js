(() => {
  const bar = document.querySelector('#reading-progress');
  const links = [...document.querySelectorAll('.toc-link')];
  const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  const updateProgress = () => {
    const page = document.documentElement;
    const available = page.scrollHeight - page.clientHeight;
    const percent = available > 0 ? (page.scrollTop / available) * 100 : 0;
    if (bar) bar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);
  updateProgress();

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${visible.target.id}`));
    }, { rootMargin: '-18% 0px -62% 0px', threshold: [0, .2, .5, 1] });
    sections.forEach(section => observer.observe(section));
  }
})();
