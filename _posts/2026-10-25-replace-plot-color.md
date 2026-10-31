---
title: 在线替换科学绘图颜色
tags:
- Color
- Code
- JavaScript
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/default.jpg
favorite: true
---
在缺少论文图像原始数据或源文件的情况下在线更改绘图的配色方案。
<!--more-->

<script src="https://cdn.jsdelivr.net/npm/img-comparison-slider@8/dist/index.js" defer></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/img-comparison-slider@8/dist/styles.css"/>

本工具提取图像的逐像素颜色信息，在 RGB 空间内依色彩方向执行聚类分析，并对同色像素的抗锯齿透明度进行深度检测。为保证色彩替换的精确度，推荐采用 PNG 等无损压缩格式。

<a class="button button--success button--rounded" href="/chemistry-collections/replace-plot-color">点击开始使用</a>

## 说明与示例

<a class="button button--secondary button--rounded" href="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/replace%20plot%20color/plot-with-scatter.png" download>点击此处下载原始测试文件</a>

<div style="text-align: center;">
  <img-comparison-slider>
    <img slot="first" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/replace%20plot%20color/plot-with-scatter.png"/>
    <img slot="second" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/replace%20plot%20color/plot-with-scatter-replace.png"/>
  </img-comparison-slider>
</div>

由于一般绘图工具在导出位图时会进行抗锯齿，因此线条或填充区域的边缘颜色与中心颜色并不一致，而是会混杂背景色。该工具会检测混合比例并在替换新颜色时保留该比例。

<a class="button button--secondary button--rounded" href="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/replace%20plot%20color/plot-with-scatter.png" download>点击此处下载原始测试文件</a>

<div style="text-align: center;">
  <img-comparison-slider>
    <img slot="first" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/replace%20plot%20color/blue-orange.png"/>
    <img slot="second" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/replace%20plot%20color/blue-orange-replace.png"/>
  </img-comparison-slider>
</div>

## 快捷使用

<iframe src="https://ycythu.github.io/chemistry-collections/replace-plot-color" title="在线替换科学绘图颜色" style="width: 100%; margin-top: 1em; height: 90vh; border: none; border-radius: 1em;"></iframe>


