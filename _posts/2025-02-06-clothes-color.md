---
title: 在线预览衣物颜色
tags: 
- Code
- CSS
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/hammersley sofa.jpg
---

<!--more-->

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
    	margin: 0 auto;
    	margin-bottom: 10px;
    	column-gap: 5px;
	}
	.colorBlock {
		width: 100%;
		height: 30px;
    	border-radius: 8px;
	}
</style>

<div class="colorTab">
	<div class="colorBlock" style="background-color: #ff5c4b73;" onclick="changeColor(this.style.backgroundColor)"></div>
	<div class="colorBlock" style="background-color: #fe9d3675;"></div>
	<div class="colorBlock" style="background-color: #fcf03d69;"></div>
	<div class="colorBlock" style="background-color: #528b0166;"></div>
	<div class="colorBlock" style="background-color: #62a4f8c4;"></div>
	<div class="colorBlock" style="background-color: #850bff40;"></div>
</div>
<div class="card" style="max-width: 75%; margin: 0 auto;">
	<div class="card__image">
		<img class="source" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/clothes%20color/model.jpg">
		<div class="mask" id="mask"></div>
	</div>
</div>

<script>
	const mask = document.getElementById("mask");
	function changeColor(clr) {
		mask.style.background = clr;
	}
</script>