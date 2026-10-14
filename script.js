/* ═══════════════════════════════════════════════
   STUDIO DUNGEON — SCRIPT
   Language toggle · Scroll reveals · Nav · FAQ
   ═══════════════════════════════════════════════ */

/* ───────────────────── EDITABLE SITE CONFIGURATION ───────────────────── */
// Change this single constant to update the city location across the entire site
const SITE_CONFIG = {
  city: 'Surabaya'
};

document.addEventListener('DOMContentLoaded', () => {

  /* ───────────────────── APPLY CITY CONFIG ───────────────────── */
  function applyCityConfig() {
    document.querySelectorAll('.site-city').forEach(el => {
      const isAllUpper = el.textContent === el.textContent.toUpperCase() && el.textContent.trim().length > 0;
      el.textContent = isAllUpper ? SITE_CONFIG.city.toUpperCase() : SITE_CONFIG.city;
    });
  }
  applyCityConfig();

  /* ───────────────────── STATE ───────────────────── */
  let currentLang = 'id'; // default Indonesian

  /* ───────────────────── LANGUAGE TOGGLE ───────────────────── */
  const langBtns = document.querySelectorAll('.lang-btn');
  const langEls  = document.querySelectorAll('[data-id]');

  function setLang(lang) {
    currentLang = lang;
    // Sync ALL lang-btn instances (desktop + mobile)
    document.querySelectorAll('.lang-btn').forEach(b =>
      b.classList.toggle('active', b.dataset.lang === lang)
    );

    langEls.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text !== null) {
        // If it has innerHTML variant (for elements with nested HTML)
        if (el.hasAttribute(`data-${lang}-html`)) {
          el.innerHTML = el.getAttribute(`data-${lang}-html`);
        } else {
          el.textContent = text;
        }
      }
    });

    // Re-verify city strings if inside translated blocks
    applyCityConfig();

    // Also update HTML lang attribute
    document.documentElement.lang = lang === 'id' ? 'id' : 'en';
  }

  langBtns.forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // Initialize
  setLang(currentLang);

  /* ───────────────────── NAVBAR SCROLL ───────────────────── */
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  /* ───────────────────── HAMBURGER MENU ───────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  /* ───────────────────── SCROLL REVEAL ───────────────────── */
  const reveals = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => revealObserver.observe(el));

  /* ───────────────────── FAQ ACCORDION ───────────────────── */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ───────────────────── BACK TO TOP ───────────────────── */
  const backBtn = document.querySelector('.back-to-top');
  if (backBtn) {
    window.addEventListener('scroll', () => {
      backBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });
  }

  /* ───────────────────── SMOOTH SCROLL NAV LINKS ───────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ───────────────────── SCROLL SPY ACTIVE NAV ───────────────────── */
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .nav-mobile a[href^="#"]');
  const spySections = [
    'hero',
    'about',
    'services',
    'pricing',
    'location',
    'testimonials',
    'gallery',
    'faq',
    'contact'
  ].map(id => document.getElementById(id)).filter(Boolean);

  function updateScrollSpy() {
    const scrollY = window.scrollY;
    const navOffset = 110;
    let currentId = '';

    if (scrollY < 150) {
      currentId = 'hero';
    } else if (window.innerHeight + scrollY >= document.body.offsetHeight - 80) {
      currentId = 'contact';
    } else {
      spySections.forEach(section => {
        const top = section.offsetTop - navOffset;
        const height = section.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          currentId = section.getAttribute('id');
        }
      });
    }

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      const targetId = href.replace('#', '');
      link.classList.toggle('active', targetId === currentId);
    });
  }

  window.addEventListener('scroll', updateScrollSpy, { passive: true });
  updateScrollSpy();

});
