// Mini Science Lab - Illustrated Avatar SVG Generator
// Original hand-drawn vector avatars (flat, friendly, rounded) matching the
// app's palette and the RobotMascot's visual language. Replaces raw system
// emoji so avatars render crisp and consistent at any size, on any device,
// with zero network/image assets required.

class AvatarArt {
  static getSVG(avatarId, size = 96) {
    const skin = '#f4c9a0';
    const blush = '#f8a8a0';

    let bg = '#0284c7';
    let bg2 = '#38bdf8';
    let extras = '';
    let eyes = `
      <circle cx="54" cy="70" r="6.5" fill="#1e293b" />
      <circle cx="86" cy="70" r="6.5" fill="#1e293b" />
      <circle cx="56.5" cy="67.5" r="2" fill="#ffffff" />
      <circle cx="88.5" cy="67.5" r="2" fill="#ffffff" />
    `;
    let mouth = `<path d="M 60 86 Q 70 94 80 86" stroke="#9a4a3a" stroke-width="3.5" stroke-linecap="round" fill="none" />`;
    let face = `<circle cx="70" cy="76" r="34" fill="${skin}" />`;
    let cheeks = `
      <circle cx="48" cy="82" r="5" fill="${blush}" opacity="0.55" />
      <circle cx="92" cy="82" r="5" fill="${blush}" opacity="0.55" />
    `;

    switch (avatarId) {
      case 'avatar_explorer_boy': // Curious Boy
        bg = '#10b981'; bg2 = '#34d399';
        extras = `
          <path d="M 38 64 Q 42 30 70 30 Q 98 30 102 64 Q 90 50 70 50 Q 50 50 38 64 Z" fill="#5b3a29" />
          <path d="M 36 60 Q 40 54 46 58 Q 42 66 38 68 Z" fill="#5b3a29" />
          <path d="M 104 60 Q 100 54 94 58 Q 98 66 102 68 Z" fill="#5b3a29" />
        `;
        eyes = `
          <path d="M 48 68 Q 54 62 60 68" stroke="#1e293b" stroke-width="4" stroke-linecap="round" fill="none" />
          <circle cx="86" cy="70" r="6.5" fill="#1e293b" />
          <circle cx="88.5" cy="67.5" r="2" fill="#ffffff" />
        `;
        mouth = `<path d="M 58 85 Q 70 96 82 85" stroke="#9a4a3a" stroke-width="3.5" stroke-linecap="round" fill="none" />`;
        break;

      case 'avatar_scientist_girl': // Girl Scientist
        bg = '#8b5cf6'; bg2 = '#a78bfa';
        extras = `
          <path d="M 38 66 Q 40 28 70 28 Q 100 28 102 66 Q 92 46 70 46 Q 48 46 38 66 Z" fill="#3b2a1a" />
          <ellipse cx="104" cy="52" rx="7" ry="16" fill="#3b2a1a" transform="rotate(18 104 52)" />
          <circle cx="54" cy="58" r="11" fill="none" stroke="#fbbf24" stroke-width="3.5" />
          <circle cx="86" cy="58" r="11" fill="none" stroke="#fbbf24" stroke-width="3.5" />
          <line x1="65" y1="58" x2="75" y2="58" stroke="#fbbf24" stroke-width="3.5" />
        `;
        break;

      case 'avatar_curious_boy': // Astro Junior
        bg = '#0284c7'; bg2 = '#0ea5e9';
        extras = `
          <path d="M 35 78 A 35 35 0 0 1 105 78 L 100 92 Q 70 100 40 92 Z" fill="#e2e8f0" opacity="0.9" stroke="#94a3b8" stroke-width="2" />
          <ellipse cx="58" cy="60" rx="10" ry="6" fill="#ffffff" opacity="0.55" />
          <circle cx="70" cy="22" r="4" fill="#fbbf24" />
          <circle cx="92" cy="30" r="2.5" fill="#fde68a" />
          <circle cx="48" cy="28" r="2.5" fill="#fde68a" />
        `;
        break;

      case 'avatar_braids_girl': // Brave Explorer
        bg = '#f59e0b'; bg2 = '#fbbf24';
        extras = `
          <path d="M 36 58 Q 70 22 104 58 Q 104 44 70 40 Q 36 44 36 58 Z" fill="#c2662b" />
          <ellipse cx="70" cy="46" rx="40" ry="10" fill="#c2662b" />
          <path d="M 38 68 Q 30 90 36 108" stroke="#5b3a29" stroke-width="7" stroke-linecap="round" fill="none" />
          <path d="M 102 68 Q 110 90 104 108" stroke="#5b3a29" stroke-width="7" stroke-linecap="round" fill="none" />
          <circle cx="36" cy="108" r="4" fill="#9a4a3a" />
          <circle cx="104" cy="108" r="4" fill="#9a4a3a" />
        `;
        break;

      case 'avatar_astro_kid': // Cosmic Kid
        bg = '#8b5cf6'; bg2 = '#f472b6';
        extras = `
          <path d="M 36 62 Q 70 20 104 62 L 104 50 Q 70 32 36 50 Z" fill="#4c1d95" />
          <polygon points="48,38 50,43 55,43 51,46 53,51 48,48 43,51 45,46 41,43 46,43" fill="#fbbf24" />
          <polygon points="92,32 93.5,36 98,36 94.5,38.5 96,42.5 92,40 88,42.5 89.5,38.5 86,36 90.5,36" fill="#ffffff" />
        `;
        break;

      case 'avatar_robot_mascot': // Robot Buddy
        bg = '#0ea5e9'; bg2 = '#38bdf8';
        face = `<rect x="38" y="48" width="64" height="56" rx="18" fill="#eef6ff" stroke="#bae6fd" stroke-width="3" />`;
        cheeks = '';
        extras = `
          <rect x="66" y="22" width="8" height="16" rx="4" fill="#94a3b8" />
          <circle cx="70" cy="20" r="6" fill="#fbbf24" />
        `;
        eyes = `
          <circle cx="56" cy="74" r="8" fill="#38bdf8" />
          <circle cx="84" cy="74" r="8" fill="#38bdf8" />
          <circle cx="58.5" cy="71.5" r="2.5" fill="#ffffff" />
          <circle cx="86.5" cy="71.5" r="2.5" fill="#ffffff" />
        `;
        mouth = `<rect x="58" y="88" width="24" height="5" rx="2.5" fill="#38bdf8" />`;
        break;

      case 'avatar_chemist_kid': // Chemist
        bg = '#10b981'; bg2 = '#2dd4bf';
        extras = `
          <path d="M 38 62 Q 42 32 70 32 Q 98 32 102 62 Q 90 48 70 48 Q 50 48 38 62 Z" fill="#1f2937" />
          <circle cx="54" cy="70" r="12" fill="#fde68a" opacity="0.5" stroke="#f59e0b" stroke-width="3" />
          <circle cx="86" cy="70" r="12" fill="#fde68a" opacity="0.5" stroke="#f59e0b" stroke-width="3" />
          <line x1="66" y1="70" x2="74" y2="70" stroke="#f59e0b" stroke-width="3" />
          <path d="M 64 98 L 64 108 L 56 122 L 84 122 L 76 108 L 76 98 Z" fill="none" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" />
        `;
        eyes = `
          <circle cx="54" cy="70" r="4.5" fill="#1e293b" />
          <circle cx="86" cy="70" r="4.5" fill="#1e293b" />
        `;
        break;

      case 'avatar_nature_kid': // Field Guide
        bg = '#65a30d'; bg2 = '#84cc16';
        extras = `
          <ellipse cx="70" cy="48" rx="42" ry="9" fill="#a16207" />
          <path d="M 44 48 Q 44 24 70 24 Q 96 24 96 48 Z" fill="#ca8a04" />
          <path d="M 44 108 Q 70 118 96 108 L 96 118 Q 70 126 44 118 Z" fill="#dc2626" />
        `;
        break;

      default:
        bg = '#0284c7'; bg2 = '#38bdf8';
    }

    return `
      <svg class="avatar-art" width="${size}" height="${size}" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="avatar">
        <defs>
          <linearGradient id="avbg-${avatarId}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${bg}" />
            <stop offset="100%" stop-color="${bg2}" />
          </linearGradient>
        </defs>
        <circle cx="70" cy="70" r="68" fill="url(#avbg-${avatarId})" />
        ${face}
        ${cheeks}
        ${eyes}
        ${mouth}
        ${extras}
      </svg>
    `;
  }
}

window.AvatarArt = AvatarArt;
