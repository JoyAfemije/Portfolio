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

// === NAVBAR HAMBURGER MENU ===
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (!menuToggle || !navMenu) return;

  // Toggle menu on click
  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    navMenu.classList.toggle("active");
    menuToggle.classList.toggle("open");

    // Toggle between hamburger and close icon
    const icon = menuToggle.querySelector("i");
    if (icon.classList.contains("fa-bars")) {
      icon.classList.replace("fa-bars", "fa-times");
    } else {
      icon.classList.replace("fa-times", "fa-bars");
    }
  });

  // Close menu when clicking outside
  window.addEventListener("click", (e) => {
    if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("open");

      // Reset icon
      const icon = menuToggle.querySelector("i");
      if (icon.classList.contains("fa-times")) {
        icon.classList.replace("fa-times", "fa-bars");
      }
    }
  });

  // Close on Escape
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      navMenu.classList.remove("active");
      menuToggle.classList.remove("open");

      // Reset icon
      const icon = menuToggle.querySelector("i");
      if (icon.classList.contains("fa-times")) {
        icon.classList.replace("fa-times", "fa-bars");
      }
    }
  });
});


document.addEventListener("DOMContentLoaded", () => {
  const downloadBtn = document.getElementById("download-cv");
  const cvLink = "./files/Joy-Afemije-CV.pdf"; // your CV path
  const toast = document.getElementById("toast");

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  downloadBtn.addEventListener("click", (e) => {
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);

    if (isMobile) {
      e.preventDefault();
      window.open(cvLink, "_blank");
      showToast("📄 Opening CV...");
    } else {
      downloadBtn.setAttribute("href", cvLink);
      downloadBtn.setAttribute("download", "");
      showToast("⬇️ Downloading CV...");
    }
  });
});


