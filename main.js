/* ============================================
   JOY ETANA — PORTFOLIO SCRIPTS 2025
============================================ */

// ===== THEME TOGGLE =====
(function initThemeToggle() {
  const btn = document.getElementById("themeToggle");
  const html = document.documentElement;
  if (!btn) return;

  function applyTheme(theme) {
    if (theme === "light") {
      html.setAttribute("data-theme", "light");
      btn.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
      html.removeAttribute("data-theme");
      btn.innerHTML = '<i class="fas fa-sun"></i>';
    }
    localStorage.setItem("portfolio-theme", theme);
  }

  // Sync icon with initial theme (set by inline script in <head>)
  const initial = localStorage.getItem("portfolio-theme") || "dark";
  applyTheme(initial);

  btn.addEventListener("click", () => {
    const current =
      html.getAttribute("data-theme") === "light" ? "light" : "dark";
    applyTheme(current === "light" ? "dark" : "light");
  });
})();

// ===== CANVAS CODE RAIN =====
(function initCodeRain() {
  const canvas = document.getElementById("codeRain");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789<>{}[]()=+*/&%$#@!;:,.?/\\|^~`";
  const charArr = chars.split("");
  const fontSize = 13;
  let cols, drops;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.floor(canvas.width / fontSize);
    drops = Array(cols).fill(1);
  }
  resize();
  window.addEventListener("resize", resize);

  function draw() {
    const isLight =
      document.documentElement.getAttribute("data-theme") === "light";
    ctx.fillStyle = isLight ? "rgba(200,201,201,0.08)" : "rgba(8,8,8,0.06)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = isLight ? "rgba(154,114,0,0.65)" : "#d4af37";
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
  const nav = document.getElementById("navbar");
  if (!nav) return;

  function onScroll() {
    nav.classList.toggle("scrolled", window.scrollY > 30);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
})();

// ===== HAMBURGER MENU =====
(function initHamburger() {
  const btn = document.getElementById("hamburger");
  const links = document.getElementById("nav-links");
  if (!btn || !links) return;

  btn.addEventListener("click", (e) => {
    e.stopPropagation();
    btn.classList.toggle("open");
    links.classList.toggle("mobile-open");
  });

  // Close on link click
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      btn.classList.remove("open");
      links.classList.remove("mobile-open");
    });
  });

  // Close on outside click
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target)) {
      btn.classList.remove("open");
      links.classList.remove("mobile-open");
    }
  });

  // Close on Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      btn.classList.remove("open");
      links.classList.remove("mobile-open");
    }
  });
})();

// ===== TYPEWRITER EFFECT =====
(function initTyper() {
  const el = document.getElementById("typed-role");
  if (!el) return;

  const roles = [
    "Frontend Developer",
    "React Specialist",
    "UI/UX Craftsperson",
    "Full-Stack Explorer",
  ];
  let roleIdx = 0,
    charIdx = 0,
    deleting = false;

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
        roleIdx = (roleIdx + 1) % roles.length;
      }
    }
    setTimeout(type, deleting ? 55 : 90);
  }
  setTimeout(type, 600);
})();

// ===== ANIMATED COUNTERS =====
(function initCounters() {
  const nums = document.querySelectorAll(".stat-num[data-target]");
  if (!nums.length) return;

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1600;
    const step = 16;
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
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          nums.forEach((el) => animateCounter(el));
          observer.disconnect();
        }
      });
    },
    { threshold: 0.3 },
  );

  const hero = document.querySelector(".hero");
  if (hero) observer.observe(hero);
})();

// ===== SCROLL REVEAL =====
(function initReveal() {
  const sections = document.querySelectorAll(".reveal");
  if (!sections.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
  );

  sections.forEach((s) => obs.observe(s));
})();

// ===== SKILL BARS ANIMATION =====
(function initSkillBars() {
  const bars = document.querySelectorAll(".skill-bar-item");
  if (!bars.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const fill = entry.target.querySelector(".bar-fill");
          const level = entry.target.dataset.level;
          if (fill && level) {
            setTimeout(() => {
              fill.style.width = level + "%";
            }, 200);
          }
        }
      });
    },
    { threshold: 0.5 },
  );

  bars.forEach((b) => obs.observe(b));
})();

// ===== BACK TO TOP =====
(function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;

  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("show", window.scrollY > 400);
    },
    { passive: true },
  );

  btn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    btn.blur();
  });

  btn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
})();

// ===== TOAST UTILITY =====
function showToast(msg, duration = 3000) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), duration);
}

// ===== SECTION STACK SCALE =====
// Sections scroll normally (not sticky), so rect.top works correctly.
// As a section scrolls off the top it gently scales down, giving
// depth to the card-overlap visual through the incoming section's
// rounded corners.
(function initSectionStack() {
  const sections = [...document.querySelectorAll("section")];

  function update() {
    sections.forEach((section) => {
      const inner = section.querySelector(".section-container");
      if (!inner) return;
      const rect = section.getBoundingClientRect();
      if (rect.top < 0 && rect.bottom > 0) {
        const progress = Math.min(1, Math.abs(rect.top) / rect.height);
        inner.style.transform = `scale(${(1 - progress * 0.05).toFixed(4)})`;
        inner.style.transformOrigin = "top center";
      } else {
        inner.style.transform = "";
      }
    });
  }

  window.addEventListener("scroll", update, { passive: true });
})();

// ===== SMOOTH SCROLL (nav links) =====
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    const id = link.getAttribute("href");
    if (id === "#") return;
    const target = document.querySelector(id);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ===== ACTIVE NAV LINK ON SCROLL =====
(function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav-links a");

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          links.forEach((a) => {
            a.style.color = "";
            a.style.background = "";
            if (a.getAttribute("href") === "#" + entry.target.id) {
              a.style.color = "var(--gold)";
              a.style.background = "var(--gold-dim)";
            }
          });
        }
      });
    },
    { threshold: 0.4 },
  );

  sections.forEach((s) => obs.observe(s));
})();

// ===== CARD TILT EFFECT =====
(function initTilt() {
  const cards = document.querySelectorAll(
    ".proj-card, .review-card, .skill-group",
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -4;
      const rotY = ((x - cx) / cx) * 4;
      card.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
})();

// ===== PROJECT BOOK — 3D PAGE FLIP =====
(function initProjectBook() {
  const wrap = document.querySelector(".book-wrap");
  if (!wrap) return;

  const pages = [...wrap.querySelectorAll(".book-page")];
  const dots = [...document.querySelectorAll(".book-dot")];
  const total = pages.length;
  let current = 0;
  let busy = false;
  const HALF = 260; // ms per half-turn

  // ── Initial state: first page flat, others stacked behind (edge-on) ──
  pages.forEach((p, i) => {
    p.style.position = "absolute";
    p.style.inset = "0";
    p.style.transition = "none";
    p.style.transformOrigin = "left center";
    p.style.transform = i === 0 ? "rotateY(0deg)" : "rotateY(90deg)";
    p.style.opacity = i === 0 ? "1" : "0";
    p.style.pointerEvents = i === 0 ? "all" : "none";
  });

  function updateUI() {
    dots.forEach((d, i) => d.classList.toggle("active", i === current));
    pages.forEach((p) => {
      const pb = p.querySelector(".btn-flip.prev");
      const nb = p.querySelector(".btn-flip.next");
      if (pb) pb.disabled = current === 0;
      if (nb) nb.disabled = current === total - 1;
    });
  }

  function goTo(idx) {
    if (busy || idx === current || idx < 0 || idx >= total) return;
    busy = true;

    const fwd = idx > current;
    const outEl = pages[current];
    const inEl = pages[idx];

    // Decide pivot edges
    const outOrigin = fwd ? "left center" : "right center";
    const inOrigin = fwd ? "right center" : "left center";
    const outEnd = fwd ? "rotateY(-90deg)" : "rotateY(90deg)";
    const inStart = fwd ? "rotateY(90deg)" : "rotateY(-90deg)";
    const easeIn = `transform ${HALF}ms cubic-bezier(0.4,0,1,1), opacity ${HALF * 0.65}ms ease-in`;
    const easeOut = `transform ${HALF}ms cubic-bezier(0,0,0.6,1), opacity ${HALF * 0.65}ms ease-out`;

    // ── Phase 1: outgoing page folds away (0° → edge-on) ──
    outEl.classList.add("flipping");
    outEl.style.transformOrigin = outOrigin;
    outEl.style.transition = easeIn;
    outEl.style.transform = outEnd;
    outEl.style.opacity = "0.1";
    outEl.style.pointerEvents = "none";

    setTimeout(() => {
      // Snap outgoing fully behind, no transition
      outEl.style.transition = "none";
      outEl.style.opacity = "0";
      outEl.classList.remove("flipping");

      // Snap incoming to edge-on (no transition) then unfold
      inEl.style.transition = "none";
      inEl.style.transformOrigin = inOrigin;
      inEl.style.transform = inStart;
      inEl.style.opacity = "0.1";
      inEl.style.pointerEvents = "none";
      inEl.offsetHeight; // force reflow

      // ── Phase 2: incoming page unfolds into view (edge-on → 0°) ──
      inEl.classList.add("flipping");
      inEl.style.transition = easeOut;
      inEl.style.transform = "rotateY(0deg)";
      inEl.style.opacity = "1";

      setTimeout(() => {
        inEl.classList.remove("flipping");
        inEl.style.pointerEvents = "all";
        current = idx;
        busy = false;
        updateUI();
      }, HALF + 30);
    }, HALF);
  }

  updateUI();

  wrap.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-flip");
    if (!btn || btn.disabled) return;
    if (btn.classList.contains("next")) goTo(current + 1);
    if (btn.classList.contains("prev")) goTo(current - 1);
  });

  dots.forEach((d) => d.addEventListener("click", () => goTo(+d.dataset.goto)));
})();

// ===== CONTACT FORM HANDLER =====
(function initContactForm() {
  const form = document.getElementById("contactForm");
  const sendBtn = document.getElementById("sendBtn");
  if (!form || !sendBtn) return;

  // ← Paste your Web3Forms key here (get it free at web3forms.com)
  const WEB3FORMS_KEY = "7ef6c809-c6ad-438c-bc65-3ef1de4dd2c4";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fn = form.querySelector("#firstName").value.trim();
    const ln = form.querySelector("#lastName").value.trim();
    const email = form.querySelector("#email").value.trim();
    const subject =
      form.querySelector("#subject").value.trim() || "Portfolio Contact";
    const msg = form.querySelector("#message").value.trim();

    // Show loading state
    sendBtn.disabled = true;
    sendBtn.innerHTML = 'Sending… <i class="fas fa-spinner fa-spin"></i>';

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: `${fn} ${ln}`,
          email,
          subject,
          message: msg,
        }),
      });

      const json = await res.json();

      if (json.success) {
        form.reset();
        showToast("Message sent! I'll be in touch soon.");
      } else {
        showToast("Something went wrong — please try again.");
      }
    } catch {
      showToast("Network error — please check your connection.");
    } finally {
      sendBtn.disabled = false;
      sendBtn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
    }
  });
})();
