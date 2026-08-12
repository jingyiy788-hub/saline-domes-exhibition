(() => {
  const archive = document.querySelector("#salt-archive");
  if (!archive) return;

  const layers = [
    ["Heightfield", "heightfield.jpg"],
    ["Salt", "salt.jpg"],
    ["Wind", "wind.jpg"],
    ["Metal", "metal.jpg"],
    ["Algae", "algae.jpg"],
    ["Heat", "heat.jpg"],
  ];

  archive.className = "salt-scene archive-unfold";
  archive.setAttribute("aria-labelledby", "archive-unfold-title");
  archive.innerHTML = `
    <div class="archive-unfold-inner">
      <div class="archive-unfold-copy">
        <span class="archive-unfold-kicker">Chapter .04 / Six forces</span>
        <h3 id="archive-unfold-title">The lake writes itself into salt.</h3>
        <p>Height, salinity, wind, heat, algae and metal are not separate diagrams. Their interference becomes a material signature.</p>
      </div>
      <div class="archive-unfold-stage" aria-label="Six environmental data layers">
        ${layers.map(([label, file], index) => `
          <figure class="archive-force-layer" style="--layer:${index}">
            <img src="./project/28/gsap-layers/${file}" alt="${label} environmental data layer" loading="lazy">
            <figcaption>${label}</figcaption>
          </figure>
        `).join("")}
      </div>
      <span class="archive-unfold-note">Scroll to separate layers</span>
    </div>
  `;

  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const root = archive.querySelector(".archive-unfold-inner");
  const forceLayers = gsap.utils.toArray(".archive-force-layer", archive);
  const media = gsap.matchMedia();

  media.add({
    desktop: "(min-width: 981px)",
    reduceMotion: "(prefers-reduced-motion: reduce)",
  }, ({ conditions }) => {
    if (!conditions.desktop || conditions.reduceMotion) return;

    gsap.set(forceLayers, {
      y: 0,
      rotationX: 52,
      rotationZ: -13,
      scale: .78,
      autoAlpha: .36,
    });

    gsap.timeline({
      scrollTrigger: {
        id: "archive-six-forces",
        trigger: archive,
        start: "top 64px",
        end: "+=1800",
        pin: root,
        scrub: .85,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    })
      .to(".archive-unfold-copy", { y: -18, autoAlpha: 1, duration: .25, ease: "none" }, 0)
      .to(forceLayers, {
        y: (index) => (index - 2.5) * 84,
        rotationX: 44,
        rotationZ: -8,
        scale: .84,
        autoAlpha: 1,
        stagger: .025,
        duration: .62,
        ease: "none",
      }, 0)
      .to(forceLayers, {
        y: (index) => (index - 2.5) * 28,
        rotationX: 18,
        rotationZ: -3,
        scale: .94,
        stagger: .018,
        duration: .38,
        ease: "none",
      });
  });

  const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());
  archive.querySelectorAll("img").forEach((image) => {
    if (!image.complete) image.addEventListener("load", refresh, { once: true });
  });
  refresh();
})();
