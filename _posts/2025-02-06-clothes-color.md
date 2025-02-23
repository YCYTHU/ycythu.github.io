---
title: 在线预览衣物颜色
tags: 
- Color
- Code
- CSS
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/clothes.jpg
---
CSS的`mask`属性可以在特定位置（部分）隐藏元素，而`mix-blend-mode`设置了元素内容如何与其父元素内容以及元素背景相混合，二者相结合可以在线实现模特的换装效果。
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
		background: #fff;
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
	.colorBlock .clr-field button {
		width: 100%;
		height: 100%;
		border-radius: 8px;
	}
</style>

下面的代码示例仅利用CSS将原本的白色服装改为了浅红色，在下面的预览中可以手动尝试其他颜色。

```html
<div class="card">
    <!-- source img -->
    <img class="source" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/clothes%20color/model.jpg">
    <div class="mask" id="mask"></div>
</div>
```

```css
.mask {
    position: absolute;
    inset: 0;
    background: #ff5c4b73;
    /* clothes alpha img */
    mask: url(https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/clothes%20color/mask.png) 50% 50% / cover;
    mix-blend-mode: multiply;
}
```

<div class="colorTab">
	<div class="colorBlock"></div>
	<div class="colorBlock"></div>
	<div class="colorBlock"></div>
	<div class="colorBlock"></div>
	<div class="colorBlock"></div>
	<div class="colorBlock"></div>
	<div class="colorBlock"><input id="colorSelector" oninput="changeColor(this.value)" value="#00000060"/></div>
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
	changeColor(document.getElementById("colorSelector").value);
	function changeColor(clr) {
		mask.style.background = clr;
	}
</script>

