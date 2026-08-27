window.HELP_IMPROVE_VIDEOJS = false;

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function setupScrollToTop() {
  const scrollButton = document.querySelector(".scroll-to-top");
  if (!scrollButton) return;

  const updateVisibility = () => {
    scrollButton.classList.toggle("visible", window.scrollY > 500);
  };

  window.addEventListener("scroll", updateVisibility, { passive: true });
  updateVisibility();
}

function setupNavigation() {
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-links");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      toggle.focus();
    }
  });
}

function setupDemoFilters() {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const demoCards = document.querySelectorAll(".demo-column[data-category]");
  const status = document.getElementById("filter-status");
  if (!filterButtons.length || !demoCards.length) return;

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selected = button.dataset.filter;

      filterButtons.forEach((candidate) => {
        const isActive = candidate === button;
        candidate.classList.toggle("is-active", isActive);
        candidate.setAttribute("aria-pressed", String(isActive));
      });

      let visibleCount = 0;
      demoCards.forEach((card) => {
        const shouldShow = selected === "all" || card.dataset.category === selected;
        card.hidden = !shouldShow;
        if (shouldShow) visibleCount += 1;
      });

      if (status) {
        status.textContent = `${visibleCount} tutorial${visibleCount === 1 ? "" : "s"} shown`;
      }
    });
  });
}

function setupExternalLinks() {
  document.querySelectorAll('a[target="_blank"]').forEach((link) => {
    const rel = new Set((link.getAttribute("rel") || "").split(/\s+/).filter(Boolean));
    rel.add("noopener");
    rel.add("noreferrer");
    link.setAttribute("rel", Array.from(rel).join(" "));
  });
}

document.addEventListener("DOMContentLoaded", () => {
  setupScrollToTop();
  setupNavigation();
  setupDemoFilters();
  setupExternalLinks();
});
