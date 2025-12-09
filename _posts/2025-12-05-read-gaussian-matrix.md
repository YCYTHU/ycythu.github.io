---
title: 使用Python读取Gaussian生成的分块格式矩阵文件
tags: 
- Python
- Quantum Chemistry
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/FRET.jpg
---
在使用 Gaussian 进行量化计算时，程序会按照固定格式输出各类矩阵（例如重叠矩阵、密度矩阵等）。通常来说，前一行或前数行用于说明信息，随后进入正式的数据部分。矩阵的内容会按照“每五列一组”的方式分块输出：先给出当前分组的列号，再逐行列出行号及对应的五列数据。
<!--more-->
对于下三角矩阵，输出格式与此相同，只是不会包含上三角中不存在的数据部分。示例如下：

在需要对 Gaussian 输出的矩阵进行进一步的自定义计算时，首先要将其从分块格式还原为常见的二维矩阵结构。下面给出一段使用 Python 进行读取与重构的示例代码：

```python
import numpy as np

def read_gaussian_lower_triangle(txt_path, start, column_count, to_full=True):
    lines=open(txt_path).readlines()[start-1:]
    d=[0]+[sum(list(range(column_count+1,0,-5))[:i+1]) for i in range(column_count//5)]
    il=[l.split()[1:] for c,l in enumerate(lines) if c not in d]
    lm=[np.cumsum([i]+list(range(column_count-5,0,-5))[:i//5]).tolist() for i in range(column_count)]
    lt=[sum([il[j] for j in idx],[]) for idx in lm]
    if to_full:
        return np.array([[lt[j][i] if i<=j else lt[i][j] for i in range(len(lt))] for j in range(len(lt))], dtype=float)
    return np.array([row + [np.nan]*(column_count-len(row)) for row in lt], dtype=float)

def read_gaussian_full_matrix(txt_path, start, column_count):
    lines=open(txt_path).readlines()[start-1:]
    d=[0]+[(column_count+1)*(i+1) for i in range((column_count-1)//5)]
    il=[l.split()[1:] for c,l in enumerate(lines) if c not in d]
    lm=[[b+bias for b in [0]+[column_count*(i+1) for i in range((column_count-1)//5)]] 
          for bias in range(column_count)]
    return np.array([sum([il[j] for j in idx], []) for idx in lm], dtype=float)
```