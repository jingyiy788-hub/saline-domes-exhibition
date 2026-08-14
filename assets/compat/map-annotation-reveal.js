(() => {
  const relations = document.getElementById("salt-relations");
  if (!relations) return;

  const list = relations.querySelector(".salt-media-list");
  const oldMap = list?.querySelector("figure.salt-media.right") || list?.querySelector("figure.salt-media");

  const figure = document.createElement("figure");
  figure.className = "relations-map-reveal";
  figure.innerHTML = `
    <div class="relations-map-stage">
      <img class="relations-map-base" src="./assets/images/relations-map/base-map.png" alt="Regional map showing salt-lake groups and settlements" />
      <img class="relations-map-overlay" src="./assets/images/relations-map/annotation-overlay.png" alt="" aria-hidden="true" />
      <img class="relations-map-final" src="./assets/images/relations-map/composite-reference.png" alt="Final analytical map with lake labels, influence fields and wind connections" />
      <span class="relations-map-scan" aria-hidden="true"></span>
    </div>
    <figcaption><span>CHAPTER .03 / RELATIONAL FIELD</span><strong>Lake groups, settlements and wind form one territorial system</strong></figcaption>`;

  if (oldMap) oldMap.replaceWith(figure);
  else (list || relations).append(figure);

  if (window.gsap && window.ScrollTrigger && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set(figure.querySelector(".relations-map-overlay"), { autoAlpha: 0, scale: .985 });
    gsap.set(figure.querySelector(".relations-map-final"), { autoAlpha: 0 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        id: "relations-map-assembly",
        trigger: figure,
        start: "top 114px",
        end: "+=125%",
        scrub: .7,
        pin: true,
        anticipatePin: 1
      }
    });

    timeline
      .to(figure.querySelector(".relations-map-overlay"), { autoAlpha: .9, scale: 1, duration: .42, ease: "none" })
      .to(figure.querySelector(".relations-map-scan"), { xPercent: 220, duration: .28, ease: "none" }, .12)
      .to(figure.querySelector(".relations-map-final"), { autoAlpha: 1, duration: .38, ease: "none" }, .5)
      .to(figure.querySelector(".relations-map-overlay"), { autoAlpha: 0, duration: .2, ease: "none" }, .68);

    ScrollTrigger.refresh();
  } else {
    figure.querySelector(".relations-map-overlay").style.display = "none";
  }

  document.documentElement.dataset.layoutVersion = "20260814-31-map-annotation-reveal";
})();
