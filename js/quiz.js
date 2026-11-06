/* ============================================================
 * 中大高数题库 · quiz.js
 * 答题引擎：章节练习 / 错题重练 / 模拟考试
 * ============================================================ */

const quiz = {
  mode: "practice",   // practice | wrong | exam
  ids: [],            // 题目 id 顺序
  idx: 0,
  title: "",
  startTs: 0,
  correct: 0,
  wrongIds: [],       // 本次答错的 id
  calcCorrect: 0,     // 解答题自评正确
  calcWrong: 0,
  gainedXp: 0,
  levelUps: 0,
  locked: false,      // 当前题是否已作答
  timerSec: 0,
  timerId: null,
  examDeadline: 0
};

function questionById(id) { return QUESTION_MAP[id]; }

/** 开始一场练习：qs = [{id}] 或章节号 */
function startPractice(chapterNum) {
  quiz.mode = "practice";
  quiz.ids = shuffle(qsByChapter(chapterNum).map(q => q.id));
  quiz.title = `${CHAPTERS[chapterNum - 1].icon} 第${["一","二","三","四","五","六","七","八","九","十","十一","十二"][chapterNum-1]}章 · ${CHAPTERS[chapterNum-1].name}`;
  quiz.startTs = Date.now();
  quiz.correct = 0; quiz.wrongIds = []; quiz.calcCorrect = 0; quiz.calcWrong = 0;
  quiz.gainedXp = 0; quiz.levelUps = 0; quiz.idx = 0; quiz.locked = false;
  renderQuiz();
}

/** 错题重练 */
function startWrongPractice() {
  quiz.mode = "wrong";
  quiz.ids = shuffle(Object.keys(state.wrong));
  quiz.title = "🧹 错题重练";
  quiz.startTs = Date.now();
  quiz.correct = 0; quiz.wrongIds = []; quiz.calcCorrect = 0; quiz.calcWrong = 0;
  quiz.gainedXp = 0; quiz.levelUps = 0; quiz.idx = 0; quiz.locked = false;
  renderQuiz();
}

/* ---------- 渲染答题界面 ---------- */
function renderQuiz() {
  const app = $("#app");
  const q = questionById(quiz.ids[quiz.idx]);
  const total = quiz.ids.length;
  const isExam = quiz.mode === "exam";
  const letters = ["A", "B", "C", "D", "E", "F"];

  app.innerHTML = `
  <div class="quiz-wrap view-enter">
    <div class="quiz-top">
      <button class="btn-icon" id="quiz-back" title="退出">←</button>
      <div class="quiz-top-mid">
        <div class="quiz-title">${esc(quiz.title)}</div>
        <div class="quiz-progress-text">第 <b>${quiz.idx + 1}</b> / ${total} 题${isExam ? ` · <span class="quiz-timer" id="quiz-timer"></span>` : ""}</div>
      </div>
      ${isExam ? `<button class="btn-icon" id="quiz-submit-exam" title="交卷">✓</button>` : `<div class="quiz-xp-chip" id="quiz-xp-chip">+0 EXP</div>`}
    </div>
    <div class="quiz-progress"><div class="quiz-progress-fill" id="quiz-progress-fill" style="width:${(quiz.idx / total) * 100}%"></div></div>

    <div class="quiz-card card" id="quiz-card">
      <div class="quiz-meta">
        <span class="badge-type badge-${q.type}">${typeEmoji(q.type)} ${typeName(q.type)}</span>
        <span class="badge-diff">${"●".repeat(q.difficulty)}${"○".repeat(3 - q.difficulty)}</span>
        <span class="badge-ch">${CHAPTERS[q.chapter - 1].icon} ${CHAPTERS[q.chapter - 1].short}</span>
        <button class="star-btn ${state.favs.includes(q.id) ? "on" : ""}" id="fav-btn" title="收藏">${state.favs.includes(q.id) ? "★" : "☆"}</button>
      </div>
      <div class="quiz-question">${renderRich(q.question)}</div>

      <div class="quiz-answer-area" id="quiz-answer-area">
        ${answerAreaHTML(q, letters)}
      </div>
    </div>
    <div class="quiz-feedback" id="quiz-feedback"></div>
  </div>`;

  // 收藏
  $("#fav-btn").addEventListener("click", e => {
    e.stopPropagation();
    const idx = state.favs.indexOf(q.id);
    if (idx >= 0) { state.favs.splice(idx, 1); toast("已取消收藏", "☆"); }
    else { state.favs.push(q.id); toast("已加入收藏", "★"); }
    saveState();
    renderQuiz();
  });

  $("#quiz-back").addEventListener("click", () => {
    sfx.click();
    if (quiz.mode === "exam") {
      if (confirm("确定要提前交卷吗？")) finishExam(true);
      return;
    }
    stopTimer();
    location.hash = "#/";
  });

  if (isExam) {
    $("#quiz-submit-exam").addEventListener("click", () => finishExam(true));
    startTimer();
  }

  bindAnswerArea(q, letters);
  animateProgress();
}

function answerAreaHTML(q, letters) {
  if (q.type === "choice") {
    return `<div class="options">${q.options.map((o, i) =>
      `<button class="option" data-i="${i}"><span class="option-letter">${letters[i]}</span><span class="option-text">${renderRich(o)}</span></button>`
    ).join("")}</div>`;
  }
  if (q.type === "fill") {
    return `
    <div class="fill-row">
      <input class="fill-input" id="fill-input" type="text" inputmode="text" enterkeyhint="done"
             autocomplete="off" placeholder="输入答案，如 1/2、e^6、pi…" />
      <button class="btn-primary" id="fill-submit">提交</button>
    </div>
    <div class="fill-tip">💡 分数可用 <code>1/2</code>，圆周率用 <code>pi</code>，幂用 <code>x^2</code>，不带空格</div>`;
  }
  // calc
  return `
  <div class="calc-area">
    <div class="calc-think">🧐 先独立思考，再查看解析</div>
    <button class="btn-primary" id="calc-reveal">查看解析</button>
    <div class="calc-solution hidden" id="calc-solution"></div>
    <div class="calc-grade hidden" id="calc-grade">
      <span>这道题你做出来了吗？</span>
      <button class="btn-ghost ok" id="calc-yes">✅ 我做对了</button>
      <button class="btn-ghost no" id="calc-no">❌ 还没掌握</button>
    </div>
  </div>`;
}

function bindAnswerArea(q, letters) {
  if (q.type === "choice") {
    $$(".option").forEach(btn => {
      btn.addEventListener("click", () => submitChoice(q, +btn.dataset.i));
    });
  } else if (q.type === "fill") {
    const input = $("#fill-input");
    input.addEventListener("keydown", e => { if (e.key === "Enter") submitFill(q, input); });
    $("#fill-submit").addEventListener("click", () => submitFill(q, input));
    setTimeout(() => input.focus(), 80);
  } else {
    let revealed = false;
    $("#calc-reveal").addEventListener("click", () => {
      if (!revealed) {
        revealed = true;
        const sol = $("#calc-solution");
        sol.classList.remove("hidden");
        sol.innerHTML = `<div class="sol-title">📖 详细解析</div>
          <div class="sol-answer">答案：${answerDisplay(q)}</div>
          <ol class="sol-steps">${q.solution.map(s => `<li>${renderRich(s)}</li>`).join("")}</ol>`;
        $("#calc-grade").classList.remove("hidden");
        $("#calc-reveal").style.display = "none";
        $("#calc-grade").scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
    $("#calc-yes").addEventListener("click", () => submitCalc(q, true));
    $("#calc-no").addEventListener("click", () => submitCalc(q, false));
  }
}

function animateProgress() {
  const fill = $("#quiz-progress-fill");
  const total = quiz.ids.length;
  requestAnimationFrame(() => {
    fill.style.transition = "width .45s cubic-bezier(.22,1,.36,1)";
    fill.style.width = `${((quiz.idx + 1) / total) * 100}%`;
  });
}

/* ---------- 判分与记录 ---------- */
function recordAnswer(q, isCorrect) {
  const r = state.answered[q.id] || { times: 0, correct: 0, wrong: 0, lastCorrect: null, lastTs: 0, lastDay: "" };
  r.times++;
  r.lastCorrect = isCorrect;
  r.lastTs = Date.now();
  r.lastDay = todayStr();
  if (isCorrect) r.correct++; else r.wrong++;
  state.answered[q.id] = r;

  // 错题本
  if (!isCorrect) {
    state.wrong[q.id] = (state.wrong[q.id] || 0) + 1;
  } else if (quiz.mode === "wrong" && state.wrong[q.id]) {
    delete state.wrong[q.id];
  }

  // 经验
  const gain = isCorrect ? (q.difficulty === 3 ? 20 : q.difficulty === 2 ? 15 : 10) : 2;
  const before = levelInfo(state.xp).lv;
  state.xp += gain;
  quiz.gainedXp += gain;
  const after = levelInfo(state.xp).lv;
  if (after > before) {
    quiz.levelUps++;
    sfx.levelup();
    confetti.burst(70);
    setTimeout(() => toast(`🎉 升级啦！${levelInfo(state.xp).title}`, "🎉"), 300);
  }

  // 连续学习
  const today = todayStr();
  if (state.lastDay === today) { /* 已计 */ }
  else {
    const y = new Date(); y.setDate(y.getDate() - 1);
    state.streak = state.lastDay === todayStr(y) ? state.streak + 1 : 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    state.lastDay = today;
  }

  saveState();
  checkBadges();
  saveState();
}

function showFeedback(q, isCorrect, extra = "") {
  quiz.locked = true;
  const fb = $("#quiz-feedback");
  fb.className = `quiz-feedback ${isCorrect ? "fb-correct" : "fb-wrong"}`;
  const isExam = quiz.mode === "exam";
  const hasNext = quiz.idx < quiz.ids.length - 1;

  fb.innerHTML = `
    <div class="fb-banner">
      <div class="fb-icon">${isCorrect ? "🎉" : "😿"}</div>
      <div>
        <div class="fb-title">${isCorrect ? "回答正确！" : "回答错误"}</div>
        <div class="fb-sub">${isCorrect ? `+${q.difficulty === 3 ? 20 : q.difficulty === 2 ? 15 : 10} EXP` : "别灰心，看看解析吧"}</div>
      </div>
    </div>
    <div class="fb-answer">正确答案：${answerDisplay(q)}</div>
    <div class="fb-solution">
      <div class="sol-title">📖 解析</div>
      <ol class="sol-steps">${q.solution.map(s => `<li>${renderRich(s)}</li>`).join("")}</ol>
    </div>
    ${!isExam ? `<button class="btn-primary btn-next" id="quiz-next">${hasNext ? "下一题 →" : "查看结果 🏁"}</button>` : `<button class="btn-primary btn-next" id="quiz-next">${hasNext ? "下一题 →" : "交卷并查看成绩 🏁"}</button>`}`;

  if (isCorrect) sfx.correct(); else sfx.wrong();
  fb.scrollIntoView({ behavior: "smooth", block: "nearest" });

  $("#quiz-next").addEventListener("click", () => {
    sfx.click();
    if (quiz.idx < quiz.ids.length - 1) {
      quiz.idx++;
      quiz.locked = false;
      renderQuiz();
    } else {
      finishQuiz();
    }
  });
}

function submitChoice(q, i) {
  if (quiz.locked) return;
  const isCorrect = i === q.answer;
  recordAnswer(q, isCorrect);
  if (isCorrect) quiz.correct++; else quiz.wrongIds.push(q.id);

  $$(".option").forEach(btn => {
    const idx = +btn.dataset.i;
    btn.disabled = true;
    if (idx === q.answer) btn.classList.add("opt-correct");
    else if (idx === i) btn.classList.add("opt-wrong");
  });
  showFeedback(q, isCorrect);
}

function submitFill(q, input) {
  if (quiz.locked) return;
  const val = input.value;
  if (!val.trim()) { input.classList.add("shake"); setTimeout(() => input.classList.remove("shake"), 450); return; }
  const nv = normAnswer(val);
  const accepted = (Array.isArray(q.answer) ? q.answer : [q.answer]).map(normAnswer);
  const isCorrect = accepted.includes(nv);
  recordAnswer(q, isCorrect);
  if (isCorrect) quiz.correct++; else quiz.wrongIds.push(q.id);
  input.disabled = true;
  $("#fill-submit").disabled = true;
  showFeedback(q, isCorrect);
}

function submitCalc(q, isCorrect) {
  if (quiz.locked) return;
  recordAnswer(q, isCorrect);
  if (isCorrect) { quiz.correct++; quiz.calcCorrect++; } else { quiz.wrongIds.push(q.id); quiz.calcWrong++; }
  $("#calc-grade").classList.add("hidden");
  showFeedback(q, isCorrect);
}

/* ---------- 结束练习 ---------- */
function finishQuiz() {
  stopTimer();
  const total = quiz.ids.length;
  const sec = Math.round((Date.now() - quiz.startTs) / 1000);
  const acc = total ? Math.round(quiz.correct / total * 100) : 0;
  const isExam = quiz.mode === "exam";
  if (isExam) pushExamResult(total, sec);

  const app = $("#app");
  const ringPct = 100 - acc;
  const great = acc >= 80;
  app.innerHTML = `
  <div class="result-wrap view-enter">
    <div class="card result-card">
      <div class="result-head">
        <div class="score-ring" style="--pct:${ringPct}">
          <div class="score-ring-inner">
            <div class="score-num">${acc}<span>分</span></div>
            <div class="score-label">正确率</div>
          </div>
        </div>
        <div class="result-title">${great ? "🎉 太棒了！" : acc >= 60 ? "💪 不错，继续加油！" : "📚 革命尚未成功，同志仍须努力！"}</div>
      </div>
      <div class="result-stats">
        <div class="rs-item"><div class="rs-num">${quiz.correct}/${total}</div><div class="rs-label">答对题数</div></div>
        <div class="rs-item"><div class="rs-num">${fmtTime(sec)}</div><div class="rs-label">用时</div></div>
        <div class="rs-item"><div class="rs-num">+${quiz.gainedXp}</div><div class="rs-label">获得经验</div></div>
      </div>
      ${quiz.levelUps ? `<div class="levelup-banner">⬆️ 连升 ${quiz.levelUps} 级！当前称号：${levelInfo(state.xp).title}</div>` : ""}
      <div class="result-actions">
        <button class="btn-primary" id="res-retry">${quiz.wrongIds.length ? "重练错题 🔁" : "再练一遍 🔁"}</button>
        <button class="btn-ghost" id="res-back">返回</button>
      </div>
      ${quiz.wrongIds.length ? `
      <div class="result-wrong">
        <div class="rw-title">📝 本次需要复习的题目</div>
        ${quiz.wrongIds.map(id => {
          const q = questionById(id);
          return `<details class="rw-item"><summary>${renderRich(q.question)} <span class="rw-ch">${CHAPTERS[q.chapter-1].short}</span></summary>
            <div class="rw-sol"><div class="fb-answer">正确答案：${answerDisplay(q)}</div>
            <ol class="sol-steps">${q.solution.map(s => `<li>${renderRich(s)}</li>`).join("")}</ol></div></details>`;
        }).join("")}
      </div>` : ""}
    </div>
  </div>`;

  if (great) { confetti.burst(130); sfx.done(); }
  else if (acc >= 60) confetti.burst(40);

  $("#res-retry").addEventListener("click", () => {
    sfx.click();
    if (quiz.wrongIds.length && quiz.mode !== "wrong") {
      quiz.mode = "wrong";
      quiz.ids = shuffle([...quiz.wrongIds]);
      quiz.title = "🔁 本次错题重练";
      resetSessionCounters();
      renderQuiz();
    } else if (quiz.mode === "practice") {
      const ch = questionById(quiz.ids[0]).chapter;
      startPractice(ch);
    } else {
      location.hash = "#/practice";
    }
  });
  $("#res-back").addEventListener("click", () => {
    sfx.click();
    location.hash = quiz.mode === "exam" ? "#/practice" : "#/practice";
  });
}

function resetSessionCounters() {
  quiz.startTs = Date.now();
  quiz.correct = 0; quiz.wrongIds = []; quiz.calcCorrect = 0; quiz.calcWrong = 0;
  quiz.gainedXp = 0; quiz.levelUps = 0; quiz.idx = 0; quiz.locked = false;
}

function fmtTime(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return m ? `${m}分${s}秒` : `${s}秒`;
}

/* ---------- 模拟考试 ---------- */
function startExam(chapterNum = null) {
  const pool = chapterNum ? qsByChapter(chapterNum) : ALL_QUESTIONS.filter(q => q.type !== "calc");
  const picked = shuffle(pool).slice(0, Math.min(10, pool.length));
  if (!picked.length) { toast("题库不足，无法组卷", "😅"); return; }
  quiz.mode = "exam";
  quiz.ids = picked.map(q => q.id);
  quiz.title = chapterNum ? `📝 模拟考试 · 第${chapterNum}章` : "📝 全册模拟考试";
  quiz.startTs = Date.now();
  quiz.correct = 0; quiz.wrongIds = []; quiz.calcCorrect = 0; quiz.calcWrong = 0;
  quiz.gainedXp = 0; quiz.levelUps = 0; quiz.idx = 0; quiz.locked = false;
  quiz.timerSec = quiz.ids.length * 90;   // 每题 90 秒
  quiz.examDeadline = Date.now() + quiz.timerSec * 1000;
  renderQuiz();
}

function startTimer() {
  stopTimer();
  const el = $("#quiz-timer");
  quiz.timerId = setInterval(() => {
    const remain = Math.max(0, Math.round((quiz.examDeadline - Date.now()) / 1000));
    if (el) {
      el.textContent = `⏱ ${Math.floor(remain / 60)}:${String(remain % 60).padStart(2, "0")}`;
      if (remain < 60) el.classList.add("danger");
    }
    if (remain <= 0) finishExam(true);
  }, 500);
}

function stopTimer() {
  if (quiz.timerId) { clearInterval(quiz.timerId); quiz.timerId = null; }
}

function finishExam(fromButton = false) {
  if (quiz.finished) return;
  quiz.finished = true;
  stopTimer();
  const sec = Math.round((Date.now() - quiz.startTs) / 1000);
  finishQuiz();
  if (fromButton) toast("已交卷", "📮");
}

function pushExamResult(total, sec) {
  state.exams.push({ d: todayStr(), score: quiz.correct, total, sec });
  if (state.exams.length > 30) state.exams.shift();
  saveState();
}
