document.addEventListener("DOMContentLoaded", () => {
  const makePage = (className, src, alt, kicker, title, copy) => {
    const figure = document.createElement("figure");
    figure.className = `${className} v201-editorial-page`;
    figure.innerHTML = `<img src="${src}" alt="${alt}"><figcaption><small>${kicker}</small><strong>${title}</strong><p>${copy}</p></figcaption>`;
    return figure;
  };

  // 01 — filled images no longer carry placeholder numbering.
  document.querySelectorAll("#salt-familiar .blank-sheet-number").forEach((node) => node.remove());

  // 02 — make the scan read as a genuine before/after reveal.
  const mapStage = document.querySelector("#salt-origin .relations-map-stage");
  const mapFinal = mapStage?.querySelector(".relations-map-final");
  const beam = mapStage?.querySelector(".v55-scan-beam");
  if (mapStage && mapFinal && window.gsap) {
    gsap.killTweensOf([mapFinal, beam]);
    gsap.set(mapFinal, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
    if (beam) gsap.set(beam, { xPercent: -120, opacity: 0 });
    gsap.timeline({
      scrollTrigger: { trigger: mapStage, start: "top 78%", toggleActions: "play none none reset" }
    })
      .to(beam, { xPercent: 4700, opacity: 1, duration: 1.25, ease: "power1.inOut" }, 0)
      .to(mapFinal, { clipPath: "inset(0 0% 0 0)", duration: 1.25, ease: "none" }, 0)
      .to(beam, { opacity: 0, duration: .12 }, 1.18);
  }

  // 02 — historical precedent followed by the project's conceptual translation.
  const origin = document.querySelector("#salt-origin");
  const originGrid = origin?.querySelector(".chapter-placeholder-grid:nth-of-type(2)");
  const trophic = origin?.querySelector(".origin-trophic-page");
  const ecosystem = origin?.querySelector(".origin-ecosystem-board");
  if (originGrid && !origin.querySelector(".chapter02-context-page")) {
    const precedent = makePage(
      "chapter02-context-page",
      "./assets/media/chapter02-montreal-biosphere.png",
      "Montreal Biosphere precedent and three principles of the dome",
      "CHAPTER .02 / DOME PRECEDENT",
      "From enclosure to planetary management",
      "Fuller’s dome establishes efficiency, enclosure and planetary management as a historical architectural system."
    );
    const transition = makePage(
      "chapter02-transition-page",
      "./assets/media/chapter02-dome-metabolic-diagram.png",
      "Diagram comparing a human survival shelter with metabolic infrastructure",
      "CHAPTER .02 / CONCEPTUAL TRANSITION",
      "The dome becomes metabolic infrastructure",
      "The project shifts the dome from a controlled human interior toward a multi-species system shaped by salinity, ecological feedback and non-human agency."
    );
    originGrid.after(precedent, transition);
    if (trophic) transition.after(trophic);
    if (ecosystem && trophic) trophic.after(ecosystem);
  }

  // 04 — the tall reversible-state sequence moves to its own following page.
  const phase = document.querySelector("#salt-process .process-phase-page");
  const secondProcessImage = phase?.querySelector(".process-phase-visuals img:nth-of-type(2)");
  if (phase && secondProcessImage && !document.querySelector(".process-cycle-page")) {
    const cycle = document.createElement("figure");
    cycle.className = "process-cycle-page v201-editorial-page";
    cycle.append(secondProcessImage);
    cycle.insertAdjacentHTML("beforeend", `<figcaption><small>CHAPTER .04 / MATERIAL CYCLE</small><strong>One host, four reversible states</strong><p>Accumulation and dissolution are read vertically as a continuous material sequence.</p></figcaption>`);
    phase.after(cycle);
  }

  // 05 — remove square crop so the complete morphology board is visible.
  const machineImage = document.querySelector("#salt-machine .chapter-placeholder-grid:nth-of-type(2) img");
  if (machineImage) machineImage.removeAttribute("style");

  // 06 — undo the experimental slice effect and restore the original board.
  document.querySelectorAll("#salt-host .host-exploded-stage").forEach((node) => node.remove());
  document.querySelectorAll("#salt-host .host-exploded-figure").forEach((figure) => {
    figure.classList.remove("host-exploded-figure", "is-exploded");
    const image = figure.querySelector(":scope > img");
    if (image) image.removeAttribute("style");
  });

  // 06 — first image establishes the construction sequence for the whole chapter.
  const hostList = document.querySelector("#salt-host .salt-media-list");
  if (hostList && !hostList.querySelector(".chapter06-opening-page")) {
    const opening = makePage(
      "chapter06-opening-page",
      "./assets/media/chapter06-dome-layer-envelope.png",
      "Dome, layered framework and organic envelope sequence",
      "CHAPTER .06 / SYSTEM ASSEMBLY",
      "Dome → Layer → Organic Envelope",
      "A structural host becomes an inhabitable saline system through layered crystallisation and ecological occupation."
    );
    hostList.prepend(opening);
  }

  requestAnimationFrame(() => window.ScrollTrigger?.refresh());
});
