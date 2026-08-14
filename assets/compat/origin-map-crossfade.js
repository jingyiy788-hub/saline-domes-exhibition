(() => {
  const origin = document.getElementById("salt-origin");
  const relations = document.getElementById("salt-relations");
  const figure = relations?.querySelector(".relations-map-reveal");
  if (!origin || !figure) return;

  // Remove the V31 pinned animation before moving the figure.
  const oldTrigger = window.ScrollTrigger?.getById("relations-map-assembly");
  oldTrigger?.kill(true);

  // Delete the marked second Origin figure and put the map in the same slot.
  const list = origin.querySelector(".salt-media-list");
  const marked = list?.querySelector("figure.salt-media.right:nth-of-type(2)");
  if (marked) marked.replaceWith(figure);
  else (list || origin).prepend(figure);

  figure.querySelector(".relations-map-overlay")?.remove();
  figure.querySelector(".relations-map-scan")?.remove();

  const final = figure.querySelector(".relations-map-final");
  if (final) {
    gsap.set(final, { autoAlpha: 0 });
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.to(final, {
        autoAlpha: 1,
        ease: "none",
        scrollTrigger: {
          id: "origin-map-crossfade",
          trigger: figure,
          start: "top 82%",
          end: "bottom 34%",
          scrub: .7
        }
      });
    } else {
      gsap.set(final, { autoAlpha: 1 });
    }
  }

  window.ScrollTrigger?.refresh();
  document.documentElement.dataset.layoutVersion = "20260814-33-origin-map-crossfade";
})();
