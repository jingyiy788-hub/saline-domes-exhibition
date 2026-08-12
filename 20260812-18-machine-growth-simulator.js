(() => {
  const machine = document.querySelector("#salt-machine");
  const mediaList = machine?.querySelector(".salt-media-list");
  if (!machine || !mediaList) return;

  const simulator = document.createElement("section");
  simulator.className = "growth-simulator";
  simulator.setAttribute("aria-labelledby", "growth-simulator-title");
  simulator.innerHTML = `
    <div class="growth-simulator-stage">
      <canvas id="growth-simulator-canvas" aria-label="Interactive salt growth field"></canvas>
      <p class="growth-simulator-readout" aria-live="polite"></p>
    </div>
    <div class="growth-simulator-panel">
      <div>
        <h4 id="growth-simulator-title">Teaching the field to grow</h4>
        <p>Environmental values do not select a finished form. They alter the rules through which agents branch, drift, accumulate and diffuse.</p>
        <div class="growth-control"><label for="growth-salt">Salt</label><output for="growth-salt">68</output><input id="growth-salt" data-key="salt" type="range" min="0" max="100" value="68"></div>
        <div class="growth-control"><label for="growth-wind">Wind</label><output for="growth-wind">34</output><input id="growth-wind" data-key="wind" type="range" min="-100" max="100" value="34"></div>
        <div class="growth-control"><label for="growth-heat">Heat</label><output for="growth-heat">52</output><input id="growth-heat" data-key="heat" type="range" min="0" max="100" value="52"></div>
        <div class="growth-control"><label for="growth-time">Growth time</label><output for="growth-time">72%</output><input id="growth-time" data-key="time" type="range" min="4" max="100" value="72"></div>
      </div>
      <button class="growth-reset" type="button">Reset parameters</button>
    </div>
  `;
  machine.insertBefore(simulator, mediaList);

  const canvas = simulator.querySelector("canvas");
  const context = canvas.getContext("2d");
  const readout = simulator.querySelector(".growth-simulator-readout");
  const inputs = [...simulator.querySelectorAll("input[type='range']")];
  const defaults = { salt: 68, wind: 34, heat: 52, time: 72 };
  const state = { ...defaults };
  let frame = 0;

  const hash = (value) => {
    const x = Math.sin(value * 12.9898) * 43758.5453;
    return x - Math.floor(x);
  };

  function resize() {
    const rect = canvas.getBoundingClientRect();
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.max(1, Math.round(rect.width * ratio));
    canvas.height = Math.max(1, Math.round(rect.height * ratio));
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    draw();
  }

  function drawBranch(startX, startY, seed, width, height) {
    const salt = state.salt / 100;
    const heat = state.heat / 100;
    const wind = state.wind / 100;
    const progress = state.time / 100;
    const steps = Math.floor((18 + salt * 56) * progress);
    let x = startX;
    let y = startY;
    let angle = -Math.PI / 2 + (hash(seed) - .5) * 1.7;
    const stepLength = 3.5 + heat * 4.8;

    context.beginPath();
    context.moveTo(x, y);
    for (let step = 0; step < steps; step += 1) {
      const noise = hash(seed * 101 + step * 7.13) - .5;
      angle += noise * (.38 + heat * .28) + wind * .035;
      x += Math.cos(angle) * stepLength + wind * 1.8;
      y += Math.sin(angle) * stepLength;
      if (x < 0 || x > width || y < 0 || y > height) break;
      context.lineTo(x, y);

      if (salt > .48 && step > 5 && step % Math.max(5, Math.round(12 - salt * 7)) === 0) {
        const radius = 1.2 + salt * 3.6 + heat * 1.2;
        context.moveTo(x + radius, y);
        context.arc(x, y, radius, 0, Math.PI * 2);
        context.moveTo(x, y);
      }
    }
    context.stroke();
  }

  function draw() {
    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    context.clearRect(0, 0, width, height);
    context.fillStyle = "#000";
    context.fillRect(0, 0, width, height);

    const salt = state.salt / 100;
    const heat = state.heat / 100;
    const growth = state.time / 100;
    const branches = Math.floor(8 + salt * 54);
    const diffusion = 55 + heat * 190;
    const centerX = width * (.48 + state.wind / 1000);
    const centerY = height * .58;

    const glow = context.createRadialGradient(centerX, centerY, 0, centerX, centerY, diffusion);
    glow.addColorStop(0, `rgba(168,199,185,${.1 + growth * .12})`);
    glow.addColorStop(1, "rgba(168,199,185,0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, width, height);

    context.lineWidth = .55 + salt * .65;
    context.strokeStyle = `rgba(242,241,236,${.26 + growth * .58})`;
    context.shadowColor = "rgba(168,199,185,.42)";
    context.shadowBlur = 1 + heat * 4;
    for (let index = 0; index < branches; index += 1) {
      const theta = hash(index * 4.21) * Math.PI * 2;
      const radius = Math.sqrt(hash(index * 9.73)) * diffusion * .58;
      drawBranch(centerX + Math.cos(theta) * radius, centerY + Math.sin(theta) * radius * .48, index + 1, width, height);
    }

    context.shadowBlur = 0;
    context.strokeStyle = "rgba(242,241,236,.13)";
    context.beginPath();
    context.ellipse(centerX, centerY, diffusion, diffusion * .48, 0, 0, Math.PI * 2);
    context.stroke();
    readout.textContent = `${branches} agents · diffusion ${Math.round(diffusion)} · frame ${String(frame).padStart(2, "0")}`;
    frame += 1;
  }

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      state[input.dataset.key] = Number(input.value);
      input.previousElementSibling.value = input.dataset.key === "time" ? `${input.value}%` : input.value;
      draw();
    });
  });

  simulator.querySelector(".growth-reset").addEventListener("click", () => {
    inputs.forEach((input) => {
      input.value = defaults[input.dataset.key];
      input.dispatchEvent(new Event("input"));
    });
  });

  new ResizeObserver(resize).observe(canvas.parentElement);
  resize();
  if (window.ScrollTrigger) requestAnimationFrame(() => ScrollTrigger.refresh());
})();
