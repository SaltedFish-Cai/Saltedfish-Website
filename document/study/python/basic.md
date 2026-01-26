# Python 基础语法核心内容

:::tip 建议
在学习 AI 相关内容之前，建议先学习 `Python` 基础语法，开始前确保你已经安装了 `Python` 环境（推荐使用 Python 3.8+），并配置了环境变量。
`Python` 作为一种动态类型语言，无需声明变量类型，直接赋值即可。
:::

## 1. 变量与数据类型

Python 是动态类型语言，无需声明变量类型，直接赋值即可。

**核心数据类型**：

- 数值型：整数(int)、浮点数(float)、布尔值(bool，True/False)
- 字符串(str)：用单引号/双引号/三引号包裹
- 容器型：列表(list)、元组(tuple)、字典(dict)、集合(set)

```python
# 变量赋值
name = "小明"  # 字符串
age = 20       # 整数
height = 175.5 # 浮点数
is_student = True # 布尔值

# 列表（可变，有序）
fruits = ["苹果", "香蕉", "橙子"]
# 元组（不可变，有序）
point = (10, 20)
# 字典（键值对，无序）
person = {"name": "小明", "age": 20}
# 集合（无序，无重复）
nums = {1, 2, 3, 3}  # 最终为 {1,2,3}
```

## 2. 运算符

- 算术运算符：`+ - * / //（整除） %（取余） **（幂）`
- 比较运算符：`== != > < >= <=`
- 逻辑运算符：`and or not`
- 赋值运算符：`= += -= *= /=`

```python
# 算术运算示例
a = 10
b = 3
print(a + b)  # 13
print(a // b) # 3（整除）
print(a % b)  # 1（取余）

# 逻辑运算示例
x = 5
print(x > 3 and x < 10) # True
print(not (x == 5))     # False
```

## 3. 条件语句（if-elif-else）

根据条件执行不同代码块，用缩进（4 个空格）区分代码块，无需大括号。

```python
score = 85
if score >= 90:
    print("优秀")
elif score >= 80:
    print("良好")
elif score >= 60:
    print("及格")
else:
    print("不及格")
```

## 4. 循环语句

- `for` 循环：遍历可迭代对象（列表、字符串、字典等）
- `while` 循环：满足条件时重复执行

```python
# for循环遍历列表
fruits = ["苹果", "香蕉", "橙子"]
for fruit in fruits:
    print(f"我喜欢吃{fruit}")

# for循环+range（生成序列）
for i in range(1, 4):  # 1,2,3
    print(i)

# while循环
count = 0
while count < 3:
    print(f"计数：{count}")
    count += 1  # 避免死循环
```

## 5. 函数

用`def`定义函数，可带参数、返回值，支持默认参数。

```python
# 无参数无返回值
def say_hello():
    print("你好！")

# 有参数有返回值
def add(a, b=0):  # b为默认参数，默认值0
    return a + b

# 调用函数
say_hello()
result = add(5, 3)
print(result)  # 8
result2 = add(5)  # 使用默认参数
print(result2)  # 5
```

## 6. 字符串操作

Python 字符串支持索引、切片、拼接、格式化等常用操作。

```python
s = "Python基础"
# 索引（从0开始）
print(s[0])  # P
# 切片（左闭右开）
print(s[:6]) # Python
# 拼接
s2 = s + "语法"
print(s2)    # Python基础语法
# 格式化（f-string，Python3.6+推荐）
name = "小明"
age = 20
print(f"姓名：{name}，年龄：{age}")  # 姓名：小明，年龄：20
```

## 7. 列表操作（最常用容器）

列表支持增、删、改、查，是 Python 最常用的可变容器。

```python
nums = [1, 2, 3]
# 增加元素
nums.append(4)  # 末尾加，nums变为[1,2,3,4]
nums.insert(1, 0)  # 索引1处加0，nums变为[1,0,2,3,4]
# 修改元素
nums[0] = 10  # nums变为[10,0,2,3,4]
# 删除元素
nums.remove(0)  # 删除值为0的元素，nums变为[10,2,3,4]
del nums[-1]    # 删除最后一个元素，nums变为[10,2,3]
# 查找
print(2 in nums)  # True（判断是否存在）
print(nums.index(2))  # 1（找索引）
```

## 8. 注释

注释用于解释代码，不执行，分为单行注释和多行注释。

```python
# 这是单行注释
"""
这是多行注释
可以写多行内容
"""
print("注释不影响代码执行")
```

## 9. 基础语法注意事项

1. **缩进**：Python 用缩进（4 个空格/1 个 Tab）区分代码块，缩进错误会报`IndentationError`，是新手最易踩的坑。
2. **大小写敏感**：`name`和`Name`是两个不同变量，`True`是布尔值，`true`则是普通变量。
3. **行尾无需分号**：Python 允许加分号，但不推荐，一行一个语句更符合规范。
4. **数据类型转换**：可通过`int()`/`float()`/`str()`等函数转换类型，如`int("123")`得到 123。
