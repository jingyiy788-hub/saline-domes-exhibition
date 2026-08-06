const chapterExhibitionData = [
  {
    id: "background",
    number: "01",
    shortTitle: "Background",
    title: "Background Research & Site Analysis",
    subtitle: "Terminal Saline Lake Crisis to Salt Lake Group in Dingbian Region, China",
    pages: Array.from({ length: 8 }, (_, index) => index + 3),
    cover: 4,
  },
  {
    id: "domes",
    number: "02",
    shortTitle: "Domes",
    title: "Design Prototype Option 1: Domes",
    subtitle: "Salt crystallisation as a self-forming structural system",
    pages: Array.from({ length: 9 }, (_, index) => index + 11),
    cover: 16,
  },
  {
    id: "layers",
    number: "03",
    shortTitle: "Layers",
    title: "Design Prototype Option 2: Layers",
    subtitle: "Layered growth, aggregation and environmental response",
    pages: Array.from({ length: 6 }, (_, index) => index + 20),
    cover: 24,
  },
  {
    id: "organic-envelop",
    number: "04",
    shortTitle: "Organic Envelop",
    title: "Final Proposal: Organic Envelop",
    subtitle: "A living envelope shaped by multiple environmental agents",
    pages: Array.from({ length: 17 }, (_, index) => index + 26),
    cover: 40,
  },
  {
    id: "conclusion",
    number: "05",
    shortTitle: "Conclusion",
    title: "Conclusion & Large Scale Appliance",
    subtitle: "Metabolisation, crystallisation and territorial transformation",
    pages: Array.from({ length: 4 }, (_, index) => index + 43),
    cover: 46,
  },
];

const pageTitles = {
  3: "Background Research & Site Analysis",
  4: "Salt Lakes Around the World",
  5: "Salt Lake Group in Dingbian Region, China",
  6: "Huama Salt Lake",
  7: "Terminal Saline Lake Crisis",
  8: "Salt Crystallisation and Microbial Mineralisation",
  9: "Environmental Conditions and Material Agency",
  10: "Site Analysis and Design Opportunity",
};

Object.assign(pageTitles, {
  8: "Ecological Pressures and Regional Relationships",
  9: "Salt Research",
  10: "Design Research Questions",
  11: "Design Prototype Option 1: Domes",
  12: "Salt Aggregation Behaviour Observation",
  13: "Dome Generation Studies",
  14: "Dome Geometry Development",
  15: "Generational Form Comparison",
  16: "Efficiency, Enclosure and Planetary Management",
  17: "Dome as Extreme-System Metabolic Infrastructure",
  18: "Self-Weight Bearing Algorithm",
  19: "Crystallisation, Deliquescence and Impurity",
  20: "Design Prototype Option 2: Layers",
  21: "Organic Growth Generation",
  22: "Growth Network and Physical Layers",
  23: "Layer Axonometric and Side Views",
  24: "Layer Formation Development",
  25: "Layer Crystallisation Study",
  26: "Final Proposal: Organic Envelop",
  27: "Field Selection",
  28: "Environmental Agents Data Set",
  29: "Growth Points and Food Points",
  30: "Diffusion Strength Development",
  31: "Environmental Agent Simulation",
  32: "Organic Envelope Generation",
  33: "Agent-Based Growth Iteration",
  34: "Envelope Geometry Development",
  35: "Structural Aggregation Study",
  36: "Material and Spatial Formation",
  37: "Organic Envelope System",
  38: "Framework and Salt Bio-Rock Masonry",
  39: "Frame Insertion and Layered Crystallisation",
  40: "Inhabitable Aggregation Landscape",
  41: "Organic Envelope Interior",
  42: "Final Proposal Visualisation",
  43: "Conclusion and Large Scale Appliance",
  44: "Dome, Layer and Organic Envelop",
  45: "Metabolisation Controlled by Artificial Frameworks",
  46: "Breath of the Salt Lake",
});

const chapterCards = document.querySelector("#chapter-cards");
const chapterSelector = document.querySelector("#chapter-selector");
const projectOverview = document.querySelector("#project-overview");
const chapterReader = document.querySelector("#chapter-reader");
const chapterSideNav = document.querySelector("#chapter-side-nav");
const readerHeading = document.querySelector("#reader-heading");
const projectGallery = document.querySelector("#project-gallery");
const lineworkCanvas = document.querySelector("#linework-canvas");
const headerLinks = [
  document.querySelector(".brand"),
  ...document.querySelectorAll(".main-nav a"),
].filter(Boolean);

function updateHeaderState() {
  const hash = window.location.hash || "#home";
  const activeSection = hash.startsWith("#project/") ? "#projects" : hash;

  headerLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === activeSection;
    link.classList.toggle("current", isCurrent);
    if (isCurrent) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function imagePath(page) {
  return `./assets/term3-finalpre/page-${String(page).padStart(2, "0")}.jpg`;
}

function initReactiveLinework() {
  if (!lineworkCanvas || !projectOverview) return;

  const context = lineworkCanvas.getContext("2d");
  const linework = new Image();
  let width = 0;
  let height = 0;
  let drawBounds = null;

  function resizeCanvas() {
    const rect = projectOverview.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    lineworkCanvas.width = Math.round(width * pixelRatio);
    lineworkCanvas.height = Math.round(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    if (linework.naturalWidth) {
      const scale = Math.max(width / linework.naturalWidth, height / linework.naturalHeight) * 1.05;
      const drawWidth = linework.naturalWidth * scale;
      const drawHeight = linework.naturalHeight * scale;
      drawBounds = {
        x: (width - drawWidth) / 2,
        y: (height - drawHeight) / 2,
        width: drawWidth,
        height: drawHeight,
      };
    }

    context.clearRect(0, 0, width, height);
  }

  function drawGlow(event) {
    if (!drawBounds) return;
    const rect = projectOverview.getBoundingClientRect();
    const pointerX = event.clientX - rect.left;
    const pointerY = event.clientY - rect.top;
    const radius = Math.max(58, Math.min(92, Math.min(width, height) * 0.09));

    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = "source-over";
    context.drawImage(
      linework,
      drawBounds.x,
      drawBounds.y,
      drawBounds.width,
      drawBounds.height
    );

    context.globalCompositeOperation = "destination-in";
    const glow = context.createRadialGradient(pointerX, pointerY, 0, pointerX, pointerY, radius);
    glow.addColorStop(0, "rgba(255,255,255,1)");
    glow.addColorStop(0.18, "rgba(255,255,255,1)");
    glow.addColorStop(0.48, "rgba(255,255,255,0.7)");
    glow.addColorStop(0.78, "rgba(255,255,255,0.2)");
    glow.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = "source-over";
    lineworkCanvas.dataset.active = "true";
  }

  linework.addEventListener("load", resizeCanvas);
  linework.src = "./assets/0621a-linework/0621a-user-red.png";
  projectOverview.addEventListener("pointermove", drawGlow);
  projectOverview.addEventListener("pointerleave", () => {
    context.clearRect(0, 0, width, height);
    lineworkCanvas.dataset.active = "false";
  });
  window.addEventListener("resize", resizeCanvas);
}

function renderChapterCards() {
  chapterCards.innerHTML = chapterExhibitionData
    .map((chapter) => {
      const middlePage = chapter.pages[Math.floor(chapter.pages.length / 2)];
      const finalPage = chapter.pages.at(-1);
      return `
        <a class="chapter-card" data-chapter-link href="#project/the-saline-domes/${chapter.id}">
          <div class="chapter-card-image">
            <div class="chapter-slide-track">
              <img src="${imagePath(chapter.pages[0])}" alt="${chapter.title}" loading="lazy">
              <img src="${imagePath(middlePage)}" alt="" loading="lazy">
              <img src="${imagePath(finalPage)}" alt="" loading="lazy">
            </div>
          </div>
          <div class="chapter-card-copy">
            <span class="chapter-card-number">Chapter .${chapter.number}</span>
            <h4>${chapter.title}</h4>
            <p>${chapter.subtitle}</p>
          </div>
        </a>
      `;
    })
    .join("");
}

let chapterObserver;

function renderSideNav(activeChapter) {
  chapterSideNav.innerHTML = chapterExhibitionData
    .map((chapter) => `
      <a
        class="${chapter === activeChapter ? "active" : ""}"
        data-nav-chapter="${chapter.id}"
        href="#project/the-saline-domes/${chapter.id}"
        ${chapter === activeChapter ? 'aria-current="page"' : ""}
      >
        <span class="side-number">${chapter.number}</span>
        <span class="side-copy">
          <strong>${chapter.shortTitle}</strong>
          <small>${chapter.title}</small>
          <em>${chapter.subtitle}</em>
        </span>
      </a>
    `)
    .join("");
}

function setActiveChapterNav(chapterId) {
  chapterSideNav.querySelectorAll("[data-nav-chapter]").forEach((link) => {
    const isActive = link.dataset.navChapter === chapterId;
    link.classList.toggle("active", isActive);
    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

function renderContinuousChapters(selectedChapter, scrollToSelection = true) {
  readerHeading.hidden = true;
  projectGallery.innerHTML = chapterExhibitionData
    .map((chapter) => `
      <section id="continuous-${chapter.id}" class="continuous-chapter" data-reader-chapter="${chapter.id}">
        <div class="continuous-images">
          ${chapter.pages.map((page, index) => `
            <figure class="${page === 6 ? "sequential-detail-figure " : ""}${index === 0 ? "typewriter-figure" : ""}">
              <img
                src="${imagePath(page)}"
                alt="${chapter.title}, presentation page ${page}"
                loading="${chapter === selectedChapter && index < 2 ? "eager" : "lazy"}"
              >
              <span class="pdf-title-cleaner" aria-hidden="true"><i></i><i></i></span>
              ${page === 3 ? `<span class="pixel-reveal" aria-hidden="true">${Array.from({ length: 48 }, (_, tile) => `<i style="--tile:${tile}"></i>`).join("")}</span>` : ""}
              ${page === 6 ? `<span class="detail-curtains" aria-hidden="true"><i></i><i></i><i></i><i></i></span>` : ""}
              ${page === 7 ? `<span class="block-reveal" aria-hidden="true">${Array.from({ length: 10 }, (_, block) => `<i style="--block:${block}"></i>`).join("")}</span>` : ""}
              ${page === 5 ? `<span class="map-hotspots"><button type="button" style="--x:31%;--y:45%"><span>Huama Lake Group</span></button><button type="button" style="--x:70%;--y:43%"><span>Residential pressure corridor</span></button></span>` : ""}
              ${index === 0 ? `<span class="typewriter-title" aria-hidden="true"><small>CHAPTER .${chapter.number}</small><strong>${chapter.title}</strong><em>${chapter.subtitle}</em></span>` : ""}
              <figcaption>
                ${index === 0 ? `
                  <span class="figure-chapter-meta">
                    <small>Chapter .${chapter.number}</small>
                    <strong>${chapter.title}</strong>
                    <em>${chapter.subtitle}</em>
                  </span>
                ` : `<span>${pageTitles[page] || `${chapter.title} / Sheet ${String(index + 1).padStart(2, "0")}`}</span>`}
                <span>${String(index + 1).padStart(2, "0")} / ${String(chapter.pages.length).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          `).join("")}
        </div>
      </section>
    `)
    .join("");

  chapterObserver?.disconnect();
  chapterObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) {
      setActiveChapterNav(visible.target.dataset.readerChapter);
    }
  }, { rootMargin: "-80px 0px -58% 0px", threshold: [0, 0.01, 0.2] });

  document.querySelectorAll("[data-reader-chapter]").forEach((section) => {
    chapterObserver.observe(section);
  });

  if (scrollToSelection) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        document.querySelector(`#continuous-${selectedChapter.id}`)?.scrollIntoView({
          behavior: "instant",
          block: "start",
        });
      });
    });
  }
}

function initImageViewer() {
  const viewer = document.createElement("dialog");
  viewer.className = "image-viewer";
  viewer.innerHTML = `<button type="button" aria-label="Close image">&times;</button><img alt=""><p></p>`;
  document.body.append(viewer);

  const viewerImage = viewer.querySelector("img");
  const viewerCaption = viewer.querySelector("p");
  const closeViewer = () => viewer.close();
  viewer.querySelector("button").addEventListener("click", closeViewer);
  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) closeViewer();
  });

  document.addEventListener("click", (event) => {
    const image = event.target.closest(".continuous-images figure img");
    if (!image) return;
    viewerImage.src = image.currentSrc || image.src;
    viewerImage.alt = image.alt;
    viewerCaption.textContent = image.closest("figure").querySelector("figcaption span")?.textContent.trim() || "";
    viewer.showModal();
  });
}

function initSequentialDetails() {
  const figures = document.querySelectorAll(".sequential-detail-figure");
  if (!figures.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("details-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.48 });

  figures.forEach((figure) => observer.observe(figure));
}

function initTypewriterTitles() {
  const figures = document.querySelectorAll(".typewriter-figure");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("typing-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.42 });
  figures.forEach((figure) => observer.observe(figure));
}

function updateProjectRoute() {
  const route = window.location.hash.replace("#project/the-saline-domes", "");
  const chapterId = route.replace(/^\//, "");
  const activeChapter = chapterExhibitionData.find((chapter) => chapter.id === chapterId);

  if (!activeChapter) {
    projectOverview.hidden = false;
    chapterSelector.hidden = false;
    chapterReader.hidden = false;
    renderSideNav(chapterExhibitionData[0]);
    renderContinuousChapters(chapterExhibitionData[0], false);
    initTypewriterTitles();
    document.title = "The Saline Domes | Ecology Ten Block Layout";
    updateHeaderState();
    return;
  }

  projectOverview.hidden = true;
  chapterSelector.hidden = true;
  chapterReader.hidden = false;
  renderSideNav(activeChapter);
  renderContinuousChapters(activeChapter);
  initTypewriterTitles();
  document.title = `${activeChapter.shortTitle} | The Saline Domes`;
  updateHeaderState();
}

chapterCards.addEventListener("click", (event) => {
  const link = event.target.closest("[data-chapter-link]");
  if (!link || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
    return;
  }

  event.preventDefault();
  const destination = link.getAttribute("href");
  const cover = link.querySelector(".chapter-card-image");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function navigate() {
    window.location.hash = destination.slice(1);
    updateProjectRoute();
  }

  if (!document.startViewTransition || reducedMotion) {
    navigate();
    return;
  }

  link.classList.add("opening");
  cover.style.viewTransitionName = "chapter-cover";
  const transition = document.startViewTransition(() => {
    navigate();
  });

  transition.finished.finally(() => {
    link.classList.remove("opening");
    cover.style.viewTransitionName = "";
  });
});

renderChapterCards();
initReactiveLinework();
window.addEventListener("hashchange", updateProjectRoute);
window.addEventListener("hashchange", updateHeaderState);
updateProjectRoute();
updateHeaderState();
