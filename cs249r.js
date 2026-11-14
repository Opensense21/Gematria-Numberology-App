// Harvard CS249r — Machine Learning Systems (Vols I–IV) & Companion Tools
(function () {
  const VOLUMES = [
    {
      id: 'vol1',
      num: 'Vol I',
      title: { en: 'I. Introduction to Machine Learning Systems', vi: 'I. Nhập Môn Hệ Thống Học Máy' },
      unit: { en: 'The Model', vi: 'Mô Hình Đơn Lẻ' },
      question: {
        en: 'How does intelligence execute efficiently on a single machine?',
        vi: 'Trí tuệ nhân tạo vận hành hiệu quả trên một máy đơn như thế nào?'
      },
      status: { en: 'Released (MIT Press)', vi: 'Đã Phát Hành (MIT Press)' },
      url: 'https://mlsysbook.ai/vol1/',
      repoUrl: 'https://github.com/harvard-edge/cs249r_book/tree/dev/books/vol1',
      chapters: [
        { num: '01', slug: '01_introduction', title: 'Introduction to ML Systems', desc: 'Why constraints drive architecture; bridging ML models and systems engineering.' },
        { num: '02', slug: '02_system_paradigms', title: 'ML System Paradigms', desc: 'From traditional software 1.0 to data-driven ML 2.0 and hardware-software co-design.' },
        { num: '03', slug: '03_ml_lifecycle', title: 'The ML Lifecycle', desc: 'End-to-end workflows from problem framing and data collection to deployment and monitoring.' },
        { num: '04', slug: '04_data_engineering', title: 'Data Engineering', desc: 'Storage formats, ETL pipelines, feature stores, and I/O bottlenecks.' },
        { num: '05', slug: '05_nn_computation', title: 'Neural Network Computation', desc: 'Tensors, matrix multiplication, memory hierarchy, and arithmetic intensity.' },
        { num: '06', slug: '06_nn_architectures', title: 'Neural Network Architectures', desc: 'CNNs, RNNs, Transformers, and how architectural choices map to hardware.' },
        { num: '07', slug: '07_frameworks', title: 'ML Frameworks', desc: 'Computational graphs, autograd engines, eager vs. graph execution, and compilers.' },
        { num: '08', slug: '08_training', title: 'Training Systems', desc: 'Backpropagation memory footprint, mixed precision, gradient accumulation, and optimizers.' },
        { num: '09', slug: '09_data_selection', title: 'Data Selection & Curation', desc: 'Quality filtering, deduplication, active learning, and dataset scaling laws.' },
        { num: '10', slug: '10_model_compression', title: 'Model Compression & Optimization', desc: 'Quantization, pruning, knowledge distillation, and low-precision arithmetic.' },
        { num: '11', slug: '11_hw_acceleration', title: 'Hardware Acceleration', desc: 'CPUs, GPUs, TPUs, NPUs, systolic arrays, and memory bandwidth walls.' },
        { num: '12', slug: '12_benchmarking', title: 'Benchmarking & Evaluation', desc: 'MLPerf methodology, latency vs. throughput, tail latency, and roofline modeling.' },
        { num: '13', slug: '13_model_serving', title: 'Model Serving & Inference', desc: 'Batching, KV-cache management, scheduling, and production serving engines.' },
        { num: '14', slug: '14_ml_ops', title: 'MLOps & Production Reliability', desc: 'CI/CD for models, drift detection, canary rollouts, and observability.' },
        { num: '15', slug: '15_responsible_engr', title: 'Responsible & Sustainable Engineering', desc: 'Energy, carbon footprint, fairness, safety, and lifecycle accountability.' },
        { num: '16', slug: '16_conclusion', title: 'Conclusion: Principles of ML Systems', desc: 'Synthesizing first principles across compute, memory, and systems trade-offs.' }
      ]
    },
    {
      id: 'vol2',
      num: 'Vol II',
      title: { en: 'II. Scaling Machine Learning Systems', vi: 'II. Mở Rộng Quy Mô Hệ Thống Học Máy' },
      unit: { en: 'The Fleet', vi: 'Cụm Máy Chủ (Fleet)' },
      question: {
        en: 'How does intelligence scale across distributed clusters and datacenters?',
        vi: 'Trí tuệ nhân tạo mở rộng qua các cụm máy chủ và trung tâm dữ liệu như thế nào?'
      },
      status: { en: 'Preview', vi: 'Bản Xem Trước' },
      url: 'https://mlsysbook.ai/vol2/',
      repoUrl: 'https://github.com/harvard-edge/cs249r_book/tree/dev/books/vol2',
      chapters: [
        { num: '01', slug: '01_introduction', title: 'Introduction to Scaling', desc: 'When one machine is not enough: moving from single-node to cluster-scale AI.' },
        { num: '02', slug: '02_compute_infrastructure', title: 'Compute Infrastructure', desc: 'AI supercomputers, pods, power delivery, cooling, and rack-scale architecture.' },
        { num: '03', slug: '03_network_fabrics', title: 'Network Fabrics & Interconnects', desc: 'NVLink, InfiniBand, RoCEv2, fat-tree topologies, and congestion control.' },
        { num: '04', slug: '04_data_storage', title: 'Distributed Data Storage', desc: 'Parallel filesystems, object storage, and feeding thousands of accelerators.' },
        { num: '05', slug: '05_collective_communication', title: 'Collective Communication', desc: 'AllReduce, AllGather, ReduceScatter, ring/tree algorithms, and NCCL.' },
        { num: '06', slug: '06_distributed_training', title: 'Distributed Training', desc: 'Data, Tensor, Pipeline, and Context Parallelism (3D/4D parallelism, ZeRO/FSDP).' },
        { num: '07', slug: '07_fault_tolerance', title: 'Fault Tolerance & Recovery', desc: 'Checkpointing at scale, silent data corruption, and elastic job recovery.' },
        { num: '08', slug: '08_fleet_orchestration', title: 'Fleet Orchestration & Scheduling', desc: 'Slurm, Kubernetes, gang scheduling, and multi-tenant cluster utilization.' },
        { num: '09', slug: '09_performance_engineering', title: 'Performance Engineering at Scale', desc: 'Profiling distributed traces, communication-computation overlap, and stragglers.' },
        { num: '10', slug: '10_inference', title: 'Large-Scale Inference', desc: 'Disaggregated prefill/decode, speculative decoding, and global load balancing.' },
        { num: '11', slug: '11_edge_intelligence', title: 'Edge & Mobile Intelligence', desc: 'On-device inference, TinyML, federated learning, and edge-cloud collaboration.' },
        { num: '12', slug: '12_ops_scale', title: 'Operations at Fleet Scale', desc: 'Telemetry, capacity planning, SLOs, and automated remediation.' },
        { num: '13', slug: '13_security_privacy', title: 'Security & Privacy', desc: 'Model weights protection, confidential computing, and adversarial robustness.' },
        { num: '14', slug: '14_robust_ai', title: 'Robust & Reliable AI Systems', desc: 'Handling distribution shifts, fallback paths, and graceful degradation.' },
        { num: '15', slug: '15_sustainable_ai', title: 'Sustainable AI Infrastructure', desc: 'Datacenter PUE, carbon-aware scheduling, and hardware lifecycle energy.' },
        { num: '16', slug: '16_responsible_ai', title: 'Responsible AI Governance', desc: 'Auditing, provenance, compliance, and societal impact at scale.' },
        { num: '17', slug: '17_conclusion', title: 'Conclusion: The Fleet Mindset', desc: 'Co-designing algorithms, networks, and datacenters as a unified computer.' }
      ]
    },
    {
      id: 'vol3',
      num: 'Vol III',
      title: { en: 'III. Agentic Machine Learning Systems', vi: 'III. Hệ Thống AI Tác Tử (Agentic AI)' },
      unit: { en: 'The Trajectory', vi: 'Quỹ Đạo Hành Động' },
      question: {
        en: 'How is intelligence governed when it acts autonomously over long horizons?',
        vi: 'Trí tuệ được điều phối thế nào khi tự chủ hành động trong thời gian dài?'
      },
      status: { en: 'In Development', vi: 'Đang Phát Triển' },
      url: 'https://github.com/harvard-edge/cs249r_book/tree/dev/books/vol3',
      repoUrl: 'https://github.com/harvard-edge/cs249r_book/tree/dev/books/vol3',
      chapters: [
        { num: '01', slug: '01_introduction', title: 'Introduction to Agentic Systems', desc: 'Closing the loop in software: from stateless prompts to stateful trajectories.' },
        { num: '02', slug: '02_foundation_model', title: 'Foundation Models as Engines', desc: 'Capabilities, instruction following, and reasoning primitives for agents.' },
        { num: '03', slug: '03_test_time_compute', title: 'Test-Time Compute', desc: 'Trading inference compute for reasoning depth, search, and verification.' },
        { num: '04', slug: '04_context_engineering', title: 'Context Engineering', desc: 'Managing finite context windows, compaction, and dynamic prompt assembly.' },
        { num: '05', slug: '05_kv_cache', title: 'KV Cache & Prefix Reuse', desc: 'Prefix caching across multi-turn agent loops to cut latency and cost.' },
        { num: '06', slug: '06_long_term_memory', title: 'Long-Term Memory', desc: 'Episodic, semantic, and procedural memory architectures for persistent agents.' },
        { num: '07', slug: '07_tool_calling', title: 'Tool Calling & Protocols', desc: 'Structured schemas, MCP, API orchestration, and deterministic bindings.' },
        { num: '08', slug: '08_sandboxes', title: 'Execution Sandboxes', desc: 'Containers, microVMs, and isolating untrusted agent-generated code.' },
        { num: '09', slug: '09_security', title: 'Agentic Security', desc: 'Prompt injection defenses, least privilege, and capability boundaries.' },
        { num: '10', slug: '10_agent_harness', title: 'Agent Harnesses', desc: 'Control loops, planning scaffolds, human-in-the-loop gates, and state machines.' },
        { num: '11', slug: '11_durable_execution', title: 'Durable Execution', desc: 'Long-running workflows, event sourcing, and idempotent retries.' },
        { num: '12', slug: '12_failure_recovery', title: 'Failure Recovery', desc: 'Detecting loops, backtracking, and recovering from nondeterministic errors.' },
        { num: '13', slug: '13_evaluation', title: 'Agent Evaluation', desc: 'Trajectory grading, environment benchmarks, and regression testing.' },
        { num: '14', slug: '14_agent_operations', title: 'Agent Operations (AgentOps)', desc: 'Tracing, token budgets, observability, and production guardrails.' },
        { num: '15', slug: '15_trajectory_curation', title: 'Trajectory Curation', desc: 'Collecting, filtering, and learning from successful agent interaction logs.' },
        { num: '16', slug: '16_fine_tuning', title: 'Agentic Fine-Tuning', desc: 'Distilling tool-use and domain workflows into specialized models.' },
        { num: '17', slug: '17_rlvr', title: 'Reinforcement Learning with Verifiable Rewards', desc: 'RLVR pipelines for coding, math, and verifiable tool environments.' },
        { num: '18', slug: '18_multi_agent', title: 'Multi-Agent Systems', desc: 'Delegation, coordination protocols, consensus, and emergent failure modes.' },
        { num: '19', slug: '19_agent_economics', title: 'Agent Economics', desc: 'Cost-per-task optimization, model routing, and ROI of autonomous systems.' },
        { num: '20', slug: '20_conclusion', title: 'Conclusion: Governing Autonomy', desc: 'Engineering trustworthy software agents at scale.' }
      ]
    },
    {
      id: 'vol4',
      num: 'Vol IV',
      title: { en: 'IV. Physical AI: Systems That Sense and Act', vi: 'IV. AI Vật Lý: Hệ Thống Cảm Biến & Hành Động' },
      unit: { en: 'The Physical Action', vi: 'Hành Động Vật Lý' },
      question: {
        en: 'How can intelligence act safely on matter and physical systems?',
        vi: 'Trí tuệ nhân tạo tác động an toàn lên thế giới vật lý như thế nào?'
      },
      status: { en: 'In Development', vi: 'Đang Phát Triển' },
      url: 'https://github.com/harvard-edge/cs249r_book/tree/dev/books/vol4',
      repoUrl: 'https://github.com/harvard-edge/cs249r_book/tree/dev/books/vol4',
      chapters: [
        { num: '01', slug: '01_boundary', title: 'The Physical Boundary', desc: 'Where latency becomes distance traveled and failures cannot be undone.' },
        { num: '02', slug: '02_body', title: 'The Body (Actuators & Mechanics)', desc: 'Kinematics, torque, power budgets, and physical embodiment.' },
        { num: '03', slug: '03_brain', title: 'The Brain (Onboard Compute)', desc: 'Real-time SoCs, embedded accelerators, and thermal envelopes.' },
        { num: '04', slug: '04_nervous', title: 'The Nervous System (Buses & Real-Time OS)', desc: 'Deterministic scheduling, CAN/EtherCAT, and sensor-actuator synchronization.' },
        { num: '05', slug: '05_data', title: 'Physical Data & Sim-to-Real', desc: 'Teleoperation, physics simulators, and bridging the sim-to-real gap.' },
        { num: '06', slug: '06_training', title: 'Training Physical Policies', desc: 'Imitation learning, VLA models, and reinforcement learning in physics.' },
        { num: '07', slug: '07_evaluation', title: 'Evaluating Embodied Systems', desc: 'Safety benchmarks, hardware-in-the-loop testing, and reliability metrics.' },
        { num: '08', slug: '08_perception', title: 'Multimodal Perception', desc: 'Fusing vision, LiDAR, tactile, and IMU streams under strict latency.' },
        { num: '09', slug: '09_memory', title: 'Spatial & World Memory', desc: 'SLAM, 3D scene graphs, and persistent physical state representation.' },
        { num: '10', slug: '10_intent', title: 'Intent & Task Grounding', desc: 'Translating high-level human goals into physically feasible objectives.' },
        { num: '11', slug: '11_planning', title: 'Motion & Control Planning', desc: 'MPC, trajectory optimization, and hierarchical control loops.' },
        { num: '12', slug: '12_enforcement', title: 'Safety Enforcement & Shielding', desc: 'Control barrier functions, hardware e-stops, and physical invariants.' },
        { num: '13', slug: '13_placement', title: 'Compute Placement (Edge vs. Cloud)', desc: 'Partitioning control loops between onboard silicon and remote servers.' },
        { num: '14', slug: '14_intervention', title: 'Human Intervention & Teleop', desc: 'Shared autonomy, takeover protocols, and fleet supervision.' },
        { num: '15', slug: '15_verification', title: 'Formal & Physical Verification', desc: 'Proving safety bounds before deploying to physical hardware.' },
        { num: '16', slug: '16_release', title: 'Fleet Release & OTA Updates', desc: 'Safe over-the-air rollouts for autonomous machines.' },
        { num: '17', slug: '17_responsibility', title: 'Physical Responsibility & Regulation', desc: 'Certification, liability, and ethical deployment in human spaces.' },
        { num: '18', slug: '18_frontier', title: 'The Physical AI Frontier', desc: 'Open problems at the intersection of silicon, matter, and intelligence.' }
      ]
    }
  ];

  const TOOLS = [
    {
      name: 'TinyTorch',
      tag: { en: 'Build from Scratch', vi: 'Tự Xây Từ Đầu' },
      desc: {
        en: 'Build an ML framework from scratch in 20 progressive modules, from tensors to a transformer.',
        vi: 'Tự xây dựng framework ML từ con số 0 qua 20 module, từ tensor đến transformer.'
      },
      url: 'https://mlsysbook.ai/tinytorch/'
    },
    {
      name: 'MLSys·im',
      tag: { en: 'Systems Simulator', vi: 'Mô Phỏng Hệ Thống' },
      desc: {
        en: 'Model memory, compute, network, and energy limits for systems too large to run in a classroom.',
        vi: 'Mô hình hóa giới hạn bộ nhớ, tính toán, mạng và năng lượng cho hệ thống quy mô lớn.'
      },
      url: 'https://mlsysbook.ai/mlsysim/'
    },
    {
      name: 'Interactive Labs',
      tag: { en: 'Marimo Notebooks', vi: 'Thực Hành Tương Tác' },
      desc: {
        en: 'Browser-based notebooks paired with textbook chapters: predict an outcome, tweak a parameter, see what breaks.',
        vi: 'Notebook chạy trực tiếp trên trình duyệt đi kèm từng chương để thử nghiệm thông số.'
      },
      url: 'https://mlsysbook.ai/labs/'
    },
    {
      name: 'Hardware Kits',
      tag: { en: 'Edge & TinyML', vi: 'Phần Cứng Thực Tế' },
      desc: {
        en: 'Deploy models to Arduino, Seeed, Grove, and Raspberry Pi under real memory, power, and latency budgets.',
        vi: 'Triển khai mô hình lên Arduino, Seeed, Grove và Raspberry Pi với giới hạn phần cứng thật.'
      },
      url: 'https://mlsysbook.ai/kits/'
    },
    {
      name: 'StaffML',
      tag: { en: '9,000+ Questions', vi: '9.000+ Câu Hỏi' },
      desc: {
        en: 'Systems design questions across cloud, edge, mobile, and TinyML with practice drills and mock interviews.',
        vi: 'Kho câu hỏi thiết kế hệ thống ML từ cloud đến edge, mobile và phỏng vấn thử.'
      },
      url: 'https://mlsysbook.ai/staffml/'
    },
    {
      name: 'Instructors & Slides',
      tag: { en: 'Teaching Suite', vi: 'Tài Liệu Giảng Dạy' },
      desc: {
        en: 'Complete course syllabi, weekly readings, and Beamer lecture decks for every chapter.',
        vi: 'Giáo án theo tuần, tài liệu đọc và slide bài giảng Beamer cho toàn bộ giáo trình.'
      },
      url: 'https://mlsysbook.ai/instructors/'
    }
  ];

  let activeVolId = 'vol1';
  let searchQuery = '';

  function renderCS249r(lang) {
    const container = document.getElementById('cs249rContainer');
    if (!container) return;
    const isVi = lang === 'vi';

    const activeVol = VOLUMES.find(v => v.id === activeVolId) || VOLUMES[0];
    const q = searchQuery.trim().toLowerCase();

    let chapterList = [];
    if (q) {
      VOLUMES.forEach(v => {
        v.chapters.forEach(ch => {
          if (
            ch.title.toLowerCase().includes(q) ||
            ch.desc.toLowerCase().includes(q) ||
            ch.num.includes(q)
          ) {
            chapterList.push({ ...ch, vol: v });
          }
        });
      });
    } else {
      chapterList = activeVol.chapters.map(ch => ({ ...ch, vol: activeVol }));
    }

    const volTabsHtml = VOLUMES.map(v => `
      <button type="button" class="tab-btn ${v.id === activeVolId && !q ? 'active' : ''}" data-vol="${v.id}">
        <strong>${v.num}</strong> · ${v.unit[lang]}
      </button>
    `).join('');

    const chaptersHtml = chapterList.length > 0
      ? chapterList.map(ch => {
          const chUrl = (ch.vol.id === 'vol1' || ch.vol.id === 'vol2')
            ? `${ch.vol.url}contents/core/${ch.slug.replace(/^\d+_/, '')}.html`
            : `${ch.vol.repoUrl}/${ch.slug}`;
          const fallbackUrl = ch.vol.repoUrl + '/' + ch.slug;
          return `
            <div class="cs-chapter-card">
              <div class="cs-chapter-head">
                <span class="badge">${ch.vol.num} · Ch. ${ch.num}</span>
                <a href="${fallbackUrl}" target="_blank" rel="noopener noreferrer" class="cs-ext-link">GitHub ↗</a>
              </div>
              <h4 class="cs-chapter-title">${ch.title}</h4>
              <p class="cs-chapter-desc">${ch.desc}</p>
            </div>
          `;
        }).join('')
      : `<p style="color:var(--ink-muted); padding:1rem 0;">${isVi ? 'Không tìm thấy chương phù hợp.' : 'No matching chapters found.'}</p>`;

    const toolsHtml = TOOLS.map(tool => `
      <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="cs-tool-card">
        <div style="display:flex; justify-content:space-between; align-items:center; gap:0.5rem; margin-bottom:0.35rem;">
          <strong style="font-size:0.98rem; color:var(--ink-black);">${tool.name}</strong>
          <span class="badge">${tool.tag[lang]}</span>
        </div>
        <p style="font-size:0.85rem; color:var(--ink-secondary); margin:0;">${tool.desc[lang]}</p>
      </a>
    `).join('');

    container.innerHTML = `
      <section class="sacred-card">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:1rem;">
          <div style="max-width:740px;">
            <span class="badge badge-highlight">Harvard CS249r · Open Textbook</span>
            <h2 style="font-family:var(--font-serif); font-size:1.6rem; margin:0.5rem 0 0.35rem; color:var(--ink-black);">
              ${isVi ? 'Hệ Thống Học Máy (Machine Learning Systems)' : 'Machine Learning Systems (Vols I–IV)'}
            </h2>
            <p style="margin-bottom:0.5rem;">
              ${isVi
                ? 'Bộ giáo trình mở từ Đại học Harvard về cách xây dựng và lý giải kiến trúc hệ thống Học Máy — đi từ một máy đơn, cụm máy chủ, AI tác tử đến AI vật lý, kèm bộ công cụ thực hành.'
                : 'An open textbook series from Harvard on how machine learning systems are built and why they are built that way — spanning single machines, distributed fleets, agentic AI, and physical AI.'}
            </p>
            <p style="font-size:0.86rem; color:var(--ink-muted); margin-bottom:0;">
              <em>“Constraints drive architecture.”</em>
            </p>
          </div>
          <div style="display:flex; flex-wrap:wrap; gap:0.5rem;">
            <a href="https://mlsysbook.ai" target="_blank" rel="noopener noreferrer" class="btn-primary" style="text-decoration:none; display:inline-block;">
              ${isVi ? 'Đọc Trực Tuyến (mlsysbook.ai) ↗' : 'Read Online (mlsysbook.ai) ↗'}
            </a>
            <a href="https://github.com/harvard-edge/cs249r_book" target="_blank" rel="noopener noreferrer" class="btn-secondary" style="text-decoration:none; display:inline-flex; align-items:center;">
              GitHub Repo ↗
            </a>
          </div>
        </div>
      </section>

      <section class="sacred-card">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.75rem; margin-bottom:1rem;">
          <h3 style="margin-bottom:0;">${isVi ? '4 Tập Giáo Trình & Danh Sách Chương' : 'Four Volumes & Chapter Explorer'}</h3>
          <input
            id="csSearchInput"
            type="text"
            class="birth-input"
            style="min-width:240px; max-width:340px;"
            value="${searchQuery.replace(/"/g, '&quot;')}"
            placeholder="${isVi ? 'Tìm chương (vd: KV cache, quantization, TinyML)...' : 'Search all 71 chapters (e.g. KV cache, quantization)...'}"
          />
        </div>

        <div class="tabs-nav" style="margin-bottom:1rem;">
          ${volTabsHtml}
        </div>

        ${!q ? `
          <div class="meaning-hero" style="margin-bottom:1.1rem;">
            <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.5rem;">
              <div>
                <span class="badge badge-accent">${activeVol.status[lang]}</span>
                <h4 style="font-family:var(--font-serif); font-size:1.2rem; margin:0.4rem 0 0.2rem;">${activeVol.title[lang]}</h4>
              </div>
              <a href="${activeVol.url}" target="_blank" rel="noopener noreferrer" class="btn-ghost" style="text-decoration:none;">
                ${isVi ? 'Mở Tập Này ↗' : 'Open Volume ↗'}
              </a>
            </div>
            <p style="margin:0.35rem 0 0; font-size:0.9rem;"><strong>${isVi ? 'Câu hỏi cốt lõi:' : 'Core systems question:'}</strong> ${activeVol.question[lang]}</p>
          </div>
        ` : `
          <p style="font-size:0.85rem; color:var(--ink-muted); margin-bottom:0.85rem;">
            ${isVi ? `Tìm thấy ${chapterList.length} chương cho "${searchQuery}"` : `Showing ${chapterList.length} matching chapters for "${searchQuery}"`}
          </p>
        `}

        <div class="cs-chapter-grid">
          ${chaptersHtml}
        </div>
      </section>

      <section class="sacred-card">
        <h3>${isVi ? 'Hệ Sinh Thái Công Cụ Đi Kèm' : 'Companion Tools & Ecosystem'}</h3>
        <div class="cs-tools-grid">
          ${toolsHtml}
        </div>
      </section>
    `;

    container.querySelectorAll('[data-vol]').forEach(btn => {
      btn.addEventListener('click', () => {
        activeVolId = btn.getAttribute('data-vol');
        searchQuery = '';
        renderCS249r(lang);
      });
    });

    const searchInput = document.getElementById('csSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        const pos = searchInput.selectionStart;
        renderCS249r(lang);
        const nextInput = document.getElementById('csSearchInput');
        if (nextInput) {
          nextInput.focus();
          nextInput.setSelectionRange(pos, pos);
        }
      });
    }
  }

  window.renderCS249r = renderCS249r;
})();
