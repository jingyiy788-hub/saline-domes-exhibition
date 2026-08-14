(() => {
  const origin = document.getElementById("salt-origin");
  const machine = document.getElementById("salt-machine");
  const host = document.getElementById("salt-host");

  // 02 — concise explanation beneath the territorial map.
  const mapCaption = origin?.querySelector(".relations-map-reveal figcaption");
  if (mapCaption) {
    let paragraph = mapCaption.querySelector("p");
    if (!paragraph) {
      paragraph = document.createElement("p");
      mapCaption.append(paragraph);
    }
    paragraph.textContent = "The Dingbian salt-lake group sits between extraction landscapes and surrounding settlements. Prevailing winds carry saline dust across this shared territorial field.";
  }

  // 09 — delete the selected Machine image.
  machine?.querySelector(".salt-media-list > figure.salt-media.right:nth-of-type(3)")?.remove();

  // 10–11 — capture first, then move each selected Host image by one slot.
  const hostDown = host?.querySelector(".salt-media-list > figure.salt-media.left:nth-of-type(3)");
  const hostUp = host?.querySelector(".salt-media-list > figure.salt-media.right:nth-of-type(6)");
  const next = hostDown?.nextElementSibling;
  if (hostDown && next) next.after(hostDown);
  const previous = hostUp?.previousElementSibling;
  if (hostUp && previous) previous.before(hostUp);

  requestAnimationFrame(() => window.ScrollTrigger?.refresh(true));
})();
