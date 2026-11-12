// ARITHMOS HO THEOS — Core Cipher Engine & GematriaCalculator.us 32-Cipher Suite

(function () {
  const K = window.SACRED_KNOWLEDGE;

  function normalizeGreekChar(ch) {
    const base = ch.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();
    if (base === 'ς') return 'Σ';
    return base;
  }

  const sofitToRegular = { 'ך': 'כ', 'ם': 'מ', 'ן': 'נ', 'ף': 'פ', 'ץ': 'צ' };
  const regularToSofit = { 'כ': 'ך', 'מ': 'ם', 'נ': 'ן', 'פ': 'ף', 'ץ': 'ץ' };
  const hebrewOrder = ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ', 'ק', 'ר', 'ש', 'ת'];
  const ALPHABET_26 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  function getAtbashLetter(hebChar) {
    const reg = sofitToRegular[hebChar] || hebChar;
    const idx = hebrewOrder.indexOf(reg);
    if (idx === -1) return hebChar;
    return hebrewOrder[21 - idx];
  }

  function digitalRoot(n) {
    n = Math.abs(Math.floor(n));
    if (n === 0) return 0;
    return ((n - 1) % 9) + 1;
  }

  function reduceMaster(n) {
    n = Math.abs(Math.floor(n));
    const steps = [n];
    while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
      n = String(n).split('').reduce((a, b) => a + Number(b), 0);
      steps.push(n);
    }
    return { value: n, steps };
  }

  function analyzeMath(n) {
    if (!n || n <= 0) {
      return {
        isPrime: false, factors: [], divisors: [], aliquotSum: 0,
        perfection: 'Monad/Zero', isTriangular: false, triangularIndex: null,
        isSquare: false, squareRoot: null, isFibonacci: false,
        binary: '0', duodecimal: '0', hex: '0'
      };
    }
    let temp = n;
    const factors = [];
    for (let d = 2; d * d <= temp; d++) {
      while (temp % d === 0) {
        factors.push(d);
        temp = Math.floor(temp / d);
      }
    }
    if (temp > 1) factors.push(temp);
    const isPrime = n > 1 && factors.length === 1;

    const divisors = [];
    for (let i = 1; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        divisors.push(i);
        if (i !== n / i) divisors.push(n / i);
      }
    }
    divisors.sort((a, b) => a - b);
    const properDivisors = divisors.filter(d => d < n);
    const aliquotSum = properDivisors.reduce((a, b) => a + b, 0);
    let perfection = 'Deficient Number (Ὑπερτελής — Spiritual Asceticism)';
    if (aliquotSum === n && n > 1) perfection = 'Perfect Number (Τέλειος — Divine Cosmic Harmony!)';
    else if (aliquotSum > n) perfection = 'Abundant Number (Ὑπερτελής — Overflowing Fecundity)';

    const triDisc = Math.round(Math.sqrt(8 * n + 1));
    const isTriangular = triDisc * triDisc === 8 * n + 1;
    const triangularIndex = isTriangular ? (triDisc - 1) / 2 : null;

    const sq = Math.round(Math.sqrt(n));
    const isSquare = sq * sq === n;

    const isSq = x => {
      const r = Math.round(Math.sqrt(x));
      return r * r === x;
    };
    const isFibonacci = isSq(5 * n * n + 4) || isSq(5 * n * n - 4);

    return {
      isPrime,
      factors,
      divisors,
      aliquotSum,
      perfection,
      isTriangular,
      triangularIndex,
      isSquare,
      squareRoot: isSquare ? sq : null,
      isFibonacci,
      binary: n.toString(2),
      duodecimal: n.toString(12).toUpperCase(),
      hex: n.toString(16).toUpperCase()
    };
  }

  // Compute all 28 GematriaCalculator.us ciphers + 4 Ancient Script ciphers
  function computeGematriaSuite(letters) {
    const suiteResults = {};

    K.GEMATRIA_CIPHERS.forEach(cDef => {
      const breakdown = [];
      let total = 0;

      letters.forEach(l => {
        let val = 0;
        if (l.script === 'Numeral') {
          val = Number(l.raw) || 0;
        } else {
          const latIdx = ALPHABET_26.indexOf(l.latin);
          const isUpper = l.raw === l.raw.toUpperCase() && l.raw !== l.raw.toLowerCase();
          if (latIdx !== -1) {
            val = cDef.charVal(latIdx, isUpper);
          }
        }
        total += val;
        breakdown.push({ char: l.raw, latin: l.latin, val });
      });

      // Build A-Z chart for this cipher
      const chartAZ = ALPHABET_26.map((ch, idx) => ({
        letter: ch,
        val: cDef.charVal(idx, false),
        upperVal: cDef.charVal(idx, true)
      }));

      suiteResults[cDef.id] = {
        ...cDef,
        total,
        reduced: digitalRoot(total),
        breakdown,
        chartAZ
      };
    });

    return suiteResults;
  }

  function cipherText(rawInput) {
    const cleaned = (rawInput || '').trim();
    if (!cleaned) return null;

    const letters = [];
    const tokens = cleaned.split(/\s+/);
    let charIndexGlobal = 0;

    tokens.forEach((word) => {
      const chars = Array.from(word);
      chars.forEach((ch, idx) => {
        const isWordEnd = idx === chars.length - 1;
        const upper = ch.toUpperCase();
        const grkNorm = normalizeGreekChar(ch);
        let entry = null;

        if (K.latinTable[upper]) {
          const lat = K.latinTable[upper];
          const hebStdChar = lat.heb;
          const hebChar = (isWordEnd && regularToSofit[hebStdChar]) ? regularToSofit[hebStdChar] : hebStdChar;
          const hebData = K.hebrewLetters[hebChar] || K.hebrewLetters[hebStdChar];
          const atbashChar = getAtbashLetter(hebStdChar);
          const atbashData = K.hebrewLetters[atbashChar];
          const grkData = K.greekLetters[lat.grk];
          const oghamData = K.oghamTrees[lat.ogham];
          const latIdx = ALPHABET_26.indexOf(upper);

          entry = {
            index: ++charIndexGlobal,
            raw: ch,
            script: 'Latin',
            latin: upper,
            hebrew: hebChar,
            hebrewName: hebData.name,
            hebrewMeaning: hebData.meaning,
            hebrewClass: hebData.class,
            hebrewPath: hebData.path,
            hebrewVal: hebData.val,
            hebrewGadol: hebData.gadol,
            hebrewOrd: K.hebrewLetters[hebStdChar].ord,
            atbashChar,
            atbashVal: atbashData ? atbashData.val : 0,
            greek: lat.grk,
            greekName: grkData ? grkData.name : '',
            greekVal: grkData ? grkData.val : lat.std,
            greekOrd: grkData ? grkData.ord : lat.ord,
            engOrd: lat.ord,
            engRevOrd: lat.rev,
            fullRed: digitalRoot(lat.ord),
            revFullRed: digitalRoot(lat.rev),
            engStd: lat.std,
            sumerian: lat.ord * 6,
            agrippa: lat.agrippa,
            satanic: lat.ord + 35,
            septenary: K.GEMATRIA_CIPHERS.find(c => c.id === 'septenary').charVal(latIdx),
            pyth: lat.pyth,
            chald: lat.chald,
            isVowel: lat.vowel,
            oghamKey: lat.ogham,
            oghamChar: oghamData ? oghamData.oghamChar : 'ᚐ',
            oghamTree: oghamData ? oghamData.tree : ''
          };
        } else if (K.hebrewLetters[ch]) {
          const hebData = K.hebrewLetters[ch];
          const regChar = sofitToRegular[ch] || ch;
          const atbashChar = getAtbashLetter(regChar);
          const atbashData = K.hebrewLetters[atbashChar];
          const latMatch = Object.entries(K.latinTable).find(([, v]) => v.heb === regChar);
          const latKey = latMatch ? latMatch[0] : 'A';
          const lat = K.latinTable[latKey];
          const grkData = K.greekLetters[lat.grk];
          const oghamData = K.oghamTrees[lat.ogham];
          const latIdx = ALPHABET_26.indexOf(latKey);

          entry = {
            index: ++charIndexGlobal,
            raw: ch,
            script: 'Hebrew',
            latin: latKey,
            hebrew: ch,
            hebrewName: hebData.name,
            hebrewMeaning: hebData.meaning,
            hebrewClass: hebData.class,
            hebrewPath: hebData.path,
            hebrewVal: hebData.val,
            hebrewGadol: hebData.gadol,
            hebrewOrd: K.hebrewLetters[regChar].ord,
            atbashChar,
            atbashVal: atbashData ? atbashData.val : 0,
            greek: lat.grk,
            greekName: grkData ? grkData.name : '',
            greekVal: hebData.val,
            greekOrd: K.hebrewLetters[regChar].ord,
            engOrd: lat.ord,
            engRevOrd: lat.rev,
            fullRed: digitalRoot(lat.ord),
            revFullRed: digitalRoot(lat.rev),
            engStd: hebData.val,
            sumerian: lat.ord * 6,
            agrippa: hebData.gadol,
            satanic: lat.ord + 35,
            septenary: K.GEMATRIA_CIPHERS.find(c => c.id === 'septenary').charVal(latIdx),
            pyth: digitalRoot(hebData.val),
            chald: lat.chald,
            isVowel: ['א', 'ה', 'ו', 'י', 'ע'].includes(regChar),
            oghamKey: lat.ogham,
            oghamChar: oghamData ? oghamData.oghamChar : 'ᚐ',
            oghamTree: oghamData ? oghamData.tree : ''
          };
        } else if (K.greekLetters[grkNorm]) {
          const grkData = K.greekLetters[grkNorm];
          const latMatch = Object.entries(K.latinTable).find(([, v]) => v.grk === grkNorm);
          const latKey = latMatch ? latMatch[0] : 'A';
          const lat = K.latinTable[latKey];
          const hebData = K.hebrewLetters[lat.heb];
          const atbashChar = getAtbashLetter(lat.heb);
          const atbashData = K.hebrewLetters[atbashChar];
          const oghamData = K.oghamTrees[lat.ogham];
          const latIdx = ALPHABET_26.indexOf(latKey);

          entry = {
            index: ++charIndexGlobal,
            raw: ch,
            script: 'Greek',
            latin: latKey,
            hebrew: lat.heb,
            hebrewName: hebData.name,
            hebrewMeaning: hebData.meaning,
            hebrewClass: hebData.class,
            hebrewPath: hebData.path,
            hebrewVal: grkData.val,
            hebrewGadol: grkData.val,
            hebrewOrd: grkData.ord,
            atbashChar,
            atbashVal: atbashData ? atbashData.val : 0,
            greek: grkNorm,
            greekName: grkData.name,
            greekVal: grkData.val,
            greekOrd: grkData.ord,
            engOrd: lat.ord,
            engRevOrd: lat.rev,
            fullRed: digitalRoot(lat.ord),
            revFullRed: digitalRoot(lat.rev),
            engStd: grkData.val,
            sumerian: lat.ord * 6,
            agrippa: grkData.val,
            satanic: lat.ord + 35,
            septenary: K.GEMATRIA_CIPHERS.find(c => c.id === 'septenary').charVal(latIdx),
            pyth: digitalRoot(grkData.val),
            chald: lat.chald,
            isVowel: ['Α', 'Ε', 'Η', 'Ι', 'Ο', 'Υ', 'Ω'].includes(grkNorm),
            oghamKey: lat.ogham,
            oghamChar: oghamData ? oghamData.oghamChar : 'ᚐ',
            oghamTree: oghamData ? oghamData.tree : ''
          };
        } else if (/[0-9]/.test(ch)) {
          const d = Number(ch);
          const hebByOrd = hebrewOrder[(d > 0 ? d - 1 : 0)] || 'א';
          const hebData = K.hebrewLetters[hebByOrd];
          entry = {
            index: ++charIndexGlobal,
            raw: ch,
            script: 'Numeral',
            latin: ch,
            hebrew: hebByOrd,
            hebrewName: hebData.name,
            hebrewMeaning: hebData.meaning,
            hebrewClass: hebData.class,
            hebrewPath: hebData.path,
            hebrewVal: d,
            hebrewGadol: d,
            hebrewOrd: d,
            atbashChar: hebByOrd,
            atbashVal: d,
            greek: ch,
            greekName: 'Numeral ' + d,
            greekVal: d,
            greekOrd: d,
            engOrd: d,
            engRevOrd: d,
            fullRed: d,
            revFullRed: d,
            engStd: d,
            sumerian: d * 6,
            agrippa: d,
            satanic: d,
            septenary: d,
            pyth: d,
            chald: d,
            isVowel: false,
            oghamKey: 'Ailm',
            oghamChar: 'ᚐ',
            oghamTree: 'Silver Fir'
          };
        }

        if (entry) letters.push(entry);
      });
    });

    if (letters.length === 0) return null;

    const sumBy = key => letters.reduce((acc, l) => acc + (l[key] || 0), 0);

    const hechrachi = sumBy('hebrewVal');
    const gadol = sumBy('hebrewGadol');
    const siduri = sumBy('hebrewOrd');
    const atbashTotal = sumBy('atbashVal');
    const isopsephy = sumBy('greekVal');
    const engOrdinal = sumBy('engOrd');
    const engRevOrdinal = sumBy('engRevOrd');
    const fullReduction = sumBy('fullRed');
    const revFullReduction = sumBy('revFullRed');
    const engStandard = sumBy('engStd');
    const sumerian = sumBy('sumerian');
    const agrippa = sumBy('agrippa');
    const satanic = sumBy('satanic');
    const septenary = sumBy('septenary');
    const pythRaw = sumBy('pyth');
    const chaldCompound = sumBy('chald');

    const gematriaSuite = computeGematriaSuite(letters);

    const pythVowelsRaw = letters.filter(l => l.isVowel).reduce((a, l) => a + l.pyth, 0);
    const pythConsonantsRaw = letters.filter(l => !l.isVowel).reduce((a, l) => a + l.pyth, 0);

    const pythDestiny = reduceMaster(pythRaw);
    const pythSoulUrge = reduceMaster(pythVowelsRaw);
    const pythPersona = reduceMaster(pythConsonantsRaw);
    const chaldRoot = reduceMaster(chaldCompound);
    const monadRoot = digitalRoot(pythRaw || hechrachi);

    const hebrewScript = letters.map(l => l.hebrew).join('');
    const atbashScript = letters.map(l => l.atbashChar).join('');
    const greekScript = letters.map(l => l.greek).join('');
    const oghamScript = '᚛' + letters.map(l => l.oghamChar).join('') + '᚜';

    const oghamCounts = {};
    letters.forEach(l => {
      oghamCounts[l.oghamKey] = (oghamCounts[l.oghamKey] || 0) + 1;
    });
    const dominantOghamKey = Object.entries(oghamCounts).sort((a, b) => b[1] - a[1])[0][0];
    const dominantOgham = K.oghamTrees[dominantOghamKey] || K.oghamTrees['Duir'];

    const roshLetter = K.hebrewLetters[letters[0].hebrew] || K.hebrewLetters['א'];
    const highestHebLetterObj = [...letters].sort((a, b) => b.hebrewVal - a.hebrewVal)[0];
    const anchorHebLetter = K.hebrewLetters[highestHebLetterObj.hebrew] || roshLetter;

    const activeNums = new Set([
      hechrachi, gadol, siduri, atbashTotal, isopsephy,
      engOrdinal, engRevOrdinal, fullReduction, revFullReduction,
      engStandard, sumerian, agrippa, satanic, septenary,
      pythRaw, chaldCompound, pythDestiny.value, monadRoot
    ]);
    Object.values(gematriaSuite).forEach(c => activeNums.add(c.total));

    const exactMatches = K.sacredLexicon.filter(item => activeNums.has(item.num));
    const harmonicMatches = K.sacredLexicon.filter(item =>
      !activeNums.has(item.num) &&
      (digitalRoot(item.num) === monadRoot ||
        (hechrachi > 1 && (hechrachi % item.num === 0 || item.num % hechrachi === 0)))
    ).slice(0, 8);

    const primaryGematria = letters[0].script === 'Greek' ? isopsephy : hechrachi;
    const mathAnalysis = analyzeMath(primaryGematria);

    return {
      input: cleaned,
      letterCount: letters.length,
      wordCount: tokens.length,
      letters,
      gematriaSuite,
      scripts: {
        hebrew: hebrewScript,
        atbash: atbashScript,
        greek: greekScript,
        ogham: oghamScript
      },
      ciphers: {
        hechrachi,
        gadol,
        siduri,
        atbashTotal,
        isopsephy,
        engOrdinal,
        engRevOrdinal,
        fullReduction,
        revFullReduction,
        engStandard,
        sumerian,
        agrippa,
        satanic,
        septenary,
        pythRaw,
        pythDestiny,
        pythVowelsRaw,
        pythSoulUrge,
        pythConsonantsRaw,
        pythPersona,
        chaldCompound,
        chaldRoot,
        monadRoot,
        primaryGematria,
        kolel: hechrachi + tokens.length
      },
      archetypes: {
        decad: K.pythagoreanDecad[pythDestiny.value] || K.pythagoreanDecad[monadRoot],
        monadDecad: K.pythagoreanDecad[monadRoot] || K.pythagoreanDecad[1],
        chaldeanMeaning: K.chaldeanCompounds[chaldCompound] || K.chaldeanCompounds[pythRaw] ||
          `Compound Vibration ${chaldCompound} — Synthesizes the solar-lunar currents of ${Math.floor(chaldCompound / 10) || 1} and ${chaldCompound % 10}, resolving into the Monad Root ${chaldRoot.value}.`,
        roshLetter,
        anchorHebLetter,
        dominantOgham,
        kamea: K.planetaryKameas[monadRoot] || K.planetaryKameas[6]
      },
      math: mathAnalysis,
      exactMatches,
      harmonicMatches
    };
  }

  window.cipherText = cipherText;
  window.digitalRoot = digitalRoot;
})();
