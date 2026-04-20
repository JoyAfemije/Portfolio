/* ============================================
   JOY ETANA — PORTFOLIO SCRIPTS 2025
============================================ */

// ===== CANVAS CODE RAIN =====
(function initCodeRain() {
  const canvas = document.getElementById('codeRain');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>{}[]()=+*/&%$#@!;:,.?/\\|^~`';
  const charArr = chars.split('');
  const fontSize = 13;
  let cols, drops;

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    cols  = Math.floor(canvas.width / fontSize);
    drops = Array(cols).fill(1);
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.fillStyle = 'rgba(8,8,8,0.06)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#d4af37';
    ctx.font = `${fontSize}px JetBrains Mono, monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = charArr[Math.floor(Math.random() * charArr.length)];
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(draw, 55);
})();


// ===== NAVBAR SCROLL STATE =====
(function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


// ===== HAMBURGER MENU =====
(function initHamburger() {
  const btn   = document.getElementById('hamburger');
  const links = document.getElementById('nav-links');
  if (!btn || !links) return;

  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.classList.toggle('open');
    links.classList.toggle('mobile-open');
  });

  // Close on link click
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      btn.classList.remove('open');
      links.classList.remove('mobile-open');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) {
      btn.classList.remove('open');
      links.classList.remove('mobile-open');
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      btn.classList.remove('open');
      links.classList.remove('mobile-open');
    }
  });
})();


// ===== TYPEWRITER EFFECT =====
(function initTyper() {
  const el = document.getElementById('typed-role');
  if (!el) return;

  const roles = [
    'Frontend Developer',
    'React Specialist',
    'UI/UX Craftsperson',
    'Full-Stack Explorer',
  ];
  let roleIdx = 0, charIdx = 0, deleting = false;

  function type() {
    const current = roles[roleIdx];

    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting = false;
        roleIdx  = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 55 : 90);
  }
  setTimeout(type, 600);
})();


// ===== ANIMATED COUNTERS =====
(function initCounters() {
  const nums = document.querySelectorAll('.stat-num[data-target]');
  if (!nums.length) return;

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const step     = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, step);
  }

  // Trigger when hero is visible
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        nums.forEach(el => animateCounter(el));
        observer.disconnect();
      }
    });
  }, { threshold: 0.3 });

  const hero = document.querySelector('.hero');
  if (hero) observer.observe(hero);
})();


// ===== SCROLL REVEAL =====
(function initReveal() {
  const sections = document.querySelectorAll('.reveal');
  if (!sections.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  sections.forEach(s => obs.observe(s));
})();


// ===== SKILL BARS ANIMATION =====
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-item');
  if (!bars.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill  = entry.target.querySelector('.bar-fill');
        const level = entry.target.dataset.level;
        if (fill && level) {
          setTimeout(() => { fill.style.width = level + '%'; }, 200);
        }
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(b => obs.observe(b));
})();


// ===== BACK TO TOP =====
(function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    btn.blur();
  });

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  });
})();


// ===== TOAST UTILITY =====
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}


// ===== SMOOTH SCROLL (nav links) =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (e) => {
    const id = link.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});


// ===== ACTIVE NAV LINK ON SCROLL =====
(function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a');

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(a => {
          a.style.color = '';
          a.style.background = '';
          if (a.getAttribute('href') === '#' + entry.target.id) {
            a.style.color = 'var(--gold)';
            a.style.background = 'var(--gold-dim)';
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));
})();


// ===== CARD TILT EFFECT =====
(function initTilt() {
  const cards = document.querySelectorAll('.proj-card, .review-card, .skill-group');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotX   = ((y - cy) / cy) * -4;
      const rotY   = ((x - cx) / cx) *  4;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


// ===== CONTACT FORM HANDLER =====
(function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const sendBtn = document.getElementById('sendBtn');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email   = form.querySelector('#email').value;
    const subject = form.querySelector('#subject').value || 'Portfolio Contact';
    const fn      = form.querySelector('#firstName').value;
    const ln      = form.querySelector('#lastName').value;
    const msg     = form.querySelector('#message').value;

    const body = `Hello Joy,%0A%0AName: ${fn} ${ln}%0AEmail: ${email}%0A%0AMessage:%0A${encodeURIComponent(msg)}`;
    window.location.href = `mailto:joyafemije@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
    showToast('📨 Opening your mail client…');
  });

  // Also handle the anchor link fallback
  if (sendBtn && sendBtn.tagName === 'A') {
    sendBtn.addEventListener('click', (e) => {
      e.preventDefault();
      form.dispatchEvent(new Event('submit'));
    });
  }
})();