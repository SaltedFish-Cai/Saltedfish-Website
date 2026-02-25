# Pandas 核心概念

Pandas 是 Python 中用于数据处理和分析的核心库，核心数据结构有两个：

- **Series**：一维标签化数组（可以理解为带索引的列）
- **DataFrame**：二维标签化表格（可以理解为带行/列索引的 Excel 表格）

## 1. 安装与导入

::: tip 提示
Pandas 是一个第三方库，需要先安装才能使用。可以通过 `pip` 命令安装，在此之前请先确认已经安装了 Python 3。
:::

首先确保安装了 Pandas，然后导入（惯例简写为 `pd`）：

```bash
# 安装（如果未安装，建议在虚拟环境中安装，避免全局污染）
python3 -m venv myenv # 创建虚拟环境
source myenv/bin/activate # 激活虚拟环境
python3 -m pip install pandas # 安装 pandas
```

```python
# 导入
import pandas as pd
import numpy as np  # 常和Pandas配合使用，处理数值计算
```

## 2. 创建核心数据结构

### 2.1 创建 Series

```python
# 基础创建：值 + 自定义索引
s = pd.Series([10, 20, 30, 40], index=['a', 'b', 'c', 'd'])
print("Series内容：")
print(s)
# 输出：
# a    10
# b    20
# c    30
# d    40
# dtype: int64

# 常用属性
print("\nSeries索引：", s.index)  # 获取索引
print("Series值：", s.values)    # 获取值（数组形式）
print("Series数据类型：", s.dtype)  # 获取数据类型
```

### 2.2 创建 DataFrame

```python
# 方式1：从字典创建（最常用）
data = {
    '姓名': ['张三', '李四', '王五'],
    '年龄': [20, 25, 30],
    '城市': ['北京', '上海', '广州']
}
df = pd.DataFrame(data)
print("DataFrame内容：")
print(df)
# 输出：
#    姓名  年龄  城市
# 0  张三  20  北京
# 1  李四  25  上海
# 2  王五  30  广州

# 方式2：自定义行索引
df = pd.DataFrame(data, index=['员工1', '员工2', '员工3'])
print("\n自定义行索引的DataFrame：")
print(df)
```

## 3. 数据读取与保存（实战核心）

Pandas 支持读取/保存多种格式（Excel、CSV、JSON 等），最常用的是 CSV 和 Excel：

```python
# 读取CSV文件
# df = pd.read_csv('你的文件路径.csv', encoding='utf-8')  # 中文文件建议指定编码

# 读取Excel文件（需先安装openpyxl：pip install openpyxl）
# df = pd.read_excel('你的文件路径.xlsx', sheet_name='Sheet1')

# 保存为CSV
# df.to_csv('保存路径.csv', index=False, encoding='utf-8')  # index=False不保存行索引

# 保存为Excel
# df.to_excel('保存路径.xlsx', index=False, sheet_name='数据')
```

## 4. 数据查看与筛选（最常用操作）

```python
# 1. 查看数据基本信息
print("前2行数据：")
print(df.head(2))  # 查看前n行（默认5行）
# print(df.tail(2))  # 查看后n行

print("\n数据基本信息：")
df.info()  # 查看列名、数据类型、非空值数量
print("\n数据统计摘要：")
print(df.describe())  # 数值列的均值、标准差、最值等

# 2. 按列筛选
print("\n筛选'姓名'列：")
print(df['姓名'])  # 单列
print("\n筛选'姓名'和'年龄'列：")
print(df[['姓名', '年龄']])  # 多列（注意双层括号）

# 3. 按条件筛选
print("\n筛选年龄>22的行：")
print(df[df['年龄'] > 22])

# 4. 按行索引筛选
print("\n筛选'员工2'行：")
print(df.loc['员工2'])  # 按索引名筛选
# print(df.iloc[1])  # 按行号筛选（从0开始）
```

## 5. 数据清洗（实战高频）

```python
# 1. 处理缺失值
df_clean = df.copy()  # 避免修改原数据
# df_clean.dropna()  # 删除含缺失值的行
# df_clean.fillna({'年龄': 0, '城市': '未知'})  # 填充缺失值

# 2. 处理重复值
# df_clean.drop_duplicates()  # 删除重复行

# 3. 修改列名
df_clean.rename(columns={'姓名': '员工姓名', '年龄': '员工年龄'}, inplace=True)
print("\n修改列名后：")
print(df_clean)
# 输出：
#    员工姓名  员工年龄  城市
# 0  张三    20  北京
# 1  李四    25  上海
# 2  王五    30  广州

# 4. 数据类型转换
# df_clean['年龄'] = df_clean['年龄'].astype(float)  # 转为浮点型
```

## 6. 简单数据运算

```python
# 1. 新增列
df['年龄+5'] = df['年龄'] + 5  # 基于现有列计算
print("\n新增列后：")
print(df)
# 输出：
#    姓名  年龄  城市  年龄+5
# 0  张三  20  北京    25
# 1  李四  25  上海    30
# 2  王五  30  广州    35

# 2. 分组统计
# print(df.groupby('城市')['年龄'].mean())  # 按城市分组，计算年龄均值
```

## 7. 总结

1. Pandas 核心是 **Series（一维）** 和 **DataFrame（二维）**，DataFrame 是日常使用的核心。
2. 新手先掌握 **数据读取/查看/筛选/清洗** 这 4 类操作，能覆盖 80%的基础场景。
3. 核心语法：`df[]` 筛选列/条件行、`df.loc[]` 按索引筛选、`df.info()`/`df.head()` 查看数据。
