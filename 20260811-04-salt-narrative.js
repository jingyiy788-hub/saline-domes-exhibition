(() => {
  document.querySelector("#project-gallery")?.replaceChildren();
  const root = document.querySelector("#salt-story-sections");
  const mediaImage = (page, title, align = "wide") => ({ type: "image", page, title, align });
  const scenes = [
    {
      id: "origin",
      number: "01",
      title: "THE ORIGIN OF SALT",
      question: "Why does salt appear here, and why is the lake changing?",
      summary: "Salt begins as a territorial process shaped by water, climate, geology and extraction. The story moves from the planetary salt-lake network to Huama Lake in Dingbian.",
      media: [mediaImage(4, "Salt lakes as a planetary network"), mediaImage(5, "Dingbian salt-lake group", "right"), mediaImage(6, "Huama Salt Lake through time", "left")],
    },
    {
      id: "archive",
      number: "02",
      title: "SALT AS ARCHIVE",
      question: "Can crystallisation be read as a material record of environmental change?",
      summary: "Height, salt, heat, wind, algae and metal are not separate diagrams. Together they describe the forces that become legible through salt.",
      media: [mediaImage(7, "The ecology of the salt lake"), { type: "layers", title: "Environmental agents data set" }],
    },
    {
      id: "process",
      number: "03",
      title: "SALT AS PROCESS",
      question: "How does salt aggregate, bridge, dissolve and grow again?",
      summary: "The project treats salt as an event rather than a finish: dispersed crystals gather into clusters, bridges, surfaces and self-supporting formations.",
      media: [mediaImage(9, "Salt research and crystallisation behaviour", "left"), mediaImage(12, "Isolated clusters and bridging aggregation"), mediaImage(13, "Aggregation behaviour iterations", "right"), mediaImage(19, "Crystallisation, deliquescence and impurity")],
    },
    {
      id: "host",
      number: "04",
      title: "SALT NEEDS A HOST",
      question: "What kind of framework allows salt to grow, carry weight and repair itself?",
      summary: "The artificial frame is not the finished building. It guides salt and microbial mineralisation, allowing volume, thickness and environmental response to evolve together.",
      media: [mediaImage(18, "Self-weight-bearing aggregation structure", "right"), mediaImage(23, "Layer accumulation and spatial thickness"), mediaImage(38, "Framework and salt bio-rock masonry", "left"), mediaImage(39, "Frame insertion, crystallisation and bio-masonry")],
    },
    {
      id: "inhabiting",
      number: "05",
      title: "INHABITING SALT",
      question: "How can people enter and occupy an architecture that never stops changing?",
      summary: "The final proposal combines site, growth system, artificial framework and crystallised envelope into an inhabitable landscape.",
      media: [mediaImage(34, "Organic envelope placed in the salt-lake field"), mediaImage(35, "Cyclical structural system", "right"), mediaImage(40, "Inhabitable aggregation landscape"), mediaImage(41, "Exterior occupation and changing enclosure", "left"), mediaImage(42, "Interior beneath the crystallised envelope")],
    },
    {
      id: "breath",
      number: "06",
      title: "THE BREATH OF THE SALT LAKE",
      question: "What happens when architecture is allowed to crystallise, collapse, dissolve and regenerate?",
      summary: "The project concludes not with a fixed object but with a territorial metabolism. Architecture becomes a host through which the salt lake records time.",
      media: [mediaImage(45, "Long-term metabolisation controlled by artificial frameworks"), mediaImage(46, "Breath of the Salt Lake"), { type: "video", title: "The Saline City - project film" }],
    },
  ];

  const pagePath = (page) => `./assets/term3-finalpre/page-${String(page).padStart(2, "0")}.jpg`;

  function layerExplorer() {
    const layers = [
      ["All", "00.png"], ["Heightfield", "1.png"], ["Salt", "2.png"],
      ["Wind", "3.png"], ["Metal", "4.png"], ["Algae", "5.png"], ["Heat", "6.png"],
    ];
    return `
      <div class="salt-layer-explorer">
        <div class="salt-layer-stage"><img src="./project/28/00.png" alt="Combined environmental agents"><span class="salt-layer-label">All environmental agents</span></div>
        <div class="salt-layer-controls">
          ${layers.map(([label, file], index) => `<button type="button" class="${index === 0 ? "active" : ""}" data-file="${file}" data-label="${label}" aria-pressed="${index === 0}">${label}</button>`).join("")}
          <p class="salt-layer-label">Select one force to isolate its trace.</p>
        </div>
      </div>
    `;
  }

  scenes.forEach((scene) => {
    const section = document.createElement("section");
    section.className = "salt-scene";
    section.id = `salt-${scene.id}`;
    section.innerHTML = `
      <header class="salt-scene-head">
        <span class="salt-scene-number">Chapter .${scene.number}</span>
        <div><h3>${scene.title}</h3><p class="salt-question">${scene.question}</p><p class="salt-summary">${scene.summary}</p></div>
      </header>
      <div class="salt-media-list"></div>
    `;
    const list = section.querySelector(".salt-media-list");
    scene.media.forEach((item, index) => {
      const figure = document.createElement("figure");
      figure.className = `salt-media ${item.align || "wide"}`;
      const media = item.type === "layers" ? layerExplorer()
        : item.type === "video" ? `<video controls preload="metadata" playsinline poster="./assets/term3-finalpre/page-01.jpg"><source src="./project/term2提交.mp4" type="video/mp4"></video>`
        : `<img src="${pagePath(item.page)}" alt="${item.title}" loading="${index < 2 ? "eager" : "lazy"}">`;
      figure.innerHTML = `${media}<figcaption><span>Chapter .${scene.number} / ${String(index + 1).padStart(2, "0")}</span><strong>${item.title}</strong></figcaption>`;
      list.append(figure);
    });
    root.append(section);
  });

  document.querySelectorAll(".salt-layer-controls button").forEach((button) => {
    button.addEventListener("click", () => {
      const explorer = button.closest(".salt-layer-explorer");
      const stage = explorer.querySelector(".salt-layer-stage");
      const image = stage.querySelector("img");
      stage.classList.add("changing");
      setTimeout(() => {
        image.src = `./project/28/${button.dataset.file}`;
        image.alt = `${button.dataset.label} environmental layer`;
        stage.querySelector("span").textContent = `${button.dataset.label} environmental agent${button.dataset.label === "All" ? "s" : ""}`;
        stage.classList.remove("changing");
      }, 150);
      explorer.querySelectorAll("button").forEach((item) => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
    });
  });

  const navLinks = [...document.querySelectorAll(".salt-story-nav a")];
  const observer = new IntersectionObserver((entries) => {
    const active = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!active) return;
    navLinks.forEach((link) => link.classList.toggle("active", link.hash === `#${active.target.id}`));
  }, { rootMargin: "-20% 0px -65%", threshold: [0, .1] });
  document.querySelectorAll(".salt-scene").forEach((section) => observer.observe(section));
})();

