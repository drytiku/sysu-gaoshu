/* 中大高数题库 · Service Worker（离线缓存） */
const CACHE = "sysu-gaoshu-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./css/style.css",
  "./css/katex.min.css",
  "./manifest.json",
  "./icons/icon.svg",
  "./js/katex/katex.min.js",
  "./js/data-upper.js",
  "./js/data-lower.js",
  "./js/generator.js",
  "./js/core.js",
  "./js/quiz.js",
  "./js/views.js",
  "./js/app.js"
];

self.addEventListener("install", e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const url = new URL(e.request.url);
  if (e.request.method !== "GET") return;

  // KaTeX 字体：缓存优先
  if (url.pathname.includes("/fonts/")) {
    e.respondWith(
      caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
        const copy = res.clone();
        caches.open(CACHE).then(c => c.put(e.request, copy));
        return res;
      }))
    );
    return;
  }

  // 页面导航：网络优先，离线回退缓存
  if (e.request.mode === "navigate") {
    e.respondWith(
      fetch(e.request).catch(() => caches.match("./index.html"))
    );
    return;
  }

  // JS/CSS/JSON 等静态资源：网络优先，离线回退缓存（保证更新及时）
  e.respondWith(
    fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy));
      return res;
    }).catch(() => caches.match(e.request))
  );
});
