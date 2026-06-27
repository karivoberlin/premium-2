const cursorGlow = document.getElementById("cursorGlow");
const header = document.getElementById("premiumHeader");
const menuButton = document.getElementById("menuButton");
const premiumNav = document.getElementById("premiumNav");
const heroParallax = document.getElementById("heroParallax");

window.addEventListener("mousemove", (event) => {
  cursorGlow.style.left = event.clientX + "px";
  cursorGlow.style.top = event.clientY + "px";
});

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  header.classList.toggle("scrolled", scrollY > 80);
  heroParallax.style.transform = `scale(1.08) translateY(${scrollY * 0.08}px)`;
});

menuButton.addEventListener("click", () => {
  premiumNav.classList.toggle("open");
});

document.querySelectorAll(".premium-nav a").forEach((link) => {
  link.addEventListener("click", () => premiumNav.classList.remove("open"));
});

const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add("visible"), index * 80);
    }
  });
}, { threshold: 0.15 });

reveals.forEach((element) => revealObserver.observe(element));

document.querySelectorAll(".tilt-card").forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const rotateY = ((x / rect.width) - 0.5) * 10;
    const rotateX = ((y / rect.height) - 0.5) * -10;
    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

const counters = document.querySelectorAll("[data-count]");
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    const element = entry.target;
    const target = parseFloat(element.dataset.count);
    let current = 0;
    const step = target / 70;

    const timer = setInterval(() => {
      current += step;

      if (current >= target) {
        element.textContent = target % 1 === 0 ? target.toLocaleString("de-DE") + "+" : target.toFixed(1) + "★";
        clearInterval(timer);
      } else {
        element.textContent = target % 1 === 0 ? Math.floor(current).toLocaleString("de-DE") : current.toFixed(1);
      }
    }, 18);

    counterObserver.unobserve(element);
  });
}, { threshold: 0.45 });

counters.forEach((counter) => counterObserver.observe(counter));
