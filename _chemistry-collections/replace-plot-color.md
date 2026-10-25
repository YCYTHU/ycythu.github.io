---
layout: none
title: 替换绘图颜色
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/default.jpg
---
<!--more-->

<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light">
<title>科研线条图颜色替换</title>
<style>
  :root {
    --ink: #172033;
    --muted: #657086;
    --line: #dce2eb;
    --panel: #ffffff;
    --page: #f5f7fb;
    --accent: #3157d5;
    --accent-soft: #edf1ff;
    --good: #16734b;
    --warn: #996515;
    --danger: #b42318;
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
  }
  * { box-sizing: border-box; }
  body { margin: 0; color: var(--ink); background: var(--page); line-height: 1.5; }
  button, input, select { font: inherit; }
  button { cursor: pointer; }
  button:disabled { cursor: not-allowed; opacity: .48; }
  .wrap { max-width: 1240px; padding: 28px 20px 56px; margin: 0 auto; }
  header { margin-bottom: 22px; }
  h1 { font-size: clamp(25px, 3.3vw, 35px); line-height: 1.2; margin: 0 0 10px; letter-spacing: -.035em; }
  h2 { font-size: 19px; margin: 0; letter-spacing: -.015em; }
  h3 { font-size: 15px; margin: 0; }
  p { margin: 7px 0; }
  .subtitle { color: var(--muted); }
  .dot { width: 7px; height: 7px; background: #23a26d; border-radius: 50%; }
  .panel { background: var(--panel); border: 1px solid var(--line); border-radius: 15px; box-shadow: 0 2px 8px rgba(25, 42, 70, .035); padding: 20px; margin-top: 16px; }
  .panel-head { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; }
  .step { display: inline-grid; place-items: center; width: 27px; height: 27px; margin-right: 8px; border-radius: 8px; color: var(--accent); background: var(--accent-soft); font-size: 13px; font-weight: 800; vertical-align: 2px; }
  .drop { border: 1.5px dashed #b9c5d9; border-radius: 12px; padding: 28px 16px; text-align: center; background: #fbfcff; transition: .15s ease; }
  .drop.drag { border-color: var(--accent); background: #f0f3ff; }
  .drop strong { display: block; font-size: 16px; margin-bottom: 5px; }
  .drop p { color: var(--muted); font-size: 13px; margin-bottom: 14px; }
  .file-btn, .btn { display: inline-flex; align-items: center; justify-content: center; gap: 7px; border: 1px solid #cbd4e2; border-radius: 9px; padding: 9px 14px; background: #fff; color: var(--ink); font-weight: 650; font-size: 13px; min-height: 38px; }
  .btn:hover:not(:disabled), .file-btn:hover { border-color: #8596b5; background: #f9faff; }
  .btn.primary { color: #fff; background: var(--accent); border-color: var(--accent); }
  .btn.primary:hover:not(:disabled) { background: #2648bb; }
  .btn.subtle { background: var(--accent-soft); border-color: #dce3ff; color: #2447bb; }
  .btn.small { padding: 6px 9px; min-height: 31px; font-size: 12px; }
  #fileInput { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; }
  .meta-row { display: flex; flex-wrap: wrap; gap: 8px 17px; color: var(--muted); font-size: 13px; margin-top: 12px; }
  .meta-row strong { color: var(--ink); font-weight: 650; }
  .control-row { display: flex; align-items: end; flex-wrap: wrap; gap: 12px; }
  .field { display: flex; flex-direction: column; gap: 5px; min-width: 130px; }
  .field label, .field-label { color: #424d62; font-size: 12px; font-weight: 700; }
  .color-input-row { display: flex; align-items: center; gap: 7px; }
  input[type="color"] { width: 40px; height: 36px; padding: 3px; border: 1px solid #cbd4e2; border-radius: 8px; background: #fff; cursor: pointer; }
  input[type="text"], input[type="number"], select { height: 36px; border: 1px solid #cbd4e2; border-radius: 8px; padding: 6px 9px; background: #fff; color: var(--ink); min-width: 0; }
  input[type="text"] { width: 100px; font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace; text-transform: uppercase; }
  input.invalid { border-color: var(--danger); outline-color: var(--danger); }
  .hint { color: var(--muted); font-size: 12px; }
  .notice { font-size: 13px; border-radius: 9px; padding: 10px 12px; background: #f7f9fe; border: 1px solid #e4e9f2; color: #526078; margin-top: 12px; }
  .notice.warning { background: #fff8e8; border-color: #f0dfb4; color: #805a14; }
  .notice.error { background: #fff1f0; border-color: #f1c6c3; color: #982a20; }
  .hidden { display: none !important; }
  .palette-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr)); gap: 12px; }
  .color-card { border: 1px solid var(--line); border-radius: 12px; padding: 14px; min-width: 0; }
  .card-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 12px; }
  .swatch-wrap { display: flex; align-items: center; gap: 10px; min-width: 0; }
  .swatch { width: 35px; height: 35px; border-radius: 9px; border: 1px solid rgba(0,0,0,.13); flex: 0 0 auto; }
  .candidate-name { font-weight: 750; font-size: 14px; }
  .candidate-count { color: var(--muted); font-size: 11px; margin-top: 3px; }
  .card-fields { display: grid; grid-template-columns: 1fr; gap: 12px; }
  .color-field { display: grid; grid-template-columns: 40px 100px; gap: 7px; align-items: center; }
  .target-row { border-top: 1px solid #edf0f5; padding-top: 11px; margin-top: 1px; }
  .target-row .color-field { grid-template-columns: 40px minmax(130px, 1fr); }
  .target-row input[type="text"] { width: 100%; max-width: 190px; }
  .target-row .hint { display: block; margin-top: 5px; }
  details.advanced { margin-top: 16px; border-top: 1px solid #edf0f5; padding-top: 12px; }
  details.advanced summary { cursor: pointer; color: #4c5a71; font-size: 13px; font-weight: 700; }
  .advanced-fields { display: flex; gap: 12px; flex-wrap: wrap; padding-top: 12px; }
  .advanced-fields .field { min-width: 115px; }
  .advanced-fields input { width: 100px; }
  .action-row { display: flex; align-items: center; flex-wrap: wrap; gap: 9px; margin-top: 17px; }
  #status { color: var(--muted); font-size: 13px; min-height: 19px; }
  .results-grid { display: grid; grid-template-columns: repeat(2, minmax(0,1fr)); gap: 14px; }
  .image-box { min-width: 0; border: 1px solid var(--line); border-radius: 11px; padding: 10px; background: #fbfcfe; }
  .image-title { display: flex; justify-content: space-between; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 13px; font-weight: 750; margin-bottom: 8px; }
  .canvas-frame { min-height: 120px; max-height: 540px; overflow: auto; background-color: #f2f4f8; background-image: linear-gradient(45deg,#e4e7ed 25%,transparent 25%),linear-gradient(-45deg,#e4e7ed 25%,transparent 25%),linear-gradient(45deg,transparent 75%,#e4e7ed 75%),linear-gradient(-45deg,transparent 75%,#e4e7ed 75%); background-size: 18px 18px; background-position: 0 0,0 9px,9px -9px,-9px 0; border-radius: 6px; display: flex; justify-content: center; align-items: flex-start; }
  canvas.preview { display: block; max-width: 100%; height: auto; object-fit: contain; }
  .view-tabs { display: flex; gap: 5px; flex-wrap: wrap; }
  .view-tab { border: 1px solid #d7deea; border-radius: 7px; padding: 5px 8px; background: #fff; color: #59667c; font-size: 11px; font-weight: 650; }
  .view-tab.active { background: var(--accent-soft); border-color: #cbd5ff; color: #2447bb; }
  .result-stats { display: flex; flex-wrap: wrap; gap: 8px 16px; margin-top: 12px; font-size: 12px; color: var(--muted); }
  .result-stats strong { color: var(--ink); }
  @media (max-width: 720px) {
    .wrap { padding: 20px 12px 40px; }
    .panel { padding: 14px; }
    .results-grid { grid-template-columns: 1fr; }
    .control-row .btn { flex: 1; }
    .image-box { padding: 8px; }
  }
</style>
</head>
<body>
<div class="wrap">
  <header>
    <h1>科研线条图颜色替换</h1>
    <p class="subtitle">检测图片主要颜色，替换为指定新颜色并保留抗锯齿边缘的平滑过渡，主要适用于白底、实色线条的绘图</p>
  </header>

  <section class="panel">
    <div class="panel-head"><h2><span class="step">1</span>选择图片</h2></div>
    <div id="dropZone" class="drop">
      <strong>将图片拖到这里</strong>
      <p><span style="font-weight: bold;">强烈建议使用 PNG 格式</span>，JPEG 压缩可能影响颜色采样</p>
      <label for="fileInput" class="file-btn">选择图片</label>
      <input id="fileInput" type="file" accept="image/png,image/jpeg,image/webp,image/*">
    </div>
    <div id="imageMeta" class="meta-row hidden"></div>
    <div id="loadMessage" class="notice hidden"></div>
  </section>

  <section id="settingsPanel" class="panel hidden">
    <div class="panel-head"><h2><span class="step">2</span>确认背景颜色</h2><span class="hint">自动从图像边缘估计，可手动修改</span></div>
    <div class="control-row">
      <div class="field">
        <label for="bgHex">背景色</label>
        <div class="color-input-row">
          <input id="bgColor" type="color" value="#FFFFFF" aria-label="背景颜色选择器">
          <input id="bgHex" type="text" value="#FFFFFF" maxlength="7" spellcheck="false" aria-label="背景颜色十六进制值">
        </div>
      </div>
      <button id="detectBtn" class="btn subtle" type="button">重新检测颜色</button>
    </div>
    <div id="bgNote" class="notice">默认假设背景为单一浅色，修改背景色后，需要重新检测颜色候选</div>
    <details class="advanced">
      <summary>高级参数（通常可保持默认值）</summary>
      <div class="advanced-fields">
        <div class="field"><label for="coreMinDist">颜色检测距离阈值</label><input id="coreMinDist" type="number" min="1" max="100" value="16" step="1"><span class="hint">更低可检测更浅的颜色</span></div>
        <div class="field"><label for="bgThreshold">背景判定阈值</label><input id="bgThreshold" type="number" min="0" max="80" value="5" step="1"><span class="hint">越低越保留淡边缘</span></div>
        <div class="field"><label for="cosThreshold">颜色方向匹配</label><input id="cosThreshold" type="number" min="0.5" max="1" value="0.94" step="0.01"><span class="hint">范围 0.5–1</span></div>
        <div class="field"><label for="residualThreshold">模型误差阈值</label><input id="residualThreshold" type="number" min="1" max="100" value="24" step="1"><span class="hint">JPEG 可适当提高</span></div>
      </div>
    </details>
  </section>

  <section id="palettePanel" class="panel hidden">
    <div class="panel-head">
      <h2><span class="step">3</span>确认原色与替换颜色</h2>
      <span id="paletteCount" class="hint"></span>
    </div>
    <div class="notice">
      核对检测到的原色，并填写希望替换成的新颜色。<strong>留空不填写表示不替换。</strong>
      如果某种颜色未被自动检测到，可以手动添加
    </div>
    <div id="paletteGrid" class="palette-grid" style="margin-top:13px"></div>
    <div class="action-row" style="margin-top:13px">
      <button id="addColorBtn" type="button" class="btn subtle">＋ 手动添加一种颜色</button>
      <span class="hint"></span>
    </div>
    <div class="action-row">
      <button id="processBtn" type="button" class="btn primary">生成替换预览</button>
      <span id="status" role="status" aria-live="polite"></span>
    </div>
  </section>

  <section id="resultPanel" class="panel hidden">
    <div class="panel-head">
      <h2><span class="step">4</span>像素分类与替换结果</h2>
      <button id="copyBtn" class="btn small" type="button">复制结果图片</button>
    </div>
    <div class="results-grid">
      <div class="image-box">
        <div class="image-title"><span>原图</span><span id="originalSize" class="hint" style="padding: 5px; border: 1px solid #fbfcfe; font-size: 11px;"></span></div>
        <div class="canvas-frame"><canvas id="originalCanvas" class="preview"></canvas></div>
      </div>
      <div class="image-box">
        <div class="image-title">
          <span id="outputTitle">替换结果</span>
          <div class="view-tabs" role="group" aria-label="结果显示模式">
            <button class="view-tab active" data-view="result" type="button">替换结果</button>
            <button class="view-tab" data-view="labels" type="button">像素分类</button>
            <button class="view-tab" data-view="alpha" type="button">混合比例</button>
          </div>
        </div>
        <div class="canvas-frame"><canvas id="outputCanvas" class="preview"></canvas></div>
      </div>
    </div>
    <div class="result-stats" id="resultStats"></div>
    <div id="resultNote" class="notice"></div>
  </section>
</div>

<script>
(() => {
  'use strict';

  const $ = id => document.getElementById(id);
  const state = {
    width: 0,
    height: 0,
    imageData: null,
    background: [255, 255, 255],
    palette: [],
    labels: null,
    alpha: null,
    outputData: null,
    decisions: [],
    backgroundNeedsDetection: false,
    currentView: 'result'
  };

  const MAX_PIXELS = 16_000_000;
  const MAX_SAMPLES = 12000;

  function clamp(x, lo, hi) {
    return Math.max(lo, Math.min(hi, x));
  }

  function norm3(x, y, z) {
    return Math.sqrt(x*x + y*y + z*z);
  }

  function dot3(a, b) {
    return a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
  }

  function unit3(x, y, z) {
    const n = norm3(x, y, z) || 1;
    return [x/n, y/n, z/n];
  }

  function hexToRgb(hex) {
    const m = /^#?([0-9a-f]{6})$/i.exec(String(hex).trim());
    if (!m) return null;
    const s = m[1];
    return [
      parseInt(s.slice(0, 2), 16),
      parseInt(s.slice(2, 4), 16),
      parseInt(s.slice(4, 6), 16)
    ];
  }

  function rgbToHex(rgb) {
    return '#' + rgb.map(v =>
      clamp(Math.round(v), 0, 255).toString(16).padStart(2, '0')
    ).join('').toUpperCase();
  }

  function normalizeHex(hex) {
    const rgb = hexToRgb(hex);
    return rgb ? rgbToHex(rgb) : null;
  }

  function setStatus(message, kind = '') {
    const el = $('status');
    el.textContent = message || '';
    el.style.color = kind === 'error'
      ? 'var(--danger)'
      : kind === 'good'
        ? 'var(--good)'
        : 'var(--muted)';
  }

  function showMessage(el, message, kind = '') {
    el.textContent = message;
    el.classList.remove('hidden', 'warning', 'error');
    if (kind) el.classList.add(kind);
  }

  function hide(el) {
    el.classList.add('hidden');
  }

  function median(values) {
    if (!values.length) return 255;
    values.sort((a, b) => a - b);
    const m = values.length >> 1;
    return values.length % 2
      ? values[m]
      : (values[m - 1] + values[m]) / 2;
  }

  function estimateBackground(data, w, h) {
    const t = Math.max(
      1,
      Math.min(5, Math.floor(h / 100) || 1, Math.floor(w / 100) || 1)
    );
    const r = [], g = [], b = [];

    const add = (x, y) => {
      const i = (y * w + x) * 4;
      r.push(data[i]);
      g.push(data[i + 1]);
      b.push(data[i + 2]);
    };

    for (let y = 0; y < t; y++) {
      for (let x = 0; x < w; x++) {
        add(x, y);
        add(x, h - 1 - y);
      }
    }

    for (let x = 0; x < t; x++) {
      for (let y = t; y < h - t; y++) {
        add(x, y);
        add(w - 1 - x, y);
      }
    }

    return [median(r), median(g), median(b)];
  }

  /*
   * 从颜色方向样本中提取候选颜色方向。
   * 这里将方向量化为小网格，再聚合附近网格的权重。
   * 不同方向的红色、蓝色等候选应当尽量保持独立。
   */
  function clusterDirections(samples, sampleCount, eps = 0.14, minSamples = 4) {
    const cellSize = 0.04;
    const binsByKey = new Map();

    for (let i = 0; i < sampleCount; i++) {
      const x = samples[i*3];
      const y = samples[i*3+1];
      const z = samples[i*3+2];

      const gx = Math.floor((x + 1) / cellSize);
      const gy = Math.floor((y + 1) / cellSize);
      const gz = Math.floor((z + 1) / cellSize);
      const key = gx + ',' + gy + ',' + gz;

      let bin = binsByKey.get(key);
      if (!bin) {
        bin = { gx, gy, gz, count: 0, sx: 0, sy: 0, sz: 0 };
        binsByKey.set(key, bin);
      }

      bin.count++;
      bin.sx += x;
      bin.sy += y;
      bin.sz += z;
    }

    const bins = Array.from(binsByKey.values());
    if (!bins.length) return [];

    const keyToIndex = new Map();

    for (let i = 0; i < bins.length; i++) {
      const b = bins[i];
      b.index = i;
      b.dir = unit3(b.sx, b.sy, b.sz);
      keyToIndex.set(b.gx + ',' + b.gy + ',' + b.gz, i);
    }

    const radiusCells = Math.ceil(eps / cellSize);
    const eps2 = eps * eps;

    for (const bin of bins) {
      let weight = 0, sx = 0, sy = 0, sz = 0;

      for (let dx = -radiusCells; dx <= radiusCells; dx++) {
        for (let dy = -radiusCells; dy <= radiusCells; dy++) {
          for (let dz = -radiusCells; dz <= radiusCells; dz++) {
            const j = keyToIndex.get(
              (bin.gx + dx) + ',' +
              (bin.gy + dy) + ',' +
              (bin.gz + dz)
            );
            if (j === undefined) continue;

            const other = bins[j];
            const ex = bin.dir[0] - other.dir[0];
            const ey = bin.dir[1] - other.dir[1];
            const ez = bin.dir[2] - other.dir[2];

            if (ex*ex + ey*ey + ez*ez > eps2) continue;

            weight += other.count;
            sx += other.sx;
            sy += other.sy;
            sz += other.sz;
          }
        }
      }

      bin.localWeight = weight;
      bin.localDirection = unit3(sx, sy, sz);
    }

    const ordered = bins.slice().sort((a, b) => b.localWeight - a.localWeight);
    const centers = [];

    for (const bin of ordered) {
      if (bin.localWeight < minSamples) break;

      let match = -1;

      for (let j = 0; j < centers.length; j++) {
        if (dot3(bin.localDirection, centers[j].direction) >= 0.985) {
          match = j;
          break;
        }
      }

      if (match < 0) {
        centers.push({
          direction: bin.localDirection.slice(),
          weight: bin.localWeight
        });
      } else if (bin.localWeight > centers[match].weight) {
        centers[match].direction = bin.localDirection.slice();
        centers[match].weight = bin.localWeight;
      }
    }

    return centers;
  }

  function detectPalette(data, w, h, bg, coreMinDist) {
    const total = w * h;
    const samples = new Float32Array(MAX_SAMPLES * 3);
    const sampleRadii = new Float32Array(MAX_SAMPLES);

    let seen = 0;
    let rngState = 0x4A39B70D;

    const random = () => {
      rngState = (Math.imul(1664525, rngState) + 1013904223) >>> 0;
      return rngState / 4294967296;
    };

    const seedMinDist = Math.max(
      coreMinDist,
      Math.min(42, coreMinDist * 1.5)
    );

    function collectDirectionSamples(threshold) {
      samples.fill(0);
      sampleRadii.fill(0);
      seen = 0;
      rngState = 0x4A39B70D;

      for (let p = 0; p < total; p++) {
        const i = p * 4;
        const dx = data[i] - bg[0];
        const dy = data[i+1] - bg[1];
        const dz = data[i+2] - bg[2];
        const r = norm3(dx, dy, dz);

        if (r < threshold) continue;

        seen++;

        let at;
        if (seen <= MAX_SAMPLES) {
          at = seen - 1;
        } else {
          const j = Math.floor(random() * seen);
          if (j >= MAX_SAMPLES) continue;
          at = j;
        }

        const v = unit3(dx, dy, dz);
        samples[at*3] = v[0];
        samples[at*3+1] = v[1];
        samples[at*3+2] = v[2];
        sampleRadii[at] = r;
      }

      return Math.min(seen, MAX_SAMPLES);
    }

    let sampleCount = collectDirectionSamples(seedMinDist);

    if (sampleCount < 20 && seedMinDist > coreMinDist) {
      sampleCount = collectDirectionSamples(coreMinDist);
    }

    if (sampleCount === 0) return [];

    let centers = clusterDirections(samples, sampleCount);

    if (!centers.length) {
      const order = Array.from(
        { length: sampleCount },
        (_, i) => i
      ).sort((a, b) => sampleRadii[b] - sampleRadii[a]);

      const take = Math.min(
        sampleCount,
        Math.max(3, Math.floor(sampleCount / 4))
      );

      let x = 0, y = 0, z = 0;

      for (let k = 0; k < take; k++) {
        const i = order[k];
        x += samples[i*3];
        y += samples[i*3+1];
        z += samples[i*3+2];
      }

      centers = [{ direction: unit3(x, y, z), weight: take }];
    }

    centers.sort((a, b) => b.weight - a.weight);

    const merged = [];

    for (const c of centers) {
      let match = -1;

      for (let j = 0; j < merged.length; j++) {
        if (dot3(c.direction, merged[j].direction) >= 0.97) {
          match = j;
          break;
        }
      }

      if (match < 0) {
        merged.push({
          direction: c.direction.slice(),
          weight: c.weight
        });
      } else {
        const m = merged[match];
        const weight = m.weight + c.weight;

        m.direction = unit3(
          m.direction[0] * m.weight + c.direction[0] * c.weight,
          m.direction[1] * m.weight + c.direction[1] * c.weight,
          m.direction[2] * m.weight + c.direction[2] * c.weight
        );
        m.weight = weight;
      }
    }

    if (!merged.length) return [];

    const strongestWeight = Math.max(...merged.map(c => c.weight));
    const minDirectionWeight = Math.max(5, strongestWeight * 0.015);
    const supported = merged.filter(c => c.weight >= minDirectionWeight);
    const paletteDirections = supported.length ? supported : merged;

    const histograms = paletteDirections.map(() => new Uint32Array(512));

    for (let p = 0; p < total; p++) {
      const i = p * 4;
      const dx = data[i] - bg[0];
      const dy = data[i+1] - bg[1];
      const dz = data[i+2] - bg[2];
      const r = norm3(dx, dy, dz);

      if (r < coreMinDist) continue;

      const d = [dx/r, dy/r, dz/r];
      let best = -1;
      let bestSim = -Infinity;

      for (let k = 0; k < paletteDirections.length; k++) {
        const sim = dot3(d, paletteDirections[k].direction);
        if (sim > bestSim) {
          bestSim = sim;
          best = k;
        }
      }

      if (best >= 0 && bestSim >= 0.90) {
        histograms[best][Math.min(511, Math.floor(r))]++;
      }
    }

    const palette = [];

    for (let k = 0; k < paletteDirections.length; k++) {
      const hist = histograms[k];
      let count = 0;

      for (const n of hist) count += n;
      if (count < 20) continue;

      const targetCount = Math.ceil(count * 0.995);
      let cumulative = 0;
      let scale = 0;

      for (let b = 0; b < hist.length; b++) {
        cumulative += hist[b];
        if (cumulative >= targetCount) {
          scale = b;
          break;
        }
      }

      const dir = paletteDirections[k].direction;

      const source = [
        bg[0] + dir[0] * scale,
        bg[1] + dir[1] * scale,
        bg[2] + dir[2] * scale
      ].map(v => clamp(Math.round(v), 0, 255));

      palette.push({
        direction: dir.slice(),
        estimatedSourceHex: rgbToHex(source),
        samples: count,
        weight: paletteDirections[k].weight,
        manual: false
      });
    }

    palette.sort((a, b) => b.samples - a.samples);
    return palette;
  }

  function renderPalette() {
    const grid = $('paletteGrid');
    grid.replaceChildren();

    $('paletteCount').textContent =
      `${state.palette.length} 种候选颜色 · 目标色留空则不替换`;

    state.palette.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'color-card';

      item.sourceHex = item.sourceHex || item.estimatedSourceHex;
      item.targetHex = typeof item.targetHex === 'string'
        ? item.targetHex
        : '';

      card.innerHTML = `
        <div class="card-top">
          <div class="swatch-wrap">
            <div class="swatch" data-swatch></div>
            <div>
              <div class="candidate-name">候选颜色 ${index + 1}</div>
              <div class="candidate-count" data-count data-palette-count="${index}"></div>
            </div>
          </div>
          <span class="hint">${item.manual ? '手动' : '#' + (index + 1)}</span>
        </div>
        <div class="card-fields">
          <div class="field">
            <label>原色（可手动修改）</label>
            <div class="color-field">
              <input data-source-color type="color" aria-label="候选原色颜色选择器">
              <input data-source-hex type="text" maxlength="7" spellcheck="false" aria-label="候选原色 HEX 值">
            </div>
          </div>
          <div class="field target-row">
            <label>替换成（可选；留空则不替换）</label>
            <div class="color-field">
              <input data-target-color type="color" aria-label="选择替换颜色">
              <input data-target-hex type="text" maxlength="7" placeholder="留空则不替换" spellcheck="false" aria-label="替换颜色 HEX 值">
            </div>
            <span class="hint">使用颜色选择器或输入 HEX，例如 #FF0000</span>
          </div>
        </div>
      `;

      const swatch = card.querySelector('[data-swatch]');
      const countEl = card.querySelector('[data-count]');
      const sourceColor = card.querySelector('[data-source-color]');
      const sourceHex = card.querySelector('[data-source-hex]');
      const targetColor = card.querySelector('[data-target-color]');
      const targetHex = card.querySelector('[data-target-hex]');

      if (item.manual) {
        countEl.textContent = '手动添加的颜色 · 生成预览后统计匹配像素';
      } else {
        countEl.textContent =
          `初始检测估计：约 ${item.samples.toLocaleString()} 个像素 · 检测原色 ${item.estimatedSourceHex}`;
      }

      function setSource(value) {
        const normalized = normalizeHex(value);

        if (!normalized) {
          sourceHex.classList.add('invalid');
          return;
        }

        sourceHex.classList.remove('invalid');
        item.sourceHex = normalized;
        sourceColor.value = normalized;
        sourceHex.value = normalized;
        swatch.style.background = normalized;
      }

      function setTargetText(value, syncPicker = true) {
        const raw = String(value ?? '').trim();

        if (!raw) {
          item.targetHex = '';
          targetHex.classList.remove('invalid');
          targetHex.value = '';
          return;
        }

        const normalized = normalizeHex(raw);

        if (!normalized) {
          item.targetHex = raw;
          targetHex.classList.add('invalid');
          return;
        }

        item.targetHex = normalized;
        targetHex.classList.remove('invalid');

        if (syncPicker) targetColor.value = normalized;
        targetHex.value = normalized;
      }

      setSource(item.sourceHex);

      targetHex.value = item.targetHex;
      targetColor.value =
        normalizeHex(item.targetHex) ||
        normalizeHex(item.sourceHex) ||
        '#000000';

      sourceColor.addEventListener('input', () => {
        setSource(sourceColor.value);
      });

      sourceHex.addEventListener('input', () => {
        const raw = sourceHex.value.trim();

        if (!raw) {
          sourceHex.classList.add('invalid');
          return;
        }

        const normalized = normalizeHex(raw);

        if (normalized) setSource(normalized);
        else sourceHex.classList.add('invalid');
      });

      sourceHex.addEventListener('change', () => {
        setSource(sourceHex.value);
      });

      targetColor.addEventListener('input', () => {
        setTargetText(targetColor.value, false);
      });

      targetHex.addEventListener('input', () => {
        setTargetText(targetHex.value, true);
      });

      targetHex.addEventListener('change', () => {
        setTargetText(targetHex.value, true);
      });

      grid.appendChild(card);
    });

    $('palettePanel').classList.remove('hidden');
  }

  function addManualColor() {
    const defaultHex = '#FF0000';

    state.palette.push({
      direction: unit3(
        255 - state.background[0],
        0 - state.background[1],
        0 - state.background[2]
      ),
      estimatedSourceHex: defaultHex,
      sourceHex: defaultHex,
      targetHex: '',
      samples: 0,
      weight: 0,
      manual: true
    });

    renderPalette();

    setStatus(
      '已手动添加颜色，请填写正确的原色，需要替换时再填写目标颜色',
      'good'
    );

    const cards = $('paletteGrid').querySelectorAll('.color-card');
    cards[cards.length - 1]
      ?.querySelector('[data-source-hex]')
      ?.focus();
  }

  function runClassification() {
    const data = state.imageData.data;
    const w = state.width;
    const h = state.height;
    const total = w * h;
    const bg = state.background.slice();

    const bgThreshold = Math.max(
      0,
      Number($('bgThreshold').value) || 0
    );

    const cosThreshold = clamp(
      Number($('cosThreshold').value) || 0.94,
      0.5,
      1
    );

    const residualThreshold = Math.max(
      1,
      Number($('residualThreshold').value) || 24
    );

    const decisions = [];

    for (let i = 0; i < state.palette.length; i++) {
      const item = state.palette[i];
      const source = hexToRgb(item.sourceHex);
      const targetText = String(item.targetHex ?? '').trim();
      const target = targetText ? hexToRgb(targetText) : null;

      if (!source) {
        throw new Error(`候选颜色 ${i + 1} 的原色格式无效`);
      }

      if (targetText && !target) {
        throw new Error(
          `候选颜色 ${i + 1} 的替换颜色格式无效，请输入 6 位 HEX，或留空`
        );
      }

      const vec = [
        source[0] - bg[0],
        source[1] - bg[1],
        source[2] - bg[2]
      ];

      const denom = dot3(vec, vec);
      const norm = norm3(...vec);

      if (norm < 1) {
        throw new Error(
          `候选颜色 ${i + 1} 与背景色过于接近，请检查原色和背景色`
        );
      }

      decisions.push({
        source,
        target,
        vec,
        denom,
        direction: vec.map(v => v / norm),
        label: i + 2
      });
    }

    const out = new Uint8ClampedArray(data.length);
    const labels = new Int16Array(total);
    const alphaMap = new Float32Array(total);
    const matchedByPalette = new Array(state.palette.length).fill(0);

    let classified = 0;
    let unknown = 0;
    let bgCount = 0;
    let replaced = 0;

    out.set(data);

    for (let p = 0; p < total; p++) {
      const i = p * 4;
      const dx = data[i] - bg[0];
      const dy = data[i + 1] - bg[1];
      const dz = data[i + 2] - bg[2];
      const radius = norm3(dx, dy, dz);

      if (radius <= bgThreshold) {
        labels[p] = 0;
        bgCount++;
        continue;
      }

      labels[p] = -1;

      const d = [dx / radius, dy / radius, dz / radius];
      let best = -1;
      let bestSim = -Infinity;

      for (let k = 0; k < decisions.length; k++) {
        const sim = dot3(d, decisions[k].direction);

        if (sim > bestSim) {
          bestSim = sim;
          best = k;
        }
      }

      if (best < 0 || bestSim < cosThreshold) {
        unknown++;
        continue;
      }

      const dec = decisions[best];

      if (dec.denom < 1e-9) {
        unknown++;
        continue;
      }

      const a = clamp(
        (dx * dec.vec[0] + dy * dec.vec[1] + dz * dec.vec[2]) /
          dec.denom,
        0,
        1
      );

      const rx = dx - a * dec.vec[0];
      const ry = dy - a * dec.vec[1];
      const rz = dz - a * dec.vec[2];

      if (norm3(rx, ry, rz) > residualThreshold) {
        unknown++;
        continue;
      }

      alphaMap[p] = a;
      labels[p] = dec.label;
      classified++;
      matchedByPalette[best]++;

      if (dec.target) {
        out[i] = clamp(
          Math.round(bg[0] + a * (dec.target[0] - bg[0])),
          0,
          255
        );

        out[i + 1] = clamp(
          Math.round(bg[1] + a * (dec.target[1] - bg[1])),
          0,
          255
        );

        out[i + 2] = clamp(
          Math.round(bg[2] + a * (dec.target[2] - bg[2])),
          0,
          255
        );

        replaced++;
      }

      out[i + 3] = 255;
    }

    state.labels = labels;
    state.alpha = alphaMap;
    state.outputData = out;
    state.decisions = decisions;

    state.stats = {
      classified,
      unknown,
      bgCount,
      replaced,
      total
    };

    /*
     * 每次生成预览后更新匹配像素数量。
     * 这里统计的是校正原色后，实际被该颜色模型接受的像素。
     */
    state.palette.forEach((item, index) => {
      item.matchedPixels = matchedByPalette[index];

      const countEl = $('paletteGrid').querySelector(
        `[data-palette-count="${index}"]`
      );

      if (countEl) {
        countEl.textContent =
          `本次匹配：${matchedByPalette[index].toLocaleString()} 个像素` +
          ` · 初始检测估计：${item.samples.toLocaleString()}`;
      }
    });

    drawOutputView('result');

    $('resultPanel').classList.remove('hidden');

    $('resultStats').innerHTML = `
      <span>像素总数：<strong>${total.toLocaleString()}</strong></span>
      <span>背景：<strong>${(bgCount / total * 100).toFixed(2)}%</strong></span>
      <span>已分类前景：<strong>${(classified / total * 100).toFixed(2)}%</strong></span>
      <span>已替换像素：<strong>${replaced.toLocaleString()}</strong></span>
      <span>未能可靠分类：<strong>${unknown.toLocaleString()}</strong></span>
    `;

    const resultNote = $('resultNote');

    if (unknown / total > 0.005) {
      showMessage(
        resultNote,
        `有 ${(unknown / total * 100).toFixed(2)}% 的像素未能可靠匹配到候选颜色，已在“像素分类”视图中用洋红色标出，原图像素会保留不动。可以尝试手动添加遗漏颜色、校正原色。`,
        'warning'
      );
    } else {
      showMessage(
        resultNote,
        '替换图像请及时保存至本地，本网站不保存任何数据'
      );
    }

    $('copyBtn').disabled = false;
  }

  function drawCanvasData(canvas, data, w, h) {
    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    const image = ctx.createImageData(w, h);

    image.data.set(data);
    ctx.putImageData(image, 0, 0);
  }

  function drawOutputView(view) {
    if (!state.outputData || !state.labels || !state.alpha) return;

    state.currentView = view;

    document.querySelectorAll('.view-tab').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.view === view);
    });

    const total = state.width * state.height;
    let pixels;

    if (view === 'result') {
      pixels = state.outputData;
    } else {
      pixels = new Uint8ClampedArray(total * 4);

      for (let p = 0; p < total; p++) {
        const i = p * 4;
        const lab = state.labels[p];
        let rgb;

        if (view === 'labels') {
          if (lab === 0) {
            rgb = state.background;
          } else if (lab === -1) {
            rgb = [255, 0, 200];
          } else {
            const itemIndex = lab - 2;
            const d = state.decisions[itemIndex];
            rgb = d ? (d.target || d.source) : [90, 90, 90];
          }
        } else {
          if (lab === -1) {
            rgb = [255, 0, 200];
          } else {
            const gray = lab === 0
              ? 0
              : Math.round(clamp(state.alpha[p], 0, 1) * 255);
            rgb = [gray, gray, gray];
          }
        }

        pixels[i] = rgb[0];
        pixels[i + 1] = rgb[1];
        pixels[i + 2] = rgb[2];
        pixels[i + 3] = 255;
      }
    }

    drawCanvasData($('outputCanvas'), pixels, state.width, state.height);

    $('outputTitle').textContent =
      view === 'result'
        ? '替换结果'
        : view === 'labels'
          ? '像素类别图（洋红色 = 未分类）'
          : '混合比例图（白色 = 1，黑色 = 0）';
  }

  async function detectFromCurrentImage() {
    if (!state.imageData) return;

    $('detectBtn').disabled = true;
    $('processBtn').disabled = true;
    setStatus('正在识别颜色候选');

    await new Promise(resolve => setTimeout(resolve, 30));

    try {
      const coreMinDist = Math.max(
        1,
        Number($('coreMinDist').value) || 16
      );

      const detected = detectPalette(
        state.imageData.data,
        state.width,
        state.height,
        state.background,
        coreMinDist
      );

      if (!detected.length) {
        state.palette = [];
        $('paletteGrid').replaceChildren();
        $('palettePanel').classList.remove('hidden');
        $('paletteCount').textContent = '未检测到候选颜色';

        setStatus(
          '没有找到可靠的颜色候选，可以降低颜色检测距离阈值、检查背景色，或手动添加颜色',
          'error'
        );

        $('processBtn').disabled = true;
        state.backgroundNeedsDetection = false;
        return;
      }

      state.palette = detected.map(item => ({
        ...item,
        sourceHex: item.estimatedSourceHex,
        targetHex: '',
        manual: false
      }));

      renderPalette();

      state.backgroundNeedsDetection = false;
      $('processBtn').disabled = false;

      $('bgNote').textContent =
        '已确认背景色，若手动修改背景色，修改后请点击“重新检测颜色”';

      setStatus(
        `检测完成：找到 ${detected.length} 种候选颜色，目标色留空的项目会保持不变`,
        'good'
      );
    } catch (err) {
      console.error(err);
      setStatus('颜色检测失败：' + (err?.message || String(err)), 'error');
    } finally {
      $('detectBtn').disabled = false;
    }
  }

  function setBackground(hex) {
    const rgb = hexToRgb(hex);
    if (!rgb) return false;

    state.background = rgb;

    $('bgColor').value = rgbToHex(rgb);
    $('bgHex').value = rgbToHex(rgb);
    $('bgHex').classList.remove('invalid');

    state.backgroundNeedsDetection = true;
    $('processBtn').disabled = true;

    showMessage(
      $('bgNote'),
      '背景色已修改，请先点击“重新检测颜色”，然后再生成替换预览',
      'warning'
    );

    return true;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[c]));
  }

  async function loadFile(file) {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showMessage($('loadMessage'), '请选择图像文件', 'error');
      return;
    }

    showMessage($('loadMessage'), '正在读取图像');

    try {
      let bitmap;

      if ('createImageBitmap' in window) {
        bitmap = await createImageBitmap(file);
      } else {
        bitmap = await new Promise((resolve, reject) => {
          const img = new Image();
          const url = URL.createObjectURL(file);

          img.onload = () => {
            URL.revokeObjectURL(url);
            resolve(img);
          };

          img.onerror = () => {
            URL.revokeObjectURL(url);
            reject(new Error('无法解码该图像'));
          };

          img.src = url;
        });
      }

      const w = bitmap.width;
      const h = bitmap.height;

      if (w * h > MAX_PIXELS) {
        if (bitmap.close) bitmap.close();

        showMessage(
          $('loadMessage'),
          `图像为 ${w.toLocaleString()} × ${h.toLocaleString()}，超过当前原型的 ${MAX_PIXELS.toLocaleString()} 像素处理上限，请先缩小图片后重试`,
          'error'
        );

        return;
      }

      state.width = w;
      state.height = h;

      const canvas = $('originalCanvas');
      canvas.width = w;
      canvas.height = h;

      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(bitmap, 0, 0, w, h);

      if (bitmap.close) bitmap.close();

      state.imageData = ctx.getImageData(0, 0, w, h);
      state.palette = [];
      state.labels = null;
      state.alpha = null;
      state.outputData = null;
      state.decisions = [];

      $('imageMeta').innerHTML =
        `<span><strong>文件：</strong>${escapeHtml(file.name)}</span>` +
        `<span><strong>尺寸：</strong>${w.toLocaleString()} × ${h.toLocaleString()}</span>` +
        `<span><strong>大小：</strong>${(file.size / 1024).toFixed(1)} KB</span>`;

      $('imageMeta').classList.remove('hidden');
      hide($('loadMessage'));

      $('settingsPanel').classList.remove('hidden');
      $('palettePanel').classList.add('hidden');
      $('resultPanel').classList.add('hidden');

      state.background = estimateBackground(
        state.imageData.data,
        w,
        h
      );

      $('bgColor').value = rgbToHex(state.background);
      $('bgHex').value = rgbToHex(state.background);

      state.backgroundNeedsDetection = false;
      $('originalSize').textContent = `${w} × ${h}`;

      await detectFromCurrentImage();
    } catch (err) {
      console.error(err);
      showMessage(
        $('loadMessage'),
        '读取失败：' + (err?.message || String(err)),
        'error'
      );
    }
  }

  $('fileInput').addEventListener('change', e => {
    const file = e.target.files && e.target.files[0];
    if (file) loadFile(file);
    e.target.value = '';
  });

  $('detectBtn').addEventListener('click', detectFromCurrentImage);

  $('addColorBtn').addEventListener('click', addManualColor);

  $('processBtn').addEventListener('click', () => {
    if (state.backgroundNeedsDetection) {
      setStatus('背景色发生变化，请先重新检测颜色', 'error');
      return;
    }

    if (!state.palette.length) {
      setStatus('请先检测颜色候选，或手动添加颜色', 'error');
      return;
    }

    const targetFields = document.querySelectorAll('[data-target-hex]');

    for (let i = 0; i < targetFields.length; i++) {
      const raw = targetFields[i].value.trim();

      if (!raw) {
        state.palette[i].targetHex = '';
        targetFields[i].classList.remove('invalid');
        continue;
      }

      const normalized = normalizeHex(raw);

      if (!normalized) {
        setStatus(
          `候选颜色 ${i + 1} 的替换颜色格式无效，请输入 6 位 HEX，或留空`,
          'error'
        );

        targetFields[i].classList.add('invalid');
        targetFields[i].focus();
        return;
      }

      state.palette[i].targetHex = normalized;
      targetFields[i].classList.remove('invalid');
    }

    const sourceFields = document.querySelectorAll('[data-source-hex]');

    for (let i = 0; i < sourceFields.length; i++) {
      const normalized = normalizeHex(sourceFields[i].value);

      if (!normalized) {
        setStatus(
          `候选颜色 ${i + 1} 的原色格式无效`,
          'error'
        );

        sourceFields[i].classList.add('invalid');
        sourceFields[i].focus();
        return;
      }

      state.palette[i].sourceHex = normalized;
      sourceFields[i].classList.remove('invalid');
    }

    $('processBtn').disabled = true;
    setStatus('正在逐像素分类并替换颜色');

    setTimeout(() => {
      try {
        runClassification();
        setStatus(
          '完成！已更新各颜色的实际匹配像素数；目标色留空的颜色保持不变',
          'good'
        );
      } catch (err) {
        console.error(err);
        setStatus(err?.message || String(err), 'error');
      } finally {
        $('processBtn').disabled = false;
      }
    }, 30);
  });

  $('bgColor').addEventListener('input', () => {
    setBackground($('bgColor').value);
  });

  $('bgHex').addEventListener('change', () => {
    const normalized = normalizeHex($('bgHex').value);

    if (!normalized) {
      $('bgHex').classList.add('invalid');
      return;
    }

    setBackground(normalized);
  });

  document.querySelectorAll('.view-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      drawOutputView(btn.dataset.view);
    });
  });

  $('copyBtn').addEventListener('click', async () => {
    try {
      if (!navigator.clipboard || !window.ClipboardItem) {
        throw new Error(
          '当前浏览器不支持复制图片，或页面不是 HTTPS 环境'
        );
      }

      const copyCanvas = document.createElement('canvas');

      drawCanvasData(
        copyCanvas,
        state.outputData,
        state.width,
        state.height
      );

      const blob = await new Promise(resolve => {
        copyCanvas.toBlob(resolve, 'image/png');
      });

      if (!blob) throw new Error('无法生成 PNG 图像');

      await navigator.clipboard.write([
        new ClipboardItem({ 'image/png': blob })
      ]);

      showMessage(
        $('resultNote'),
        '结果图片已复制到剪贴板，可以直接粘贴到支持图片的应用中'
      );

      copyCanvas.width = 0;
      copyCanvas.height = 0;
    } catch (err) {
      showMessage(
        $('resultNote'),
        (err?.message || '复制失败，') + ' 你仍可以查看页面中的结果',
        'warning'
      );
    }
  });

  const drop = $('dropZone');

  for (const type of ['dragenter', 'dragover']) {
    drop.addEventListener(type, e => {
      e.preventDefault();
      drop.classList.add('drag');
    });
  }

  for (const type of ['dragleave', 'drop']) {
    drop.addEventListener(type, e => {
      e.preventDefault();
      drop.classList.remove('drag');
    });
  }

  drop.addEventListener('drop', e => {
    const file = e.dataTransfer?.files?.[0];
    if (file) loadFile(file);
  });
})();
</script>
</body>
</html>