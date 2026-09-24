(() => {
  "use strict";

  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  const progress = document.getElementById("progress");
  const year = document.getElementById("year");

  const setMenuState = (open) => {
    if (!navMenu || !navToggle) return;

    navMenu.classList.toggle("open", open);
    navToggle.setAttribute("aria-expanded", String(open));
    navToggle.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  };

  navToggle?.addEventListener("click", () => {
    const isOpen = navMenu?.classList.contains("open") ?? false;
    setMenuState(!isOpen);
  });

  navMenu?.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenuState(false));
  });

  document.addEventListener("click", (event) => {
    if (!navMenu || !navToggle || !navMenu.classList.contains("open")) return;

    const target = event.target;
    if (!(target instanceof Node)) return;

    if (!navMenu.contains(target) && !navToggle.contains(target)) {
      setMenuState(false);
    }
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

  if (year) {
    year.textContent = String(new Date().getFullYear());
  }

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((element) => observer.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }
})();