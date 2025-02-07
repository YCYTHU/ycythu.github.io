---
title: 在线预览衣物颜色
tags: 
- Color
- Code
- CSS
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/hammersley sofa.jpg
---

<!--more-->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.css"/>
<script src="https://cdn.jsdelivr.net/gh/mdbassit/Coloris@latest/dist/coloris.min.js"></script>
<style type="text/css">
	.source {
		width: 100%;
		object-fit: cover;
	}
	.mask {
		position: absolute;
		inset: 0;
		background: #ff5c4b73;
		mask: url(https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/clothes%20color/mask.png) 50% 50% / cover;
		mix-blend-mode: multiply;
	}
	.colorTab {
		display: flex;
    	justify-content: space-evenly;
    	width: 75%;
    	margin: 10px auto;
    	margin-bottom: 10px;
    	column-gap: 5px;
	}
	.colorBlock {
		width: 100%;
		height: 30px;
    	border-radius: 8px;
	}
	#colorSelector {
        width: 100%;
        opacity: 0;
        border: none;
    }
</style>

<div class="colorTab">
	<div class="colorBlock"></div>
	<div class="colorBlock"></div>
	<div class="colorBlock"></div>
	<div class="colorBlock"></div>
	<div class="colorBlock"></div>
	<div class="colorBlock"></div>
	<div class="colorBlock"><input id="colorSelector" oninput="changeColor(this.value)"/></div>
</div>
<div class="card" style="max-width: 75%; margin: 0 auto;">
	<div class="card__image">
		<img class="source" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/clothes%20color/model.jpg">
		<div class="mask" id="mask"></div>
	</div>
</div>

<script>
	const mask = document.getElementById("mask");
	const colorGroup = document.getElementsByClassName("colorBlock");
	const preColor = ["#ff5c4b73","#fe9d3675","#fcf03d69","#528b0166","#62a4f8c4","#850bff40"];
	for (let i = 0; i < colorGroup.length-1; i++) {
		colorGroup[i].style.backgroundColor = preColor[i];
		colorGroup[i].addEventListener('click', function () {
    		mask.style.background = preColor[i];
		});
	}
	Coloris({
        el: '#colorSelector',
        theme: 'polaroid',
        themeMode: 'light',
        alpha: true,
        swatches: preColor
    });
	function changeColor(clr) {
		mask.style.background = clr;
	}
</script>

