
(() => {
    const body = document.body;
    const themeButton = document.getElementById("theme-toggle");
    const menuButton = document.getElementById("menu-toggle");
    const navigation = document.getElementById("site-nav");

    // Load the visitor's saved theme.
    let savedTheme = null;

    try {
        savedTheme = localStorage.getItem("portfolio-theme");
    } catch (error) {
        // The website can still work if storage is unavailable.
    }

    if (savedTheme === "light") {
        body.classList.add("light-mode");
    }

    if (savedTheme === "dark") {
        body.classList.remove("light-mode");
    }

    // Update the theme button.
    function updateThemeButton() {
        if (!themeButton) return;

        const isLight = body.classList.contains("light-mode");

        themeButton.textContent = isLight ? "Dark mode" : "Light mode";

        themeButton.setAttribute(
            "aria-label",
            isLight ? "Switch to dark mode" : "Switch to light mode"
        );

        themeButton.setAttribute("aria-pressed", String(isLight));
    }

    // Switch between light and dark themes.
    if (themeButton) {
        themeButton.addEventListener("click", () => {
            body.classList.toggle("light-mode");

            const theme = body.classList.contains("light-mode")
                ? "light"
                : "dark";

            try {
                localStorage.setItem("portfolio-theme", theme);
            } catch (error) {
                // Theme switching still works for this page.
            }

            updateThemeButton();
        });
    }

    updateThemeButton();

    // Mobile navigation menu.
    if (menuButton && navigation) {
        menuButton.addEventListener("click", () => {
            const isOpen =
                menuButton.getAttribute("aria-expanded") === "true";

            menuButton.setAttribute("aria-expanded", String(!isOpen));
            navigation.classList.toggle("is-open", !isOpen);
            menuButton.textContent = isOpen ? "Menu" : "Close";
        });

        navigation.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navigation.classList.remove("is-open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.textContent = "Menu";
            });
        });
    }

    // Automatically display the current year.
    document.querySelectorAll("[data-year]").forEach((element) => {
        element.textContent = new Date().getFullYear();
    });

    // Contact form: prepare an email draft.
    const contactForm = document.getElementById("contact-form");

    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            if (!contactForm.reportValidity()) return;

            const formData = new FormData(contactForm);

            const name = String(formData.get("name") || "").trim();
            const email = String(formData.get("email") || "").trim();
            const subject = String(formData.get("subject") || "").trim();
            const message = String(formData.get("message") || "").trim();

            const status = document.getElementById("form-status");

            const bodyText =
                `Name: ${name}\nReply email: ${email}\n\n${message}`;

            const mailto =
                `mailto:timothyayoola301@gmail.com` +
                `?subject=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(bodyText)}`;

            if (status) {
                status.textContent =
                    "Opening your email application. Review the message and send it from there.";
            }

            window.location.href = mailto;
        });
    }
})();

/* AO DIGITAL — Floating particle system */
(() => {
    if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
        return;
    }

    if (document.querySelector(".ambient-particles")) {
        return;
    }

    const particles = document.createElement("div");
    particles.className = "ambient-particles";
    particles.setAttribute("aria-hidden", "true");

    const particleCount = window.innerWidth < 700 ? 12 : 24;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("span");

        particle.style.setProperty(
            "--x",
            `${Math.random() * 100}%`
        );

        particle.style.setProperty(
            "--size",
            `${2 + Math.random() * 5}px`
        );

        particle.style.setProperty(
            "--duration",
            `${10 + Math.random() * 16}s`
        );

        particle.style.setProperty(
            "--delay",
            `${-Math.random() * 25}s`
        );

        particles.appendChild(particle);
    }

    document.body.appendChild(particles);
})();

/* ==========================================
   AO DIGITAL — 3D FLOATING SPACE OBJECTS
   ========================================== */

(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    if (document.querySelector(".space-scene")) {
        return;
    }

    const scene = document.createElement("div");
    scene.className = "space-scene";
    scene.setAttribute("aria-hidden", "true");

    function createCube(className) {
        const cube = document.createElement("div");
        cube.className = `space-object ${className}`;

        const faces = [
            "cube-front",
            "cube-back",
            "cube-right",
            "cube-left",
            "cube-top",
            "cube-bottom"
        ];

        faces.forEach((faceName) => {
            const face = document.createElement("span");
            face.className = `cube-face ${faceName}`;
            cube.appendChild(face);
        });

        scene.appendChild(cube);
    }

    function createRing(className) {
        const ring = document.createElement("div");
        ring.className = `space-object space-ring ${className}`;
        scene.appendChild(ring);
    }

    createCube("space-cube");
    createCube("space-cube-small");
    createRing("");
    createRing("space-ring-small");

    document.body.appendChild(scene);

    /* Subtle mouse-responsive movement */
    const objects = scene.querySelectorAll(".space-object");
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frameId = null;

    window.addEventListener("pointermove", (event) => {
        if (event.pointerType === "touch") return;

        targetX = (event.clientX / window.innerWidth - 0.5) * 2;
        targetY = (event.clientY / window.innerHeight - 0.5) * 2;

        if (frameId === null) {
            frameId = requestAnimationFrame(updateMovement);
        }
    }, { passive: true });

    function updateMovement() {
        currentX += (targetX - currentX) * 0.04;
        currentY += (targetY - currentY) * 0.04;

        objects.forEach((object, index) => {
            const depth = (index + 1) * 7;
            object.style.translate =
                `${currentX * depth}px ${currentY * depth}px`;
        });

        if (
            Math.abs(targetX - currentX) > 0.001 ||
            Math.abs(targetY - currentY) > 0.001
        ) {
            frameId = requestAnimationFrame(updateMovement);
        } else {
            frameId = null;
        }
    }
})();

/* =====================================
   AO DIGITAL — HERO TYPING EFFECT
   ===================================== */

document.addEventListener("DOMContentLoaded", () => {
    const typingElement = document.querySelector("[data-typing]");

    if (!typingElement) return;

    // These describe learning and creative work honestly.
    const words = [
        "HTML & CSS Learner",
        "JavaScript Learner",
        "Web Creator"
    ];

    // Prevent the effect from running twice on the same element.
    if (typingElement.dataset.typingReady === "true") return;
    typingElement.dataset.typingReady = "true";

    // Respect reduced-motion preferences.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        typingElement.textContent = words[0];
        return;
    }

    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeNext() {
        const word = words[wordIndex];

        if (!deleting) {
            characterIndex++;
            typingElement.textContent = word.slice(0, characterIndex);

            if (characterIndex === word.length) {
                deleting = true;
                setTimeout(typeNext, 1300);
                return;
            }
        } else {
            characterIndex--;
            typingElement.textContent = word.slice(0, characterIndex);

            if (characterIndex === 0) {
                deleting = false;
                wordIndex = (wordIndex + 1) % words.length;
            }
        }

        setTimeout(typeNext, deleting ? 45 : 85);
    }

    typeNext();
});
