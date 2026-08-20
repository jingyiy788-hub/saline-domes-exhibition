document.addEventListener("DOMContentLoaded", () => {
  const machine = document.querySelector("#salt-machine");
  const host = document.querySelector("#salt-host");
  const precedent = document.querySelector("#salt-origin .chapter02-context-page");
  const metabolic = document.querySelector("#salt-origin .chapter02-transition-page");
  if (!machine || !host || !precedent || !metabolic) return;

  const interlude = document.createElement("section");
  interlude.className = "dome-host-interlude";
  interlude.setAttribute("aria-labelledby", "dome-host-interlude-title");
  interlude.innerHTML = `
    <header class="dome-host-interlude-head">
      <span>INTERLUDE</span>
      <h3 id="dome-host-interlude-title">FROM DOME TO HOST</h3>
      <p>From a sealed planetary enclosure to an open, multi-species metabolic infrastructure.</p>
    </header>
    <div class="dome-host-interlude-pages"></div>
  `;

  precedent.classList.add("interlude-page", "interlude-page--precedent");
  metabolic.classList.add("interlude-page", "interlude-page--metabolic");

  const precedentCaption = precedent.querySelector("figcaption");
  if (precedentCaption) precedentCaption.innerHTML = `
    <small>INTERLUDE / HISTORICAL PROTOTYPE</small>
    <strong>Montreal Biosphere: the dome as a historical prototype</strong>
    <p>Efficiency, enclosure and planetary management define the conventional dome as a controlled interior.</p>
  `;

  const metabolicCaption = metabolic.querySelector("figcaption");
  if (metabolicCaption) metabolicCaption.innerHTML = `
    <small>INTERLUDE / CONCEPTUAL SHIFT</small>
    <strong>Metabolic Infrastructure</strong>
    <p>The closed dome is reinterpreted as an open host shaped by salinity, ecological feedback and non-human agency.</p>
  `;

  const pages = interlude.querySelector(".dome-host-interlude-pages");
  pages.append(precedent, metabolic);
  host.before(interlude);

  if (window.gsap && window.ScrollTrigger && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".interlude-page", interlude).forEach((page) => {
      gsap.fromTo(page,
        { autoAlpha: 0, y: 34 },
        { autoAlpha: 1, y: 0, duration: .7, ease: "power2.out", scrollTrigger: { trigger: page, start: "top 82%", once: true } }
      );
    });
  }

  requestAnimationFrame(() => window.ScrollTrigger?.refresh());
});
