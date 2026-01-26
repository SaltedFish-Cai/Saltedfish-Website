# 函数/模块

下面我们详细介绍 Python 中的**函数（Function）**和**模块（Module）**，这两类是组织和复用代码的重要工具。

## 一、函数（def）：代码复用的核心

函数的本质是把一段重复使用的代码“封装”起来，通过调用函数实现代码复用，避免重复编写，同时让代码结构更清晰。

### 1. 函数的基本结构

```python
def 函数名(参数1, 参数2=默认值):
    """函数文档字符串（可选，说明函数功能）"""
    # 函数体（要执行的代码）
    执行逻辑
    return 返回值  # 可选，无return则返回None
```

### 2. 核心用法示例（覆盖所有高频场景）

#### （1）无参数、无返回值（简单功能封装）

```python
# 封装“打印欢迎语”的功能
def print_welcome():
    """打印欢迎语"""
    print("========== 欢迎使用本系统 ==========")

# 调用函数（复用代码）
print_welcome()
print_welcome()  # 多次调用，无需重复写print语句
```

#### （2）有参数、有返回值（最常用）

```python
# 封装“计算两数之和”的功能
def add(a, b):
    """计算两个数的和并返回结果
    :param a: 第一个数
    :param b: 第二个数
    :return: 两数之和
    """
    result = a + b
    return result  # 返回计算结果

# 调用函数，接收返回值
sum1 = add(5, 3)
print(sum1)  # 输出：8
sum2 = add(10, 20)
print(sum2)  # 输出：30
```

#### （3）默认参数（灵活适配不同场景）

默认参数让函数调用更灵活，不传该参数时使用默认值，传参时覆盖默认值。

```python
# 封装“打印个人信息”，性别默认值为“未知”
def print_info(name, age, gender="未知"):
    print(f"姓名：{name}，年龄：{age}，性别：{gender}")

# 调用1：不传gender，使用默认值
print_info("小明", 20)  # 输出：姓名：小明，年龄：20，性别：未知
# 调用2：传gender，覆盖默认值
print_info("小红", 19, "女")  # 输出：姓名：小红，年龄：19，性别：女
```

#### （4）可变参数（处理不确定数量的参数）

- `*args`：接收任意数量的位置参数（打包成元组）；
- `**kwargs`：接收任意数量的关键字参数（打包成字典）。

```python
# 封装“计算多个数的和”
def sum_many(*args):
    """计算任意数量数字的和"""
    total = 0
    for num in args:
        total += num
    return total

# 调用：传任意数量的参数
print(sum_many(1, 2))       # 3
print(sum_many(1, 2, 3, 4)) # 10

# 封装“打印任意关键字参数”
def print_kwargs(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_kwargs(name="小李", age=22, city="北京")
# 输出：
# name: 小李
# age: 22
# city: 北京
```

#### （5）函数复用的实战场景（结合字符串/列表）

```python
# 封装“过滤列表中的空字符串”
def filter_empty_str(lst):
    """过滤列表中的空字符串，返回新列表"""
    new_lst = []
    for s in lst:
        if s.strip() != "":  # 去除首尾空格后判断是否为空
            new_lst.append(s)
    return new_lst

# 调用函数（复用过滤逻辑）
original_lst = ["苹果", "", "香蕉", "  ", "橙子"]
filtered_lst = filter_empty_str(original_lst)
print(filtered_lst)  # 输出：['苹果', '香蕉', '橙子']
```

### 3. 函数的关键注意事项

- 函数定义后**必须调用才会执行**；
- 参数传递顺序：位置参数在前，关键字参数在后；
- 默认参数必须放在非默认参数后面；
- `return` 执行后，函数立即结束，后续代码不会执行。

## 二、字符串：高频实用操作（新手必记）

字符串操作是日常开发的“高频考点”，以下是最常用、最实用的操作，无需记全，重点掌握这些即可。

### 1. 核心操作速查表（附示例）

| 操作类型       | 方法/语法                       | 示例（s = " Hello Python! "）           | 结果                                         |
| -------------- | ------------------------------- | --------------------------------------- | -------------------------------------------- |
| 去除空格       | `strip()`/`lstrip()`/`rstrip()` | `s.strip()`                             | "Hello Python!"                              |
| 大小写转换     | `lower()`/`upper()`/`title()`   | `s.lower()`                             | " hello python! "                            |
| 分割/拼接      | `split()`/`join()`              | `s.split(" ")`/`"-".join(["a","b"])`    | ['', '', 'Hello', 'Python!', '', ''] / "a-b" |
| 替换           | `replace(old, new)`             | `s.replace("Python", "World")`          | " Hello World! "                             |
| 查找/判断      | `find()`/`in`/`startswith()`    | `"Python" in s`/`s.startswith("Hello")` | True / False                                 |
| 长度/索引/切片 | `len()`/`[索引]`/`[起始:结束]`  | `len(s)`/`s[3]`/`s[3:8]`                | 16 / "H" / "Hello"                           |

### 2. 实战示例（覆盖 80%场景）

```python
# 1. 处理用户输入（去除空格+判断是否为空）
user_input = input("请输入用户名：").strip()
if user_input == "":
    print("用户名不能为空！")
else:
    print(f"欢迎你，{user_input}！")

# 2. 字符串格式化（拼接复杂字符串）
name = "小明"
score = 95.5
# f-string（推荐）：简洁、高效
info = f"学生：{name}，数学成绩：{score}分，等级：{'优秀' if score>=90 else '良好'}"
print(info)  # 输出：学生：小明，数学成绩：95.5分，等级：优秀

# 3. 分割与拼接（处理文本数据）
text = "苹果,香蕉,橙子"
fruits = text.split(",")  # 按逗号分割成列表
print(fruits)  # ['苹果', '香蕉', '橙子']
new_text = " | ".join(fruits)  # 用|拼接
print(new_text)  # 苹果 | 香蕉 | 橙子

# 4. 查找与替换（文本清洗）
log = "2026-01-26 错误：登录失败，用户名错误"
if "错误" in log:
    clean_log = log.replace("错误：", "提示：")
    print(clean_log)  # 2026-01-26 提示：登录失败，用户名错误
```

## 三、列表：高频实用操作（新手必记）

列表是 Python 最常用的容器，以下操作覆盖增删改查、排序、过滤等核心场景。

### 1. 核心操作速查表（附示例）

| 操作类型  | 方法/语法                        | 示例（lst = [1, 3, 2, 4]）               | 结果                    |
| --------- | -------------------------------- | ---------------------------------------- | ----------------------- |
| 增加元素  | `append()`/`insert()`/`extend()` | `lst.append(5)`/`lst.insert(0,0)`        | [1,3,2,4,5]/[0,1,3,2,4] |
| 删除元素  | `remove()`/`pop()`/`del`         | `lst.remove(3)`/`lst.pop()`/`del lst[0]` | [1,2,4]/4/[3,2,4]       |
| 修改元素  | `[索引] = 新值`                  | `lst[1] = 10`                            | [1,10,2,4]              |
| 查找/判断 | `index()`/`in`/`count()`         | `lst.index(2)`/`3 in lst`/`lst.count(2)` | 2 / True / 1            |
| 排序/反转 | `sort()`/`sorted()`/`reverse()`  | `lst.sort()`/`sorted(lst, reverse=True)` | [1,2,3,4]/[4,3,2,1]     |
| 切片/长度 | `[起始:结束:步长]`/`len()`       | `lst[1:3]`/`len(lst)`                    | [3,2]/4                 |

### 2. 实战示例（覆盖 80%场景）

```python
# 1. 列表遍历+条件过滤
nums = [1, 2, 3, 4, 5, 6, 7, 8]
# 筛选出所有偶数
even_nums = []
for num in nums:
    if num % 2 == 0:
        even_nums.append(num)
print(even_nums)  # [2,4,6,8]

# 2. 列表排序（升序/降序）
scores = [85, 92, 78, 90, 88]
scores.sort()  # 原地升序
print(scores)  # [78, 85, 88, 90, 92]
scores.sort(reverse=True)  # 原地降序
print(scores)  # [92, 90, 88, 85, 78]

# 3. 列表推导式（简洁创建/过滤列表，Python特色）
# 替代上面的“筛选偶数”，一行搞定
even_nums2 = [num for num in nums if num % 2 == 0]
print(even_nums2)  # [2,4,6,8]

# 4. 嵌套列表（处理二维数据，如表格）
students = [
    ["小明", 20, 90],
    ["小红", 19, 95],
    ["小李", 21, 88]
]
# 遍历嵌套列表，打印每个学生信息
for student in students:
    print(f"姓名：{student[0]}，年龄：{student[1]}，成绩：{student[2]}")
```

## 总结

1. **函数（def）**：核心是封装重复代码实现复用，重点掌握参数（默认参数、可变参数）和返回值的用法，调用函数是复用的关键；
2. **字符串操作**：高频操作集中在去除空格、分割/拼接、替换、格式化，f-string 是最推荐的字符串格式化方式；
3. **列表操作**：核心是增删改查、排序和遍历过滤，列表推导式能简洁实现列表的创建与过滤，大幅提升效率。
