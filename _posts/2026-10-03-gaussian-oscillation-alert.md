---
title: 高性能集群上高斯优化振荡的检测与提醒
tags: 
- Code
- Go
- Bash
cover: https://cdn.jsdelivr.net/gh/ycythu/assets@main/images/cover/inter%20rdf.png
favorite: true
---
Gaussian的几何优化任务有几率发生振荡，即原子受力、几何结构随优化步数增加呈现一定周期性变化趋势。在高性能集群上，一些几何优化任务往往需要数天甚至十天才会收敛，如果发生了振荡现象而没有及时进行干预，优化任务只能空耗机时而不会正常收敛。
<!--more-->

<style>
	#testTable {
		width: 100%;
		display: table;
		border: 2px #ccc solid;
	}

	td {
		text-align: center;
	}
</style>

## 振荡的检测

Gaussian在优化时每一步都会输出四个优化指标：最大受力、方均根受力、最大位移与方均根位移。在正常的几何优化任务中，这四个指标在优化后期会出现整体降低、逐渐收敛到平坦的趋势。而当振荡现象发生时，这四个指标始终来回上下波动，呈现一定的周期性。

[自相关函数](https://zh.wikipedia.org/wiki/%E8%87%AA%E7%9B%B8%E5%85%B3%E5%87%BD%E6%95%B0)是一个时间序列变量在不同时间点上的观测值之间的相似程度或线性相关性，非常适合用来检测周期性。自相关值的取值范围为 $[-1,1]$，1为最大正相关值，-1则为最大负相关值，0代表不相关。

下面是使用Go实现检测时间序列自相关性的核心代码。该程序会检测不同周期下的自相关，并记录自相关的最大值与对应的周期数。

```go
func detectPeriodicOscillation(
	energies []float64,
	window int,
	maxPeriod int,
	threshold float64,
) Result {

	result := Result{
		Oscillating: false,
		Period:      0,
		Correlation: 0,
		Scores:      make(map[int]float64),
	}

	actualWindow := window

	if len(energies) < actualWindow {
		actualWindow = len(energies)
	}

	// At least a few data points are needed for analysis.
	if actualWindow < maxPeriod {
		return result
	}

	y := energies[len(energies)-actualWindow:]
	x := make([]float64, actualWindow)

	for i := 0; i < actualWindow; i++ {
		x[i] = float64(i)
	}

	// Remove linear trend
	a, b := linearFit(x, y)
	detrended := make([]float64, actualWindow)

	for i := 0; i < actualWindow; i++ {
		trend := a*x[i] + b
		detrended[i] = y[i] - trend
	}

	if maxPeriod > actualWindow/2 {
		maxPeriod = actualWindow / 2
	}

	for p := 2; p <= maxPeriod; p++ {

		a := detrended[:actualWindow-p]
		b := detrended[p:]
		corr := correlation(a, b)

		result.Scores[p] = corr
	}

	first := true
	for p, score := range result.Scores {
		if first || score > result.Correlation {
			result.Correlation = score
			result.Period = p
			first = false
		}
	}

	result.Oscillating =
		result.Correlation >= threshold

	return result
}
```

将上述核心代码与参数解析等其他部分结合，编译后得到`oscDetect`程序。

Gaussian输出的log文件中包含了每一步的最大受力、方均根受力、最大位移与方均根位移四个指标，可以从log文件中匹配序列，并分别使用`oscDetect`检测其自相关性，只要有一个指标存在显著的自相关，就可以怀疑该优化任务已经发生振荡。在实际情况中，往往会有不止一个指标发生非常明显的振荡，其自相关性可以接近1.0。

```bash
awk '/Converged\?/{count=4; next} count>0 { if(match($0, /[-+]?[0-9]*\.?[0-9]+/)) { val=substr($0, RSTART, RLENGTH); print val > "tmp_file_" (5-count) ".txt"; count-- } }' ${filename}

for data in tmp_file_{1..4}.txt; do
	oscDetect -window $WINDOW -maxperiod $MAXPERIOD $data >> tmp_osc
done

MAX_VAL=$(awk -F',' 'NR==1{max=$2} $2>max{max=$2} END{print max}' tmp_osc)
PERIOD=$(awk -F',' 'NR==1{max=$2; col=$1} $2>max{max=$2; col=$1} END{print col}' tmp_osc)
```

使用8个正常的任务文件与7个发生振荡的任务文件对该方法与参数的选择进行评估。由于该方法只能检测不大于窗口宽度一半的周期，因此会有一些假阴性结果。**例如当窗口宽度设置为8时，将会无法检测周期为5的振荡，并给出假阴性的结果。而且较小的窗口宽度也使得检测结果更容易受到噪声影响，产生误报。**由于优化任务产生的振荡周期主要集中于2~5，因此当数据量充足时推荐使用至少12的窗口，此时漏报率与误报率均较小。

使用12或20的窗口时，该方法对振荡任务均给出了高于0.90的检测值，因此可以选择将判断阈值设为0.90，尽量避免误报的情况发生。

<table id="testTable">
	<tr><td rowspan="3">阳性</td><td>window=8</td><td>1.0000</td><td>1.0000</td><td>1.0000</td><td>1.0000</td><td>0.9802</td><td><b>0.3499</b></td><td>1.0000</td></tr>
	<tr><td>window=12</td><td>1.0000</td><td>1.0000</td><td>1.0000</td><td>1.0000</td><td>0.9901</td><td>0.9689</td><td>1.0000</td></tr>
	<tr><td>window=20</td><td>1.0000</td><td>1.0000</td><td>0.9999</td><td>1.0000</td><td>0.9950</td><td>0.9210</td><td>0.9647</td></tr>
	<tr><td rowspan="3">阴性</td><td>window=8</td><td>0.0265</td><td>0.2523</td><td>0.5161</td><td>-0.3490</td><td>-0.3290</td><td>0.5991</td><td><b>0.8708</b></td><td>0.7113</td></tr>
	<tr><td>window=12</td><td>0.0546</td><td>0.2983</td><td>0.5025</td><td>-0.1837</td><td>-0.1835</td><td>0.2537</td><td>0.0151</td><td>0.0800</td></tr>
	<tr><td>window=20</td><td>0.2370</td><td>0.6042</td><td>0.5879</td><td>-0.0322</td><td>-0.1835</td><td>0.2141</td><td>0.0151</td><td>0.2751</td></tr>
</table>

## 监控与提醒

一些高性能集群虽然能够连接网络，但关闭了SMTP服务，而且使用者通常没有管理员权限。为了实现邮件提醒功能，需要借助支持HTTP的发送邮件API，例如[Resend](https://resend.com/)，[Postmark](https://postmarkapp.com/)等。以Resend为例，注册账号后会提供一个API（`re_xxxxxx`），利用该API即可免费发送邮件。

```bash
TO="$1"
SUBJECT="$2"
CONTENT="$3"

KEY="$RESEND_API_KEY"

/usr/bin/curl -sS -X POST 'https://api.resend.com/emails' \
  -H "Authorization: Bearer $KEY" \
  -H 'Content-Type: application/json' \
  -d "{
    \"from\": \"onboarding@resend.dev\",
    \"to\": [\"$TO\"],
    \"subject\": \"$SUBJECT\",
    \"html\": \"$CONTENT\"
  }"
```

以curl为例，将上面的代码保存为`sendmail.sh`，然后通过以下命令可以实现自定义的邮件主题与邮件内容。


```bash
export RESEND_API_KEY="re_xxxxxx"
sendmail.sh "xxx@example.com" "Hello" "Hello from Linux server."
```

但是Resend限制只有拥有个人域名才可以向其他邮箱发送邮件，无个人域名则只能向注册Resend的邮箱发送邮件。如果只需要向单一邮箱发送提醒，使用下面的脚本即可实现扫描最近发生过更改的`chk`文件，从而定位到正在进行的Gaussian任务，然后检测振荡现象并邮件提醒。


```bash
export RESEND_API_KEY="re_xxxxxx"

THRESHOLD=0.9
MAILTO=xxx@example.com
ALERTS=()

while IFS= read -r -d '' chk_file; do

    log_file="${chk_file%.chk}.log"

    if [ -f "$log_file" ]; then
        VALUE=$(oscDetect.sh "$log_file" --window 12 --maxperiod 5 --quiet)

        if awk "BEGIN {exit !($VALUE > $THRESHOLD)}"; then
            ALERTS+=("$log_file    value=$VALUE")
        fi
    fi

done < <(
    find /WORK \( -path /WORK/miniconda3 -o -path /WORK/scratch \) -prune -o -type f -name "*.chk" -mmin -180 -print0
)

if [ ${#ALERTS[@]} -gt 0 ]; then
    CONTENT=$(printf '%s<br>' "${ALERTS[@]}")
    sendmail.sh "$MAILTO" "[Gaussian] Oscillation Alert" "$CONTENT"
fi
```

如果是多个人共用同一账号进行计算，需要向不同的邮箱发送提醒，则仅依靠Resend无法完成。但可以通过配置收件邮箱的自动转发功能实现二次分发。[Gmail](https://support.google.com/mail/answer/10957)与[Outlook](https://support.microsoft.com/zh-cn/outlook/mail/use-rules-to-automatically-forward-messages)等邮箱均支持设置自动转发功能。


