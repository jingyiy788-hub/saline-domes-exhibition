(() => {
  const applyMediaUpdates = () => {
  const hostModel = document.querySelector("#salt-host .added-host-model");
  if (hostModel && !document.querySelector(".v210-crystallised-study")) {
    const study = document.createElement("figure");
    study.className = "salt-media wide v210-crystallised-study";
    study.innerHTML = `
      <img src="./assets/2.10/term3-finalpre-178.png" alt="Two crystallised fibre frameworks suspended over salt samples" loading="lazy" decoding="async" />
      <figcaption><span>CHAPTER .06</span><strong>Crystallised framework study</strong></figcaption>`;
    hostModel.before(study);
  }

  const metabolic = document.querySelector(".chapter02-transition-page");
  const metabolicImage = metabolic?.querySelector("img");
  if (metabolicImage) {
    metabolicImage.src = "./assets/2.10/term3-finalpre-17.png";
    metabolicImage.alt = "Diagram tracing the dome from human survival shelter to metabolic infrastructure";
    metabolicImage.removeAttribute("srcset");
  }

  const whiteImageSelectors = [
    'img[src*="2.09-salt-crystals-03-01"]',
    'img[data-page="03.01"]',
    'figure[data-page="03.01"] img'
  ];
  document.querySelectorAll(whiteImageSelectors.join(",")).forEach((image) => {
    const figure = image.closest("figure");
    if (figure) figure.remove();
    else image.remove();
  });

  document.querySelectorAll("#salt-relations .chapter-placeholder").forEach((figure) => {
    const number = figure.querySelector(".blank-sheet-number, .chapter-placeholder-number");
    if (number?.textContent.trim() === "03.01") figure.remove();
  });

  if (window.gsap && window.ScrollTrigger && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const studyImage = document.querySelector(".v210-crystallised-study img");
    if (studyImage) {
      gsap.from(studyImage, {
        autoAlpha: 0,
        y: 26,
        scale: 1.018,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          id: "v210-crystallised-study",
          trigger: studyImage,
          start: "top 84%",
          toggleActions: "play none none reverse"
        }
      });
    }
  }

  document.documentElement.dataset.layoutVersion = "2.10-media-updates";
  requestAnimationFrame(() => window.ScrollTrigger?.refresh(true));
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", applyMediaUpdates);
  } else {
    applyMediaUpdates();
  }
})();
