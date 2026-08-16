/* ================================================================
   lucasitron — app.js
   ================================================================ */

const topbar      = document.querySelector(".topbar");
const includeTargets = document.querySelectorAll("[data-include]");
const scrollBar   = document.getElementById("scrollProgress");
const cursorDot   = document.getElementById("cursorDot");
const cursorRing  = document.getElementById("cursorRing");
const heroOrb     = document.getElementById("heroOrb");
let revealObserver;

/* ── Topbar scroll state ─────────────────────────────────── */
const updateTopbar = () => {
    if (!topbar) return;
    topbar.classList.toggle("scrolled", window.scrollY > 24);
};

/* ── Scroll progress bar ─────────────────────────────────── */
const updateScrollProgress = () => {
    if (!scrollBar) return;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    scrollBar.style.width = total > 0
        ? `${(window.scrollY / total) * 100}%`
        : "0%";
};

/* ── Custom cursor ───────────────────────────────────────── */
const initCursor = () => {
    if (!cursorDot || !cursorRing) return;

    // Only on true pointer devices
    if (!window.matchMedia("(hover: hover)").matches) return;

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let animId;

    const lerp = (a, b, t) => a + (b - a) * t;

    const tick = () => {
        ringX = lerp(ringX, mouseX, 0.14);
        ringY = lerp(ringY, mouseY, 0.14);
        cursorRing.style.left = `${ringX}px`;
        cursorRing.style.top  = `${ringY}px`;
        animId = requestAnimationFrame(tick);
    };

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = `${e.clientX}px`;
        cursorDot.style.top  = `${e.clientY}px`;
    }, { passive: true });

    // Expand ring over interactive elements
    const interactives = "a, button, .skill-card, .project-card, .signal-card, .filter-btn, .footer-link";
    document.addEventListener("mouseover", (e) => {
        if (e.target.closest(interactives)) {
            cursorRing.classList.add("hovering");
        }
    });
    document.addEventListener("mouseout", (e) => {
        if (e.target.closest(interactives)) {
            cursorRing.classList.remove("hovering");
        }
    });

    // Hide when leaving window
    document.addEventListener("mouseleave", () => {
        cursorDot.style.opacity  = "0";
        cursorRing.style.opacity = "0";
    });
    document.addEventListener("mouseenter", () => {
        cursorDot.style.opacity  = "1";
        cursorRing.style.opacity = "1";
    });

    tick();
};

/* ── Hero parallax orb ───────────────────────────────────── */
const initParallaxOrb = () => {
    if (!heroOrb) return;

    // Set initial position
    heroOrb.style.left = "30%";
    heroOrb.style.top  = "40%";

    let ticking = false;
    document.addEventListener("mousemove", (e) => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            const xPct = (e.clientX / window.innerWidth)  * 100;
            const yPct = (e.clientY / window.innerHeight) * 100;
            // Orb follows at ~25% of cursor movement (subtle)
            const tx = 10 + xPct * 0.6;
            const ty = 10 + yPct * 0.6;
            heroOrb.style.left = `${tx}%`;
            heroOrb.style.top  = `${ty}%`;
            ticking = false;
        });
    }, { passive: true });
};

/* ── HTML include loader ─────────────────────────────────── */
const loadIncludes = async () => {
    await Promise.all(
        [...includeTargets].map(async (target) => {
            const response = await fetch(target.dataset.include);
            if (!response.ok) {
                target.innerHTML = `<section class="content-band"><p>Não foi possível carregar ${target.dataset.include}.</p></section>`;
                return;
            }
            target.outerHTML = await response.text();
        })
    );
};

/* ── Reveal on scroll ────────────────────────────────────── */
const initReveal = () => {
    if (revealObserver) revealObserver.disconnect();

    revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("in-view");
                // Stagger skill bars sequentially
                entry.target.querySelectorAll(".skill-bar__fill").forEach((bar, i) => {
                    bar.style.setProperty("--bar-delay", `${i * 0.1 + 0.2}s`);
                });
                revealObserver.unobserve(entry.target);
            });
        },
        { threshold: 0.14, rootMargin: "0px 0px -6% 0px" }
    );

    document.querySelectorAll(".reveal").forEach((item, index) => {
        item.style.transitionDelay = `${Math.min(index * 65, 390)}ms`;
        revealObserver.observe(item);
    });
};

/* ── Filter system ───────────────────────────────────────── */
const initFilters = () => {
    document.querySelectorAll("[data-filter-group]").forEach((group) => {
        const buttons = group.querySelectorAll("[data-filter]");
        const section = group.closest(".dynamic-section");
        const items   = section ? section.querySelectorAll(".filter-item") : [];

        buttons.forEach((button) => {
            button.addEventListener("click", () => {
                const selected = button.dataset.filter;
                buttons.forEach((b) => b.classList.toggle("active", b === button));

                let visibleIndex = 0;
                items.forEach((item) => {
                    const shouldShow = selected === "all" || item.dataset.category === selected;
                    item.classList.toggle("hidden", !shouldShow);

                    if (shouldShow) {
                        item.classList.remove("in-view");
                        item.style.transitionDelay = `${Math.min(visibleIndex * 60, 240)}ms`;
                        // Reset skill bars
                        item.querySelectorAll(".skill-bar__fill").forEach((bar) => {
                            bar.style.setProperty("--bar-delay", "0s");
                            bar.style.width = "0";
                        });
                        requestAnimationFrame(() => {
                            item.classList.add("in-view");
                            item.querySelectorAll(".skill-bar__fill").forEach((bar, i) => {
                                bar.style.removeProperty("width");
                                bar.style.setProperty("--bar-delay", `${i * 0.1 + 0.1}s`);
                            });
                        });
                        visibleIndex++;
                    }
                });
            });
        });
    });
};

/* ── Active navigation highlight ────────────────────────── */
const initActiveNavigation = () => {
    const navLinks = document.querySelectorAll(".topbar a[href^='#']");
    const sections = [...navLinks]
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);

    const setActiveLink = (id) => {
        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });
    };

    // Faixa fina no centro da viewport: destaca a seção que a
    // cruzar, independentemente da altura da seção.
    const navObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) setActiveLink(entry.target.id);
            });
        },
        { threshold: 0, rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => navObserver.observe(section));

    // Destaque imediato ao clicar no menu da top bar
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const id = link.getAttribute("href").slice(1);
            setActiveLink(id);
        });
    });
};

/* ── Mobile menu toggle ──────────────────────────────────── */
const initMobileMenu = () => {
    const toggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector(".topbar");
    if (!toggle || !nav) return;

    const closeMenu = () => {
        nav.classList.remove("menu-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
    };

    toggle.addEventListener("click", () => {
        const open = nav.classList.toggle("menu-open");
        toggle.setAttribute("aria-expanded", String(open));
        toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });

    nav.querySelectorAll("a[href^='#']").forEach((link) => {
        link.addEventListener("click", closeMenu);
    });

    // Fecha ao clicar fora ou rolar a página
    document.addEventListener("click", (e) => {
        if (!nav.contains(e.target)) closeMenu();
    });
    window.addEventListener("scroll", closeMenu, { passive: true });
};

/* ── Scroll to initial hash ──────────────────────────────── */
const scrollToInitialHash = () => {
    if (!window.location.hash) return;
    const target = document.querySelector(window.location.hash);
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
};

/* ── Typewriter hero ─────────────────────────────────────── */
const initTypewriter = () => {
    const el = document.getElementById("typewriter");
    if (!el) return;

    const raw = el.dataset.words || "";
    const words = raw.split("|").map((w) => w.trim()).filter(Boolean);
    if (words.length < 2) return;

    let wordIndex  = 0;
    let charIndex  = 0;
    let deleting   = false;
    const PAUSE_MS  = 2400;
    const TYPE_MS   = 55;
    const DELETE_MS = 28;

    const tick = () => {
        const current = words[wordIndex];

        if (!deleting) {
            charIndex++;
            el.textContent = current.slice(0, charIndex);
            if (charIndex === current.length) {
                deleting = true;
                setTimeout(tick, PAUSE_MS);
                return;
            }
        } else {
            charIndex--;
            el.textContent = current.slice(0, charIndex);
            if (charIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }
        setTimeout(tick, deleting ? DELETE_MS : TYPE_MS);
    };

    // Start after a short delay so the initial word is "read"
    setTimeout(tick, PAUSE_MS);
};

/* ── Boot ────────────────────────────────────────────────── */
const initPage = async () => {
    updateTopbar();
    updateScrollProgress();
    initCursor();
    initParallaxOrb();
    initTypewriter();
    initMobileMenu();
    await loadIncludes();
    initReveal();
    initFilters();
    initActiveNavigation();
    scrollToInitialHash();
};

initPage();

window.addEventListener("scroll", () => {
    updateTopbar();
    updateScrollProgress();
}, { passive: true });
