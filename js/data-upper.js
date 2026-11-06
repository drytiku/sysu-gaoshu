/* ============================================================
 * 中大高数题库 · 上册题库（参照北京大学版《高等数学（上册）》章节体系）
 * 题型说明：
 *   choice 选择题（answer 为正确选项下标）
 *   fill   填空题（answer 为可接受答案数组，比较时做归一化）
 *   calc   解答题（无自动判分，看解析后自评）
 * 难度：1 基础 / 2 进阶 / 3 挑战
 * 本题库为原创练习题，参考历年高数期末考试常见题型与难度编写。
 * ============================================================ */

const UPPER_QUESTIONS = [
  /* ---------- 第一章 函数与极限 ---------- */
  {
    id: "u1-1", chapter: 1, type: "choice", difficulty: 1, tags: ["重要极限"],
    question: "求极限 \\(\\lim\\limits_{x\\to 0}\\dfrac{\\sin 3x}{x}\\)。",
    options: ["\\(0\\)", "\\(1\\)", "\\(3\\)", "\\(\\dfrac{1}{3}\\)"],
    answer: 2,
    solution: [
      "由重要极限 \\(\\lim\\limits_{x\\to 0}\\dfrac{\\sin x}{x}=1\\)，",
      "变形得 \\(\\dfrac{\\sin 3x}{x}=3\\cdot\\dfrac{\\sin 3x}{3x}\\to 3\\times 1=3\\)。",
      "故原极限等于 \\(3\\)。"
    ]
  },
  {
    id: "u1-2", chapter: 1, type: "choice", difficulty: 2, tags: ["洛必达", "泰勒展开"],
    question: "求极限 \\(\\lim\\limits_{x\\to 0}\\dfrac{e^x-1-x}{x^2}\\)。",
    options: ["\\(0\\)", "\\(\\dfrac{1}{2}\\)", "\\(1\\)", "极限不存在"],
    answer: 1,
    solution: [
      "方法一（洛必达法则）：\\(\\dfrac{0}{0}\\) 型，连续两次洛必达：",
      "$$\\lim_{x\\to0}\\frac{e^x-1-x}{x^2}=\\lim_{x\\to0}\\frac{e^x-1}{2x}=\\lim_{x\\to0}\\frac{e^x}{2}=\\frac12$$",
      "方法二（泰勒展开）：\\(e^x=1+x+\\dfrac{x^2}{2}+o(x^2)\\)，代入即得 \\(\\dfrac12\\)。"
    ]
  },
  {
    id: "u1-3", chapter: 1, type: "fill", difficulty: 1, tags: ["重要极限"],
    question: "求极限 \\(\\lim\\limits_{x\\to \\infty}\\left(1+\\dfrac{2}{x}\\right)^{3x}\\) 的值。",
    answer: ["e^6"],
    solution: [
      "利用重要极限 \\(\\lim\\limits_{t\\to\\infty}\\left(1+\\dfrac1t\\right)^t=e\\)，",
      "$$\\left(1+\\frac2x\\right)^{3x}=\\left[\\left(1+\\frac2x\\right)^{\\frac x2}\\right]^6\\to e^6$$",
      "故答案为 \\(e^6\\)。"
    ]
  },
  {
    id: "u1-4", chapter: 1, type: "choice", difficulty: 2, tags: ["间断点"],
    question: "设 \\(f(x)=\\dfrac{x^2-1}{x-1}\\)，则 \\(x=1\\) 是 \\(f(x)\\) 的什么间断点？",
    options: ["可去间断点", "跳跃间断点", "无穷间断点", "振荡间断点"],
    answer: 0,
    solution: [
      "当 \\(x\\neq 1\\) 时，\\(f(x)=\\dfrac{(x-1)(x+1)}{x-1}=x+1\\)，",
      "所以 \\(\\lim\\limits_{x\\to1}f(x)=2\\) 存在且为有限值，但 \\(f(1)\\) 无定义。",
      "极限存在但函数值不存在，故 \\(x=1\\) 是**可去间断点**。"
    ]
  },
  {
    id: "u1-5", chapter: 1, type: "choice", difficulty: 2, tags: ["无穷小比较"],
    question: "当 \\(x\\to 0\\) 时，无穷小 \\(\\ln(1+x^2)\\) 是关于 \\(x\\) 的几阶无穷小？",
    options: ["一阶", "二阶", "三阶", "四阶"],
    answer: 1,
    solution: [
      "由等价无穷小 \\(\\ln(1+t)\\sim t\\;(t\\to0)\\)，",
      "$$\\ln(1+x^2)\\sim x^2\\quad (x\\to0)$$",
      "即 \\(\\ln(1+x^2)\\) 与 \\(x^2\\) 同阶，故是关于 \\(x\\) 的**二阶**无穷小。"
    ]
  },
  {
    id: "u1-6", chapter: 1, type: "fill", difficulty: 3, tags: ["极限运算", "等价无穷小"],
    question: "求极限 \\(\\lim\\limits_{x\\to 0}\\dfrac{\\tan x-\\sin x}{x^3}\\) 的值。",
    answer: ["1/2", "0.5"],
    solution: [
      "$$\\tan x-\\sin x=\\sin x\\left(\\frac1{\\cos x}-1\\right)=\\sin x\\cdot\\frac{1-\\cos x}{\\cos x}$$",
      "当 \\(x\\to0\\) 时：\\(\\sin x\\sim x\\)，\\(1-\\cos x\\sim \\dfrac{x^2}2\\)，\\(\\cos x\\to1\\)。",
      "$$\\text{原式}=\\lim_{x\\to0}\\frac{x\\cdot\\frac{x^2}{2}}{x^3}=\\frac12$$"
    ]
  },

  /* ---------- 第二章 导数与微分 ---------- */
  {
    id: "u2-1", chapter: 2, type: "fill", difficulty: 1, tags: ["求导法则"],
    question: "设 \\(y=x^2\\ln x\\)，求导函数 \\(y'\\)（写出表达式，如 2xlnx+x）。",
    answer: ["2xlnx+x", "x+2xlnx", "x(2lnx+1)", "x(1+2lnx)"],
    solution: [
      "由乘积求导法则 \\((uv)'=u'v+uv'\\)：",
      "$$y'=(x^2)'\\ln x+x^2(\\ln x)'=2x\\ln x+x^2\\cdot\\frac1x=2x\\ln x+x$$"
    ]
  },
  {
    id: "u2-2", chapter: 2, type: "choice", difficulty: 2, tags: ["隐函数求导"],
    question: "由方程 \\(x^2+y^2=4\\) 确定隐函数 \\(y=y(x)\\)，求 \\(\\dfrac{dy}{dx}\\)。",
    options: ["\\(\\dfrac{x}{y}\\)", "\\(-\\dfrac{x}{y}\\)", "\\(\\dfrac{y}{x}\\)", "\\(-\\dfrac{y}{x}\\)"],
    answer: 1,
    solution: [
      "方程两边对 \\(x\\) 求导：",
      "$$2x+2y\\cdot y'=0\\quad\\Rightarrow\\quad y'=-\\frac{x}{y}$$",
      "故 \\(\\dfrac{dy}{dx}=-\\dfrac{x}{y}\\)。"
    ]
  },
  {
    id: "u2-3", chapter: 2, type: "fill", difficulty: 1, tags: ["切线方程"],
    question: "求曲线 \\(y=e^x\\) 在点 \\((0,1)\\) 处的切线方程（形如 y=x+1）。",
    answer: ["y=x+1", "y-1=x", "x-y+1=0", "y=x+1。"],
    solution: [
      "\\(y'=e^x\\)，在 \\(x=0\\) 处切线斜率 \\(k=e^0=1\\)。",
      "切线过点 \\((0,1)\\)，由点斜式：\\(y-1=1\\cdot(x-0)\\)，",
      "故切线方程为 \\(y=x+1\\)。"
    ]
  },
  {
    id: "u2-4", chapter: 2, type: "choice", difficulty: 2, tags: ["参数方程求导"],
    question: "设参数方程 \\(x=t^2,\\; y=t^3\\)，求 \\(\\dfrac{dy}{dx}\\)。",
    options: ["\\(t\\)", "\\(\\dfrac{3t}{2}\\)", "\\(\\dfrac{2t}{3}\\)", "\\(\\dfrac{3t^2}{2}\\)"],
    answer: 1,
    solution: [
      "由参数方程求导公式 \\(\\dfrac{dy}{dx}=\\dfrac{y'(t)}{x'(t)}\\)：",
      "$$\\frac{dy}{dx}=\\frac{3t^2}{2t}=\\frac{3t}{2}$$"
    ]
  },
  {
    id: "u2-5", chapter: 2, type: "choice", difficulty: 3, tags: ["高阶导数"],
    question: "设 \\(y=\\sin x\\)，求 \\(n\\) 阶导数 \\(y^{(n)}\\)。",
    options: ["\\(\\sin x\\)", "\\(\\cos x\\)", "\\(\\sin\\left(x+\\dfrac{n\\pi}{2}\\right)\\)", "\\(\\sin\\left(x-\\dfrac{n\\pi}{2}\\right)\\)"],
    answer: 2,
    solution: [
      "逐阶求导观察规律：\\(y'=\\cos x=\\sin(x+\\frac\\pi2)\\)，\\(y''=-\\sin x=\\sin(x+\\pi)\\)，",
      "每求一次导，相位增加 \\(\\dfrac\\pi2\\)，故",
      "$$y^{(n)}=\\sin\\left(x+\\frac{n\\pi}{2}\\right)$$"
    ]
  },
  {
    id: "u2-6", chapter: 2, type: "choice", difficulty: 1, tags: ["微分"],
    question: "设 \\(y=e^{2x}\\)，求微分 \\(dy\\)。",
    options: ["\\(2e^{2x}\\,dx\\)", "\\(e^{2x}\\,dx\\)", "\\(2e^{x}\\,dx\\)", "\\(\\dfrac{e^{2x}}{2}\\,dx\\)"],
    answer: 0,
    solution: [
      "\\(y'=2e^{2x}\\)，由 \\(dy=y'\\,dx\\) 得：",
      "$$dy=2e^{2x}\\,dx$$"
    ]
  },

  /* ---------- 第三章 微分中值定理与导数的应用 ---------- */
  {
    id: "u3-1", chapter: 3, type: "fill", difficulty: 1, tags: ["洛必达法则"],
    question: "求极限 \\(\\lim\\limits_{x\\to 0}\\dfrac{x-\\sin x}{x^3}\\) 的值。",
    answer: ["1/6"],
    solution: [
      "\\(\\dfrac00\\) 型未定式，连续使用洛必达法则：",
      "$$\\lim_{x\\to0}\\frac{x-\\sin x}{x^3}=\\lim_{x\\to0}\\frac{1-\\cos x}{3x^2}=\\lim_{x\\to0}\\frac{\\sin x}{6x}=\\frac16$$",
      "（也可用泰勒展开 \\(\\sin x=x-\\dfrac{x^3}{6}+o(x^3)\\) 一步得解。）"
    ]
  },
  {
    id: "u3-2", chapter: 3, type: "choice", difficulty: 2, tags: ["单调性"],
    question: "函数 \\(f(x)=x^3-3x\\) 的单调递增区间是？",
    options: ["\\((-1,1)\\)", "\\((-\\infty,-1)\\cup(1,+\\infty)\\)", "\\((-\\infty,1)\\)", "\\((1,+\\infty)\\)"],
    answer: 1,
    solution: [
      "\\(f'(x)=3x^2-3=3(x-1)(x+1)\\)，令 \\(f'(x)=0\\) 得 \\(x=\\pm1\\)。",
      "当 \\(x<-1\\) 或 \\(x>1\\) 时 \\(f'(x)>0\\)，函数单调递增；",
      "当 \\(-1<x<1\\) 时 \\(f'(x)<0\\)，函数单调递减。",
      "故递增区间为 \\((-\\infty,-1)\\cup(1,+\\infty)\\)。"
    ]
  },
  {
    id: "u3-3", chapter: 3, type: "fill", difficulty: 1, tags: ["极值"],
    question: "函数 \\(f(x)=x^3-3x\\) 在 \\(x=-1\\) 处取得极大值，求该极大值。",
    answer: ["2"],
    solution: [
      "直接代入：\\(f(-1)=(-1)^3-3\\times(-1)=-1+3=2\\)。",
      "由 \\(f'(x)=3(x-1)(x+1)\\) 可知 \\(x=-1\\) 处导数由正变负，确为极大值点。",
      "故极大值为 \\(2\\)。"
    ]
  },
  {
    id: "u3-4", chapter: 3, type: "choice", difficulty: 2, tags: ["凹凸性", "拐点"],
    question: "曲线 \\(y=x^3\\) 的拐点是？",
    options: ["\\((0,0)\\)", "\\((1,1)\\)", "\\((-1,-1)\\)", "无拐点"],
    answer: 0,
    solution: [
      "\\(y''=6x\\)，令 \\(y''=0\\) 得 \\(x=0\\)。",
      "当 \\(x<0\\) 时 \\(y''<0\\)（凹向下），当 \\(x>0\\) 时 \\(y''>0\\)（凹向上），凹凸性发生改变。",
      "故拐点为 \\((0,0)\\)。"
    ]
  },
  {
    id: "u3-5", chapter: 3, type: "choice", difficulty: 3, tags: ["最值应用"],
    question: "要制作一个容积为 \\(V\\) 的无盖圆柱形水桶，当底面半径 \\(r\\) 与高 \\(h\\) 满足什么关系时用料最省？",
    options: ["\\(r=h\\)", "\\(r=2h\\)", "\\(h=2r\\)", "\\(r=\\dfrac{h}{2}\\)"],
    answer: 0,
    solution: [
      "容积 \\(V=\\pi r^2h\\) 为常数，故 \\(h=\\dfrac{V}{\\pi r^2}\\)。",
      "表面积（用料）\\(S=\\pi r^2+2\\pi rh=\\pi r^2+\\dfrac{2V}{r}\\)。",
      "$$S'(r)=2\\pi r-\\frac{2V}{r^2}=0\\;\\Rightarrow\\;r^3=\\frac V\\pi=r^2h\\;\\Rightarrow\\;r=h$$",
      "故当 \\(r=h\\) 时用料最省。"
    ]
  },
  {
    id: "u3-6", chapter: 3, type: "fill", difficulty: 2, tags: ["泰勒公式"],
    question: "函数 \\(e^x\\) 的麦克劳林展开式中 \\(x^3\\) 项的系数是多少？",
    answer: ["1/6"],
    solution: [
      "$$e^x=1+x+\\frac{x^2}{2!}+\\frac{x^3}{3!}+\\cdots+\\frac{x^n}{n!}+o(x^n)$$",
      "\\(x^3\\) 项为 \\(\\dfrac{x^3}{3!}=\\dfrac{x^3}{6}\\)，故系数为 \\(\\dfrac16\\)。"
    ]
  },

  /* ---------- 第四章 不定积分 ---------- */
  {
    id: "u4-1", chapter: 4, type: "choice", difficulty: 1, tags: ["分部积分"],
    question: "求不定积分 \\(\\displaystyle\\int xe^x\\,dx\\)。",
    options: ["\\(xe^x+C\\)", "\\((x-1)e^x+C\\)", "\\((x+1)e^x+C\\)", "\\(\\dfrac{x^2e^x}{2}+C\\)"],
    answer: 1,
    solution: [
      "使用分部积分法，取 \\(u=x\\)，\\(dv=e^xdx\\)：",
      "$$\\int xe^x\\,dx=xe^x-\\int e^x\\,dx=xe^x-e^x+C=(x-1)e^x+C$$"
    ]
  },
  {
    id: "u4-2", chapter: 4, type: "fill", difficulty: 1, tags: ["基本积分"],
    question: "求 \\(\\displaystyle\\int\\dfrac{1}{1+x^2}\\,dx\\)（结果含任意常数，如 arctanx+C）。",
    answer: ["arctanx+c", "arctanx", "arctgx+c", "arctgx", "tan^-1x+c"],
    solution: [
      "这是基本积分公式：",
      "$$\\int\\frac{1}{1+x^2}\\,dx=\\arctan x+C$$",
      "（因为 \\((\\arctan x)'=\\dfrac{1}{1+x^2}\\)。）"
    ]
  },
  {
    id: "u4-3", chapter: 4, type: "choice", difficulty: 2, tags: ["三角积分"],
    question: "求不定积分 \\(\\displaystyle\\int\\sin^2 x\\,dx\\)。",
    options: ["\\(\\dfrac{x}{2}-\\dfrac{\\sin 2x}{4}+C\\)", "\\(\\dfrac{x}{2}+\\dfrac{\\sin 2x}{4}+C\\)", "\\(\\dfrac{x}{2}-\\dfrac{\\cos 2x}{4}+C\\)", "\\(\\dfrac{\\cos 2x}{2}+C\\)"],
    answer: 0,
    solution: [
      "降幂公式 \\(\\sin^2x=\\dfrac{1-\\cos2x}{2}\\)：",
      "$$\\int\\sin^2x\\,dx=\\int\\frac{1-\\cos2x}{2}\\,dx=\\frac x2-\\frac{\\sin2x}{4}+C$$"
    ]
  },
  {
    id: "u4-4", chapter: 4, type: "fill", difficulty: 2, tags: ["换元积分"],
    question: "求 \\(\\displaystyle\\int\\dfrac{1}{x\\ln x}\\,dx\\)（其中 \\(x>0\\)，结果含任意常数）。",
    answer: ["ln(lnx)+c", "lnlnx+c", "ln(lnx)", "lnlnx"],
    solution: [
      "注意到 \\((\\ln x)'=\\dfrac1x\\)，使用凑微分法：",
      "$$\\int\\frac{1}{x\\ln x}\\,dx=\\int\\frac{1}{\\ln x}\\,d(\\ln x)=\\ln(\\ln x)+C$$",
      "令 \\(u=\\ln x\\) 即化为 \\(\\displaystyle\\int\\frac1u\\,du\\)。"
    ]
  },
  {
    id: "u4-5", chapter: 4, type: "choice", difficulty: 2, tags: ["分部积分"],
    question: "求不定积分 \\(\\displaystyle\\int x^2\\sin x\\,dx\\)。",
    options: [
      "\\(-x^2\\cos x+2x\\sin x+2\\cos x+C\\)",
      "\\(x^2\\cos x-2x\\sin x-2\\cos x+C\\)",
      "\\(-x^2\\cos x+2x\\sin x+C\\)",
      "\\(-x^2\\cos x-2x\\sin x+2\\cos x+C\\)"
    ],
    answer: 0,
    solution: [
      "两次分部积分：",
      "$$\\int x^2\\sin x\\,dx=-x^2\\cos x+\\int 2x\\cos x\\,dx$$",
      "$$=-x^2\\cos x+2x\\sin x-\\int 2\\sin x\\,dx=-x^2\\cos x+2x\\sin x+2\\cos x+C$$"
    ]
  },
  {
    id: "u4-6", chapter: 4, type: "fill", difficulty: 3, tags: ["凑微分"],
    question: "求 \\(\\displaystyle\\int\\dfrac{x}{1+x^2}\\,dx\\)（结果含任意常数）。",
    answer: ["1/2ln(1+x^2)+c", "0.5ln(1+x^2)+c", "1/2ln(x^2+1)+c", "0.5ln(x^2+1)+c", "ln(1+x^2)/2+c"],
    solution: [
      "凑微分：\\(x\\,dx=\\dfrac12\\,d(1+x^2)\\)，",
      "$$\\int\\frac{x}{1+x^2}\\,dx=\\frac12\\int\\frac{1}{1+x^2}\\,d(1+x^2)=\\frac12\\ln(1+x^2)+C$$"
    ]
  },

  /* ---------- 第五章 定积分 ---------- */
  {
    id: "u5-1", chapter: 5, type: "fill", difficulty: 1, tags: ["牛顿-莱布尼茨公式"],
    question: "计算定积分 \\(\\displaystyle\\int_0^1 x^2\\,dx\\) 的值。",
    answer: ["1/3"],
    solution: [
      "$$\\int_0^1x^2\\,dx=\\left[\\frac{x^3}{3}\\right]_0^1=\\frac13-0=\\frac13$$"
    ]
  },
  {
    id: "u5-2", chapter: 5, type: "choice", difficulty: 1, tags: ["变上限积分"],
    question: "求 \\(\\dfrac{d}{dx}\\displaystyle\\int_0^x \\sin(t^2)\\,dt\\)。",
    options: ["\\(\\sin(x^2)\\)", "\\(2x\\cos(x^2)\\)", "\\(\\cos(x^2)\\)", "\\(\\dfrac{\\sin(x^2)}{2x}\\)"],
    answer: 0,
    solution: [
      "由微积分基本定理（变上限积分求导公式）：",
      "$$\\frac{d}{dx}\\int_0^x\\sin(t^2)\\,dt=\\sin(x^2)$$",
      "注意不要对被积函数再求导，那是常见的错误。"
    ]
  },
  {
    id: "u5-3", chapter: 5, type: "fill", difficulty: 2, tags: ["定积分换元"],
    question: "计算定积分 \\(\\displaystyle\\int_0^{\\frac{\\pi}{2}}\\sin x\\cos x\\,dx\\) 的值。",
    answer: ["1/2", "0.5"],
    solution: [
      "凑微分：\\(\\cos x\\,dx=d(\\sin x)\\)，",
      "$$\\int_0^{\\frac\\pi2}\\sin x\\cos x\\,dx=\\int_0^{\\frac\\pi2}\\sin x\\,d(\\sin x)=\\left[\\frac{\\sin^2x}{2}\\right]_0^{\\frac\\pi2}=\\frac12$$"
    ]
  },
  {
    id: "u5-4", chapter: 5, type: "choice", difficulty: 2, tags: ["分部积分"],
    question: "计算定积分 \\(\\displaystyle\\int_0^1 xe^x\\,dx\\)。",
    options: ["\\(0\\)", "\\(1\\)", "\\(e\\)", "\\(e-1\\)"],
    answer: 1,
    solution: [
      "分部积分：",
      "$$\\int_0^1xe^x\\,dx=\\left[xe^x\\right]_0^1-\\int_0^1e^x\\,dx=e-\\left[e^x\\right]_0^1=e-(e-1)=1$$"
    ]
  },
  {
    id: "u5-5", chapter: 5, type: "fill", difficulty: 2, tags: ["广义积分"],
    question: "判断广义积分 \\(\\displaystyle\\int_1^{+\\infty}\\dfrac{1}{x^2}\\,dx\\) 收敛，并求其值。",
    answer: ["1"],
    solution: [
      "$$\\int_1^{+\\infty}\\frac1{x^2}\\,dx=\\lim_{b\\to+\\infty}\\left[-\\frac1x\\right]_1^b=\\lim_{b\\to+\\infty}\\left(1-\\frac1b\\right)=1$$",
      "积分收敛，值为 \\(1\\)。这是 \\(p\\) 积分 \\(p=2>1\\) 的情形。"
    ]
  },
  {
    id: "u5-6", chapter: 5, type: "choice", difficulty: 3, tags: ["奇偶性"],
    question: "利用奇偶对称性计算 \\(\\displaystyle\\int_{-1}^1\\left(x^3+x^2\\right)dx\\)。",
    options: ["\\(0\\)", "\\(\\dfrac{2}{3}\\)", "\\(1\\)", "\\(\\dfrac{4}{3}\\)"],
    answer: 1,
    solution: [
      "\\(x^3\\) 是奇函数，在对称区间 \\([-1,1]\\) 上积分为 \\(0\\)：\\(\\int_{-1}^1x^3\\,dx=0\\)。",
      "\\(x^2\\) 是偶函数，\\(\\int_{-1}^1x^2\\,dx=2\\int_0^1x^2\\,dx=\\dfrac23\\)。",
      "故原积分 \\(=0+\\dfrac23=\\dfrac23\\)。"
    ]
  },

  /* ---------- 第六章 定积分的应用 ---------- */
  {
    id: "u6-1", chapter: 6, type: "fill", difficulty: 1, tags: ["面积"],
    question: "求由曲线 \\(y=x^2\\) 与直线 \\(y=x\\) 围成的平面图形的面积。",
    answer: ["1/6"],
    solution: [
      "交点：\\(x^2=x\\Rightarrow x=0\\) 或 \\(x=1\\)。",
      "在 \\([0,1]\\) 上 \\(x\\geq x^2\\)，故",
      "$$S=\\int_0^1(x-x^2)\\,dx=\\left[\\frac{x^2}{2}-\\frac{x^3}{3}\\right]_0^1=\\frac12-\\frac13=\\frac16$$"
    ]
  },
  {
    id: "u6-2", chapter: 6, type: "choice", difficulty: 2, tags: ["旋转体体积"],
    question: "由曲线 \\(y=x^2\\;(0\\le x\\le1)\\) 绕 \\(x\\) 轴旋转一周所得旋转体的体积是？",
    options: ["\\(\\dfrac{\\pi}{5}\\)", "\\(\\dfrac{\\pi}{3}\\)", "\\(\\dfrac{2\\pi}{5}\\)", "\\(\\dfrac{\\pi}{2}\\)"],
    answer: 0,
    solution: [
      "由旋转体体积公式（圆盘法）：",
      "$$V=\\pi\\int_0^1y^2\\,dx=\\pi\\int_0^1x^4\\,dx=\\pi\\left[\\frac{x^5}{5}\\right]_0^1=\\frac\\pi5$$"
    ]
  },
  {
    id: "u6-3", chapter: 6, type: "fill", difficulty: 2, tags: ["弧长"],
    question: "求圆周 \\(x^2+y^2=1\\) 位于第一象限部分的弧长。",
    answer: ["pi/2", "π/2"],
    solution: [
      "整圆周长 \\(2\\pi\\times1=2\\pi\\)，第一象限占四分之一：",
      "$$s=\\frac{2\\pi}{4}=\\frac\\pi2$$",
      "也可用弧长公式 \\(s=\\int_0^1\\sqrt{1+(y')^2}\\,dx\\) 验证。"
    ]
  },
  {
    id: "u6-4", chapter: 6, type: "choice", difficulty: 2, tags: ["物理应用", "功"],
    question: "已知弹簧伸长 \\(1\\,\\text{cm}\\) 需拉力 \\(10\\,\\text{N}\\)，将其从原长拉长 \\(3\\,\\text{cm}\\)，拉力做功为？",
    options: ["\\(0.45\\,\\text{J}\\)", "\\(0.9\\,\\text{J}\\)", "\\(45\\,\\text{J}\\)", "\\(0.15\\,\\text{J}\\)"],
    answer: 0,
    solution: [
      "由胡克定律 \\(F=kx\\)：\\(10=k\\times0.01\\Rightarrow k=1000\\,\\text{N/m}\\)。",
      "$$W=\\int_0^{0.03}1000x\\,dx=500x^2\\Big|_0^{0.03}=500\\times0.0009=0.45\\,\\text{J}$$"
    ]
  },
  {
    id: "u6-5", chapter: 6, type: "fill", difficulty: 2, tags: ["平均值"],
    question: "求函数 \\(f(x)=x^2\\) 在区间 \\([0,1]\\) 上的平均值。",
    answer: ["1/3"],
    solution: [
      "由积分平均值公式：",
      "$$\\bar f=\\frac{1}{1-0}\\int_0^1x^2\\,dx=\\left[\\frac{x^3}{3}\\right]_0^1=\\frac13$$"
    ]
  },

  /* ---------- 第七章 微分方程 ---------- */
  {
    id: "u7-1", chapter: 7, type: "choice", difficulty: 1, tags: ["可分离变量方程"],
    question: "微分方程 \\(\\dfrac{dy}{dx}=2xy\\) 的通解是？",
    options: ["\\(y=Ce^{x^2}\\)", "\\(y=Ce^{2x}\\)", "\\(y=Cx^2\\)", "\\(y=e^{x^2}+C\\)"],
    answer: 0,
    solution: [
      "分离变量：\\(\\dfrac{dy}{y}=2x\\,dx\\)，两边积分：",
      "$$\\ln|y|=x^2+C_1\\;\\Rightarrow\\;y=Ce^{x^2}$$"
    ]
  },
  {
    id: "u7-2", chapter: 7, type: "fill", difficulty: 2, tags: ["可分离变量方程"],
    question: "求微分方程 \\(y'+y=0\\) 满足初值条件 \\(y(0)=1\\) 的特解。",
    answer: ["e^-x", "e^(-x)", "1/e^x", "exp(-x)"],
    solution: [
      "分离变量积分得通解 \\(y=Ce^{-x}\\)，",
      "代入 \\(y(0)=1\\)：\\(C=1\\)，故特解为 \\(y=e^{-x}\\)。"
    ]
  },
  {
    id: "u7-3", chapter: 7, type: "choice", difficulty: 2, tags: ["常系数线性方程"],
    question: "微分方程 \\(y''-3y'+2y=0\\) 的通解是？",
    options: [
      "\\(y=C_1e^x+C_2e^{2x}\\)",
      "\\(y=C_1e^{-x}+C_2e^{-2x}\\)",
      "\\(y=(C_1+C_2x)e^x\\)",
      "\\(y=C_1\\cos x+C_2\\sin x\\)"
    ],
    answer: 0,
    solution: [
      "特征方程 \\(r^2-3r+2=0\\)，即 \\((r-1)(r-2)=0\\)，根为 \\(r_1=1,\\;r_2=2\\)。",
      "两相异实根，通解为：",
      "$$y=C_1e^x+C_2e^{2x}$$"
    ]
  },
  {
    id: "u7-4", chapter: 7, type: "choice", difficulty: 1, tags: ["常系数线性方程"],
    question: "微分方程 \\(y''+y=0\\) 的通解是？",
    options: [
      "\\(y=C_1\\cos x+C_2\\sin x\\)",
      "\\(y=C_1e^x+C_2e^{-x}\\)",
      "\\(y=C_1\\cos2x+C_2\\sin2x\\)",
      "\\(y=C_1+C_2e^{-x}\\)"
    ],
    answer: 0,
    solution: [
      "特征方程 \\(r^2+1=0\\)，根为 \\(r=\\pm i\\)（共轭复根）。",
      "故通解为：",
      "$$y=C_1\\cos x+C_2\\sin x$$"
    ]
  },
  {
    id: "u7-5", chapter: 7, type: "fill", difficulty: 2, tags: ["一阶线性方程"],
    question: "求微分方程 \\(y'-y=e^x\\) 满足 \\(y(0)=0\\) 的特解。",
    answer: ["xe^x", "x·e^x"],
    solution: [
      "一阶线性方程，积分因子 \\(e^{\\int-1\\,dx}=e^{-x}\\)：",
      "$$y=e^x\\left(\\int e^x\\cdot e^{-x}\\,dx+C\\right)=e^x(x+C)$$",
      "由 \\(y(0)=0\\) 得 \\(C=0\\)，故特解为 \\(y=xe^x\\)。"
    ]
  },
  {
    id: "u7-6", chapter: 7, type: "choice", difficulty: 3, tags: ["待定系数法"],
    question: "方程 \\(y''-2y'+y=e^x\\) 的特解应设为下列哪种形式？",
    options: ["\\(Ae^x\\)", "\\(Axe^x\\)", "\\(Ax^2e^x\\)", "\\(Ae^{2x}\\)"],
    answer: 2,
    solution: [
      "特征方程 \\(r^2-2r+1=0\\) 有二重根 \\(r=1\\)。",
      "自由项 \\(e^x\\) 中的 \\(\\lambda=1\\) 恰为二重特征根，",
      "故特解应设为 \\(y^*=Ax^2e^x\\)（\\(x\\) 的幂次 = 重数 \\(2\\)）。"
    ]
  },

  /* ============ 第一章 函数与极限 · 进阶补充 ============ */
  {
    id: "u1-7", chapter: 1, type: "choice", difficulty: 1, tags: ["极限运算"],
    question: "求极限 \\(\\lim\\limits_{x\\to\\infty}\\dfrac{3x^3+2x+1}{x^3-x^2+5}\\)。",
    options: ["\\(0\\)", "\\(3\\)", "\\(\\dfrac{1}{3}\\)", "极限不存在"],
    answer: 1,
    solution: [
      "分子分母同除以 \\(x^3\\)：",
      "$$\\lim_{x\\to\\infty}\\frac{3+\\frac2{x^2}+\\frac1{x^3}}{1-\\frac1x+\\frac5{x^3}}=\\frac{3}{1}=3$$"
    ]
  },
  {
    id: "u1-8", chapter: 1, type: "fill", difficulty: 2, tags: ["等价无穷小"],
    question: "求极限 \\(\\lim\\limits_{x\\to0}\\dfrac{1-\\cos x}{x^2}\\) 的值。",
    answer: ["1/2", "0.5"],
    solution: [
      "由等价无穷小 \\(1-\\cos x\\sim\\dfrac{x^2}{2}\\)：",
      "$$\\lim_{x\\to0}\\frac{1-\\cos x}{x^2}=\\lim_{x\\to0}\\frac{x^2/2}{x^2}=\\frac12$$"
    ]
  },
  {
    id: "u1-9", chapter: 1, type: "choice", difficulty: 2, tags: ["间断点"],
    question: "函数 \\(f(x)=\\dfrac{x}{x-2}\\) 在 \\(x=2\\) 处的间断点类型是？",
    options: ["可去间断点", "跳跃间断点", "无穷间断点", "振荡间断点"],
    answer: 2,
    solution: [
      "当 \\(x\\to2\\) 时，分母 \\(x-2\\to0\\) 而分子 \\(x\\to2\\)，",
      "\\(f(x)=\\dfrac{x}{x-2}\\to\\infty\\)，极限为无穷大，",
      "故 \\(x=2\\) 是**无穷间断点**（第二类间断点）。"
    ]
  },
  {
    id: "u1-10", chapter: 1, type: "choice", difficulty: 1, tags: ["极限运算"],
    question: "求极限 \\(\\lim\\limits_{x\\to1}\\dfrac{x^2-1}{x-1}\\)。",
    options: ["\\(0\\)", "\\(1\\)", "\\(2\\)", "不存在"],
    answer: 2,
    solution: [
      "因式分解：\\(x^2-1=(x-1)(x+1)\\)，",
      "$$\\lim_{x\\to1}\\frac{x^2-1}{x-1}=\\lim_{x\\to1}(x+1)=2$$"
    ]
  },
  {
    id: "u1-11", chapter: 1, type: "fill", difficulty: 3, tags: ["重要极限"],
    question: "求极限 \\(\\lim\\limits_{x\\to\\infty}x\\sin\\dfrac{1}{x}\\) 的值。",
    answer: ["1"],
    solution: [
      "令 \\(t=\\dfrac1x\\)，则 \\(x\\to\\infty\\) 时 \\(t\\to0\\)：",
      "$$\\lim_{x\\to\\infty}x\\sin\\frac1x=\\lim_{t\\to0}\\frac{\\sin t}{t}=1$$"
    ]
  },
  {
    id: "u1-12", chapter: 1, type: "calc", difficulty: 3, tags: ["间断点", "极限"],
    question: "讨论函数 \\(f(x)=e^{\\frac{1}{x}}\\) 在 \\(x=0\\) 处的左、右极限，并判断间断点类型。",
    answer: [],
    solution: [
      "左极限：\\(x\\to0^-\\) 时 \\(\\dfrac1x\\to-\\infty\\)，故 \\(\\lim\\limits_{x\\to0^-}e^{\\frac1x}=0\\)。",
      "右极限：\\(x\\to0^+\\) 时 \\(\\dfrac1x\\to+\\infty\\)，故 \\(\\lim\\limits_{x\\to0^+}e^{\\frac1x}=+\\infty\\)。",
      "右极限为无穷大，\\(x=0\\) 是第二类（无穷）间断点。"
    ]
  },

  /* ============ 第二章 导数与微分 · 进阶补充 ============ */
  {
    id: "u2-7", chapter: 2, type: "choice", difficulty: 1, tags: ["求导法则"],
    question: "设 \\(y=x^3\\)，求 \\(y'(1)\\)。",
    options: ["\\(1\\)", "\\(2\\)", "\\(3\\)", "\\(6\\)"],
    answer: 2,
    solution: [
      "\\(y'=3x^2\\)，代入 \\(x=1\\) 得 \\(y'(1)=3\\)。"
    ]
  },
  {
    id: "u2-8", chapter: 2, type: "fill", difficulty: 2, tags: ["复合函数求导"],
    question: "设 \\(y=\\sin^2x\\)，求导函数 \\(y'\\)（如 sin2x）。",
    answer: ["sin2x", "2sinxcosx", "2sinx·cosx"],
    solution: [
      "复合函数求导（链式法则）：",
      "$$y'=2\\sin x\\cdot(\\sin x)'=2\\sin x\\cos x=\\sin 2x$$"
    ]
  },
  {
    id: "u2-9", chapter: 2, type: "choice", difficulty: 2, tags: ["对数求导法"],
    question: "设 \\(y=x^x\\;(x>0)\\)，求 \\(y'\\)。",
    options: ["\\(x^x(\\ln x+1)\\)", "\\(x\\cdot x^{x-1}\\)", "\\(x^x\\ln x\\)", "\\((\\ln x+1)^x\\)"],
    answer: 0,
    solution: [
      "两边取对数：\\(\\ln y=x\\ln x\\)，两边对 \\(x\\) 求导：",
      "$$\\frac{y'}{y}=\\ln x+1\\;\\Rightarrow\\;y'=x^x(\\ln x+1)$$",
      "注意：不能用幂函数求导公式 \\(x\\cdot x^{x-1}\\)，因为指数不是常数。"
    ]
  },
  {
    id: "u2-10", chapter: 2, type: "fill", difficulty: 1, tags: ["切线斜率"],
    question: "曲线 \\(y=x^2\\) 在点 \\((1,1)\\) 处的切线斜率是多少？",
    answer: ["2"],
    solution: [
      "\\(y'=2x\\)，在 \\(x=1\\) 处切线斜率 \\(k=y'(1)=2\\)。"
    ]
  },
  {
    id: "u2-11", chapter: 2, type: "choice", difficulty: 3, tags: ["可导与连续"],
    question: "函数 \\(f(x)\\) 在点 \\(x_0\\) 处可导是在该点连续的什么条件？",
    options: ["充分必要条件", "充分不必要条件", "必要不充分条件", "既非充分也非必要条件"],
    answer: 1,
    solution: [
      "可导必连续（充分性成立）；",
      "但连续不一定可导，例如 \\(y=|x|\\) 在 \\(x=0\\) 处连续但不可导（必要性不成立）。",
      "故可导是连续的**充分不必要**条件。"
    ]
  },
  {
    id: "u2-12", chapter: 2, type: "calc", difficulty: 2, tags: ["导数定义"],
    question: "用导数定义求 \\(f(x)=x^2\\) 在 \\(x=1\\) 处的导数 \\(f'(1)\\)。",
    answer: [],
    solution: [
      "由导数定义：",
      "$$f'(1)=\\lim_{h\\to0}\\frac{f(1+h)-f(1)}{h}=\\lim_{h\\to0}\\frac{(1+h)^2-1}{h}$$",
      "$$=\\lim_{h\\to0}\\frac{2h+h^2}{h}=\\lim_{h\\to0}(2+h)=2$$"
    ]
  },

  /* ============ 第三章 微分中值定理与导数的应用 · 进阶补充 ============ */
  {
    id: "u3-7", chapter: 3, type: "choice", difficulty: 1, tags: ["等价无穷小"],
    question: "求极限 \\(\\lim\\limits_{x\\to0}\\dfrac{e^x-1}{x}\\)。",
    options: ["\\(0\\)", "\\(1\\)", "\\(e\\)", "不存在"],
    answer: 1,
    solution: [
      "由等价无穷小 \\(e^x-1\\sim x\\;(x\\to0)\\)：",
      "$$\\lim_{x\\to0}\\frac{e^x-1}{x}=1$$",
      "（也可用洛必达法则一步得解。）"
    ]
  },
  {
    id: "u3-8", chapter: 3, type: "fill", difficulty: 2, tags: ["极值"],
    question: "求函数 \\(f(x)=x^4-2x^2\\) 的极小值。",
    answer: ["-1"],
    solution: [
      "\\(f'(x)=4x^3-4x=4x(x-1)(x+1)\\)，驻点 \\(x=-1,0,1\\)。",
      "符号分析：\\(x=\\pm1\\) 处导数由负变正，为极小值点，",
      "\\(f(\\pm1)=1-2=-1\\)，故极小值为 \\(-1\\)。"
    ]
  },
  {
    id: "u3-9", chapter: 3, type: "choice", difficulty: 2, tags: ["罗尔定理"],
    question: "\\(f(x)=|x|\\) 在 \\([-1,1]\\) 上不满足罗尔定理的哪个条件？",
    options: ["在 \\([-1,1]\\) 上连续", "端点函数值相等", "在 \\((-1,1)\\) 内可导", "以上都满足"],
    answer: 2,
    solution: [
      "\\(f(x)=|x|\\) 在 \\([-1,1]\\) 上连续，且 \\(f(-1)=f(1)=1\\)，",
      "但在 \\(x=0\\) 处不可导（左导数 \\(-1\\)、右导数 \\(1\\)），",
      "故不满足“在 \\((-1,1)\\) 内可导”这一条件。"
    ]
  },
  {
    id: "u3-10", chapter: 3, type: "choice", difficulty: 3, tags: ["重要极限"],
    question: "求极限 \\(\\lim\\limits_{x\\to0}(1+x)^{\\frac{1}{x}}\\)。",
    options: ["\\(1\\)", "\\(e\\)", "\\(\\dfrac{1}{e}\\)", "\\(+\\infty\\)"],
    answer: 1,
    solution: [
      "这是重要极限 \\(\\lim\\limits_{t\\to0}(1+t)^{\\frac1t}=e\\) 的直接形式。",
      "（也可取对数后洛必达验证。）"
    ]
  },
  {
    id: "u3-11", chapter: 3, type: "fill", difficulty: 3, tags: ["拉格朗日中值定理"],
    question: "函数 \\(f(x)=x^2\\) 在 \\([0,1]\\) 上满足拉格朗日中值定理的 \\(\\xi\\) 是多少？",
    answer: ["1/2", "0.5"],
    solution: [
      "由 \\(\\dfrac{f(1)-f(0)}{1-0}=f'(\\xi)\\) 得：",
      "$$1=2\\xi\\;\\Rightarrow\\;\\xi=\\frac12$$"
    ]
  },
  {
    id: "u3-12", chapter: 3, type: "calc", difficulty: 3, tags: ["单调性", "极值"],
    question: "求函数 \\(f(x)=x^3-3x^2-9x+5\\) 的单调区间与极值。",
    answer: [],
    solution: [
      "\\(f'(x)=3x^2-6x-9=3(x-3)(x+1)\\)，驻点 \\(x=-1,\\;3\\)。",
      "当 \\(x<-1\\) 或 \\(x>3\\) 时 \\(f'>0\\)，单调递增；当 \\(-1<x<3\\) 时 \\(f'<0\\)，单调递减。",
      "极大值 \\(f(-1)=10\\)，极小值 \\(f(3)=-22\\)。"
    ]
  },

  /* ============ 第四章 不定积分 · 进阶补充 ============ */
  {
    id: "u4-7", chapter: 4, type: "choice", difficulty: 1, tags: ["基本积分"],
    question: "求 \\(\\displaystyle\\int\\cos x\\,dx\\)。",
    options: ["\\(\\sin x+C\\)", "\\(-\\sin x+C\\)", "\\(\\cos x+C\\)", "\\(-\\cos x+C\\)"],
    answer: 0,
    solution: [
      "因为 \\((\\sin x)'=\\cos x\\)，所以 \\(\\int\\cos x\\,dx=\\sin x+C\\)。"
    ]
  },
  {
    id: "u4-8", chapter: 4, type: "fill", difficulty: 2, tags: ["换元积分"],
    question: "求 \\(\\displaystyle\\int x\\sqrt{1+x^2}\\,dx\\)（结果含任意常数）。",
    answer: ["1/3(1+x^2)^(3/2)+c", "1/3(1+x^2)^{3/2}+c", "(1+x^2)^(3/2)/3+c", "(1+x^2)^{3/2}/3"],
    solution: [
      "凑微分：\\(x\\,dx=\\dfrac12\\,d(1+x^2)\\)，",
      "$$\\int x\\sqrt{1+x^2}\\,dx=\\frac12\\int(1+x^2)^{\\frac12}\\,d(1+x^2)=\\frac13(1+x^2)^{\\frac32}+C$$"
    ]
  },
  {
    id: "u4-9", chapter: 4, type: "choice", difficulty: 2, tags: ["基本积分"],
    question: "求 \\(\\displaystyle\\int e^{2x}\\,dx\\)。",
    options: ["\\(\\dfrac{1}{2}e^{2x}+C\\)", "\\(e^{2x}+C\\)", "\\(2e^{2x}+C\\)", "\\(\\dfrac{1}{2}e^{x}+C\\)"],
    answer: 0,
    solution: [
      "凑微分：\\(e^{2x}dx=\\dfrac12\\,d(e^{2x})\\)，",
      "$$\\int e^{2x}\\,dx=\\frac12e^{2x}+C$$"
    ]
  },
  {
    id: "u4-10", chapter: 4, type: "choice", difficulty: 2, tags: ["基本积分"],
    question: "求 \\(\\displaystyle\\int\\dfrac{1}{\\sqrt{1-x^2}}\\,dx\\)。",
    options: ["\\(\\arcsin x+C\\)", "\\(\\arccos x+C\\)", "\\(\\arctan x+C\\)", "\\(\\ln(1-x^2)+C\\)"],
    answer: 0,
    solution: [
      "因为 \\((\\arcsin x)'=\\dfrac{1}{\\sqrt{1-x^2}}\\)，",
      "$$\\int\\frac{1}{\\sqrt{1-x^2}}\\,dx=\\arcsin x+C$$"
    ]
  },
  {
    id: "u4-11", chapter: 4, type: "fill", difficulty: 2, tags: ["分部积分"],
    question: "求 \\(\\displaystyle\\int x\\cos x\\,dx\\)（结果含任意常数）。",
    answer: ["xsinx+cosx+c", "xsinx+cosx"],
    solution: [
      "分部积分，取 \\(u=x\\)，\\(dv=\\cos x\\,dx\\)：",
      "$$\\int x\\cos x\\,dx=x\\sin x-\\int\\sin x\\,dx=x\\sin x+\\cos x+C$$"
    ]
  },
  {
    id: "u4-12", chapter: 4, type: "calc", difficulty: 3, tags: ["分部积分"],
    question: "求不定积分 \\(\\displaystyle\\int e^x\\cos x\\,dx\\)。",
    answer: [],
    solution: [
      "记 \\(I=\\int e^x\\cos x\\,dx\\)，两次分部积分：",
      "$$I=e^x\\cos x+\\int e^x\\sin x\\,dx=e^x\\cos x+e^x\\sin x-\\int e^x\\cos x\\,dx$$",
      "出现循环：\\(I=e^x(\\sin x+\\cos x)-I\\)，解得",
      "$$I=\\frac{e^x}{2}(\\sin x+\\cos x)+C$$"
    ]
  },

  /* ============ 第五章 定积分 · 进阶补充 ============ */
  {
    id: "u5-7", chapter: 5, type: "choice", difficulty: 1, tags: ["牛顿-莱布尼茨公式"],
    question: "计算 \\(\\displaystyle\\int_0^\\pi\\sin x\\,dx\\)。",
    options: ["\\(0\\)", "\\(1\\)", "\\(2\\)", "\\(\\pi\\)"],
    answer: 2,
    solution: [
      "$$\\int_0^\\pi\\sin x\\,dx=\\left[-\\cos x\\right]_0^\\pi=-\\cos\\pi+\\cos0=1+1=2$$"
    ]
  },
  {
    id: "u5-8", chapter: 5, type: "fill", difficulty: 2, tags: ["牛顿-莱布尼茨公式"],
    question: "计算 \\(\\displaystyle\\int_0^1e^x\\,dx\\) 的值。",
    answer: ["e-1"],
    solution: [
      "$$\\int_0^1e^x\\,dx=\\left[e^x\\right]_0^1=e-1$$"
    ]
  },
  {
    id: "u5-9", chapter: 5, type: "choice", difficulty: 2, tags: ["定积分概念"],
    question: "定积分 \\(\\displaystyle\\int_a^b f(x)\\,dx\\)（\\(f(x)\\ge0\\)）的几何意义是？",
    options: ["曲边梯形的面积", "曲线的弧长", "函数在区间上的平均值", "曲线在某点的切线斜率"],
    answer: 0,
    solution: [
      "当 \\(f(x)\\ge0\\) 时，\\(\\int_a^bf(x)\\,dx\\) 表示由曲线 \\(y=f(x)\\)、\\(x\\) 轴及直线 \\(x=a,\\;x=b\\) 围成的**曲边梯形的面积**。"
    ]
  },
  {
    id: "u5-10", chapter: 5, type: "choice", difficulty: 3, tags: ["分段积分"],
    question: "计算 \\(\\displaystyle\\int_{-2}^2|x|\\,dx\\)。",
    options: ["\\(0\\)", "\\(2\\)", "\\(4\\)", "\\(8\\)"],
    answer: 2,
    solution: [
      "\\(|x|\\) 是偶函数，且 \\(x\\ge0\\) 时 \\(|x|=x\\)：",
      "$$\\int_{-2}^2|x|\\,dx=2\\int_0^2x\\,dx=2\\times\\left[\\frac{x^2}{2}\\right]_0^2=4$$"
    ]
  },
  {
    id: "u5-11", chapter: 5, type: "fill", difficulty: 3, tags: ["定积分计算"],
    question: "计算 \\(\\displaystyle\\int_0^1\\dfrac{1}{1+x^2}\\,dx\\) 的值。",
    answer: ["pi/4", "π/4"],
    solution: [
      "$$\\int_0^1\\frac1{1+x^2}\\,dx=\\left[\\arctan x\\right]_0^1=\\arctan1-\\arctan0=\\frac\\pi4$$"
    ]
  },
  {
    id: "u5-12", chapter: 5, type: "calc", difficulty: 3, tags: ["变上限积分", "洛必达"],
    question: "求极限 \\(\\lim\\limits_{x\\to0}\\dfrac{\\int_0^x\\sin t\\,dt}{x^2}\\)。",
    answer: [],
    solution: [
      "\\(\\dfrac00\\) 型，对分子使用变上限积分求导公式，洛必达：",
      "$$\\lim_{x\\to0}\\frac{\\int_0^x\\sin t\\,dt}{x^2}=\\lim_{x\\to0}\\frac{\\sin x}{2x}=\\frac12$$"
    ]
  },

  /* ============ 第六章 定积分的应用 · 进阶补充 ============ */
  {
    id: "u6-6", chapter: 6, type: "choice", difficulty: 1, tags: ["面积"],
    question: "由曲线 \\(y=x^2\\)、直线 \\(x=1,\\;x=2\\) 与 \\(x\\) 轴围成的图形面积是？",
    options: ["\\(\\dfrac{7}{3}\\)", "\\(3\\)", "\\(\\dfrac{8}{3}\\)", "\\(\\dfrac{5}{2}\\)"],
    answer: 0,
    solution: [
      "$$S=\\int_1^2x^2\\,dx=\\left[\\frac{x^3}{3}\\right]_1^2=\\frac83-\\frac13=\\frac73$$"
    ]
  },
  {
    id: "u6-7", chapter: 6, type: "fill", difficulty: 2, tags: ["旋转体体积"],
    question: "曲线 \\(y=\\sqrt{x}\\)（\\(0\\le x\\le4\\)）绕 \\(x\\) 轴旋转所得旋转体的体积是多少？",
    answer: ["8pi", "8π"],
    solution: [
      "$$V=\\pi\\int_0^4(\\sqrt{x})^2\\,dx=\\pi\\int_0^4x\\,dx=\\pi\\left[\\frac{x^2}{2}\\right]_0^4=8\\pi$$"
    ]
  },
  {
    id: "u6-8", chapter: 6, type: "choice", difficulty: 2, tags: ["弧长"],
    question: "曲线 \\(y=\\ln x\\) 上 \\(1\\le x\\le e\\) 一段的弧长 \\(s\\) 等于？",
    options: [
      "\\(\\displaystyle\\int_1^e\\sqrt{1+\\frac{1}{x^2}}\\,dx\\)",
      "\\(\\displaystyle\\int_1^e\\sqrt{1+x^2}\\,dx\\)",
      "\\(\\displaystyle\\int_1^e\\left(1+\\frac{1}{x^2}\\right)dx\\)",
      "\\(\\displaystyle\\int_1^e\\ln x\\,dx\\)"
    ],
    answer: 0,
    solution: [
      "\\(y'=\\dfrac1x\\)，由弧长公式：",
      "$$s=\\int_1^e\\sqrt{1+(y')^2}\\,dx=\\int_1^e\\sqrt{1+\\frac1{x^2}}\\,dx$$"
    ]
  },
  {
    id: "u6-9", chapter: 6, type: "fill", difficulty: 3, tags: ["旋转体体积"],
    question: "底面半径为 \\(1\\)、高为 \\(2\\) 的圆锥体，用定积分计算其体积。",
    answer: ["2pi/3", "2π/3"],
    solution: [
      "圆锥母线：距顶点 \\(x\\) 处截面半径 \\(r(x)=\\dfrac{x}{2}\\)，",
      "$$V=\\pi\\int_0^2\\left(\\frac x2\\right)^2dx=\\pi\\left[\\frac{x^3}{12}\\right]_0^2=\\frac{2\\pi}{3}$$",
      "与圆锥体积公式 \\(V=\\dfrac13\\pi r^2h=\\dfrac{2\\pi}{3}\\) 一致。"
    ]
  },
  {
    id: "u6-10", chapter: 6, type: "choice", difficulty: 3, tags: ["形心"],
    question: "上半圆盘 \\(x^2+y^2\\le1,\\;y\\ge0\\) 的形心纵坐标 \\(\\bar{y}\\) 是？",
    options: ["\\(\\dfrac{4}{3\\pi}\\)", "\\(\\dfrac{2}{3\\pi}\\)", "\\(\\dfrac{3}{2\\pi}\\)", "\\(\\dfrac{1}{2}\\)"],
    answer: 0,
    solution: [
      "由形心公式 \\(\\bar y=\\dfrac{\\iint_Dy\\,dA}{A}\\)：",
      "$$\\iint_Dy\\,dA=\\int_0^\\pi\\sin\\theta\\,d\\theta\\int_0^1r^2\\,dr=2\\cdot\\frac13=\\frac23$$",
      "面积 \\(A=\\dfrac\\pi2\\)，故 \\(\\bar y=\\dfrac{2/3}{\\pi/2}=\\dfrac{4}{3\\pi}\\)。"
    ]
  },
  {
    id: "u6-11", chapter: 6, type: "calc", difficulty: 2, tags: ["面积"],
    question: "求由抛物线 \\(y=x^2\\) 与 \\(y=2-x^2\\) 围成的图形面积。",
    answer: [],
    solution: [
      "交点：\\(x^2=2-x^2\\Rightarrow x=\\pm1\\)。",
      "$$S=\\int_{-1}^1\\left[(2-x^2)-x^2\\right]dx=\\int_{-1}^1(2-2x^2)\\,dx$$",
      "$$=\\left[2x-\\frac{2x^3}{3}\\right]_{-1}^1=2\\left(2-\\frac23\\right)=\\frac83$$"
    ]
  },

  /* ============ 第七章 微分方程 · 进阶补充 ============ */
  {
    id: "u7-7", chapter: 7, type: "choice", difficulty: 1, tags: ["可分离变量方程"],
    question: "微分方程 \\(y'=3x^2\\) 的通解是？",
    options: ["\\(y=x^3+C\\)", "\\(y=3x^3+C\\)", "\\(y=x^3\\)", "\\(y=x^2+C\\)"],
    answer: 0,
    solution: [
      "直接积分：\\(y=\\int3x^2\\,dx=x^3+C\\)。"
    ]
  },
  {
    id: "u7-8", chapter: 7, type: "fill", difficulty: 2, tags: ["可降阶方程"],
    question: "求微分方程 \\(y''=x\\) 的通解（含两个任意常数，如 x^3/6+C1x+C2）。",
    answer: ["x^3/6+c1x+c2", "1/6x^3+c1x+c2", "x^3/6+c2x+c1"],
    solution: [
      "积分一次：\\(y'=\\dfrac{x^2}{2}+C_1\\)；",
      "再积分一次：",
      "$$y=\\frac{x^3}{6}+C_1x+C_2$$"
    ]
  },
  {
    id: "u7-9", chapter: 7, type: "choice", difficulty: 2, tags: ["一阶线性方程"],
    question: "方程 \\(y'+p(x)y=q(x)\\) 的类型是？",
    options: ["一阶线性微分方程", "可分离变量方程", "齐次方程", "伯努利方程"],
    answer: 0,
    solution: [
      "形如 \\(y'+p(x)y=q(x)\\) 的方程称为**一阶线性微分方程**，",
      "可用积分因子法或常数变易法求解。"
    ]
  },
  {
    id: "u7-10", chapter: 7, type: "choice", difficulty: 3, tags: ["常系数线性方程"],
    question: "微分方程 \\(y''-4y'+4y=0\\) 的通解是？",
    options: [
      "\\((C_1+C_2x)e^{2x}\\)",
      "\\(C_1e^{2x}+C_2e^{-2x}\\)",
      "\\(C_1e^x+C_2e^{4x}\\)",
      "\\(C_1\\cos2x+C_2\\sin2x\\)"
    ],
    answer: 0,
    solution: [
      "特征方程 \\(r^2-4r+4=(r-2)^2=0\\) 有二重根 \\(r=2\\)，",
      "通解为 \\((C_1+C_2x)e^{2x}\\)。"
    ]
  },
  {
    id: "u7-11", chapter: 7, type: "fill", difficulty: 3, tags: ["初值问题"],
    question: "曲线 \\(y=f(x)\\) 过点 \\((1,2)\\)，且任一点处切线斜率为 \\(2x\\)，求 \\(f(2)\\)。",
    answer: ["5"],
    solution: [
      "由题意 \\(f'(x)=2x\\)，积分得 \\(f(x)=x^2+C\\)。",
      "代入 \\(f(1)=2\\)：\\(1+C=2\\Rightarrow C=1\\)，故 \\(f(x)=x^2+1\\)。",
      "所以 \\(f(2)=4+1=5\\)。"
    ]
  },
  {
    id: "u7-12", chapter: 7, type: "calc", difficulty: 3, tags: ["一阶线性方程"],
    question: "求微分方程 \\(y'+2xy=x\\) 的通解。",
    answer: [],
    solution: [
      "一阶线性方程，积分因子 \\(e^{\\int2x\\,dx}=e^{x^2}\\)：",
      "$$\\left(ye^{x^2}\\right)'=xe^{x^2}\\;\\Rightarrow\\;ye^{x^2}=\\frac12e^{x^2}+C$$",
      "故通解为 \\(y=\\dfrac12+Ce^{-x^2}\\)。"
    ]
  }
];
