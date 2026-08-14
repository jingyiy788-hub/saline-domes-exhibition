(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const figures = gsap.utils.toArray("#salt-story-sections figure, #salt-host figure");

  const findCaption = (figure) => {
    const direct = Array.from(figure.children).filter((element) => {
      if (element.tagName === "FIGCAPTION") return true;
      const name = typeof element.className === "string" ? element.className : "";
      return /caption|copy/i.test(name) && !/placeholder/i.test(name);
    });
    return direct;
  };

  figures.forEach((figure, index) => {
    const media = Array.from(figure.children).filter((element) =>
      element.matches("img, video, canvas, picture, .relations-map-stage, .archive-unfold-stage")
    );
    const captions = findCaption(figure);
    if (!media.length || !captions.length) return;

    figure.dataset.captionSynced = "true";
    const targets = [...media, ...captions];

    // Remove only older entrance tweens affecting this exact media/caption pair.
    gsap.killTweensOf(targets, "autoAlpha,y,scale,filter");

    if (reduced) {
      gsap.set(targets, { autoAlpha: 1, y: 0, scale: 1, filter: "none" });
      return;
    }

    const timeline = gsap.timeline({
      defaults: { duration: 0.85, ease: "power2.out", overwrite: "auto" },
      scrollTrigger: {
        id: `synced-media-caption-${index}`,
        trigger: figure,
        start: "top 86%",
        toggleActions: "play none none reverse"
      }
    });

    timeline.fromTo(
      media,
      { autoAlpha: 0, y: 34, scale: 0.975, filter: "brightness(.55)" },
      { autoAlpha: 1, y: 0, scale: 1, filter: "brightness(1)", clearProps: "filter" },
      0
    ).fromTo(
      captions,
      { autoAlpha: 0, y: 34, scale: 0.975, filter: "blur(3px)" },
      { autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", clearProps: "filter" },
      0
    );
  });

  requestAnimationFrame(() => ScrollTrigger.refresh());
})();
