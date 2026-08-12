(() => {
  const nav = document.querySelector(".salt-story-nav");
  if (!nav) return;

  window.ScrollTrigger?.getById("relations-to-archive")?.kill();
  const relationImage = document.querySelector("#salt-relations .salt-media > img");
  if (relationImage && window.gsap) gsap.set(relationImage, { clearProps: "all" });

  const toggle = document.createElement("button");
  toggle.className = "chapter-nav-toggle";
  toggle.type = "button";
  toggle.setAttribute("aria-label", "Collapse chapter navigation");
  toggle.setAttribute("aria-expanded", "true");
  nav.append(toggle);

  let lastY = window.scrollY;
  let manual = false;
  const setCollapsed = (collapsed) => {
    document.body.classList.toggle("chapter-nav-collapsed", collapsed);
    toggle.setAttribute("aria-expanded", String(!collapsed));
    toggle.setAttribute("aria-label", `${collapsed ? "Expand" : "Collapse"} chapter navigation`);
  };

  toggle.addEventListener("click", () => {
    manual = true;
    setCollapsed(!document.body.classList.contains("chapter-nav-collapsed"));
  });

  window.addEventListener("scroll", () => {
    const currentY = window.scrollY;
    if (!manual && currentY > 180) setCollapsed(currentY > lastY);
    if (currentY < 80) {
      manual = false;
      setCollapsed(false);
    }
    lastY = currentY;
  }, { passive: true });

  const placeholderPlans = [
    ["salt-origin", "wide", "Regional aerial sequence", "Add a clean aerial image without presentation-board text."],
    ["salt-relations", "portrait", "Field sample or material trace", "Add a close photograph that connects the territorial map to the six environmental layers."],
    ["salt-machine", "square", "Simulation detail", "Add one isolated generation or agent-growth crop instead of another full PDF board."],
    ["salt-host", "portrait", "Framework detail", "Add a vertical construction detail showing where salt meets the artificial host."],
    ["salt-inhabiting", "wide", "Human-scale occupation", "Add a tightly cropped view of body, opening and salt surface."],
  ];

  placeholderPlans.forEach(([id, shape, title, description]) => {
    const section = document.getElementById(id);
    if (!section) return;
    const grid = document.createElement("div");
    grid.className = "chapter-placeholder-grid";
    grid.innerHTML = `
      <figure class="chapter-placeholder chapter-placeholder--${shape}">
        <div class="chapter-placeholder-image" role="img" aria-label="Placeholder: ${title}"></div>
        <figcaption><strong>Image needed</strong>${description}</figcaption>
      </figure>
    `;
    section.append(grid);
  });

  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add("(prefers-reduced-motion: no-preference)", () => {
    document.querySelectorAll(".salt-scene-head > div").forEach((copy) => {
      gsap.from(copy.children, {
        y: 16,
        autoAlpha: 0,
        duration: .7,
        stagger: .09,
        ease: "power2.out",
        scrollTrigger: {
          trigger: copy,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      });
    });
  });

  requestAnimationFrame(() => ScrollTrigger.refresh());
})();
