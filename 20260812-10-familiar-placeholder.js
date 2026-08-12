(() => {
  const familiar = document.querySelector("#salt-familiar");
  const processList = document.querySelector("#salt-process .salt-media-list");
  if (!familiar || !processList) return;

  const existingExperiment = familiar.querySelector(".salt-media");
  if (existingExperiment) {
    existingExperiment.querySelector("img")?.setAttribute("loading", "lazy");
    existingExperiment.querySelector("figcaption strong").textContent = "Material preparation and comparative crystallisation";
    processList.insertBefore(existingExperiment, processList.firstChild);
  }

  familiar.querySelector(".salt-experiment-note")?.remove();
  familiar.querySelector(".salt-summary").textContent = "The opening begins with a visual contradiction: salt is recognisable at the scale of the hand, but becomes geological, bodily and almost alive when its scale is withheld.";

  let mediaList = familiar.querySelector(".salt-media-list");
  if (!mediaList) {
    mediaList = document.createElement("div");
    mediaList.className = "salt-media-list";
    familiar.appendChild(mediaList);
  }
  mediaList.innerHTML = `
    <div class="familiar-image-plan">
      <figure class="familiar-placeholder">
        <small>Opening image / priority 01</small>
        <p>A salt surface with no visible scale.</p>
        <figcaption><span>Suggested image</span>Extreme close-up of a cracked salt crust or crystal edge. Crop out the horizon, hands and instruments so it may first read as skin, stone or an aerial territory.</figcaption>
      </figure>
      <figure class="familiar-placeholder">
        <small>Transition image / priority 02</small>
        <p>One grain becomes a landscape.</p>
        <figcaption><span>Suggested image</span>A diptych: ordinary table salt in a palm beside an aerial view of Huama Lake. Match their texture and tonal contrast rather than explaining them with text.</figcaption>
      </figure>
    </div>
  `;

  const scenes = [...document.querySelectorAll(".salt-scene")];
  scenes.forEach((scene, sceneIndex) => {
    const chapter = String(sceneIndex + 1).padStart(2, "0");
    scene.querySelectorAll(".salt-media figcaption > span:first-child").forEach((caption, imageIndex) => {
      caption.textContent = `Chapter .${chapter} / ${String(imageIndex + 1).padStart(2, "0")}`;
    });
  });

  if (window.ScrollTrigger) requestAnimationFrame(() => ScrollTrigger.refresh());
})();
