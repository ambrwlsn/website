---
title: Prebrowsing
number: 17
postdate: "2019-06-15"
---

This is an umbrella term for telling browsers what users need (and allowing preloading of data) before the user requests them. Luckily, these techniques do their work behind the scenes, and do not block any other operations happening on a web page. Some browsers, e.g. Chrome, have some prebrowsing techniques built in.

They include `dns-prefetch`, `prefetch`, `preconnect`, `prerender`, and (a deprecated) `subresource`.

None are guaranteed to provide a performance boost in the form of faster render times for users, but there is no harm in including them. They are a great example of progressive enhancement - browsers that are built to use them may provide users a benefit, and browsers that don't use them won't disadvantage their users in any way.

I'll mention a commonly used one here - `dns-prefetch`: My understanding is that this technique allows supporting browsers to open a DNS request ahead of time in the background before something on a page begins rendering. So, for example, `dns-prefetch` can open the connection to the CDN containing some images a small amount of time before they actually begin the process of rendering. This can save some milliseconds in render time. So, we can set the URL of our CDN as the value of an `href` attribute and add a nice `rel` attribute with the relevant prebrowsing value. One more thing to note, all prebrowsing techniques are used within the `<head>` element of an HTML document.

```html
<head>
  <link rel="dns-prefetch" href="//fancyimagecdn.com" />
</head>
```

See [this](https://css-tricks.com/prefetching-preloading-prebrowsing/) CSS tricks article by [Robin Rendle](https://www.robinrendle.com/adventures/) for further information.
