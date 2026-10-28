window.PYQUEST_BEGINNER = Object.assign(window.PYQUEST_BEGINNER || {}, {
  '8:0': {
    plain:'面向对象是一种整理程序的方法：把同一件事的数据和能做的动作放在一起。',
    analogy:'想象一张“学生信息卡”的制作说明。说明上规定每张卡有姓名、分数，还能回答“是否及格”。这张制作说明像类；按说明做出的“小雨卡”和“小林卡”是两个实例。类比只帮助理解组织方式，电脑并不会真的剪纸卡。',
    steps:[
      {title:'先认出数据和动作',text:'如果只记录一位学生的姓名与分数，用字典就够了，例如 {"name":"小雨","score":80}。当很多学生都要执行同样的“显示成绩”“判断及格”动作，把规则写在类里会更方便。类不是让代码自动变好，只是把相关内容放在容易找到的位置。'},
      {title:'class 写的是制作规则',text:'class Student: 后面缩进的内容属于 Student 类。写完类定义，只是告诉 Python 如何创建学生，还没有出现某个具体学生。Student("小雨",80) 才会创建一位学生实例。变量 a 保存的是对该实例的引用。'},
      {title:'属性是这个对象保存的数据',text:'每位学生可以有自己的 name 和 score。a.name 是“小雨”，b.name 可以是“小林”。改动 a.score 不会自动改动 b.score，因为它们是两份实例。若把需要每人独有的可变列表放在类属性上，就可能意外共享；应在 __init__ 中给每个实例创建。'},
      {title:'方法是对象会执行的动作',text:'方法也是函数，只是写在类里。a.passed() 会读取 a 的 score 并返回 True 或 False。调用者不用再到处重复“分数至少 60”的判断规则；要修改及格线时，改方法中这一处即可。'},
      {title:'先选简单的表达方式',text:'只有一两条数据、没有专属动作时，字典可能更清楚。需要创建很多同类对象，并维护它们自己的状态和共同规则时，再考虑类。学面向对象的目标是能解释“谁保存数据、谁负责动作”，不是每题都强行写 class。'}
    ],
    code:`class Student:
    def __init__(self, name, score):
        self.name = name
        self.score = score
    def passed(self):
        return self.score >= 60
a = Student("小雨", 80)
b = Student("小林", 50)
print(a.name, a.passed())
print(b.name, b.passed())`,
    output:'小雨 True\n小林 False',
    trace:['定义 Student 时先记下创建与判断规则，还没有学生。','Student("小雨", 80) 创建 a；另一次调用创建独立的 b。','a.passed() 比较 80 >= 60，得到 True；b 的 50 不够，得到 False。'],
    trap:'“类”和“实例”不是同一个东西。Student 是规则；a 和 b 才是按规则创建的对象。类也不是字典的升级替代品，选哪一种要看问题是否需要对象自己的动作。',
    tryThis:'把 b 的分数从 50 改为 60，先猜第二行会变成什么，再送去实验室运行。',
    check:{q:'为什么改变 a.score 后，b.score 通常不会跟着变？',answer:'a 与 b 是两次创建出的不同实例，每个实例在 __init__ 中保存自己的 score。除非你让它们共同引用同一个可变对象，否则修改 a 的实例属性不会改 b 的属性。'}
  },
  '8:1': {
    plain:'类像模具，实例像模具做出的成品；self、cls 和静态方法说明方法在为谁工作。',
    analogy:'想象全校共用一张校名牌，每个学生却有自己的姓名牌。实例方法拿着“当前这位学生”的姓名牌做事；类方法查看全校共用的校名牌；静态方法只执行与学生主题有关的小计算，不自动拿任何一张牌。',
    steps:[
      {title:'__init__ 在创建实例时准备数据',text:'写 Student("小雨") 时，Python 创建一个实例并调用 __init__。参数 name 收到“小雨”，self 表示刚创建的这个实例，self.name = name 把姓名保存在它身上。__init__ 的职责通常是初始化，创建表达式的结果是新实例，而不是 __init__ 的返回值。'},
      {title:'实例方法为什么写 self',text:'def greet(self) 定义的是实例方法。写 a.greet() 时，Python 会把 a 自动作为第一个参数送进去，所以方法里能用 self.name。你不需要写 a.greet(a)；如果忘了在定义中写 self，通常会得到参数数量错误。'},
      {title:'类属性与类方法',text:'school 写在类中，适合表达大家共用的校名。@classmethod 让 school_name 收到 cls，也就是调用所用的类；cls.school 读取这个类的校名。它常用于与类整体有关的行为，例如另一种创建实例的方法。'},
      {title:'静态方法只是一段放在类里的函数',text:'@staticmethod 下的方法不会自动收到 self 或 cls。is_pass(score) 只根据传入分数返回结果，因此可以这样写。它不是比普通函数更高级；如果完全不需要放在类里，写成普通函数也可以。'},
      {title:'警惕共享的可变数据',text:'若在类里写 students = []，所有实例通常会看到同一张列表；一个人 append 后另一个人也能看见。每人独有的列表应在 __init__ 中写 self.students = []。先问“这个值属于全班，还是属于这一位学生”。'}
    ],
    code:`class Student:
    school = "星星小学"
    def __init__(self, name):
        self.name = name
    def greet(self):
        return "你好，我是" + self.name
    @classmethod
    def school_name(cls):
        return cls.school
    @staticmethod
    def is_pass(score):
        return score >= 60
a = Student("小雨")
print(a.greet())
print(Student.school_name(), Student.is_pass(65))`,
    output:'你好，我是小雨\n星星小学 True',
    trace:['创建 a 时，__init__ 把“小雨”保存为 a.name。','a.greet() 自动把 a 交给 self，于是拼出问候文字。','school_name 通过 cls 读取类属性；is_pass 只比较传入的 65 与 60。'],
    trap:'self 和 cls 都不是神奇的保留字，而是大家约定的参数名字；真正关键的是调用时传进来的对象。类属性适合共享信息，可变类属性尤其要谨慎。',
    tryThis:'再创建 b = Student("小林")，打印 b.greet()；观察 a.name 是否改变。',
    check:{q:'“每位学生自己的书包列表”应该放在类中，还是放在 __init__ 里？',answer:'放在 __init__ 里写 self.bag = []，让每个新实例获得自己的列表。直接写成类属性 bag = []，不同实例可能共用同一张列表。'}
  },
  '8:2': {
    plain:'属性是对象身上带的信息；Python 允许部分对象在运行中增添信息，并提供按名字查看或设置属性的工具。',
    analogy:'把对象想成一张可以补写栏目的人物卡。原来只有“姓名”，后来补上“昵称”，就像运行时增加属性。普通写法 card.nickname 是直接读栏目；getattr(card,"nickname") 是先拿到栏目名称这串文字，再按名称查找。不是所有卡都允许任意加栏目，某些类会限制。',
    steps:[
      {title:'先学最普通的点号',text:'obj.name 读取对象的 name 属性，obj.name = "新名字" 设置它。若这个名字从未存在，读取通常会报 AttributeError。写类时先让常用属性在 __init__ 中出现，读代码的人才知道对象应该有什么。'},
      {title:'什么叫动态绑定',text:'Python 中不少自定义实例允许在创建后写 obj.nickname = "小雨滴"，新属性便出现在这个实例上。另一个实例不会因此自动得到 nickname。也有使用 __slots__ 或某些内置类型的对象不允许这样随意增加属性。'},
      {title:'按文字名称读写属性',text:'getattr(obj,"nickname") 相当于按字符串指定栏目；setattr(obj,"nickname","新值") 则设置栏目。hasattr(obj,"nickname") 询问它现在是否存在。若属性可能不存在，可以用 getattr(obj,"nickname","未填写") 给一个默认值。'},
      {title:'什么时候需要这些工具',text:'当字段名称来自配置或循环变量时，按字符串访问很有用。固定知道字段名时，obj.name 更短也更清楚。动态添加属性会让对象形状难以预测，团队代码通常需要写清哪些属性是正式接口。'},
      {title:'删除与重新查找',text:'delattr(obj,"nickname") 会删除该属性。删除后再直接访问会报错，hasattr 会变成 False。使用默认值不会把属性真的写进对象；它只是这次查不到时临时返回的替代值。'}
    ],
    code:`class Card:
    def __init__(self, name):
        self.name = name
card = Card("小雨")
card.nickname = "小雨滴"
print(card.name, getattr(card, "nickname"))
print(hasattr(card, "age"))
print(getattr(card, "age", "未填写"))
setattr(card, "nickname", "雨点")
print(card.nickname)`,
    output:'小雨 小雨滴\nFalse\n未填写\n雨点',
    trace:['创建卡片时只有 name；下一行给这一张 card 新增 nickname。','getattr 按名字读取昵称；hasattr 检查 age，发现没有。','带默认值的 getattr 返回“未填写”，但不会创建 age。','setattr 把 nickname 改成“雨点”，最后一点号读取到新值。'],
    trap:'hasattr 返回 False 不等于属性的值是 False；它只说明这个名字是否可访问。getattr 的默认值也不会自动保存到对象。',
    tryThis:'删掉设置 nickname 的那一行，比较直接 card.nickname 与 getattr(card,"nickname","无昵称") 的表现。',
    check:{q:'getattr(card,"age","未填写") 返回“未填写”后，card 就有 age 属性了吗？',answer:'没有。默认值只是这一次查不到时的回答；要真正保存属性，需要明确赋值或调用 setattr。'}
  },
  '8:3': {
    plain:'封装是让对象自己守住规则：别人通过清楚的方法使用数据，少把对象改成不合理的状态。',
    analogy:'存钱罐不会让你把硬币数量直接改成负数；它提供“存入”和“取出”的操作，操作前会检查数量。对象也是这样：数据和检查规则放在一起，外部的人按约定的方法使用。这里不是说 Python 能把数据锁进真的保险箱。',
    steps:[
      {title:'为什么不让每处代码随便改',text:'如果各处都写 bank.coins = 某个数，有人可能误写 -100。以后你要改变规则，就得找到所有修改位置。让 save 方法负责增加硬币，可以把“必须是正数”的规则写在一个地方。'},
      {title:'名字前的下划线是约定',text:'self._coins 前的单下划线告诉读者“请主要通过公开方法使用它”。Python 并不会因为这个下划线自动禁止外部访问；它不是安全隔离。真正重要的是接口清楚、调用者遵守约定、方法维护正确状态。'},
      {title:'property 让读取像读属性',text:'@property 把 coins 方法变成只读式访问：bank.coins 看起来像读属性，背后仍会执行方法。示例只提供读取，不提供赋值入口；外部写 bank.coins = 9 会失败。需要允许设置时可另写 setter 并验证输入。'},
      {title:'不合规则时明确报错',text:'save(count) 收到 0 或负数时用 raise ValueError 提醒调用者。这比悄悄忽略或把错误值存进去更容易发现问题。调用者可以在合适位置用 try/except ValueError 处理。'},
      {title:'封装是设计，不是隐藏比赛',text:'简单的数据对象不必给每个字段都套一层 getter、setter。先写出需要维护的规则，再决定是否用方法或 property。让使用者能猜到“存钱用 save，查看用 coins”，就是好的开始。'}
    ],
    code:`class PiggyBank:
    def __init__(self):
        self._coins = 0
    @property
    def coins(self):
        return self._coins
    def save(self, count):
        if count <= 0:
            raise ValueError("数量必须大于零")
        self._coins += count
bank = PiggyBank()
bank.save(3)
print(bank.coins)`,
    output:'3',
    trace:['创建存钱罐后，_coins 从 0 开始。','bank.save(3) 检查 3 大于 0，于是把总数加到 3。','bank.coins 通过 property 方法读出当前数量，print 显示 3。'],
    trap:'单下划线不是防窥锁；直接访问 _coins 在 Python 中仍可能做到。封装的主要价值是规定好如何使用，并在方法中守住业务规则。',
    tryThis:'把 bank.save(3) 改成 bank.save(0)，观察 ValueError；再改回正数并多存一次，预测结果。',
    check:{q:'为什么 save(0) 要报告错误，而不是把 0 当成一次存钱？',answer:'示例约定每次存钱必须增加至少一枚硬币。用 ValueError 明确指出输入不符合约定，能帮助调用者立即改正，也防止对象状态被随意更新。'}
  },
  '8:4': {
    plain:'继承表达“它是一种什么”，组合表达“它拥有什么”；super 按查找顺序继续寻找方法。',
    analogy:'“小狗是一种动物”，所以小狗可以沿用动物的一些规则；“小雨有一只小狗”，小雨不是小狗，应该把小狗放进小雨的信息里。就像制作规则有通用部分与特殊部分，继承能少写重复规则；但关系说不通时，硬继承会使程序难懂。',
    steps:[
      {title:'子类可以沿用已有行为',text:'class Dog(Animal) 表示 Dog 继承 Animal。若 Dog 没写某个方法，Python 会沿着方法查找顺序继续找，例如从 Animal 找到。Dog 可以新增方法，也可以用同名方法覆盖旧实现。继承适合真能说出“狗是一种动物”的关系。'},
      {title:'super 用来接上已有初始化',text:'Dog 的 __init__ 要保存犬种，也要完成 Animal 保存名字的工作。super().__init__(name) 调用查找顺序中的下一段初始化，然后再设置 breed。这样不会把父类初始化代码复制一遍。'},
      {title:'组合是“拥有”，不是“属于”',text:'Owner 对象有一个 dog 属性，表示主人持有一只狗。Owner 不应该继承 Dog，因为人不是狗。很多程序用组合把小对象拼起来，比建立很长的继承链更灵活。'},
      {title:'MRO 是方法查找路线',text:'MRO 是“方法解析顺序”的缩写。Dog.mro() 可以查看 Python 查找 Dog 方法时的类顺序；单继承时很直观。多继承时路线可能绕过你心中某个固定的“父类”，所以 super 不是简单地写死调用某个类的名字。'},
      {title:'初学先用短而清楚的关系',text:'一层继承和组合已经能解决许多问题。只有确实需要不同来源的共同能力时才考虑多继承，并检查 mro。判断设计前先用口语说一遍：“A 是一种 B”，还是“A 有一个 B”。'}
    ],
    code:`class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return "动物发出声音"
class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)
        self.breed = breed
    def speak(self):
        return "汪汪"
class Owner:
    def __init__(self, dog):
        self.dog = dog
dog = Dog("豆豆", "柯基")
owner = Owner(dog)
print(owner.dog.name, owner.dog.speak())
print([cls.__name__ for cls in Dog.mro()])`,
    output:"豆豆 汪汪\n['Dog', 'Animal', 'object']",
    trace:['创建 dog 时，Dog 的 __init__ 先用 super 调用 Animal 的初始化，保存名字“豆豆”，再保存犬种。','Owner(dog) 把这只狗放进主人的 dog 属性，这是组合关系。','Dog 自己写了 speak，所以调用时得到“汪汪”；mro 展示方法查找路线。'],
    trap:'super() 不保证“只去直系父类”这一简单说法在多继承中成立；它沿 MRO 找下一实现。主人“有一只狗”也不等于主人“是一只狗”。',
    tryThis:'把 Dog 中的 speak 方法暂时删掉，先猜 owner.dog.speak() 会找到谁的方法，再运行。',
    check:{q:'“图书馆有很多书”更适合继承还是组合？',answer:'组合。图书馆不是一种书，它是拥有书的对象，可以保存一个 books 列表。继承更适合“电子书是一种书”这类关系。'}
  },
  '8:5': {
    plain:'多态是让不同对象按同一个使用约定完成工作，即使它们内部做法不同。',
    analogy:'老师说“请每个同学做自我介绍”，每个人都回答一句，但回答的内容不一样。调用者只需要知道他们都会“介绍”，不用把每个人的名字写进一大串 if。程序里的共同方法名和返回约定就像这句统一指令。',
    steps:[
      {title:'先找到共同的动作',text:'Dog 和 Cat 都可以提供 speak()。Dog 返回“汪”，Cat 返回“喵”。它们的数据结构可以不同，但调用代码只要知道“能调用 speak 并得到文字”即可。'},
      {title:'调用者按统一接口写一次',text:'announce(animal) 中的 animal 可以是狗，也可以是猫。它执行 animal.speak()，不用问具体类型。这样新增加 Bird 时，只要 Bird 也提供约定一致的 speak，announce 通常不必修改。'},
      {title:'同名还不够，结果也要合约一致',text:'如果 Dog.speak 返回字符串，而 Cat.speak 只用 print 显示却返回 None，announce 中的字符串拼接就会失败。设计共同接口时，要说清参数、返回值以及出错时怎么办。'},
      {title:'不一定要建继承树',text:'Python 常通过对象“能做什么”来工作。两个类即使没有共同的自定义父类，只要都符合调用约定，也可以交给同一函数。想象插头要匹配插座的形状，来源于哪家工厂并不重要。'},
      {title:'试错时看清缺少哪一步',text:'若传入的对象没有 speak，运行会抛 AttributeError。先检查调用者要求的方法名，再检查对象是否真的提供它；不要以为任意对象都能自动满足接口。'}
    ],
    code:`class Dog:
    def speak(self):
        return "汪"
class Cat:
    def speak(self):
        return "喵"
def announce(animal):
    return "听到：" + animal.speak()
for pet in [Dog(), Cat()]:
    print(announce(pet))`,
    output:'听到：汪\n听到：喵',
    trace:['Dog 与 Cat 分别定义同名 speak，但返回的文字不同。','for 第一轮把 Dog 实例交给 announce，它调用狗的 speak。','第二轮交给 Cat 实例，同一行代码调用猫的 speak。'],
    trap:'多态不是“所有对象都有同名方法”就结束了；参数和返回行为需要能让调用者一致使用。同名方法的结果若一个是文字、一个是 None，程序仍可能报错。',
    tryThis:'添加 Bird 类，让它的 speak 返回“啾”，并把 Bird() 放进列表，看看 announce 是否需要改动。',
    check:{q:'announce 为什么不用写 if isinstance(animal, Dog)？',answer:'它只依赖 animal 提供 speak() 并返回可拼接的文字。Dog 和 Cat 都遵守这个约定，因此同一段代码就能处理它们。'}
  },
  '8:6': {
    plain:'特殊方法让你自己创建的对象理解 Python 已有的动作，例如 print、len 和 for。',
    analogy:'想象你给一只新书架贴上三张说明：看到它时怎样报出名字、数它时怎样给出书的数量、逐本拿书时先拿哪一本。Python 的 print、len 和 for 就像拿着对应说明来操作；你只实现真正需要的说明，不用每一张都贴。',
    steps:[
      {title:'双下划线名称有指定用途',text:'__str__、__len__、__iter__ 这类名称由 Python 约定，不是随手取的普通名字。print(shelf) 会用到对象的字符串表示；len(shelf) 会查找 __len__；for book in shelf 会请求迭代器。'},
      {title:'__str__ 回答“给人看成什么”',text:'示例让 __str__ 返回“书架：2本书”。它必须返回字符串；在里面只 print 而不 return，会让转换失败。__repr__ 更多用于调试时描述对象；两者用途不同，暂时先学会 __str__。'},
      {title:'__len__ 返回长度',text:'书架里有几本书，__len__ 就返回整数 len(self.books)。你调用的是 len(shelf)，不是手动写 shelf.__len__()。若一个对象根本没有自然的“长度”，就不必勉强实现。'},
      {title:'__iter__ 把逐个取值的工作交出去',text:'列表本身已经会迭代，所以 __iter__ 可以返回 iter(self.books)。for 会不断从这个迭代器取下一本；取完时迭代器发出 StopIteration，for 正常结束。通常不需要在入门例子里自己写 __next__。'},
      {title:'让行为符合人的预期',text:'书架打印出说明、len 得到书数、for 依次取书，都是自然的行为。特殊方法不是魔法清单；如果定义错返回类型，内置操作反而会报错。先决定对象应支持什么，再选对应方法。'}
    ],
    code:`class Shelf:
    def __init__(self, books):
        self.books = books
    def __str__(self):
        return f"书架：{len(self.books)}本书"
    def __len__(self):
        return len(self.books)
    def __iter__(self):
        return iter(self.books)
shelf = Shelf(["故事书", "词典"])
print(shelf)
print(len(shelf))
for book in shelf:
    print(book)`,
    output:'书架：2本书\n2\n故事书\n词典',
    trace:['Shelf 收到两本书并保存在 books 中。','print(shelf) 使用 __str__ 得到文字；len(shelf) 使用 __len__ 得到 2。','for 从 __iter__ 返回的列表迭代器中依次取出两本书。'],
    trap:'__str__ 需要 return 一个 str，不能只 print。__iter__ 要返回迭代器；返回列表本身并不满足该方法的约定。',
    tryThis:'把列表增加一本“地图册”，先猜四行输出会怎样改变，再运行。',
    check:{q:'为什么 __iter__ 返回 iter(self.books)，而不是直接返回 self.books？',answer:'__iter__ 的约定是返回“迭代器”。self.books 是列表，可用 iter(self.books) 取得它的迭代器，for 才能逐个取值。'}
  },
  '8:7': {
    plain:'装饰器是在原有函数或类外面加一层新行为；先看清它接收谁、返回谁。',
    analogy:'给一本笔记本套上书皮：里面仍是同一本笔记本，但外面多了标签。函数装饰器给函数加行为，类装饰器给类加行为；@ 写法相当于把原对象交给“套书皮”的函数。书皮也可能换掉原本的对象，所以一定要看返回值。',
    steps:[
      {title:'先复习函数装饰器',text:'一个装饰器函数接收原函数，返回包装后的函数。@log 写在函数定义上方，通常相当于定义完函数后再做 name = log(name)。包装器调用原函数时要转交参数和返回值，否则原来能得到的结果可能丢失。'},
      {title:'方法上也能用装饰器',text:'@property 是常见例子。它让 p.title 像读普通属性一样使用，实际上会运行 title 方法。@classmethod 和 @staticmethod 也改变方法被调用时自动收到哪些对象；这些不是“更高级就更好”，而是不同用途。'},
      {title:'类装饰器接收整个类',text:'示例中的 label(cls) 接收刚创建好的 Pencil 类，给这个类增加 category 属性，再返回 cls。@label 放在 class 上方，效果近似于定义 Pencil 后执行 Pencil = label(Pencil)。'},
      {title:'注意两个时间点',text:'类定义执行时就会调用 label；后面写 Pencil("HB") 才是在创建实例。装饰发生的时刻与实例方法运行的时刻不同。追踪装饰代码时先写出“定义类 → 装饰类 → 创建实例 → 使用实例”的顺序。'},
      {title:'先会普通写法再学更深的协议',text:'__call__ 可以让对象像函数一样被调用，__new__ 参与创建实例，这些会出现在更高级的装饰器代码中。入门先用普通函数说明接收和返回，不必为了短而把简单逻辑藏进复杂类。'}
    ],
    code:`def label(cls):
    cls.category = "学习用品"
    return cls
@label
class Pencil:
    def __init__(self, name):
        self.name = name
    @property
    def title(self):
        return "铅笔：" + self.name
p = Pencil("HB")
print(Pencil.category)
print(p.title)`,
    output:'学习用品\n铅笔：HB',
    trace:['Python 定义 Pencil 类后，@label 把这个类交给 label；label 增加 category 并把类返回。','Pencil("HB") 创建实例 p，把 HB 存进 p.name。','读取 p.title 时，property 调用方法并返回“铅笔：HB”。'],
    trap:'不要把 @label 理解成“每次创建铅笔时才运行一次 label”。这里类装饰器在类定义执行时运行；title 的 property 方法则在读取 p.title 时运行。',
    tryThis:'把 label 中的 category 改成“文具”，再把 p.title 改为 p.name，比较两个输出变化。',
    check:{q:'在示例中，label 收到的是 Pencil 类还是 p 这个实例？',answer:'收到的是 Pencil 类。类定义完成后才执行装饰器；p 是后面调用 Pencil("HB") 时创建的实例。'}
  },
  '9:0': {
    plain:'复杂度是在问：数据变多时，程序要做的工作和占用的额外位置会怎样增长。',
    analogy:'假设要检查一排作业本。每多一本就多检查一次，工作量跟本数一起增加；如果每本都要和其他每一本比较，作业本翻倍后比较次数会增长得更快。复杂度像看“越来越多作业本时工作怎样增加”的规律，不是用秒表测某一次究竟花了几秒。',
    steps:[
      {title:'先说清 n 是什么',text:'若输入是一个学生名单，n 可以表示学生人数。分析前要明确 n 的含义，否则“做了 n 次”没有对象。输入只有 3 人时可以逐步数，增加到 6 人再比较工作量的变化。'},
      {title:'一次完整走过通常是 O(n)',text:'for name in names 每个名字看一遍。如果人数从 3 变 6，循环次数也从 3 变 6，这种随 n 成比例增长的规律常写 O(n)。大 O 重点看增长级别，会忽略固定的细小差别。'},
      {title:'两层都走 n 次通常是 O(n²)',text:'外层每人一次，内层又遍历每一人。3 人时是 3×3=9 次，6 人时是 6×6=36 次。人数翻倍，工作量约变四倍。并非见到两个 for 就一定平方：如果两个循环先后各走一次，合起来约 2n，仍是 O(n)。'},
      {title:'时间复杂度不是运行秒数',text:'电脑快慢、语言实现、网络等待都会影响实际秒数。复杂度帮助比较数据规模变大时的趋势。要分析排序、切片、字典查找等，还得考虑这些操作本身的成本，不能只数自己写出的 for。'},
      {title:'空间复杂度看额外占用',text:'只用 total 和 count 两个变量，额外空间不随名单增长，常记 O(1)。若新建一张和原名单一样长的结果列表，额外空间随 n 增长，常记 O(n)。这里说“额外”是指算法为处理输入另外使用的空间。'}
    ],
    code:`for n in (3, 6):
    one = 0
    two = 0
    for i in range(n):
        one += 1
    for i in range(n):
        for j in range(n):
            two += 1
    print(n, one, two)`,
    output:'3 3 9\n6 6 36',
    trace:['n=3 时，一层循环做 3 次；两层各 3 次，合计 9 次。','n=6 时，一层做 6 次；两层共做 36 次。','比较两行：n 翻倍，一层次数翻倍，两层次数变为四倍。'],
    trap:'O(n²) 不表示运行一定慢，也不表示恰好做 n² 条机器指令；它描述数据量增长时的主要趋势。两个顺序执行的一层循环也不是 O(n²)。',
    tryThis:'把 n 的两个值改成 4 和 8，先预测 one 与 two，再运行验证。',
    check:{q:'为什么连续写两个各遍历 n 次的循环，通常仍写 O(n)？',answer:'它们是先后执行，总次数约为 n+n=2n。大 O 关注增长级别，固定倍数 2 不改变随 n 成比例增长的规律。'}
  },
  '9:1': {
    plain:'双指针是同时记住两个位置；二分每次排除一半候选；滑动窗口移动一段连续范围。',
    analogy:'找一本按拼音排好序的书，可以先翻中间：目标若在前半，就不用再翻后半。这像二分查找。检查一句话是否左右对称，可两只手从两端向中间指，这像双指针。看连续两天的销售额，把“两个日期的框”一天一天向右移，就是滑动窗口。',
    steps:[
      {title:'双指针先规定两个位置的任务',text:'判断“上海自来水来自海上”是否回文时，可以用 left 指最左、right 指最右。两边字符相同才向中间移动；不同就立刻知道不是。两个位置不必总从两端开始，关键是明确每次怎样移动以及为什么可以这样移动。'},
      {title:'二分必须有可排除的顺序',text:'在 [1,3,3,7] 中找第一个不小于 3 的位置，数组先要有序。看中间值：若小于 3，答案一定在右边；否则中间位置仍可能是答案，所以保留它并排除右侧更远的位置。无序列表不能直接套这个判断。'},
      {title:'先定边界规则，再写循环',text:'示例用半开区间 [left,right)，也就是包含 left、不包含 right。开始时 left=0、right=len(nums)。每轮取 mid=(left+right)//2；小于目标就令 left=mid+1，否则令 right=mid。区间不断缩小，直到 left==right。'},
      {title:'重复值与空列表也要想明白',text:'对于 [1,3,3,7]，第一个不小于 3 的位置是 1，而不是随便一个 3 的位置。空列表时 left=right=0，循环不执行，插入位自然是 0。目标比所有值大时，答案可以等于列表长度。'},
      {title:'滑动窗口处理连续一段',text:'若每天销量是 [2,1,3]，长度为 2 的窗口先看 [2,1] 得 3，再右移看 [1,3] 得 4。窗口适合连续片段问题；移动时通常把离开的数减掉、把进入的数加上，避免每次重新求和。'},
      {title:'每一步都说明为什么没有漏答案',text:'算法题不能只背几行模板。双指针要说明哪些位置已经比过；二分要说明被丢掉的一半为什么不可能有答案；窗口要说明当前覆盖哪一段。这样遇到边界和重复值才不容易写错。'}
    ],
    code:`word = "小猫猫小"
a, b = 0, len(word) - 1
same = True
while a < b:
    if word[a] != word[b]:
        same = False
        break
    a, b = a + 1, b - 1
print("两端相同:", same)
nums = [1, 3, 3, 7]
target = 3
left, right = 0, len(nums)
while left < right:
    mid = (left + right) // 2
    if nums[mid] < target:
        left = mid + 1
    else:
        right = mid
print("插入位置:", left)
daily = [2, 1, 3]
window = daily[0] + daily[1]
print("前两天:", window)
window = window - daily[0] + daily[2]
print("后两天:", window)`,
    output:'两端相同: True\n插入位置: 1\n前两天: 3\n后两天: 4',
    trace:['双指针从“小猫猫小”的两端开始，每轮比较两个字并向中间移动，直到相遇或交错；都相同，所以得到 True。','二分初始范围 [0,4)，mid=2，值为 3，right 变 2；随后 mid=1，right 变 1。','范围 [0,1) 时 mid=0，值 1 小于目标，left 变 1；这就是最左插入位。','窗口先框住销量 2 和 1，和为 3；右移时减去离开的 2、加上进入的 3，和变为 4。'],
    trap:'二分不是“中间值相等就立刻返回”这一种写法。要找第一个重复值时，相等还得继续查左边；边界不缩小会造成无限循环。滑动窗口则只适合连续片段。',
    tryThis:'把 word 改成“小猫小狗”，把 target 改成 4，再把 daily 最后一个数改成 5。分别先猜三段输出，再运行。',
    check:{q:'为什么示例在 nums[mid] 等于 target 时令 right=mid，而不是马上返回 mid？',answer:'因为 mid 左边可能还有相同的值。题目要找第一个不小于目标的位置，必须保留左侧继续缩小范围。'}
  },
  '9:2': {
    plain:'动态规划是把已经算过的小问题答案记下来，再用它们一步步拼出大问题答案。',
    analogy:'玩数字接龙：先在纸上写 0、1，之后每格写前两格的和，便得到 0、1、1、2、3……写到第 6 格时，不用把之前的格子从头重算，看看已经记下的两格就行。这张记录表就是理解动态规划的起点。爬楼梯“有几种走法”是另一道题，初始值要按那道题重新定义。',
    steps:[
      {title:'先说清每个格子代表什么',text:'示例用 dp[i] 表示第 i 个斐波那契数，而不是“目前总共算了多少次”。状态含义必须写明白，后面才能判断初始值和公式是否正确。斐波那契数列从 0、1 开始，后一个数等于前两个之和。'},
      {title:'先填不用计算的初始格',text:'dp[0]=0、dp[1]=1 是这道斐波那契题的已知答案，叫基础情况。示例只有 n 至少为 1 时才填写 dp[1]；n 为 0 时列表只需要第 0 格。没有初始值，后面的格子就无从计算。真实题目也要先找最小规模时的答案。'},
      {title:'写出从旧答案到新答案的规则',text:'从 i=2 开始，dp[i]=dp[i-1]+dp[i-2]。例如 dp[2]=1+0=1，dp[3]=1+1=2，dp[4]=2+1=3。每次只读前面已经算好的格子，顺序不能随意反过来。'},
      {title:'表格帮助我们避免重复计算',text:'如果直接用递归计算 fib(6)，fib(4) 等小问题可能被反复调用。把每个 dp[i] 算一次并保存，之后再需要就直接读取。不是所有问题都需要动态规划；只有小问题会重复、且大答案能由小答案组成时才特别有用。'},
      {title:'空间也可以进一步节省',text:'若只想知道最后一个斐波那契数，计算时其实只需要前两个结果，可以用两个变量滚动更新，减少额外列表。刚入门先用表格把含义看清，再学节省空间。'},
      {title:'背包题还要看能不能重复选',text:'“每件物品最多拿一次”和“同一件物品能拿很多次”是不同问题。两者的状态转移可能看起来接近，但更新顺序与边界不同。先用少量物品在纸上列出选择，再写代码，不要只背公式。'}
    ],
    code:`n = 6
dp = [0] * (n + 1)
dp[0] = 0
if n >= 1:
    dp[1] = 1
for i in range(2, n + 1):
    dp[i] = dp[i - 1] + dp[i - 2]
print(dp)
print(dp[n])`,
    output:'[0, 1, 1, 2, 3, 5, 8]\n8',
    trace:['先建 7 个格子，编号从 0 到 6，再填入已知的 0 和 1。','i=2 时填 1；i=3 时填 2；随后按同一规则填到 i=6。','打印整张表，可以看见每个小答案；最后 dp[6] 是 8。'],
    trap:'dp[i] 若没有清楚的含义，只记公式很容易把初始值或答案位置写错。动态规划不是看到递归就必须使用的万能方法。',
    tryThis:'把 n 改成 8，先在纸上接着算出 dp[7] 和 dp[8]，再运行对照。',
    check:{q:'为什么计算 dp[6] 之前要先得到 dp[4] 和 dp[5]？',answer:'规则规定 dp[6]=dp[5]+dp[4]。这两个较小问题的答案先保存好，才能直接得到第 6 个数，而不用重复从头计算。'}
  }
});
