# 🔬 Mini Science Lab — Child-Friendly Offline Science Learning App

**Mini Science Lab** is a complete, child-friendly, offline-first science learning application built to match the visual reference system provided in `01_Individual_Screen_References` and `02_Overview_Collages_optional`. It features hands-on household experiments, interactive canvas-based physics and biology simulations, rich STEM quizzes with review and explanations, personal research lab journal, badge reward achievements, a science library encyclopedia, and kid-safe parental controls.

---

## 🎨 Visual Style & Architecture

- **Visual Palette**: Bright sky blue (`#0284c7`, `#38bdf8`), sunny amber/gold (`#f59e0b`, `#fbbf24`), vibrant emerald green (`#10b981`), royal purple (`#8b5cf6`), and soft clean pastel card backgrounds.
- **Child-Friendly Robot Mascot**: Vector SVG robot with expressive animations (*excited, happy, curious thinking, celebrate fanfare, and empathetic oops expressions*).
- **Offline-First Zero-Server Engine**: Runs 100% without an internet connection or backend server.
- **Sound Synthesizer**: Uses standard Web Audio API oscillators to generate real tactile clicks, fanfare arpeggios, correct/incorrect chimes, and ambient laboratory music without external audio files.
- **Local Persistence**: Stores user profile, XP points, levels, unlocked badges, quiz history, completed experiments, bookmarked favorites, and personal notes directly in `localStorage`.
- **Responsive Mobile & Desktop View**: Includes a mobile phone simulator shell (matching the portrait reference screenshots) and a desktop/tablet expanded mode switch.

---

## 🌟 Core Screens & Features (Matching Reference Images 1–36+)

### 1. Onboarding & Profile Setup (Screens 1–4)
- **Splash Screen**: Glowing animated Robot Mascot with loading dots.
- **Welcome Screen**: Overview of experiments, simulations, quizzes, and quick access buttons.
- **Profile Setup**: Choose scientist name and age group (*6–8, 9–11, 12–14*).
- **Avatar Selection**: Pick from 8 distinct child-friendly avatars (*Curious Boy, Girl Scientist, Astro Junior, Brave Explorer, Cosmic Kid, Robot Buddy, Chemist, Field Guide*).

### 2. Home Dashboard (Screen 5)
- **Top Bar**: Explorer avatar, scientist rank title, XP counter, Level badge, and quick Settings gear.
- **Robot Mascot Tip**: Cheerful greeting and speech bubble.
- **Explore Grid**: Instant access to Experiments, Simulations, Quizzes, My Lab, Achievements, and Science Library.
- **Activity of the Day**: Featured experiment banner (*Magnet Magic*).

### 3. Experiments Lab (Screens 6–12 & 14)
- **Catalogue & Search**: Real-time search and filtering by category (*Physics, Chemistry, Biology, Earth Science*) and difficulty (*Easy, Medium, Hard*).
- **10 Safe Household Experiments**:
  1. 🧲 *Magnet Magic* (Physics)
  2. ⚡ *Build a Simple Circuit* (Physics)
  3. 🥛 *Magic Milk & Surface Tension* (Chemistry)
  4. 🥚 *Floating Egg Density Challenge* (Physics)
  5. 🧪 *Acids & Bases with Turmeric Indicator* (Chemistry)
  6. 🎈 *Balloon Rocket Action & Reaction* (Physics)
  7. 🌋 *Homemade Foaming Volcano* (Chemistry)
  8. 🌿 *Plant Water Journey & Capillary Action* (Biology)
  9. 🌧️ *Rain Cloud in a Jar* (Earth Science)
  10. 💎 *Grow Sparkly Salt Crystal Gardens* (Chemistry)
- **Materials Checklist (Screen 9)**: Interactive tap-to-check grid of required household items.
- **Safety Instructions (Screen 10)**: Mandatory adult supervision notice and safety rules checklist with agreement lock.
- **Step-by-Step Guide (Screen 11)**: Progressive step cards with mascot tips, pagination dots, and prev/next navigation.
- **Results & Explanation (Screen 12 & 14)**: Before/After scientific explanation of chemical and physical reactions with confetti fanfare and +50 XP reward.

### 4. Interactive Physics & Biology Simulations (Screens 13–18 & Botany Lab)
1. ⚡ **Build a Circuit (Screen 14)**: Interactive breadboard with 1.5V/3V/9V batteries, knife switch, and glowing bulb with animated electron flow.
2. 🪐 **Solar System Explorer (Screen 15)**: Animated orbits of Sun and 8 planets with speed slider, orbit pause, and tap-to-inspect cosmic data.
3. 🌧️ **The Water Cycle (Screen 16)**: Interactive 4-stage atmospheric journey: Evaporation, Condensation, Precipitation, and Collection with particle engine and auto-cycle.
4. 🧊 **States of Matter (Screen 17)**: Live molecular particle chamber with temperature slider (-50°C to 150°C) modeling solid lattice vibration, liquid flow, and gas collision.
5. 🧲 **Magnet Lab (Screen 18 in s3.jpeg)**: Bar magnet with magnetic field lines toggle, pole flipper (N ↔ S), and draggable magnetic items (paperclips, coins) vs non-magnetic items (plastic, wood).
6. 🫀 **Human Body Explorer (Screen 18)**: Anatomical diagram with tap-to-inspect organs (Brain, Lungs, beating Heart with pulse sound, Stomach, Intestines).
7. 🌱 **Plant Growth & Botany Lab**: Interactive seed germination, root expansion, sunlight controls, watering can raindrops, flower blooming, and fruit harvest!

### 5. Quizzes & Challenge Arena (Screens 19–23)
- **6 Domain Quizzes**: Science Basics, Physics Fun, Chemistry Sparks, Biology & Nature, Space & Planets, and Mixed Champion Challenge (10 questions each, 60 total questions).
- **Question Player (Screen 20)**: Progress bar, multiple-choice options (A, B, C, D), and score counter.
- **Instant Feedback Modals (Screens 21–22)**: Cheerful mascot with explanation for both correct and incorrect answers.
- **Results & Review (Screen 23)**: Golden trophy, percentage score, XP bonuses, question-by-question answer review, and retry.

### 6. My Lab & Progress Hub (Screens 24–26)
- **My Lab Dashboard (Screen 24)**: Central hub with circular progress summary, streak count, and section links.
- **Dedicated Progress Screen (Screen 25)**: Large 360-degree progress ring with category breakdowns for Experiments, Simulations, Quizzes, and Badges.
- **Completed Activities Screen (Screen 26)**: Filterable log of completed experiments and explored simulations with green checkmarks.
- **Quiz History Screen**: Historical log of completed quizzes with score badges.
- **My Science Journal**: Create, read, and delete personal science observation notes.
- **Saved Favourites**: Instant bookmarking for favorite experiments and science facts.

### 7. Achievements & Levels (Screens 27–30)
- **12 Unlockable Badges**: First Steps, Safety First, Magnet Master, Circuit Wizard, Space Explorer, Water Wise, Quiz Champion, Science Explorer, Junior Chemist, Field Researcher, Science Superstar, Science Legend.
- **5 Scientist Levels**: Curious Explorer (Lvl 1), Lab Apprentice (Lvl 2), Junior Scientist (Lvl 3), Science Inventor (Lvl 4), Master Professor (Lvl 5).
- **Celebration Modals**: New Badge Unlocked modal with confetti and Level Up screen with golden crown.

### 8. More Menu, Science Library & Settings (Screens 31–36)
- **More Navigation Menu (Screen 34)**: Direct links to Science Library, My Lab, Achievements, Settings, Offline Status, Help & Support, About, and Exit.
- **Science Library (Screen 31)**: Searchable encyclopedia with topics (Sun, Earth, Saturn, Brain, etc.).
- **Science Fact Detail (Screen 32)**: Hero visual, 4 key metrics, deep dive story, "Did You Know?" callout, and bookmark button.
- **Settings (Screen 33)**: Sound toggle, ambient music toggle, Light/Dark/Auto theme switcher, font size scaling, math-gated Parental Controls, offline mode information, and safe progress reset.
- **Offline Screen (Screen 35)**: Dedicated offline status screen with mascot, offline readiness checklist, and connection test button.
- **Help & Support (Screen 36)**: Expandable FAQs, safety guidelines, and child-friendly rating reactions.
- **Exit Confirmation Dialog**: Safe confirmation modal before exiting.

---

## 🚀 How to Run

### Method 1: Instant Local Web Server (Browser)
Simply run any standard HTTP server in the `mini-science-lab` folder:

```bash
cd mini-science-lab
python -m http.server 8080
```
Then open [http://localhost:8080](http://localhost:8080) in any web browser.

### Method 2: Offline Android PWA (Mobile)
1. Open the URL in Google Chrome on your Android device.
2. Tap the three dots (⋮) menu in Chrome and select **"Install App"** or **"Add to Home Screen"**.
3. The app installs as a standalone Android application with offline caching via Service Worker.

---

## 🔒 Child Safety & Offline Compliance

- **No Public Chat**: Protects children from unauthorized external communication.
- **No Analytics / Tracking**: Compliant with COPPA and child privacy standards.
- **Zero-Internet Guarantee**: All educational content, logic, sound synthesizers, and images run locally from local assets and vector SVGs.
