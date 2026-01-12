---
title: 将高清图像按比例拆分为适合社交媒体的九图
tags: 
- Python
- Code
- Quantum Chemistry
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/split%20image.jpg
---
微信等社交媒体支持发布3×3布局的9张图片，该程序可以将一张高清图片拆分为9张子图像，使其在九宫格视图下恰好还原为原图像，并且子图间的间距可以人为指定以适应不同的社交媒体或不同设备。
<!--more-->
拆分过程的示意图如下：

<div align="center"><img width="75%" src="https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/split%20image/scheme.jpg" alt="scheme"></div>

编译后的程序可以使用命令行调用也可以双击运行，使用命令行时参数说明如下
```text
-i, --input:	输入图片路径
-q --quality:	输出 JPG 质量（0-100），默认 100
-g --gap:		子图间隔与图片宽度的比例（0.01表示1%），默认 0.0
```

程序使用Python编写，示意代码如下：
```python
import os
import argparse
from PIL import Image

def split_image(path, quality, gap_ratio):
    img = Image.open(path)
    w, h = img.size

    rows = cols = 3
    gap_w = int(w * gap_ratio)
    gap_h = int(w * gap_ratio)
    crop_w = (w - gap_w * (cols - 1)) // cols
    crop_h = (h - gap_h * (rows - 1)) // rows

    base_name = os.path.splitext(os.path.basename(path))[0]
    out_dir = f"{base_name}_3x3"
    os.makedirs(out_dir, exist_ok=True)
    count = 1

    for r in range(rows):
        for c in range(cols):
            # 原图裁剪区域（包含 gap 的消耗）
            left = c * (crop_w + gap_w)
            upper = r * (crop_h + gap_h)
            right = left + crop_w
            lower = upper + crop_h

            crop = img.crop((left, upper, right, lower))

            out_path = os.path.join(out_dir, f"{base_name}_{count}.jpg")
            crop.save(out_path, quality=quality)
            count += 1
    print(f"Size of Child Imgs：{crop_w} × {crop_h}\nGap: {gap_w}px, {gap_h}px")

def main():
    parser = argparse.ArgumentParser(
        description="将图片按 3×3 切割"
    )
    parser.add_argument("-i", "--input", help="输入图片路径")
    parser.add_argument("-q", "--quality", type=int, default=100, help="输出 JPG 质量（0-100），默认 100")
    parser.add_argument("-g", "--gap", type=float, default=0.0, help="间隔与图片宽度的比例（例如 0.01 表示 1%），默认 0.0")
    args = parser.parse_args()

    # 双击运行
    if not args.input:
        path = input("请输入图片路径：").strip()
        quality = int(input("输出质量（默认 100）：") or "100")
        gap_ratio = float(input("间隔比例（默认 0.0）：") or "0.0")
        split_image(path, quality, gap_ratio)
    else:
        split_image(args.input, args.quality, args.gap)


if __name__ == "__main__":
    main()

```
