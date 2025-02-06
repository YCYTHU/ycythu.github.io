---
title: 在线预览衣物颜色
tags: 
- Code
- CSS
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/hammersley sofa.jpg
---

<!--more-->

<style type="text/css">
	.card {
		position: relative;
		width: 60%;
		height: auto;
	}
	.source {
		width: 100%;
		object-fit: cover;
	}
	.change {
		position: absolute;
		inset: 0;
		background: #ff5c4b73;
		mask: url(https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/clothes%20color/mask.png) 50% 50% / cover;
		z-index: 1;
		mix-blend-mode: multiply;
	}
</style>
<div class="card">
	<img class="source" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/clothes%20color/model.jpg">
	<div class="change"></div>
</div>
<!--
#ff5c4b73;
#fe9d3675;
#fcf03d69;
#528b0166;
#62a4f8c4;
#850bff40;
-->