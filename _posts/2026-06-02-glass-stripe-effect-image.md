---
title: 模拟条纹玻璃风格壁纸的网页
tags: 
- Code
- CSS
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/glass%20stripes.jpg
---
借助CSS的`blur()`和`mask-image`属性实现壁纸的条纹玻璃化。
<!--more-->

```html
<style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background: #050608;
      font-family: sans-serif;
    }

    .scene {
      position: relative;
      width: 100vw;
      height: 100vh;
      overflow: hidden;
      background:
        radial-gradient(circle at center, #2b2b35 0%, #11131b 60%, #050608 100%);
    }

    .scene::before {
      content: "";
      position: absolute;
      inset: -10%;
      background:
        radial-gradient(circle at 25% 50%, rgba(120,180,255,0.18), transparent 28%),
        radial-gradient(circle at 75% 50%, rgba(255,120,180,0.18), transparent 28%),
        radial-gradient(circle at center, rgba(255,255,255,0.04), transparent 40%);
      filter: blur(80px);
      z-index: 0;
      pointer-events: none;
    }

    .gallery {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      z-index: 1;
      overflow: hidden;
    }

    .card {
      position: relative;
      height: 100vh;
      overflow: hidden;
      isolation: isolate;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .card::after {
      content: "";
      position: absolute;
      inset: 0;
      background:
        linear-gradient(
          to right,
          rgba(5,6,8,0.18) 0%,
          transparent 12%,
          transparent 88%,
          rgba(5,6,8,0.18) 100%
        );
      mix-blend-mode: soft-light;
      pointer-events: none;
      z-index: 3;
    }

    .card img {
      height: 100%;
      width: auto;
      object-fit: contain;
      display: block;
      filter: saturate(1.15) contrast(1.05);
      transform: scale(1.02);
    }

    .card.center {
      z-index: 5;
    }

    .card.center img {
      filter: none;
    }

    .blur-1 img {
      filter: blur(3px) brightness(0.95) saturate(1.05);
    }

    .blur-2 img {
      filter: blur(6px) brightness(0.9) saturate(0.95);
    }

    .blur-3 img {
      filter: blur(10px) brightness(0.78) saturate(0.85);
    }

    .blur-4 img {
      filter: blur(15px) brightness(0.68) saturate(0.7);
    }

    .edge img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transform: scale(1.12);
    }

    .card::before {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 2;
      mix-blend-mode: screen;
      pointer-events: none;
    }

    .glass-stripes {
      position: absolute;
      inset: 0;
      z-index: 10;
      pointer-events: none;
      backdrop-filter: blur(5px) saturate(110%);
      -webkit-backdrop-filter: blur(10px) saturate(120%);
      background:
        linear-gradient(
          to right,
          rgba(255,255,255,0.10) 0%,
          rgba(255,255,255,0.06) 12%,
          transparent 30%,
          transparent 70%,
          rgba(255,255,255,0.06) 88%,
          rgba(255,255,255,0.10) 100%
        ),
        repeating-linear-gradient(
          90deg,
          rgba(255,255,255,0.16) 0px,
          rgba(255,255,255,0.16) 3px,
          rgba(255,255,255,0.04) 10px,
          rgba(255,255,255,0.00) 18px
        );

      mask-image: linear-gradient(
        to right,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,0.9) 20%,
        rgba(0,0,0,0) 40%,
        rgba(0,0,0,0) 60%,
        rgba(0,0,0,0.9) 80%,
        rgba(0,0,0,1) 100%
      );

      -webkit-mask-image: linear-gradient(
        to right,
        rgba(0,0,0,1) 0%,
        rgba(0,0,0,0.9) 20%,
        rgba(0,0,0,0) 40%,
        rgba(0,0,0,0) 60%,
        rgba(0,0,0,0.9) 80%,
        rgba(0,0,0,1) 100%
      );

      mix-blend-mode: screen;
    }
 </style>
```

```html
<body>
  <div class="scene">
    <div class="gallery" id="gallery"></div>
    <div class="glass-stripes"></div>
  </div>
  <script>
    const gallery = document.getElementById('gallery');
    const imageSrc = "img path";

    const img = new Image();
    img.src = imageSrc;

    img.onload = () => {
      const aspect = img.width / img.height;
      const fullWidth = window.innerHeight * aspect;
      let count = Math.ceil(window.innerWidth / fullWidth);
      if (count % 2 === 0) count += 1;
      count += 2;
      const center = Math.floor(count / 2);

      for (let i = 0; i < count; i++) {
        const card = document.createElement('div');
        const image = document.createElement('img');

        image.src = imageSrc;
        card.classList.add('card');

        const distance = Math.abs(i - center);

        if (distance === 0) {
          card.classList.add('center');
        }
        if (distance === 1) card.classList.add('blur-1');
        if (distance === 2) card.classList.add('blur-2');
        if (distance === 3) card.classList.add('blur-3');
        if (distance >= 4) card.classList.add('blur-4');

        if (i === 0 || i === count - 1) {
          card.classList.add('edge');
        }

        if (!(i === 0 || i === count - 1)) {
          card.style.width = `${fullWidth}px`;
        } else {
          card.style.flex = '1';
        }

        card.appendChild(image);
        gallery.appendChild(card);
      }
    };
  </script>
</body>
```
