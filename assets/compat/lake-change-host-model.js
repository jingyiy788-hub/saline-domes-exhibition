(() => {
  const origin = document.querySelector("#salt-origin .salt-media-list") || document.getElementById("salt-origin");
  const host = document.querySelector("#salt-host .salt-media-list") || document.getElementById("salt-host");

  if (origin) {
    const figure = document.createElement("figure");
    figure.className = "salt-media wide added-origin-film";
    figure.innerHTML = `
      <video src="./assets/videos/salt-lake-change.mp4" muted loop playsinline preload="metadata" controls aria-label="Huama Salt Lake changing through time"></video>
      <figcaption><span>CHAPTER .02</span><strong>Salt lake transformation through time</strong></figcaption>`;
    origin.append(figure);

    const video = figure.querySelector("video");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: .35 });
    observer.observe(video);
  }

  if (host) {
    const placeholder = host.querySelector(".chapter-placeholder-grid");
    const figure = document.createElement("figure");
    figure.className = "salt-media wide added-host-model";
    figure.innerHTML = `
      <img src="./assets/images/host/crystallised-host-model.png" alt="Physical host model covered by salt crystallisation" loading="lazy" decoding="async" />
      <figcaption><span>CHAPTER .06</span><strong>Crystallised framework as a material host</strong></figcaption>`;
    if (placeholder) placeholder.replaceWith(figure);
    else host.append(figure);
  }

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".added-origin-film video, .added-host-model img").forEach((element, index) => {
      gsap.from(element, {
        autoAlpha: 0,
        y: 26,
        scale: 1.018,
        duration: 1.1,
        ease: "power2.out",
        scrollTrigger: {
          id: `v28-added-media-${index}`,
          trigger: element,
          start: "top 84%",
          toggleActions: "play none none reverse"
        }
      });
    });
    ScrollTrigger.refresh();
  }

  document.documentElement.dataset.layoutVersion = "20260814-28-lake-change-host-model";
})();
