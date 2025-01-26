---
layout: page
title: Favorites
---

<div class="layout--archive js-all">
  <div class="js-result layout--archive__result d-none">
    {% assign favorite_articles = site.posts | where: "favorite", true %}
    {% include article-list.html articles=articles type='brief' show_info=true reverse=true group_by='year' %}
  </div>
</div>

<script>
  {%- include scripts/archieve.js -%}
</script>