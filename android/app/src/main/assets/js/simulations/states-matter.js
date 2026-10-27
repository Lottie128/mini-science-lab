// Mini Science Lab - States of Matter Particle Simulator
// Solid, Liquid, Gas physics engine with temperature slider & live phase transitions!

class StatesOfMatterSimulation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.temperature = 25; // in Celsius (-50°C to 150°C)
    this.state = 'liquid'; // solid, liquid, gas
    this.animFrame = null;
    this.particles = [];
    this.containerWidth = 380;
    this.containerHeight = 260;
  }

  init() {
    this.render();
    this.bindEvents();
    this.initParticles();
    this.startCanvas();
    window.storageManager.completeSimulation('states_of_matter', 30);
  }

  render() {
    this.container.innerHTML = `
      <div class="sim-wrapper">
        <div class="sim-header-bar">
          <div class="sim-title-group">
            <h3>🧊 States of Matter</h3>
            <p>Heat or cool particles to see phase changes in real-time!</p>
          </div>
          <div class="temp-badge-pill" id="temp-badge">
            <span id="temp-val">${this.temperature}°C</span> • <strong id="temp-phase-lbl">Liquid (Water)</strong>
          </div>
        </div>

        <!-- State Selector Tabs -->
        <div class="state-tabs-bar">
          <button class="state-tab ${this.state === 'solid' ? 'active' : ''}" data-state="solid">
            <span>🧊</span> Solid (-20°C)
          </button>
          <button class="state-tab ${this.state === 'liquid' ? 'active' : ''}" data-state="liquid">
            <span>💧</span> Liquid (25°C)
          </button>
          <button class="state-tab ${this.state === 'gas' ? 'active' : ''}" data-state="gas">
            <span>💨</span> Gas (120°C)
          </button>
        </div>

        <!-- Simulation Chamber Box -->
        <div class="chamber-box">
          <canvas id="matter-canvas" width="380" height="260"></canvas>
          <div class="chamber-beaker-overlay"></div>
        </div>

        <!-- Temperature Slider & Controls -->
        <div class="matter-controls-card">
          <div class="slider-control-row">
            <span class="therm-icon">❄️ Cold</span>
            <input type="range" min="-50" max="150" value="${this.temperature}" class="temp-slider" id="temp-slider" />
            <span class="therm-icon">🔥 Hot</span>
          </div>

          <div class="matter-quick-actions">
            <button class="btn-sm btn-subtle" id="btn-freeze">🧊 Freeze to Ice</button>
            <button class="btn-sm btn-subtle" id="btn-melt">💧 Room Temp</button>
            <button class="btn-sm btn-subtle" id="btn-boil">♨️ Boil to Steam</button>
          </div>
        </div>

        <!-- Educational description -->
        <div class="matter-info-card" id="matter-info-card">
          <!-- Filled dynamically -->
        </div>
      </div>
    `;
  }

  bindEvents() {
    const slider = this.container.querySelector('#temp-slider');
    const tabs = this.container.querySelectorAll('.state-tab');
    const btnFreeze = this.container.querySelector('#btn-freeze');
    const btnMelt = this.container.querySelector('#btn-melt');
    const btnBoil = this.container.querySelector('#btn-boil');

    if (slider) {
      slider.oninput = (e) => {
        this.setTemperature(parseInt(e.target.value, 10));
      };
    }

    tabs.forEach(tab => {
      tab.onclick = () => {
        window.soundEngine.click();
        const s = tab.dataset.state;
        if (s === 'solid') this.setTemperature(-20);
        else if (s === 'liquid') this.setTemperature(25);
        else if (s === 'gas') this.setTemperature(120);
      };
    });

    if (btnFreeze) {
      btnFreeze.onclick = () => {
        window.soundEngine.click();
        this.setTemperature(-30);
      };
    }
    if (btnMelt) {
      btnMelt.onclick = () => {
        window.soundEngine.click();
        this.setTemperature(25);
      };
    }
    if (btnBoil) {
      btnBoil.onclick = () => {
        window.soundEngine.electricBuzz();
        this.setTemperature(125);
      };
    }
  }

  setTemperature(temp) {
    this.temperature = temp;
    const slider = this.container.querySelector('#temp-slider');
    if (slider) slider.value = temp;

    // Determine state
    let prevState = this.state;
    if (temp <= 0) {
      this.state = 'solid';
    } else if (temp < 100) {
      this.state = 'liquid';
    } else {
      this.state = 'gas';
    }

    // Update UI tabs
    const tabs = this.container.querySelectorAll('.state-tab');
    tabs.forEach(t => t.classList.toggle('active', t.dataset.state === this.state));

    const tempVal = this.container.querySelector('#temp-val');
    const tempPhaseLbl = this.container.querySelector('#temp-phase-lbl');
    if (tempVal) tempVal.textContent = `${this.temperature}°C`;
    if (tempPhaseLbl) {
      tempPhaseLbl.textContent = this.state === 'solid' ? 'Solid (Ice)' : (this.state === 'liquid' ? 'Liquid (Water)' : 'Gas (Steam)');
    }

    this.updateInfoCard();
    if (prevState !== this.state) {
      window.soundEngine.blip();
    }
  }

  updateInfoCard() {
    const card = this.container.querySelector('#matter-info-card');
    if (!card) return;

    if (this.state === 'solid') {
      card.innerHTML = `
        <h4>🧊 Solid State (Rigid & Fixed)</h4>
        <p>In ice, water molecules have very low thermal energy. They lock tightly together in an orderly crystalline grid. They vibrate in place but cannot flow past each other. <strong>Fixed shape and fixed volume!</strong></p>
      `;
    } else if (this.state === 'liquid') {
      card.innerHTML = `
        <h4>💧 Liquid State (Flowing & Adaptable)</h4>
        <p>In liquid water, molecules have enough energy to break free from rigid crystal locks. They slide and roll over each other, taking the exact shape of their container. <strong>Definite volume, but adaptable shape!</strong></p>
      `;
    } else {
      card.innerHTML = `
        <h4>💨 Gas State (Fast & High Energy)</h4>
        <p>In steam gas, molecules are energized! They move at super high speeds, bouncing off container walls with high pressure and flying far apart. <strong>No fixed shape and expands to fill any volume!</strong></p>
      `;
    }
  }

  initParticles() {
    this.particles = [];
    const count = 54;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: 60 + (i % 9) * 28,
        y: 120 + Math.floor(i / 9) * 20,
        vx: (Math.random() - 0.5) * 2,
        vy: (Math.random() - 0.5) * 2,
        baseX: 70 + (i % 9) * 28,
        baseY: 130 + Math.floor(i / 9) * 20,
        r: 7
      });
    }
    this.updateInfoCard();
  }

  startCanvas() {
    const canvas = this.container.querySelector('#matter-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const loop = () => {
      // Clear chamber
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Draw glass beaker boundaries
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(30, 20);
      ctx.lineTo(30, height - 20);
      ctx.lineTo(width - 30, height - 20);
      ctx.lineTo(width - 30, 20);
      ctx.stroke();

      // Liquid / Heat color
      const pColor = this.state === 'solid' ? '#7dd3fc' : (this.state === 'liquid' ? '#38bdf8' : '#f97316');

      if (this.state === 'solid') {
        // Vibrating around lattice positions
        const jitter = Math.max(0.5, (this.temperature + 50) * 0.05);
        this.particles.forEach(p => {
          const currentX = p.baseX + (Math.random() - 0.5) * jitter;
          const currentY = p.baseY + (Math.random() - 0.5) * jitter;

          ctx.fillStyle = pColor;
          ctx.beginPath();
          ctx.arc(currentX, currentY, p.r, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(currentX - 2, currentY - 2, 2, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (this.state === 'liquid') {
        // Flowing near bottom half of container
        const speed = 1.2;
        const bottom = height - 25;
        const topBound = 110;

        this.particles.forEach(p => {
          p.x += p.vx * speed;
          p.y += p.vy * speed;

          // Wall bounces
          if (p.x < 40) { p.x = 40; p.vx *= -1; }
          if (p.x > width - 40) { p.x = width - 40; p.vx *= -1; }
          if (p.y < topBound) { p.y = topBound; p.vy *= -1; }
          if (p.y > bottom) { p.y = bottom; p.vy *= -1; }

          ctx.fillStyle = pColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });
      } else {
        // Gas bouncing at high speeds everywhere
        const speed = 4.0;
        const bottom = height - 25;

        this.particles.forEach(p => {
          p.x += p.vx * speed;
          p.y += p.vy * speed;

          if (p.x < 40) { p.x = 40; p.vx *= -1; }
          if (p.x > width - 40) { p.x = width - 40; p.vx *= -1; }
          if (p.y < 30) { p.y = 30; p.vy *= -1; }
          if (p.y > bottom) { p.y = bottom; p.vy *= -1; }

          ctx.fillStyle = pColor;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();

          // Sparkle tail
          ctx.fillStyle = 'rgba(254, 240, 138, 0.4)';
          ctx.beginPath();
          ctx.arc(p.x - p.vx * 2, p.y - p.vy * 2, 3, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      this.animFrame = requestAnimationFrame(loop);
    };

    this.animFrame = requestAnimationFrame(loop);
  }

  destroy() {
    if (this.animFrame) {
      cancelAnimationFrame(this.animFrame);
    }
  }
}

window.StatesOfMatterSimulation = StatesOfMatterSimulation;
