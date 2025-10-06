// Dropdown menu logic
const menuDropdown = document.querySelector(".menu-dropdown");
const menuBtn = document.querySelector(".menu-btn");
menuBtn.addEventListener("click", () => {
  menuDropdown.classList.toggle("active");
});
// Close dropdown when clicking outside
window.addEventListener("click", (e) => {
  if (
    !menuDropdown.contains(e.target) &&
    menuDropdown.classList.contains("active")
  ) {
    menuDropdown.classList.remove("active");
  }
});
