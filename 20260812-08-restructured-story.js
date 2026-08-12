(() => {
  const story = document.querySelector("#salt-story-sections");
  const archive = document.querySelector("#salt-archive");
  const host = document.querySelector("#salt-host");
  const nav = document.querySelector(".salt-story-nav");
  if (!story || !archive || !host || !nav) return;

  function imageFigure(page, title, alignment = "wide", loading = "lazy") {
    return `
      <figure class="salt-media ${alignment}">
        <img src="./assets/term3-finalpre/page-${String(page).padStart(2, "0")}.jpg" alt="${title}" loading="${loading}">
        <figcaption><span></span><strong>${title}</strong></figcaption>
      </figure>
    `;
  }

  const relations = document.createElement("section");
  relations.id = "salt-relations";
  relations.className = "salt-scene";
  relations.innerHTML = `
    <header class="salt-scene-head">
      <span class="salt-scene-number"></span>
      <div>
        <h3>SALT AND ITS RELATIONS</h3>
        <p class="salt-question">Does salt ever exist alone?</p>
        <p class="salt-summary">Salt is a visible consequence of relationships between water, heat, wind, terrain, algae, metal and extraction. The project first maps this network before treating salt as architectural matter.</p>
      </div>
    </header>
    <div class="salt-media-list">
      ${imageFigure(8, "Ecological pressures and regional relationships", "wide", "eager")}
      ${imageFigure(29, "Environmental forces, growth points and food points", "right")}
    </div>
  `;
  story.insertBefore(relations, archive);

  const machine = document.createElement("section");
  machine.id = "salt-machine";
  machine.className = "salt-scene";
  machine.innerHTML = `
    <header class="salt-scene-head">
      <span class="salt-scene-number"></span>
      <div>
        <h3>TEACHING THE MACHINE TO GROW SALT</h3>
        <p class="salt-question">Can salt behaviour become a computational design rule?</p>
        <p class="salt-summary">Environmental fields become growth points, food points and diffusion strengths. Agent-based simulations translate material behaviour into layered geometries without treating computation as a separate formal exercise.</p>
      </div>
    </header>
    <div class="salt-media-list">
      ${imageFigure(21, "Organic growth generation", "left", "eager")}
      ${imageFigure(30, "Environmental agents and diffusion relationships")}
      ${imageFigure(31, "Growth points, food points and agent aggregation", "right")}
      ${imageFigure(32, "Organic envelope generation")}
      ${imageFigure(33, "Agent-based growth iterations", "left")}
      ${imageFigure(36, "Envelope geometry generations")}
    </div>
  `;
  story.insertBefore(machine, host);

  nav.innerHTML = `
    <a href="#salt-familiar">Familiar / Strange</a>
    <a href="#salt-origin">Origin</a>
    <a href="#salt-relations">Relations</a>
    <a href="#salt-archive">Archive</a>
    <a href="#salt-process">Process</a>
    <a href="#salt-machine">Machine</a>
    <a href="#salt-host">Host</a>
    <a href="#salt-inhabiting">Inhabiting</a>
    <a href="#salt-breath">Breath</a>
  `;

  const scenes = [...document.querySelectorAll(".salt-scene")];
  scenes.forEach((scene, sceneIndex) => {
    const chapterNumber = String(sceneIndex + 1).padStart(2, "0");
    scene.querySelector(".salt-scene-number").textContent = `Chapter .${chapterNumber}`;
    scene.querySelectorAll(".salt-media figcaption > span:first-child").forEach((caption, mediaIndex) => {
      caption.textContent = `Chapter .${chapterNumber} / ${String(mediaIndex + 1).padStart(2, "0")}`;
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
  scenes.forEach((scene) => observer.observe(scene));
})();

