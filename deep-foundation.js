window.PYQUEST_DEEP = {
  1: {
    intro:'从“计算机怎样读一行代码”开始。读完本关，你应当能自己写下几行指令，知道每行会得到什么，也能看懂最常见的报错。',
    sections:[
      {title:'Python 程序究竟是什么',paragraphs:[
        '程序是一串按顺序执行的指令。你把文字写进 .py 文件，Python 解释器读取它并执行。它不会猜你的意图，只按语法处理。交互窗口 REPL 则适合临时试一行；保存程序时仍要写进文件。',
        '在 .py 文件中，计算结果不会自动出现在页面上。print(...) 是一条明确的“显示”指令。括号内先算出结果，再交给 print。井号 # 后面是注释，供人阅读，不参与计算。'
      ],code:'2 + 3\nprint(2 + 3)\nprint("我开始学 Python 了")  # 这一段是注释',output:'5\n我开始学 Python 了',trace:['第 1 行算出了 5，但没有要求显示，所以输出区没有这一行。','第 2 行先计算 2 + 3，再由 print 显示 5。','第 3 行显示引号里的文字；注释不显示。'],tryThis:'把第二行的 + 改成 *，预测输出再运行。'},
      {title:'值、类型和引号',paragraphs:[
        '值是程序处理的东西。18 是整数 int；18.5 是小数 float；"18" 是字符串 str，也就是文本；True 和 False 是布尔值 bool，代表真假。文字一定要加引号，数字通常不加。',
        '看着都像 18，数字 18 与文本 "18" 的用途却不同：前者能做算术，后者适合显示、保存订单号。type(...) 能查看一个值的类型。先问“这是什么类型”，能解开许多初学错误。'
      ],code:'print(type(18).__name__)\nprint(type("18").__name__)\nprint(18 + 2)\nprint("18" + "2")',output:'int\nstr\n20\n182',trace:['type(18) 得到整数类型；type("18") 得到字符串类型。','18 + 2 是两个整数相加，结果为 20。','"18" + "2" 是两段文字拼接，得到 "182"。'],tryThis:'把最后一行的第二个 "2" 去掉引号试运行，观察 TypeError；然后恢复。'},
      {title:'变量：名字指向一个值',paragraphs:[
        '变量可以理解为一张名字牌。age = 18 的意思是把 age 这个名字绑定到整数 18。等号右边先计算，随后才更新左边的名字。因此 age = age + 1 是合法的：先找到旧 age，再加 1，最后让 age 指向新结果。',
        '两张名字牌也可以先指向同一个值。给其中一个名字重新赋值，不会让另一个名字跟着变化。现在先记住“先读右边，后绑定左边”，第 3 关会再讨论可修改的列表。'
      ],code:'age = 18\nbefore = age\nage = age + 1\nprint(age)\nprint(before)',output:'19\n18',trace:['第 1 行让 age 指向 18；第 2 行让 before 也指向此时的 18。','第 3 行先算旧 age + 1，得到 19，再让 age 指向 19。','before 依然指向 18，因此最后一行不是 19。'],tryThis:'把 age = age + 1 改成 age = age + 5，先在纸上写出两行输出。'},
      {title:'算式与运算顺序',paragraphs:[
        '+、-、* 分别表示加、减、乘；/ 表示除法，即使整除也返回浮点数。// 是向下取整的除法，% 是余数。乘除通常先于加减；想让读者一眼看懂时，用括号写明顺序。',
        '余数常用于判断奇偶：一个整数除以 2 的余数为 0，说明它是偶数。这里先观察结果，第 4 关才用 if 根据真假走不同分支。'
      ],code:'print(2 + 3 * 4)\nprint((2 + 3) * 4)\nprint(7 / 2)\nprint(7 // 2)\nprint(7 % 2)',output:'14\n20\n3.5\n3\n1',trace:['先乘后加，所以 2 + 3 * 4 是 14；括号让加法先做，结果为 20。','7 / 2 得到 3.5；7 // 2 得到 3；7 % 2 留下余数 1。'],tryThis:'试一试 8 / 4 和 8 // 4，观察 2.0 与 2 的差别。'},
      {title:'输入、转换和第一种报错',paragraphs:[
        '真正让用户输入时可写 input("请输入年龄：")。但 input 得到的一定是文本。为了在网页实验室中无需键盘等待，下面用 raw = "18" 模拟一次输入；int(raw) 才把文本转成整数。',
        '如果 raw 是 "十八" 或 "18岁"，int(raw) 无法转换，会出现 ValueError。这是程序告诉你“值的格式不合适”。报错不是失败的评语，而是定位问题的线索。后续异常章节再学如何处理。'
      ],code:'raw = "18"\nage = int(raw)\nprint(age + 1)\nprint(type(age).__name__)',output:'19\nint',trace:['raw 是带引号的文本。','int(raw) 产生整数 18，再与 1 相加。','type(age) 证实转换后的类型为 int。'],tryThis:'把 raw 改成 "18岁" 再运行，读报错最后一行的异常名称。'},
      {title:'缩进、语法和调错顺序',paragraphs:[
        'Python 使用缩进表示一组代码属于同一个结构，例如之后要学的 if 和 for。当前关先养成习惯：成对检查括号和引号，注释不要误写到字符串里。代码运行前会先检查语法，语法不完整时会报 SyntaxError。',
        '遇到红色报错时，按“异常名称 → 行号 → 那一行及上一行”的顺序看。箭头指的是发现问题的位置，真正漏写的字符也可能在前面。'
      ],code:'name = "小林"\nprint("欢迎，" + name)\n# 试着删除第一行末尾的引号，再看报错',output:'欢迎，小林',trace:['第一行保存文本；第二行先拼接两段文本，再显示。','最后一行是注释，不会执行。'],tryThis:'删除第一行的右引号，运行后找出报错行号；恢复后再运行。'}
    ]
  },
  2: {
    intro:'你已经知道“18”和 18 不一样。本关学习文本和数值怎样进入业务程序、怎样取出一部分，以及为什么有些改动不会留在原变量里。',
    sections:[
      {title:'字符串像一排有编号的字符',paragraphs:['字符串是一段有顺序的文本。第一个字符的编号是 0，第二个是 1。用 text[0] 取单个字符，用 text[1:4] 取从编号 1 到编号 4 之前的字符；冒号右边不包含。','负编号从末尾往前数，-1 是最后一个字符。直接访问不存在的编号会报 IndexError；切片超出末尾通常只返回现有部分。'],code:'text = "Python"\nprint(text[0])\nprint(text[1:4])\nprint(text[-1])\nprint(text[1:99])',output:'P\nyth\nn\nython',trace:['P 的编号是 0；编号 1、2、3 分别是 y、t、h。','-1 指向末尾的 n；切片到 99 也只取到实际末尾。'],tryThis:'先写出 text[0:2] 的预期，再运行。'},
      {title:'字符串方法会产生新值',paragraphs:['现实中输入的姓名常有多余空格。strip() 去掉两端空白；lower() 转小写。它们返回处理后的新字符串，原字符串本身不改变。要保留结果，必须重新赋值给某个名字。','这种“已有字符串内容不会原地变化”的性质叫不可变。它有助于解释很多面试输出题：只调用方法却没接住返回值，后续变量仍是原文本。'],code:'raw = "  Ada  "\nraw.strip()\nprint(repr(raw))\nclean = raw.strip().lower()\nprint(repr(clean))',output:"'  Ada  '\n'ada'",trace:['第二行算出了新文本，却没有保存。','repr 显示引号和空格，因此第一行输出还能看见原来的空格。','第四行把两个处理步骤的结果存入 clean。'],tryThis:'将第二行改为 raw = raw.strip()，预测第一行输出会怎样变。'},
      {title:'格式化、拆分与拼接',paragraphs:['f-string 以字母 f 开头，花括号中的表达式会先计算，再放进文字里，适合用户提示。split() 可以按分隔符拆文本，得到列表；join() 用指定分隔符把一组字符串连起来。','不要把用户可见文案用一长串加号拼接。变量较多时 f-string 往往更容易核对空格和标点。'],code:'name = "小林"\nscore = 86\nprint(f"{name} 的成绩是 {score} 分")\nparts = "A,B,C".split(",")\nprint(parts)\nprint("-".join(parts))',output:"小林 的成绩是 86 分\n['A', 'B', 'C']\nA-B-C",trace:['花括号里的 name 和 score 被各自的值替换。','split 得到三个元素的列表；join 用连字符把它们连接。'],tryThis:'把逗号分隔改成竖线分隔，先猜 split 结果。'},
      {title:'数字转换与浮点精度',paragraphs:['int("12") 得到整数 12，float("12.5") 得到浮点数 12.5。转换只在输入符合要求时成功。int("12.5") 并不会自动帮你先转浮点数。','float 在内部以二进制表示，像 0.1 这样的十进制小数不能总被精确表示。涉及金额时应了解 Decimal，或在业务规则允许时以“分”为整数单位。'],code:'print(int("12") + 3)\nprint(float("12.5") + 3)\nprint(0.1 + 0.2 == 0.3)',output:'15\n15.5\nFalse',trace:['前两行先把文本变成数字，再做加法。','最后一行展示浮点近似值可能造成的比较问题，不代表 Python 算错了加法规则。'],tryThis:'运行 print(0.1 + 0.2)，观察显示的完整小数。'},
      {title:'真假、相等和同一对象',paragraphs:['比较值用 ==。0、空字符串等在条件中视为假，但它们仍是有效数据；None 常用于表示“没有值”。判断一个值是否为 None，通常写 is None。','is 问的是“是否同一个对象”，不是“内容看起来是否一样”。尤其不要依赖字符串或整数在某次运行中共享对象的优化细节来写业务判断。'],code:'amount = 0\nprint(amount == 0)\nprint(amount is None)\nmissing = None\nprint(missing is None)',output:'True\nFalse\nTrue',trace:['0 确实等于 0，但不等于“缺失”。','None 是专门表示没有值的对象。'],tryThis:'把 amount 改成 None，预测前两行各是什么。'}
    ]
  },
  3: {
    intro:'一份订单往往不止一个值。学会用容器组织数据之后，才能处理联系人、购物车和报表。这里先只用读取、索引和方法；循环会在下一关正式学习。',
    sections:[
      {title:'列表：一排可修改的数据',paragraphs:['列表用方括号创建，有顺序、允许重复。位置从 0 开始。append 把新元素加到末尾；len 返回元素个数。订单金额 [12, 12, 8] 中两个 12 是两笔订单，不能随意去重。','列表可以改变自身。items.append(30) 后，items 指向的仍是那张列表，但里面多了一个元素。注意 append 的返回值是 None，而不是更新后的列表。'],code:'items = [12, 12, 8]\nitems.append(30)\nprint(items)\nprint(len(items))\nprint(items[0])',output:'[12, 12, 8, 30]\n4\n12',trace:['append 修改了原列表。','列表现在有 4 项；编号 0 的第一项仍是 12。'],tryThis:'先预测 items[-1]；再加一行 print(items[-1]) 验证。'},
      {title:'元组、集合与字典各负责什么',paragraphs:['元组用圆括号写，如 (x, y)，适合一组位置固定的数据。集合 set 关心“有没有”和“去重”，不承担业务展示顺序。字典用键找到对应的值，比如用户 ID 对应余额。','选择时问三个问题：要按位置访问吗？重复是否有意义？要按名字快速找到值吗？订单行常用列表；唯一标签常用集合；用户余额常用字典。'],code:'point = (3, 5)\nunique = set([2, 2, 3])\nbalance = {"u01": 100, "u02": 50}\nprint(point[0])\nprint(2 in unique)\nprint(balance["u02"])',output:'3\nTrue\n50',trace:['元组编号 0 的值为 3。','集合中有 2；字典通过键 u02 找到 50。','这里不打印集合整体，因为集合的显示顺序不是业务保证。'],tryThis:'将键改成 u03 试运行，留意 KeyError；下一步再学习 get 方法。'},
      {title:'字典的键、读取与更新',paragraphs:['字典是一张“键 → 值”的对照表。写 totals["Ada"] = 20 是保存；totals["Ada"] 取值。如果键可能不存在，get("Ada", 0) 可以提供默认值。','键需要可哈希，常见的字符串和整数可以作为键，列表不能。字典保留插入顺序，但设计查找逻辑时更重要的是键是否唯一。'],code:'totals = {"Ada": 20}\nprint(totals.get("Lin", 0))\ntotals["Lin"] = 5\nprint(totals["Lin"])\nprint(len(totals))',output:'0\n5\n2',trace:['Lin 原本不存在，get 返回默认值 0。','赋值后 Lin 对应 5；字典现在有两个键。'],tryThis:'把 get 中的默认值 0 改成 None，预测第一行。'},
      {title:'名字共享列表与浅拷贝',paragraphs:['列表能修改，因此两个名字指向同一张列表时，通过任一名字修改都能从另一个名字看到。要分开最外层列表，可用 copy()。','浅拷贝只复制外层。如果列表里面又装了列表，内部那张列表仍可能共享。先画两层箭头：名字 → 外层列表 → 内层列表，就容易看出差别。'],code:'a = [1, 2]\nb = a\nb.append(3)\nprint(a)\nc = a.copy()\nc.append(4)\nprint(a)\nprint(c)',output:'[1, 2, 3]\n[1, 2, 3]\n[1, 2, 3, 4]',trace:['b = a 没有复制列表；b.append 影响 a 能看到的同一列表。','c = a.copy() 新建外层列表；在 c 末尾添加 4 不影响 a。'],tryThis:'把 c = a.copy() 改成 c = a，预测最后两行。'}
    ]
  },
  4: {
    intro:'条件让程序选择路径，循环让程序处理一批数据。本关从最基础的流程开始：先手动追踪每一步，再自己写重复处理。',
    sections:[
      {title:'if：先判断，再走一条分支',paragraphs:['条件表达式会得到 True 或 False。if 后面有冒号；缩进的代码只在条件成立时执行。elif 仅在前面没命中时检查，else 处理剩余情况。','多个条件可能同时成立时，顺序会改变结果。比如分数 95 同时满足 >= 90 与 >= 60，所以更严格的条件要放前面。'],code:'score = 95\nif score >= 90:\n    print("优秀")\nelif score >= 60:\n    print("合格")\nelse:\n    print("待提高")',output:'优秀',trace:['先检查 95 >= 90，得到 True。','执行第一块后，其余 elif/else 不再运行。'],tryThis:'把 score 改为 59，先判断会进入哪条分支。'},
      {title:'for：一项一项处理列表',paragraphs:['for name in names: 的意思是依次取列表中的元素，并临时用 name 指向当前这一项。缩进的代码会对每一项执行一次。列表为空时，循环体一次也不会执行。','处理订单汇总时，先能在纸上追踪“第几次、当前值、累计值”。复杂循环只是把同样步骤重复很多次。'],code:'amounts = [10, 20, 5]\ntotal = 0\nfor amount in amounts:\n    total = total + amount\n    print("当前累计", total)\nprint("最终", total)',output:'当前累计 10\n当前累计 30\n当前累计 35\n最终 35',trace:['开始 total 为 0；第一项 10 后变为 10。','第二项 20 后变为 30；第三项 5 后变为 35。','最后一行没有缩进，只在循环结束后执行一次。'],tryThis:'把列表改为空列表 []，预测会显示几行。'},
      {title:'range、enumerate 与循环次数',paragraphs:['range(1, 4) 产生 1、2、3，终点 4 不包含。enumerate(items) 能同时给出编号和元素，比自己维护一个计数变量更不容易出错。','别把“编号”和“元素值”混淆。列表 [10,20] 的第一项编号是 0，值却是 10。'],code:'for n in range(1, 4):\n    print(n)\nfor index, value in enumerate([10, 20]):\n    print(index, value)',output:'1\n2\n3\n0 10\n1 20',trace:['range 从 1 开始，到 4 之前停止。','enumerate 把 (编号, 值) 一对一对交给循环。'],tryThis:'把 range(1, 4) 改成 range(2, 5)，先写出前三行。'},
      {title:'while、break 与 continue',paragraphs:['while 会在每次循环前重新检查条件，适合“不知道要重复多少次”的情况。若条件永远为真而没有退出途径，就会死循环。','break 立刻结束整个循环；continue 跳过当前这次，回到下一次条件检查。它们改变流程，使用时要明确计数值是否已经更新。'],code:'n = 0\nwhile n < 5:\n    n = n + 1\n    if n == 2:\n        continue\n    if n == 4:\n        break\n    print(n)',output:'1\n3',trace:['n=1 时打印 1；n=2 时 continue，跳过打印。','n=3 时打印 3；n=4 时 break，循环结束。'],tryThis:'把 break 条件改成 n == 5，预测多打印哪一个数。'},
      {title:'条件里的“空”和“缺失”',paragraphs:['0、空字符串、空列表在 if 中是假，但它们是具体的有效值；None 表示没有值。业务里库存 0 与没有录入库存不是一回事。','用 if amount is None 判断是否缺失，用 if amount == 0 判断是否为零。把它们写成 if amount: 会把两种情况混在一起。'],code:'amount = 0\nif amount is None:\n    print("未录入")\nelif amount == 0:\n    print("库存为零")\nelse:\n    print("有库存")',output:'库存为零',trace:['amount 是整数 0，并非 None，所以第一支不执行。','第二个判断 0 == 0 为真，显示库存为零。'],tryThis:'把 amount 改成 None，预测输出。'}
    ]
  },
  5: {
    intro:'函数把一项工作封装成可以反复调用的规则。学函数时，先关注输入、处理、返回值，再去看作用域和参数技巧。',
    sections:[
      {title:'从重复步骤抽出函数',paragraphs:['def 定义函数，括号里的名字是参数，相当于调用时预留的输入位置。定义函数时，函数体先被记录；真正调用它时才运行。return 把结果交还调用方。','一个好函数要有清楚的约定：接收什么、返回什么、什么情况算异常。业务例子是“收到商品单价和数量，返回小计”。'],code:'def subtotal(price, quantity):\n    return price * quantity\n\nprint(subtotal(12, 3))\nprint(subtotal(5, 2))',output:'36\n10',trace:['定义 subtotal 时还没有计算小计。','第一次调用把 price 绑定到 12、quantity 绑定到 3，返回 36。','第二次调用使用新的参数，返回 10。'],tryThis:'将第二次调用的数量改成 0，预测返回值。'},
      {title:'print 和 return 是两条不同的路',paragraphs:['print 只把值显示给人；return 则把值交给程序其他部分继续使用。一个函数即使显示了 36，若没有 return，调用它得到的仍是 None。','写自动判题函数时必须按要求 return，因为判题器要拿返回值比较。把结果打印出来不能代替返回。'],code:'def show_total(a, b):\n    print(a + b)\n\nresult = show_total(2, 3)\nprint("返回值:", result)',output:'5\n返回值: None',trace:['函数内部 print 显示了 5。','函数走到末尾，没有明确 return，自动返回 None。'],tryThis:'加入 return a + b 并删去内部 print，预测两行输出会如何变。'},
      {title:'位置参数、关键字参数和局部名字',paragraphs:['subtotal(12, 3) 按位置传参；subtotal(quantity=3, price=12) 按名字传参。后者在参数多时更清楚。函数内部创建的名字通常只在本次调用中有效，这叫局部作用域。','先学会设计少而清楚的参数。*args 与 **kwargs 分别收集额外的位置与关键字参数，但并非每个函数都需要它们。'],code:'def receipt(price, quantity):\n    total = price * quantity\n    return total\n\nprint(receipt(quantity=3, price=12))',output:'36',trace:['关键字传参按名字匹配，与书写顺序无关。','total 只在函数体内部使用；调用方拿到的是 return 的结果。'],tryThis:'在函数外写 print(total) 运行，读 NameError 的意思。'},
      {title:'可变默认参数为什么危险',paragraphs:['默认参数在执行 def 时求值一次。若默认值是列表 []，多次省略该参数的调用会共用同一张列表。第一次加入 A，第二次加入 B 后可能看到 [A,B]。','需要“每次调用得到新列表”时，用 None 作为默认值，然后在函数体内创建 []。这是面试常问的行为，也是真实项目中的状态串扰问题。'],code:'def add_item(item, items=None):\n    if items is None:\n        items = []\n    items.append(item)\n    return items\n\nprint(add_item("A"))\nprint(add_item("B"))',output:"['A']\n['B']",trace:['两次调用都省略 items；每次检测到 None，创建一张新列表。','因此第二次不会继承第一次的 A。'],tryThis:'试着把默认值改成 [] 并删去 if 块，观察第二次调用。'},
      {title:'递归、lambda 与如何选写法',paragraphs:['递归是函数在内部调用自己。它必须有“什么时候停”的条件，否则会不断调用直到出错。lambda 是创建短小函数的写法，通常用在简单排序规则等位置。','零基础时优先写普通 def 和清晰循环。只有当问题真的能拆成“同类的小问题”时，才考虑递归；一行 lambda 放不下清楚意思，就写 def。'],code:'def countdown(n):\n    if n == 0:\n        return "结束"\n    return countdown(n - 1)\n\nprint(countdown(3))',output:'结束',trace:['3 变 2，2 变 1，1 变 0。','到 n==0 时直接返回，不再继续调用。'],tryThis:'把终止条件删掉会怎样？先思考，不必在实验室真的运行。'}
    ]
  }
};
