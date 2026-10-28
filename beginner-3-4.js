// 面向第一次接触编程的读者：一小步、一组真实数据、一个可核对的结果。
window.PYQUEST_BEGINNER = Object.assign(window.PYQUEST_BEGINNER || {}, {
  '3:0': {
    plain:'程序的“流程”就是：先做哪件事，遇到不同情况走哪条路，什么时候停下。',
    analogy:'想象去学校：先背书包、再出门，这是顺序；下雨就带伞，没下雨就不带，这是选择；每天上课前都检查书包，这是重复。流程图只是把这些决定画成箭头，箭头指向下一步，不需要画得漂亮。',
    steps:[
      {title:'先说清输入和结果',text:'写程序前先问“我手里有什么”和“最后想得到什么”。例如成绩判定的输入是一个分数，结果是“合格”或“继续练习”。如果输入可能是“六十分”这样的文字，还要决定是否接受，不能偷偷当成数字。'},
      {title:'顺序：从上到下',text:'没有条件和循环时，Python 通常按行往下执行。先令 score = 72，再判断 score >= 60；把顺序反过来，判断时 score 还没有值，就会报 NameError。纸上画箭头可以帮助你看见这个先后关系。'},
      {title:'选择：条件回答真或假',text:'菱形判断框可以写“分数是否至少 60？”；答案只有 True 或 False，两条箭头分别去往不同处理。“分数怎么样？”不能直接成为程序条件，因为计算机不知道怎样回答。'},
      {title:'重复：每次都要接近结束',text:'如果要检查一批分数，就对每个分数重复同样的判断。画流程时还要写清“还有下一个吗”，否则箭头可能一直绕圈。顺序、选择、重复可以组合，但先把一个分数的流程讲清再处理一批。'}
    ],
    code:`score = 72
print("拿到分数：", score)
if score >= 60:
    print("合格")
else:
    print("继续练习")
print("判断结束")`,
    output:`拿到分数： 72
合格
判断结束`,
    trace:['第 1 行把 72 保存给 score；第 2 行先显示输入，所以输出的第一行是“拿到分数： 72”。','72 >= 60 为 True，程序沿着 if 的路线走，显示“合格”；else 下面的文字不会显示。','两条路线汇合后继续向下，最后显示“判断结束”。'],
    trap:'流程图不是照着代码画装饰图；如果漏画错误输入或结束条件，代码仍可能在真实数据上出问题。',
    tryThis:'把 72 改成 59，先在纸上画出会经过的路线，再运行核对输出会换成哪一句。',
    check:{q:'为什么“分数怎么样？”不能直接放进判断框？',answer:'它没有明确的真假标准。改成“分数是否至少 60？”后，计算机才能根据分数得到 True 或 False。'}
  },
  '3:1': {
    plain:'if 像岔路口：条件成立就走这一条；不成立才去看下一条。',
    analogy:'门卫先问“你有入场券吗”，有就进去；没有再问“你有邀请函吗”，有也能进去；两样都没有就走访客通道。if、elif、else 就是这样的依次检查。前面的门已经放行，就不会又去走后面的门。',
    steps:[
      {title:'条件后面的冒号和缩进',text:'if score >= 90: 的条件会算成 True 或 False。冒号表示“接下来是这一条路线的动作”，缩进的行才属于它。结束缩进后，代码回到公共路线。Python 用缩进认路，不要只靠肉眼觉得某行“挨得近”。'},
      {title:'elif 只有前面没选中才检查',text:'score = 95 时，先检查 >= 90，已经成立，后面的 elif score >= 60 不再检查。若把 >= 60 写在前面，95 会被它先接住，永远到不了“优秀”分支。范围较窄的条件通常要放在前面。'},
      {title:'else 处理剩下的情况',text:'else 不需要再写条件；它接住前面的 if 和所有 elif 都不成立的输入。以 60 为边界时，59 走 else，60 走“合格”，90 走“优秀”。三个数都试一遍，比只试 75 更能发现写错的 >= 或 >。'},
      {title:'嵌套是“进门后再问一次”',text:'一个 if 的缩进块里可以再写 if。比如先确认成绩合格，再问是否做完作业。内层判断只会在外层成立后执行；如果嵌套太深，读起来会累，可以先画出两层问题再写。'}
    ],
    code:`score = 95
homework_done = True
if score >= 90:
    if homework_done:
        print("优秀且作业完成")
    else:
        print("优秀，但补交作业")
elif score >= 60:
    print("合格")
else:
    print("继续练习")`,
    output:'优秀且作业完成',
    trace:['95 >= 90 为 True，因此进入第一个 if；后面的 elif 和 else 都跳过。','内层检查 homework_done，它是 True，显示“优秀且作业完成”。','内层 else 和外层其他路线都不执行，整段程序只显示这一行。'],
    trap:'条件里的 == 是“比较是否相等”，= 是赋值；if 后面不能用 = 来比较。另一个常见错误是把 60 分写成 > 60，使正好 60 分掉到 else。',
    tryThis:'分别把 score 改成 60、59，再把 homework_done 改成 False；每次先判断会走哪一支，最后运行。',
    check:{q:'为什么 score = 95 时，不会再进入 elif score >= 60？',answer:'if 和 elif 是同一组互斥路线。第一个 if 已经成立，Python 不会继续检查这一组后面的条件。'}
  },
  '3:2': {
    plain:'all 问“是不是每个都合格”；any 问“是不是至少一个合格”。',
    analogy:'检查全班是否每人都带了铅笔，只有所有人都带才回答“是”，这像 all。找班里有没有一个人带橡皮，只要找到一个就回答“有”，这像 any。它们接收一批真假结果，不是替你猜测业务规则。',
    steps:[
      {title:'先让每项检查产生真假',text:'表达式 q >= 0 会针对一个数量给出 True 或 False。写 (q >= 0 for q in quantities) 时，意思是依次检查数量；all 会逐个取这些检查结果，遇到一个 False 就知道答案是 False。'},
      {title:'all 与 any 的差别',text:'对 [True, True, False]，all 是 False，因为有一项没通过；any 是 True，因为至少有一项通过。any 一遇到 True 就能停，all 一遇到 False 就能停，这叫“足够确定时不再往后看”。'},
      {title:'空列表是容易误会的边界',text:'all([]) 返回 True，意思是“没有发现反例”；any([]) 返回 False，意思是“没找到任何例子”。如果商店规定订单必须至少有一件商品，不能只写 all(...)，还要先检查列表非空。数学上的结果和业务上的“允许下单”是两层问题。'},
      {title:'拿真实问题来读代码',text:'如果数量列表是 [2, 0, 3]，都没有负数，所以 all(q >= 0 for q in quantities) 为 True。若数量列表是 [2, -1, 3]，第二项不合格，结果是 False。先写出每项真假，再求总体答案。'}
    ],
    code:`quantities = [2, 0, 3]
print(all(q >= 0 for q in quantities))
print(any(q == 0 for q in quantities))
print(all([]))
print(any([]))`,
    output:`True
True
True
False`,
    trace:['第一项检查每个数量是否非负：2、0、3 都通过，所以 all 得到 True。','第二项找有没有数量恰好为 0；找到了，any 得到 True。','最后两行没有任何元素可检查：all([]) 是 True，any([]) 是 False。'],
    trap:'all([]) 为 True 不能说明“确实检查过一批合格商品”；它也可能说明根本没有商品。若业务要求至少一项，要额外检查数量列表是否为空。',
    tryThis:'把 0 改成 -1，再预测前两行；接着把 quantities 改成 []，思考怎样表示“空订单不通过”。',
    check:{q:'“至少一个数量为 0”应该用 all 还是 any？',answer:'用 any，因为找到一个数量等于 0 就够了；all 要求每个数量都等于 0。'}
  },
  '3:3': {
    plain:'for 会把一批东西一个个拿出来；range 给出数字序列；enumerate 同时给编号和内容。',
    analogy:'值日生逐个点名，就像 for name in names。老师发座位号 0、1、2，就像 range(3)。一边看座位号一边说出学生姓名，就像 enumerate(names)。座位号是位置，姓名是内容，别把它们当成同一件事。',
    steps:[
      {title:'for 每轮拿一个值',text:'for amount in [10, 20, 5]: 的第一轮 amount 是 10，第二轮是 20，第三轮是 5。冒号下缩进的语句每轮都做一次。列表取完后自动停止，不需要自己写“还有没有下一项”。'},
      {title:'累计值要在循环外准备',text:'total = 0 放在循环前，第一轮加 10 得 10，第二轮再加 20 得 30，第三轮加 5 得 35。若 total = 0 放到循环里面，每一轮都清零，最后只能得到最后一项附近的结果。'},
      {title:'range 的终点取不到',text:'range(3) 产生 0、1、2，刚好三个数；range(1, 4) 产生 1、2、3。它像从第一个刻度走到终点前一格。range 不会自动把所有数字打印出来，通常要放进 for 或 list 里取出。'},
      {title:'enumerate 把位置和值打包给你',text:'for index, name in enumerate(names, start=1): 会给出 (1, 第一个名字)、(2, 第二个名字)。start=1 只是显示编号从 1 开始，不会改变原列表真正的索引；原列表的第一项仍是 names[0]。'}
    ],
    code:`amounts = [10, 20, 5]
total = 0
for number, amount in enumerate(amounts, start=1):
    total += amount
    print("第", number, "笔后：", total)
print(list(range(1, 4)))`,
    output:`第 1 笔后： 10
第 2 笔后： 30
第 3 笔后： 35
[1, 2, 3]`,
    trace:['循环前 total 为 0；enumerate 第一轮给 number=1、amount=10，所以累计成 10。','第二、三轮分别加 20 和 5，累计值依次变成 30、35。','循环结束后，range(1, 4) 只含 1、2、3，右端 4 不在其中。'],
    trap:'enumerate 的编号不是数据本身；range(4) 运行四轮，但产生的数是 0、1、2、3，不含 4。',
    tryThis:'把 amounts 改成 [4, 6]，先写出每轮的 number、amount、total，再运行核对。',
    check:{q:'为什么 total = 0 要写在 for 前面？',answer:'总额要保留上一轮的结果。如果把它放进循环体，每轮都会重新变成 0，前面的累计就丢了。'}
  },
  '3:4': {
    plain:'continue 是“这一轮先跳过”；break 是“整段循环到此结束”。',
    analogy:'翻看一叠卡片：遇到空白卡，放一边继续看下一张，这像 continue；找到目标卡后停止翻整叠，这像 break。两者都会跳过后面尚未执行的本轮语句，但 break 连下一轮也不再开始。',
    steps:[
      {title:'先判断再决定是否显示',text:'循环里先写 if number == 2: continue，数字 2 就不会到达后面的 print。其他数字照常显示。读程序时沿着本轮路线画箭头，不要以为 continue 只是“空着不做事”，它会直接跳到下一轮。'},
      {title:'break 让循环彻底停止',text:'遇到 number == 4 执行 break 后，循环体后面的 print 不执行，5 也没有机会进入循环。它只退出当前所在的那一层循环；若外面还有一个循环，外层仍可以继续。'},
      {title:'循环的 else 何时运行',text:'for 或 while 后面可以写 else：循环正常走完、没有被 break 截断时运行它。如果循环一开始就没有元素，也属于正常走完。它不是 if 的另一条分支。'},
      {title:'while 中要防止原地打转',text:'若用 while 控制数字变化，continue 前必须确认计数器已经更新；否则可能一直碰到同一个数字，反复跳过而无法结束。for 从现成序列逐个取数，一般没有这个特定问题。'}
    ],
    code:`for number in [1, 2, 3, 4, 5]:
    if number == 2:
        continue
    if number == 4:
        break
    print(number)
else:
    print("全部看完")
print("循环之后")`,
    output:`1
3
循环之后`,
    trace:['number=1 时没有命中 continue 或 break，所以显示 1。','number=2 时 continue 跳到下一轮；number=3 正常显示 3。','number=4 时 break 结束整个循环，5 没被检查；因为发生了 break，循环 else 不运行，最后显示“循环之后”。'],
    trap:'break 不能自动退出所有嵌套循环。循环 else 也不是“条件为假才运行”，关键是本次循环有没有被 break 截断。',
    tryThis:'把 if number == 4 改成 if number == 9，预测循环 else 会不会显示，再运行验证。',
    check:{q:'遇到空白记录想跳过它，但继续处理后面的记录，该用哪个词？',answer:'用 continue，它只结束当前这一轮。break 会连后面的记录也不处理。'}
  },
  '3:5': {
    plain:'while 的意思是“条件还成立，就再做一轮”；每轮开始前都重新检查。',
    analogy:'你往水杯里加水：“只要水还没到刻度线，就再倒一点”。每倒一次都要重新看刻度，这像 while。若杯子一开始就满了，一次也不倒；若永远不让水位变化，就会一直重复。',
    steps:[
      {title:'先准备会变化的状态',text:'例如 count = 0 表示还没做；while count < 3 表示“还没做到三次”。写循环前找出三个东西：初始值是什么、每一轮怎样变化、什么情况让条件变成 False。少一个就容易写成死循环。'},
      {title:'条件在每轮开始前检查',text:'第一次检查 0 < 3 为 True，做第一轮。更新为 1 后再检查 1 < 3，继续；更新到 3 后，3 < 3 为 False，马上离开。条件变为假时不会再多执行一次。'},
      {title:'何时用 while，何时用 for',text:'已经有一批元素要逐个处理，for 更直接；不知道需要尝试几次、但知道停止条件时，while 更自然。两种写法都可以表达重复，选择能让“什么时候结束”最清楚的那一种。'},
      {title:'用纸笔逐轮追踪',text:'画三列：本轮开始的 count、条件真假、轮末的新 count。若修改的是别的变量，却没有改变判断条件，下一轮可能还会得到同一个 True。不要依赖实验室的超时提醒帮你结束程序。'}
    ],
    code:`count = 0
while count < 3:
    print("开始第", count + 1, "轮")
    count += 1
print("结束时 count =", count)`,
    output:`开始第 1 轮
开始第 2 轮
开始第 3 轮
结束时 count = 3`,
    trace:['count 从 0 开始；0 < 3 成立，显示第 1 轮，然后 count 变成 1。','第二、三轮开始分别是 1 和 2，显示第 2、3 轮，各自再加 1。','count 到 3 后，3 < 3 不成立，循环结束，最后一行显示 3。'],
    trap:'while 后面的条件如果一开始就是 False，循环体会执行 0 次。把 count += 1 忘掉，条件可能永远为 True。',
    tryThis:'把条件改成 count < 5，预测会多出哪两行；再把初值改成 5，预测会不会进入循环。',
    check:{q:'为什么 while count < 3 最后能停？',answer:'每轮都有 count += 1，让 count 从 0 走到 3；到 3 时条件 3 < 3 为 False。'}
  },
  '3:6': {
    plain:'嵌套循环就是一个循环里面再放一个循环：外层走一步，内层走完一轮。',
    analogy:'有 2 排座位，每排 3 个。你先站在第一排，数第 1、2、3 个座位；再到第二排，重新数第 1、2、3 个。外层控制“第几排”，内层控制“这一排的第几个”。总共看了 2×3=6 个座位。',
    steps:[
      {title:'看缩进，找内外层',text:'for row in range(1, 3) 是外层，执行 2 次。缩进下的 for seat in range(1, 4) 是内层；每当外层给出一排，它从头给出 1、2、3。print 若在内层，就执行 6 次。'},
      {title:'逐轮画一个小表格',text:'外层第 1 轮对应 (1,1)、(1,2)、(1,3)；外层第 2 轮对应 (2,1)、(2,2)、(2,3)。把每对数字写出来，比在脑中同时记两个计数器稳得多。'},
      {title:'变量放哪一层会改变结果',text:'如果要统计所有座位，总数 total = 0 应放在两层循环外。若把 total = 0 写在外层里面，每换一排就清零，最后只得到最后一排的数量。若要“每排小计”，才在每次外层开始时重置。'},
      {title:'真正的任务与运行次数',text:'表格的每个单元格、两个名单的所有配对都能用嵌套循环。冒泡排序还会比较相邻元素，但不能只看见两层循环就直接认定次数：要数清每层实际走多少步，再谈效率。'}
    ],
    code:`total = 0
for row in range(1, 3):
    for seat in range(1, 4):
        total += 1
        print(row, "排", seat, "号")
print("共有", total, "个座位")`,
    output:`1 排 1 号
1 排 2 号
1 排 3 号
2 排 1 号
2 排 2 号
2 排 3 号
共有 6 个座位`,
    trace:['row=1 时，内层 seat 依次取 1、2、3，显示第一排三个座位，total 从 0 到 3。','row=2 时，内层重新从 1 开始，又显示三个座位，total 从 3 到 6。','内层和外层都结束后，最后显示总数 6。'],
    trap:'内层不是和外层“轮流走一步”；每一次外层迭代都会让内层重新开始。总计数器若放错层，会被反复清零。',
    tryThis:'把内层的 range(1, 4) 改成 range(1, 3)，先写出四对“排、号”，再运行核对总数。',
    check:{q:'外层 2 次、内层每次 3 次，内层的 print 共执行几次？',answer:'2×3=6 次，因为外层的每一次都会完整运行内层的 3 次。'}
  },
  '3:7': {
    plain:'条件表达式把简单的“二选一”写成一个值；海象运算符 := 能一边计算一边给结果取名。',
    analogy:'选择午餐时说“如果下雨就吃室内餐，否则去野餐”，这是二选一。先数好人数，再决定用大桌还是小桌，是“数一下并把人数记下来”，这接近 :=。简写能少写几行，但说话若太绕，还是拆成两句更清楚。',
    steps:[
      {title:'条件表达式的阅读顺序',text:'label = "合格" if score >= 60 else "继续练习"。先看中间的条件；真时取前面的“合格”，假时取后面的“继续练习”。它产生一个值并交给 label，不是把两段完整代码都执行一遍。'},
      {title:'普通 if 比简写更适合多步操作',text:'若合格时要记分、发消息、保存记录，就写正常的 if/else 缩进块。条件表达式适合两个简短的结果；嵌套好几个会让读者难以看清谁对应哪个 else。'},
      {title:':= 把中间结果留下来',text:'if (size := len(names)) >= 3: 先算 len(names)，把结果绑定到 size，再比较是否至少 3。之后还能用 size 显示人数。圆括号有助于看清先算什么；零基础完全可以先写 size = len(names)，下一行写 if size >= 3。'},
      {title:'不要把两个等号混淆',text:'= 是普通赋值语句里的赋值符号，:= 是表达式中绑定名字，== 是比较两个值是否相等。它们长得相似却做不同的事。读别人的代码时，先把简写展开成多行，再追踪结果。'}
    ],
    code:`score = 61
label = "合格" if score >= 60 else "继续练习"
print(label)
names = ["阿宁", "小林", "小周"]
if (size := len(names)) >= 3:
    print("需要大桌，人数：", size)`,
    output:`合格
需要大桌，人数： 3`,
    trace:['score 是 61，61 >= 60 为 True，条件表达式选前面的“合格”。','len(names) 得到 3；:= 同时让 size 记住这个 3。','3 >= 3 为 True，于是进入 if 并显示人数 3。'],
    trap:'把“真时值 if 条件 else 假时值”错读成普通 if 的排列；或者为了一行短代码，把多层业务规则塞进条件表达式。',
    tryThis:'把 score 改成 59、删掉一个姓名，各预测哪一行会消失或改变，再运行。',
    check:{q:'if (n := len(names)) > 0 中的 n 得到什么？',answer:'先计算 len(names)，再把这个长度绑定给 n，最后比较 n 是否大于 0。'}
  },
  '3:8': {
    plain:'推导式是把“逐个取出、可选地筛选、生成结果”写成紧凑的一行。',
    analogy:'把一篮苹果逐个拿出：只挑红苹果，再给每个贴上“已检查”标签，放入新篮子。for 是逐个拿，末尾的 if 是筛选，最前面的表达式是放入新篮子的结果。先会用普通循环做，才容易读懂缩写。',
    steps:[
      {title:'从普通循环走到列表推导式',text:'普通写法是 result=[]，然后 for x in numbers:，再 result.append(x*2)。[x*2 for x in numbers] 只是把这三步压在一行，得到一个新列表。原 numbers 不会因为这个写法自动改变。'},
      {title:'筛选条件放在后面',text:'[x*2 for x in numbers if x > 0] 的阅读顺序是：取一个 x，若它大于 0，就计算 x*2 并放入新列表。负数不进入结果。先写出输入中哪些元素保留，再算每个输出。'},
      {title:'括号形状决定结果种类',text:'[... ] 是列表推导式；{x: x*2 for x in numbers} 是字典推导式；{x*2 for x in numbers} 是集合推导式，集合会去重。圆括号 (x*2 for x in numbers) 是按需取值的生成器表达式，不是元组。'},
      {title:'生成器的值在取用时产生',text:'创建 g = (x*2 for x in numbers) 不会立刻生成整张结果列表；list(g) 才依次取出并放入列表。再对同一个 g 做 list(g) 通常得到空列表，因为它已经用完。复杂嵌套推导式不易读时，拆成普通 for 更好。'}
    ],
    code:`numbers = [1, 2, 2, -1]
print([x * 2 for x in numbers if x > 0])
print({x: x * 2 for x in numbers if x > 0})
print(sorted({x * 2 for x in numbers if x > 0}))
g = (x * 2 for x in numbers if x > 0)
print(list(g))
print(list(g))`,
    output:`[2, 4, 4]
{1: 2, 2: 4}
[2, 4]
[2, 4, 4]
[]`,
    trace:['只保留大于 0 的 1、2、2；列表逐个乘 2，所以保留重复的 4。','字典键 2 重复时后一次写入同一键；集合也去掉重复值，再 sorted 才稳定显示顺序。','生成器第一次被 list(g) 取完，第二次就没有剩余值。'],
    trap:'推导式前面的圆括号不是元组；(x for x in values) 是生成器。集合不保证输出顺序，演示时用 sorted 只是为了方便核对。',
    tryThis:'把筛选条件 x > 0 改成 x >= 0，再往 numbers 加一个 0，预测五行输出哪些会变。',
    check:{q:'为什么例子中第一个结果有两个 4，而集合结果只有一个 4？',answer:'列表保留重复元素；集合只保存不重复的元素。两个 2 都乘成 4，列表留下两份，集合只留一份。'}
  },
  '4:0': {
    plain:'函数就是给一段工作取名字，调用时把这一次要处理的数据交给它。',
    analogy:'把“算商品小计”写成一张说明卡：给它单价和件数，它交回小计。卡片的标题相当于函数名，空着的“单价、件数”相当于参数；真正拿 4 元和 3 件来用卡片，就是调用。写好卡片时还没有算任何一单。',
    steps:[
      {title:'def 先定义，括号才调用',text:'def subtotal(price, count): 开始定义函数；缩进块说明如何计算。Python 运行到 def 时会建立这个函数，但不会执行函数体里的计算。写 subtotal(4, 3) 才把 price=4、count=3 带进去执行。'},
      {title:'形参和实参各是什么',text:'定义时写的 price、count 是等待数据的参数位置；调用时给出的 4、3 是这次具体的值。下一次调用 subtotal(5, 2) 会使用另一组值，每次调用有自己的局部变量。'},
      {title:'一次只做一件清楚的事',text:'函数名 subtotal 说明它算小计；输入、输出都明确。函数内部可以有多行，但不要同时承担“读取键盘、算钱、写文件、打印广告”等很多职责。拆清楚后，同一段计算能在不同地方复用并单独检查。'},
      {title:'类型标注是提示',text:'def subtotal(price: int, count: int) -> int: 可以告诉读者预期用整数并返回整数。普通 Python 不会因为这段标注就自动拒绝所有错误类型；仍要靠测试或主动校验。刚入门可以先不写标注，把调用和返回学稳。'}
    ],
    code:`def subtotal(price, count):
    answer = price * count
    return answer
print(subtotal(4, 3))
print(subtotal(5, 2))`,
    output:`12
10`,
    trace:['前三行定义函数。定义时没有输出，也没有计算某个具体订单。','subtotal(4, 3) 把 4 给 price、3 给 count，算出 12 并返回，所以第一行显示 12。','第二次调用使用 5 和 2，单独算出 10，和第一次互不干扰。'],
    trap:'只写 subtotal 是拿到函数本身，不是执行；要写 subtotal(...) 才调用。函数体必须正确缩进，return 的位置也会决定何时结束。',
    tryThis:'把第一笔订单的件数 3 改成 5，预测哪一行输出变化，哪一行不变。',
    check:{q:'写完 def subtotal(...): 为什么没有马上显示 12？',answer:'def 只是定义“怎样算”；直到调用 subtotal(4, 3) 时，函数才得到具体数字并执行。'}
  },
  '4:1': {
    plain:'print 是“给人看”，return 是“把结果交回调用函数的程序”。',
    analogy:'你请同学算 2+3。同学大声说“5”，你听见了，却没有拿到一张可继续计算的纸条，这像 print。同学把写着 5 的纸条交给你，你可以再加 10，这像 return。程序自动判题通常要拿到纸条。',
    steps:[
      {title:'print 只负责显示',text:'函数里 print(a+b) 会让输出区出现数字，但调用表达式本身的结果仍可能是 None。若写 value = 函数调用，再打印 value，可能先看到数字、后看到 None。看到输出不等于函数交回了值。'},
      {title:'return 让调用处得到结果',text:'return a+b 会把计算值交给调用者。total = add(2, 3) 后，total 是 5，因此还可以写 total + 10 得到 15。函数可以返回文字、列表等其他值，不限于数字。'},
      {title:'return 一执行，本次函数结束',text:'若函数先判断 n < 0 并 return 0，那么负数不会继续执行下面的计算。这个“提前返回”常用于处理特殊输入。没有执行到显式 return 的函数，返回值是 None。'},
      {title:'按题目需要选择',text:'题目要求“显示一句问候”时可以 print；要求“返回计算结果供后面使用”时必须 return。若同时想给人看又想保存，先 return，再在调用函数的地方 print 返回值，职责会更清楚。'}
    ],
    code:`def show_sum(a, b):
    print(a + b)
def add(a, b):
    return a + b
first = show_sum(2, 3)
second = add(2, 3)
print("第一个返回：", first)
print("第二个再加 10：", second + 10)`,
    output:`5
第一个返回： None
第二个再加 10： 15`,
    trace:['show_sum(2, 3) 在函数内部显示 5，但没有 return，所以 first 得到 None。','add(2, 3) 没有自己显示内容，而是返回 5；second 得到 5。','后两行分别显示 first 是 None，以及 second + 10 是 15。'],
    trap:'把“屏幕出现了正确数字”误当成“函数返回了正确数字”。自动判题检查返回值时，只 print 正确数字仍可能判错。',
    tryThis:'把 add 的 return a + b 改成 print(a + b)，预测运行到 second + 10 会发生什么错误。',
    check:{q:'要把计算结果交给下一行继续加 10，函数里应使用 print 还是 return？',answer:'使用 return。print 只显示内容；return 才把值交回调用位置，供下一行继续计算。'}
  },
  '4:2': {
    plain:'函数的参数像表格里的空格：按位置填、按名字填，也能准备默认值或接住不定数量的值。',
    analogy:'订餐表上有“姓名”和“份数”两格：按顺序写相当于位置参数，明确写“份数=2”相当于关键字参数。若每人都默认订 1 份，这就是默认参数。临时收集任意多张点餐纸，才需要 *args、**kwargs 这样的收纳袋。',
    steps:[
      {title:'位置与关键字怎样对应',text:'greet("阿宁", "同学") 按先后把值交给 name、title；greet(title="同学", name="阿宁") 则按参数名对应，可以调整顺序。不能把一个参数同时填两次，也不能写函数不认识的参数名。读函数定义时先看括号里的名称和顺序。'},
      {title:'默认值可以少填一个参数',text:'def greet(name, title="同学"): 中，没传 title 就使用“同学”；传了 title="队长" 就用新值。默认参数通常放在没有默认值的参数之后。默认值在定义函数时建立，若用可变列表作默认值，之后的多次调用可能共享它；通常用 None 再在函数内创建新列表。'},
      {title:'*args 收集额外的位置值',text:'def total(*amounts): 可以接收 total(2, 3, 5) 这样的多个数字。函数内部的 amounts 是元组 (2, 3, 5)，sum(amounts) 得到 10。星号不是“乘法”，在这里表示把多余的位置参数收起来。'},
      {title:'**kwargs 收集带名字的值',text:'def describe(**info): 调用 describe(name="阿宁", age=10) 后，函数内部 info 是字典 {"name":"阿宁", "age":10}。两个星号表示收集额外关键字参数。先学固定参数，因为它们更容易告诉调用者需要提供什么。'}
    ],
    code:`def greet(name, title="同学"):
    return title + name
def total(*amounts):
    return sum(amounts)
def describe(**info):
    return info["name"] + "：" + str(info["age"])
print(greet("阿宁"))
print(greet(title="队长", name="阿宁"))
print(total(2, 3, 5))
print(describe(name="阿宁", age=10))`,
    output:`同学阿宁
队长阿宁
10
阿宁：10`,
    trace:['第一次 greet 只给 name，title 使用默认“同学”；第二次按关键字名称提供 title 和 name，得到“队长阿宁”。','total 接收三个位置数字，在函数内部把它们作为元组求和，显示 10。','describe 接收 name 和 age 两个关键字值，在函数内部从字典读取并组合成文字。'],
    trap:'不要把“默认参数每次调用都会重新创建”当作普遍规则；用 [] 这样的可变对象作默认值，可能让后一次调用看见前一次留下的内容。',
    tryThis:'把 total(2, 3, 5) 增加一个 4，预测总和；再把 greet 的 name 与 title 改成自己的称呼。',
    check:{q:'greet(title="队长", name="阿宁") 为什么能先写 title？',answer:'这里按参数的名字匹配，Python 会把 title 交给 title，把 name 交给 name，不依赖书写顺序。'}
  },
  '4:3': {
    plain:'作用域是在问“这个名字在哪个范围能被找到”，同名不一定是同一个变量。',
    analogy:'学校有全校广播，班里有班级通知，小组还有小组便条。你在小组里说“通知”，先看小组那张；小组没有再往班级、学校找。函数内、外层函数、模块全局、内置名字也有类似的查找顺序。',
    steps:[
      {title:'局部名字只活在这次函数里',text:'函数里写 word = "里面"，通常创建的是局部名字；函数外的 word = "外面" 不会被它自动改掉。函数结束后，外面也不能直接读取函数内部新建的局部名字。想把结果交出去，优先用 return。'},
      {title:'查找名字从近到远',text:'Python 通常先找当前函数的局部，再找包住它的外围函数，然后找模块全局，最后找内置名字（如 len）。这常被简写为 LEGB。它是查找顺序，不表示所有层都会被同时修改。'},
      {title:'nonlocal 与 global 要说清目标',text:'内层函数若要重新绑定外围函数里的 count，可用 nonlocal count；若要重新绑定模块全局名字，则是 global。二者不是一回事。初学时更常用参数和 return 传递数据，关系更容易看见。'},
      {title:'读在赋值前会出错',text:'如果函数内既写 count += 1，又没有 nonlocal/global，Python 会把 count 看作该函数的局部名字；右边想先读旧值，但局部还没得到值，就可能抛 UnboundLocalError。给每层名字画一圈范围，能看清是谁。'}
    ],
    code:`word = "外面"
def make_counter():
    count = 0
    def next_count():
        nonlocal count
        count += 1
        word = "里面"
        print(word, count)
    return next_count
counter = make_counter()
counter()
counter()
print(word)`,
    output:`里面 1
里面 2
外面`,
    trace:['make_counter 创建外围局部 count=0，并把内部函数 next_count 返回；counter 指向这个内部函数。','第一次、第二次 counter() 通过 nonlocal 更新同一个外围 count，先显示 1，再显示 2。','内部的 word="里面" 是局部名字，不修改模块外面的 word，所以最后显示“外面”。'],
    trap:'函数能读到全局名字，不意味着在函数内给同名变量赋值就会自动修改全局。忘写 nonlocal 却在内部使用 count += 1，可能在读取旧值时出错。',
    tryThis:'把 next_count 里的 nonlocal count 注释掉，运行后看异常名称；再恢复它，并尝试多调用一次 counter。',
    check:{q:'例子中为什么最后 print(word) 仍是“外面”？',answer:'next_count 内的 word 是它自己的局部名字；函数外的 word 是另一个绑定，没有被修改。'}
  },
  '4:4': {
    plain:'函数也能像数字一样交给别的函数；lambda 是给非常短的规则临时写一个函数。',
    analogy:'老师让同学按身高排队时，除了名单，还交给排队员一张“按身高比较”的规则卡。sorted 的 key 参数就接收这样的规则卡。lambda 是把短规则直接写在卡片上；规则复杂时，给卡片起名字（def）更容易让人读懂。',
    steps:[
      {title:'函数名和函数调用不一样',text:'sorted(names, key=len) 把函数 len 本身交给 sorted；sorted 会依次对每个姓名调用 len。若写 key=len(names)，则会先试着对整个列表调用 len，得到一个数字，不是 sorted 需要的规则函数。'},
      {title:'lambda 只有一个表达式',text:'lambda x: x * 2 表示“收到 x，交回 x 的两倍”。它适合短到一眼能懂的规则；需要多步检查、清楚的名字或解释错误时，用 def 更合适。lambda 不是更高级的必选写法。'},
      {title:'map 和 filter 分别转换与筛选',text:'map(lambda x: x*2, numbers) 对每个数字做转换；filter(lambda x: x%2==0, numbers) 只保留偶数。它们在 Python 3 中返回迭代器，取用时才逐步产生结果；list(...) 能把当前结果展示出来。普通 for 或推导式也能做同类工作。'},
      {title:'reduce 把多项合成一项',text:'reduce(lambda a,b: a+b, [1,2,3,4]) 会先合并 1 和 2 得 3，再和下一个 3 合并得 6，最后加 4 得 10。它在 functools 模块里；单纯求和直接 sum(numbers) 通常更清楚。排序、筛选、合并不是同一个操作。'}
    ],
    code:`from functools import reduce
names = ["小林林", "小王", "阿宁"]
print(sorted(names, key=len))
numbers = [1, 2, 3, 4]
print(list(map(lambda x: x * 2, numbers)))
print(list(filter(lambda x: x % 2 == 0, numbers)))
print(reduce(lambda a, b: a + b, numbers))`,
    output:`['小王', '阿宁', '小林林']
[2, 4, 6, 8]
[2, 4]
10`,
    trace:['sorted 会用 len 分别得到各姓名的长度，长度 2 的在前、长度 3 的在后；同长度保持原先相对顺序。','map 把四个数分别乘 2；filter 只保留能被 2 整除的 2 和 4。','reduce 依次把四个数相加，最终得到单个数字 10。'],
    trap:'把 key=len 写成 key=len(names) 会把数字 3 当成排序规则。map 和 filter 的结果不是已经装好的列表；想看到全部值可用 list(...) 取出。',
    tryThis:'把“按姓名长度排序”改成 key=lambda name: name[-1]，先说清新规则比较的是什么，再运行观察顺序。',
    check:{q:'sorted(names, key=len) 里的 len 为什么没有括号？',answer:'要把 len 这个函数交给 sorted，由 sorted 对每个姓名调用；写 len(...) 会先算出一个值。'}
  },
  '4:5': {
    plain:'递归就是函数把一个较小的同类问题交给自己做，直到遇到能直接回答的最小问题。',
    analogy:'你要数一摞积木有几块，可以拿走最上面一块，问“剩下还有几块”，答案回来后再加 1。每次都少一块，最后剩下 0 块时直接回答 0。这种“缩小问题再回来算”的过程像递归。',
    steps:[
      {title:'先写能停止的基本情况',text:'阶乘 n! 是从 1 乘到 n，例如 4! = 4×3×2×1。规定 0! = 1；因此 factorial(0) 和 factorial(1) 可以直接返回 1。若没有这条基本情况，函数会一直调用自己。'},
      {title:'每次都让问题变小',text:'factorial(4) 需要 4×factorial(3)，后者需要 3×factorial(2)，再到 factorial(1)。参数从 4、3、2 逐步接近 1，说明可以到达停止处。若误写 factorial(n+1)，问题反而越来越大。'},
      {title:'从最里面一层往外返回',text:'factorial(1) 先交回 1；factorial(2) 得 2×1=2；factorial(3) 得 3×2=6；factorial(4) 得 4×6=24。函数调用像叠纸条，每层记住自己的 n，等较小问题算完再继续。'},
      {title:'检查边界和深度',text:'负数没有通常意义下的整数阶乘，例子主动报 ValueError。递归层数太多会遇到深度限制；像简单累计这类问题，普通 for 循环往往更容易读、也更适合很长的输入。先证明会停止，再追求简短。'}
    ],
    code:`def factorial(n):
    if n < 0:
        raise ValueError("n 不能为负数")
    if n <= 1:
        return 1
    return n * factorial(n - 1)
print(factorial(4))`,
    output:'24',
    trace:['factorial(4) 暂时需要 factorial(3)；接着要 factorial(2)、factorial(1)，参数每次减 1。','factorial(1) 命中基本情况，返回 1，不再调用更小的数。','结果逐层返回：2×1=2，3×2=6，4×6=24，所以只显示 24。'],
    trap:'只写“函数调用自己”却没有基本情况，或每次参数不变，最终会超出递归深度。对负数也要决定明确的处理方式，不能让它无限往下减。',
    tryThis:'把 factorial(4) 改成 factorial(3)，先在纸上展开 3×2×1；再试 0，核对基本情况。',
    check:{q:'为什么 factorial(4) 最后不会无限调用？',answer:'每次把 n 减 1，最终到 n=1；基本情况直接 return 1，之后逐层返回结果。'}
  }
});
