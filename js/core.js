/* ============================================================
 * 中大高数题库 · core.js
 * 常量 / 存储 / 工具 / 特效（音效、彩带）
 * ============================================================ */

const APP = {
  name: "drytiku",
  motto: "博学 · 审问 · 慎思 · 明辨 · 笃行",
  version: "1.1.0"
};

/* ---------- 章节元数据（北京大学版《高等数学》上、下册章节体系） ---------- */
const CHAPTERS = [
  { n: 1,  vol: 1, icon: "📈", name: "函数与极限",           short: "极限",   desc: "极限运算 · 连续性 · 间断点 · 无穷小比较",            color: "#0e8a4e" },
  { n: 2,  vol: 1, icon: "🎢", name: "导数与微分",           short: "导数",   desc: "求导法则 · 隐函数 · 参数方程 · 高阶导数",            color: "#1d9e63" },
  { n: 3,  vol: 1, icon: "🏔️", name: "微分中值定理与导数的应用", short: "中值定理", desc: "洛必达法则 · 单调极值 · 凹凸拐点 · 泰勒公式",      color: "#2eae74" },
  { n: 4,  vol: 1, icon: "🧩", name: "不定积分",             short: "不定积分", desc: "换元积分 · 分部积分 · 凑微分法",                     color: "#0fa3b1" },
  { n: 5,  vol: 1, icon: "📊", name: "定积分",               short: "定积分",  desc: "牛顿-莱布尼茨公式 · 变限积分 · 广义积分",            color: "#1384c8" },
  { n: 6,  vol: 1, icon: "🎡", name: "定积分的应用",         short: "积分应用", desc: "平面面积 · 旋转体体积 · 弧长 · 物理应用",            color: "#3a6bd6" },
  { n: 7,  vol: 1, icon: "🌊", name: "微分方程",             short: "微分方程", desc: "可分离方程 · 一阶线性 · 常系数线性方程",             color: "#6a5ad6" },
  { n: 8,  vol: 2, icon: "🧊", name: "空间解析几何与向量代数", short: "向量几何", desc: "向量运算 · 平面与直线 · 距离与夹角",                 color: "#0e8a4e" },
  { n: 9,  vol: 2, icon: "🌐", name: "多元函数微分学",       short: "多元微分", desc: "偏导数 · 全微分 · 极值 · 方向导数与梯度",            color: "#1d9e63" },
  { n: 10, vol: 2, icon: "🍩", name: "重积分",               short: "重积分",  desc: "二重积分 · 极坐标 · 交换次序 · 三重积分",            color: "#2eae74" },
  { n: 11, vol: 2, icon: "🌀", name: "曲线积分与曲面积分",   short: "曲线积分", desc: "两类曲线积分 · 格林公式 · 高斯公式",                 color: "#0fa3b1" },
  { n: 12, vol: 2, icon: "♾️", name: "无穷级数",             short: "级数",    desc: "数项级数 · 幂级数 · 傅里叶级数",                     color: "#1384c8" }
];

const ALL_QUESTIONS = [...UPPER_QUESTIONS, ...LOWER_QUESTIONS, ...(typeof GENERATED_QUESTIONS !== "undefined" ? GENERATED_QUESTIONS : [])];
const QUESTION_MAP = {};
ALL_QUESTIONS.forEach(q => QUESTION_MAP[q.id] = q);

/* ---------- 等级与徽章 ---------- */
const LEVELS = [
  { xp: 0,    title: "数学萌新" },
  { xp: 60,   title: "极限探索者" },
  { xp: 150,  title: "求导小能手" },
  { xp: 280,  title: "积分学徒" },
  { xp: 450,  title: "中值定理掌控者" },
  { xp: 660,  title: "级数征服者" },
  { xp: 910,  title: "多元函数大师" },
  { xp: 1200, title: "数学之星" },
  { xp: 1550, title: "高数王者" },
  { xp: 2000, title: "康乐园数学家" }
];

const BADGES = [
  { id: "first",    icon: "🌱", name: "初次相遇", desc: "完成第一道题" },
  { id: "ten",      icon: "⭐", name: "小试牛刀", desc: "累计答对 10 题" },
  { id: "fifty",    icon: "🌟", name: "渐入佳境", desc: "累计答对 50 题" },
  { id: "hundred",  icon: "💯", name: "百题斩",   desc: "累计答对 100 题" },
  { id: "combo",    icon: "🔥", name: "十连击",   desc: "连续答对 10 题" },
  { id: "allch",    icon: "🗺️", name: "全科覆盖", desc: "每个章节至少答对 1 题" },
  { id: "fullmark", icon: "🏅", name: "学霸时刻", desc: "模拟考试取得满分" },
  { id: "week",     icon: "📅", name: "七日之约", desc: "连续学习 7 天" },
  { id: "night",    icon: "🦉", name: "夜猫子",   desc: "在凌晨 0-5 点答题" },
  { id: "perfect",  icon: "💎", name: "完美主义", desc: "某章节答对 5 题且全对" },
  { id: "wrongless",icon: "🧹", name: "错题克星", desc: "清空一次错题本" }
];

/* ---------- 本地存储 ---------- */
const STORE_KEY = "sysu_gaoshu_v1";

function defaultState() {
  return {
    xp: 0,
    answered: {},          // qid -> {times, correct, wrong}
    wrong: {},             // qid -> 错题次数
    favs: [],
    streak: 0,
    bestStreak: 0,
    lastDay: null,         // "YYYY-MM-DD"
    daily: {},             // "YYYY-MM-DD" -> qid（每日一题已完成记录）
    exams: [],             // {d, score, total, sec}
    badges: [],
    settings: { dark: false, sound: true, order: "easy" },
    resetCount: 0
  };
}

let state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return Object.assign(defaultState(), JSON.parse(raw));
  } catch (e) { /* ignore */ }
  return defaultState();
}

function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* ignore */ }
}

function resetAll() {
  const keepSettings = state.settings;
  state = defaultState();
  state.settings = keepSettings;
  state.resetCount++;
  saveState();
}

/* ---------- 工具函数 ---------- */
const $  = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

function todayStr(d = new Date()) {
  const p = n => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function normAnswer(s) {
  return String(s == null ? "" : s).trim().toLowerCase()
    .replace(/\s+/g, "")
    .replace(/[·×*]/g, "")
    .replace(/π/g, "pi")
    .replace(/²/g, "^2")
    .replace(/³/g, "^3")
    .replace(/\*\*/g, "^")
    .replace(/（/g, "(").replace(/）/g, ")")
    .replace(/。/g, "")
    .replace(/(\.\d*?)0+(?![0-9])/g, "$1")   // 去尾零："1.0"→"1."，"0.50"→"0.5"
    .replace(/\.(?![0-9])/g, "");            // 去孤立小数点："1."→"1"
}

function hashOf(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) >>> 0;
  return h;
}

/** 可复现的伪随机数生成器（种子随机） */
function mulberry32(a) {
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** 路由跳转：hash 未变化时 hashchange 不会触发，需手动渲染 */
function goto(path) {
  const target = "#" + path;
  if (location.hash === target) {
    if (typeof router === "function") router();
  } else {
    location.hash = target;
  }
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function qsByChapter(n) { return ALL_QUESTIONS.filter(q => q.chapter === n); }
function typeName(t) { return { choice: "选择题", fill: "填空题", calc: "解答题" }[t] || t; }
function typeEmoji(t) { return { choice: "🅰️", fill: "✍️", calc: "🧮" }[t] || ""; }

/* ---------- KaTeX 渲染 ---------- */
function renderMath(latex, display = false) {
  try {
    return katex.renderToString(latex, { throwOnError: false, displayMode: display });
  } catch (e) {
    return esc(latex);
  }
}

/** 渲染富文本：$$...$$ 为独立公式行，\(...\) 为行内公式 */
function renderRich(text) {
  const parts = String(text).split(/\$\$/);
  let html = "";
  parts.forEach((seg, i) => {
    if (i % 2 === 1) {
      html += `<div class="katex-block">${renderMath(seg, true)}</div>`;
    } else {
      const subs = seg.split(/\\\(([\s\S]*?)\\\)/g);
      subs.forEach((s, j) => {
        html += (j % 2 === 1) ? renderMath(s, false) : esc(s);
      });
    }
  });
  return html;
}

/** 渲染答案显示（fill 题） */
function answerDisplay(q) {
  if (q.type === "fill") return `<span class="ans-tex">${renderMath(Array.isArray(q.answer) ? q.answer[0] : q.answer, false)}</span>`;
  if (q.type === "choice") return `<span class="ans-tex">${renderRich(q.options[q.answer])}</span>`;
  return "";
}

/* ---------- 等级计算 ---------- */
function levelOf(xp) {
  let lv = 0;
  for (let i = 0; i < LEVELS.length; i++) if (xp >= LEVELS[i].xp) lv = i;
  return lv;
}
function levelInfo(xp) {
  const lv = levelOf(xp);
  const cur = LEVELS[lv].xp;
  const next = lv + 1 < LEVELS.length ? LEVELS[lv + 1].xp : null;
  return {
    lv: lv + 1, title: LEVELS[lv].title, cur, next,
    pct: next ? Math.min(100, Math.round((xp - cur) / (next - cur) * 100)) : 100
  };
}

/* ---------- Toast ---------- */
function toast(msg, icon = "✨") {
  const box = $("#toast-box");
  const el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<span class="toast-icon">${icon}</span><span>${msg}</span>`;
  box.appendChild(el);
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => {
    el.classList.remove("show");
    setTimeout(() => el.remove(), 350);
  }, 2600);
}

/* ---------- 音效（WebAudio 合成，无需音频文件） ---------- */
let audioCtx = null;
function playTone(freq, dur = 0.12, type = "sine", delay = 0, vol = 0.16) {
  if (!state.settings.sound) return;
  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
    if (audioCtx.state === "suspended") audioCtx.resume();
    const t0 = audioCtx.currentTime + delay;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, t0);
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(vol, t0 + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    osc.connect(gain).connect(audioCtx.destination);
    osc.start(t0);
    osc.stop(t0 + dur + 0.05);
  } catch (e) { /* ignore */ }
}
const sfx = {
  correct: () => { playTone(660, 0.1, "sine", 0); playTone(880, 0.14, "sine", 0.09); },
  wrong:   () => { playTone(200, 0.22, "sawtooth", 0, 0.08); },
  click:   () => { playTone(520, 0.05, "sine", 0, 0.06); },
  done:    () => { [523, 659, 784, 1047].forEach((f, i) => playTone(f, 0.16, "sine", i * 0.1)); },
  levelup: () => { [440, 554, 659, 880, 1109].forEach((f, i) => playTone(f, 0.14, "triangle", i * 0.08)); }
};

/* ---------- 彩带特效（Canvas） ---------- */
const confetti = (() => {
  let canvas = null, ctx = null, parts = [], raf = null, w = 0, h = 0;
  const COLORS = ["#0e8a4e", "#1d9e63", "#e9b949", "#d64545", "#3a6bd6", "#ff8fb1", "#8a5ad6"];

  function ensure() {
    if (canvas) return;
    canvas = document.createElement("canvas");
    canvas.className = "confetti-canvas";
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
    const resize = () => { w = canvas.width = innerWidth; h = canvas.height = innerHeight; };
    resize();
    addEventListener("resize", resize);
  }

  function burst(count = 90, x = innerWidth / 2, y = innerHeight * 0.3) {
    ensure();
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 8;
      parts.push({
        x, y,
        vx: Math.cos(angle) * speed * (0.4 + Math.random()),
        vy: Math.sin(angle) * speed - 3,
        g: 0.16 + Math.random() * 0.12,
        size: 5 + Math.random() * 6,
        color: COLORS[(Math.random() * COLORS.length) | 0],
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        shape: Math.random() < 0.35 ? "circle" : "rect",
        life: 1
      });
    }
    if (!raf) tick();
  }

  function tick() {
    ctx.clearRect(0, 0, w, h);
    parts = parts.filter(p => p.life > 0 && p.y < h + 30);
    for (const p of parts) {
      p.vy += p.g;
      p.x += p.vx; p.y += p.vy;
      p.rot += p.vr;
      p.life -= 0.008;
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life));
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === "rect") ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
      else { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
      ctx.restore();
    }
    if (parts.length) raf = requestAnimationFrame(tick);
    else { raf = null; ctx.clearRect(0, 0, w, h); }
  }

  return { burst };
})();

/* ---------- 学习统计 ---------- */
function chapterStats(n) {
  const qs = qsByChapter(n);
  let answered = 0, correct = 0;
  qs.forEach(q => {
    const r = state.answered[q.id];
    if (r && r.times > 0) {
      answered++;
      if (r.lastCorrect) correct++;
    }
  });
  return { total: qs.length, answered, correct, acc: answered ? Math.round(correct / answered * 100) : null };
}

function dayCounts(days = 112) {
  const map = {};
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const key = todayStr(d);
    map[key] = 0;
  }
  Object.values(state.answered).forEach(r => {
    if (r.lastTs && map[r.lastDay] !== undefined) map[r.lastDay]++;
  });
  return map;
}

/** 连续学习天数 */
function currentStreak() {
  const today = todayStr();
  if (state.lastDay === today) return state.streak;
  const y = new Date(); y.setDate(y.getDate() - 1);
  if (state.lastDay === todayStr(y)) return state.streak;
  return 0;
}

/* ---------- 徽章判定 ---------- */
function totalCorrect() {
  return Object.values(state.answered).reduce((s, r) => s + (r.correct || 0), 0);
}
function totalAnswered() {
  return Object.values(state.answered).reduce((s, r) => s + (r.times || 0), 0);
}

function checkBadges() {
  const got = new Set(state.badges);
  const add = id => { if (!got.has(id)) { got.add(id); state.badges.push(id); toast(`获得徽章「${BADGES.find(b => b.id === id).name}」`, BADGES.find(b => b.id === id).icon); } };
  const total = totalAnswered();
  const correct = totalCorrect();

  if (total >= 1) add("first");
  if (correct >= 10) add("ten");
  if (correct >= 50) add("fifty");
  if (correct >= 100) add("hundred");

  // 十连击：连续答对 10 题
  let combo = 0, maxCombo = 0;
  Object.values(state.answered).sort((a, b) => (a.lastTs || 0) - (b.lastTs || 0)).forEach(r => {
    combo = r.lastCorrect ? combo + 1 : 0;
    maxCombo = Math.max(maxCombo, combo);
  });
  if (maxCombo >= 10) add("combo");

  // 全科覆盖
  if (CHAPTERS.every(c => qsByChapter(c.n).some(q => (state.answered[q.id] || {}).correct > 0))) add("allch");

  // 模拟考满分
  if (state.exams.some(e => e.score === e.total && e.total > 0)) add("fullmark");

  // 七日之约
  if (state.bestStreak >= 7) add("week");

  // 夜猫子
  if (Object.values(state.answered).some(r => { const h = new Date(r.lastTs).getHours(); return h >= 0 && h < 5; })) add("night");

  // 完美主义
  for (const c of CHAPTERS) {
    const recs = qsByChapter(c.n).map(q => state.answered[q.id]).filter(Boolean);
    const cCount = recs.reduce((s, r) => s + r.correct, 0);
    if (cCount >= 5 && recs.every(r => r.correct > 0 && r.wrong === 0)) { add("perfect"); break; }
  }

  // 错题克星（通过 resetCount 判断曾清空过错题本：由 clearWrong 时设置）
  if (state.clearedWrongOnce) add("wrongless");
}

/* ---------- 排行榜（趣味模拟榜单，每周一刷新） ---------- */
const LB_NAMES = [
  "康乐园卷王", "图书馆钉子户", "高数战神", "夜刷狂魔", "积分猎人",
  "极限捕手", "泰勒狂人", "自习室常驻", "宿舍点灯人", "早八全勤王",
  "满绩选手", "错题克星", "公式打印机", "草稿纸富翁", "解题机器",
  "红墙守望者", "逸仙大道跑步者", "珠江河畔夜读者", "格兰堂坐客", "马丁堂读书郎"
];

function weekSeed() {
  const d = new Date();
  const day = (d.getDay() + 6) % 7; // 周一 = 0
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return Math.floor(d.getTime() / 86400000);
}

/** 生成榜单：20 位 AI 同学 + 本机用户，按 EXP 排序 */
function leaderboardData() {
  const r = mulberry32(weekSeed() * 7919 + 13);
  const names = shuffle(LB_NAMES.slice());
  const bots = names.map(name => {
    const xp = 80 + Math.floor(r() * 2200);
    const answered = Math.floor(xp / 11 + r() * 50);
    return { name, xp, answered, me: false };
  });
  bots.push({ name: "我", xp: state.xp, answered: totalAnswered(), me: true });
  bots.sort((a, b) => b.xp - a.xp);
  return bots;
}
