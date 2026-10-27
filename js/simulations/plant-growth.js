// Mini Science Lab - Interactive Plant Growth & Botany Simulation
// Watch a seed germinate, spread roots, sprout leaves, bloom flowers, and produce ripe fruit!

class PlantGrowthSimulation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.stage = 1; // 1: Seed, 2: Germination/Roots, 3: Sprout, 4: Stem & Leaves, 5: Flower, 6: Fruit
    this.sunlight = 'full'; // 'low', 'medium', 'full'
    this.moisture = 65; // percentage
    this.isWatering = false;
    this.waterTimer = null;
    this.growthAnimation = null;
  }

  init() {
    this.render();
    this.bindEvents();
    this.updateVisuals();
  }

  destroy() {
    if (this.waterTimer) clearInterval(this.waterTimer);
  }

  render() {
    this.container.innerHTML = `
      <div class="sim-wrapper">
        <div class="sim-header-bar">
          <div class="sim-title-group">
            <h3>🌱 Plant Growth & Botany Lab</h3>
            <p>Give your plant sunlight and water to watch it sprout, bloom and grow fruit!</p>
          </div>
          <button class="btn-sim-reset" id="btn-plant-reset" title="Reset to Seed">🔄 Reset</button>
        </div>

        <!-- Simulation Visual Stage -->
        <div class="sim-canvas-box plant-garden-box" id="plant-garden-area">
          <svg viewBox="0 0 400 340" class="plant-svg" id="plant-svg">
            <defs>
              <!-- Sky & Sunlight Gradients -->
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#bae6fd" id="sky-top" />
                <stop offset="100%" stop-color="#e0f2fe" id="sky-bot" />
              </linearGradient>

              <!-- Soil Gradient -->
              <linearGradient id="soilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stop-color="#854d0e" />
                <stop offset="25%" stop-color="#713f12" />
                <stop offset="100%" stop-color="#451a03" />
              </linearGradient>

              <!-- Leaf Gradient -->
              <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#4ade80" />
                <stop offset="100%" stop-color="#15803d" />
              </linearGradient>

              <!-- Flower Petal Gradient -->
              <radialGradient id="petalGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="#f43f5e" />
                <stop offset="100%" stop-color="#be123c" />
              </radialGradient>

              <!-- Tomato / Fruit Gradient -->
              <radialGradient id="fruitGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stop-color="#f87171" />
                <stop offset="60%" stop-color="#ef4444" />
                <stop offset="100%" stop-color="#b91c1c" />
              </radialGradient>
            </defs>

            <!-- Sky Background -->
            <rect x="0" y="0" width="400" height="230" fill="url(#skyGrad)" id="sky-rect" />

            <!-- Sun -->
            <g id="plant-sun-group" transform="translate(340, 50)" style="cursor: pointer;">
              <circle cx="0" cy="0" r="34" fill="#fef08a" opacity="0.4" id="sun-halo" />
              <circle cx="0" cy="0" r="24" fill="#fbbf24" stroke="#f59e0b" stroke-width="2" id="sun-core" />
              <!-- Sun Rays -->
              <g stroke="#f59e0b" stroke-width="3" stroke-linecap="round" id="sun-rays">
                <line x1="0" y1="-32" x2="0" y2="-40" />
                <line x1="0" y1="32" x2="0" y2="40" />
                <line x1="-32" y1="0" x2="-40" y2="0" />
                <line x1="32" y1="0" x2="40" y2="0" />
                <line x1="-22" y1="-22" x2="-28" y2="-28" />
                <line x1="22" y1="22" x2="28" y2="28" />
                <line x1="-22" y1="22" x2="-28" y2="28" />
                <line x1="22" y1="-22" x2="28" y2="-28" />
              </g>
            </g>

            <!-- Fluffy Clouds -->
            <g fill="#ffffff" opacity="0.85">
              <path d="M 40 50 Q 50 35 68 40 Q 85 30 100 45 Q 115 45 118 60 Q 110 70 40 70 Z" />
              <path d="M 190 75 Q 200 62 215 65 Q 230 55 245 70 Q 255 70 258 80 Q 250 90 190 90 Z" opacity="0.6" />
            </g>

            <!-- Soil & Pot Bed -->
            <rect x="0" y="230" width="400" height="110" fill="url(#soilGrad)" />
            <!-- Soil Texture Pebbles -->
            <circle cx="60" cy="255" r="4" fill="#3f1c07" opacity="0.6" />
            <circle cx="120" cy="275" r="5" fill="#3f1c07" opacity="0.6" />
            <circle cx="280" cy="260" r="4" fill="#3f1c07" opacity="0.6" />
            <circle cx="330" cy="285" r="6" fill="#3f1c07" opacity="0.6" />
            <circle cx="210" cy="305" r="5" fill="#3f1c07" opacity="0.6" />
            <line x1="0" y1="230" x2="400" y2="230" stroke="#a16207" stroke-width="4" />

            <!-- UNDERGROUND ROOTS (Stage 2+) -->
            <g id="plant-roots" opacity="0">
              <!-- Taproot -->
              <path d="M 200 232 Q 200 260 200 300" stroke="#fed7aa" stroke-width="4" stroke-linecap="round" fill="none" />
              <path d="M 200 250 Q 180 270 160 285" stroke="#fed7aa" stroke-width="2.5" stroke-linecap="round" fill="none" />
              <path d="M 200 265 Q 220 280 235 295" stroke="#fed7aa" stroke-width="2.5" stroke-linecap="round" fill="none" />
              <path d="M 200 280 Q 185 295 175 315" stroke="#fed7aa" stroke-width="2" stroke-linecap="round" fill="none" />
              <path d="M 200 290 Q 215 305 225 320" stroke="#fed7aa" stroke-width="2" stroke-linecap="round" fill="none" />
            </g>

            <!-- SEED (Stage 1 & 2) -->
            <g id="plant-seed" transform="translate(200, 240)">
              <ellipse cx="0" cy="0" rx="9" ry="6" fill="#78350f" stroke="#451a03" stroke-width="1.5" />
              <path d="M -3 -2 Q 0 -5 5 -1" stroke="#fef3c7" stroke-width="1.5" fill="none" />
            </g>

            <!-- ABOVE GROUND PLANT STEM & LEAVES -->
            <g id="plant-above-ground">
              <!-- Stem -->
              <path id="plant-stem" d="M 200 230 L 200 230" stroke="#16a34a" stroke-width="6" stroke-linecap="round" fill="none" />

              <!-- Lower Leaves (Stage 3+) -->
              <g id="leaves-lower" opacity="0">
                <path d="M 200 195 Q 160 185 145 195 Q 165 215 200 198" fill="url(#leafGrad)" stroke="#15803d" stroke-width="1" />
                <path d="M 200 195 Q 240 185 255 195 Q 235 215 200 198" fill="url(#leafGrad)" stroke="#15803d" stroke-width="1" />
              </g>

              <!-- Middle Branch Leaves (Stage 4+) -->
              <g id="leaves-middle" opacity="0">
                <path d="M 200 155 Q 155 135 130 145 Q 155 175 200 158" fill="url(#leafGrad)" stroke="#15803d" stroke-width="1.5" />
                <path d="M 200 155 Q 245 135 270 145 Q 245 175 200 158" fill="url(#leafGrad)" stroke="#15803d" stroke-width="1.5" />
                <!-- Vein details -->
                <line x1="200" y1="155" x2="140" y2="145" stroke="#86efac" stroke-width="1" />
                <line x1="200" y1="155" x2="260" y2="145" stroke="#86efac" stroke-width="1" />
              </g>

              <!-- Upper Foliage (Stage 4+) -->
              <g id="leaves-upper" opacity="0">
                <path d="M 200 120 Q 170 100 150 108 Q 175 130 200 122" fill="url(#leafGrad)" stroke="#15803d" stroke-width="1" />
                <path d="M 200 120 Q 230 100 250 108 Q 225 130 200 122" fill="url(#leafGrad)" stroke="#15803d" stroke-width="1" />
              </g>

              <!-- FLOWER BLOOM (Stage 5) -->
              <g id="plant-flower" transform="translate(200, 100)" opacity="0">
                <!-- 5 Petals -->
                <ellipse cx="0" cy="-18" rx="10" ry="14" fill="url(#petalGrad)" />
                <ellipse cx="17" cy="-6" rx="14" ry="10" fill="url(#petalGrad)" />
                <ellipse cx="11" cy="15" rx="13" ry="10" fill="url(#petalGrad)" />
                <ellipse cx="-11" cy="15" rx="13" ry="10" fill="url(#petalGrad)" />
                <ellipse cx="-17" cy="-6" rx="14" ry="10" fill="url(#petalGrad)" />
                <!-- Golden Pollen Center -->
                <circle cx="0" cy="0" r="10" fill="#fbbf24" stroke="#d97706" stroke-width="2" />
                <circle cx="0" cy="0" r="4" fill="#fef08a" />
              </g>

              <!-- RIPE FRUIT (Stage 6) -->
              <g id="plant-fruit" transform="translate(200, 115)" opacity="0">
                <!-- Calyx Green Leaves -->
                <path d="M -15 -14 Q 0 -8 15 -14 Q 10 -4 0 0 Q -10 -4 -15 -14" fill="#16a34a" />
                <line x1="0" y1="-8" x2="0" y2="-18" stroke="#15803d" stroke-width="3" stroke-linecap="round" />
                <!-- Red Juicy Fruit -->
                <circle cx="0" cy="12" r="22" fill="url(#fruitGrad)" stroke="#991b1b" stroke-width="2" />
                <!-- Highlights & Seeds -->
                <ellipse cx="-6" cy="6" rx="5" ry="3" fill="#ffffff" opacity="0.4" />
                <circle cx="6" cy="10" r="1.5" fill="#fef08a" />
                <circle cx="-3" cy="16" r="1.5" fill="#fef08a" />
                <circle cx="5" cy="20" r="1.5" fill="#fef08a" />
              </g>

              <!-- Friendly Pollinating Bee (Stage 5 & 6) -->
              <g id="plant-bee" transform="translate(140, 75)" opacity="0">
                <ellipse cx="0" cy="0" rx="9" ry="6" fill="#facc15" stroke="#1e293b" stroke-width="1.5" />
                <!-- Bee Stripes -->
                <line x1="-3" y1="-6" x2="-3" y2="6" stroke="#1e293b" stroke-width="2" />
                <line x1="2" y1="-6" x2="2" y2="6" stroke="#1e293b" stroke-width="2" />
                <!-- Wings -->
                <ellipse cx="-2" cy="-9" rx="5" ry="4" fill="#e0f2fe" opacity="0.8" stroke="#38bdf8" stroke-width="1" />
                <ellipse cx="3" cy="-9" rx="4" ry="3" fill="#e0f2fe" opacity="0.8" stroke="#38bdf8" stroke-width="1" />
                <!-- Stinger -->
                <polygon points="-9,-1 -11,0 -9,1" fill="#1e293b" />
              </g>
            </g>

            <!-- RAINDROPS LAYER (When watering) -->
            <g id="plant-rain-layer" opacity="0">
              <line x1="170" y1="120" x2="165" y2="135" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
              <line x1="190" y1="100" x2="185" y2="115" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
              <line x1="210" y1="110" x2="205" y2="125" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
              <line x1="230" y1="130" x2="225" y2="145" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
              <line x1="180" y1="150" x2="175" y2="165" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
              <line x1="220" y1="160" x2="215" y2="175" stroke="#38bdf8" stroke-width="2" stroke-linecap="round" />
            </g>
          </svg>

          <!-- Current Stage Status Banner -->
          <div class="plant-status-overlay" id="plant-status-pill">
            <span class="status-indicator-dot" style="background:#10b981;"></span>
            <span id="plant-stage-title">Stage 1: Seed in Soil</span>
          </div>
        </div>

        <!-- Stage Scrubber Progress Bar -->
        <div class="plant-stage-stepper">
          <div class="stepper-track">
            <div class="stepper-fill" id="stage-stepper-fill" style="width: 16%;"></div>
          </div>
          <div class="stepper-dots-row">
            ${[1, 2, 3, 4, 5, 6].map(st => `
              <button class="step-dot-btn ${st === 1 ? 'active' : ''}" data-step="${st}" title="Stage ${st}">
                ${st}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Interactive Plant Care Toolbar -->
        <div class="sim-controls-panel">
          <div class="plant-actions-grid">
            <!-- 1. Water Plant -->
            <button class="btn-plant-action" id="btn-water-plant">
              <span class="action-icon">🌧️</span>
              <span class="action-label">Water Plant</span>
              <span class="action-stat" id="lbl-moisture">Moisture: 65%</span>
            </button>

            <!-- 2. Sun Lighting -->
            <button class="btn-plant-action" id="btn-toggle-sun">
              <span class="action-icon">☀️</span>
              <span class="action-label">Sunlight</span>
              <span class="action-stat" id="lbl-sunlight">Full Sun</span>
            </button>

            <!-- 3. Next Growth Beat -->
            <button class="btn-primary-fun" id="btn-next-stage">
              Grow Next Stage 🌱
            </button>
          </div>

          <!-- Scientific Botany Explanation Box -->
          <div class="sim-fact-callout" id="plant-fact-card">
            <div class="callout-icon">💡</div>
            <div class="callout-text">
              <strong id="plant-fact-heading">Germination Begins!</strong>
              <p id="plant-fact-body">A seed contains a tiny baby plant (embryo) and stored food. When it absorbs warm water from the soil, it awakens!</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const bind = (id, fn) => {
      const el = this.container.querySelector(id);
      if (el) el.onclick = fn;
    };

    bind('#btn-plant-reset', () => this.reset());
    bind('#btn-next-stage', () => this.advanceStage());

    // Step dots
    this.container.querySelectorAll('.step-dot-btn').forEach(btn => {
      btn.onclick = () => {
        const targetStep = parseInt(btn.dataset.step, 10);
        this.setStage(targetStep);
      };
    });

    // Water button
    bind('#btn-water-plant', () => this.triggerWatering());

    // Sunlight toggle
    bind('#btn-toggle-sun', () => this.toggleSunlight());
    bind('#plant-sun-group', () => this.toggleSunlight());
  }

  setStage(newStage) {
    if (newStage < 1 || newStage > 6) return;
    this.stage = newStage;
    window.soundEngine.blip();
    this.updateVisuals();
    this.checkCompletion();
  }

  advanceStage() {
    if (this.stage < 6) {
      this.setStage(this.stage + 1);
    } else {
      this.setStage(1);
    }
  }

  reset() {
    window.soundEngine.click();
    this.stage = 1;
    this.moisture = 65;
    this.sunlight = 'full';
    this.updateVisuals();
  }

  triggerWatering() {
    if (this.isWatering) return;
    this.isWatering = true;
    window.soundEngine.bubble();

    const rainLayer = this.container.querySelector('#plant-rain-layer');
    if (rainLayer) rainLayer.setAttribute('opacity', '1');

    this.moisture = Math.min(100, this.moisture + 20);
    const lbl = this.container.querySelector('#lbl-moisture');
    if (lbl) lbl.textContent = `Moisture: ${this.moisture}%`;

    setTimeout(() => {
      if (rainLayer) rainLayer.setAttribute('opacity', '0');
      this.isWatering = false;
    }, 1200);
  }

  toggleSunlight() {
    window.soundEngine.click();
    const modes = ['low', 'medium', 'full'];
    const curIdx = modes.indexOf(this.sunlight);
    this.sunlight = modes[(curIdx + 1) % modes.length];

    const sunHalo = this.container.querySelector('#sun-halo');
    const sunRays = this.container.querySelector('#sun-rays');
    const skyTop = this.container.querySelector('#sky-top');
    const lbl = this.container.querySelector('#lbl-sunlight');

    if (this.sunlight === 'low') {
      if (sunHalo) sunHalo.setAttribute('opacity', '0.1');
      if (sunRays) sunRays.setAttribute('opacity', '0.2');
      if (skyTop) skyTop.setAttribute('stop-color', '#94a3b8');
      if (lbl) lbl.textContent = 'Low Sun ☁️';
    } else if (this.sunlight === 'medium') {
      if (sunHalo) sunHalo.setAttribute('opacity', '0.3');
      if (sunRays) sunRays.setAttribute('opacity', '0.6');
      if (skyTop) skyTop.setAttribute('stop-color', '#7dd3fc');
      if (lbl) lbl.textContent = 'Warm Sun 🌤️';
    } else {
      if (sunHalo) sunHalo.setAttribute('opacity', '0.5');
      if (sunRays) sunRays.setAttribute('opacity', '1');
      if (skyTop) skyTop.setAttribute('stop-color', '#38bdf8');
      if (lbl) lbl.textContent = 'Full Sun ☀️';
    }
  }

  updateVisuals() {
    // Elements
    const seed = this.container.querySelector('#plant-seed');
    const roots = this.container.querySelector('#plant-roots');
    const stem = this.container.querySelector('#plant-stem');
    const leavesLower = this.container.querySelector('#leaves-lower');
    const leavesMiddle = this.container.querySelector('#leaves-middle');
    const leavesUpper = this.container.querySelector('#leaves-upper');
    const flower = this.container.querySelector('#plant-flower');
    const fruit = this.container.querySelector('#plant-fruit');
    const bee = this.container.querySelector('#plant-bee');

    const titleEl = this.container.querySelector('#plant-stage-title');
    const headingEl = this.container.querySelector('#plant-fact-heading');
    const bodyEl = this.container.querySelector('#plant-fact-body');
    const stepperFill = this.container.querySelector('#stage-stepper-fill');
    const nextBtn = this.container.querySelector('#btn-next-stage');

    // Stepper dots
    this.container.querySelectorAll('.step-dot-btn').forEach(btn => {
      const step = parseInt(btn.dataset.step, 10);
      btn.classList.toggle('active', step === this.stage);
      btn.classList.toggle('completed', step < this.stage);
    });

    if (stepperFill) {
      stepperFill.style.width = `${Math.round((this.stage / 6) * 100)}%`;
    }

    // Stages
    switch (this.stage) {
      case 1:
        if (seed) seed.setAttribute('opacity', '1');
        if (roots) roots.setAttribute('opacity', '0');
        if (stem) stem.setAttribute('d', 'M 200 230 L 200 230');
        if (leavesLower) leavesLower.setAttribute('opacity', '0');
        if (leavesMiddle) leavesMiddle.setAttribute('opacity', '0');
        if (leavesUpper) leavesUpper.setAttribute('opacity', '0');
        if (flower) flower.setAttribute('opacity', '0');
        if (fruit) fruit.setAttribute('opacity', '0');
        if (bee) bee.setAttribute('opacity', '0');

        if (titleEl) titleEl.textContent = 'Stage 1: Seed in Soil';
        if (headingEl) headingEl.textContent = 'Dormant Seed Ready to Sprout';
        if (bodyEl) bodyEl.textContent = 'A seed has a protective seed coat, a tiny plant embryo, and endosperm (stored food). It needs water and warmth to wake up!';
        if (nextBtn) nextBtn.textContent = 'Grow Next: Germination 🌱';
        break;

      case 2:
        if (seed) seed.setAttribute('opacity', '1');
        if (roots) roots.setAttribute('opacity', '0.6');
        if (stem) stem.setAttribute('d', 'M 200 230 L 200 218');
        if (leavesLower) leavesLower.setAttribute('opacity', '0');
        if (leavesMiddle) leavesMiddle.setAttribute('opacity', '0');
        if (leavesUpper) leavesUpper.setAttribute('opacity', '0');
        if (flower) flower.setAttribute('opacity', '0');
        if (fruit) fruit.setAttribute('opacity', '0');
        if (bee) bee.setAttribute('opacity', '0');

        if (titleEl) titleEl.textContent = 'Stage 2: Germination & Roots';
        if (headingEl) headingEl.textContent = 'Roots Anchor & Drink Water';
        if (bodyEl) bodyEl.textContent = 'The primary root (radicle) pushes downwards into the earth. Tiny root hairs absorb moisture and dissolved mineral nutrients from the soil.';
        if (nextBtn) nextBtn.textContent = 'Grow Next: Seedling 🌿';
        break;

      case 3:
        if (seed) seed.setAttribute('opacity', '0.4');
        if (roots) roots.setAttribute('opacity', '0.9');
        if (stem) stem.setAttribute('d', 'M 200 230 L 200 190');
        if (leavesLower) leavesLower.setAttribute('opacity', '1');
        if (leavesMiddle) leavesMiddle.setAttribute('opacity', '0');
        if (leavesUpper) leavesUpper.setAttribute('opacity', '0');
        if (flower) flower.setAttribute('opacity', '0');
        if (fruit) fruit.setAttribute('opacity', '0');
        if (bee) bee.setAttribute('opacity', '0');

        if (titleEl) titleEl.textContent = 'Stage 3: Seedling Emerges';
        if (headingEl) headingEl.textContent = 'First Leaves (Cotyledons)';
        if (bodyEl) bodyEl.textContent = 'The seedling sprouts above the ground towards the sun! Chlorophyll turns the leaves green, allowing the plant to start photosynthesis!';
        if (nextBtn) nextBtn.textContent = 'Grow Next: Vegetative Stem 🪴';
        break;

      case 4:
        if (seed) seed.setAttribute('opacity', '0');
        if (roots) roots.setAttribute('opacity', '1');
        if (stem) stem.setAttribute('d', 'M 200 230 L 200 120');
        if (leavesLower) leavesLower.setAttribute('opacity', '1');
        if (leavesMiddle) leavesMiddle.setAttribute('opacity', '1');
        if (leavesUpper) leavesUpper.setAttribute('opacity', '1');
        if (flower) flower.setAttribute('opacity', '0');
        if (fruit) fruit.setAttribute('opacity', '0');
        if (bee) bee.setAttribute('opacity', '0');

        if (titleEl) titleEl.textContent = 'Stage 4: Sturdy Stem & Leaves';
        if (headingEl) headingEl.textContent = 'Photosynthesis Powerhouse';
        if (bodyEl) bodyEl.textContent = 'Using sunlight, water, and carbon dioxide from the air, the leaves synthesize glucose sugars to build a thick, sturdy stem!';
        if (nextBtn) nextBtn.textContent = 'Grow Next: Flowering 🌸';
        break;

      case 5:
        if (seed) seed.setAttribute('opacity', '0');
        if (roots) roots.setAttribute('opacity', '1');
        if (stem) stem.setAttribute('d', 'M 200 230 L 200 100');
        if (leavesLower) leavesLower.setAttribute('opacity', '1');
        if (leavesMiddle) leavesMiddle.setAttribute('opacity', '1');
        if (leavesUpper) leavesUpper.setAttribute('opacity', '1');
        if (flower) flower.setAttribute('opacity', '1');
        if (fruit) fruit.setAttribute('opacity', '0');
        if (bee) bee.setAttribute('opacity', '1');

        if (titleEl) titleEl.textContent = 'Stage 5: Blossom & Pollination';
        if (headingEl) headingEl.textContent = 'Flowers & Friendly Pollinators';
        if (bodyEl) bodyEl.textContent = 'The bright fragrant petals attract bees and butterflies! As bees drink sweet nectar, they carry golden pollen grains to fertilize the plant!';
        if (nextBtn) nextBtn.textContent = 'Grow Next: Ripe Fruit 🍅';
        break;

      case 6:
        if (seed) seed.setAttribute('opacity', '0');
        if (roots) roots.setAttribute('opacity', '1');
        if (stem) stem.setAttribute('d', 'M 200 230 L 200 115');
        if (leavesLower) leavesLower.setAttribute('opacity', '1');
        if (leavesMiddle) leavesMiddle.setAttribute('opacity', '1');
        if (leavesUpper) leavesUpper.setAttribute('opacity', '1');
        if (flower) flower.setAttribute('opacity', '0');
        if (fruit) fruit.setAttribute('opacity', '1');
        if (bee) bee.setAttribute('opacity', '0.5');

        if (titleEl) titleEl.textContent = 'Stage 6: Harvest Time!';
        if (headingEl) headingEl.textContent = 'Juicy Fruit with New Seeds!';
        if (bodyEl) bodyEl.textContent = 'The fertilized flower grows into a delicious, nutrient-packed fruit. Inside the fruit are new seeds, continuing the marvelous circle of life!';
        if (nextBtn) nextBtn.textContent = 'Replay Cycle: Seed 🔄';
        break;
    }
  }

  checkCompletion() {
    if (this.stage === 6) {
      window.soundEngine.fanfare();
      const xpResult = window.storageManager.completeSimulation('plant_growth');
      if (xpResult && xpResult.newBadges && xpResult.newBadges.length > 0) {
        setTimeout(() => {
          if (window.miniScienceApp) window.miniScienceApp.showNewBadgeModal(xpResult.newBadges[0]);
        }, 500);
      }
    }
  }
}

window.PlantGrowthSimulation = PlantGrowthSimulation;
