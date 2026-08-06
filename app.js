const project = {
  id: "the-saline-domes",
  title: "THE SALINE DOMES",
  programme: "Urban Design MArch",
  unit: "RC16 Vanishing City",
  year: "2026",
  students: ["Jingyi Yang", "Keqi Zhao", "Shenhong Lin", "Zijing Liang"],
  tutors: ["Claudia Pasquero", "Filippo Nassetti"],
  tags: [
    "salt lake",
    "crystallisation",
    "microbial mineralisation",
    "computational form-finding",
    "organic envelop",
    "dome",
    "layers",
  ],
  cover: "./assets/term3-finalpre/page-46.jpg",
};

const chapters = [
  { id: "chapter-1", page: 3, title: "Background Research & Site Analysis" },
  { id: "chapter-2", page: 11, title: "Design Prototype Option 1: Domes" },
  { id: "chapter-3", page: 20, title: "Design Prototype Option 2: Layers" },
  { id: "chapter-4", page: 26, title: "Final Proposal: Organic Envelop" },
  { id: "chapter-5", page: 43, title: "Conclusion & Large Scale Appliance" },
];

const pages = Array.from({ length: 46 }, (_, index) => index + 1);
const views = Array.from(document.querySelectorAll(".view"));
const grid = document.querySelector("#project-grid");
const gallery = document.querySelector("#project-gallery");
const searchInput = document.querySelector("#project-search");
const filters = Array.from(document.querySelectorAll(".filter"));
const ditherCanvas = document.querySelector("#dither-canvas");
const ditherProgress = document.querySelector("#dither-progress");
const ditherDepth = document.querySelector("#dither-depth");

let activeFilter = "all";

function showView() {
  const hash = window.location.hash || "#home";
  const projectRoute = hash.startsWith("#project/");

  views.forEach((view) => view.classList.remove("active"));

  if (projectRoute) {
    document.querySelector("#project-detail").classList.add("active");
    window.scrollTo({ top: 0, behavior: "instant" });
    return;
  }

  const target = document.querySelector(hash);
  (target || document.querySelector("#home")).classList.add("active");
}

function projectMatches() {
  const query = searchInput.value.trim().toLowerCase();
  const searchable = [
    project.title,
    project.programme,
    project.unit,
    project.year,
    ...project.students,
    ...project.tutors,
    ...project.tags,
  ]
    .join(" ")
    .toLowerCase();

  const filterOk = activeFilter === "all" || searchable.includes(activeFilter.toLowerCase());
  const queryOk = !query || searchable.includes(query);
  return filterOk && queryOk;
}

function renderGrid() {
  if (!projectMatches()) {
    grid.innerHTML = '<p class="empty">No projects match this search.</p>';
    return;
  }

  grid.innerHTML = `
    <a class="project-card" href="#project/${project.id}">
      <img src="${project.cover}" alt="Final render from ${project.title}" loading="lazy">
      <h3>${project.title}</h3>
      <p>${project.students.join(", ")}</p>
      <p>${project.programme} | ${project.unit} | ${project.year}</p>
    </a>
  `;
}

function chapterForPage(page) {
  return [...chapters].reverse().find((chapter) => page >= chapter.page) || {
    title: "Project Cover & Abstract",
  };
}

function renderGallery() {
  gallery.innerHTML = pages
    .map((page) => {
      const chapter = chapterForPage(page);
      const id = chapters.some((item) => item.page === page) ? ` id="${chapter.id}"` : "";
      return `
        <figure${id}>
          <img
            src="./assets/term3-finalpre/page-${String(page).padStart(2, "0")}.jpg"
            alt="${project.title} presentation page ${page}"
            loading="${page <= 3 ? "eager" : "lazy"}"
          >
          <figcaption>
            <span>${chapter.title}</span>
            <span>${String(page).padStart(2, "0")} / 46</span>
          </figcaption>
        </figure>
      `;
    })
    .join("");
}

function initDitherHero() {
  if (!ditherCanvas) {
    return;
  }

  const context = ditherCanvas.getContext("2d", { alpha: true });
  const image = new Image();
  const bayer = [
    0, 8, 2, 10,
    12, 4, 14, 6,
    3, 11, 1, 9,
    15, 7, 13, 5,
  ];

  let width = 0;
  let height = 0;
  let columns = 0;
  let rows = 0;
  let cells = [];
  let pointerX = 0.5;
  let pointerY = 0.5;
  let animationFrame = 0;
  let lastBuildWidth = 0;

  function coverSize(sourceWidth, sourceHeight, targetWidth, targetHeight) {
    const sourceRatio = sourceWidth / sourceHeight;
    const targetRatio = targetWidth / targetHeight;

    if (sourceRatio > targetRatio) {
      const drawHeight = targetHeight;
      const drawWidth = drawHeight * sourceRatio;
      return {
        width: drawWidth,
        height: drawHeight,
        x: (targetWidth - drawWidth) / 2,
        y: 0,
      };
    }

    const drawWidth = targetWidth;
    const drawHeight = drawWidth / sourceRatio;
    return {
      width: drawWidth,
      height: drawHeight,
      x: 0,
      y: (targetHeight - drawHeight) / 2,
    };
  }

  function buildCells() {
    const rect = ditherCanvas.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.floor(rect.width));
    height = Math.max(1, Math.floor(rect.height));
    ditherCanvas.width = Math.floor(width * pixelRatio);
    ditherCanvas.height = Math.floor(height * pixelRatio);
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

    const cellSize = width < 760 ? 8 : 10;
    columns = Math.ceil(width / cellSize);
    rows = Math.ceil(height / cellSize);
    const source = coverSize(width, height, image.naturalWidth, image.naturalHeight);
    cells = [];

    for (let y = 0; y < rows; y += 1) {
      for (let x = 0; x < columns; x += 1) {
        const screenX = x * cellSize;
        const screenY = y * cellSize;
        const normalizedX = x / Math.max(1, columns - 1);
        const normalizedY = y / Math.max(1, rows - 1);
        const sourceX = Math.max(0, (screenX - source.x) / source.width * image.naturalWidth);
        const sourceY = Math.max(0, (screenY - source.y) / source.height * image.naturalHeight);
        const sourceSize = Math.max(
          1,
          Math.min(image.naturalWidth - sourceX, cellSize / source.width * image.naturalWidth)
        );
        const sourceHeight = Math.max(
          1,
          Math.min(image.naturalHeight - sourceY, cellSize / source.height * image.naturalHeight)
        );
        const radial = 1 - Math.hypot(normalizedX - 0.58, normalizedY - 0.46) * 1.35;
        const grain = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
        const noise = grain - Math.floor(grain);
        const luminance = Math.max(0, Math.min(1, radial * 0.74 + noise * 0.26));
        const threshold = (bayer[(x % 4) + (y % 4) * 4] + 0.5) / 16;

        cells.push({
          x: screenX,
          y: screenY,
          sourceX,
          sourceY,
          sourceSize,
          sourceHeight,
          size: cellSize,
          luminance,
          threshold,
          phase: Math.sin(x * 0.37 + y * 0.21),
        });
      }
    }

    lastBuildWidth = width;
  }

  function draw(time = 0) {
    const progress = Number(ditherProgress?.value ?? 0.62);
    const depth = Number(ditherDepth?.value ?? 0.48);
    context.clearRect(0, 0, width, height);
    context.fillStyle = "rgba(9, 10, 8, 0.18)";
    context.fillRect(0, 0, width, height);

    for (const cell of cells) {
      const dithered = cell.luminance + progress * 0.34 > cell.threshold;
      const distanceX = cell.x / width - pointerX;
      const distanceY = cell.y / height - pointerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const wave = Math.sin(time * 0.0016 + cell.phase * 4 + distance * 12);
      const lift = (1 - cell.luminance) * depth * 34 + wave * depth * 7;
      const scale = dithered ? 0.82 + cell.luminance * 0.34 : 0.26 + progress * 0.18;
      const size = Math.max(1.2, cell.size * scale);
      const x = cell.x + distanceX * lift;
      const y = cell.y + distanceY * lift - lift * 0.2;

      context.globalAlpha = dithered ? 0.86 : 0.34;
      if (dithered) {
        context.drawImage(
          image,
          cell.sourceX,
          cell.sourceY,
          cell.sourceSize,
          cell.sourceHeight,
          x,
          y,
          size,
          size
        );
      } else {
        context.fillStyle = "rgba(248, 247, 241, 0.72)";
        context.fillRect(x, y, size, size);
      }

      if (depth > 0.08 && dithered) {
        context.globalAlpha = depth * 0.28;
        context.fillStyle = "#10100d";
        context.fillRect(x + lift * 0.11, y + lift * 0.18, size, size);
      }
    }

    context.globalAlpha = 1;
    animationFrame = requestAnimationFrame(draw);
  }

  function resize() {
    if (!image.complete || !image.naturalWidth) {
      return;
    }

    if (Math.abs(ditherCanvas.getBoundingClientRect().width - lastBuildWidth) > 4) {
      buildCells();
    }
  }

  image.addEventListener("load", () => {
    buildCells();
    draw();
  });
  image.src = ditherCanvas.dataset.src;
  if (image.complete && image.naturalWidth) {
    buildCells();
    draw();
  }

  window.addEventListener("resize", resize);
  window.addEventListener("pointermove", (event) => {
    pointerX = event.clientX / Math.max(1, window.innerWidth);
    pointerY = event.clientY / Math.max(1, window.innerHeight);
  });

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cancelAnimationFrame(animationFrame);
    } else {
      draw();
    }
  });
}

filters.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle("active", item === button));
    renderGrid();
  });
});

searchInput.addEventListener("input", renderGrid);
window.addEventListener("hashchange", showView);

renderGrid();
renderGallery();
initDitherHero();
showView();
