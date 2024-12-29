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

## 使用方法

复制下面的代码为html文件，更改`createVectorField`函数以更改向量场，可按需修改其他参数。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vector Field</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
            background: #000;
        }
        canvas {
            display: block;
        }
    </style>
</head>
<body>
    <canvas id="canvas"></canvas>
</body>
<script src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/js/vector_field/VectorFieldAnimeFull.min.js"></script>
<script type="text/javascript">
    const MAX_PARTICLE_AGE = 100;       // 粒子寿命
    const PARTICLE_MULTIPLIER = 10.0;   // 粒子密度
    const FRAME_RATE = 25;              // 刷新间隔（ms）
    const LINE_WIDTH = 1.0;             // 线宽
    const EVOLVE_STEP = 0.5;            // 步长
    const COLORMAP = [                  // 颜色图
        [58, 76, 192],
        [103, 136, 237],
        [153, 186, 254],
        [200, 215, 239],
        [237, 208, 193],
        [246, 167, 137],
        [225, 104, 82],
        [179, 3, 38]
    ];
    function createVectorField() {
        return {
            interpolate: (x, y) => {
                x = (x - bounds.width / 2) / (bounds.height /2);    // 等效x坐标
                y = (y - bounds.height / 2) / (bounds.height /2);   // 等效y坐标
                const u = 6* (x*y)/(x*x+y*y);                       // 向量场x分量
                const v = 6* (y*y)/(x*x+y*y)-2;                     // 向量场y分量
                const norm = Math.sqrt(u * u + v * v);
                const colorParam = norm;                            // 着色依据
                return [u, v, norm, colorParam];
            }
        };
    }
    const canvas = document.getElementById("canvas");
    const dpr = window.devicePixelRatio || 1;
    const ctx = initializeCanvas(canvas, dpr);
    const bounds = {
        x: 0,
        y: 0,
        width: canvas.width / dpr,
        height: canvas.height / dpr
    };
    const particleCount = Math.round(bounds.width * PARTICLE_MULTIPLIER);
    const particles = Array.from({ length: particleCount }, () => randomizeParticle({}));
    const vectorField = createVectorField();
    const vectorColorRange = calculateColorLim(vectorField);
    const vectorColorScale = calculateColorScale(255, vectorColorRange, COLORMAP);
    frame(particles, vectorField, vectorColorScale, ctx);
</script>
</html>
```

## 示例

### 散度

下图展示了向量场

$$\left\langle\sin(\pi x+\pi y),\cos(\pi x-\pi y-\frac\pi 2)\right\rangle$$

的可视化结果。不同颜色代表了散度不同的区域，红色代表散度为正，蓝色代表散度为负。

<canvas id="vector_field_div"></canvas>

### 旋度

下图展示了向量场

$$\left\langle\frac{6xy}{x^2+y^2},\frac{6y^2}{x^2+y^2}-2\right\rangle$$

的可视化结果。不同颜色代表了旋度不同的区域，红色代表旋度为正（逆时针旋转），蓝色代表旋度为负（顺时针旋转）。

<canvas id="vector_field_curl"></canvas>

<script src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/js/vector_field/VectorFieldAnime.min.js"></script>
<script>
const canvas1 = document.getElementById("vector_field_div");
const canvas2 = document.getElementById("vector_field_curl");
const dpr = window.devicePixelRatio || 1;
const ctx1 = initializeCanvas(canvas1, dpr);
const ctx2 = initializeCanvas(canvas2, dpr);
const bounds = {
    x: 0,
    y: 0,
    width: canvas1.width / dpr,
    height: canvas1.height / dpr
};
const MAX_PARTICLE_AGE = 100;
const PARTICLE_MULTIPLIER = 10.0;
const FRAME_RATE = 25;
const LINE_WIDTH = 1.0;
const EVOLVE_STEP = 0.5;
const COLORMAP = [
    [58, 76, 192],
    [103, 136, 237],
    [153, 186, 254],
    [200, 215, 239],
    [237, 208, 193],
    [246, 167, 137],
    [225, 104, 82],
    [179, 3, 38]
];
const particleCount = Math.round(bounds.width * PARTICLE_MULTIPLIER);
const particles1 = Array.from({ length: particleCount }, () => randomizeParticle({}));
const particles2 = Array.from({ length: particleCount }, () => randomizeParticle({}));
const vectorField1 = createVectorField('div');
const vectorField2 = createVectorField('curl');
const vectorColorRange1 = calculateColorLim(vectorField1);
const vectorColorScale1 = calculateColorScale(255, vectorColorRange1, COLORMAP);
const vectorColorRange2 = calculateColorLim(vectorField2);
const vectorColorScale2 = calculateColorScale(255, vectorColorRange2, COLORMAP);
frame(particles1, vectorField1, vectorColorScale1, ctx1);
frame(particles2, vectorField2, vectorColorScale2, ctx2);
function createVectorField(type = 'default') {
    if (type === 'div') {
        return {
            interpolate: (x, y) => {
                x = (x - bounds.width / 2) / (bounds.height /2);
                y = (y - bounds.height / 2) / (bounds.height /2);
                const u = Math.sin(Math.PI*(x+y)); 
                const v = Math.cos(Math.PI*(x-y-0.5));
                const norm = Math.sqrt(u * u + v * v);
                const colorParam = -Math.sin(Math.PI*x)*Math.sin(Math.PI*y);
                return [u, v, norm, colorParam];
            }
        };
    }
    else if (type === 'curl') {
        return {
            interpolate: (x, y) => {
                x = (x-bounds.width/2) / (bounds.height/3);
                y = (y-bounds.height/2) / (bounds.height/3);
                const u = 6*x*y/(x * x + y * y);
                const v = 6*y*y/(x * x + y * y) - 2;
                const norm = Math.sqrt(u * u + v * v);
                const colorParam = -6*x/Math.sqrt(x * x + y * y);
                return [u, v, norm, colorParam];
            }
        };
    }
}
</script>
