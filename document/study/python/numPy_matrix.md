# NumPy 数据处理/矩阵运算

本文主要介绍 NumPy 中数据处理的高频场景，包括数据清洗、数据变换、数据筛选等。

## 1. NumPy 数据处理（高频场景）

数据处理主要包括数据清洗、数据变换、数据筛选等，NumPy 提供了简洁高效的方法，避免繁琐的循环。

### 1.1 数据清洗（缺失值/异常值处理）

NumPy 中用 `np.nan` 表示缺失值，`np.isnan()` 用于检测缺失值：

```python
import numpy as np

# 构造含缺失值和异常值的数据集
data = np.array([[1.2, 3.5, np.nan, 7.8],
                 [4.1, np.nan, 6.3, 8.9],
                 [9.2, 10.5, 11.1, 12.7],
                 [100.0, 14.2, 15.6, 16.8]])  # 100.0是异常值

# 1. 检测缺失值
print(
    "缺失值位置：\n", np.isnan(data)
)  # [[False False True False] [False True False False] [False False False False] [False False False False]]

# 2. 填充缺失值（常用均值/中位数填充）
# 按列计算均值（跳过缺失值）
col_means = np.nanmean(data, axis=0)
print("每列均值（跳过缺失值）：", col_means)  # 输出：[28.625  9.4  11.  11.55]

# 填充缺失值
data_filled = np.where(np.isnan(data), col_means, data)
print(
    "填充缺失值后：\n", data_filled
)  # 输出：[[  1.2   3.5  11.    7.8] [  4.1   9.4   6.3   8.9] [  9.2  10.5  11.1  12.7] [100.   14.2  15.6  16.8]].

# 3. 处理异常值（比如过滤/替换超过3倍标准差的值）
# 计算每列的均值和标准差
col_means_all = np.mean(data_filled, axis=0)
col_std = np.std(data_filled, axis=0)

# 定义异常值阈值（3倍标准差）
threshold = 3 * col_std
# 检测异常值位置
outliers = np.abs(data_filled - col_means_all) > threshold
print(
    "异常值位置：\n", outliers
)  # 输出： [[False False False False] [False False False False] [False False False False] [False False False False]]

# 替换异常值为列均值
data_clean = np.where(outliers, col_means_all, data_filled)
print(
    "清洗后的数据：\n", data_clean
)  # 输出：[[  1.2   3.5  11.    7.8] [  4.1   9.4   6.3   8.9] [  9.2  10.5  11.1  12.7] [100.   14.2  15.6  16.8]]
```

### 1.2 数据变换（归一化/标准化）

数据变换是机器学习预处理的常用步骤，NumPy 可以一键实现：

```python
# 构造示例数据
data = np.array([[10, 200, 3000],
                 [20, 400, 6000],
                 [30, 600, 9000]])

# 1. 最小值-最大值归一化（缩放到0-1之间）
# 公式：(x - min) / (max - min)
min_vals = np.min(data, axis=0)  # 按列取最小值
print("每列最小值：", min_vals)  # 输出：[10 200 3000]
max_vals = np.max(data, axis=0)  # 按列取最大值
print("每列最大值：", max_vals)  # 输出：[ 30  600 9000]
data_norm = (data - min_vals) / (max_vals - min_vals)
print(
    "最小值-最大值归一化：\n", data_norm
)  # 输出：[[0.  0.  0. ] [0.5 0.5 0.5] [1.  1.  1. ]]

# 2. 标准化（Z-score，均值为0，标准差为1）
# 公式：(x - mean) / std
mean_vals = np.mean(data, axis=0)
print("均值：\n", mean_vals)  # 输出：[20. 400. 6000.]
std_vals = np.std(data, axis=0)
print("标准差：\n", std_vals)  # 输出：[10. 200. 3000.]
data_standard = (data - mean_vals) / std_vals
print("标准化后：\n", data_standard)  # 输出：[[-1.22474487 -1.22474487 -1.22474487] [ 0.  0.  0.] [ 1.22474487  1.22474487  1.22474487]]

```

### 1.3 数据筛选与排序

```python
# 构造示例数据
data = np.array([[5, 2, 8],
                 [3, 9, 1],
                 [7, 4, 6]])

# 1. 按条件筛选元素
# 筛选大于5的元素
mask = data > 5
filtered_data = data[mask]
print("大于5的元素：", filtered_data)  # [8 9 7 6]

# 2. 按列排序
sorted_col = np.sort(data, axis=0)  # 按列升序
print("按列排序：\n", sorted_col)  # 输出：[[3 2 1] [5 4 6] [7 9 8]]

# 3. 按行排序
sorted_row = np.sort(data, axis=1)  # 按行升序
print("按行排序：\n", sorted_row)  # 输出：[[2 5 8] [1 3 9] [4 6 7]]

# 4. 获取排序后的索引（常用）
# 按每行最大值的索引排序
max_idx = np.argmax(data, axis=1)
print("每行最大值的索引：", max_idx)  # [2 1 0]
```

---

## 2. NumPy 矩阵运算（线性代数核心）

矩阵运算是线性代数的基础，NumPy 的`numpy.linalg`模块提供了全套线性代数工具，无需手动实现。

### 2.1 基础矩阵运算

```python
# 定义两个矩阵
A = np.array([[1, 2, 3],
              [4, 5, 6],
              [7, 8, 9]])

B = np.array([[9, 8, 7],
              [6, 5, 4],
              [3, 2, 1]])

# 1. 矩阵加法/减法（逐元素）
print("矩阵加法：\n", A + B)  # 输出：[[10 10 10] [10 10 10] [10 10 10]]
print("矩阵减法：\n", A - B)  # 输出：[[-8 -6 -4] [-2  0  2] [ 4  6  8]]

# 2. 数乘矩阵
print("数乘（A×2）：\n", A * 2)  # 输出：[[ 2  4  6] [ 8 10 12] [14 16 18]]

# 3. 矩阵乘法（重点！）
# 方式1：@ 运算符（推荐，直观）
mat_mul = A @ B
# 方式2：np.dot()（兼容旧版本）
mat_mul2 = np.dot(A, B)
# 方式3：np.matmul()（专门的矩阵乘法）
mat_mul3 = np.matmul(A, B)

print("矩阵乘法：\n", mat_mul)  # 输出：[[ 30  24  18] [ 84  69  54] [138 114  90]]
print("np.dot()结果：\n", mat_mul2)  # 输出：[[ 30  24  18] [ 84  69  54] [138 114  90]]
print("np.matmul()结果：\n", mat_mul3)  # 输出：[[ 30  24  18] [ 84  69  54] [138 114  90]]

# 4. 矩阵转置
A_T = A.T
print("A的转置：\n", A_T)  # 输出：[[1 4 7] [2 5 8] [3 6 9]]

# 5. 逐元素乘法（和矩阵乘法区分！）
elem_mul = A * B
print("逐元素乘法：\n", elem_mul)  # 输出：[[ 9 16 21] [24 25 24] [21 16  9]]
```

### 2.2 线性代数核心运算（逆矩阵、行列式、特征值）

```python
# 定义可逆矩阵（非奇异矩阵）
C = np.array([[1, 2],
              [3, 4]])

# 1. 计算行列式
det_C = np.linalg.det(C)
print("C的行列式：", det_C)  # 输出：-2.0（行列式≠0才可逆）

# 2. 计算逆矩阵
inv_C = np.linalg.inv(C)
print("C的逆矩阵：\n", inv_C)  # 输出：[[-2.   1. ] [ 1.5 -0.5]]

# 验证：原矩阵 × 逆矩阵 = 单位矩阵
print("验证逆矩阵：\n", C @ inv_C)  # 输出接近[[1,0],[0,1]]（浮点误差）

# 3. 计算特征值和特征向量
eigenvalues, eigenvectors = np.linalg.eig(C)
print("特征值：", eigenvalues)  # 输出：[-0.37228132  5.37228132]
print("特征向量：\n", eigenvectors)  # 输出：[[-0.82456484 -0.41597356] [ 0.56576746 -0.90937671]]

# 4. 求解线性方程组 Ax = b
# 示例：解方程组 1x + 2y = 5; 3x + 4y = 11
A = np.array([[1, 2], [3, 4]])
b = np.array([5, 11])
x = np.linalg.solve(A, b)
print("方程组的解：x =", x[0], ", y =", x[1])  # x=1, y=2

# 5. 矩阵的秩
rank_A = np.linalg.matrix_rank(A)
print("A的秩：", rank_A)  # 输出：2（满秩）
```

### 2.3 矩阵形状适配（广播机制）

NumPy 的广播机制可以让不同形状的矩阵/数组进行运算，无需手动扩展维度：

```python
# 示例1：矩阵 + 向量（自动广播）
mat = np.array([[1, 2, 3], [4, 5, 6]])
vec = np.array([10, 20, 30])
# 向量自动扩展为[[10,20,30],[10,20,30]]，再和矩阵相加
result = mat + vec
print("矩阵+向量（广播）：\n", result)  # 输出：[[11 22 33] [14 25 36]]

# 示例2：行向量 × 列向量（生成矩阵）
row_vec = np.array([[1, 2, 3]])  # 1×3
col_vec = np.array([[4], [5], [6]])  # 3×1
# 广播后：3×3矩阵
broadcast_mul = row_vec * col_vec
print("行向量×列向量（广播）：\n", broadcast_mul)  # 输出：[[ 4  8 12] [ 5 10 15] [ 6 12 18]]
```

---

## 3. 总结

1. **数据处理核心**：

   - 缺失值用`np.nan`表示，可通过`np.nanmean()`填充、`np.isnan()`检测；
   - 数据变换优先用归一化（`(x-min)/(max-min)`）或标准化（`(x-mean)/std`）；
   - 数据筛选通过布尔掩码（`data[条件]`）实现，高效且简洁。

2. **矩阵运算核心**：
   - 矩阵乘法用`@`/`np.matmul()`，逐元素乘法用`*`，务必区分；
   - 线性代数运算（逆矩阵、行列式、解方程）都在`np.linalg`模块中；
   - 广播机制可自动适配不同形状的数组，避免手动扩展维度，提升效率。
