# 条件/循环语句

下面我们详细介绍 Python 中的**条件语句（if-elif-else）** 和**循环语句（for/while）**，这两类语句是控制代码执行逻辑的核心，我会用清晰的逻辑和实用的示例帮你彻底理解。

## 一、条件语句（if-elif-else）

条件语句的核心是“根据条件判断，执行不同的代码块”，Python 用**缩进**（4 个空格）划分代码块，无需大括号，这是和其他语言的关键区别。

## 1. 基本结构

| 结构                | 适用场景       | 语法示例                                            |
| ------------------- | -------------- | --------------------------------------------------- |
| 单分支 if           | 满足条件才执行 | `if 条件: 执行代码`                                 |
| 双分支 if-else      | 二选一执行     | `if 条件: 执行代码1 else: 执行代码2`                |
| 多分支 if-elif-else | 多选一执行     | `if 条件1: 代码1 elif 条件2: 代码2 ... else: 代码N` |

## 2. 核心示例（实用场景）

```python
# 示例1：单分支if（判断是否成年）
age = 18
if age >= 18:
    print("你已成年，可以独立出行")  # 缩进的代码块，条件满足时执行

# 示例2：双分支if-else（判断奇偶）
num = 7
if num % 2 == 0:
    print(f"{num}是偶数")
else:
    print(f"{num}是奇数")  # 输出：7是奇数

# 示例3：多分支if-elif-else（成绩评级）
score = 88
if score >= 90:
    grade = "优秀"
elif score >= 80:  # 隐含条件：score < 90 且 >=80
    grade = "良好"
elif score >= 60:  # 隐含条件：score < 80 且 >=60
    grade = "及格"
else:  # 所有条件都不满足时执行
    grade = "不及格"
print(f"成绩等级：{grade}")  # 输出：成绩等级：良好

# 示例4：条件嵌套（if里套if）
age = 20
gender = "女"
if age >= 18:
    print("已成年")
    if gender == "女":
        print("女性成年公民")  # 输出：已成年 + 女性成年公民
```

## 3. 关键注意事项

- 条件可以是**布尔值**、**比较表达式**（> / < / == 等）、**逻辑表达式**（and / or / not）；
- 缩进必须统一（4 个空格），缩进错误会报 `IndentationError`；
- `elif` 和 `else` 不能单独使用，必须跟在 `if` 后面；
- 条件判断是“短路执行”：只要某个条件满足，后续的 `elif/else` 就不再判断。

## 二、循环语句

循环的核心是“重复执行一段代码”，Python 主要有 `for` 循环（遍历）和 `while` 循环（条件循环）两类。

## 1. for 循环（遍历循环）

`for` 循环适合**遍历可迭代对象**（列表、字符串、字典、range 等），是日常使用最多的循环。

### （1）基本语法

```python
for 变量 in 可迭代对象:
    循环体代码（缩进）
```

### （2）核心示例

```python
# 示例1：遍历列表（最常用）
fruits = ["苹果", "香蕉", "橙子"]
for fruit in fruits:
    print(f"我喜欢吃{fruit}")  # 依次输出每个水果

# 示例2：遍历字符串（按字符遍历）
s = "Python"
for char in s:
    print(char)  # 依次输出 P y t h o n

# 示例3：遍历字典（三种方式）
person = {"name": "小明", "age": 20}
# 遍历key（默认）
for key in person:
    print(key)  # name, age
# 遍历value
for value in person.values():
    print(value)  # 小明, 20
# 遍历键值对（最常用）
for k, v in person.items():
    print(f"{k}: {v}")  # name:小明，age:20

# 示例4：range生成数字序列（循环指定次数）
# range(起始, 结束, 步长)，左闭右开，起始默认0，步长默认1
for i in range(5):        # 0,1,2,3,4（循环5次）
    print(i)
for i in range(1, 6, 2):  # 1,3,5（从1到5，步长2）
    print(i)
```

## 2. while 循环（条件循环）

`while` 循环适合**不确定循环次数**的场景，只要条件为 `True`，就会重复执行。

### （1）基本语法

```python
while 条件:
    循环体代码（缩进）
    # 必须有修改条件的语句，避免死循环
```

### （2）核心示例

```python
# 示例1：基础while（计数到3）
count = 0
while count < 3:
    print(f"当前计数：{count}")
    count += 1  # 关键：修改count，否则死循环
# 输出：0 → 1 → 2

# 示例2：死循环+break（用户输入正确才退出）
while True:  # 条件永远为True，死循环
    password = input("请输入密码：")
    if password == "123456":
        print("密码正确，登录成功")
        break  # 跳出循环，终止执行
    else:
        print("密码错误，请重试")

# 示例3：while+continue（跳过某些循环）
# 打印1-5中的奇数
num = 0
while num < 5:
    num += 1
    if num % 2 == 0:
        continue  # 跳过本次循环，直接进入下一次
    print(num)  # 输出：1,3,5
```

## 3. 循环控制关键字

| 关键字   | 作用                                  | 示例场景                 |
| -------- | ------------------------------------- | ------------------------ |
| break    | 立即终止**当前循环**，跳出循环体      | 密码输入正确时退出循环   |
| continue | 跳过本次循环剩余代码，直接进入下一次  | 跳过偶数，只打印奇数     |
| else     | 循环正常结束（未被 break 终止）时执行 | 遍历列表未找到目标时提示 |

### 循环+else 示例

```python
# for+else：遍历完列表未找到目标时执行else
fruits = ["苹果", "香蕉", "橙子"]
target = "葡萄"
for fruit in fruits:
    if fruit == target:
        print(f"找到{target}了")
        break
else:  # 循环正常结束（没触发break）才执行
    print(f"未找到{target}")  # 输出：未找到葡萄

# while+else：同理
count = 0
while count < 3:
    count += 1
else:
    print("循环正常结束，count=", count)  # 输出：循环正常结束，count=3
```

## 三、条件+循环结合示例（实战场景）

```python
# 示例：计算1-100的偶数和
sum_even = 0
for i in range(1, 101):
    if i % 2 == 0:
        sum_even += i
print(f"1-100的偶数和：{sum_even}")  # 输出：2550

# 示例：猜数字游戏（while+if）
import random
target_num = random.randint(1, 10)  # 生成1-10的随机数
while True:
    guess = int(input("猜1-10之间的数字："))
    if guess == target_num:
        print("恭喜猜对了！")
        break
    elif guess < target_num:
        print("太小了，再试试")
    else:
        print("太大了，再试试")
```

## 总结

条件语句和循环语句的核心要点：

1. **条件语句**：用 `if-elif-else` 实现分支逻辑，缩进是关键，`elif/else` 不能单独使用，支持嵌套；
2. **for 循环**：适合遍历可迭代对象（列表、字典、range 等），是日常最常用的循环；
3. **while 循环**：适合不确定循环次数的场景，必须有修改条件的语句（如 `count +=1`）避免死循环，`break/continue` 可灵活控制循环流程。
