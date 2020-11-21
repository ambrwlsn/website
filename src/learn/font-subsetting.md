---
title: Font Subsetting
description: At the time of writing this, I am self-hosting four separate font files (for 2 different fonts) on my site. That's quite a lot.
number: 22
postdate: "2020-11-21"
keywords: [font, fonts, subsetting, subset, file size, network, network requests, woff, ttf, woff2]
---

At the time of writing this, I am self-hosting four separate font files (for 2 different fonts) on my site. That's quite a lot.

I did make sure they are `woff2` format so they are as small as possible - only around 20kb each. The same fonts in `ttf` format can be over 200kb each. Still, with 4 font files, there is a hefty 80kb of fonts, and four separate network requests for them. 

One of the fonts, Rubik 900, is used only in my site's navigation:

<img src="../img/navigation.png" alt="navigation link text">

So, I wondered if I could reduce the font file to only contain the characters that my navigation needs. The answer? <strong>Yes!</strong> &#127881;

It is possible to <strong>subset</strong> a font file. I used <a href="https://www.fontsquirrel.com/tools/webfont-generator">font squirrel's webfont generator</a> to do this.

Font squirrel only wanted to accept the `tff` version of my Rubik 900 font file, so I uploaded that into the generator. I then chose 'expert', and under 'subsetting' I chose 'custom subsetting'. After this, I copied and pasted my navigation text into the 'single characters' option:

<img src="../img/subsetting.png" alt="subsetting with font squirrel">

The generator immediately showed me a 'subset preview' of the characters my font file would now contain.

I wasn't so sure which options to pick from the rest of the form. If you want a more in-depth explanation of how to subset with the generator, please see this post on <a href="https://publishing-project.rivendellweb.net/subsetting-fonts/">subsetting fonts with font squirrel</a>.

I took the freshly-subsetted font that I had downloaded from font squirrel, and took a look at the file size. It was only 3.5kb! This is a saving of 16.5kb or ~82%!

I added the subsetted font file to my code, and the navigation text still looked and worked just the same as before. 