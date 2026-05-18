const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const navLinks = Array.from(document.querySelectorAll('.site-nav a'));
const sections = Array.from(document.querySelectorAll('main section[id]'));
const revealElements = Array.from(document.querySelectorAll('.reveal'));
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function updateHeaderOnScroll() {
  if (!header) return;
  header.classList.toggle('scrolled', window.scrollY > 20);
}
window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
updateHeaderOnScroll();

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    nav.classList.toggle('open');
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('is-visible');
      });
    },
    { threshold: 0.18 }
  );
  revealElements.forEach((el) => revealObserver.observe(el));
} else {
  revealElements.forEach((el) => el.classList.add('is-visible'));
}

const activeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${id}`));
    });
  },
  { threshold: 0.55 }
);
sections.forEach((section) => activeObserver.observe(section));

const heroFrame = document.querySelector('.hero-media-frame');
const heroVideo = document.querySelector('.hero-video');
if (heroFrame && heroVideo) {
  const showVideo = () => {
    window.setTimeout(() => {
      heroFrame.classList.add('video-ready');
      heroVideo.play().catch(() => {});
    }, 450);
  };

  heroVideo.addEventListener('canplay', showVideo, { once: true });
  heroVideo.load();
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = String(new Date().getFullYear());
