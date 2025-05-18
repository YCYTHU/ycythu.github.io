---
title: 使用三刺激值函数将高斯光谱转换为RGB颜色
tags: 
- Code
- JavaScript
- Color
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/CIE1931xy_blank.svg/723px-CIE1931xy_blank.svg.png
favorite: true
---
根据[往期文章](https://ycythu.github.io/2024/01/28/Wavelength-to-Color.html)中介绍的原理，使用三刺激值函数将由多个高斯峰组成的光谱转换为sRGB色彩空间的颜色。
<!--more-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.11.1/math.min.js" type="text/javascript"></script>
<script src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/js/wavelength_to_color/tristimulus.js" type="text/javascript"></script>
<head>
  <style>
    #canvas-container {
      width: 100%;
      max-width: 1000px;
      margin: auto;
      position: relative;
    }
    canvas {
      width: 90%;
      height: auto;
      margin: 0 auto;
      display: block;
      background: white;
      border: 1px solid #ccc;
      touch-action: none;
    }
  </style>
</head>
<body>
<div id="canvas-container">
  <canvas id="canvas"></canvas>
</div>
<script src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/js/wavelength_to_color/gaussian2color.js" type="text/javascript"></script>
</body>
