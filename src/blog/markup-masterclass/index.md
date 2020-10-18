---
title: Markup-Masterclass
date: "2017-03-16"
tags: [learning]
keywords: [amber wilson, javascript, software engineering, web development, coding, markup]
---

Today I spent a great day at [Clearleft](https://clearleft.com), soaking in the lovely atmosphere, chatting with the wonderful staff. I sat down in the morning to talk with [Jeremy](https://adactio.com) about the web and the internet, web apps and native apps. We chatted about tech company structures, job titles, career advice and much more.

For the main part of my day, Jeremy set me the task of re-formatting my CV (currently only in PDF format) into an HTML document. I thought to myself “ah, easy!”. I had little inkling of all the new things I would learn, or how much fun I'd have. See a summary of my learning at the end.

I began like this:

*   Copy and paste text from the PDF file into my code editor.
*   Add some 'h' elements that matched to the size I wanted the text to be.
*   Use a bunch of 'br' elements to break up my text.
*   Add some hyperlinks.

Right, the page looked well structured, and I thought I'd nailed the task already. "**Next!**" I shouted in my head. I ask Jeremy to come see what I'd accomplished. He told me I had been fast. A little too fast, perhaps?

Firstly, he noted that I hadn't filled in a title, something very important. He then sat down and taught me about 'metadata'. This is data that describes other data. I added 'description', 'keywords', and 'viewport' meta tags (e.g. meta name=“description”), and gave each some “content” (e.g. Amber Wilson's CV). A meta tag that's commonly used these days in the era of responsive design is the 'viewport' tag. It controls layout on mobile browsers and allows users to pinch and zoom content.

Jeremy noticed I had formatted my paragraphs using the 'div' element. He asked me why and I told him that I wanted to use them as a visual aid for breaking up sections of text. We then discussed the difference between 'div' and 'span' elements. Both essentially do nothing, except that the former acts as a block element, the latter as inline. We then went on to discuss 'section' and 'article' elements. I was using a site that gave a handy list of HTML5 elements, [W3 Schools](https://www.w3schools.com/), which Jeremy told me to exit immediately. This site may have hijacked the World Wide Web Consortium's (W3C's) name and be at the top of all search results, but it is one to be avoided. The [Mozilla Developer Network](https://developer.mozilla.org/en-US/) (MDN) is much better.

I swapped 'div' elements with 'section' elements. I thought these elements only helped developers make sense of code. I was wrong. They also differ practically in that 'section' elements help assistive technology and search bots decipher site content for the benefit of all users. By now, I thought that I really must have nailed the perfect semantic document. I thought I'd try to be clever and stick an 'hgroup' element in - something I read about on the MDN. I triumphantly called Jeremy over. In a fraction of a second, he'd spotted my error and told me to research 'hgroup' more. After ten minutes, I hadn't got far.

Jeremy recommended I find a way to validate my markup. I found this [site](https://validator.w3.org/), and almost switched it off because it looks like a W3 Schools site. I was wrong, it is a W3C site. No matter how hard I tried, I couldn't get it to tell me my 'hgroup' element was valid. The realisation came that I'd been trawling quite heavily out-of-date sites for a lot of information. Eventually, I scrolled down the MDN page a little more and saw that this element was removed from the HTML5 specification. Oops.

Recapping, I'd gotten rid of my 'hgroup' element, I had my 'section' elements in place, and I'd added my meta data. What else? Next, I was asked why my 'h' elements were all odd sizes. I said it was because I wanted the headings to present text in a certain size. I was told this is CSS's job and to "not worry about how it looks". These elements are for adding structural outline to a page. I changed my markup until I received this outline summary from W3C -

<div>![W3C header summary](/img/outlines.png)</div>

Jeremy noticed other content where I'd been more concerned about presentation than structure. I was again reminded _take my mind off presentation and focus on the structure_. I could change the presentation later with CSS. I wanted some sections to have content that sat in a nice line. After successfully pushing the urge to present the content this way, I put it all into list ('ol' and 'li') elements. I was introduced to elements I'd never heard of - 'dl', 'dt' and 'dd'. These go a step further than list elements and add semantic meaning. The 'time' element is also new for me, and I added this to all dates.

Some more reading on the MDN taught me that the humble 'br' element, is now obsolete. Jeremy encouraged me to use the 'p' element in their place. I didn't think I could live without 'br', but 'p' came to the rescue. Lastly, I asked Jeremy about the 'hcard' element, one I'd learnt about in [Homebrew Website Club](https://indieweb.org/Homebrew_Website_Club).

This element is a microformat used for embedding data (on people, companies and organisations) and making it more easily accessible on the web for use in applications and services. It should be noted that [microformats2](http://microformats.org/wiki/microformats-2) have superceded the [classic microformats](http://microformats.org/wiki/hcard). I added 'p-name', 'u-url', 'u-tel' and 'u-email' for my name, site, phone number and email. There are a wide range of microformat elements to explore. I am still in the process of doing this and want to add a 'resume' element soon.

Here's a summary of what I learned today:

*   Focus on the structure and meaning of elements, not the presentation.
*   Think of the 'h' element as structural, not presentational.
*   Search up-to-date information when researching correct HTML markup.
*   Check elements have not become obsolete.
*   Place elements in order of their importance.
*   Pay attention to meta tags and microformats.
*   Always validate your markup.
*   & a lot more.

Thank you [Jeremy](https://adactio.com) for teaching me.

See my [HTML resume](/blog/html-resume) here.