# NumPy 核心概念

NumPy 的核心是**ndarray**（N 维数组），它是一种同类型数据的多维容器，比 Python 原生列表更快、更高效。

## 1. 安装与导入

::: tip 提示
NumPy 是一个第三方库，需要先安装才能使用。可以通过 `pip` 命令安装，在此之前请先确认已经安装了 Python 3。
:::

首先确保安装了 NumPy，然后导入（惯例用`np`作为别名）：

```bash
# 安装（如果未安装，建议在虚拟环境中安装，避免全局污染）
python3 -m venv myenv # 创建虚拟环境
source myenv/bin/activate # 激活虚拟环境
python3 -m pip install numpy # 安装 NumPy
```

```python
# 使用前页面内导入
import numpy as np

# 1. 从列表创建一维数组
arr1 = np.array([1, 2, 3, 4, 5])
print("一维数组：", arr1)  # 输出：[1 2 3 4 5]
...

```

## 2. 创建数组（最常用方式）

```python
# 1. 从列表创建一维数组
arr1 = np.array([1, 2, 3, 4, 5])
print("一维数组：", arr1)  # 输出：[1 2 3 4 5]

# 2. 从嵌套列表创建二维数组（矩阵）
arr2 = np.array([[1, 2, 3], [4, 5, 6]])
print("二维数组：\n", arr2)
# 输出：
# [[1 2 3]
#  [4 5 6]]

# 3. 快速创建特殊数组（高频使用）
zeros_arr = np.zeros((2, 3))  # 2行3列全0数组
ones_arr = np.ones((3, 2))    # 3行2列全1数组
range_arr = np.arange(0, 10, 2)  # 0到10（不含），步长2 → [0 2 4 6 8]
linspace_arr = np.linspace(0, 1, 5)  # 0到1之间均匀生成5个数 → [0.   0.25 0.5  0.75 1.  ]
identity_arr = np.eye(3)  # 3阶单位矩阵（对角线为1，其余为0）

print("全0数组：\n", zeros_arr)
print("单位矩阵：\n", identity_arr)
```

## 3. 数组的基本属性

通过属性快速了解数组的关键信息：

```python
arr = np.array([[1, 2, 3], [4, 5, 6]])
print("数组维度：", arr.ndim)  # 输出：2（二维）
print("数组形状（行×列）：", arr.shape)  # 输出：(2, 3)
print("数组元素总数：", arr.size)  # 输出：6
print("元素数据类型：", arr.dtype)  # 输出：int64（根据系统可能不同）
```

## 4. 数组的索引与切片（核心操作）

和 Python 列表类似，但支持多维索引：

```python
# 一维数组索引/切片
arr1 = np.arange(10)
print(arr1[5])  # 取第6个元素 → 5
print(arr1[3:8])  # 切片 → [3 4 5 6 7]

# 二维数组索引/切片（行, 列）
arr2 = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(arr2[1, 2])  # 取第2行第3列 → 6
print(arr2[:, 1])  # 取所有行的第2列 → [2 5 8]
print(arr2[0:2, 1:3])  # 取前2行、后2列 → [[2 3], [5 6]]
```

## 5. 数组的运算（无需循环，向量化操作）

这是 NumPy 最强大的特性之一，直接对整个数组运算：

```python
arr = np.array([[1, 2], [3, 4]])

# 算术运算（逐元素）
print("加2：\n", arr + 2)  # [[3 4] [5 6]]
print("乘3：\n", arr * 3)  # [[3 6] [9 12]]
print("平方：\n", arr **2)  # [[1 4] [9 16]]
print("矩阵相加：\n", arr + arr)  # [[2 4] [6 8]]

# 矩阵乘法（注意和逐元素乘法的区别）
arr2 = np.array([[5, 6], [7, 8]])
print("逐元素乘法：\n", arr * arr2)  # [[5 12] [21 32]]
print("矩阵乘法：\n", arr @ arr2)  # 等价于 np.dot(arr, arr2) → [[19 22] [43 50]]
```

## 6. 常用统计函数

快速计算数组的统计指标：

```python
arr = np.array([[1, 2, 3], [4, 5, 6]])

print("求和：", arr.sum())  # 输出：21
print("按行求和：", arr.sum(axis=1))  # 输出：[6 15]
print("按列求和：", arr.sum(axis=0))  # 输出：[5 7 9]
print("平均值：", arr.mean())  # 输出：3.5
print("最大值：", arr.max())  # 输出：6
print("最小值：", arr.min())  # 输出：1
print("标准差：", arr.std())  # 输出：1.7078...
```

## 7. 数组形状修改

```python
arr = np.arange(12)  # [0 1 2 ... 11]
arr_reshape = arr.reshape(3, 4)  # 改为3行4列
print("重塑后：\n", arr_reshape) # [[ 0  1  2  3] [ 4  5  6  7] [ 8  9 10 11]]

# 扁平化（多维转一维）
arr_flat = arr_reshape.flatten()
print("扁平化后：", arr_flat)  # [ 0  1  2  3  4  5  6  7  8  9 10 11]
```

## 8. 核心优势对比（为什么用 NumPy）

```python
# 对比：Python列表 vs NumPy数组 计算效率
import time

# 原生列表
lst = list(range(1000000))
start = time.time()
lst_sq = [x**2 for x in lst]
print("列表耗时：", time.time() - start)  # 输出：0.0174...

# NumPy数组
arr = np.arange(1000000)
start = time.time()
arr_sq = arr**2
print("NumPy耗时：", time.time() - start)  # 输出：0.00086...
```

运行后会发现，NumPy 的速度是原生列表的几十甚至上百倍。

## 总结

1. **核心对象**：NumPy 的核心是`ndarray`多维数组，支持同类型数据的高效存储和计算。
2. **核心优势**：向量化运算（无需循环）、多维索引/切片、内置统计函数，效率远超 Python 原生列表。
3. **高频操作**：创建数组（`np.array`/`np.zeros`/`np.arange`）、形状修改（`reshape`）、索引切片、算术/矩阵运算、统计函数（`sum`/`mean`/`max`）。
