---
title: CSS Layout
number: 7
postdate: June 2018
---

CSS layout is something that amazes and confuses me at the same time. There seem to be so many approaches (e.g. floats, flexbox, grid), and so many frameworks (way too many to mention). The paradox of choice seems to apply here.

I love hearing from people about CSS layout, and I was lucky to hear [Miriam Suzanne](http://www.miriamsuzanne.com/) talk about it at [Beyond Tellerrand](https://beyondtellerrand.com/events/duesseldorf-2018/speakers) (check out the awesome layout on her site). The message she gave was to use CSS grid, and provide fallbacks for browsers that aren't grid-compatible. She reasons that as grid makes layouts so easy (and naturally responsive), that there is time to re-create fallback layouts, which allows more creative control.

<blockquote>
<p lang="en" dir="ltr">Often I allow fallback layouts to be much simpler. CSS Grid has power to create layouts that have
no *exact* fallback. Since grid makes many layouts easier, I have extra time to do both. Similar
time spent, more creative control.<br><br>Your mileage will depend on your constraints.</p>&mdash;
Miriam Suzanne (@mirisuzanne) <a href="https://twitter.com/mirisuzanne/status/993813309441880064?ref_src=twsrc%5Etfw">May 8, 2018</a></blockquote>

One thing I really like about CSS layouts is that they aren't designed to be used in isolation. On the contrary, you can mix and match them. A grid item can become a flex container, and a flex item can become a grid. You can even use floats with flexbox and grid.

I am half-way through Wes Bos's [CSS grid](https://cssgrid.io/) course and already have ideas I am excited to make come to life using grid. There are looots of great posts and articles out there by people who have had tonnes of fun and learned loads by using grid. I really recommend finding some and making some stuff!
