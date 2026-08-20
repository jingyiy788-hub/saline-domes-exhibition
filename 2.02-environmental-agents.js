(() => {
  const archive = document.querySelector("#salt-archive");
  const stage = archive?.querySelector(".archive-unfold-stage");
  if (!stage) return;

  const agents = [
    { id: "heightfield", label: "Heightfield", accent: "#e8e6dd" },
    { id: "salinity", label: "Salinity", accent: "#b7b8b4" },
    { id: "heat", label: "Heat", accent: "#ff542b" },
    { id: "wind", label: "Wind", accent: "#e2e4df" },
    { id: "algae", label: "Algae", accent: "#53b3a9" },
    { id: "metal", label: "Heavy metal", accent: "#a64a2e" },
  ];

  stage.classList.add("environmental-agents-stage");
  stage.innerHTML = `
    <div class="agents-visual" aria-label="Interactive stack of six environmental agents">
      <div class="agents-stack">
        <figure class="agent-layer agent-layer--base" style="--layer:0">
          <img src="./assets/environmental-agents/satellite.webp" alt="Satellite image of the saline lake">
        </figure>
        ${agents.map((agent, index) => `
          <figure class="agent-layer" data-agent="${agent.id}" style="--layer:${index + 1};--accent:${agent.accent}">
            <img src="./assets/environmental-agents/${agent.id}-left.png" alt="${agent.label} environmental layer" loading="lazy">
            <figcaption>${agent.label}</figcaption>
          </figure>
        `).join("")}
      </div>
    </div>
    <aside class="agents-index" aria-label="Select an environmental agent">
      <p class="agents-index-kicker">Environmental agents</p>
      <div class="agents-index-grid">
        ${agents.map((agent, index) => `
          <button class="agent-button" type="button" data-agent="${agent.id}" style="--accent:${agent.accent}" aria-pressed="false">
            <span class="agent-button-number">0${index + 1}</span>
            <img src="./assets/environmental-agents/${agent.id}.webp" alt="" loading="lazy">
            <span class="agent-button-label">${agent.label}</span>
          </button>
        `).join("")}
      </div>
      <p class="agents-index-note">Hover or select a trace to isolate its effect on the lake.</p>
    </aside>
  `;

  const layers = [...stage.querySelectorAll(".agent-layer[data-agent]")];
  const buttons = [...stage.querySelectorAll(".agent-button")];
  let locked = false;

  const select = (id, persist = false) => {
    locked = persist;
    stage.dataset.selected = id || "";
    layers.forEach((layer) => layer.classList.toggle("is-active", layer.dataset.agent === id));
    buttons.forEach((button) => {
      const active = button.dataset.agent === id;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
    });
  };

  buttons.forEach((button) => {
    button.addEventListener("pointerenter", () => select(button.dataset.agent, false));
    button.addEventListener("focus", () => select(button.dataset.agent, false));
    button.addEventListener("click", () => {
      const same = locked && stage.dataset.selected === button.dataset.agent;
      select(same ? "" : button.dataset.agent, !same);
    });
  });
  stage.querySelector(".agents-index")?.addEventListener("pointerleave", () => {
    if (!locked) select("");
  });

  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    stage.classList.add("is-ready");
    observer.disconnect();
  }, { threshold: 0.22 });
  observer.observe(stage);

  const refresh = () => requestAnimationFrame(() => window.ScrollTrigger?.refresh());
  stage.querySelectorAll("img").forEach((image) => {
    if (!image.complete) image.addEventListener("load", refresh, { once: true });
  });
  refresh();
})();
