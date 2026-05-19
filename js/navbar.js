const hamburger = document.getElementById("hamburger");
const mobileMenu = document.getElementById("mobile-menu");
const backdrop = document.getElementById("menu-backdrop");


function openMenu() {
    hamburger.classList.add("active");
    hamburger.setAttribute("aria-expanded", "true");

    mobileMenu.hidden = false;
    mobileMenu.classList.add("open");

    document.body.classList.add("no-scroll");
}

function closeMenu() {
    hamburger.classList.remove("active");
    hamburger.setAttribute("aria-expanded", "false");

    mobileMenu.classList.remove("open");
    document.body.classList.remove("no-scroll");

    setTimeout(() => {
        mobileMenu.hidden = true;
    }, 200); // small delay for optional animation
}

hamburger.addEventListener("click", () => {
    const isOpen = hamburger.classList.contains("active");
    isOpen ? closeMenu() : openMenu();
});

/* Close when clicking a menu link */
document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", closeMenu);
});

/* ESC key closes menu */
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && hamburger.classList.contains("active")) {
        closeMenu();
    }
});

document.addEventListener("click", (e) => {
    if (
        !mobileMenu.contains(e.target) &&
        !hamburger.contains(e.target)
    ) {
        closeMenu();
    }
});
