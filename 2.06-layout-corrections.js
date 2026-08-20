document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll("#salt-origin .relations-map-stage .v55-scan-beam")
    .forEach((beam) => beam.remove());

  const originPlaceholder = document.querySelector(
    "#salt-origin > .chapter-placeholder-grid:nth-of-type(2)"
  );
  originPlaceholder?.remove();

  const environmentalAgentsHeader = document.querySelector(
    ".agents-replica .agents-first-page .agents-header"
  );
  environmentalAgentsHeader?.remove();

  const chapterThreeOpening = document.querySelector(
    "#salt-relations .salt-media-list > .salt-media:first-child"
  );
  const chapterThreeOpeningImage = chapterThreeOpening?.querySelector("img");
  if (chapterThreeOpeningImage) {
    chapterThreeOpeningImage.src = "./assets/2.06/salt-crystals-macro.png";
    chapterThreeOpeningImage.alt =
      "Macro photograph of translucent salt crystals layered against a dark background";
    chapterThreeOpening
      .querySelector("figcaption strong")
      ?.replaceChildren("Salt crystallisation at the grain scale");
  }

  const processList = document.querySelector("#salt-process .salt-media-list");
  if (processList) {
    // Capture the original targets before changing their DOM order.
    const crystallisationFilm = processList.querySelector(
      "figure.salt-media.wide:nth-of-type(3)"
    );
    const obsoleteFigure = processList.querySelector(
      "figure.salt-media.wide:nth-of-type(4)"
    );

    obsoleteFigure?.remove();
    if (crystallisationFilm) processList.prepend(crystallisationFilm);
  }

  const processCycle = document.querySelector(
    "#salt-process .process-cycle-page"
  );
  const processCycleImage = processCycle?.querySelector(":scope > img");
  if (processCycle && processCycleImage) {
    processCycle.classList.add("v206-cycle-replacement");
    processCycleImage.src = "./assets/2.06/process-cycle-four-states.png";
    processCycleImage.alt =
      "Crystallisation, deliquescence, accumulation and re-crystallisation states of a salt host";
  }

  requestAnimationFrame(() => window.ScrollTrigger?.refresh(true));
});
