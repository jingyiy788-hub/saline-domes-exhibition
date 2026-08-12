(() => {
  const plan = document.querySelector("#salt-familiar .familiar-image-plan");
  if (plan) {
    plan.innerHTML = `
      <figure class="familiar-placeholder">
        <div class="familiar-white-image" role="img" aria-label="Placeholder for a scale-ambiguous salt surface image"></div>
        <figcaption><span>Image needed / 01</span>Extreme close-up of cracked salt crust or a crystal edge, without a visible scale.</figcaption>
      </figure>
      <figure class="familiar-placeholder">
        <div class="familiar-white-image" role="img" aria-label="Placeholder for a salt grain and landscape diptych"></div>
        <figcaption><span>Image needed / 02</span>A diptych pairing ordinary salt in a palm with an aerial view of Huama Lake.</figcaption>
      </figure>
    `;
  }

  const processList = document.querySelector("#salt-process .salt-media-list");
  if (!processList) return;

  const figure = document.createElement("figure");
  figure.className = "salt-media wide salt-growth-video";
  figure.innerHTML = `
    <video autoplay muted loop playsinline preload="metadata" aria-label="Salt crystals forming in a petri dish">
      <source src="./assets/videos/salt-crystallisation-growth.mp4" type="video/mp4">
    </video>
    <figcaption><span></span><strong>Salt crystallisation forming over time</strong></figcaption>
  `;
  processList.insertBefore(figure, processList.firstChild);

  const scenes = [...document.querySelectorAll(".salt-scene")];
  scenes.forEach((scene, sceneIndex) => {
    const chapter = String(sceneIndex + 1).padStart(2, "0");
    scene.querySelectorAll(".salt-media figcaption > span:first-child").forEach((caption, imageIndex) => {
      caption.textContent = `Chapter .${chapter} / ${String(imageIndex + 1).padStart(2, "0")}`;
    });
  });

  if (window.ScrollTrigger) requestAnimationFrame(() => ScrollTrigger.refresh());
})();
