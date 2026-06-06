/* ===========================
   NIHARIKA GURUGUBELLI — script.js
=========================== */

// ===========================
// CUSTOM CURSOR
// ===========================
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let mouseX = 0, mouseY = 0;
let trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateTrail() {
  trailX += (mouseX - trailX) * 0.12;
  trailY += (mouseY - trailY) * 0.12;
  cursorTrail.style.left = trailX + 'px';
  cursorTrail.style.top  = trailY + 'px';
  requestAnimationFrame(animateTrail);
}
animateTrail();

// Cursor hover effects
const hoverTargets = document.querySelectorAll(
  'a, button, .project-card, .cert-card, .contact-card, .stat-card, .lang-chip, .edu-card'
);
hoverTargets.forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width  = '20px';
    cursor.style.height = '20px';
    cursor.style.background = '#c084fc';
    cursorTrail.style.width  = '54px';
    cursorTrail.style.height = '54px';
    cursorTrail.style.borderColor = 'rgba(192,132,252,0.6)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width  = '12px';
    cursor.style.height = '12px';
    cursor.style.background = 'var(--purple)';
    cursorTrail.style.width  = '36px';
    cursorTrail.style.height = '36px';
    cursorTrail.style.borderColor = 'rgba(168,85,247,0.5)';
  });
});

// Hide cursor on touch devices
if ('ontouchstart' in window) {
  cursor.style.display      = 'none';
  cursorTrail.style.display = 'none';
}

// ===========================
// NAVBAR SCROLL EFFECT
// ===========================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===========================
// HAMBURGER MENU
// ===========================
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===========================
// TYPED TEXT ANIMATION
// ===========================
const roles = [
  'Customer Success Associate',
  'CX Analyst',
  'Account Manager Trainee',
  'SaaS Enthusiast',
  'Problem Solver 💡',
];

let roleIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
const typedEl  = document.getElementById('typedText');

function typeEffect() {
  const current = roles[roleIndex];

  if (!isDeleting) {
    typedEl.textContent = current.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
  } else {
    typedEl.textContent = current.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex  = (roleIndex + 1) % roles.length;
    }
  }

  setTimeout(typeEffect, isDeleting ? 50 : 80);
}

setTimeout(typeEffect, 800);

// ===========================
// SCROLL REVEAL
// ===========================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ===========================
// ACTIVE NAV LINK ON SCROLL
// ===========================
const sections    = document.querySelectorAll('section[id]');
const allNavLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      allNavLinks.forEach(l => l.classList.remove('active-nav'));
      const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active-nav');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ===========================
// CARD 3D TILT (Projects)
// ===========================
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x  = e.clientX - rect.left;
    const y  = e.clientY - rect.top;
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -6;
    const rotY = ((x - cx) / cx) *  6;
    card.style.transform  = `translateY(-8px) perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    card.style.transition = 'transform 0.1s ease, border-color 0.35s, box-shadow 0.35s';
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform  = 'translateY(0) perspective(800px) rotateX(0) rotateY(0)';
    card.style.transition = 'transform 0.5s ease, border-color 0.35s, box-shadow 0.35s';
  });
});

// ===========================
// STAT NUMBER COUNTER
// ===========================
function animateCounter(el, target, suffix = '', duration = 1200) {
  const startTime = performance.now();
  const isFloat   = String(target).includes('.');

  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const current  = target * eased;
    el.textContent = isFloat
      ? current.toFixed(2) + suffix
      : Math.floor(current) + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }

  requestAnimationFrame(update);
}

const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numEl = entry.target.querySelector('.stat-number');
      if (!numEl) return;
      const text   = numEl.textContent;
      const num    = parseFloat(text);
      const suffix = text.replace(/[\d.]/g, '');
      if (!isNaN(num)) animateCounter(numEl, num, suffix);
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => statObserver.observe(card));

// ===========================
// SMOOTH SCROLL
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===========================
// ACTIVE NAV HIGHLIGHT (CSS)
// ===========================
const style = document.createElement('style');
style.textContent = `
  .nav-link.active-nav {
    color: var(--purple) !important;
    background: rgba(168,85,247,0.1);
  }
`;
document.head.appendChild(style);

// ===========================
// PAGE LOAD FADE IN
// ===========================
window.addEventListener('load', () => {
  document.body.style.opacity    = '0';
  document.body.style.transition = 'opacity 0.6s ease';
  setTimeout(() => { document.body.style.opacity = '1'; }, 50);
});