---
title: Caches are for Copies
date: "2020-11-11"
keywords: [amber wilson, javascript, software engineering, web development, coding, browser]
tags: [caching]
---

When someone uses their browser to visit your website, the browser fetches files from your website's server. One example could be a CSS file. Once the CSS file has been fetched, the browser can cache (store) a copy of it. This means that, as the visitor browses your site, the CSS does not need to be fetched once again from the server. 

The advantages of caching a file are: one less network request per page load, less use of the visitor's internet data, and faster load times. Additionally, CSS is a blocking resource. This means that while it is being fetched and loaded, other files have to wait to be loaded. So, the quicker CSS can be loaded, the quicker a visitor can enjoy your site. 

It is important to note once again that the **files cached by the browser are copies**. This means that if a file living on your server is updated, the browser might not know about it. Therefore, a visitor might get the outdated copy of that file, rather than the updated one. The file will still load fast, as it is coming from the browser cache, but it will be outdated.

<h2>How do servers manage files?</h2>

The server you're using to serve your website determines which of your site's resources are cached, and how they are cached. There are many different server options available. For the rest of this post, I'll talk about the one hosting the post you are reading -  Netlify. 

Netlify has default cache settings. This means that with no effort on my part, I can write my website, deploy it, and share it without needing to worry about configuring cache settings. There is a <a href="https://www.netlify.com/blog/2017/02/23/better-living-through-caching/">blog post about Netlify's default cache settings entitled "Better Living Through Caching"</a>.

I briefly mentioned earlier the issue of getting an outdated file from the cache. Netlify admit that "cache invalidation is one of the hardest problems in computer science" and that they have found a way around this issue:

<blockquote>
<strong>“max-age=0, must-revalidate, public”</strong> = “please cache this content, and then do not trust your cache”. This seems a bit counterintuitive, but there’s a good reason.  This favors you as a content creator — you can change any of your content in an instant.
</blockquote>

So, no visitors will be served outdated files. However, all files are re-requested on every single page load. This would be no good, except that Netlify uses "e-tags". These are hash values (long strings of unique characters). The server and browser share the e-tags. If a file changes on the server, for example a CSS file, the e-tag value changes, the browser notices, and the changed file is requested.

Additionally, Netlify makes the constant checking of files faster using their CDN (content delivery network) and HTTP/2. Please look up these two things, as discussing them is beyond the scope of this post.

<h2>Trust, then verify</h2>

It is a really nice thing in modern web development to be able to enjoy stuff done for you automatically by your browser and server. This doesn't mean that you shouldn't know how it all works, though.

If a server such as Netlify offers default cache settings, it pays to look up what they are, and how they work. A server's default cache settings are unlikely to be the best for **every** website.

If it is necessary to change cache settings for your website, look up how to manually create your own settings. Here is a <a href="https://docs.netlify.com/routing/headers/#custom-headers">post on how Netlify users can set custom cache headers</a>.