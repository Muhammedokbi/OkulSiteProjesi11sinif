document.addEventListener('DOMContentLoaded', () => {
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const visual = document.querySelector('.hero-visual');
  if (visual) {
    visual.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      const bounds = visual.getBoundingClientRect();
      visual.style.setProperty('--ry', `${((event.clientX - bounds.left) / bounds.width - .5) * 9}deg`);
      visual.style.setProperty('--rx', `${(.5 - (event.clientY - bounds.top) / bounds.height) * 7}deg`);
    });
    visual.addEventListener('pointerleave', () => {
      visual.style.setProperty('--ry', '0deg');
      visual.style.setProperty('--rx', '0deg');
    });
  }

  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse') return;
      const bounds = card.getBoundingClientRect();
      card.style.setProperty('--ry', `${((event.clientX - bounds.left) / bounds.width - .5) * 4}deg`);
      card.style.setProperty('--rx', `${(.5 - (event.clientY - bounds.top) / bounds.height) * 3}deg`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--rx', '0deg');
    });
  });
});

(() => {
  const form = document.querySelector('#terminal-form');
  const input = document.querySelector('#terminal-input');
  const output = document.querySelector('#terminal-output');
  if (!form || !input || !output) return;

  const projects = [
    { name: 'Taş Kağıt Makas', aliases: ['tas', 'makas', 'tas kagit makas'], href: '1.hafta/oyun1.html' },
    { name: 'Sayı Tahmin', aliases: ['sayi', 'tahmin'], href: '1.hafta/oyun2.html' },
    { name: 'The Last Stand', aliases: ['zombi', 'last stand'], href: '1.hafta/oyun3.html' },
    { name: 'Film Sitesi', aliases: ['film', 'sinema'], href: '2.hafta/filim.html' },
    { name: 'Mars Kolonisi', aliases: ['mars'], href: '2.hafta/mars_projesi/index.html' },
    { name: 'Süper Kahraman Akademisi', aliases: ['kahraman', 'super kahraman', 'akademi'], href: '3.hafta/index.html' },
    { name: 'Yapay Zekâ Makalesi', aliases: ['yapay zeka', 'makale'], href: '3.hafta/makale/index.html' },
    { name: 'Ankara Şehir Rehberi', aliases: ['ankara', 'sehir rehberi', 'şehir rehberi'], href: '3.hafta/ankara/index.html' },
    { name: 'CosmicTours', aliases: ['cosmic', 'cosmictours', 'uzay'], href: '4.hafta/index.html' },
    { name: 'Retro Arcade', aliases: ['arcade', 'retro'], href: '4.hafta/retro_arcade/index.html' },
    { name: 'Arcanum Akademisi', aliases: ['arcanum', 'sihir'], href: '4.hafta/sihir_akademisi/index.html' }
  ];
  const normalize = value => value.toLocaleLowerCase('tr-TR').normalize('NFD').replace(/[\u0300-\u036f]/g, '').replaceAll('ı', 'i').trim();
  const line = (text, className = '') => {
    const p = document.createElement('p');
    if (className) p.className = className;
    p.textContent = text;
    output.append(p);
    output.scrollTop = output.scrollHeight;
  };
  const linkLine = project => {
    const p = document.createElement('p');
    const link = document.createElement('a');
    link.href = project.href;
    link.textContent = `↗ ${project.name}`;
    p.append(link);
    output.append(p);
  };
  const run = raw => {
    const value = raw.trim();
    if (!value) return;
    line(`visitor@okbi:~$ ${value}`, 'terminal-prompt');
    const command = normalize(value);
    if (['yardim', 'help', '?'].includes(command)) {
      line('Komutlar: yardım · projeler · hakkımda · aç <proje> · temizle');
      line('Örnek: aç cosmic  |  aç mars  |  aç arcade');
    } else if (['projeler', 'project', 'ls', 'liste'].includes(command)) {
      line(`PORTFOLYO DİZİNİ · ${projects.length} PROJE`);
      projects.forEach(linkLine);
    } else if (['hakkimda', 'about', 'whoami'].includes(command)) {
      line('Muhammed Okbi · Web tasarımı, oyun geliştirme ve etkileşimli deneyimler.');
      line('Konum: İstanbul, Türkiye · Durum: yeni fikirler geliştiriyor.');
    } else if (['temizle', 'clear', 'cls'].includes(command)) {
      output.replaceChildren();
    } else if (command.startsWith('ac ') || command.startsWith('open ')) {
      const query = command.startsWith('ac ') ? command.slice(3).trim() : command.slice(5).trim();
      const match = projects.find(project => normalize(project.name) === query || project.aliases.some(alias => normalize(alias) === query));
      if (match) {
        line(`${match.name} açılıyor...`);
        window.location.href = match.href;
      } else {
        line('Proje bulunamadı. İsimleri görmek için “projeler” komutunu kullan.', 'terminal-error');
      }
    } else {
      line(`“${value}” komutu tanınmadı. Kullanılabilir komutlar için “yardım” yaz.`, 'terminal-error');
    }
  };

  form.addEventListener('submit', event => {
    event.preventDefault();
    run(input.value);
    input.value = '';
    input.focus();
  });
  document.querySelectorAll('[data-command]').forEach(button => {
    button.addEventListener('click', () => {
      const command = button.dataset.command;
      if (command) {
        input.value = command;
        run(command);
        input.value = '';
        input.focus();
      }
    });
  });
})();
