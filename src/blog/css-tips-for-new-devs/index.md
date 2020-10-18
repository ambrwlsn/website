---
title: CSS Tips for New Devs
date: "2020-05-04"
tags: [learning, css, dev tips]
keywords: []
---

May the 4th be with you! 

If you enjoyed that greeting you'll love the nerdy stuff that is to follow. Over one evening, I wrote down some of the CSS tips I've learned over a few years of being a developer and put them in this post <span role="img" aria-label="smile">😃</span>. I saved my most important tip for the end of the list. Enjoy!

- CSS stands for Cascading Style Sheets. This means that they are style sheets that cascade. <a href="https://wattenberger.com/blog/css-cascade">Take a look at this brilliant site on the CSS cascade (that has quizzes!)</a> to learn more.

- Various online games have been made to help people learn CSS and they are amazing to this day! https://flexboxfroggy.com/ for Flexbox, https://cssgridgarden.com/ for Grid, and https://flukeout.github.io/ for CSS selectors.

- One part of the CSS Cascade is Specificity. HTML elements can be styled in a number of ways. Some of your styles may be overridden depending on the way you've targeted your element for styling. Writing inline styles will override any style in a stylesheet. An `id` on an element will override a `class`, and a `class` will override targeting the element directly. In the spirit of the day this blog post was created, <a href="https://stuffandnonsense.co.uk/archives/css_specificity_wars.html">see this post on calculating CSS specificity - Star Wars edition!</a> Note that Many CSS-in-JS libraries are designed to take care of specificity issues for you by scoping styles to single files. It still absolutely pays to learn about it though!

- It's not a good idea to fix shortcomings in your HTML with CSS. Fix your HTML first!

- There are pseudo elements in HTML that can also be styled and provide handy hacks when it comes to styling elements. The most well-known are `::before` and `::after`, but there are <a href="https://blog.logrocket.com/a-guide-to-css-pseudo-elements/">seven pseudo elements in total</a>. 

- CSS allows organisation of elements on web page. There are even some layout systems - the most well-known include  Grid, Flexbox, floats and table (in order from newest to oldest).

- If your project's browser support allows, definitely try some of the newest CSS out there, e.g. Grid. If people are too afraid to try new CSS even if it doesn't have full browser support yet, then nobody would ever try it out! Check browser support with https://caniuse.com.

- Elements on a web page can be sized and spaced using quite a number of different values. There are `px`, `em`s, `rem`s, `ch`, `vw`, `vh`, `%`, etc. When building more complex web pages, the interplay of element sizing or spacing values can make a big difference in the ease and maintainability of styles.

- For every shorthand way of writing CSS, it's more than likely that there is a long-hand way to write it. E.g. `margin: 20px 30px 10px 15px` can be `margin-right: 30px`, `margin-left: 15px`, `margin-top: 20px`, `margin-bottom: 10px`. Writing the long-hand version can sometimes be clearer for other developers reading your CSS!

- You can change CSS right in your browser's dev tools (to open them, right click the browser window and choose "inspect" or "inspect element"). The great thing is, none of the styles will be saved so you can experiment here! Another great thing about the dev tools is the "computed styles" tab, because this shows you exactly what styles are currently applied to an element. This can be really helpful when it comes to debugging your CSS!

- As well as computed styles, the dev tools will also show the layout styles, giving you a clear indication what margin, padding and borders are applied to an element.

- <a href="https://stackoverflow.com/">Stack Overflow</a> and <a href="https://css-tricks.com/">CSS Tricks</a> are two of your CSS-related-questions friends (but beware of outdated answers).

- Check the MDN docs for up-to-date CSS documentation. They even have some live playgrounds for many CSS properties - e.g. https://developer.mozilla.org/en-US/docs/Web/CSS/transform.

- It pays to learn about position relative and absolute. By this I mean parent elements with  `position: relative` that have child (nested) elements with `position: absolute`.

- A web page tends to consist of a lot of different-sized boxes. Every element is actually viewed as a box by the browser - headings, paragraphs, spans, everything. Each box consists of 4 things - the element's content, its padding, margin and border. By default, the box model states that any border or padding you add to an element will be added on top of the element's width or height. This can be confusing or counterintuitive. Setting `box-sizing: border-box` tells elements not to grow in width or height when border or padding is added. Instead, the content size is adjusted.

- Don’t remove the default browser focus outlines unless you are _sure_ you are managing your own focus state correctly. Removing the outlines could prevent a user from being able to navigate your site using assistive technology or the keyboard. 

- There are a lot of CSS preprocessors that allow you to generate (compile) CSS using their own unique syntax, which often offers a way to write CSS in a more organised, shorter or functional way. Beware using preprocessors, as they can be overkill for many projects, create over-sized compiled CSS, or make CSS hard to refactor in the future. Examples of preprocessors include Sass, Less, and Stylus.

- CSS custom properties (aka CSS variables) are a way for developers to move away from CSS preprocessors and still get the benefits. They allow you to define specific values under a variable name. These variables can be used on any number of elements and if the value needs to change, it only has to be changed in one place. E.g. a variable containing a large font size such as `--fontSizeL: 150%` can be used on many different elements like this: `font-size var(--fontSizeL)`. If the value needs to change to `140%`, it can be done once quickly and easily. There is no support for Internet Explorer, but polyfills exist to get around this!

- CSS has a lot of weird quirks that you’d not think of. If you don’t know why some CSS is not doing what you want, feel free to search for the reason. Just a couple of examples include images being `display: inline-block` so that they have an implicit bottom spacing, or that you need to set `min-width: 0` on flex items to stop the items from growing infinitely. 

- CSS doesn't have to be overly complex. There is most often a simple solution to a styling problem. I can't tell you how many times I have over-used CSS and hacked a fragile solution together. If I had looked at the DOM (document object model - something you can see within your dev tools) and thought about what was happening properly, I could've saved myself time and many lines of unmaintainable CSS.

- As with all programming (and to non-believers, yes, CSS is programming <span role="img" aria-label="wink">😉</span>), if your head is too far into the CSS you’ve been doing, take a break and go back to it later. It can work wonders.

- <a href="https://blog.cloudflare.com/the-languages-which-almost-became-css/">Check out some blog posts about the history of CSS</a> and who works on it today. There is still an active CSS working group thinking about the future of CSS!

- <a href="https://rachelandrew.co.uk/archives/2016/09/13/why-there-is-no-css4-explaining-css-levels/">You may have heard of CSS3, but don't hold your breath for CSS4.</a> The CSS working group is working on different CSS feature modules, each of which have their own 'levels' or version numbers, e.g. Flexbox version 1, or selectors level 4, etc.

- CSS expertise comes with time! While CSS is easy to start with and gives you immediate visual results, mastering it takes time and this is perfectly okay  <span role="img" aria-label="smile">😃</span>. It is the same for everyone.
