---
title: 弥散圆、虚化与景深
tags: 
- Photography
- Physics
- Code
- JavaScript
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/aperture.jpg
favorite: true
---
讨论了不同参数对虚化效果的影响，并量化了弥散圆直径与不同参数之间的关系，方便估算摄影所需参数。
<!--more-->
<a class="button button--primary button--rounded" href="javascript:void(0);" onclick="fold()" id="fold">折叠</a>
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<style>
	/*body {
		font-family: Arial, sans-serif;
		background: #f0f2f5;
		margin: 0;
		padding: 20px;
	}*/
	
	.container {
		max-width: 1200px;
		margin: auto;
		/*padding-left: 10px;
		padding-right: 10px;*/
	}
	
	.myCard {
		background-color: #ffffff;
		border-radius: 16px;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
		padding: 20px;
		margin-bottom: 24px;
		width: 100%;
	}
	
	.myCard h2 {
		margin-top: 0;
		font-size: 1.2rem;
		color: #333;
	}
	
	.myCard h3 {
		font-size: 1rem;
		margin-top: 0.5em;
	}
	
	.form-group {
		margin-bottom: 10px;
		display: flex;
		align-items: center;
	}
	
	.form-group label {
		width: 150px;
		font-weight: bold;
	}
	
	.form-group input,
	.form-group select {
		flex: 1;
		padding: 6px 10px;
		border: 1px solid #ccc;
		border-radius: 6px;
	}

	.form-group label:nth-of-type(2) {
		margin-left: 1rem;
	}

	/*button {
		margin-top: 10px;
		padding: 8px 16px;
		font-size: 1rem;
		background-color: #007bff;
		color: white;
		border: none;
		border-radius: 6px;
		cursor: pointer;
		width: auto;
	}
	
	button:hover {
		background-color: #0056b3;
	}*/
	
	.plot-container {
		margin: 10px auto 0;
		width: 90%;
		/*height: 300px;*/
	}
	
	.myCard-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: 20px;
	}

	.myCard-grid .full-span {
		grid-column: span 2;
	}

	var {
		font-family: Times New Roman;
		font-style: italic;
	}
	sub {
		font-style: normal;
	}
	
	/* ====== 以下为移动端适配部分 ====== */
	@media (max-width: 768px) {
		/*body {
			padding: 10px;
		}
		.container {
			padding-left: 0;
			padding-right: 0;
		}*/
		.myCard {
			width: unset;
		}
		.myCard-grid {
			grid-template-columns: 1fr; /* 改成单列 */
			column-gap: 0;
		}
		.myCard-grid .full-span {
			grid-column: span 1;
		}
		.form-group {
			width: 80%;
			flex-direction: column;
			align-items: stretch;
		}
		.form-group label {
			width: 100%;
			margin-bottom: 6px;
		}
		.form-group input,
		.form-group select {
			width: 100%;
			flex: none;
		}
		.form-group label:nth-of-type(2) {
			margin-left: 0;
		}
		/*button {
			width: 100%;
			font-size: 1.1rem;
			padding: 12px;
		}*/
		.plot-container {
			width: 100%;
			/*height: 250px;	高度适当缩小 */
		}
		.myCard h2 {
			font-size: 1.1rem;
		}
		.myCard h3 {
			font-size: 0.9rem;
		}
	}
</style>

<div class="container" id="container">
	<div class="myCard">
		<h2>全局设置</h2>
		<div class="form-group">
			<label>选择预设画幅：</label>
			<select id="preset" onchange="applyPreset()">
				<option value="full" selected>全画幅 (36mm, 6000px)</option>
				<option value="aps-c">APS-C (23.6mm, 4000px)</option>
				<option value="m43">M4/3 (17.3mm, 4608px)</option>
				<option value="custom" disabled>自定义</option>
			</select>
		</div>
		<div class="form-group">
			<label>传感器宽度 (mm)：</label>
			<input type="number" id="sensorWidth" value="36" onchange="updateSet()">
		</div>
		<div class="form-group">
			<label>图像宽度 (px)：</label>
			<input type="number" id="pixelWidth" value="6000" onchange="updateSet()">
		</div>
	</div>
	<div class="myCard-grid">
		<div class="myCard">
			<h2>1. CoC vs 光圈 (固定 <var>f</var>、<var>s</var>、<var>D</var>)</h2>
			<div class="form-group">
				<label>焦距 <var>f</var> (mm)：</label>
				<input type="number" id="f1" value="50" min="0" onchange="plotCard1()">
			</div>
			<div class="form-group">
				<label>主体物距 <var>s</var> (m)：</label>
				<input type="number" id="s1" value="2" min="0" onchange="plotCard1()">
			</div>
			<div class="form-group">
				<label>背景物距 <var>D</var> (m)：</label>
				<input type="number" id="D1" value="2.5" min="0" onchange="plotCard1()">
			</div>
			<!--<button onclick="plotCard1()">绘图</button>-->
			<div id="plot1" class="plot-container"></div>
		</div>
		<div class="myCard">
			<h2>2. CoC vs 背景物距 (固定 <var>f</var>、<var>N</var>、<var>s</var>)</h2>
			<div class="form-group">
				<label>焦距 <var>f</var> (mm)：</label>
				<input type="number" id="f2" value="50" min="0" onchange="plotCard2()">
			</div>
			<div class="form-group">
				<label>光圈值 <var>N</var>：</label>
				<input type="number" id="N2" value="2.0" min="0" onchange="plotCard2()">
			</div>
			<div class="form-group">
				<label>主体物距 <var>s</var> (m)：</label>
				<input type="number" id="s2" value="2" min="0" onchange="plotCard2()">
			</div>
			<!--<button onclick="plotCard2()">绘图</button>-->
			<div id="plot2" class="plot-container"></div>
		</div>
		<div class="myCard">
			<h2>3. CoC vs 焦距 (固定 <var>N</var>、<var>D - s</var>、<var>M</var>)</h2>
			<div class="form-group">
				<label>光圈值 <var>N</var>：</label>
				<input type="number" id="N3" value="2.0" min="0" onchange="plotCard3()">
			</div>
			<div class="form-group">
				<label> <var>D - s</var> (m)：</label>
				<input type="number" id="delta3" value="0.5" onchange="plotCard3()">
			</div>
			<div class="form-group">
				<label>放大率 <var>M</var>：</label>
				<input type="number" id="M3" value="0.02" min="0" step="0.001" onchange="plotCard3()">
			</div>
			<!--<button onclick="plotCard3()">绘图</button>-->
			<div id="plot3" class="plot-container"></div>
		</div>
		<div class="myCard">
			<h2>4. CoC vs 主体物距 (固定 <var>f</var>、<var>N</var>、<var>D - s</var>)</h2>
			<div class="form-group">
				<label>焦距 <var>f</var> (mm)：</label>
				<input type="number" id="f4" value="50" min="0" onchange="plotCard4()">
			</div>
			<div class="form-group">
				<label>光圈值 <var>N</var>：</label>
				<input type="number" id="N4" value="2.0" min="0" onchange="plotCard4()">
			</div>
			<div class="form-group">
				<label><var>D - s</var> (m)：</label>
				<input type="number" id="delta4" value="0.5" onchange="plotCard4()">
			</div>
			<!--<button onclick="plotCard4()">绘图</button>-->
			<div id="plot4" class="plot-container"></div>
		</div>
		<div class="myCard" style="display: none;">
			<h2>5. 焦距 vs 光圈 (固定 <var style="font-style: normal;">CoC</var>、<var>D - s</var>、<var>M</var>)</h2>
			<div class="form-group">
				<label> <var>D - s</var> (m)：</label>
				<input type="number" id="delta5" value="0.5" onchange="plotCard5()">
			</div>
			<div class="form-group">
				<label>放大率 <var>M</var>：</label>
				<input type="number" id="M5" value="0.02" min="0" step="0.001" onchange="plotCard5()">
			</div>
			<div class="form-group">
				<label>参考焦距 <var>f</var> (mm)：</label>
				<input type="number" id="f5" value="50" min="0" step="1" onchange="plotCard5()">
			</div>
			<div class="form-group">
				<label>参考光圈值 <var>N</var>：</label>
				<input type="number" id="N5" value="2.0" min="0" onchange="plotCard5()">
			</div>
			<!--<button onclick="plotCard5()">绘图</button>-->
			<div id="plot5" class="plot-container"></div>
		</div>
		<div class="myCard" style="display: none;">
			<h2>6. 焦距 vs 光圈 (固定 <var style="font-style: normal;">CoC</var>、<var>s</var>、<var>D</var>)</h2>
			<div class="form-group">
				<label>主体物距 <var>s</var> (m)：</label>
				<input type="number" id="s6" value="2.0" min="0" onchange="plotCard6()">
			</div>
			<div class="form-group">
				<label>背景物距 <var>D</var> (m)：</label>
				<input type="number" id="D6" value="" min="0" onchange="plotCard6()" disabled>
			</div>
			<div class="form-group">
				<label>参考焦距 <var>f</var> (mm)：</label>
				<input type="number" id="f6" value="50" min="0" onchange="plotCard6()">
			</div>
			<div class="form-group">
				<label>参考光圈值 <var>N</var>：</label>
				<input type="number" id="N6" value="2.0" min="0" onchange="plotCard6()">
			</div>
			<!--<button onclick="plotCard6()">绘图</button>-->
			<div id="plot6" class="plot-container"></div>
		</div>
		<div class="myCard full-span">
			<h2>5. CoC vs 主体-背景距离 (固定 <var>M</var>，对比 <var>f</var>、<var>N</var>)</h2>
			<div class="form-group">
				<label>放大率 <var>M</var>：</label>
				<input type="number" id="M7" value="0.02" min="0" step="0.001" onchange="plotCard7()">
			</div>
			<div class="form-group">
				<label>焦距1 <var>f<sub>1</sub></var> (mm)：</label>
				<input type="number" id="f71" value="50" min="0" onchange="plotCard7()">
				<label>光圈值1 <var>N<sub>1</sub></var>：</label>
				<input type="number" id="N71" value="1.2" min="0" onchange="plotCard7()">
			</div>
			<div class="form-group">
				<label>焦距2 <var>f<sub>2</sub></var> (mm)：</label>
				<input type="number" id="f72" value="135" min="0" onchange="plotCard7()">
				<label>光圈值2 <var>N<sub>2</sub></var>：</label>
				<input type="number" id="N72" value="2.0" min="0" onchange="plotCard7()">
			</div>
			<!--<button onclick="plotCard7()">绘图</button>-->
			<div id="plot7" class="plot-container"></div>
		</div>
	</div>
</div>

## 拍摄技巧

本部分内容节选自[photographylife](https://photographylife.com/)的博文[Bokeh Is Less About Your Lens, More About You](https://photographylife.com/bokeh-is-less-about-your-lens)，归纳总结了其中提到的改善背景虚化的拍摄技巧，这些方法背后的原理见下一节的“计算原理”部分。

### 更大的光圈

更换大光圈镜头是改善背景虚化的有效方法，与 180-600mm f/5.6-6.3（600mm f/6.3）相比，400mm f/2.8（560mm f/4）提供了不止一档的额外背景模糊。

<div align="center">
	<img width="40%" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/CoC/663.jpg" alt="600mm f/6.3">
	<img width="40%" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/CoC/428.jpg" alt="560mm f/4">
</div>
<div align=center><font color="#999999">左：NIKON Z 9 + NIKKOR Z 180-600mm f/5.6-6.3 VR @ 600mm, ISO 1800, 1/5, f/6.3 右：NIKON Z 9 + NIKKOR Z 400mm f/2.8 TC VR S @ 560mm, ISO 2000, 1/25, f/4.0 © Libor Vaicenbacher</font></div>

### 拉近拍摄对象

使用更大光圈带来的额外虚化通常在1~2档左右，而通过拉近拍摄距离可以很容易获得超过3档的虚化效果。

<div align="center">
	<img width="40%" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/CoC/5014.jpg" alt="50mm f/1.4">
	<img width="40%" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/CoC/5045.jpg" alt="50mm f/4.5">
</div>
<div align=center><font color="#999999">左：NIKON Z 8 + NIKKOR Z 50mm f/1.4 @ 50mm, ISO 64, 1/320, f/1.4 右：NIKON Z 8 + NIKKOR Z 50mm f/1.4 @ 50mm, ISO 64, 1/50, f/4.5 © Jason Polak</font></div>

### 寻找更好的背景

主体与背景之间的距离是影响虚化的一个重要因素，更远、更简洁、颜色更均匀的背景都有助于改善背景虚化。

<div align="center">
	<img width="40%" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/CoC/bg-n-1.jpg" alt="500mm f/5.6 near1">
	<img width="40%" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/CoC/bg-f-1.jpg" alt="500mm f/5.6 far1">
</div>
<div align=center><font color="#999999">左：NIKON D500 @ 500mm, ISO 2200, 1/320, f/5.6 右：NIKON D500 @ 500mm, ISO 1600, 1/500, f/5.6 © Jason Polak</font></div>

<div align="center" style="margin-top: 1rem;">
	<img width="40%" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/CoC/bg-n-2.jpg" alt="500mm f/5.6 near2">
	<img width="40%" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/CoC/bg-f-2.jpg" alt="500mm f/6.3 far2">
</div>
<div align=center><font color="#999999">左：NIKON D500 @ 500mm, ISO 900, 1/250, f/5.6 右：NIKON D500 @ 500mm, ISO 3200, 1/320, f/6.3 © Jason Polak</font></div>

### 调整拍摄角度

如果既无法靠近拍摄对象，又无法切换到其他背景，此时还可以通过改变拍摄角度（通常是贴着地面拍摄）来显著改善虚化效果。更低的拍摄角度有助于增大背景和前景之间的距离，从而提高虚化。

<div align="center">
	<img width="40%" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/CoC/high.jpg" alt="500mm f/5.6 near2">
	<img width="40%" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/CoC/low.jpg" alt="500mm f/5.6 far2">
</div>
<div align=center><font color="#999999">左：NIKON D500 @ 500mm, ISO 1800, 1/640, f/5.6 右：NIKON D500 @ 500mm, ISO 500, 1/1250, f/5.6 © Jason Polak</font></div>

## 计算原理

<div align="center"><img width="75%" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/CoC/CoC.svg" alt="成像示意图"></div>

假设主体位于距离光心 $s$ 处，并恰好成像于传感器上，像距为 $v$。背景中某点成像于传感器之前（成像于传感器之后同理），物距为 $D$，像距为 $v'$，因此在传感器上形成了弥散圆（Circle of Confusion）。根据成像公式：

$$\frac{1}{s}+\frac{1}{v}=\frac{1}{f}\qquad\frac{1}{D}+\frac{1}{v'}=\frac{1}{f}\tag{1}\label{f}$$

其中 $f$ 为镜头焦距。根据相似三角形的性质，弥散圆直径 $\delta$ 满足：

$$\frac{\delta}{f/N}=\frac{\vert v-v'\vert}{v'}\tag{2}\label{v}$$

将式 $\eqref{f}$ 与式 $\eqref{v}$ 联立，得：

$$\delta=\frac{f^2}{N}\frac{\vert D-s\vert}{D(s-f)}\tag{3}\label{eq}$$

### CoC vs 光圈 (固定 $f、s、D$)

此时弥散圆直径反比于光圈值，$\delta\propto N^{-1}$，每增大一档光圈，$\delta$ 扩大为原来的 $\sqrt2$ 倍。

### CoC vs 背景物距 (固定 $f、N、s$)

此时弥散圆直径 $\displaystyle\delta\propto\vert1-\frac{s}{D}\vert$。 由于分辨能力有限，因此当 $\delta<\delta_0$ 时都可以认为像是清晰的（$\delta_0$ 被称为容许弥散圆），此时可以反解出使得成像清晰的 $D$ 的范围 $D\in(D_1, D_2)$：

$$1-\frac{\delta_0N(s-f)}{f^2}<\frac{s}{D}<1+\frac{\delta_0N(s-f)}{f^2}\tag{4}$$

若 $\displaystyle1-\frac{\delta_0N(s-f)}{f^2}>0$，则解得：

$$D_1=\frac{sf^2}{f^2+\delta_0N(s-f)}\qquad D_2=\frac{sf^2}{f^2-\delta_0N(s-f)}\tag{5}\label{js}$$

若 $\displaystyle1-\frac{\delta_0N(s-f)}{f^2}<0$，则 $\displaystyle1-\frac{\delta_0N(s-f)}{f^2}<\frac{s}{D}$ 对任意 $D$ 成立，因此 $D\in(D_1, +\infty)$ 都可以清晰成像，此时景深最大。满足该条件的临界 $\displaystyle s_0=f+\frac{f^2}{\delta_0N}$ 被称为超焦距，由于一般情况下 $f\gg\delta_0N$，因此 $\displaystyle s_0\approx\frac{f^2}{\delta_0N}$。另外，由数学关系知 $D_1, D_2$ 满足:

$$\frac{s}{D_1}+\frac{s}{D_2}=2\tag{6}$$

### CoC vs 焦距 (固定 $N、D - s、M$)

当固定放大率 $\displaystyle M=\frac{f}{s-f}$ 和背景与主体之间的距离 $\Delta=D-s$ 不变时，使用不同的焦距可以获得不同的虚化效果。将式 $\eqref{eq}$ 改写：

$$\delta=\frac{M^2\vert\Delta\vert}{N}\frac{f}{(M+1)f+M\Delta}\tag{7}\label{cocf}$$

式 $\eqref{cocf}$ 的单调性取决于 $\Delta$ 的符号，因此更长的焦距可以使后景获得更好的虚化效果，而更短的焦距则有利于前景的虚化。同样的结论也可从 $s-D_1$ 与 $D_2-s$ 的单调性得到。

### 焦距 vs 光圈 (固定 $\mathrm{CoC}、D - s、M$)

由于不同焦段的镜头往往也具有不同的光圈范围（例如F4几乎是600mm镜头的极限，而135mm则可以支持F1.8这样更大的光圈），因此固定光圈值来讨论焦距对虚化的影响并不够全面。

如果固定 $M, \Delta$ 不变，需要多大的光圈才能在600mm下实现与135mm F1.8几乎相同的虚化效果。由式 $\eqref{cocf}$ 得：

$$N\left(M+1+\frac{M\Delta}{f}\right)=\frac{M^2\vert\Delta\vert}{\delta}=\mathrm{Const.}\tag{8}$$

因此当 $\displaystyle\Delta\gg\frac{M+1}{M}f$ 时，$N$ 近似与 $f$ 成正比，因此相同的放大率下，600mm F8.0即可在无穷远处实现与135 mm F1.8几乎相同的虚化效果。

但是当主体与背景的分离度并不高时，则必须考虑 $N$ 与 $f$ 之间的非线性，因此600mm F8.0在全部范围内的虚化都不如135 mm F1.8，仅在无穷远处才达到几乎相同的水平。

同样地，可以发现大光圈镜头有助于在主体背景分离度较小时实现较好的虚化，而长焦镜头则在分离度较大时优势明显。

### 焦距 vs 光圈 (固定 $\mathrm{CoC}、s、D$)

由式 $\eqref{js}$ 知，在固定的 $s$ 下，远近景深 $D_1, D_2$ 仅与 $f$ 和 $N$ 相关，只要具有相同的 $\displaystyle\frac{N(s-f)}{f^2}$ 则景深也相同，即在相同的 $D$ 下拥有相同的 $\mathrm{CoC}$。

### CoC vs 主体物距 (固定 $f、N、D - s$)

由式 $\eqref{eq}$，固定 $f, N$ 和 $\Delta$ 不变时，$\displaystyle\delta=\frac{f^2\vert\Delta\vert}{N}\frac{1}{(s+\Delta)(s-f)}$，$\delta$ 随 $s$ 单调递减，即在近距离处可以获得更大的弥散圆。

<script>
	var isFold = false;
	update();

	function update() {
		plotCard1();
		plotCard2();
		plotCard3();
		plotCard4();
		//plotCard5();
		//plotCard6();
		plotCard7();
	}

	function fold() {
		if (isFold) {
			document.getElementById("container").style.display='';
			isFold = false;
			document.getElementById("fold").innerHTML='折叠';
		}
		else {
			document.getElementById("container").style.display='none';
			isFold = true;
			document.getElementById("fold").innerHTML='取消折叠';
		}
	}

	function updateSet() {
		document.getElementById("preset").options[3].selected = true;
		update();
	}

	function applyPreset() {
		const preset = document.getElementById("preset").value;
		const widthInput = document.getElementById("sensorWidth");
		const pxInput = document.getElementById("pixelWidth");
		if (preset === "full") {
			widthInput.value = 36;
			pxInput.value = 6000;
		} else if (preset === "aps-c") {
			widthInput.value = 23.6;
			pxInput.value = 4000;
		} else if (preset === "m43") {
			widthInput.value = 17.3;
			pxInput.value = 4608;
		}
		update();
	}

	function computeCoC(f, N, s, D) {
		// f: 焦距 (mm)
		// N: 光圈值
		// s: 主体物距 (mm)
		// D: 背景物距 (mm)
		const A = f / N;
		const v = (f * s) / (s - f);
		const vPrime = (f * D) / (D - f);
		const c = A * Math.abs(1 - v / vPrime);
		return c;
	}

	function plotDualAxis(x, y_px, y_mm, id, xLabel, title, {
			logX = false,
			logY = false,
			xTickVals = null,
			xTickText = null,
			xTickprefix = null,
			xTickformat = null
	} = {}) {
		const trace_px = {
			x: x,
			y: y_px,
			yaxis: "y1",
			line: { color: "red" },
			mode: "lines",
			hovertemplate: '%{y:.0f}<extra></extra>' // <extra></extra>去掉默认trace名
		};
		const trace_mm = {
			x: x,
			y: y_mm,
			yaxis: "y2",
			line: { color: "blue" },
			mode: "lines",
			hovertemplate: '%{y:.3f}<extra></extra>' // <extra></extra>去掉默认trace名
		};

		const layout = {
			title: { text: title, font: { size: 14 }, xref: 'paper', x: 0 },
			xaxis: {
				title: xLabel,
				type: logX ? "log" : "linear",
				automargin: true,
				ticks: 'outside',
				showline: true,
				mirror: true,
				showspikes: true,
				spikemode: 'toaxis',
				tickprefix: xTickprefix || undefined,
				tickformat: xTickformat || undefined,
				tickvals: xTickVals || undefined,
				ticktext: xTickText || undefined
			},
			yaxis: {
				title: "CoC (px)",
				type: logY ? "log" : "linear",
				titlefont: { color: "red" },
				tickfont: { color: "red" },
				showline: true,
				mirror: true,
				showspikes: true,
				spikemode: 'toaxis'
			},
			yaxis2: {
				title: "CoC (mm)",
				titlefont: { color: "blue" },
				tickfont: { color: "blue" },
				overlaying: "y",
				side: "right",
				showline: true,
				showspikes: true,
				spikemode: 'toaxis'
			},
			margin: { l: 50, r: 50, t: 30, b: 40 },
			showlegend: false,
			height: 300
		};

		const config = {
			modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d','toggleSpikelines','hoverClosestCartesian','hoverCompareCartesian'],
        	displaylogo: false,
			responsive: true
		}

		Plotly.newPlot(id, [trace_px, trace_mm], layout, config);
	}

	function plotAxis(x, y, id, xLabel, title, {
			logX = false,
			logY = false,
			xTickVals = null,
			xTickText = null,
			yTiTle = null,
			yTickprefix = null,
			yTickformat = null
	} = {}) {
		const trace = {
			x: x,
			y: y,
			yaxis: "y1",
			line: { color: "red" },
			mode: "lines",
			hovertemplate: 'f/%{y:.1f}<extra></extra>' // <extra></extra>去掉默认trace名
		};

		const layout = {
			title: { text: title, font: { size: 14 }, xref: 'paper', x: 0 },
			xaxis: {
				title: xLabel,
				type: logX ? "log" : "linear",
				automargin: true,
				ticks: 'outside',
				showline: true,
				mirror: true,
				showspikes: true,
				spikemode: 'toaxis',
				tickvals: xTickVals || undefined,
				ticktext: xTickText || undefined
			},
			yaxis: {
				title: yTiTle || "光圈",
				type: logY ? "log" : "linear",
				titlefont: { color: "red" },
				tickfont: { color: "red" },
				showline: true,
				mirror: true,
				showspikes: true,
				spikemode: 'toaxis',
				tickprefix: yTickprefix || undefined,
				tickformat: yTickformat || undefined
			},
			margin: { l: 50, r: 50, t: 30, b: 40 },
			showlegend: false,
			height: 300
		};

		const config = {
			modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d','toggleSpikelines','hoverClosestCartesian','hoverCompareCartesian'],
			displaylogo: false,
			responsive: true
		}

		Plotly.newPlot(id, [trace], layout, config);
	}

	function plotAxisDualLine(x, y1, y2, id, xLabel, title, {
			logX = false,
			logY = false,
			xTickVals = null,
			xTickText = null,
			yTiTle = null,
			name1 = null,
			name2 = null
	} = {}) {
		const trace1 = {
			x: x,
			y: y1,
			name: name1 || undefined,
			yaxis: "y1",
			line: { color: "red" },
			mode: "lines",
			hovertemplate: '%{y:.0f}<extra></extra>' // <extra></extra>去掉默认trace名
		};

		const trace2 = {
			x: x,
			y: y2,
			name: name2 || undefined,
			yaxis: "y1",
			line: { color: "blue" },
			mode: "lines",
			hovertemplate: '%{y:.0f}<extra></extra>' // <extra></extra>去掉默认trace名
		};

		const layout = {
			title: { text: title, font: { size: 14 }, xref: 'paper', x: 0 },
			xaxis: {
				title: xLabel,
				type: logX ? "log" : "linear",
				automargin: true,
				ticks: 'outside',
				showline: true,
				mirror: true,
				showspikes: true,
				spikemode: 'toaxis',
				tickvals: xTickVals || undefined,
				ticktext: xTickText || undefined
			},
			yaxis: {
				title: yTiTle || undefined,
				type: logY ? "log" : "linear",
				titlefont: { color: "black" },
				tickfont: { color: "black" },
				showline: true,
				mirror: true,
				showspikes: true,
				spikemode: 'toaxis',
			},
			legend: { x: 0, y: 1 },
			margin: { l: 50, r: 50, t: 30, b: 40 },
			showlegend: true,
			height: 300
		};

		const config = {
			modeBarButtonsToRemove: ['zoom2d', 'pan2d', 'select2d', 'lasso2d', 'zoomIn2d', 'zoomOut2d', 'autoScale2d','toggleSpikelines','hoverClosestCartesian','hoverCompareCartesian'],
			displaylogo: false,
			responsive: true
		}

		Plotly.newPlot(id, [trace1, trace2], layout, config);
	}

	function toPx(c_mm) {
		const sensorW = parseFloat(document.getElementById("sensorWidth").value);
		const pxW = parseFloat(document.getElementById("pixelWidth").value);
		return c_mm * pxW / sensorW;
	}

	function plotCard1() {
		const f = parseFloat(document.getElementById("f1").value);
		const s = parseFloat(document.getElementById("s1").value) * 1000;
		const D = parseFloat(document.getElementById("D1").value) * 1000;
		if (f <= 0 || s <= 0 || D <= 0 || s <= f || D <= f) {
			alert('Illegal!');
			return;
		}
		const N_list = [], c_list = [], cpx_list = [];
		for (let N = 0.95; N <= 18; N += 0.05) {
			const c = computeCoC(f, N, s, D);
			N_list.push(N);
			c_list.push(c);
			cpx_list.push(toPx(c));
		}
		plotDualAxis(N_list, cpx_list, c_list, "plot1", "光圈", "CoC vs 光圈", {
			logX: true,
			logY: true,
			xTickVals: [0.95, 1.4, 2, 2.8, 4, 5.6, 8, 11, 16],
			xTickText: ["f/0.95", "f/1.4", "f/2", "f/2.8", "f/4", "f/5.6", "f/8", "f/11", "f/16"],
			xTickprefix: 'f/',
			xTickformat: '.1f'
		});
	}

	function plotCard2() {
		const f = parseFloat(document.getElementById("f2").value);
		const N = parseFloat(document.getElementById("N2").value);
		const s = parseFloat(document.getElementById("s2").value) * 1000;
		if (f <= 0 || N <= 0 || s <= 0 || s <= f) {
			alert('Illegal!');
			return;
		}
		const D_list = [], c_list = [], cpx_list = [];
		for (let D = 0.5 * s; D < 0.75 * s; D += 0.01 * s) {
			if (D <= f) continue;
			const c = computeCoC(f, N, s, D);
			D_list.push(D / 1000);
			c_list.push(c);
			cpx_list.push(toPx(c));
		}
		for (let D = 0.75 * s; D < 1.3 * s; D += 0.005 * s) {
			if (D <= f) continue;
			const c = computeCoC(f, N, s, D);
			D_list.push(D / 1000);
			c_list.push(c);
			cpx_list.push(toPx(c));
		}
		for (let D = 1.3 * s; D <= 2 * s; D += 0.02 * s) {
			if (D <= f) continue;
			const c = computeCoC(f, N, s, D);
			D_list.push(D / 1000);
			c_list.push(c);
			cpx_list.push(toPx(c));
		}
		plotDualAxis(D_list, cpx_list, c_list, "plot2", "背景物距 (m)", "CoC vs D", {logY: true});
	}

	function plotCard3() {
		const N = parseFloat(document.getElementById("N3").value);
		const delta = parseFloat(document.getElementById("delta3").value) * 1000;
		const M = parseFloat(document.getElementById("M3").value);
		if (N <= 0 || M <= 0) {
			alert('Illegal!');
			return;
		}
		const k = (1 + M) / M;
		const f_list = [], c_list = [], cpx_list = [];
		for (let f = 16; f <= 800; f += 2) {
			const s = k * f;
			const D = s + delta;
			if (D <= f || D <= 0) continue;
			const c = computeCoC(f, N, s, D);
			f_list.push(f);
			c_list.push(c);
			cpx_list.push(toPx(c));
		}
		plotDualAxis(f_list, cpx_list, c_list, "plot3", "焦距 f (mm)", "CoC vs 焦距", {
			logX: true,
			logY: true,
			xTickVals: [16, 24, 35, 50, 70, 85, 105, 150, 200, 300, 400, 600, 800],
			xTickText: ["16", "24", "35", "50", "70", "85", "105", "150", "200", "300", "400", "600", "800"]
		});
	}

	function plotCard4() {
		const f = parseFloat(document.getElementById("f4").value);
		const N = parseFloat(document.getElementById("N4").value);
		const delta = parseFloat(document.getElementById("delta4").value) * 1000;
		if (f <= 0 || N <= 0) {
			alert('Illegal!');
			return;
		}
		const s_list = [], c_list = [], cpx_list = [];
		for (let s = f; s <= Math.max(400000, 4 * f); s += 50) {
			const D = s + delta;
			if (D <= f || D <= 0) continue;
			const c = computeCoC(f, N, s, D);
			s_list.push(s / 1000);
			c_list.push(c);
			cpx_list.push(toPx(c));
		}
		plotDualAxis(s_list, cpx_list, c_list, "plot4", "主体物距 s (m)", "CoC vs s", {
			logX: true,
			logY: true
		});
	}

	function plotCard5() {
		const f = parseFloat(document.getElementById("f5").value);
		const N = parseFloat(document.getElementById("N5").value);
		const M = parseFloat(document.getElementById("M5").value);
		const delta = parseFloat(document.getElementById("delta5").value) * 1000;
		if (f <= 0 || N <= 0 || M <= 0) {
			alert('Illegal!');
			return;
		}
		const k = (1 + M) / M;
		const bokeh = N * (k + delta / f);
		const f_list = [], N_list = [];
		for (let f = 16; f <= 800; f += 2) {
			f_list.push(f);
			const eqN = bokeh / (k + delta / f);
			N_list.push(eqN);
		}
		plotAxis(f_list, N_list, "plot5", "焦距 f (mm)", "焦距 vs 光圈", {
			logX: true,
			logY: true,
			xTickVals: [16, 24, 35, 50, 70, 85, 105, 150, 200, 300, 400, 600, 800],
			xTickText: ["16", "24", "35", "50", "70", "85", "105", "150", "200", "300", "400", "600", "800"],
			yTickprefix: 'f/',
			yTickformat: '.1f'
		});
	}

	function plotCard6() {
		const f = parseFloat(document.getElementById("f6").value);
		const N = parseFloat(document.getElementById("N6").value);
		const s = parseFloat(document.getElementById("s6").value) * 1000;
		if (f <= 0 || N <= 0 || s <= 0 || s <= f) {
			alert('Illegal!');
			return;
		}
		const bokeh = f ** 2 / (N * (s - f));
		const f_list = [], N_list = [];
		for (let f = 16; f <= 800; f += 2) {
			if (s <= f) continue;
			f_list.push(f);
			const eqN = f ** 2 / (bokeh * (s - f));
			N_list.push(eqN);
		}
		plotAxis(f_list, N_list, "plot6", "焦距 f (mm)", "焦距 vs 光圈", {
			logX: true,
			logY: true,
			xTickVals: [16, 24, 35, 50, 70, 85, 105, 150, 200, 300, 400, 600, 800],
			xTickText: ["16", "24", "35", "50", "70", "85", "105", "150", "200", "300", "400", "600", "800"],
			yTickprefix: 'f/',
			yTickformat: '.1f'
		});
	}
	function plotCard7() {
		const f1 = parseFloat(document.getElementById("f71").value);
		const N1 = parseFloat(document.getElementById("N71").value);
		const f2 = parseFloat(document.getElementById("f72").value);
		const N2 = parseFloat(document.getElementById("N72").value);
		const M = parseFloat(document.getElementById("M7").value);
		if (f1 <= 0 || N1 <= 0 || f2 <= 0 || N2 <= 0 || M <= 0) {
			alert('Illegal!');
			return;
		}
		const k = (1 + M) / M;
		const s1 = k * f1;
		const s2 = k * f2;
		const d_list = [], cpx1_list = [], cpx2_list = [];
		for (let delta = 1; delta <= 6; delta += 0.02) {
			const d = 10**delta;
			d_list.push(d/1000);
			const D1 = s1 + d;
			const c1 = computeCoC(f1, N1, s1, D1);
			const D2 = s2 + d;
			const c2 = computeCoC(f2, N2, s2, D2);
			//c_list.push(c);
			cpx1_list.push(toPx(c1));
			cpx2_list.push(toPx(c2));
		}
		plotAxisDualLine(d_list, cpx1_list, cpx2_list, "plot7", "主体-背景距离 D-s (m)", "CoC vs D-s", {
			logX: true,
			yTiTle: "CoC (px)",
			name1: `${f1.toFixed(0)}mm @ f/${N1.toFixed(1)}`,
			name2: `${f2.toFixed(0)}mm @ f/${N2.toFixed(1)}`
		});
	}
</script>
