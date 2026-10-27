// Mini Science Lab - Friendly Robot Mascot SVG Generator
// Renders dynamic, responsive, and animated SVG robot mascots for any mood!

class RobotMascot {
  static getSVG(mood = 'happy', size = 120, animated = true) {
    const animClass = animated ? 'mascot-animated' : '';
    
    // Eye expression based on mood
    let eyesSvg = '';
    let mouthSvg = '';
    let accessorySvg = '';

    switch (mood) {
      case 'excited':
      case 'celebrate':
        eyesSvg = `
          <!-- Sparkling curved happy eyes -->
          <path d="M 42 62 Q 52 50 62 62" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" fill="none" />
          <path d="M 78 62 Q 88 50 98 62" stroke="#38bdf8" stroke-width="6" stroke-linecap="round" fill="none" />
          <circle cx="46" cy="55" r="2.5" fill="#ffffff" />
          <circle cx="82" cy="55" r="2.5" fill="#ffffff" />
        `;
        mouthSvg = `
          <!-- Big happy open grin -->
          <path d="M 54 75 Q 70 92 86 75 Z" fill="#38bdf8" />
          <path d="M 60 76 Q 70 82 80 76" stroke="#ffffff" stroke-width="2" fill="none" />
        `;
        accessorySvg = `
          <!-- Confetti / Star sparkle around antenna -->
          <polygon points="70,6 72,13 79,14 74,18 76,25 70,21 64,25 66,18 61,14 68,13" fill="#fbbf24" class="sparkle-star" />
        `;
        break;

      case 'thinking':
        eyesSvg = `
          <!-- Looking upwards/sideways curious eyes -->
          <circle cx="56" cy="56" r="8" fill="#38bdf8" />
          <circle cx="59" cy="53" r="3" fill="#ffffff" />
          <circle cx="92" cy="56" r="8" fill="#38bdf8" />
          <circle cx="95" cy="53" r="3" fill="#ffffff" />
        `;
        mouthSvg = `
          <!-- Cute squiggly thinking mouth -->
          <path d="M 62 76 Q 66 73 70 76 Q 74 79 78 76" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" fill="none" />
        `;
        accessorySvg = `
          <!-- Little light bulb above antenna -->
          <circle cx="70" cy="12" r="7" fill="#fef08a" stroke="#f59e0b" stroke-width="2" />
        `;
        break;

      case 'oops':
      case 'sad':
        eyesSvg = `
          <!-- Soft, gentle sympathetic drooped eyes -->
          <circle cx="50" cy="62" r="7" fill="#38bdf8" />
          <circle cx="52" cy="60" r="2.5" fill="#ffffff" />
          <circle cx="90" cy="62" r="7" fill="#38bdf8" />
          <circle cx="92" cy="60" r="2.5" fill="#ffffff" />
          <!-- Drooping brows -->
          <path d="M 44 50 L 56 54" stroke="#0284c7" stroke-width="3" stroke-linecap="round" />
          <path d="M 96 50 L 84 54" stroke="#0284c7" stroke-width="3" stroke-linecap="round" />
        `;
        mouthSvg = `
          <!-- Small gentle wavy mouth -->
          <path d="M 62 80 Q 70 75 78 80" stroke="#38bdf8" stroke-width="4" stroke-linecap="round" fill="none" />
        `;
        break;

      case 'waving':
      case 'welcome':
        eyesSvg = `
          <circle cx="50" cy="58" r="8" fill="#38bdf8" />
          <circle cx="53" cy="55" r="3" fill="#ffffff" />
          <circle cx="90" cy="58" r="8" fill="#38bdf8" />
          <circle cx="93" cy="55" r="3" fill="#ffffff" />
        `;
        mouthSvg = `
          <path d="M 58 74 Q 70 85 82 74" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" fill="none" />
        `;
        accessorySvg = `
          <!-- Star on antenna -->
          <circle cx="70" cy="12" r="6" fill="#fbbf24" />
        `;
        break;

      case 'happy':
      default:
        eyesSvg = `
          <!-- Large friendly round glowing blue eyes -->
          <circle cx="50" cy="58" r="8" fill="#38bdf8" />
          <circle cx="53" cy="55" r="3" fill="#ffffff" />
          <circle cx="90" cy="58" r="8" fill="#38bdf8" />
          <circle cx="93" cy="55" r="3" fill="#ffffff" />
        `;
        mouthSvg = `
          <!-- Cheerful friendly curved smile -->
          <path d="M 58 74 Q 70 84 82 74" stroke="#38bdf8" stroke-width="5" stroke-linecap="round" fill="none" />
        `;
        accessorySvg = `
          <!-- Glowing yellow sphere on antenna -->
          <circle cx="70" cy="12" r="6" fill="#facc15" />
        `;
        break;
    }

    return `
      <svg class="robot-mascot-svg ${animClass}" viewBox="0 0 140 140" width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#ffffff" />
            <stop offset="70%" stop-color="#f0f9ff" />
            <stop offset="100%" stop-color="#bae6fd" />
          </linearGradient>
          <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#0f172a" />
            <stop offset="100%" stop-color="#1e293b" />
          </linearGradient>
          <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#38bdf8" />
            <stop offset="100%" stop-color="#0284c7" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Antenna -->
        <rect x="67" y="16" width="6" height="18" rx="3" fill="url(#accentGrad)" />
        ${accessorySvg}

        <!-- Left Ear / Headphone -->
        <rect x="16" y="50" width="10" height="24" rx="5" fill="url(#accentGrad)" />
        <!-- Right Ear / Headphone -->
        <rect x="114" y="50" width="10" height="24" rx="5" fill="url(#accentGrad)" />

        <!-- Robot Head Shell -->
        <rect x="22" y="28" width="96" height="74" rx="28" fill="url(#bodyGrad)" stroke="#bae6fd" stroke-width="3" />

        <!-- Visor / Face Screen -->
        <rect x="32" y="38" width="76" height="54" rx="18" fill="url(#screenGrad)" />

        <!-- Cheeks blush -->
        <circle cx="42" cy="74" r="4" fill="#f472b6" opacity="0.6" />
        <circle cx="98" cy="74" r="4" fill="#f472b6" opacity="0.6" />

        <!-- Eyes and Mouth -->
        <g filter="url(#glow)">
          ${eyesSvg}
          ${mouthSvg}
        </g>

        <!-- Body / Lab Coat Collar Hint -->
        <path d="M 44 104 Q 70 114 96 104 L 102 128 Q 70 134 38 128 Z" fill="url(#bodyGrad)" stroke="#bae6fd" stroke-width="2.5" />
        <!-- Lab Flask or Atom Badge on Chest -->
        <circle cx="70" cy="120" r="6" fill="#38bdf8" />
        <circle cx="70" cy="120" r="3" fill="#ffffff" />
      </svg>
    `;
  }
}

window.RobotMascot = RobotMascot;
