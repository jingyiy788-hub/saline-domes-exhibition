(() => {
  const nav = document.querySelector(".salt-story-nav");
  if (!nav) return;

  // The earlier version used this class while scrolling. Remove it permanently;
  // the chapter row now stays attached to the main header.
  document.body.classList.remove("chapter-nav-collapsed");

  const oldToggle = nav.querySelector(".chapter-nav-toggle");
  if (oldToggle) {
    const stableToggle = oldToggle.cloneNode(true);
    stableToggle.setAttribute("aria-label", "Chapter navigation is fixed");
    stableToggle.setAttribute("aria-expanded", "true");
    stableToggle.disabled = true;
    oldToggle.replaceWith(stableToggle);
  }

  document.documentElement.dataset.layoutVersion = "20260813-24-stable-connected-nav";
})();
