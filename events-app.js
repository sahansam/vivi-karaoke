/* Renders events from events.js – no need to edit this file. */
(function () {
  const BASE = "https://vivikaraoke.de/";
  const list = (window.EVENTS || []).slice();
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const folder = e => "events/" + e.id + "/";
  const src = (e, f) => "/" + folder(e) + f;
  const dt = e => new Date(e.date + "T00:00");
  // an event stays "upcoming" until 6:00 the next morning (karaoke runs past midnight)
  const today = new Date(Date.now() - 6 * 3600 * 1000); today.setHours(0, 0, 0, 0);
  const upcoming = list.filter(e => dt(e) >= today).sort((a, b) => dt(a) - dt(b));
  const past = list.filter(e => dt(e) < today).sort((a, b) => dt(b) - dt(a));
  const fmt = (e, o) => dt(e).toLocaleDateString("de-DE", o);
  const when = e => fmt(e, { weekday: "short", day: "numeric", month: "long" }) + (e.time ? " · " + e.time + " Uhr" : "");
  const maps = e => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent([e.venue, e.address, e.city].filter(Boolean).join(", "));

  /* ---- Germany UTC offset for schema dates (CET/CEST) */
  function offset(d) {
    const y = d.getFullYear();
    const lastSun = m => { const x = new Date(y, m + 1, 0); x.setDate(x.getDate() - x.getDay()); return x; };
    return (d >= lastSun(2) && d < lastSun(9)) ? "+02:00" : "+01:00";
  }

  /* ---- Google event schema for upcoming events */
  if (upcoming.length) {
    const ld = upcoming.map(e => ({
      "@context": "https://schema.org", "@type": "Event",
      name: "Karaoke-Abend im " + e.venue,
      startDate: e.date + "T" + (e.time || "20:00") + ":00" + offset(dt(e)),
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      description: e.text || "",
      image: e.flyer ? [BASE + folder(e) + e.flyer] : [BASE + "og-image.jpg"],
      location: { "@type": "Place", name: e.venue, address: { "@type": "PostalAddress", streetAddress: e.address || "", addressLocality: e.city || "", addressCountry: "DE" } },
      organizer: { "@type": "Organization", name: "Vivi's Mic Drop", url: BASE },
      performer: { "@type": "PerformingGroup", name: "Vivi's Mic Drop" }
    }));
    const s = document.createElement("script"); s.type = "application/ld+json";
    s.textContent = JSON.stringify(ld); document.head.appendChild(s);
  }

  /* ---- Lightbox (flyers + albums) */
  let lb, imgs = [], idx = 0;
  function openLB(arr, i) {
    imgs = arr; idx = i;
    if (!lb) {
      lb = document.createElement("div"); lb.className = "lb"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-modal", "true");
      lb.innerHTML = '<button class="lb-x" aria-label="Schließen">✕</button><button class="lb-p" aria-label="Zurück">‹</button><img alt=""><button class="lb-n" aria-label="Weiter">›</button><div class="lb-c"></div>';
      document.body.appendChild(lb);
      lb.querySelector(".lb-x").onclick = closeLB;
      lb.querySelector(".lb-p").onclick = ev => { ev.stopPropagation(); step(-1); };
      lb.querySelector(".lb-n").onclick = ev => { ev.stopPropagation(); step(1); };
      lb.onclick = ev => { if (ev.target === lb) closeLB(); };
      let x0 = null;
      lb.addEventListener("touchstart", ev => x0 = ev.touches[0].clientX, { passive: true });
      lb.addEventListener("touchend", ev => { if (x0 === null) return; const dx = ev.changedTouches[0].clientX - x0; if (Math.abs(dx) > 40) step(dx < 0 ? 1 : -1); x0 = null; });
      document.addEventListener("keydown", ev => { if (!lb.classList.contains("on")) return; if (ev.key === "Escape") closeLB(); if (ev.key === "ArrowRight") step(1); if (ev.key === "ArrowLeft") step(-1); });
    }
    show(); lb.classList.add("on"); document.body.style.overflow = "hidden";
  }
  function show() {
    lb.querySelector("img").src = imgs[idx];
    const many = imgs.length > 1;
    lb.querySelector(".lb-p").hidden = lb.querySelector(".lb-n").hidden = !many;
    lb.querySelector(".lb-c").textContent = many ? (idx + 1) + " / " + imgs.length : "";
  }
  function step(d) { idx = (idx + d + imgs.length) % imgs.length; show(); }
  function closeLB() { lb.classList.remove("on"); document.body.style.overflow = ""; }
  window.__openLB = openLB;

  /* ---- Event card */
  function card(e, big) {
    const fl = e.flyer ? `<button class="ev-fl" data-fl="${esc(src(e, e.flyer))}" aria-label="Flyer groß anzeigen"><img src="${esc(src(e, e.flyer))}" alt="Flyer: Karaoke im ${esc(e.venue)}, ${esc(when(e))}" loading="lazy"></button>` : "";
    const tags = (e.info || []).map(t => `<li>${esc(t)}</li>`).join("");
    return `<article class="ev${big ? " big" : ""}">${fl}<div class="ev-b">
      <h3>${esc(e.venue)}</h3>
      <p class="ev-d">${esc(when(e))}</p>
      <p class="ev-v">${esc([e.address, e.city].filter(Boolean).join(", "))}</p>
      ${tags ? `<ul class="ev-t">${tags}</ul>` : ""}
      ${big && e.text ? `<p class="ev-x">${esc(e.text)}</p>` : ""}
      <div class="ev-a"><a href="${maps(e)}" target="_blank" rel="noopener">📍 Route</a><button class="ev-s" data-id="${esc(e.id)}">↗ Teilen</button></div>
    </div></article>`;
  }
  function wire(root) {
    root.querySelectorAll(".ev-fl").forEach(b => b.onclick = () => openLB([b.dataset.fl], 0));
    root.querySelectorAll(".ev-s").forEach(b => b.onclick = async () => {
      const e = list.find(x => x.id === b.dataset.id);
      const url = BASE + "events", title = "Karaoke im " + e.venue, text = title + " – " + when(e);
      if (navigator.share) { navigator.share({ title, text, url }).catch(() => {}); return; }
      try { await navigator.clipboard.writeText(text + " " + url); }       // laptops without a share menu
      catch (_) { window.open("https://wa.me/?text=" + encodeURIComponent(text + " " + url), "_blank", "noopener"); return; }
      const old = b.textContent; b.textContent = "✓ Link kopiert"; setTimeout(() => b.textContent = old, 2000);
    });
    root.querySelectorAll(".al-g button").forEach(b => b.onclick = () => {
      const e = list.find(x => x.id === b.dataset.id);
      openLB(e.photos.map(f => src(e, f)), +b.dataset.i);
    });
  }

  /* ---- Homepage: up to 3 next events; button to /events only when there are more */
  const home = document.getElementById("nextEvent");
  if (home) {
    const MAX = 3, show = upcoming.slice(0, MAX), more = upcoming.length - show.length;
    if (show.length) {
      home.innerHTML = `<h2>${show.length > 1 ? "Nächste Karaoke-Abende" : "Nächster Karaoke-Abend"}</h2>
        <div class="ev-list n${show.length}">${show.map(e => card(e, false)).join("")}</div>
        ${more > 0 ? `<a class="ev-more" href="/events">+${more} ${more > 1 ? "weitere Termine" : "weiterer Termin"} →</a>` : ""}`;
      wire(home);
    } else home.hidden = true;
  }

  /* ---- Events page */
  const up = document.getElementById("evUpcoming"), pa = document.getElementById("evPast");
  if (up) {
    up.innerHTML = upcoming.length ? upcoming.map(e => card(e, true)).join("")
      : `<p class="ev-none">Gerade keine Termine geplant – tritt unserer WhatsApp-Gruppe bei, dann erfährst du es zuerst.</p>`;
    wire(up);
  }
  if (pa) {
    const withPics = past.filter(e => e.photos && e.photos.length);
    pa.innerHTML = withPics.length ? withPics.map(e => `<section class="al" id="${esc(e.id)}">
        <h3>${esc(e.venue)} <span>· ${esc(fmt(e, { day: "numeric", month: "long", year: "numeric" }))}</span></h3>
        <div class="al-g">${e.photos.map((f, i) => `<button data-id="${esc(e.id)}" data-i="${i}" aria-label="Foto ${i + 1} groß anzeigen"><img src="${esc(src(e, f))}" alt="Karaoke-Abend im ${esc(e.venue)}, Foto ${i + 1}" loading="lazy"></button>`).join("")}</div>
      </section>`).join("")
      : `<p class="ev-none">Die ersten Fotoalben kommen bald.</p>`;
    wire(pa);
  }
})();
