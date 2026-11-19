// Agentic Awesome Skills — 2,960+ Community Agent Skills Browser & Reader (EN / VI)
// Source: https://github.com/sickn33/agentic-awesome-skills
(function () {
  const PAGE_SIZE = 48;
  const REPO_URL = 'https://github.com/sickn33/agentic-awesome-skills';

  let state = {
    search: '',
    category: 'ALL',
    risk: 'ALL',
    sort: 'name',
    page: 1,
    activeSkillId: null,
    showRaw: false
  };

  function escapeHtml(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getRiskStyle(risk) {
    const r = String(risk || 'unknown').toLowerCase();
    if (r === 'safe' || r === 'low') {
      return 'background:rgba(16,185,129,0.12); color:#047857; border-color:rgba(16,185,129,0.3);';
    }
    if (r === 'medium') {
      return 'background:rgba(245,158,11,0.12); color:#b45309; border-color:rgba(245,158,11,0.3);';
    }
    if (r === 'high' || r === 'critical') {
      return 'background:rgba(239,68,68,0.12); color:#b91c1c; border-color:rgba(239,68,68,0.3);';
    }
    return '';
  }

  function loadSkillChunk(chunkKey, cb) {
    window.__AGENTIC_SKILLS_CHUNKS__ = window.__AGENTIC_SKILLS_CHUNKS__ || {};
    if (window.__AGENTIC_SKILLS_CHUNKS__[chunkKey]) {
      cb(window.__AGENTIC_SKILLS_CHUNKS__[chunkKey]);
      return;
    }
    const script = document.createElement('script');
    script.src = `agentic_skills_data/chunk_${chunkKey}.js`;
    script.onload = () => cb(window.__AGENTIC_SKILLS_CHUNKS__[chunkKey] || null);
    script.onerror = () => cb(null);
    document.head.appendChild(script);
  }

  function parseFrontmatter(rawMd) {
    const text = String(rawMd || '').replace(/\r\n/g, '\n');
    if (!text.startsWith('---\n')) {
      return { meta: {}, body: text };
    }
    const endIdx = text.indexOf('\n---\n', 4);
    if (endIdx === -1) {
      return { meta: {}, body: text };
    }
    const yamlBlock = text.slice(4, endIdx);
    const body = text.slice(endIdx + 5);
    const meta = {};
    let currentKey = null;

    yamlBlock.split('\n').forEach((line) => {
      const listMatch = line.match(/^\s*-\s+(.*)$/);
      if (listMatch && currentKey) {
        if (!Array.isArray(meta[currentKey])) meta[currentKey] = [];
        meta[currentKey].push(listMatch[1].trim().replace(/^['"]|['"]$/g, ''));
        return;
      }
      const kvMatch = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/);
      if (kvMatch) {
        currentKey = kvMatch[1];
        const val = kvMatch[2].trim();
        if (val === '') {
          meta[currentKey] = [];
        } else {
          meta[currentKey] = val.replace(/^['"]|['"]$/g, '');
        }
      }
    });

    return { meta, body };
  }

  function formatInline(txt) {
    let s = escapeHtml(txt);
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1 ↗</a>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    return s;
  }

  function mdToHtml(md) {
    const lines = String(md || '').replace(/\r\n/g, '\n').split('\n');
    let html = '';
    const toc = [];
    let inCode = false;
    let codeLang = '';
    let codeLines = [];
    let listTag = null;
    let inTable = false;
    let tableRows = [];

    const flushList = () => {
      if (listTag) {
        html += `</${listTag}>`;
        listTag = null;
      }
    };

    const flushTable = () => {
      if (!inTable || tableRows.length === 0) {
        inTable = false;
        tableRows = [];
        return;
      }
      html += '<div class="table-wrap"><table class="cipher-table">';
      tableRows.forEach((row, idx) => {
        if (idx === 1 && row.every(c => /^:?-{2,}:?$/.test(c.trim()))) return;
        const tag = idx === 0 ? 'th' : 'td';
        if (idx === 0) html += '<thead>';
        if (idx === 1 || (idx === 1 && !row.every(c => /^:?-{2,}:?$/.test(c.trim())))) html += '<tbody>';
        if (idx === 2 && tableRows[1] && tableRows[1].every(c => /^:?-{2,}:?$/.test(c.trim()))) html += '<tbody>';
        html += '<tr>' + row.map(c => `<${tag}>${formatInline(c.trim())}</${tag}>`).join('') + '</tr>';
        if (idx === 0) html += '</thead>';
      });
      html += '</tbody></table></div>';
      inTable = false;
      tableRows = [];
    };

    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i];
      const trimmed = raw.trim();

      if (trimmed.startsWith('```')) {
        flushList();
        flushTable();
        if (!inCode) {
          inCode = true;
          codeLang = trimmed.slice(3).trim();
          codeLines = [];
        } else {
          html += `<pre class="cs-code">${codeLang ? `<div style="font-size:0.7rem; text-transform:uppercase; letter-spacing:0.06em; color:var(--ink-muted); margin-bottom:0.4rem;">${escapeHtml(codeLang)}</div>` : ''}<code>${escapeHtml(codeLines.join('\n'))}</code></pre>`;
          inCode = false;
          codeLang = '';
          codeLines = [];
        }
        continue;
      }

      if (inCode) {
        codeLines.push(raw);
        continue;
      }

      if (!trimmed) {
        flushList();
        flushTable();
        continue;
      }

      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        flushList();
        inTable = true;
        const cells = trimmed.slice(1, -1).split('|');
        tableRows.push(cells);
        continue;
      } else {
        flushTable();
      }

      if (/^---+$/.test(trimmed) || /^\*\*\*+$/.test(trimmed)) {
        flushList();
        html += '<hr style="border:none; border-top:1px solid var(--border-hairline); margin:1.25rem 0;" />';
        continue;
      }

      const hMatch = trimmed.match(/^(#{1,4})\s+(.*)$/);
      if (hMatch) {
        flushList();
        const level = hMatch[1].length;
        const title = hMatch[2];
        const secId = 'skill-sec-' + toc.length;
        if (level <= 3) {
          toc.push({ id: secId, title, level });
        }
        html += `<h${level} id="${secId}" class="cs-h${level}">${formatInline(title)}</h${level}>`;
        continue;
      }

      if (trimmed.startsWith('>')) {
        flushList();
        const quoteText = trimmed.replace(/^>\s?/, '');
        html += `<div class="cs-callout"><p style="margin:0;">${formatInline(quoteText)}</p></div>`;
        continue;
      }

      const ulMatch = trimmed.match(/^[-*+]\s+(.*)$/);
      if (ulMatch) {
        if (listTag !== 'ul') {
          flushList();
          listTag = 'ul';
          html += '<ul>';
        }
        html += `<li>${formatInline(ulMatch[1])}</li>`;
        continue;
      }

      const olMatch = trimmed.match(/^\d+\.\s+(.*)$/);
      if (olMatch) {
        if (listTag !== 'ol') {
          flushList();
          listTag = 'ol';
          html += '<ol>';
        }
        html += `<li>${formatInline(olMatch[1])}</li>`;
        continue;
      }

      flushList();
      html += `<p>${formatInline(trimmed)}</p>`;
    }

    flushList();
    flushTable();
    if (inCode && codeLines.length) {
      html += `<pre class="cs-code"><code>${escapeHtml(codeLines.join('\n'))}</code></pre>`;
    }

    return { html, toc };
  }

  function renderSkillReader(container, lang, skill) {
    const isVi = lang === 'vi';
    container.innerHTML = `
      <section class="sacred-card">
        <p style="margin:0; color:var(--ink-muted);">${isVi ? 'Đang tải nội dung kỹ năng...' : 'Loading skill documentation...'}</p>
      </section>
    `;

    loadSkillChunk(skill.chunk, (chunkData) => {
      const rawMd = chunkData ? chunkData[skill.id] : null;
      if (!rawMd) {
        container.innerHTML = `
          <section class="sacred-card">
            <button type="button" id="skillBackBtn" class="btn-secondary">&larr; ${isVi ? 'Quay lại danh sách' : 'Back to Skills'}</button>
            <p style="margin-top:1rem;">${isVi ? 'Không thể tải tệp SKILL.md cho kỹ năng này.' : 'Unable to load SKILL.md for this skill.'}</p>
          </section>
        `;
        document.getElementById('skillBackBtn').addEventListener('click', () => {
          state.activeSkillId = null;
          renderAgenticSkills(lang);
        });
        return;
      }

      const { meta, body } = parseFrontmatter(rawMd);
      const rendered = mdToHtml(body);
      const githubSkillUrl = `${REPO_URL}/tree/main/${skill.path}`;

      const extraBadges = [];
      if (meta.author) extraBadges.push(`<span class="badge">Author: ${escapeHtml(meta.author)}</span>`);
      if (Array.isArray(meta.tools) && meta.tools.length) {
        extraBadges.push(`<span class="badge">Tools: ${escapeHtml(meta.tools.join(', '))}</span>`);
      }
      if (Array.isArray(meta.tags) && meta.tags.length) {
        extraBadges.push(...meta.tags.slice(0, 8).map(t => `<span class="badge">#${escapeHtml(t)}</span>`));
      }

      const tocHtml = rendered.toc.length > 1
        ? `<div class="cs-toc-bar" style="max-width:860px; margin:0 auto 1.5rem;">
            ${rendered.toc.map(item => `<a href="#${item.id}" class="cs-toc-link" data-sec="${item.id}">${escapeHtml(item.title)}</a>`).join('')}
           </div>`
        : '';

      container.innerHTML = `
        <section class="sacred-card">
          <div class="cs-reader-topbar">
            <div style="display:flex; align-items:center; gap:0.55rem; flex-wrap:wrap;">
              <button type="button" id="skillBackBtn" class="btn-secondary">&larr; ${isVi ? 'Tất Cả Kỹ Năng' : 'All Skills'}</button>
              <span class="badge badge-highlight">${escapeHtml(skill.category)}</span>
              <span class="badge" style="${getRiskStyle(skill.risk)}">Risk: ${escapeHtml(skill.risk)}</span>
              ${skill.date_added ? `<span class="badge">${escapeHtml(skill.date_added)}</span>` : ''}
            </div>
            <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
              <button type="button" id="skillToggleRawBtn" class="btn-ghost">${state.showRaw ? (isVi ? 'Xem Định Dạng' : 'Rendered View') : (isVi ? 'Xem Raw MD' : 'Raw SKILL.md')}</button>
              <button type="button" id="skillCopyBtn" class="btn-secondary">${isVi ? 'Sao chép SKILL.md' : 'Copy SKILL.md'}</button>
              <a href="${githubSkillUrl}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="text-decoration:none; padding:0.5rem 0.95rem; font-size:0.82rem;">GitHub ↗</a>
            </div>
          </div>

          <div style="max-width:860px; margin:0 auto 1.25rem;">
            <h2 style="font-family:var(--font-serif); font-size:1.75rem; color:var(--ink-black); margin:0 0 0.4rem;">${escapeHtml(skill.name)}</h2>
            <p style="font-size:0.95rem; color:var(--ink-secondary); margin:0 0 0.75rem;">${escapeHtml(skill.description)}</p>
            ${extraBadges.length ? `<div style="display:flex; flex-wrap:wrap; gap:0.4rem;">${extraBadges.join('')}</div>` : ''}
          </div>

          ${state.showRaw
            ? `<div style="max-width:860px; margin:0 auto;"><pre class="cs-code"><code>${escapeHtml(rawMd)}</code></pre></div>`
            : `${tocHtml}<article class="cs-reader-body" style="max-width:860px; margin:0 auto;">${rendered.html}</article>`
          }
        </section>
      `;

      document.getElementById('skillBackBtn').addEventListener('click', () => {
        state.activeSkillId = null;
        state.showRaw = false;
        renderAgenticSkills(lang);
      });

      document.getElementById('skillToggleRawBtn').addEventListener('click', () => {
        state.showRaw = !state.showRaw;
        renderSkillReader(container, lang, skill);
      });

      const copyBtn = document.getElementById('skillCopyBtn');
      copyBtn.addEventListener('click', () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(rawMd).then(() => {
            copyBtn.textContent = isVi ? 'Đã sao chép!' : 'Copied!';
            setTimeout(() => {
              copyBtn.textContent = isVi ? 'Sao chép SKILL.md' : 'Copy SKILL.md';
            }, 1800);
          });
        }
      });

      container.querySelectorAll('.cs-toc-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const target = document.getElementById(link.getAttribute('data-sec'));
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      });
    });
  }

  function renderAgenticSkills(lang) {
    const container = document.getElementById('agenticSkillsContainer');
    if (!container) return;
    const isVi = lang === 'vi';
    const skills = window.__AGENTIC_SKILLS_INDEX__ || [];

    if (state.activeSkillId) {
      const skill = skills.find(s => s.id === state.activeSkillId);
      if (skill) {
        renderSkillReader(container, lang, skill);
        return;
      }
      state.activeSkillId = null;
    }

    // Build category counts
    const catCounts = {};
    skills.forEach(s => {
      const c = s.category || 'uncategorized';
      catCounts[c] = (catCounts[c] || 0) + 1;
    });
    const sortedCats = Object.keys(catCounts).sort((a, b) => catCounts[b] - catCounts[a]);

    // Filter
    const q = state.search.trim().toLowerCase();
    const filtered = skills.filter(s => {
      if (state.category !== 'ALL' && s.category !== state.category) return false;
      if (state.risk !== 'ALL' && String(s.risk || 'unknown').toLowerCase() !== state.risk) return false;
      if (!q) return true;
      return (
        s.id.toLowerCase().includes(q) ||
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.category.toLowerCase().includes(q)
      );
    });

    // Sort
    filtered.sort((a, b) => {
      if (state.sort === 'category') {
        return a.category.localeCompare(b.category) || a.name.localeCompare(b.name);
      }
      if (state.sort === 'date_desc') {
        return (b.date_added || '').localeCompare(a.date_added || '') || a.name.localeCompare(b.name);
      }
      return a.name.localeCompare(b.name);
    });

    const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
    if (state.page > totalPages) state.page = totalPages;
    if (state.page < 1) state.page = 1;

    const startIdx = (state.page - 1) * PAGE_SIZE;
    const pageItems = filtered.slice(startIdx, startIdx + PAGE_SIZE);

    const categoryOptionsHtml = [
      `<option value="ALL">${isVi ? `Tất cả danh mục (${skills.length})` : `All Categories (${skills.length})`}</option>`,
      ...sortedCats.map(c => `<option value="${escapeHtml(c)}" ${state.category === c ? 'selected' : ''}>${escapeHtml(c)} (${catCounts[c]})</option>`)
    ].join('');

    const risks = ['ALL', 'safe', 'low', 'medium', 'high', 'critical', 'none'];
    const riskPillsHtml = risks.map(r => {
      const label = r === 'ALL' ? (isVi ? 'Mọi mức rủi ro' : 'All Risks') : r;
      return `<button type="button" class="cat-btn skill-risk-btn ${state.risk === r ? 'active-filter' : ''}" data-risk="${r}">${label}</button>`;
    }).join('');

    const cardsHtml = pageItems.length > 0
      ? pageItems.map(s => `
          <div class="cs-chapter-card skill-card-item" style="cursor:pointer; display:flex; flex-direction:column; justify-content:space-between;" data-skill-id="${escapeHtml(s.id)}">
            <div>
              <div class="cs-chapter-head">
                <span class="badge">${escapeHtml(s.category)}</span>
                <span class="badge" style="${getRiskStyle(s.risk)}">${escapeHtml(s.risk)}</span>
              </div>
              <h4 class="cs-chapter-title">${escapeHtml(s.name)}</h4>
              <p class="cs-chapter-desc" style="display:-webkit-box; -webkit-line-clamp:3; -webkit-box-orient:vertical; overflow:hidden;">${escapeHtml(s.description)}</p>
            </div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.75rem; padding-top:0.6rem; border-top:1px solid var(--border-hairline); font-size:0.78rem; color:var(--ink-muted);">
              <span>${escapeHtml(s.source)}${s.date_added ? ` · ${escapeHtml(s.date_added)}` : ''}</span>
              <span class="cs-ext-link">${isVi ? 'Đọc Skill →' : 'Read Skill →'}</span>
            </div>
          </div>
        `).join('')
      : `<p style="color:var(--ink-muted); padding:1rem 0;">${isVi ? 'Không tìm thấy kỹ năng phù hợp.' : 'No matching skills found.'}</p>`;

    const paginationHtml = totalPages > 1
      ? `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; margin-top:1.25rem; padding-top:1rem; border-top:1px solid var(--border-hairline);">
          <div style="font-size:0.86rem; color:var(--ink-muted);">
            ${isVi
              ? `Hiển thị ${startIdx + 1}–${Math.min(startIdx + PAGE_SIZE, filtered.length)} trên ${filtered.length} kỹ năng (Trang ${state.page}/${totalPages})`
              : `Showing ${startIdx + 1}–${Math.min(startIdx + PAGE_SIZE, filtered.length)} of ${filtered.length} skills (Page ${state.page}/${totalPages})`}
          </div>
          <div style="display:flex; gap:0.5rem;">
            <button type="button" id="skillPrevPage" class="btn-secondary" ${state.page <= 1 ? 'disabled' : ''}>&larr; ${isVi ? 'Trước' : 'Prev'}</button>
            <button type="button" id="skillNextPage" class="btn-secondary" ${state.page >= totalPages ? 'disabled' : ''}>${isVi ? 'Sau' : 'Next'} &rarr;</button>
          </div>
        </div>
      `
      : '';

    container.innerHTML = `
      <section class="sacred-card">
        <div style="display:flex; flex-wrap:wrap; justify-content:space-between; align-items:flex-start; gap:1rem; margin-bottom:1.1rem;">
          <div>
            <span class="badge badge-highlight">${skills.length.toLocaleString()} Skills · ${sortedCats.length} ${isVi ? 'Danh Mục' : 'Categories'}</span>
            <h2 style="font-family:var(--font-serif); font-size:1.65rem; color:var(--ink-black); margin:0.4rem 0 0.25rem;">
              ${isVi ? 'Kho Kỹ Năng Agentic Awesome Skills' : 'Agentic Awesome Skills Repository'}
            </h2>
            <p style="margin:0; color:var(--ink-secondary); font-size:0.92rem;">
              ${isVi
                ? 'Bộ sưu tập kỹ năng cho AI Coding Agents (Claude Code, Antigravity, Cursor, Gemini CLI, Codex) từ sickn33/agentic-awesome-skills.'
                : 'Curated collection of Agentic Skills for Claude Code, Antigravity, Cursor, Gemini CLI, and Codex from sickn33/agentic-awesome-skills.'}
            </p>
          </div>
          <a href="${REPO_URL}" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="text-decoration:none; white-space:nowrap;">GitHub Repo ↗</a>
        </div>

        <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:0.65rem; margin-bottom:0.85rem;">
          <input type="text" id="skillSearchInput" class="input-field" value="${escapeHtml(state.search)}" placeholder="${isVi ? 'Tìm theo tên, mô tả, danh mục...' : 'Search by name, description, category...'}" />
          <select id="skillCategorySelect" class="input-field">${categoryOptionsHtml}</select>
          <select id="skillSortSelect" class="input-field">
            <option value="name" ${state.sort === 'name' ? 'selected' : ''}>${isVi ? 'Sắp xếp: Tên (A–Z)' : 'Sort: Name (A–Z)'}</option>
            <option value="category" ${state.sort === 'category' ? 'selected' : ''}>${isVi ? 'Sắp xếp: Danh mục' : 'Sort: Category'}</option>
            <option value="date_desc" ${state.sort === 'date_desc' ? 'selected' : ''}>${isVi ? 'Sắp xếp: Mới nhất' : 'Sort: Newest'}</option>
          </select>
        </div>

        <div style="display:flex; flex-wrap:wrap; gap:0.4rem; margin-bottom:1.1rem;">
          ${riskPillsHtml}
        </div>

        <div class="cs-chapter-grid">
          ${cardsHtml}
        </div>

        ${paginationHtml}
      </section>
    `;

    const searchInput = document.getElementById('skillSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.search = e.target.value;
        state.page = 1;
        renderAgenticSkills(lang);
        const newInput = document.getElementById('skillSearchInput');
        if (newInput) {
          newInput.focus();
          newInput.setSelectionRange(newInput.value.length, newInput.value.length);
        }
      });
    }

    const catSelect = document.getElementById('skillCategorySelect');
    if (catSelect) {
      catSelect.addEventListener('change', (e) => {
        state.category = e.target.value;
        state.page = 1;
        renderAgenticSkills(lang);
      });
    }

    const sortSelect = document.getElementById('skillSortSelect');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sort = e.target.value;
        state.page = 1;
        renderAgenticSkills(lang);
      });
    }

    container.querySelectorAll('.skill-risk-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.risk = btn.getAttribute('data-risk');
        state.page = 1;
        renderAgenticSkills(lang);
      });
    });

    container.querySelectorAll('.skill-card-item').forEach(card => {
      card.addEventListener('click', () => {
        state.activeSkillId = card.getAttribute('data-skill-id');
        state.showRaw = false;
        renderAgenticSkills(lang);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    const prevBtn = document.getElementById('skillPrevPage');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (state.page > 1) {
          state.page--;
          renderAgenticSkills(lang);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }

    const nextBtn = document.getElementById('skillNextPage');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (state.page < totalPages) {
          state.page++;
          renderAgenticSkills(lang);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
    }
  }

  window.renderAgenticSkills = renderAgenticSkills;
})();
