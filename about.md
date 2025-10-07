---
layout: page
title: About Me
show_title: false
key: page-about
---
<div class="profile-container">
  <!-- 封面和头像 -->
  <div class="cover"></div>
  <div class="avatar-wrapper">
    <img src="https://avatars.githubusercontent.com/u/121541937" alt="Avatar" class="avatar">
  </div>

  <!-- 基本信息 -->
  <div class="info">
    <h1>YAOCY</h1>
    <p class="subtitle"><i>Knowledge is no burden to carry</i></p>
  </div>

  <hr class="divider">

  <!-- 学术指标（可接 Google Scholar JSON） -->
  <div class="myCards">
    <div class="myCard">
      <h2>🎓 Education & Research</h2>
      <p>Ph.D. Student in Chemistry</p>
      <p>
        <a class="button button-tag button--pill button--sm" href="https://en.wikipedia.org/wiki/OLED" target="_blank">OLEDs</a>&nbsp;
        <a class="button button-tag button--pill button--sm" href="https://en.wikipedia.org/wiki/Machine_learning" target="_blank">Machine Learning</a>&nbsp;
        <a class="button button-tag button--pill button--sm" href="https://en.wikipedia.org/wiki/Computational_chemistry" target="_blank">Computational Chemistry</a><!--&nbsp;
        <a class="button button--primary button--pill button--sm" href="">Energy Transfer Mechanisms</a>&nbsp;
        <a class="button button--success button--pill button--sm" href="">Noncovalent Interactions</a>-->
      </p>
    </div>
    <div class="myCard">
      <h2>📊 Academic Metrics</h2>
      <ul>
        <li>Articles: 5</li>
        <li>Citations: 89</li>
        <li>h-index: 4</li>
      </ul>
    </div>
  </div>

  <!-- 标签 -->
  <div class="interests">
    <h2>🛠️ Toolbox</h2>
    <div class="tags">
      <a class="button button-tag button--pill" href="javascript: void(0)">🐍 Python</a>
      <a class="button button-tag button--pill" href="javascript: void(0)">🤖 Matlab</a>
      <a class="button button-tag button--pill" href="javascript: void(0)">🌱 Gaussian16</a>
      <a class="button button-tag button--pill" href="javascript: void(0)">🧪 GROMACS</a>
    </div>
  </div>
  <div class="interests">
    <h2>✨ Interests</h2>
    <div class="tags">
      <a class="button button-tag button--pill" href="javascript: void(0)">📷 Photography</a>
      <a class="button button-tag button--pill" href="javascript: void(0)">🎵 Peking Opera</a>
      <a class="button button-tag button--pill" href="javascript: void(0)">🔎 Inquiry</a>
      <a class="button button-tag button--pill" href="javascript: void(0)">🌀 Reflection</a>
    </div>
  </div>

  <hr class="divider">

  <div class="myCards">
    <!-- Blog Stats -->
    <div class="myCard">
      <h2>📊 Blog Stats</h2>
      <ul>
        <li>Total Posts: {{ site.posts | size }}</li>
        <li>Total Tags: {{ site.tags | size }}</li>
        <li>Last Updated: {{ site.time | date: "%Y-%m-%d" }}</li>
      </ul>
    </div>
    <!-- Top Tags -->
    <div class="myCard">
      <h2>📂 Top Tags</h2>
      <div class="tag-list">
        {%- assign _tag_max_size = 1 -%}
        {%- assign _tag_min_size = 1 -%}
        {%- assign _tag_cur_size = 1 -%}
        {%- assign _tags = site.tags | sort -%}
        {%- for _tag in _tags -%}
          {%- assign _tag_cur_size = _tag[1].size -%}
          {%- if _tag_cur_size > _tag_max_size -%}
            {%- assign _tag_max_size =  _tag_cur_size -%}
          {%- endif -%}
          {%- if _tag_cur_size < _tag_min_size -%}
            {%- assign _tag_min_size = _tag_cur_size -%}
          {%- endif -%}
        {%- endfor -%}
        {%- assign _tag_gap_size =  _tag_max_size | minus: _tag_min_size | plus: 1 | divided_by: 4 -%}
        {%- if _tag_gap_size < 1 -%}
          {%- assign _tag_gap_size = 1 -%}
        {%- endif -%}
        {%- assign _tags_array = "" | split: "" -%}
        {% for _tag in _tags %}
          {% assign padded_count = _tag[1].size | prepend: "000" | slice: -3, 3 %}
          {% assign _tag_obj = padded_count | append: "::" | append: _tag[0] %}
          {% assign _tags_array = _tags_array | push: _tag_obj %}
        {% endfor %}
        {%- assign _sorted_tags = _tags_array | sort | reverse -%}
        {%- for _item in _sorted_tags limit:6 -%}
          {%- assign _tags = _item | split: "::" -%}
          {%- assign _tag_cur_size = _tags[0] | plus: 0  -%}
          {%- assign _tag_min_1 = _tag_min_size -%}
          {%- assign _tag_max_1 = _tag_min_1 | plus: _tag_gap_size -%}
          {%- assign _tag_min_2 = _tag_max_1 -%}
          {%- assign _tag_max_2 = _tag_min_2 | plus: _tag_gap_size -%}
          {%- assign _tag_min_3 = _tag_max_2 -%}
          {%- assign _tag_max_3 = _tag_min_3 | plus: _tag_gap_size -%}
          {%- assign _tag_min_4 = _tag_max_3 -%}
          {%- assign _tag_max_4 = _tag_min_4 | plus: _tag_gap_size -%}
          {%- if _tag_cur_size >= _tag_min_1 and _tag_cur_size < _tag_max_1 -%}
            {%- assign _c_index = 1 -%}
          {%- elsif _tag_cur_size >= _tag_min_2 and _tag_cur_size < _tag_max_2 -%}
            {%- assign _c_index = 2 -%}
          {%- elsif _tag_cur_size >= _tag_min_3 and _tag_cur_size < _tag_max_3 -%}
            {%- assign _c_index = 3 -%}
          {%- elsif _tag_cur_size >= _tag_min_4 and _tag_cur_size < _tag_max_4 -%}
            {%- assign _c_index = 4 -%}
          {%- else -%}
            {%- assign _c_index = 4 -%}
          {%- endif -%}
          <a class="button button--pill top-tag-{{ _c_index }}" href="https://ycythu.github.io/archive.html?tag={{ _tags[1] | replace: ' ', '+' }}" target="_blank">{{ _tags[1] | strip }}<span class="top-tag">{{ _tag_cur_size }}</span></a>
        {%- endfor -%}
      </div>
    </div>
  </div>

  <!-- 热门分析图表 -->
  <div class="myCards">
    <div class="myCard">
      <h2>📈 Blog Popularity (Click to jump)</h2>
      <div id="pageChart" class="chart"></div>
    </div>
    <div class="myCard">
      <h2>📈 Keywords Popularity (from Bing)</h2>
      <div id="keywordChart" class="chart"></div>
    </div>
  </div>
  <div id="loading" class="loading">Loading...</div>

  <!-- Pinned Posts -->
  <div class="posts">
    <h2>📌 Pinned Posts</h2>
    <ul>
      {%- assign pinned_posts = site.posts | where: "favorite", true -%}
      {%- for post in pinned_posts limit:3 -%}
      <li>
        <a href="{{ post.url | relative_url }}">
          <strong>{{ post.title }}</strong>
          <span class="date">{{ post.date | date: "%Y-%m-%d" }}</span>
        </a>
      </li>
      {%- endfor -%}
    </ul>
    <p class="more"><a href="https://ycythu.github.io/favorites.html">View more →</a></p>
  </div>

  <!-- 博客文章列表 -->
  <div class="posts">
    <h2>📝 Recent Posts</h2>
    <ul>
      {%- for post in site.posts limit:5 -%}
      <li>
        <a href="{{ post.url | relative_url }}">
          <strong>{{ post.title }}</strong>
          <span class="date">{{ post.date | date: "%Y-%m-%d" }}</span>
        </a>
      </li>
      {%- endfor -%}
    </ul>
    <p class="more"><a href="https://ycythu.github.io/archive.html">View all posts →</a></p>
  </div>

  <!-- 社交链接 
  <div class="social">
    <a href="https://github.com/yourname">GitHub</a>
    <a href="https://twitter.com/yourname">Twitter</a>
    <a href="mailto:you@example.com">Email</a>
  </div>-->
</div>

<style>
/* 基本布局 */
.profile-container {
  margin: 0 auto;
  margin-top: 1rem;
  text-align: center;
}

.cover {
  height: 160px;
  background: linear-gradient(to right, #a5b4fc, #c4b5fd, #fbcfe8);
  border-radius: 12px;
}

.avatar-wrapper {
  margin-top: -60px;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  /*border: 4px solid white;*/
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

/* 基本信息 */
.info h1 {
  margin-top: 16px;
  font-size: 28px;
}

.subtitle {
  color: #555;
  margin-top: 6px;
}

/* 学术卡片 */
.myCards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 24px;
  justify-content: center;
}
.myCard {
  flex: 1 1 220px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  padding: 16px;
  text-align: left;
}
.myCard h2 {
  font-size: 18px;
  margin-bottom: 8px;
}
.myCard ul {
  list-style: disc inside;
  padding-left: 16px;
  margin: 0;
}

/* 兴趣标签 */
.interests {
  margin-top: 30px;
}
.tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
.tags span {
  background: #eef2ff;
  color: #3730a3;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: bold;
}

/* 社交链接 
.social {
  margin-top: 20px;``
}
.social a {
  margin: 0 10px;
  text-decoration: none;
  color: #444;
}
.social a:hover {
  color: #000;
}*/

/* 文章列表 */
.posts {
  margin-top: 40px;
  text-align: left;
}
.posts ul {
  list-style: none;
  padding: 0;
}
.posts li {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  margin-bottom: 12px;
}
.posts li a {
  display: block;
  padding: 12px 16px;
  text-decoration: none;
  color: #333;
}
.posts li a:hover {
  background: #f9fafb;
}
.posts .date {
  display: block;
  font-size: 13px;
  color: #777;
  margin-top: 4px;
}
.posts .more {
  text-align: center;
  margin-top: 10px;
}

.stats, .categories, .pinned {
  margin-top: 40px;
  text-align: left;
}

.stats ul, .pinned ul {
  list-style: none;
  padding: 0;
}

.stats li, .pinned li {
  margin: 6px 0;
}

/* 分类标签 */
.tag-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}
/*.tag-item {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  background: #f1f5f9;
  color: #334155;
  text-decoration: none;
  font-size: 14px;
}
.tag-item:hover {
  background: #e2e8f0;
}
 标签样式分层次 */

.tag-item {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 20px;
  text-decoration: none;
  font-size: 14px;
}
.divider {
  margin: 40px auto;
  border: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, #d4d4d8, transparent);
}
.myCard a.button-tag {
  background-color: #eef2ff;
  color: #3730a3;
}
.myCard a.button-tag:hover {
  background-color: #6366f1;
  color: #fff;
}
.myCard .tag-list a:hover {
  color: #fff;
}
.tags a.button-tag {
  background-color: #eef2ff;
  color: #3730a3;
}
.tags a.button-tag:hover {
  background-color: #6366f1;
  color: #fff;
}
.top-tag {
  display: inline-block;
  margin-left: .25rem;
  font-size: .7rem;
  line-height: 1;
  vertical-align: top;
}
.tag-list .top-tag-4:hover {
  background: #4c4fdb;
  color: #fff;
}
.tag-list .top-tag-4 {
  background: #6366f1;
  color: #fff;
}
.tag-list .top-tag-3:hover {
  background: #4c4fdbcc;
  color: #fff;
}
.tag-list .top-tag-3 {
  background: #6366f1cc;
  color: #fff;
}
.tag-list .top-tag-2:hover {
  background: #4c4fdb99;
  color: #fff;
}
.tag-list .top-tag-2 {
  background: #6366f199;
  color: #fff;
}
.tag-list .top-tag-1:hover {
  background: #4c4fdb66;
  color: #fff;
}
.tag-list .top-tag-1 {
  background: #6366f166;
  color: #fff;
}
/* ========== 热门分析图表样式 ========== */
.chart-section {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 1rem;
}
.chart-box {
  flex: 1 1 300px;
  max-width: 500px;
  background: #f9fafb;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(99,102,241,0.15);
  padding: 0.8rem;
}
.chart-box h3 {
  text-align: center;
  font-size: 16px;
  color: #4f46e5;
  margin-bottom: 0.5rem;
}
.chart {
  width: 100%;
  height: 360px;
}
.loading {
  text-align: center;
  color: #777;
  margin-top: 1rem;
}
</style>

 <!-- Plotly + PapaParse -->
 <script src="https://cdn.plot.ly/plotly-2.27.0.min.js"></script>
 <script src="https://cdn.jsdelivr.net/npm/papaparse@5.4.1/papaparse.min.js"></script>
 <script>
   const hotPageURL = "https://cdn.jsdelivr.net/gh/ycythu/assets@main/hotpage.csv";
   const hotKeywordURL = "https://cdn.jsdelivr.net/gh/ycythu/assets@main/hotkeyword.csv";

   function loadCSV(url) {
     return new Promise((resolve, reject) => {
       Papa.parse(url, {
         download: true,
         header: true,
         complete: results => resolve(results.data),
         error: err => reject(err)
       });
     });
   }

   const shortLabel = url => {
     try {
       const u = new URL(url);
       let path = u.pathname.replace(/^\/|\/$/g, '');
       if (path === '') return u.hostname;
       return path.split('/').pop().replace(/\.[^/.]+$/, '');
     } catch {
       return url;
     }
   };

   const trimLabel = s => (s.length > 15 ? s.slice(0, 15) + '…' : s);

   async function drawCharts() {
     const colors = ['#a5b4fc', '#c4b5fd', '#fbcfe8', '#ddd6fe', '#e0e7ff', '#fde68a', '#fcd34d', '#f9a8d4'];
     const [pages, keywords] = await Promise.all([
       loadCSV(hotPageURL),
       loadCSV(hotKeywordURL)
     ]);

     const cleanPages = pages.filter(d => d["页面"] && d["印象数"]);
     const cleanKeywords = keywords.filter(d => d["关键字"] && d["印象数"]);

     const topPages = cleanPages.sort((a,b) => b["印象数"] - a["印象数"]).slice(0, 10);
     const topKeywords = cleanKeywords.sort((a,b) => b["印象数"] - a["印象数"]).slice(0, 10);

     const pageLabels = topPages.map(d => trimLabel(shortLabel(d["页面"])));
     const pageValues = topPages.map(d => Number(d["印象数"]));
     const pageURLs = topPages.map(d => d["页面"]);

     const pageData = [{
       type: 'pie',
       labels: pageLabels,
       values: pageValues,
       hovertext: topPages.map(d =>
         `${d["页面"]}<br>Impression: ${d["印象数"]}`
       ),
       textinfo: "label+percent",
       hoverinfo: "label+text",
       marker: { colors },
       hole: 0.3
     }];

     const pageLayout = {
       //title: {text: "热门页面展示占比（前10）", x: 0.5},
       showlegend: false,
       legend: {orientation: 'h', y: -0.15, x: 0.5, xanchor: 'center'},
       margin: {t: 80, b: 60}
     };

     Plotly.newPlot("pageChart", pageData, pageLayout, {responsive: true}).then(gd => {
       gd.on('plotly_click', function(data) {
         const point = data.points[0];
         const url = pageURLs[point.pointNumber];
         if (url) window.open(url, "_blank");
       });
     });

     const keywordData = [{
       type: 'pie',
       labels: topKeywords.map(d => trimLabel(d["关键字"])),
       values: topKeywords.map(d => Number(d["印象数"])),
       hovertext: topKeywords.map(d =>
         `Impression: ${d["印象数"]}`
       ),
       textinfo: "label+percent",
       hoverinfo: "label+text",
       marker: { colors },
       hole: 0.3
     }];

     const keywordLayout = {
       //title: {text: "热门搜索关键词展示占比（前10）", x: 0.5},
       showlegend: false,
       legend: {orientation: 'h', y: -0.15, x: 0.5, xanchor: 'center'},
       margin: {t: 80, b: 60}
     };

     Plotly.newPlot("keywordChart", keywordData, keywordLayout, {responsive: true});
     document.getElementById('loading').style.display = 'none';
   }

   drawCharts().catch(err => {
     document.getElementById('loading').innerText = "Fail to load data" + err;
     console.error(err);
   });
 </script>
