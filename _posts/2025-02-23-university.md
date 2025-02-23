---
title: University
tags: 
- Code
- CSS
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/clothes.jpg
---

<!--more-->
<link rel="stylesheet" href="https://raw.githubusercontent.com/YCYTHU/assets/refs/heads/main/css/university/university.css">
<!--<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/ycythu/assets@main/css/university/university.css">-->
<body>
	<p>
		<a class="button button--outline-info button--rounded" onclick="fullScreen()">预览</a>
		<select>
    		<option value="1">1</option>
    		<option value="2">2</option>
    		<option value="3">3</option>
    		<option value="4">4</option>
		</select>
	</p>
	<div class="background">
		<div class="container">
			<div class="card_head">
				<div class="bless">
					<div class="blessLeft">
						<p class="white size3">理想大学站</p>
					</div>
					<div class="blessRight">
						<p class="white size4">成功上岸</p>
						<img class="train" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/university/train.svg">
					</div>
				</div>
				<div class="smSots"></div>
			</div>
			<div class="card-box">
				<div class="card-body">
					<div class="logo">
						<div class="subwayLogo">
							<div class="subwayLogoImgBox">
								<!--<img class="subwayLogoImg" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/university/beijing.svg">-->
							</div>
							<div class="subwayName">
								<p class="justified size2">北京地铁</p>
								<p class="size4">BEIJING SUBWAY</p>
							</div>
						</div>
						<div class="univLogoImgBox">
							<!--<img class="univLogoImg" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/university/Tsinghua.svg">-->
						</div>
					</div>
					<div class="name">
						<p class="justified size3">北京地铁13号线</p>
						<p class="justified size3">清华大学</p>
					</div>
					<div class="station">
						<div class="nextStation">
							<p class="justified size1">下一站</p>
							<p class="justified size4">Next Station</p>
						</div>
						<div class="stationName">
							<p class="justified size1">五道口</p>
							<p class="justified size4">WUDAOKOU</p>
						</div>
					</div>
					<div class="subwayLine">
						<div class="stationNames">
							<p class="size4">大钟寺</p>
							<p class="size4">知春路</p>
							<p class="size4">五道口</p>
							<p class="size4">上地</p>
							<p class="size4">清河站</p>
						</div>
						<div class="stations">
							<div class="line"></div>
							<div class="circles">
								<div class="circle"></div>
								<div class="circle"></div>
								<div class="circle"></div>
								<div class="circle"></div>
								<div class="circle"></div>
							</div>
						</div>
						<div class="arrow">
							<p class="size2">⇀</p>
							<p class="size4">下一站</p>
							<p class="size2">⇀</p>
						</div>
					</div>
					<div class="dots">
						<div class="dotCircle"></div>
						<div class="dotCircle"></div>
					</div>
					<div class="slogan">
						<p class="justified size1">自强不息 厚德载物</p>
						<p class="size3">Tsinghua University</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
<script>
	const bg = document.getElementsByClassName("background")[0];
	bg.style.height = `${document.documentElement.clientHeight}px`;
	window.onresize = function () {
		bg.style.height = `${document.documentElement.clientHeight}px`;
	}
	function fullScreen() {
		if (bg.requestFullscreen) {
            bg.requestFullscreen();
        } else if (bg.mozRequestFullScreen) {
            bg.mozRequestFullScreen();
        } else if (bg.webkitRequestFullscreen) {
            bg.webkitRequestFullscreen();
        } else if (bg.msRequestFullscreen) {
            bg.msRequestFullscreen();
        }
	}
</script>