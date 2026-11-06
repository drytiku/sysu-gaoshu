/* ============================================================
 * 中大高数题库 · generator.js
 * 参数化题目生成引擎：每章 8 类题型模板 × 10 组随机参数
 * 题目、答案、解析均由程序实时计算生成，保证数学正确性。
 * 与手写题库（data-upper/lower）合并后总题量约 1100 道。
 * ============================================================ */

const GENERATED_QUESTIONS = (function () {

  /* ---------- 随机数与数学工具 ---------- */
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function ri(r, a, b) { return a + Math.floor(r() * (b - a + 1)); }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { const t = a % b; a = b; b = t; } return a || 1; }
  function frac(n, d) {
    if (n === 0) return "0";
    const g = gcd(n, d); n /= g; d /= g;
    const s = (n < 0) !== (d < 0) ? "-" : "";
    n = Math.abs(n); d = Math.abs(d);
    return d === 1 ? s + n : s + n + "/" + d;
  }
  /** 分数答案（含可精确表示的小数形式，最多两位小数） */
  function fillVals(n, d) {
    const arr = [frac(n, d)];
    if ((n * 100) % d === 0) {
      const dec = String(n / d);
      if (dec !== frac(n, d)) arr.push(dec);
    }
    return arr;
  }
  /** 打乱选项顺序并修正答案下标（用于概念题） */
  function shuffleOpts(q, r) {
    const idx = q.options.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(r() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    const opts = idx.map(i => q.options[i]);
    const ans = idx.indexOf(q.answer);
    q.options = opts; q.answer = ans;
    return q;
  }
  /** 生成完整题目对象 */
  function Q(id, type, difficulty, tags, question, answer, options, solution) {
    return { id, chapter: 1, type, difficulty, tags, question, answer, options, solution };
  }

  const T = {};

  /* ============================================================
   * 第一章 函数与极限
   * ============================================================ */
  T[1] = [
    function (r) { // 多项式比值
      const a = ri(r, 2, 5), d = (() => { let v = ri(r, 2, 5); while (v === a) v = ri(r, 2, 5); return v; })();
      const b = ri(r, 1, 5), c = ri(r, 1, 5), e = ri(r, 1, 5), f = ri(r, 1, 5);
      return Q("", "choice", 1, ["极限运算"],
        "求极限 \\(\\lim\\limits_{x\\to\\infty}\\dfrac{" + a + "x^2+" + b + "x+" + c + "}{" + d + "x^2+" + e + "x+" + f + "}\\)。",
        0, ["\\(\\dfrac{" + a + "}{" + d + "}\\)", "\\(\\dfrac{" + d + "}{" + a + "}\\)", "\\( " + (a + d) + " \\)", "\\( " + (a * d) + " \\)"],
        [
          "分子分母同除以 \\(x^2\\)：",
          "$$\\lim_{x\\to\\infty}\\frac{" + a + "+\\frac{" + b + "}{x}+\\frac{" + c + "}{x^2}}{" + d + "+\\frac{" + e + "}{x}+\\frac{" + f + "}{x^2}}=\\frac{" + a + "}{" + d + "}$$"
        ]);
    },
    function (r) { // sin(ax)/(bx)
      const a = ri(r, 2, 5), b = (() => { let v = ri(r, 2, 5); while (v === a) v = ri(r, 2, 5); return v; })();
      return Q("", "fill", 1, ["重要极限"],
        "求极限 \\(\\lim\\limits_{x\\to0}\\dfrac{\\sin " + a + "x}{" + b + "x}\\) 的值。",
        fillVals(a, b), null,
        [
          "变形：\\(\\dfrac{\\sin " + a + "x}{" + b + "x}=\\dfrac{" + a + "}{" + b + "}\\cdot\\dfrac{\\sin " + a + "x}{" + a + "x}\\)，",
          "由重要极限 \\(\\dfrac{\\sin " + a + "x}{" + a + "x}\\to1\\)，故答案为 \\(\\dfrac{" + a + "}{" + b + "}\\)。"
        ]);
    },
    function (r) { // (1+a/x)^(bx)
      const a = ri(r, 1, 4), b = ri(r, 1, 4);
      return Q("", "fill", 2, ["重要极限"],
        "求极限 \\(\\lim\\limits_{x\\to\\infty}\\left(1+\\dfrac{" + a + "}{x}\\right)^{" + b + "x}\\) 的值。",
        ["e^" + (a * b)], null,
        [
          "利用重要极限 \\(\\lim\\limits_{t\\to\\infty}\\left(1+\\dfrac1t\\right)^t=e\\)：",
          "$$\\left(1+\\frac{" + a + "}{x}\\right)^{" + b + "x}=\\left[\\left(1+\\frac{" + a + "}{x}\\right)^{\\frac{x}{" + a + "}}\\right]^{" + (a * b) + "}\\to e^{" + (a * b) + "}$$"
        ]);
    },
    function (r) { // (e^{ax}-1)/(bx)
      const a = ri(r, 2, 5), b = (() => { let v = ri(r, 2, 5); while (v === a) v = ri(r, 2, 5); return v; })();
      return Q("", "choice", 2, ["等价无穷小"],
        "求极限 \\(\\lim\\limits_{x\\to0}\\dfrac{e^{" + a + "x}-1}{" + b + "x}\\)。",
        0, ["\\(\\dfrac{" + a + "}{" + b + "}\\)", "\\(\\dfrac{" + b + "}{" + a + "}\\)", "\\( " + (a + b) + " \\)", "\\( " + (a * b) + " \\)"],
        [
          "由等价无穷小 \\(e^{" + a + "x}-1\\sim " + a + "x\\;(x\\to0)\\)：",
          "$$\\lim_{x\\to0}\\frac{e^{" + a + "x}-1}{" + b + "x}=\\lim_{x\\to0}\\frac{" + a + "x}{" + b + "x}=\\frac{" + a + "}{" + b + "}$$"
        ]);
    },
    function (r) { // (1-cos ax)/(b x^2)
      const a = ri(r, 1, 3), b = ri(r, 2, 4);
      return Q("", "fill", 2, ["等价无穷小"],
        "求极限 \\(\\lim\\limits_{x\\to0}\\dfrac{1-\\cos " + a + "x}{" + b + "x^2}\\) 的值。",
        fillVals(a * a, 2 * b), null,
        [
          "由等价无穷小 \\(1-\\cos t\\sim\\dfrac{t^2}{2}\\)，令 \\(t=" + a + "x\\)：",
          "$$1-\\cos " + a + "x\\sim\\frac{" + (a * a) + "x^2}{2}\\;\\Rightarrow\\;\\text{原式}=\\frac{" + (a * a) + "}{" + (2 * b) + "}$$"
        ]);
    },
    function (r) { // 可去间断点
      const a = ri(r, 2, 5);
      return shuffleOpts(Q("", "choice", 2, ["间断点"],
        "函数 \\(f(x)=\\dfrac{x^2-" + (a * a) + "}{x-" + a + "}\\) 在 \\(x=" + a + "\\) 处是？",
        0, ["可去间断点", "跳跃间断点", "无穷间断点", "振荡间断点"],
        [
          "因式分解：\\(x^2-" + (a * a) + "=(x-" + a + ")(x+" + a + ")\\)，",
          "当 \\(x\\neq" + a + "\\) 时 \\(f(x)=x+" + a + "\\)，故 \\(\\lim\\limits_{x\\to" + a + "}f(x)=" + (2 * a) + "\\) 存在，",
          "但 \\(f(" + a + ")\\) 无定义，故为**可去间断点**。"
        ]), r);
    },
    function (r) { // 多项式在某点极限
      const c = ri(r, 1, 3), a = ri(r, 2, 5), b = ri(r, 1, 5);
      return Q("", "fill", 1, ["极限运算"],
        "求极限 \\(\\lim\\limits_{x\\to" + c + "}(" + a + "x+" + b + ")\\) 的值。",
        [String(a * c + b)], null,
        [
          "多项式函数连续，直接代入 \\(x=" + c + "\\)：",
          "$$\\lim_{x\\to" + c + "}(" + a + "x+" + b + ")=" + a + "\\times" + c + "+" + b + "=" + (a * c + b) + "$$"
        ]);
    },
    function (r) { // 无穷小阶数
      const k = ri(r, 2, 4), a = ri(r, 2, 3);
      return Q("", "choice", 2, ["无穷小比较"],
        "当 \\(x\\to0\\) 时，无穷小 \\(\\ln(1+" + a + "x^" + k + ")\\) 是关于 \\(x\\) 的几阶无穷小？",
        1, ["\\( " + (k - 1) + " \\) 阶", "\\( " + k + " \\) 阶", "\\( " + (k + 1) + " \\) 阶", "\\( " + (k + 2) + " \\) 阶"],
        [
          "由等价无穷小 \\(\\ln(1+t)\\sim t\\)：",
          "$$\\ln(1+" + a + "x^" + k + ")\\sim " + a + "x^" + k + "$$",
          "与 \\(x^" + k + "\\) 同阶，故是关于 \\(x\\) 的 \\( " + k + " \\) 阶无穷小。"
        ]);
    }
  ];

  /* ============================================================
   * 第二章 导数与微分
   * ============================================================ */
  T[2] = [
    function (r) { // 乘积求导
      const a = ri(r, 2, 5), b = ri(r, 2, 5), n = ri(r, 2, 4);
      return Q("", "choice", 1, ["求导法则"],
        "设 \\(y=" + a + "x^" + n + "+" + b + "\\ln x\\)，求 \\(y'\\)。",
        0, [
          "\\( " + (a * n) + "x^{" + (n - 1) + "}+\\dfrac{" + b + "}{x}\\)",
          "\\( " + (a * n) + "x^{" + (n - 1) + "}+" + b + "\\)",
          "\\( " + a + "x^{" + (n - 1) + "}+\\dfrac{" + b + "}{x}\\)",
          "\\( " + (a * n) + "x^{" + n + "}+\\dfrac{" + b + "}{x}\\)"
        ],
        [
          "$$y'=(" + a + "x^" + n + ")'+(" + b + "\\ln x)'=" + (a * n) + "x^{" + (n - 1) + "}+\\frac{" + b + "}{x}$$"
        ]);
    },
    function (r) { // 复合求导在某点
      const a = ri(r, 2, 5), b = ri(r, 2, 5);
      return Q("", "fill", 2, ["复合函数求导"],
        "设 \\(y=\\sin " + a + "x+\\cos " + b + "x\\)，求 \\(y'(0)\\)。",
        [String(a)], null,
        [
          "$$y'=" + a + "\\cos " + a + "x-" + b + "\\sin " + b + "x$$",
          "代入 \\(x=0\\)：\\(y'(0)=" + a + "\\times1-" + b + "\\times0=" + a + "\\)。"
        ]);
    },
    function (r) { // e^{ax} 二阶导
      const a = ri(r, 3, 4);
      return Q("", "choice", 2, ["高阶导数"],
        "设 \\(y=e^{" + a + "x}\\)，求 \\(y''\\)。",
        0, ["\\( " + (a * a) + "e^{" + a + "x}\\)", "\\( " + a + "e^{" + a + "x}\\)", "\\( " + (2 * a) + "e^{" + a + "x}\\)", "\\( e^{" + a + "x}\\)"],
        [
          "\\(y'=" + a + "e^{" + a + "x}\\)，再求导：",
          "$$y''=" + a + "\\cdot" + a + "e^{" + a + "x}=" + (a * a) + "e^{" + a + "x}$$"
        ]);
    },
    function (r) { // 切线斜率
      const a = ri(r, 2, 5), b = ri(r, 1, 5), c = ri(r, 1, 3);
      return Q("", "fill", 1, ["切线斜率"],
        "曲线 \\(y=x^2+" + a + "x+" + b + "\\) 在 \\(x=" + c + "\\) 处的切线斜率是多少？",
        [String(2 * c + a)], null,
        [
          "\\(y'=2x+" + a + "\\)，",
          "在 \\(x=" + c + "\\) 处斜率 \\(k=" + (2 * c) + "+" + a + "=" + (2 * c + a) + "\\)。"
        ]);
    },
    function (r) { // 隐函数
      const a = ri(r, 2, 5);
      return Q("", "choice", 2, ["隐函数求导"],
        "由方程 \\(x^2+y^2=" + (a * a) + "\\) 确定 \\(y=y(x)\\)，求 \\(\\dfrac{dy}{dx}\\)。",
        1, ["\\(\\dfrac{x}{y}\\)", "\\(-\\dfrac{x}{y}\\)", "\\(\\dfrac{y}{x}\\)", "\\(-\\dfrac{y}{x}\\)"],
        [
          "两边对 \\(x\\) 求导：\\(2x+2y\\cdot y'=0\\)，",
          "$$y'=-\\frac{x}{y}$$"
        ]);
    },
    function (r) { // 参数方程
      const a = ri(r, 2, 4), b = ri(r, 2, 4);
      return Q("", "choice", 2, ["参数方程求导"],
        "设 \\(x=" + a + "t,\\;y=" + b + "t^2\\)，求 \\(\\dfrac{dy}{dx}\\)。",
        0, ["\\(\\dfrac{" + (2 * b) + "t}{" + a + "}\\)", "\\(\\dfrac{" + b + "t}{" + a + "}\\)", "\\(\\dfrac{" + (2 * b) + "}{" + a + "}\\)", "\\(\\dfrac{" + b + "}{" + (2 * a) + "}\\)"],
        [
          "$$\\frac{dy}{dx}=\\frac{y'(t)}{x'(t)}=\\frac{" + (2 * b) + "t}{" + a + "}$$"
        ]);
    },
    function (r) { // a/x 导数
      const a = ri(r, 2, 5);
      return Q("", "choice", 1, ["求导法则"],
        "设 \\(y=\\dfrac{" + a + "}{x}\\)，求 \\(y'\\)。",
        0, ["\\(-\\dfrac{" + a + "}{x^2}\\)", "\\(\\dfrac{" + a + "}{x^2}\\)", "\\(-\\dfrac{" + a + "}{x}\\)", "\\(\\dfrac{" + a + "}{x}\\)"],
        [
          "$$y'=" + a + "\\cdot\\left(\\frac1x\\right)'=" + a + "\\cdot\\left(-\\frac1{x^2}\\right)=-\\frac{" + a + "}{x^2}$$"
        ]);
    },
    function (r) { // n 阶导数
      const a = ri(r, 2, 3), n = ri(r, 2, 4);
      let fact = 1; for (let i = 2; i <= n; i++) fact *= i;
      return Q("", "fill", 3, ["高阶导数"],
        "设 \\(y=" + a + "x^" + n + "\\)，求 \\(n\\) 阶导数 \\(y^{(" + n + ")}\\) 的值。",
        [String(a * fact)], null,
        [
          "每次求导指数减 \\(1\\) 并乘上当前指数：",
          "$$y^{(" + n + ")}=(" + a + "x^" + n + ")^{(" + n + ")}=" + a + "\\cdot" + n + "!=" + (a * fact) + "$$"
        ]);
    }
  ];

  /* ============================================================
   * 第三章 微分中值定理与导数的应用
   * ============================================================ */
  T[3] = [
    function (r) { // (sin ax - ax)/x^3
      const a = ri(r, 1, 3);
      return Q("", "fill", 2, ["洛必达法则", "泰勒展开"],
        "求极限 \\(\\lim\\limits_{x\\to0}\\dfrac{\\sin " + a + "x-" + a + "x}{x^3}\\) 的值。",
        fillVals(-(a * a * a), 6), null,
        [
          "泰勒展开：\\(\\sin " + a + "x=" + a + "x-\\dfrac{(" + a + "x)^3}{6}+o(x^3)\\)，",
          "$$\\text{原式}=\\lim_{x\\to0}\\frac{-\\frac{" + (a * a * a) + "x^3}{6}}{x^3}=-\\frac{" + (a * a * a) + "}{6}$$",
          "（洛必达法则连续使用三次也可得同样结果。）"
        ]);
    },
    function (r) { // (e^{ax}-1-ax)/x^2
      const a = ri(r, 1, 4);
      return Q("", "fill", 2, ["洛必达法则"],
        "求极限 \\(\\lim\\limits_{x\\to0}\\dfrac{e^{" + a + "x}-1-" + a + "x}{x^2}\\) 的值。",
        fillVals(a * a, 2), null,
        [
          "\\(\\dfrac00\\) 型，两次洛必达：",
          "$$\\lim_{x\\to0}\\frac{e^{" + a + "x}-1-" + a + "x}{x^2}=\\lim_{x\\to0}\\frac{" + a + "e^{" + a + "x}-" + a + "}{2x}=\\lim_{x\\to0}\\frac{" + (a * a) + "e^{" + a + "x}}{2}=\\frac{" + (a * a) + "}{2}$$"
        ]);
    },
    function (r) { // 单调区间
      const a = ri(r, 1, 3);
      return Q("", "choice", 2, ["单调性"],
        "函数 \\(f(x)=x^3-" + (3 * a * a) + "x\\) 的单调递增区间是？",
        0, [
          "\\((-\\infty,-" + a + ")\\cup(" + a + ",+\\infty)\\)",
          "\\((-" + a + "," + a + ")\\)",
          "\\((-\\infty," + a + ")\\)",
          "\\((" + a + ",+\\infty)\\)"
        ],
        [
          "\\(f'(x)=3x^2-" + (3 * a * a) + "=3(x-" + a + ")(x+" + a + ")\\)，",
          "当 \\(x<-" + a + "\\) 或 \\(x>" + a + "\\) 时 \\(f'>0\\)，单调递增；",
          "当 \\(-" + a + "<x<" + a + "\\) 时 \\(f'<0\\)，单调递减。"
        ]);
    },
    function (r) { // 导数在某点
      const a = ri(r, 2, 4), b = ri(r, 1, 3), c = ri(r, 1, 2);
      return Q("", "fill", 2, ["求导"],
        "设 \\(f(x)=x^3+" + a + "x^2+" + b + "x\\)，求 \\(f'(" + c + ")\\)。",
        [String(3 * c * c + 2 * a * c + b)], null,
        [
          "\\(f'(x)=3x^2+" + (2 * a) + "x+" + b + "\\)，",
          "$$f'(" + c + ")=" + (3 * c * c) + "+" + (2 * a * c) + "+" + b + "=" + (3 * c * c + 2 * a * c + b) + "$$"
        ]);
    },
    function (r) { // 拐点
      const a = ri(r, 1, 4), b = ri(r, 1, 5);
      return Q("", "fill", 2, ["拐点"],
        "曲线 \\(y=x^3-" + (3 * a) + "x^2+" + b + "\\) 的拐点横坐标是多少？",
        [String(a)], null,
        [
          "\\(y'=3x^2-" + (6 * a) + "x\\)，\\(y''=6x-" + (6 * a) + "\\)，",
          "令 \\(y''=0\\) 得 \\(x=" + a + "\\)，两侧凹凸性改变，故拐点横坐标为 \\( " + a + " \\)。"
        ]);
    },
    function (r) { // e^{ax} 麦克劳林 x^3 系数
      const a = ri(r, 1, 3);
      return Q("", "fill", 2, ["泰勒公式"],
        "\\(e^{" + a + "x}\\) 的麦克劳林展开式中 \\(x^3\\) 项的系数是多少？",
        fillVals(a * a * a, 6), null,
        [
          "$$e^{" + a + "x}=1+" + a + "x+\\frac{" + (a * a) + "x^2}{2}+\\frac{" + (a * a * a) + "x^3}{6}+\\cdots$$",
          "故 \\(x^3\\) 项系数为 \\(\\dfrac{" + (a * a * a) + "}{6}\\)。"
        ]);
    },
    function (r) { // 拉格朗日 ξ
      const a = ri(r, 2, 8);
      return Q("", "fill", 3, ["拉格朗日中值定理"],
        "函数 \\(f(x)=x^2\\) 在 \\([0," + a + "]\\) 上满足拉格朗日中值定理的 \\(\\xi\\) 是多少？",
        fillVals(a, 2), null,
        [
          "由 \\(\\dfrac{f(" + a + ")-f(0)}{" + a + "-0}=f'(\\xi)\\)：",
          "$$\\frac{" + (a * a) + "}{" + a + "}=2\\xi\\;\\Rightarrow\\;\\xi=\\frac{" + a + "}{2}$$"
        ]);
    },
    function (r) { // tan(ax)/(bx)
      const a = ri(r, 2, 4), b = (() => { let v = ri(r, 2, 4); while (v === a) v = ri(r, 2, 4); return v; })();
      return Q("", "choice", 2, ["等价无穷小"],
        "求极限 \\(\\lim\\limits_{x\\to0}\\dfrac{\\tan " + a + "x}{" + b + "x}\\)。",
        0, ["\\(\\dfrac{" + a + "}{" + b + "}\\)", "\\(\\dfrac{" + b + "}{" + a + "}\\)", "\\( " + (a + b) + " \\)", "\\( " + (a * b) + " \\)"],
        [
          "由等价无穷小 \\(\\tan " + a + "x\\sim" + a + "x\\;(x\\to0)\\)：",
          "$$\\lim_{x\\to0}\\frac{\\tan " + a + "x}{" + b + "x}=\\frac{" + a + "}{" + b + "}$$"
        ]);
    }
  ];

  /* ============================================================
   * 第四章 不定积分
   * ============================================================ */
  T[4] = [
    function (r) { // 幂函数积分
      const a = ri(r, 2, 5), n = ri(r, 2, 4);
      return Q("", "choice", 1, ["基本积分"],
        "求 \\(\\displaystyle\\int" + a + "x^" + n + "\\,dx\\)。",
        0, [
          "\\(\\dfrac{" + a + "}{" + (n + 1) + "}x^{" + (n + 1) + "}+C\\)",
          "\\( " + a + "x^{" + (n + 1) + "}+C\\)",
          "\\( " + (a * n) + "x^{" + (n - 1) + "}+C\\)",
          "\\(\\dfrac{" + (a + 1) + "}{" + (n + 1) + "}x^{" + (n + 1) + "}+C\\)"
        ],
        [
          "由幂函数积分公式 \\(\\int x^n\\,dx=\\dfrac{x^{n+1}}{n+1}+C\\)：",
          "$$\\int" + a + "x^" + n + "\\,dx=\\frac{" + a + "}{" + (n + 1) + "}x^{" + (n + 1) + "}+C$$"
        ]);
    },
    function (r) { // e^{bx}
      const a = ri(r, 2, 5), b = ri(r, 2, 4);
      return Q("", "choice", 1, ["基本积分"],
        "求 \\(\\displaystyle\\int" + a + "e^{" + b + "x}\\,dx\\)。",
        0, [
          "\\(\\dfrac{" + a + "}{" + b + "}e^{" + b + "x}+C\\)",
          "\\( " + a + "e^{" + b + "x}+C\\)",
          "\\( " + (a * b) + "e^{" + b + "x}+C\\)",
          "\\(\\dfrac{" + a + "}{" + b + "}e^{x}+C\\)"
        ],
        [
          "凑微分：\\(e^{" + b + "x}dx=\\dfrac1{" + b + "}\\,d(e^{" + b + "x})\\)，",
          "$$\\int" + a + "e^{" + b + "x}\\,dx=\\frac{" + a + "}{" + b + "}e^{" + b + "x}+C$$"
        ]);
    },
    function (r) { // sin(bx)
      const a = ri(r, 2, 5), b = ri(r, 2, 4);
      return Q("", "choice", 1, ["基本积分"],
        "求 \\(\\displaystyle\\int" + a + "\\sin " + b + "x\\,dx\\)。",
        0, [
          "\\(-\\dfrac{" + a + "}{" + b + "}\\cos " + b + "x+C\\)",
          "\\(\\dfrac{" + a + "}{" + b + "}\\cos " + b + "x+C\\)",
          "\\(-" + a + "\\cos " + b + "x+C\\)",
          "\\(\\dfrac{" + a + "}{" + b + "}\\sin " + b + "x+C\\)"
        ],
        [
          "凑微分：\\(\\sin" + b + "x\\,dx=-\\dfrac1{" + b + "}\\,d(\\cos" + b + "x)\\)，",
          "$$\\int" + a + "\\sin " + b + "x\\,dx=-\\frac{" + a + "}{" + b + "}\\cos " + b + "x+C$$"
        ]);
    },
    function (r) { // a/(bx+c)
      const a = ri(r, 2, 4), b = (() => { let v = ri(r, 2, 4); while (v === a) v = ri(r, 2, 4); return v; })(), c = ri(r, 1, 3);
      return Q("", "choice", 2, ["换元积分"],
        "求 \\(\\displaystyle\\int\\dfrac{" + a + "}{" + b + "x+" + c + "}\\,dx\\)。",
        0, [
          "\\(\\dfrac{" + a + "}{" + b + "}\\ln\\left|" + b + "x+" + c + "\\right|+C\\)",
          "\\( " + a + "\\ln\\left|" + b + "x+" + c + "\\right|+C\\)",
          "\\( " + (a * b) + "\\ln\\left|" + b + "x+" + c + "\\right|+C\\)",
          "\\(\\dfrac{" + a + "}{" + b + "}\\ln|x|+C\\)"
        ],
        [
          "凑微分：\\(\\dfrac{dx}{" + b + "x+" + c + "}=\\dfrac1{" + b + "}\\,d\\ln|" + b + "x+" + c + "|\\)，",
          "$$\\int\\frac{" + a + "}{" + b + "x+" + c + "}\\,dx=\\frac{" + a + "}{" + b + "}\\ln\\left|" + b + "x+" + c + "\\right|+C$$"
        ]);
    },
    function (r) { // cos(bx)
      const a = ri(r, 2, 5), b = ri(r, 2, 4);
      return Q("", "choice", 1, ["基本积分"],
        "求 \\(\\displaystyle\\int" + a + "\\cos " + b + "x\\,dx\\)。",
        0, [
          "\\(\\dfrac{" + a + "}{" + b + "}\\sin " + b + "x+C\\)",
          "\\(-\\dfrac{" + a + "}{" + b + "}\\sin " + b + "x+C\\)",
          "\\( " + a + "\\sin " + b + "x+C\\)",
          "\\(\\dfrac{" + a + "}{" + b + "}\\cos " + b + "x+C\\)"
        ],
        [
          "凑微分：\\(\\cos" + b + "x\\,dx=\\dfrac1{" + b + "}\\,d(\\sin" + b + "x)\\)，",
          "$$\\int" + a + "\\cos " + b + "x\\,dx=\\frac{" + a + "}{" + b + "}\\sin " + b + "x+C$$"
        ]);
    },
    function (r) { // a x e^x
      const a = ri(r, 2, 4);
      return Q("", "choice", 2, ["分部积分"],
        "求 \\(\\displaystyle\\int" + a + "xe^x\\,dx\\)。",
        0, [
          "\\( " + a + "(x-1)e^x+C\\)",
          "\\( " + a + "xe^x+C\\)",
          "\\( " + a + "(x+1)e^x+C\\)",
          "\\(\\dfrac{" + a + "x^2e^x}{2}+C\\)"
        ],
        [
          "分部积分，取 \\(u=" + a + "x\\)，\\(dv=e^xdx\\)：",
          "$$\\int" + a + "xe^x\\,dx=" + a + "xe^x-\\int" + a + "e^x\\,dx=" + a + "(x-1)e^x+C$$"
        ]);
    },
    function (r) { // a x/(1+b x^2)
      const a = ri(r, 2, 4), b = ri(r, 2, 3);
      return Q("", "choice", 2, ["凑微分"],
        "求 \\(\\displaystyle\\int\\dfrac{" + a + "x}{1+" + b + "x^2}\\,dx\\)。",
        0, [
          "\\(\\dfrac{" + a + "}{" + (2 * b) + "}\\ln(1+" + b + "x^2)+C\\)",
          "\\(\\dfrac{" + a + "}{" + b + "}\\ln(1+" + b + "x^2)+C\\)",
          "\\( " + a + "\\ln(1+" + b + "x^2)+C\\)",
          "\\(\\dfrac{" + a + "}{2}\\ln(1+" + b + "x)+C\\)"
        ],
        [
          "凑微分：\\(x\\,dx=\\dfrac1{" + (2 * b) + "}\\,d(1+" + b + "x^2)\\)，",
          "$$\\int\\frac{" + a + "x}{1+" + b + "x^2}\\,dx=\\frac{" + a + "}{" + (2 * b) + "}\\ln(1+" + b + "x^2)+C$$"
        ]);
    },
    function (r) { // a x^2 e^x
      const a = ri(r, 2, 3);
      return Q("", "choice", 3, ["分部积分"],
        "求 \\(\\displaystyle\\int" + a + "x^2e^x\\,dx\\)。",
        0, [
          "\\( " + a + "(x^2-2x+2)e^x+C\\)",
          "\\( " + a + "(x^2+2x+2)e^x+C\\)",
          "\\( " + a + "(x^2-2x)e^x+C\\)",
          "\\(\\dfrac{" + a + "x^3e^x}{3}+C\\)"
        ],
        [
          "两次分部积分：",
          "$$\\int" + a + "x^2e^x\\,dx=" + a + "x^2e^x-\\int" + (2 * a) + "xe^x\\,dx$$",
          "$$=" + a + "x^2e^x-" + (2 * a) + "xe^x+\\int" + (2 * a) + "e^x\\,dx=" + a + "(x^2-2x+2)e^x+C$$"
        ]);
    }
  ];

  /* ============================================================
   * 第五章 定积分
   * ============================================================ */
  T[5] = [
    function (r) { // ∫_a^b x dx
      const a = ri(r, 0, 2), b = ri(r, a + 1, 4);
      return Q("", "fill", 1, ["牛顿-莱布尼茨公式"],
        "计算 \\(\\displaystyle\\int_" + a + "^" + b + "x\\,dx\\) 的值。",
        fillVals(b * b - a * a, 2), null,
        [
          "$$\\int_" + a + "^" + b + "x\\,dx=\\left[\\frac{x^2}{2}\\right]_" + a + "^" + b + "=\\frac{" + (b * b) + "-" + (a * a) + "}{2}=\\frac{" + (b * b - a * a) + "}{2}$$"
        ]);
    },
    function (r) { // ∫_0^1 x^n
      const n = ri(r, 2, 5);
      return Q("", "fill", 1, ["牛顿-莱布尼茨公式"],
        "计算 \\(\\displaystyle\\int_0^1x^" + n + "\\,dx\\) 的值。",
        fillVals(1, n + 1), null,
        [
          "$$\\int_0^1x^" + n + "\\,dx=\\left[\\frac{x^{" + (n + 1) + "}}{" + (n + 1) + "}\\right]_0^1=\\frac{1}{" + (n + 1) + "}$$"
        ]);
    },
    function (r) { // ∫_0^c cos x dx
      const c = ri(r, 1, 2) === 1 ? 2 : 6; // π/2 或 π/6
      const ans = c === 2 ? [1, 1] : [1, 2];
      return Q("", "fill", 2, ["牛顿-莱布尼茨公式"],
        "计算 \\(\\displaystyle\\int_0^{\\frac{\\pi}{" + c + "}}\\cos x\\,dx\\) 的值。",
        fillVals(ans[0], ans[1]), null,
        [
          "$$\\int_0^{\\frac{\\pi}{" + c + "}}\\cos x\\,dx=\\left[\\sin x\\right]_0^{\\frac{\\pi}{" + c + "}}=\\sin\\frac{\\pi}{" + c + "}=" + frac(ans[0], ans[1]) + "$$"
        ]);
    },
    function (r) { // ∫_0^1 e^{ax}
      const a = ri(r, 2, 4);
      return Q("", "choice", 2, ["牛顿-莱布尼茨公式"],
        "计算 \\(\\displaystyle\\int_0^1e^{" + a + "x}\\,dx\\)。",
        0, ["\\(\\dfrac{e^" + a + "-1}{" + a + "}\\)", "\\(e^" + a + "-1\\)", "\\(\\dfrac{e^" + a + "-1}{" + (a * a) + "}\\)", "\\( " + a + "(e^" + a + "-1)\\)"],
        [
          "$$\\int_0^1e^{" + a + "x}\\,dx=\\left[\\frac{e^{" + a + "x}}{" + a + "}\\right]_0^1=\\frac{e^" + a + "-1}{" + a + "}$$"
        ]);
    },
    function (r) { // 对称性 x^3
      const a = ri(r, 1, 3);
      return Q("", "choice", 2, ["奇偶性"],
        "利用对称性计算 \\(\\displaystyle\\int_{-" + a + "}^{" + a + "}x^3\\,dx\\)。",
        0, ["\\(0\\)", "\\(\\dfrac{" + (a * a * a * a) + "}{2}\\)", "\\( " + (a * a * a * a) + " \\)", "\\(\\dfrac{" + (a * a * a * a) + "}{4}\\)"],
        [
          "\\(x^3\\) 是奇函数，对称区间 \\([-" + a + "," + a + "]\\) 上积分为 \\(0\\)：",
          "$$\\int_{-" + a + "}^{" + a + "}x^3\\,dx=0$$"
        ]);
    },
    function (r) { // ∫_0^a 1/(1+x^2)
      const a = ri(r, 1, 3);
      return Q("", "choice", 2, ["牛顿-莱布尼茨公式"],
        "计算 \\(\\displaystyle\\int_0^" + a + "\\dfrac{1}{1+x^2}\\,dx\\)。",
        0, ["\\(\\arctan " + a + "\\)", "\\(\\arctan " + a + "-\\dfrac{\\pi}{4}\\)", "\\(\\ln(1+" + (a * a) + ")\\)", "\\(\\dfrac{" + a + "}{1+" + (a * a) + "}\\)"],
        [
          "$$\\int_0^" + a + "\\frac1{1+x^2}\\,dx=\\left[\\arctan x\\right]_0^" + a + "=\\arctan " + a + "$$"
        ]);
    },
    function (r) { // 广义积分 1/x^p
      const p = ri(r, 2, 4);
      return Q("", "fill", 2, ["广义积分"],
        "计算广义积分 \\(\\displaystyle\\int_1^{+\\infty}\\dfrac{1}{x^" + p + "}\\,dx\\) 的值。",
        fillVals(1, p - 1), null,
        [
          "$$\\int_1^{+\\infty}\\frac1{x^" + p + "}\\,dx=\\lim_{b\\to+\\infty}\\left[-\\frac{1}{" + (p - 1) + "x^{" + (p - 1) + "}}\\right]_1^b$$",
          "$$=\\lim_{b\\to+\\infty}\\left(\\frac{1}{" + (p - 1) + "}-\\frac{1}{" + (p - 1) + "b^{" + (p - 1) + "}}\\right)=\\frac{1}{" + (p - 1) + "}$$"
        ]);
    },
    function (r) { // 变上限求导
      const a = ri(r, 0, 2);
      return Q("", "choice", 2, ["变上限积分"],
        "求 \\(\\dfrac{d}{dx}\\displaystyle\\int_" + a + "^x\\cos(t^2)\\,dt\\)。",
        0, ["\\(\\cos(x^2)\\)", "\\(\\sin(x^2)\\)", "\\(-\\sin(x^2)\\)", "\\(2x\\cos(x^2)\\)"],
        [
          "由微积分基本定理：",
          "$$\\frac{d}{dx}\\int_" + a + "^x\\cos(t^2)\\,dt=\\cos(x^2)$$"
        ]);
    }
  ];

  /* ============================================================
   * 第六章 定积分的应用
   * ============================================================ */
  T[6] = [
    function (r) { // 面积 x^n
      const n = ri(r, 2, 3), a = ri(r, 1, 3);
      return Q("", "fill", 1, ["面积"],
        "由曲线 \\(y=x^" + n + "\\)、\\(x\\) 轴及直线 \\(x=" + a + "\\) 围成的图形面积是多少？",
        fillVals(Math.pow(a, n + 1), n + 1), null,
        [
          "$$S=\\int_0^" + a + "x^" + n + "\\,dx=\\left[\\frac{x^{" + (n + 1) + "}}{" + (n + 1) + "}\\right]_0^" + a + "=\\frac{" + Math.pow(a, n + 1) + "}{" + (n + 1) + "}$$"
        ]);
    },
    function (r) { // 旋转体 x^n
      const n = ri(r, 1, 2), a = ri(r, 1, 3);
      return Q("", "choice", 2, ["旋转体体积"],
        "曲线 \\(y=x^" + n + "\\)（\\(0\\le x\\le" + a + "\\)）绕 \\(x\\) 轴旋转一周所得旋转体体积是？",
        0, [
          "\\(\\dfrac{\\pi " + Math.pow(a, 2 * n + 1) + "}{" + (2 * n + 1) + "}\\)",
          "\\(\\dfrac{\\pi " + Math.pow(a, n + 1) + "}{" + (n + 1) + "}\\)",
          "\\(\\pi " + Math.pow(a, 2 * n + 1) + "\\)",
          "\\(\\dfrac{\\pi " + Math.pow(a, 2 * n + 2) + "}{" + (2 * n + 2) + "}\\)"
        ],
        [
          "由圆盘法：",
          "$$V=\\pi\\int_0^" + a + "x^{" + (2 * n) + "}\\,dx=\\pi\\left[\\frac{x^{" + (2 * n + 1) + "}}{" + (2 * n + 1) + "}\\right]_0^" + a + "=\\frac{\\pi " + Math.pow(a, 2 * n + 1) + "}{" + (2 * n + 1) + "}$$"
        ]);
    },
    function (r) { // 线段弧长
      const a = ri(r, 1, 3), k = ri(r, 1, 2);
      return Q("", "choice", 2, ["弧长"],
        "直线段 \\(y=" + k + "x\\) 上 \\(0\\le x\\le" + a + "\\) 一段的长度是？",
        0, [
          "\\( " + a + "\\sqrt{" + (1 + k * k) + "}\\)",
          "\\( " + (a * k) + "\\)",
          "\\( " + a + "(1+" + k + ")\\)",
          "\\( " + a + "\\sqrt{" + (2 + k * k) + "}\\)"
        ],
        [
          "\\(y'=" + k + "\\)，由弧长公式：",
          "$$s=\\int_0^" + a + "\\sqrt{1+(" + k + ")^2}\\,dx=" + a + "\\sqrt{" + (1 + k * k) + "}$$"
        ]);
    },
    function (r) { // 弹簧做功
      const F = ri(r, 1, 2) * 10, y = ri(r, 2, 4);
      const W = F * y * y / 200;
      const ws = W => (Math.round(W * 100) / 100).toString();
      return Q("", "choice", 2, ["物理应用", "功"],
        "弹簧伸长 \\(1\\,\\text{cm}\\) 需拉力 \\( " + F + "\\,\\text{N}\\)，将其从原长拉长 \\( " + y + "\\,\\text{cm}\\)，拉力做功为？",
        0, ["\\( " + ws(W) + "\\,\\text{J}\\)", "\\( " + ws(W / 2) + "\\,\\text{J}\\)", "\\( " + ws(W * 2) + "\\,\\text{J}\\)", "\\( " + ws(W * 10) + "\\,\\text{J}\\)"],
        [
          "胡克定律 \\(F=kx\\)：\\( " + F + "=k\\times0.01\\Rightarrow k=" + (F * 100) + "\\,\\text{N/m}\\)。",
          "$$W=\\int_0^{" + (y / 100) + "}" + (F * 100) + "x\\,dx=" + (F * 50) + "x^2\\Big|_0^{" + (y / 100) + "}=" + ws(W) + "\\,\\text{J}$$"
        ]);
    },
    function (r) { // 平均值
      const n = ri(r, 2, 3), a = ri(r, 2, 3);
      return Q("", "fill", 2, ["平均值"],
        "函数 \\(f(x)=x^" + n + "\\) 在 \\([0," + a + "]\\) 上的平均值是多少？",
        fillVals(Math.pow(a, n), n + 1), null,
        [
          "由积分平均值公式：",
          "$$\\bar f=\\frac1{" + a + "}\\int_0^" + a + "x^" + n + "\\,dx=\\frac1{" + a + "}\\cdot\\frac{" + Math.pow(a, n + 1) + "}{" + (n + 1) + "}=\\frac{" + Math.pow(a, n) + "}{" + (n + 1) + "}$$"
        ]);
    },
    function (r) { // y=cx 与 y=x^2
      const c = ri(r, 2, 4);
      return Q("", "fill", 3, ["面积"],
        "求由曲线 \\(y=" + c + "x\\) 与 \\(y=x^2\\) 围成的图形面积。",
        fillVals(c * c * c, 6), null,
        [
          "交点：\\(x^2=" + c + "x\\Rightarrow x=0\\) 或 \\(x=" + c + "\\)。",
          "$$S=\\int_0^" + c + "(" + c + "x-x^2)\\,dx=\\left[\\frac{" + c + "x^2}{2}-\\frac{x^3}{3}\\right]_0^" + c + "=\\frac{" + (c * c * c) + "}{6}$$"
        ]);
    },
    function (r) { // y=√x 旋转
      const a = ri(r, 1, 4);
      return Q("", "choice", 2, ["旋转体体积"],
        "曲线 \\(y=\\sqrt{x}\\)（\\(0\\le x\\le" + a + "\\)）绕 \\(x\\) 轴旋转所得旋转体体积是？",
        0, ["\\(\\dfrac{\\pi " + (a * a) + "}{2}\\)", "\\(\\pi " + (a * a) + "\\)", "\\(\\dfrac{\\pi " + (a * a) + "}{3}\\)", "\\(\\dfrac{2\\pi " + (a * a) + "}{3}\\)"],
        [
          "$$V=\\pi\\int_0^" + a + "(\\sqrt{x})^2\\,dx=\\pi\\int_0^" + a + "x\\,dx=\\frac{\\pi " + (a * a) + "}{2}$$"
        ]);
    },
    function (r) { // 圆象限弧长
      const a = ri(r, 1, 3);
      return Q("", "choice", 2, ["弧长"],
        "圆周 \\(x^2+y^2=" + (a * a) + "\\) 位于第一象限部分的弧长是？",
        0, ["\\(\\dfrac{\\pi " + a + "}{2}\\)", "\\(\\pi " + a + "\\)", "\\(\\dfrac{\\pi " + a + "}{4}\\)", "\\(2\\pi " + a + "\\)"],
        [
          "整圆周长为 \\(2\\pi\\times" + a + "=2\\pi" + a + "\\)，第一象限占四分之一：",
          "$$s=\\frac{2\\pi" + a + "}{4}=\\frac{\\pi " + a + "}{2}$$"
        ]);
    }
  ];

  /* ============================================================
   * 第七章 微分方程
   * ============================================================ */
  T[7] = [
    function (r) { // y'=ax
      const a = ri(r, 2, 5);
      return Q("", "choice", 1, ["可分离变量方程"],
        "微分方程 \\(y'=" + a + "x\\) 的通解是？",
        0, ["\\(y=\\dfrac{" + a + "}{2}x^2+C\\)", "\\(y=" + a + "x^2+C\\)", "\\(y=\\dfrac{1}{2}x^2+C\\)", "\\(y=" + a + "x+C\\)"],
        [
          "直接积分：",
          "$$y=\\int" + a + "x\\,dx=\\frac{" + a + "}{2}x^2+C$$"
        ]);
    },
    function (r) { // y'+ay=0
      const a = ri(r, 2, 5);
      return Q("", "choice", 1, ["可分离变量方程"],
        "微分方程 \\(y'+" + a + "y=0\\) 的通解是？",
        0, ["\\(y=Ce^{-" + a + "x}\\)", "\\(y=Ce^{" + a + "x}\\)", "\\(y=Ce^{-" + a + "x^2}\\)", "\\(y=Ce^{-x}\\)"],
        [
          "分离变量：\\(\\dfrac{dy}{y}=-" + a + "\\,dx\\)，积分得：",
          "$$\\ln|y|=-" + a + "x+C_1\\;\\Rightarrow\\;y=Ce^{-" + a + "x}$$"
        ]);
    },
    function (r) { // y'+ay=b
      const a = ri(r, 2, 4), b = ri(r, 1, 4);
      return Q("", "choice", 2, ["一阶线性方程"],
        "微分方程 \\(y'+" + a + "y=" + b + "\\) 的通解是？",
        0, ["\\(y=\\dfrac{" + b + "}{" + a + "}+Ce^{-" + a + "x}\\)", "\\(y=\\dfrac{" + b + "}{" + a + "}+Ce^{" + a + "x}\\)", "\\(y=" + b + "+Ce^{-" + a + "x}\\)", "\\(y=Ce^{-" + a + "x}\\)"],
        [
          "积分因子 \\(e^{\\int" + a + "\\,dx}=e^{" + a + "x}\\)：",
          "$$\\left(ye^{" + a + "x}\\right)'=" + b + "e^{" + a + "x}\\;\\Rightarrow\\;ye^{" + a + "x}=\\frac{" + b + "}{" + a + "}e^{" + a + "x}+C$$",
          "故 \\(y=\\dfrac{" + b + "}{" + a + "}+Ce^{-" + a + "x}\\)。"
        ]);
    },
    function (r) { // y''-a^2 y=0
      const a = ri(r, 1, 3);
      return Q("", "choice", 2, ["常系数线性方程"],
        "微分方程 \\(y''-" + (a * a) + "y=0\\) 的通解是？",
        0, [
          "\\(y=C_1e^{" + a + "x}+C_2e^{-" + a + "x}\\)",
          "\\(y=C_1\\cos " + a + "x+C_2\\sin " + a + "x\\)",
          "\\(y=(C_1+C_2x)e^{-" + a + "x}\\)",
          "\\(y=C_1e^{" + a + "x}\\)"
        ],
        [
          "特征方程 \\(r^2-" + (a * a) + "=0\\)，根为 \\(r=\\pm" + a + "\\)（两相异实根），",
          "$$y=C_1e^{" + a + "x}+C_2e^{-" + a + "x}$$"
        ]);
    },
    function (r) { // y''+a^2 y=0
      const a = ri(r, 2, 3);
      return Q("", "choice", 2, ["常系数线性方程"],
        "微分方程 \\(y''+" + (a * a) + "y=0\\) 的通解是？",
        0, [
          "\\(y=C_1\\cos " + a + "x+C_2\\sin " + a + "x\\)",
          "\\(y=C_1e^{" + a + "x}+C_2e^{-" + a + "x}\\)",
          "\\(y=C_1\\cos x+C_2\\sin x\\)",
          "\\(y=C_1\\cos " + (2 * a) + "x+C_2\\sin " + (2 * a) + "x\\)"
        ],
        [
          "特征方程 \\(r^2+" + (a * a) + "=0\\)，根为 \\(r=\\pm" + a + "i\\)（共轭复根），",
          "$$y=C_1\\cos " + a + "x+C_2\\sin " + a + "x$$"
        ]);
    },
    function (r) { // 二重根
      const a = ri(r, 1, 3);
      return Q("", "choice", 3, ["常系数线性方程"],
        "微分方程 \\(y''-" + (2 * a) + "y'+" + (a * a) + "y=0\\) 的通解是？",
        0, [
          "\\(y=(C_1+C_2x)e^{" + a + "x}\\)",
          "\\(y=C_1e^{" + a + "x}+C_2e^{-" + a + "x}\\)",
          "\\(y=C_1e^{" + a + "x}+C_2e^{" + (2 * a) + "x}\\)",
          "\\(y=(C_1+C_2x)e^{" + (2 * a) + "x}\\)"
        ],
        [
          "特征方程 \\(r^2-" + (2 * a) + "r+" + (a * a) + "=(r-" + a + ")^2=0\\) 有二重根 \\(r=" + a + "\\)，",
          "$$y=(C_1+C_2x)e^{" + a + "x}$$"
        ]);
    },
    function (r) { // 初值问题
      const c = ri(r, 1, 3);
      return Q("", "fill", 2, ["初值问题"],
        "曲线 \\(y=f(x)\\) 过点 \\((0,1)\\)，且任一点处切线斜率为 \\(2x\\)，求 \\(f(" + c + ")\\)。",
        [String(c * c + 1)], null,
        [
          "由题意 \\(f'(x)=2x\\)，积分得 \\(f(x)=x^2+C\\)。",
          "代入 \\(f(0)=1\\) 得 \\(C=1\\)，故 \\(f(x)=x^2+1\\)，",
          "所以 \\(f(" + c + ")=" + (c * c) + "+1=" + (c * c + 1) + "\\)。"
        ]);
    },
    function (r) { // dy/dx = a x y
      const a = ri(r, 2, 4);
      return Q("", "choice", 2, ["可分离变量方程"],
        "微分方程 \\(\\dfrac{dy}{dx}=" + a + "xy\\) 的通解是？",
        0, ["\\(y=Ce^{\\frac{" + a + "}{2}x^2}\\)", "\\(y=Ce^{" + a + "x^2}\\)", "\\(y=Ce^{\\frac{" + a + "}{2}x}\\)", "\\(y=Ce^{\\frac{" + a + "}{2}x^2+x}\\)"],
        [
          "分离变量：\\(\\dfrac{dy}{y}=" + a + "x\\,dx\\)，积分得：",
          "$$\\ln|y|=\\frac{" + a + "}{2}x^2+C_1\\;\\Rightarrow\\;y=Ce^{\\frac{" + a + "}{2}x^2}$$"
        ]);
    }
  ];

  /* ============================================================
   * 第八章 空间解析几何与向量代数
   * ============================================================ */
  T[8] = [
    function (r) { // 数量积
      const a = ri(r, -3, 3), b = ri(r, -3, 3), c = ri(r, -3, 3);
      const d = ri(r, -3, 3), e = ri(r, -3, 3), f = ri(r, -3, 3);
      if (a === 0 && b === 0 && c === 0) a = 1;
      const v = a * d + b * e + c * f;
      return Q("", "fill", 1, ["数量积"],
        "已知 \\(\\vec a=(" + a + "," + b + "," + c + ")\\)，\\(\\vec b=(" + d + "," + e + "," + f + ")\\)，求 \\(\\vec a\\cdot\\vec b\\)。",
        [String(v)], null,
        [
          "$$\\vec a\\cdot\\vec b=" + a + "\\times(" + d + ")+" + b + "\\times(" + e + ")+" + c + "\\times(" + f + ")=" + v + "$$"
        ]);
    },
    function (r) { // 向量积
      const a = ri(r, 1, 4), b = ri(r, 1, 4);
      return Q("", "choice", 1, ["向量积"],
        "设 \\(\\vec a=(" + a + ",0,0)\\)，\\(\\vec b=(0," + b + ",0)\\)，求 \\(\\vec a\\times\\vec b\\)。",
        0, ["\\((0,0," + (a * b) + ")\\)", "\\((0,0,-" + (a * b) + ")\\)", "\\((0,0," + (a + b) + ")\\)", "\\((" + (a * b) + ",0,0)\\)"],
        [
          "由向量积行列式公式：",
          "$$\\vec a\\times\\vec b=\\begin{vmatrix}i&j&k\\\\" + a + "&0&0\\\\0&" + b + "&0\\end{vmatrix}=(0,0," + (a * b) + ")$$"
        ]);
    },
    function (r) { // 平面方程
      const p = ri(r, 2, 4);
      return Q("", "choice", 2, ["平面方程"],
        "过点 \\((" + p + ",0,0)\\) 且法向量为 \\(\\vec n=(1,1,1)\\) 的平面方程是？",
        0, ["\\(x+y+z=" + p + "\\)", "\\(x+y+z=0\\)", "\\(x+y+z=1\\)", "\\( " + p + "(x+y+z)=1\\)"],
        [
          "点法式：\\((x-" + p + ")+y+z=0\\)，",
          "即 \\(x+y+z=" + p + "\\)。"
        ]);
    },
    function (r) { // 距离
      const a = ri(r, 1, 2), b = ri(r, 1, 2), c = ri(r, 1, 2);
      const s = a + b + c;
      return Q("", "choice", 2, ["距离公式"],
        "点 \\((" + a + "," + b + "," + c + ")\\) 到平面 \\(x+y+z=0\\) 的距离是？",
        0, ["\\(\\dfrac{" + s + "}{\\sqrt{3}}\\)", "\\( " + s + "\\)", "\\(\\dfrac{" + s + "}{3}\\)", "\\( " + s + "\\sqrt{3}\\)"],
        [
          "$$d=\\frac{|" + a + "+" + b + "+" + c + "|}{\\sqrt{1+1+1}}=\\frac{" + s + "}{\\sqrt3}$$"
        ]);
    },
    function (r) { // 球半径
      const a = ri(r, 0, 3), b = ri(r, 0, 3), c = ri(r, 0, 3), rad = ri(r, 1, 5);
      return Q("", "fill", 1, ["球面方程"],
        "球面 \\((x-" + a + ")^2+(y-" + b + ")^2+(z-" + c + ")^2=" + (rad * rad) + "\\) 的半径是多少？",
        [String(rad)], null,
        [
          "球面标准方程 \\((x-x_0)^2+(y-y_0)^2+(z-z_0)^2=R^2\\)，",
          "\\(R^2=" + (rad * rad) + "\\)，故半径 \\(R=" + rad + "\\)。"
        ]);
    },
    function (r) { // 平行条件
      const p = ri(r, 1, 2) === 1 ? 2 : 3; // k=6/p
      const k = 6 / p;
      return Q("", "fill", 2, ["向量平行"],
        "向量 \\(\\vec a=(2,-1,k)\\) 与 \\(\\vec b=(" + (2 * p) + ",-" + p + ",6)\\) 平行，求 \\(k\\)。",
        [String(k)], null,
        [
          "平行向量对应坐标成比例：",
          "$$\\frac{" + (2 * p) + "}{2}=\\frac{-" + p + "}{-1}=\\frac6k=" + p + "\\;\\Rightarrow\\;k=\\frac6{" + p + "}=" + k + "$$"
        ]);
    },
    function (r) { // 向量模（勾股数）
      const tris = [[3, 4, 0, 5], [6, 8, 0, 10], [1, 2, 2, 3], [2, 3, 6, 7], [0, 3, 4, 5], [8, 0, 6, 10], [2, 2, 1, 3], [4, 4, 7, 9], [1, 4, 8, 9], [3, 0, 4, 5]];
      const t = tris[ri(r, 0, tris.length - 1)];
      return Q("", "fill", 2, ["向量模"],
        "已知向量 \\(\\vec a=(" + t[0] + "," + t[1] + "," + t[2] + ")\\)，求 \\(|\\vec a|\\)。",
        [String(t[3])], null,
        [
          "$$|\\vec a|=\\sqrt{" + t[0] + "^2+" + t[1] + "^2+" + t[2] + "^2}=\\sqrt{" + (t[3] * t[3]) + "}=" + t[3] + "$$"
        ]);
    },
    function (r) { // 垂直条件
      const q = ri(r, 1, 3);
      const p = 2 - q;
      return Q("", "fill", 3, ["向量垂直"],
        "向量 \\(\\vec a=(1,2,1)\\) 与 \\(\\vec b=(" + p + ",-1," + q + ")\\) 垂直，求 \\(p\\)。",
        [String(p)], null,
        [
          "垂直条件：\\(\\vec a\\cdot\\vec b=0\\)，",
          "$$1\\times p+2\\times(-1)+1\\times" + q + "=0\\;\\Rightarrow\\;p=2-" + q + "=" + p + "$$"
        ]);
    }
  ];

  /* ============================================================
   * 第九章 多元函数微分学
   * ============================================================ */
  T[9] = [
    function (r) { // 偏导数
      const a = ri(r, 2, 4), b = ri(r, 2, 4);
      return Q("", "choice", 1, ["偏导数"],
        "设 \\(z=" + a + "x^2y+" + b + "y^2\\)，求 \\(\\dfrac{\\partial z}{\\partial x}\\)。",
        0, [
          "\\( " + (2 * a) + "xy\\)",
          "\\( " + a + "x^2+" + (2 * b) + "y\\)",
          "\\( " + (2 * a) + "xy+" + (2 * b) + "y\\)",
          "\\( " + a + "xy\\)"
        ],
        [
          "对 \\(x\\) 求偏导时把 \\(y\\) 看作常数：",
          "$$\\frac{\\partial z}{\\partial x}=" + (2 * a) + "xy$$"
        ]);
    },
    function (r) { // e^{axy} 偏导
      const a = ri(r, 2, 4);
      return Q("", "choice", 1, ["偏导数"],
        "设 \\(z=e^{" + a + "xy}\\)，求 \\(\\dfrac{\\partial z}{\\partial y}\\)。",
        0, ["\\( " + a + "xe^{" + a + "xy}\\)", "\\( " + a + "ye^{" + a + "xy}\\)", "\\( " + a + "e^{" + a + "xy}\\)", "\\( " + a + "xye^{" + a + "xy}\\)"],
        [
          "对 \\(y\\) 求偏导时把 \\(x\\) 看作常数：",
          "$$\\frac{\\partial z}{\\partial y}=e^{" + a + "xy}\\cdot" + a + "x=" + a + "xe^{" + a + "xy}$$"
        ]);
    },
    function (r) { // 全微分
      const a = ri(r, 2, 4), b = ri(r, 2, 4);
      return Q("", "choice", 2, ["全微分"],
        "设 \\(z=" + a + "x^2+" + b + "y^2\\)，在点 \\((1,1)\\) 处的全微分 \\(dz\\) 是？",
        0, ["\\( " + (2 * a) + "dx+" + (2 * b) + "dy\\)", "\\( " + a + "dx+" + b + "dy\\)", "\\( " + (2 * a) + "dx+" + b + "dy\\)", "\\( " + (2 * a) + "dy+" + (2 * b) + "dx\\)"],
        [
          "\\(\\dfrac{\\partial z}{\\partial x}=" + (2 * a) + "x\\)，\\(\\dfrac{\\partial z}{\\partial y}=" + (2 * b) + "y\\)，",
          "$$dz=" + (2 * a) + "x\\,dx+" + (2 * b) + "y\\,dy$$",
          "在 \\((1,1)\\) 处：\\(dz=" + (2 * a) + "\\,dx+" + (2 * b) + "\\,dy\\)。"
        ]);
    },
    function (r) { // 偏导数值
      const a = ri(r, 2, 4), b = ri(r, 2, 4);
      return Q("", "fill", 2, ["偏导数"],
        "设 \\(z=x^" + a + "y^" + b + "\\)，求 \\(\\dfrac{\\partial z}{\\partial x}\\) 在点 \\((1,1)\\) 处的值。",
        [String(a)], null,
        [
          "\\(\\dfrac{\\partial z}{\\partial x}=" + a + "x^{" + (a - 1) + "}y^" + b + "\\)，",
          "代入 \\((1,1)\\)：\\(=" + a + "\\times1\\times1=" + a + "\\)。"
        ]);
    },
    function (r) { // 极小值
      const a = ri(r, 1, 3), off = ri(r, 2, 5);
      const b = a * a + off;
      return Q("", "fill", 3, ["多元极值"],
        "函数 \\(f(x,y)=x^2+y^2-" + (2 * a) + "x+" + b + "\\) 的极小值是多少？",
        [String(off)], null,
        [
          "配方：\\(f=(x-" + a + ")^2+y^2+" + off + "\\)，",
          "当 \\(x=" + a + ",\\;y=0\\) 时取得极小值 \\( " + off + " \\)。"
        ]);
    },
    function (r) { // 方向导数
      const a = ri(r, 1, 2);
      return Q("", "fill", 3, ["方向导数"],
        "\\(f(x,y)=x^2+y^2\\) 在点 \\((" + a + "," + a + ")\\) 处沿方向 \\(\\vec l=(1,1)\\) 的方向导数是多少？",
        [String(2 * a) + "sqrt2", String(2 * a) + "√2"], null,
        [
          "梯度 \\(\\nabla f=(2x,2y)\\)，在 \\((" + a + "," + a + ")\\) 处为 \\((" + (2 * a) + "," + (2 * a) + ")\\)。",
          "\\(\\vec l\\) 的单位向量 \\(\\left(\\dfrac1{\\sqrt2},\\dfrac1{\\sqrt2}\\right)\\)，",
          "$$\\frac{\\partial f}{\\partial l}=\\frac{" + (2 * a) + "}{\\sqrt2}+\\frac{" + (2 * a) + "}{\\sqrt2}=" + (2 * a) + "\\sqrt2$$"
        ]);
    },
    function (r) { // 链式法则
      const a = ri(r, 2, 4), b = (() => { let v = ri(r, 2, 4); while (v === a) v = ri(r, 2, 4); return v; })();
      return Q("", "choice", 2, ["复合函数求导"],
        "设 \\(z=\\sin(" + a + "x+" + b + "y)\\)，求 \\(\\dfrac{\\partial z}{\\partial x}\\)。",
        0, ["\\( " + a + "\\cos(" + a + "x+" + b + "y)\\)", "\\( " + b + "\\cos(" + a + "x+" + b + "y)\\)", "\\( " + a + "\\sin(" + a + "x+" + b + "y)\\)", "\\(\\cos(" + a + "x+" + b + "y)\\)"],
        [
          "复合函数求导（链式法则），对 \\(x\\) 求偏导：",
          "$$\\frac{\\partial z}{\\partial x}=\\cos(" + a + "x+" + b + "y)\\cdot" + a + "=" + a + "\\cos(" + a + "x+" + b + "y)$$"
        ]);
    },
    function (r) { // 隐函数
      const a = ri(r, 1, 4);
      return Q("", "choice", 3, ["隐函数求导"],
        "由方程 \\(x^2+y^2+z^2=" + (a * a) + "\\) 确定 \\(z=z(x,y)\\)，求 \\(\\dfrac{\\partial z}{\\partial x}\\)。",
        0, ["\\(-\\dfrac{x}{z}\\)", "\\(\\dfrac{x}{z}\\)", "\\(-\\dfrac{z}{x}\\)", "\\(\\dfrac{z}{x}\\)"],
        [
          "两边对 \\(x\\) 求偏导（\\(y\\) 看作常数）：",
          "$$2x+2z\\cdot z_x=0\\;\\Rightarrow\\;z_x=-\\frac{x}{z}$$"
        ]);
    }
  ];

  /* ============================================================
   * 第十章 重积分
   * ============================================================ */
  T[10] = [
    function (r) { // 矩形区域 ∫∫x
      const a = ri(r, 1, 3), b = ri(r, 2, 4);
      return Q("", "fill", 1, ["二重积分"],
        "计算 \\(\\displaystyle\\iint_Dx\\,dxdy\\)，其中 \\(D:0\\le x\\le" + a + ",\\;0\\le y\\le" + b + "\\)。",
        fillVals(a * a * b, 2), null,
        [
          "$$\\iint_Dx\\,dxdy=\\int_0^" + b + "dy\\int_0^" + a + "x\\,dx=" + b + "\\cdot\\frac{" + (a * a) + "}{2}=\\frac{" + (a * a * b) + "}{2}$$"
        ]);
    },
    function (r) { // 极坐标圆盘
      const a = ri(r, 2, 3);
      return Q("", "choice", 2, ["极坐标"],
        "计算 \\(\\displaystyle\\iint_D(x^2+y^2)\\,dxdy\\)，其中 \\(D:x^2+y^2\\le" + (a * a) + "\\)。",
        0, ["\\(\\dfrac{\\pi " + Math.pow(a, 4) + "}{2}\\)", "\\(\\pi " + (a * a) + "\\)", "\\(\\pi " + Math.pow(a, 4) + "\\)", "\\(\\dfrac{\\pi " + Math.pow(a, 4) + "}{3}\\)"],
        [
          "极坐标：\\(x=r\\cos\\theta,\\;y=r\\sin\\theta\\)，",
          "$$\\iint_D(x^2+y^2)\\,dA=\\int_0^{2\\pi}d\\theta\\int_0^" + a + "r^3\\,dr=2\\pi\\cdot\\frac{" + Math.pow(a, 4) + "}{4}=\\frac{\\pi " + Math.pow(a, 4) + "}{2}$$"
        ]);
    },
    function (r) { // 交换次序
      const a = ri(r, 1, 3);
      return Q("", "choice", 2, ["交换积分次序"],
        "交换积分次序：\\(\\displaystyle\\int_0^" + a + "dx\\int_0^xf(x,y)\\,dy=\\)？",
        0, [
          "\\(\\displaystyle\\int_0^" + a + "dy\\int_y^" + a + "f(x,y)\\,dx\\)",
          "\\(\\displaystyle\\int_0^" + a + "dy\\int_0^yf(x,y)\\,dx\\)",
          "\\(\\displaystyle\\int_0^" + a + "dy\\int_0^" + a + "f(x,y)\\,dx\\)",
          "\\(\\displaystyle\\int_0^" + a + "dy\\int_y^" + a + "f(x,y)\\,dy\\)"
        ],
        [
          "积分区域 \\(D:0\\le y\\le x\\le" + a + "\\)，",
          "交换次序后：\\(0\\le y\\le" + a + "\\)，\\(y\\le x\\le" + a + "\\)，",
          "故 \\(\\int_0^" + a + "dx\\int_0^xf\\,dy=\\int_0^" + a + "dy\\int_y^" + a + "f\\,dx\\)。"
        ]);
    },
    function (r) { // 四面体体积
      const a = ri(r, 1, 3);
      return Q("", "choice", 2, ["体积"],
        "平面 \\(x+y+z=" + a + "\\) 与三个坐标面围成的四面体体积是？",
        0, ["\\(\\dfrac{" + (a * a * a) + "}{6}\\)", "\\(\\dfrac{" + (a * a * a) + "}{3}\\)", "\\(\\dfrac{" + (a * a * a) + "}{2}\\)", "\\( " + (a * a * a) + " \\)"],
        [
          "积分区域 \\(D:x\\ge0,\\;y\\ge0,\\;x+y\\le" + a + "\\)，曲顶 \\(z=" + a + "-x-y\\)：",
          "$$V=\\int_0^" + a + "dx\\int_0^{" + a + "-x}(" + a + "-x-y)\\,dy=\\int_0^" + a + "\\frac{(" + a + "-x)^2}{2}\\,dx=\\frac{" + (a * a * a) + "}{6}$$"
        ]);
    },
    function (r) { // 上半圆 ∫∫y
      const a = ri(r, 1, 3);
      return Q("", "fill", 2, ["极坐标"],
        "计算 \\(\\displaystyle\\iint_Dy\\,dxdy\\)，其中 \\(D:x^2+y^2\\le" + (a * a) + ",\\;y\\ge0\\)。",
        fillVals(2 * a * a * a, 3), null,
        [
          "极坐标：\\(D:0\\le r\\le" + a + ",\\;0\\le\\theta\\le\\pi\\)，",
          "$$\\iint_Dy\\,dA=\\int_0^\\pi\\sin\\theta\\,d\\theta\\int_0^" + a + "r^2\\,dr=2\\cdot\\frac{" + (a * a * a) + "}{3}=\\frac{" + (2 * a * a * a) + "}{3}$$"
        ]);
    },
    function (r) { // 矩形 ∫∫(x+y)
      const a = ri(r, 1, 3), b = ri(r, 2, 3);
      return Q("", "fill", 2, ["二重积分"],
        "计算 \\(\\displaystyle\\iint_D(x+y)\\,dxdy\\)，其中 \\(D:0\\le x\\le" + a + ",\\;0\\le y\\le" + b + "\\)。",
        [String(a * b * (a + b) / 2)], null,
        [
          "$$\\iint_Dx\\,dA+\\iint_Dy\\,dA=" + b + "\\cdot\\frac{" + (a * a) + "}{2}+" + a + "\\cdot\\frac{" + (b * b) + "}{2}=\\frac{" + (a * b * (a + b)) + "}{2}$$"
        ]);
    },
    function (r) { // 面积 ∫∫
      const a = ri(r, 2, 3);
      return Q("", "fill", 2, ["二重积分"],
        "求由曲线 \\(y=x^2\\)、\\(x\\) 轴及直线 \\(x=" + a + "\\) 围成区域的面积。",
        fillVals(a * a * a, 3), null,
        [
          "$$S=\\iint_DdA=\\int_0^" + a + "dx\\int_0^{x^2}dy=\\int_0^" + a + "x^2\\,dx=\\frac{" + (a * a * a) + "}{3}$$"
        ]);
    },
    function (r) { // e^{x+y}
      const a = ri(r, 1, 2), b = ri(r, 1, 2);
      return Q("", "choice", 3, ["二重积分"],
        "计算 \\(\\displaystyle\\iint_De^{x+y}\\,dxdy\\)，其中 \\(D:0\\le x\\le" + a + ",\\;0\\le y\\le" + b + "\\)。",
        0, ["\\((e^" + a + "-1)(e^" + b + "-1)\\)", "\\(e^{" + (a * b) + "}-1\\)", "\\(\\dfrac{(e^" + a + "-1)(e^" + b + "-1)}{2}\\)", "\\(e^{" + a + "}e^{" + b + "}\\)"],
        [
          "化为累次积分：",
          "$$\\iint_De^{x+y}\\,dA=\\int_0^" + a + "e^x\\,dx\\int_0^" + b + "e^y\\,dy=(e^" + a + "-1)(e^" + b + "-1)$$"
        ]);
    }
  ];

  /* ============================================================
   * 第十一章 曲线积分与曲面积分
   * ============================================================ */
  T[11] = [
    function (r) { // 线段长度
      const a = ri(r, 1, 3);
      return Q("", "choice", 1, ["第一类曲线积分"],
        "计算 \\(\\displaystyle\\int_Lds\\)，其中 \\(L\\) 为直线段 \\(y=x\\) 上从 \\((0,0)\\) 到 \\((" + a + "," + a + ")\\) 的部分。",
        0, ["\\( " + a + "\\sqrt{2}\\)", "\\( " + a + "\\)", "\\( " + (2 * a) + "\\)", "\\(\\dfrac{" + a + "\\sqrt{2}}{2}\\)"],
        [
          "两点间距离：\\(\\sqrt{" + a + "^2+" + a + "^2}=" + a + "\\sqrt2\\)，",
          "故 \\(\\int_L1\\,ds=" + a + "\\sqrt2\\)。"
        ]);
    },
    function (r) { // 圆 (x^2+y^2)ds
      const a = ri(r, 2, 3);
      return Q("", "choice", 2, ["第一类曲线积分"],
        "计算 \\(\\displaystyle\\int_L(x^2+y^2)\\,ds\\)，其中 \\(L\\) 为圆周 \\(x^2+y^2=" + (a * a) + "\\)。",
        0, ["\\(2\\pi " + (a * a * a) + "\\)", "\\(2\\pi " + a + "\\)", "\\(\\dfrac{\\pi " + (a * a) + "}{2}\\)", "\\(\\dfrac{\\pi " + Math.pow(a, 4) + "}{2}\\)"],
        [
          "在 \\(L\\) 上 \\(x^2+y^2=" + (a * a) + "\\)：",
          "$$\\int_L(x^2+y^2)\\,ds=" + (a * a) + "\\int_L1\\,ds=" + (a * a) + "\\cdot2\\pi" + a + "=2\\pi" + (a * a * a) + "$$"
        ]);
    },
    function (r) { // ∮x dy 面积
      const a = ri(r, 1, 3);
      return Q("", "fill", 2, ["格林公式"],
        "计算 \\(\\displaystyle\\oint_Lx\\,dy\\)，其中 \\(L\\) 为圆周 \\(x^2+y^2=" + (a * a) + "\\) 的正向闭曲线。",
        [String(a * a) + "pi", String(a * a) + "π"], null,
        [
          "由格林公式：\\(\\oint_Lx\\,dy=\\iint_D1\\,dA=\\) 圆盘面积",
          "$$=\\pi\\times" + a + "^2=" + (a * a) + "\\pi$$"
        ]);
    },
    function (r) { // 全微分
      const a = ri(r, 2, 4);
      return Q("", "fill", 2, ["路径无关"],
        "计算 \\(\\displaystyle\\int_L" + (2 * a) + "x\\,dx+" + (2 * a) + "y\\,dy\\)，其中 \\(L\\) 为从 \\((0,0)\\) 到 \\((1,1)\\) 的任意光滑曲线。",
        [String(2 * a)], null,
        [
          "\\( " + (2 * a) + "x\\,dx+" + (2 * a) + "y\\,dy=d\\left(" + a + "x^2+" + a + "y^2\\right)\\)，积分与路径无关：",
          "$$\\int_L=" + a + "(x^2+y^2)\\Big|_{(0,0)}^{(1,1)}=" + a + "\\times(1+1)=" + (2 * a) + "$$"
        ]);
    },
    function (r) { // 对称性 ∫x ds
      const a = ri(r, 1, 3);
      return Q("", "choice", 2, ["对称性"],
        "利用对称性计算 \\(\\displaystyle\\int_Lx\\,ds\\)，其中 \\(L\\) 为上半圆 \\(x^2+y^2=" + (a * a) + ",\\;y\\ge0\\)。",
        0, ["\\(0\\)", "\\(\\pi " + (a * a) + "\\)", "\\( " + (2 * a) + "\\)", "\\(\\dfrac{\\pi " + (a * a) + "}{2}\\)"],
        [
          "上半圆关于 \\(y\\) 轴对称，被积函数 \\(x\\) 是奇函数，",
          "$$\\int_Lx\\,ds=0$$"
        ]);
    },
    function (r) { // ∫y ds 半圆
      const a = ri(r, 1, 3);
      return Q("", "choice", 2, ["第一类曲线积分"],
        "计算 \\(\\displaystyle\\int_Ly\\,ds\\)，其中 \\(L\\) 为上半圆 \\(x^2+y^2=" + (a * a) + ",\\;y\\ge0\\)。",
        0, ["\\( " + (2 * a * a) + "\\)", "\\( " + (a * a) + "\\)", "\\(\\dfrac{\\pi " + (a * a) + "}{2}\\)", "\\(\\dfrac{" + (a * a) + "}{2}\\)"],
        [
          "参数化：\\(x=" + a + "\\cos\\theta,\\;y=" + a + "\\sin\\theta\\)，\\(ds=" + a + "\\,d\\theta\\)：",
          "$$\\int_Ly\\,ds=\\int_0^\\pi" + a + "\\sin\\theta\\cdot" + a + "\\,d\\theta=" + (a * a) + "\\left[-\\cos\\theta\\right]_0^\\pi=" + (2 * a * a) + "$$"
        ]);
    },
    function (r) { // 格林公式
      const a = ri(r, 1, 2);
      return Q("", "choice", 3, ["格林公式"],
        "用格林公式计算 \\(\\displaystyle\\oint_Lx^2y\\,dx-xy^2\\,dy\\)，其中 \\(L\\) 为圆周 \\(x^2+y^2=" + (a * a) + "\\) 正向。",
        0, ["\\(-\\dfrac{\\pi " + Math.pow(a, 4) + "}{2}\\)", "\\(\\dfrac{\\pi " + Math.pow(a, 4) + "}{2}\\)", "\\(0\\)", "\\(-\\pi " + (a * a) + "\\)"],
        [
          "\\(P=x^2y\\)，\\(Q=-xy^2\\)，\\(\\dfrac{\\partial Q}{\\partial x}-\\dfrac{\\partial P}{\\partial y}=-x^2-y^2\\)，",
          "$$\\oint_L=\\iint_D(-x^2-y^2)\\,dA=-\\int_0^{2\\pi}d\\theta\\int_0^" + a + "r^3\\,dr=-\\frac{\\pi" + Math.pow(a, 4) + "}{2}$$"
        ]);
    },
    function (r) { // 格林公式条件
      return shuffleOpts(Q("", "choice", 2, ["格林公式"],
        "格林公式 \\(\\displaystyle\\oint_LP\\,dx+Q\\,dy=\\iint_D\\left(\\frac{\\partial Q}{\\partial x}-\\frac{\\partial P}{\\partial y}\\right)dxdy\\) 的适用条件不包括？",
        3, [
          "\\(L\\) 为分段光滑的正向闭曲线",
          "\\(P,Q\\) 在 \\(D\\) 上有一阶连续偏导数",
          "\\(D\\) 由 \\(L\\) 围成",
          "被积函数必须是多项式"
        ],
        [
          "格林公式要求：\\(L\\) 为正向闭曲线、\\(D\\) 由 \\(L\\) 围成、\\(P,Q\\) 及其偏导数在 \\(D\\) 上连续，",
          "并不要求被积函数是多项式，故选“被积函数必须是多项式”。"
        ]), r);
    }
  ];

  /* ============================================================
   * 第十二章 无穷级数
   * ============================================================ */
  T[12] = [
    function (r) { // p 级数
      const p = ri(r, 1, 2) === 1 ? 1 : ri(r, 2, 3);
      const conv = p > 1;
      return shuffleOpts(Q("", "choice", 1, ["p级数"],
        "判断级数 \\(\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{1}{n^" + p + "}\\) 的敛散性。",
        0, [conv ? "收敛" : "发散", conv ? "发散" : "收敛", "条件收敛", "无法判断"],
        [
          "\\(p\\) 级数：\\(p>1\\) 时收敛，\\(p\\le1\\) 时发散。",
          "本题 \\(p=" + p + "\\)，故" + (conv ? "**收敛**。" : "**发散**（调和级数）。")
        ]), r);
    },
    function (r) { // 几何级数和
      const a = ri(r, 2, 4);
      return Q("", "fill", 2, ["几何级数"],
        "求几何级数 \\(\\displaystyle\\sum_{n=0}^{\\infty}\\left(\\dfrac{1}{" + a + "}\\right)^n\\) 的和。",
        fillVals(a, a - 1), null,
        [
          "公比 \\(q=\\dfrac1{" + a + "}\\)，\\(|q|<1\\)，级数收敛：",
          "$$S=\\frac{1}{1-q}=\\frac{1}{1-\\frac1{" + a + "}}=\\frac{" + a + "}{" + (a - 1) + "}$$"
        ]);
    },
    function (r) { // 收敛半径
      const a = ri(r, 2, 4);
      return Q("", "choice", 2, ["幂级数"],
        "幂级数 \\(\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{" + a + "x^n}{n}\\) 的收敛半径 \\(R\\) 是？",
        0, ["\\(1\\)", "\\( " + a + "\\)", "\\(\\dfrac{1}{" + a + "}\\)", "\\(+\\infty\\)"],
        [
          "$$R=\\lim_{n\\to\\infty}\\left|\\frac{a_n}{a_{n+1}}\\right|=\\lim_{n\\to\\infty}\\frac{" + a + "/n}{" + a + "/(n+1)}=\\lim_{n\\to\\infty}\\frac{n+1}{n}=1$$"
        ]);
    },
    function (r) { // 交错级数
      const p = ri(r, 1, 2);
      const absConv = p === 2;
      return shuffleOpts(Q("", "choice", 2, ["交错级数"],
        "级数 \\(\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{(-1)^n}{n^" + p + "}\\) 的敛散性是？",
        0, [absConv ? "绝对收敛" : "条件收敛", absConv ? "条件收敛" : "绝对收敛", "发散", "无法判断"],
        absConv
          ? ["\\(\\sum\\dfrac{1}{n^2}\\) 收敛，故原级数**绝对收敛**。"]
          : ["\\(\\sum\\dfrac1n\\) 发散，但交错级数满足莱布尼茨条件收敛，故原级数**条件收敛**。"]
      ), r);
    },
    function (r) { // a^n/n!
      const a = ri(r, 1, 3);
      return shuffleOpts(Q("", "choice", 2, ["比值审敛法"],
        "判断级数 \\(\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{" + a + "^n}{n!}\\) 的敛散性。",
        0, ["收敛", "发散", "条件收敛", "与 " + a + " 的取值有关"],
        [
          "比值审敛法：",
          "$$\\lim_{n\\to\\infty}\\frac{a_{n+1}}{a_n}=\\lim_{n\\to\\infty}\\frac{" + a + "^{n+1}/(n+1)!}{" + a + "^n/n!}=\\lim_{n\\to\\infty}\\frac{" + a + "}{n+1}=0<1$$",
          "故级数**收敛**（对任意正数 \\( " + a + " \\) 均收敛）。"
        ]), r);
    },
    function (r) { // ln(1+ax) 系数
      const a = ri(r, 1, 3);
      return Q("", "fill", 2, ["幂级数展开"],
        "\\(\\ln(1+" + a + "x)\\) 的麦克劳林展开式中 \\(x^2\\) 项的系数是多少？",
        fillVals(-(a * a), 2), null,
        [
          "$$\\ln(1+u)=u-\\frac{u^2}{2}+\\frac{u^3}{3}-\\cdots$$",
          "令 \\(u=" + a + "x\\)：\\(x^2\\) 项为 \\(-\\dfrac{" + (a * a) + "x^2}{2}\\)，故系数为 \\(-\\dfrac{" + (a * a) + "}{2}\\)。"
        ]);
    },
    function (r) { // 收敛半径 x^n/n^a
      const a = ri(r, 2, 4);
      return Q("", "choice", 2, ["幂级数"],
        "幂级数 \\(\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{x^n}{n^" + a + "}\\) 的收敛半径 \\(R\\) 是？",
        0, ["\\(1\\)", "\\( " + a + "\\)", "\\(0\\)", "\\(+\\infty\\)"],
        [
          "$$R=\\lim_{n\\to\\infty}\\left|\\frac{a_n}{a_{n+1}}\\right|=\\lim_{n\\to\\infty}\\frac{1/n^" + a + "}{1/(n+1)^" + a + "}=\\lim_{n\\to\\infty}\\left(\\frac{n+1}{n}\\right)^" + a + "=1$$"
        ]);
    },
    function (r) { // 1/(n ln n) 类
      const sq = ri(r, 1, 2) === 1;
      return shuffleOpts(Q("", "choice", 3, ["积分判别法"],
        "判断级数 \\(\\displaystyle\\sum_{n=2}^{\\infty}\\dfrac{1}{n(\\ln n)^" + (sq ? "2" : "1") + "}\\) 的敛散性。",
        0, [sq ? "收敛" : "发散", sq ? "发散" : "收敛", "条件收敛", "无法判断"],
        [
          "用积分判别法：\\(\\int_2^{+\\infty}\\dfrac{dx}{x(\\ln x)^" + (sq ? "2" : "1") + "}\\)，",
          sq
            ? ["令 \\(u=\\ln x\\)：\\(=\\int_{\\ln2}^{+\\infty}\\dfrac{du}{u^2}=\\dfrac{1}{\\ln2}\\) 收敛，故级数**收敛**。"]
            : ["令 \\(u=\\ln x\\)：\\(=\\int_{\\ln2}^{+\\infty}\\dfrac{du}{u}=+\\infty\\) 发散，故级数**发散**。"]
      ]), r);
    }
  ];

  /* ---------- 生成全部题目 ---------- */
  const out = [];
  for (let ch = 1; ch <= 12; ch++) {
    const tpls = T[ch] || [];
    for (let ti = 0; ti < tpls.length; ti++) {
      for (let vi = 0; vi < 10; vi++) {
        const r = mulberry32(ch * 100000 + ti * 1000 + vi);
        let q;
        try {
          q = tpls[ti](r);
        } catch (e) {
          // 参数组合无解时重试一次
          try { q = tpls[ti](mulberry32(ch * 100000 + ti * 1000 + vi + 777)); }
          catch (e2) { continue; }
        }
        if (!q) continue;
        q.id = "g" + ch + "-" + ti + "-" + vi;
        q.chapter = ch;
        out.push(q);
      }
    }
  }
  return out;
})();

