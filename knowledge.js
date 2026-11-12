// ARITHMOS HO THEOS ("Numbers Are God") — Sacred Knowledge & GematriaCalculator.us Full Cipher Suite
// Covers: All 32+ Ciphers from gematriacalculator.us (English Ordinal, Full Reduction, Reverse Ordinal,
// Reverse Full Reduction, Single Reduction, KV/EP Exceptions, Jewish, Jewish Reduction, Jewish Ordinal,
// Satanic, Reverse Satanic, Septenary, Chaldean, Alphanumeric Qabbalah, Francis Bacon, Franc Baconis,
// Sumerian, Primes, Trigonal, Squares, Fibonacci, Keypad, plus Hebrew Gematria, Greek Isopsephy & Druidic Ogham).

(function () {
  const PRIMES_26 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];
  const SEPTENARY_26 = [1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1];
  const CHALDEAN_26 = [1, 2, 3, 4, 5, 8, 3, 5, 1, 1, 2, 3, 4, 5, 7, 8, 1, 2, 3, 4, 6, 6, 6, 5, 1, 7];
  const JEWISH_STD_26 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 600, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 700, 900, 300, 400, 500];
  const JEWISH_ORD_26 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 24, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 25, 26, 21, 22, 23];
  const ENG_EXT_26 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 600, 700, 800];
  const KEYPAD_26 = [2, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 9, 9, 9, 9];
  const FIB_26 = (function () {
    const arr = [1, 1];
    for (let i = 2; i < 26; i++) arr.push(arr[i - 1] + arr[i - 2]);
    return arr;
  })();

  function digRoot(n) {
    n = Math.abs(Math.floor(n));
    return n === 0 ? 0 : ((n - 1) % 9) + 1;
  }

  function singleStepReduce(n) {
    if (n < 10) return n;
    return Math.floor(n / 10) + (n % 10);
  }

  // Complete 28 GematriaCalculator.us Cipher Definitions
  const GEMATRIA_CIPHERS = [
    // --- BASE / CORE CIPHERS ---
    {
      id: 'english_ordinal',
      name: 'English Ordinal',
      shortName: 'Ordinal',
      category: 'Base & Reduction',
      color: '#eab308',
      featured: true,
      desc: 'Standard alphabetical position: A=1, B=2, C=3 ... Z=26.',
      charVal: (idx) => idx + 1
    },
    {
      id: 'full_reduction',
      name: 'Full Reduction',
      shortName: 'Full Reduction',
      category: 'Base & Reduction',
      color: '#38bdf8',
      featured: true,
      desc: 'Pythagorean single-digit reduction of each letter (1–9 cycle: A=1..I=9, J=1..R=9, S=1..Z=8).',
      charVal: (idx) => digRoot(idx + 1)
    },
    {
      id: 'reverse_ordinal',
      name: 'Reverse Ordinal',
      shortName: 'Reverse Ordinal',
      category: 'Base & Reduction',
      color: '#a855f7',
      featured: true,
      desc: 'Alphabet numbered backwards: A=26, B=25, C=24 ... Z=1.',
      charVal: (idx) => 26 - idx
    },
    {
      id: 'reverse_full_reduction',
      name: 'Reverse Full Reduction',
      shortName: 'Rev Full Reduction',
      category: 'Base & Reduction',
      color: '#34d399',
      featured: true,
      desc: 'Reverse Ordinal reduced to single digits (Z=1..R=9, Q=1..I=9, H=1..A=8).',
      charVal: (idx) => digRoot(26 - idx)
    },

    // --- REDUCTION & MASTER EXCEPTION CIPHERS ---
    {
      id: 'single_reduction',
      name: 'Single Reduction',
      shortName: 'Single Reduction',
      category: 'Base & Reduction',
      color: '#60a5fa',
      featured: false,
      desc: 'Each two-digit ordinal is reduced only once (so S = 19 → 1+9 = 10, while all other letters match Full Reduction).',
      charVal: (idx) => singleStepReduce(idx + 1)
    },
    {
      id: 'full_reduction_kv',
      name: 'Full Reduction KV',
      shortName: 'Full Red. KV',
      category: 'Base & Reduction',
      color: '#2dd4bf',
      featured: false,
      desc: 'Full Reduction with Master Number exceptions preserved: K=11 and V=22.',
      charVal: (idx) => (idx + 1 === 11 || idx + 1 === 22) ? (idx + 1) : digRoot(idx + 1)
    },
    {
      id: 'single_reduction_kv',
      name: 'Single Reduction KV',
      shortName: 'Single Red. KV',
      category: 'Base & Reduction',
      color: '#818cf8',
      featured: false,
      desc: 'Single Reduction (S=10) combined with Master Number preservation (K=11, V=22).',
      charVal: (idx) => (idx + 1 === 11 || idx + 1 === 22) ? (idx + 1) : singleStepReduce(idx + 1)
    },
    {
      id: 'reverse_single_reduction',
      name: 'Reverse Single Reduction',
      shortName: 'Rev Single Red.',
      category: 'Base & Reduction',
      color: '#c084fc',
      featured: false,
      desc: 'Each Reverse Ordinal is reduced only once (so H = 19 in reverse → 1+9 = 10).',
      charVal: (idx) => singleStepReduce(26 - idx)
    },
    {
      id: 'reverse_full_reduction_ep',
      name: 'Reverse Full Reduction EP',
      shortName: 'Rev Full Red. EP',
      category: 'Base & Reduction',
      color: '#4ade80',
      featured: false,
      desc: 'Reverse Full Reduction preserving the reverse Master Numbers: E=22 and P=11.',
      charVal: (idx) => {
        const rev = 26 - idx;
        return (rev === 11 || rev === 22) ? rev : digRoot(rev);
      }
    },

    // --- JEWISH, KABBALISTIC & EXTENDED CIPHERS ---
    {
      id: 'jewish',
      name: 'Jewish (Agrippa Latin)',
      shortName: 'Jewish',
      category: 'Jewish & Kabbalah',
      color: '#f59e0b',
      featured: true,
      desc: 'Cornelius Agrippa’s classical Latin-Hebrew table (A=1..I=9, K=10..S=90, T=100, U=200, X=300, Y=400, Z=500, J=600, V=700, W=900).',
      charVal: (idx) => JEWISH_STD_26[idx]
    },
    {
      id: 'jewish_reduction',
      name: 'Jewish Reduction',
      shortName: 'Jewish Red.',
      category: 'Jewish & Kabbalah',
      color: '#fbbf24',
      featured: false,
      desc: 'Jewish Gematria values reduced to single digits (1–9).',
      charVal: (idx) => digRoot(JEWISH_STD_26[idx])
    },
    {
      id: 'jewish_ordinal',
      name: 'Jewish Ordinal',
      shortName: 'Jewish Ordinal',
      category: 'Jewish & Kabbalah',
      color: '#d97706',
      featured: false,
      desc: 'Sequential 1–26 order following Agrippa’s classical 24-letter + J,V,W arrangement.',
      charVal: (idx) => JEWISH_ORD_26[idx]
    },
    {
      id: 'alphanumeric_qabbalah',
      name: 'Alphanumeric Qabbalah (AQ)',
      shortName: 'AQ (Base-36)',
      category: 'Jewish & Kabbalah',
      color: '#a78bfa',
      featured: false,
      desc: 'Continuous Base-36 Qabbalistic cipher where 0–9 = 0–9 and A=10, B=11, C=12 ... Z=35.',
      charVal: (idx) => idx + 10
    },
    {
      id: 'english_extended',
      name: 'English Extended (Standard)',
      shortName: 'English Extended',
      category: 'Jewish & Kabbalah',
      color: '#fcd34d',
      featured: false,
      desc: 'Decimal units, tens, and hundreds mapped sequentially to A–Z (A=1..I=9, J=10..R=90, S=100..Z=800).',
      charVal: (idx) => ENG_EXT_26[idx]
    },
    {
      id: 'sumerian',
      name: 'Sumerian',
      shortName: 'Sumerian',
      category: 'Jewish & Kabbalah',
      color: '#f97316',
      featured: false,
      desc: 'Babylonian sexagesimal (Base-6) harmonic scale: English Ordinal × 6 (A=6, B=12 ... Z=156).',
      charVal: (idx) => (idx + 1) * 6
    },
    {
      id: 'reverse_sumerian',
      name: 'Reverse Sumerian',
      shortName: 'Rev Sumerian',
      category: 'Jewish & Kabbalah',
      color: '#fb923c',
      featured: false,
      desc: 'Reverse Ordinal × 6 (A=156, B=150 ... Z=6).',
      charVal: (idx) => (26 - idx) * 6
    },

    // --- ESOTERIC, BACONIAN & OCCULT CIPHERS ---
    {
      id: 'satanic',
      name: 'Satanic',
      shortName: 'Satanic',
      category: 'Esoteric & Baconian',
      color: '#f43f5e',
      featured: true,
      desc: 'English Ordinal + 35 (A=36, B=37, C=38 ... Z=61), anchored to 36 (whose triangular number is 666).',
      charVal: (idx) => idx + 36
    },
    {
      id: 'reverse_satanic',
      name: 'Reverse Satanic',
      shortName: 'Rev Satanic',
      category: 'Esoteric & Baconian',
      color: '#fb7185',
      featured: false,
      desc: 'Reverse Ordinal + 35 (Z=36, Y=37 ... A=61).',
      charVal: (idx) => (26 - idx) + 35
    },
    {
      id: 'septenary',
      name: 'Septenary',
      shortName: 'Septenary',
      category: 'Esoteric & Baconian',
      color: '#10b981',
      featured: true,
      desc: 'Heptadic 1–7 palindrome wave across both 13-letter halves of the alphabet (A..G=1..7, H..M=6..1, N..T=1..7, U..Z=6..1).',
      charVal: (idx) => SEPTENARY_26[idx]
    },
    {
      id: 'chaldean',
      name: 'Chaldean',
      shortName: 'Chaldean',
      category: 'Esoteric & Baconian',
      color: '#14b8a6',
      featured: true,
      desc: 'Ancient Babylonian phonetic vibration cipher (1–8 scale; 9 is held sacred and omitted).',
      charVal: (idx) => CHALDEAN_26[idx]
    },
    {
      id: 'francis_bacon',
      name: 'Francis Bacon (Case-Sensitive)',
      shortName: 'Francis Bacon',
      category: 'Esoteric & Baconian',
      color: '#38bdf8',
      featured: false,
      desc: 'Case-sensitive Elizabethan cipher: lowercase a–z = 1–26; uppercase A–Z = 27–52.',
      charVal: (idx, isUpper) => isUpper ? (idx + 27) : (idx + 1)
    },
    {
      id: 'franc_baconis',
      name: 'Franc Baconis (Case-Sensitive)',
      shortName: 'Franc Baconis',
      category: 'Esoteric & Baconian',
      color: '#0ea5e9',
      featured: false,
      desc: 'Interleaved case-sensitive Baconian cipher: a=1, A=2, b=3, B=4 ... z=51, Z=52.',
      charVal: (idx, isUpper) => isUpper ? (idx * 2 + 2) : (idx * 2 + 1)
    },
    {
      id: 'reverse_francis_bacon',
      name: 'Reverse Francis Bacon',
      shortName: 'Rev Francis Bacon',
      category: 'Esoteric & Baconian',
      color: '#ec4899',
      featured: false,
      desc: 'Case-sensitive reverse: lowercase a–z = 26–1; uppercase A–Z = 52–27.',
      charVal: (idx, isUpper) => isUpper ? (52 - idx) : (26 - idx)
    },
    {
      id: 'keypad',
      name: 'Keypad (Telephone Grid)',
      shortName: 'Keypad',
      category: 'Esoteric & Baconian',
      color: '#94a3b8',
      featured: false,
      desc: 'Standard ITU telephone keypad mapping: ABC=2, DEF=3, GHI=4, JKL=5, MNO=6, PQRS=7, TUV=8, WXYZ=9.',
      charVal: (idx) => KEYPAD_26[idx]
    },

    // --- MATHEMATICAL SEQUENCE CIPHERS ---
    {
      id: 'primes',
      name: 'Primes',
      shortName: 'Primes',
      category: 'Mathematical',
      color: '#e879f9',
      featured: false,
      desc: 'First 26 Prime Numbers mapped to A–Z (A=2, B=3, C=5, D=7 ... Z=101).',
      charVal: (idx) => PRIMES_26[idx]
    },
    {
      id: 'trigonal',
      name: 'Trigonal (Triangular)',
      shortName: 'Trigonal',
      category: 'Mathematical',
      color: '#f472b6',
      featured: false,
      desc: 'n-th Triangular Number n(n+1)/2 for each letter (A=1, B=3, C=6, D=10 ... Z=351).',
      charVal: (idx) => ((idx + 1) * (idx + 2)) / 2
    },
    {
      id: 'squares',
      name: 'Squares',
      shortName: 'Squares',
      category: 'Mathematical',
      color: '#c084fc',
      featured: false,
      desc: 'Perfect squares n² for each letter (A=1, B=4, C=9, D=16 ... Z=676).',
      charVal: (idx) => (idx + 1) * (idx + 1)
    },
    {
      id: 'fibonacci',
      name: 'Fibonacci',
      shortName: 'Fibonacci',
      category: 'Mathematical',
      color: '#34d399',
      featured: false,
      desc: 'First 26 Fibonacci Numbers (A=1, B=1, C=2, D=3, E=5 ... Z=121,393).',
      charVal: (idx) => FIB_26[idx]
    }
  ];

  window.SACRED_KNOWLEDGE = {
    GEMATRIA_CIPHERS,

    // 1. LATIN / ENGLISH LETTER MAPPINGS & CROSS-SCRIPT TRANSLITERATION
    latinTable: {
      A: { ord: 1, rev: 26, std: 1, agrippa: 1, pyth: 1, chald: 1, vowel: true, heb: 'א', grk: 'Α', ogham: 'Ailm' },
      B: { ord: 2, rev: 25, std: 2, agrippa: 2, pyth: 2, chald: 2, vowel: false, heb: 'ב', grk: 'Β', ogham: 'Beith' },
      C: { ord: 3, rev: 24, std: 3, agrippa: 3, pyth: 3, chald: 3, vowel: false, heb: 'ג', grk: 'Γ', ogham: 'Coll' },
      D: { ord: 4, rev: 23, std: 4, agrippa: 4, pyth: 4, chald: 4, vowel: false, heb: 'ד', grk: 'Δ', ogham: 'Duir' },
      E: { ord: 5, rev: 22, std: 5, agrippa: 5, pyth: 5, chald: 5, vowel: true, heb: 'ה', grk: 'Ε', ogham: 'Eadha' },
      F: { ord: 6, rev: 21, std: 6, agrippa: 6, pyth: 6, chald: 8, vowel: false, heb: 'ו', grk: 'Ϝ', ogham: 'Fearn' },
      G: { ord: 7, rev: 20, std: 7, agrippa: 7, pyth: 7, chald: 3, vowel: false, heb: 'ז', grk: 'Ζ', ogham: 'Gort' },
      H: { ord: 8, rev: 19, std: 8, agrippa: 8, pyth: 8, chald: 5, vowel: false, heb: 'ח', grk: 'Η', ogham: 'Huath' },
      I: { ord: 9, rev: 18, std: 9, agrippa: 9, pyth: 9, chald: 1, vowel: true, heb: 'י', grk: 'Ι', ogham: 'Iodhadh' },
      J: { ord: 10, rev: 17, std: 10, agrippa: 600, pyth: 1, chald: 1, vowel: false, heb: 'י', grk: 'Ι', ogham: 'Iodhadh' },
      K: { ord: 11, rev: 16, std: 20, agrippa: 10, pyth: 2, chald: 2, vowel: false, heb: 'כ', grk: 'Κ', ogham: 'Coll' },
      L: { ord: 12, rev: 15, std: 30, agrippa: 20, pyth: 3, chald: 3, vowel: false, heb: 'ל', grk: 'Λ', ogham: 'Luis' },
      M: { ord: 13, rev: 14, std: 40, agrippa: 30, pyth: 4, chald: 4, vowel: false, heb: 'מ', grk: 'Μ', ogham: 'Muin' },
      N: { ord: 14, rev: 13, std: 50, agrippa: 40, pyth: 5, chald: 5, vowel: false, heb: 'נ', grk: 'Ν', ogham: 'Nion' },
      O: { ord: 15, rev: 12, std: 60, agrippa: 50, pyth: 6, chald: 7, vowel: true, heb: 'ע', grk: 'Ο', ogham: 'Onn' },
      P: { ord: 16, rev: 11, std: 70, agrippa: 60, pyth: 7, chald: 8, vowel: false, heb: 'פ', grk: 'Π', ogham: 'Peith' },
      Q: { ord: 17, rev: 10, std: 80, agrippa: 70, pyth: 8, chald: 1, vowel: false, heb: 'ק', grk: 'Ϟ', ogham: 'Ceirt' },
      R: { ord: 18, rev: 9, std: 90, agrippa: 80, pyth: 9, chald: 2, vowel: false, heb: 'ר', grk: 'Ρ', ogham: 'Ruis' },
      S: { ord: 19, rev: 8, std: 100, agrippa: 90, pyth: 1, chald: 3, vowel: false, heb: 'ש', grk: 'Σ', ogham: 'Sail' },
      T: { ord: 20, rev: 7, std: 200, agrippa: 100, pyth: 2, chald: 4, vowel: false, heb: 'ת', grk: 'Τ', ogham: 'Tinne' },
      U: { ord: 21, rev: 6, std: 300, agrippa: 200, pyth: 3, chald: 6, vowel: true, heb: 'ו', grk: 'Υ', ogham: 'Ur' },
      V: { ord: 22, rev: 5, std: 400, agrippa: 700, pyth: 4, chald: 6, vowel: false, heb: 'ו', grk: 'Υ', ogham: 'Ur' },
      W: { ord: 23, rev: 4, std: 500, agrippa: 900, pyth: 5, chald: 6, vowel: false, heb: 'ו', grk: 'Ω', ogham: 'Uilleann' },
      X: { ord: 24, rev: 3, std: 600, agrippa: 300, pyth: 6, chald: 5, vowel: false, heb: 'ס', grk: 'Ξ', ogham: 'Eabhadh' },
      Y: { ord: 25, rev: 2, std: 700, agrippa: 400, pyth: 7, chald: 1, vowel: true, heb: 'י', grk: 'Ψ', ogham: 'Idho' },
      Z: { ord: 26, rev: 1, std: 800, agrippa: 500, pyth: 8, chald: 7, vowel: false, heb: 'ז', grk: 'Ζ', ogham: 'Straif' }
    },

    // 2. HEBREW ALEPH-BET (22 Letters + 5 Final Sofit Forms)
    hebrewLetters: {
      'א': { name: 'Aleph', val: 1, gadol: 1, ord: 1, class: 'Mother (Air / Spirit)', astro: 'Uranus / Air', meaning: 'Ox, Primal Unity, Breath of God, Paradox of Infinite & Finite', path: '11th Path (Keter → Chokhmah)' },
      'ב': { name: 'Bet', val: 2, gadol: 2, ord: 2, class: 'Double (Wisdom / Folly)', astro: 'Moon / Saturn', meaning: 'House, Dwelling, Duality, Vessel of Creation (Bereshit)', path: '12th Path (Keter → Binah)' },
      'ג': { name: 'Gimel', val: 3, gadol: 3, ord: 3, class: 'Double (Wealth / Poverty)', astro: 'Moon / Jupiter', meaning: 'Camel, Bridge, Generosity, Dynamic Harmony between Opposites', path: '13th Path (Keter → Tiferet)' },
      'ד': { name: 'Dalet', val: 4, gadol: 4, ord: 4, class: 'Double (Seed / Desolation)', astro: 'Venus / Mars', meaning: 'Doorway, Humility, Structural Threshold into the Material World', path: '14th Path (Chokhmah → Binah)' },
      'ה': { name: 'He', val: 5, gadol: 5, ord: 5, class: 'Elemental (Sight)', astro: 'Aries (טלה)', meaning: 'Window, Behold, Divine Breath, Feminine Creative Manifestation', path: '15th Path (Chokhmah → Tiferet)' },
      'ו': { name: 'Vav', val: 6, gadol: 6, ord: 6, class: 'Elemental (Hearing)', astro: 'Taurus (שור)', meaning: 'Hook/Nail, Pillar connecting Heaven & Earth, Conjunction ("And")', path: '16th Path (Chokhmah → Chesed)' },
      'ז': { name: 'Zayin', val: 7, gadol: 7, ord: 7, class: 'Elemental (Smell)', astro: 'Gemini (תאומים)', meaning: 'Sword/Crown, Spiritual Sustenance, Shabbat Perfection in Action', path: '17th Path (Binah → Tiferet)' },
      'ח': { name: 'Chet', val: 8, gadol: 8, ord: 8, class: 'Elemental (Speech)', astro: 'Cancer (סרטן)', meaning: 'Fence/Sanctuary, Life Force (Chai), Transcendence above Nature (7+1)', path: '18th Path (Binah → Gevurah)' },
      'ט': { name: 'Tet', val: 9, gadol: 9, ord: 9, class: 'Elemental (Taste)', astro: 'Leo (אריה)', meaning: 'Serpent/Womb, Hidden Goodness (Tov), Gestation of Light', path: '19th Path (Chesed → Gevurah)' },
      'י': { name: 'Yod', val: 10, gadol: 10, ord: 10, class: 'Elemental (Action)', astro: 'Virgo (בתולה)', meaning: 'Hand/Spark, Atomic Point of Divine Wisdom, Seed of All Letters', path: '20th Path (Chesed → Tiferet)' },
      'כ': { name: 'Kaf', val: 20, gadol: 20, ord: 11, class: 'Double (Life / Death)', astro: 'Venus / Sun', meaning: 'Palm of Hand, Crown (Keter), Potential Actualized in Form', path: '21st Path (Chesed → Netzach)' },
      'ך': { name: 'Kaf Sofit', val: 20, gadol: 500, ord: 23, class: 'Final Double', astro: 'Venus / Sun', meaning: 'Extended Palm, Drawing Divine Light down to the Lowest World', path: '21st Path Extended' },
      'ל': { name: 'Lamed', val: 30, gadol: 30, ord: 12, class: 'Elemental (Coition/Movement)', astro: 'Libra (מאזניים)', meaning: 'Ox-Goad / Learning, Aspiration of the Heart (Lev) ascending to Heaven', path: '22nd Path (Gevurah → Tiferet)' },
      'מ': { name: 'Mem', val: 40, gadol: 40, ord: 13, class: 'Mother (Water)', astro: 'Neptune / Water', meaning: 'Waters of Creation, Revealed Wisdom, Flowing Consciousness & Time (40)', path: '23rd Path (Gevurah → Hod)' },
      'ם': { name: 'Mem Sofit', val: 40, gadol: 600, ord: 24, class: 'Final Mother (Water)', astro: 'Closed Womb / Messianic Era', meaning: 'Closed Waters, Hidden Esoteric Wisdom, Complete Cosmic Cycle (600)', path: '23rd Path Sealed' },
      'נ': { name: 'Nun', val: 50, gadol: 50, ord: 14, class: 'Elemental (Walk)', astro: 'Scorpio (עקרב)', meaning: 'Fish/Sprout, Soul (Neshamah), 50 Gates of Binah (Understanding)', path: '24th Path (Tiferet → Netzach)' },
      'ן': { name: 'Nun Sofit', val: 50, gadol: 700, ord: 25, class: 'Final Elemental', astro: 'Scorpio / Messianic Redemption', meaning: 'Extended Soul, Shabbat of Worlds (700), Unbroken Faith', path: '24th Path Extended' },
      'ס': { name: 'Samekh', val: 60, gadol: 60, ord: 15, class: 'Elemental (Anger/Equanimity)', astro: 'Sagittarius (קשת)', meaning: 'Support/Circle, Ouroboros of Divine Providence upholding the Fallen', path: '25th Path (Tiferet → Yesod)' },
      'ע': { name: 'Ayin', val: 70, gadol: 70, ord: 16, class: 'Elemental (Laughter/Insight)', astro: 'Capricorn (גדי)', meaning: 'Eye/Fountain, 70 Faces of Torah, Seeing Beyond Illusion', path: '26th Path (Tiferet → Hod)' },
      'פ': { name: 'Pe', val: 80, gadol: 80, ord: 17, class: 'Double (Dominion / Slavery)', astro: 'Mars / Mercury', meaning: 'Mouth, Power of Sacred Speech, Shattering Barriers through Logos', path: '27th Path (Netzach → Hod)' },
      'ף': { name: 'Pe Sofit', val: 80, gadol: 800, ord: 26, class: 'Final Double', astro: 'Mercury / Transcendence', meaning: 'Unspoken Word, Prophecy, Eighth Octave of Spirit (800)', path: '27th Path Extended' },
      'צ': { name: 'Tsadi', val: 90, gadol: 90, ord: 18, class: 'Elemental (Thought/Meditation)', astro: 'Aquarius (דלי)', meaning: 'Fishhook / Righteous One (Tzaddik), Foundation of the World', path: '28th Path (Netzach → Yesod)' },
      'ץ': { name: 'Tsadi Sofit', val: 90, gadol: 900, ord: 27, class: 'Final Elemental', astro: 'Aquarius Awakened', meaning: 'Tree of Life Fulfilled, Union of Heaven and Earth (900)', path: '28th Path Extended' },
      'ק': { name: 'Qof', val: 100, gadol: 100, ord: 19, class: 'Elemental (Sleep/Holiness)', astro: 'Pisces (דגים)', meaning: 'Back of Head / Eye of Needle, Kedushah (Holiness) redeeming the Sparks', path: '29th Path (Netzach → Malkhut)' },
      'ר': { name: 'Resh', val: 200, gadol: 200, ord: 20, class: 'Double (Peace / Strife)', astro: 'Sun / Saturn', meaning: 'Head/Beginning (Rosh), Mind Choosing between Ego and Cosmic Order', path: '30th Path (Hod → Yesod)' },
      'ש': { name: 'Shin', val: 300, gadol: 300, ord: 21, class: 'Mother (Fire)', astro: 'Pluto / Fire / Spirit', meaning: 'Tooth / Threefold Flame of Shaddai, Unchanging Divine Fire', path: '31st Path (Hod → Malkhut)' },
      'ת': { name: 'Tav', val: 400, gadol: 400, ord: 22, class: 'Double (Grace / Ugliness)', astro: 'Saturn / Moon', meaning: 'Cross/Seal of Truth (Emet), Cosmic Completion of the 4 Worlds (400)', path: '32nd Path (Yesod → Malkhut)' }
    },

    // 3. GREEK ISOPSEPHY LETTERS
    greekLetters: {
      'Α': { name: 'Alpha', val: 1, ord: 1, meaning: 'Primal Cause, Beginning ("I am the Alpha and the Omega")' },
      'Β': { name: 'Beta', val: 2, ord: 2, meaning: 'Dyad, Polarity, Sanctuary of Generation' },
      'Γ': { name: 'Gamma', val: 3, ord: 3, meaning: 'Triad, Geometric Right Angle (gnomon), Sacred Proportion' },
      'Δ': { name: 'Delta', val: 4, ord: 4, meaning: 'Tetrad, Pyramid of Fire, Cosmic Doorway of the Elements' },
      'Ε': { name: 'Epsilon', val: 5, ord: 5, meaning: 'Pentad, Delphic "EI" ("Thou Art"), Marriage of Even (2) & Odd (3)' },
      'Ϝ': { name: 'Digamma / Stigma', val: 6, ord: 6, meaning: 'Hexad, Harmony of the Cosmos, First Perfect Number (1+2+3=6)' },
      'Ϛ': { name: 'Stigma', val: 6, ord: 6, meaning: 'Hexad, Sacred Ligature of Sigma-Tau' },
      'Ζ': { name: 'Zeta', val: 7, ord: 7, meaning: 'Heptad, Living Spirit (Zoe), Unbegotten Athena' },
      'Η': { name: 'Eta', val: 8, ord: 7, meaning: 'Ogdoad, Celestial Cube (2³), Harmonic Octave' },
      'Θ': { name: 'Theta', val: 9, ord: 8, meaning: 'Ennead, Sphere of Theos (God), Horizon of the All' },
      'Ι': { name: 'Iota', val: 10, ord: 9, meaning: 'Decad, The Sacred Tetractys (1+2+3+4=10), All-Completing Monad' },
      'Κ': { name: 'Kappa', val: 20, ord: 10, meaning: 'Kosmos Order, Double Decad' },
      'Λ': { name: 'Lambda', val: 30, ord: 11, meaning: 'Logos Proportion, Plato’s Timaeus World-Soul Scale' },
      'Μ': { name: 'Mu', val: 40, ord: 12, meaning: 'Maternal Waters, Mystery Initiation (Mysteria)' },
      'Ν': { name: 'Nu', val: 50, ord: 13, meaning: 'Nous (Divine Mind), Pythagorean Hypotenuse (3²+4²+5²=50)' },
      'Ξ': { name: 'Xi', val: 60, ord: 14, meaning: 'Harmonic Link of the Three Worlds' },
      'Ο': { name: 'Omicron', val: 70, ord: 15, meaning: 'Bounded Circle of the Soul, Microcosmic Eye' },
      'Π': { name: 'Pi', val: 80, ord: 16, meaning: 'Perimeter & Archway of the Heavens' },
      'Ϟ': { name: 'Koppa', val: 90, ord: 17, meaning: 'Archaic Solar Thunderbolt (90)' },
      'Ρ': { name: 'Rho', val: 100, ord: 17, meaning: 'Flowing Stream ("Panta Rhei"), Solar Century (10²)' },
      'Σ': { name: 'Sigma', val: 200, ord: 18, meaning: 'Sophia (Wisdom), Lunar Crescent of Reflection' },
      'Τ': { name: 'Tau', val: 300, ord: 19, meaning: 'Cross of Cosmic Measure, Pillar of Atlas' },
      'Υ': { name: 'Upsilon', val: 400, ord: 20, meaning: 'The Pythagorean Letter (Two Diverging Paths of Virtue & Vice)' },
      'Φ': { name: 'Phi', val: 500, ord: 21, meaning: 'Golden Ratio (Φ), Phos (Divine Light), Unity divided by Circle' },
      'Χ': { name: 'Chi', val: 600, ord: 22, meaning: 'Plato’s X-Cross of the World Soul (Ecliptic & Equator)' },
      'Ψ': { name: 'Psi', val: 700, ord: 23, meaning: 'Psyche (Immortal Winged Soul), Trident of Spirit' },
      'Ω': { name: 'Omega', val: 800, ord: 24, meaning: 'Great O, Ultimate Telos, Ogdoad of the Centuries (800)' },
      'Ϡ': { name: 'Sampi', val: 900, ord: 25, meaning: 'Ennead of the Centuries, Transcendental Completion (900)' }
    },

    // 4. PYTHAGOREAN DECAD & MASTER NUMBERS
    pythagoreanDecad: {
      1: {
        title: 'The Monad (Μονάς) — Unity, Source & Divine Spark',
        greekTitle: 'Apollo / Prometheus / The Unmoved First Principle',
        tetractysRow: 1,
        planet: 'Sun ☉ (Sol)',
        element: 'Spirit / Aether & Fire',
        sefira: 'Keter (כתר — The Crown)',
        biblical: 'Deuteronomy 6:4 ("The Lord our God, the Lord is One"); Genesis 1:1 (Day 1: Light separated from Darkness). Primacy, Sovereignty, and Unbroken Unity.',
        pythagorean: 'For Pythagoras, 1 is not merely a number but the generator of all numbers—both odd and even (the "Even-Odd"). It is the point before dimension, the Logos before differentiation.',
        druid: 'Ceugant (The Circle of Infinity inhabited only by the Divine) & Ailm (Silver Fir — clear high vision at the summit).',
        astrology: 'Ruled by the Sun (Leo / 1st House Aries). Radiates individuation, leadership, solar willpower, and creative origination.',
        esoteric: 'You carry the archetype of the Architect and Pioneer. In the cipher of names, 1 signifies self-reliance, original thought, and direct alignment with the First Cause.'
      },
      2: {
        title: 'The Dyad (Δυάς) — Polarity, Wisdom & Sacred Reflection',
        greekTitle: 'Artemis / Isis / Audacity (Tolma) & Opinion',
        tetractysRow: 2,
        planet: 'Moon ☽ (Luna)',
        element: 'Water',
        sefira: 'Chokhmah (חכמה — Wisdom)',
        biblical: 'Two Tablets of the Covenant; Two Cherubim over the Ark; Two Witnesses (Revelation 11); Christ’s two natures (Divine & Human). Witness, Covenant, and Relational Truth.',
        pythagorean: 'The Dyad is the first departure from Unity—called "Tolma" (Daring) by the Pythagoreans because it dared to separate from the One to create line, reflection, and consciousness.',
        druid: 'Dual tide of Samhain (Dark half) and Beltane (Light half); Betula/Beith (Birch — purification and gentle receptivity).',
        astrology: 'Ruled by the Moon (Cancer / 2nd House Taurus). Governs intuition, emotional tide, soul-mirroring, and diplomatic synthesis.',
        esoteric: 'The peacemaker and high priestess of hidden correspondences. 2 bridges heaven and earth through empathy, equilibrium, and sacred partnership.'
      },
      3: {
        title: 'The Triad (Τριάς) — Synthesis, Logos & Creative Harmony',
        greekTitle: 'Athena / The Three Graces / First True Odd Number',
        tetractysRow: 2,
        planet: 'Jupiter ♃ (Zeus)',
        element: 'Fire / Air',
        sefira: 'Binah (בינה — Understanding)',
        biblical: 'The Threefold Sanctus ("Holy, Holy, Holy" — Isaiah 6:3); Trinity (Father, Son, Holy Spirit); Resurrection on the 3rd Day; Jonah 3 days in the whale. Divine Completeness and Manifestation.',
        pythagorean: 'The Triad is the first number with beginning, middle, and end. It reconciles the tension of the Dyad with the unity of the Monad, forming the first geometric plane (the Triangle).',
        druid: 'Sacred above all to the Druids: The Three Rays of Awen (/|\\ — Love, Wisdom, Truth), the Three Worlds (Abred, Gwynfyd, Ceugant), and the Celtic Triads.',
        astrology: 'Ruled by Jupiter (Sagittarius / Pisces). Bestows philosophical expansion, sacred eloquence, joy, and catalytic inspiration.',
        esoteric: 'The number of the Word made manifest. Names vibrating to 3 carry artistic fecundity, prophetic expression, and triad wisdom.'
      },
      4: {
        title: 'The Tetrad (Τετράς) — Cosmic Order, Foundation & The Elements',
        greekTitle: 'Heracles / Hermes Tetragonos / Justice',
        tetractysRow: 3,
        planet: 'Uranus ♅ / Rahu (Solar North Node) / Earth',
        element: 'Earth (and the 4 Elements: Fire, Air, Water, Earth)',
        sefira: 'Chesed (חסד — Mercy / Lovingkindness)',
        biblical: 'The 4 Letters of the Tetragrammaton (יהוה — YHVH); 4 Rivers of Eden; 4 Living Creatures of Ezekiel & Revelation; 4 Gospels. Cosmic Order, Earthly Creation, and Unshakable Foundation.',
        pythagorean: 'The Tetrad is the fountain of nature: 4 elements, 4 seasons, 4 cardinal directions, and 4 mathematical sciences (Quadrivium: Arithmetic, Geometry, Music, Astronomy). Its sum 1+2+3+4 = 10 forms the Tetractys.',
        druid: 'The Four Aicmí (letter-families) of Ogham; the Four Great Fire Festivals (Imbolc, Beltane, Lughnasadh, Samhain); Duir (Oak — King of the Forest, endurance).',
        astrology: 'Linked to Saturnian/Uranian structure and the 4th House IC (Foundation) & Fixed Cross (Taurus, Leo, Scorpio, Aquarius).',
        esoteric: 'The Master Builder of form. A 4 vibration grounds celestial geometry into enduring law, temple architecture, and steadfast loyalty.'
      },
      5: {
        title: 'The Pentad (Πεντάς) — Microcosm, Quintessence & Hieros Gamos',
        greekTitle: 'Aphrodite / Nemesis / The Hieros Gamos (2 + 3)',
        tetractysRow: 3,
        planet: 'Mercury ☿ (Hermes)',
        element: 'Quintessence (Aether at the Center of the 4 Elements)',
        sefira: 'Gevurah (גבורה — Severity / Sacred Judgement)',
        biblical: 'The 5 Books of Torah (Pentateuch); 5 Smooth Stones of David; 5 Wounds of Christ; Grace multiplied (5 Loaves feeding 5,000). Divine Grace, Atonement, and Human Agency.',
        pythagorean: 'The Pentad is the marriage of the first female/even number (2) and the first male/odd number (3). Its geometric emblem is the Pentagram (Υγεία — Health), governed throughout by the Golden Ratio Φ.',
        druid: 'The Five Provinces of Ireland (Four Quarters + Meath, the Sacred Center); Nion (Ash — the World Tree bridging realms).',
        astrology: 'Ruled by Mercury (Gemini / Virgo). Governs alchemy, adaptability, quick intelligence, travel between worlds, and sensory mastery.',
        esoteric: 'The Vitruvian Star—humanity awakened at the crossroads of spirit and matter, wielding freedom, inquiry, and transformative motion.'
      },
      6: {
        title: 'The Hexad (Ἑξάς) — Cosmic Harmony, Beauty & The Perfect Number',
        greekTitle: 'Aphrodite Urania / Harmonia / Marriage of Proportions',
        tetractysRow: 3,
        planet: 'Venus ♀ (Aphrodite)',
        element: 'Air / Earth Harmony',
        sefira: 'Tiferet (תפארת — Beauty / The Solar Heart)',
        biblical: '6 Days of Creation; Man created on the 6th Day (Genesis 1:26–31); 6 Cities of Refuge; 6 Waterpots at Cana. Humanity, Labor, and Imperfection awaiting the 7th Day Sabbath.',
        pythagorean: '6 is the first "Perfect Number" (1 + 2 + 3 = 6 and 1 × 2 × 3 = 6). The Pythagoreans called it the "Form of Forms" and the "Articulation of the Universe."',
        druid: 'The Hexagram of Interlaced Triads (Sky & Earth); Sail (Willow — lunar harmony, healing, and poetic enchantment).',
        astrology: 'Ruled by Venus (Taurus / Libra). Radiates aesthetic symmetry, unconditional love, healing, stewardship, and domestic sanctuary.',
        esoteric: 'The Heart of the Tree of Life (Tiferet). Names resonating at 6 act as harmonic resonators, healers, and guardians of sacred proportion.'
      },
      7: {
        title: 'The Heptad (Ἑπτάς) — Sacred Mystery, Covenant & Cosmic Time',
        greekTitle: 'Athena Parthenos (Virgin & Unbegotten) / Kairos',
        tetractysRow: 4,
        planet: 'Neptune ♆ / Ketu (Lunar South Node) / Classical Moon-Saturn',
        element: 'Water / Spirit',
        sefira: 'Netzach (נצח — Eternity / Victory)',
        biblical: 'The 7th Day Sabbath rest; 7 Spirits of God; 7-Branched Menorah; 7 Seals, Trumpets & Bowls of Revelation; 77-fold forgiveness. Covenant Perfection, Sanctification, and Spiritual Completion.',
        pythagorean: 'Philolaus and Pythagoras revered 7 as the "Motherless Virgin" (Athena): within the Decad (1–10), 7 neither generates any number (by multiplication) nor is generated by any number except the Monad.',
        druid: 'The Seven Sacred Chieftain Trees of the Grove (Oak, Hazel, Holly, Yew, Ash, Pine, Apple); Seven-year cycle of Druidic bardic/ovate training.',
        astrology: 'Linked to the 7 Classical Planets of the Chaldean Order (Saturn, Jupiter, Mars, Sun, Venus, Mercury, Moon) and Neptunian mystic gnosis.',
        esoteric: 'The Philosopher, Seer, and Initiate. 7 pierces the veil of phenomena to contemplate eternal archetypes, sacred silence, and hidden truth.'
      },
      8: {
        title: 'The Ogdoad (Ὀγδοάς) — Regeneration, Infinity & Cosmic Justice',
        greekTitle: 'Rhea / Poseidon / The First Cube (2³) & Harmonic Octave',
        tetractysRow: 4,
        planet: 'Saturn ♄ (Kronos)',
        element: 'Earth / Celestial Crystalline Sphere',
        sefira: 'Hod (הוד — Splendor / Reverberating Majesty)',
        biblical: 'Circumcision on the 8th Day; 8 Souls saved in Noah’s Ark; Christ’s Resurrection on the 8th Day (the New Creation beyond the 7-day week); ΙΗΣΟΥΣ (Jesus) = 888 in Greek Isopsephy.',
        pythagorean: '8 is the first three-dimensional Cube (2 × 2 × 2 = 8, with 6 faces and 8 vertices) and the musical Octave (Harmonia). It represents invariable cosmic law ("As above, so below").',
        druid: 'The Eightfold Wheel of the Year (4 Solar Solstices/Equinoxes + 4 Cross-Quarter Fire Festivals).',
        astrology: 'Ruled by Saturn (Capricorn / Aquarius). Governs karmic equilibrium, temporal authority, mastery over matter, and resurrection.',
        esoteric: 'The number of power, karmic balance, and super-natural renewal. It bridges material mastery with the eighth sphere of fixed stars.'
      },
      9: {
        title: 'The Ennead (Ἐννεάς) — The Horizon of Being, Initiation & Fulfillment',
        greekTitle: 'Hephaestus / Oceanus / Prometheus / The Nine Muses',
        tetractysRow: 4,
        planet: 'Mars ♂ (Ares)',
        element: 'Fire',
        sefira: 'Yesod (יסוד — Foundation / The Astral Treasury)',
        biblical: 'The 9th Hour when Christ yielded His spirit ("It is finished"); 9 Fruits of the Holy Spirit (Galatians 5:22); 9 Gifts of the Spirit (1 Cor 12). Finality, Judgment, and Fruitfulness.',
        pythagorean: 'Called "Oceanus" and "Horizon" because all numbers revolve within 1 to 9 before returning to the Monad at 10. Any number multiplied by 9 reduces back to 9, making it the indestructible mirror of Truth (Emet).',
        druid: 'The Nine Hazels of Poetic Wisdom (Coll) dropping nuts into the Well of Segais; the Nine Priestesses of Avalon; the Triple Triad (3 × 3 = 9).',
        astrology: 'Ruled by Mars (Aries / Scorpio). Channels spiritual warriorhood, universal compassion, initiation through fire, and completion.',
        esoteric: 'In Chaldean numerology, 9 is omitted from ordinary letter assignments because it is the sacred number of the Divine Name. It signifies universal service and enlightenment.'
      },
      10: {
        title: 'The Decad (Δεκάς) — The Sacred Tetractys & Return to the All',
        greekTitle: 'Pan / Kosmos / Atlas / The All-Perfect Receptacle',
        tetractysRow: 4,
        planet: 'Sun / Pluto (Higher Octave)',
        element: 'All Elements Unified in Malkhut',
        sefira: 'Malkhut (מלכות — The Kingdom / Shekhinah)',
        biblical: 'The 10 Commandments (Decalogue); 10 Utterances of Creation in Genesis 1 ("And God said..."); 10 Plagues; Tithe (1/10th). Divine Law, Governmental Completeness, and Testimony.',
        pythagorean: 'The supreme oath of the Pythagoreans: "By Him who gave to our soul the Tetractys, which hath the fountain and root of ever-flowing nature" (1 + 2 + 3 + 4 = 10).',
        druid: 'Iodhadh (Yew — death and rebirth into a new octave of existence).',
        astrology: '10th House (Midheaven / Zenith) — culmination of destiny in the visible world.',
        esoteric: 'The Wheel of Fortune (Tarot Key X): completion of one cosmic cycle and simultaneous rebirth at a higher level of consciousness.'
      },
      11: {
        title: 'Master Number 11 — Illumination, Pillars of the Temple & Prophecy',
        greekTitle: 'The Twin Pillars (Jachin & Boaz) / Hyper-Monad',
        tetractysRow: 1,
        planet: 'Uranus ♅ / Illuminated Moon',
        element: 'Lightning / Aether',
        sefira: 'Da’at (דעת — Hidden Knowledge bridging Chokhmah & Binah)',
        biblical: '11 Stars bowing in Joseph’s dream; 11 curtains of goats’ hair over the Tabernacle; the transition between Law (10) and Apostolic Government (12). Revelation and Prophetic Transition.',
        pythagorean: 'As the first number beyond the Decad, 11 represents the initiate stepping between the two pillars of duality (1 and 1) without being divided—receiving direct gnosis (reducing to 2).',
        druid: 'Fea / Straif (Blackthorn — lightning flash of inescapable fate and revelation).',
        astrology: 'Aquarian / Uranian high-frequency channel; sudden awakening and visionary intuition.',
        esoteric: 'The Master Messenger. Carries high-voltage spiritual insight, bridging the unconscious abyss with conscious illumination.'
      },
      22: {
        title: 'Master Number 22 — The Master Architect & The 22 Sacred Letters',
        greekTitle: 'The Cosmic Demiurge / Circle-Squaring Proportion',
        tetractysRow: 3,
        planet: 'Pluto / Vulcan / Master Saturn-Uranus',
        element: 'Crystalline Earth & Spirit',
        sefira: 'All 22 Paths of the Tree of Life Unified',
        biblical: '22 Letters of the Hebrew Torah; 22 Books of the Hebrew Bible canon (Josephus); 22 Chapters of the Book of Revelation; Psalm 119 (22 acrostic stanzas). Total Revelation and Cosmic Architecture.',
        pythagorean: '22 is the classical Archimedes numerator of π ≈ 22/7, uniting the Circle of Spirit (22) with the Heptad of Time (7). Reduced, it grounds into the Tetrad (4).',
        druid: 'All 20 Ogham Feda + 2 Primal Polarities; the Megalithic Stone Circle builder.',
        astrology: 'Universal architectural alignment; synthesis of cardinal vision and fixed permanence.',
        esoteric: 'The highest manifestation number: translating infinite archetypal blueprints into lasting institutions, temples, and works for humanity.'
      },
      33: {
        title: 'Master Number 33 — The Avatar of Universal Compassion & Logos',
        greekTitle: 'Harmonia Mundi / Double Triad of Divine Love',
        tetractysRow: 3,
        planet: 'Neptune / Venus / Solar Christos',
        element: 'Pure Solar Light',
        sefira: 'Tiferet exalted into Keter',
        biblical: '33 years of King David’s reign in Jerusalem; 33 years of the earthly life of Jesus Christ; 33 miracles recorded in the Gospels; 33rd time "Elohim" appears in Genesis when Noah’s covenant is sealed.',
        pythagorean: 'The union of two Triads (3 × 11 = 33, reducing to the Perfect Hexad 6). Represents selfless spiritual mastery, healing, and the Teacher of Teachers.',
        druid: 'The Triple Awen raised to its Sovereign Octave; the Arch-Druid of Peace.',
        astrology: 'Exalted Venus-Jupiter-Neptune conjunction in the heart center.',
        esoteric: 'Rare and luminous vibration of unconditional blessing, sacrificial upliftment, and redemptive love.'
      }
    },

    // 5. CHALDEAN COMPOUND NUMBERS
    chaldeanCompounds: {
      10: 'The Wheel of Fortune — Rise and fall, honor, faith, and self-determined renewal.',
      11: 'The Lion Muzzled — Hidden trials, occult power, requiring fist of spirit over raw passion.',
      12: 'The Sacrifice / Victim — Subordination of personal ego for higher wisdom; beware bearing others’ burdens blindly.',
      13: 'Transformation & Rebirth — To the initiate, 13 is the number of Unity (אחד Echad = 13) and Love (אהבה Ahavah = 13), conferring power to regenerate.',
      14: 'Movement & Magnetic Communication — Mastery of the elements, commerce, and public influence through Mercurial poise.',
      15: 'Alchemy, Eloquence & Sacred Magic — Deeply fortunate for art, music, and magnetism (15 = יה Yah, and the magic constant of the 3x3 Kamea of Saturn).',
      16: 'The Shattered Citadel — Awakening through sudden insight; warns against hubris so the soul remains invincible.',
      17: 'The Star of the Magi — Immortality of name, spiritual victory over adversity, peace after storms (17 = טוב Tov, "Good").',
      18: 'Material vs. Spiritual Conflict — In Hebrew, 18 is חי (Chai = Life); in Chaldean tablets, it demands absolute integrity over deception.',
      19: 'The Prince of Heaven (The Sun) — Radiant happiness, honor, fulfillment, and divine protection.',
      20: 'The Awakening (Judgment) — Call to a higher cause; spiritual purpose transcending worldly ambition.',
      21: 'The Crown of the Magi (The Universe) — Advancement, elevation, and victory after long initiation.',
      22: 'The Master Architect / Caution against Illusion — Immense creative power when grounded in realistic discipline.',
      23: 'The Royal Star of the Lion — Help from superiors, protection, heritage, and natural authority.',
      24: 'Love, Art & Fortunate Patronage — Harmonious assistance in both worldly and spiritual endeavors.',
      25: 'Strength Gained Through Experience — Wisdom distilled from observation and discrimination.',
      26: 'The Tetragrammaton Number (26 = יהוה) — Channels covenant power and demands ethical stewardship.',
      27: 'The Scepter — Command, original intellect, and rewards earned through productive vision.',
      28: 'The Trusting Lamb — Great promise that requires vigilance in legal and contractual covenants.',
      29: 'Trial of Faith — Tests of emotional resilience teaching self-reliance on the inner Monad.',
      30: 'The Hermit Philosopher — Mental superiority, contemplative detachment, choosing wisdom over gold.',
      31: 'The Solitary Seeker — Deeply self-contained genius (31 = אל El, "God").',
      32: 'The 32 Paths of Wisdom — Magical communication with diverse nations and harmonious leadership.',
      33: 'The Star of Blessing — Identical in grace to 24, amplified by double-Triad benevolence.',
      36: 'The Solar Tetractys (1+2+...+8=36) — Magnetic authority and scholarly attainment.',
      37: 'The Royal Friendship — Good and fortunate partnerships, enduring love, and fruitful legacy.',
      40: 'Sanctified Waiting & Retreat — Preparation in the wilderness before public manifestation.',
      41: 'Magnetic Accomplishment — Solar vitality channeling into practical reform.',
      42: 'The 42-Letter Name of Creation — Favor, beauty, and ordered harmony.',
      45: 'The Seal of Zazel / Saturnian Completion (1+...+9=45) — Deep ancestral memory and enduring legacy.',
      50: 'The Jubilee & 50 Gates of Binah — Liberation, intellectual freedom, and spiritual sovereignty.',
      52: 'Completeness of the Solar Year (52 Weeks) — Cyclical mastery and prophetic foresight.'
    },

    // 6. DRUIDIC OGHAM TREE ALPHABET
    oghamTrees: {
      'Beith': { letter: 'B', oghamChar: 'ᚁ', tree: 'Birch (Betula)', aicme: '1st Aicme (Beithe)', month: 'Dec 24 – Jan 20', meaning: 'New Beginnings, Purification, Pioneer Spirit, Shedding the Old Bark.' },
      'Luis': { letter: 'L', oghamChar: 'ᚂ', tree: 'Rowan (Mountain Ash)', aicme: '1st Aicme (Beithe)', month: 'Jan 21 – Feb 17', meaning: 'Psychic Protection, Quickening of Vision, Sanctuary against Illusion.' },
      'Fearn': { letter: 'F/V', oghamChar: 'ᚃ', tree: 'Alder (Alnus)', aicme: '1st Aicme (Beithe)', month: 'Feb 18 – Mar 17', meaning: 'Shield of Bran, Bridge over Waters, Oracular Courage & Foundation.' },
      'Sail': { letter: 'S', oghamChar: 'ᚄ', tree: 'Willow (Salix)', aicme: '1st Aicme (Beithe)', month: 'Mar 18 – Apr 14', meaning: 'Lunar Intuition, Poetic Enchantment, Sacred Rhythm & Healing Streams.' },
      'Nion': { letter: 'N', oghamChar: 'ᚅ', tree: 'Ash (Fraxinus)', aicme: '1st Aicme (Beithe)', month: 'Apr 15 – May 12', meaning: 'The World Tree, Interconnectedness of Microcosm & Macrocosm, Peace.' },
      'Huath': { letter: 'H', oghamChar: 'ᚆ', tree: 'Hawthorn (Crataegus)', aicme: '2nd Aicme (hÚatha)', month: 'May 13 – Jun 9', meaning: 'Cleansing, Sacred Threshold of the Otherworld, Heart Protection.' },
      'Duir': { letter: 'D', oghamChar: 'ᚇ', tree: 'Oak (Quercus)', aicme: '2nd Aicme (hÚatha)', month: 'Jun 10 – Jul 7', meaning: 'Doorway (Daur) of Druids, Sovereign Strength, Endurance, Lightning-Holder.' },
      'Tinne': { letter: 'T', oghamChar: 'ᚈ', tree: 'Holly (Ilex)', aicme: '2nd Aicme (hÚatha)', month: 'Jul 8 – Aug 4', meaning: 'Warrior Justice, Forge-Bar of Spirit, Unyielding Integrity in Winter.' },
      'Coll': { letter: 'C/K', oghamChar: 'ᚉ', tree: 'Hazel (Corylus)', aicme: '2nd Aicme (hÚatha)', month: 'Aug 5 – Sep 1', meaning: 'The Nine Hazels of Poetic Awen & Concentrated Wisdom at Connla’s Well.' },
      'Ceirt': { letter: 'Q', oghamChar: 'ᚊ', tree: 'Apple (Malus)', aicme: '2nd Aicme (hÚatha)', month: 'Eternal Avalon', meaning: 'Silver Branch of Emain Ablach (Avalon), Immortality, Beauty & Choice.' },
      'Muin': { letter: 'M', oghamChar: 'ᚋ', tree: 'Vine / Bramble', aicme: '3rd Aicme (Muine)', month: 'Sep 2 – Sep 29', meaning: 'Prophecy, Harvest of the Inward Spirit, Uninhibited Truth.' },
      'Gort': { letter: 'G', oghamChar: 'ᚌ', tree: 'Ivy (Hedera)', aicme: '3rd Aicme (Muine)', month: 'Sep 30 – Oct 27', meaning: 'Spiral Ascent of the Soul, Tenacity, Labyrinth of Resurrection.' },
      'Ngetal': { letter: 'NG', oghamChar: 'ᚍ', tree: 'Reed (Phragmites)', aicme: '3rd Aicme (Muine)', month: 'Oct 28 – Nov 24', meaning: 'Harmonic Flute, Directness of Purpose, Order out of Chaos.' },
      'Straif': { letter: 'Z/ST', oghamChar: 'ᚎ', tree: 'Blackthorn (Prunus spinosa)', aicme: '3rd Aicme (Muine)', month: 'Dark Moon', meaning: 'Inevitable Fate, Radical Cleansing, Alchemy through Crucible.' },
      'Ruis': { letter: 'R', oghamChar: 'ᚏ', tree: 'Elder (Sambucus)', aicme: '3rd Aicme (Muine)', month: 'Nov 25 – Dec 23', meaning: 'End of the Year & Regeneration, Fairy Queen’s Tree, Fulfillment.' },
      'Ailm': { letter: 'A', oghamChar: 'ᚐ', tree: 'Silver Fir (Abies)', aicme: '4th Aicme (Ailme)', month: 'Winter Solstice', meaning: 'Elevated Perspective, Pure Breath, Birth of the Solar Child.' },
      'Onn': { letter: 'O', oghamChar: 'ᚑ', tree: 'Gorse / Furze (Ulex)', aicme: '4th Aicme (Ailme)', month: 'Vernal Equinox', meaning: 'Solar Gold, Collecting Light, Hope & Sweetness Gathered through Thorns.' },
      'Ur': { letter: 'U/V', oghamChar: 'ᚒ', tree: 'Heather (Calluna)', aicme: '4th Aicme (Ailme)', month: 'Summer Solstice', meaning: 'Generosity, Gateway to the Ancestors, Sweetness of the Earth.' },
      'Eadha': { letter: 'E', oghamChar: 'ᚓ', tree: 'White Poplar / Aspen', aicme: '4th Aicme (Ailme)', month: 'Autumnal Equinox', meaning: 'Overcoming Fear, Whispering Leaves of the Ancestors, Endurance.' },
      'Iodhadh': { letter: 'I/J/Y', oghamChar: 'ᚔ', tree: 'Yew (Taxus baccata)', aicme: '4th Aicme (Ailme)', month: 'Samhain Eve', meaning: 'Millennial Eternity, Death & Rebirth, Deepest Ancestral Memory.' },
      'Peith': { letter: 'P', oghamChar: 'ᚕ', tree: 'Guelder Rose / Pine', aicme: 'Forfeda', month: 'Sacred Grove', meaning: 'Illumination & Hidden Lore.' },
      'Uilleann': { letter: 'W', oghamChar: 'ᚗ', tree: 'Honeysuckle', aicme: 'Forfeda', month: 'Sacred Grove', meaning: 'Spiral Devotion & Sweet Intuition.' },
      'Eabhadh': { letter: 'X', oghamChar: 'ᚖ', tree: 'Aspen Grove', aicme: 'Forfeda', month: 'Sacred Grove', meaning: 'Shield against Whispering Fears.' },
      'Idho': { letter: 'Y', oghamChar: 'ᚔ', tree: 'Ancient Yew', aicme: 'Forfeda', month: 'Sacred Grove', meaning: 'Immortal Root of Time.' }
    },

    // 7. AGRIPPA PLANETARY KAMEAS
    planetaryKameas: {
      3: { planet: 'Saturn ♄', hebrewName: 'Shabbatai (שבתי)', size: '3×3', lineSum: 15, totalSum: 45, divineName: 'Yah (יה = 15)', intelligence: 'Agiel (אגיאל = 45)', spirit: 'Zazel (זאזל = 45)', meaning: 'Binds time, structure, ancestral wisdom, and deep contemplation.' },
      4: { planet: 'Jupiter ♃', hebrewName: 'Tzedek (צדק)', size: '4×4', lineSum: 34, totalSum: 136, divineName: 'El (אל = 31)', intelligence: 'Iophiel (יופיאל = 136)', spirit: 'Hismael (הסמאל = 136)', meaning: 'Bestows sovereignty, benevolence, expansion, and righteous prosperity.' },
      5: { planet: 'Mars ♂', hebrewName: 'Madim (מאדים)', size: '5×5', lineSum: 65, totalSum: 325, divineName: 'Adonai (אדני = 65)', intelligence: 'Graphiel (גראפיאל = 325)', spirit: 'Bartzabel (ברצבאל = 325)', meaning: 'Conquers inertia, ignites courage, spiritual warfare, and decisive will.' },
      6: { planet: 'Sun ☉', hebrewName: 'Shemesh (שמש)', size: '6×6', lineSum: 111, totalSum: 666, divineName: 'Nakhiel (נכיאל = 111) / Aleph (אלף = 111)', intelligence: 'Nakhiel (111)', spirit: 'Sorath (סורת = 666)', meaning: 'The Solar Heart (Tiferet): 111 represents the pure Monad (Aleph = אלף = 111), while 666 represents the total solar field that must be governed by Spirit.' },
      7: { planet: 'Venus ♀', hebrewName: 'Nogah (נוגה)', size: '7×7', lineSum: 175, totalSum: 1225, divineName: 'Hagiel (הגיאל = 49 = 7²)', intelligence: 'Hagiel (49)', spirit: 'Kedemel (קדמאל = 175)', meaning: 'Harmonizes opposites through beauty, love, sacred art, and grace.' },
      8: { planet: 'Mercury ☿', hebrewName: 'Kokhav (כוכב)', size: '8×8', lineSum: 260, totalSum: 2080, divineName: 'Tiriel (טיריאל = 260)', intelligence: 'Tiriel (260)', spirit: 'Taphthartharath (תפתרתרת = 2080)', meaning: 'Governs Hermes/Thoth, science, ciphering, eloquence, and the intellect.' },
      9: { planet: 'Moon ☽', hebrewName: 'Levanah (לבנה)', size: '9×9', lineSum: 369, totalSum: 3321, divineName: 'Shaddai (שדי)', intelligence: 'Malkah be-Tarshishim (3321)', spirit: 'Chashmodai (חשמודאי = 369)', meaning: 'Rules the astral treasury (Yesod), memory, dreams, and soul-navigation.' }
    },

    // 8. CANONICAL SACRED CONCORDANCE
    sacredLexicon: [
      { num: 1, word: 'Monad (Μονάς) / Aleph (א)', lang: 'Greek / Hebrew', sys: 'Universal', desc: 'Absolute Unity; "Hear O Israel, the Lord is One" (Deut 6:4).' },
      { num: 3, word: 'Ab (אב — Father) / Awen (/|\\)', lang: 'Hebrew / Druidic', sys: 'Gematria / Triad', desc: 'The Father in Kabbalah (Chokhmah); the Three Rays of Druidic Awen.' },
      { num: 7, word: 'Zayin / Shabbat / Dag (דג — Fish)', lang: 'Hebrew / Biblical', sys: 'Gematria', desc: 'Covenant Perfection, the 7th Day of Rest, the 7 Classical Planets.' },
      { num: 8, word: 'Ogdoad / Chet (ח)', lang: 'Greek / Hebrew', sys: 'Universal', desc: 'Transcendence above nature, Resurrection, New Creation.' },
      { num: 10, word: 'Tetractys (Τετρακτύς) / Yod (י)', lang: 'Pythagorean / Hebrew', sys: 'Decad', desc: '1+2+3+4 = 10: The Fountain of Ever-Flowing Nature & the 10 Sefirot.' },
      { num: 12, word: 'Shibtei Yisrael / Dodecahedron', lang: 'Biblical / Greek', sys: 'Universal', desc: '12 Tribes of Israel, 12 Apostles, 12 Signs of the Zodiac, Plato’s Cosmic Dodecahedron.' },
      { num: 13, word: 'Echad (אחד — One) & Ahavah (אהבה — Love)', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: 'One (אחד = 13) and Love (אהבה = 13) are identical; together 13+13 = 26 (YHVH).' },
      { num: 14, word: 'David (דוד — Beloved) & Yad (יד — Hand)', lang: 'Hebrew / Biblical', sys: 'Mispar Hechrachi', desc: 'King David (4+6+4 = 14); Matthew 1 structures Christ’s genealogy in 3 × 14 generations.' },
      { num: 15, word: 'Yah (יה) & Hod (הוד — Splendor)', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: 'Sacred Name Yah (10+5 = 15); 15 Psalms of Ascent; Magic Constant of Saturn’s 3×3 Square.' },
      { num: 17, word: 'Tov (טוב — Good)', lang: 'Hebrew / Biblical', sys: 'Mispar Hechrachi', desc: '"And God saw that it was good (טוב = 9+6+2 = 17)." Its triangular number is 153.' },
      { num: 18, word: 'Chai (חי — Life)', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: 'Living / Life (8+10 = 18); the 18 Benedictions (Amidah).' },
      { num: 21, word: 'Ehyeh (אהיה — "I AM")', lang: 'Hebrew / Biblical', sys: 'Mispar Hechrachi', desc: 'God’s Name revealed to Moses at the Burning Bush (Exodus 3:14).' },
      { num: 22, word: 'Otiyot HaTorah (22 Sacred Letters)', lang: 'Hebrew', sys: 'Kabbalah', desc: 'The 22 foundation letters of Sefer Yetzirah and 22 Paths on the Tree of Life.' },
      { num: 26, word: 'YHVH (יהוה — Tetragrammaton) / "God" (English Ordinal)', lang: 'Hebrew / English Ordinal', sys: 'Hechrachi & English Ordinal', desc: 'Both יהוה in Hebrew (10+5+6+5 = 26) AND "GOD" in English Ordinal (G=7 + O=15 + D=4 = 26) equal 26!' },
      { num: 31, word: 'El (אל — Mighty God)', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: 'Divine Name of Chesed (Mercy & Lovingkindness: 1+30 = 31).' },
      { num: 32, word: 'Lev (לב — Heart) & 32 Paths of Wisdom', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: '32 Paths of Wisdom in Sefer Yetzirah; Torah begins with Bet (2) and ends with Lamed (30) = 32.' },
      { num: 36, word: 'Lamed-Vav Tzadikim / Grand Tetractys', lang: 'Hebrew / Pythagorean', sys: 'Universal', desc: '36 Hidden Righteous Ones; 36th Triangular Number is 666.' },
      { num: 37, word: 'Yechidah (יחידה — Divine Spark of Soul)', lang: 'Hebrew / Biblical', sys: 'Mispar Hechrachi', desc: 'Prime factor of Genesis 1:1 (2701 = 37 × 73) and Jesus (888 = 24 × 37).' },
      { num: 40, word: 'Mem (מ) / Trial & Transformation', lang: 'Biblical / Hebrew', sys: 'Universal', desc: '40 days of Moses on Sinai, Elijah on Horeb, and Christ in the wilderness.' },
      { num: 42, word: 'Eloah (אלוה) & The 42-Letter Name', lang: 'Hebrew / Biblical', sys: 'Kabbalah', desc: '42 encampments of Israel; 42 generations to Christ; the 42-letter Name of Creation.' },
      { num: 45, word: 'Adam (אדם — Humanity) & Mah (מה)', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: 'Adam (1+4+40 = 45) and YHVH spelled in full (יוד הא ואו הא = 45).' },
      { num: 50, word: 'Nun (נ) / Sha’arei Binah (50 Gates)', lang: 'Hebrew / Biblical', sys: 'Universal', desc: 'Year of Jubilee (50th year); Pentecost (50th day); 50 Gates of Understanding.' },
      { num: 52, word: 'Ben (בן — Son) & Eliyahu (אליהו — Elijah)', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: 'Son (2+50 = 52) and Elijah the Prophet (52).' },
      { num: 64, word: 'Aletheia (Ἀλήθεια — Truth)', lang: 'Greek', sys: 'Isopsephy', desc: 'Truth in Greek Isopsephy (1+30+8+9+5+10+1 = 64 = 8²).' },
      { num: 65, word: 'Adonai (אדני — Lord) & Heikhal (היכל — Palace)', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: 'Adonai (1+4+50+10 = 65): the Temple Palace where the Divine Presence dwells.' },
      { num: 70, word: 'Ayin (ע) / Sod (סוד — Secret)', lang: 'Hebrew / Biblical', sys: 'Mispar Hechrachi', desc: 'Sod (70, Esoteric Mystery) and Yayin (70, Wine); 70 Elders & 70 Nations.' },
      { num: 72, word: 'Chesed (חסד — Grace) & Shem HaMephorash', lang: 'Hebrew / Kabbalah', sys: 'Mispar Hechrachi', desc: 'Lovingkindness (72) and the 72-fold Name of God.' },
      { num: 73, word: 'Chokhmah (חכמה — Wisdom)', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: 'Wisdom (8+20+40+5 = 73); Genesis 1:1 totals 2701 = 37 × 73.' },
      { num: 74, word: 'Jesus / Messiah / Cross / Gospel (English Ordinal)', lang: 'English Gematria', sys: 'English Ordinal', desc: 'In English Ordinal: JESUS = 74, MESSIAH = 74, CROSS = 74, GOSPEL = 74.' },
      { num: 86, word: 'Elohim (אלהים — God as Creator) & HaTeva (הטבע — Nature)', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: 'Elohim (86) equals HaTeva ("The Nature" = 86).' },
      { num: 93, word: 'Agape (Ἀγάπη — Love) & Thelema (Θέλημα — Will)', lang: 'Greek', sys: 'Isopsephy', desc: 'In Greek Isopsephy, Agape (93) equals Thelema (93).' },
      { num: 111, word: 'Aleph (אלף) & Solar Line Constant', lang: 'Hebrew / Astrological', sys: 'Mispar Hechrachi', desc: 'Spelled in full, Aleph (1+30+80 = 111); row sum of the 6×6 Kamea of the Sun.' },
      { num: 137, word: 'Kabbalah (קבלה — Receiving) & Fine-Structure Constant (1/α)', lang: 'Hebrew / Physics', sys: 'Mispar Hechrachi', desc: 'Kabbalah (137) mirrors physicists’ dimensionless electromagnetic constant α⁻¹ ≈ 137.036.' },
      { num: 144, word: 'Kedem (קדם) & New Jerusalem Measure', lang: 'Biblical / Pythagorean', sys: 'Universal', desc: '12 × 12 = 144 (Revelation 21:17); 12th Fibonacci number.' },
      { num: 153, word: 'Bnei HaElohim & Miraculous Catch of Fish', lang: 'Biblical / Greek', sys: 'Universal', desc: 'John 21:11 (153 great fish); 17th Triangular Number.' },
      { num: 207, word: 'Or (אור — Light), Raz (רז — Mystery) & Ein Sof (אין סוף)', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: 'Light (207), Secret Mystery (207), and the Infinite (207).' },
      { num: 248, word: 'Avraham (אברהם) & Rachamim (רחמים)', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: 'Abraham (248), Mercy (248), and the 248 Positive Commandments.' },
      { num: 284, word: 'Theos (Θεός — God) & Agios (Ἅγιος — Holy)', lang: 'Greek', sys: 'Isopsephy', desc: 'Theos (284) and Agios (284); first Amicable Number pair with 220.' },
      { num: 314, word: 'Shaddai (שדי — Almighty) & Metatron (מטטרון)', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: 'El Shaddai (314) and Archangel Metatron (314), echoing π (3.14...).' },
      { num: 358, word: 'Mashiach (משיח — Messiah) & Nachash (נחש — Serpent)', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: 'Messiah (358) redeems and transforms the primordial Serpent (358).' },
      { num: 365, word: 'Abrasax (Ἀβρασάξ) & Enoch’s Solar Years', lang: 'Greek / Biblical', sys: 'Isopsephy', desc: 'Solar deity Abrasax (365) and Genesis 5:23 (Enoch walked with God 365 years).' },
      { num: 373, word: 'Logos (Λόγος — The Divine Word / Reason)', lang: 'Greek', sys: 'Isopsephy', desc: '"In the beginning was the Logos" (John 1:1): 30+70+3+70+200 = 373.' },
      { num: 376, word: 'Shalom (שלום — Peace)', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: 'Wholeness and Universal Peace (376).' },
      { num: 441, word: 'Emet (אמת — Truth)', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: 'Truth (1+40+400 = 441 = 21²), digital root = 9.' },
      { num: 444, word: 'Jesus / Messiah / Cross / Gospel (English Sumerian)', lang: 'English Sumerian', sys: 'Sumerian (×6)', desc: 'In Sumerian Gematria (Ordinal × 6): JESUS = 444, MESSIAH = 444, CROSS = 444, LUCIFER = 444.' },
      { num: 541, word: 'Yisrael (ישראל — Israel)', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: 'Israel (541, the 100th Prime Number).' },
      { num: 600, word: 'Kosmos (Κόσμος — Ordered Universe)', lang: 'Greek', sys: 'Isopsephy', desc: 'Pythagoras was the first to call the universe "Kosmos" (600).' },
      { num: 611, word: 'Torah (תורה — Divine Instruction)', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: 'Torah (611) + 2 Direct Utterances = 613 Mitzvot.' },
      { num: 620, word: 'Keter (כתר — The Supreme Crown)', lang: 'Hebrew', sys: 'Mispar Hechrachi', desc: 'Keter (620), the 620 letters of the Ten Commandments.' },
      { num: 666, word: 'Shemesh Kamea Total & 36th Triangular Number', lang: 'Biblical / Astrological', sys: 'Universal', desc: 'Revelation 13:18 (666); 36th Triangular Number; total sum of the 6×6 Solar Magic Square.' },
      { num: 777, word: 'Lamech’s Years & Threefold Covenant Perfection', lang: 'Biblical / Esoteric', sys: 'Universal', desc: 'Genesis 5:31 (777 years); the Flaming Sword descending the Tree of Life.' },
      { num: 781, word: 'Sophia (Σοφία — Divine Wisdom)', lang: 'Greek', sys: 'Isopsephy', desc: 'Wisdom in Greek Isopsephy (781).' },
      { num: 888, word: 'Iesous (Ἰησοῦς — Jesus)', lang: 'Greek / Biblical', sys: 'Isopsephy', desc: 'Jesus in Greek Isopsephy (888) — the Triple Ogdoad of Resurrection.' },
      { num: 906, word: 'Jesus (Jewish / Agrippa Latin Gematria)', lang: 'Jewish Gematria', sys: 'Jewish (Agrippa)', desc: 'J(600) + E(5) + S(90) + U(200) + S(90) - wait: J(600)+E(5)+S(90)+U(200)+S(90) = 985.' }
    ]
  };
})();
