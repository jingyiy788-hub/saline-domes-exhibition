(() => {
  const archive = document.querySelector("#salt-archive");
  const stage = archive?.querySelector(".archive-unfold-stage");
  if (!stage) return;

  window.ScrollTrigger?.getById("archive-six-forces")?.kill(true);

  const layers = [
    { id: "terrain", label: "Heightfield", en: "HEIGHTFIELD", accent: "#e8e6dd", image: "heightfield.webp", leftImage: "heightfield-left.png" },
    { id: "salt", label: "Salinity", en: "SALINITY", accent: "#b7b8b4", image: "salinity.webp", leftImage: "salinity-left.png" },
    { id: "heat", label: "Heat", en: "HEAT", accent: "#ff542b", image: "heat.webp", leftImage: "heat-left.png" },
    { id: "wind", label: "Wind", en: "WIND", accent: "#e2e4df", image: "wind.webp", leftImage: "wind-left.png" },
    { id: "algae", label: "Algae", en: "ALGAE", accent: "#53b3a9", image: "algae.webp", leftImage: "algae-left.png" },
    { id: "metal", label: "Heavy Metal", en: "METAL", accent: "#a64a2e", image: "metal.webp", leftImage: "metal-left.png" },
  ];

  stage.className = "archive-unfold-stage agents-replica-host";
  stage.innerHTML = `
    <main class="agents-replica">
      <section class="agents-first-page">
        <header class="agents-header">
          <p class="agents-eyebrow">SITE INTELLIGENCE / 001</p>
          <h4>Environmental<br>Agents <em>Data Set</em></h4>
        </header>
        <section class="agents-scene" aria-label="Axonometric site data layers">
          <div class="agents-source-stack">
            <div class="agents-satellite"><img src="./assets/environmental-agents/satellite.webp" alt="Site satellite imagery"></div>
            ${layers.map((layer, i) => `
              <div class="agents-data-layer agents-layer-${i}" data-agent="${layer.id}" style="--i:${i};--accent:${layer.accent};--layer-z:${125 + i * 62}px">
                <img class="agents-layer-image" src="./assets/environmental-agents/${layer.leftImage}" alt="">
                <div class="agents-layer-grid"></div>
                <span class="agents-edge-label">${layer.en}</span>
              </div>
            `).join("")}
          </div>
        </section>
        <aside class="agents-source-index" aria-label="Data layer selection">
          <div class="agents-source-index-head"><span>SELECT LAYER</span></div>
          <div class="agents-source-cards">
            ${layers.map((layer, i) => `
              <button type="button" data-agent="${layer.id}" aria-pressed="false" aria-label="Focus ${layer.label} layer">
                <div class="agents-source-thumb">
                  <img src="./assets/environmental-agents/${layer.image}" alt="${layer.label} analysis">
                  <span class="agents-source-thumb-index">0${i + 1}</span>
                </div>
                <span class="agents-source-thumb-name">${layer.en}</span>
              </button>
            `).join("")}
          </div>
        </aside>
      </section>
    </main>
  `;

  const root = stage.querySelector(".agents-replica");
  const dataLayers = [...root.querySelectorAll(".agents-data-layer")];
  const buttons = [...root.querySelectorAll(".agents-source-cards button")];
  let selected = null;

  const render = () => {
    const selectedIndex = selected ? layers.findIndex((layer) => layer.id === selected) : -1;
    root.classList.toggle("has-selection", Boolean(selected));
    dataLayers.forEach((element, i) => {
      const active = element.dataset.agent === selected;
      element.classList.toggle("active", active);
      element.classList.toggle("muted", Boolean(selected) && !active);
      const focusOffset = selectedIndex < 0 ? 0 : (i - selectedIndex) * 24;
      element.style.setProperty("--layer-z", `${125 + i * 62 + focusOffset}px`);
    });
    buttons.forEach((button) => {
      const active = button.dataset.agent === selected;
      button.classList.toggle("selected", active);
      button.setAttribute("aria-pressed", String(active));
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse") { selected = button.dataset.agent; render(); }
    });
    button.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "mouse") { selected = null; render(); }
    });
    button.addEventListener("focus", () => {
      if (matchMedia("(hover: hover) and (pointer: fine)").matches) { selected = button.dataset.agent; render(); }
    });
    button.addEventListener("blur", () => {
      if (matchMedia("(hover: hover) and (pointer: fine)").matches) { selected = null; render(); }
    });
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (!matchMedia("(hover: hover) and (pointer: fine)").matches) {
        selected = selected === button.dataset.agent ? null : button.dataset.agent;
        render();
      }
    });
  });
  root.addEventListener("click", () => { selected = null; render(); });

  setTimeout(() => {
    root.classList.add("is-ready");
    requestAnimationFrame(() => window.ScrollTrigger?.refresh());
  }, 180);
})();
