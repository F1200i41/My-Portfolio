/* ═══════════════════════════════════════════
   FARIDA MOHAMED — Portfolio Scripts
═══════════════════════════════════════════ */

// ─── CUSTOM CURSOR ───
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, button, .info-card, .skill-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    follower.style.width  = '48px';
    follower.style.height = '48px';
    follower.style.borderColor = 'rgba(168,85,247,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    follower.style.width  = '28px';
    follower.style.height = '28px';
    follower.style.borderColor = 'rgba(168,85,247,0.5)';
  });
});

// ─── NAVBAR SCROLL ───
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});

// ─── HAMBURGER ───
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

hamburger.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
});

document.querySelectorAll('.mob-link').forEach(link => {
  link.addEventListener('click', () => {
    menuOpen = false;
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ─── ROLE TYPEWRITER ───
const roles = ['Software Tester', 'Graphic Designer', 'Event Organizer', 'QA Engineer', 'Creative Lead'];
let roleIdx = 0, charIdx = 0, deleting = false;
const roleDisplay = document.getElementById('role-display');

function typeRole() {
  const current = roles[roleIdx];
  if (!deleting) {
    roleDisplay.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
  } else {
    roleDisplay.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
    }
  }
  setTimeout(typeRole, deleting ? 55 : 90);
}
typeRole();

// ─── REVEAL ON SCROLL ───
const revealEls = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ─── PROFICIENCY BARS ───
const bars = document.querySelectorAll('.prof-fill');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const width = target.dataset.width;
      setTimeout(() => {
        target.style.width = width + '%';
      }, 200);
      barObserver.unobserve(target);
    }
  });
}, { threshold: 0.4 });

bars.forEach(bar => barObserver.observe(bar));

// ─── SMOOTH SCROLL ───
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─── CONTACT FORM ───
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn-primary');
    btn.textContent = 'Sending...';
    btn.disabled = true;
    setTimeout(() => {
      formSuccess.classList.add('show');
      contactForm.reset();
      btn.textContent = 'Send Message ✦';
      btn.disabled = false;
      setTimeout(() => formSuccess.classList.remove('show'), 4000);
    }, 1200);
  });
}

// ─── CV DOWNLOAD ───
function downloadCV() {
  // Creates a minimal CV text file for demo;
  // In production, replace the href with the actual PDF path
  const link = document.createElement('a');
  link.href = 'Farida_Mohamed_CV.pdf';
  link.download = 'Farida_Mohamed_CV.pdf';
  // Fallback: open a new tab if file doesn't exist locally
  link.onerror = () => {
    alert('CV file not found. Please place Farida_Mohamed_CV.pdf in the same folder.');
  };
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
window.downloadCV = downloadCV;

// ─── FLOATING BADGES RANDOM MOTION ───
const floatBadges = document.querySelectorAll('.float-badge');
floatBadges.forEach((badge, i) => {
  let t = i * 1200;
  function moveBadge() {
    const dx = (Math.random() - 0.5) * 10;
    const dy = (Math.random() - 0.5) * 10;
    badge.style.transition = 'transform 2s ease-in-out';
    badge.style.transform = `translate(${dx}px, ${dy}px)`;
    t += 2000 + Math.random() * 1000;
    setTimeout(moveBadge, 2000 + Math.random() * 1000);
  }
  setTimeout(moveBadge, i * 400);
});

// ─── ACTIVE NAV LINK ON SCROLL ───
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + entry.target.id) {
          link.style.color = 'var(--purple-lt)';
        }
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(section => navObserver.observe(section));

// ─── STAGGER CHILDREN ───
// Adds small delays to children of grids for a cascade effect
document.querySelectorAll('.skills-grid, .certs-grid, .projects-grid').forEach(grid => {
  const children = grid.querySelectorAll('.reveal');
  children.forEach((child, i) => {
    child.style.transitionDelay = (i * 80) + 'ms';
  });
});
