(() => {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.getAll().forEach((trigger) => {
      const id = String(trigger.vars?.id || "");
      const triggerClass = trigger.trigger?.className || "";
      const pinClass = trigger.pin?.className || "";
      if (/breath-finale|breathing-finale|host-breath-coda|flowing-host-finale/i.test(`${id} ${triggerClass} ${pinClass}`)) {
        trigger.animation?.kill();
        trigger.kill(true);
      }
    });
  }

  // Remove only the obsolete breathing finale and its generated wrappers.
  document.querySelectorAll(".breath-finale-inner").forEach((inner) => {
    const spacer = inner.closest("[class*='pin-spacer-breathing-finale']");
    if (spacer) spacer.remove();
    else inner.remove();
  });
  document.querySelectorAll("[class*='pin-spacer-breathing-finale']").forEach((spacer) => spacer.remove());

  // Keep the unrelated cleanup that used to share the obsolete finale script.
  document.querySelector("#salt-host .chapter-placeholder-grid:nth-of-type(2)")?.remove();
  document.querySelector("#salt-inhabiting .chapter-placeholder-grid:nth-of-type(2)")?.remove();
  document.querySelectorAll('video[src*="territorial-growth-model"]').forEach((video) => {
    video.playbackRate = 1.8;
    video.defaultPlaybackRate = 1.8;
  });

  // Preserve all chapter sections and every ordinary image/film after Host.
  document.querySelectorAll("#salt-inhabiting img, #salt-inhabiting video, #salt-breath img, #salt-breath video").forEach((media) => {
    window.gsap?.killTweensOf(media);
    window.gsap?.set(media, { autoAlpha: 1, x: 0, y: 0, scale: 1, filter: "none" });
  });

  document.querySelectorAll("#salt-inhabiting figure, #salt-breath figure").forEach((figure) => {
    window.gsap?.killTweensOf(figure.querySelectorAll("img, video, figcaption"));
  });

  const machineList = document.querySelector("#salt-machine .salt-media-list") || document.getElementById("salt-machine");
  if (machineList && !machineList.querySelector(".machine-growth-gif")) {
    const figure = document.createElement("figure");
    figure.className = "machine-growth-gif";
    figure.innerHTML = `
      <img src="./assets/media/machine-growth-aggregation.webp" alt="Animated aggregation model growing from nodes and connections into a dense spatial body">
      <figcaption>
        <small>CHAPTER .05 / GROWTH SEQUENCE</small>
        <strong>From distributed agents to an aggregated body</strong>
        <p>Nodes connect, thicken and merge over time, translating local interactions into a continuous spatial mass.</p>
      </figcaption>
    `;
    machineList.append(figure);
  }

  // Keep the territorial model in Chapter 08 and ensure its copy is sharp.
  const territorialModel = document.querySelector(".v35-slot-0801");
  const breathList = document.querySelector("#salt-breath .salt-media-list") || document.getElementById("salt-breath");
  if (territorialModel && breathList) {
    const kicker = territorialModel.querySelector("figcaption span, figcaption .section-kicker");
    if (kicker) kicker.textContent = "CHAPTER .08 / TERRITORIAL MODEL";
    breathList.append(territorialModel);
    const caption = territorialModel.querySelector("figcaption");
    window.gsap?.killTweensOf(caption?.querySelectorAll("*") || []);
    window.gsap?.set(caption, { autoAlpha: 1, filter: "none", x: 0, y: 0 });
  }

  // Add the new transformation film as the closing moving image of Chapter 08.
  if (breathList && !breathList.querySelector(".breath-transformation-film")) {
    const film = document.createElement("figure");
    film.className = "breath-transformation-film";
    film.innerHTML = `
      <video autoplay muted loop playsinline preload="metadata" aria-label="Monumental woven saline structures transforming through crystallisation cycles">
        <source src="./assets/videos/monumental-saline-cycles.mp4" type="video/mp4">
      </video>
      <figcaption>
        <small>CHAPTER .08 / TRANSFORMATION CYCLE</small>
        <strong>Architecture remains in a state of becoming.</strong>
        <p>Woven structures crystallise, dissolve and reform as the saline environment changes.</p>
      </figcaption>
    `;
    breathList.append(film);
    const video = film.querySelector("video");
    video.playbackRate = 1.15;
    video.play().catch(() => {});
  }

  // 54: remove the transformation-cycle insert and move the project film down one position.
  breathList?.querySelector(".breath-transformation-film")?.remove();
  const salineCityFilm = [...(breathList?.querySelectorAll(":scope > figure") || [])]
    .find((figure) => figure.querySelector("figcaption")?.textContent.includes("The Saline City - project film"));
  const territorialInBreath = breathList?.querySelector(".v35-slot-0801");
  if (territorialInBreath) {
    const territorialKicker = territorialInBreath.querySelector("figcaption small, figcaption span, figcaption .section-kicker");
    if (territorialKicker) territorialKicker.textContent = "CHAPTER .08 / TERRITORIAL MODEL";
  }
  if (salineCityFilm && territorialInBreath) territorialInBreath.after(salineCityFilm);

  // Replace the subtle crossfade with a legible left-to-right refresh.
  const mapFigure = document.querySelector("#salt-origin .relations-map-reveal");
  const mapFinal = mapFigure?.querySelector(".relations-map-final:nth-of-type(2)") || mapFigure?.querySelector(".relations-map-final:last-of-type");
  if (window.gsap && window.ScrollTrigger && mapFigure && mapFinal) {
    ["origin-map-crossfade", "origin-map-refresh-reveal", "origin-map-left-wipe-v53"].forEach((id) => ScrollTrigger.getById(id)?.kill(true));
    gsap.killTweensOf(mapFinal);
    gsap.fromTo(mapFinal,
      { autoAlpha: 1, clipPath: "inset(0 100% 0 0)" },
      {
        autoAlpha: 1,
        clipPath: "inset(0 0% 0 0)",
        duration: 1.05,
        ease: "power2.inOut",
        scrollTrigger: {
          id: "origin-map-left-wipe-v53",
          trigger: mapFigure,
          start: "top 82%",
          toggleActions: "restart none none reset"
        }
      }
    );
  }

  // Native fallback keeps the wipe working even if the animation bundle is unavailable.
  if (mapFigure && mapFinal && !window.ScrollTrigger) {
    const playMapWipe = () => {
      mapFinal.getAnimations().forEach((animation) => animation.cancel());
      mapFinal.animate(
        [
          { clipPath: "inset(0 100% 0 0)" },
          { clipPath: "inset(0 0% 0 0)" }
        ],
        { duration: 1050, easing: "cubic-bezier(.65,0,.35,1)", fill: "forwards" }
      );
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) playMapWipe();
        else mapFinal.style.clipPath = "inset(0 100% 0 0)";
      });
    }, { threshold: .3 });
    observer.observe(mapFigure);
  }

  // Add moving silhouettes and a restrained drifting fog layer to the selected Inhabiting scene.
  const birdScene = document.querySelector("#salt-inhabiting .salt-media-list > figure.salt-media.wide:nth-of-type(2)");
  if (birdScene && !birdScene.querySelector(".inhabiting-birds")) {
    birdScene.classList.add("inhabiting-bird-scene");
    const fog = document.createElement("div");
    fog.className = "inhabiting-fog";
    fog.setAttribute("aria-hidden", "true");
    const birds = document.createElement("div");
    birds.className = "inhabiting-birds";
    birds.setAttribute("aria-hidden", "true");
    birdScene.append(fog, birds);

    if (window.gsap && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.to(fog, { xPercent: 8, yPercent: -3, autoAlpha: .32, duration: 7, repeat: -1, yoyo: true, ease: "sine.inOut" });
      [
        { top: "13%", scale: .8, duration: 13, delay: 0 },
        { top: "19%", scale: .58, duration: 16, delay: 2.4 },
        { top: "10%", scale: .45, duration: 19, delay: 5.2 },
        { top: "25%", scale: .66, duration: 15, delay: 7.5 }
      ].forEach((route, index) => {
        const bird = document.createElement("span");
        bird.className = "inhabiting-bird";
        bird.style.setProperty("--bird-top", route.top);
        bird.innerHTML = '<i class="wing wing-left"></i><i class="wing wing-right"></i>';
        birds.append(bird);
        gsap.set(bird, { scale: route.scale });
        gsap.to(bird, {
          x: () => birdScene.clientWidth + 120,
          y: index % 2 ? 46 : -34,
          rotation: index % 2 ? 5 : -4,
          duration: route.duration,
          delay: route.delay,
          repeat: -1,
          ease: "none"
        });
        gsap.to(bird.querySelector(".wing-left"), { rotation: 23, duration: .3, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(bird.querySelector(".wing-right"), { rotation: -23, duration: .3, repeat: -1, yoyo: true, ease: "sine.inOut" });
      });
    }
  }

  requestAnimationFrame(() => window.ScrollTrigger?.refresh(true));
})();
