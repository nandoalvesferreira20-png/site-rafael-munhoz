const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("nav--active");
});