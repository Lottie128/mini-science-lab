// Mini Science Lab - Interactive Water Cycle Simulation
// Full atmospheric water journey: Evaporation, Condensation, Precipitation, and Collection!

class WaterCycleSimulation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.currentStage = 'evaporation'; // evaporation, condensation, precipitation, collection
    this.isAutoCycling = false;
    this.autoInterval = null;
    this.animFrame = null;
    this.particles = [];

    this.stageInfo = {
      evaporation: {
        title: '☀️ 1. Evaporation & Transpiration',
        badge: 'Stage 1',
        description: 'The Sun heats up water in oceans, lakes, and rivers. The liquid water transforms into invisible water vapor gas that floats high up into the sky. Trees and plants also release water vapor through their leaves in a process called transpiration!',
        didYouKnow: 'Oceans contribute about 86% of all global evaporation!'
      },
      condensation: {
        title: '☁️ 2. Condensation',
        badge: 'Stage 2',
        description: 'As warm water vapor climbs higher into the cold upper atmosphere, it cools down. The vapor condenses around microscopic dust specks into billions of tiny floating water droplets, forming visible clouds and morning fog!',
        didYouKnow: 'A single fluffy cumulus cloud can weigh over 500,000 kilograms (1.1 million pounds)!'
      },
      precipitation: {
        title: '🌧️ 3. Precipitation',
        badge: 'Stage 3',
        description: 'When water droplets inside clouds bump into each other and grow too large and heavy for upward air drafts to hold, gravity pulls them down! Precipitation can fall as liquid rain, frozen snow, sleet, or ice hail depending on the temperature.',
        didYouKnow: 'The wettest place on Earth receives over 11,800 millimeters (467 inches) of rain each year!'
      },
      collection: {
        title: '🌊 4. Collection & Surface Runoff',
        badge: 'Stage 4',
        description: 'Rainwater soaks into soil (infiltration) to replenish underground water aquifers, while runoff cascades down hills and mountains into babbling brooks and rivers. Eventually, all this water flows right back into the vast oceans to start the cycle all over again!',
        didYouKnow: 'The water you drank today might be the same water a dinosaur drank 100 million years ago!'
      }
    };
  }

  init() {
    this.render();
    this.bindEvents();
    this.initCanvas();
    this.setStage(this.currentStage);
    window.storageManager.completeSimulation('water_cycle', 30);
  }

  render() {
    this.container.innerHTML = `
      <div class="sim-wrapper">
        <div class="sim-header-bar">
          <div class="sim-title-group">
            <h3>🌧️ The Water Cycle</h3>
            <p>Follow a water droplet as it travels from ocean to sky and back!</p>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn-sim-voice" id="btn-water-voice" title="Listen to Voice Explainer">🎙️ Listen</button>
            <button class="btn-primary-fun btn-sm" id="btn-auto-cycle">
              <span id="auto-cycle-icon">🔄</span> Auto Cycle
            </button>
          </div>
        </div>

        <!-- Stage Navigation Chips -->
        <div class="water-stage-chips">
          <button class="water-chip active" data-stage="evaporation">☀️ Evaporation</button>
          <button class="water-chip" data-stage="condensation">☁️ Condensation</button>
          <button class="water-chip" data-stage="precipitation">🌧️ Precipitation</button>
          <button class="water-chip" data-stage="collection">🌊 Collection</button>
        </div>

        <!-- Interactive Animated Nature Landscape -->
        <div class="water-scene-box">
          <canvas id="water-canvas" width="460" height="260"></canvas>
          <div class="water-overlay-labels">
            <span class="water-tag tag-sun">☀️ Solar Energy</span>
            <span class="water-tag tag-clouds">☁️ Cloud Deck</span>
            <span class="water-tag tag-mountains">🏔️ Mountain Runoff</span>
            <span class="water-tag tag-ocean">🌊 Ocean Reservoir</span>
          </div>
        </div>

        <!-- Stage Explanation Card -->
        <div class="water-info-card" id="water-info-card">
          <!-- Filled dynamically -->
        </div>
      </div>
    `;
  }

  bindEvents() {
    const chips = this.container.querySelectorAll('.water-chip');
    const autoBtn = this.container.querySelector('#btn-auto-cycle');

    chips.forEach(chip => {
      chip.onclick = () => {
        window.soundEngine.blip();
        this.stopAutoCycle();
        this.setStage(chip.dataset.stage);
      };
    });

    if (autoBtn) {
      autoBtn.onclick = () => {
        window.soundEngine.click();
        this.toggleAutoCycle();
      };
    }

    const voiceBtn = this.container.querySelector('#btn-water-voice');
    if (voiceBtn) {
      voiceBtn.onclick = () => {
        window.soundEngine.click();
        if (voiceBtn.classList.contains('playing')) {
          window.soundEngine.stopVoice();
          voiceBtn.classList.remove('playing');
          voiceBtn.innerHTML = '🎙️ Listen';
        } else {
          voiceBtn.classList.add('playing');
          voiceBtn.innerHTML = '🔊 Speaking...';
          const audio = window.soundEngine.playVoice('water_cycle_explainer.wav');
          if (audio) {
            audio.onended = () => {
              voiceBtn.classList.remove('playing');
              voiceBtn.innerHTML = '🎙️ Listen';
            };
          }
        }
      };
    }
  }

  setStage(stage) {
    this.currentStage = stage;
    const chips = this.container.querySelectorAll('.water-chip');
    chips.forEach(c => c.classList.toggle('active', c.dataset.stage === stage));

    if (stage === 'precipitation') {
      window.soundEngine.waterDrip();
    }

    const info = this.stageInfo[stage];
    const card = this.container.querySelector('#water-info-card');
    if (card) {
      card.innerHTML = `
        <div class="water-card-top">
          <span class="water-badge">${info.badge}</span>
          <h4>${info.title}</h4>
        </div>
        <p class="water-desc">${info.description}</p>
        <div class="water-did-you-know">
          <strong>💧 Did you know?</strong> ${info.didYouKnow}
        </div>
      `;
    }

    // Reset particles for the active stage
    this.initParticles(stage);
  }

  toggleAutoCycle() {
    this.isAutoCycling = !this.isAutoCycling;
    const autoBtn = this.container.querySelector('#btn-auto-cycle');
    if (this.isAutoCycling) {
      if (autoBtn) autoBtn.innerHTML = '<span>⏸️</span> Pause Auto';
      const stages = ['evaporation', 'condensation', 'precipitation', 'collection'];
      this.autoInterval = setInterval(() => {
        const nextIdx = (stages.indexOf(this.currentStage) + 1) % stages.length;
        this.setStage(stages[nextIdx]);
      }, 4000);
    } else {
      this.stopAutoCycle();
    }
  }

  stopAutoCycle() {
    this.isAutoCycling = false;
    if (this.autoInterval) {
      clearInterval(this.autoInterval);
      this.autoInterval = null;
    }
    const autoBtn = this.container.querySelector('#btn-auto-cycle');
    if (autoBtn) autoBtn.innerHTML = '<span>🔄</span> Auto Cycle';
  }

  initParticles(stage) {
    this.particles = [];
    const count = stage === 'precipitation' ? 60 : 35;
    for (let i = 0; i < count; i++) {
      if (stage === 'evaporation') {
        // Vapor rising from water (x: 240-440, y: 190-240)
        this.particles.push({
          x: 230 + Math.random() * 210,
          y: 200 + Math.random() * 40,
          vy: -(0.8 + Math.random() * 1.2),
          vx: (Math.random() - 0.5) * 0.4,
          r: 2 + Math.random() * 3,
          opacity: 0.7
        });
      } else if (stage === 'precipitation') {
        // Rain falling from clouds (x: 40-300, y: 50-80)
        this.particles.push({
          x: 40 + Math.random() * 260,
          y: 50 + Math.random() * 180,
          vy: 3 + Math.random() * 3,
          vx: -0.5,
          len: 6 + Math.random() * 6
        });
      } else if (stage === 'collection') {
        // Flowing down mountains to river
        this.particles.push({
          x: 30 + Math.random() * 180,
          y: 110 + Math.random() * 60,
          vx: 1.2 + Math.random() * 1.5,
          vy: 0.6 + Math.random() * 0.8,
          r: 3
        });
      }
    }
  }

  initCanvas() {
    const canvas = this.container.querySelector('#water-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const drawLandscape = () => {
      // Sky gradient
      const skyGrad = ctx.createLinearGradient(0, 0, 0, 180);
      if (this.currentStage === 'condensation' || this.currentStage === 'precipitation') {
        skyGrad.addColorStop(0, '#94a3b8');
        skyGrad.addColorStop(1, '#cbd5e1');
      } else {
        skyGrad.addColorStop(0, '#38bdf8');
        skyGrad.addColorStop(1, '#bae6fd');
      }
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Sun
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(400, 45, 26, 0, Math.PI * 2);
      ctx.fill();

      // Mountains on left
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.moveTo(0, 190);
      ctx.lineTo(80, 80);
      ctx.lineTo(160, 190);
      ctx.fill();

      // Snow peak
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.moveTo(60, 108);
      ctx.lineTo(80, 80);
      ctx.lineTo(100, 108);
      ctx.fill();

      // Second mountain
      ctx.fillStyle = '#475569';
      ctx.beginPath();
      ctx.moveTo(100, 190);
      ctx.lineTo(170, 105);
      ctx.lineTo(240, 190);
      ctx.fill();

      // Rolling green hills
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.moveTo(0, 260);
      ctx.lineTo(0, 190);
      ctx.quadraticCurveTo(120, 160, 240, 190);
      ctx.lineTo(240, 260);
      ctx.fill();

      // Ocean on right
      const oceanGrad = ctx.createLinearGradient(240, 190, 460, 260);
      oceanGrad.addColorStop(0, '#0284c7');
      oceanGrad.addColorStop(1, '#0369a1');
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(240, 190, 220, 70);

      // River winding from mountains to ocean
      ctx.fillStyle = '#38bdf8';
      ctx.beginPath();
      ctx.moveTo(80, 185);
      ctx.quadraticCurveTo(160, 195, 240, 210);
      ctx.lineTo(240, 230);
      ctx.quadraticCurveTo(150, 210, 70, 190);
      ctx.fill();

      // Clouds
      const cloudColor = (this.currentStage === 'condensation' || this.currentStage === 'precipitation') ? '#e2e8f0' : '#ffffff';
      ctx.fillStyle = cloudColor;

      // Cloud 1 (Center-Left)
      ctx.beginPath();
      ctx.arc(120, 60, 24, 0, Math.PI * 2);
      ctx.arc(145, 50, 30, 0, Math.PI * 2);
      ctx.arc(175, 60, 24, 0, Math.PI * 2);
      ctx.arc(150, 70, 22, 0, Math.PI * 2);
      ctx.fill();

      // Cloud 2 (Center)
      ctx.beginPath();
      ctx.arc(230, 70, 20, 0, Math.PI * 2);
      ctx.arc(255, 60, 28, 0, Math.PI * 2);
      ctx.arc(280, 70, 22, 0, Math.PI * 2);
      ctx.fill();
    };

    const loop = () => {
      drawLandscape();

      // Update and draw particles based on stage
      if (this.currentStage === 'evaporation') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.particles.forEach(p => {
          p.y += p.vy;
          p.x += p.vx;
          if (p.y < 80) {
            p.y = 210 + Math.random() * 30;
            p.x = 240 + Math.random() * 200;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });
      } else if (this.currentStage === 'precipitation') {
        ctx.strokeStyle = '#38bdf8';
        ctx.lineWidth = 2;
        this.particles.forEach(p => {
          p.y += p.vy;
          p.x += p.vx;
          if (p.y > 230) {
            p.y = 75;
            p.x = 40 + Math.random() * 260;
          }
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.vx, p.y + p.len);
          ctx.stroke();
        });
      } else if (this.currentStage === 'collection') {
        ctx.fillStyle = '#60a5fa';
        this.particles.forEach(p => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x > 250) {
            p.x = 30 + Math.random() * 80;
            p.y = 175 + Math.random() * 15;
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      this.animFrame = requestAnimationFrame(loop);
    };

    this.animFrame = requestAnimationFrame(loop);
  }

  destroy() {
    window.soundEngine.stopVoice();
    this.stopAutoCycle();
    if (this.animFrame) {
      cancelAnimationFrame(this.animFrame);
    }
  }
}

window.WaterCycleSimulation = WaterCycleSimulation;
