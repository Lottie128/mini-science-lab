// Mini Science Lab - Interactive Magnet Lab Simulation
// Explore magnetic fields, pole attraction & test magnetic vs non-magnetic materials!

class MagnetsSimulation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.showFieldLines = true;
    this.magnetFlipped = false;
    this.activeDragging = null;
    this.animFrame = null;

    // Magnet position
    this.magnet = { x: 190, y: 130, w: 140, h: 48 };

    // Testable objects
    this.items = [
      { id: 'clip1', name: 'Paperclip', icon: '📎', x: 60, y: 50, magnetic: true, snapped: false },
      { id: 'clip2', name: 'Paperclip', icon: '📎', x: 60, y: 90, magnetic: true, snapped: false },
      { id: 'coin', name: 'Steel Washer', icon: '🪙', x: 60, y: 150, magnetic: true, snapped: false },
      { id: 'spoon', name: 'Plastic Spoon', icon: '🥄', x: 310, y: 50, magnetic: false, snapped: false },
      { id: 'wood', name: 'Wood Block', icon: '🪵', x: 310, y: 100, magnetic: false, snapped: false },
      { id: 'eraser', name: 'Eraser', icon: '🧼', x: 310, y: 160, magnetic: false, snapped: false }
    ];
  }

  init() {
    this.render();
    this.bindEvents();
    this.startCanvas();
    window.storageManager.completeSimulation('magnets', 30);
  }

  render() {
    this.container.innerHTML = `
      <div class="sim-wrapper">
        <div class="sim-header-bar">
          <div class="sim-title-group">
            <h3>🧲 Magnetism & Field Lab</h3>
            <p>Drag items near the magnet to see which materials stick!</p>
          </div>
          <div style="display:flex; gap:8px;">
            <button class="btn-sim-voice" id="btn-magnet-voice" title="Listen to Voice Explainer">🎙️ Listen</button>
            <button class="btn-sim-reset" id="btn-magnet-reset">🔄 Reset</button>
          </div>
        </div>

        <!-- Magnet Field Box -->
        <div class="magnet-canvas-box" id="magnet-canvas-wrap">
          <canvas id="magnet-canvas" width="400" height="260"></canvas>
          <div class="magnet-field-hint">👆 Drag objects with your finger / mouse</div>
        </div>

        <!-- Controls Bar -->
        <div class="magnet-controls-bar">
          <button class="chip-btn ${this.showFieldLines ? 'active' : ''}" id="btn-toggle-field">
            🌐 ${this.showFieldLines ? 'Hide Field Lines' : 'Show Field Lines'}
          </button>
          <button class="chip-btn" id="btn-flip-poles">
            🔄 Flip Poles (N ↔ S)
          </button>
        </div>

        <!-- Educational description -->
        <div class="sim-didactic-card">
          <h4>🧲 How Magnetism Works</h4>
          <p>Magnets create an invisible force field around themselves. <strong>Magnetic materials</strong> (like iron, nickel, and steel) are pulled towards the poles, while non-magnetic items (plastic, wood, rubber) feel zero force!</p>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const canvas = this.container.querySelector('#magnet-canvas');
    const resetBtn = this.container.querySelector('#btn-magnet-reset');
    const toggleFieldBtn = this.container.querySelector('#btn-toggle-field');
    const flipPolesBtn = this.container.querySelector('#btn-flip-poles');

    if (resetBtn) {
      resetBtn.onclick = () => this.reset();
    }

    if (toggleFieldBtn) {
      toggleFieldBtn.onclick = () => {
        window.soundEngine.click();
        this.showFieldLines = !this.showFieldLines;
        toggleFieldBtn.textContent = this.showFieldLines ? '🌐 Hide Field Lines' : '🌐 Show Field Lines';
        toggleFieldBtn.classList.toggle('active', this.showFieldLines);
      };
    }

    if (flipPolesBtn) {
      flipPolesBtn.onclick = () => {
        window.soundEngine.blip();
        this.magnetFlipped = !this.magnetFlipped;
      };
    }

    if (canvas) {
      const getPos = (e) => {
        const rect = canvas.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        return {
          x: (clientX - rect.left) * scaleX,
          y: (clientY - rect.top) * scaleY
        };
      };

      const onStart = (e) => {
        const pos = getPos(e);
        // Find if an item was touched
        for (let i = this.items.length - 1; i >= 0; i--) {
          const it = this.items[i];
          const dist = Math.hypot(pos.x - it.x, pos.y - it.y);
          if (dist < 26) {
            this.activeDragging = it;
            it.snapped = false;
            window.soundEngine.click();
            break;
          }
        }
      };

      const onMove = (e) => {
        if (!this.activeDragging) return;
        const pos = getPos(e);
        this.activeDragging.x = pos.x;
        this.activeDragging.y = pos.y;

        // Check magnetic pull
        if (this.activeDragging.magnetic) {
          const poleN = { x: this.magnet.x - this.magnet.w / 2, y: this.magnet.y };
          const poleS = { x: this.magnet.x + this.magnet.w / 2, y: this.magnet.y };
          const distN = Math.hypot(pos.x - poleN.x, pos.y - poleN.y);
          const distS = Math.hypot(pos.x - poleS.x, pos.y - poleS.y);

          if (distN < 40) {
            this.activeDragging.x = poleN.x + (pos.x < poleN.x ? -10 : 10);
            this.activeDragging.y = poleN.y;
            if (!this.activeDragging.snapped) {
              this.activeDragging.snapped = true;
              window.soundEngine.magnetSnap();
            }
          } else if (distS < 40) {
            this.activeDragging.x = poleS.x + (pos.x < poleS.x ? -10 : 10);
            this.activeDragging.y = poleS.y;
            if (!this.activeDragging.snapped) {
              this.activeDragging.snapped = true;
              window.soundEngine.magnetSnap();
            }
          } else {
            this.activeDragging.snapped = false;
          }
        }
      };

      const onEnd = () => {
        this.activeDragging = null;
      };

      canvas.addEventListener('mousedown', onStart);
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);

      canvas.addEventListener('touchstart', onStart, { passive: true });
      window.addEventListener('touchmove', onMove, { passive: true });
      window.addEventListener('touchend', onEnd);
    }

    const voiceBtn = this.container.querySelector('#btn-magnet-voice');
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
          const audio = window.soundEngine.playVoice('magnets_explainer.wav');
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

  startCanvas() {
    const canvas = this.container.querySelector('#magnet-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    const loop = () => {
      // Clear
      ctx.fillStyle = '#f8fafc';
      ctx.fillRect(0, 0, width, height);

      const mx = this.magnet.x;
      const my = this.magnet.y;
      const mw = this.magnet.w;
      const mh = this.magnet.h;

      // Draw Magnetic field lines
      if (this.showFieldLines) {
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.lineWidth = 1.8;
        ctx.setLineDash([4, 4]);

        const poleLeftX = mx - mw / 2 + 10;
        const poleRightX = mx + mw / 2 - 10;

        for (let r = 30; r <= 90; r += 20) {
          ctx.beginPath();
          ctx.ellipse(mx, my, mw / 2 + r, mh / 2 + r, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        ctx.setLineDash([]);
      }

      // Draw the Bar Magnet
      const leftColor = this.magnetFlipped ? '#3b82f6' : '#ef4444';
      const rightColor = this.magnetFlipped ? '#ef4444' : '#3b82f6';
      const leftPole = this.magnetFlipped ? 'S' : 'N';
      const rightPole = this.magnetFlipped ? 'N' : 'S';

      // Left Pole Half
      ctx.fillStyle = leftColor;
      ctx.beginPath();
      ctx.roundRect(mx - mw / 2, my - mh / 2, mw / 2, mh, [8, 0, 0, 8]);
      ctx.fill();

      // Right Pole Half
      ctx.fillStyle = rightColor;
      ctx.beginPath();
      ctx.roundRect(mx, my - mh / 2, mw / 2, mh, [0, 8, 8, 0]);
      ctx.fill();

      // Magnet Pole Letters
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 22px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(leftPole, mx - mw / 4, my);
      ctx.fillText(rightPole, mx + mw / 4, my);

      // Draw Testable Items
      this.items.forEach(it => {
        // Shadow
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.beginPath();
        ctx.arc(it.x + 2, it.y + 4, 18, 0, Math.PI * 2);
        ctx.fill();

        // Item circle background
        ctx.fillStyle = it.magnetic ? '#e0f2fe' : '#f1f5f9';
        ctx.strokeStyle = it.magnetic ? '#0284c7' : '#94a3b8';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(it.x, it.y, 18, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Icon
        ctx.font = '18px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(it.icon, it.x, it.y + 1);

        // Name tag
        ctx.fillStyle = '#475569';
        ctx.font = '10px sans-serif';
        ctx.fillText(it.name, it.x, it.y + 26);
      });

      this.animFrame = requestAnimationFrame(loop);
    };

    this.animFrame = requestAnimationFrame(loop);
  }

  reset() {
    window.soundEngine.click();
    this.magnetFlipped = false;
    this.items = [
      { id: 'clip1', name: 'Paperclip', icon: '📎', x: 60, y: 50, magnetic: true, snapped: false },
      { id: 'clip2', name: 'Paperclip', icon: '📎', x: 60, y: 90, magnetic: true, snapped: false },
      { id: 'coin', name: 'Steel Washer', icon: '🪙', x: 60, y: 150, magnetic: true, snapped: false },
      { id: 'spoon', name: 'Plastic Spoon', icon: '🥄', x: 340, y: 50, magnetic: false, snapped: false },
      { id: 'wood', name: 'Wood Block', icon: '🪵', x: 340, y: 100, magnetic: false, snapped: false },
      { id: 'eraser', name: 'Eraser', icon: '🧼', x: 340, y: 160, magnetic: false, snapped: false }
    ];
  }

  destroy() {
    window.soundEngine.stopVoice();
    if (this.animFrame) {
      cancelAnimationFrame(this.animFrame);
    }
  }
}

window.MagnetsSimulation = MagnetsSimulation;
