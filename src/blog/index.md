---
title: "Blog"
---

## Blog List!

<a href="/"><- home</a>

<ul>
{% for p in collections.post %}
<li><a href="{{ p.url }}">{{ p.data.title }}</a></li>
{% endfor %}
</ul>