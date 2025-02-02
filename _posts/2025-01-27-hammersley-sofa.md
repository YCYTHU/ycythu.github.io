---
title: 动画演示沙发问题的Hammersley解
tags: 
- Geometry
- Code
- JavaScript
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/electric field.jpg
favorite: true
---
移动沙发问题来源于现实生活中推沙发过走廊情景的二维理想化，旨在求出能通过单位宽度的L形平面通道的刚性二维形状的最大面积 $A$。Hammersley给出了一个电话听筒形状的解，面积约为 $2.2074$，但并非最大解。
<!--more-->

<style>
	svg {
      background-color: #ffffc0;
    }
    input[type=range] {
      width: calc(80% - 35px);
    }
</style>

点击下面的播放按钮或拖动进度条以观看Hammersley沙发通过走廊的动画。紫色的部分为Hammersley沙发，其形状如电话听筒，由一个长为 $4/\pi$，宽为 $1$ 的矩形的长边上挖去一个半径为 $2/\pi$ 的半圆，再在其两条短边上各接一个单位半径的四分之一圆盘得到。黑色的点为半圆的圆心，在通过走廊拐角时，其轨迹为四分之一圆弧。

<div style="text-align: center; margin-bottom: 20px;">
    <button id="playPauseBtn" class="button button--secondary button--circle"><i class="fa-solid fa-play" style="margin-left: 2px;"></i></button>
	<input type="range" id="progressBar" min="0.02" max="0.98" step="0.001" value="0.02">
</div>
<div style="text-align: center;">
	<svg id="svgCanvas" width="80%" height="80%" viewBox="16 -16 500 500">
	    <path d="M 0 0 L 0 100 L 400 100 L 400 500 L 500 500 L 500 0 L 0 0" fill="none" stroke="#000" stroke-width="8"/>
	    <path d="M 0 0 L 0 100 L 400 100 L 400 500 L 500 500 L 500 0 L 0 0" fill="#fff" stroke="none" />
	    <path d="M 0 100 L 100 100 A 63.662 63.662 0 0 1 227.324 100 L 327.324 100 A 100 100 0 0 0 227.324 0 L 100 0 A 100 100 0 0 0 0 100" id="sofa" fill="#c0c0fe" stroke="#000" stroke-width="4" />
	    <circle id="center" cx="163.662" cy="100" r="3" fill="#000"/>
	</svg>
</div>


<script>
    const sofa = document.getElementById("sofa");
    const center = document.getElementById("center");
    const fourOverPi = 4 / Math.PI;
    const twoOverPi  = 2 / Math.PI;
    const progressBar = document.getElementById('progressBar');
    const playPauseBtn = document.getElementById('playPauseBtn');
    var playing = false;
    var direction = 1;
    var interval;
    function deg2rad(deg) {
      return deg * Math.PI / 180;
    }
    function updateSofa(t) {
        if (t <= 0.15) {
            var dist_x = (500 - 100 * (2 + fourOverPi)) * t / 0.15;
            sofa.setAttribute("transform", `translate(${dist_x},0)`);
            center.setAttribute("transform", `translate(${dist_x},0)`);
        }
        else if (t <= 0.85) {
            var theta_deg = 90 * (t - 0.15) / 0.70;
            var theta = deg2rad(theta_deg);
            var dist = 500 - 100 * (2 + fourOverPi);
            var half_width = 500 - 100 * (1 + twoOverPi);
            var dist_x = (1-Math.cos(theta)) * 100 * twoOverPi;
            var dist_y = (Math.sin(theta)) * 100 * twoOverPi;
            sofa.setAttribute("transform", `rotate(${theta_deg} ${half_width+dist_x} ${100+dist_y}) translate(${dist+dist_x},${dist_y})`);
            center.setAttribute("transform", `translate(${dist+dist_x},${dist_y})`);
        } else {
            var dist_x = 500 - 100 * (2 + twoOverPi);
            var rot_y = 100 * (1 + twoOverPi);
            var dist_y = (500 - 100 * (2 + fourOverPi)) * (t-0.85) / 0.15;
            sofa.setAttribute("transform", `rotate(90 400 ${rot_y}) translate(${dist_x},${100 * twoOverPi}) translate(${dist_y},0)`);
            center.setAttribute("transform", `translate(${dist_x},${dist_y + 100 * twoOverPi})`);
        }
    }
    function updateProgressBar() {
        var currentValue = parseFloat(progressBar.value);
        var newValue = currentValue + direction * 0.001;
        if (newValue >= parseFloat(progressBar.max) || newValue <= parseFloat(progressBar.min)) {
            direction *= -1;
        }
        progressBar.value = newValue.toFixed(3);
        updateSofa(progressBar.value);
    }
    updateSofa(0.02);
    progressBar.addEventListener('input', function() {
      const t = parseFloat(this.value);
      updateSofa(t);
    });
    playPauseBtn.addEventListener('click', function() {
    if (playing) {
      clearInterval(interval);
      playPauseBtn.innerHTML = '<i class="fa-solid fa-play" style="margin-left: 2px;"></i>';
    } else {
      interval = setInterval(updateProgressBar, 10);
      playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
    playing = !playing;
  });
</script>