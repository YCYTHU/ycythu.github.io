---
title: 在Adobe Photoshop中进行人像美白的方法
tags: 
- photoshop
- photography
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/split%20image.jpg
aside:
  toc: true
---
本文汇总一些使用Adobe Photoshop对人像进行美白的方法。
<!--more-->
<script src="https://cdn.jsdelivr.net/npm/img-comparison-slider@8/dist/index.js" defer></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/img-comparison-slider@8/dist/styles.css"/>

## 明度（提高）+饱和度（降低）+混合模式（柔光）

1. 【选择主体】-【新建图层】
2. 【调整】-【色相/饱和度】
3. 【混合模式】改为柔光
4. 适当提高【明度】，降低【饱和度】

<div>
<img src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/photoshop/whitening/brightness.png"/>
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

<img-comparison-slider>
  <img slot="first" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/photoshop/whitening/apply-image-origin.jpg"/>
  <img slot="second" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/photoshop/whitening/apply-image-whitening.jpg"/>
</img-comparison-slider>
