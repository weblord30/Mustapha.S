// Mobile menu
const btn = document.querySelector('.nav__toggle');
const menu = document.getElementById('navMenu');
if (btn && menu) {
  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

// Project filters
const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.project');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('is-active'));
    chip.classList.add('is-active');
    const f = chip.dataset.filter;
    cards.forEach(card => {
      const tags = card.getAttribute('data-tags') || '';
      card.style.display = (f === 'all' || tags.includes(f)) ? '' : 'none';
    });
  });
});

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Apply saved preference or system preference on first load
(function initTheme(){
  const saved = localStorage.getItem('theme');
  if (saved) {
    root.setAttribute('data-theme', saved);
    if (themeToggle) themeToggle.textContent = saved === 'dark' ? '☀️' : '🌙';
    return;
  }
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  if (themeToggle) themeToggle.textContent = prefersDark ? '☀️' : '🌙';
})();

// Toggle and persist
themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || 'light';
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
});
