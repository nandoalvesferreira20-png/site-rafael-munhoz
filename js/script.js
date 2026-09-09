"use strict";

const header = document.querySelector("#header");
const menuToggle = document.querySelector("#menuToggle");
const nav = document.querySelector("#nav");
const mobile = window.matchMedia("(max-width: 900px)");

if (header && menuToggle && nav) {
  header.classList.add("menu-enabled");

  const closeMenu = (restoreFocus = false) => {
    nav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
    if (restoreFocus) menuToggle.focus();
  };

  menuToggle.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") !== "true";
    nav.classList.toggle("is-open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  });
  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });
  document.addEventListener("click", (event) => {
    if (!header.contains(event.target)) closeMenu();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) closeMenu(true);
  });
  header.addEventListener("focusout", (event) => {
    if (!header.contains(event.relatedTarget)) closeMenu();
  });
  mobile.addEventListener("change", () => {
    closeMenu(mobile.matches && nav.contains(document.activeElement));
  });
  const updateHeader = () => header.classList.toggle("is-scrolled", window.scrollY > 12);
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
if ("IntersectionObserver" in window && !reducedMotion.matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.06 });
  document.querySelectorAll("[data-reveal]").forEach((element) => {
    // Keep already-visible content visible on initial load and anchor navigation.
    if (element.getBoundingClientRect().top >= window.innerHeight) {
      element.classList.add("reveal-ready");
      observer.observe(element);
    }
  });
}
const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());
