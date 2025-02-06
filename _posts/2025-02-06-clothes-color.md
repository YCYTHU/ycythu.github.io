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
	.change {
		position: absolute;
		inset: 0;
		background: #ff5c4b73;
		mask: url(https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/clothes%20color/mask.png) 50% 50% / cover;
		z-index: 1;
		mix-blend-mode: multiply;
	}
	#colorTab {
		display: table;
    	height: 100%;
    	width: auto;
    	margin-left: 10px;
	}
	#colorTab > td {
		border: none;
	}
	.colorBlock {
		width: 50px;
    	height: 30px;
    	border-radius: 8px;
	}
</style>
<table id="colorTab">
	<tbody>
		<tr>
			<td><div class="colorBlock" style="background-color: #ff5c4b73;"></div></td>
			<td><div class="colorBlock" style="background-color: #fe9d3675;"></div></td>
			<td><div class="colorBlock" style="background-color: #fcf03d69;"></div></td>
			<td><div class="colorBlock" style="background-color: #528b0166;"></div></td>
			<td><div class="colorBlock" style="background-color: #62a4f8c4;"></div></td>
			<td><div class="colorBlock" style="background-color: #850bff40;"></div></td>
		</tr>
	</tbody>
</table>
<div class="card" style="max-width: 75%; margin: 0 auto;">
	<div class="card__image">
		<img class="source" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/clothes%20color/model.jpg">
		<div class="change"></div>
	</div>
</div>

<!--
#ff5c4b73;
#fe9d3675;
#fcf03d69;
#528b0166;
#62a4f8c4;
#850bff40;
-->