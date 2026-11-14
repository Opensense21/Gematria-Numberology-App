// Microsoft AI Agents for Beginners — 19 Bilingual Lessons (EN / VI) & Code Samples
(function () {
  const LESSONS = [
    { num: '00', slug: '00-course-setup', en: 'Course Setup', vi: 'Thiết lập Khóa học', desc: { en: 'Environment setup, API keys, Python/GitHub Models configuration.', vi: 'Cài đặt môi trường, API keys và cấu hình Python/GitHub Models.' } },
    { num: '01', slug: '01-intro-to-ai-agents', en: 'Introduction to AI Agents and Agent Use Cases', vi: 'Giới thiệu về Tác nhân AI và Các trường hợp sử dụng', desc: { en: 'What AI agents are, how they differ from workflows, and core real-world use cases.', vi: 'Định nghĩa AI Agent, sự khác biệt với workflow truyền thống và các ứng dụng thực tế.' } },
    { num: '02', slug: '02-explore-agentic-frameworks', en: 'Explore AI Agent Frameworks', vi: 'Khám phá các Framework Tác nhân AI', desc: { en: 'Comparing AutoGen, Semantic Kernel, LangGraph, and Microsoft Agent Framework.', vi: 'So sánh AutoGen, Semantic Kernel, LangGraph và Microsoft Agent Framework.' } },
    { num: '03', slug: '03-agentic-design-patterns', en: 'AI Agentic Design Principles', vi: 'Các Nguyên Tắc Thiết Kế Agentic AI', desc: { en: 'Core UX, reliability, and architectural principles for designing effective agents.', vi: 'Nguyên tắc cốt lõi về UX, độ tin cậy và kiến trúc khi thiết kế AI Agent.' } },
    { num: '04', slug: '04-tool-use', en: 'Tool Use Design Pattern', vi: 'Mẫu Thiết Kế Sử Dụng Công Cụ (Tool Use)', desc: { en: 'Function calling, structured tool schemas, and connecting agents to external APIs.', vi: 'Gọi hàm (function calling), schema công cụ và kết nối Agent với API bên ngoài.' } },
    { num: '05', slug: '05-agentic-rag', en: 'Agentic RAG', vi: 'Agentic RAG', desc: { en: 'Dynamic retrieval, query rewriting, self-correction, and iterative knowledge search.', vi: 'Truy xuất động, viết lại truy vấn, tự sửa lỗi và tìm kiếm tri thức lặp.' } },
    { num: '06', slug: '06-building-trustworthy-agents', en: 'Building Trustworthy AI Agents', vi: 'Xây dựng Tác nhân AI Đáng tin cậy', desc: { en: 'Guardrails, safety filters, human-in-the-loop approval, and mitigating hallucinations.', vi: 'Rào chắn an toàn, kiểm duyệt đầu ra, phê duyệt của con người và giảm ảo giác.' } },
    { num: '07', slug: '07-planning-design', en: 'Planning Design', vi: 'Thiết Kế Lập Kế Hoạch (Planning)', desc: { en: 'Task decomposition, ReAct, chain-of-thought planning, and goal tracking.', vi: 'Phân rã tác vụ, ReAct, lập kế hoạch từng bước và theo dõi mục tiêu.' } },
    { num: '08', slug: '08-multi-agent', en: 'Multi-Agent Design Patterns', vi: 'Các Mẫu Thiết Kế Đa Tác Nhân (Multi-Agent)', desc: { en: 'Supervisor, handoff, debate, and collaborative multi-agent orchestration.', vi: 'Điều phối đa tác nhân: giám sát, chuyển giao, phản biện và cộng tác.' } },
    { num: '09', slug: '09-metacognition', en: 'Metacognition in AI Agents', vi: 'Siêu Nhận Thức (Metacognition) trong AI Agents', desc: { en: 'Self-reflection, evaluating confidence, and learning from past execution errors.', vi: 'Tự phản chiếu, đánh giá độ tin cậy và học hỏi từ lỗi thực thi trước đó.' } },
    { num: '10', slug: '10-ai-agents-production', en: 'AI Agents in Production: Observability & Evaluation', vi: 'AI Agents trong Sản Xuất: Quan sát & Đánh giá', desc: { en: 'Tracing agent trajectories, latency/cost telemetry, and automated evals.', vi: 'Theo dõi quỹ đạo hoạt động, đo lường chi phí/độ trễ và đánh giá tự động.' } },
    { num: '11', slug: '11-agentic-protocols', en: 'Using Agentic Protocols (MCP, A2A and NLWeb)', vi: 'Sử dụng Giao thức Agentic (MCP, A2A & NLWeb)', desc: { en: 'Model Context Protocol, Agent-to-Agent communication, and open web standards.', vi: 'Giao thức MCP, giao tiếp giữa các Agent (A2A) và chuẩn web mở.' } },
    { num: '12', slug: '12-context-engineering', en: 'Context Engineering for AI Agents', vi: 'Kỹ Thuật Ngữ Cảnh (Context Engineering)', desc: { en: 'Structuring system prompts, managing token budgets, and preventing context rot.', vi: 'Tối ưu hóa ngữ cảnh, quản lý token và tránh suy giảm chất lượng khi hội thoại dài.' } },
    { num: '13', slug: '13-agent-memory', en: 'Memory for AI Agents', vi: 'Bộ Nhớ cho AI Agents', desc: { en: 'Short-term working memory vs. long-term episodic and semantic memory stores.', vi: 'Bộ nhớ ngắn hạn và bộ nhớ dài hạn (episodic & semantic memory).' } },
    { num: '14', slug: '14-microsoft-agent-framework', en: 'Exploring Microsoft Agent Framework', vi: 'Khám Phá Microsoft Agent Framework', desc: { en: 'Unified workflows, state management, and enterprise agent patterns.', vi: 'Quy trình hợp nhất, quản lý trạng thái và mẫu thiết kế Agent doanh nghiệp.' } },
    { num: '15', slug: '15-browser-use', en: 'Building Computer Use Agents (CUA)', vi: 'Xây dựng Tác nhân Sử Dụng Máy Tính (CUA)', desc: { en: 'Vision-driven browser automation, DOM grounding, and safe UI interaction.', vi: 'Tự động hóa trình duyệt bằng thị giác máy tính và tương tác giao diện an toàn.' } },
    { num: '16', slug: '16-deploying-scalable-agents', en: 'Deploying Scalable Agents with Microsoft Foundry', vi: 'Triển khai Agents Mở Rộng với Microsoft Foundry', desc: { en: 'Containerization, autoscaling, endpoint security, and cloud hosting.', vi: 'Đóng gói container, tự động mở rộng, bảo mật endpoint và vận hành trên cloud.' } },
    { num: '17', slug: '17-creating-local-ai-agents', en: 'Creating Local AI Agents with Foundry Local & Qwen', vi: 'Tạo AI Agents Cục Bộ với Foundry Local & Qwen', desc: { en: 'Running private, offline agentic workflows on local hardware with small models.', vi: 'Chạy AI Agent riêng tư, ngoại tuyến ngay trên máy cá nhân với mô hình nhỏ.' } },
    { num: '18', slug: '18-securing-ai-agents', en: 'Securing AI Agents with Cryptographic Receipts', vi: 'Bảo mật AI Agents với Biên nhận Mã hóa', desc: { en: 'Verifiable audit trails, signed tool actions, and zero-trust agent accountability.', vi: 'Nhật ký kiểm toán có thể xác minh, chữ ký mật mã cho hành động của Agent.' } }
  ];

  let activeLessonSlug = null;
  let searchQuery = '';

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function loadLessonScript(slug, cb) {
    window.__AI_AGENTS_LESSONS__ = window.__AI_AGENTS_LESSONS__ || {};
    if (window.__AI_AGENTS_LESSONS__[slug]) {
      cb(window.__AI_AGENTS_LESSONS__[slug]);
      return;
    }
    const script = document.createElement('script');
    script.src = `ai_agents_data/${slug}.js`;
    script.onload = () => cb(window.__AI_AGENTS_LESSONS__[slug] || null);
    script.onerror = () => cb(null);
    document.head.appendChild(script);
  }

  function renderLessonReader(container, lang, slug) {
    const isVi = lang === 'vi';
    const idx = LESSONS.findIndex(l => l.slug === slug);
    const meta = LESSONS[idx] || LESSONS[0];
    const prevL = idx > 0 ? LESSONS[idx - 1] : null;
    const nextL = idx < LESSONS.length - 1 ? LESSONS[idx + 1] : null;

    container.innerHTML = `
      <section class="sacred-card">
        <p style="margin:0; color:var(--ink-muted);">${isVi ? 'Đang tải bài học...' : 'Loading lesson...'}</p>
      </section>
    `;

    loadLessonScript(slug, (data) => {
      if (!data) {
        container.innerHTML = `
          <section class="sacred-card">
            <button type="button" id="aiBackBtn" class="btn-secondary">&larr; ${isVi ? 'Quay lại danh sách bài học' : 'Back to Lessons'}</button>
            <p style="margin-top:1rem;">${isVi ? 'Không thể tải dữ liệu bài học này.' : 'Unable to load lesson data.'}</p>
          </section>
        `;
        document.getElementById('aiBackBtn').addEventListener('click', () => {
          activeLessonSlug = null;
          renderAiAgents(lang);
        });
        return;
      }

      const content = isVi ? data.vi : data.en;
      const tocHtml = (content.sections || []).map(sec => `
        <a href="#${sec.id}" class="cs-toc-link" data-sec="${sec.id}">${escapeHtml(sec.title)}</a>
      `).join('');

      const samplesHtml = (data.codeSamples && data.codeSamples.length > 0)
        ? `
          <section class="sacred-card" style="margin-top:1.5rem;">
            <h3>${isVi ? 'Mã Nguồn Thực Hành (Code Samples)' : 'Lesson Code Samples'} (${data.codeSamples.length})</h3>
            ${data.codeSamples.map((s) => `
              <div style="margin-bottom:1.1rem;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.35rem;">
                  <strong style="font-size:0.9rem; color:var(--ink-black);">${escapeHtml(s.name)}</strong>
                  <span class="badge">${escapeHtml(s.lang)}</span>
                </div>
                <pre class="cs-code"><code>${escapeHtml(s.code)}</code></pre>
              </div>
            `).join('')}
          </section>
        `
        : '';

      container.innerHTML = `
        <section class="sacred-card">
          <div class="cs-reader-topbar">
            <div style="display:flex; align-items:center; gap:0.6rem; flex-wrap:wrap;">
              <button type="button" id="aiBackBtn" class="btn-secondary">&larr; ${isVi ? 'Tất Cả Bài Học' : 'All Lessons'}</button>
              <span class="badge badge-highlight">${isVi ? 'Bài' : 'Lesson'} ${meta.num}</span>
            </div>
            <div style="display:flex; gap:0.45rem; flex-wrap:wrap;">
              ${prevL ? `<button type="button" class="btn-ghost ai-nav-l" data-slug="${prevL.slug}">&larr; ${prevL.num}</button>` : ''}
              ${nextL ? `<button type="button" class="btn-ghost ai-nav-l" data-slug="${nextL.slug}">${nextL.num} &rarr;</button>` : ''}
            </div>
          </div>

          <div style="max-width:820px; margin:0 auto 1.25rem;">
            <h2 style="font-family:var(--font-serif); font-size:1.75rem; color:var(--ink-black); margin:0 0 0.35rem;">${meta.num}. ${escapeHtml(content.title)}</h2>
            <p style="font-size:0.9rem; color:var(--ink-muted); margin:0;">Microsoft · AI Agents for Beginners</p>
          </div>

          ${tocHtml ? `
            <div class="cs-toc-bar" style="max-width:820px; margin:0 auto 1.5rem;">
              ${tocHtml}
            </div>
          ` : ''}

          <article class="cs-reader-body">
            ${content.html}
          </article>
        </section>

        ${samplesHtml}
      `;

      document.getElementById('aiBackBtn').addEventListener('click', () => {
        activeLessonSlug = null;
        renderAiAgents(lang);
      });

      container.querySelectorAll('.ai-nav-l').forEach(btn => {
        btn.addEventListener('click', () => {
          activeLessonSlug = btn.getAttribute('data-slug');
          renderAiAgents(lang);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
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

  function renderAiAgents(lang) {
    const container = document.getElementById('aiAgentsContainer');
    if (!container) return;
    const isVi = lang === 'vi';

    if (activeLessonSlug) {
      renderLessonReader(container, lang, activeLessonSlug);
      return;
    }

    const q = searchQuery.trim().toLowerCase();
    const filtered = LESSONS.filter(l =>
      !q ||
      l.en.toLowerCase().includes(q) ||
      l.vi.toLowerCase().includes(q) ||
      l.desc[lang].toLowerCase().includes(q) ||
      l.num.includes(q)
    );

    const cardsHtml = filtered.length > 0
      ? filtered.map(l => `
          <div class="cs-chapter-card" style="cursor:pointer;" data-open-lesson="${l.slug}">
            <div class="cs-chapter-head">
              <span class="badge">${isVi ? 'Bài' : 'Lesson'} ${l.num}</span>
              <span class="cs-ext-link">${isVi ? 'Đọc Bài →' : 'Read Lesson →'}</span>
            </div>
            <h4 class="cs-chapter-title">${isVi ? l.vi : l.en}</h4>
            <p class="cs-chapter-desc">${l.desc[lang]}</p>
          </div>
        `).join('')
      : `<p style="color:var(--ink-muted); padding:1rem 0;">${isVi ? 'Không tìm thấy bài học phù hợp.' : 'No matching lessons found.'}</p>`;

    container.innerHTML = `
      <section class="sacred-card">
        <div style="max-width:760px;">
          <span class="badge badge-highlight">Microsoft · ${isVi ? '19 Bài Học Song Ngữ (EN / VI)' : '19 Bilingual Lessons (EN / VI)'}</span>
          <h2 style="font-family:var(--font-serif); font-size:1.6rem; margin:0.5rem 0 0.35rem; color:var(--ink-black);">
            ${isVi ? 'AI Agents Cho Người Mới Bắt Đầu (AI Agents for Beginners)' : 'AI Agents for Beginners'}
          </h2>
          <p style="margin-bottom:0;">
            ${isVi
              ? 'Toàn bộ 19 bài học chính thức từ Microsoft (kèm bản dịch Tiếng Việt và mã nguồn mẫu) đã được tích hợp trực tiếp vào ứng dụng — nhấn vào bất kỳ bài nào để đọc ngay.'
              : 'All 19 official lessons from Microsoft (with full English & Vietnamese translations and code samples) are embedded directly into the app — click any lesson to read offline.'}
          </p>
        </div>
      </section>

      <section class="sacred-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; margin-bottom:1.1rem;">
          <h3 style="margin-bottom:0;">${isVi ? 'Danh Sách 19 Bài Học' : '19-Lesson Curriculum'}</h3>
          <input
            id="aiSearchInput"
            type="text"
            class="birth-input"
            style="min-width:240px; max-width:340px;"
            value="${searchQuery.replace(/"/g, '&quot;')}"
            placeholder="${isVi ? 'Tìm bài học (vd: RAG, MCP, Memory)...' : 'Search lessons (e.g. RAG, MCP, Memory)...'}"
          />
        </div>

        <div class="cs-chapter-grid">
          ${cardsHtml}
        </div>
      </section>
    `;

    container.querySelectorAll('[data-open-lesson]').forEach(card => {
      card.addEventListener('click', () => {
        activeLessonSlug = card.getAttribute('data-open-lesson');
        renderAiAgents(lang);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    const searchInput = document.getElementById('aiSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        const pos = searchInput.selectionStart;
        renderAiAgents(lang);
        const nextInput = document.getElementById('aiSearchInput');
        if (nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(pos, pos);
        }
      });
    }
  }

  window.renderAiAgents = renderAiAgents;
})();
