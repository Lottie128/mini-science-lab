// Mini Science Lab - Interactive Human Body Explorer Simulation
// Tap anatomical organs to inspect life-giving systems with interactive heartbeat & breathing animations!

class HumanBodySimulation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.selectedOrgan = 'heart';
    this.animInterval = null;

    this.organs = {
      brain: {
        name: 'The Brain',
        icon: '🧠',
        color: '#f43f5e',
        tagline: 'Master Control & Memory Center',
        functions: [
          'Processes all your thoughts, feelings, dreams, and memories',
          'Controls voluntary movements (running, drawing) and involuntary reflexes',
          'Interprets incoming signals from your 5 senses: sights, sounds, smells, tastes, and touches'
        ],
        didYouKnow: 'Your brain has about 86 billion neurons and generates enough electric current to illuminate an LED bulb!'
      },
      lungs: {
        name: 'The Lungs',
        icon: '🫁',
        color: '#06b6d4',
        tagline: 'Oxygen Exchange & Breathing System',
        functions: [
          'Takes in life-sustaining oxygen from fresh air when you inhale',
          'Transfers oxygen through thousands of microscopic sacs called alveoli into your bloodstream',
          'Expels waste carbon dioxide gas every time you exhale'
        ],
        didYouKnow: 'If you spread out all the tiny air sacs in your lungs, they would cover an entire tennis court!'
      },
      heart: {
        name: 'The Heart',
        icon: '❤️',
        color: '#ef4444',
        tagline: 'The Ultimate Muscle Pump',
        functions: [
          'Beats rhythmically about 70 to 100 times every single minute',
          'Pumps oxygen-rich blood through arteries to muscles and organs',
          'Returns depleted blood back to your lungs to reload on fresh oxygen'
        ],
        didYouKnow: 'Your heart pumps about 7,500 liters (2,000 gallons) of blood through 60,000 miles of vessels every day!'
      },
      stomach: {
        name: 'The Stomach',
        icon: '🥣',
        color: '#f59e0b',
        tagline: 'Chemical Blender & Digestion Engine',
        functions: [
          'Churns chewed food with powerful muscular wall contractions',
          'Produces gastric acid (hydrochloric acid) and enzymes to break down proteins',
          'Kills harmful bacteria before food moves on to your intestines'
        ],
        didYouKnow: 'Your stomach lining produces a thick layer of protective mucus every 2 weeks so it doesn’t digest itself!'
      },
      intestines: {
        name: 'Small & Large Intestines',
        icon: '🌀',
        color: '#8b5cf6',
        tagline: 'Nutrient Absorption & Energy Highway',
        functions: [
          'Absorbs essential vitamins, minerals, carbohydrates, and healthy fats into blood',
          'Recovers water and electrolytes to keep you properly hydrated',
          'Houses trillions of friendly gut bacteria that support immunity and digestion'
        ],
        didYouKnow: 'Your small intestine is about 6 meters (20 feet) long, neatly folded inside your tummy!'
      }
    };
  }

  init() {
    this.render();
    this.bindEvents();
    this.selectOrgan(this.selectedOrgan);
    window.storageManager.completeSimulation('human_body', 30);
  }

  render() {
    this.container.innerHTML = `
      <div class="sim-wrapper">
        <div class="sim-header-bar">
          <div class="sim-title-group">
            <h3>🫀 Human Body Explorer</h3>
            <p>Tap any organ to learn how your internal biological super-machines work!</p>
          </div>
          <button class="btn-primary-fun btn-sm" id="btn-listen-heart">
            ❤️ Listen to Pulse
          </button>
        </div>

        <!-- Human Body Visual Diagram -->
        <div class="body-canvas-box">
          <svg viewBox="0 0 320 400" class="human-body-svg" id="body-svg">
            <defs>
              <linearGradient id="bodySkinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fed7aa" />
                <stop offset="100%" stop-color="#fdba74" />
              </linearGradient>
              <filter id="organGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            <!-- Silhouette of child body -->
            <!-- Head -->
            <ellipse cx="160" cy="55" rx="38" ry="46" fill="url(#bodySkinGrad)" stroke="#f97316" stroke-width="2" />
            <!-- Neck -->
            <rect x="148" y="96" width="24" height="20" fill="url(#bodySkinGrad)" />
            <!-- Torso -->
            <path d="M 100 115 Q 160 100 220 115 L 210 280 Q 160 295 110 280 Z" fill="url(#bodySkinGrad)" stroke="#f97316" stroke-width="2" />
            <!-- Arms hint -->
            <path d="M 100 115 L 70 230 M 220 115 L 250 230" stroke="#f97316" stroke-width="12" stroke-linecap="round" fill="none" opacity="0.6" />

            <!-- ORGANS -->
            <!-- 1. Brain -->
            <g id="organ-brain" class="organ-group" style="cursor: pointer;">
              <path d="M 140 45 Q 160 25 180 45 Q 190 65 170 70 Q 160 60 150 70 Q 130 65 140 45 Z" fill="#f43f5e" stroke="#be123c" stroke-width="2" />
              <text x="160" y="55" fill="#ffffff" font-size="14" text-anchor="middle" pointer-events="none">🧠</text>
            </g>

            <!-- 2. Lungs -->
            <g id="organ-lungs" class="organ-group" style="cursor: pointer;">
              <!-- Left Lung -->
              <ellipse cx="132" cy="155" rx="20" ry="32" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <!-- Right Lung -->
              <ellipse cx="188" cy="155" rx="20" ry="32" fill="#06b6d4" stroke="#0891b2" stroke-width="2" />
              <text x="132" y="158" fill="#ffffff" font-size="12" text-anchor="middle" pointer-events="none">🫁</text>
              <text x="188" y="158" fill="#ffffff" font-size="12" text-anchor="middle" pointer-events="none">🫁</text>
            </g>

            <!-- 3. Heart (center-left) -->
            <g id="organ-heart" class="organ-group beating-heart" style="cursor: pointer;">
              <circle cx="165" cy="160" r="16" fill="#ef4444" stroke="#b91c1c" stroke-width="2.5" id="heart-pulse-circle" />
              <text x="165" y="165" fill="#ffffff" font-size="13" text-anchor="middle" pointer-events="none">❤️</text>
            </g>

            <!-- 4. Stomach -->
            <g id="organ-stomach" class="organ-group" style="cursor: pointer;">
              <path d="M 135 205 Q 155 195 175 210 Q 180 230 150 235 Q 130 225 135 205 Z" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
              <text x="155" y="220" fill="#ffffff" font-size="13" text-anchor="middle" pointer-events="none">🥣</text>
            </g>

            <!-- 5. Intestines -->
            <g id="organ-intestines" class="organ-group" style="cursor: pointer;">
              <rect x="132" y="242" width="56" height="34" rx="14" fill="#8b5cf6" stroke="#6d28d9" stroke-width="2" />
              <text x="160" y="264" fill="#ffffff" font-size="13" text-anchor="middle" pointer-events="none">🌀</text>
            </g>
          </svg>

          <!-- Interactive Organ Button Selectors -->
          <div class="organ-btn-col">
            <button class="organ-btn ${this.selectedOrgan === 'brain' ? 'active' : ''}" data-organ="brain">
              <span>🧠</span> Brain
            </button>
            <button class="organ-btn ${this.selectedOrgan === 'lungs' ? 'active' : ''}" data-organ="lungs">
              <span>🫁</span> Lungs
            </button>
            <button class="organ-btn ${this.selectedOrgan === 'heart' ? 'active' : ''}" data-organ="heart">
              <span>❤️</span> Heart
            </button>
            <button class="organ-btn ${this.selectedOrgan === 'stomach' ? 'active' : ''}" data-organ="stomach">
              <span>🥣</span> Stomach
            </button>
            <button class="organ-btn ${this.selectedOrgan === 'intestines' ? 'active' : ''}" data-organ="intestines">
              <span>🌀</span> Intestines
            </button>
          </div>
        </div>

        <!-- Organ Detailed Information Panel -->
        <div class="organ-info-card" id="organ-info-card">
          <!-- Filled dynamically -->
        </div>
      </div>
    `;
  }

  bindEvents() {
    const organBtns = this.container.querySelectorAll('.organ-btn');
    const organGroups = this.container.querySelectorAll('.organ-group');
    const pulseBtn = this.container.querySelector('#btn-listen-heart');

    organBtns.forEach(btn => {
      btn.onclick = () => {
        this.selectOrgan(btn.dataset.organ);
      };
    });

    organGroups.forEach(grp => {
      grp.onclick = () => {
        const id = grp.id.replace('organ-', '');
        this.selectOrgan(id);
      };
    });

    if (pulseBtn) {
      pulseBtn.onclick = () => {
        this.selectOrgan('heart');
        window.soundEngine.heartbeat();
      };
    }
  }

  selectOrgan(organKey) {
    this.selectedOrgan = organKey;
    const organ = this.organs[organKey] || this.organs.heart;

    if (organKey === 'heart') {
      window.soundEngine.heartbeat();
    } else {
      window.soundEngine.blip();
    }

    // Highlight button
    const organBtns = this.container.querySelectorAll('.organ-btn');
    organBtns.forEach(b => b.classList.toggle('active', b.dataset.organ === organKey));

    // Highlight svg organ
    const organGroups = this.container.querySelectorAll('.organ-group');
    organGroups.forEach(g => {
      const isTarget = g.id === `organ-${organKey}`;
      g.style.filter = isTarget ? 'url(#organGlow)' : 'none';
      g.style.transform = isTarget ? 'scale(1.08)' : 'scale(1)';
      g.style.transformOrigin = 'center';
    });

    // Populate info card
    const card = this.container.querySelector('#organ-info-card');
    if (!card) return;

    card.innerHTML = `
      <div class="organ-card-header">
        <span class="organ-hero-icon" style="background:${organ.color}22; border-color:${organ.color};">${organ.icon}</span>
        <div>
          <h4>${organ.name}</h4>
          <span class="organ-tagline">${organ.tagline}</span>
        </div>
      </div>

      <div class="organ-functions-list">
        <strong>⚡ Key Life Functions:</strong>
        <ul>
          ${organ.functions.map(f => `<li>${f}</li>`).join('')}
        </ul>
      </div>

      <div class="organ-trivia-box">
        <strong>💡 Biological Wonder:</strong>
        <p>${organ.didYouKnow}</p>
      </div>
    `;
  }

  destroy() {
    if (this.animInterval) {
      clearInterval(this.animInterval);
    }
  }
}

window.HumanBodySimulation = HumanBodySimulation;
