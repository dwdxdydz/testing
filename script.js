(() => {
  "use strict";

  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const progress = document.getElementById("progress");
  const year = document.getElementById("year");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const setMenuState = (open) => {
    if (!navMenu || !navToggle) return;
    navMenu.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  };

  navToggle?.addEventListener("click", () => {
    setMenuState(!(navMenu?.classList.contains("open") ?? false));
  });

  navMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("click", (event) => {
    if (!navMenu || !navToggle || !navMenu.classList.contains("open")) return;
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (!navMenu.contains(target) && !navToggle.contains(target)) setMenuState(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenuState(false);
  });

  const updateScrollProgress = () => {
    if (!progress) return;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = `${Math.min(100, Math.max(0, percentage))}%`;
  };

  window.addEventListener("scroll", updateScrollProgress, { passive: true });
  window.addEventListener("resize", updateScrollProgress);
  updateScrollProgress();

  if (year) year.textContent = String(new Date().getFullYear());

  const revealElements = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  const tiltElements = document.querySelectorAll("[data-tilt]");

  const resetTilt = (element) => {
    element.style.transform = "";
  };

  if (!reduceMotion.matches) {
    tiltElements.forEach((element) => {
      let frame = null;

      element.addEventListener("pointermove", (event) => {
        const rect = element.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const strength = Number(element.dataset.tiltStrength || 5);

        const rotateY = (x - 0.5) * strength;
        const rotateX = (0.5 - y) * strength;

        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          element.style.transform =
            `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
        });
      });

      element.addEventListener("pointerleave", () => {
        if (frame) cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => resetTilt(element));
      });
    });
  }
})();