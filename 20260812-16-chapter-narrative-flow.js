(() => {
  const relations = document.querySelector("#salt-relations");
  const archive = document.querySelector("#salt-archive");
  if (!relations || !archive) return;

  const relationFigures = [...relations.querySelectorAll(".salt-media")];
  if (relationFigures.length > 1) relationFigures[0].remove();

  document.querySelectorAll(".salt-media figcaption > span").forEach((label) => label.remove());

  const relationImage = relations.querySelector(".salt-media > img");
  if (!relationImage || !window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const media = gsap.matchMedia();
  media.add({
    desktop: "(min-width: 761px)",
    reduceMotion: "(prefers-reduced-motion: reduce)",
  }, ({ conditions }) => {
    if (!conditions.desktop || conditions.reduceMotion) return;

    gsap.to(relationImage, {
      scale: .93,
      y: 70,
      autoAlpha: .18,
      filter: "grayscale(1) contrast(1.25)",
      ease: "none",
      scrollTrigger: {
        id: "relations-to-archive",
        trigger: archive,
        start: "top 92%",
        end: "top 35%",
        scrub: .8,
        invalidateOnRefresh: true,
      },
    });
  });

  requestAnimationFrame(() => ScrollTrigger.refresh());
})();
