// ===== EDIT THESE =====
const FIVERR_URL = "https://www.fiverr.com/s/Dmmlx2P";
const GITHUB_URL = "https://github.com/anshika31gupta/website-debugging-case-studies";
// ======================
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

$$("[data-fiverr]").forEach(a => { a.href = FIVERR_URL; });
$$("[data-github]").forEach(a => { a.href = GITHUB_URL + (a.dataset.github ? "/tree/main/" + a.dataset.github : ""); });

// Terminal: reveal lines one by one
$$("#term .l").forEach((l, i) => reduce ? l.classList.add("show") : setTimeout(() => l.classList.add("show"), 500 + i * 650));

// Scroll reveal + count-up
$$("section.wrap").forEach(s => s.classList.add("rv"));
function count(el) {
  const end = +el.dataset.count; if (reduce) return;
  const t0 = performance.now();
  (function step(t) { const p = Math.min((t - t0) / 900, 1); el.textContent = Math.round(end * p); if (p < 1) requestAnimationFrame(step); })(t0);
}
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("in"); $$("[data-count]", e.target).forEach(count); io.unobserve(e.target);
}), { threshold: .15 });
$$(".rv").forEach(s => io.observe(s));

// Before/after toggle
$$("[data-pair]").forEach(f => {
  const btns = $$("[data-show]", f), boxes = $$(".zoom", f);
  btns.forEach(b => b.addEventListener("click", () => {
    btns.forEach(x => { const on = x === b; x.classList.toggle("on", on); x.setAttribute("aria-pressed", on); });
    boxes.forEach(z => { z.hidden = z.querySelector("img").dataset.img !== b.dataset.show; });
  }));
});

// Missing image fallback
$$("img").forEach(img => img.addEventListener("error", () => {
  const d = document.createElement("div"); d.className = "nofile";
  d.textContent = "Image not found: " + img.getAttribute("src"); img.replaceWith(d);
}));

// Lightbox
const lb = document.getElementById("lb"), lbi = document.getElementById("lbi");
$$("[data-zoom]").forEach(z => z.addEventListener("click", () => {
  const i = z.querySelector("img"); if (!i) return;
  lbi.src = i.src; lbi.alt = i.alt; lb.showModal();
}));
document.getElementById("lbx").addEventListener("click", () => lb.close());
lb.addEventListener("click", e => { if (e.target === lb) lb.close(); });
