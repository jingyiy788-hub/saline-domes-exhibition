(() => {
  const process = document.getElementById("salt-process");
  if (!process) return;

  const film = Array.from(process.querySelectorAll(".v30-motion-film"))
    .find((figure) => figure.querySelector('video[src*="salt-surface-growth"]'));

  const aggregationBoard = Array.from(process.querySelectorAll("figure.salt-media"))
    .find((figure) => /isolated clusters|bridging aggregation/i.test(figure.textContent || ""));

  if (film && aggregationBoard) {
    film.classList.add("v32-aggregation-replacement");
    aggregationBoard.replaceWith(film);
  } else if (film) {
    // Fallback for a caption-less board: page 12 is the aggregation observation plate.
    const page12 = process.querySelector('figure.salt-media img[src*="page-12"]')?.closest("figure");
    if (page12) {
      film.classList.add("v32-aggregation-replacement");
      page12.replaceWith(film);
    }
  }

  window.ScrollTrigger?.refresh();
  document.documentElement.dataset.layoutVersion = "20260814-32-replace-aggregation-board";
})();
