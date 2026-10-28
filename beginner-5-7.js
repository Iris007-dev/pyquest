// 依照讲义第五至第七章的知识点顺序，用生活例子和可验证的小程序逐层解释。
window.PYQUEST_BEGINNER = Object.assign(window.PYQUEST_BEGINNER || {}, {
  '5:0': {
    plain: '变量像写在草稿纸上的临时答案；文件像保存在书包里的笔记，下次启动程序还能再读。',
    analogy: '做完作业关掉草稿纸，脑子里的临时数字就没了；把答案写进笔记本，明天还能翻出来。程序变量与磁盘文件也有这个区别。但电脑文件要有路径和格式，程序不会自动替你保管每一个变量。',
    steps: [
      {title: '先找文件，再选打开方式', text: 'open("note.txt", "r") 中第一个参数是文件路径，第二个是模式。r 表示读：文件不存在就会报 FileNotFoundError；w 表示写：文件已存在会先清空旧内容；a 表示追加：把新内容放到末尾。第一次练习不要用重要文件试 w。'},
      {title: '相对路径从哪里开始找', text: '"note.txt" 没写完整地址，叫相对路径。它通常从程序运行时的当前工作目录开始找，未必从这个 .py 文件所在目录开始。找不到文件时，先确认运行位置，再看文件名、大小写和扩展名。'},
      {title: '读和写做的是两种事', text: 'file.write("你好") 把文字写进去，返回写入的字符数；file.read() 把文件中的文字读出来，返回字符串。写入数字 12 前要先变成文字，或者选 JSON、CSV 等明确的数据格式。大文件适合逐行读取，避免一次把所有内容放进内存。'},
      {title: '让 with 帮忙关门', text: '打开文件像打开一扇门。with open(...) as file: 规定门在哪个缩进块内打开；离开这个块会调用关闭操作，就算中途发生异常也会清理。读写中文文本时明确写 encoding="utf-8"，减少不同电脑默认编码带来的问题。'},
      {title: '网页实验室的文件在哪里', text: '这里的 Python 在浏览器中运行。示例写的是浏览器运行环境里的文件，不是手机或电脑“下载”文件夹里的文件；刷新页面或重建运行环境后可能消失。需要长期保存真实文件时，请在本机 Python 环境练习。'}
    ],
    code: 'with open("note.txt", "w", encoding="utf-8") as file:\n    file.write("今天学会读写文件")\nwith open("note.txt", "r", encoding="utf-8") as file:\n    text = file.read()\nprint(text)',
    output: '今天学会读写文件',
    trace: ['第一次 with 用 w 创建或覆盖 note.txt，并写入一句话。', '离开第一个缩进块后文件关闭；第二个 with 用 r 重新打开同一文件。', 'read 得到字符串，最后 print 才把它显示在输出区。'],
    trap: '把 with 后面的缩进删掉会让代码块结构错误；把 w 当作“在旧文件末尾写”也会丢失原内容，追加要用 a。',
    tryThis: '把写入的文字换成你的名字，运行后观察读出的内容；再想想第二次运行时 w 会怎样处理旧内容。',
    check: {q: '为什么读取不存在的文件通常用 r 会报错，而用 w 可能不会？', answer: 'r 要先找到已有文件才能读；w 的任务是写，文件不存在时通常会创建它。'}
  },
  '5:1': {
    plain: '异常是程序执行时发出的“这里做不下去”信号；我们只接住自己知道怎样处理的情况。',
    analogy: '把写着“12件”的纸条交给只会读纯数字的机器，机器会说“格式不对”。这不是机器坏了，而是输入不合要求。try/except 像预先约定：如果遇到这种纸条，就请对方重新写数字。',
    steps: [
      {title: '先认清错误发生在什么时候', text: '漏写引号、冒号可能使代码连结构都不合法，常见的是 SyntaxError。int("12件") 的结构合法，但执行到转换时才失败，得到 ValueError。读报错时先看最后一行的异常名称，再找你代码里对应的行。'},
      {title: 'try 和 except 各管哪一段', text: 'try 放可能出错的几行，except ValueError: 放只处理数字格式错误的办法。如果 try 顺利完成，except 就跳过；如果出现匹配的异常，try 剩余语句不再继续，转去执行 except。不要把整个程序都塞进一个大 try，范围越小越容易定位。'},
      {title: 'else、finally 的时间点', text: 'else 只在 try 没抛异常时运行；finally 不论是否发生异常都会运行，常用于收尾。例如转数字成功后才计算金额可以放在 else；关闭某些资源放在 finally。初学先把 try/except 写对，再按需要加这两段。'},
      {title: 'raise 是主动报告问题', text: '若数量是 -3，int 可以转换成功，但业务规定数量不能负数。你可以写 raise ValueError("数量不能为负")，主动告诉调用者哪条规则被违反。错误消息应说清需要怎样改输入。'},
      {title: 'assert 用来检查程序自己的假设', text: 'assert condition 常用在调试和测试内部不应该失败的条件。优化运行模式下断言可能不执行，所以不应拿它校验用户输入；普通用户输错时应使用 if 判断并给出提示或 raise。'}
    ],
    code: 'text = "12件"\ntry:\n    number = int(text)\nexcept ValueError:\n    print("请输入纯数字，例如 12")\nelse:\n    print("数量是", number)\nfinally:\n    print("检查结束")',
    output: '请输入纯数字，例如 12\n检查结束',
    trace: ['int("12件") 不能把“件”当作整数的一部分，抛出 ValueError。', 'except ValueError 接住这个预料中的错误，显示清楚的提示；else 因失败而跳过。', 'finally 无论成功失败都执行，所以最后还有“检查结束”。'],
    trap: 'except Exception: pass 看似让程序不报错，实际上可能把拼错名字、写错逻辑等真正的 bug 也藏起来。',
    tryThis: '把 text 改成 "12"，先猜哪两行会显示，再运行核对；改成 "-3" 后想想“格式正确”和“业务允许”是否同一回事。',
    check: {q: '如果只想处理 int("十二") 的格式问题，except 后应写什么？', answer: '写 except ValueError，因为整数转换失败抛出的是 ValueError；这样别的错误仍会提醒你检查代码。'}
  },
  '6:0': {
    plain: '模块通常是一个装着代码的 .py 文件；import 让另一个程序用到里面的工具。',
    analogy: '你把画图工具放进“画图盒”，把计算工具放进“计算盒”。需要尺子时说“从计算盒取尺子”，不必把整套工具重新做一遍。模块名就是盒子名，点号表示从盒子里取某个名字；但模块不是只存代码的空盒子，导入时顶层语句会执行。',
    steps: [
      {title: 'import 后怎样使用', text: 'import math 会把 math 这个模块名放进当前程序。要用它的平方根函数就写 math.sqrt(81)，结果是 9.0。也能写 from math import sqrt，然后直接调用 sqrt(81)；初学时保留 math. 更容易知道工具来自哪里。'},
      {title: '导入时并非什么都不发生', text: '第一次导入模块时，Python 会运行它的顶层语句，建立函数和变量。若在顶层随手写 print("测试")，别人仅仅导入模块也可能看到这行输出。可复用功能通常放在函数中，演示调用则放在入口判断中。'},
      {title: '__name__ 是当前模块的名字', text: '直接运行一个文件时，它的 __name__ 是 "__main__"；别人 import 这个文件时，它的 __name__ 通常是模块名。if __name__ == "__main__": 因此适合包住“只在直接运行时执行”的演示代码，并不是神秘开关。'},
      {title: '找不到模块时按顺序检查', text: 'ModuleNotFoundError 可能是拼错名字、文件位置不在搜索路径中，或第三方包装到了另一个 Python 环境。先检查名字与当前解释器，再看文件位置；不要随手把自己的文件命名为 math.py、json.py，避免遮住同名标准库模块。'}
    ],
    code: 'import math\nprint(math.sqrt(81))\nprint(math.pi > 3)\nprint(__name__ == "__main__")',
    output: '9.0\nTrue\nTrue',
    trace: ['import math 后，math 这个模块名可供访问。', 'sqrt(81) 得到浮点数 9.0；pi 比 3 大，所以第二行是 True。', '实验室把本段当作直接运行的代码，因此 __name__ 是 "__main__"。'],
    trap: 'import math 之后不能直接写 sqrt(81)，除非你另外写了 from math import sqrt；也不要以为 import 只读取定义而绝不执行顶层语句。',
    tryThis: '把 81 换成 25，预测结果；再试着删除 math.sqrt 中的 math.，读懂出现的 NameError。',
    check: {q: '什么情况下 if __name__ == "__main__": 下面的语句会执行？', answer: '当前文件作为主程序直接运行时会执行；作为模块被别的文件导入时通常跳过。'}
  },
  '6:1': {
    plain: '包是用目录把相关模块放在一起，导入时就像顺着文件夹路径找工具。',
    analogy: '书柜叫 calc，里面有“加法”和“减法”两本小册子。calc.add 指明要找哪本，避免不同书柜里都有 add 时拿错。通常的 Python 包在书柜门口有 __init__.py；但 Python 还支持没有这张标识的特殊组织方式。',
    steps: [
      {title: '从一个文件到一组文件', text: '只有一个 add.py 时，可把它看成一个模块。若项目变大，把 add.py、subtract.py 放进 calc/ 目录，这个目录就用来组织相关模块。普通包常有 calc/__init__.py，即使文件暂时为空，也能让结构更明确。'},
      {title: '点号表示层级', text: 'import calc.add 中的点号是“先找包 calc，再找模块 add”。调用时可写 calc.add.add(2, 3)；也可以 from calc.add import add 后写 add(2, 3)。前面是位置路径，最后的 add 才是函数名字。'},
      {title: '为什么 __init__.py 有时没有', text: '普通包的 __init__.py 在导入包时参与初始化，也可暴露方便使用的名字。但 Python 也支持命名空间包，某些目录没有 __init__.py 仍可组成包。零基础先按普通包写，看到例外再了解规则，不要把“必须有”背成永远正确。'},
      {title: '目录存在不代表能导入', text: 'Python 只会在当前搜索路径中找模块和包。项目从不同位置启动，工作目录与搜索路径可能改变，所以同一文件在一个运行方式下能 import、换一种方式却找不到。先检查启动命令和项目结构，再修改导入写法。'}
    ],
    code: 'import json\nprint(json.__name__)\nprint(hasattr(json, "__path__"))\nprint(json.dumps({"score": 90}))',
    output: 'json\nTrue\n{"score": 90}',
    trace: ['json 是标准库里可导入的包；它组织了处理 JSON 的功能。', '包通常有 __path__ 属性，因此 hasattr 返回 True。', 'dumps 把字典转换成 JSON 文本，输出中键的双引号是 JSON 语法的一部分。'],
    trap: '不要把目录名、模块名、函数名混成一层；calc.add.add 里三个部分可以分别是包、模块、函数。',
    tryThis: '在纸上画 calc/__init__.py 和 calc/add.py，并用箭头标出 import calc.add 从哪里走到哪里。',
    check: {q: '目录里没有 __init__.py，就一定不能成为 Python 包吗？', answer: '不一定。普通包通常有 __init__.py，但 Python 也支持没有该文件的命名空间包。'}
  },
  '6:2': {
    plain: '标准库是 Python 随身带的工具箱；每个模块负责一类事情，先确定问题再挑工具。',
    analogy: '数学题拿尺子，抽签拿签筒，复制画纸要想清只是换一张外纸，还是里面每一页也重画。math、random、copy 等模块就像不同工具；拿错工具或没弄清复制层数，结果可能和想象不同。',
    steps: [
      {title: 'math、random 各做什么', text: 'math.sqrt(81) 求平方根 9.0；random.choice(["红","蓝"]) 从列表中抽一个。普通 random 适合游戏和模拟，不用于密码、验证码或安全令牌；安全用途应查 secrets。若想课堂上得到可重复的抽样，可设置种子，但真实随机结果不应事先写死。'},
      {title: 'time、sys 是观察环境的工具', text: 'time.sleep(1) 让程序暂停约 1 秒，不是“把时间变成 1 秒”；time.time() 给时间数值。sys.version 告诉你当前 Python 版本，sys.path 列出模块搜索位置。知道程序究竟在哪个环境运行，能帮助排查安装成功却导入失败的问题。'},
      {title: '浅复制与深复制', text: 'a = [[1]]; b = a 只是多一个名字，根本没有复制。copy.copy(a) 新建外层列表，但内层 [1] 仍共享；修改 b[0] 可能影响 a。copy.deepcopy(a) 尝试把里面的可复制对象也递归复制，适合确实需要独立嵌套数据的情况。'},
      {title: 're 是按规则找文字', text: 're.search(r"\\d+", "订单12件") 可以找连续数字，匹配到 "12"。这里 r 表示原始字符串，\\d 表示数字字符，+ 表示至少一个。正则表达式适合明确的文本模式；简单固定文字查找先用 in 或 find，更容易读。'},
      {title: '先写输入和输出再选模块', text: '例如“从名单里抽一个名字”的输入是姓名列表、输出是一个名字，才考虑 random.choice；“分离嵌套数据并修改”的输出要求两份互不影响，才考虑 deepcopy。不要先背一长串模块名，再为它们硬找用途。'}
    ],
    code: 'import copy\noriginal = [[1]]\nshallow = copy.copy(original)\ndeep = copy.deepcopy(original)\nshallow[0].append(2)\nprint(original)\nprint(deep)',
    output: '[[1, 2]]\n[[1]]',
    trace: ['copy.copy 只新建外层列表，原列表和 shallow 的第 0 项仍是同一张内层列表。', '向 shallow[0] 加入 2，original 的内层列表也跟着变。', 'deepcopy 创建了独立的内层列表，所以 deep 仍是 [[1]]。'],
    trap: '“赋值、浅复制、深复制”不是同一件事；也不要把 random.choice 的结果当成每次固定不变。',
    tryThis: '把 shallow[0].append(2) 改成 deep[0].append(2)，先猜两次 print 会怎样变化。',
    check: {q: '为什么对浅复制的内层列表 append 后，原列表也可能变化？', answer: '浅复制只新建外层容器，内层可变列表仍由两边共同引用。'}
  },
  '6:3': {
    plain: '路径告诉程序去哪里找文件；CSV、JSON、XML 是三种把数据写进文件的规则。',
    analogy: '路径像住址；CSV 像一张有行有列的点名表，JSON 像可以把“学生信息”和“成绩列表”套在一起的资料卡，XML 像一层层贴着标签的资料盒。它们都能装数据，但打开方式不同，程序不能把一张表当成另一种格式直接读。',
    steps: [
      {title: '先确定文件住址', text: 'os.getcwd() 可以查看当前工作目录，pathlib.Path("scores.csv") 表示相对于那里找文件。用 Path.exists() 能先检查文件是否存在；但“先检查后再打开”的间隙文件仍可能变化，真正读写时也要处理异常。路径分隔符和中文文件名在不同系统可能有差别，pathlib 帮你少手写。'},
      {title: 'CSV 是表格，读出来通常先是文字', text: 'CSV 的每行代表一条记录，逗号把列隔开。csv.reader 会处理字段里的引号和逗号；不要自己简单 split(",")，因为一个字段本身可能含逗号。读到 "90" 看起来是分数，其实仍是字符串，要计算先 int。'},
      {title: 'JSON 能套列表和字典', text: 'json.loads 把 JSON 文本读成 Python 对象，json.dumps 把 Python 对象写成 JSON 文本。JSON 的 true、false、null 会对应 Python 的 True、False、None；对象键名必须是双引号包着的字符串。解析成功只表示格式有效，还要检查字段是否存在、类型是否合理。'},
      {title: 'XML 用成对标签描述层级', text: '例如 <student><name>阿宁</name></student> 中，student 里面套着 name。标准库的 xml.etree.ElementTree 可以解析受信任的小型 XML 数据；处理来自陌生来源的 XML 时还要考虑安全限制。零基础先会分辨 XML 的形状，不必立刻背遍历复杂树的所有 API。'},
      {title: '讲义中的小拼写误差', text: '有些页把 CSV 写成 cvs，正确的文件格式缩写是 CSV，Python 模块名小写 csv。按任务选择格式：成绩表适合 CSV；嵌套配置适合 JSON；与特定 XML 系统交换时再用 XML。'}
    ],
    code: 'import csv, io, json\nrows = list(csv.reader(io.StringIO("name,score\\n阿宁,90")))\nprint(rows[1])\nrecord = json.loads(\'{"name":"阿宁","score":90}\')\nprint(record["score"] + 1)',
    output: "['阿宁', '90']\n91",
    trace: ['csv.reader 把第二行拆成两列，得到的 "90" 仍是文字，所以列表显示引号。', 'json.loads 将 JSON 的 score 数字 90 转成 Python 整数。', '整数加 1 得到 91；若直接对 CSV 的 "90" 加 1，会发生类型错误。'],
    trap: '能成功 json.loads 不代表一定有 score 字段；直接 record["score"] 在缺失时会抛 KeyError，需要按业务处理。',
    tryThis: '把 CSV 的 90 改成 85，再试着运行 int(rows[1][1]) + 1；解释为什么要先写 int。',
    check: {q: 'CSV 读出的 "90" 和 JSON 读出的 90，为什么相加时表现不同？', answer: 'CSV 默认把字段当文本；JSON 语法中的数字会解析成 Python 数字。'}
  },
  '6:4': {
    plain: '图片不只是文件名；真正的格式转换要改变图片的编码方式，Pillow 能帮你做这件事。',
    analogy: '把一本彩色书的封面贴成“黑白书”标签，书里的彩色页不会自动变黑白。把 photo.png 改名 photo.jpg 也是这样；真正转换需要打开原图，再按新格式重新保存。不同格式像不同的装订法，会影响透明背景、清晰度和文件大小。',
    steps: [
      {title: '先懂像素和透明', text: '图片由很多小点构成，每个点有颜色；有些图片还记录“这个点有多透明”的信息，叫透明通道。PNG 常能保留透明并采用无损压缩；JPEG 常用于照片，通常不保留透明，并会有损压缩。选择格式时先问用途，不是只看后缀。'},
      {title: 'Pillow 是另外安装的工具', text: 'Pillow 不是 Python 标准库。在本机终端可通过当前解释器对应的 pip 安装它，然后代码写 from PIL import Image。网页实验室没有为它提供图片上传和离线安装，因此这节的 Pillow 示例用于本机 Python；网站上的文字和练习仍可离线阅读。'},
      {title: '打开、修改、保存是三个动作', text: 'Image.open 读取并解码图片，resize、crop 等方法产生处理结果，save 用指定格式编码写出。只改文件名没有执行解码和重新编码。保存前要想好输出路径，最好保留原图副本，避免覆盖唯一的一张照片。'},
      {title: '从透明 PNG 变 JPEG 要先做决定', text: 'JPEG 通常没有透明通道。若原图有透明背景，转换前要选择铺白底、黑底或其他背景色；直接保存可能报错或丢失透明效果。还要检查图片方向、尺寸和画质，不要把“程序运行成功”等同于“图片看起来正确”。'}
    ],
    code: 'from PIL import Image\nimage = Image.new("RGBA", (2, 2), (255, 0, 0, 128))\nprint(image.size)\nprint(image.mode)',
    output: '(2, 2)\nRGBA',
    trace: ['Image.new 在内存中生成一张宽 2、高 2 像素的小图，没有读取用户文件。', 'RGBA 表示颜色通道加透明通道；最后一个 128 是半透明程度。', 'size 给出宽高，mode 说明这张图当前的像素模式。'],
    browser: false,
    trap: 'Pillow 的导入名是 PIL；在网页实验室直接运行会因没有这个第三方包而失败。改后缀也不会真正改变图片格式。',
    tryThis: '在安装 Pillow 的本机 Python 中，把 (2, 2) 改为 (10, 5)，预测 size，再运行核对。',
    check: {q: '为什么透明 PNG 不宜直接改名为 .jpg 就交给别人？', answer: '改名不会重新编码；JPEG 通常不保留透明信息，需要用图像工具选择背景并真正保存为 JPEG。'}
  },
  '6:5': {
    plain: '线程让程序在等待一件事时推进另一件事；它们共享数据，所以也要管好先后顺序。',
    analogy: '一个人洗衣服时等洗衣机转，可以去整理书桌。等待重叠会省总时间；但两个人同时在同一本账上改数字，就可能互相覆盖。线程适合许多“需要等”的任务，不能因为有两个人就断言所有计算都会快一倍。',
    steps: [
      {title: '先分清等待和计算', text: '下载网页、读网络文件经常要等外部响应，线程可利用等待时间处理别的工作。纯 Python 大量计算在常见 CPython 配置下未必因线程变快，还要考虑实现、版本和工作类型。先写顺序版，确认正确，再测量线程是否真的有收益。'},
      {title: '共享数据会带来竞争', text: '线程通常共享同一份变量。若两个任务都读到余额 10，各自加 1 后都写回 11，预期的 12 就丢了。这叫竞争；不要靠“我运行一次没出错”证明它安全。锁可以保护必须一起完成的读改写步骤。'},
      {title: '信号量像限流的门票', text: '如果同一时刻最多允许 3 个任务访问某个外部服务，可以用信号量控制进入人数。它和锁都控制并发，但锁常表示一次只许一个进入，信号量可允许指定数量。门票数量应按资源能力选择，更多线程不一定更好。'},
      {title: '线程池帮你管理任务', text: 'ThreadPoolExecutor 负责创建一定数量的工作线程。executor.map 会把函数应用到各输入，并按输入顺序给出结果；任务完成的真实时间顺序不一定相同。记得在退出 with 时等待和清理线程资源。'},
      {title: '网页和本机的限制不同', text: '当前浏览器内的 Python 基于 WebAssembly，标准库线程接口在这里不能按本机方式运行。因此这段线程池代码请在已安装 Python 的电脑上练习；网站示例仍可帮助你先弄懂任务与结果的关系。'}
    ],
    code: 'from concurrent.futures import ThreadPoolExecutor\n\ndef square(number):\n    return number * number\n\nwith ThreadPoolExecutor(max_workers=2) as pool:\n    results = list(pool.map(square, [2, 3, 4]))\nprint(results)',
    output: '[4, 9, 16]',
    trace: ['square 定义每个任务要做的事；[2, 3, 4] 是三个输入。', '线程池最多用 2 个工作线程安排任务，map 收集三个结果并保持输入顺序。', '最终列表是 2²、3²、4²；示例重在理解接口，小计算本身不会因此更快。'],
    browser: false,
    trap: '别用运行结果按顺序打印就推断线程实际按顺序执行；也别在网页实验室里试图启动本机线程。',
    tryThis: '在本机 Python 把输入改为 [1, 5, 10]，先算平方并预测输出，再运行。',
    check: {q: '下载三份文件和计算三个很大的纯 Python 数学题，哪种更可能从线程等待重叠中受益？', answer: '下载文件常要等待网络，线程可以趁等待推进别的下载；纯 Python 计算是否受益取决于运行环境，不能直接保证。'}
  },
  '7:0': {
    plain: '函数也能像数字一样交给别的函数；纯函数把输入变成结果，不悄悄改外面的东西。',
    analogy: '同一台“加工机器”可以换不同工具头：装上“乘 2”工具就翻倍，装上“加 1”工具就加一。把工具头交给机器，相当于把函数本身传进去；如果先启动工具再交过去，就交的是它算出的结果了。',
    steps: [
      {title: '函数名和函数调用不同', text: 'double 指函数这个值，double(3) 才是调用它并得到 6。apply(double, 3) 把“怎样算”的规则和数据分别传进去，apply 内部再执行 fn(value)。这是高阶函数：它接收或返回函数，并不是另一种魔法语法。'},
      {title: '纯函数看输入就能猜输出', text: 'double(3) 永远返回 6，且不修改外部列表或文件，这就是典型的纯函数。相同输入得到相同结果，测试时只需比较输入和返回值。print、读取文件等要和外界打交道的操作也有用，只是它们不是纯粹的计算。'},
      {title: '把计算和显示分开', text: 'return 把结果交回调用者，print 负责给人看。先写 total = add(2, 3)，再 print(total)，比让 add 自己到处打印更容易复用。你可以把计算部分写得清楚，最后在程序边界统一显示。'},
      {title: '什么时候不必写高阶函数', text: '如果只有一次简单计算，直接 double(3) 往往最清楚。多个操作有相同流程、只差处理规则时，再用 apply 这类结构。代码最重要的是让下一位读者看懂，而不是看起来高级。'}
    ],
    code: 'def double(value):\n    return value * 2\n\ndef apply(rule, value):\n    return rule(value)\n\nprint(apply(double, 3))\nprint(double(3))',
    output: '6\n6',
    trace: ['定义 double 和 apply 时尚未显示任何东西。', 'apply 收到的是函数 double 本身和数字 3，于是执行 double(3)。', '两次调用都得到返回值 6，外面的 print 才让结果可见。'],
    trap: 'apply(double(), 3) 会先调用 double，而 double 需要参数，因此这里就报错；传函数本身时不要加括号。',
    tryThis: '写一个 plus_one(value) 返回 value + 1，改成 apply(plus_one, 3) 并预测输出。',
    check: {q: 'apply(double, 3) 中传进去的是函数还是数字 6？', answer: '传进去的是函数对象 double；apply 内部调用它时才得到数字 6。'}
  },
  '7:1': {
    plain: '迭代器像一根会记住阅读位置的书签；next 每次把书签移到下一项。',
    analogy: '列表像一本能反复从第一页翻的书。iter(列表) 制作一根新书签，next 拿下一页的内容；走到末尾，这根书签不会自己回到第一页。若要重读，可以从原来的书再制作一根书签。',
    steps: [
      {title: '可迭代对象与迭代器', text: '列表、字符串等能用于 for，是可迭代对象。iter([10, 20]) 创建一个迭代器，里面记住现在取到哪里。列表本身没有因为你取走 10 就少一个元素；改变的是这根迭代器的当前位置。'},
      {title: 'next 一步只取一个', text: '第一次 next(cursor) 得到 10，第二次得到 20。第三次若没有提供默认值，会抛 StopIteration，意思是没有下一项。next(cursor, "结束") 则会在取完后返回“结束”，适合课堂观察。'},
      {title: 'for 在背后替你重复取', text: 'for item in items 会先拿到迭代器，再一次次取值；遇到结束信号就正常停下。因此平常遍历不需要手写 next。手写 iter/next 是为了看清 for 的工作方式，或者控制何时取下一项。'},
      {title: '不要期待旧书签自动复位', text: 'list(cursor) 会把这个迭代器剩余的元素一次取完。以后再对同一个 cursor 做 list 通常得到空列表。zip、生成器等也常按需取值；调试时先确认值是否已被消费。'}
    ],
    code: 'numbers = [10, 20]\ncursor = iter(numbers)\nprint(next(cursor))\nprint(next(cursor))\nprint(next(cursor, "结束"))\nprint(list(numbers))',
    output: '10\n20\n结束\n[10, 20]',
    trace: ['iter(numbers) 新建书签，原列表 numbers 仍有两个元素。', '两次 next 分别取 10 和 20；第三次已无元素，返回给定的默认文字。', '最后 print(numbers) 仍看到完整列表，说明消耗的是迭代器。'],
    trap: '同一个迭代器用完后，再写 for item in cursor 不会从头开始；需要重新 iter(numbers)。',
    tryThis: '把最后一行改成 print(list(cursor))，预测结果；再另建 cursor2 = iter(numbers) 比较。',
    check: {q: '为什么第三次 next(cursor, "结束") 没有报错？', answer: '因为提供了默认值，迭代器耗尽时 next 返回这个值；不提供默认值才会抛 StopIteration。'}
  },
  '7:2': {
    plain: 'yield 让函数每次交出一个结果后暂时停下，下次取值再从停下的地方继续。',
    analogy: '普通函数像一次把一筐苹果交给你，return 后工作结束。生成器像售货窗口，一次递出一个苹果，窗口里的工作人员记得做到哪一步。这个比喻只说明“逐个产出”，不代表普通函数一定要占很多内存。',
    steps: [
      {title: '看到 yield，先别急着找输出', text: '函数体里有 yield，调用它通常先得到生成器对象；里面的语句还没执行到第一处 yield。把 g = count() 写完，屏幕可能什么也不显示。直到 next(g) 或 for 遍历，函数体才开始推进。'},
      {title: '每次 next 停在 yield', text: '第一次 next 运行到 yield 1，把 1 交出去并暂停。第二次 next 从暂停位置继续，运行到 yield 2 再暂停。局部变量会随着生成器保留，所以可以逐步累加。'},
      {title: '结束时也有边界', text: '所有 yield 都走完后，再 next 会抛 StopIteration；for 会把这个结束信号当作正常完成。生成器不能自动倒带，想重来就重新调用生成器函数，得到新的对象。'},
      {title: '什么时候适合逐个产出', text: '读取很多行、按需生成数字时，不必先做出整个大列表，再交给调用者。生成器可按需要取值；但它仍会占用保存状态的内存，也可能因为外部资源变化而产生不同结果。先理解暂停与继续，再考虑性能。'}
    ],
    code: 'def count():\n    print("开始")\n    yield 1\n    print("继续")\n    yield 2\n\ng = count()\nprint("已创建")\nprint(next(g))\nprint(next(g))',
    output: '已创建\n开始\n1\n继续\n2',
    trace: ['g = count() 只创建生成器，所以先看到外面的“已创建”。', '第一次 next 执行内部“开始”，在 yield 1 暂停，外面的 print 再显示 1。', '第二次 next 从 yield 1 后继续，显示“继续”，然后交出 2。'],
    trap: 'count() 不是立刻返回 1；也不要以为 yield 1 和 yield 2 会在第一次 next 时一起执行。',
    tryThis: '在最末尾再加 print(next(g, "结束"))，预测会显示什么。',
    check: {q: '为什么“已创建”会比“开始”先显示？', answer: '创建生成器时函数体尚未真正运行；第一次 next 才进入函数并执行“开始”。'}
  },
  '7:3': {
    plain: '闭包是一个内层函数，外层函数结束后，它还能记住自己需要的外层名字。',
    analogy: '你做了一个计数器，把“目前数到几”装在它自己口袋里。把计数器交给别人后，制作它的人离开了，但每按一次按钮，计数器仍知道上一次是多少。这个口袋不是所有计数器共用的；每次制作可以得到一份新状态。',
    steps: [
      {title: '先看两层函数', text: '外层 make_counter 创建 count = 0，内层 tick 负责加一。外层最后 return tick，没有括号，返回的是函数本身；如果写 tick()，就会当场执行一次并交回结果。'},
      {title: '为什么外层结束还能记住', text: 'tick 里会用到外层的 count，Python 会让这份被需要的状态与返回的函数一起留着。a = make_counter() 后，多次 a() 都使用 a 自己记住的 count。再做 b = make_counter()，b 从 0 重新开始。'},
      {title: 'nonlocal 告诉 Python 要改哪一层', text: 'tick 若只有 print(count)，可读取外层名字；但 count += 1 是重新赋值，默认会被当作内层局部变量。nonlocal count 明确表示“更新最近外层函数的 count”。少了它，示例里的加一会抛 UnboundLocalError。'},
      {title: '什么时候用闭包', text: '少量固定配置或小计数器很适合闭包，例如 make_multiplier(3) 生成一个记住倍数 3 的函数。状态越来越多、操作越来越复杂时，类可能更容易组织。先把外层输入、内层引用、返回的对象三个位置画清楚。'}
    ],
    code: 'def make_counter():\n    count = 0\n    def tick():\n        nonlocal count\n        count += 1\n        return count\n    return tick\n\na = make_counter()\nprint(a())\nprint(a())',
    output: '1\n2',
    trace: ['make_counter 创建 count=0，返回 tick 函数对象。', '第一次 a() 执行 tick，nonlocal 让外层 count 更新为 1。', '第二次 a() 继续用同一份 count，更新为 2。'],
    trap: 'return tick 和 return tick() 完全不同；另外，省掉 nonlocal 后 count += 1 不会自动“聪明地”更新外层变量。',
    tryThis: '再写 b = make_counter(); print(b())，先猜新计数器会输出 1 还是 3。',
    check: {q: '为什么第二次调用 a() 得到 2，而不是又得到 1？', answer: 'a 记住并持续更新创建时那一份外层 count；第一次调用后它已变成 1。'}
  },
  '7:4': {
    plain: '装饰器给原函数包一层额外工作；调用时先经过外层，再进入原函数。',
    analogy: '把一份作业交给老师前，值日生先登记“收到”，老师批改后再登记“完成”，最后仍把成绩交还给你。登记程序不需要改动老师批改的核心方法；但包装者必须把真正的成绩交回，否则你只能拿到空结果。',
    steps: [
      {title: '装饰器先接收函数', text: 'announce(fn) 的 fn 是被包装的函数对象。它定义 wrapped，在 wrapped 里先做额外工作，再调用 fn。最后 return wrapped 是把新的函数交回去，而不是立刻执行 wrapped。'},
      {title: '@ 写法什么时候发生', text: '@announce 写在 double 定义上面，可理解为定义完 double 后做 double = announce(double)。这一步在函数定义执行时发生，得到包装后的函数；以后每次 double(3) 才运行 wrapped 里面的语句。'},
      {title: '返回值必须走完整条路', text: '若原函数 fn(x) 返回 6，wrapped 也要 return 这个结果。只写 fn(x) 而没有 return，wrapped 的返回值就是 None。外面的 print 就会看到 None，虽然原函数算出了 6。'},
      {title: '多个参数和函数名字怎么办', text: '通用包装器常写 *args、**kwargs 把原函数参数继续传下去。functools.wraps(fn) 可保留原函数名称、文档等信息；初学先用一个参数看清流程，再扩展到通用写法。'},
      {title: '常见用途', text: '日志、计时、缓存或权限检查都可以包在函数外层。但给简单函数层层包裹也会让调用路径难追踪；每次要能回答：现在调用的是包装函数还是原函数、结果在哪里返回。'}
    ],
    code: 'def announce(fn):\n    def wrapped(value):\n        print("准备计算")\n        result = fn(value)\n        print("计算完成")\n        return result\n    return wrapped\n\n@announce\ndef double(x):\n    return x * 2\nprint(double(3))',
    output: '准备计算\n计算完成\n6',
    trace: ['定义 double 时，@announce 把 double 交给 announce，并把 wrapped 绑定回名字 double。', '调用 double(3) 先进入 wrapped，打印“准备计算”，再让原函数算出 6。', 'wrapped 打印“计算完成”并返回 6；最外层 print 最后显示 6。'],
    trap: '装饰器本身不是每次调用才重新定义；忘记在 wrapped 中 return 会让最终结果变成 None。',
    tryThis: '删去 wrapped 里的 return result，预测三行输出的最后一行会变成什么。',
    check: {q: '为什么 @announce 后仍能写 double(3)，却先看到“准备计算”？', answer: '名字 double 已指向装饰器返回的 wrapped，调用先经过包装层，然后它再调用原函数。'}
  }
});
