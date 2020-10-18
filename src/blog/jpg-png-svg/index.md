---
title: JPG? PNG? SVG?
date: "2017-09-25"
tags: [learning]
keywords: [amber wilson,software engineering,web development,coding,images,png,svg,jpg, image format, image formats]
---

There is a room that contains all there is to know about images. The door to it is locked. Most of us have casually peered through its keyhole or witnessed light of various colours and brightness spilling from it. If you are granted a guest pass to the room, beware. Akin to JK Rowling’s Triwizard Maze, you are likely to get lost in its twisting passages, or be usurped by something surprising along the way.

Most of us know that when building stuff for the web, optimising HTML, CSS, JavaScript or whatever else is good – but if you don’t optimise images, all other efforts will be in vain.

I’ve always been in love with pictures but knew little of the technical details behind them. Now I realise there are more of these details than you or I would ever have expected.

This article barely scratches the surface of web image choice. Beyond its scope (to name but a few) are things like the maths behind image formats, GIFs, TIFFs, BMPs, use of fallback images, dots per inch, the webP image format, decreasing image requests, image metadata, image scaling, browser rendering differences, automated optimisation tools, saving for the web, sprites, lazy-loading, the picture element, srcset, re-use of images throughout a site, etc.

Here are a few questions to ask yourself that may help you plot a basic map of one tiny corner of the image room – whether to use PNG, JPG or SVG image formats. Of course, as usual, it depends, and you may not get it perfect but you can, and should, damn well try! ;)

## How many colours do I need?

PNG-8 limits you to 256 colours, which is enough most of the time, has by far the smallest file size, but may exhibit “banding” of colours. If you need more colours or want to avoid banding, consider PNG 24 or 32, but be aware of huge increases in file size. JPGs can contain millions of colours and have much smaller file sizes, but are best for photos where there are no crisp lines or text. For pictures with crisp lines or text (e.g. a graph), stick with PNG and compromise on the number of colours you use. Replace PNG with SVG for simple line drawings, logos and icons.

Bonus fact: the way PNGs are structured means two near-identical files that are separated only by a size difference of a few pixels may differ dramatically in size.

## Do I need transparency?

JPGs don’t offer this (although some people came up with clever hacks to merge SVG with JPG to make a transparent JPG - see [here](https://css-tricks.com/transparent-jpg-svg/)). PNGs and SVGs support transparency. PNG-24 will likely give better quality than PNG-8, tempting you to create a large file. SVGs are transparent by default and can be a lot smaller.

## Do I need the whole image to be sharp?

JPGs are lossy meaning they lose quality when compressed or saved, plus they are raster-based meaning they don’t scale well. They are best used for more complex photos that have many colours - not illustrations, logos, web comics etc., where sharpness of every line is important. Another good thing is that you can selectively blur parts of a JPG, leaving more important parts sharp, but shaving more of the file size off. PNGs are lossless, so don’t lose quality when compressed or saved. This makes them a good alternative to JPG when you need crisp lines or text. However, they can be large in size and are also raster-based so won’t scale well. SVGs are vector-based and scale incredibly well, remaining sharp at any size, but aren’t suited to photos or more complex graphics.

## What devices do I need to optimise for?

On retina screens, JPGs rarely look good and PNGs have trouble scaling. SVGs look good and will scale. Support for JPG, PNG and SVG is good across all browsers, and there are work-arounds available for older browsers (e.g. IE6 to IE10). There are ways to provide back-up images to help browsers choose which format and size of image to render, depending on screen size and resolution - but these deserve their own dedicated article.

## TL;DR

JPG – lossy and raster-based, use for photos and images with loads of colours where crisp lines aren’t absolutely essential. They won’t support transparency, although there are ways around this.

PNG – lossless and raster-based, use for images that need crisp lines or text (but do not need to scale), need transparency, have few colours. There are PNG8, 24 and 32 – research the best to use for your specific case (see [this](http://www.patrickhansen.com/2011/02/04/png-8-24-32-what/) great article)

SVG – vector-based, use for flat line drawings, icons, logos that’ll scale to any size while file size remains small.

For some _heavy_ reading on JPG and PNG science, click [here](https://medium.freecodecamp.org/how-jpg-works-a4dbd2316f35) and [here](https://medium.com/@duhroach/how-png-works-f1174e3cc7b7). These articles blew my mind!

Choosing image format is only one step towards optimising images on the web. There are many, many other steps to consider, and so, so much to learn! I hope you feel brave enough to explore more corners of the image room – it’s courageous people like you who will pave the way for the excellent web experiences of the future ;)
