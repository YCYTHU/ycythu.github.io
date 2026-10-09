---
layout: none
title: 倒立双摆
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/wavefunction.jpg
favorite: true
---
<!--more-->

<html lang="zh-CN">
<head>
{%- include analytics.html -%}
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#0b1520">
<meta name="description" content="小车可以左右移动，目标是通过对小车施加连续的力，使第二根杆在第一根杆之上保持平衡，而第一根杆又在小车之上保持平衡">
<title>倒立双摆 · Inverted Double Pendulum</title>
<style>
  :root {
    color-scheme: dark;
    --bg: #0b1520;
    --text: #e9f0f6;
    --muted: #8293a3;
    --faint: #526273;
    --line: rgba(211, 225, 238, .19);
    --cyan: #49c8e9;
  }
  * { box-sizing: border-box; }
  html, body { margin: 0; width: 100%; height: 100%; overflow: hidden; }
  body {
    background:
      radial-gradient(ellipse at 50% 66%, rgba(34, 62, 80, .20) 0%, rgba(16, 30, 43, .08) 34%, transparent 63%),
      linear-gradient(145deg, #0d1823 0%, #0b1520 52%, #0a141e 100%);
    color: var(--text);
    font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif;
    -webkit-font-smoothing: antialiased;
    user-select: none;
  }
  .game { position: relative; width: 100%; height: 100vh; height: 100svh; min-height: 480px; overflow: hidden; }
  .scene { position: absolute; inset: 0; }
  #scene { display: block; width: 100%; height: 100%; touch-action: none; }
  .topbar {
    position: absolute; z-index: 2; left: clamp(20px, 3.4vw, 46px); right: clamp(20px, 3.4vw, 46px);
    top: clamp(20px, 3.8vh, 34px); display: flex; align-items: flex-start; justify-content: space-between; gap: 24px;
    pointer-events: none;
  }
  .identity { display: flex; align-items: center; gap: 12px; }
  .mark { position: relative; width: 30px; height: 30px; margin-top: 1px; flex: 0 0 auto; border: 1px solid rgba(104, 211, 237, .45); border-radius: 9px; }
  .mark::before, .mark::after { content: ""; position: absolute; background: var(--cyan); opacity: .88; }
  .mark::before { width: 1px; height: 18px; left: 14px; top: 5px; }
  .mark::after { width: 18px; height: 1px; left: 5px; top: 14px; }
  .mark i { position: absolute; left: 10px; top: 10px; width: 9px; height: 9px; border: 1px solid #a9f0ff; border-radius: 50%; background: #102534; box-shadow: 0 0 12px rgba(73, 200, 233, .32); }
  .eyebrow { color: #7890a2; font-size: 9px; letter-spacing: .19em; line-height: 1.4; text-transform: uppercase; }
  h1 { margin: 4px 0 0; font-size: clamp(17px, 1.7vw, 21px); line-height: 1.25; font-weight: 550; letter-spacing: .035em; }
  .subtitle { margin-top: 5px; color: #7a8b9b; font-size: 11px; letter-spacing: .025em; }
  .hud { min-width: 180px; text-align: right; }
  .hud-top { display: flex; align-items: center; justify-content: flex-end; gap: 9px; color: #8fa1b0; font-size: 10px; letter-spacing: .09em; }
  .status { display: inline-flex; align-items: center; gap: 6px; }
  .status-dot { width: 5px; height: 5px; border-radius: 50%; background: #62cbe7; box-shadow: 0 0 9px rgba(73, 200, 233, .65); }
  .status.failed .status-dot { background: #e5a6a0; box-shadow: 0 0 8px rgba(229, 166, 160, .45); }
  .status.won .status-dot { background: #a2e9c6; box-shadow: 0 0 8px rgba(162, 233, 198, .45); }
  .timer { margin-top: 5px; font-size: 29px; font-weight: 350; letter-spacing: .045em; line-height: 1.1; font-variant-numeric: tabular-nums; }
  .timer-unit { margin-left: 5px; color: #75899a; font-size: 11px; letter-spacing: .04em; }
  .progress { margin: 11px 0 0 auto; width: min(210px, 24vw); height: 2px; background: rgba(205, 223, 236, .12); overflow: hidden; }
  .progress-fill { height: 100%; width: 0; background: linear-gradient(90deg, #318ca9, #64d6ed); box-shadow: 0 0 8px rgba(73, 200, 233, .38); transition: width .08s linear; }
  .goal-label { margin-top: 7px; color: #637688; font-size: 10px; letter-spacing: .04em; }
  .bottom-bar {
    position: absolute; z-index: 2; left: clamp(20px, 3.4vw, 46px); right: clamp(20px, 3.4vw, 46px);
    bottom: clamp(20px, 3.4vh, 34px); display: flex; align-items: flex-end; justify-content: space-between; gap: 18px;
    pointer-events: none;
  }
  .instruction { display: flex; align-items: flex-start; gap: 12px; max-width: 430px; }
  .instruction-glyph { width: 27px; height: 27px; border: 1px solid rgba(82, 200, 229, .23); border-radius: 50%; display: grid; place-items: center; color: var(--cyan); flex: 0 0 auto; margin-top: 1px; }
  .instruction-glyph svg { width: 14px; height: 14px; }
  .instruction-title { color: #dce6ee; font-size: 12px; line-height: 1.5; letter-spacing: .015em; }
  .instruction-desc { margin-top: 3px; color: #708294; font-size: 11px; line-height: 1.55; }
  .actions { display: flex; align-items: center; gap: 12px; pointer-events: auto; }
  .key-hint { color: #617487; font-size: 10px; white-space: nowrap; }
  .reset {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px; min-height: 37px; padding: 0 13px;
    color: #a8bac8; font: inherit; font-size: 11px; letter-spacing: .035em; background: rgba(18, 32, 45, .72);
    border: 1px solid rgba(178, 201, 219, .19); border-radius: 7px; cursor: pointer; transition: color .18s, border-color .18s, background .18s;
  }
  .reset:hover { color: #eaf6fb; border-color: rgba(89, 205, 234, .48); background: rgba(26, 48, 64, .88); }
  .reset:focus-visible { outline: 2px solid var(--cyan); outline-offset: 3px; }
  .reset svg { width: 13px; height: 13px; }
  .mode-controls {
    position: absolute; z-index: 3; top: clamp(100px, 15vh, 116px); left: clamp(20px, 3.4vw, 46px);
    display: flex; align-items: flex-start; gap: 12px; pointer-events: auto;
  }
  .control-group { display: flex; flex-direction: column; gap: 5px; }
  .control-label { padding-left: 2px; color: #718698; font-size: 9px; letter-spacing: .13em; line-height: 1.2; text-transform: uppercase; }
  .segmented {
    display: flex; align-items: stretch; gap: 2px; padding: 3px;
    border: 1px solid rgba(178, 201, 219, .17); border-radius: 8px;
    background: rgba(11, 24, 35, .78); box-shadow: 0 5px 18px rgba(0, 0, 0, .08);
    backdrop-filter: blur(9px); -webkit-backdrop-filter: blur(9px);
  }
  .choice {
    display: inline-flex; min-width: 48px; min-height: 31px; padding: 0 10px;
    flex-direction: column; align-items: center; justify-content: center; gap: 1px;
    border: 1px solid transparent; border-radius: 5px; background: transparent;
    color: #8093a3; font: inherit; font-size: 10px; line-height: 1.15; white-space: nowrap;
    cursor: pointer; transition: color .16s, background .16s, border-color .16s, box-shadow .16s;
  }
  .choice:hover { color: #dbeaf2; background: rgba(119, 162, 184, .08); }
  .choice[aria-pressed="true"] {
    color: #ddf8ff; border-color: rgba(73, 200, 233, .36); background: rgba(45, 137, 163, .17);
    box-shadow: inset 0 0 12px rgba(73, 200, 233, .035);
  }
  .choice:focus-visible { outline: 2px solid var(--cyan); outline-offset: 2px; }
  .choice small { color: #607f91; font-size: 8px; letter-spacing: .025em; }
  .choice[aria-pressed="true"] small { color: #78cfe2; }
  .gravity-segmented .choice { min-width: 47px; padding: 3px 5px; }
  .zen-readout { padding-top: 2px; }
  .zen-readout[hidden], .hud-challenge[hidden] { display: none; }
  .zen-title { color: #a6dbe8; font-size: 10px; letter-spacing: .13em; }
  .zen-copy { margin-top: 7px; color: #758b9c; font-size: 10px; letter-spacing: .03em; }
  .result-wrap { position: absolute; z-index: 4; inset: 0; display: grid; place-items: center; pointer-events: none; }
  .result-card {
    width: min(315px, calc(100vw - 42px)); padding: 22px 24px 20px; text-align: center;
    background: rgba(10, 22, 33, .88); border: 1px solid rgba(175, 204, 223, .2); border-radius: 12px;
    box-shadow: 0 14px 60px rgba(0, 0, 0, .22); backdrop-filter: blur(12px); pointer-events: auto;
    transform: translateY(20px); animation: rise .25s ease-out both;
  }
  .result-card[hidden] { display: none; }
  @keyframes rise { from { opacity: 0; transform: translateY(27px); } to { opacity: 1; transform: translateY(20px); } }
  .result-kicker { color: #79a1b6; font-size: 9px; letter-spacing: .2em; text-transform: uppercase; }
  .result-title { margin-top: 9px; color: #e6f0f6; font-size: 19px; font-weight: 520; }
  .result-copy { margin: 8px 0 16px; color: #879aaa; font-size: 11px; line-height: 1.8; }
  .result-card .reset { width: 100%; color: #d9f6fc; border-color: rgba(82, 200, 229, .42); background: rgba(36, 112, 136, .16); }
  .tiny-note { position: absolute; z-index: 1; bottom: 83px; left: 50%; transform: translateX(-50%); color: rgba(117, 141, 158, .36); font-size: 9px; letter-spacing: .17em; white-space: nowrap; pointer-events: none; }
  @media (max-width: 760px) {
    .mode-controls { top: 122px; left: 50%; transform: translateX(-50%); gap: 8px; }
    .control-label { font-size: 8px; }
    .choice { min-width: 45px; min-height: 30px; padding: 0 8px; font-size: 10px; }
    .gravity-segmented .choice { min-width: 43px; padding: 3px 4px; }
  }
  @media (max-width: 620px) {
    .topbar { left: 19px; right: 19px; top: 19px; gap: 10px; }
    .identity { gap: 9px; }
    .mark { width: 26px; height: 26px; border-radius: 8px; }
    .mark::before { left: 12px; top: 4px; height: 16px; }
    .mark::after { left: 4px; top: 12px; width: 16px; }
    .mark i { left: 8px; top: 8px; }
    .eyebrow { font-size: 8px; }
    h1 { font-size: 17px; }
    .subtitle { font-size: 10px; max-width: 190px; }
    .hud { min-width: 112px; }
    .hud-top { font-size: 9px; gap: 5px; }
    .timer { font-size: 24px; }
    .timer-unit { font-size: 10px; }
    .progress { width: 112px; margin-top: 8px; }
    .goal-label { font-size: 9px; }
    .bottom-bar { left: 19px; right: 19px; bottom: max(17px, env(safe-area-inset-bottom)); align-items: flex-end; gap: 8px; }
    .instruction { gap: 8px; max-width: 68%; }
    .instruction-glyph { width: 25px; height: 25px; }
    .instruction-title { font-size: 11px; }
    .instruction-desc { font-size: 10px; max-width: 205px; }
    .actions { gap: 0; }
    .key-hint { display: none; }
    .reset { min-height: 35px; padding: 0 10px; font-size: 10px; gap: 6px; }
    .tiny-note { bottom: 78px; font-size: 8px; }
  }
  @media (max-height: 560px) {
    .topbar { top: 14px; }
    .bottom-bar { bottom: 14px; }
    .mode-controls { top: 98px; left: clamp(18px, 3vw, 25px); transform: none; gap: 6px; }
    .choice { min-width: 42px; min-height: 27px; padding: 0 5px; font-size: 9px; }
    .gravity-segmented .choice { min-width: 37px; padding: 2px 3px; }
    .subtitle { display: none; }
    .timer { font-size: 23px; }
    .tiny-note { display: none; }
  }
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
</style>
</head>
<body>
<main class="game" id="game">
  <div class="scene"><canvas id="scene" aria-label="可拖动底部滑块来控制双摆，目标是让两根连杆保持竖直向上。"></canvas></div>

  <header class="topbar">
    <div class="identity">
      <div class="mark" aria-hidden="true"><i></i></div>
      <div>
        <div class="eyebrow">MECHANICS&nbsp; / &nbsp;YCY</div>
        <h1>双摆平衡</h1>
        <div class="subtitle">INVERTED DOUBLE PENDULUM</div>
      </div>
    </div>
    <div class="hud" aria-live="polite">
      <div class="hud-challenge" id="challengeHud">
        <div class="hud-top">
          <span class="status" id="status"><i class="status-dot"></i><span id="statusText">平衡中</span></span>
          <span aria-hidden="true">/</span><span>目标 12 秒</span>
        </div>
        <div class="timer"><span id="timer">00:00.0</span><span class="timer-unit">稳定</span></div>
        <div class="progress"><div class="progress-fill" id="progressFill"></div></div>
        <div class="goal-label">累计有效平衡时间</div>
      </div>
      <div class="zen-readout" id="zenReadout" hidden>
        <div class="zen-title">ZEN MODE / 禅模式</div>
        <div class="zen-copy">自由探索 · 无计时 · 无胜负判定</div>
      </div>
    </div>
  </header>

  <nav class="mode-controls" aria-label="游戏模式与难度">
    <div class="control-group">
      <span class="control-label">模式 / MODE</span>
      <div class="segmented" role="group" aria-label="选择游戏模式">
        <button class="choice" id="zenModeBtn" type="button" data-mode="zen" aria-pressed="false">禅模式</button>
        <button class="choice" id="challengeModeBtn" type="button" data-mode="challenge" aria-pressed="true">挑战</button>
      </div>
    </div>
    <div class="control-group">
      <span class="control-label">重力 / g</span>
      <div class="segmented gravity-segmented" role="group" aria-label="选择重力难度">
        <button class="choice" type="button" data-gravity="0.1" aria-pressed="false" aria-label="简单难度，重力加速度 0.1"><span>简单</span><small>0.1</small></button>
        <button class="choice" type="button" data-gravity="0.4" aria-pressed="true" aria-label="普通难度，重力加速度 0.4"><span>普通</span><small>0.4</small></button>
        <button class="choice" type="button" data-gravity="1.5" aria-pressed="false" aria-label="困难难度，重力加速度 1.5"><span>困难</span><small>1.5</small></button>
        <button class="choice" type="button" data-gravity="9.81" aria-pressed="false" aria-label="现实难度，重力加速度 9.81"><span>现实</span><small>9.81</small></button>
      </div>
    </div>
  </nav>

  <div class="tiny-note">KEEP BOTH LINKS UPRIGHT</div>

  <footer class="bottom-bar">
    <div class="instruction">
      <div class="instruction-glyph" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M8 12V6.5a1.7 1.7 0 0 1 3.4 0V11 5.3a1.7 1.7 0 0 1 3.4 0V11 7.1a1.7 1.7 0 0 1 3.4 0v7.2c0 4-2.2 6.2-6.1 6.2h-1.5c-1.8 0-3.1-.8-4.1-2.1L3.6 14a1.8 1.8 0 0 1 2.9-2.1L8 13.5"/></svg>
      </div>
      <div>
        <div class="instruction-title">按住滑块，左右拖动</div>
        <div class="instruction-desc">根据摆动方向提前修正底座，小幅、及时的移动更容易保持平衡。</div>
      </div>
    </div>
    <div class="actions">
      <span class="key-hint">拖动底部矩形开始控制</span>
      <button class="reset" id="resetBtn" type="button">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3.5 11a8.5 8.5 0 1 1 2.2 6.2"/><path d="M3.5 4.8V11h6.2"/></svg>
        重新开始
      </button>
    </div>
  </footer>

  <div class="result-wrap">
    <section class="result-card" id="resultCard" hidden aria-live="polite">
      <div class="result-kicker" id="resultKicker">CONTROL LOST</div>
      <div class="result-title" id="resultTitle">双摆失衡了</div>
      <p class="result-copy" id="resultCopy">试着更早地移动滑块，及时抵消摆杆的倾斜。</p>
      <button class="reset" id="againBtn" type="button">再试一次 ↗</button>
    </section>
  </div>
</main>
<script>
(() => {
  'use strict';
  const canvas = document.getElementById('scene');
  const ctx = canvas.getContext('2d');
  const timerEl = document.getElementById('timer');
  const progressEl = document.getElementById('progressFill');
  const statusEl = document.getElementById('status');
  const statusTextEl = document.getElementById('statusText');
  const resultCard = document.getElementById('resultCard');
  const resultKicker = document.getElementById('resultKicker');
  const resultTitle = document.getElementById('resultTitle');
  const resultCopy = document.getElementById('resultCopy');
  const resetBtn = document.getElementById('resetBtn');
  const againBtn = document.getElementById('againBtn');
  const challengeHud = document.getElementById('challengeHud');
  const zenReadout = document.getElementById('zenReadout');
  const zenModeBtn = document.getElementById('zenModeBtn');
  const challengeModeBtn = document.getElementById('challengeModeBtn');
  const modeButtons = Array.from(document.querySelectorAll('[data-mode]'));
  const gravityButtons = Array.from(document.querySelectorAll('[data-gravity]'));

  const GOAL_TIME = 12;
  let mode = 'challenge';
  let gravity = 0.4;
  const cartMass = 1.45;
  const m1 = 0.42;
  const m2 = 0.29;
  const l1 = 1;
  const l2 = 1;
  const angularDamping = 0.035;
  const cartDamping = 2.8;
  const controllerKp = 92;
  const controllerKd = 15;
  const maxForce = 44;
  const fixedDt = 1 / 240;

  let W = 0, H = 0, DPR = 1;
  let scale = 130, linkPx = 130, cartY = 0, railY = 0, railHalf = 0, maxX = 1.5, cartW = 82;
  let state;
  let phase = 'playing';
  let stableTime = 0;
  let accumulator = 0;
  let lastFrame = 0;
  let isDragging = false;
  let pointerId = null;
  let dragOffsetX = 0;
  let targetX = 0;
  let hasInteracted = false;
  let cursorX = -1000, cursorY = -1000;

  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const wrapAngle = a => Math.atan2(Math.sin(a), Math.cos(a));
  const radians = deg => deg * Math.PI / 180;

  function formatTime(t) {
    const tenths = Math.floor(Math.max(0, t) * 10 + 1e-6);
    const totalSeconds = Math.floor(tenths / 10);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${tenths % 10}`;
  }

  function getCartScreenX() { return W * 0.5 + state[0] * scale; }
  function scenePoint(e) {
    const r = canvas.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function resize() {
    const rect = canvas.getBoundingClientRect();
    W = rect.width || window.innerWidth;
    H = rect.height || window.innerHeight;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    scale = clamp(Math.min(H * 0.22, W * 0.18, 150), 61, 150);
    linkPx = scale;
    cartY = H * 0.675;
    railY = cartY + clamp(H * 0.035, 18, 23);
    railHalf = Math.min(W * 0.315, W / 2 - 18);
    cartW = clamp(scale * 0.57, 51, 86);
    maxX = Math.max(0.3, (railHalf - cartW * 0.5 - 7) / scale);
    if (state) {
      state[0] = clamp(state[0], -maxX, maxX);
      targetX = clamp(targetX, -maxX, maxX);
    }
  }

  // Solve a 3 x 3 linear system with pivoting: M(q) q_ddot = forces.
  function solve3(A, b) {
    const a = A.map((row, i) => [row[0], row[1], row[2], b[i]]);
    for (let col = 0; col < 3; col++) {
      let pivot = col;
      for (let row = col + 1; row < 3; row++) {
        if (Math.abs(a[row][col]) > Math.abs(a[pivot][col])) pivot = row;
      }
      if (pivot !== col) [a[pivot], a[col]] = [a[col], a[pivot]];
      const divisor = a[col][col];
      if (Math.abs(divisor) < 1e-10) return [0, 0, 0];
      for (let j = col; j < 4; j++) a[col][j] /= divisor;
      for (let row = 0; row < 3; row++) {
        if (row === col) continue;
        const f = a[row][col];
        for (let j = col; j < 4; j++) a[row][j] -= f * a[col][j];
      }
    }
    return [a[0][3], a[1][3], a[2][3]];
  }

  // q = [cart position, absolute link angles from upright, their velocities].
  // The mass matrix and nonlinear terms come from the cart + two point-mass Lagrangian.
  function derivative(s) {
    const x = s[0], t1 = s[1], t2 = s[2];
    const vx = s[3], w1 = s[4], w2 = s[5];
    const c1 = Math.cos(t1), c2 = Math.cos(t2);
    const delta = t1 - t2;
    const cd = Math.cos(delta), sd = Math.sin(delta);
    const totalPendulumMass = m1 + m2;
    const M00 = cartMass + totalPendulumMass;
    const M01 = totalPendulumMass * l1 * c1;
    const M02 = m2 * l2 * c2;
    const M11 = totalPendulumMass * l1 * l1;
    const M12 = m2 * l1 * l2 * cd;
    const M22 = m2 * l2 * l2;
    const massMatrix = [
      [M00, M01, M02],
      [M01, M11, M12],
      [M02, M12, M22]
    ];

    let force = isDragging ? (targetX - x) * controllerKp - vx * controllerKd : -vx * cartDamping;
    force = clamp(force, -maxForce, maxForce);
    const h0 = -totalPendulumMass * l1 * Math.sin(t1) * w1 * w1 - m2 * l2 * Math.sin(t2) * w2 * w2;
    const h1 = m2 * l1 * l2 * sd * w2 * w2 - totalPendulumMass * gravity * l1 * Math.sin(t1);
    const h2 = -m2 * l1 * l2 * sd * w1 * w1 - m2 * gravity * l2 * Math.sin(t2);
    const rhs = [force - h0, -angularDamping * w1 - h1, -angularDamping * w2 - h2];
    const acc = solve3(massMatrix, rhs);
    return [vx, w1, w2, acc[0], acc[1], acc[2]];
  }

  function plusScaled(a, b, s) { return a.map((v, i) => v + b[i] * s); }
  function physicsStep(dt) {
    const k1 = derivative(state);
    const k2 = derivative(plusScaled(state, k1, dt * 0.5));
    const k3 = derivative(plusScaled(state, k2, dt * 0.5));
    const k4 = derivative(plusScaled(state, k3, dt));
    state = state.map((v, i) => v + dt / 6 * (k1[i] + 2 * k2[i] + 2 * k3[i] + k4[i]));

    if (state[0] < -maxX) { state[0] = -maxX; state[3] = Math.max(0, state[3]) * 0.18; }
    if (state[0] > maxX) { state[0] = maxX; state[3] = Math.min(0, state[3]) * 0.18; }

    // Zen mode keeps the same physics, but deliberately skips all challenge scoring.
    if (mode === 'challenge') {
      const a1 = Math.abs(wrapAngle(state[1]));
      const a2 = Math.abs(wrapAngle(state[2]));
      const upright = radians(19);
      if (a1 < upright && a2 < upright && Math.abs(state[4]) < 1.85 && Math.abs(state[5]) < 1.85) {
        stableTime += dt;
      }
      if (a1 > radians(84) || a2 > radians(84)) {
        finish('failed');
        return;
      }
      if (stableTime >= GOAL_TIME) {
        stableTime = GOAL_TIME;
        finish('won');
      }
    }
  }

  function roundedRect(c, x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    c.beginPath();
    c.moveTo(x + rr, y);
    c.lineTo(x + w - rr, y);
    c.quadraticCurveTo(x + w, y, x + w, y + rr);
    c.lineTo(x + w, y + h - rr);
    c.quadraticCurveTo(x + w, y + h, x + w - rr, y + h);
    c.lineTo(x + rr, y + h);
    c.quadraticCurveTo(x, y + h, x, y + h - rr);
    c.lineTo(x, y + rr);
    c.quadraticCurveTo(x, y, x + rr, y);
    c.closePath();
  }

  function drawJoint(x, y, radius, glow = true) {
    ctx.save();
    if (glow) { ctx.shadowColor = 'rgba(218, 241, 255, .58)'; ctx.shadowBlur = 7; }
    ctx.beginPath(); ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(220, 235, 246, .9)'; ctx.fill();
    ctx.shadowBlur = 0;
    ctx.beginPath(); ctx.arc(x, y, radius - 2.1, 0, Math.PI * 2);
    ctx.fillStyle = '#f6fbff'; ctx.fill();
    ctx.restore();
  }

  function drawHandHint(x, y, time) {
    if (hasInteracted || phase !== 'playing' || isDragging) return;
    const pulse = 0.58 + 0.18 * Math.sin(time * 0.0032);
    ctx.save();
    ctx.translate(x, y);
    ctx.globalAlpha = pulse;
    ctx.strokeStyle = '#46c7e8';
    ctx.lineWidth = 1.65;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(51, 202, 237, .7)';
    ctx.shadowBlur = 8;
    // Small motion rays hint that the carriage is draggable.
    ctx.beginPath(); ctx.moveTo(-11, -5); ctx.lineTo(-8, -2); ctx.moveTo(0, -10); ctx.lineTo(0, -5); ctx.moveTo(10, -5); ctx.lineTo(7, -2); ctx.stroke();
    ctx.beginPath(); ctx.arc(0, -1, 5, Math.PI * 1.06, Math.PI * 1.94); ctx.stroke();
    ctx.shadowBlur = 3;
    ctx.beginPath();
    ctx.moveTo(-6, 6);
    ctx.lineTo(-2, 12);
    ctx.quadraticCurveTo(0, 14, 2, 12);
    ctx.lineTo(2, 2);
    ctx.quadraticCurveTo(2, -2, 4, -2);
    ctx.quadraticCurveTo(7, -2, 7, 2);
    ctx.lineTo(7, 8);
    ctx.lineTo(7, 5);
    ctx.quadraticCurveTo(7, 2, 10, 2);
    ctx.quadraticCurveTo(13, 2, 13, 6);
    ctx.lineTo(13, 8);
    ctx.quadraticCurveTo(16, 6, 18, 9);
    ctx.lineTo(18, 15);
    ctx.quadraticCurveTo(18, 22, 11, 23);
    ctx.lineTo(5, 23);
    ctx.quadraticCurveTo(1, 23, -1, 19);
    ctx.lineTo(-7, 10);
    ctx.quadraticCurveTo(-9, 7, -6, 6);
    ctx.stroke();
    ctx.restore();
  }

  function draw(time) {
    ctx.clearRect(0, 0, W, H);
    const centerX = W * 0.5;
    const cartX = getCartScreenX();
    const y0 = cartY;
    const x1 = cartX + linkPx * Math.sin(state[1]);
    const y1 = y0 - linkPx * Math.cos(state[1]);
    const x2 = x1 + linkPx * Math.sin(state[2]);
    const y2 = y1 - linkPx * Math.cos(state[2]);

    // A restrained pool of cool light keeps the mechanism separate from the dark backdrop.
    const halo = ctx.createRadialGradient(centerX, y0 - linkPx * 0.78, 2, centerX, y0 - linkPx * 0.78, linkPx * 2.6);
    halo.addColorStop(0, 'rgba(64, 109, 132, .075)');
    halo.addColorStop(1, 'rgba(17, 34, 47, 0)');
    ctx.fillStyle = halo; ctx.fillRect(0, 0, W, H);

    // Rail and diagonal floor ticks, close to the supplied reference image.
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(203, 218, 230, .22)';
    ctx.beginPath(); ctx.moveTo(centerX - railHalf, railY); ctx.lineTo(centerX + railHalf, railY); ctx.stroke();
    ctx.strokeStyle = 'rgba(176, 196, 212, .20)';
    for (let x = centerX - railHalf + 6; x < centerX + railHalf - 5; x += 22) {
      ctx.beginPath(); ctx.moveTo(x, railY + 1); ctx.lineTo(x - 8, railY + 10); ctx.stroke();
    }
    ctx.strokeStyle = 'rgba(201, 218, 231, .25)';
    ctx.beginPath(); ctx.moveTo(centerX - railHalf, railY - 4); ctx.lineTo(centerX - railHalf, railY + 3); ctx.moveTo(centerX + railHalf, railY - 4); ctx.lineTo(centerX + railHalf, railY + 3); ctx.stroke();
    ctx.restore();

    // Rods: fine outlines, with a subtle cold glow.
    ctx.save();
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowColor = 'rgba(224, 240, 250, .34)'; ctx.shadowBlur = 5;
    ctx.strokeStyle = 'rgba(218, 231, 241, .78)'; ctx.lineWidth = 1.85;
    ctx.beginPath(); ctx.moveTo(cartX, y0); ctx.lineTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(247, 251, 255, .26)'; ctx.lineWidth = .65;
    ctx.beginPath(); ctx.moveTo(cartX - .4, y0); ctx.lineTo(x1 - .4, y1); ctx.lineTo(x2 - .4, y2); ctx.stroke();
    ctx.restore();

    // Carriage body sits over the rail; the lower pivot is centered on the block.
    ctx.save();
    const cartTop = y0 - 15;
    ctx.shadowColor = isDragging ? 'rgba(65, 201, 233, .18)' : 'rgba(190, 216, 234, .09)';
    ctx.shadowBlur = isDragging ? 14 : 7;
    roundedRect(ctx, cartX - cartW / 2, cartTop, cartW, 30, 1.5);
    ctx.fillStyle = isDragging ? 'rgba(84, 149, 173, .18)' : 'rgba(144, 164, 184, .12)';
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.strokeStyle = isDragging ? 'rgba(117, 218, 239, .75)' : 'rgba(202, 219, 233, .48)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.strokeStyle = 'rgba(195, 216, 231, .2)';
    ctx.beginPath(); ctx.moveTo(cartX - cartW * .32, cartTop + 5); ctx.lineTo(cartX + cartW * .32, cartTop + 5); ctx.stroke();
    ctx.fillStyle = isDragging ? 'rgba(91, 221, 244, .7)' : 'rgba(220, 235, 246, .42)';
    ctx.beginPath(); ctx.arc(cartX, cartTop + 5, 1.25, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Bright circular joints and end mass.
    drawJoint(cartX, y0, 6.1);
    drawJoint(x1, y1, 5.8);
    drawJoint(x2, y2, 6.5);

    // Tiny cyan hand cue, shown until the player first grabs the carriage.
    drawHandHint(cartX, railY + 31, time);

    // A minimal cursor halo makes it clear which object is being manipulated.
    if (isDragging) {
      ctx.save(); ctx.strokeStyle = 'rgba(74, 204, 234, .28)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cartX, y0, cartW * .63, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    }
  }

  function updateHud() {
    const zenMode = mode === 'zen';
    challengeHud.hidden = zenMode;
    zenReadout.hidden = !zenMode;
    if (zenMode) return;

    timerEl.textContent = formatTime(stableTime);
    progressEl.style.width = `${Math.min(100, stableTime / GOAL_TIME * 100)}%`;
    statusEl.className = 'status';
    if (phase === 'failed') {
      statusEl.classList.add('failed'); statusTextEl.textContent = '已失衡';
    } else if (phase === 'won') {
      statusEl.classList.add('won'); statusTextEl.textContent = '挑战成功';
    } else {
      statusTextEl.textContent = isDragging ? '控制中' : '平衡中';
    }
  }

  function finish(result) {
    // Defense in depth: no result can be produced while Zen mode is active.
    if (mode !== 'challenge' || phase !== 'playing') return;
    phase = result;
    isDragging = false;
    pointerId = null;
    canvas.style.cursor = 'default';
    resultCard.hidden = false;
    if (result === 'won') {
      resultKicker.textContent = 'BALANCE ACHIEVED';
      resultTitle.textContent = '控制成功';
      resultCopy.textContent = '你让双摆累计保持了 12 秒的有效平衡。还可以再挑战一次，试着让动作更平稳。';
      againBtn.textContent = '再挑战一次 ↗';
    } else {
      resultKicker.textContent = 'CONTROL LOST';
      resultTitle.textContent = '双摆失衡了';
      resultCopy.textContent = '试着更早地移动滑块，及时抵消摆杆的倾斜；小幅、连续的修正通常更有效。';
      againBtn.textContent = '再试一次 ↗';
    }
    updateHud();
  }

  function syncSettingsUI() {
    modeButtons.forEach(button => {
      button.setAttribute('aria-pressed', button.getAttribute('data-mode') === mode ? 'true' : 'false');
    });
    gravityButtons.forEach(button => {
      const selected = Number(button.getAttribute('data-gravity')) === gravity;
      button.setAttribute('aria-pressed', selected ? 'true' : 'false');
    });
  }

  function changeMode(nextMode) {
    if (nextMode !== 'zen' && nextMode !== 'challenge') return;
    if (mode === nextMode) return;
    mode = nextMode;
    syncSettingsUI();
    resetGame();
  }

  function changeGravity(nextGravity) {
    if (!Number.isFinite(nextGravity) || nextGravity <= 0 || gravity === nextGravity) return;
    gravity = nextGravity;
    syncSettingsUI();
    resetGame();
  }

  function resetGame() {
    state = [0, 0.035, -0.045, 0, -0.02, 0.025];
    targetX = 0;
    phase = 'playing';
    stableTime = 0;
    accumulator = 0;
    isDragging = false;
    pointerId = null;
    hasInteracted = false;
    resultCard.hidden = true;
    canvas.style.cursor = 'default';
    updateHud();
  }

  zenModeBtn.addEventListener('click', () => changeMode('zen'));
  challengeModeBtn.addEventListener('click', () => changeMode('challenge'));
  gravityButtons.forEach(button => {
    button.addEventListener('click', () => changeGravity(Number(button.getAttribute('data-gravity'))));
  });

  canvas.addEventListener('pointerdown', e => {
    if (phase !== 'playing') return;
    const p = scenePoint(e);
    const cartX = getCartScreenX();
    const hit = Math.abs(p.x - cartX) <= cartW / 2 + 13 && Math.abs(p.y - cartY) <= 23;
    if (!hit) return;
    isDragging = true;
    pointerId = e.pointerId;
    dragOffsetX = p.x - cartX;
    targetX = clamp((p.x - dragOffsetX - W * .5) / scale, -maxX, maxX);
    hasInteracted = true;
    canvas.style.cursor = 'grabbing';
    try { canvas.setPointerCapture(e.pointerId); } catch (_) {}
    e.preventDefault();
    updateHud();
  });

  canvas.addEventListener('pointermove', e => {
    const p = scenePoint(e);
    cursorX = p.x; cursorY = p.y;
    if (isDragging && (pointerId === null || e.pointerId === pointerId)) {
      targetX = clamp((p.x - dragOffsetX - W * .5) / scale, -maxX, maxX);
      e.preventDefault();
    } else if (phase === 'playing') {
      const cartX = getCartScreenX();
      const near = Math.abs(p.x - cartX) <= cartW / 2 + 13 && Math.abs(p.y - cartY) <= 23;
      canvas.style.cursor = near ? 'grab' : 'default';
    }
  }, { passive: false });

  function releasePointer(e) {
    if (!isDragging) return;
    if (e && pointerId !== null && e.pointerId !== pointerId) return;
    isDragging = false;
    pointerId = null;
    targetX = state[0];
    canvas.style.cursor = 'default';
    updateHud();
  }
  canvas.addEventListener('pointerup', releasePointer);
  canvas.addEventListener('pointercancel', releasePointer);
  window.addEventListener('blur', () => releasePointer());
  resetBtn.addEventListener('click', resetGame);
  againBtn.addEventListener('click', resetGame);
  window.addEventListener('resize', resize, { passive: true });

  function frame(now) {
    if (!lastFrame) lastFrame = now;
    const dt = Math.min((now - lastFrame) / 1000, 0.04);
    lastFrame = now;
    if (phase === 'playing') {
      accumulator += dt;
      let safety = 0;
      while (accumulator >= fixedDt && safety < 12 && phase === 'playing') {
        physicsStep(fixedDt);
        accumulator -= fixedDt;
        safety++;
      }
      if (safety >= 12) accumulator = 0;
    }
    draw(now);
    updateHud();
    requestAnimationFrame(frame);
  }

  resize();
  syncSettingsUI();
  resetGame();
  requestAnimationFrame(frame);
})();
</script>
</body>
</html>
