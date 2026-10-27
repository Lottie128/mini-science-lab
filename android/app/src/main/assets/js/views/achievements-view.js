// Mini Science Lab - Achievements View Controller & Modals

class AchievementsView {
  constructor(app) {
    this.app = app;
    this.filterTab = 'all'; // 'all', 'unlocked', 'locked'
  }

  render(container) {
    const unlockedIds = new Set(window.storageManager.state.unlockedBadges);
    const badges = window.BADGES_DATA.filter(b => {
      const isUnlocked = unlockedIds.has(b.id);
      if (this.filterTab === 'unlocked') return isUnlocked;
      if (this.filterTab === 'locked') return !isUnlocked;
      return true;
    });

    container.innerHTML = `
      <div class="page-content">
        <!-- Top App Header -->
        <div class="page-header-bar">
          <button class="btn-header-back" id="btn-back-home" aria-label="Back">${window.BACK_ICON_SVG}</button>
          <h2>Achievements</h2>
          <span class="header-step-pill">🏆 ${unlockedIds.size} / 12</span>
        </div>

        <!-- Filter Tabs -->
        <div class="badge-filter-tabs">
          <button class="badge-tab ${this.filterTab === 'all' ? 'active' : ''}" data-tab="all">
            All (${window.BADGES_DATA.length})
          </button>
          <button class="badge-tab ${this.filterTab === 'unlocked' ? 'active' : ''}" data-tab="unlocked">
            Unlocked (${unlockedIds.size})
          </button>
          <button class="badge-tab ${this.filterTab === 'locked' ? 'active' : ''}" data-tab="locked">
            Locked (${window.BADGES_DATA.length - unlockedIds.size})
          </button>
        </div>

        <!-- Badges Grid -->
        <div class="badges-grid-wrap">
          ${badges.map(b => {
            const isUnlocked = unlockedIds.has(b.id);
            return `
              <div class="badge-card ${isUnlocked ? 'unlocked' : 'locked'}" data-badge-id="${b.id}">
                <div class="badge-icon-shield" style="${isUnlocked ? `background: radial-gradient(circle, ${b.color}33, #ffffff); border-color:${b.color};` : ''}">
                  <span class="badge-emoji">${isUnlocked ? b.icon : '🔒'}</span>
                </div>
                <div class="badge-name">${b.title}</div>
                <div class="badge-status-tag">${isUnlocked ? 'Unlocked' : 'Locked'}</div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;

    const backBtn = container.querySelector('#btn-back-home');
    if (backBtn) backBtn.onclick = () => {
      window.soundEngine.click();
      this.app.navigate('home');
    };

    const tabs = container.querySelectorAll('.badge-tab');
    tabs.forEach(tab => {
      tab.onclick = () => {
        window.soundEngine.click();
        this.filterTab = tab.dataset.tab;
        this.render(container);
      };
    });

    const cards = container.querySelectorAll('.badge-card');
    cards.forEach(card => {
      card.onclick = () => {
        window.soundEngine.click();
        const b = window.BADGES_DATA.find(item => item.id === card.dataset.badgeId);
        if (b) this.showBadgeDetailModal(b);
      };
    });
  }

  showBadgeDetailModal(badge) {
    const isUnlocked = window.storageManager.state.unlockedBadges.includes(badge.id);

    const modal = document.createElement('div');
    modal.className = 'quiz-review-overlay';
    modal.innerHTML = `
      <div class="badge-detail-dialog ${isUnlocked ? 'unlocked' : 'locked'}">
        <div class="badge-modal-hero" style="background: radial-gradient(circle, ${badge.color}44, #ffffff);">
          <div class="badge-modal-emoji">${isUnlocked ? badge.icon : '🔒'}</div>
        </div>
        <h3>${badge.title}</h3>
        <span class="badge-cat-label">${badge.category}</span>
        <p class="badge-detail-desc">${badge.description}</p>
        
        <div class="badge-xp-reward-box">
          <span>Reward:</span>
          <strong>⭐ +${badge.xpReward} XP</strong>
        </div>

        <div class="badge-unlock-status-pill ${isUnlocked ? 'status-unlocked' : 'status-locked'}">
          ${isUnlocked ? '✅ Unlocked & Claimed!' : '🔒 Locked — Complete activity to unlock'}
        </div>

        <button class="btn-primary-fun btn-block" id="btn-close-badge-modal">Awesome!</button>
      </div>
    `;

    document.body.appendChild(modal);

    const close = () => {
      window.soundEngine.click();
      document.body.removeChild(modal);
    };

    modal.querySelector('#btn-close-badge-modal').onclick = close;
  }
}

window.AchievementsView = AchievementsView;
