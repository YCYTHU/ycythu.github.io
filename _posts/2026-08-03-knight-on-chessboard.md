---
title: 棋盘上棋子移动的最短路径
tags: 
- Code
- JavaScript
- Graph theory
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/chess%20knight.jpg
favorite: true
---
在无限棋盘上，将指定棋子移动到目标位置的最短路径问题，本质上是一个由移动规则定义的离散状态空间搜索问题。给定一组二维移动向量，如何从原点到达任意目标点并确定所需的最少步数，可通过图搜索算法进行求解并进一步进行可视化分析。
<!--more-->

<head>
	<meta charset="UTF-8">
	<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
	<style>
		.container{
			/*max-width:900px;
			background:white;
			padding:30px;
			border-radius:18px;
			box-shadow:0 8px 25px rgba(0,0,0,0.15);*/
		}
		.vector{
			display:flex;
			align-items:center;
			gap:8px;
			padding:10px;
			margin:8px 0;
			background:#f8f9fa;
			border-radius:10px;
		}
		input[type=number]{
			width:65px;
			padding:6px;
			font-size:15px;
			border-radius:8px;
			border:1px solid #bbb;
		}
		button{
			padding:8px 16px;
			border:none;
			border-radius:10px;
			background:#3498db;
			color:white;
			font-size:15px;
			cursor:pointer;
			transition:.2s;
		}
		button:hover{
			background:#217dbb;
			transform:translateY(-1px);
		}
		.panel{
			margin-top:10px;
			margin-bottom: 10px;
			padding:15px;
			/*background:#ecf0f1;*/
			border: 2px solid #999;
			border-radius:12px;
		}
		#heatmap{
			margin-top:30px;
			display: flex;
    		justify-content: center;
		}
		.size-title{
			display:flex;
			align-items:center;
			gap:10px;
			font-size:16px;
			font-weight:600;
			color:#34495e;
		}
		#sizeValue{
			background:#3498db;
			color:white;
			padding:4px 12px;
			border-radius:20px;
			font-size:14px;
		}
		#sizeSlider{
			width:100%;
			margin-top:18px;
			height:8px;
			appearance:none;
			-webkit-appearance:none;
			background:linear-gradient(90deg, #3498db, #85c1e9);
			border-radius:10px;
			outline:none;
		}
		#sizeSlider::-webkit-slider-thumb{
			appearance:none;
			-webkit-appearance:none;
			width:22px;
			height:22px;
			background:white;
			border:4px solid #3498db;
			border-radius:50%;
			cursor:pointer;
			box-shadow:0 2px 6px rgba(0,0,0,.25);
			transition:0.2s;
		}
		#sizeSlider::-webkit-slider-thumb:hover{
			transform:scale(1.15);
		}
		#sizeSlider::-moz-range-thumb{
			width:22px;
			height:22px;
			background:white;
			border:4px solid #3498db;
			border-radius:50%;
			cursor:pointer;
		}
		.size-scale{
			margin-left: 8px;
			display:flex;
			justify-content:space-between;
			margin-top:8px;
			font-size:12px;
			color:#7f8c8d;
		}
	</style>
</head>

以中国象棋中的“马”为例，其走法为“日”字型，在无阻挡情况下的单步合法移动向量集合可表示为

$$V=\{\left(\pm1,\pm2\right), \left(\pm2,\pm1\right)\}$$

这 8 个二维向量构成了该状态图中的基本转移边。

由于移动向量关于 $x$ 轴、$y$ 轴以及对角线 $y=x$ 对称，因此从原点出发到达目标点 $(x,y)$ 的最短距离 $D(x,y)$ 满足对称性

$$D(x,y)=D(|x|,|y|)=D(|y|,|x|)$$

因此只需研究第一象限中 $x \ge y \ge 0$ 的区域即可推导全盘性质。

由于离散棋盘状态图中每条边的权重均为 $1$（即每走一步的代价为 1），求解从原点 $(0,0)$ 到任意节点 $(x,y)$ 的最短路径等价于在图上进行广度优先搜索。随着搜索深度的增加，各点最短步数从原点呈波浪状向外扩散。为了更直观地观察这种阶梯状步数场以及改变移动向量对路径分布的影响，我们可以通过下面的交互式可视化组件，实时生成不同棋盘尺寸与向量组下的步数热图。

<body>
	<div class="container">
		<div class="panel">
			棋盘类型：
			<a class="button button--secondary button--rounded" onclick="setBoard('xiangqi')">中国象棋</a>
			<a class="button button--secondary button--rounded" onclick="setBoard('chess')">国际象棋</a>
		</div>
		<div class="panel">
			<label class="size-title">棋盘尺寸：<span id="sizeValue">9 × 9</span></label>
			<input id="sizeSlider" type="range" min="7" max="19" step="2" value="9" oninput="updateSize(this.value)">
			<div class="size-scale">
				<span>&nbsp;7</span>
				<span>&nbsp;9</span>
				<span>11</span>
				<span>13</span>
				<span>15</span>
				<span>17</span>
				<span>19</span>
			</div>
		</div>
		<h3>移动向量</h3>
		<a class="button button--success button--rounded" onclick="addVector()">＋添加</a>
		<a class="button button--secondary button--rounded" onclick="calculate()"><i class="fa-solid fa-arrow-rotate-left"></i>更新绘图</a>
		<div id="vectors">
			<div class="vector">
				x:<input type="number" value="1">
				y:<input type="number" value="2">
				<label><input type="checkbox" class="sx" checked>±x</label>
				<label><input type="checkbox" class="sy" checked>±y</label>
				<label><input type="checkbox" class="swap" checked>交换x/y</label>
			</div>
		</div>
		<div id="heatmap"></div>
	</div>

<script>
	let SIZE = 9;
	let boardType="xiangqi";

	function updateSize(value){
	    document.getElementById("sizeValue").innerText = value + " × " + value;
	    SIZE = parseInt(value);
	    calculate();
	}

	// 添加向量
	function addVector(){
		let div=document.createElement("div");
		div.className="vector";
		div.innerHTML=
		`x:<input type="number" value="1">
		y:<input type="number" value="2">
		<label><input type="checkbox" class="sx" checked>±x</label>
		<label><input type="checkbox" class="sy" checked>±y</label>
		<label><input type="checkbox" class="swap" checked>交换x/y</label>
		<a class="button button--primary button--pill" onclick="removeVector(this)"><i class="fa-solid fa-trash"></i></a>`;
		document.getElementById("vectors").appendChild(div);
	}

	function removeVector(btn){
		btn.parentElement.remove();
	}

	// 棋盘类型
	function setBoard(type){
		boardType=type;
		calculate();
	}

	// 获取移动集合
	function getMoves(){
		let moves = [];
		document.querySelectorAll(".vector").forEach(v => {
			let nums = v.querySelectorAll("input[type = number]");
			let x = parseInt(nums[0].value);
			let y = parseInt(nums[1].value);
			let sx = v.querySelector(".sx").checked;
			let sy = v.querySelector(".sy").checked;
			let swap = v.querySelector(".swap").checked;
			let xs = sx ? [x,-x] : [x];
			let ys = sy ? [y,-y] : [y];
			for(let a of xs){
				for(let b of ys){
					moves.push([a,b]);
					if(swap)
						moves.push([b,a]);
				}
			}
		});
		return moves;
	}

	// BFS
	function BFS(moves){
		let N = SIZE;
		let center = (SIZE - 1) / 2;
		let dist = Array.from({length:N}, ()=>Array(N).fill(null));
		let queue = [[0,0]];
		dist[center][center] = 0;
		let head = 0;
		while(head<queue.length){
			let [x,y] = queue[head++];
			let d = dist[y+center][x+center];
			for(let m of moves){
				let nx = x+m[0];
				let ny = y+m[1];
				if(Math.abs(nx)<=center && Math.abs(ny)<=center && dist[ny+center][nx+center] === null){
					dist[ny+center][nx+center]=d+1;
					queue.push([nx,ny]);
				}
			}
		}
		return dist;
	}

	// 绘制
	function calculate(){
		let moves = getMoves();
		if(moves.length == 0){
			alert("请输入移动向量");
			return;
		}
		let z = BFS(moves);
		let axis=[];
		for(let i = -(SIZE - 1) / 2; i <= (SIZE - 1) / 2; i++)
			axis.push(i);
		let data = [{
			x:axis,
			y:axis,
			z:z.map(row=>row.map(v=>v===null?null:v)),
			type:"heatmap",
			zsmooth:"best",
			connectgaps:false,
			colorscale:"Viridis",
			hovertemplate:
			"x=%{x}<br>y=%{y}<br>步数=%{z}"
		}];

		// 棋盘线
		let shapes = [];
		let lines = [];
		if(boardType == "chess"){
			for(let i = -SIZE / 2; i <= SIZE / 2; i+=1)
				lines.push(i);
		}
		else{
			for(let i=-(SIZE - 1) / 2; i <= (SIZE - 1) / 2; i++)
				lines.push(i);
		}

		for(let i of lines){
			shapes.push({
				type:"line",
				x0:i,
				x1:i,
				y0:-SIZE / 2,
				y1:SIZE / 2,
				line:{width:1}
			});
			shapes.push({
				type:"line",
				y0:i,
				y1:i,
				x0:-SIZE / 2,
				x1:SIZE / 2,
				line:{width:1}
			});
		}

		let range = [-SIZE / 2, SIZE / 2];//boardType=="chess"?[-4.5,4.5]:[-4,4];

		let layout = {
			width:700,
			height:700,
			title:"中心点(0,0)到各点的最少步数",
			xaxis:{
				title:"x",
				dtick:1,
				range:range
			},
			yaxis:{
				title:"y",
				dtick:1,
				range:range
			},
			shapes:shapes,
			plot_bgcolor:"white"
		};

		Plotly.newPlot("heatmap",data,layout);
	}
</script>
</body>
