(() => {
  const relations = document.querySelector("#salt-relations");
  const archive = document.querySelector("#salt-archive");
  const nav = document.querySelector(".salt-story-nav");
  if (!relations || !archive || !nav) return;

  const title = relations.querySelector("h3");
  const question = relations.querySelector(".salt-question");
  const summary = relations.querySelector(".salt-summary");
  if (title) title.textContent = "SALT AND ITS RELATIONS";
  if (question) question.textContent = "How do territorial forces become a material record?";
  if (summary) summary.textContent = "Salt emerges through relations between water, heat, wind, terrain, algae, metal and extraction. The chapter moves from their combined territorial field into six separate traces, revealing how the lake writes environmental change into matter.";

  const bridge = document.createElement("div");
  bridge.className = "relations-archive-bridge";
  bridge.innerHTML = "<span>Combined field → six traces</span><p>The relation map is not a final image. Scroll onward to separate the field into Heightfield, Salt, Wind, Metal, Algae and Heat.</p>";
  relations.append(bridge);

  archive.dataset.continuationOf = "salt-relations";
  archive.querySelector(".archive-unfold-kicker").textContent = "Chapter .03 / Six environmental traces";

  nav.querySelector('a[href="#salt-archive"]')?.remove();

  const scenes = [...document.querySelectorAll(".salt-scene")].filter((scene) => scene.id !== "salt-archive");
  scenes.forEach((scene, index) => {
    const number = String(index + 1).padStart(2, "0");
    const label = scene.querySelector(".salt-scene-number");
    if (label) label.textContent = `Chapter .${number}`;
  });

  const chapterMap = new Map([
    ["salt-familiar", "01"], ["salt-origin", "02"], ["salt-relations", "03"],
    ["salt-process", "04"], ["salt-machine", "05"], ["salt-host", "06"],
    ["salt-inhabiting", "07"], ["salt-breath", "08"],
  ]);
  chapterMap.forEach((number, id) => {
    document.querySelectorAll(`#${id} .salt-media figcaption span`).forEach((label) => {
      label.textContent = `Chapter .${number}`;
    });
  });

  const breathLabel = document.querySelector("#salt-breath .breath-copy small");
  if (breathLabel) breathLabel.textContent = "Chapter .08 / The breath of the salt lake";

  if (window.ScrollTrigger) requestAnimationFrame(() => ScrollTrigger.refresh());
})();
