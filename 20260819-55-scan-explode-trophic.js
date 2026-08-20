(() => {
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const replacePlaceholder = (figure, src, alt, title, copy) => {
    if (!figure) return;
    const imageBox = figure.querySelector(".familiar-white-image, .chapter-placeholder-image");
    if (imageBox) {
      imageBox.replaceChildren(Object.assign(document.createElement("img"), { src, alt }));
      imageBox.classList.add("v55-filled-image");
    }
    const caption = figure.querySelector("figcaption");
    if (caption) caption.innerHTML = `<strong>${title}</strong>${copy ? `<p>${copy}</p>` : ""}`;
    figure.classList.add("v55-filled-placeholder");
  };

  const familiar = document.querySelectorAll("#salt-familiar .familiar-placeholder");
  replacePlaceholder(familiar[0], "./assets/media/familiar-salt-crystals.jpg", "Cubic salt crystals at an ambiguous scale", "Salt, before scale", "A familiar grain becomes geological when its edge fills the frame.");
  replacePlaceholder(familiar[1], "./assets/media/familiar-lake-grid.png", "Huama Lake read as a continuous territorial field", "Salt, after scale", "The crystal is no longer an object; it becomes a field distributed across the lake.");

  const machinePlaceholder = document.querySelector("#salt-machine .chapter-placeholder-grid:nth-of-type(2) .chapter-placeholder--square");
  replacePlaceholder(machinePlaceholder, "./assets/media/machine-simulation-forms.png", "Eight generated salt aggregation morphologies", "Generated morphology families", "Variations in density and connection produce distinct spatial bodies.");

  const origin = document.querySelector("#salt-origin");
  const originPlaceholderGrid = origin?.querySelector(".chapter-placeholder-grid:nth-of-type(2)");
  if (originPlaceholderGrid && !origin.querySelector(".origin-ecosystem-board")) {
    const board = document.createElement("figure");
    board.className = "origin-ecosystem-board v55-editorial-page";
    board.innerHTML = `<img src="./assets/media/origin-ecosystem-distribution.png" alt="Distribution of organisms, salt crust and microbial communities across Huama Lake"><figcaption><small>CHAPTER .02 / ECOLOGICAL DISTRIBUTION</small><strong>Life occupies gradients within the saline field</strong><p>Water depth, salt crust and microbial mats form overlapping habitats rather than fixed zones.</p></figcaption>`;
    const trophic = document.createElement("section");
    trophic.className = "origin-trophic-page v55-editorial-page";
    trophic.innerHTML = `<header><small>CHAPTER .02 / TROPHIC RELATIONS</small><h4>Trophic level distribution matrix of salt lake ecosystem</h4><p>Energy moves from salt-tolerant microorganisms and plants through invertebrates and insects to migratory birds. The matrix reads the lake as a living chain rather than an empty mineral surface.</p></header><div class="origin-trophic-layout"><img class="origin-trophic-matrix" src="./assets/media/trophic-species-matrix.png" alt="Species matrix of microorganisms, plants, invertebrates, insects and birds"><div class="origin-trophic-levels"><article><span>01</span><h5>Producers</h5><p>Microorganisms — <i>Dunaliella salina</i><br>Plants — halophytic vegetation</p></article><article><span>02</span><h5>Primary consumers</h5><p>Invertebrates — <i>Artemia salina</i><br>Insects and benthic organisms</p></article><article><span>03</span><h5>Secondary / top consumers</h5><p>Birds — avocet, flamingo and migratory waterfowl</p></article></div></div>`;
    originPlaceholderGrid.after(board);
    originPlaceholderGrid.after(trophic);
  }

  const processList = document.querySelector("#salt-process .salt-media-list");
  const selectedProcessFigure = processList?.querySelector("figure.salt-media.wide:nth-of-type(7)");
  if (processList && selectedProcessFigure && !processList.querySelector(".process-phase-page")) {
    const phase = document.createElement("figure");
    phase.className = "process-phase-page v55-editorial-page";
    phase.innerHTML = `<div class="process-phase-visuals"><img src="./assets/media/process-crystal-dissolve-pair.png" alt="Crystallised and dissolved spherical fibre structures"><img src="./assets/media/process-dome-cycle.png" alt="Four states of a crystallising and dissolving dome"></div><figcaption><small>CHAPTER .04 / REVERSIBLE STATES</small><strong>Crystallisation is not a final surface</strong><p>The same fibre host alternates between accumulation and deliquescence. Matter thickens, loosens and returns without fixing the architecture into one finished state.</p></figcaption>`;
    selectedProcessFigure.before(phase);
  }

  const mapFigure = document.querySelector("#salt-origin .relations-map-reveal");
  const mapStage = mapFigure?.querySelector(".relations-map-stage");
  if (mapStage && !mapStage.querySelector(".v55-scan-beam")) {
    const beam = document.createElement("div");
    beam.className = "v55-scan-beam";
    beam.setAttribute("aria-hidden", "true");
    mapStage.append(beam);
    const restart = () => { beam.classList.remove("is-scanning"); void beam.offsetWidth; beam.classList.add("is-scanning"); };
    new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && restart()), { threshold: .35 }).observe(mapFigure);
  }

  const hostTarget = document.querySelector("#salt-host .salt-media-list > figure.salt-media.right:nth-of-type(5)");
  const hostImage = hostTarget?.querySelector("img");
  if (hostTarget && hostImage && !hostTarget.querySelector(".host-exploded-stage")) {
    hostTarget.classList.add("host-exploded-figure");
    const stage = document.createElement("div");
    stage.className = "host-exploded-stage";
    ["left", "centre", "right"].forEach((part) => {
      const slice = document.createElement("div");
      slice.className = `host-exploded-slice host-exploded-${part}`;
      slice.style.backgroundImage = `url("${hostImage.currentSrc || hostImage.src}")`;
      stage.append(slice);
    });
    hostImage.after(stage);
    new IntersectionObserver((entries) => entries.forEach((entry) => hostTarget.classList.toggle("is-exploded", entry.isIntersecting)), { threshold: .45 }).observe(hostTarget);
  }

  if (window.gsap && window.ScrollTrigger && !reduceMotion) {
    gsap.registerPlugin(ScrollTrigger);
    const processPage = document.querySelector(".process-phase-page");
    if (processPage) gsap.from(processPage.querySelectorAll("img, figcaption > *"), { autoAlpha: 0, y: 22, duration: .65, stagger: .09, ease: "power2.out", scrollTrigger: { trigger: processPage, start: "top 78%", toggleActions: "play none none reset" } });
    const trophicPage = document.querySelector(".origin-trophic-page");
    if (trophicPage) gsap.from(trophicPage.querySelectorAll("header > *, .origin-trophic-levels article"), { autoAlpha: 0, y: 18, duration: .55, stagger: .08, ease: "power2.out", scrollTrigger: { trigger: trophicPage, start: "top 80%", toggleActions: "play none none reset" } });
  }
  requestAnimationFrame(() => window.ScrollTrigger?.refresh(true));
})();
