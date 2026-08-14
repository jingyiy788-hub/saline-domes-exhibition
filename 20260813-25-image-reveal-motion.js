(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const excluded = [
    ".archive-force-layer img",
    ".breath-landscape",
    ".linework-background",
    ".hero-image"
  ].join(",");

  const media = gsap.utils.toArray(
    ".salt-media img, .salt-media video, .chapter-placeholder-card, .salt-growth-video video"
  ).filter((element) => !element.matches(excluded));

  const mm = gsap.matchMedia();
  mm.add(
    {
      motion: "(prefers-reduced-motion: no-preference)",
      desktop: "(min-width: 761px)"
    },
    ({ conditions }) => {
      if (!conditions.motion) {
        gsap.set(media, { clearProps: "all" });
        return;
      }

      media.forEach((element, index) => {
        const figure = element.closest(".salt-media");
        const isBoard = /experiment|term3|page-/i.test(element.currentSrc || element.src || "");
        const direction = conditions.desktop && figure?.classList.contains("left")
          ? -22
          : conditions.desktop && figure?.classList.contains("right")
            ? 22
            : 0;

        gsap.fromTo(
          element,
          {
            autoAlpha: 0,
            x: isBoard ? 0 : direction,
            y: isBoard ? 18 : 28,
            scale: isBoard ? 1 : 1.025
          },
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            duration: isBoard ? .85 : 1.15,
            ease: "power2.out",
            clearProps: "transform,visibility",
            scrollTrigger: {
              id: `image-reveal-${index}`,
              trigger: figure || element,
              start: "top 84%",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }
  );

  window.addEventListener("load", () => ScrollTrigger.refresh(), { once: true });
  document.documentElement.dataset.layoutVersion = "20260813-25-image-reveal-motion";
})();
