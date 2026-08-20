document.addEventListener("DOMContentLoaded", () => {
  const makeEditorialPage = ({ className, src, alt, kicker, title, copy }) => {
    const figure = document.createElement("figure");
    figure.className = `${className} v204-editorial-page`;
    figure.innerHTML = `
      <div class="v204-image-frame"><img src="${src}" alt="${alt}"></div>
      <figcaption>
        <small>${kicker}</small>
        <strong>${title}</strong>
        <p>${copy}</p>
      </figcaption>`;
    return figure;
  };

  const origin = document.querySelector("#salt-origin");
  const changePage = origin?.querySelector(".origin-change-pair");
  if (origin && !origin.querySelector(".v204-site-detail")) {
    const siteDetail = makeEditorialPage({
      className: "v204-site-detail",
      src: "./assets/2.04/huama-lake-site-detail.png",
      alt: "Huama Salt Lake territorial plan paired with an enlarged aerial detail",
      kicker: "CHAPTER .02 / SITE READING",
      title: "From the lake body to the active edge",
      copy: "The territorial outline is read together with a close aerial section, linking extraction fields, water depth and the changing saline margin."
    });
    if (changePage) changePage.after(siteDetail);
    else origin.append(siteDetail);
  }

  const processList = document.querySelector("#salt-process .salt-media-list");
  if (processList && !processList.querySelector(".v204-experiment-method")) {
    const method = makeEditorialPage({
      className: "v204-experiment-method",
      src: "./assets/2.04/experiment-method.png",
      alt: "Four-step salt crystallisation experiment preparation process",
      kicker: "CHAPTER .04 / MATERIAL EXPERIMENT",
      title: "Preparing a fibre host for salt growth",
      copy: "Woven samples, selected fibres and a saturated salt solution establish a controlled material protocol before crystallisation begins."
    });
    const matrix = makeEditorialPage({
      className: "v204-experiment-matrix",
      src: "./assets/2.04/experiment-time-matrix.png",
      alt: "Salt crystallisation across six materials from initial state to sixty hours",
      kicker: "CHAPTER .04 / TIME MATRIX",
      title: "Material type changes the rate and pattern of crystallisation",
      copy: "Wood, gauze, wool, cotton and hemp are compared through the same time sequence, revealing differences in accumulation, coverage and density."
    });
    processList.prepend(method, matrix);
  }

  if (window.gsap && window.ScrollTrigger && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".v204-editorial-page").forEach((page) => {
      gsap.fromTo(page.querySelectorAll(".v204-image-frame, figcaption > *"),
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: .55, stagger: .07, ease: "power2.out", scrollTrigger: { trigger: page, start: "top 82%", once: true } }
      );
    });
  }

  requestAnimationFrame(() => window.ScrollTrigger?.refresh(true));
});
