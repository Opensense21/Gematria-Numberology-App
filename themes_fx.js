// ARITHMOS HO THEOS — GTA 6 (Vice Neon) × Zelda: Ocarina of Time Themes, Icons, Stickers & FX
(function () {
  const STORAGE_KEY = 'arithmos_theme';
  const VALID_THEMES = ['classic', 'mashup', 'gta6', 'zelda'];

  // ---- Crisp Custom Inline SVG Icons & Stickers ----
  const SVGS = {
    triforceIcon: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polygon points="12,3 17,11.5 7,11.5" fill="#f6c945" stroke="#b88412" stroke-width="1"/>
      <polygon points="7,12 12,20.5 2,20.5" fill="#f6c945" stroke="#b88412" stroke-width="1"/>
      <polygon points="17,12 22,20.5 12,20.5" fill="#f6c945" stroke="#b88412" stroke-width="1"/>
    </svg>`,

    ocarinaIcon: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 14.5C4 10 8.5 7 14 7c3.5 0 6 1.8 6 4.5 0 3.2-3 5.5-7 5.5-2.5 0-4.2-.8-5.5-1.5L4 17v-2.5z" fill="#3b82f6" stroke="#93c5fd" stroke-width="1.3"/>
      <rect x="6.5" y="10.2" width="2.5" height="5.5" rx="1" fill="#f6c945"/>
      <circle cx="12" cy="11.2" r="1.1" fill="#e0f2fe"/>
      <circle cx="15" cy="10.4" r="1.1" fill="#e0f2fe"/>
      <circle cx="17.2" cy="12.2" r="1.1" fill="#e0f2fe"/>
    </svg>`,

    naviIcon: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g class="svg-navi-wings">
        <ellipse cx="7.5" cy="9.5" rx="4.2" ry="2.2" transform="rotate(-24 7.5 9.5)" fill="rgba(186,247,255,0.75)"/>
        <ellipse cx="16.5" cy="9.5" rx="4.2" ry="2.2" transform="rotate(24 16.5 9.5)" fill="rgba(186,247,255,0.75)"/>
        <ellipse cx="8.5" cy="14.5" rx="2.8" ry="1.4" transform="rotate(18 8.5 14.5)" fill="rgba(186,247,255,0.6)"/>
        <ellipse cx="15.5" cy="14.5" rx="2.8" ry="1.4" transform="rotate(-18 15.5 14.5)" fill="rgba(186,247,255,0.6)"/>
      </g>
      <circle cx="12" cy="12" r="4.6" fill="#58f2ff"/>
      <circle cx="12" cy="12" r="2.6" fill="#ffffff"/>
    </svg>`,

    vicePalmIcon: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="viceSunMini" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffb84d"/>
          <stop offset="55%" stop-color="#ff3ea5"/>
          <stop offset="100%" stop-color="#7c3aed"/>
        </linearGradient>
      </defs>
      <circle cx="12" cy="11.5" r="7.5" fill="url(#viceSunMini)"/>
      <path d="M12.5 21V11.2M12.5 11.2C10 9.5 7.5 9.6 5.8 11.2M12.5 11.2C10.5 8.2 8.2 7.2 6.5 7.6M12.5 11.2C15 9.2 17.5 9.4 19 11M12.5 11.2C14.8 8 16.8 7.2 18.4 7.7" stroke="#140822" stroke-width="1.6" stroke-linecap="round"/>
    </svg>`,

    wantedStarIcon: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polygon points="12,2.5 14.9,8.4 21.4,9.3 16.7,13.9 17.8,20.4 12,17.3 6.2,20.4 7.3,13.9 2.6,9.3 9.1,8.4" fill="#ff3ea5" stroke="#00f0ff" stroke-width="1.3" stroke-linejoin="round"/>
    </svg>`,

    threeSunsIcon: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <ellipse cx="12" cy="12" rx="9" ry="4.5" transform="rotate(-25 12 12)" stroke="#00f0ff" stroke-width="1.1" opacity="0.8"/>
      <ellipse cx="12" cy="12" rx="9" ry="4.5" transform="rotate(35 12 12)" stroke="#ff3ea5" stroke-width="1.1" opacity="0.8"/>
      <circle cx="8" cy="9" r="2.6" fill="#ffb84d"/>
      <circle cx="16.5" cy="10.5" r="2.1" fill="#ff3ea5"/>
      <circle cx="11.5" cy="16.2" r="2.3" fill="#58f2ff"/>
    </svg>`,

    rupeeIcon: `<svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <polygon points="12,2 18.5,7.5 18.5,16.5 12,22 5.5,16.5 5.5,7.5" fill="#2fd980" stroke="#a7f3d0" stroke-width="1.3"/>
      <polygon points="12,5.5 15.5,8.8 15.5,15.2 12,18.5 8.5,15.2 8.5,8.8" fill="#6ee7b7" opacity="0.55"/>
    </svg>`,

    // Large Ambient Header Sticker: GTA 6 Vice City Sunset + Palm Trees
    viceStickerLarge: `<svg width="92" height="92" viewBox="0 0 110 110" fill="none" class="svg-neon-pulse" aria-hidden="true">
      <defs>
        <linearGradient id="viceSunGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#ffe270"/>
          <stop offset="45%" stop-color="#ff5e7e"/>
          <stop offset="100%" stop-color="#c026d3"/>
        </linearGradient>
        <linearGradient id="viceRing" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#00f0ff"/>
          <stop offset="100%" stop-color="#ff3ea5"/>
        </linearGradient>
      </defs>
      <circle cx="55" cy="55" r="48" fill="rgba(20, 8, 36, 0.72)" stroke="url(#viceRing)" stroke-width="3"/>
      <circle cx="55" cy="52" r="30" fill="url(#viceSunGrad)"/>
      <!-- Retrowave sun scanlines -->
      <rect x="23" y="56" width="64" height="3.2" fill="#140824"/>
      <rect x="23" y="63" width="64" height="4" fill="#140824"/>
      <rect x="23" y="71" width="64" height="4.8" fill="#140824"/>
      <!-- Palm Tree Silhouette -->
      <path d="M52 86 C53 68, 56 54, 60 40" stroke="#140824" stroke-width="4.5" stroke-linecap="round"/>
      <path d="M60 40 C50 32, 39 33, 32 40" stroke="#140824" stroke-width="3.6" stroke-linecap="round"/>
      <path d="M60 40 C51 26, 42 23, 35 25" stroke="#140824" stroke-width="3.2" stroke-linecap="round"/>
      <path d="M60 40 C69 31, 79 32, 85 39" stroke="#140824" stroke-width="3.6" stroke-linecap="round"/>
      <path d="M60 40 C70 25, 78 23, 84 26" stroke="#140824" stroke-width="3.2" stroke-linecap="round"/>
      <!-- Neon VI badge -->
      <rect x="61" y="68" width="26" height="16" rx="6" fill="#00f0ff"/>
      <text x="74" y="80" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="11" fill="#140824">VI</text>
    </svg>`,

    // Large Ambient Header Sticker: Zelda Ocarina of Time Triforce + Navi Fairy
    zeldaStickerLarge: `<svg width="92" height="92" viewBox="0 0 110 110" fill="none" class="svg-triforce-glow" aria-hidden="true">
      <defs>
        <linearGradient id="triGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fff5b8"/>
          <stop offset="50%" stop-color="#f6c945"/>
          <stop offset="100%" stop-color="#b88412"/>
        </linearGradient>
      </defs>
      <circle cx="55" cy="55" r="48" fill="rgba(10, 26, 32, 0.72)" stroke="#f6c945" stroke-width="2.5" stroke-dasharray="6 4"/>
      <!-- Triforce -->
      <polygon points="55,22 70,48 40,48" fill="url(#triGold)" stroke="#7a5308" stroke-width="1.5"/>
      <polygon points="40,50 55,76 25,76" fill="url(#triGold)" stroke="#7a5308" stroke-width="1.5"/>
      <polygon points="70,50 85,76 55,76" fill="url(#triGold)" stroke="#7a5308" stroke-width="1.5"/>
      <!-- Orbiting Navi Fairy -->
      <g transform="translate(72, 16)">
        <g class="svg-navi-wings">
          <ellipse cx="5" cy="8" rx="6" ry="3" transform="rotate(-24 5 8)" fill="rgba(186,247,255,0.85)"/>
          <ellipse cx="19" cy="8" rx="6" ry="3" transform="rotate(24 19 8)" fill="rgba(186,247,255,0.85)"/>
        </g>
        <circle cx="12" cy="11" r="6.2" fill="#58f2ff"/>
        <circle cx="12" cy="11" r="3.4" fill="#ffffff"/>
      </g>
    </svg>`,

    // Large Ambient Sticker: GTA 6 6-Star Wanted Badge
    wantedStickerLarge: `<svg width="92" height="92" viewBox="0 0 110 110" fill="none" class="svg-neon-pulse" aria-hidden="true">
      <circle cx="55" cy="55" r="48" fill="rgba(20, 8, 36, 0.75)" stroke="#00f0ff" stroke-width="2.5"/>
      <polygon points="55,18 63,37 84,39 68,53 73,74 55,63 37,74 42,53 26,39 47,37" fill="#ff3ea5" stroke="#ffe270" stroke-width="2"/>
      <text x="55" y="92" text-anchor="middle" font-family="sans-serif" font-weight="900" font-size="11" fill="#00f0ff" letter-spacing="1.5">★★★★★</text>
    </svg>`,

    // Large Ambient Sticker: Ocarina + Glowing Rupees
    ocarinaStickerLarge: `<svg width="92" height="92" viewBox="0 0 110 110" fill="none" class="svg-triforce-glow" aria-hidden="true">
      <circle cx="55" cy="55" r="48" fill="rgba(10, 26, 32, 0.75)" stroke="#58f2ff" stroke-width="2.5"/>
      <path d="M24 62 C24 44, 42 32, 64 32 C78 32, 88 40, 88 51 C88 64, 75 74, 58 74 C48 74, 41 70, 35 67 L24 72 Z" fill="#2563eb" stroke="#93c5fd" stroke-width="2.5"/>
      <rect x="36" y="42" width="10" height="24" rx="3" fill="#f6c945"/>
      <circle cx="56" cy="48" r="3.6" fill="#e0f2fe"/>
      <circle cx="67" cy="44" r="3.6" fill="#e0f2fe"/>
      <circle cx="75" cy="52" r="3.6" fill="#e0f2fe"/>
      <circle cx="65" cy="57" r="3.6" fill="#e0f2fe"/>
      <!-- Mini Green Rupee -->
      <polygon points="82,20 88,26 88,35 82,41 76,35 76,26" fill="#2fd980" stroke="#a7f3d0" stroke-width="1.5"/>
    </svg>`
  };

  const TAB_ICON_MAP = {
    appTabNum: SVGS.triforceIcon,
    appTabCs: SVGS.ocarinaIcon,
    appTabAi: SVGS.naviIcon,
    appTabMkd: SVGS.vicePalmIcon,
    appTabThreeBody: SVGS.threeSunsIcon,
    appTabSkills: SVGS.rupeeIcon
  };

  let currentTheme = (function () {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (VALID_THEMES.includes(saved)) return saved;
    } catch (e) {}
    return 'mashup';
  })();

  function getLang() {
    return document.documentElement.lang === 'vi' ? 'vi' : 'en';
  }

  function showToast(iconHtml, text) {
    const existing = document.querySelector('.fx-toast');
    if (existing) existing.remove();
    const el = document.createElement('div');
    el.className = 'fx-toast';
    el.innerHTML = `<span style="width:20px;height:20px;display:inline-flex;">${iconHtml}</span><span>${text}</span>`;
    document.body.appendChild(el);
    setTimeout(() => {
      if (el.parentNode) el.remove();
    }, 2650);
  }

  function spawnSparkles(x, y, palette) {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const colors = palette || (
      currentTheme === 'gta6'
        ? ['#ff3ea5', '#00f0ff', '#ffb84d', '#ffffff']
        : currentTheme === 'zelda'
          ? ['#f6c945', '#58f2ff', '#2fd980', '#fff5b8']
          : ['#ff3ea5', '#f6c945', '#58f2ff', '#2fd980']
    );

    const shapes = ['★', '◆', '▲', '✦'];
    const count = 9;
    for (let i = 0; i < count; i++) {
      const p = document.createElement('span');
      p.className = 'fx-particle';
      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.45 - 0.22);
      const dist = 28 + Math.random() * 38;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist - 10;
      const rot = Math.round(Math.random() * 180 - 90) + 'deg';
      p.style.left = x + 'px';
      p.style.top = y + 'px';
      p.style.color = colors[i % colors.length];
      p.style.fontSize = (11 + Math.random() * 7) + 'px';
      p.style.setProperty('--dx', dx.toFixed(1) + 'px');
      p.style.setProperty('--dy', dy.toFixed(1) + 'px');
      p.style.setProperty('--rot', rot);
      p.textContent = shapes[i % shapes.length];
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 700);
    }
  }

  function renderAmbientStickers() {
    const leftSlot = document.getElementById('ambientStickerLeft');
    const rightSlot = document.getElementById('ambientStickerRight');
    if (!leftSlot || !rightSlot) return;

    if (currentTheme === 'gta6') {
      leftSlot.innerHTML = SVGS.viceStickerLarge;
      rightSlot.innerHTML = SVGS.wantedStickerLarge;
    } else if (currentTheme === 'zelda') {
      leftSlot.innerHTML = SVGS.zeldaStickerLarge;
      rightSlot.innerHTML = SVGS.ocarinaStickerLarge;
    } else {
      leftSlot.innerHTML = SVGS.viceStickerLarge;
      rightSlot.innerHTML = SVGS.zeldaStickerLarge;
    }
  }

  function applyTheme(themeName, clickEvent) {
    if (!VALID_THEMES.includes(themeName)) themeName = 'mashup';
    currentTheme = themeName;
    document.documentElement.setAttribute('data-theme', currentTheme);
    try {
      localStorage.setItem(STORAGE_KEY, currentTheme);
    } catch (e) {}

    document.querySelectorAll('.theme-btn').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-theme-opt') === currentTheme);
    });

    renderAmbientStickers();

    if (clickEvent) {
      spawnSparkles(clickEvent.clientX, clickEvent.clientY);
    }
  }

  function injectTabIcons() {
    Object.keys(TAB_ICON_MAP).forEach(id => {
      const btn = document.getElementById(id);
      if (!btn) return;
      if (!btn.querySelector('.tab-svg-icon')) {
        const span = document.createElement('span');
        span.className = 'tab-svg-icon';
        span.innerHTML = TAB_ICON_MAP[id];
        btn.prepend(span);
      }
    });
  }

  function buildHeaderEnhancements() {
    const header = document.querySelector('.sacred-header');
    if (!header) return;

    // 1. Ambient floating stickers layer
    if (!header.querySelector('.header-ambient-layer')) {
      const ambient = document.createElement('div');
      ambient.className = 'header-ambient-layer';
      ambient.innerHTML = `
        <div id="ambientStickerLeft" class="ambient-sticker ambient-sticker-left" title="Vice City / Hyrule Sticker"></div>
        <div id="ambientStickerRight" class="ambient-sticker ambient-sticker-right" title="Triforce & Navi Sticker"></div>
      `;
      header.prepend(ambient);

      document.getElementById('ambientStickerLeft').addEventListener('click', (e) => {
        spawnSparkles(e.clientX, e.clientY, ['#ff3ea5', '#00f0ff', '#ffb84d']);
        const vi = getLang() === 'vi';
        showToast(SVGS.vicePalmIcon, vi ? 'Chào mừng tới Vice City VI!' : 'Welcome to Vice City VI!');
      });

      document.getElementById('ambientStickerRight').addEventListener('click', (e) => {
        spawnSparkles(e.clientX, e.clientY, ['#f6c945', '#58f2ff', '#2fd980']);
        const vi = getLang() === 'vi';
        showToast(SVGS.naviIcon, vi ? 'Navi: "Này! Nghe đây! (Hey! Listen!)"' : 'Navi: "Hey! Listen!"');
      });
    }

    // 2. Theme Switcher Pill (Top-Left)
    if (!header.querySelector('.theme-switcher')) {
      const switcher = document.createElement('div');
      switcher.className = 'theme-switcher';
      switcher.setAttribute('role', 'group');
      switcher.setAttribute('aria-label', 'Theme Switcher');
      switcher.innerHTML = `
        <button type="button" class="theme-btn" data-theme-opt="mashup" title="GTA 6 × Zelda Mashup">${SVGS.triforceIcon}<span>VI × OoT</span></button>
        <button type="button" class="theme-btn" data-theme-opt="gta6" title="GTA 6 Vice Neon">${SVGS.vicePalmIcon}<span>Vice VI</span></button>
        <button type="button" class="theme-btn" data-theme-opt="zelda" title="Zelda: Ocarina of Time">${SVGS.ocarinaIcon}<span>Hyrule</span></button>
        <button type="button" class="theme-btn" data-theme-opt="classic" title="Classic Cream"><span>Classic</span></button>
      `;
      header.appendChild(switcher);

      switcher.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          applyTheme(btn.getAttribute('data-theme-opt'), e);
        });
      });
    }

    // 3. Interactive Collectible Sticker Shelf
    if (!header.querySelector('.sticker-shelf')) {
      const shelf = document.createElement('div');
      shelf.className = 'sticker-shelf';
      shelf.innerHTML = `
        <button type="button" class="sticker-chip" data-sticker="triforce">${SVGS.triforceIcon}<span>Triforce</span></button>
        <button type="button" class="sticker-chip" data-sticker="ocarina">${SVGS.ocarinaIcon}<span>Ocarina</span></button>
        <button type="button" class="sticker-chip" data-sticker="vice">${SVGS.vicePalmIcon}<span>Vice Sunset</span></button>
        <button type="button" class="sticker-chip" data-sticker="wanted">${SVGS.wantedStarIcon}<span>6-Star VI</span></button>
      `;
      header.appendChild(shelf);

      const messages = {
        triforce: { icon: SVGS.triforceIcon, en: 'Triforce Resonance: Power · Wisdom · Courage', vi: 'Cộng Hưởng Triforce: Sức Mạnh · Trí Tuệ · Dũng Khí', colors: ['#f6c945', '#fff5b8', '#b88412'] },
        ocarina: { icon: SVGS.ocarinaIcon, en: '♪ Song of Time echoed through the Temple!', vi: '♪ Khúc Ca Thời Gian vang vọng trong Đền Thờ!', colors: ['#3b82f6', '#58f2ff', '#f6c945'] },
        vice: { icon: SVGS.vicePalmIcon, en: 'Vice City Golden Hour — Neon Mode Active', vi: 'Hoàng Hôn Vice City — Chế Độ Neon Đã Bật', colors: ['#ff3ea5', '#ffb84d', '#00f0ff'] },
        wanted: { icon: SVGS.wantedStarIcon, en: '★★★★★★ 6-Star Cipher Level Unlocked!', vi: '★★★★★★ Đã Mở Khóa Cấp Độ 6 Sao!', colors: ['#ff3ea5', '#00f0ff', '#ffe270'] }
      };

      shelf.querySelectorAll('.sticker-chip').forEach(chip => {
        chip.addEventListener('click', (e) => {
          const key = chip.getAttribute('data-sticker');
          const info = messages[key];
          chip.classList.remove('popped');
          void chip.offsetWidth;
          chip.classList.add('popped');
          spawnSparkles(e.clientX, e.clientY, info.colors);
          showToast(info.icon, getLang() === 'vi' ? info.vi : info.en);
        });
      });
    }
  }

  function wireMicroInteractions() {
    // Re-inject tab icons whenever language buttons are clicked (since applyStaticTranslations updates textContent)
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeout(injectTabIcons, 0);
      });
    });

    // Sparkle burst on Cipher & Reveal button
    const cipherBtn = document.getElementById('cipherBtn');
    if (cipherBtn) {
      cipherBtn.addEventListener('click', (e) => {
        spawnSparkles(e.clientX, e.clientY);
      });
    }

    // Subtle sparkle on switching top-level app tabs
    document.querySelectorAll('.app-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (currentTheme !== 'classic') {
          spawnSparkles(e.clientX, e.clientY);
        }
      });
    });
  }

  function init() {
    buildHeaderEnhancements();
    injectTabIcons();
    wireMicroInteractions();
    applyTheme(currentTheme);
  }

  window.refreshThemeIcons = injectTabIcons;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
