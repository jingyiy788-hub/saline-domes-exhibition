(() => {
  const section = document.querySelector("#salt-breath");
  if (!section) return;

  section.className = "salt-scene breath-finale";
  section.setAttribute("aria-labelledby", "breath-finale-title");
  section.innerHTML = `
    <div class="breath-finale-inner">
      <img class="breath-finale-image" src="./assets/term3-finalpre/page-40.jpg" alt="The Saline Domes standing within the salt-lake horizon">
      <div class="breath-finale-fog" aria-hidden="true"></div>
      <div class="breath-finale-shade" aria-hidden="true"></div>
      <div class="breath-horizon-mask" aria-hidden="true"></div>
      <div class="breath-copy">
        <small>Chapter .09 / The breath of the salt lake</small>
        <h3 id="breath-finale-title">The lake does not hold its breath.</h3>
        <p>Salt crystallises, collapses, dissolves and returns. Architecture remains only as a host for this territorial metabolism.</p>
      </div>
      <p class="breath-copy-line">The building recedes.<br>The lake continues.</p>
      <p class="breath-copy-final">A horizon, still breathing</p>
      <span class="breath-scroll-note">Scroll to breathe</span>
    </div>
  `;

  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);

  const inner = section.querySelector(".breath-finale-inner");
  const image = section.querySelector(".breath-finale-image");
  const fog = section.querySelector(".breath-finale-fog");
  const intro = section.querySelector(".breath-copy");
  const line = section.querySelector(".breath-copy-line");
  const finalText = section.querySelector(".breath-copy-final");
  const mask = section.querySelector(".breath-horizon-mask");
  const note = section.querySelector(".breath-scroll-note");
  const media = gsap.matchMedia();

  media.add({
    desktop: "(min-width: 761px)",
    reduceMotion: "(prefers-reduced-motion: reduce)",
  }, ({ conditions }) => {
    if (conditions.reduceMotion) {
      gsap.set([intro, image], { autoAlpha: 1 });
      gsap.set([fog, line, finalText, mask], { autoAlpha: 0 });
      return;
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        id: "breathing-finale",
        trigger: section,
        start: "top 64px",
        end: conditions.desktop ? "+=2800" : "+=1700",
        pin: inner,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(image, { scale: 1.11, filter: "saturate(.62) contrast(.9) brightness(.8)", duration: 1, ease: "sine.inOut" }, 0)
      .to(fog, { autoAlpha: .62, scale: 1.2, duration: 1, ease: "sine.inOut" }, 0)
      .to(image, { scale: 1.055, duration: 1, ease: "sine.inOut" }, 1)
      .to(fog, { autoAlpha: .16, scale: 1.08, duration: 1, ease: "sine.inOut" }, 1)
      .to(intro, { y: -24, autoAlpha: 0, duration: .45, ease: "none" }, 1.25)
      .to(line, { autoAlpha: 1, duration: .5, ease: "none" }, 1.55)
      .to(image, { scale: 1.095, duration: .9, ease: "sine.inOut" }, 1.55)
      .to(fog, { autoAlpha: .48, duration: .7, ease: "sine.inOut" }, 1.6)
      .to(line, { autoAlpha: 0, filter: "blur(10px)", duration: .45, ease: "none" }, 2.25)
      .to(fog, { autoAlpha: 0, duration: .55, ease: "none" }, 2.35)
      .to(image, { scale: 1, filter: "saturate(.25) contrast(1.05) brightness(.48)", duration: .8, ease: "none" }, 2.35)
      .to(mask, { autoAlpha: 1, duration: .65, ease: "none" }, 2.55)
      .to(note, { autoAlpha: 0, duration: .2, ease: "none" }, 2.55)
      .to(finalText, { autoAlpha: 1, duration: .45, ease: "none" }, 2.9);

    if (conditions.desktop) {
      const moveX = gsap.quickTo(image, "x", { duration: 1.4, ease: "power2.out" });
      const moveY = gsap.quickTo(image, "y", { duration: 1.4, ease: "power2.out" });
      const fogX = gsap.quickTo(fog, "x", { duration: 1.8, ease: "power2.out" });
      const onMove = (event) => {
        const x = event.clientX / window.innerWidth - .5;
        const y = event.clientY / window.innerHeight - .5;
        moveX(x * 14);
        moveY(y * 9);
        fogX(x * -22);
      };
      section.addEventListener("pointermove", onMove);
      return () => section.removeEventListener("pointermove", onMove);
    }
  });

  const refresh = () => requestAnimationFrame(() => ScrollTrigger.refresh());
  image.addEventListener("load", refresh, { once: true });
  refresh();
})();
