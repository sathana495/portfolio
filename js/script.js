(function () {
  "use strict";

  /* ---------- Theme toggle ---------- */
  var root = document.documentElement;
  var themeToggle = document.getElementById("themeToggle");
  var savedTheme = null;
  try { savedTheme = localStorage.getItem("theme"); } catch (e) { /* storage unavailable */ }

  var prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  var initialTheme = savedTheme || (prefersDark ? "dark" : "dark"); // default dark for this design
  root.setAttribute("data-theme", initialTheme);
  themeToggle.setAttribute("aria-pressed", initialTheme === "light" ? "true" : "false");

  themeToggle.addEventListener("click", function () {
    var current = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", current);
    themeToggle.setAttribute("aria-pressed", current === "light" ? "true" : "false");
    try { localStorage.setItem("theme", current); } catch (e) { /* no-op */ }
  });

  /* ---------- Mobile nav ---------- */
  var burger = document.getElementById("navBurger");
  var navLinks = document.getElementById("navLinks");
  burger.addEventListener("click", function () {
    var open = navLinks.classList.toggle("open");
    burger.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  });
  navLinks.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  /* ---------- Hero role typing effect ---------- */
  var roles = ["Data Scientist", "Machine Learning Engineer", "Predictive Modeler"];
  var typeTarget = document.getElementById("typeTarget");
  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (typeTarget && !reduceMotion) {
    var roleIndex = 0, charIndex = 0, deleting = false;

    function tick() {
      var current = roles[roleIndex];
      if (!deleting) {
        charIndex++;
        typeTarget.textContent = current.slice(0, charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(tick, 1400);
          return;
        }
      } else {
        charIndex--;
        typeTarget.textContent = current.slice(0, charIndex);
        if (charIndex === 0) {
          deleting = false;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      setTimeout(tick, deleting ? 40 : 70);
    }
    tick();
  }

  /* ---------- Console / terminal type-out ---------- */
  var consoleBody = document.getElementById("consoleBody");
  var consoleScript = [
    ">>> import sathana as ds",
    ">>> ds.status()",
    "{",
    '  "role": "Aspiring ML Engineer",',
    '  "based_in": "Salem, Tamil Nadu",',
    '  "top_model_accuracy": "89%",',
    '  "projects_shipped": 4,',
    '  "internships": 2,',
    '  "currently": "open to opportunities"',
    "}"
  ].join("\n");

  if (consoleBody) {
    if (reduceMotion) {
      consoleBody.textContent = consoleScript;
    } else {
      var i = 0;
      (function typeConsole() {
        consoleBody.textContent = consoleScript.slice(0, i);
        i++;
        if (i <= consoleScript.length) {
          setTimeout(typeConsole, 14);
        }
      })();
    }
  }

  /* ---------- Scroll reveal ---------- */
  var revealTargets = document.querySelectorAll(
    ".section-inner > *, .project-card, .stat, .cert-card, .timeline-item, .skill-group"
  );
  revealTargets.forEach(function (el) { el.classList.add("reveal"); });

  var bars = document.querySelectorAll(".bar");

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(function (el) { io.observe(el); });
    bars.forEach(function (el) { io.observe(el); });
  } else {
    revealTargets.forEach(function (el) { el.classList.add("in"); });
    bars.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Sticky nav active link + scroll-to-top ---------- */
  var scrollTopBtn = document.getElementById("scrollTop");
  window.addEventListener("scroll", function () {
    scrollTopBtn.classList.toggle("visible", window.scrollY > 500);
  });
  scrollTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  });

  /* ---------- Contact form (front-end only demo) ---------- */
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = "Please fill in all fields with a valid email.";
      status.style.color = "var(--accent-2)";
      return;
    }
    // NOTE: no backend wired up. Swap this for Formspree / EmailJS / your own API.
    status.style.color = "var(--success)";
    status.textContent = "Thanks! Your message has been noted. I'll get back to you soon.";
    form.reset();
  });

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
