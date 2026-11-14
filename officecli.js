// OfficeCLI (iOfficeAI/OfficeCLI) — Interactive Live Studio + Docs, 11 AI Skills, and 30 Word/Excel/PowerPoint Examples
(function () {
  const ITEMS = [
    // Core Docs
    {
      id: 'readme', group: 'core', chunk: 'core', badge: 'CORE',
      en: 'OfficeCLI Overview & Documentation', vi: 'Tổng Quan & Tài Liệu OfficeCLI',
      desc: { en: 'Architecture, 30-second live preview, Word/Excel/PowerPoint capabilities, and installation.', vi: 'Kiến trúc, xem trước trực tiếp 30 giây, tính năng Word/Excel/PowerPoint và cài đặt.' },
      ghPath: 'README.md'
    },
    {
      id: 'skill', group: 'core', chunk: 'core', badge: 'SKILL',
      en: 'Master SKILL.md (Agent Command Reference)', vi: 'Master SKILL.md (Tham Chiếu Lệnh cho Agent)',
      desc: { en: 'Complete CLI command specification, path selectors, properties, and agent workflow.', vi: 'Đặc tả đầy đủ lệnh CLI, bộ chọn đường dẫn, thuộc tính và quy trình cho AI Agent.' },
      ghPath: 'SKILL.md'
    },
    {
      id: 'examples_readme', group: 'core', chunk: 'core', badge: 'GUIDE',
      en: 'Examples Index & Workflow Guide', vi: 'Hướng Dẫn & Danh Mục Ví Dụ',
      desc: { en: 'How to run CLI (.sh) and Python (.py) examples across Word, Excel, and PowerPoint.', vi: 'Cách chạy các ví dụ CLI (.sh) và Python (.py) cho Word, Excel và PowerPoint.' },
      ghPath: 'examples/README.md'
    },

    // 11 AI Agent Skills
    { id: 'officecli', group: 'skills', chunk: 'skills', badge: 'SKILL', en: 'officecli — Universal Office Skill', vi: 'officecli — Kỹ Năng Office Tổng Quát', desc: { en: 'Core agent skill for creating, reading, and editing .docx, .xlsx, and .pptx files.', vi: 'Kỹ năng cốt lõi giúp AI Agent tạo, đọc và chỉnh sửa .docx, .xlsx, .pptx.' }, ghPath: 'skills/officecli/SKILL.md' },
    { id: 'officecli-docx', group: 'skills', chunk: 'skills', badge: 'DOCX', en: 'officecli-docx — Word Document Skill', vi: 'officecli-docx — Kỹ Năng Soạn Thảo Word', desc: { en: 'Structured Word documents: headings, tables, styles, headers, footers, and revisions.', vi: 'Tài liệu Word chuyên nghiệp: tiêu đề, bảng biểu, style, header/footer và theo dõi sửa đổi.' }, ghPath: 'skills/officecli-docx/SKILL.md' },
    { id: 'officecli-xlsx', group: 'skills', chunk: 'skills', badge: 'XLSX', en: 'officecli-xlsx — Excel Spreadsheet Skill', vi: 'officecli-xlsx — Kỹ Năng Bảng Tính Excel', desc: { en: 'Formulas, dynamic arrays, formatting, charts, pivot tables, and validation.', vi: 'Công thức, mảng động, định dạng, biểu đồ, Pivot Table và xác thực dữ liệu.' }, ghPath: 'skills/officecli-xlsx/SKILL.md' },
    { id: 'officecli-pptx', group: 'skills', chunk: 'skills', badge: 'PPTX', en: 'officecli-pptx — PowerPoint Slide Skill', vi: 'officecli-pptx — Kỹ Năng Thuyết Trình PowerPoint', desc: { en: 'Slide layouts, shapes, typography, charts, themes, and visual QA rendering.', vi: 'Bố cục slide, hình khối, chữ, biểu đồ, theme và kiểm tra hiển thị trực quan.' }, ghPath: 'skills/officecli-pptx/SKILL.md' },
    { id: 'morph-ppt', group: 'skills', chunk: 'skills', badge: 'MORPH', en: 'morph-ppt — Cinematic Morph Presentations', vi: 'morph-ppt — Thuyết Trình Hiệu Ứng Morph', desc: { en: 'Smooth object-tracking Morph transitions between slides with visual storytelling.', vi: 'Chuyển cảnh Morph mượt mà theo dõi đối tượng giữa các slide.' }, ghPath: 'skills/morph-ppt/SKILL.md' },
    { id: 'morph-ppt-3d', group: 'skills', chunk: 'skills', badge: '3D', en: 'morph-ppt-3d — 3D Model Morph Slides', vi: 'morph-ppt-3d — Slide 3D Model & Morph', desc: { en: 'Embedding .glb 3D models with multi-angle camera rotations across Morph slides.', vi: 'Chèn mô hình 3D (.glb) và xoay góc nhìn đa chiều qua hiệu ứng Morph.' }, ghPath: 'skills/morph-ppt-3d/SKILL.md' },
    { id: 'officecli-academic-paper', group: 'skills', chunk: 'skills', badge: 'WORD', en: 'officecli-academic-paper — Academic Paper', vi: 'officecli-academic-paper — Bài Báo Khoa Học', desc: { en: 'Publication-ready academic papers with equations, citations, figures, and sections.', vi: 'Bài báo học thuật chuẩn xuất bản với công thức toán, trích dẫn và mục lục.' }, ghPath: 'skills/officecli-academic-paper/SKILL.md' },
    { id: 'officecli-data-dashboard', group: 'skills', chunk: 'skills', badge: 'EXCEL', en: 'officecli-data-dashboard — Excel Dashboard', vi: 'officecli-data-dashboard — Dashboard Dữ Liệu', desc: { en: 'KPI cards, slicers, sparklines, and multi-chart executive dashboards in Excel.', vi: 'Thẻ KPI, slicer, sparkline và bảng điều khiển đa biểu đồ trong Excel.' }, ghPath: 'skills/officecli-data-dashboard/SKILL.md' },
    { id: 'officecli-financial-model', group: 'skills', chunk: 'skills', badge: 'FINANCE', en: 'officecli-financial-model — Financial Model', vi: 'officecli-financial-model — Mô Hình Tài Chính', desc: { en: 'Three-statement models, DCF, sensitivity tables, and institutional formatting.', vi: 'Mô hình tài chính 3 báo cáo, DCF, bảng độ nhạy và định dạng chuẩn tài chính.' }, ghPath: 'skills/officecli-financial-model/SKILL.md' },
    { id: 'officecli-pitch-deck', group: 'skills', chunk: 'skills', badge: 'DECK', en: 'officecli-pitch-deck — Investor Pitch Deck', vi: 'officecli-pitch-deck — Pitch Deck Gọi Vốn', desc: { en: 'High-impact startup pitch decks with narrative flow, metrics, and clean visuals.', vi: 'Bộ slide gọi vốn chuyên nghiệp với mạch kể chuyện, số liệu và bố cục sắc nét.' }, ghPath: 'skills/officecli-pitch-deck/SKILL.md' },
    { id: 'officecli-word-form', group: 'skills', chunk: 'skills', badge: 'FORM', en: 'officecli-word-form — Interactive Word Forms', vi: 'officecli-word-form — Biểu Mẫu Word Tương Tác', desc: { en: 'Content controls (SDTs), checkboxes, dropdowns, date pickers, and fillable forms.', vi: 'Content control (SDT), checkbox, dropdown, chọn ngày và biểu mẫu điền sẵn.' }, ghPath: 'skills/officecli-word-form/SKILL.md' },

    // Word Examples (14)
    { id: 'document-formatting', group: 'word', chunk: 'word', badge: 'DOCX', en: 'Document Formatting & Margins', vi: 'Định Dạng Trang & Lề Tài Liệu', desc: { en: 'Page size, margins, background color, and document-level defaults.', vi: 'Khổ giấy, căn lề, màu nền trang và thiết lập mặc định.' }, ghPath: 'examples/word/document-formatting.md' },
    { id: 'paragraph-formatting', group: 'word', chunk: 'word', badge: 'DOCX', en: 'Paragraph Formatting & Alignment', vi: 'Định Dạng Đoạn Văn & Căn Lề', desc: { en: 'Spacing, indentation, borders, shading, keepNext, and tabs.', vi: 'Giãn dòng, thụt lề, viền khung, tô nền và điểm dừng tab.' }, ghPath: 'examples/word/paragraph-formatting.md' },
    { id: 'run-formatting', group: 'word', chunk: 'word', badge: 'DOCX', en: 'Run & Character Styling', vi: 'Định Dạng Ký Tự & Font Chữ', desc: { en: 'Fonts, colors, bold/italic/underline, highlights, and script slots.', vi: 'Font chữ, màu sắc, in đậm/nghiêng/gạch chân và tô sáng.' }, ghPath: 'examples/word/run-formatting.md' },
    { id: 'numbering', group: 'word', chunk: 'word', badge: 'DOCX', en: 'Lists & Multi-Level Numbering', vi: 'Danh Sách & Đánh Số Đa Cấp', desc: { en: 'Bulleted lists, numbered outlines, and custom multi-level hierarchies.', vi: 'Danh sách dấu đầu dòng, đánh số và phân cấp đa tầng.' }, ghPath: 'examples/word/numbering.md' },
    { id: 'tables', group: 'word', chunk: 'word', badge: 'DOCX', en: 'Word Tables & Cell Merging', vi: 'Bảng Biểu Word & Gộp Ô', desc: { en: 'Creating tables, styling borders/shading, merging cells, and column widths.', vi: 'Tạo bảng, viền, tô màu ô, gộp ô và căn chỉnh độ rộng cột.' }, ghPath: 'examples/word/tables.md' },
    { id: 'sections', group: 'word', chunk: 'word', badge: 'DOCX', en: 'Sections, Headers & Footers', vi: 'Phân Đoạn, Header & Footer', desc: { en: 'Multi-section layouts, landscape/portrait mixing, and running headers.', vi: 'Nhiều section, trộn trang ngang/dọc và tiêu đề đầu/cuối trang.' }, ghPath: 'examples/word/sections.md' },
    { id: 'pictures', group: 'word', chunk: 'word', badge: 'DOCX', en: 'Pictures & Inline/Floating Images', vi: 'Chèn Ảnh & Căn Chỉnh Hình Ảnh', desc: { en: 'Inserting PNG/JPG/SVG images with sizing, wrapping, and captions.', vi: 'Chèn ảnh PNG/JPG/SVG với kích thước, ngắt chữ và chú thích.' }, ghPath: 'examples/word/pictures.md' },
    { id: 'textbox', group: 'word', chunk: 'word', badge: 'DOCX', en: 'Textboxes & Floating Callouts', vi: 'Hộp Văn Bản (Textbox) & Khung Nổi', desc: { en: 'Positioned textboxes with rotation, gradients, shadows, and opacity.', vi: 'Textbox định vị tự do với xoay góc, chuyển sắc, đổ bóng và độ mờ.' }, ghPath: 'examples/word/textbox.md' },
    { id: 'charts', group: 'word', chunk: 'word', badge: 'DOCX', en: 'Embedded Charts in Word', vi: 'Biểu Đồ Nhúng Trong Word', desc: { en: 'Bar, line, and pie charts embedded directly in Word documents.', vi: 'Biểu đồ cột, đường, tròn nhúng trực tiếp trong văn bản Word.' }, ghPath: 'examples/word/charts.md' },
    { id: 'diagram', group: 'word', chunk: 'word', badge: 'DOCX', en: 'Mermaid Diagrams in Word', vi: 'Sơ Đồ Mermaid Trong Word', desc: { en: 'Converting Mermaid syntax into native editable shapes or PNGs.', vi: 'Chuyển cú pháp Mermaid thành hình khối chỉnh sửa được hoặc PNG.' }, ghPath: 'examples/word/diagram.md' },
    { id: 'formulas', group: 'word', chunk: 'word', badge: 'DOCX', en: 'LaTeX Equations & Math', vi: 'Công Thức Toán Học LaTeX', desc: { en: 'Rendering LaTeX math expressions into native Word OMML equations.', vi: 'Biên dịch biểu thức LaTeX thành công thức toán OMML chuẩn Word.' }, ghPath: 'examples/word/formulas.md' },
    { id: 'fields', group: 'word', chunk: 'word', badge: 'DOCX', en: 'Dynamic Fields & Page Numbers', vi: 'Trường Động (Fields) & Số Trang', desc: { en: 'PAGE, NUMPAGES, DATE, TOC, MERGEFIELD, REF, and conditional IF fields.', vi: 'Số trang, ngày tháng, mục lục tự động, trộn thư và trường điều kiện.' }, ghPath: 'examples/word/fields.md' },
    { id: 'content-controls', group: 'word', chunk: 'word', badge: 'DOCX', en: 'Content Controls (SDT)', vi: 'Điều Khiển Nội Dung (SDT)', desc: { en: 'Structured document tags for rich text, checkboxes, and dropdown lists.', vi: 'Thẻ cấu trúc tài liệu cho hộp kiểm, danh sách thả xuống và biểu mẫu.' }, ghPath: 'examples/word/content-controls.md' },
    { id: 'revisions', group: 'word', chunk: 'word', badge: 'DOCX', en: 'Tracked Changes & Revisions', vi: 'Theo Dõi Thay Đổi (Track Changes)', desc: { en: 'Creating, inspecting, accepting, and rejecting tracked insertions/deletions.', vi: 'Tạo, kiểm tra, chấp nhận hoặc từ chối các chỉnh sửa được theo dõi.' }, ghPath: 'examples/word/revisions.md' },

    // Excel Examples (10)
    { id: 'workbook-settings', group: 'excel', chunk: 'excel', badge: 'XLSX', en: 'Workbook Settings & Properties', vi: 'Thiết Lập Workbook & Thuộc Tính', desc: { en: 'Workbook metadata, calculation mode, defined names, and global defaults.', vi: 'Metadata workbook, chế độ tính toán và tên vùng định nghĩa.' }, ghPath: 'examples/excel/workbook-settings.md' },
    { id: 'sheet-settings', group: 'excel', chunk: 'excel', badge: 'XLSX', en: 'Worksheet Views, Freeze & Print', vi: 'Thiết Lập Trang Tính, Cố Định & In Ấn', desc: { en: 'Freeze panes, gridlines, print margins, hidden sheets, and RTL views.', vi: 'Cố định dòng/cột, đường lưới, lề in, ẩn sheet và chế độ RTL.' }, ghPath: 'examples/excel/sheet-settings.md' },
    { id: 'cell-formatting', group: 'excel', chunk: 'excel', badge: 'XLSX', en: 'Cell Formatting, Number Formats & Borders', vi: 'Định Dạng Ô, Số & Đường Viền', desc: { en: 'Currency/percentage formats, fonts, fills, alignment, and merges.', vi: 'Định dạng tiền tệ/phần trăm, font, tô nền, căn lề và gộp ô.' }, ghPath: 'examples/excel/cell-formatting.md' },
    { id: 'conditional-formatting', group: 'excel', chunk: 'excel', badge: 'XLSX', en: 'Conditional Formatting Rules', vi: 'Định Dạng Có Điều Kiện', desc: { en: 'Color scales, data bars, icon sets, and formula-driven highlights.', vi: 'Thang màu, thanh dữ liệu, bộ biểu tượng và tô sáng theo công thức.' }, ghPath: 'examples/excel/conditional-formatting.md' },
    { id: 'data-validation', group: 'excel', chunk: 'excel', badge: 'XLSX', en: 'Data Validation & Dropdowns', vi: 'Xác Thực Dữ Liệu & Danh Sách Chọn', desc: { en: 'Dropdown lists, numeric bounds, date ranges, and input/error alerts.', vi: 'Danh sách thả xuống, giới hạn số/ngày và thông báo lỗi nhập liệu.' }, ghPath: 'examples/excel/data-validation.md' },
    { id: 'charts', group: 'excel', chunk: 'excel', badge: 'XLSX', en: 'Excel Charts & Visualizations', vi: 'Biểu Đồ Excel & Trực Quan Hóa', desc: { en: 'Column, line, pie, scatter, pareto, and box-whisker charts.', vi: 'Biểu đồ cột, đường, tròn, phân tán, pareto và hộp râu.' }, ghPath: 'examples/excel/charts.md' },
    { id: 'pivot-tables', group: 'excel', chunk: 'excel', badge: 'XLSX', en: 'Pivot Tables & Aggregations', vi: 'Pivot Table & Tổng Hợp Dữ Liệu', desc: { en: 'Multi-field pivot tables, date grouping, calculated fields, and filters.', vi: 'Pivot table đa trường, nhóm ngày tháng, trường tính toán và bộ lọc.' }, ghPath: 'examples/excel/pivot-tables.md' },
    { id: 'slicers', group: 'excel', chunk: 'excel', badge: 'XLSX', en: 'Interactive Slicers', vi: 'Bộ Lọc Trực Quan (Slicers)', desc: { en: 'Adding and styling slicers connected to tables and pivot tables.', vi: 'Thêm và tùy chỉnh Slicer kết nối với bảng dữ liệu và Pivot Table.' }, ghPath: 'examples/excel/slicers.md' },
    { id: 'sparklines', group: 'excel', chunk: 'excel', badge: 'XLSX', en: 'In-Cell Sparklines', vi: 'Biểu Đồ Thu Nhỏ (Sparklines)', desc: { en: 'Line, column, and win/loss sparklines inside spreadsheet cells.', vi: 'Biểu đồ đường, cột và thắng/thua thu nhỏ ngay trong ô tính.' }, ghPath: 'examples/excel/sparklines.md' },
    { id: 'shapes', group: 'excel', chunk: 'excel', badge: 'XLSX', en: 'Shapes & Callouts in Excel', vi: 'Hình Khối & Chú Thích Trong Excel', desc: { en: 'Floating shapes, connectors, and styled callout boxes on worksheets.', vi: 'Hình khối, đường nối và hộp chú thích trên trang tính Excel.' }, ghPath: 'examples/excel/shapes.md' },

    // PowerPoint Examples (6)
    { id: 'presentation', group: 'ppt', chunk: 'ppt', badge: 'PPTX', en: 'Full Presentation Creation', vi: 'Tạo Bài Thuyết Trình Hoàn Chỉnh', desc: { en: 'Multi-slide deck with themes, typography, cards, tables, and charts.', vi: 'Bộ slide hoàn chỉnh với theme, chữ, thẻ nội dung, bảng và biểu đồ.' }, ghPath: 'examples/ppt/presentation.md' },
    { id: 'presentation-settings', group: 'ppt', chunk: 'ppt', badge: 'PPTX', en: 'Slide Size, Masters & Settings', vi: 'Kích Thước Slide, Master & Thiết Lập', desc: { en: '16:9 / 4:3 dimensions, slide masters, layouts, and footer toggles.', vi: 'Tỷ lệ 16:9 / 4:3, slide master, bố cục và bật/tắt chân trang.' }, ghPath: 'examples/ppt/presentation-settings.md' },
    { id: 'animations', group: 'ppt', chunk: 'ppt', badge: 'PPTX', en: 'Slide Animations & Transitions', vi: 'Hiệu Ứng Động & Chuyển Cảnh Slide', desc: { en: 'Entrance, emphasis, exit presets, motion paths, and Morph transitions.', vi: 'Hiệu ứng xuất hiện, nhấn mạnh, thoát, đường dẫn chuyển động và Morph.' }, ghPath: 'examples/ppt/animations.md' },
    { id: 'diagram', group: 'ppt', chunk: 'ppt', badge: 'PPTX', en: 'Mermaid Diagrams on Slides', vi: 'Sơ Đồ Mermaid Trên Slide', desc: { en: 'Flowcharts and sequence diagrams rendered as native editable PPT shapes.', vi: 'Lưu đồ và sơ đồ tuần tự dựng thành hình khối PowerPoint chỉnh sửa được.' }, ghPath: 'examples/ppt/diagram.md' },
    { id: '3d-model', group: 'ppt', chunk: 'ppt', badge: 'PPTX', en: '3D Models (.glb) on Slides', vi: 'Mô Hình 3D (.glb) Trên Slide', desc: { en: 'Inserting 3D .glb assets with 3-axis camera rotation and Morph animation.', vi: 'Chèn mô hình 3D .glb với góc xoay 3 trục và hiệu ứng chuyển cảnh Morph.' }, ghPath: 'examples/ppt/3d-model.md' },
    { id: 'video', group: 'ppt', chunk: 'ppt', badge: 'PPTX', en: 'Video & Audio Media on Slides', vi: 'Video & Âm Thanh Trên Slide', desc: { en: 'Embedding video/audio with autoplay, loop, and poster frames.', vi: 'Nhúng video/âm thanh với tự động phát, lặp lại và ảnh bìa.' }, ghPath: 'examples/ppt/video.md' }
  ];

  const UI = {
    en: {
      title: 'OfficeCLI — Interactive Office Suite',
      subtitle: 'Create, edit, preview, and export real Word (.docx), Excel (.xlsx), and PowerPoint (.pptx) files directly in your browser using OfficeCLI commands or the visual builder.',
      modeStudio: '⚡ Live OfficeCLI Studio',
      modeLibrary: '📚 Docs, 11 Skills & 30 Examples',
      ghBtn: 'GitHub ↗',
      siteBtn: 'officecli.ai ↗',
      newPptx: '+ New .pptx',
      newDocx: '+ New .docx',
      newXlsx: '+ New .xlsx',
      uploadBtn: '↑ Upload File',
      downloadBtn: '↓ Download',
      resetBtn: '↺ Reset Demo',
      deleteFileBtn: 'Delete',
      toolBuilder: 'Visual Builder',
      toolTerminal: 'CLI Terminal',
      toolScript: 'Script Runner',
      toolOutline: 'Outline & JSON',
      previewTitle: 'Live HTML Preview',
      runCmdBtn: 'Run',
      runScriptBtn: '▶ Execute Script',
      runInStudioBtn: '▶ Run in Studio',
      clearLogBtn: 'Clear Log',
      cmdPlaceholder: 'Type command, e.g. officecli add q4_deck.pptx / --type slide --prop title="Hello"',
      quickTitle: 'Quick Install & 30-Second Live Preview',
      copyBtn: 'Copy',
      copiedBtn: 'Copied ✓',
      searchPlaceholder: 'Search docs, skills, or Word/Excel/PPT examples...',
      cats: { all: 'All (44)', core: 'Core & Docs (3)', skills: 'AI Skills (11)', word: 'Word .docx (14)', excel: 'Excel .xlsx (10)', ppt: 'PowerPoint .pptx (6)' },
      readBtn: 'Open Reader →',
      backBtn: '← Back to OfficeCLI Hub',
      prevBtn: '← Previous',
      nextBtn: 'Next →',
      ghSource: 'View on GitHub ↗',
      loading: 'Loading OfficeCLI module...',
      tabMd: 'Guide (.md)',
      tabSh: 'CLI (.sh)',
      tabPy: 'Python (.py)',
      noCode: 'No script available for this item.',
      emptySearch: 'No matching items found.'
    },
    vi: {
      title: 'OfficeCLI — Trình Tạo & Chỉnh Sửa Office Trực Tiếp',
      subtitle: 'Tạo, chỉnh sửa, xem trước trực tiếp và tải về file Word (.docx), Excel (.xlsx), PowerPoint (.pptx) thật ngay trên trình duyệt bằng lệnh OfficeCLI hoặc trình tạo trực quan.',
      modeStudio: '⚡ OfficeCLI Studio Trực Tiếp',
      modeLibrary: '📚 Tài Liệu, 11 Kỹ Năng & 30 Ví Dụ',
      ghBtn: 'GitHub ↗',
      siteBtn: 'officecli.ai ↗',
      newPptx: '+ Tạo .pptx',
      newDocx: '+ Tạo .docx',
      newXlsx: '+ Tạo .xlsx',
      uploadBtn: '↑ Tải File Lên',
      downloadBtn: '↓ Tải Về Máy',
      resetBtn: '↺ Khôi Phục Mẫu',
      deleteFileBtn: 'Xóa',
      toolBuilder: 'Tạo Trực Quan',
      toolTerminal: 'Dòng Lệnh CLI',
      toolScript: 'Chạy Script',
      toolOutline: 'Cấu Trúc & JSON',
      previewTitle: 'Xem Trước HTML Trực Tiếp',
      runCmdBtn: 'Chạy',
      runScriptBtn: '▶ Chạy Script',
      runInStudioBtn: '▶ Chạy Trong Studio',
      clearLogBtn: 'Xóa Log',
      cmdPlaceholder: 'Nhập lệnh, VD: officecli add q4_deck.pptx / --type slide --prop title="Xin chào"',
      quickTitle: 'Cài Đặt Nhanh & Xem Trước Trực Tiếp Trong 30 Giây',
      copyBtn: 'Sao chép',
      copiedBtn: 'Đã chép ✓',
      searchPlaceholder: 'Tìm tài liệu, kỹ năng AI hoặc ví dụ Word/Excel/PPT...',
      cats: { all: 'Tất cả (44)', core: 'Tài liệu gốc (3)', skills: 'Kỹ năng AI (11)', word: 'Word .docx (14)', excel: 'Excel .xlsx (10)', ppt: 'PowerPoint .pptx (6)' },
      readBtn: 'Mở Trình Đọc →',
      backBtn: '← Quay lại OfficeCLI',
      prevBtn: '← Trước',
      nextBtn: 'Tiếp →',
      ghSource: 'Xem trên GitHub ↗',
      loading: 'Đang tải dữ liệu OfficeCLI...',
      tabMd: 'Hướng dẫn (.md)',
      tabSh: 'Lệnh CLI (.sh)',
      tabPy: 'Mã Python (.py)',
      noCode: 'Mục này không có script đính kèm.',
      emptySearch: 'Không tìm thấy mục phù hợp.'
    }
  };

  let state = {
    lang: 'en',
    mode: 'studio', // 'studio' | 'library'
    studioTab: 'builder', // 'builder' | 'terminal' | 'script' | 'outline'
    activeSlideIdx: 0,
    activeSheetIdx: 0,
    selectedCellRef: null,
    terminalLog: [
      'OfficeCLI In-Browser Studio ready. Active workspace loaded.',
      'Tip: Type "help" or use the Visual Builder to edit & export real .pptx, .docx, and .xlsx files.'
    ],
    cmdHistory: [],
    historyIdx: -1,
    scriptDraft: `officecli create launch_deck.pptx
officecli add launch_deck.pptx / --type slide --prop title="Product Launch 2026" --prop background=1A1A2E
officecli add launch_deck.pptx "/slide[1]" --type shape --prop text="Built directly inside the browser with OfficeCLI" --prop color=FAF7F2 --prop size=22 --prop bold=true
officecli add launch_deck.pptx / --type slide --prop title="Key Metrics" --prop background=FAF7F2
officecli add launch_deck.pptx "/slide[2]" --type table --prop data="Metric,Q1,Q2;Users,12000,28500;Revenue,$45K,$112K"`,
    category: 'all',
    search: '',
    activeItemKey: null,
    codeTab: 'md',
    installTab: 'unix'
  };

  const loadedChunks = {};

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
    s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<span class="cs-img-caption">[Image: $1]</span>');
    s = s.replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1 ↗</a>');
    s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<span>$1</span>');
    return s;
  }

  function markdownToHtml(md) {
    if (!md) return '';
    let cleaned = md.replace(/^---\n[\s\S]*?\n---\n*/, '');
    const lines = cleaned.replace(/\r\n/g, '\n').split('\n');
    let html = '';
    let inCode = false;
    let codeLang = '';
    let codeBuf = [];
    let inList = false;
    let listTag = 'ul';
    let inTable = false;
    let tableRows = [];

    function flushList() {
      if (inList) { html += `</${listTag}>`; inList = false; }
    }
    function flushTable() {
      if (!inTable || !tableRows.length) { inTable = false; tableRows = []; return; }
      html += '<div style="overflow-x:auto; margin:1rem 0;"><table class="cipher-table"><thead><tr>';
      const headers = tableRows[0].split('|').map(c => c.trim()).filter((_, idx, arr) => !(idx === 0 && _ === '') && !(idx === arr.length - 1 && _ === ''));
      headers.forEach(h => { html += `<th>${renderInlineMd(h)}</th>`; });
      html += '</tr></thead><tbody>';
      for (let i = 1; i < tableRows.length; i++) {
        if (/^\|?[\s:-]+\|/.test(tableRows[i])) continue;
        const cols = tableRows[i].split('|').map(c => c.trim()).filter((_, idx, arr) => !(idx === 0 && _ === '') && !(idx === arr.length - 1 && _ === ''));
        if (!cols.length) continue;
        html += '<tr>' + cols.map(c => `<td>${renderInlineMd(c)}</td>`).join('') + '</tr>';
      }
      html += '</tbody></table></div>';
      inTable = false;
      tableRows = [];
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.trim().startsWith('```')) {
        flushList();
        flushTable();
        if (!inCode) {
          inCode = true;
          codeLang = line.trim().slice(3).trim();
          codeBuf = [];
        } else {
          inCode = false;
          const langLabel = codeLang ? `<div class="cs-code-lang">${escapeHtml(codeLang)}</div>` : '';
          html += `<div class="cs-code-block">${langLabel}<pre><code>${escapeHtml(codeBuf.join('\n'))}</code></pre></div>`;
        }
        continue;
      }
      if (inCode) { codeBuf.push(line); continue; }

      const trimmed = line.trim();
      if (!trimmed) { flushList(); flushTable(); continue; }

      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        flushList();
        inTable = true;
        tableRows.push(trimmed);
        continue;
      } else {
        flushTable();
      }

      if (/^#{1,6}\s+/.test(trimmed)) {
        flushList();
        const level = trimmed.match(/^(#{1,6})\s+/)[1].length;
        const text = trimmed.replace(/^#{1,6}\s+/, '');
        const tag = level <= 2 ? 'h2' : level === 3 ? 'h3' : 'h4';
        html += `<${tag}>${renderInlineMd(text)}</${tag}>`;
        continue;
      }

      if (/^---+$/.test(trimmed)) {
        flushList();
        html += '<hr style="border:none; border-top:1px solid var(--border-hairline); margin:1.2rem 0;" />';
        continue;
      }

      if (trimmed.startsWith('>')) {
        flushList();
        html += `<blockquote class="cs-blockquote">${renderInlineMd(trimmed.replace(/^>\s?/, ''))}</blockquote>`;
        continue;
      }

      if (/^[-*+]\s+/.test(trimmed)) {
        if (!inList || listTag !== 'ul') { flushList(); listTag = 'ul'; html += '<ul>'; inList = true; }
        html += `<li>${renderInlineMd(trimmed.replace(/^[-*+]\s+/, ''))}</li>`;
        continue;
      }

      if (/^\d+\.\s+/.test(trimmed)) {
        if (!inList || listTag !== 'ol') { flushList(); listTag = 'ol'; html += '<ol>'; inList = true; }
        html += `<li>${renderInlineMd(trimmed.replace(/^\d+\.\s+/, ''))}</li>`;
        continue;
      }

      if (/^<\/?(table|tr|td|p|img|a|strong|em)[\s>]/i.test(trimmed) && !trimmed.startsWith('<a href')) {
        continue;
      }

      flushList();
      html += `<p>${renderInlineMd(trimmed)}</p>`;
    }
    flushList();
    flushTable();
    return html;
  }

  function loadChunk(chunkName) {
    if (loadedChunks[chunkName]) return Promise.resolve();
    if (window.OFFICECLI_DATA && window.OFFICECLI_DATA[chunkName]) {
      loadedChunks[chunkName] = true;
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = `officecli_data/${chunkName}.js`;
      s.onload = () => { loadedChunks[chunkName] = true; resolve(); };
      s.onerror = () => reject(new Error('Failed to load ' + chunkName));
      document.head.appendChild(s);
    });
  }

  function getInstallSnippet(mode) {
    if (mode === 'unix') {
      return `# macOS / Linux\ncurl -fsSL https://raw.githubusercontent.com/iOfficeAI/OfficeCLI/main/install.sh | bash\nofficecli install\n\n# 30-second live preview\nofficecli create deck.pptx\nofficecli watch deck.pptx\nofficecli add deck.pptx / --type slide --prop title="Hello, World!"`;
    }
    if (mode === 'win') {
      return `# Windows (PowerShell)\nirm https://raw.githubusercontent.com/iOfficeAI/OfficeCLI/main/install.ps1 | iex\nofficecli install\n\n# Or via Scoop\nscoop install officecli`;
    }
    if (mode === 'pkg') {
      return `# Homebrew (macOS / Linux)\nbrew install officecli\n\n# npm (All Platforms)\nnpm install -g @officecli/officecli\n\n# AI Agent Skill One-Liner\ncurl -fsSL https://officecli.ai/SKILL.md`;
    }
    return '';
  }

  function copyText(text, btn) {
    if (!navigator.clipboard) return;
    navigator.clipboard.writeText(text).then(() => {
      const L = UI[state.lang] || UI.en;
      const orig = btn.textContent;
      btn.textContent = L.copiedBtn;
      setTimeout(() => { btn.textContent = orig; }, 1400);
    });
  }

  function itemKey(item) {
    return `${item.group}:${item.id}`;
  }

  function openItem(key) {
    state.activeItemKey = key;
    state.codeTab = 'md';
    const item = ITEMS.find(i => itemKey(i) === key);
    if (!item) return;
    const container = document.getElementById('officeCliContainer');
    const L = UI[state.lang] || UI.en;
    container.innerHTML = `<div class="sacred-card" style="text-align:center; padding:3rem;"><p style="color:var(--ink-muted);">${L.loading}</p></div>`;
    loadChunk(item.chunk).then(() => {
      render();
      container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  function runCliLine(line) {
    const E = window.OfficeCLIEngine;
    if (!E) return;
    const trimmed = line.trim();
    if (!trimmed) return;
    state.cmdHistory.unshift(trimmed);
    state.historyIdx = -1;
    if (trimmed === 'clear' || trimmed === 'officecli clear') {
      state.terminalLog = [];
      return;
    }
    const res = E.execCommand(trimmed);
    state.terminalLog.push(`$ ${trimmed}`);
    if (res.output) state.terminalLog.push(res.output);
    if (state.terminalLog.length > 80) state.terminalLog = state.terminalLog.slice(-80);
  }

  function renderPreviewHtml(file) {
    const E = window.OfficeCLIEngine;
    if (!file) {
      return `<div style="padding:2rem; text-align:center; color:var(--ink-muted);">Create or upload a .pptx, .docx, or .xlsx file to preview it here.</div>`;
    }

    if (file.type === 'pptx') {
      const slides = file.slides || [];
      if (!slides.length) {
        return `<div style="padding:2.5rem; text-align:center; color:var(--ink-muted);">0 slides yet. Add a slide using the Visual Builder or run:<br/><code>officecli add ${escapeHtml(file.name)} / --type slide --prop title="Hello"</code></div>`;
      }
      if (state.activeSlideIdx >= slides.length) state.activeSlideIdx = slides.length - 1;
      if (state.activeSlideIdx < 0) state.activeSlideIdx = 0;
      const sl = slides[state.activeSlideIdx];
      const bgHex = '#' + E.normHex(sl.background, 'FFFFFF');
      const r = parseInt(bgHex.slice(1, 3), 16), g = parseInt(bgHex.slice(3, 5), 16), b = parseInt(bgHex.slice(5, 7), 16);
      const isDark = (r * 0.299 + g * 0.587 + b * 0.114) < 128;
      const defColor = isDark ? '#FFFFFF' : '#141413';

      const shapesHtml = (sl.shapes || []).map((sh, idx) => {
        if (sh.type === 'table' && Array.isArray(sh.rows)) {
          const rowsHtml = sh.rows.map((row, rIdx) =>
            `<tr>${row.map(c => rIdx === 0
              ? `<th style="background:#141413; color:#fff; padding:6px 10px; font-size:0.78rem; text-align:left;">${escapeHtml(c)}</th>`
              : `<td style="background:${rIdx % 2 ? '#faf7f2' : '#fff'}; color:#141413; padding:6px 10px; font-size:0.78rem; border-top:1px solid #e4ded2;">${escapeHtml(c)}</td>`
            ).join('')}</tr>`
          ).join('');
          return `<div style="margin-top:0.75rem; overflow-x:auto;"><table style="width:100%; border-collapse:collapse; border:1px solid #e4ded2; border-radius:6px; overflow:hidden;">${rowsHtml}</table></div>`;
        }
        const clr = sh.color ? '#' + E.normHex(sh.color) : defColor;
        const bg = sh.fill ? `background:#${E.normHex(sh.fill)}; padding:6px 10px; border-radius:6px;` : '';
        const sz = Math.max(12, Math.min(34, (parseFloat(sh.size) || 18) * 0.88));
        const fw = sh.bold ? '700' : '400';
        const ta = sh.align || 'left';
        return `<div style="color:${clr}; font-size:${sz}px; font-weight:${fw}; text-align:${ta}; margin-top:0.55rem; line-height:1.35; ${bg}">${escapeHtml(sh.text || '')}</div>`;
      }).join('');

      const pills = slides.map((s, i) =>
        `<button type="button" class="btn-secondary oc-slide-pill ${i === state.activeSlideIdx ? 'active-filter' : ''}" data-sidx="${i}" style="padding:0.2rem 0.6rem; font-size:0.75rem;">Slide ${i + 1}</button>`
      ).join('');

      return `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.75rem;">
          <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">${pills}</div>
          <span style="font-size:0.75rem; color:var(--ink-muted);">16:9 • Slide ${state.activeSlideIdx + 1} / ${slides.length}</span>
        </div>
        <div class="oc-slide-stage" style="background:${bgHex}; color:${defColor};">
          <div style="font-family:var(--font-serif); font-size:1.45rem; font-weight:700; margin-bottom:0.5rem; border-bottom:1px solid ${isDark ? 'rgba(255,255,255,0.14)' : 'rgba(20,20,19,0.1)'}; padding-bottom:0.45rem;">
            ${escapeHtml(sl.title || `Slide ${state.activeSlideIdx + 1}`)}
          </div>
          <div>${shapesHtml || `<p style="opacity:0.6; font-size:0.85rem;">Empty slide — add shapes or tables from the left panel.</p>`}</div>
          <div class="oc-slide-num">${state.activeSlideIdx + 1}</div>
        </div>
      `;
    }

    if (file.type === 'docx') {
      const blocks = file.blocks || [];
      if (!blocks.length) {
        return `<div class="oc-doc-page"><p style="color:var(--ink-muted);">Empty Word document. Add headings, paragraphs, lists, or tables.</p></div>`;
      }
      const bodyHtml = blocks.map(b => {
        if (b.type === 'heading') {
          const tag = b.level === 1 ? 'h1' : b.level === 2 ? 'h2' : 'h3';
          const clr = b.color ? `color:#${E.normHex(b.color)};` : '';
          return `<${tag} style="font-family:var(--font-serif); margin:0.65rem 0 0.35rem; ${clr}">${escapeHtml(b.text)}</${tag}>`;
        }
        if (b.type === 'list') {
          const tag = b.ordered ? 'ol' : 'ul';
          const lis = (b.items || []).map(it => `<li>${escapeHtml(it)}</li>`).join('');
          return `<${tag} style="margin:0.4rem 0 0.6rem 1.35rem;">${lis}</${tag}>`;
        }
        if (b.type === 'table' && Array.isArray(b.rows)) {
          const rowsHtml = b.rows.map((row, rIdx) =>
            `<tr>${row.map(c => rIdx === 0
              ? `<th>${escapeHtml(c)}</th>`
              : `<td>${escapeHtml(c)}</td>`
            ).join('')}</tr>`
          ).join('');
          return `<table class="cipher-table" style="margin:0.75rem 0;">${rowsHtml}</table>`;
        }
        if (b.type === 'pagebreak') {
          return `<div style="border-top:2px dashed var(--border-hairline); margin:1.25rem 0; text-align:center; font-size:0.72rem; color:var(--ink-muted);">— Page Break —</div>`;
        }
        const fw = b.bold ? 'font-weight:700;' : '';
        const fs = b.italic ? 'font-style:italic;' : '';
        const clr = b.color ? `color:#${E.normHex(b.color)};` : '';
        const bg = b.bg ? `background:#${E.normHex(b.bg)}; padding:0.4rem 0.6rem; border-radius:4px;` : '';
        const ta = b.align ? `text-align:${b.align};` : '';
        return `<p style="margin:0.45rem 0; font-size:${Math.max(12, (parseFloat(b.size) || 11) * 1.25)}px; ${fw} ${fs} ${clr} ${bg} ${ta}">${escapeHtml(b.text)}</p>`;
      }).join('');
      return `<div class="oc-doc-page">${bodyHtml}</div>`;
    }

    if (file.type === 'xlsx') {
      const sheets = file.sheets || [];
      if (state.activeSheetIdx >= sheets.length) state.activeSheetIdx = 0;
      const sheet = sheets[state.activeSheetIdx] || { name: 'Sheet1', cells: {} };
      const cells = sheet.cells || {};

      let maxR = 6, maxC = 5;
      Object.keys(cells).forEach(ref => {
        const p = E.parseCellRef(ref);
        if (p) {
          if (p.row + 2 > maxR) maxR = p.row + 2;
          if (p.col + 2 > maxC) maxC = p.col + 2;
        }
      });
      maxR = Math.min(20, maxR);
      maxC = Math.min(10, maxC);

      const sheetTabs = sheets.map((s, i) =>
        `<button type="button" class="btn-secondary oc-sheet-pill ${i === state.activeSheetIdx ? 'active-filter' : ''}" data-shidx="${i}" style="padding:0.2rem 0.65rem; font-size:0.75rem;">${escapeHtml(s.name)}</button>`
      ).join('');

      let headCols = '<th style="width:36px; background:var(--bg-subtle);"></th>';
      for (let c = 0; c < maxC; c++) {
        headCols += `<th style="background:var(--bg-subtle); color:var(--ink-secondary); font-size:0.76rem; text-align:center; padding:4px 8px;">${E.indexToCol(c)}</th>`;
      }

      let rowsHtml = '';
      for (let r = 0; r < maxR; r++) {
        let tds = `<td style="background:var(--bg-subtle); color:var(--ink-muted); font-size:0.74rem; text-align:center; font-weight:600;">${r + 1}</td>`;
        for (let c = 0; c < maxC; c++) {
          const ref = E.indexToCol(c) + (r + 1);
          const cell = cells[ref];
          const displayVal = cell ? (cell.formula ? E.evalExcelFormula(cell.formula, cells) : (cell.value ?? '')) : '';
          const isFormula = cell && cell.formula;
          const bold = cell && cell.bold ? 'font-weight:700; background:var(--bg-cream);' : '';
          const titleAttr = isFormula ? `title="${escapeHtml(cell.formula)}"` : '';
          tds += `<td class="oc-xlsx-cell" data-ref="${ref}" ${titleAttr} style="padding:5px 8px; font-size:0.8rem; border:1px solid var(--border-hairline); min-width:74px; cursor:pointer; ${bold}">${escapeHtml(displayVal)}${isFormula ? '<span style="font-size:0.65rem; color:var(--accent-main); margin-left:3px;">ƒx</span>' : ''}</td>`;
        }
        rowsHtml += `<tr>${tds}</tr>`;
      }

      return `
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.4rem; margin-bottom:0.65rem;">
          <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">${sheetTabs}</div>
          <span style="font-size:0.74rem; color:var(--ink-muted);">Click any cell to edit • Formulas (SUM, AVG, +, -, *, /) live-evaluated</span>
        </div>
        <div style="overflow-x:auto; border:1px solid var(--border-hairline); border-radius:8px; background:#fff;">
          <table class="oc-xlsx-grid" style="width:100%; border-collapse:collapse;">
            <thead><tr>${headCols}</tr></thead>
            <tbody>${rowsHtml}</tbody>
          </table>
        </div>
      `;
    }
    return '';
  }

  function renderStudio(container, L) {
    const E = window.OfficeCLIEngine;
    const vfs = E.getVfs();
    const fileNames = Object.keys(vfs.files);
    const activeFile = vfs.files[vfs.activeFile] || vfs.files[fileNames[0]] || null;
    if (activeFile && vfs.activeFile !== activeFile.name) E.setActiveFile(activeFile.name);

    const fileOptions = fileNames.map(n =>
      `<option value="${escapeHtml(n)}" ${activeFile && n === activeFile.name ? 'selected' : ''}>${escapeHtml(n)} (${vfs.files[n].type.toUpperCase()})</option>`
    ).join('');

    let leftPanelHtml = '';
    if (state.studioTab === 'builder') {
      if (!activeFile) {
        leftPanelHtml = `<p style="color:var(--ink-muted);">Create a new .pptx, .docx, or .xlsx file above to start building.</p>`;
      } else if (activeFile.type === 'pptx') {
        const slideNum = (state.activeSlideIdx || 0) + 1;
        leftPanelHtml = `
          <div class="oc-builder-box">
            <div class="oc-builder-title">1. Add Slide</div>
            <div class="oc-form-row">
              <input id="ocPptSlideTitle" type="text" class="cipher-input oc-sm-input" placeholder="Slide title (e.g. Q4 Overview)" />
              <input id="ocPptSlideBg" type="text" class="cipher-input oc-sm-input" value="1A1A2E" placeholder="Bg hex (e.g. 1A1A2E or FAF7F2)" style="max-width:130px;" />
              <button type="button" id="ocBtnAddSlide" class="btn-primary oc-sm-btn">+ Add Slide</button>
            </div>
          </div>
          <div class="oc-builder-box">
            <div class="oc-builder-title">2. Add TextBox to Slide ${slideNum}</div>
            <div class="oc-form-row">
              <input id="ocPptShapeText" type="text" class="cipher-input oc-sm-input" placeholder="Text content..." />
              <input id="ocPptShapeColor" type="text" class="cipher-input oc-sm-input" value="FFFFFF" placeholder="Color hex" style="max-width:105px;" />
              <input id="ocPptShapeSize" type="number" class="cipher-input oc-sm-input" value="20" min="10" max="60" style="max-width:75px;" title="Font size (pt)" />
              <button type="button" id="ocBtnAddShape" class="btn-primary oc-sm-btn">+ Add Text</button>
            </div>
          </div>
          <div class="oc-builder-box">
            <div class="oc-builder-title">3. Add Table to Slide ${slideNum}</div>
            <div class="oc-form-row">
              <input id="ocPptTableData" type="text" class="cipher-input oc-sm-input" value="Item,Q1,Q2;Sales,120,180;Growth,+15%,+50%" placeholder="Row1Col1,Row1Col2;Row2Col1,Row2Col2" />
              <button type="button" id="ocBtnAddPptTable" class="btn-secondary oc-sm-btn">+ Add Table</button>
            </div>
          </div>
        `;
      } else if (activeFile.type === 'docx') {
        leftPanelHtml = `
          <div class="oc-builder-box">
            <div class="oc-builder-title">1. Add Heading</div>
            <div class="oc-form-row">
              <select id="ocDocHeadingLvl" class="cipher-input oc-sm-input" style="max-width:85px;">
                <option value="1">H1</option><option value="2">H2</option><option value="3">H3</option>
              </select>
              <input id="ocDocHeadingText" type="text" class="cipher-input oc-sm-input" placeholder="Heading text..." />
              <button type="button" id="ocBtnAddHeading" class="btn-primary oc-sm-btn">+ Heading</button>
            </div>
          </div>
          <div class="oc-builder-box">
            <div class="oc-builder-title">2. Add Paragraph</div>
            <div class="oc-form-row">
              <input id="ocDocParaText" type="text" class="cipher-input oc-sm-input" placeholder="Write paragraph text..." />
              <label style="font-size:0.78rem; display:flex; align-items:center; gap:4px;"><input id="ocDocParaBold" type="checkbox" /> Bold</label>
              <button type="button" id="ocBtnAddPara" class="btn-primary oc-sm-btn">+ Paragraph</button>
            </div>
          </div>
          <div class="oc-builder-box">
            <div class="oc-builder-title">3. Add List or Table</div>
            <div class="oc-form-row" style="margin-bottom:0.45rem;">
              <input id="ocDocListItems" type="text" class="cipher-input oc-sm-input" placeholder="List items separated by ; (e.g. First; Second; Third)" />
              <button type="button" id="ocBtnAddList" class="btn-secondary oc-sm-btn">+ List</button>
            </div>
            <div class="oc-form-row">
              <input id="ocDocTableData" type="text" class="cipher-input oc-sm-input" value="Task,Owner,Status;Design,Alice,Done;Launch,Bob,In Progress" />
              <button type="button" id="ocBtnAddDocTable" class="btn-secondary oc-sm-btn">+ Table</button>
            </div>
          </div>
        `;
      } else if (activeFile.type === 'xlsx') {
        const shNum = (state.activeSheetIdx || 0) + 1;
        const selRef = state.selectedCellRef || 'B2';
        const curSheet = activeFile.sheets[state.activeSheetIdx] || activeFile.sheets[0];
        const curCell = curSheet && curSheet.cells ? curSheet.cells[selRef] : null;
        const curVal = curCell ? (curCell.formula || curCell.value || '') : '';
        leftPanelHtml = `
          <div class="oc-builder-box">
            <div class="oc-builder-title">1. Set Cell Value or Formula (Sheet ${shNum})</div>
            <div class="oc-form-row">
              <input id="ocXlsRef" type="text" class="cipher-input oc-sm-input" value="${escapeHtml(selRef)}" placeholder="Ref (A1)" style="max-width:75px; text-transform:uppercase;" />
              <input id="ocXlsVal" type="text" class="cipher-input oc-sm-input" value="${escapeHtml(curVal)}" placeholder="Value or =SUM(B2:B4)" />
              <label style="font-size:0.78rem; display:flex; align-items:center; gap:4px;"><input id="ocXlsBold" type="checkbox" ${curCell && curCell.bold ? 'checked' : ''} /> Bold</label>
              <button type="button" id="ocBtnSetCell" class="btn-primary oc-sm-btn">Set Cell</button>
            </div>
          </div>
          <div class="oc-builder-box">
            <div class="oc-builder-title">2. Insert Row</div>
            <div class="oc-form-row">
              <input id="ocXlsRowNum" type="number" class="cipher-input oc-sm-input" value="6" min="1" style="max-width:75px;" />
              <input id="ocXlsRowVals" type="text" class="cipher-input oc-sm-input" value="Marketing,450,520,=B6+C6" placeholder="Comma-separated values" />
              <button type="button" id="ocBtnAddRow" class="btn-secondary oc-sm-btn">+ Row</button>
            </div>
          </div>
          <div class="oc-builder-box">
            <div class="oc-builder-title">3. Add Worksheet</div>
            <div class="oc-form-row">
              <input id="ocXlsSheetName" type="text" class="cipher-input oc-sm-input" placeholder="New sheet name (e.g. Q3_Forecast)" />
              <button type="button" id="ocBtnAddSheet" class="btn-secondary oc-sm-btn">+ Sheet</button>
            </div>
          </div>
        `;
      }
    } else if (state.studioTab === 'terminal') {
      const fName = activeFile ? activeFile.name : 'demo.pptx';
      leftPanelHtml = `
        <div class="oc-terminal-log" id="ocTermLog">${escapeHtml(state.terminalLog.join('\n'))}</div>
        <div class="oc-form-row" style="margin-top:0.55rem;">
          <input id="ocTermInput" type="text" class="cipher-input oc-sm-input" style="font-family:monospace; font-size:0.82rem;" placeholder="${escapeHtml(L.cmdPlaceholder)}" />
          <button type="button" id="ocTermRunBtn" class="btn-primary oc-sm-btn">${L.runCmdBtn}</button>
          <button type="button" id="ocTermClearBtn" class="btn-secondary oc-sm-btn">${L.clearLogBtn}</button>
        </div>
        <div style="display:flex; gap:0.35rem; flex-wrap:wrap; margin-top:0.5rem;">
          <button type="button" class="btn-secondary oc-chip-cmd" data-cmd="officecli ls" style="padding:0.18rem 0.5rem; font-size:0.72rem;">ls</button>
          <button type="button" class="btn-secondary oc-chip-cmd" data-cmd="officecli view ${escapeHtml(fName)} outline" style="padding:0.18rem 0.5rem; font-size:0.72rem;">view outline</button>
          <button type="button" class="btn-secondary oc-chip-cmd" data-cmd="officecli get ${escapeHtml(fName)} / --json" style="padding:0.18rem 0.5rem; font-size:0.72rem;">get --json</button>
          <button type="button" class="btn-secondary oc-chip-cmd" data-cmd="officecli help" style="padding:0.18rem 0.5rem; font-size:0.72rem;">help</button>
        </div>
      `;
    } else if (state.studioTab === 'script') {
      leftPanelHtml = `
        <textarea id="ocScriptArea" class="oc-script-area">${escapeHtml(state.scriptDraft)}</textarea>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:0.55rem; gap:0.5rem;">
          <span style="font-size:0.76rem; color:var(--ink-muted);">Supports multi-line <code>officecli</code> commands &amp; <code>\\</code> continuations.</span>
          <button type="button" id="ocRunScriptBtn" class="btn-primary oc-sm-btn">${L.runScriptBtn}</button>
        </div>
      `;
    } else if (state.studioTab === 'outline') {
      const outline = activeFile ? E.getOutlineText(activeFile) : '';
      const jsonStr = activeFile ? JSON.stringify(activeFile, null, 2) : '{}';
      leftPanelHtml = `
        <div style="font-size:0.78rem; font-weight:600; color:var(--ink-secondary); margin-bottom:0.35rem;">Outline (<code>officecli view ${escapeHtml(activeFile ? activeFile.name : '')} outline</code>)</div>
        <pre class="oc-terminal-log" style="max-height:140px; margin-bottom:0.75rem;">${escapeHtml(outline)}</pre>
        <div style="font-size:0.78rem; font-weight:600; color:var(--ink-secondary); margin-bottom:0.35rem;">Document JSON (<code>officecli get / --json</code>)</div>
        <pre class="oc-terminal-log" style="max-height:200px;">${escapeHtml(jsonStr)}</pre>
      `;
    }

    container.innerHTML = `
      <div class="sacred-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1rem;">
          <div>
            <h2 style="font-family:var(--font-serif); font-size:1.55rem; color:var(--ink-black); margin-bottom:0.3rem;">${L.title}</h2>
            <p style="color:var(--ink-secondary); max-width:780px; margin-bottom:0.75rem;">${L.subtitle}</p>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
              <button type="button" id="ocModeStudio" class="btn-secondary active-filter">${L.modeStudio}</button>
              <button type="button" id="ocModeLibrary" class="btn-secondary">${L.modeLibrary}</button>
            </div>
          </div>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <a href="https://github.com/iOfficeAI/OfficeCLI" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="text-decoration:none;">${L.ghBtn}</a>
            <a href="https://officecli.ai" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="text-decoration:none;">${L.siteBtn}</a>
          </div>
        </div>

        <!-- Workspace Toolbar -->
        <div class="oc-toolbar">
          <div style="display:flex; gap:0.45rem; align-items:center; flex-wrap:wrap;">
            <select id="ocFileSelect" class="cipher-input oc-sm-input" style="min-width:200px; font-weight:600;">${fileOptions}</select>
            <button type="button" id="ocNewPptx" class="btn-secondary oc-sm-btn">${L.newPptx}</button>
            <button type="button" id="ocNewDocx" class="btn-secondary oc-sm-btn">${L.newDocx}</button>
            <button type="button" id="ocNewXlsx" class="btn-secondary oc-sm-btn">${L.newXlsx}</button>
          </div>
          <div style="display:flex; gap:0.45rem; align-items:center; flex-wrap:wrap;">
            <input id="ocUploadInput" type="file" accept=".pptx,.docx,.xlsx" style="display:none;" />
            <button type="button" id="ocUploadBtn" class="btn-secondary oc-sm-btn">${L.uploadBtn}</button>
            <button type="button" id="ocDownloadBtn" class="btn-primary oc-sm-btn">${L.downloadBtn} ${activeFile ? escapeHtml(activeFile.name) : ''}</button>
            ${fileNames.length > 1 ? `<button type="button" id="ocDeleteFileBtn" class="btn-ghost oc-sm-btn">${L.deleteFileBtn}</button>` : ''}
            <button type="button" id="ocResetBtn" class="btn-ghost oc-sm-btn">${L.resetBtn}</button>
          </div>
        </div>

        <!-- Split Studio Grid -->
        <div class="oc-studio-grid">
          <div class="oc-studio-left">
            <div style="display:flex; gap:0.35rem; flex-wrap:wrap; margin-bottom:0.85rem; padding-bottom:0.65rem; border-bottom:1px solid var(--border-hairline);">
              <button type="button" class="btn-secondary oc-stab ${state.studioTab === 'builder' ? 'active-filter' : ''}" data-stab="builder" style="padding:0.3rem 0.7rem; font-size:0.78rem;">${L.toolBuilder}</button>
              <button type="button" class="btn-secondary oc-stab ${state.studioTab === 'terminal' ? 'active-filter' : ''}" data-stab="terminal" style="padding:0.3rem 0.7rem; font-size:0.78rem;">${L.toolTerminal}</button>
              <button type="button" class="btn-secondary oc-stab ${state.studioTab === 'script' ? 'active-filter' : ''}" data-stab="script" style="padding:0.3rem 0.7rem; font-size:0.78rem;">${L.toolScript}</button>
              <button type="button" class="btn-secondary oc-stab ${state.studioTab === 'outline' ? 'active-filter' : ''}" data-stab="outline" style="padding:0.3rem 0.7rem; font-size:0.78rem;">${L.toolOutline}</button>
            </div>
            ${leftPanelHtml}
          </div>

          <div class="oc-studio-right">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.65rem; padding-bottom:0.55rem; border-bottom:1px solid var(--border-hairline);">
              <span style="font-size:0.82rem; font-weight:700; letter-spacing:0.04em; text-transform:uppercase; color:var(--ink-secondary);">${L.previewTitle}</span>
              <span class="badge">${activeFile ? escapeHtml(activeFile.type.toUpperCase()) : 'NONE'}</span>
            </div>
            ${renderPreviewHtml(activeFile)}
          </div>
        </div>
      </div>
    `;

    // Mode Switcher
    document.getElementById('ocModeLibrary').addEventListener('click', () => { state.mode = 'library'; render(); });

    // Workspace Toolbar Events
    const fileSel = document.getElementById('ocFileSelect');
    if (fileSel) {
      fileSel.addEventListener('change', (e) => {
        E.setActiveFile(e.target.value);
        state.activeSlideIdx = 0;
        state.activeSheetIdx = 0;
        state.selectedCellRef = null;
        render();
      });
    }

    function createNew(ext) {
      const base = ext === 'pptx' ? 'deck' : ext === 'docx' ? 'doc' : 'sheet';
      let i = 1;
      while (vfs.files[`${base}_${i}.${ext}`]) i++;
      const name = `${base}_${i}.${ext}`;
      runCliLine(`officecli create ${name}`);
      state.activeSlideIdx = 0;
      state.activeSheetIdx = 0;
      render();
    }
    document.getElementById('ocNewPptx').addEventListener('click', () => createNew('pptx'));
    document.getElementById('ocNewDocx').addEventListener('click', () => createNew('docx'));
    document.getElementById('ocNewXlsx').addEventListener('click', () => createNew('xlsx'));

    const upInput = document.getElementById('ocUploadInput');
    document.getElementById('ocUploadBtn').addEventListener('click', () => upInput.click());
    upInput.addEventListener('change', async (e) => {
      const f = e.target.files[0];
      if (!f) return;
      try {
        const buf = await f.arrayBuffer();
        const doc = await E.importOfficeFile(f.name, buf);
        E.addImportedFile(doc);
        state.terminalLog.push(`✓ Uploaded & parsed ${f.name}`);
        state.activeSlideIdx = 0;
        state.activeSheetIdx = 0;
        render();
      } catch (err) {
        state.terminalLog.push(`✗ Upload error: ${err.message}`);
        state.studioTab = 'terminal';
        render();
      }
    });

    document.getElementById('ocDownloadBtn').addEventListener('click', () => {
      if (!activeFile) return;
      const bytes = E.exportBinary(activeFile.name);
      const mimeMap = {
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      };
      const blob = new Blob([bytes], { type: mimeMap[activeFile.type] || 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = activeFile.name;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    });

    const delBtn = document.getElementById('ocDeleteFileBtn');
    if (delBtn) {
      delBtn.addEventListener('click', () => {
        if (activeFile) E.deleteFile(activeFile.name);
        render();
      });
    }

    document.getElementById('ocResetBtn').addEventListener('click', () => {
      E.resetVfs();
      state.activeSlideIdx = 0;
      state.activeSheetIdx = 0;
      state.terminalLog = ['↺ Workspace reset to demo files (q4_deck.pptx, project_brief.docx, budget_2026.xlsx).'];
      render();
    });

    // Studio Left Sub-tabs
    container.querySelectorAll('.oc-stab').forEach(btn => {
      btn.addEventListener('click', () => {
        state.studioTab = btn.getAttribute('data-stab');
        render();
      });
    });

    // Preview Interactive Controls
    container.querySelectorAll('.oc-slide-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeSlideIdx = parseInt(btn.getAttribute('data-sidx'), 10);
        render();
      });
    });
    container.querySelectorAll('.oc-sheet-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        state.activeSheetIdx = parseInt(btn.getAttribute('data-shidx'), 10);
        render();
      });
    });
    container.querySelectorAll('.oc-xlsx-cell').forEach(td => {
      td.addEventListener('click', () => {
        state.selectedCellRef = td.getAttribute('data-ref');
        state.studioTab = 'builder';
        render();
      });
    });

    // Visual Builder Actions
    if (state.studioTab === 'builder' && activeFile) {
      if (activeFile.type === 'pptx') {
        const sIdx = (state.activeSlideIdx || 0) + 1;
        document.getElementById('ocBtnAddSlide').addEventListener('click', () => {
          const t = document.getElementById('ocPptSlideTitle').value.trim() || `Slide ${activeFile.slides.length + 1}`;
          const bg = document.getElementById('ocPptSlideBg').value.trim() || '1A1A2E';
          runCliLine(`officecli add ${activeFile.name} / --type slide --prop title="${t.replace(/"/g, '\\"')}" --prop background=${bg}`);
          state.activeSlideIdx = activeFile.slides.length - 1;
          render();
        });
        document.getElementById('ocBtnAddShape').addEventListener('click', () => {
          const txt = document.getElementById('ocPptShapeText').value.trim();
          if (!txt) return;
          const clr = document.getElementById('ocPptShapeColor').value.trim() || 'FFFFFF';
          const sz = document.getElementById('ocPptShapeSize').value || '20';
          runCliLine(`officecli add ${activeFile.name} "/slide[${sIdx}]" --type shape --prop text="${txt.replace(/"/g, '\\"')}" --prop color=${clr} --prop size=${sz}`);
          render();
        });
        document.getElementById('ocBtnAddPptTable').addEventListener('click', () => {
          const data = document.getElementById('ocPptTableData').value.trim();
          runCliLine(`officecli add ${activeFile.name} "/slide[${sIdx}]" --type table --prop data="${data.replace(/"/g, '\\"')}"`);
          render();
        });
      } else if (activeFile.type === 'docx') {
        document.getElementById('ocBtnAddHeading').addEventListener('click', () => {
          const lvl = document.getElementById('ocDocHeadingLvl').value;
          const txt = document.getElementById('ocDocHeadingText').value.trim();
          if (!txt) return;
          runCliLine(`officecli add ${activeFile.name} / --type heading --prop level=${lvl} --prop text="${txt.replace(/"/g, '\\"')}"`);
          render();
        });
        document.getElementById('ocBtnAddPara').addEventListener('click', () => {
          const txt = document.getElementById('ocDocParaText').value.trim();
          if (!txt) return;
          const bold = document.getElementById('ocDocParaBold').checked;
          runCliLine(`officecli add ${activeFile.name} / --type paragraph --prop text="${txt.replace(/"/g, '\\"')}" --prop bold=${bold}`);
          render();
        });
        document.getElementById('ocBtnAddList').addEventListener('click', () => {
          const items = document.getElementById('ocDocListItems').value.trim();
          if (!items) return;
          runCliLine(`officecli add ${activeFile.name} / --type list --prop items="${items.replace(/"/g, '\\"')}"`);
          render();
        });
        document.getElementById('ocBtnAddDocTable').addEventListener('click', () => {
          const data = document.getElementById('ocDocTableData').value.trim();
          runCliLine(`officecli add ${activeFile.name} / --type table --prop data="${data.replace(/"/g, '\\"')}"`);
          render();
        });
      } else if (activeFile.type === 'xlsx') {
        const shNum = (state.activeSheetIdx || 0) + 1;
        document.getElementById('ocBtnSetCell').addEventListener('click', () => {
          const ref = document.getElementById('ocXlsRef').value.trim().toUpperCase();
          const val = document.getElementById('ocXlsVal').value.trim();
          const bold = document.getElementById('ocXlsBold').checked;
          if (!ref) return;
          state.selectedCellRef = ref;
          runCliLine(`officecli add ${activeFile.name} "/sheet[${shNum}]" --type cell --prop ref=${ref} --prop value="${val.replace(/"/g, '\\"')}" --prop bold=${bold}`);
          render();
        });
        document.getElementById('ocBtnAddRow').addEventListener('click', () => {
          const row = document.getElementById('ocXlsRowNum').value;
          const vals = document.getElementById('ocXlsRowVals').value.trim();
          runCliLine(`officecli add ${activeFile.name} "/sheet[${shNum}]" --type row --prop row=${row} --prop values="${vals.replace(/"/g, '\\"')}"`);
          render();
        });
        document.getElementById('ocBtnAddSheet').addEventListener('click', () => {
          const name = document.getElementById('ocXlsSheetName').value.trim() || `Sheet${activeFile.sheets.length + 1}`;
          runCliLine(`officecli add ${activeFile.name} / --type sheet --prop name="${name.replace(/"/g, '\\"')}"`);
          state.activeSheetIdx = activeFile.sheets.length - 1;
          render();
        });
      }
    }

    // Terminal Actions
    if (state.studioTab === 'terminal') {
      const logEl = document.getElementById('ocTermLog');
      if (logEl) logEl.scrollTop = logEl.scrollHeight;
      const inp = document.getElementById('ocTermInput');
      const runFn = () => {
        if (!inp || !inp.value.trim()) return;
        runCliLine(inp.value);
        render();
        const nextInp = document.getElementById('ocTermInput');
        if (nextInp) nextInp.focus();
      };
      document.getElementById('ocTermRunBtn').addEventListener('click', runFn);
      document.getElementById('ocTermClearBtn').addEventListener('click', () => {
        state.terminalLog = [];
        render();
      });
      if (inp) {
        inp.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') { e.preventDefault(); runFn(); }
          else if (e.key === 'ArrowUp' && state.cmdHistory.length) {
            e.preventDefault();
            state.historyIdx = Math.min(state.cmdHistory.length - 1, state.historyIdx + 1);
            inp.value = state.cmdHistory[state.historyIdx];
          } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            state.historyIdx = Math.max(-1, state.historyIdx - 1);
            inp.value = state.historyIdx >= 0 ? state.cmdHistory[state.historyIdx] : '';
          }
        });
      }
      container.querySelectorAll('.oc-chip-cmd').forEach(chip => {
        chip.addEventListener('click', () => {
          runCliLine(chip.getAttribute('data-cmd'));
          render();
        });
      });
    }

    // Script Runner Actions
    if (state.studioTab === 'script') {
      const area = document.getElementById('ocScriptArea');
      if (area) area.addEventListener('input', (e) => { state.scriptDraft = e.target.value; });
      document.getElementById('ocRunScriptBtn').addEventListener('click', () => {
        const out = E.execScript(state.scriptDraft);
        state.terminalLog.push(out);
        state.activeSlideIdx = 0;
        state.activeSheetIdx = 0;
        render();
      });
    }
  }

  function renderReader(container, L) {
    const idx = ITEMS.findIndex(i => itemKey(i) === state.activeItemKey);
    const item = ITEMS[idx];
    if (!item) { state.activeItemKey = null; render(); return; }

    const chunkObj = (window.OFFICECLI_DATA && window.OFFICECLI_DATA[item.chunk]) || {};
    const entry = chunkObj[item.id] || {};
    const title = state.lang === 'vi' ? item.vi : item.en;
    const desc = item.desc[state.lang] || item.desc.en;
    const ghUrl = `https://github.com/iOfficeAI/OfficeCLI/blob/main/${item.ghPath}`;

    const hasSh = Boolean(entry.sh && entry.sh.trim());
    const hasPy = Boolean(entry.py && entry.py.trim());

    let contentHtml = '';
    if (state.codeTab === 'md') {
      contentHtml = `<article class="cs-article">${markdownToHtml(entry.md || L.noCode)}</article>`;
    } else if (state.codeTab === 'sh') {
      contentHtml = `
        <div class="cs-code-block" style="margin-top:0.75rem;">
          <div class="cs-code-lang" style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem;">
            <span>bash — ${escapeHtml(item.id)}.sh</span>
            <div style="display:flex; gap:0.4rem;">
              <button type="button" class="btn-primary" id="ocRunExampleBtn" style="padding:0.2rem 0.65rem; font-size:0.74rem;">${L.runInStudioBtn}</button>
              <button type="button" class="btn-secondary" id="ocCopyCodeBtn" style="padding:0.2rem 0.6rem; font-size:0.74rem;">${L.copyBtn}</button>
            </div>
          </div>
          <pre><code>${escapeHtml(entry.sh || L.noCode)}</code></pre>
        </div>`;
    } else if (state.codeTab === 'py') {
      contentHtml = `
        <div class="cs-code-block" style="margin-top:0.75rem;">
          <div class="cs-code-lang" style="display:flex; justify-content:space-between; align-items:center;">
            <span>python — ${escapeHtml(item.id)}.py</span>
            <button type="button" class="btn-secondary" id="ocCopyCodeBtn" style="padding:0.2rem 0.6rem; font-size:0.74rem;">${L.copyBtn}</button>
          </div>
          <pre><code>${escapeHtml(entry.py || L.noCode)}</code></pre>
        </div>`;
    }

    const prevItem = idx > 0 ? ITEMS[idx - 1] : null;
    const nextItem = idx < ITEMS.length - 1 ? ITEMS[idx + 1] : null;

    container.innerHTML = `
      <div class="sacred-card">
        <div class="cs-reader-topbar">
          <button type="button" id="ocBackBtn" class="btn-secondary">${L.backBtn}</button>
          <div style="display:flex; gap:0.5rem; align-items:center; flex-wrap:wrap;">
            <span class="badge">${escapeHtml(item.badge)}</span>
            <a href="${ghUrl}" target="_blank" rel="noopener noreferrer" class="cs-ext-link">${L.ghSource}</a>
          </div>
        </div>

        <h2 style="font-family:var(--font-serif); font-size:1.55rem; color:var(--ink-black); margin-bottom:0.35rem;">${escapeHtml(title)}</h2>
        <p style="color:var(--ink-secondary); margin-bottom:1.1rem;">${escapeHtml(desc)}</p>

        ${(hasSh || hasPy) ? `
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap; margin-bottom:1rem; padding-bottom:0.85rem; border-bottom:1px solid var(--border-hairline);">
            <button type="button" class="btn-secondary oc-code-tab ${state.codeTab === 'md' ? 'active-filter' : ''}" data-ctab="md">${L.tabMd}</button>
            ${hasSh ? `<button type="button" class="btn-secondary oc-code-tab ${state.codeTab === 'sh' ? 'active-filter' : ''}" data-ctab="sh">${L.tabSh}</button>` : ''}
            ${hasPy ? `<button type="button" class="btn-secondary oc-code-tab ${state.codeTab === 'py' ? 'active-filter' : ''}" data-ctab="py">${L.tabPy}</button>` : ''}
          </div>
        ` : ''}

        ${contentHtml}

        <div style="display:flex; justify-content:space-between; gap:0.75rem; flex-wrap:wrap; margin-top:2rem; padding-top:1.1rem; border-top:1px solid var(--border-hairline);">
          ${prevItem ? `<button type="button" class="btn-secondary oc-nav-btn" data-key="${itemKey(prevItem)}">${L.prevBtn}: ${escapeHtml(state.lang === 'vi' ? prevItem.vi : prevItem.en)}</button>` : '<span></span>'}
          ${nextItem ? `<button type="button" class="btn-primary oc-nav-btn" data-key="${itemKey(nextItem)}">${escapeHtml(state.lang === 'vi' ? nextItem.vi : nextItem.en)} ${L.nextBtn}</button>` : ''}
        </div>
      </div>
    `;

    document.getElementById('ocBackBtn').addEventListener('click', () => {
      state.activeItemKey = null;
      render();
    });

    container.querySelectorAll('.oc-code-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        state.codeTab = btn.getAttribute('data-ctab');
        render();
      });
    });

    const runExBtn = document.getElementById('ocRunExampleBtn');
    if (runExBtn && entry.sh) {
      runExBtn.addEventListener('click', () => {
        state.scriptDraft = entry.sh;
        const out = window.OfficeCLIEngine.execScript(entry.sh);
        state.terminalLog.push(out);
        state.activeItemKey = null;
        state.mode = 'studio';
        state.studioTab = 'terminal';
        state.activeSlideIdx = 0;
        state.activeSheetIdx = 0;
        render();
      });
    }

    const copyCodeBtn = document.getElementById('ocCopyCodeBtn');
    if (copyCodeBtn) {
      copyCodeBtn.addEventListener('click', () => {
        copyText(state.codeTab === 'sh' ? entry.sh : entry.py, copyCodeBtn);
      });
    }

    container.querySelectorAll('.oc-nav-btn').forEach(btn => {
      btn.addEventListener('click', () => openItem(btn.getAttribute('data-key')));
    });
  }

  function render() {
    const container = document.getElementById('officeCliContainer');
    if (!container) return;
    const L = UI[state.lang] || UI.en;

    if (state.mode === 'studio') {
      renderStudio(container, L);
      return;
    }

    if (state.activeItemKey) {
      renderReader(container, L);
      return;
    }

    const q = state.search.trim().toLowerCase();
    const filtered = ITEMS.filter(item => {
      if (state.category !== 'all' && item.group !== state.category) return false;
      if (!q) return true;
      const hay = `${item.id} ${item.en} ${item.vi} ${item.desc.en} ${item.desc.vi} ${item.badge}`.toLowerCase();
      return hay.includes(q);
    });

    const installCode = getInstallSnippet(state.installTab);

    const cardsHtml = filtered.length ? filtered.map(item => {
      const title = state.lang === 'vi' ? item.vi : item.en;
      const desc = item.desc[state.lang] || item.desc.en;
      const key = itemKey(item);
      return `
        <div class="cs-chapter-card oc-card" data-key="${key}" style="cursor:pointer;">
          <div class="cs-chapter-head">
            <span class="badge">${escapeHtml(item.badge)}</span>
            <span class="cs-ext-link">${L.readBtn}</span>
          </div>
          <h4 class="cs-chapter-title">${escapeHtml(title)}</h4>
          <p class="cs-chapter-desc">${escapeHtml(desc)}</p>
        </div>
      `;
    }).join('') : `<p style="color:var(--ink-muted); padding:1rem 0;">${L.emptySearch}</p>`;

    container.innerHTML = `
      <div class="sacred-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem; margin-bottom:1rem;">
          <div>
            <h2 style="font-family:var(--font-serif); font-size:1.55rem; color:var(--ink-black); margin-bottom:0.35rem;">${L.title}</h2>
            <p style="color:var(--ink-secondary); max-width:780px; margin-bottom:0.75rem;">${L.subtitle}</p>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
              <button type="button" id="ocModeStudio" class="btn-secondary">${L.modeStudio}</button>
              <button type="button" id="ocModeLibrary" class="btn-secondary active-filter">${L.modeLibrary}</button>
            </div>
          </div>
          <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
            <a href="https://github.com/iOfficeAI/OfficeCLI" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="text-decoration:none;">${L.ghBtn}</a>
            <a href="https://officecli.ai" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="text-decoration:none;">${L.siteBtn}</a>
          </div>
        </div>

        <div class="meaning-block" style="margin-top:0.75rem;">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem; margin-bottom:0.5rem;">
            <div class="meaning-block-title" style="margin-bottom:0;">${L.quickTitle}</div>
            <div style="display:flex; gap:0.35rem; flex-wrap:wrap;">
              <button type="button" class="btn-secondary oc-inst-tab ${state.installTab === 'unix' ? 'active-filter' : ''}" data-itab="unix" style="padding:0.25rem 0.65rem; font-size:0.75rem;">macOS / Linux</button>
              <button type="button" class="btn-secondary oc-inst-tab ${state.installTab === 'win' ? 'active-filter' : ''}" data-itab="win" style="padding:0.25rem 0.65rem; font-size:0.75rem;">Windows</button>
              <button type="button" class="btn-secondary oc-inst-tab ${state.installTab === 'pkg' ? 'active-filter' : ''}" data-itab="pkg" style="padding:0.25rem 0.65rem; font-size:0.75rem;">Brew / npm / Agent</button>
              <button type="button" id="ocCopyInstallBtn" class="btn-primary" style="padding:0.25rem 0.75rem; font-size:0.75rem;">${L.copyBtn}</button>
            </div>
          </div>
          <div class="cs-code-block" style="margin:0;">
            <pre style="margin:0;"><code>${escapeHtml(installCode)}</code></pre>
          </div>
        </div>
      </div>

      <div class="sacred-card">
        <div style="display:flex; gap:0.75rem; flex-wrap:wrap; align-items:center; justify-content:space-between; margin-bottom:1rem;">
          <div style="display:flex; gap:0.4rem; flex-wrap:wrap;">
            ${Object.keys(L.cats).map(catKey => `
              <button type="button" class="btn-secondary oc-cat-btn ${state.category === catKey ? 'active-filter' : ''}" data-cat="${catKey}">${L.cats[catKey]}</button>
            `).join('')}
          </div>
          <input id="ocSearchInput" type="text" class="cipher-input" value="${escapeHtml(state.search)}" placeholder="${L.searchPlaceholder}" style="max-width:300px; padding:0.5rem 0.85rem; font-size:0.86rem;" />
        </div>

        <div class="cs-chapter-grid">
          ${cardsHtml}
        </div>
      </div>
    `;

    document.getElementById('ocModeStudio').addEventListener('click', () => { state.mode = 'studio'; render(); });

    container.querySelectorAll('.oc-inst-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        state.installTab = btn.getAttribute('data-itab');
        render();
      });
    });

    const copyInstBtn = document.getElementById('ocCopyInstallBtn');
    if (copyInstBtn) {
      copyInstBtn.addEventListener('click', () => copyText(installCode, copyInstBtn));
    }

    container.querySelectorAll('.oc-cat-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        state.category = btn.getAttribute('data-cat');
        render();
      });
    });

    const searchInput = document.getElementById('ocSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const pos = e.target.selectionStart;
        state.search = e.target.value;
        render();
        const inp = document.getElementById('ocSearchInput');
        if (inp) { inp.focus(); inp.setSelectionRange(pos, pos); }
      });
    }

    container.querySelectorAll('.oc-card').forEach(card => {
      card.addEventListener('click', () => openItem(card.getAttribute('data-key')));
    });
  }

  window.renderOfficeCli = function (lang) {
    state.lang = lang === 'vi' ? 'vi' : 'en';
    render();
  };
})();
