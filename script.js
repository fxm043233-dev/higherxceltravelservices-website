const WHATSAPP_NUMBER = "2348065819110"; // Replace with the company's real WhatsApp number, digits only.
const DEFAULT_MESSAGE = "Hello Higher Xcel Travel Services & Tour Ltd. I would like help planning my trip.";

document.querySelector(".hamburger").addEventListener("click", () => document.querySelector(".menu").classList.toggle("open"));
document.querySelectorAll(".menu a").forEach(a => a.addEventListener("click", () => document.querySelector(".menu").classList.remove("open")));
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

function wa(message = DEFAULT_MESSAGE) {
  if (WHATSAPP_NUMBER.includes("X")) {
    alert("Please replace WHATSAPP_NUMBER in script.js with the company's real WhatsApp number before publishing.");
    return;
  }
  window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message), "_blank");
}
document.querySelectorAll("[data-whatsapp]").forEach(a => a.addEventListener("click", e => { e.preventDefault(); wa() }));

document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const f = new FormData(e.target);
  const msg = `Hello Higher Accel Travel Services & Tour Ltd.%0A%0AName: ${f.get("name")}%0APhone: ${f.get("phone")}%0AService: ${f.get("service")}%0ATravel details: ${f.get("message")}`;
  if (WHATSAPP_NUMBER.includes("X")) {
    document.getElementById("formNote").textContent = "Replace the WhatsApp number in script.js to activate enquiries.";
    return;
  }
  window.open("https://wa.me/" + WHATSAPP_NUMBER + "?text=" + msg, "_blank");
});

// Smooth reveal animation for sections and leadership cards.
const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  revealItems.forEach(item => revealObserver.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("is-visible"));
}



// Scroll progress + back-to-top button.
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");
window.addEventListener("scroll", () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? (window.scrollY / max) * 100 : 0;
  if (scrollProgress) scrollProgress.style.width = progress + "%";
  if (backToTop) backToTop.classList.toggle("show", window.scrollY > 500);
}, { passive: true });
if (backToTop) {
  backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
}

/* =========================================================
   DARK / LIGHT THEME
   ========================================================= */
(function () {
  const toggle = document.getElementById("themeToggle");
  const icon = toggle ? toggle.querySelector(".theme-icon") : null;
  const text = toggle ? toggle.querySelector(".theme-text") : null;

  function applyTheme(theme) {
    const isDark = theme === "dark";
    document.body.classList.toggle("dark-theme", isDark);
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    if (icon) icon.textContent = isDark ? "☀" : "☾";
    if (text) text.textContent = isDark ? "Light mode" : "Dark mode";
    if (toggle) {
      toggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
      toggle.setAttribute("aria-pressed", String(isDark));
    }
  }

  let saved = null;
  try { saved = localStorage.getItem("higherAccelTheme"); } catch (e) {}
  const systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved === "dark" || saved === "light" ? saved : (systemDark ? "dark" : "light"));

  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = document.body.classList.contains("dark-theme") ? "light" : "dark";
      try { localStorage.setItem("higherAccelTheme", next); } catch (e) {}
      applyTheme(next);
    });
  }
})();

/* =========================================================
   COOKIE NOTICE
   ========================================================= */
(function () {
  const banner = document.getElementById("cookieBanner");
  const accept = document.getElementById("cookieAccept");
  const reject = document.getElementById("cookieReject");
  const settings = document.getElementById("cookieSettings");
  const fab = document.getElementById("cookiePreferencesFab");

  if (!banner) return;

  function showCookieNotice() {
    banner.classList.add("show");
  }

  function hideCookieNotice(choice) {
    try {
      localStorage.setItem("higherAccelCookieChoice", choice);
      localStorage.setItem("higherAccelCookies", choice);
    } catch (e) {}
    banner.classList.remove("show");
  }

  function hasChoice() {
    try {
      return !!(localStorage.getItem("higherAccelCookieChoice") ||
                 localStorage.getItem("higherAccelCookies"));
    } catch (e) {
      return false;
    }
  }

  if (!hasChoice()) {
    setTimeout(showCookieNotice, 700);
  }

  if (accept) accept.addEventListener("click", () => hideCookieNotice("accepted"));
  if (reject) reject.addEventListener("click", () => hideCookieNotice("declined"));

  // The existing "Learn more" button works as a clear settings/info action.
  if (settings) {
    settings.addEventListener("click", () => {
      alert("Cookie preferences\\n\\nEssential cookies are used for basic website functions. Optional analytics cookies can be enabled later if analytics are added to the site.");
    });
  }

  // Always-available cookie button lets the visitor reopen the notice.
  if (fab) {
    fab.addEventListener("click", () => {
      showCookieNotice();
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    });
  }
})();

/* =========================================================
   WELCOME NOTIFICATION
   ========================================================= */
(function () {
  const toast = document.getElementById("siteToast");
  const close = document.getElementById("toastClose");
  if (!toast) return;

  let shown = false;
  try { shown = sessionStorage.getItem("higherAccelWelcomeToast") === "1"; } catch (e) {}

  if (!shown) {
    setTimeout(() => toast.classList.add("show"), 1200);
    setTimeout(() => toast.classList.remove("show"), 7500);
    try { sessionStorage.setItem("higherAccelWelcomeToast", "1"); } catch (e) {}
  }

  if (close) close.addEventListener("click", () => toast.classList.remove("show"));
})();
