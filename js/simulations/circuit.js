// Mini Science Lab - Interactive Circuit Builder Simulation
// Real-time circuit simulator with electron flow animation, switch toggle & bulb illumination!

class CircuitSimulation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.isClosed = false;
    this.voltage = 3.0; // 1.5V, 3.0V, 9.0V
    this.bulbWorking = true;
    this.animFrame = null;
    this.electronOffset = 0;
  }

  init() {
    this.render();
    this.bindEvents();
    this.startAnimation();
  }

  render() {
    this.container.innerHTML = `
      <div class="sim-wrapper">
        <div class="sim-header-bar">
          <div class="sim-title-group">
            <h3>⚡ Simple Electric Circuit</h3>
            <p>Connect the loop and close the switch to power the bulb!</p>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn-sim-voice" id="btn-circuit-voice" title="Listen to Voice Explainer">🎙️ Listen</button>
            <button class="btn-sim-reset" id="btn-circuit-reset" title="Reset circuit">🔄 Reset</button>
          </div>
        </div>

        <div class="sim-canvas-box circuit-board" id="circuit-board-area">
          <svg viewBox="0 0 400 320" class="circuit-svg" id="circuit-svg">
            <defs>
              <filter id="bulbGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <linearGradient id="batteryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#1e293b" />
                <stop offset="25%" stop-color="#334155" />
                <stop offset="60%" stop-color="#f59e0b" />
                <stop offset="100%" stop-color="#d97706" />
              </linearGradient>
            </defs>

            <!-- Base wire paths -->
            <!-- Wire path: Battery (bottom) -> Left up -> Bulb (top) -> Right down -> Switch -> Battery -->
            <path id="circuit-wire-main" d="M 120 250 L 50 250 L 50 70 L 160 70 M 240 70 L 350 70 L 350 250 L 260 250" 
                  fill="none" stroke="#64748b" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />

            <!-- Animated flowing electron dashes when closed -->
            <path id="circuit-wire-electrons" d="M 120 250 L 50 250 L 50 70 L 160 70 M 240 70 L 350 70 L 350 250 L 260 250" 
                  fill="none" stroke="#38bdf8" stroke-width="4" stroke-dasharray="8 8" stroke-dashoffset="0" class="electron-line" opacity="0" />

            <!-- BATTERY COMPONENT (Bottom center) -->
            <g id="comp-battery" class="circuit-comp" transform="translate(130, 226)">
              <rect x="0" y="0" width="120" height="48" rx="8" fill="url(#batteryGrad)" stroke="#0f172a" stroke-width="2" />
              <rect x="-8" y="14" width="8" height="20" rx="3" fill="#cbd5e1" />
              <rect x="120" y="14" width="8" height="20" rx="3" fill="#cbd5e1" />
              <text x="35" y="30" fill="#ffffff" font-weight="bold" font-size="14" font-family="sans-serif">BATTERY</text>
              <text x="100" y="30" fill="#fef08a" font-weight="bold" font-size="13" font-family="sans-serif" id="label-volt">${this.voltage}V</text>
              <text x="10" y="30" fill="#f87171" font-weight="bold" font-size="16" font-family="sans-serif">-</text>
              <text x="110" y="30" fill="#4ade80" font-weight="bold" font-size="16" font-family="sans-serif">+</text>
            </g>

            <!-- LIGHT BULB COMPONENT (Top center) -->
            <g id="comp-bulb" class="circuit-comp" transform="translate(160, 20)">
              <!-- Radiant glow behind bulb when on -->
              <circle cx="40" cy="50" r="42" fill="#facc15" opacity="0" id="bulb-halo" filter="url(#bulbGlow)" />
              <circle cx="40" cy="50" r="26" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2.5" id="bulb-glass" />
              <!-- Filament -->
              <path d="M 33 60 L 37 42 L 43 42 L 47 60" fill="none" stroke="#64748b" stroke-width="2" id="bulb-filament" />
              <!-- Socket base -->
              <rect x="30" y="66" width="20" height="16" rx="3" fill="#64748b" stroke="#334155" stroke-width="1.5" />
              <path d="M 30 71 L 50 71 M 30 76 L 50 76" stroke="#475569" stroke-width="1.5" />
            </g>

            <!-- KNIFE SWITCH COMPONENT (Right vertical wire) -->
            <g id="comp-switch" class="circuit-comp" transform="translate(350, 160)" style="cursor: pointer;">
              <!-- Contact points -->
              <circle cx="0" cy="-25" r="7" fill="#f59e0b" stroke="#b45309" stroke-width="2" />
              <circle cx="0" cy="25" r="7" fill="#f59e0b" stroke="#b45309" stroke-width="2" />
              <!-- Moving blade lever -->
              <line id="switch-blade" x1="0" y1="25" x2="-26" y2="-18" stroke="#f59e0b" stroke-width="6" stroke-linecap="round" />
              <circle cx="-26" cy="-18" r="6" fill="#ef4444" id="switch-handle" />
              <!-- Switch label -->
              <text x="-65" y="5" fill="#64748b" font-weight="bold" font-size="12" font-family="sans-serif">SWITCH</text>
            </g>
          </svg>

          <!-- Status badge overlay -->
          <div class="circuit-status-pill" id="circuit-status-banner">
            <span class="status-indicator-dot" id="circuit-dot"></span>
            <span id="circuit-status-text">Circuit Open • Click Switch to Close Loop</span>
          </div>
        </div>

        <!-- Controls panel -->
        <div class="sim-controls-panel">
          <div class="control-row">
            <label class="control-label">⚡ Battery Voltage:</label>
            <div class="chip-group" id="voltage-chips">
              <button class="chip-btn ${this.voltage === 1.5 ? 'active' : ''}" data-volt="1.5">1.5V (Soft)</button>
              <button class="chip-btn ${this.voltage === 3.0 ? 'active' : ''}" data-volt="3.0">3.0V (Standard)</button>
              <button class="chip-btn ${this.voltage === 9.0 ? 'active' : ''}" data-volt="9.0">9.0V (Ultra Bright!)</button>
            </div>
          </div>

          <div class="sim-actions-grid">
            <button class="btn-primary-fun" id="btn-toggle-switch">
              <span id="switch-btn-icon">🔌</span>
              <span id="switch-btn-label">Close Switch</span>
            </button>
            <button class="btn-secondary-fun" id="btn-check-circuit">
              🔍 Test Circuit & Check
            </button>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const switchComp = this.container.querySelector('#comp-switch');
    const toggleBtn = this.container.querySelector('#btn-toggle-switch');
    const resetBtn = this.container.querySelector('#btn-circuit-reset');
    const checkBtn = this.container.querySelector('#btn-check-circuit');
    const voltChips = this.container.querySelectorAll('#voltage-chips .chip-btn');

    if (switchComp) {
      switchComp.onclick = () => this.toggleSwitch();
    }
    if (toggleBtn) {
      toggleBtn.onclick = () => this.toggleSwitch();
    }
    if (resetBtn) {
      resetBtn.onclick = () => this.reset();
    }
    const voiceBtn = this.container.querySelector('#btn-circuit-voice');
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
          const audio = window.soundEngine.playVoice('circuit_explainer.wav');
          if (audio) {
            audio.onended = () => {
              voiceBtn.classList.remove('playing');
              voiceBtn.innerHTML = '🎙️ Listen';
            };
          }
        }
      };
    }
    if (checkBtn) {
      checkBtn.onclick = () => this.checkCircuit();
    }

    voltChips.forEach(chip => {
      chip.onclick = (e) => {
        window.soundEngine.click();
        voltChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.voltage = parseFloat(chip.dataset.volt);
        const voltLabel = this.container.querySelector('#label-volt');
        if (voltLabel) voltLabel.textContent = `${this.voltage}V`;
        this.updateState();
      };
    });
  }

  toggleSwitch() {
    this.isClosed = !this.isClosed;
    if (this.isClosed) {
      window.soundEngine.electricBuzz();
    } else {
      window.soundEngine.click();
    }
    this.updateState();
  }

  updateState() {
    const blade = this.container.querySelector('#switch-blade');
    const handle = this.container.querySelector('#switch-handle');
    const halo = this.container.querySelector('#bulb-halo');
    const glass = this.container.querySelector('#bulb-glass');
    const filament = this.container.querySelector('#bulb-filament');
    const electronLine = this.container.querySelector('#circuit-wire-electrons');
    const statusText = this.container.querySelector('#circuit-status-text');
    const statusDot = this.container.querySelector('#circuit-dot');
    const switchBtnLabel = this.container.querySelector('#switch-btn-label');
    const switchBtnIcon = this.container.querySelector('#switch-btn-icon');

    if (this.isClosed) {
      // Blade closed onto top contact (0, -25)
      blade.setAttribute('x2', '0');
      blade.setAttribute('y2', '-25');
      blade.setAttribute('stroke', '#4ade80');
      handle.setAttribute('cx', '0');
      handle.setAttribute('cy', '-25');
      handle.setAttribute('fill', '#22c55e');

      // Bulb lights up proportional to voltage
      const glowOpacity = this.voltage === 1.5 ? 0.5 : (this.voltage === 3.0 ? 0.85 : 1.0);
      const glassColor = this.voltage === 1.5 ? '#fef08a' : (this.voltage === 3.0 ? '#facc15' : '#ffffff');
      halo.setAttribute('opacity', glowOpacity);
      glass.setAttribute('fill', glassColor);
      filament.setAttribute('stroke', '#f97316');

      // Electrons visible
      electronLine.setAttribute('opacity', '1');

      statusText.textContent = `Circuit Closed! Electricity is flowing at ${this.voltage}V. Bulb is glowing!`;
      statusDot.className = 'status-indicator-dot online';
      if (switchBtnLabel) switchBtnLabel.textContent = 'Open Switch';
      if (switchBtnIcon) switchBtnIcon.textContent = '⏸️';

      // Record simulation completion in storage
      window.storageManager.completeSimulation('circuit', 30);
    } else {
      // Blade open
      blade.setAttribute('x2', '-26');
      blade.setAttribute('y2', '-18');
      blade.setAttribute('stroke', '#f59e0b');
      handle.setAttribute('cx', '-26');
      handle.setAttribute('cy', '-18');
      handle.setAttribute('fill', '#ef4444');

      // Bulb off
      halo.setAttribute('opacity', '0');
      glass.setAttribute('fill', '#e2e8f0');
      filament.setAttribute('stroke', '#64748b');

      // Electrons hidden
      electronLine.setAttribute('opacity', '0');

      statusText.textContent = 'Circuit Open • Click Switch or Blade to Complete Loop';
      statusDot.className = 'status-indicator-dot';
      if (switchBtnLabel) switchBtnLabel.textContent = 'Close Switch';
      if (switchBtnIcon) switchBtnIcon.textContent = '🔌';
    }
  }

  startAnimation() {
    const electronLine = this.container.querySelector('#circuit-wire-electrons');
    const loop = () => {
      if (this.isClosed && electronLine) {
        // Speed proportional to voltage
        const speed = this.voltage === 1.5 ? 1 : (this.voltage === 3.0 ? 2 : 4);
        this.electronOffset -= speed;
        electronLine.setAttribute('stroke-dashoffset', this.electronOffset);
      }
      this.animFrame = requestAnimationFrame(loop);
    };
    this.animFrame = requestAnimationFrame(loop);
  }

  checkCircuit() {
    window.soundEngine.click();
    if (this.isClosed) {
      window.soundEngine.correct();
      alert(`🎉 Perfect Circuit!\nThe loop is closed and unbroken. Current flows from the + terminal of the ${this.voltage}V battery, powers the bulb, and returns to the - terminal!`);
    } else {
      window.soundEngine.wrong();
      alert('⚠️ Circuit Broken!\nThe switch is currently open. Electricity cannot jump across air gaps. Close the switch to complete the loop!');
    }
  }

  reset() {
    window.soundEngine.click();
    this.isClosed = false;
    this.voltage = 3.0;
    const voltChips = this.container.querySelectorAll('#voltage-chips .chip-btn');
    voltChips.forEach(c => {
      c.classList.toggle('active', c.dataset.volt === '3');
    });
    const voltLabel = this.container.querySelector('#label-volt');
    if (voltLabel) voltLabel.textContent = '3.0V';
    this.updateState();
  }

  destroy() {
    window.soundEngine.stopVoice();
    if (this.animFrame) {
      cancelAnimationFrame(this.animFrame);
    }
  }
}

window.CircuitSimulation = CircuitSimulation;
