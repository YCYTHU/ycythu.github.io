---
title: 动画演示沙发问题的Hammersley解
tags: 
- Geometry
- Code
- JavaScript
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/electric field.jpg
favorite: true
---
移动沙发问题来源于现实生活中推沙发过走廊情景的二维理想化，旨在求出能通过单位宽度的L形平面通道的刚性二维形状的最大面积 $A$。Hammersley给出了一个电话听筒形状的解，面积约为$2.2074$，但并非最大解。
<!--more-->

<style>
	svg {
      background-color: #ffffc0;
    }
</style>

<svg id="svgCanvas" width="500" height="500" viewBox="16 -16 500 500">
    <path d="M 0 0 L 0 100 L 400 100 L 400 500 L 500 500 L 500 0 L 0 0" fill="none" stroke="#000" stroke-width="8"/>
    <path d="M 0 0 L 0 100 L 400 100 L 400 500 L 500 500 L 500 0 L 0 0" fill="#fff" stroke="none" />
    <path d="M 0 100 L 100 100 A 63.662 63.662 0 0 1 227.324 100 L 327.324 100 A 100 100 0 0 0 227.324 0 L 100 0 A 100 100 0 0 0 0 100" id="sofa" fill="#c0c0fe" stroke="none" />
    <circle id="center" cx="163.662" cy="100" r="4" fill="#000"/>
</svg>

<input type="range" id="progressBar" min="0.02" max="0.98" step="0.001" value="0.02">

<script>
    const sofa = document.getElementById("sofa");
    const center = document.getElementById("center");
    const fourOverPi = 4 / Math.PI;
    const twoOverPi  = 2 / Math.PI;
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
    progressBar.addEventListener('input', function() {
      const t = parseFloat(this.value);
      updateSofa(t);
    });
    updateSofa(0.02);
</script>