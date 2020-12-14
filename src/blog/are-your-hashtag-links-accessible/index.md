---
title: Are your Hashtag Links Accessible?
date: "2020-12-14"
ogImage: accessibility.png
tags: [accessibility, create, ssg]
keywords:
  [
    amber wilson,
    software engineering,
    web development,
    coding,
    a11y,
    semantic,
    html,
    dev tips,
    hashtag,
    links,
    link,
    url,
    url fragment,
    plugin,
    markdown
  ]
---

One day I decided I wanted to add hashtag links (also known as "anchor links") to each of the sections in my blog posts. Over the past few months, I'd seen these links on a lot of pages—from official documentation pages to smaller blog posts. I find them really useful for sharing sections of pages with other people!

To make the different sections of my blog posts shareable, I decided to add a hashtag link to all of the section headers (`<h2>`s) in each of my posts.

While researching the best way to do this, something I noticed again and again was that other sites had almost always implemented hashtag links in an inaccessible way.

Within a few hours, I had made a plugin to automate the addition of hashtag links to my blog post sections, AND I had ensured the links were accessible!

## What are hashtag links exactly?

Hashtag links provide a way to link to separate sections of a page. On this page, hover over the level two headings on desktop to see the links (the links are always visible on smaller screens).

In essence, a hashtag link is a link containg a URL fragment. This fragment usually appears at the end of a URL. It begins with a hash character (`#`), and is followed by a string. This string identifies a section in a web page. 

For example, a page may have a section containing a section header element such as an `<h2>`. This element can be given an `id` attribute. A hashtag link is created when the value of the `id` matches the `href` value of an anchor (`<a>`) element on the same page. Consider the following code:

```html
<h2 id="introduction">Introduction</h2>
<a href="#introduction">#</a>
```

Imagine the web page containing this code had the following URL: `https://example.com/blog/nice-post/`. Clicking on the hash character within the `<a>` element would do two things; the browser window would scroll to the beginning of the introduction section, and the URL would become `https://example.com/blog/nice-post/#introduction`. This URL can be shared and when opened in a browser, the page will automatically scroll to the introduction section.

## Accessibility check

Of course, I wanted to make sure the hashtag links I had written were accessible. I turned on VoiceOver (a screen reader for MacOS), and using caps lock with arrow keys to interact with the page's content, I moved to my section heading. I found a few issues. Below is the **first** version of my hashtag link:

```html
<h2 id="introduction"><a href="#introduction">#</a>Introduction</h2>
```

When the `<a>` element is inside the `<h2>`, VoiceOver reads out "heading level 2 2 items, visited, link number introduction". A screen reader user who wanted to skip across multiple headings at once would have a nicer experience if they only heard the actual heading text (i.e. "introduction").

I realised the `<a>` element should exist as a sibling of the heading element, rather than a child of it. This is so that the `<h2>` text content remains clear. Below is the **second** version of my hashtag link:

```html
<a href="#introduction">#</a>
<h2 id="introduction">Introduction</h2>
```

When the `<a>` element is outside the `<h2>`, VoiceOver reads out "link number" for the `<a>` and "heading level two introduction" for the `<h2>`. This is a problem firstly because the elements are not associated with each other, and secondly because the text content ("link number") of the link is confusing. 

Unclear or inaccessible text content in links is a problem. An example I found on a popular site uses hashtag links containing only an SVG with no labels or title. In such a case, a screen reader would only read out the main page link (e.g. `https://example.com/blog/nice-post/`). This would make the purpose of the link hard to decipher for a screen reader user. 

I realised I needed to associate my section headings with accessible links. Below is the **third** version of my hashtag link:

```html
<a aria-label="link to this heading" aria-describedby="introduction" href="#introduction">#</a>
<h2 id="introduction">Introduction</h2>
```

The attributes I added are `aria-label` and `aria-describedby`. 

The `aria label` is read out by a screen reader in place of whatever child the `<a>` element has. This is necessary for hashtag links, as these links often have a single character as text content. One alternative is to describe the link using text content, but visually hide it.

The `aria describedby` matches the `id` of the `<h2>`. When the link is focused, "link, link to this heading" is read out, followed by "introduction". This is much better, but there could be one more small improvement—having the heading before the link. 

I realised that my hashtag links could have a better flow. Below is the **fourth** version of my hashtag link:

```html
<h2 id="introduction">Introduction</h2>
<a aria-label="link to this heading" aria-describedby="introduction" href="#introduction">#</a>
```

VoiceOver reads the `<h2>` out as "heading level 2 introduction" and the `<a>` as, "link, link to this heading, introduction". When the heading is first, the screen reader user may be able to associate the heading more easily with its corresponding hashtag link.

While I made great progress by the fourth version of my hashtag link, there are final some outstanding issues that I wanted to address. Thanks to my friend <a href="https://hugogiraudel.com/">Hugo Giraudel</a> for helping me realise these outstanding issues. Be sure to keep up to date with Hugo's current <a href="https://hugogiraudel.com/2020/12/01/a11y-advent-calendar/">A11y Advent Calendar</a> and check out their other great posts :)

First, `aria-label` is not actually brilliant for accessibility, as some translation services can have trouble accessing its value. So, it's best to add text content to the `<a>` element, and visually hide it. This way, screen readers can still access it but it'll be visually hidden for other users. Similarly, the `#` can be left in and hidden from screen readers using `aria-hidden`, while still being visible for other users.

Here is the **fifth** version of my hashtag link:

```html
<h2 id="introduction">Introduction</h2>
<a aria-describedby="introduction" href="#introduction">
  <span aria-hidden="true">#</span>
  <span class="hidden">Section titled introduction</span>
</a>
```

This fifth and final version is the version I am using on this page, along with a wrapper `<div>` for styling purposes. It is much better than the first version, even though it may not be perfect. If you can think of improvements, please let me know.

## Automating accessible hashtag links

I use <a href="www.11ty.dev">Eleventy</a> together with <a href="https://github.com/markdown-it">markdown-it</a> to convert my markdown files into HTML files.

I tried finding a plugin that would help me to automate the addition of hashtag links for all my `<h2>` elements. I did find one but soon realised it didn't make accessible links possible. So, I decided to make my own plugin.

There is handy <a href="https://github.com/markdown-it/markdown-it/tree/master/docs">markdown-it developer documentation</a> for people wanting to create plugins. Using these docs, a <a href="https://markdown-it.github.io/">markdown-it demo page</a>, and some inspiration from a plugin called <a href="https://github.com/valeriangalliat/markdown-it-anchor">markdown-it-anchor</a>, I wrote a plugin.

Here is <a href="https://github.com/ambrwlsn/website/blob/d8a2c29257d8fef716aee7848253f373673bb563/helpers/markdown-anchor-wat.js#L1">a permalink to my plugin file</a>. It recreates parsing functions for opening and closing `<h2>` elements from the `markdown-it` library. In my `eleventy.config` file, I `use` (connect) the plugin with `markdown-it`. This allows me to automatically add custom hashtag links for all my level two headings.


