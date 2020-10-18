---
title: Mobile First
date: "2017-05-19"
tags: [mobile first]
keywords: [amber wilson, javascript, software engineering, web development, coding]
---

Today I realised I wasn't adhering to a new, up-and-coming idea called '[Mobile First](https://www.lukew.com/ff/entry.asp?933)'...maybe you've heard of it?

Once I had written a correct media query to adhere to this interesting new idea, I noticed my site looked pretty ugly.

![ugly site](img/site-ugly.png)

But still good on all screens less than 520px.

![mobile site](img/site-mobile.png)

It is supposed to look similar on desktop.

![pretty site](img/site-pretty.png)

I effectively had to switch my mindset around. Instead of thinking of everything inside a media query as belonging to the mobile part of my design, I had to imagine it contained the desktop design. And the place where desktop code lived before now resides within a media query. The resulting switch didn't take long to accomplish and gave me another chance to look at my CSS, and to tidy it up a little - always a good practice now and again.

In any case, I can now feel proud that my site adheres to the best practice of Mobile First design.
