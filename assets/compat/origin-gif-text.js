(() => {
  const origin = document.getElementById("salt-origin");
  if (!origin) return;

  // Remove the newly added full-width video.
  origin.querySelector(".added-origin-film")?.remove();

  // Remove the marked third figure from the original Origin media sequence.
  const list = origin.querySelector(".salt-media-list");
  const markedFigure = list?.querySelector("figure.salt-media.left:nth-of-type(3)");
  markedFigure?.remove();

  const pair = document.createElement("figure");
  pair.className = "origin-change-pair";
  pair.innerHTML = `
    <img src="./assets/videos/salt-lake-change.gif" alt="Animated sequence of Huama Salt Lake changing through time" loading="lazy" decoding="async" />
    <figcaption class="origin-change-copy">
      <small>CHAPTER .02 / CHANGE OVER TIME</small>
      <h4>Salt lake transformation through time</h4>
      <p>Recent projects to restore salt pans to lakes and undertake wetland rehabilitation have significantly improved the ecological condition of the Dingbian salt lake system. However, given the region's inherent aridity and salinisation, the salt pans remain a highly fragile ecosystem.</p>
    </figcaption>`;
  (list || origin).append(pair);

  if (window.gsap && window.ScrollTrigger && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.from(pair.querySelector("img"), {
      autoAlpha: 0,
      x: -22,
      scale: 1.018,
      duration: 1.1,
      ease: "power2.out",
      scrollTrigger: {
        id: "v29-origin-gif",
        trigger: pair,
        start: "top 84%",
        toggleActions: "play none none reverse"
      }
    });
    gsap.from(pair.querySelector("figcaption"), {
      autoAlpha: 0,
      x: 22,
      duration: .9,
      ease: "power2.out",
      scrollTrigger: {
        id: "v29-origin-copy",
        trigger: pair,
        start: "top 84%",
        toggleActions: "play none none reverse"
      }
    });
    ScrollTrigger.refresh();
  }

  document.documentElement.dataset.layoutVersion = "20260814-29-origin-gif-text";
})();
