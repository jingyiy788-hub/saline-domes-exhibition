(() => {
  const cropPages = new Set([4, 5, 6, 40, 41, 42]);
  const landscapePages = new Set([40, 41, 42]);

  document.querySelectorAll(".salt-media > img").forEach((image) => {
    const match = image.getAttribute("src")?.match(/page-(\d+)\.jpg/i);
    if (!match) return;
    const page = Number(match[1]);
    if (!cropPages.has(page)) return;

    const figure = image.closest(".salt-media");
    figure.classList.add("editorial-crop");
    if (landscapePages.has(page)) figure.classList.add("editorial-crop--landscape");

    const caption = figure.querySelector("figcaption");
    const label = caption?.querySelector("span");
    if (label) label.textContent = `Image / page ${String(page).padStart(2, "0")}`;
  });

  if (window.ScrollTrigger) requestAnimationFrame(() => ScrollTrigger.refresh());
})();
