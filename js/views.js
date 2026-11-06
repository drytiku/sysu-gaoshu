/* ============================================================
 * 中大高数题库 · views.js
 * 页面视图：首页 / 章节练习 / 错题本 / 统计中心 / 关于
 * ============================================================ */

const FLOAT_FORMULAS = [
  "$$e^{i\\pi}+1=0$$",
  "$$\\int e^x\\,dx=e^x+C$$",
  "$$\\lim_{n\\to\\infty}\\left(1+\\frac1n\\right)^n=e$$",
  "$$\\frac{d}{dx}\\sin x=\\cos x$$",
  "$$\\sum_{n=1}^{\\infty}\\frac{1}{n^2}=\\frac{\\pi^2}{6}$$",
  "$$\\oint_L P\\,dx+Q\\,dy$$",
  "$$\\nabla f=\\left(\\frac{\\partial f}{\\partial x},\\frac{\\partial f}{\\partial y}\\right)$$",
  "$$\\int_0^1 x^2\\,dx=\\frac13$$"
];

/* ---------- 首页 ---------- */
function renderHome() {
  const lv = levelInfo(state.xp);
  const streak = currentStreak();
  const dailyQ = dailyQuestion();
  const dailyDone = !!state.daily[todayStr()];
  const app = $("#app");

  app.innerHTML = `
  <div class="hero view-enter">
    <div class="hero-floats" id="hero-floats"></div>
    <div class="hero-inner">
      <div class="hero-badge">🎓 中山大学 · 高等数学</div>
      <h1 class="hero-title">dry<span class="grad-text">tiku</span></h1>
      <p class="hero-sub">参照北京大学版《高等数学》上、下册章节体系 · 覆盖历年期末常见题型</p>
      <div class="hero-chips">
        <span class="chip">📚 12 章知识体系</span>
        <span class="chip">🧮 ${ALL_QUESTIONS.length}+ 道题目</span>
        <span class="chip">📱 手机友好</span>
      </div>
      <div class="hero-actions">
        <button class="btn-primary btn-big" id="btn-practice">开始练习 📖</button>
        <button class="btn-ghost btn-big" id="btn-exam">模拟考试 📝</button>
      </div>
      <div class="hero-stats">
        <div class="hs-item"><div class="hs-num">${lv.lv}</div><div class="hs-label">等级 · ${lv.title}</div></div>
        <div class="hs-item"><div class="hs-num">${totalAnswered()}</div><div class="hs-label">已答题</div></div>
        <div class="hs-item"><div class="hs-num">${streak}🔥</div><div class="hs-label">连续学习</div></div>
      </div>
      <div class="xp-bar"><div class="xp-fill" style="width:${lv.pct}%"></div></div>
      <div class="xp-text">${lv.next ? `距「${LEVELS[lv.lv + 1].title}」还差 ${lv.next - state.xp} EXP` : "已达最高等级！"}</div>
    </div>
  </div>

  <div class="container">
    <div class="daily-card card" id="daily-card">
      <div class="daily-left">
        <div class="daily-label">🎯 每日一题 · ${todayStr().slice(5)}</div>
        <div class="daily-q">${renderRich(dailyQ.question)}</div>
        <div class="daily-meta">${typeEmoji(dailyQ.type)} ${typeName(dailyQ.type)} · ${CHAPTERS[dailyQ.chapter-1].short} · 难度 ${"●".repeat(dailyQ.difficulty)}</div>
      </div>
      <button class="btn-primary" id="btn-daily">${dailyDone ? "已完成 ✓" : "去挑战"}</button>
    </div>

    <div class="section-head">
      <h2>上册 · 一元微积分</h2>
      <span class="section-sub">第 1-7 章</span>
    </div>
    <div class="chapter-grid">${chapterCards(1)}</div>

    <div class="section-head">
      <h2>下册 · 多元微积分与级数</h2>
      <span class="section-sub">第 8-12 章</span>
    </div>
    <div class="chapter-grid">${chapterCards(2)}</div>
  </div>`;

  // 漂浮公式
  const floats = $("#hero-floats");
  FLOAT_FORMULAS.forEach((f, i) => {
    const el = document.createElement("div");
    el.className = "float-formula";
    el.style.left = `${8 + Math.random() * 84}%`;
    el.style.animationDelay = `${-Math.random() * 14}s`;
    el.style.animationDuration = `${13 + Math.random() * 9}s`;
    el.innerHTML = renderMath(f.replace(/^\$\$|\$\$$/g, ""), false);
    floats.appendChild(el);
  });

  $("#btn-practice").addEventListener("click", () => { sfx.click(); goto("/practice"); });
  $("#btn-exam").addEventListener("click", () => { sfx.click(); goto("/exam"); });
  bindChapterCards();
  $("#btn-daily").addEventListener("click", () => {
    if (dailyDone) { toast("今天已经完成啦，明天再来！", "🌙"); return; }
    sfx.click();
    quiz.mode = "daily";
    quiz.ids = [dailyQ.id];
    quiz.title = "🎯 每日一题";
    quiz.startTs = Date.now();
    quiz.correct = 0; quiz.wrongIds = []; quiz.calcCorrect = 0; quiz.calcWrong = 0;
    quiz.gainedXp = 0; quiz.levelUps = 0; quiz.idx = 0; quiz.locked = false;
    renderQuiz();
  });
}

function dailyQuestion() {
  const pool = ALL_QUESTIONS.filter(q => q.type !== "calc");
  return pool[hashOf("sysu-" + todayStr()) % pool.length];
}

function chapterCards(vol) {
  return CHAPTERS.filter(c => c.vol === vol).map((c, i) => {
    const st = chapterStats(c.n);
    const ring = st.acc == null ? 0 : st.acc;
    return `
    <div class="chapter-card card" data-ch="${c.n}" style="--i:${i}; --c:${c.color}">
      <div class="cc-top">
        <div class="cc-icon">${c.icon}</div>
        <div class="cc-ring" style="--pct:${100 - ring}">
          <span class="cc-ring-num">${st.acc == null ? "—" : ring + "%"}</span>
        </div>
      </div>
      <div class="cc-name">第${["一","二","三","四","五","六","七","八","九","十","十一","十二"][c.n-1]}章</div>
      <div class="cc-title">${c.name}</div>
      <div class="cc-desc">${c.desc}</div>
      <div class="cc-foot">
        <span class="cc-count">${st.answered}/${st.total} 已练</span>
        <span class="cc-go">去练习 →</span>
      </div>
    </div>`;
  }).join("");
}

/** 绑定章节卡片点击事件（首页与练习页共用） */
function bindChapterCards() {
  $$(".chapter-card").forEach(card => {
    card.addEventListener("click", () => { sfx.click(); startPractice(+card.dataset.ch); });
  });
}

/* ---------- 章节练习列表 ---------- */
function renderPractice() {
  const app = $("#app");
  const order = state.settings.order;
  app.innerHTML = `
  <div class="container view-enter">
    <div class="page-head">
      <h1>📖 章节练习</h1>
      <p>按章节逐章突破，答案即时反馈，解析步步拆解</p>
    </div>
    <div class="practice-tools">
      <button class="btn-primary" id="p-custom">🎯 自由选题</button>
      <button class="btn-primary ghost" id="p-exam">📝 模拟考试</button>
      <button class="btn-ghost" id="p-wrong">🧹 错题重练 (${Object.keys(state.wrong).length})</button>
    </div>
    <div class="order-bar">
      <span class="order-label">练习顺序</span>
      <div class="order-toggle" id="order-toggle">
        <button class="ot-btn ${order === "easy" ? "on" : ""}" data-order="easy">🌱 易 → 难</button>
        <button class="ot-btn ${order === "random" ? "on" : ""}" data-order="random">🎲 随机</button>
      </div>
    </div>
    <div class="section-head"><h2>上册 · 一元微积分</h2><span class="section-sub">第 1-7 章</span></div>
    <div class="chapter-grid">${chapterCards(1)}</div>
    <div class="section-head"><h2>下册 · 多元微积分与级数</h2><span class="section-sub">第 8-12 章</span></div>
    <div class="chapter-grid">${chapterCards(2)}</div>
  </div>`;

  $$("#order-toggle .ot-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      state.settings.order = btn.dataset.order;
      saveState();
      renderPractice();
      toast(btn.dataset.order === "easy" ? "已切换为 易 → 难 顺序" : "已切换为随机顺序", btn.dataset.order === "easy" ? "🌱" : "🎲");
    });
  });

  $("#p-exam").addEventListener("click", () => { sfx.click(); goto("/exam"); });
  $("#p-custom").addEventListener("click", () => { sfx.click(); goto("/custom"); });
  $("#p-wrong").addEventListener("click", () => {
    sfx.click();
    if (!Object.keys(state.wrong).length) { toast("太棒了，没有错题！", "🎉"); return; }
    startWrongPractice();
  });

  bindChapterCards();
}

/* ---------- 模拟考试入口 ---------- */
function renderExam() {
  const app = $("#app");
  const last = state.exams[state.exams.length - 1];
  const all = ALL_QUESTIONS.filter(q => q.type !== "calc").length;
  app.innerHTML = `
  <div class="container view-enter">
    <div class="page-head"><h1>📝 模拟考试</h1><p>随机组卷 · 限时作答 · 考后解析</p></div>
    <div class="exam-cards">
      <div class="card exam-card" id="exam-all">
        <div class="exam-icon">🏛️</div>
        <div class="exam-name">全册模拟考试</div>
        <div class="exam-desc">从全册题库随机抽取 10 题，每题限时 90 秒</div>
        <button class="btn-primary">开始考试</button>
      </div>
      <div class="card exam-card" id="exam-upper">
        <div class="exam-icon">📗</div>
        <div class="exam-name">上册专项</div>
        <div class="exam-desc">第 1-7 章随机 10 题，检验一元微积分功底</div>
        <button class="btn-primary">开始考试</button>
      </div>
      <div class="card exam-card" id="exam-lower">
        <div class="exam-icon">📘</div>
        <div class="exam-name">下册专项</div>
        <div class="exam-desc">第 8-12 章随机 10 题，多元微积分与级数</div>
        <button class="btn-primary">开始考试</button>
      </div>
    </div>
    ${last ? `
    <div class="card history-card">
      <div class="hc-title">📜 最近考试</div>
      <div class="hc-item">
        <span>${last.d} · 得分 ${last.score}/${last.total}</span>
        <span class="hc-score ${last.score === last.total ? "perfect" : ""}">${Math.round(last.score / last.total * 100)} 分</span>
      </div>
      ${state.exams.length > 1 ? `<div class="hc-more">共参加 ${state.exams.length} 次考试，平均 ${Math.round(state.exams.reduce((s, e) => s + e.score / e.total * 100, 0) / state.exams.length)} 分</div>` : ""}
    </div>` : ""}
  </div>`;

  $("#exam-all").addEventListener("click", () => { sfx.click(); startExam(null); });
  $("#exam-upper").addEventListener("click", () => { sfx.click(); startExamScope([1,2,3,4,5,6,7]); });
  $("#exam-lower").addEventListener("click", () => { sfx.click(); startExamScope([8,9,10,11,12]); });
}

function startExamScope(chapters) {
  const pool = ALL_QUESTIONS.filter(q => q.type !== "calc" && chapters.includes(q.chapter));
  const picked = shuffle(pool).slice(0, 10);
  quiz.mode = "exam";
  quiz.ids = picked.map(q => q.id);
  quiz.title = chapters[0] <= 7 ? "📝 上册专项考试" : "📝 下册专项考试";
  quiz.startTs = Date.now();
  quiz.correct = 0; quiz.wrongIds = []; quiz.calcCorrect = 0; quiz.calcWrong = 0;
  quiz.gainedXp = 0; quiz.levelUps = 0; quiz.idx = 0; quiz.locked = false;
  quiz.finished = false;
  quiz.timerSec = quiz.ids.length * 90;
  quiz.examDeadline = Date.now() + quiz.timerSec * 1000;
  renderQuiz();
}

/* ---------- 自由选题 ---------- */
const customState = { ch: 0, type: "all", diff: 0, sel: new Set(), shown: 40 };

function renderCustom() {
  const app = $("#app");
  const st = customState;
  app.innerHTML = `
  <div class="container view-enter">
    <div class="page-head">
      <h1>🎯 自由选题</h1>
      <p>按章节、题型、难度筛选，定制你的专属练习</p>
    </div>
    <div class="card filter-card">
      <div class="f-row">
        <span class="f-label">章节</span>
        <select class="f-select" id="f-ch">
          <option value="0" ${st.ch === 0 ? "selected" : ""}>全部章节</option>
          ${CHAPTERS.map(c => `<option value="${c.n}" ${st.ch === c.n ? "selected" : ""}>${c.icon} 第${["一","二","三","四","五","六","七","八","九","十","十一","十二"][c.n-1]}章 · ${c.name}</option>`).join("")}
        </select>
      </div>
      <div class="f-row">
        <span class="f-label">题型</span>
        <div class="chip-row" id="f-type">
          ${[["all", "全部"], ["choice", "🅰️ 选择题"], ["fill", "✍️ 填空题"], ["calc", "🧮 解答题"]].map(([v, l]) =>
            `<button class="f-chip ${st.type === v ? "on" : ""}" data-type="${v}">${l}</button>`).join("")}
        </div>
      </div>
      <div class="f-row">
        <span class="f-label">难度</span>
        <div class="chip-row" id="f-diff">
          ${[[0, "全部"], [1, "● 基础"], [2, "●● 进阶"], [3, "●●● 挑战"]].map(([v, l]) =>
            `<button class="f-chip ${st.diff === v ? "on" : ""}" data-diff="${v}">${l}</button>`).join("")}
        </div>
      </div>
    </div>
    <div class="pick-bar">
      <span class="pick-bar-note">点击题目即可选中/取消 · 练习时按 易→难 排序</span>
    </div>
    <div class="pick-list" id="pick-list"></div>
    <div class="pick-sticky" id="pick-sticky">
      <span class="pick-count" id="pick-count">已选 ${st.sel.size} 题</span>
      <button class="btn-ghost" id="pick-random">🎲 随机抽 10 题</button>
      <button class="btn-primary" id="pick-start">开始练习 →</button>
    </div>
  </div>`;

  renderPickList();

  $("#f-ch").addEventListener("change", e => { st.ch = +e.target.value; renderPickList(); });
  $$("#f-type .f-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      st.type = btn.dataset.type;
      $$("#f-type .f-chip").forEach(b => b.classList.toggle("on", b === btn));
      renderPickList();
    });
  });
  $$("#f-diff .f-chip").forEach(btn => {
    btn.addEventListener("click", () => {
      st.diff = +btn.dataset.diff;
      $$("#f-diff .f-chip").forEach(b => b.classList.toggle("on", b === btn));
      renderPickList();
    });
  });

  $("#pick-random").addEventListener("click", () => {
    const pool = filteredPool();
    if (!pool.length) { toast("没有符合条件的题目", "😅"); return; }
    st.sel = new Set(shuffle(pool).slice(0, Math.min(10, pool.length)).map(q => q.id));
    renderPickList();
    toast(`已随机选择 ${st.sel.size} 题`, "🎲");
  });

  $("#pick-start").addEventListener("click", () => {
    if (!st.sel.size) { toast("请先选择题目", "👆"); return; }
    sfx.click();
    const ids = [...st.sel];
    startCustomPractice(ids, `🎯 自由选题 · ${ids.length} 题`);
  });
}

function filteredPool() {
  const st = customState;
  return ALL_QUESTIONS.filter(q =>
    (st.ch === 0 || q.chapter === st.ch) &&
    (st.type === "all" || q.type === st.type) &&
    (st.diff === 0 || q.difficulty === st.diff)
  );
}

function renderPickList() {
  const st = customState;
  const pool = filteredPool();
  const list = $("#pick-list");
  const visible = pool.slice(0, st.shown);
  list.innerHTML = visible.map((q, i) => {
    const on = st.sel.has(q.id);
    return `
    <div class="pick-item card ${on ? "on" : ""}" data-id="${q.id}">
      <label class="pick-check" for="pk-${i}">
        <input type="checkbox" id="pk-${i}" ${on ? "checked" : ""} />
        <span class="pick-box">${on ? "✓" : ""}</span>
      </label>
      <div class="pick-body">
        <div class="pick-q">${renderRich(q.question)}</div>
        <div class="pick-meta">
          <span class="badge-type badge-${q.type}">${typeName(q.type)}</span>
          <span class="badge-diff">${"●".repeat(q.difficulty)}${"○".repeat(3 - q.difficulty)}</span>
          <span class="badge-ch">${CHAPTERS[q.chapter - 1].icon} ${CHAPTERS[q.chapter - 1].short}</span>
        </div>
      </div>
    </div>`;
  }).join("") + (pool.length > st.shown
    ? `<button class="btn-ghost load-more" id="pick-more">加载更多（还有 ${pool.length - st.shown} 题）</button>`
    : pool.length ? "" : `<div class="pick-empty">😕 没有符合条件的题目</div>`);

  $("#pick-count").textContent = `已选 ${st.sel.size} 题`;

  $$(".pick-item").forEach(item => {
    item.addEventListener("click", () => {
      const id = item.dataset.id;
      if (st.sel.has(id)) st.sel.delete(id); else st.sel.add(id);
      item.classList.toggle("on");
      const box = item.querySelector(".pick-box");
      const cb = item.querySelector("input");
      cb.checked = st.sel.has(id);
      box.textContent = st.sel.has(id) ? "✓" : "";
      $("#pick-count").textContent = `已选 ${st.sel.size} 题`;
    });
  });

  const more = $("#pick-more");
  if (more) more.addEventListener("click", () => { st.shown += 40; renderPickList(); });
}

/* ---------- 排行榜 ---------- */
function renderLeaderboard() {
  const app = $("#app");
  const data = leaderboardData();
  const meIdx = data.findIndex(d => d.me);
  const rank = meIdx + 1;
  const prev = meIdx > 0 ? data[meIdx - 1] : null;
  const medals = ["🥇", "🥈", "🥉"];

  app.innerHTML = `
  <div class="container view-enter">
    <div class="page-head">
      <h1>🏆 学习排行榜</h1>
      <p>以累计 EXP 排名 · 每周一刷新榜单</p>
    </div>

    <div class="card rank-card">
      <div class="rank-me">
        <div class="rank-me-badge">${rank <= 3 ? medals[rank - 1] : "#" + rank}</div>
        <div class="rank-me-info">
          <div class="rank-me-name">我 <span class="rank-me-sub">Lv.${levelInfo(state.xp).lv} ${levelInfo(state.xp).title}</span></div>
          <div class="rank-me-detail">${state.xp} EXP · 累计答题 ${totalAnswered()} 题</div>
        </div>
        <div class="rank-me-gap">${rank === 1 ? "👑 榜首！" : prev ? `距前一名 ${prev.xp - state.xp} EXP` : ""}</div>
      </div>
    </div>

    <div class="card lb-card">
      ${data.map((d, i) => `
        <div class="lb-item ${d.me ? "me" : ""}" style="--i:${Math.min(i, 14)}">
          <div class="lb-rank">${i < 3 ? medals[i] : i + 1}</div>
          <div class="lb-avatar">${d.me ? "∫" : "🧑‍🎓"}</div>
          <div class="lb-info">
            <div class="lb-name">${d.name}${d.me ? " <span class='lb-me-tag'>本机</span>" : ""}</div>
            <div class="lb-sub">答题 ${d.answered} 题</div>
          </div>
          <div class="lb-xp">${d.xp} <span>EXP</span></div>
        </div>`).join("")}
    </div>
    <p class="lb-note">💡 榜单中的同学为 AI 模拟数据，每周一刷新，仅供娱乐。多多刷题，冲上榜首！</p>
  </div>`;
}

/* ---------- 错题本 ---------- */
function renderWrongbook() {
  const app = $("#app");
  const wrongIds = Object.keys(state.wrong);
  if (!wrongIds.length) {
    app.innerHTML = `
    <div class="container view-enter empty-page">
      <div class="empty-icon">🧹</div>
      <h1>错题本是空的</h1>
      <p>继续练习吧！答错的题会自动收进这里</p>
      <button class="btn-primary" id="empty-go">去练习 📖</button>
    </div>`;
    $("#empty-go").addEventListener("click", () => { goto("/practice"); });
    return;
  }

  app.innerHTML = `
  <div class="container view-enter">
    <div class="page-head">
      <h1>🧹 错题本</h1>
      <p>共 ${wrongIds.length} 道错题待攻克，答对即自动移除</p>
    </div>
    <div class="practice-tools">
      <button class="btn-primary" id="wb-practice">🔁 重练全部错题</button>
      <button class="btn-ghost" id="wb-md">📥 导出 Markdown</button>
      <button class="btn-ghost" id="wb-print">🖨️ 打印 / 存 PDF</button>
      <button class="btn-ghost danger" id="wb-clear">清空</button>
    </div>
    <div class="wb-list">
      ${wrongIds.map(id => {
        const q = questionById(id);
        return `
        <div class="card wb-item" data-id="${id}">
          <div class="wb-q">${renderRich(q.question)}</div>
          <div class="wb-meta">
            <span class="badge-ch">${CHAPTERS[q.chapter-1].icon} ${CHAPTERS[q.chapter-1].short}</span>
            <span class="badge-type badge-${q.type}">${typeName(q.type)}</span>
            <span class="wb-wrongcount">答错 ${state.wrong[id]} 次</span>
            <button class="star-btn ${state.favs.includes(id) ? "on" : ""}" data-fav="${id}">${state.favs.includes(id) ? "★" : "☆"}</button>
          </div>
        </div>`;
      }).join("")}
    </div>
  </div>`;

  $("#wb-practice").addEventListener("click", () => { sfx.click(); startWrongPractice(); });
  $("#wb-md").addEventListener("click", () => { sfx.click(); exportWrongMD(); });
  $("#wb-print").addEventListener("click", () => { sfx.click(); printWrong(); });
  $("#wb-clear").addEventListener("click", () => {
    if (confirm("确定清空错题本吗？此操作不可撤销。")) {
      state.wrong = {};
      state.clearedWrongOnce = true;
      saveState();
      checkBadges();
      toast("错题本已清空", "🧹");
      renderWrongbook();
    }
  });
  $$(".wb-item").forEach(item => {
    item.addEventListener("click", () => {
      sfx.click();
      quiz.mode = "practice";
      quiz.ids = [item.dataset.id];
      quiz.title = "🧹 错题单练";
      quiz.startTs = Date.now();
      quiz.correct = 0; quiz.wrongIds = []; quiz.calcCorrect = 0; quiz.calcWrong = 0;
      quiz.gainedXp = 0; quiz.levelUps = 0; quiz.idx = 0; quiz.locked = false;
      renderQuiz();
    });
  });
  $$(".star-btn").forEach(btn => {
    btn.addEventListener("click", e => {
      e.stopPropagation();
      const id = btn.dataset.fav;
      const idx = state.favs.indexOf(id);
      if (idx >= 0) state.favs.splice(idx, 1); else state.favs.push(id);
      saveState();
      renderWrongbook();
    });
  });
}

/* ---------- 统计中心 ---------- */
function renderStats() {
  const app = $("#app");
  const lv = levelInfo(state.xp);
  const answered = totalAnswered();
  const correct = totalCorrect();
  const acc = answered ? Math.round(correct / answered * 100) : null;
  const days = dayCounts();
  const weeks = 16;
  const cells = [];
  let maxN = 1;
  Object.values(days).forEach(v => { if (v > maxN) maxN = v; });
  Object.entries(days).forEach(([k, v]) => {
    const lvN = v === 0 ? 0 : Math.min(4, 1 + Math.floor(v / Math.max(1, maxN / 4)));
    cells.push(`<div class="heat-cell h${lvN}" title="${k}：${v} 题"></div>`);
  });

  // 各章正确率
  const chapterBars = CHAPTERS.map(c => {
    const st = chapterStats(c.n);
    const pct = st.acc == null ? 0 : st.acc;
    return `
    <div class="cb-row">
      <span class="cb-name">${c.icon} ${c.short}</span>
      <div class="cb-track"><div class="cb-fill" style="width:${pct}%;background:${c.color}"></div></div>
      <span class="cb-val">${st.acc == null ? "—" : pct + "%"}</span>
    </div>`;
  }).join("");

  app.innerHTML = `
  <div class="container view-enter">
    <div class="page-head"><h1>📊 我的统计</h1><p>记录每一次思考与成长</p></div>

    <div class="card profile-card">
      <div class="pf-avatar">∫</div>
      <div class="pf-info">
        <div class="pf-name">Lv.${lv.lv} ${lv.title}</div>
        <div class="pf-xp">${state.xp} EXP${lv.next ? ` · 距下一级 ${lv.next - state.xp} EXP` : " · 满级！"}</div>
        <div class="xp-bar"><div class="xp-fill" style="width:${lv.pct}%"></div></div>
      </div>
    </div>

    <div class="stat-grid">
      <div class="card stat-card"><div class="sc-num">${answered}</div><div class="sc-label">累计答题</div></div>
      <div class="card stat-card"><div class="sc-num">${acc == null ? "—" : acc + "%"}</div><div class="sc-label">总正确率</div></div>
      <div class="card stat-card"><div class="sc-num">${state.bestStreak}</div><div class="sc-label">最长连续🔥</div></div>
      <div class="card stat-card"><div class="sc-num">${state.exams.length}</div><div class="sc-label">参加考试</div></div>
    </div>

    <div class="card heat-card">
      <div class="hc-title">🔥 学习热力图（近 16 周）</div>
      <div class="heat-grid">${cells.join("")}</div>
      <div class="heat-legend"><span>少</span><div class="heat-cell h0"></div><div class="heat-cell h1"></div><div class="heat-cell h2"></div><div class="heat-cell h3"></div><div class="heat-cell h4"></div><span>多</span></div>
    </div>

    <div class="card bars-card">
      <div class="hc-title">📈 各章正确率</div>
      <div class="cb-list">${chapterBars}</div>
    </div>

    <div class="card badges-card">
      <div class="hc-title">🏅 徽章墙（${state.badges.length}/${BADGES.length}）</div>
      <div class="badge-grid">
        ${BADGES.map(b => {
          const on = state.badges.includes(b.id);
          return `<div class="badge-item ${on ? "on" : ""}">
            <div class="bi-icon">${on ? b.icon : "🔒"}</div>
            <div class="bi-name">${b.name}</div>
            <div class="bi-desc">${b.desc}</div>
          </div>`;
        }).join("")}
      </div>
    </div>
  </div>`;
}

/* ---------- 错题导出 ---------- */
function wrongSortedIds() {
  return Object.keys(state.wrong)
    .map(id => QUESTION_MAP[id])
    .filter(Boolean)
    .sort((a, b) => a.chapter - b.chapter || a.difficulty - b.difficulty)
    .map(q => q.id);
}

/** 导出 Markdown 文件 */
function exportWrongMD() {
  const ids = wrongSortedIds();
  if (!ids.length) { toast("没有错题可导出", "😅"); return; }
  const lines = [
    "# drytiku 错题本",
    "",
    "> 导出日期：" + todayStr() + " · 共 " + ids.length + " 题 · 按章节排序",
    "",
    "用支持 LaTeX 公式的 Markdown 编辑器（如 Typora、Obsidian）查看效果最佳。",
    ""
  ];
  ids.forEach((id, i) => {
    const q = QUESTION_MAP[id];
    lines.push(`## ${i + 1}. [${typeName(q.type)} · ${CHAPTERS[q.chapter - 1].name} · 答错 ${state.wrong[id]} 次]`, "");
    lines.push(q.question.replace(/\$\$/g, "\n$$\n").replace(/\\\(/g, "$").replace(/\\\)/g, "$"));
    lines.push("");
    if (q.type === "choice") {
      q.options.forEach((o, j) => lines.push(`- ${["A", "B", "C", "D"][j]}. ${o.replace(/\\\(/g, "$").replace(/\\\)/g, "$")}${j === q.answer ? "  ✅ 正确" : ""}`));
      lines.push("");
    }
    lines.push(`**答案：** ${(q.type === "fill" ? q.answer[0] : q.type === "choice" ? q.options[q.answer] : "见解析").replace(/\\\(/g, "$").replace(/\\\)/g, "$")}`, "");
    lines.push("**解析：**");
    q.solution.forEach(s => lines.push(`- ${s.replace(/\$\$/g, "").replace(/\\\(/g, "$").replace(/\\\)/g, "$")}`));
    lines.push("", "---", "");
  });
  const blob = new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = `drytiku-错题本-${todayStr()}.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 3000);
  toast(`已导出 ${ids.length} 道错题`, "📥");
}

/** 打印 / 存为 PDF */
function printWrong() {
  const ids = wrongSortedIds();
  if (!ids.length) { toast("没有错题可导出", "😅"); return; }
  const base = location.href.replace(/[^/]*$/, "");
  const w = window.open("", "_blank", "width=800,height=900");
  if (!w) { toast("浏览器拦截了弹窗，请允许弹窗后重试", "⚠️"); return; }
  const html = `<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8">
  <title>drytiku 错题本</title>
  <link rel="stylesheet" href="${base}css/katex.min.css">
  <style>
    body { font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif; max-width: 780px; margin: 0 auto; padding: 26px 18px; color: #17261e; line-height: 1.7; }
    h1 { font-size: 22px; border-bottom: 3px solid #0e8a4e; padding-bottom: 10px; }
    .sub { color: #5d7266; font-size: 13px; margin: -10px 0 18px; }
    .q { border: 1px solid #dbe5de; border-radius: 12px; padding: 16px 18px; margin: 14px 0; page-break-inside: avoid; }
    .q h3 { font-size: 15px; margin: 0 0 10px; color: #0e8a4e; }
    .opt { margin: 4px 0; }
    .ans { background: #e8f5ee; border-radius: 8px; padding: 8px 14px; margin: 10px 0; }
    ol { padding-left: 22px; } li { margin: 4px 0; }
    .katex { font-size: 1.02em; }
    .no-print { position: sticky; top: 0; text-align: right; background: #fff; padding: 10px 0; }
    .no-print button { font-size: 15px; padding: 10px 22px; border-radius: 99px; border: none; background: #0e8a4e; color: #fff; cursor: pointer; }
    @media print { .no-print { display: none; } body { padding: 0; } }
  </style></head><body>
  <div class="no-print"><button onclick="window.print()">🖨️ 打印 / 存为 PDF</button></div>
  <h1>🧹 drytiku 错题本</h1>
  <p class="sub">导出日期：${todayStr()} · 共 ${ids.length} 题 · 按章节排序</p>
  ${ids.map((id, i) => {
    const q = QUESTION_MAP[id];
    return `<div class="q">
      <h3>${i + 1}. ${typeName(q.type)} · ${CHAPTERS[q.chapter - 1].name} · 答错 ${state.wrong[id]} 次</h3>
      <div>${renderRich(q.question)}</div>
      ${q.type === "choice" ? `<div>${q.options.map((o, j) => `<div class="opt">${["A", "B", "C", "D"][j]}. ${renderRich(o)}${j === q.answer ? " ✅" : ""}</div>`).join("")}</div>` : ""}
      <div class="ans"><b>答案：</b>${answerDisplay(q)}</div>
      <div><b>解析：</b><ol>${q.solution.map(s => `<li>${renderRich(s)}</li>`).join("")}</ol></div>
    </div>`;
  }).join("")}
  </body></html>`;
  w.document.write(html);
  w.document.close();
  toast("已生成打印视图（可存为 PDF）", "🖨️");
}

/* ---------- 关于 ---------- */
function renderAbout() {
  const app = $("#app");
  app.innerHTML = `
  <div class="container view-enter">
    <div class="page-head"><h1>ℹ️ 关于本站</h1></div>
    <div class="card about-card">
      <h3>🎓 drytiku</h3>
      <p>一款面向中山大学学子的高等数学刷题网站，按北京大学版《高等数学（上、下册）》章节体系组织，覆盖历年期末考试的常见题型与难度。</p>
      <h3>📝 关于题目</h3>
      <p>题库共 <b>${ALL_QUESTIONS.length} 道</b>：包含原创手写题与参数化生成的练习题，参考历年高数期末考试常见题型与命题风格编写，不包含任何真题原文。生成题的答案与解析由程序实时计算，保证正确性。</p>
      <h3>🧭 使用指南</h3>
      <ul>
        <li><b>章节练习</b>：逐章突破，选择题/填空题即时判分，解答题看解析后自评；</li>
        <li><b>模拟考试</b>：随机组卷 + 限时作答，检验真实水平；</li>
        <li><b>错题本</b>：自动收集错题，重练答对即移除；</li>
        <li><b>统计中心</b>：学习热力图、各章正确率、徽章成就。</li>
      </ul>
      <h3>🎯 校训</h3>
      <p class="motto">博学 · 审问 · 慎思 · 明辨 · 笃行</p>
      <p class="about-tip">💡 小彩蛋：连续点击页面顶部的 ∫ 图标 7 次试试～</p>
      <h3>⚙️ 数据与设置</h3>
      <p>所有学习数据保存在本机浏览器中，清除浏览器数据会重置进度。</p>
      <button class="btn-ghost danger" id="about-reset">重置全部数据</button>
    </div>
  </div>`;
  $("#about-reset").addEventListener("click", () => {
    if (confirm("确定重置全部学习数据吗？此操作不可撤销！")) {
      resetAll();
      toast("已重置", "🔄");
      goto("/");
    }
  });
}
