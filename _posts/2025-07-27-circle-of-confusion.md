---
title: 弥散圆计算工具
tags: 
- Physics
- Code
- JavaScript
cover: https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/CIE1931xy_blank.svg/723px-CIE1931xy_blank.svg.png
favorite: true
---
计算不同参数下的弥散圆直径并绘制2-D图像
<!--more-->
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
	
	button {
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
	}
	
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

	var {
		font-family: Times New Roman;
		font-style: italic;
	}
	
	/* ====== 以下为移动端适配部分 ====== */
	@media (max-width: 768px) {
		body {
			padding: 10px;
		}
		/*.container {
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
		button {
			width: 100%;
			font-size: 1.1rem;
			padding: 12px;
		}
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

<div class="container">
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
				<label>光圈 <var>N</var>：</label>
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
				<label>光圈 <var>N</var>：</label>
				<input type="number" id="N4" value="2.0" min="0" onchange="plotCard4()">
			</div>
			<div class="form-group">
				<label><var>D - s</var> (m)：</label>
				<input type="number" id="delta4" value="0.5" onchange="plotCard4()">
			</div>
			<!--<button onclick="plotCard4()">绘图</button>-->
			<div id="plot4" class="plot-container"></div>
		</div>
	</div>
</div>
<script>
	update();

	function update() {
		plotCard1();
		plotCard2();
		plotCard3();
		plotCard4();
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
				spikemode: 'across'
			},
			yaxis2: {
				title: "CoC (mm)",
				titlefont: { color: "blue" },
				tickfont: { color: "blue" },
				overlaying: "y",
				side: "right",
				showline: true
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
		plotDualAxis(N_list, cpx_list, c_list, "plot1", "光圈 (f/N)", "CoC vs 光圈", {
			logX: true,
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
		for (let D = s / 2; D <= 2 * s; D += 0.015 * s) {
			if (D <= f) continue;
			const c = computeCoC(f, N, s, D);
			D_list.push(D / 1000);
			c_list.push(c);
			cpx_list.push(toPx(c));
		}
		plotDualAxis(D_list, cpx_list, c_list, "plot2", "背景物距 (m)", "CoC vs D");
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
		plotDualAxis(s_list, cpx_list, c_list, "plot4", "对焦距离 s (m)", "CoC vs s", {
			logX: true
		});
	}
</script>