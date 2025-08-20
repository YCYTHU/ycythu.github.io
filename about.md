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
      <p>Ph.D. in Chemistry</p>
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
        <li>Citations: 84</li>
        <li>h-index: 4</li>
        <li>i10-index: 4</li>
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
        <div class="site-tags js-tags">
          <ul class="menu">
          {%- assign _tags_array = "" | split: "" -%}
          {% for _tag in _tags %}
            {%- assign _tag_name = _tag[0] | replace: '"', '\"' -%}
            {%- assign _tag_obj = '{"name": "' | append: _tag_name | append: '", "count": ' | append: _tag[1].size | append: '}' -%}
            {%- assign _tag_obj = _tag_obj | parse_json -%}
            <!-- DEBUG: {{ _tag_obj | inspect }} -->
            {%- assign _tags_array = _tags_array | push: _tag_obj -%}
          {% endfor %}
          {%- assign _sorted_tags = _tags_array | sort: "count" | reverse -%}
          {%- for item in _sorted_tags limit:6 -%}
          <!-- DEBUG: {{ item | inspect }} -->
            {%- assign _tag_cur_size = item.count -%}
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
            <li><button type="button" class="button button--pill tag-button tag-button-{{ _c_index }}" data-encode="{{ item.name | strip | url_encode }}">
                <span>{{ item.name | strip }}</span><div class="tag-button__count">{{ _tag_cur_size }}</div>
              </button>
            </li>
          {%- endfor -%}
          </ul>
        </div>
      </div>
    </div>
  </div>

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

/* 社交链接 */
.social {
  margin-top: 20px;
}
.social a {
  margin: 0 10px;
  text-decoration: none;
  color: #444;
}
.social a:hover {
  color: #000;
}

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
.tag-strong {
  background: #312e81;  /* 深蓝 */
  color: #fff;
}
.tag-medium {
  background: #6366f1;  /* 中蓝 */
  color: #fff;
}
.tag-light {
  background: #e0e7ff;  /* 浅蓝 */
  color: #3730a3;
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
.tags a.button-tag {
  background-color: #eef2ff;
  color: #3730a3;
}
.tags a.button-tag:hover {
  background-color: #6366f1;
  color: #fff;
}
</style>
