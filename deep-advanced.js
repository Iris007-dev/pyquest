Object.assign(window.PYQUEST_DEEP, {
  6:{
    intro:'代码逐渐变长时，要学会分文件、选环境和记录依赖。本关先把“模块”理解为一个能被其他文件使用的 .py 文件。',
    sections:[
      {title:'模块把功能放进有名字的文件',paragraphs:['假设你写了 calculator.py，里面定义 add。另一个文件可以 import calculator，再写 calculator.add(2,3)。import 后的点号表示“从这个模块取出名字”。','把每个功能都复制粘贴进新文件，修一次 bug 就可能漏改别处。模块的目的是复用与组织。标准库中的 math、json 等模块安装 Python 后即可使用。'],code:'import math\nprint(math.sqrt(81))\nprint(math.pi > 3)',output:'9.0\nTrue',trace:['import math 让 math 这个模块名可用。','sqrt(81) 算平方根，结果是浮点数 9.0；pi 大于 3 的判断为真。'],tryThis:'把 math.sqrt(81) 改成 math.sqrt(25)，先预测结果。'},
      {title:'导入会执行模块的顶层代码',paragraphs:['Python 首次导入模块时，会执行文件顶层语句以创建其中的名字。若把测试用的 print 放在顶层，别人一导入就可能看到额外输出。','常用的 if __name__ == "__main__": 表示“只在这个文件被直接运行时做这件事”。文件作为模块被导入时，__name__ 通常是模块名称。'],code:'print("当前模块名:", __name__)\nif __name__ == "__main__":\n    print("这是直接运行时的入口")',output:'当前模块名: __main__\n这是直接运行时的入口',trace:['实验室把示例当脚本运行，因此 __name__ 为 __main__。','将同样内容放进模块再导入，入口条件不会成立。'],tryThis:'先说明为什么可复用函数应放在 if 条件外，再继续。'},
      {title:'包、导入路径与常见报错',paragraphs:['多个相关模块可以放进同一个目录形成包。导入是否成功取决于 Python 的搜索路径、项目启动方式，以及模块是否真在当前环境中。','看到 ModuleNotFoundError 时，先核对拼写、文件位置、执行命令和 Python 环境。不要立即到处复制文件或修改系统路径。'],code:'import sys\nprint("当前解释器:", sys.executable)\nprint("搜索路径条数:", len(sys.path))',output:'输出取决于你电脑上的 Python 路径',trace:['sys.executable 告诉你当前运行的是哪一个 Python。','sys.path 是查找模块的位置列表；具体内容因电脑而异。'],tryThis:'比较命令行里运行的 Python 与实验室输出的路径是否一致。'},
      {title:'venv、pip 与依赖清单',paragraphs:['虚拟环境 venv 给单个项目准备独立的包安装位置。你可以把它想成项目专用工具箱：A 项目需要某个版本，不必影响 B 项目。pip 在当前环境安装第三方包。','先创建环境、激活环境、再安装依赖。requirements.txt 或其他项目配置记录要安装哪些包。这个实验室只用标准库，不需要额外安装；真正建项目时请在终端执行环境命令。'],code:'import sys\nprint(sys.version_info.major)\nprint(sys.version_info.minor)',output:'两行数字，表示当前 Python 的主版本与次版本',trace:['版本来自你正在运行的解释器，而不是你以为安装的版本。','遇到依赖问题，先确认解释器与安装位置是否对应。'],tryThis:'在本地命令行运行 python --version，对照实验室输出。'}
    ]
  },
  7:{
    intro:'真实输入并不总是合法，文件也可能不存在。异常处理要让程序在可预期的错误面前给出清楚的结果。',
    sections:[
      {title:'区分语法错误和运行异常',paragraphs:['漏掉冒号或引号是语法错误，程序还没开始正常执行就会报 SyntaxError。int("12件") 语法没错，但执行转换时会抛 ValueError。','报错信息通常从调用过程一路列到失败位置。初学时先看最末行的异常类型，再看指向你代码的行号。'],code:'text = "12件"\ntry:\n    print(int(text))\nexcept ValueError:\n    print("数量必须是整数")',output:'数量必须是整数',trace:['int 尝试转换文本，发现格式不符。','异常类型是 ValueError，except 正好接住它，因此显示可理解的提示。'],tryThis:'把 text 改成 "12"，预测会走 try 还是 except。'},
      {title:'只捕获你能处理的异常',paragraphs:['try 放可能出错的操作；except ValueError 只处理格式错误。else 在 try 没有异常时执行；finally 不论成功或失败都执行，常用于清理。raise 可以主动把不合法情况报告给调用者。','不要用空的 except: 把所有错误吞掉。那会让真正的程序 bug 看上去像“没有结果”，更难排查。'],code:'text = "8"\ntry:\n    value = int(text)\nexcept ValueError:\n    print("格式错误")\nelse:\n    print("成功:", value)\nfinally:\n    print("检查结束")',output:'成功: 8\n检查结束',trace:['转换成功，因此不执行 except。','随后执行 else；最后执行 finally。'],tryThis:'把 text 改成 "八"，预测输出的两行。'},
      {title:'with 负责关闭文件',paragraphs:['文件打开后要关闭，否则可能留下未写入的数据或占用资源。with open(...) as f: 管理文件的使用范围，离开缩进块后会关闭文件，即使中途出错也能清理。','指定 encoding="utf-8" 可以避免中文在不同电脑上因默认编码不同而出现问题。网页实验室使用浏览器中的虚拟文件系统；同一页面后续运行可能仍能读取，但刷新或重启后不能保证保留，也不会写进电脑的真实文件夹。'],code:'with open("note.txt", "w", encoding="utf-8") as f:\n    f.write("今天学会了 with")\nwith open("note.txt", "r", encoding="utf-8") as f:\n    print(f.read())',output:'今天学会了 with',trace:['第一次 with 写入文本后关闭文件。','第二次 with 重新打开并读取；虚拟文件只供当前浏览器运行环境使用，不会自动保存到电脑磁盘。'],tryThis:'将写入内容改成自己的学习笔记再运行。'},
      {title:'JSON 与 CSV 是两种不同形状的数据',paragraphs:['JSON 能表示对象、列表、字符串、数字等嵌套结构。json.loads 将 JSON 文本转为 Python 数据；json.dumps 做反向转换。CSV 更像一行一行的表格。','解析成功并不等于数据安全可用。还要检查字段是否存在、类型是否正确。例如缺少 amount 时直接 record["amount"] 会抛 KeyError。'],code:"import json\nraw = '{\"amount\": 12, \"paid\": true}'\nrecord = json.loads(raw)\nprint(record[\"amount\"])\nprint(record[\"paid\"])",output:'12\nTrue',trace:['JSON 中的 true 转成 Python 的 True。','record 是字典，可用键读取字段。'],tryThis:'把 amount 键拼错后运行，观察异常名称。'}
    ]
  },
  8:{
    intro:'当一组数据和针对它的操作总是一起出现时，可以考虑类。先弄明白“类、实例、属性、方法”，再讨论继承。',
    sections:[
      {title:'类是蓝图，实例是具体对象',paragraphs:['class Account 定义一种账户。Account(100) 创建一个具体实例。__init__ 在创建时初始化数据；self 表示当前这一个实例。self.balance 是该实例的余额。','两个实例可有不同状态。调用 a.deposit(5) 时，Python 会把 a 作为方法里的 self，因此只改 a 的余额。'],code:'class Account:\n    def __init__(self, balance):\n        self.balance = balance\n    def deposit(self, amount):\n        self.balance += amount\n\na = Account(100)\nb = Account(20)\na.deposit(5)\nprint(a.balance, b.balance)',output:'105 20',trace:['a、b 分别创建了实例，各自保存 balance。','a.deposit(5) 修改 a；b 的 20 不变。'],tryThis:'给 b 也存入 10，预测最后一行。'},
      {title:'类属性与实例属性的共享边界',paragraphs:['在 class 内、方法外定义的名称属于类。多个实例读取同一个可变类属性时，可能共享同一张列表。放进 __init__ 的 self.items 则每创建一次实例就新建一张列表。','面试题常用“两个购物车为什么串单”检查你是否理解这层共享。'],code:'class Cart:\n    def __init__(self):\n        self.items = []\n\nfirst = Cart()\nsecond = Cart()\nfirst.items.append("书")\nprint(first.items)\nprint(second.items)',output:"['书']\n[]",trace:['每次 Cart() 都执行 __init__，创建独立列表。','给 first 添加商品，不影响 second。'],tryThis:'思考若把 items = [] 移到 class 体中，第二个购物车会怎样。'},
      {title:'继承与组合该怎样选',paragraphs:['继承表达“B 是一种 A”，比如储蓄账户是一种账户。组合表达“A 拥有 B”，比如订单拥有地址。很多业务设计用组合更直接。','先画出对象之间的句子，再写代码。为了“看起来面向对象”而建很多层继承，会让维护变难。'],code:'class Address:\n    def __init__(self, city):\n        self.city = city\nclass Order:\n    def __init__(self, address):\n        self.address = address\norder = Order(Address("上海"))\nprint(order.address.city)',output:'上海',trace:['Order 接收一个 Address 实例，而不是继承 Address。','order.address.city 沿着“订单拥有地址”的关系取城市。'],tryThis:'把城市换成你所在城市，观察输出。'},
      {title:'dataclass、property 与特殊方法',paragraphs:['dataclass 适合以存数据为主的类，可自动生成初始化等常用方法。property 让调用者像读属性那样访问经过计算或校验的值。__repr__ 等双下划线方法定义对象如何显示、比较或参与运算。','这些是建立在实例和方法之上的工具。先确保数据模型正确，再用它们减少重复代码，不必在第一天背完所有特殊方法。'],code:'from dataclasses import dataclass\n@dataclass\nclass Product:\n    name: str\n    price: int\np = Product("书", 30)\nprint(p.name)\nprint(p)',output:"书\nProduct(name='书', price=30)",trace:['@dataclass 生成接收 name、price 的初始化方法。','打印实例时显示字段内容，便于调试。'],tryThis:'给 Product 增加 stock: int，再创建一个带库存的实例。'}
    ]
  },
  9:{
    intro:'算法是“解决问题的步骤”，复杂度是数据增长时步骤数量的趋势。面试题除了正确结果，还会问边界与前提。',
    sections:[
      {title:'先定义输入、输出、前提',paragraphs:['“在列表里找 5”看似简单，仍需确认：列表是否排序？重复时返回哪一个位置？找不到返回什么？不写清楚这些，两个看似正确的函数可能做出不同业务结果。','工作中先写一组示例：普通、空列表、重复值、目标在两端、目标缺失。它们决定实现与测试。'],code:'items = [1, 2, 2, 4]\nprint(items.index(2))\nprint(3 in items)',output:'1\nFalse',trace:['index(2) 返回第一个出现的位置。','3 不在列表中，in 得到 False。'],tryThis:'试着调用 items.index(3)，观察找不到时的异常。'},
      {title:'O(n) 与 O(log n) 是增长趋势',paragraphs:['逐项看一遍，最多看 n 项，叫线性查找，时间随列表长度近似线性增长，记作 O(n)。二分只适用于已排序数据，每次丢掉约一半候选，记作 O(log n)。','O 记号关注规模变大后的趋势，不等于精确秒数。长度很小的时候，简单的线性写法可能更合适；先满足正确性，再考虑优化。'],code:'items = [2, 4, 6, 8]\nprint(6 in items)\nprint(len(items))',output:'True\n4',trace:['in 可以找到 6，但单纯列表查找通常要逐项检查。','len 告诉你当前规模 n 为 4。'],tryThis:'把列表扩成 8 项，想象最坏情况下要检查多少次。'},
      {title:'二分左边界到底在找什么',paragraphs:['在 [1,2,2,4] 中找 2，题目要求“第一个大于等于 2 的位置”，答案是 1。它不是随便找一个 2；若目标是 3，答案是可插入的 3。','维护一个左闭右开的候选区间 [left,right)。中间值小于目标时，答案只能在右侧；否则答案可能就是中间或更靠左。标准库 bisect_left 用同样的边界定义。'],code:'from bisect import bisect_left\nitems = [1, 2, 2, 4]\nprint(bisect_left(items, 2))\nprint(bisect_left(items, 3))\nprint(bisect_left(items, 9))',output:'1\n3\n4',trace:['2 的左侧位置是 1；3 应插在 4 前，位置 3。','9 比所有元素大，插在末尾，位置等于列表长度 4。'],tryThis:'先预测空列表 [] 对任意目标的插入位置。'},
      {title:'栈、队列、哈希与排序',paragraphs:['栈后进先出，像叠盘子；队列先进先出，像排队。字典/集合借助哈希结构做按键查找。排序把数据按规则排列；Python 的排序是稳定的，相同关键字的原有顺序会保留。','选择结构要看操作：频繁从前面取出可用 deque；按 ID 找记录可用字典；按价格筛选并排序需要考虑原数据规模。不要先套算法名称，再找问题。'],code:'from collections import deque\nline = deque(["A", "B"])\nline.append("C")\nprint(line.popleft())\nprint(list(line))',output:"A\n['B', 'C']",trace:['A 最先进入队列，所以先被 popleft 取出。','剩下 B、C，保持进入的顺序。'],tryThis:'把 A、B、C 想成排队的客户，画出每一步队列。'}
    ]
  },
  10:{
    intro:'可迭代对象是“可以一个个取值”的对象。生成器进一步把计算推迟到真正取值时，适合较大的数据流。',
    sections:[
      {title:'for 的背后是取下一个值',paragraphs:['列表、字符串等可以交给 for 遍历。更底层地，iter(obj) 取得迭代器，next(it) 取一个值。取尽时会抛 StopIteration；for 自动处理这个结束信号。','迭代器往往像单向车票，使用过的值不会自动恢复。需要再遍历，应从原可迭代对象重新创建迭代器。'],code:'items = iter([10, 20])\nprint(next(items))\nprint(next(items))',output:'10\n20',trace:['第一次 next 得到 10，内部位置前进。','第二次 next 得到 20；再取一次将结束。'],tryThis:'加第三次 next，读异常类型。'},
      {title:'生成器在 yield 处暂停',paragraphs:['普通函数调用后执行到 return 才交回结果。含 yield 的函数调用先得到生成器；每次取值时运行到下一个 yield 并暂停，保留当前位置。','它可逐条处理日志，无需先把所有行都放进列表。但生成器被取尽后，第二次遍历不会自动重算。'],code:'def squares(n):\n    for x in range(n):\n        print("正在算", x)\n        yield x * x\n\ng = squares(3)\nprint(next(g))\nprint(next(g))',output:'正在算 0\n0\n正在算 1\n1',trace:['创建 g 时没有打印“正在算”。','第一次 next 才算 0；第二次 next 才算 1。'],tryThis:'猜下一次 next 的两行输出，再运行。'},
      {title:'推导式、map 和 filter 的位置',paragraphs:['[x*2 for x in values] 立即生成列表；(x*2 for x in values) 是惰性的生成器表达式。map 做转换，filter 做筛选。','学会它们后，选择最容易读懂的表达方式。一个包含多层条件的长推导式，常不如清楚的 for 循环。'],code:'values = [1, 2, 3]\neager = [x * 2 for x in values]\nlazy = (x * 2 for x in values)\nprint(eager)\nprint(list(lazy))\nprint(list(lazy))',output:'[2, 4, 6]\n[2, 4, 6]\n[]',trace:['eager 一开始就建好列表。','lazy 第一次被 list 消耗，第二次已经没有值。'],tryThis:'把 * 2 改为 + 1，先预测前三行。'},
      {title:'闭包和装饰器为什么出现',paragraphs:['函数可以返回另一个函数。内部函数仍能记住外层函数的某些变量，这叫闭包。装饰器用这一能力在原函数调用前后加入日志、计时等行为。','装饰器会增加一层调用，初学时先画“调用包装函数 → 调用原函数 → 返回结果”的流程，不必先背 @ 语法。实际项目中常配合 functools.wraps 保留原函数名称等信息。'],code:'def make_prefix(prefix):\n    def decorate(text):\n        return prefix + text\n    return decorate\nhello = make_prefix("你好，")\nprint(hello("小林"))',output:'你好，小林',trace:['make_prefix 返回内部函数 decorate。','调用 hello 时，内部函数仍能读取之前的 prefix。'],tryThis:'用 make_prefix("欢迎，") 创建第二个函数并调用。'}
    ]
  },
  11:{
    intro:'能运行只是第一步。测试和调试帮助别人相信代码在正常、空值与边界情况下都按约定工作。',
    sections:[
      {title:'一项测试包含输入、动作、期望',paragraphs:['先给函数输入，再调用，最后比较实际结果与预期。assert 表达“这里必须成立”，不成立时测试失败。测试用例应能让别人看出业务要求。','只测 [2,3] 很容易漏掉空列表。先列正常、空输入、重复值和极端值，再挑重要的变成测试。'],code:'def total(values):\n    return sum(values)\nassert total([2, 3]) == 5\nassert total([]) == 0\nprint("两个测试通过")',output:'两个测试通过',trace:['第一项检查普通输入。','第二项检查空列表，sum([]) 返回 0。'],tryThis:'把第一个期望从 5 改成 6，读 AssertionError。'},
      {title:'看报错要追踪数据从哪里来',paragraphs:['出错时先确认异常名称、行号、当时变量的值。不要只看最后一行报错就随意改代码。用最小输入重现问题，然后一步步缩小范围。','日志适合记录程序运行过程；与临时 print 不同，logging 可以控制级别和输出位置。不要把密码或令牌记录进去。'],code:'import logging\nlogging.basicConfig(level=logging.INFO)\nitems = [1, 2, 3]\nlogging.info("处理了 %s 项", len(items))\nprint(sum(items))',output:'日志显示处理了 3 项；标准输出显示 6',trace:['logging.info 记录处理数量，通常写到错误输出。','sum 计算结果并由 print 显示。'],tryThis:'把 items 改成空列表，观察两处信息。'},
      {title:'类型标注是说明，不是自动关卡',paragraphs:['def double(x: int) -> int: 告诉读者和工具预期输入、输出都是整数。Python 默认不会因为类型标注而阻止传入字符串；真实接口仍应对外部数据作验证。','格式化工具统一代码样式，静态检查工具指出可疑写法。它们能帮你检查，但不能替代业务测试。'],code:'def double(x: int) -> int:\n    return x * 2\nprint(double(3))\nprint(double("A"))',output:'6\nAA',trace:['数字 3 乘 2 得到 6。','字符串 "A" 乘 2 得到 "AA"；标注并未在运行时挡住它。'],tryThis:'解释为什么需要在处理用户输入前显式检查类型。'},
      {title:'单元测试与集成测试看不同边界',paragraphs:['单元测试只针对一小块函数，运行快、失败好定位；集成测试把几个组件放在一起，检查接口是否衔接。网页从点击到判题再到进度保存，属于更完整的流程验收。','测试不要依赖今天的日期、外部网络瞬时结果或之前某次运行留下的文件，除非明确把这些条件固定。'],code:'def normalize(text):\n    return text.strip().lower()\ndef welcome(text):\n    return "你好，" + normalize(text)\nassert normalize(" Ada ") == "ada"\nassert welcome(" Ada ") == "你好，ada"\nprint("检查通过")',output:'检查通过',trace:['第一条只验证 normalize。','第二条同时经过 welcome 和 normalize，检查它们协作。'],tryThis:'把 welcome 的结果改成不含“你好”，观察哪条断言失败。'}
    ]
  },
  12:{
    intro:'程序通过网络请求取得外部数据时，必须面对延迟、错误和格式变化。先把一次请求拆成几个步骤，再看并发。',
    sections:[
      {title:'HTTP 是请求与响应的约定',paragraphs:['客户端发送方法、地址和可选数据；服务端返回状态码与正文。GET 常用于读取，POST 常用于提交。200 类状态通常表示成功，404 表示资源未找到，500 类表示服务端处理失败。','状态码与正文需要分别检查。得到 200 不保证字段完整；拿到 404 也不应当假装返回空业务数据。'],code:'response = {"status": 200, "body": {"city": "上海"}}\nif response["status"] == 200:\n    print(response["body"]["city"])',output:'上海',trace:['先检查状态，再读取正文中的 city。','这是本地模拟响应，运行不依赖网络。'],tryThis:'把 status 改为 404，预测是否还会显示城市。'},
      {title:'解析 JSON 后仍要校验业务字段',paragraphs:['接口常用 JSON 传数据。json.loads 将文本变成字典或列表；接下来要检查字段存在、值不为 None、类型正确。','若服务端把 temperature 从数字改成文本，程序语法仍可能正确，却在运算时出错。这是接口契约问题，不是再多调用一次 json.loads 就能解决。'],code:"import json\nraw = '{\"temperature\": 23}'\ndata = json.loads(raw)\nvalue = data.get(\"temperature\")\nif isinstance(value, int):\n    print(value + 1)",output:'24',trace:['解析得到字典，get 取出字段。','确认整数后再计算；缺失或类型不同的情形应另作处理。'],tryThis:'把 JSON 的 23 改成带引号的 "23"，解释为何没有输出。'},
      {title:'超时、重试与重复提交',paragraphs:['网络可能一直等待，因此请求应设置超时。超时只说明客户端没有及时收到确定结果，不保证服务端没做事。','读取天气失败时重试通常较容易；创建订单、扣款等操作重试前要有幂等键或查询状态，否则可能重复提交。'],code:'attempts = 0\nmax_attempts = 3\nwhile attempts < max_attempts:\n    attempts += 1\n    print("尝试", attempts)\n    if attempts == 2:\n        break',output:'尝试 1\n尝试 2',trace:['第一次未满足退出条件。','第二次满足条件并 break；这只是本地模拟重试次数。'],tryThis:'把退出条件改成 attempts == 3，预测输出。'},
      {title:'并发解决等待，未必解决计算',paragraphs:['async/await 让一个任务等待网络时，其他任务能利用这段时间；它不会自动使纯计算变快。线程、进程、协程要根据任务类型选。','先把单次请求正确处理和错误路径写清楚，再引入并发。否则多个失败同时发生会更难调试。'],code:'import asyncio\nasync def fetch_example():\n    await asyncio.sleep(0)\n    return "模拟响应"\nprint(asyncio.run(fetch_example()))',output:'模拟响应',trace:['async def 定义协程函数。','await 在等待时让出执行机会；这里 sleep(0) 只作演示。'],tryThis:'说出这段示例为什么没有真正访问天气 API。'}
    ]
  },
  13:{
    intro:'自动化脚本的价值在于重复运行仍有可预期结果。把输入、清洗规则、输出和失败记录分开，才容易维护。',
    sections:[
      {title:'先画一条数据流水线',paragraphs:['例如整理销售 CSV：读取原文件 → 校验字段 → 清洗日期与金额 → 汇总 → 写新文件。每步都能单独检查，出错时才知道问题在哪。','保留原始输入，避免一次错误运行永久覆盖数据。统计成功和失败条数，让使用者知道结果是否完整。'],code:'rows = ["  Ada  ", "Lin", "  Ada  "]\ncleaned = [name.strip() for name in rows]\nprint(cleaned)\nprint(len(cleaned))',output:"['Ada', 'Lin', 'Ada']\n3",trace:['清洗后保留三条记录，并未自动去重。','记录数帮助你发现某一步是否意外丢数据。'],tryThis:'把空白字符串加进 rows，想想清洗后是否还应保留。'},
      {title:'正则是描述文本模式的工具',paragraphs:['正则表达式可找出符合规律的片段，比如连续数字。模式 \\d+ 表示一个或多个数字字符。它只匹配文本形状，不懂业务含义。','先用几个应该命中和不应该命中的样例验证。复杂的 JSON、HTML 等结构优先使用专门解析器。'],code:'import re\ntext = "订单 A123，金额 45"\nprint(re.findall(r"\\d+", text))',output:"['123', '45']",trace:['findall 在文本中找出两个连续数字片段。','它无法知道 123 是订单号、45 是金额；还需要上下文规则。'],tryThis:'加入订单 B7，预测结果列表。'},
      {title:'日期必须有格式与时区意识',paragraphs:['同样的 03/04 在不同地区可能表示三月四日或四月三日。strptime 要给明确格式，处理后得到 datetime 对象。','跨地区系统还需说明时区。没有时区信息的时间值可能无法和另一个地区的时间正确比较。'],code:'from datetime import datetime\nraw = "2026-10-25"\nday = datetime.strptime(raw, "%Y-%m-%d")\nprint(day.year)\nprint(day.month)',output:'2026\n10',trace:['格式中的 %Y 是四位年份、%m 是月份、%d 是日期。','原始字符串被解析成能进一步计算的日期时间值。'],tryThis:'把日期改成 "25/10/2026" 运行，观察格式不匹配时的异常。'},
      {title:'幂等性与输出策略',paragraphs:['同一批输入跑两次脚本，如果报表行数翻倍，使用者很难信任结果。幂等性要求重复执行有明确结果。写文件前决定覆盖、跳过还是追加，并写在说明里。','简单 CSV 转换先掌握标准库 csv；大量表格分析再考虑 pandas。工具要配合问题规模，而非越多越好。'],code:'data = ["a", "b", "a"]\nreport = sorted(set(data))\nprint(report)\nprint(report)',output:"['a', 'b']\n['a', 'b']",trace:['从同一输入重新计算，结果一致。','真正写文件时还需约定目标文件如何处理。'],tryThis:'想一想 append 模式写报表为何可能造成重复行。'}
    ]
  },
  14:{
    intro:'综合项目是把前面的知识用于一个完整需求。招聘者关注你能否说明问题、取舍和验证证据。',
    sections:[
      {title:'先写需求与验收条件',paragraphs:['“做一个待办工具”太模糊。改写为：“用户能新增任务、查看未完成任务、重启程序后仍能看到它们”。然后定义输入、输出、失败情况。','每个验收条件都应能演示。这样做项目时，才知道何时真的完成，而不是代码越写越多。'],code:'def normalize_title(text):\n    return text.strip()\nassert normalize_title("  买书  ") == "买书"\nprint("标题清洗符合约定")',output:'标题清洗符合约定',trace:['这里把“首尾空白去掉”变成可检查的约定。','下一步还可以规定空标题怎样处理。'],tryThis:'提出一个空字符串输入的验收条件。'},
      {title:'拆成可验证的小步',paragraphs:['可以先做内存里的新增与列表显示，再加 JSON 持久化，最后处理无效输入。每一步都保留能运行的版本。','Git 提交记录每一步的修改；提交说明要讲清做了什么。出现 bug 时可比较历史差异，而不必靠猜。'],code:'tasks = []\ntasks.append({"title": "买书", "done": False})\nprint(len(tasks))\nprint(tasks[0]["title"])',output:'1\n买书',trace:['先完成最小的数据模型。','文件保存和界面展示可以在下一小步加入。'],tryThis:'给任务增加一个优先级字段，思考默认值。'},
      {title:'README 与测试让别人能复现',paragraphs:['README 至少要写环境要求、启动命令、一个输入输出样例和测试方法。别人只看你的电脑上“能跑”不足以判断项目可用。','测试正常场景，也要测空值、重复值、坏输入。演示从真实输入走到可观察结果。项目限制也要说明，例如数据仅保存在本机。'],code:'def count_open(tasks):\n    return sum(not task["done"] for task in tasks)\nassert count_open([]) == 0\nassert count_open([{"done": False}]) == 1\nprint("边界已检查")',output:'边界已检查',trace:['空任务列表是边界测试。','一条未完成任务是基本场景。'],tryThis:'补一条已完成任务的断言，预期结果是什么。'},
      {title:'面试时讲清你的判断',paragraphs:['按“问题背景 → 你负责的目标 → 做出的选择 → 验证结果”讲一个项目。比如为什么先用 JSON 文件而不是数据库、如何处理脏数据、测试如何发现 bug。','不要只罗列使用的库。用一个具体缺陷与修复过程证明你理解自己的代码；说清目前的限制和下一步改进。'],code:'story = ["问题：手工记录会丢失", "方案：保存 JSON", "验证：重启后数据仍在"]\nfor part in story:\n    print(part)',output:'问题：手工记录会丢失\n方案：保存 JSON\n验证：重启后数据仍在',trace:['每一行对应一个可追问的事实。','面试时把事实换成你真实项目里的证据。'],tryThis:'为你的项目写出一句“遇到的 bug 与修复结果”。'}
    ]
  }
});
