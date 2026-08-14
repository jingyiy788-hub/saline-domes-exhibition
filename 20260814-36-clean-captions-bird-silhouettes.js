(() => {
  if (!window.gsap || !window.ScrollTrigger) return;
  gsap.registerPlugin(ScrollTrigger);
  document.querySelector(".v35-slot-0801 .blank-sheet-number")?.remove();

  const breath = document.getElementById("salt-breath");
  const inner = breath?.querySelector(".breath-finale-inner");
  const image = breath?.querySelector(".breath-finale-image");
  if (inner && image) {
    gsap.set(inner, { clearProps: "width" });
    image.style.objectFit = "cover";
    image.style.objectPosition = "center 52%";
  }

  if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.querySelectorAll(".breath-bird-v35").forEach((bird, index) => {
      const left = bird.querySelector(".wing-left");
      const right = bird.querySelector(".wing-right");
      gsap.killTweensOf([left, right]);
      gsap.fromTo(left, { rotation: -16, scaleY: .72 }, {
        rotation: 18, scaleY: 1.05, duration: .34 + index * .018, repeat: -1, yoyo: true, ease: "sine.inOut"
      });
      gsap.fromTo(right, { rotation: 16, scaleY: .72 }, {
        rotation: -18, scaleY: 1.05, duration: .34 + index * .018, repeat: -1, yoyo: true, ease: "sine.inOut"
      });
    });
  }

  requestAnimationFrame(() => ScrollTrigger.refresh());
})();
