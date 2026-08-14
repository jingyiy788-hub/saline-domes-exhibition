(() => {
  const copy = document.querySelector(".origin-change-copy p");
  if (copy) {
    copy.textContent = "Wetland restoration has improved the Dingbian salt-lake system, yet aridity and salinisation leave it ecologically fragile.";
  }

  const addFilm = (sectionId, src, label, title, description) => {
    const section = document.getElementById(sectionId);
    const target = section?.querySelector(".salt-media-list") || section;
    if (!target) return;

    const figure = document.createElement("figure");
    figure.className = "v30-motion-film";
    figure.innerHTML = `
      <video src="${src}" muted loop playsinline preload="metadata" aria-label="${title}"></video>
      <figcaption class="v30-motion-copy">
        <small>${label}</small>
        <strong>${title}</strong>
        <p>${description}</p>
      </figcaption>`;
    target.append(figure);

    const video = figure.querySelector("video");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: .3 });
    observer.observe(video);
  };

  addFilm(
    "salt-machine",
    "./assets/videos/territorial-growth-model.mp4",
    "CHAPTER .05 / TERRITORIAL MODEL",
    "Growth distributed across the lake terrain",
    "A moving territorial model tests how clustered hosts respond to the changing saline field."
  );

  addFilm(
    "salt-process",
    "./assets/videos/salt-surface-growth.mp4",
    "CHAPTER .04 / SURFACE",
    "Crystallisation spreading across a material field",
    "Salt accumulates as a changing surface rather than a fixed architectural finish."
  );

  if (window.gsap && window.ScrollTrigger && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.utils.toArray(".v30-motion-film").forEach((figure, index) => {
      gsap.from(figure.children, {
        autoAlpha: 0,
        y: 24,
        duration: .95,
        stagger: .12,
        ease: "power2.out",
        scrollTrigger: {
          id: `v30-film-${index}`,
          trigger: figure,
          start: "top 84%",
          toggleActions: "play none none reverse"
        }
      });
    });
    ScrollTrigger.refresh();
  }

  document.documentElement.dataset.layoutVersion = "20260814-30-refined-media-videos";
})();
