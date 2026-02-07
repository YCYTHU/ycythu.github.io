---
title: 在Adobe Photoshop中进行人像美白的方法
tags: 
- Photoshop
- Photography
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/Adobe_Photoshop_CC_icon.png
aside:
  toc: true
---
本文汇总一些使用Adobe Photoshop对人像进行美白的方法。
<!--more-->
<script src="https://cdn.jsdelivr.net/npm/img-comparison-slider@8/dist/index.js" defer></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/img-comparison-slider@8/dist/styles.css"/>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css">
<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.umd.js"></script>

<style>
  img-comparison-slider img {
    max-height: 600px;
  }
</style>

## 明度（提高）+饱和度（降低）+混合模式（柔光）

1. 【选择主体】-【新建图层】
2. 【调整】-【色相/饱和度】
3. 【混合模式】改为柔光
4. 适当提高【明度】，降低【饱和度】

<p><a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/photoshop/whitening/brightness.png"><button class="button button--outline-info button--rounded">详细信息 <i class="fas fa-search"></i></button></a></p>

<div style="text-align: center;">
  <img-comparison-slider>
    <img slot="first" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/photoshop/whitening/brightness-origin.jpg"/>
    <img slot="second" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/photoshop/whitening/brightness-whitening.jpg"/>
  </img-comparison-slider>
</div>

## 应用图像+通道（绿）+混合模式（滤色）

1. 【选择主体】-【新建图层】
2. 【图像】-【应用图像】
3. 【图层】改为主体所在图层，【通道】改为绿，【混合】改为滤色
4. 适当调整【不透明度】

<p><a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/photoshop/whitening/apply-image.png"><button class="button button--outline-info button--rounded">详细信息 <i class="fas fa-search"></i></button></a></p>

<div style="text-align: center;">
  <img-comparison-slider>
    <img slot="first" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/photoshop/whitening/apply-image-origin.jpg"/>
    <img slot="second" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/photoshop/whitening/apply-image-whitening.jpg"/>
  </img-comparison-slider>
</div>

## 曲线+白场吸管工具

1. 【选择主体】-【调整】-【曲线】
2. 点击【白场吸管工具】-点击【肤色较亮的区域】
3. 双击图层打开【图层样式】
4. 按住【Alt】键，拖动下一图层中左侧右半个滑块到最右方，调整为【0/255 255】
5. 适当调整【不透明度】

<p><a data-fancybox="gallery" href="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/photoshop/whitening/curves.png"><button class="button button--outline-info button--rounded">详细信息 <i class="fas fa-search"></i></button></a></p>

<div style="text-align: center;">
  <img-comparison-slider>
    <img slot="first" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/photoshop/whitening/curves-origin.jpg"/>
    <img slot="second" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/photoshop/whitening/curves-whitening.jpg"/>
  </img-comparison-slider>
</div>