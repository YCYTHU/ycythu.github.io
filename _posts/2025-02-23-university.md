---
title: University
tags: 
- Code
- CSS
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/clothes.jpg
---

<!--more-->
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>University</title>
</head>
<style>
	html {
		--main-color: #7c2e9a;
		font-size: 12px;
	}
	/*body {
		margin: 0;
		overflow: hidden;
	}*/
	.background {
		background-color: var(--main-color);
		padding-left: 1.5rem;
		padding-right: 1.5rem;
		overflow: hidden;
		display: flex;
		align-items: end;
		border-radius: 1.5rem;
		margin-top: 3rem;
		line-height: 1.0;
	}
	.background p {
		margin: 0;
		font-family: FZYT;
		color: var(--main-color);
		text-align: center;
	}
	.container {
		margin: 0 auto;
		width: fit-content;
	}
	/*@media (min-width: 320px) {
        html {
            font-size: 12px;
        }
    }
    @media (min-width: 360px) {
        html {
            font-size: 14px;
        }
    }
    @media (min-width: 420px) {
        html {
            font-size: 16px;
        }
    }
    @media (min-width: 480px) {
        html {
            font-size: 18px;
        }
    }
    @media (min-width: 600px) {
        html {
            font-size: 20px;
        }
        .background {
        	align-items: center;
        }
        .container {
			margin: 0 auto;
		}
    }
    @media (min-width: 720px) {
        html {
            font-size: 24px;
        }
    }
    @media (min-width: 900px) {
        html {
            font-size: 28px;
        }
    }
    @media (min-width: 1440px) {
        html {
            font-size: 32px;
        }
    }*/
	.card-box {
		background-color: #fff;
		padding: 1.2rem;
		border-radius: 2rem;
	}
	@font-face {
		font-family: FZYT;
		src: url("https://cdn.jsdelivr.net/gh/ycythu/assets@main/fonts/fangzheng/fangzhengyaoti.ttf")
	}
	.card-body {
		display: flex;
		flex-direction: column;
	}
	.card_head {
		padding: 0 1.2rem;
	}
	.bless {
		display: flex;
		justify-content: space-between;
	}
	.blessRight {
		display: flex;
		align-items: flex-end;
		column-gap: .2rem;
	}
	.logo {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.name {
		display: flex;
		margin-top: .8rem;
		border-top: 2px solid var(--main-color);
		justify-content: space-between;
	}
	.name p {
		margin-top: .4rem;
	}
	.station {
		display: flex;
		justify-content: space-between;
		margin: 2rem 0;
	}
	.station .size4 {
		text-align-last: center;
	}
	.subwayLogo {
		display: flex;
		column-gap: .5rem;
	}
	.subwayName {
		text-align: center;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
	.train {
		width: 2.5rem;
	}
	.subwayLogoImgBox {
		display: flex;
		align-items: center;
		overflow: hidden;
	}
	.subwayLogoImg {
		width: 3.5rem;
		filter: drop-shadow(var(--main-color) 0px 200px);
		transform: translateY(-200px);
	}
	.univLogoImgBox {
		display: flex;
		align-items: center;
		overflow: hidden;
	}
	.univLogoImg {
		width: 4.5rem;
		filter: drop-shadow(var(--main-color) 0px 200px);
		transform: translateY(-200px);
	}
	p.white {
		color: #fff;
	}
	.justified {
		text-align-last: justify;
	}
	.stationNames {
		display: flex;
		justify-content: space-evenly;
	}
	.subwayLine p {
		width: 4rem;
	}
	.stations {
		position: relative;
		height: 12px;
		margin-top: .5rem;
	}
	.line {
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		height: 2px;
		background-color: var(--main-color);
		transform: translateY(-50%);
	}
	.circles {
		position: absolute;
		top: 50%;
		left: 0;
		width: 100%;
		height: .75rem;
		transform: translateY(-50%);
		display: flex;
		justify-content: space-evenly;
	}
	.circle {
		margin: 0 1.5rem;
		width: .75rem;
		height: .75rem;
		border-radius: 50%;
		border: 2px solid var(--main-color);
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0,0,0,0.2);
		transform: translateY(-1px);
	}
	.arrow {
		display: flex;
		justify-content: space-between;
	}
	.arrow .size4 {
		margin: .5rem;
	}
	.dots {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: .5rem 0;
		height: 10px;
		background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10" width="10"><circle cx="5" cy="5" r="2.5" fill="%237c2e9a" /></svg>');
		background-repeat: repeat;
	}
	.smSots {
		margin: .2rem 0;
		height: 6px;
		background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 6 6" width="6"><circle cx="3" cy="3" r="1.5" fill="%23fff" /></svg>');
		background-repeat: repeat;
	}
	.dotCircle {
		width: 3rem;
		height: 3rem;
		border-radius: 50%;
		background-color: var(--main-color);
	}
	.dots div:first-child {
		transform: translateX(-3.2rem);
	}
	.dots div:last-child {
		transform: translateX(3.2rem);
	}
	.slogan {
		margin: .5rem;
	}
	.size1 {
		font-size: 2.25rem;
	}
	.size2 {
		font-size: 1.8rem;
	}
	.size3 {
		font-size: 1.1rem;
	}
	.size4 {
		font-size: .8rem;
	}
</style>
<body>
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
								<img class="subwayLogoImg" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/university/beijing.svg">
							</div>
							<div class="subwayName">
								<p class="justified size2">北京地铁</p>
								<p class="size4">BEIJING SUBWAY</p>
							</div>
						</div>
						<div class="univLogoImgBox">
							<img class="univLogoImg" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/university/Tsinghua.svg">
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
</script>