// Dropdown menu logic
// const menuDropdown = document.querySelector(".menu-dropdown");
// const menuBtn = document.querySelector(".menu-btn");
// menuBtn.addEventListener("click", () => {
//   menuDropdown.classList.toggle("active");
// });
// Close dropdown when clicking outside
// window.addEventListener("click", (e) => {
//   if (
//     !menuDropdown.contains(e.target) &&
//     menuDropdown.classList.contains("active")
//   ) {
//     menuDropdown.classList.remove("active");
//   }
// });

// Back-to-top functionality
document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.getElementById("backToTop");
  if (!backToTopBtn) return;

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  };

  // Smooth scroll to top on click
  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
    backToTopBtn.blur();
  });

  // Keyboard accessibility (Enter / Space)
  backToTopBtn.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });

  window.addEventListener("scroll", toggleVisibility);
  // initial check
  toggleVisibility();
});

// === MOBILE MENU TOGGLE ===
const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");

  // Toggle between hamburger and close icon
  const icon = menuToggle.querySelector("i");
  if (icon.classList.contains("fa-bars")) {
    icon.classList.replace("fa-bars", "fa-times");
  } else {
    icon.classList.replace("fa-times", "fa-bars");
  }
});

// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLi = document.querySelector(".nav-li");
  if (!menuToggle || !navLi) return;

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navLi.classList.toggle("active");
  });

  // Close nav when clicking outside
  window.addEventListener("click", (e) => {
    if (!navLi.contains(e.target) && !menuToggle.contains(e.target)) {
      navLi.classList.remove("active");
    }
  });

  // Close on escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") navLi.classList.remove("active");
  });
});
