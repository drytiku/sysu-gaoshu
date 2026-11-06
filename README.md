# 中大高数题库（SYSU · 高等数学刷题）

面向中山大学学子的高等数学刷题网站，纯静态单页应用，手机优先设计。

## ✨ 功能特性

- 📚 **1070+ 道题目**：原创手写题 + 参数化生成题（每章 8 类题型模板 × 10 组参数）
- 📖 按北京大学版《高等数学（上、下册）》12 章体系组织
- 🎯 章节练习 / 错题重练 / 模拟考试 / 每日一题
- 🅰️ 三种题型：选择题（自动判分）、填空题（智能归一化答案，支持分数/π/幂）、解答题（逐步解析 + 自评）
- 🎮 游戏化：EXP 经验值、等级称号（数学萌新 → 康乐园数学家）、11 枚徽章成就
- 📊 学习热力图（近 16 周）、各章正确率、连续学习天数
- 🌙 深色模式 · 🔔 合成音效 · 🎊 彩带特效 · 🏛️ 校训彩蛋（连点 7 次 ∫）
- 📱 完全响应式 + PWA（可安装到手机主屏、离线可用）
- 🧮 KaTeX 数学公式渲染（自托管，国内访问快）

## 🚀 本地运行

```bash
node server.js
# 打开 http://localhost:4173
```

或使用任意静态服务器（如 `npx serve`）。

## 🌍 部署到公共域名（免费方案）

### 方案 A：Netlify Drop（最简单，无需命令行）

1. 打开 https://app.netlify.com/drop
2. 把本文件夹直接拖进浏览器窗口
3. 几秒后即可获得 `https://xxx.netlify.app` 公共域名

### 方案 B：Vercel

```bash
npx vercel          # 首次会提示登录（可用 GitHub 账号）
npx vercel --prod   # 部署生产环境
```

### 方案 C：Cloudflare Pages

```bash
npx wrangler login
npx wrangler pages deploy .
```

### 方案 D：GitHub Pages

1. 在 GitHub 新建仓库并上传本文件夹
2. Settings → Pages → Source 选 `main` 分支根目录
3. 获得 `https://用户名.github.io/仓库名/` 域名

## 📁 目录结构

```
├── index.html          # 单页应用入口
├── css/
│   ├── style.css       # 全部样式与动画
│   ├── katex.min.css   # KaTeX（自托管）
│   └── fonts/          # KaTeX 字体
├── js/
│   ├── data-upper.js   # 上册手写题库（第 1-7 章）
│   ├── data-lower.js   # 下册手写题库（第 8-12 章）
│   ├── generator.js    # 参数化题目生成引擎（960 道）
│   ├── core.js         # 存储 / 工具 / 特效
│   ├── quiz.js         # 答题引擎
│   ├── views.js        # 页面视图
│   └── app.js          # 路由与初始化
├── icons/icon.svg      # 应用图标
├── manifest.json       # PWA 清单
└── sw.js               # Service Worker（离线缓存）
```

## ⚠️ 版权说明

题库为**原创练习题**，参考历年高数期末考试常见题型与难度编写，不包含任何真题原文。
