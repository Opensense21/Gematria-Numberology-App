// OfficeCLI In-Browser Engine — Pure-JS OOXML (.pptx, .docx, .xlsx) + CLI Command Executor
(function (global) {
  'use strict';

  // ==================== CRC32 & Pure-JS ZIP Writer / Reader ====================
  const CRC_TABLE = (() => {
    const t = new Uint32Array(256);
    for (let i = 0; i < 256; i++) {
      let c = i;
      for (let k = 0; k < 8; k++) c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
      t[i] = c >>> 0;
    }
    return t;
  })();

  function crc32(bytes) {
    let c = 0xFFFFFFFF;
    for (let i = 0; i < bytes.length; i++) {
      c = CRC_TABLE[(c ^ bytes[i]) & 0xFF] ^ (c >>> 8);
    }
    return (c ^ 0xFFFFFFFF) >>> 0;
  }

  const te = new TextEncoder();
  const td = new TextDecoder('utf-8');

  function buildZip(entries) {
    // entries: [{ name: string, data: Uint8Array | string }]
    const localParts = [];
    const centralParts = [];
    let offset = 0;

    for (const entry of entries) {
      const nameBytes = te.encode(entry.name);
      const dataBytes = typeof entry.data === 'string' ? te.encode(entry.data) : entry.data;
      const crc = crc32(dataBytes);
      const size = dataBytes.length;

      // Local file header (30 bytes + name)
      const lh = new Uint8Array(30 + nameBytes.length);
      const lv = new DataView(lh.buffer);
      lv.setUint32(0, 0x04034b50, true);
      lv.setUint16(4, 20, true); // version needed
      lv.setUint16(6, 0x0800, true); // UTF-8 flag
      lv.setUint16(8, 0, true); // compression: STORE (0)
      lv.setUint16(10, 0, true); // mod time
      lv.setUint16(12, 0x5421, true); // mod date
      lv.setUint32(14, crc, true);
      lv.setUint32(18, size, true);
      lv.setUint32(22, size, true);
      lv.setUint16(26, nameBytes.length, true);
      lv.setUint16(28, 0, true);
      lh.set(nameBytes, 30);

      localParts.push(lh, dataBytes);

      // Central directory header (46 bytes + name)
      const ch = new Uint8Array(46 + nameBytes.length);
      const cv = new DataView(ch.buffer);
      cv.setUint32(0, 0x02014b50, true);
      cv.setUint16(4, 20, true);
      cv.setUint16(6, 20, true);
      cv.setUint16(8, 0x0800, true);
      cv.setUint16(10, 0, true);
      cv.setUint16(12, 0, true);
      cv.setUint16(14, 0x5421, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, size, true);
      cv.setUint32(24, size, true);
      cv.setUint16(28, nameBytes.length, true);
      cv.setUint16(30, 0, true);
      cv.setUint16(32, 0, true);
      cv.setUint16(34, 0, true);
      cv.setUint16(36, 0, true);
      cv.setUint32(38, 0, true);
      cv.setUint32(42, offset, true);
      ch.set(nameBytes, 46);

      centralParts.push(ch);
      offset += lh.length + size;
    }

    const centralSize = centralParts.reduce((s, p) => s + p.length, 0);
    const eocd = new Uint8Array(22);
    const ev = new DataView(eocd.buffer);
    ev.setUint32(0, 0x06054b50, true);
    ev.setUint16(4, 0, true);
    ev.setUint16(6, 0, true);
    ev.setUint16(8, entries.length, true);
    ev.setUint16(10, entries.length, true);
    ev.setUint32(12, centralSize, true);
    ev.setUint32(16, offset, true);
    ev.setUint16(20, 0, true);

    const totalLen = offset + centralSize + 22;
    const out = new Uint8Array(totalLen);
    let pos = 0;
    for (const p of localParts) { out.set(p, pos); pos += p.length; }
    for (const p of centralParts) { out.set(p, pos); pos += p.length; }
    out.set(eocd, pos);
    return out;
  }

  async function readZip(arrayBuffer) {
    const u8 = new Uint8Array(arrayBuffer);
    const dv = new DataView(arrayBuffer);
    // Find EOCD
    let eocdPos = -1;
    for (let i = u8.length - 22; i >= Math.max(0, u8.length - 65558); i--) {
      if (dv.getUint32(i, true) === 0x06054b50) { eocdPos = i; break; }
    }
    if (eocdPos < 0) throw new Error('Invalid ZIP / Office file (EOCD not found)');

    const cdCount = dv.getUint16(eocdPos + 10, true);
    const cdOffset = dv.getUint32(eocdPos + 16, true);
    const files = {};
    let pos = cdOffset;

    for (let i = 0; i < cdCount; i++) {
      if (dv.getUint32(pos, true) !== 0x02014b50) break;
      const method = dv.getUint16(pos + 10, true);
      const compSize = dv.getUint32(pos + 20, true);
      const nameLen = dv.getUint16(pos + 28, true);
      const extraLen = dv.getUint16(pos + 30, true);
      const commentLen = dv.getUint16(pos + 32, true);
      const localOffset = dv.getUint32(pos + 42, true);
      const name = td.decode(u8.subarray(pos + 46, pos + 46 + nameLen));
      pos += 46 + nameLen + extraLen + commentLen;

      if (name.endsWith('/')) continue;
      const lNameLen = dv.getUint16(localOffset + 26, true);
      const lExtraLen = dv.getUint16(localOffset + 28, true);
      const dataStart = localOffset + 30 + lNameLen + lExtraLen;
      const rawSlice = u8.subarray(dataStart, dataStart + compSize);

      if (method === 0) {
        files[name] = td.decode(rawSlice);
      } else if (method === 8 && typeof DecompressionStream !== 'undefined') {
        const ds = new DecompressionStream('deflate-raw');
        const writer = ds.writable.getWriter();
        writer.write(rawSlice);
        writer.close();
        const resp = new Response(ds.readable);
        const buf = await resp.arrayBuffer();
        files[name] = td.decode(new Uint8Array(buf));
      }
    }
    return files;
  }

  // ==================== XML Helpers ====================
  function escXml(s) {
    return String(s ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  function normHex(color, fallback = '141413') {
    if (!color) return fallback;
    const c = String(color).replace(/^#/, '').trim();
    if (/^[0-9a-fA-F]{6}$/.test(c)) return c.toUpperCase();
    if (/^[0-9a-fA-F]{3}$/.test(c)) return c.split('').map(ch => ch + ch).join('').toUpperCase();
    const named = {
      black: '000000', white: 'FFFFFF', red: 'DC2626', blue: '2563EB',
      green: '16A34A', gold: 'D97706', gray: '6B7280', navy: '1E3A8A',
      cream: 'FAF7F2', dark: '1A1A2E', slate: '334155', purple: '7C3AED'
    };
    return named[c.toLowerCase()] || fallback;
  }

  function parseUnitCm(val, defaultCm) {
    if (val === undefined || val === null || val === '') return defaultCm;
    const str = String(val).trim().toLowerCase();
    const num = parseFloat(str);
    if (isNaN(num)) return defaultCm;
    if (str.endsWith('in')) return num * 2.54;
    if (str.endsWith('px')) return num * 0.026458;
    if (str.endsWith('pt')) return num * 0.035278;
    if (str.endsWith('emu')) return num / 360000;
    return num; // cm by default
  }

  function cmToEmu(cm) {
    return Math.round(cm * 360000);
  }

  // ==================== OOXML Generators ====================
  function exportPptx(doc) {
    const slides = doc.slides || [];
    const entries = [];

    const slideOverrides = slides.map((_, idx) =>
      `<Override PartName="/ppt/slides/slide${idx + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slide+xml"/>`
    ).join('\n  ');

    entries.push({
      name: '[Content_Types].xml',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/ppt/presentation.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml"/>
  <Override PartName="/ppt/slideMasters/slideMaster1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideMaster+xml"/>
  <Override PartName="/ppt/slideLayouts/slideLayout1.xml" ContentType="application/vnd.openxmlformats-officedocument.presentationml.slideLayout+xml"/>
  <Override PartName="/ppt/theme/theme1.xml" ContentType="application/vnd.openxmlformats-officedocument.theme+xml"/>
  ${slideOverrides}
</Types>`
    });

    entries.push({
      name: '_rels/.rels',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="ppt/presentation.xml"/>
</Relationships>`
    });

    const sldIdList = slides.map((_, idx) =>
      `<p:sldId id="${256 + idx}" r:id="rId${idx + 2}"/>`
    ).join('');

    entries.push({
      name: 'ppt/presentation.xml',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:presentation xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:sldMasterIdLst><p:sldMasterId id="2147483648" r:id="rId1"/></p:sldMasterIdLst>
  <p:sldIdLst>${sldIdList}</p:sldIdLst>
  <p:sldSz cx="12192000" cy="6858000"/>
  <p:notesSz cx="6858000" cy="9144000"/>
</p:presentation>`
    });

    const presRels = [
      `<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="slideMasters/slideMaster1.xml"/>`,
      ...slides.map((_, idx) =>
        `<Relationship Id="rId${idx + 2}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slide" Target="slides/slide${idx + 1}.xml"/>`
      )
    ].join('\n  ');

    entries.push({
      name: 'ppt/_rels/presentation.xml.rels',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  ${presRels}
</Relationships>`
    });

    entries.push({
      name: 'ppt/slideMasters/slideMaster1.xml',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldMaster xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree></p:cSld>
  <p:clrMap bg1="lt1" tx1="dk1" bg2="lt2" tx2="dk2" accent1="accent1" accent2="accent2" accent3="accent3" accent4="accent4" accent5="accent5" accent6="accent6" hlink="hlink" folHlink="folHlink"/>
  <p:sldLayoutIdLst><p:sldLayoutId id="2147483649" r:id="rId1"/></p:sldLayoutIdLst>
</p:sldMaster>`
    });

    entries.push({
      name: 'ppt/slideMasters/_rels/slideMaster1.xml.rels',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
  <Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/theme" Target="../theme/theme1.xml"/>
</Relationships>`
    });

    entries.push({
      name: 'ppt/slideLayouts/slideLayout1.xml',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sldLayout xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main" type="blank">
  <p:cSld><p:spTree><p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr><p:grpSpPr/></p:spTree></p:cSld>
</p:sldLayout>`
    });

    entries.push({
      name: 'ppt/slideLayouts/_rels/slideLayout1.xml.rels',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideMaster" Target="../slideMasters/slideMaster1.xml"/>
</Relationships>`
    });

    entries.push({
      name: 'ppt/theme/theme1.xml',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<a:theme xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" name="OfficeCLI Theme">
  <a:themeElements>
    <a:clrScheme name="OfficeCLI">
      <a:dk1><a:srgbClr val="141413"/></a:dk1><a:lt1><a:srgbClr val="FFFFFF"/></a:lt1>
      <a:dk2><a:srgbClr val="334155"/></a:dk2><a:lt2><a:srgbClr val="FAF7F2"/></a:lt2>
      <a:accent1><a:srgbClr val="2563EB"/></a:accent1><a:accent2><a:srgbClr val="D97706"/></a:accent2>
      <a:accent3><a:srgbClr val="16A34A"/></a:accent3><a:accent4><a:srgbClr val="DC2626"/></a:accent4>
      <a:accent5><a:srgbClr val="7C3AED"/></a:accent5><a:accent6><a:srgbClr val="0891B2"/></a:accent6>
      <a:hlink><a:srgbClr val="2563EB"/></a:hlink><a:folHlink><a:srgbClr val="7C3AED"/></a:folHlink>
    </a:clrScheme>
    <a:fontScheme name="OfficeCLI">
      <a:majorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/></a:majorFont>
      <a:minorFont><a:latin typeface="Calibri"/><a:ea typeface=""/><a:cs typeface=""/></a:minorFont>
    </a:fontScheme>
    <a:fmtScheme name="OfficeCLI"><a:fillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:fillStyleLst><a:lnStyleLst><a:ln w="9525"><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:ln></a:lnStyleLst><a:effectStyleLst><a:effectStyle><a:effectLst/></a:effectStyle></a:effectStyleLst><a:bgFillStyleLst><a:solidFill><a:schemeClr val="phClr"/></a:solidFill></a:bgFillStyleLst></a:fmtScheme>
  </a:themeElements>
</a:theme>`
    });

    slides.forEach((slide, idx) => {
      const bgHex = normHex(slide.background, 'FFFFFF');
      const isDarkBg = parseInt(bgHex.slice(0, 2), 16) * 0.299 + parseInt(bgHex.slice(2, 4), 16) * 0.587 + parseInt(bgHex.slice(4, 6), 16) * 0.114 < 128;
      const defaultTextHex = isDarkBg ? 'FFFFFF' : '141413';

      let shapeId = 2;
      const shapesXml = [];

      if (slide.title) {
        shapesXml.push(`
      <p:sp>
        <p:nvSpPr><p:cNvPr id="${shapeId++}" name="Slide Title"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>
        <p:spPr><a:xfrm><a:off x="${cmToEmu(1.5)}" y="${cmToEmu(1.0)}"/><a:ext cx="${cmToEmu(30.8)}" cy="${cmToEmu(2.4)}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom><a:noFill/></p:spPr>
        <p:txBody><a:bodyPr wrap="square"/><a:lstStyle/><a:p><a:r><a:rPr lang="en-US" sz="3200" b="1"><a:solidFill><a:srgbClr val="${defaultTextHex}"/></a:solidFill><a:latin typeface="Calibri"/></a:rPr><a:t>${escXml(slide.title)}</a:t></a:r></a:p></p:txBody>
      </p:sp>`);
      }

      (slide.shapes || []).forEach((sh, sIdx) => {
        if (sh.type === 'table' && Array.isArray(sh.rows)) {
          const x = cmToEmu(parseUnitCm(sh.x, 1.5));
          const y = cmToEmu(parseUnitCm(sh.y, 4.2));
          const w = cmToEmu(parseUnitCm(sh.width, 28));
          const h = cmToEmu(parseUnitCm(sh.height, Math.max(4, sh.rows.length * 1.4)));
          const colCount = Math.max(1, ...sh.rows.map(r => r.length));
          const colW = Math.round(w / colCount);
          const gridCols = Array(colCount).fill(`<a:gridCol w="${colW}"/>`).join('');
          const trs = sh.rows.map((row, rIdx) => {
            const cells = Array.from({ length: colCount }, (_, cIdx) => {
              const val = row[cIdx] ?? '';
              const cellFill = rIdx === 0 ? '141413' : (rIdx % 2 === 1 ? 'FAF7F2' : 'FFFFFF');
              const cellColor = rIdx === 0 ? 'FFFFFF' : '141413';
              return `<a:tc><a:txBody><a:bodyPr/><a:lstStyle/><a:p><a:r><a:rPr lang="en-US" sz="1400" b="${rIdx === 0 ? '1' : '0'}"><a:solidFill><a:srgbClr val="${cellColor}"/></a:solidFill></a:rPr><a:t>${escXml(val)}</a:t></a:r></a:p></a:txBody><a:tcPr><a:solidFill><a:srgbClr val="${cellFill}"/></a:solidFill></a:tcPr></a:tc>`;
            }).join('');
            return `<a:tr h="500000">${cells}</a:tr>`;
          }).join('');
          shapesXml.push(`
      <p:graphicFrame>
        <p:nvGraphicFramePr><p:cNvPr id="${shapeId++}" name="Table ${sIdx + 1}"/><p:cNvGraphicFramePr><a:graphicFrameLocks noGrp="1"/></p:cNvGraphicFramePr><p:nvPr/></p:nvGraphicFramePr>
        <p:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="${w}" cy="${h}"/></p:xfrm>
        <a:graphic><a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/table"><a:tbl><a:tblPr firstRow="1" bandRow="1"/><a:tblGrid>${gridCols}</a:tblGrid>${trs}</a:tbl></a:graphicData></a:graphic>
      </p:graphicFrame>`);
        } else {
          const x = cmToEmu(parseUnitCm(sh.x, 2));
          const y = cmToEmu(parseUnitCm(sh.y, 4.2 + sIdx * 2.2));
          const w = cmToEmu(parseUnitCm(sh.width, 28));
          const h = cmToEmu(parseUnitCm(sh.height, 2.2));
          const fontSize = Math.round((parseFloat(sh.size) || 20) * 100);
          const colorHex = normHex(sh.color, defaultTextHex);
          const fillXml = sh.fill ? `<a:solidFill><a:srgbClr val="${normHex(sh.fill)}"/></a:solidFill>` : `<a:noFill/>`;
          const boldAttr = (sh.bold === 'true' || sh.bold === true) ? ' b="1"' : '';
          const alignAttr = sh.align ? ` algn="${sh.align === 'center' ? 'ctr' : sh.align === 'right' ? 'r' : 'l'}"` : '';
          const fontName = escXml(sh.font || 'Calibri');
          shapesXml.push(`
      <p:sp>
        <p:nvSpPr><p:cNvPr id="${shapeId++}" name="${escXml(sh.name || `Shape ${sIdx + 1}`)}"/><p:cNvSpPr txBox="1"/><p:nvPr/></p:nvSpPr>
        <p:spPr><a:xfrm><a:off x="${x}" y="${y}"/><a:ext cx="${w}" cy="${h}"/></a:xfrm><a:prstGeom prst="rect"><a:avLst/></a:prstGeom>${fillXml}</p:spPr>
        <p:txBody><a:bodyPr wrap="square"/><a:lstStyle/><a:p><a:pPr${alignAttr}/><a:r><a:rPr lang="en-US" sz="${fontSize}"${boldAttr}><a:solidFill><a:srgbClr val="${colorHex}"/></a:solidFill><a:latin typeface="${fontName}"/></a:rPr><a:t>${escXml(sh.text || '')}</a:t></a:r></a:p></p:txBody>
      </p:sp>`);
        }
      });

      entries.push({
        name: `ppt/slides/slide${idx + 1}.xml`,
        data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<p:sld xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:p="http://schemas.openxmlformats.org/presentationml/2006/main">
  <p:cSld>
    <p:bg><p:bgPr><a:solidFill><a:srgbClr val="${bgHex}"/></a:solidFill><a:effectLst/></p:bgPr></p:bg>
    <p:spTree>
      <p:nvGrpSpPr><p:cNvPr id="1" name=""/><p:cNvGrpSpPr/><p:nvPr/></p:nvGrpSpPr>
      <p:grpSpPr><a:xfrm><a:off x="0" y="0"/><a:ext cx="0" cy="0"/><a:chOff x="0" y="0"/><a:chExt cx="0" cy="0"/></a:xfrm></p:grpSpPr>
      ${shapesXml.join('')}
    </p:spTree>
  </p:cSld>
</p:sld>`
      });

      entries.push({
        name: `ppt/slides/_rels/slide${idx + 1}.xml.rels`,
        data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/slideLayout" Target="../slideLayouts/slideLayout1.xml"/>
</Relationships>`
      });
    });

    return buildZip(entries);
  }

  function exportDocx(doc) {
    const blocks = doc.blocks || [];
    const bodyXml = blocks.map(b => {
      if (b.type === 'heading') {
        const lvl = Math.min(3, Math.max(1, parseInt(b.level) || 1));
        const sz = lvl === 1 ? 44 : lvl === 2 ? 32 : 26;
        const color = normHex(b.color, '141413');
        const jc = b.align ? `<w:jc w:val="${b.align}"/>` : '';
        return `<w:p><w:pPr>${jc}<w:spacing w:before="240" w:after="120"/></w:pPr><w:r><w:rPr><w:b/><w:color w:val="${color}"/><w:sz w:val="${sz}"/></w:rPr><w:t>${escXml(b.text || '')}</w:t></w:r></w:p>`;
      }
      if (b.type === 'list') {
        const items = Array.isArray(b.items) ? b.items : String(b.text || '').split(';').map(s => s.trim()).filter(Boolean);
        return items.map((it, idx) => {
          const prefix = b.ordered ? `${idx + 1}. ` : '• ';
          return `<w:p><w:pPr><w:ind w:left="420"/><w:spacing w:after="80"/></w:pPr><w:r><w:rPr><w:sz w:val="22"/></w:rPr><w:t xml:space="preserve">${escXml(prefix + it)}</w:t></w:r></w:p>`;
        }).join('');
      }
      if (b.type === 'table' && Array.isArray(b.rows)) {
        const trs = b.rows.map((row, rIdx) => {
          const tcs = row.map(cell => {
            const fill = rIdx === 0 ? '141413' : (rIdx % 2 === 1 ? 'FAF7F2' : 'FFFFFF');
            const color = rIdx === 0 ? 'FFFFFF' : '141413';
            const bold = rIdx === 0 ? '<w:b/>' : '';
            return `<w:tc><w:tcPr><w:shd w:val="clear" w:color="auto" w:fill="${fill}"/></w:tcPr><w:p><w:r><w:rPr>${bold}<w:color w:val="${color}"/><w:sz w:val="20"/></w:rPr><w:t>${escXml(cell)}</w:t></w:r></w:p></w:tc>`;
          }).join('');
          return `<w:tr>${tcs}</w:tr>`;
        }).join('');
        return `<w:tbl><w:tblPr><w:tblW w:w="9000" w:type="dxa"/><w:tblBorders><w:top w:val="single" w:sz="4" w:color="D1D5DB"/><w:bottom w:val="single" w:sz="4" w:color="D1D5DB"/><w:left w:val="single" w:sz="4" w:color="D1D5DB"/><w:right w:val="single" w:sz="4" w:color="D1D5DB"/><w:insideH w:val="single" w:sz="4" w:color="E5E7EB"/><w:insideV w:val="single" w:sz="4" w:color="E5E7EB"/></w:tblBorders></w:tblPr>${trs}</w:tbl>`;
      }
      if (b.type === 'pagebreak') {
        return `<w:p><w:r><w:br w:type="page"/></w:r></w:p>`;
      }
      // paragraph
      const sz = Math.round((parseFloat(b.size) || 11) * 2);
      const color = normHex(b.color, '141413');
      const bold = (b.bold === 'true' || b.bold === true) ? '<w:b/>' : '';
      const italic = (b.italic === 'true' || b.italic === true) ? '<w:i/>' : '';
      const jc = b.align ? `<w:jc w:val="${b.align}"/>` : '';
      const shd = b.bg ? `<w:shd w:val="clear" w:color="auto" w:fill="${normHex(b.bg)}"/>` : '';
      return `<w:p><w:pPr>${jc}${shd}<w:spacing w:after="140"/></w:pPr><w:r><w:rPr>${bold}${italic}<w:color w:val="${color}"/><w:sz w:val="${sz}"/></w:rPr><w:t xml:space="preserve">${escXml(b.text || '')}</w:t></w:r></w:p>`;
    }).join('\n    ');

    return buildZip([
      {
        name: '[Content_Types].xml',
        data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`
      },
      {
        name: '_rels/.rels',
        data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`
      },
      {
        name: 'word/document.xml',
        data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    ${bodyXml}
    <w:sectPr><w:pgSz w:w="12240" w:h="15840"/><w:pgMar w:top="1440" w:right="1440" w:bottom="1440" w:left="1440"/></w:sectPr>
  </w:body>
</w:document>`
      }
    ]);
  }

  function colToIndex(colStr) {
    let idx = 0;
    const s = colStr.toUpperCase();
    for (let i = 0; i < s.length; i++) idx = idx * 26 + (s.charCodeAt(i) - 64);
    return idx - 1;
  }

  function indexToCol(idx) {
    let s = '';
    let n = idx + 1;
    while (n > 0) {
      const rem = (n - 1) % 26;
      s = String.fromCharCode(65 + rem) + s;
      n = Math.floor((n - 1) / 26);
    }
    return s;
  }

  function parseCellRef(ref) {
    const m = String(ref || '').trim().toUpperCase().match(/^([A-Z]+)(\d+)$/);
    if (!m) return null;
    return { col: colToIndex(m[1]), row: parseInt(m[2], 10) - 1, ref: m[1] + m[2] };
  }

  function exportXlsx(doc) {
    const sheets = doc.sheets && doc.sheets.length ? doc.sheets : [{ name: 'Sheet1', cells: {} }];
    const entries = [];

    const sheetOverrides = sheets.map((_, idx) =>
      `<Override PartName="/xl/worksheets/sheet${idx + 1}.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/>`
    ).join('\n  ');

    entries.push({
      name: '[Content_Types].xml',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.workbook.main+xml"/>
  <Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/>
  ${sheetOverrides}
</Types>`
    });

    entries.push({
      name: '_rels/.rels',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/>
</Relationships>`
    });

    const sheetTags = sheets.map((s, idx) =>
      `<sheet name="${escXml(s.name || `Sheet${idx + 1}`)}" sheetId="${idx + 1}" r:id="rId${idx + 1}"/>`
    ).join('');

    entries.push({
      name: 'xl/workbook.xml',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships">
  <sheets>${sheetTags}</sheets>
</workbook>`
    });

    const wbRels = [
      ...sheets.map((_, idx) =>
        `<Relationship Id="rId${idx + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet${idx + 1}.xml"/>`
      ),
      `<Relationship Id="rId${sheets.length + 1}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>`
    ].join('\n  ');

    entries.push({
      name: 'xl/_rels/workbook.xml.rels',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  ${wbRels}
</Relationships>`
    });

    entries.push({
      name: 'xl/styles.xml',
      data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <fonts count="2">
    <font><sz val="11"/><name val="Calibri"/></font>
    <font><b/><sz val="11"/><name val="Calibri"/></font>
  </fonts>
  <fills count="3">
    <fill><patternFill patternType="none"/></fill>
    <fill><patternFill patternType="gray125"/></fill>
    <fill><patternFill patternType="solid"><fgColor rgb="FFFAF7F2"/></patternFill></fill>
  </fills>
  <borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders>
  <cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs>
  <cellXfs count="2">
    <xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/>
    <xf numFmtId="0" fontId="1" fillId="2" borderId="0" xfId="0" applyFont="1" applyFill="1"/>
  </cellXfs>
</styleSheet>`
    });

    sheets.forEach((sheet, idx) => {
      const rowsMap = {};
      Object.entries(sheet.cells || {}).forEach(([ref, cell]) => {
        const parsed = parseCellRef(ref);
        if (!parsed) return;
        const rNum = parsed.row + 1;
        if (!rowsMap[rNum]) rowsMap[rNum] = [];
        rowsMap[rNum].push({ ref: parsed.ref, col: parsed.col, cell });
      });

      const rowsXml = Object.keys(rowsMap).map(Number).sort((a, b) => a - b).map(rNum => {
        const cellsXml = rowsMap[rNum].sort((a, b) => a.col - b.col).map(({ ref, cell }) => {
          const styleAttr = (cell.bold === 'true' || cell.bold === true) ? ' s="1"' : '';
          if (cell.formula) {
            const f = String(cell.formula).replace(/^=/, '');
            const evalVal = evalExcelFormula(cell.formula, sheet.cells);
            const vTag = typeof evalVal === 'number' && !isNaN(evalVal) ? `<v>${evalVal}</v>` : '';
            return `<c r="${ref}"${styleAttr}><f>${escXml(f)}</f>${vTag}</c>`;
          }
          const raw = cell.value ?? '';
          const num = Number(raw);
          if (raw !== '' && !isNaN(num) && typeof raw !== 'boolean') {
            return `<c r="${ref}"${styleAttr}><v>${num}</v></c>`;
          }
          return `<c r="${ref}" t="inlineStr"${styleAttr}><is><t>${escXml(raw)}</t></is></c>`;
        }).join('');
        return `<row r="${rNum}">${cellsXml}</row>`;
      }).join('');

      entries.push({
        name: `xl/worksheets/sheet${idx + 1}.xml`,
        data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main">
  <sheetData>${rowsXml}</sheetData>
</worksheet>`
      });
    });

    return buildZip(entries);
  }

  // ==================== Excel Formula Evaluator ====================
  function evalExcelFormula(formula, cellsMap, visited = new Set()) {
    if (!formula || typeof formula !== 'string') return '';
    if (!formula.startsWith('=')) return formula;
    const expr = formula.slice(1).trim();

    function getCellNumeric(ref) {
      const key = ref.toUpperCase();
      if (visited.has(key)) return 0;
      const c = cellsMap[key];
      if (!c) return 0;
      if (c.formula) {
        visited.add(key);
        const v = Number(evalExcelFormula(c.formula, cellsMap, visited));
        visited.delete(key);
        return isNaN(v) ? 0 : v;
      }
      const n = Number(c.value);
      return isNaN(n) ? 0 : n;
    }

    function expandRange(a, b) {
      const p1 = parseCellRef(a);
      const p2 = parseCellRef(b);
      if (!p1 || !p2) return [];
      const vals = [];
      for (let r = Math.min(p1.row, p2.row); r <= Math.max(p1.row, p2.row); r++) {
        for (let c = Math.min(p1.col, p2.col); c <= Math.max(p1.col, p2.col); c++) {
          const ref = indexToCol(c) + (r + 1);
          if (cellsMap[ref]) vals.push(getCellNumeric(ref));
        }
      }
      return vals;
    }

    try {
      let replaced = expr.replace(/\b(SUM|AVERAGE|AVG|MIN|MAX|COUNT)\s*\(\s*([A-Z]+\d+)\s*:\s*([A-Z]+\d+)\s*\)/gi, (_, fn, a, b) => {
        const vals = expandRange(a, b);
        const f = fn.toUpperCase();
        if (!vals.length) return '0';
        if (f === 'SUM') return String(vals.reduce((s, v) => s + v, 0));
        if (f === 'AVERAGE' || f === 'AVG') return String(vals.reduce((s, v) => s + v, 0) / vals.length);
        if (f === 'MIN') return String(Math.min(...vals));
        if (f === 'MAX') return String(Math.max(...vals));
        if (f === 'COUNT') return String(vals.length);
        return '0';
      });

      replaced = replaced.replace(/\b([A-Z]+\d+)\b/g, (_, ref) => String(getCellNumeric(ref)));
      if (!/^[0-9+\-*/().\s]+$/.test(replaced)) return formula;
      const result = Function(`"use strict"; return (${replaced});`)();
      return typeof result === 'number' && isFinite(result) ? Math.round(result * 10000) / 10000 : formula;
    } catch {
      return '#ERR';
    }
  }

  // ==================== OOXML Importers (Upload .pptx/.docx/.xlsx) ====================
  async function importOfficeFile(fileName, arrayBuffer) {
    const files = await readZip(arrayBuffer);
    const ext = fileName.split('.').pop().toLowerCase();
    const parser = new DOMParser();

    if (ext === 'pptx') {
      const slideKeys = Object.keys(files)
        .filter(k => /^ppt\/slides\/slide\d+\.xml$/.test(k))
        .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));

      const slides = slideKeys.map((k, idx) => {
        const xml = parser.parseFromString(files[k], 'application/xml');
        const bgEl = xml.querySelector('bg srgbClr, bgPr srgbClr');
        const bg = bgEl ? bgEl.getAttribute('val') : 'FFFFFF';
        const sps = Array.from(xml.querySelectorAll('spTree > sp'));
        let title = '';
        const shapes = [];

        sps.forEach((sp, sIdx) => {
          const texts = Array.from(sp.querySelectorAll('t')).map(t => t.textContent).join(' ').trim();
          if (!texts) return;
          const off = sp.querySelector('xfrm > off');
          const xCm = off ? (parseInt(off.getAttribute('x') || '720000', 10) / 360000).toFixed(1) + 'cm' : '2cm';
          const yCm = off ? (parseInt(off.getAttribute('y') || '1440000', 10) / 360000).toFixed(1) + 'cm' : '4cm';
          const rPr = sp.querySelector('rPr');
          const sz = rPr && rPr.getAttribute('sz') ? Math.round(parseInt(rPr.getAttribute('sz'), 10) / 100) : 18;
          const clrEl = sp.querySelector('rPr srgbClr');
          const color = clrEl ? clrEl.getAttribute('val') : undefined;
          if (sIdx === 0 && sz >= 24 && !title) {
            title = texts;
          } else {
            shapes.push({ type: 'shape', text: texts, x: xCm, y: yCm, size: sz, color });
          }
        });

        return { title: title || `Slide ${idx + 1}`, background: bg, shapes };
      });

      return { name: fileName, type: 'pptx', slides: slides.length ? slides : [{ title: 'Imported Slide', background: 'FFFFFF', shapes: [] }] };
    }

    if (ext === 'docx') {
      const docXml = files['word/document.xml'];
      if (!docXml) throw new Error('word/document.xml not found');
      const xml = parser.parseFromString(docXml, 'application/xml');
      const body = xml.querySelector('body') || xml.documentElement;
      const blocks = [];

      Array.from(body.children).forEach(node => {
        const local = node.localName;
        if (local === 'p') {
          const text = Array.from(node.querySelectorAll('t')).map(t => t.textContent).join('').trim();
          if (!text) return;
          const pStyle = node.querySelector('pStyle');
          const styleVal = pStyle ? pStyle.getAttribute('w:val') || pStyle.getAttribute('val') || '' : '';
          const szEl = node.querySelector('rPr sz');
          const sz = szEl ? parseInt(szEl.getAttribute('w:val') || szEl.getAttribute('val') || '22', 10) / 2 : 11;
          if (/Heading1|Title/i.test(styleVal) || sz >= 20) {
            blocks.push({ type: 'heading', level: 1, text });
          } else if (/Heading2|Subtitle/i.test(styleVal) || sz >= 15) {
            blocks.push({ type: 'heading', level: 2, text });
          } else {
            blocks.push({ type: 'paragraph', text, size: sz });
          }
        } else if (local === 'tbl') {
          const rows = Array.from(node.querySelectorAll('tr')).map(tr =>
            Array.from(tr.querySelectorAll('tc')).map(tc =>
              Array.from(tc.querySelectorAll('t')).map(t => t.textContent).join('').trim()
            )
          );
          if (rows.length) blocks.push({ type: 'table', rows });
        }
      });

      return { name: fileName, type: 'docx', blocks };
    }

    if (ext === 'xlsx') {
      // Parse sharedStrings if present
      const sharedStrings = [];
      if (files['xl/sharedStrings.xml']) {
        const ssXml = parser.parseFromString(files['xl/sharedStrings.xml'], 'application/xml');
        Array.from(ssXml.querySelectorAll('si')).forEach(si => {
          sharedStrings.push(Array.from(si.querySelectorAll('t')).map(t => t.textContent).join(''));
        });
      }

      const sheetKeys = Object.keys(files)
        .filter(k => /^xl\/worksheets\/sheet\d+\.xml$/.test(k))
        .sort((a, b) => parseInt(a.match(/\d+/)[0], 10) - parseInt(b.match(/\d+/)[0], 10));

      let sheetNames = [];
      if (files['xl/workbook.xml']) {
        const wbXml = parser.parseFromString(files['xl/workbook.xml'], 'application/xml');
        sheetNames = Array.from(wbXml.querySelectorAll('sheet')).map(s => s.getAttribute('name'));
      }

      const sheets = sheetKeys.map((k, idx) => {
        const sXml = parser.parseFromString(files[k], 'application/xml');
        const cells = {};
        Array.from(sXml.querySelectorAll('c')).forEach(c => {
          const ref = c.getAttribute('r');
          const t = c.getAttribute('t');
          const fEl = c.querySelector('f');
          const vEl = c.querySelector('v');
          const isEl = c.querySelector('is t');
          if (!ref) return;
          if (fEl) {
            cells[ref] = { formula: '=' + fEl.textContent };
          } else if (t === 's' && vEl) {
            cells[ref] = { value: sharedStrings[parseInt(vEl.textContent, 10)] ?? '' };
          } else if (t === 'inlineStr' && isEl) {
            cells[ref] = { value: isEl.textContent };
          } else if (vEl) {
            cells[ref] = { value: vEl.textContent };
          }
        });
        return { name: sheetNames[idx] || `Sheet${idx + 1}`, cells };
      });

      return { name: fileName, type: 'xlsx', sheets: sheets.length ? sheets : [{ name: 'Sheet1', cells: {} }] };
    }

    throw new Error(`Unsupported file extension ".${ext}". Supported: .pptx, .docx, .xlsx`);
  }

  // ==================== Virtual Filesystem & Default Samples ====================
  const STORAGE_KEY = 'officecli_studio_vfs_v1';

  function createDefaultVfs() {
    return {
      activeFile: 'q4_deck.pptx',
      files: {
        'q4_deck.pptx': {
          name: 'q4_deck.pptx',
          type: 'pptx',
          slides: [
            {
              title: 'Q4 Strategy & Growth Report',
              background: '1A1A2E',
              shapes: [
                { type: 'shape', text: 'Revenue grew +34% YoY • Powered by OfficeCLI', x: '2cm', y: '4.5cm', size: 22, color: 'FAF7F2', bold: true },
                { type: 'shape', text: 'Generated directly inside the browser with zero dependencies.', x: '2cm', y: '7.2cm', size: 16, color: 'CBD5E1' }
              ]
            },
            {
              title: 'Regional Performance Summary',
              background: 'FAF7F2',
              shapes: [
                {
                  type: 'table',
                  x: '2cm',
                  y: '4cm',
                  width: '28cm',
                  rows: [
                    ['Region', 'Q3 Revenue', 'Q4 Revenue', 'YoY Growth'],
                    ['North America', '$4.2M', '$5.8M', '+38%'],
                    ['Europe', '$2.9M', '$3.7M', '+28%'],
                    ['Asia-Pacific', '$1.8M', '$2.5M', '+39%']
                  ]
                }
              ]
            }
          ]
        },
        'project_brief.docx': {
          name: 'project_brief.docx',
          type: 'docx',
          blocks: [
            { type: 'heading', level: 1, text: 'Project Brief: AI Agent Workflow' },
            { type: 'paragraph', text: 'Executive Summary: This document was authored via OfficeCLI commands and can be exported as a standard .docx file.', size: 11 },
            { type: 'heading', level: 2, text: 'Key Milestones' },
            { type: 'list', ordered: true, items: ['Design OOXML schema & CLI selectors', 'Build live HTML preview engine', 'Export native Word, Excel & PowerPoint files'] },
            { type: 'table', rows: [['Phase', 'Owner', 'Status'], ['Architecture', 'AI Agent', 'Complete'], ['Live Preview', 'OfficeCLI', 'Active']] }
          ]
        },
        'budget_2026.xlsx': {
          name: 'budget_2026.xlsx',
          type: 'xlsx',
          sheets: [
            {
              name: 'Budget',
              cells: {
                A1: { value: 'Category', bold: true },
                B1: { value: 'Q1', bold: true },
                C1: { value: 'Q2', bold: true },
                D1: { value: 'Total', bold: true },
                A2: { value: 'Cloud Infra' }, B2: { value: 1200 }, C2: { value: 1450 }, D2: { formula: '=B2+C2' },
                A3: { value: 'AI Models' }, B3: { value: 850 }, C3: { value: 1100 }, D3: { formula: '=B3+C3' },
                A4: { value: 'Design & Ops' }, B4: { value: 600 }, C4: { value: 650 }, D4: { formula: '=B4+C4' },
                A5: { value: 'Grand Total', bold: true },
                B5: { formula: '=SUM(B2:B4)', bold: true },
                C5: { formula: '=SUM(C2:C4)', bold: true },
                D5: { formula: '=SUM(D2:D4)', bold: true }
              }
            }
          ]
        }
      }
    };
  }

  function loadVfs() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.files && Object.keys(parsed.files).length > 0) return parsed;
      }
    } catch { /* ignore */ }
    return createDefaultVfs();
  }

  let vfs = loadVfs();

  function saveVfs() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(vfs));
    } catch { /* ignore */ }
  }

  // ==================== CLI Tokenizer & Command Parser ====================
  function tokenize(line) {
    const tokens = [];
    let cur = '';
    let quote = null;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (quote) {
        if (ch === quote) {
          quote = null;
        } else if (ch === '\\' && i + 1 < line.length && line[i + 1] === quote) {
          cur += quote;
          i++;
        } else {
          cur += ch;
        }
      } else if (ch === '"' || ch === "'") {
        quote = ch;
      } else if (/\s/.test(ch)) {
        if (cur.length) { tokens.push(cur); cur = ''; }
      } else {
        cur += ch;
      }
    }
    if (cur.length) tokens.push(cur);
    return tokens;
  }

  function parseProps(tokens) {
    const props = {};
    const flags = new Set();
    const positional = [];
    for (let i = 0; i < tokens.length; i++) {
      const t = tokens[i];
      if (t === '--type' && i + 1 < tokens.length) {
        props._type = tokens[++i];
      } else if (t === '--prop' && i + 1 < tokens.length) {
        const kv = tokens[++i];
        const eq = kv.indexOf('=');
        if (eq > 0) props[kv.slice(0, eq)] = kv.slice(eq + 1);
      } else if (t.startsWith('--')) {
        flags.add(t.slice(2));
      } else {
        positional.push(t);
      }
    }
    return { props, flags, positional };
  }

  function parseTableData(raw) {
    if (!raw) return [['Header 1', 'Header 2'], ['Row 1', 'Value 1']];
    return String(raw).split(';').map(r => r.split(',').map(c => c.trim()));
  }

  function resolveFile(name) {
    if (!name) return null;
    const clean = name.replace(/^.*\//, '');
    return vfs.files[clean] || null;
  }

  // ==================== Command Executor ====================
  function execCommand(rawLine) {
    const line = String(rawLine || '').trim();
    if (!line || line.startsWith('#')) return { ok: true, output: '' };

    let tokens = tokenize(line);
    if (!tokens.length) return { ok: true, output: '' };
    if (tokens[0] === 'officecli') tokens = tokens.slice(1);
    if (!tokens.length) return execCommand('help');

    const cmd = tokens[0].toLowerCase();
    const rest = tokens.slice(1);
    const { props, flags, positional } = parseProps(rest);

    if (cmd === 'help' || cmd === '--help' || cmd === '-h') {
      return {
        ok: true,
        output: [
          'OfficeCLI In-Browser Commands:',
          '  officecli create <file.pptx|docx|xlsx>',
          '  officecli add <file> <path> --type <slide|shape|heading|paragraph|list|table|sheet|cell> --prop k=v',
          '  officecli set <file> <path> --prop k=v',
          '  officecli remove <file> <path>',
          '  officecli get <file> [path] [--json]',
          '  officecli view <file> <outline|html|json>',
          '  officecli open <file> | officecli ls | officecli close <file>',
          '',
          'Examples:',
          '  officecli create demo.pptx',
          '  officecli add demo.pptx / --type slide --prop title="Hello World" --prop background=1A1A2E',
          '  officecli add demo.pptx "/slide[1]" --type shape --prop text="Built in Browser" --prop color=FFFFFF --prop size=24',
          '  officecli add budget.xlsx "/sheet[1]" --type cell --prop ref=B2 --prop value=1500'
        ].join('\n')
      };
    }

    if (cmd === 'ls') {
      const names = Object.keys(vfs.files);
      return {
        ok: true,
        output: names.map(n => `${n === vfs.activeFile ? '*' : ' '} ${n} (${vfs.files[n].type.toUpperCase()})`).join('\n') || '(workspace empty)'
      };
    }

    if (cmd === 'create') {
      const fileName = (positional[0] || '').replace(/^.*\//, '');
      if (!fileName) return { ok: false, output: 'Usage: officecli create <filename.pptx|docx|xlsx>' };
      const ext = fileName.split('.').pop().toLowerCase();
      if (ext === 'pptx') {
        vfs.files[fileName] = { name: fileName, type: 'pptx', slides: [] };
      } else if (ext === 'docx') {
        vfs.files[fileName] = { name: fileName, type: 'docx', blocks: [] };
      } else if (ext === 'xlsx') {
        vfs.files[fileName] = { name: fileName, type: 'xlsx', sheets: [{ name: 'Sheet1', cells: {} }] };
      } else {
        return { ok: false, output: `Unsupported extension ".${ext}". Use .pptx, .docx, or .xlsx.` };
      }
      vfs.activeFile = fileName;
      saveVfs();
      return { ok: true, output: `✓ Created ${fileName}`, fileChanged: fileName };
    }

    if (cmd === 'open') {
      const file = resolveFile(positional[0]);
      if (!file) return { ok: false, output: `File not found: ${positional[0]}` };
      vfs.activeFile = file.name;
      saveVfs();
      return { ok: true, output: `✓ Switched active file to ${file.name}`, fileChanged: file.name };
    }

    if (cmd === 'close') {
      const file = resolveFile(positional[0] || vfs.activeFile);
      if (!file) return { ok: false, output: 'No matching file to save/close.' };
      saveVfs();
      return { ok: true, output: `✓ Saved & flushed ${file.name} to workspace` };
    }

    if (cmd === 'add') {
      const file = resolveFile(positional[0]);
      const path = positional[1] || '/';
      if (!file) return { ok: false, output: `File not found: ${positional[0]}. Run "officecli create ${positional[0]}" first.` };
      const type = (props._type || '').toLowerCase();

      if (file.type === 'pptx') {
        if (type === 'slide') {
          file.slides.push({
            title: props.title || `Slide ${file.slides.length + 1}`,
            background: props.background || 'FFFFFF',
            shapes: []
          });
          vfs.activeFile = file.name;
          saveVfs();
          return { ok: true, output: `✓ Added /slide[${file.slides.length}] to ${file.name}`, fileChanged: file.name };
        }
        const mSlide = path.match(/slide\[(\d+)\]/i);
        const sIdx = mSlide ? parseInt(mSlide[1], 10) - 1 : file.slides.length - 1;
        if (sIdx < 0 || sIdx >= file.slides.length) {
          return { ok: false, output: `Slide not found for path "${path}". Add a slide first.` };
        }
        if (type === 'table') {
          file.slides[sIdx].shapes.push({
            type: 'table',
            x: props.x || '2cm',
            y: props.y || '4.2cm',
            width: props.width || '28cm',
            rows: parseTableData(props.data)
          });
        } else {
          file.slides[sIdx].shapes.push({
            type: 'shape',
            text: props.text || 'New TextBox',
            x: props.x || '2cm',
            y: props.y || `${4.2 + file.slides[sIdx].shapes.length * 2.2}cm`,
            width: props.width || '28cm',
            font: props.font || 'Calibri',
            size: parseFloat(props.size) || 20,
            color: props.color,
            fill: props.fill,
            bold: props.bold === 'true',
            align: props.align || 'left'
          });
        }
        vfs.activeFile = file.name;
        saveVfs();
        return { ok: true, output: `✓ Added ${type || 'shape'} to /slide[${sIdx + 1}]`, fileChanged: file.name };
      }

      if (file.type === 'docx') {
        if (type === 'heading') {
          file.blocks.push({ type: 'heading', level: parseInt(props.level, 10) || 1, text: props.text || 'Heading', color: props.color, align: props.align });
        } else if (type === 'list') {
          const items = (props.items || props.text || 'Item 1; Item 2').split(';').map(s => s.trim()).filter(Boolean);
          file.blocks.push({ type: 'list', ordered: props.ordered === 'true', items });
        } else if (type === 'table') {
          file.blocks.push({ type: 'table', rows: parseTableData(props.data) });
        } else if (type === 'pagebreak') {
          file.blocks.push({ type: 'pagebreak' });
        } else {
          file.blocks.push({
            type: 'paragraph',
            text: props.text || 'New paragraph.',
            size: parseFloat(props.size) || 11,
            color: props.color,
            bold: props.bold === 'true',
            italic: props.italic === 'true',
            align: props.align,
            bg: props.bg
          });
        }
        vfs.activeFile = file.name;
        saveVfs();
        return { ok: true, output: `✓ Added ${type || 'paragraph'} (/block[${file.blocks.length}]) to ${file.name}`, fileChanged: file.name };
      }

      if (file.type === 'xlsx') {
        if (type === 'sheet') {
          const name = props.name || `Sheet${file.sheets.length + 1}`;
          file.sheets.push({ name, cells: {} });
          vfs.activeFile = file.name;
          saveVfs();
          return { ok: true, output: `✓ Added sheet "${name}" (/sheet[${file.sheets.length}])`, fileChanged: file.name };
        }
        const mSheet = path.match(/sheet\[(\d+)\]/i);
        const shIdx = mSheet ? parseInt(mSheet[1], 10) - 1 : 0;
        const sheet = file.sheets[shIdx];
        if (!sheet) return { ok: false, output: `Sheet not found for path "${path}"` };

        if (type === 'row') {
          const rNum = parseInt(props.row, 10) || 1;
          const vals = String(props.values || props.data || '').split(',').map(v => v.trim());
          vals.forEach((v, cIdx) => {
            const ref = indexToCol(cIdx) + rNum;
            sheet.cells[ref] = v.startsWith('=') ? { formula: v, bold: props.bold === 'true' } : { value: v, bold: props.bold === 'true' };
          });
          vfs.activeFile = file.name;
          saveVfs();
          return { ok: true, output: `✓ Set row ${rNum} (${vals.length} cells) on ${sheet.name}`, fileChanged: file.name };
        }

        const ref = (props.ref || 'A1').toUpperCase();
        const cellObj = {};
        if (props.formula) cellObj.formula = props.formula.startsWith('=') ? props.formula : '=' + props.formula;
        else if (String(props.value || '').startsWith('=')) cellObj.formula = props.value;
        else cellObj.value = props.value ?? '';
        if (props.bold === 'true') cellObj.bold = true;
        if (props.color) cellObj.color = props.color;
        if (props.fill) cellObj.fill = props.fill;
        sheet.cells[ref] = cellObj;
        vfs.activeFile = file.name;
        saveVfs();
        return { ok: true, output: `✓ Set ${sheet.name}!${ref}`, fileChanged: file.name };
      }
    }

    if (cmd === 'set') {
      const file = resolveFile(positional[0]);
      const path = positional[1] || '/';
      if (!file) return { ok: false, output: `File not found: ${positional[0]}` };

      if (file.type === 'pptx') {
        const m = path.match(/^\/?slide\[(\d+)\](?:\/shape\[(\d+)\])?$/i);
        if (!m) return { ok: false, output: `Invalid path "${path}". Use /slide[1] or /slide[1]/shape[1]` };
        const slide = file.slides[parseInt(m[1], 10) - 1];
        if (!slide) return { ok: false, output: `Slide not found: ${path}` };
        if (m[2]) {
          const shape = slide.shapes[parseInt(m[2], 10) - 1];
          if (!shape) return { ok: false, output: `Shape not found: ${path}` };
          Object.entries(props).forEach(([k, v]) => {
            if (k === '_type') return;
            shape[k] = k === 'size' ? parseFloat(v) : (k === 'bold' ? v === 'true' : v);
          });
        } else {
          if (props.title !== undefined) slide.title = props.title;
          if (props.background !== undefined) slide.background = props.background;
        }
        saveVfs();
        return { ok: true, output: `✓ Updated ${path}`, fileChanged: file.name };
      }

      if (file.type === 'docx') {
        const m = path.match(/^\/?(?:block|paragraph|heading)\[(\d+)\]$/i);
        if (!m) return { ok: false, output: `Invalid path "${path}". Use /block[1]` };
        const block = file.blocks[parseInt(m[1], 10) - 1];
        if (!block) return { ok: false, output: `Block not found: ${path}` };
        Object.entries(props).forEach(([k, v]) => {
          if (k === '_type') return;
          block[k] = (k === 'size' || k === 'level') ? parseFloat(v) : (k === 'bold' || k === 'italic' ? v === 'true' : v);
        });
        saveVfs();
        return { ok: true, output: `✓ Updated ${path}`, fileChanged: file.name };
      }

      if (file.type === 'xlsx') {
        const m = path.match(/^\/?sheet\[(\d+)\](?:\/cell\[([A-Z]+\d+)\])?$/i);
        if (!m) return { ok: false, output: `Invalid path "${path}". Use /sheet[1]/cell[A1]` };
        const sheet = file.sheets[parseInt(m[1], 10) - 1];
        if (!sheet) return { ok: false, output: `Sheet not found: ${path}` };
        if (m[2]) {
          const ref = m[2].toUpperCase();
          sheet.cells[ref] = sheet.cells[ref] || {};
          if (props.value !== undefined) { delete sheet.cells[ref].formula; sheet.cells[ref].value = props.value; }
          if (props.formula !== undefined) { sheet.cells[ref].formula = props.formula.startsWith('=') ? props.formula : '=' + props.formula; }
          if (props.bold !== undefined) sheet.cells[ref].bold = props.bold === 'true';
        } else if (props.name) {
          sheet.name = props.name;
        }
        saveVfs();
        return { ok: true, output: `✓ Updated ${path}`, fileChanged: file.name };
      }
    }

    if (cmd === 'remove' || cmd === 'rm') {
      const file = resolveFile(positional[0]);
      const path = positional[1];
      if (!file || !path) return { ok: false, output: 'Usage: officecli remove <file> <path>' };

      if (file.type === 'pptx') {
        const m = path.match(/^\/?slide\[(\d+)\](?:\/shape\[(\d+)\])?$/i);
        if (!m) return { ok: false, output: `Invalid path: ${path}` };
        const sIdx = parseInt(m[1], 10) - 1;
        if (!file.slides[sIdx]) return { ok: false, output: `Not found: ${path}` };
        if (m[2]) {
          file.slides[sIdx].shapes.splice(parseInt(m[2], 10) - 1, 1);
        } else {
          file.slides.splice(sIdx, 1);
        }
        saveVfs();
        return { ok: true, output: `✓ Removed ${path}`, fileChanged: file.name };
      }

      if (file.type === 'docx') {
        const m = path.match(/^\/?(?:block|paragraph|heading|list|table)\[(\d+)\]$/i);
        if (!m) return { ok: false, output: `Invalid path: ${path}` };
        file.blocks.splice(parseInt(m[1], 10) - 1, 1);
        saveVfs();
        return { ok: true, output: `✓ Removed ${path}`, fileChanged: file.name };
      }

      if (file.type === 'xlsx') {
        const m = path.match(/^\/?sheet\[(\d+)\](?:\/cell\[([A-Z]+\d+)\])?$/i);
        if (!m) return { ok: false, output: `Invalid path: ${path}` };
        const shIdx = parseInt(m[1], 10) - 1;
        if (!file.sheets[shIdx]) return { ok: false, output: `Not found: ${path}` };
        if (m[2]) delete file.sheets[shIdx].cells[m[2].toUpperCase()];
        else if (file.sheets.length > 1) file.sheets.splice(shIdx, 1);
        saveVfs();
        return { ok: true, output: `✓ Removed ${path}`, fileChanged: file.name };
      }
    }

    if (cmd === 'get') {
      const file = resolveFile(positional[0]);
      if (!file) return { ok: false, output: `File not found: ${positional[0]}` };
      const path = positional[1] || '/';
      if (path === '/') return { ok: true, output: JSON.stringify(file, null, 2) };
      if (file.type === 'pptx') {
        const m = path.match(/^\/?slide\[(\d+)\](?:\/shape\[(\d+)\])?$/i);
        if (m) {
          const sl = file.slides[parseInt(m[1], 10) - 1];
          const target = m[2] && sl ? sl.shapes[parseInt(m[2], 10) - 1] : sl;
          return { ok: !!target, output: target ? JSON.stringify({ path, ...target }, null, 2) : `Not found: ${path}` };
        }
      }
      return { ok: true, output: JSON.stringify(file, null, 2) };
    }

    if (cmd === 'view') {
      const file = resolveFile(positional[0]);
      if (!file) return { ok: false, output: `File not found: ${positional[0]}` };
      const mode = (positional[1] || 'outline').toLowerCase();
      if (mode === 'json') return { ok: true, output: JSON.stringify(file, null, 2) };
      if (mode === 'outline') return { ok: true, output: getOutlineText(file) };
      if (mode === 'html') return { ok: true, output: '✓ Live HTML preview refreshed', fileChanged: file.name };
    }

    return { ok: false, output: `Unknown command "${cmd}". Type "help" for available commands.` };
  }

  function execScript(scriptText) {
    const lines = String(scriptText || '').split(/\r?\n/);
    const logs = [];
    // Join backslash-continued lines
    const merged = [];
    let buf = '';
    for (const raw of lines) {
      const t = raw.trim();
      if (!t || t.startsWith('#')) continue;
      if (t.endsWith('\\')) {
        buf += t.slice(0, -1) + ' ';
      } else {
        merged.push(buf + t);
        buf = '';
      }
    }
    if (buf.trim()) merged.push(buf.trim());

    for (const cmdLine of merged) {
      if (!/^officecli\b/.test(cmdLine)) continue;
      const res = execCommand(cmdLine);
      logs.push(`$ ${cmdLine}\n${res.output}`);
    }
    return logs.join('\n\n') || 'No officecli commands found in script.';
  }

  function getOutlineText(file) {
    if (!file) return '';
    if (file.type === 'pptx') {
      if (!file.slides.length) return `${file.name} (0 slides)`;
      return file.slides.map((sl, i) => {
        const lines = [`Slide ${i + 1}: ${sl.title || '(Untitled)'} [bg:#${normHex(sl.background, 'FFFFFF')}]`];
        (sl.shapes || []).forEach((sh, j) => {
          if (sh.type === 'table') lines.push(`  Shape ${j + 1} [Table]: ${sh.rows.length} rows`);
          else lines.push(`  Shape ${j + 1} [TextBox]: ${sh.text}`);
        });
        return lines.join('\n');
      }).join('\n');
    }
    if (file.type === 'docx') {
      if (!file.blocks.length) return `${file.name} (empty document)`;
      return file.blocks.map((b, i) => {
        if (b.type === 'heading') return `Block ${i + 1} [H${b.level}]: ${b.text}`;
        if (b.type === 'list') return `Block ${i + 1} [${b.ordered ? 'Ordered' : 'Bullet'} List]: ${b.items.length} items`;
        if (b.type === 'table') return `Block ${i + 1} [Table]: ${b.rows.length} rows`;
        if (b.type === 'pagebreak') return `Block ${i + 1} [Page Break]`;
        return `Block ${i + 1} [Paragraph]: ${b.text}`;
      }).join('\n');
    }
    if (file.type === 'xlsx') {
      return file.sheets.map((sh, i) => {
        const keys = Object.keys(sh.cells || {});
        return `Sheet ${i + 1} "${sh.name}": ${keys.length} populated cells (${keys.slice(0, 8).join(', ')}${keys.length > 8 ? '...' : ''})`;
      }).join('\n');
    }
    return '';
  }

  function exportBinary(fileName) {
    const file = resolveFile(fileName || vfs.activeFile);
    if (!file) throw new Error('No active file');
    if (file.type === 'pptx') return exportPptx(file);
    if (file.type === 'docx') return exportDocx(file);
    if (file.type === 'xlsx') return exportXlsx(file);
    throw new Error('Unsupported type');
  }

  global.OfficeCLIEngine = {
    getVfs: () => vfs,
    saveVfs,
    resetVfs: () => { vfs = createDefaultVfs(); saveVfs(); return vfs; },
    setActiveFile: (name) => { if (vfs.files[name]) { vfs.activeFile = name; saveVfs(); } },
    deleteFile: (name) => {
      delete vfs.files[name];
      const keys = Object.keys(vfs.files);
      vfs.activeFile = keys[0] || null;
      saveVfs();
    },
    addImportedFile: (doc) => {
      vfs.files[doc.name] = doc;
      vfs.activeFile = doc.name;
      saveVfs();
    },
    execCommand,
    execScript,
    getOutlineText,
    evalExcelFormula,
    exportBinary,
    importOfficeFile,
    normHex,
    parseCellRef,
    indexToCol
  };
})(window);
