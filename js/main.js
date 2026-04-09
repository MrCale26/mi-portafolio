const revealElements = document.querySelectorAll(".reveal");
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
const nav = document.querySelector("nav");
const navItems = navLinks ? navLinks.querySelectorAll("a") : [];

revealElements.forEach(element => {
    element.classList.add("opacity-0", "translate-y-8", "transition-all", "duration-700");
});

const revealObserver = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.remove("opacity-0", "translate-y-8");
            entry.target.classList.add("opacity-100", "translate-y-0");
            revealObserver.unobserve(entry.target);
        });
    },
    { threshold: 0.2 }
);

revealElements.forEach(element => revealObserver.observe(element));

if (menuToggle && navLinks) {
    const isDesktop = () => window.innerWidth >= 768;

    const closeMenu = () => {
        menuToggle.setAttribute("aria-expanded", "false");
        navLinks.classList.add("hidden");
        document.body.classList.remove("overflow-hidden");
    };

    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", String(!isExpanded));
        navLinks.classList.toggle("hidden");
        document.body.classList.toggle("overflow-hidden");
    });

    navItems.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", event => {
        if (isDesktop()) return;
        if (menuToggle.getAttribute("aria-expanded") !== "true") return;
        if (nav && nav.contains(event.target)) return;

        closeMenu();
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeMenu();
        }
    });

    window.addEventListener("resize", () => {
        if (isDesktop()) {
            navLinks.classList.remove("hidden");
            document.body.classList.remove("overflow-hidden");
            menuToggle.setAttribute("aria-expanded", "false");
            return;
        }

        if (menuToggle.getAttribute("aria-expanded") !== "true") {
            navLinks.classList.add("hidden");
        }
    });
}
