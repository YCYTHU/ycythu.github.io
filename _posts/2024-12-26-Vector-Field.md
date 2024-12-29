---
title: 通过粒子动画在canvas中可视化向量场
tags: 
- Code
- JavaScript
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/electric field.jpg
---
<!--more-->
<style>
    canvas {
        display: block;
        margin: 0 auto;
    }
</style>


### 散度

下图展示了向量场

$$\left\langle y(1-2x^2)e^{-(x^2+y^2)},x(1-2y^2)e^{-(x^2+y^2)}\right\rangle$$

的可视化结果。为了避免粒子速度差异太大，因此将向量场进行了归一化处理。不同颜色代表了散度不同的区域，红色代表散度为正，蓝色代表散度为负。

<canvas id="vector_field_div"></canvas>

### 旋度

下图展示了向量场

$$\left\langle\frac{6xy}{x^2+y^2},\frac{6y^2}{x^2+y^2}-2\right\rangle$$

的可视化结果。不同颜色代表了 旋度不同的区域，红色代表旋度为正（逆时针旋转），蓝色代表旋度为负（顺时针旋转）。

<canvas id="vector_field_curl"></canvas>

<script src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/js/vector_field/VectorField.min.js"></script>
