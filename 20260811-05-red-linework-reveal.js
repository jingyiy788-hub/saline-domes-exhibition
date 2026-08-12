(() => {
  const canvas = document.querySelector("#linework-canvas");
  const overview = document.querySelector("#project-overview");
  if (!canvas || !overview) return;

  const context = canvas.getContext("2d");
  const redLinework = new Image();
  let width = 0;
  let height = 0;
  let bounds = null;

  function resize() {
    const rect = overview.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = Math.max(1, Math.round(rect.width));
    height = Math.max(1, Math.round(rect.height));
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    if (redLinework.naturalWidth) {
      const scale = Math.max(width / redLinework.naturalWidth, height / redLinework.naturalHeight) * 1.05;
      const drawWidth = redLinework.naturalWidth * scale;
      const drawHeight = redLinework.naturalHeight * scale;
      bounds = {
        x: (width - drawWidth) / 2,
        y: (height - drawHeight) / 2,
        width: drawWidth,
        height: drawHeight,
      };
    }
    context.clearRect(0, 0, width, height);
  }

  function reveal(event) {
    if (!bounds) return;
    const rect = overview.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const radius = Math.max(70, Math.min(130, Math.min(width, height) * .12));

    context.clearRect(0, 0, width, height);
    context.globalCompositeOperation = "source-over";
    context.drawImage(redLinework, bounds.x, bounds.y, bounds.width, bounds.height);
    context.globalCompositeOperation = "destination-in";

    const mask = context.createRadialGradient(x, y, 0, x, y, radius);
    mask.addColorStop(0, "rgba(255,255,255,1)");
    mask.addColorStop(.3, "rgba(255,255,255,.96)");
    mask.addColorStop(.68, "rgba(255,255,255,.32)");
    mask.addColorStop(1, "rgba(255,255,255,0)");
    context.fillStyle = mask;
    context.fillRect(0, 0, width, height);
    context.globalCompositeOperation = "source-over";
    canvas.dataset.active = "true";
  }

  redLinework.addEventListener("load", resize);
  redLinework.src = "./assets/0621a-linework/0621a-user-red.png";
  overview.addEventListener("pointermove", reveal);
  overview.addEventListener("pointerleave", () => {
    context.clearRect(0, 0, width, height);
    canvas.dataset.active = "false";
  });
  window.addEventListener("resize", resize);
})();

