---
title: 科学绘图颜色替换工具
tags:
- Color
- Code
- JavaScript
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/default.jpg
favorite: true
---
当需要调整图表配色时，如果找不到原始绘图数据或源文件，对位图截图进行手动修图不仅效率极低，而且极易破坏图像边缘的画质，下面的工具可以实现在线更改绘图的配色方案。
<!--more-->

<script src="https://cdn.jsdelivr.net/npm/img-comparison-slider@8/dist/index.js" defer></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/img-comparison-slider@8/dist/styles.css"/>
<style>
  .slider-example-split-line {
    box-shadow: 0px 0px 20px 0px #ccc;
    --divider-width: 4px;
    --divider-color: #555;
    --default-handle-opacity: 0;
  }
</style>

## 核心特点与原理

本工具提取图像的逐像素颜色信息，在 RGB 空间内依色彩方向执行聚类分析，自动识别并归类不同区域。同时对同色像素的抗锯齿透明度进行检测，并在颜色替换过程中对透明度信息进行保留，避免修改后出现生硬的锯齿。为保证色彩替换的精确度，**推荐采用 PNG 等无损压缩格式**的图片。

<a class="button button--success button--rounded" href="/chemistry-collections/replace-plot-color">点击开始使用</a>

## 效果说明与对比

由于一般绘图工具在导出位图时会自动开启**抗锯齿**，因此线条或填充区域的边缘颜色与中心颜色并不单一，而是会与背景色产生过渡混合。 本工具能够自动检测这些混合比例，并在替换新颜色时自动保留原有的平滑过渡效果。拖动下方滑块查看替换前后的实际效果。

<div style="display: flex; justify-content: center; column-gap: 30px;">
  <div style="width: 40%;">
    <img-comparison-slider tabindex="0" class="rendered slider-example-split-line">
      <img slot="first" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/replace%20plot%20color/plot-with-scatter.png">
      <img slot="second" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/replace%20plot%20color/plot-with-scatter-replace.png">
      <svg slot="handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6"><path stroke="#555" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#555" vector-effect="non-scaling-stroke"></path></svg>
    </img-comparison-slider>
  </div>
  <div style="width: 30%;">
    <img-comparison-slider tabindex="0" class="rendered slider-example-split-line">
      <img slot="first" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/replace%20plot%20color/blue-orange.png">
      <img slot="second" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/replace%20plot%20color/blue-orange-replace.png">
      <svg slot="handle" xmlns="http://www.w3.org/2000/svg" width="100" viewBox="-8 -3 16 6"><path stroke="#555" d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2" stroke-width="1" fill="#555" vector-effect="non-scaling-stroke"></path></svg>
    </img-comparison-slider>
  </div>
</div>

## 快捷使用

<iframe src="https://ycythu.github.io/chemistry-collections/replace-plot-color" title="在线替换科学绘图颜色" style="width: 100%; margin-top: 1em; height: 90vh; border: none; border-radius: 1em;"></iframe>


