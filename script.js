const navToggle = document.getElementById("navToggle");
const navMenu = document.getElementById("navMenu");
const progress = document.getElementById("progress");
const year = document.getElementById("year");

navToggle?.addEventListener("click", () => navMenu.classList.toggle("open"));
navMenu?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

window.addEventListener("scroll", () => {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progress.style.width = scrollable > 0 ? `${(window.scrollY / scrollable) * 100}%` : "0%";
});

year.textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  entries => entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  }),
  { threshold: 0.12 }
);

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
