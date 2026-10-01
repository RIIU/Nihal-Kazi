// ---------------------------------------------------------
// Settings — change this to your real email address
// ---------------------------------------------------------
const CONTACT_EMAIL = "your-email@example.com";

// Year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Sticky nav background on scroll
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 20);
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

// Mobile menu
const toggle = document.getElementById("navToggle");
const setMenu = (open) => {
  nav.classList.toggle("is-open", open);
  toggle.setAttribute("aria-expanded", String(open));
  toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  document.body.style.overflow = open ? "hidden" : "";
};
toggle.addEventListener("click", () => setMenu(!nav.classList.contains("is-open")));
document.querySelectorAll("#navLinks a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
document.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));

// Project cards (data lives in projects.js)
const SHOT_WIDTH = 1200;
const shotUrl = (url, attempt) =>
  `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=${SHOT_WIDTH}&h=900${attempt ? `&r=${attempt}` : ""}`;

// The screenshot service returns a small "generating" placeholder the first
// time a site is requested, so retry a few times until the real image arrives.
const loadShot = (img, url) => {
  let attempt = 0;
  img.addEventListener("load", () => {
    if (img.naturalWidth >= SHOT_WIDTH * 0.9) {
      img.classList.add("is-loaded");
    } else if (attempt < 5) {
      attempt += 1;
      setTimeout(() => (img.src = shotUrl(url, attempt)), 2500 * attempt);
    }
  });
  img.src = shotUrl(url, 0);
};

const grid = document.getElementById("projectGrid");
const hostOf = (url) => new URL(url).hostname.replace(/^www\./, "");
// Must match slugOf() in scripts/screenshot.mjs
const slugOf = (url) => hostOf(url).replace(/\./g, "-");
const esc = (str) => String(str).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
const hues = [265, 150, 200, 25, 330, 85, 190, 290];

PROJECTS.forEach((p, i) => {
  const card = document.createElement("a");
  card.className = "site-card reveal";
  card.href = p.url;
  card.target = "_blank";
  card.rel = "noopener";
  card.dataset.cat = p.cats.join(" ");
  card.style.setProperty("--hue", hues[i % hues.length]);
  card.innerHTML = `
    <div class="site-card__frame">
      <div class="site-card__bar"><i></i><i></i><i></i><span>${esc(hostOf(p.url))}</span></div>
      <div class="site-card__shot">
        <span class="site-card__fallback" aria-hidden="true">${esc(p.name.charAt(0))}</span>
        <img alt="Screenshot of the ${esc(p.name)} website" loading="lazy" />
      </div>
    </div>
    <div class="site-card__meta">
      <div class="site-card__top">
        <h3>${esc(p.name)}</h3>
        <span class="site-card__tag">${esc(p.tag)}</span>
      </div>
      <p>${esc(p.desc)}</p>
      <span class="site-card__visit">Visit website <span aria-hidden="true">↗</span></span>
    </div>`;
  // Use the screenshot saved in the repo; fall back to a live one if it's missing.
  const img = card.querySelector("img");
  img.dataset.local = "1";
  img.addEventListener("load", () => img.dataset.local && img.classList.add("is-loaded"));
  img.addEventListener("error", () => {
    if (!img.dataset.local) return;
    delete img.dataset.local;
    loadShot(img, p.url);
  });
  img.src = p.image || `assets/img/projects/${slugOf(p.url)}.jpg`;
  grid.appendChild(card);
});

// Reveal on scroll + stat counters
const animateCount = (el) => {
  const target = Number(el.dataset.count);
  const start = performance.now();
  const duration = 1600;
  const tick = (now) => {
    const p = Math.min((now - start) / duration, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        entry.target.querySelectorAll("[data-count]").forEach(animateCount);
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 80}ms`;
    io.observe(el);
  });
} else {
  document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
  document.querySelectorAll("[data-count]").forEach((el) => (el.textContent = el.dataset.count));
}

// Project filters + "View all"
const INITIAL_COUNT = 9;
const filters = document.querySelectorAll(".filter");
const cards = [...document.querySelectorAll(".site-card")];
const showMore = document.getElementById("showMore");
let activeFilter = "all";
let expanded = false;

const applyFilter = () => {
  cards.forEach((card, i) => {
    const match = activeFilter === "all" || card.dataset.cat.split(" ").includes(activeFilter);
    const show = match && (expanded || activeFilter !== "all" || i < INITIAL_COUNT);
    card.classList.toggle("is-hidden", !show);
  });
  showMore.hidden = expanded || activeFilter !== "all" || cards.length <= INITIAL_COUNT;
};

filters.forEach((btn) =>
  btn.addEventListener("click", () => {
    filters.forEach((b) => {
      b.classList.toggle("is-active", b === btn);
      b.setAttribute("aria-selected", String(b === btn));
    });
    activeFilter = btn.dataset.filter;
    applyFilter();
  })
);
showMore.innerHTML = `View all ${cards.length} projects <span aria-hidden="true">↓</span>`;
showMore.addEventListener("click", () => {
  expanded = true;
  applyFilter();
});
applyFilter();

// Cursor glow
const glow = document.querySelector(".cursor-glow");
if (window.matchMedia("(hover: hover)").matches) {
  window.addEventListener(
    "pointermove",
    (e) => {
      glow.style.left = `${e.clientX}px`;
      glow.style.top = `${e.clientY}px`;
    },
    { passive: true }
  );
}

// Contact form → opens the visitor's email app with the message filled in
const form = document.getElementById("contactForm");
const note = document.getElementById("formNote");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    note.textContent = "Please fill in your name, a valid email and a message.";
    form.reportValidity();
    return;
  }
  const data = new FormData(form);
  const subject = `New project inquiry: ${data.get("type")}`;
  const body = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nProject type: ${data.get("type")}\n\n${data.get("message")}`;
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  note.textContent = "Opening your email app… Thanks for reaching out!";
  form.reset();
});
