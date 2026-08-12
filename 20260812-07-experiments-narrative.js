(() => {
  const story = document.querySelector("#salt-story-sections");
  const origin = document.querySelector("#salt-origin");
  const process = document.querySelector("#salt-process .salt-media-list");
  const nav = document.querySelector(".salt-story-nav");
  if (!story || !origin || !process || !nav) return;

  const opening = document.createElement("section");
  opening.id = "salt-familiar";
  opening.className = "salt-scene salt-scene--familiar";
  opening.innerHTML = `
    <header class="salt-scene-head">
      <span class="salt-scene-number">Chapter .01</span>
      <div>
        <h3>THE FAMILIAR AND THE STRANGE</h3>
        <p class="salt-question">We know salt as a familiar substance. What changes when it begins to grow through matter?</p>
        <p class="salt-summary">Wood, gauze, wool and cotton become hosts for crystallisation. A domestic material becomes unfamiliar when salt records fibre density, weaving direction and time.</p>
      </div>
    </header>
    <div class="salt-experiment-note">
      <small>Material experiment</small>
      <p>A controlled comparison observes how saturated salt solution precipitates across different woven substrates over 2, 20 and 60 hours.</p>
    </div>
    <div class="salt-media-list">
      <figure class="salt-media wide">
        <img src="./assets/experiments/experiment1.webp" alt="Salt crystallisation experiment across wood, gauze, wool and cotton" loading="eager">
        <figcaption><span>Chapter .01 / 01</span><strong>Material preparation and comparative crystallisation</strong></figcaption>
      </figure>
    </div>
  `;
  story.insertBefore(opening, origin);

  const processExperiment = document.createElement("figure");
  processExperiment.className = "salt-media wide";
  processExperiment.innerHTML = `
    <img src="./assets/experiments/experiment2.webp" alt="One-week salt crystallisation experiment across four weaving structures" loading="lazy">
    <figcaption><span>Chapter .06 / 01</span><strong>Crystallisation through horizontal, vertical, cross-braced and random networks</strong></figcaption>
  `;
  process.insertBefore(processExperiment, process.firstChild);

  const familiarLink = document.createElement("a");
  familiarLink.href = "#salt-familiar";
  familiarLink.textContent = "Familiar / Strange";
  nav.insertBefore(familiarLink, nav.firstChild);

  const orderedScenes = [...document.querySelectorAll(".salt-scene")];
  orderedScenes.forEach((scene, sceneIndex) => {
    const number = String(sceneIndex + 1).padStart(2, "0");
    scene.querySelector(".salt-scene-number").textContent = `Chapter .${number}`;
    scene.querySelectorAll(".salt-media figcaption > span:first-child").forEach((caption, mediaIndex) => {
      caption.textContent = `Chapter .${number} / ${String(mediaIndex + 1).padStart(2, "0")}`;
    });
  });

  const links = [...nav.querySelectorAll("a")];
  const observer = new IntersectionObserver((entries) => {
    const active = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!active) return;
    links.forEach((link) => link.classList.toggle("active", link.hash === `#${active.target.id}`));
  }, { rootMargin: "-20% 0px -65%", threshold: [0, .1] });
  orderedScenes.forEach((scene) => observer.observe(scene));
})();

