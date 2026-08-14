(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const mapFigure = document.querySelector("#salt-origin .relations-map-reveal");
  const mapFinal = mapFigure?.querySelector(".relations-map-final");
  if (mapFigure && mapFinal) {
    ScrollTrigger.getById("origin-map-crossfade")?.kill();
    gsap.killTweensOf(mapFinal);
    const revealMap = () => gsap.fromTo(mapFinal,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1.45, ease: "power2.inOut", overwrite: true }
    );
    gsap.delayedCall(0.55, revealMap);
    ScrollTrigger.create({
      id: "origin-map-refresh-reveal",
      trigger: mapFigure,
      start: "top 82%",
      onEnter: revealMap,
      onEnterBack: revealMap
    });
  }

  const inhabiting = document.querySelector("#salt-inhabiting .salt-media-list");
  const hostList = document.querySelector("#salt-host .salt-media-list");
  const hostTransfer = inhabiting?.querySelector("figure.salt-media.right:nth-of-type(2)");
  if (hostList && hostTransfer) {
    hostTransfer.classList.add("v35-moved-to-host");
    hostList.append(hostTransfer);
  }

  const territorialFilm = document.querySelector("#salt-machine .v30-motion-film");
  const breath = document.getElementById("salt-breath");
  const breathFinale = breath?.querySelector(".breath-finale-inner")?.closest(".pin-spacer") || breath?.querySelector(".breath-finale-inner");
  if (territorialFilm && breath) {
    territorialFilm.classList.add("v35-slot-0801");
    const kicker = territorialFilm.querySelector("figcaption span, figcaption .section-kicker");
    if (kicker) kicker.textContent = "CHAPTER .08 / 01 · TERRITORIAL MODEL";
    breath.insertBefore(territorialFilm, breathFinale || breath.firstChild);
  }

  document.querySelectorAll("#salt-inhabiting figure.salt-media img").forEach((image, index) => {
    gsap.fromTo(image,
      { autoAlpha: 0, y: 28, scale: 1.025 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 1.05,
        delay: index * 0.04,
        ease: "power2.out",
        overwrite: "auto",
        scrollTrigger: {
          trigger: image,
          start: "top 86%",
          toggleActions: "play none none reverse"
        }
      }
    );
  });

  const oldBirdLayer = breath?.querySelector(".breath-bird-layer");
  if (oldBirdLayer) {
    gsap.killTweensOf(oldBirdLayer.querySelectorAll("*"));
    oldBirdLayer.remove();
  }
  if (breath && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const finaleInner = breath.querySelector(".breath-finale-inner");
    if (finaleInner) {
      const layer = document.createElement("div");
      layer.className = "breath-bird-layer-v35";
      const routes = [
        { y: "15%", delay: 0, duration: 16, scale: .72 },
        { y: "22%", delay: 2.8, duration: 19, scale: .52 },
        { y: "11%", delay: 6.1, duration: 21, scale: .42 },
        { y: "28%", delay: 8.4, duration: 18, scale: .58 }
      ];
      routes.forEach((route, index) => {
        const bird = document.createElement("span");
        bird.className = "breath-bird-v35";
        bird.style.setProperty("--bird-y", route.y);
        bird.innerHTML = '<i class="wing wing-left"></i><i class="wing wing-right"></i>';
        layer.append(bird);
        gsap.set(bird, { scale: route.scale });
        gsap.to(bird, {
          duration: route.duration,
          delay: route.delay,
          repeat: -1,
          ease: "none",
          keyframes: [
            { x: "22vw", y: index % 2 ? 18 : -12, rotation: -4 },
            { x: "53vw", y: index % 2 ? -28 : 25, rotation: 5 },
            { x: "84vw", y: index % 2 ? 12 : -34, rotation: -3 },
            { x: "120vw", y: index % 2 ? -8 : 14, rotation: 2 }
          ]
        });
        gsap.to(bird.querySelector(".wing-left"), { rotation: 24, duration: .28, repeat: -1, yoyo: true, ease: "sine.inOut" });
        gsap.to(bird.querySelector(".wing-right"), { rotation: -24, duration: .28, repeat: -1, yoyo: true, ease: "sine.inOut" });
      });
      finaleInner.append(layer);
    }
  }

  document.querySelectorAll(".blank-sheet-number").forEach((node) => node.remove());
  const chapterNumbers = new Map([
    ["salt-familiar", "01"], ["salt-origin", "02"], ["salt-relations", "03"],
    ["salt-archive", "03"], ["salt-process", "04"], ["salt-machine", "05"],
    ["salt-host", "06"], ["salt-inhabiting", "07"], ["salt-breath", "08"]
  ]);
  chapterNumbers.forEach((chapter, id) => {
    const section = document.getElementById(id);
    if (!section) return;
    let item = 0;
    section.querySelectorAll(".chapter-placeholder-image, .familiar-placeholder").forEach((placeholder) => {
      if (placeholder.querySelector("img, video, canvas") || placeholder.closest(".v35-slot-0801")) return;
      item += 1;
      const badge = document.createElement("span");
      badge.className = "blank-sheet-number";
      badge.textContent = `${chapter}.${String(item).padStart(2, "0")}`;
      placeholder.append(badge);
    });
  });

  requestAnimationFrame(() => ScrollTrigger.refresh());
})();
