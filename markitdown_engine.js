// MarkItDown In-Browser Engine (inspired by microsoft/markitdown)
// Converts .docx, .pptx, .xlsx, .pdf, .html, .csv, .tsv, .ipynb, .epub, .xml/.rss, .json, .zip, images & text to clean Markdown
(function (global) {
  'use strict';

  const td = new TextDecoder('utf-8', { fatal: false });

  // ==================== Pure-JS ZIP Reader (STORE + DEFLATE) ====================
  async function inflateRaw(u8) {
    if (typeof DecompressionStream === 'undefined') {
      throw new Error('DecompressionStream is not supported in this browser.');
    }
    const ds = new DecompressionStream('deflate-raw');
    const writer = ds.writable.getWriter();
    writer.write(u8);
    writer.close();
    const buf = await new Response(ds.readable).arrayBuffer();
    return new Uint8Array(buf);
  }

  async function inflateZlib(u8) {
    if (typeof DecompressionStream === 'undefined') return null;
    try {
      const ds = new DecompressionStream('deflate');
      const writer = ds.writable.getWriter();
      writer.write(u8);
      writer.close();
      const buf = await new Response(ds.readable).arrayBuffer();
      return new Uint8Array(buf);
    } catch {
      try {
        // Fallback: strip 2-byte zlib header if raw deflate
        return await inflateRaw(u8.subarray(2));
      } catch {
        return null;
      }
    }
  }

  async function readZipEntries(arrayBuffer) {
    const u8 = new Uint8Array(arrayBuffer);
    const dv = new DataView(arrayBuffer);
    let eocdPos = -1;
    for (let i = u8.length - 22; i >= Math.max(0, u8.length - 65558); i--) {
      if (dv.getUint32(i, true) === 0x06054b50) { eocdPos = i; break; }
    }
    if (eocdPos < 0) throw new Error('Invalid ZIP archive.');

    const cdCount = dv.getUint16(eocdPos + 10, true);
    const cdOffset = dv.getUint32(eocdPos + 16, true);
    const entries = {};
    let pos = cdOffset;

    for (let i = 0; i < cdCount; i++) {
      if (pos + 46 > u8.length || dv.getUint32(pos, true) !== 0x02014b50) break;
      const method = dv.getUint16(pos + 10, true);
      const compSize = dv.getUint32(pos + 20, true);
      const nameLen = dv.getUint16(pos + 28, true);
      const extraLen = dv.getUint16(pos + 30, true);
      const commentLen = dv.getUint16(pos + 32, true);
      const localOffset = dv.getUint32(pos + 42, true);
      const name = td.decode(u8.subarray(pos + 46, pos + 46 + nameLen));
      pos += 46 + nameLen + extraLen + commentLen;

      if (name.endsWith('/')) continue;
      if (localOffset + 30 > u8.length) continue;
      const lNameLen = dv.getUint16(localOffset + 26, true);
      const lExtraLen = dv.getUint16(localOffset + 28, true);
      const dataStart = localOffset + 30 + lNameLen + lExtraLen;
      const rawSlice = u8.subarray(dataStart, dataStart + compSize);

      if (method === 0) {
        entries[name] = rawSlice;
      } else if (method === 8) {
        try {
          entries[name] = await inflateRaw(rawSlice);
        } catch {
          // Skip corrupted entry
        }
      }
    }
    return entries;
  }

  function decodeEntry(entries, name) {
    return entries[name] ? td.decode(entries[name]) : null;
  }

  // ==================== HTML -> Markdown (MarkItDown style) ====================
  function htmlToMd(htmlStr) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlStr || '', 'text/html');
    const root = doc.body || doc.documentElement;

    function cleanText(s) {
      return String(s || '').replace(/\s+/g, ' ');
    }

    function walk(node, ctx = {}) {
      if (!node) return '';
      if (node.nodeType === 3) {
        return ctx.inPre ? node.nodeValue : cleanText(node.nodeValue);
      }
      if (node.nodeType !== 1) return '';

      const tag = node.tagName.toLowerCase();
      if (['script', 'style', 'noscript', 'svg', 'head'].includes(tag)) return '';

      if (tag === 'br') return ctx.inPre ? '\n' : '  \n';
      if (tag === 'hr') return '\n\n---\n\n';

      if (tag === 'pre') {
        const codeEl = node.querySelector('code');
        const langMatch = codeEl && (codeEl.className || '').match(/language-([\w-]+)/);
        const lang = langMatch ? langMatch[1] : '';
        const text = (codeEl ? codeEl.textContent : node.textContent).replace(/\n$/, '');
        return `\n\n\`\`\`${lang}\n${text}\n\`\`\`\n\n`;
      }

      if (tag === 'code' && !ctx.inPre) {
        const txt = node.textContent.trim();
        return txt ? `\`${txt}\`` : '';
      }

      const childrenMd = () => Array.from(node.childNodes).map(c => walk(c, ctx)).join('');

      if (/^h[1-6]$/.test(tag)) {
        const level = parseInt(tag[1], 10);
        const txt = childrenMd().trim();
        return txt ? `\n\n${'#'.repeat(level)} ${txt}\n\n` : '';
      }

      if (tag === 'p' || tag === 'div' || tag === 'section' || tag === 'article') {
        const txt = childrenMd().trim();
        return txt ? `\n\n${txt}\n\n` : '';
      }

      if (tag === 'blockquote') {
        const txt = childrenMd().trim();
        if (!txt) return '';
        return '\n\n' + txt.split('\n').map(l => `> ${l}`).join('\n') + '\n\n';
      }

      if (tag === 'strong' || tag === 'b') {
        const txt = childrenMd().trim();
        return txt ? `**${txt}**` : '';
      }

      if (tag === 'em' || tag === 'i') {
        const txt = childrenMd().trim();
        return txt ? `*${txt}*` : '';
      }

      if (tag === 'del' || tag === 's') {
        const txt = childrenMd().trim();
        return txt ? `~~${txt}~~` : '';
      }

      if (tag === 'a') {
        const href = node.getAttribute('href') || '';
        const txt = childrenMd().trim() || href;
        if (!href || href.startsWith('javascript:')) return txt;
        return `[${txt}](${href})`;
      }

      if (tag === 'img') {
        const src = node.getAttribute('src') || '';
        const alt = (node.getAttribute('alt') || 'image').trim();
        return src ? `![${alt}](${src})` : '';
      }

      if (tag === 'ul' || tag === 'ol') {
        const ordered = tag === 'ol';
        let idx = 1;
        const items = Array.from(node.children)
          .filter(c => c.tagName && c.tagName.toLowerCase() === 'li')
          .map(li => {
            const prefix = ordered ? `${idx++}. ` : '- ';
            const content = walk(li, ctx).trim().replace(/\n+/g, '\n  ');
            return `${prefix}${content}`;
          });
        return items.length ? `\n\n${items.join('\n')}\n\n` : '';
      }

      if (tag === 'table') {
        const rows = Array.from(node.querySelectorAll('tr')).map(tr =>
          Array.from(tr.children)
            .filter(tdEl => tdEl.tagName && (tdEl.tagName.toLowerCase() === 'th' || tdEl.tagName.toLowerCase() === 'td'))
            .map(tdEl => walk(tdEl, ctx).trim().replace(/\s*\n\s*/g, ' ').replace(/\|/g, '\\|'))
        ).filter(r => r.length > 0);
        if (!rows.length) return '';
        const cols = Math.max(...rows.map(r => r.length));
        const norm = rows.map(r => Array.from({ length: cols }, (_, i) => r[i] || ''));
        const header = `| ${norm[0].join(' | ')} |`;
        const sep = `| ${Array(cols).fill('---').join(' | ')} |`;
        const body = norm.slice(1).map(r => `| ${r.join(' | ')} |`).join('\n');
        return `\n\n${header}\n${sep}${body ? '\n' + body : ''}\n\n`;
      }

      return childrenMd();
    }

    const title = doc.title ? `# ${doc.title.trim()}\n\n` : '';
    const body = walk(root).replace(/\n{3,}/g, '\n\n').trim();
    return (title + body).trim();
  }

  // ==================== CSV / TSV -> Markdown Table ====================
  function parseCsv(text, delimiter) {
    const rows = [];
    let row = [];
    let cur = '';
    let inQuotes = false;
    const s = String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n');

    for (let i = 0; i < s.length; i++) {
      const ch = s[i];
      if (inQuotes) {
        if (ch === '"' && s[i + 1] === '"') {
          cur += '"';
          i++;
        } else if (ch === '"') {
          inQuotes = false;
        } else {
          cur += ch;
        }
      } else if (ch === '"') {
        inQuotes = true;
      } else if (ch === delimiter) {
        row.push(cur.trim());
        cur = '';
      } else if (ch === '\n') {
        row.push(cur.trim());
        if (row.some(c => c !== '')) rows.push(row);
        row = [];
        cur = '';
      } else {
        cur += ch;
      }
    }
    if (cur.length || row.length) {
      row.push(cur.trim());
      if (row.some(c => c !== '')) rows.push(row);
    }
    return rows;
  }

  function rowsToMdTable(rows) {
    if (!rows || !rows.length) return '';
    const cols = Math.max(...rows.map(r => r.length));
    const norm = rows.map(r => Array.from({ length: cols }, (_, i) => String(r[i] ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ')));
    const header = `| ${norm[0].join(' | ')} |`;
    const sep = `| ${Array(cols).fill('---').join(' | ')} |`;
    const body = norm.slice(1).map(r => `| ${r.join(' | ')} |`).join('\n');
    return `${header}\n${sep}${body ? '\n' + body : ''}`;
  }

  function csvToMd(text, isTsv = false) {
    const delim = isTsv ? '\t' : ',';
    return rowsToMdTable(parseCsv(text, delim));
  }

  // ==================== DOCX -> Markdown ====================
  async function docxToMd(arrayBuffer) {
    const entries = await readZipEntries(arrayBuffer);
    const docXmlStr = decodeEntry(entries, 'word/document.xml');
    if (!docXmlStr) throw new Error('word/document.xml not found in .docx archive.');

    // Parse hyperlinks from rels
    const relsMap = {};
    const relsXmlStr = decodeEntry(entries, 'word/_rels/document.xml.rels');
    if (relsXmlStr) {
      const rDoc = new DOMParser().parseFromString(relsXmlStr, 'application/xml');
      Array.from(rDoc.querySelectorAll('Relationship')).forEach(rel => {
        relsMap[rel.getAttribute('Id')] = rel.getAttribute('Target');
      });
    }

    const xml = new DOMParser().parseFromString(docXmlStr, 'application/xml');
    const body = xml.getElementsByTagNameNS('*', 'body')[0] || xml.documentElement;
    const out = [];

    function extractParaRuns(pNode) {
      let s = '';
      Array.from(pNode.childNodes).forEach(ch => {
        const ln = ch.localName;
        if (ln === 'r') {
          const texts = Array.from(ch.getElementsByTagNameNS('*', 't')).map(t => t.textContent).join('');
          if (!texts) return;
          const rPr = ch.getElementsByTagNameNS('*', 'rPr')[0];
          const isBold = rPr && rPr.getElementsByTagNameNS('*', 'b').length > 0;
          const isItalic = rPr && rPr.getElementsByTagNameNS('*', 'i').length > 0;
          let chunk = texts;
          if (isBold && isItalic) chunk = `***${chunk}***`;
          else if (isBold) chunk = `**${chunk}**`;
          else if (isItalic) chunk = `*${chunk}*`;
          s += chunk;
        } else if (ln === 'hyperlink') {
          const rId = ch.getAttribute('r:id') || ch.getAttribute('id');
          const url = relsMap[rId] || '';
          const linkText = Array.from(ch.getElementsByTagNameNS('*', 't')).map(t => t.textContent).join('');
          s += url ? `[${linkText || url}](${url})` : linkText;
        }
      });
      return s.trim();
    }

    Array.from(body.childNodes).forEach(node => {
      const ln = node.localName;
      if (ln === 'p') {
        const text = extractParaRuns(node);
        if (!text) return;
        const pPr = node.getElementsByTagNameNS('*', 'pPr')[0];
        const pStyle = pPr ? pPr.getElementsByTagNameNS('*', 'pStyle')[0] : null;
        const styleVal = pStyle ? (pStyle.getAttribute('w:val') || pStyle.getAttribute('val') || '') : '';
        const numPr = pPr ? pPr.getElementsByTagNameNS('*', 'numPr')[0] : null;

        const hMatch = styleVal.match(/Heading(\d)|H(\d)/i);
        if (hMatch) {
          const lvl = Math.min(6, parseInt(hMatch[1] || hMatch[2], 10));
          out.push(`${'#'.repeat(lvl)} ${text.replace(/^\*\*(.*)\*\*$/, '$1')}`);
        } else if (/^Title$/i.test(styleVal)) {
          out.push(`# ${text.replace(/^\*\*(.*)\*\*$/, '$1')}`);
        } else if (/^Subtitle$/i.test(styleVal)) {
          out.push(`## ${text.replace(/^\*\*(.*)\*\*$/, '$1')}`);
        } else if (numPr) {
          out.push(`- ${text}`);
        } else {
          out.push(text);
        }
      } else if (ln === 'tbl') {
        const rows = Array.from(node.getElementsByTagNameNS('*', 'tr')).map(tr =>
          Array.from(tr.getElementsByTagNameNS('*', 'tc')).map(tc =>
            Array.from(tc.getElementsByTagNameNS('*', 't')).map(t => t.textContent).join('').trim()
          )
        ).filter(r => r.length > 0);
        if (rows.length) out.push(rowsToMdTable(rows));
      }
    });

    return out.join('\n\n');
  }

  // ==================== PPTX -> Markdown ====================
  async function pptxToMd(arrayBuffer) {
    const entries = await readZipEntries(arrayBuffer);
    const slideKeys = Object.keys(entries)
      .filter(k => /^ppt\/slides\/slide\d+\.xml$/.test(k))
      .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));

    if (!slideKeys.length) throw new Error('No slides found in .pptx archive.');

    const mdParts = [];
    slideKeys.forEach((key, idx) => {
      const xmlStr = decodeEntry(entries, key);
      const xml = new DOMParser().parseFromString(xmlStr, 'application/xml');
      const slideLines = [`<!-- Slide number: ${idx + 1} -->`];

      const spTree = xml.getElementsByTagNameNS('*', 'spTree')[0] || xml.documentElement;
      let hasTitle = false;

      Array.from(spTree.childNodes).forEach(node => {
        const ln = node.localName;
        if (ln === 'sp') {
          const ph = node.getElementsByTagNameNS('*', 'ph')[0];
          const phType = ph ? (ph.getAttribute('type') || '') : '';
          const paras = Array.from(node.getElementsByTagNameNS('*', 'p')).map(p =>
            Array.from(p.getElementsByTagNameNS('*', 't')).map(t => t.textContent).join('').trim()
          ).filter(Boolean);
          if (!paras.length) return;

          if (!hasTitle && (/title/i.test(phType) || idx === 0 && slideLines.length === 1)) {
            slideLines.push(`# ${paras[0]}`);
            hasTitle = true;
            paras.slice(1).forEach(p => slideLines.push(p));
          } else {
            paras.forEach(p => slideLines.push(p));
          }
        } else if (ln === 'graphicFrame') {
          const tbl = node.getElementsByTagNameNS('*', 'tbl')[0];
          if (tbl) {
            const rows = Array.from(tbl.getElementsByTagNameNS('*', 'tr')).map(tr =>
              Array.from(tr.getElementsByTagNameNS('*', 'tc')).map(tc =>
                Array.from(tc.getElementsByTagNameNS('*', 't')).map(t => t.textContent).join('').trim()
              )
            ).filter(r => r.length > 0);
            if (rows.length) slideLines.push('\n' + rowsToMdTable(rows));
          }
        }
      });

      // Speaker notes if present
      const slideNum = key.match(/\d+/)[0];
      const notesStr = decodeEntry(entries, `ppt/notesSlides/notesSlide${slideNum}.xml`);
      if (notesStr) {
        const nXml = new DOMParser().parseFromString(notesStr, 'application/xml');
        const notesText = Array.from(nXml.getElementsByTagNameNS('*', 't'))
          .map(t => t.textContent.trim())
          .filter(t => t && !/^\d+$/.test(t))
          .join(' ');
        if (notesText) slideLines.push(`\n### Notes:\n${notesText}`);
      }

      mdParts.push(slideLines.join('\n'));
    });

    return mdParts.join('\n\n---\n\n');
  }

  // ==================== XLSX -> Markdown ====================
  function colLettersToIdx(letters) {
    let n = 0;
    for (let i = 0; i < letters.length; i++) n = n * 26 + (letters.charCodeAt(i) - 64);
    return n - 1;
  }

  async function xlsxToMd(arrayBuffer) {
    const entries = await readZipEntries(arrayBuffer);
    const sharedStrings = [];
    const ssStr = decodeEntry(entries, 'xl/sharedStrings.xml');
    if (ssStr) {
      const ssXml = new DOMParser().parseFromString(ssStr, 'application/xml');
      Array.from(ssXml.getElementsByTagNameNS('*', 'si')).forEach(si => {
        sharedStrings.push(Array.from(si.getElementsByTagNameNS('*', 't')).map(t => t.textContent).join(''));
      });
    }

    let sheetNames = [];
    const wbStr = decodeEntry(entries, 'xl/workbook.xml');
    if (wbStr) {
      const wbXml = new DOMParser().parseFromString(wbStr, 'application/xml');
      sheetNames = Array.from(wbXml.getElementsByTagNameNS('*', 'sheet')).map(s => s.getAttribute('name'));
    }

    const sheetKeys = Object.keys(entries)
      .filter(k => /^xl\/worksheets\/sheet\d+\.xml$/.test(k))
      .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));

    if (!sheetKeys.length) throw new Error('No worksheets found in .xlsx archive.');

    const sections = [];
    sheetKeys.forEach((key, idx) => {
      const sXml = new DOMParser().parseFromString(decodeEntry(entries, key), 'application/xml');
      const grid = {};
      let maxR = -1, maxC = -1;

      Array.from(sXml.getElementsByTagNameNS('*', 'c')).forEach(c => {
        const ref = c.getAttribute('r');
        const m = ref && ref.match(/^([A-Z]+)(\d+)$/i);
        if (!m) return;
        const col = colLettersToIdx(m[1].toUpperCase());
        const row = parseInt(m[2], 10) - 1;
        if (row > maxR) maxR = row;
        if (col > maxC) maxC = col;

        const t = c.getAttribute('t');
        const vEl = c.getElementsByTagNameNS('*', 'v')[0];
        const isEl = c.getElementsByTagNameNS('*', 'is')[0];
        let val = '';
        if (t === 's' && vEl) val = sharedStrings[parseInt(vEl.textContent, 10)] ?? '';
        else if (t === 'inlineStr' && isEl) val = Array.from(isEl.getElementsByTagNameNS('*', 't')).map(x => x.textContent).join('');
        else if (vEl) val = vEl.textContent;
        grid[`${row}:${col}`] = val;
      });

      const title = `## ${sheetNames[idx] || `Sheet${idx + 1}`}`;
      if (maxR < 0 || maxC < 0) {
        sections.push(`${title}\n\n*(Empty worksheet)*`);
        return;
      }

      const rows = [];
      for (let r = 0; r <= Math.min(maxR, 500); r++) {
        const rowArr = [];
        let hasData = false;
        for (let c = 0; c <= Math.min(maxC, 50); c++) {
          const v = grid[`${r}:${c}`] ?? '';
          if (v !== '') hasData = true;
          rowArr.push(v);
        }
        if (hasData) rows.push(rowArr);
      }
      sections.push(`${title}\n\n${rowsToMdTable(rows)}`);
    });

    return sections.join('\n\n');
  }

  // ==================== EPUB -> Markdown ====================
  async function epubToMd(arrayBuffer) {
    const entries = await readZipEntries(arrayBuffer);
    const htmlKeys = Object.keys(entries)
      .filter(k => /\.(xhtml|html|htm)$/i.test(k) && !/nav\./i.test(k))
      .sort();
    if (!htmlKeys.length) throw new Error('No XHTML/HTML chapters found in .epub archive.');
    const parts = htmlKeys.map(k => htmlToMd(decodeEntry(entries, k))).filter(Boolean);
    return parts.join('\n\n---\n\n');
  }

  // ==================== PDF -> Markdown (Pure-JS Stream Extractor) ====================
  function decodePdfLiteral(s) {
    return s
      .replace(/\\n/g, '\n')
      .replace(/\\r/g, '\r')
      .replace(/\\t/g, '\t')
      .replace(/\\\(/g, '(')
      .replace(/\\\)/g, ')')
      .replace(/\\\\/g, '\\');
  }

  function extractTextFromPdfStream(streamText) {
    const chunks = [];
    // Match TJ arrays and Tj strings inside BT ... ET blocks or anywhere in content stream
    const tjArrayRe = /\[([^\]]*)\]\s*TJ/g;
    let m;
    while ((m = tjArrayRe.exec(streamText)) !== null) {
      const inner = m[1];
      const strRe = /\(([^()\\]*(?:\\.[^()\\]*)*)\)/g;
      let sm;
      let line = '';
      while ((sm = strRe.exec(inner)) !== null) line += decodePdfLiteral(sm[1]);
      if (line.trim()) chunks.push(line.trim());
    }
    const tjSingleRe = /\(([^()\\]*(?:\\.[^()\\]*)*)\)\s*Tj/g;
    while ((m = tjSingleRe.exec(streamText)) !== null) {
      const txt = decodePdfLiteral(m[1]).trim();
      if (txt) chunks.push(txt);
    }
    return chunks.join(' ').replace(/\s+/g, ' ').trim();
  }

  async function pdfToMd(arrayBuffer) {
    const u8 = new Uint8Array(arrayBuffer);
    const latin = new TextDecoder('latin1').decode(u8);
    const pagesText = [];

    // Locate stream ... endstream blocks
    let idx = 0;
    while (true) {
      const sPos = latin.indexOf('stream', idx);
      if (sPos < 0) break;
      let dataStart = sPos + 6;
      if (latin[dataStart] === '\r' && latin[dataStart + 1] === '\n') dataStart += 2;
      else if (latin[dataStart] === '\n' || latin[dataStart] === '\r') dataStart += 1;

      const ePos = latin.indexOf('endstream', dataStart);
      if (ePos < 0) break;
      const headerSlice = latin.slice(Math.max(0, sPos - 250), sPos);
      const rawBytes = u8.subarray(dataStart, ePos);
      idx = ePos + 9;

      let decodedStr = '';
      if (/\/FlateDecode/i.test(headerSlice)) {
        const inflated = await inflateZlib(rawBytes);
        if (inflated) decodedStr = new TextDecoder('latin1').decode(inflated);
      } else {
        decodedStr = latin.slice(dataStart, ePos);
      }

      if (decodedStr && (decodedStr.includes('Tj') || decodedStr.includes('TJ'))) {
        const extracted = extractTextFromPdfStream(decodedStr);
        if (extracted) pagesText.push(extracted);
      }
    }

    if (!pagesText.length) {
      return '> *(No selectable text streams found in this PDF — it may be a scanned/image-only PDF or use custom font encodings.)*';
    }
    return pagesText.join('\n\n');
  }

  // ==================== Jupyter Notebook (.ipynb) -> Markdown ====================
  function ipynbToMd(text) {
    const nb = JSON.parse(text);
    const cells = nb.cells || [];
    const lang = (nb.metadata && nb.metadata.kernelspec && nb.metadata.kernelspec.language) || 'python';
    return cells.map(cell => {
      const src = Array.isArray(cell.source) ? cell.source.join('') : (cell.source || '');
      if (cell.cell_type === 'markdown') return src.trim();
      if (cell.cell_type === 'code') return `\`\`\`${lang}\n${src.replace(/\n$/, '')}\n\`\`\``;
      return src.trim();
    }).filter(Boolean).join('\n\n');
  }

  // ==================== XML / RSS / Atom -> Markdown ====================
  function xmlRssToMd(text) {
    const xml = new DOMParser().parseFromString(text, 'application/xml');
    const items = Array.from(xml.querySelectorAll('item, entry'));
    if (items.length) {
      const feedTitle = xml.querySelector('channel > title, feed > title');
      const out = [];
      if (feedTitle) out.push(`# ${feedTitle.textContent.trim()}`);
      items.forEach(it => {
        const t = it.querySelector('title')?.textContent?.trim() || 'Untitled';
        const link = it.querySelector('link')?.getAttribute('href') || it.querySelector('link')?.textContent?.trim() || '';
        const desc = it.querySelector('description, summary, content')?.textContent?.trim() || '';
        out.push(`## ${link ? `[${t}](${link})` : t}\n\n${/<[a-z][\s\S]*>/i.test(desc) ? htmlToMd(desc) : desc}`);
      });
      return out.join('\n\n');
    }
    return `\`\`\`xml\n${text.trim()}\n\`\`\``;
  }

  // ==================== JSON -> Markdown ====================
  function jsonToMd(text) {
    const parsed = JSON.parse(text);
    if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'object' && parsed[0] !== null) {
      const keys = Array.from(new Set(parsed.flatMap(o => Object.keys(o))));
      const rows = [keys, ...parsed.map(o => keys.map(k => {
        const v = o[k];
        return typeof v === 'object' && v !== null ? JSON.stringify(v) : String(v ?? '');
      }))];
      return rowsToMdTable(rows);
    }
    return `\`\`\`json\n${JSON.stringify(parsed, null, 2)}\n\`\`\``;
  }

  // ==================== Image Metadata -> Markdown ====================
  function imageToMd(file, arrayBuffer) {
    return new Promise((resolve) => {
      const blob = new Blob([arrayBuffer], { type: file.type || 'image/png' });
      const url = URL.createObjectURL(blob);
      const img = new Image();
      img.onload = () => {
        const kb = (file.size / 1024).toFixed(1);
        URL.revokeObjectURL(url);
        resolve([
          `# Image: ${file.name}`,
          '',
          `| Property | Value |`,
          `| --- | --- |`,
          `| File Name | ${file.name} |`,
          `| MIME Type | ${file.type || 'unknown'} |`,
          `| Dimensions | ${img.naturalWidth} × ${img.naturalHeight} px |`,
          `| File Size | ${kb} KB |`
        ].join('\n'));
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        resolve(`# Image: ${file.name}\n\n- Type: ${file.type}\n- Size: ${(file.size / 1024).toFixed(1)} KB`);
      };
      img.src = url;
    });
  }

  // ==================== ZIP -> Recursive Markdown ====================
  async function zipToMd(arrayBuffer) {
    const entries = await readZipEntries(arrayBuffer);
    const names = Object.keys(entries).sort();
    if (!names.length) return '*(Empty ZIP archive)*';

    const sections = [];
    for (const name of names) {
      const ext = name.split('.').pop().toLowerCase();
      const u8 = entries[name];
      const buf = u8.buffer.slice(u8.byteOffset, u8.byteOffset + u8.byteLength);
      try {
        let subMd = '';
        if (ext === 'docx') subMd = await docxToMd(buf);
        else if (ext === 'pptx') subMd = await pptxToMd(buf);
        else if (ext === 'xlsx') subMd = await xlsxToMd(buf);
        else if (ext === 'html' || ext === 'htm') subMd = htmlToMd(td.decode(u8));
        else if (ext === 'csv') subMd = csvToMd(td.decode(u8), false);
        else if (ext === 'tsv') subMd = csvToMd(td.decode(u8), true);
        else if (ext === 'json') subMd = jsonToMd(td.decode(u8));
        else if (ext === 'ipynb') subMd = ipynbToMd(td.decode(u8));
        else if (ext === 'md' || ext === 'txt') subMd = td.decode(u8);
        else if (/^(js|ts|py|css|xml|yaml|yml|sh|sql)$/.test(ext)) subMd = `\`\`\`${ext}\n${td.decode(u8)}\n\`\`\``;
        else subMd = `*(Binary entry: ${u8.length} bytes)*`;
        sections.push(`## File: ${name}\n\n${subMd}`);
      } catch (e) {
        sections.push(`## File: ${name}\n\n*(Skipped: ${e.message})*`);
      }
    }
    return sections.join('\n\n---\n\n');
  }

  function computeStats(md) {
    const text = md || '';
    const chars = text.length;
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const lines = text ? text.split('\n').length : 0;
    const estTokens = Math.max(1, Math.round(chars / 4));
    return { chars, words, lines, estTokens };
  }

  // ==================== Public API ====================
  async function convertFile(file) {
    const name = file.name || 'document';
    const ext = name.includes('.') ? name.split('.').pop().toLowerCase() : 'txt';
    const buf = await file.arrayBuffer();
    let md = '';

    if (ext === 'docx') md = await docxToMd(buf);
    else if (ext === 'pptx') md = await pptxToMd(buf);
    else if (ext === 'xlsx') md = await xlsxToMd(buf);
    else if (ext === 'epub') md = await epubToMd(buf);
    else if (ext === 'pdf') md = await pdfToMd(buf);
    else if (ext === 'zip') md = await zipToMd(buf);
    else if (ext === 'html' || ext === 'htm') md = htmlToMd(td.decode(new Uint8Array(buf)));
    else if (ext === 'csv') md = csvToMd(td.decode(new Uint8Array(buf)), false);
    else if (ext === 'tsv') md = csvToMd(td.decode(new Uint8Array(buf)), true);
    else if (ext === 'ipynb') md = ipynbToMd(td.decode(new Uint8Array(buf)));
    else if (ext === 'xml' || ext === 'rss' || ext === 'atom') md = xmlRssToMd(td.decode(new Uint8Array(buf)));
    else if (ext === 'json') md = jsonToMd(td.decode(new Uint8Array(buf)));
    else if (/^(png|jpe?g|gif|webp|bmp|svg)$/.test(ext)) md = await imageToMd(file, buf);
    else if (/^(py|js|ts|jsx|tsx|css|sh|bash|yaml|yml|sql|java|cpp|c|go|rs)$/.test(ext)) {
      md = `\`\`\`${ext}\n${td.decode(new Uint8Array(buf)).trimEnd()}\n\`\`\``;
    } else {
      md = td.decode(new Uint8Array(buf));
    }

    return {
      name,
      ext: ext.toUpperCase(),
      markdown: md,
      stats: computeStats(md)
    };
  }

  function convertText(rawText, formatHint, fileName = 'pasted-input') {
    const fmt = (formatHint || 'auto').toLowerCase();
    const text = String(rawText || '');
    let detected = fmt;

    if (fmt === 'auto') {
      const trimmed = text.trim();
      if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
        try {
          const obj = JSON.parse(trimmed);
          detected = (obj && obj.cells && obj.nbformat) ? 'ipynb' : 'json';
        } catch {
          detected = 'txt';
        }
      } else if (/<(html|body|div|p|h1|table|ul|ol)\b/i.test(trimmed)) {
        detected = 'html';
      } else if (/^<\?xml|<rss|<feed/i.test(trimmed)) {
        detected = 'xml';
      } else if (trimmed.includes(',') && trimmed.includes('\n')) {
        detected = 'csv';
      } else {
        detected = 'txt';
      }
    }

    let md = text;
    if (detected === 'html') md = htmlToMd(text);
    else if (detected === 'csv') md = csvToMd(text, false);
    else if (detected === 'tsv') md = csvToMd(text, true);
    else if (detected === 'ipynb') md = ipynbToMd(text);
    else if (detected === 'xml') md = xmlRssToMd(text);
    else if (detected === 'json') md = jsonToMd(text);

    return {
      name: `${fileName}.${detected}`,
      ext: detected.toUpperCase(),
      markdown: md,
      stats: computeStats(md)
    };
  }

  global.MarkItDownEngine = {
    convertFile,
    convertText,
    htmlToMd,
    csvToMd
  };
})(window);
