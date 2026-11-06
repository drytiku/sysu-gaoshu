/* ============================================================
 * 中大高数题库 · app.js
 * 路由 / 导航 / 主题 / 初始化
 * ============================================================ */

const routes = {
  "/": renderHome,
  "/practice": renderPractice,
  "/exam": renderExam,
  "/custom": renderCustom,
  "/rank": renderLeaderboard,
  "/wrong": renderWrongbook,
  "/stats": renderStats,
  "/about": renderAbout
};

function router() {
  const hash = (location.hash.replace(/^#/, "") || "/").split("?")[0];
  const route = routes[hash] || renderHome;
  stopTimer();
  quiz.finished = false;
  route();
  updateNav(hash);
  window.scrollTo({ top: 0 });
  renderHeaderStreak();
}

function updateNav(hash) {
  const map = { "/": "home", "/practice": "practice", "/custom": "custom", "/rank": "rank", "/wrong": "wrong", "/stats": "stats" };
  const active = map[hash];
  $$(".nav-item").forEach(el => {
    el.classList.toggle("active", el.dataset.nav === active);
  });
  $$(".top-link").forEach(el => {
    el.classList.toggle("active", el.dataset.nav === active);
  });
}

function renderHeaderStreak() {
  const el = $("#header-streak");
  if (el) el.innerHTML = `<span class="streak-chip">🔥 ${currentStreak()}</span>`;
}

/* ---------- 主题 ---------- */
function applyTheme() {
  document.documentElement.dataset.theme = state.settings.dark ? "dark" : "light";
  const btn = $("#theme-btn");
  if (btn) btn.textContent = state.settings.dark ? "☀️" : "🌙";
}

function toggleTheme() {
  state.settings.dark = !state.settings.dark;
  saveState();
  applyTheme();
}

/* ---------- 彩蛋：连点 7 次 ∫ ---------- */
let logoClicks = 0, logoTimer = null;
function bindLogoEgg() {
  const logo = $("#logo-int");
  if (!logo) return;
  logo.addEventListener("click", () => {
    logoClicks++;
    clearTimeout(logoTimer);
    logoTimer = setTimeout(() => (logoClicks = 0), 1600);
    if (logoClicks >= 7) {
      logoClicks = 0;
      confetti.burst(160);
      sfx.done();
      toast(`校训 · ${APP.motto}`, "🏛️");
    }
  });
}

/* ---------- 注册 Service Worker ---------- */
function registerSW() {
  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

/* ---------- 初始化 ---------- */
function init() {
  applyTheme();
  bindLogoEgg();

  // 导航点击
  $$(".nav-item, .top-link").forEach(el => {
    el.addEventListener("click", () => {
      const target = el.dataset.href;
      if (location.hash === "#" + target || (target === "/" && (location.hash === "#/" || location.hash === ""))) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
  });

  $("#theme-btn").addEventListener("click", () => { sfx.click(); toggleTheme(); });
  $("#sound-btn").addEventListener("click", function () {
    state.settings.sound = !state.settings.sound;
    saveState();
    this.textContent = state.settings.sound ? "🔊" : "🔇";
    if (state.settings.sound) sfx.click();
    toast(state.settings.sound ? "音效已开启" : "音效已关闭", state.settings.sound ? "🔊" : "🔇");
  });

  addEventListener("hashchange", router);
  router();
  registerSW();

  console.log(`%c${APP.name} v${APP.version}%c\n${APP.motto}\n原创练习题 · KaTeX 渲染 · PWA 离线可用`,
    "background:#0e8a4e;color:#fff;padding:4px 10px;border-radius:6px;font-size:14px", "");
}

document.addEventListener("DOMContentLoaded", init);
