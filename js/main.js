/* ============================================================
   HubGearIQ — التفاعليات
   ============================================================ */

/* ✏️ ضع رقم الواتساب الحقيقي هنا (بصيغة دولية بدون + أو مسافات)
   مثال: '9647XXXXXXXX' للعراق أو '9665XXXXXXXX' للسعودية */
const WHATSAPP_NUMBER = '9665XXXXXXX';

/* ---------- روابط واتساب (تُبنى تلقائياً) ---------- */
document.querySelectorAll('[data-wa]').forEach((el) => {
  const product = el.dataset.wa;
  const message = product
    ? `مرحباً HubGearIQ، أرغب بطلب: ${product}`
    : 'مرحباً HubGearIQ، لدي استفسار عن منتجاتكم';
  el.href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  el.target = '_blank';
  el.rel = 'noopener';
});

/* ---------- الهيدر عند التمرير ---------- */
const header = document.getElementById('header');
const backTop = document.getElementById('backTop');

function onScroll() {
  header.classList.toggle('scrolled', window.scrollY > 40);
  backTop.classList.toggle('show', window.scrollY > 600);
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---------- قائمة الموبايل ---------- */
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');

hamburger.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// إغلاق القائمة عند اختيار رابط
nav.querySelectorAll('.nav-link, .btn').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ---------- فلترة المنتجات ---------- */
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');
const noResults = document.getElementById('noResults');

filterButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    filterButtons.forEach((b) => {
      b.classList.remove('active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('active');
    btn.setAttribute('aria-pressed', 'true');

    const filter = btn.dataset.filter;
    let visibleCount = 0;

    productCards.forEach((card) => {
      const show = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hide', !show);
      if (show) visibleCount++;
    });

    noResults.hidden = visibleCount > 0;
  });
});

/* ---------- أنيميشن الظهور عند التمرير ---------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

/* ---------- عدّادات الأرقام ---------- */
const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = Number(el.dataset.target);
      const decimal = el.dataset.decimal === '1';
      const duration = 1600;
      const start = performance.now();

      function tick(now) {
        const progress = Math.min((now - start) / duration, 1);
        // easeOutCubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = target * eased;
        const formatted = decimal
          ? (value / 10).toFixed(1)
          : Math.round(value).toLocaleString('en-US');
        el.textContent = formatted;
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  },
  { threshold: 0.5 }
);

document.querySelectorAll('.counter').forEach((el) => counterObserver.observe(el));

/* ---------- تمييز الرابط النشط (Scroll Spy) ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const spyObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);

sections.forEach((section) => spyObserver.observe(section));
