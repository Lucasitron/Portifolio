/* ================================================================
   projeto.js — lightbox nativo + topbar scroll para páginas de projeto
   ================================================================ */

/* ── Topbar ──────────────────────────────────────────────── */
const topbar = document.querySelector(".topbar");
const updateTopbar = () => {
    if (!topbar) return;
    topbar.classList.toggle("scrolled", window.scrollY > 24);
};

/* ── Lightbox ────────────────────────────────────────────── */
const initLightbox = () => {
    const images = [...document.querySelectorAll(".proj-img")];
    if (!images.length) return;

    // Build lightbox DOM
    const lb = document.createElement("div");
    lb.className = "lightbox";
    lb.setAttribute("role", "dialog");
    lb.setAttribute("aria-modal", "true");
    lb.setAttribute("aria-label", "Visualizador de imagem");
    lb.innerHTML = `
        <button class="lightbox-close" id="lbClose" aria-label="Fechar">✕</button>
        <button class="lightbox-nav lightbox-prev" id="lbPrev" aria-label="Anterior">&#8592;</button>
        <img class="lightbox-img" id="lbImg" src="" alt="">
        <p class="lightbox-caption" id="lbCaption"></p>
        <button class="lightbox-nav lightbox-next" id="lbNext" aria-label="Próxima">&#8594;</button>
    `;
    document.body.appendChild(lb);

    const lbImg     = lb.querySelector("#lbImg");
    const lbCaption = lb.querySelector("#lbCaption");
    let current = 0;

    const open = (index) => {
        current = index;
        const imgEl = images[current].querySelector("img");
        const cap   = images[current].dataset.caption || "";
        lbImg.src       = imgEl.src;
        lbImg.alt       = imgEl.alt;
        lbCaption.textContent = cap;
        lb.classList.add("open");
        document.body.style.overflow = "hidden";
        lb.querySelector("#lbClose").focus();
    };

    const close = () => {
        lb.classList.remove("open");
        document.body.style.overflow = "";
        images[current].focus();
    };

    const prev = () => open((current - 1 + images.length) % images.length);
    const next = () => open((current + 1) % images.length);

    // Bind image clicks
    images.forEach((img, i) => {
        img.setAttribute("tabindex", "0");
        img.addEventListener("click", () => open(i));
        img.addEventListener("keydown", (e) => { if (e.key === "Enter") open(i); });
    });

    lb.querySelector("#lbClose").addEventListener("click", close);
    lb.querySelector("#lbPrev").addEventListener("click", prev);
    lb.querySelector("#lbNext").addEventListener("click", next);

    // Close on backdrop
    lb.addEventListener("click", (e) => { if (e.target === lb) close(); });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (!lb.classList.contains("open")) return;
        if (e.key === "Escape")     close();
        if (e.key === "ArrowLeft")  prev();
        if (e.key === "ArrowRight") next();
    });
};

/* ── Reveal on scroll ────────────────────────────────────── */
const initReveal = () => {
    const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
            if (!e.isIntersecting) return;
            e.target.classList.add("in-view");
            observer.unobserve(e.target);
        }),
        { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el, i) => {
        el.style.transitionDelay = `${Math.min(i * 70, 350)}ms`;
        observer.observe(el);
    });
};

/* ── Boot ────────────────────────────────────────────────── */
updateTopbar();
initLightbox();
initReveal();
window.addEventListener("scroll", updateTopbar, { passive: true });
