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

function initTiltCards() {
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
}
initTiltCards();

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

const premiumMenuData = {
  starter: [
    { icon: "🥂", name: "Aperitif Moment", desc: "Feiner Gruß aus der Küche mit saisonalen Akzenten.", price: "9,90 €", tag: "Signature" },
    { icon: "🦪", name: "Sea Starter", desc: "Frische Meeresnoten, Zitrus und Kräuteröl.", price: "16,90 €", tag: "Fresh" },
    { icon: "🥗", name: "Golden Salad", desc: "Blattsalate, karamellisierte Nüsse, Dressing und Parmesan.", price: "12,90 €", tag: "Light" }
  ],
  main: [
    { icon: "🍝", name: "Trüffel Pasta", desc: "Hausgemachte Pasta mit Trüffelcreme und Parmesan.", price: "24,90 €", tag: "Chef" },
    { icon: "🥩", name: "Filet Royal", desc: "Rinderfilet, Jus, Gemüse und Kartoffelvariation.", price: "34,90 €", tag: "Premium" },
    { icon: "🐟", name: "Lachs Signature", desc: "Gebratener Lachs mit Zitronenbutter und Marktgemüse.", price: "27,90 €", tag: "Elegant" }
  ],
  dessert: [
    { icon: "🍫", name: "Chocolate Gold", desc: "Warmer Schokoladenkern, Vanille und Beeren.", price: "10,90 €", tag: "Sweet" },
    { icon: "🍓", name: "Berry Panna Cotta", desc: "Cremig, frisch und mit Minze serviert.", price: "8,90 €", tag: "Classic" },
    { icon: "🍨", name: "Sorbet Selection", desc: "Leichtes Sorbet mit fruchtigen Noten.", price: "7,90 €", tag: "Fresh" }
  ],
  drinks: [
    { icon: "🍷", name: "Wine Pairing", desc: "Ausgewählte Begleitung zu Signature Gerichten.", price: "ab 19 €", tag: "Pairing" },
    { icon: "🍸", name: "Golden Aperitif", desc: "Spritzig, elegant und perfekt zum Start.", price: "9,90 €", tag: "Bar" },
    { icon: "☕", name: "Espresso Ritual", desc: "Kräftig, aromatisch und stilvoll serviert.", price: "3,50 €", tag: "Finish" }
  ]
};

const menuGrid = document.getElementById("premiumMenuGrid");
const premiumTabs = document.querySelectorAll(".premium-tab");

function addMenuGlow() {
  document.querySelectorAll(".premium-menu-card").forEach(card => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 100;
      const y = ((event.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty("--x", `${x}%`);
      card.style.setProperty("--y", `${y}%`);
    });
  });
}

function renderPremiumMenu(category) {
  menuGrid.classList.add("menu-changing");
  setTimeout(() => {
    menuGrid.innerHTML = premiumMenuData[category].map(item => `
      <article class="premium-menu-card tilt-card">
        <div>
          <div class="food-icon">${item.icon}</div>
          <h3>${item.name}</h3>
          <p>${item.desc}</p>
        </div>
        <div class="food-footer">
          <span>${item.tag}</span>
          <strong>${item.price}</strong>
        </div>
      </article>
    `).join("");
    addMenuGlow();
    initTiltCards();
    menuGrid.classList.remove("menu-changing");
  }, 180);
}

premiumTabs.forEach(tab => {
  tab.addEventListener("click", () => {
    premiumTabs.forEach(item => item.classList.remove("active"));
    tab.classList.add("active");
    renderPremiumMenu(tab.dataset.category);
  });
});
renderPremiumMenu("starter");

const galleryButtons = document.querySelectorAll(".gallery-filter-btn");
const galleryTiles = document.querySelectorAll(".gallery-tile");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxClose = document.getElementById("lightboxClose");

galleryButtons.forEach(button => {
  button.addEventListener("click", () => {
    galleryButtons.forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    galleryTiles.forEach(tile => {
      const match = filter === "all" || tile.dataset.category === filter;
      tile.classList.toggle("hidden", !match);
    });
  });
});

galleryTiles.forEach(tile => {
  tile.addEventListener("click", () => {
    lightboxImage.src = tile.dataset.img;
    lightboxTitle.textContent = tile.dataset.title;
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
  });
});

function closeLightbox() {
  lightbox.classList.remove("active");
  lightbox.setAttribute("aria-hidden", "true");
}

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeLightbox();
});
