/* ============================================================
 * 中大高数题库 · 下册题库（参照北京大学版《高等数学（下册）》章节体系）
 * 本题库为原创练习题，参考历年高数期末考试常见题型与难度编写。
 * ============================================================ */

const LOWER_QUESTIONS = [
  /* ---------- 第八章 空间解析几何与向量代数 ---------- */
  {
    id: "l8-1", chapter: 8, type: "fill", difficulty: 1, tags: ["数量积"],
    question: "已知向量 \\(\\vec a=(1,2,3)\\)，\\(\\vec b=(0,1,-1)\\)，求数量积 \\(\\vec a\\cdot\\vec b\\)。",
    answer: ["-1"],
    solution: [
      "由数量积的坐标公式：",
      "$$\\vec a\\cdot\\vec b=1\\times0+2\\times1+3\\times(-1)=0+2-3=-1$$"
    ]
  },
  {
    id: "l8-2", chapter: 8, type: "choice", difficulty: 1, tags: ["向量积"],
    question: "设 \\(\\vec a=(1,0,0)\\)，\\(\\vec b=(0,1,0)\\)，求 \\(\\vec a\\times\\vec b\\)。",
    options: ["\\((0,0,1)\\)", "\\((0,0,-1)\\)", "\\((1,1,0)\\)", "\\((0,0,0)\\)"],
    answer: 0,
    solution: [
      "由向量积的坐标公式（三阶行列式）：",
      "$$\\vec a\\times\\vec b=\\begin{vmatrix}i&j&k\\\\1&0&0\\\\0&1&0\\end{vmatrix}=(0,0,1)$$",
      "\\(\\vec a\\times\\vec b\\) 同时垂直于 \\(\\vec a\\)、\\(\\vec b\\)，方向由右手法则确定。"
    ]
  },
  {
    id: "l8-3", chapter: 8, type: "fill", difficulty: 2, tags: ["平面方程"],
    question: "求过点 \\((1,0,0)\\) 且以 \\(\\vec n=(1,1,1)\\) 为法向量的平面方程（形如 x+y+z=1）。",
    answer: ["x+y+z=1", "x+y+z-1=0", "1(x-1)+y+z=0"],
    solution: [
      "由平面的点法式方程 \\(A(x-x_0)+B(y-y_0)+C(z-z_0)=0\\)：",
      "$$(x-1)+y+z=0\\;\\Rightarrow\\;x+y+z=1$$"
    ]
  },
  {
    id: "l8-4", chapter: 8, type: "choice", difficulty: 2, tags: ["距离公式"],
    question: "点 \\((1,1,1)\\) 到平面 \\(x+y+z=0\\) 的距离是？",
    options: ["\\(\\sqrt{3}\\)", "\\(3\\)", "\\(\\dfrac{1}{\\sqrt{3}}\\)", "\\(1\\)"],
    answer: 0,
    solution: [
      "点到平面距离公式 \\(d=\\dfrac{|Ax_0+By_0+Cz_0+D|}{\\sqrt{A^2+B^2+C^2}}\\)：",
      "$$d=\\frac{|1+1+1|}{\\sqrt{1+1+1}}=\\frac3{\\sqrt3}=\\sqrt3$$"
    ]
  },
  {
    id: "l8-5", chapter: 8, type: "choice", difficulty: 2, tags: ["直线与平面"],
    question: "直线 \\(L: x=t,\\;y=2t,\\;z=3t\\) 与平面 \\(x+2y+3z=0\\) 的位置关系是？",
    options: ["直线在平面内", "直线与平面平行（不在平面内）", "直线与平面相交于一点", "直线与平面垂直"],
    answer: 0,
    solution: [
      "直线的方向向量 \\(\\vec s=(1,2,3)\\)，平面的法向量 \\(\\vec n=(1,2,3)\\)，\\(\\vec s\\parallel\\vec n\\)，",
      "故直线与平面垂直或平行；又直线过原点 \\((0,0,0)\\)，而原点在平面上，",
      "所以**直线在平面内**。"
    ]
  },

  /* ---------- 第九章 多元函数微分学 ---------- */
  {
    id: "l9-1", chapter: 9, type: "fill", difficulty: 1, tags: ["偏导数"],
    question: "设 \\(z=x^2y+xy^2\\)，求 \\(\\dfrac{\\partial z}{\\partial x}\\)（如 2xy+y^2）。",
    answer: ["2xy+y^2", "y^2+2xy"],
    solution: [
      "对 \\(x\\) 求偏导时，把 \\(y\\) 看作常数：",
      "$$\\frac{\\partial z}{\\partial x}=2xy+y^2$$"
    ]
  },
  {
    id: "l9-2", chapter: 9, type: "choice", difficulty: 1, tags: ["偏导数"],
    question: "设 \\(z=e^{xy}\\)，求 \\(\\dfrac{\\partial z}{\\partial y}\\)。",
    options: ["\\(xe^{xy}\\)", "\\(ye^{xy}\\)", "\\(e^{xy}\\)", "\\(xye^{xy}\\)"],
    answer: 0,
    solution: [
      "对 \\(y\\) 求偏导时把 \\(x\\) 看作常数，由复合函数求导：",
      "$$\\frac{\\partial z}{\\partial y}=e^{xy}\\cdot x=xe^{xy}$$"
    ]
  },
  {
    id: "l9-3", chapter: 9, type: "fill", difficulty: 2, tags: ["全微分"],
    question: "设 \\(z=x^2+y^2\\)，求在点 \\((1,1)\\) 处的全微分 \\(dz\\)（形如 2dx+2dy）。",
    answer: ["2dx+2dy", "2(dx+dy)"],
    solution: [
      "\\(\\dfrac{\\partial z}{\\partial x}=2x\\)，\\(\\dfrac{\\partial z}{\\partial y}=2y\\)，",
      "$$dz=2x\\,dx+2y\\,dy$$",
      "在点 \\((1,1)\\) 处：\\(dz=2\\,dx+2\\,dy\\)。"
    ]
  },
  {
    id: "l9-4", chapter: 9, type: "choice", difficulty: 2, tags: ["多元极值"],
    question: "函数 \\(f(x,y)=x^3-3x+y^2\\) 的驻点 \\((1,0)\\) 是？",
    options: ["极小值点", "极大值点", "鞍点（非极值点）", "无法判断"],
    answer: 0,
    solution: [
      "\\(f_x=3x^2-3=0\\Rightarrow x=\\pm1\\)，\\(f_y=2y=0\\Rightarrow y=0\\)。",
      "\\(f_{xx}=6x\\)，\\(f_{yy}=2\\)，\\(f_{xy}=0\\)。",
      "在 \\((1,0)\\)：\\(A=f_{xx}=6>0\\)，\\(AC-B^2=12>0\\)，故为**极小值点**。",
      "（在 \\((-1,0)\\)：\\(A=-6<0\\)，\\(AC-B^2=-12<0\\)，为鞍点。）"
    ]
  },
  {
    id: "l9-5", chapter: 9, type: "fill", difficulty: 3, tags: ["条件极值"],
    question: "求 \\(z=xy\\) 在约束条件 \\(x+y=1\\) 下的最大值。",
    answer: ["1/4", "0.25"],
    solution: [
      "方法一（代入法）：\\(y=1-x\\)，则 \\(z=x(1-x)=-\\left(x-\\dfrac12\\right)^2+\\dfrac14\\le\\dfrac14\\)。",
      "方法二（拉格朗日乘数法）：令 \\(L=xy+\\lambda(x+y-1)\\)，解得 \\(x=y=\\dfrac12\\)。",
      "当 \\(x=y=\\dfrac12\\) 时取得最大值 \\(\\dfrac14\\)。"
    ]
  },
  {
    id: "l9-6", chapter: 9, type: "choice", difficulty: 2, tags: ["方向导数"],
    question: "\\(f(x,y)=x^2+y^2\\) 在点 \\((1,1)\\) 处沿方向 \\(\\vec l=(1,1)\\) 的方向导数是？",
    options: ["\\(2\\sqrt{2}\\)", "\\(\\sqrt{2}\\)", "\\(4\\)", "\\(2\\)"],
    answer: 0,
    solution: [
      "梯度 \\(\\nabla f=(2x,2y)\\)，在 \\((1,1)\\) 处为 \\((2,2)\\)。",
      "\\(\\vec l\\) 的单位向量 \\(\\vec e=\\left(\\dfrac1{\\sqrt2},\\dfrac1{\\sqrt2}\\right)\\)，",
      "$$\\frac{\\partial f}{\\partial l}=\\nabla f\\cdot\\vec e=\\frac2{\\sqrt2}+\\frac2{\\sqrt2}=2\\sqrt2$$"
    ]
  },

  /* ---------- 第十章 重积分 ---------- */
  {
    id: "l10-1", chapter: 10, type: "fill", difficulty: 1, tags: ["二重积分"],
    question: "计算二重积分 \\(\\displaystyle\\iint_D x\\,dxdy\\)，其中 \\(D: 0\\le x\\le1,\\;0\\le y\\le2\\)。",
    answer: ["1"],
    solution: [
      "$$\\iint_Dx\\,dxdy=\\int_0^2dy\\int_0^1x\\,dx=2\\cdot\\left[\\frac{x^2}{2}\\right]_0^1=2\\times\\frac12=1$$"
    ]
  },
  {
    id: "l10-2", chapter: 10, type: "choice", difficulty: 2, tags: ["极坐标"],
    question: "计算 \\(\\displaystyle\\iint_D(x^2+y^2)\\,dxdy\\)，其中 \\(D: x^2+y^2\\le1\\)。",
    options: ["\\(\\dfrac{\\pi}{2}\\)", "\\(\\dfrac{\\pi}{4}\\)", "\\(\\pi\\)", "\\(2\\pi\\)"],
    answer: 0,
    solution: [
      "用极坐标 \\(x=r\\cos\\theta,\\;y=r\\sin\\theta\\)，\\(dxdy=r\\,dr\\,d\\theta\\)：",
      "$$\\iint_D(x^2+y^2)\\,dxdy=\\int_0^{2\\pi}d\\theta\\int_0^1r^2\\cdot r\\,dr=2\\pi\\cdot\\left[\\frac{r^4}{4}\\right]_0^1=\\frac\\pi2$$"
    ]
  },
  {
    id: "l10-3", chapter: 10, type: "choice", difficulty: 2, tags: ["交换积分次序"],
    question: "交换积分次序：\\(\\displaystyle\\int_0^1dx\\int_0^xf(x,y)\\,dy=\\)？",
    options: [
      "\\(\\displaystyle\\int_0^1dy\\int_y^1f(x,y)\\,dx\\)",
      "\\(\\displaystyle\\int_0^1dy\\int_0^yf(x,y)\\,dx\\)",
      "\\(\\displaystyle\\int_0^1dy\\int_0^1f(x,y)\\,dx\\)",
      "\\(\\displaystyle\\int_0^1dy\\int_y^1f(x,y)\\,dy\\)"
    ],
    answer: 0,
    solution: [
      "原积分区域 \\(D: 0\\le y\\le x\\le1\\)（先 \\(y\\) 后 \\(x\\)）。",
      "交换次序后（先 \\(x\\) 后 \\(y\\)）：\\(0\\le y\\le1\\)，\\(y\\le x\\le1\\)。",
      "故 \\(\\int_0^1dx\\int_0^xf\\,dy=\\int_0^1dy\\int_y^1f\\,dx\\)。"
    ]
  },
  {
    id: "l10-4", chapter: 10, type: "choice", difficulty: 2, tags: ["体积", "二重积分"],
    question: "平面 \\(x+y+z=1\\) 与三个坐标面围成的四面体体积是？",
    options: ["\\(\\dfrac{1}{6}\\)", "\\(\\dfrac{1}{3}\\)", "\\(\\dfrac{1}{2}\\)", "\\(1\\)"],
    answer: 0,
    solution: [
      "积分区域 \\(D: x\\ge0,\\;y\\ge0,\\;x+y\\le1\\)，曲顶 \\(z=1-x-y\\)：",
      "$$V=\\iint_D(1-x-y)\\,dxdy=\\int_0^1dx\\int_0^{1-x}(1-x-y)\\,dy$$",
      "$$=\\int_0^1\\frac{(1-x)^2}{2}\\,dx=\\left[-\\frac{(1-x)^3}{6}\\right]_0^1=\\frac16$$",
      "（也可用三棱锥体积公式 \\(V=\\dfrac13Sh=\\dfrac13\\cdot\\dfrac12\\cdot1=\\dfrac16\\) 验证。）"
    ]
  },
  {
    id: "l10-5", chapter: 10, type: "fill", difficulty: 2, tags: ["极坐标"],
    question: "计算 \\(\\displaystyle\\iint_D y\\,dxdy\\)，其中 \\(D: x^2+y^2\\le1,\\;y\\ge0\\)（上半圆盘）。",
    answer: ["2/3"],
    solution: [
      "极坐标下 \\(y=r\\sin\\theta\\)，\\(D: 0\\le r\\le1,\\;0\\le\\theta\\le\\pi\\)：",
      "$$\\iint_Dy\\,dxdy=\\int_0^\\pi\\sin\\theta\\,d\\theta\\int_0^1r^2\\,dr=\\left[-\\cos\\theta\\right]_0^\\pi\\cdot\\frac13=\\frac23$$"
    ]
  },

  /* ---------- 第十一章 曲线积分与曲面积分 ---------- */
  {
    id: "l11-1", chapter: 11, type: "fill", difficulty: 1, tags: ["第一类曲线积分"],
    question: "计算第一类曲线积分 \\(\\displaystyle\\int_Lds\\)，其中 \\(L\\) 为圆周 \\(x^2+y^2=1\\) 的全周长。",
    answer: ["2pi", "2π"],
    solution: [
      "第一类曲线积分 \\(\\int_L1\\,ds\\) 表示曲线 \\(L\\) 的弧长，",
      "单位圆的周长为 \\(2\\pi\\)，故积分值为 \\(2\\pi\\)。"
    ]
  },
  {
    id: "l11-2", chapter: 11, type: "choice", difficulty: 2, tags: ["格林公式"],
    question: "用格林公式计算 \\(\\displaystyle\\oint_L x^2y\\,dx-xy^2\\,dy\\)，其中 \\(L\\) 为圆周 \\(x^2+y^2=1\\) 正向。",
    options: ["\\(-\\dfrac{\\pi}{2}\\)", "\\(\\dfrac{\\pi}{2}\\)", "\\(0\\)", "\\(-\\pi\\)"],
    answer: 0,
    solution: [
      "\\(P=x^2y\\)，\\(Q=-xy^2\\)，\\(\\dfrac{\\partial Q}{\\partial x}-\\dfrac{\\partial P}{\\partial y}=-y^2-x^2\\)。",
      "由格林公式：",
      "$$\\oint_LP\\,dx+Q\\,dy=\\iint_D(-x^2-y^2)\\,dxdy=-\\int_0^{2\\pi}d\\theta\\int_0^1r^3\\,dr=-\\frac\\pi2$$"
    ]
  },
  {
    id: "l11-3", chapter: 11, type: "choice", difficulty: 2, tags: ["路径无关"],
    question: "计算 \\(\\displaystyle\\int_L 2x\\,dx+2y\\,dy\\)，其中 \\(L\\) 为从点 \\((0,0)\\) 到点 \\((1,1)\\) 的任意光滑曲线。",
    options: ["\\(2\\)", "\\(1\\)", "\\(\\sqrt{2}\\)", "\\(4\\)"],
    answer: 0,
    solution: [
      "因 \\(\\dfrac{\\partial(2y)}{\\partial x}=\\dfrac{\\partial(2x)}{\\partial y}=0\\)，积分与路径无关。",
      "\\(2x\\,dx+2y\\,dy=d(x^2+y^2)\\)，故",
      "$$\\int_L2x\\,dx+2y\\,dy=x^2+y^2\\Big|_{(0,0)}^{(1,1)}=2$$"
    ]
  },
  {
    id: "l11-4", chapter: 11, type: "fill", difficulty: 3, tags: ["格林公式"],
    question: "计算 \\(\\displaystyle\\oint_L x\\,dy\\)，其中 \\(L\\) 为圆周 \\(x^2+y^2=1\\) 的正向闭曲线。",
    answer: ["pi", "π"],
    solution: [
      "\\(P=0\\)，\\(Q=x\\)，\\(\\dfrac{\\partial Q}{\\partial x}-\\dfrac{\\partial P}{\\partial y}=1\\)。",
      "由格林公式：",
      "$$\\oint_Lx\\,dy=\\iint_D1\\,dxdy=\\pi\\times1^2=\\pi$$",
      "（\\(\\iint_D1\\,dxdy\\) 恰为圆盘面积 \\(\\pi\\)。）"
    ]
  },
  {
    id: "l11-5", chapter: 11, type: "choice", difficulty: 1, tags: ["第一类曲线积分"],
    question: "计算 \\(\\displaystyle\\int_L(x^2+y^2)\\,ds\\)，其中 \\(L\\) 为圆周 \\(x^2+y^2=1\\)。",
    options: ["\\(2\\pi\\)", "\\(\\pi\\)", "\\(1\\)", "\\(0\\)"],
    answer: 0,
    solution: [
      "在圆周 \\(L\\) 上 \\(x^2+y^2=1\\)，故",
      "$$\\int_L(x^2+y^2)\\,ds=\\int_L1\\,ds=2\\pi$$",
      "（\\(\\int_L1\\,ds\\) 即圆的周长。）"
    ]
  },

  /* ---------- 第十二章 无穷级数 ---------- */
  {
    id: "l12-1", chapter: 12, type: "choice", difficulty: 1, tags: ["p级数"],
    question: "判断级数 \\(\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{1}{n^2}\\) 的敛散性。",
    options: ["收敛", "发散", "条件收敛", "无法判断"],
    answer: 0,
    solution: [
      "这是 \\(p\\) 级数 \\(\\sum\\dfrac1{n^p}\\) 中 \\(p=2>1\\) 的情形，**收敛**。",
      "且 \\(\\sum\\limits_{n=1}^{\\infty}\\dfrac1{n^2}=\\dfrac{\\pi^2}{6}\\)（巴塞尔问题）。"
    ]
  },
  {
    id: "l12-2", chapter: 12, type: "fill", difficulty: 1, tags: ["几何级数"],
    question: "几何级数 \\(\\displaystyle\\sum_{n=0}^{\\infty}q^n\\) 收敛的条件是？（用不等式表示，如 |q|<1）",
    answer: ["|q|<1", "-1<q<1", "abs(q)<1"],
    solution: [
      "几何级数 \\(\\sum q^n=1+q+q^2+\\cdots\\) 当且仅当公比满足 \\(|q|<1\\) 时收敛，",
      "其和为 \\(\\dfrac{1}{1-q}\\)。"
    ]
  },
  {
    id: "l12-3", chapter: 12, type: "choice", difficulty: 2, tags: ["幂级数"],
    question: "幂级数 \\(\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{x^n}{n}\\) 的收敛半径 \\(R\\) 是？",
    options: ["\\(0\\)", "\\(1\\)", "\\(+\\infty\\)", "\\(\\dfrac{1}{2}\\)"],
    answer: 1,
    solution: [
      "由比值法：\\(a_n=\\dfrac1n\\)，",
      "$$R=\\lim_{n\\to\\infty}\\left|\\frac{a_n}{a_{n+1}}\\right|=\\lim_{n\\to\\infty}\\frac{n+1}{n}=1$$",
      "故收敛半径 \\(R=1\\)。"
    ]
  },
  {
    id: "l12-4", chapter: 12, type: "choice", difficulty: 2, tags: ["交错级数"],
    question: "级数 \\(\\displaystyle\\sum_{n=1}^{\\infty}\\dfrac{(-1)^n}{n}\\) 的敛散性是？",
    options: ["绝对收敛", "条件收敛", "发散", "无法判断"],
    answer: 1,
    solution: [
      "\\(\\sum\\left|\\dfrac{(-1)^n}{n}\\right|=\\sum\\dfrac1n\\) 发散（调和级数）。",
      "但 \\(\\sum\\dfrac{(-1)^n}{n}\\) 是交错级数，由莱布尼茨判别法收敛。",
      "故原级数**条件收敛**。"
    ]
  },
  {
    id: "l12-5", chapter: 12, type: "fill", difficulty: 2, tags: ["幂级数展开"],
    question: "\\(\\sin x\\) 的麦克劳林展开式中 \\(x^3\\) 项的系数是多少？",
    answer: ["-1/6"],
    solution: [
      "$$\\sin x=x-\\frac{x^3}{3!}+\\frac{x^5}{5!}-\\cdots+(-1)^n\\frac{x^{2n+1}}{(2n+1)!}+\\cdots$$",
      "\\(x^3\\) 项为 \\(-\\dfrac{x^3}{3!}=-\\dfrac{x^3}{6}\\)，故系数为 \\(-\\dfrac16\\)。"
    ]
  },
  {
    id: "l12-6", chapter: 12, type: "choice", difficulty: 3, tags: ["正项级数", "积分判别法"],
    question: "判断级数 \\(\\displaystyle\\sum_{n=2}^{\\infty}\\dfrac{1}{n\\ln n}\\) 的敛散性。",
    options: ["收敛", "发散", "条件收敛", "绝对收敛"],
    answer: 1,
    solution: [
      "用积分判别法，考察广义积分：",
      "$$\\int_2^{+\\infty}\\frac{1}{x\\ln x}\\,dx=\\lim_{b\\to+\\infty}\\ln(\\ln b)-\\ln(\\ln2)=+\\infty$$",
      "广义积分发散，故级数**发散**。",
      "注意：\\(\\sum\\dfrac{1}{n\\ln n}\\) 比调和级数发散得还慢。"
    ]
  }
];
