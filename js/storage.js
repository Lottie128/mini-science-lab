// Mini Science Lab - Persistent Local Storage & State Engine
// Robust, offline-first, handles duplicate prevention and level progression.

class StorageManager {
  constructor() {
    this.STORAGE_KEY = 'mini_science_lab_state_v1';
    this.state = this.loadState();
  }

  getDefaultState() {
    return {
      profile: {
        name: 'Science Explorer',
        ageGroup: '9-11',
        avatarId: 'avatar_explorer_boy',
        hasCompletedOnboarding: false,
        createdAt: new Date().toISOString()
      },
      stats: {
        xp: 0,
        level: 1,
        streakDays: 1,
        lastActiveDate: new Date().toISOString().split('T')[0]
      },
      completedExperiments: [],
      completedQuizzes: [], // { id, title, score, total, date, percentage }
      completedSimulations: [], // array of simulation IDs explored
      unlockedBadges: [], // array of badge IDs
      favorites: {
        experiments: [],
        facts: []
      },
      notes: [
        {
          id: 'note_welcome',
          title: 'My Science Journey Begins!',
          category: 'General',
          content: 'Today I started my Mini Science Lab. I am excited to test experiments and explore the solar system!',
          date: new Date().toISOString().split('T')[0]
        }
      ],
      settings: {
        sound: true,
        music: false,
        theme: 'light', // 'light' | 'dark' | 'system'
        textSize: 'medium', // 'small' | 'medium' | 'large'
        parentalLocked: false
      }
    };
  }

  loadState() {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        const defaults = this.getDefaultState();
        return {
          ...defaults,
          ...parsed,
          profile: { ...defaults.profile, ...(parsed.profile || {}) },
          stats: { ...defaults.stats, ...(parsed.stats || {}) },
          settings: { ...defaults.settings, ...(parsed.settings || {}) },
          favorites: { ...defaults.favorites, ...(parsed.favorites || {}) }
        };
      }
    } catch (e) {
      console.warn('Failed to parse saved state, using default:', e);
    }
    return this.getDefaultState();
  }

  save() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.error('LocalStorage write error:', e);
    }
  }

  // Profile methods
  getProfile() {
    return this.state.profile;
  }

  updateProfile(profileData) {
    this.state.profile = { ...this.state.profile, ...profileData };
    this.save();
    // Check first-step badge
    this.checkBadges();
  }

  // XP & Level calculations
  // Level 1: 0-99 XP
  // Level 2: 100-249 XP
  // Level 3: 250-449 XP
  // Level 4: 450-699 XP
  // Level 5: 700+ XP
  calculateLevel(xp) {
    if (xp >= 700) return 5;
    if (xp >= 450) return 4;
    if (xp >= 250) return 3;
    if (xp >= 100) return 2;
    return 1;
  }

  getLevelTitle(level) {
    const titles = {
      1: 'Curious Explorer',
      2: 'Lab Apprentice',
      3: 'Junior Scientist',
      4: 'Science Inventor',
      5: 'Master Professor'
    };
    return titles[level] || 'Curious Explorer';
  }

  addXP(amount, source = '') {
    const prevLevel = this.calculateLevel(this.state.stats.xp);
    this.state.stats.xp += amount;
    const newLevel = this.calculateLevel(this.state.stats.xp);
    this.state.stats.level = newLevel;
    this.save();

    let levelUp = false;
    if (newLevel > prevLevel) {
      levelUp = true;
    }

    // Check badges after XP increase
    const newBadges = this.checkBadges();

    return {
      totalXp: this.state.stats.xp,
      levelUp: levelUp,
      newLevel: newLevel,
      newBadges: newBadges
    };
  }

  // Experiments
  isExperimentCompleted(id) {
    return this.state.completedExperiments.includes(id);
  }

  completeExperiment(id, xp = 50) {
    const already = this.state.completedExperiments.includes(id);
    if (!already) {
      this.state.completedExperiments.push(id);
    }
    // Award XP
    const xpResult = this.addXP(xp, `Experiment: ${id}`);
    this.save();
    return { ...xpResult, firstTime: !already };
  }

  // Simulations
  isSimulationCompleted(id) {
    return this.state.completedSimulations.includes(id);
  }

  completeSimulation(id, xp = 30) {
    const already = this.state.completedSimulations.includes(id);
    if (!already) {
      this.state.completedSimulations.push(id);
    }
    const xpResult = this.addXP(xp, `Simulation: ${id}`);
    this.save();
    return { ...xpResult, firstTime: !already };
  }

  // Quizzes
  recordQuizResult(quizData) {
    // quizData: { id, title, score, total, xpEarned }
    const entry = {
      id: quizData.id,
      title: quizData.title,
      score: quizData.score,
      total: quizData.total,
      percentage: Math.round((quizData.score / quizData.total) * 100),
      date: new Date().toLocaleDateString()
    };
    this.state.completedQuizzes.unshift(entry);
    const xpResult = this.addXP(quizData.xpEarned, `Quiz: ${quizData.title}`);
    this.save();
    return xpResult;
  }

  // Favourites
  isFavorite(type, id) {
    return (this.state.favorites[type] || []).includes(id);
  }

  toggleFavorite(type, id) {
    if (!this.state.favorites[type]) {
      this.state.favorites[type] = [];
    }
    const index = this.state.favorites[type].indexOf(id);
    let isFav = false;
    if (index > -1) {
      this.state.favorites[type].splice(index, 1);
      isFav = false;
    } else {
      this.state.favorites[type].push(id);
      isFav = true;
    }
    this.save();
    return isFav;
  }

  // Notes
  getNotes() {
    return this.state.notes || [];
  }

  addNote(title, category, content) {
    const note = {
      id: 'note_' + Date.now(),
      title: title || 'Science Note',
      category: category || 'General',
      content: content || '',
      date: new Date().toLocaleDateString()
    };
    this.state.notes.unshift(note);
    this.save();
    this.checkBadges();
    return note;
  }

  deleteNote(id) {
    this.state.notes = (this.state.notes || []).filter(n => n.id !== id);
    this.save();
  }

  // Settings
  getSettings() {
    return this.state.settings;
  }

  updateSettings(newSettings) {
    this.state.settings = { ...this.state.settings, ...newSettings };
    this.save();
  }

  // Reset entire progress
  resetAllProgress() {
    this.state = this.getDefaultState();
    this.save();
  }

  // Badge Checking Logic
  checkBadges() {
    const unlocked = [];
    const currentUnlocked = new Set(this.state.unlockedBadges);

    const tryUnlock = (badgeId) => {
      if (!currentUnlocked.has(badgeId)) {
        currentUnlocked.add(badgeId);
        unlocked.push(badgeId);
        this.state.unlockedBadges.push(badgeId);
      }
    };

    // 1. First Steps: completed profile
    if (this.state.profile.hasCompletedOnboarding) {
      tryUnlock('first_steps');
    }

    // 2. Safety First: at least 1 experiment completed
    if (this.state.completedExperiments.length >= 1) {
      tryUnlock('safety_first');
    }

    // 3. Magnet Master: completed magnet magic experiment
    if (this.state.completedExperiments.includes('magnet_magic') || this.state.completedSimulations.includes('magnets')) {
      tryUnlock('magnet_master');
    }

    // 4. Circuit Wizard: completed circuit simulation
    if (this.state.completedSimulations.includes('circuit')) {
      tryUnlock('circuit_wizard');
    }

    // 5. Space Explorer: explored solar system
    if (this.state.completedSimulations.includes('solar')) {
      tryUnlock('space_explorer');
    }

    // 6. Water Wise: completed water cycle
    if (this.state.completedSimulations.includes('water_cycle')) {
      tryUnlock('water_wise');
    }

    // 7. Quiz Champion: scored >= 80% on any quiz
    const hasHighScore = this.state.completedQuizzes.some(q => q.percentage >= 80);
    if (hasHighScore) {
      tryUnlock('quiz_champion');
    }

    // 8. Science Explorer: completed 5 experiments
    if (this.state.completedExperiments.length >= 5) {
      tryUnlock('science_explorer');
    }

    // 9. Junior Chemist: completed at least 2 chemistry experiments
    const chemCompleted = this.state.completedExperiments.filter(id => 
      ['magic_milk', 'acids_bases', 'homemade_volcano', 'salt_crystals'].includes(id)
    );
    if (chemCompleted.length >= 2) {
      tryUnlock('junior_chemist');
    }

    // 10. Field Researcher: added a personal note
    if (this.state.notes.length >= 2) {
      tryUnlock('field_researcher');
    }

    // 11. Level 3 Milestone
    if (this.state.stats.level >= 3) {
      tryUnlock('science_superstar');
    }

    // 12. Science Legend: 500+ XP
    if (this.state.stats.xp >= 500) {
      tryUnlock('science_legend');
    }

    if (unlocked.length > 0) {
      this.save();
    }

    return unlocked;
  }
}

window.storageManager = new StorageManager();
