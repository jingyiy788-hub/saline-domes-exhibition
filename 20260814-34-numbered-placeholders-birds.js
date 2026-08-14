(() => {
  const chapterOrder = [
    "salt-familiar", "salt-origin", "salt-relations", "salt-archive",
    "salt-process", "salt-machine", "salt-host", "salt-inhabiting", "salt-breath"
  ];

  chapterOrder.forEach((id, chapterIndex) => {
    const section = document.getElementById(id);
    if (!section) return;
    const blanks = Array.from(section.querySelectorAll(".chapter-placeholder-image, .familiar-placeholder"))
      .filter((node) => !node.querySelector("img, video") && !node.matches(":has(img), :has(video)"));
    blanks.forEach((blank, itemIndex) => {
      const number = document.createElement("span");
      number.className = "blank-sheet-number";
      number.textContent = `${String(chapterIndex + 1).padStart(2, "0")}.${String(itemIndex + 1).padStart(2, "0")}`;
      blank.append(number);
    });
  });

  const mapCaption = document.querySelector("#salt-origin .relations-map-reveal figcaption");
  if (mapCaption && !mapCaption.querySelector(".origin-map-note")) {
    const note = document.createElement("p");
    note.className = "origin-map-note";
    note.textContent = "The Dingbian salt-lake cluster lies between Dingbian County and Yanchi County. Prevailing winds connect the lake system to surrounding settlements, carrying saline dust and fine particles across the territorial field.";
    mapCaption.append(note);
  }

  // The GIF remains animated internally, but no longer receives an entrance tween.
  const originGif = document.querySelector(".origin-change-pair img");
  if (originGif && window.gsap) {
    gsap.killTweensOf(originGif);
    gsap.set(originGif, { clearProps: "all" });
    window.ScrollTrigger?.getById("v29-origin-gif")?.kill();
  }

  const finale = document.querySelector("#salt-breath .breath-finale-inner");
  if (finale && window.gsap && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const layer = document.createElement("div");
    layer.className = "breath-bird-layer";
    const birds = [
      [18, 24, .72, .75], [23, 18, .58, .62], [15, 14, .48, .52],
      [29, 20, .62, .68], [20, 12, .42, .46], [34, 15, .5, .55]
    ];
    birds.forEach(([top, size, opacity, scale], index) => {
      const bird = document.createElement("i");
      bird.className = "breath-bird";
      bird.style.setProperty("--bird-top", `${top}%`);
      bird.style.setProperty("--bird-size", `${size}px`);
      bird.style.setProperty("--bird-opacity", opacity);
      bird.style.setProperty("--bird-scale", scale);
      layer.append(bird);
      gsap.to(bird, {
        x: () => innerWidth * 1.3,
        y: index % 2 ? -42 : 24,
        duration: 14 + index * 1.8,
        delay: index * 1.15,
        repeat: -1,
        ease: "none"
      });
      gsap.to([bird, bird], { rotation: index % 2 ? 2 : -2, duration: 1.1, repeat: -1, yoyo: true, ease: "sine.inOut" });
    });
    finale.append(layer);
  }

  window.ScrollTrigger?.refresh();
  document.documentElement.dataset.layoutVersion = "20260814-34-numbered-placeholders-birds";
})();
