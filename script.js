// ====== EDIT THIS: restaurant WhatsApp number (country code, no + or spaces) ======
const WHATSAPP_NUMBER = "919876543210";
// ==================================================================================

const waLink = (text) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;

// Floating WhatsApp button
document.getElementById("wa").href = waLink("Hi! I'd like to know more about Spice Route Kitchen.");

// Order a dish on WhatsApp
document.querySelectorAll(".dish").forEach((card) => {
  card.href = waLink(`Hi! I'd like to order: ${card.dataset.dish}`);
  card.target = "_blank";
  card.rel = "noopener";
});

// Booking form -> WhatsApp message
document.getElementById("bookForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const date = document.getElementById("date").value;
  const guests = document.getElementById("guests").value;
  window.open(
    waLink(`Hi! Table booking request.\nName: ${name}\nDate: ${date}\nGuests: ${guests}`),
    "_blank"
  );
  e.target.reset();
});

// Fade-in on scroll
const io = new IntersectionObserver(
  (entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("show"); io.unobserve(en.target); }
  }),
  { threshold: 0.15 }
);
document.querySelectorAll(".fade").forEach((el) => io.observe(el));

// Count-up numbers
const counter = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (!en.isIntersecting) return;
    const el = en.target, end = +el.dataset.count, suffix = el.dataset.suffix || "";
    let n = 0; const step = Math.max(1, Math.round(end / 60));
    const t = setInterval(() => {
      n = Math.min(end, n + step);
      el.textContent = n.toLocaleString("en-IN") + suffix;
      if (n >= end) clearInterval(t);
    }, 20);
    counter.unobserve(el);
  });
}, { threshold: 0.6 });
document.querySelectorAll("[data-count]").forEach((el) => counter.observe(el));