// Three Body Problem Tab — Hong Kong / Cyberpunk Quantum Reader (EN & VI)
(function () {
  const BOOKS = [
    {
      id: 'book1',
      num: '01',
      en: 'The Three-Body Problem',
      vi: 'Tam Thể (Book I)',
      eraEn: 'Crisis Era • Sophons & Red Coast',
      eraVi: 'Kỷ Nguyên Khủng Hoảng • Hồng Ngạn & Trí Tử'
    },
    {
      id: 'book2',
      num: '02',
      en: 'The Dark Forest',
      vi: 'Khu Rừng Đen Tối (Book II)',
      eraEn: 'Wallfacers • Droplet & Deterrence',
      eraVi: 'Người Diện Bích • Giọt Nước & Răn Đe'
    },
    {
      id: 'book3',
      num: '03',
      en: "Death's End",
      vi: 'Tử Thần Vĩnh Sinh (Book III)',
      eraEn: 'Bunkers • Dual-Vector Foil & 2D Collapse',
      eraVi: 'Hầm Trú Ẩn • Mảnh Nhị Hướng & Sụp Đổ 2D'
    }
  ];

  const UI = {
    en: {
      eyebrow: 'REMEMBRANCE OF EARTH’S PAST // QUANTUM ARCHIVE',
      title: 'Three-Body Problem',
      subtitle: 'Book summaries, causal event chains, and verified science vs. speculative fiction across Cixin Liu’s trilogy.',
      sections: { all: 'Full Dossier', summary: '01. Summary', events: '02. Main Events', science: '03. Science Check' },
      langBadge: 'EN'
    },
    vi: {
      eyebrow: 'NHỚ VỀ QUÁ KHỨ TRÁI ĐẤT // KHO DỮ LIỆU LƯỢNG TỬ',
      title: 'Tam Thể — Three-Body Problem',
      subtitle: 'Tóm tắt tác phẩm, chuỗi sự kiện nhân quả và kiểm chứng khoa học thực tế so với giả tưởng trong bộ ba tiểu thuyết của Lưu Từ Hân.',
      sections: { all: 'Toàn Bộ Hồ Sơ', summary: '01. Tóm Tắt', events: '02. Sự Kiện Chính', science: '03. Kiểm Chứng Khoa Học' },
      langBadge: 'VI'
    }
  };

  let state = {
    lang: 'en',
    bookId: 'book1',
    section: 'all' // 'all' | 'summary' | 'events' | 'science'
  };

  function escapeHtml(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function formatInline(txt) {
    let s = escapeHtml(txt);
    s = s.replace(/`([^`]+)`/g, '<code class="tb-code">$1</code>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    // Cleanly render inline LaTeX-like expressions in readable monospace/math spans
    s = s.replace(/\$([^$]+)\$/g, '<span class="tb-math">$1</span>');
    return s;
  }

  function extractSection(md, secKey) {
    if (!md || secKey === 'all') return md;
    const lines = md.replace(/\r\n/g, '\n').split('\n');
    const secStarts = [];
    lines.forEach((l, i) => {
      if (/^##\s+[123]\./.test(l.trim())) secStarts.push(i);
    });
    if (secStarts.length < 3) return md;
    const map = { summary: 0, events: 1, science: 2 };
    const idx = map[secKey];
    const start = secStarts[idx];
    const end = idx + 1 < secStarts.length ? secStarts[idx + 1] : lines.length;
    return lines.slice(start, end).join('\n');
  }

  function mdToCyberHtml(md) {
    const lines = String(md || '').replace(/\r\n/g, '\n').split('\n');
    let html = '';
    let inList = false;
    let listTag = 'ul';

    const flushList = () => {
      if (inList) { html += `</${listTag}>`; inList = false; }
    };

    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      const t = raw.trim();
      if (!t) { flushList(); continue; }
      if (i === 0 && /^#\s+/.test(t)) continue; // skip top H1 (rendered in header)
      if (/^---+$/.test(t)) { flushList(); html += '<hr class="tb-divider" />'; continue; }

      if (/^##\s+/.test(t)) {
        flushList();
        html += `<h2 class="tb-h2">${formatInline(t.replace(/^##\s+/, ''))}</h2>`;
        continue;
      }

      if (/^###\s+/.test(t)) {
        flushList();
        const heading = t.replace(/^###\s+/, '');
        let cls = 'tb-h3';
        if (heading.startsWith('✅')) cls += ' tb-sci-true';
        else if (heading.startsWith('⚠️')) cls += ' tb-sci-partial';
        else if (heading.startsWith('❌')) cls += ' tb-sci-fiction';
        html += `<h3 class="${cls}">${formatInline(heading)}</h3>`;
        continue;
      }

      if (/^[-*]\s+/.test(t)) {
        if (!inList || listTag !== 'ul') { flushList(); listTag = 'ul'; html += '<ul class="tb-list">'; inList = true; }
        html += `<li>${formatInline(t.replace(/^[-*]\s+/, ''))}</li>`;
        continue;
      }

      if (/^\d+\.\s+/.test(t)) {
        if (!inList || listTag !== 'ol') { flushList(); listTag = 'ol'; html += '<ol class="tb-list tb-olist">'; inList = true; }
        html += `<li>${formatInline(t.replace(/^\d+\.\s+/, ''))}</li>`;
        continue;
      }

      flushList();
      html += `<p class="tb-p">${formatInline(t)}</p>`;
    }
    flushList();
    return html;
  }

  function render() {
    const container = document.getElementById('threeBodyContainer');
    if (!container) return;
    const L = UI[state.lang] || UI.en;
    const data = window.THREE_BODY_DATA || {};
    const book = BOOKS.find(b => b.id === state.bookId) || BOOKS[0];
    const mdRaw = (data[book.id] && data[book.id][state.lang]) || '';
    const mdFiltered = extractSection(mdRaw, state.section);

    const bookTabsHtml = BOOKS.map(b => {
      const active = b.id === state.bookId ? 'active' : '';
      const name = state.lang === 'vi' ? b.vi : b.en;
      const era = state.lang === 'vi' ? b.eraVi : b.eraEn;
      return `
        <button type="button" class="tb-book-btn ${active}" data-book="${b.id}">
          <span class="tb-book-num">${b.num}</span>
          <span class="tb-book-meta">
            <span class="tb-book-name">${escapeHtml(name)}</span>
            <span class="tb-book-era">${escapeHtml(era)}</span>
          </span>
        </button>
      `;
    }).join('');

    const secTabsHtml = Object.keys(L.sections).map(k => `
      <button type="button" class="tb-sec-btn ${state.section === k ? 'active' : ''}" data-sec="${k}">
        ${escapeHtml(L.sections[k])}
      </button>
    `).join('');

    container.innerHTML = `
      <div class="tb-shell">
        <div class="tb-header">
          <div class="tb-header-text">
            <div class="tb-eyebrow">${L.eyebrow}</div>
            <h2 class="tb-title">${L.title}</h2>
            <p class="tb-subtitle">${L.subtitle}</p>
          </div>
          <div class="tb-orbit-badge" aria-hidden="true">
            <svg viewBox="0 0 80 80" width="68" height="68">
              <ellipse cx="40" cy="40" rx="34" ry="13" fill="none" stroke="rgba(0,240,255,0.45)" stroke-width="1" transform="rotate(-24 40 40)"/>
              <ellipse cx="40" cy="40" rx="34" ry="13" fill="none" stroke="rgba(255,46,147,0.45)" stroke-width="1" transform="rotate(36 40 40)"/>
              <circle cx="24" cy="28" r="3.2" fill="#00f0ff"/>
              <circle cx="56" cy="34" r="2.8" fill="#ff2e93"/>
              <circle cx="38" cy="54" r="2.6" fill="#ffb800"/>
            </svg>
          </div>
        </div>

        <div class="tb-book-grid">${bookTabsHtml}</div>

        <div class="tb-sec-bar">
          <div class="tb-sec-pills">${secTabsHtml}</div>
          <div class="tb-lang-pill">LANG // ${L.langBadge}</div>
        </div>

        <article class="tb-reader">
          ${mdToCyberHtml(mdFiltered)}
        </article>
      </div>
    `;

    container.querySelectorAll('.tb-book-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.bookId = btn.getAttribute('data-book');
        render();
      });
    });

    container.querySelectorAll('.tb-sec-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.section = btn.getAttribute('data-sec');
        render();
      });
    });
  }

  window.renderThreeBody = function (lang) {
    state.lang = lang === 'vi' ? 'vi' : 'en';
    render();
  };
})();
