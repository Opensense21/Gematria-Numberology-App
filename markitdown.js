// MarkItDown Tab UI (microsoft/markitdown) — Drag & Drop File-to-Markdown Converter
(function () {
  const UI = {
    en: {
      title: 'MarkItDown — Convert Files to Markdown',
      subtitle: 'Convert Word (.docx), PowerPoint (.pptx), Excel (.xlsx), PDF, HTML, CSV/TSV, Jupyter (.ipynb), EPUB, JSON, XML/RSS, ZIP & images into clean, LLM-ready Markdown directly in your browser.',
      ghBtn: 'microsoft/markitdown ↗',
      dropTitle: 'Drop files here or click to browse',
      dropSub: 'Supports .docx, .pptx, .xlsx, .pdf, .html, .csv, .tsv, .ipynb, .epub, .json, .xml, .zip, images & code',
      chooseBtn: 'Choose Files',
      pasteToggle: 'Or Paste Raw HTML / CSV / JSON / XML',
      pastePlaceholder: 'Paste HTML, CSV, JSON, XML, or Jupyter .ipynb content here...',
      formatAuto: 'Auto-Detect',
      convertTextBtn: 'Convert to Markdown',
      samplesLabel: 'Try a sample:',
      sampleHtml: 'Sample HTML',
      sampleCsv: 'Sample CSV',
      sampleIpynb: 'Sample .ipynb',
      sampleJson: 'Sample JSON',
      viewRaw: 'Raw Markdown',
      viewPreview: 'Rendered Preview',
      copyBtn: 'Copy Markdown',
      copiedBtn: 'Copied ✓',
      downloadBtn: 'Download .md',
      clearBtn: 'Clear',
      converting: 'Converting...',
      emptyState: 'Upload a file or click a sample above to see the converted Markdown output.',
      statsChars: 'chars',
      statsWords: 'words',
      statsLines: 'lines',
      statsTokens: 'est. tokens',
      cliTitle: 'Python CLI Equivalent (microsoft/markitdown)',
      cliSnippet: "pip install 'markitdown[all]'\nmarkitdown path-to-file.pdf -o document.md"
    },
    vi: {
      title: 'MarkItDown — Chuyển Đổi File Sang Markdown',
      subtitle: 'Chuyển đổi Word (.docx), PowerPoint (.pptx), Excel (.xlsx), PDF, HTML, CSV/TSV, Jupyter (.ipynb), EPUB, JSON, XML/RSS, ZIP & ảnh thành Markdown sạch chuẩn LLM ngay trên trình duyệt.',
      ghBtn: 'microsoft/markitdown ↗',
      dropTitle: 'Kéo thả file vào đây hoặc nhấn để chọn file',
      dropSub: 'Hỗ trợ .docx, .pptx, .xlsx, .pdf, .html, .csv, .tsv, .ipynb, .epub, .json, .xml, .zip, ảnh & mã nguồn',
      chooseBtn: 'Chọn File',
      pasteToggle: 'Hoặc Dán Mã HTML / CSV / JSON / XML',
      pastePlaceholder: 'Dán nội dung HTML, CSV, JSON, XML hoặc Jupyter .ipynb vào đây...',
      formatAuto: 'Tự Nhận Diện',
      convertTextBtn: 'Chuyển Sang Markdown',
      samplesLabel: 'Thử mẫu có sẵn:',
      sampleHtml: 'Mẫu HTML',
      sampleCsv: 'Mẫu CSV',
      sampleIpynb: 'Mẫu .ipynb',
      sampleJson: 'Mẫu JSON',
      viewRaw: 'Mã Markdown',
      viewPreview: 'Xem Trước',
      copyBtn: 'Sao Chép .md',
      copiedBtn: 'Đã Chép ✓',
      downloadBtn: 'Tải File .md',
      clearBtn: 'Xóa',
      converting: 'Đang chuyển đổi...',
      emptyState: 'Tải file lên hoặc nhấn một mẫu phía trên để xem kết quả Markdown.',
      statsChars: 'ký tự',
      statsWords: 'từ',
      statsLines: 'dòng',
      statsTokens: 'token ước tính',
      cliTitle: 'Lệnh Python CLI Tương Đương (microsoft/markitdown)',
      cliSnippet: "pip install 'markitdown[all]'\nmarkitdown path-to-file.pdf -o document.md"
    }
  };

  const SAMPLES = {
    html: {
      name: 'article.html',
      fmt: 'html',
      content: `<html><head><title>LLM Document Pipelines</title></head><body>
<h1>Why Markdown Matters for AI</h1>
<p>Markdown preserves <strong>document structure</strong> such as headings, lists, and tables while remaining <em>token-efficient</em>.</p>
<ul><li>Clean headings &amp; hierarchy</li><li>Native table representation</li><li>Minimal formatting overhead</li></ul>
<table><tr><th>Format</th><th>Parser</th><th>LLM Ready</th></tr><tr><td>DOCX</td><td>XML</td><td>Yes</td></tr><tr><td>XLSX</td><td>SharedStrings</td><td>Yes</td></tr></table>
</body></html>`
    },
    csv: {
      name: 'quarterly_metrics.csv',
      fmt: 'csv',
      content: `Quarter,Active Users,Revenue,Retention\nQ1 2026,"14,200",$48500,92%\nQ2 2026,"21,850",$74200,94%\nQ3 2026,"33,400",$118900,96%`
    },
    ipynb: {
      name: 'analysis.ipynb',
      fmt: 'ipynb',
      content: JSON.stringify({
        nbformat: 4,
        metadata: { kernelspec: { language: 'python' } },
        cells: [
          { cell_type: 'markdown', source: ['# Quick Data Analysis\n', 'Load dataset and compute summary statistics.'] },
          { cell_type: 'code', source: ['import pandas as pd\ndf = pd.read_csv("metrics.csv")\nprint(df.describe())'] }
        ]
      }, null, 2)
    },
    json: {
      name: 'models.json',
      fmt: 'json',
      content: JSON.stringify([
        { Model: 'GPT-4o', Context: '128K', Multimodal: true },
        { Model: 'Claude 3.7', Context: '200K', Multimodal: true },
        { Model: 'Gemini 2.5', Context: '1M', Multimodal: true }
      ], null, 2)
    }
  };

  let state = {
    lang: 'en',
    results: [], // [{ id, name, ext, markdown, stats }]
    activeIdx: -1,
    viewMode: 'raw', // 'raw' | 'preview'
    showPaste: false,
    pasteText: '',
    pasteFormat: 'auto',
    statusMsg: ''
  };

  function escapeHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function renderInlineMd(txt) {
    let s = escapeHtml(txt);
    s = s.replace(/`([^`]+)`/g, '<code>$1</code>');
    s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1 ↗</a>');
    return s;
  }

  function simpleMdToHtml(md) {
    const lines = String(md || '').replace(/\r\n/g, '\n').split('\n');
    let html = '';
    let inCode = false;
    let codeBuf = [];
    let inList = false;
    let inTable = false;
    let tableRows = [];

    const flushList = () => { if (inList) { html += '</ul>'; inList = false; } };
    const flushTable = () => {
      if (!inTable || !tableRows.length) { inTable = false; tableRows = []; return; }
      html += '<div style="overflow-x:auto; margin:0.85rem 0;"><table class="cipher-table"><thead><tr>';
      const headers = tableRows[0].split('|').map(c => c.trim()).filter((_, idx, arr) => !(idx === 0 && _ === '') && !(idx === arr.length - 1 && _ === ''));
      headers.forEach(h => { html += `<th>${renderInlineMd(h)}</th>`; });
      html += '</tr></thead><tbody>';
      for (let i = 1; i < tableRows.length; i++) {
        if (/^\|?[\s:-]+\|/.test(tableRows[i])) continue;
        const cols = tableRows[i].split('|').map(c => c.trim()).filter((_, idx, arr) => !(idx === 0 && _ === '') && !(idx === arr.length - 1 && _ === ''));
        if (cols.length) html += '<tr>' + cols.map(c => `<td>${renderInlineMd(c)}</td>`).join('') + '</tr>';
      }
      html += '</tbody></table></div>';
      inTable = false;
      tableRows = [];
    };

    for (const line of lines) {
      if (line.trim().startsWith('```')) {
        flushList();
        flushTable();
        if (!inCode) { inCode = true; codeBuf = []; }
        else {
          inCode = false;
          html += `<div class="cs-code-block"><pre><code>${escapeHtml(codeBuf.join('\n'))}</code></pre></div>`;
        }
        continue;
      }
      if (inCode) { codeBuf.push(line); continue; }

      const t = line.trim();
      if (!t) { flushList(); flushTable(); continue; }
      if (/^<!--.*-->$/.test(t)) {
        flushList(); flushTable();
        html += `<div style="font-size:0.75rem; color:var(--ink-muted); margin:0.5rem 0;">${escapeHtml(t.replace(/<!--|-->/g, '').trim())}</div>`;
        continue;
      }
      if (t.startsWith('|') && t.endsWith('|')) {
        flushList(); inTable = true; tableRows.push(t); continue;
      } else {
        flushTable();
      }
      if (/^#{1,6}\s+/.test(t)) {
        flushList();
        const lvl = t.match(/^(#{1,6})\s+/)[1].length;
        const tag = lvl <= 2 ? 'h2' : lvl === 3 ? 'h3' : 'h4';
        html += `<${tag}>${renderInlineMd(t.replace(/^#{1,6}\s+/, ''))}</${tag}>`;
        continue;
      }
      if (/^---+$/.test(t)) {
        flushList();
        html += '<hr style="border:none; border-top:1px solid var(--border-hairline); margin:1rem 0;" />';
        continue;
      }
      if (t.startsWith('>')) {
        flushList();
        html += `<blockquote class="cs-blockquote">${renderInlineMd(t.replace(/^>\s?/, ''))}</blockquote>`;
        continue;
      }
      if (/^[-*+]\s+/.test(t) || /^\d+\.\s+/.test(t)) {
        if (!inList) { html += '<ul>'; inList = true; }
        html += `<li>${renderInlineMd(t.replace(/^([-*+]|\d+\.)\s+/, ''))}</li>`;
        continue;
      }
      flushList();
      html += `<p>${renderInlineMd(t)}</p>`;
    }
    flushList();
    flushTable();
    return html;
  }

  async function handleFiles(fileList) {
    const E = window.MarkItDownEngine;
    if (!E || !fileList || !fileList.length) return;
    const L = UI[state.lang] || UI.en;
    state.statusMsg = L.converting;
    render();

    for (const file of Array.from(fileList)) {
      try {
        const res = await E.convertFile(file);
        state.results.unshift(res);
        state.activeIdx = 0;
      } catch (err) {
        state.results.unshift({
          name: file.name,
          ext: 'ERR',
          markdown: `> Error converting **${file.name}**: ${err.message}`,
          stats: { chars: 0, words: 0, lines: 1, estTokens: 0 }
        });
        state.activeIdx = 0;
      }
    }
    state.statusMsg = '';
    render();
  }

  function runSample(key) {
    const s = SAMPLES[key];
    if (!s || !window.MarkItDownEngine) return;
    const res = window.MarkItDownEngine.convertText(s.content, s.fmt, s.name.replace(/\.[^.]+$/, ''));
    res.name = s.name;
    state.results.unshift(res);
    state.activeIdx = 0;
    render();
  }

  function downloadMd(res) {
    if (!res) return;
    const base = res.name.replace(/\.[^.]+$/, '') || 'converted';
    const blob = new Blob([res.markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${base}.md`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function render() {
    const container = document.getElementById('markitdownContainer');
    if (!container) return;
    const L = UI[state.lang] || UI.en;
    const active = state.activeIdx >= 0 ? state.results[state.activeIdx] : null;

    const historyPills = state.results.map((r, i) => `
      <button type="button" class="btn-secondary mkd-file-pill ${i === state.activeIdx ? 'active-filter' : ''}" data-idx="${i}" style="padding:0.28rem 0.7rem; font-size:0.78rem;">
        ${escapeHtml(r.name)} <span style="opacity:0.65;">(${escapeHtml(r.ext)})</span>
      </button>
    `).join('');

    let outputHtml = `<div style="padding:2.2rem 1rem; text-align:center; color:var(--ink-muted);">${state.statusMsg || L.emptyState}</div>`;
    if (active) {
      const contentBody = state.viewMode === 'raw'
        ? `<pre class="mkd-raw-output">${escapeHtml(active.markdown)}</pre>`
        : `<article class="cs-article mkd-preview-box">${simpleMdToHtml(active.markdown)}</article>`;

      outputHtml = `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.65rem; margin-bottom:0.85rem; padding-bottom:0.75rem; border-bottom:1px solid var(--border-hairline);">
          <div style="display:flex; gap:0.4rem; flex-wrap:wrap; align-items:center;">
            <button type="button" id="mkdViewRaw" class="btn-secondary ${state.viewMode === 'raw' ? 'active-filter' : ''}" style="padding:0.32rem 0.75rem; font-size:0.8rem;">${L.viewRaw}</button>
            <button type="button" id="mkdViewPreview" class="btn-secondary ${state.viewMode === 'preview' ? 'active-filter' : ''}" style="padding:0.32rem 0.75rem; font-size:0.8rem;">${L.viewPreview}</button>
            <span class="badge">${active.stats.chars.toLocaleString()} ${L.statsChars}</span>
            <span class="badge">${active.stats.words.toLocaleString()} ${L.statsWords}</span>
            <span class="badge">~${active.stats.estTokens.toLocaleString()} ${L.statsTokens}</span>
          </div>
          <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
            <button type="button" id="mkdCopyBtn" class="btn-secondary" style="padding:0.35rem 0.85rem; font-size:0.82rem;">${L.copyBtn}</button>
            <button type="button" id="mkdDownloadBtn" class="btn-primary" style="padding:0.35rem 0.9rem; font-size:0.82rem;">↓ ${L.downloadBtn}</button>
          </div>
        </div>
        ${contentBody}
      `;
    }

    container.innerHTML = `
      <div class="sacred-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1rem;">
          <div>
            <h2 style="font-family:var(--font-serif); font-size:1.55rem; color:var(--ink-black); margin-bottom:0.35rem;">${L.title}</h2>
            <p style="color:var(--ink-secondary); max-width:780px;">${L.subtitle}</p>
          </div>
          <a href="https://github.com/microsoft/markitdown" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="text-decoration:none;">${L.ghBtn}</a>
        </div>

        <!-- Drag & Drop Zone -->
        <div id="mkdDropzone" class="mkd-dropzone">
          <input id="mkdFileInput" type="file" multiple accept=".docx,.pptx,.xlsx,.pdf,.html,.htm,.csv,.tsv,.ipynb,.epub,.json,.xml,.rss,.atom,.zip,.txt,.md,.py,.js,.ts,.css,.sh,.yaml,.yml,.png,.jpg,.jpeg,.gif,.webp,.svg" style="display:none;" />
          <div style="font-size:1.05rem; font-weight:700; color:var(--ink-black); margin-bottom:0.25rem;">${L.dropTitle}</div>
          <div style="font-size:0.84rem; color:var(--ink-muted); margin-bottom:0.85rem;">${L.dropSub}</div>
          <button type="button" id="mkdChooseBtn" class="btn-primary">${L.chooseBtn}</button>
        </div>

        <!-- Samples & Paste Toggle -->
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.65rem; margin-top:0.85rem;">
          <div style="display:flex; gap:0.4rem; flex-wrap:wrap; align-items:center;">
            <span style="font-size:0.82rem; color:var(--ink-muted); font-weight:600;">${L.samplesLabel}</span>
            <button type="button" class="btn-secondary mkd-sample-btn" data-sample="html" style="padding:0.28rem 0.68rem; font-size:0.78rem;">${L.sampleHtml}</button>
            <button type="button" class="btn-secondary mkd-sample-btn" data-sample="csv" style="padding:0.28rem 0.68rem; font-size:0.78rem;">${L.sampleCsv}</button>
            <button type="button" class="btn-secondary mkd-sample-btn" data-sample="ipynb" style="padding:0.28rem 0.68rem; font-size:0.78rem;">${L.sampleIpynb}</button>
            <button type="button" class="btn-secondary mkd-sample-btn" data-sample="json" style="padding:0.28rem 0.68rem; font-size:0.78rem;">${L.sampleJson}</button>
          </div>
          <button type="button" id="mkdTogglePasteBtn" class="btn-ghost" style="font-size:0.82rem;">${L.pasteToggle}</button>
        </div>

        ${state.showPaste ? `
          <div class="meaning-block" style="margin-top:0.85rem;">
            <textarea id="mkdPasteArea" class="mkd-paste-area" placeholder="${escapeHtml(L.pastePlaceholder)}">${escapeHtml(state.pasteText)}</textarea>
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-top:0.5rem;">
              <select id="mkdPasteFmt" class="cipher-input" style="max-width:180px; padding:0.38rem 0.65rem; font-size:0.82rem;">
                <option value="auto" ${state.pasteFormat === 'auto' ? 'selected' : ''}>${L.formatAuto}</option>
                <option value="html" ${state.pasteFormat === 'html' ? 'selected' : ''}>HTML</option>
                <option value="csv" ${state.pasteFormat === 'csv' ? 'selected' : ''}>CSV</option>
                <option value="tsv" ${state.pasteFormat === 'tsv' ? 'selected' : ''}>TSV</option>
                <option value="json" ${state.pasteFormat === 'json' ? 'selected' : ''}>JSON</option>
                <option value="ipynb" ${state.pasteFormat === 'ipynb' ? 'selected' : ''}>Jupyter (.ipynb)</option>
                <option value="xml" ${state.pasteFormat === 'xml' ? 'selected' : ''}>XML / RSS</option>
              </select>
              <button type="button" id="mkdConvertPasteBtn" class="btn-primary">${L.convertTextBtn}</button>
            </div>
          </div>
        ` : ''}
      </div>

      <!-- Output Card -->
      <div class="sacred-card">
        ${state.results.length ? `
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.85rem;">
            <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">${historyPills}</div>
            <button type="button" id="mkdClearBtn" class="btn-ghost" style="font-size:0.78rem;">${L.clearBtn}</button>
          </div>
        ` : ''}
        ${outputHtml}
      </div>

      <!-- CLI Reference -->
      <div class="sacred-card" style="padding:1rem 1.25rem;">
        <div style="font-size:0.82rem; font-weight:700; color:var(--ink-secondary); margin-bottom:0.45rem;">${L.cliTitle}</div>
        <div class="cs-code-block" style="margin:0;"><pre style="margin:0;"><code>${escapeHtml(L.cliSnippet)}</code></pre></div>
      </div>
    `;

    // Wire events
    const dropzone = document.getElementById('mkdDropzone');
    const fileInput = document.getElementById('mkdFileInput');
    document.getElementById('mkdChooseBtn').addEventListener('click', (e) => {
      e.stopPropagation();
      fileInput.click();
    });
    dropzone.addEventListener('click', () => fileInput.click());
    dropzone.addEventListener('dragover', (e) => { e.preventDefault(); dropzone.classList.add('dragover'); });
    dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
    dropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
      if (e.dataTransfer && e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
    });
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length) handleFiles(e.target.files);
    });

    container.querySelectorAll('.mkd-sample-btn').forEach(btn => {
      btn.addEventListener('click', () => runSample(btn.getAttribute('data-sample')));
    });

    document.getElementById('mkdTogglePasteBtn').addEventListener('click', () => {
      state.showPaste = !state.showPaste;
      render();
    });

    if (state.showPaste) {
      const pArea = document.getElementById('mkdPasteArea');
      const pFmt = document.getElementById('mkdPasteFmt');
      pArea.addEventListener('input', (e) => { state.pasteText = e.target.value; });
      pFmt.addEventListener('change', (e) => { state.pasteFormat = e.target.value; });
      document.getElementById('mkdConvertPasteBtn').addEventListener('click', () => {
        if (!state.pasteText.trim()) return;
        const res = window.MarkItDownEngine.convertText(state.pasteText, state.pasteFormat, 'pasted');
        state.results.unshift(res);
        state.activeIdx = 0;
        render();
      });
    }

    container.querySelectorAll('.mkd-file-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeIdx = parseInt(btn.getAttribute('data-idx'), 10);
        render();
      });
    });

    const clearBtn = document.getElementById('mkdClearBtn');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        state.results = [];
        state.activeIdx = -1;
        render();
      });
    }

    if (active) {
      document.getElementById('mkdViewRaw').addEventListener('click', () => { state.viewMode = 'raw'; render(); });
      document.getElementById('mkdViewPreview').addEventListener('click', () => { state.viewMode = 'preview'; render(); });
      const copyBtn = document.getElementById('mkdCopyBtn');
      copyBtn.addEventListener('click', () => {
        if (!navigator.clipboard) return;
        navigator.clipboard.writeText(active.markdown).then(() => {
          copyBtn.textContent = L.copiedBtn;
          setTimeout(() => { copyBtn.textContent = L.copyBtn; }, 1400);
        });
      });
      document.getElementById('mkdDownloadBtn').addEventListener('click', () => downloadMd(active));
    }
  }

  window.renderMarkItDown = function (lang) {
    state.lang = lang === 'vi' ? 'vi' : 'en';
    render();
  };
})();
