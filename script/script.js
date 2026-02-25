/* ── Theme toggle ── */
function applyTheme(light) {
  document.documentElement.classList.toggle('light', light);
  localStorage.setItem('saasify-theme', light ? 'light' : 'dark');
}
const saved = localStorage.getItem('saasify-theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (saved === 'light' || (!saved && !prefersDark)) applyTheme(true);

['themeToggle','themeToggleMobile'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('click', () => {
    applyTheme(!document.documentElement.classList.contains('light'));
  });
});

/* ── Bar chart ── */
const barChart = document.getElementById('barChart');
if (barChart) {
  [28,40,33,55,46,62,50,74,58,84,69,90].forEach((h, i) => {
    const b = document.createElement('div');
    b.className = 'mc-bar';
    b.style.cssText = `height:${h}%;background:${i>7
      ? 'linear-gradient(180deg,#e040fb,rgba(224,64,251,0.25))'
      : 'linear-gradient(180deg,#7c6bff,rgba(124,107,255,0.25))'}`;
    barChart.appendChild(b);
  });
}

/* ── Smooth scroll ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const t = document.querySelector(a.getAttribute('href'));
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior:'smooth' }); }
    document.getElementById('mobileMenu').classList.remove('open');
  });
});

/* ── Mobile burger ── */
document.getElementById('burgerBtn').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});

/* ── FAQ accordion ── */
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const was = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!was) item.classList.add('open');
  });
});

/* ── Billing toggle ── */
let isAnnual = false;
const toggleEl = document.getElementById('billingToggle');
toggleEl.addEventListener('click', () => {
  isAnnual = !isAnnual;
  toggleEl.classList.toggle('on', isAnnual);
  toggleEl.style.background = isAnnual ? '#4ade80' : 'var(--accent)';
  document.getElementById('labelMonthly').classList.toggle('active', !isAnnual);
  document.getElementById('labelAnnual').classList.toggle('active', isAnnual);
  document.querySelectorAll('[data-monthly]').forEach(el => {
    el.textContent = isAnnual ? el.dataset.annual : el.dataset.monthly;
  });
});

/* ── Scroll reveal ── */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold:0.08 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
