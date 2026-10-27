// Mini Science Lab - Interactive Solar System Simulator
// Beautiful orbital physics canvas, tap any planet to inspect cosmic details & facts!

class SolarSimulation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.isPlaying = true;
    this.speed = 1;
    this.selectedPlanet = 'earth';
    this.animFrame = null;
    this.time = 0;

    this.planets = [
      { id: 'mercury', name: 'Mercury', r: 35, size: 5, color: '#94a3b8', speed: 4.15, period: '88 Days', dist: '57.9M km', moons: 0, temp: '-180°C to 430°C', fact: 'Mercury has almost no atmosphere and is heavily cratered like our Moon!' },
      { id: 'venus', name: 'Venus', r: 52, size: 8, color: '#f59e0b', speed: 1.62, period: '225 Days', dist: '108.2M km', moons: 0, temp: '465°C (Hottest!)', fact: 'Venus spins backwards compared to most other planets, and its day is longer than its year!' },
      { id: 'earth', name: 'Earth', r: 72, size: 9, color: '#38bdf8', speed: 1.00, period: '365.25 Days', dist: '149.6M km', moons: 1, temp: '-89°C to 58°C', fact: 'Our home planet is the only known world covered in liquid water and teeming with life!' },
      { id: 'mars', name: 'Mars', r: 92, size: 7, color: '#ef4444', speed: 0.53, period: '687 Days', dist: '227.9M km', moons: 2, temp: '-140°C to 20°C', fact: 'Mars hosts Olympus Mons, the largest volcano in the entire solar system (3x taller than Mt. Everest)!' },
      { id: 'jupiter', name: 'Jupiter', r: 122, size: 16, color: '#ea580c', speed: 0.08, period: '12 Years', dist: '778.6M km', moons: 95, temp: '-110°C', fact: 'Jupiter is the king of planets: its Great Red Spot is a giant storm larger than Earth that has raged for centuries!' },
      { id: 'saturn', name: 'Saturn', r: 154, size: 13, color: '#eab308', speed: 0.03, period: '29.5 Years', dist: '1.43B km', moons: 146, hasRings: true, temp: '-140°C', fact: 'Saturns rings are made of billions of chunks of ice and rock, but are only about 10 meters thick!' },
      { id: 'uranus', name: 'Uranus', r: 184, size: 10, color: '#22d3ee', speed: 0.012, period: '84 Years', dist: '2.87B km', moons: 28, temp: '-195°C', fact: 'Uranus rotates tilted completely on its side, rolling like a bowling ball around the Sun!' },
      { id: 'neptune', name: 'Neptune', r: 212, size: 10, color: '#3b82f6', speed: 0.006, period: '165 Years', dist: '4.50B km', moons: 16, temp: '-200°C', fact: 'Neptune has the fiercest winds in the solar system, whipping at over 2,000 kilometers per hour!' }
    ];
  }

  init() {
    this.render();
    this.bindEvents();
    this.startCanvas();
    this.updateInspector(this.selectedPlanet);
    window.storageManager.completeSimulation('solar', 30);
  }

  render() {
    this.container.innerHTML = `
      <div class="sim-wrapper">
        <div class="sim-header-bar">
          <div class="sim-title-group">
            <h3>🪐 Solar System Explorer</h3>
            <p>Tap any planet to inspect its orbit, size, and cosmic wonders!</p>
          </div>
          <div class="sim-controls-compact">
            <button class="btn-sim-voice" id="btn-solar-voice" title="Listen to Voice Explainer">🎙️ Listen</button>
            <button class="btn-icon-subtle" id="btn-solar-play" title="Play/Pause">⏸️</button>
            <button class="btn-icon-subtle" id="btn-solar-speed" title="Speed up">⚡ 1x</button>
          </div>
        </div>

        <!-- Space Canvas -->
        <div class="solar-canvas-box" id="solar-canvas-wrap">
          <canvas id="solar-canvas" width="480" height="480"></canvas>
          <div class="solar-tap-hint">👆 Tap any orbiting planet or chip below</div>
        </div>

        <!-- Planet Selector Chips -->
        <div class="planet-selector-bar">
          ${this.planets.map(p => `
            <button class="planet-chip ${p.id === this.selectedPlanet ? 'active' : ''}" data-planet="${p.id}">
              <span class="planet-dot" style="background:${p.color};"></span>
              <span>${p.name}</span>
            </button>
          `).join('')}
        </div>

        <!-- Planet Detail Card -->
        <div class="planet-detail-card" id="planet-detail-card">
          <!-- Filled dynamically -->
        </div>
      </div>
    `;
  }

  bindEvents() {
    const playBtn = this.container.querySelector('#btn-solar-play');
    const speedBtn = this.container.querySelector('#btn-solar-speed');
    const canvas = this.container.querySelector('#solar-canvas');
    const chips = this.container.querySelectorAll('.planet-chip');

    if (playBtn) {
      playBtn.onclick = () => {
        window.soundEngine.click();
        this.isPlaying = !this.isPlaying;
        playBtn.textContent = this.isPlaying ? '⏸️' : '▶️';
      };
    }

    if (speedBtn) {
      speedBtn.onclick = () => {
        window.soundEngine.click();
        const speeds = [1, 2, 5, 0.5];
        const nextIdx = (speeds.indexOf(this.speed) + 1) % speeds.length;
        this.speed = speeds[nextIdx];
        speedBtn.textContent = `⚡ ${this.speed}x`;
      };
    }

    chips.forEach(chip => {
      chip.onclick = () => {
        window.soundEngine.blip();
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.selectedPlanet = chip.dataset.planet;
        this.updateInspector(this.selectedPlanet);
      };
    });

    if (canvas) {
      canvas.onclick = (e) => {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clickX = (e.clientX - rect.left) * scaleX;
        const clickY = (e.clientY - rect.top) * scaleY;
        const cx = canvas.width / 2;
        const cy = canvas.height / 2;

        // Check if user clicked close to a planet's current position
        for (let p of this.planets) {
          const angle = this.time * p.speed * 0.02;
          const px = cx + Math.cos(angle) * p.r;
          const py = cy + Math.sin(angle) * p.r;
          const dist = Math.hypot(clickX - px, clickY - py);
          if (dist < p.size + 14) {
            window.soundEngine.blip();
            this.selectedPlanet = p.id;
            chips.forEach(c => c.classList.toggle('active', c.dataset.planet === p.id));
            this.updateInspector(p.id);
            break;
          }
        }
      };
    }

    const voiceBtn = this.container.querySelector('#btn-solar-voice');
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
          const audio = window.soundEngine.playVoice('solar_explainer.wav');
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

  updateInspector(planetId) {
    const planet = this.planets.find(p => p.id === planetId) || this.planets[2];
    const card = this.container.querySelector('#planet-detail-card');
    if (!card) return;

    card.innerHTML = `
      <div class="planet-card-header">
        <div class="planet-badge-avatar" style="background: radial-gradient(circle, ${planet.color}, #0f172a);">
          <span style="font-size:24px;">🪐</span>
        </div>
        <div class="planet-title-block">
          <h4>${planet.name}</h4>
          <span class="planet-dist">📍 Distance: ${planet.dist}</span>
        </div>
      </div>

      <div class="planet-stats-grid">
        <div class="planet-stat-pill">
          <span class="stat-lbl">Year / Orbit</span>
          <span class="stat-val">${planet.period}</span>
        </div>
        <div class="planet-stat-pill">
          <span class="stat-lbl">Moons</span>
          <span class="stat-val">${planet.moons}</span>
        </div>
        <div class="planet-stat-pill">
          <span class="stat-lbl">Temperature</span>
          <span class="stat-val">${planet.temp}</span>
        </div>
      </div>

      <div class="planet-fact-callout">
        <span class="fact-tag">💡 Cosmic Fact:</span>
        <p>${planet.fact}</p>
      </div>
    `;
  }

  startCanvas() {
    const canvas = this.container.querySelector('#solar-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    const render = () => {
      if (this.isPlaying) {
        this.time += this.speed * 0.5;
      }

      // Space background
      ctx.fillStyle = '#090d16';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Starfield background
      ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
      for (let i = 0; i < 40; i++) {
        const sx = ((i * 73) % canvas.width);
        const sy = ((i * 127) % canvas.height);
        ctx.fillRect(sx, sy, 1.5, 1.5);
      }

      // Sun glow
      const sunGrad = ctx.createRadialGradient(cx, cy, 5, cx, cy, 32);
      sunGrad.addColorStop(0, '#fef08a');
      sunGrad.addColorStop(0.4, '#f59e0b');
      sunGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = sunGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, 32, 0, Math.PI * 2);
      ctx.fill();

      // Sun core
      ctx.fillStyle = '#fbbf24';
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();

      // Orbits and planets
      this.planets.forEach((p) => {
        // Orbit line
        ctx.strokeStyle = p.id === this.selectedPlanet ? 'rgba(56, 189, 248, 0.5)' : 'rgba(148, 163, 184, 0.15)';
        ctx.lineWidth = p.id === this.selectedPlanet ? 2 : 1;
        ctx.beginPath();
        ctx.arc(cx, cy, p.r, 0, Math.PI * 2);
        ctx.stroke();

        // Planet position
        const angle = this.time * p.speed * 0.02;
        const px = cx + Math.cos(angle) * p.r;
        const py = cy + Math.sin(angle) * p.r;

        // Selection highlight ring
        if (p.id === this.selectedPlanet) {
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(px, py, p.size + 6, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Saturn rings
        if (p.hasRings) {
          ctx.strokeStyle = '#fef08a';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.ellipse(px, py, p.size * 2, p.size * 0.7, Math.PI / 6, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Planet body
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(px, py, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      this.animFrame = requestAnimationFrame(render);
    };

    this.animFrame = requestAnimationFrame(render);
  }

  destroy() {
    window.soundEngine.stopVoice();
    if (this.animFrame) {
      cancelAnimationFrame(this.animFrame);
    }
  }
}

window.SolarSimulation = SolarSimulation;
