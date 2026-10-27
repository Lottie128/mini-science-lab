// Mini Science Lab - Science Library View Controller (Search, Fact Cards & Details)

class LibraryView {
  constructor(app) {
    this.app = app;
    this.searchQuery = '';
    this.selectedCat = 'All';
  }

  // 1. Library Catalogue
  renderCatalogue(container) {
    const categories = ['All', 'Our Solar System', 'Amazing Animals', 'Plants and Trees', 'Everyday Science', 'Human Body'];
    const facts = window.SCIENCE_FACTS.filter(f => {
      const matchCat = this.selectedCat === 'All' || f.category === this.selectedCat;
      const matchSearch = !this.searchQuery || 
        f.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
        f.summary.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        f.didYouKnow.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    container.innerHTML = `
      <div class="page-content">
        <!-- Top App Header -->
        <div class="page-header-bar">
          <button class="btn-header-back" id="btn-back-home" aria-label="Back">${window.BACK_ICON_SVG}</button>
          <h2>Science Library</h2>
          <span class="header-step-pill">📚 12 Facts</span>
        </div>

        <!-- Search Bar -->
        <div class="search-box-wrap">
          <span class="search-glass-icon">🔍</span>
          <input type="text" class="input-search" id="input-search-facts" placeholder="Search science facts & trivia..." value="${this.searchQuery}" />
          ${this.searchQuery ? `<button class="btn-clear-search" id="btn-clear-fact-search">✖</button>` : ''}
        </div>

        <!-- Category Chips -->
        <div class="category-chip-scroll">
          ${categories.map(c => `
            <button class="category-chip ${this.selectedCat === c ? 'active' : ''}" data-cat="${c}">
              ${c}
            </button>
          `).join('')}
        </div>

        <!-- Facts List -->
        <div class="library-grid">
          ${facts.length === 0 ? `
            <div class="empty-state-card">
              <div class="empty-icon">🔍</div>
              <h4>No facts found</h4>
              <p>Try searching for "Sun", "Whale", or "Rainbow"!</p>
            </div>
          ` : facts.map(fact => {
            const isFav = window.storageManager.isFavorite('facts', fact.id);
            return `
              <div class="fact-card" data-id="${fact.id}">
                <div class="fact-card-hero-icon" style="background:${fact.color}22; border-color:${fact.color};">
                  ${fact.icon}
                </div>
                <div class="fact-card-body">
                  <div class="fact-card-header-row">
                    <span class="fact-cat-tag">${fact.category}</span>
                    <button class="btn-fav-star ${isFav ? 'active' : ''}" data-fav-fact="${fact.id}">
                      ${isFav ? '★' : '☆'}
                    </button>
                  </div>
                  <h4>${fact.title}</h4>
                  <p class="fact-card-snippet">${fact.summary}</p>
                </div>
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

    const searchInput = container.querySelector('#input-search-facts');
    if (searchInput) {
      searchInput.oninput = (e) => {
        this.searchQuery = e.target.value;
        this.renderCatalogue(container);
      };
    }

    const clearBtn = container.querySelector('#btn-clear-fact-search');
    if (clearBtn) {
      clearBtn.onclick = () => {
        this.searchQuery = '';
        this.renderCatalogue(container);
      };
    }

    const chips = container.querySelectorAll('.category-chip');
    chips.forEach(chip => {
      chip.onclick = () => {
        window.soundEngine.click();
        this.selectedCat = chip.dataset.cat;
        this.renderCatalogue(container);
      };
    });

    const cards = container.querySelectorAll('.fact-card');
    cards.forEach(card => {
      card.onclick = (e) => {
        if (e.target.classList.contains('btn-fav-star')) return;
        window.soundEngine.click();
        this.app.selectedFactId = card.dataset.id;
        this.app.navigate('fact_detail');
      };
    });

    const favBtns = container.querySelectorAll('.btn-fav-star');
    favBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.stopPropagation();
        window.soundEngine.blip();
        const id = btn.dataset.favFact;
        const isFav = window.storageManager.toggleFavorite('facts', id);
        btn.classList.toggle('active', isFav);
        btn.textContent = isFav ? '★' : '☆';
      };
    });
  }

  // 2. Fact Detail Screen
  renderDetail(container) {
    const fact = window.SCIENCE_FACTS.find(f => f.id === this.app.selectedFactId) || window.SCIENCE_FACTS[0];
    const isFav = window.storageManager.isFavorite('facts', fact.id);

    container.innerHTML = `
      <div class="page-content">
        <!-- Top App Header -->
        <div class="page-header-bar">
          <button class="btn-header-back" id="btn-back-library" aria-label="Back">${window.BACK_ICON_SVG}</button>
          <h2>Science Fact</h2>
          <button class="btn-header-action ${isFav ? 'active' : ''}" id="btn-fact-fav">
            ${isFav ? '★' : '☆'}
          </button>
        </div>

        <!-- Hero Card -->
        <div class="fact-detail-hero" style="background: radial-gradient(circle at top, ${fact.color}33, #ffffff);">
          <div class="fact-hero-icon">${fact.icon}</div>
          <h3>${fact.title}</h3>
          <span class="fact-hero-cat">${fact.category}</span>
        </div>

        <!-- 4 Key Stats Badges Grid -->
        <div class="fact-stats-grid">
          ${fact.keyStats.map(s => `
            <div class="fact-stat-card">
              <span class="stat-badge-lbl">${s.label}</span>
              <span class="stat-badge-val">${s.value}</span>
            </div>
          `).join('')}
        </div>

        <!-- Story Content -->
        <div class="fact-story-box">
          <h4>The Science Story</h4>
          <p>${fact.fullStory}</p>
        </div>

        <!-- Did You Know Box -->
        <div class="fact-trivia-callout">
          <div class="trivia-icon">💡</div>
          <div class="trivia-text">
            <strong>Did You Know?</strong>
            <p>${fact.didYouKnow}</p>
          </div>
        </div>

        <!-- Bookmark button -->
        <div class="floating-bottom-bar">
          <button class="btn-primary-fun btn-block" id="btn-toggle-fact-fav">
            ${isFav ? '★ Saved to Favourites' : '☆ Save to Favourites'}
          </button>
        </div>
      </div>
    `;

    const backBtn = container.querySelector('#btn-back-library');
    if (backBtn) backBtn.onclick = () => {
      window.soundEngine.click();
      this.app.navigate('library');
    };

    const favBtn = container.querySelector('#btn-fact-fav');
    const bottomFavBtn = container.querySelector('#btn-toggle-fact-fav');

    const toggleFav = () => {
      window.soundEngine.blip();
      const isF = window.storageManager.toggleFavorite('facts', fact.id);
      favBtn.classList.toggle('active', isF);
      favBtn.textContent = isF ? '★' : '☆';
      bottomFavBtn.textContent = isF ? '★ Saved to Favourites' : '☆ Save to Favourites';
    };

    if (favBtn) favBtn.onclick = toggleFav;
    if (bottomFavBtn) bottomFavBtn.onclick = toggleFav;
  }
}

window.LibraryView = LibraryView;
