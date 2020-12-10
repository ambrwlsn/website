---
title: Make Your Own Dev Tool
date: '2020-08-19'
imageSrc: "/img/lego-press.jpg"
imageAlt: "Lego piece pressed like a button by Caleb Angel"
imageAuthor: "Caleb Angel"
imageLink: "https://unsplash.com/@calebeangel"
keywords:
  [
    amber wilson,
    html,
    bookmarklets,
    favelets,
    software engineering,
    web development,
    dev tools,
    coding,
    browser,
    learning,
    devtips,
    javascript]
tags: [browser, create]
excerpt: I have just found out what bookmarklets (aka favelets - a term coined by my friend Tantek back in the early 2000s) are and I like 'em! So what are they? 
---

<img class="blog-image" src="img/lego-press.jpg" alt="a child playing with lego" />

## Bookmarklets - a cool personal dev tool

I have just found out what **bookmarklets** (aka **favelets** - a term coined by my friend [Tantek](http://tantek.com/) back in the early 2000s) are and I like 'em! So what are they? 

Bookmarklets run a JavaScript (JS) script against the DOM of the current document loaded in the browser. They allow a way to alter the DOM at the press of a button. They may not offer all that a browser extension or add-on can, but they can still be super handy, and also do not require downloading or installation of software.

What's a nice example of a bookmarklet? Here is a [nice accessibility bookmarklet called Tota11y](https://khan.github.io/tota11y/) to try out! Thanks to [Jeremy](https://adactio.com) for showing me this one <span role="img" aria-label="thumbs up">👍</span>

How can a bookmarklet like Tota11y be used? First, the bookmarklet's link needs to either be saved as a bookmark, dragged into the browser's bookmark toolbar, or be available to be clicked on a web page (used as a normal link within an `href` attribute in an `<a>` element). Second, while on a valid website, the bookmark containing the bookmarklet link should be clicked to run the bookmarklet's code.

## How bookmarklets work

First you should know (or be reminded) that in a browser, bookmarks are made up of URIs (uniform resource identifiers). Each URI consists of a protocol such as `http:`, `https:`, `file:`, etc., which is followed by a string. An example is `https://cat-bounce.com/`. The `https:` is the protocol, and the string is the domain.

There is also a `javascript:` protocol. The browser treats this protocol and its following string just like a JS  application. When visiting a link that is using this JS protocol, the JS code it contains is executed. If such a link is bookmarked, it is called a bookmarklet! 

Something to note is that a link usually works by sending the user to a new page. To prevent a bookmarklet from triggering a page reload, the JS code that makes up the bookmarklet should return an undefined type. To do this, an anonymous, self-executing function can be used (i.e. one that does not return a value, doesn't have a name, and executes immediately).

The Tota11y bookmarklet example has a link that points to a hosted JS file. This is because the link would be pretty messy if all the JS code was included as a single string within it. Below is what the Tota11y bookmarklet's link (in a beautifed format for readability) looks like:

```js
javascript:
  (function()
    {
      var tota11y=document.createElement('SCRIPT');
      tota11y.type='text/javascript';
      tota11y.src='https://khan.github.io/tota11y/dist/tota11y.min.js';
      document.getElementsByTagName('head')[0].appendChild(tota11y);
    }
  )();
```

In order for a bookmarklet to point to a hosted JS file, its URI needs to contain a few things. At the very least,it should create a new script element, make this element's source (src) the hosted JS file, and then append this script to the head of the document.

## Making your own bookmarklet

I tried making a bookmarklet and found it was really easy to get started.

I decided that I'd try something really simple that does not use a hosted JS file, but contains all the JS code in one line. So I made a bookmarklet to put a red border around each paragraph on a page. Here's what it looks like:

```js
javascript: 
(function(){
    let paragraphs = document.getElementsByTagName('p');
    for (let i=0; i < paragraphs.length; i++){
      paragraphs[i].style.border = '3px solid red';
    }
  })();
``` 

As mentioned in the previous section, "How bookmarklets work", a bookmarklet can be made available to use as a link. To do this, the bookmarket's URI is placed inside the `href` attribute of an `<a>` element, that can then be dragged into bookmarks or the bookmark toolbar. 

If you like, try either clicking the following link, or drag it into your bookmarks and click on the resulting bookmarklet (refresh the page to remove the effects)!

<a href="javascript:(function(){let paragraphs=document.getElementsByTagName('p');for(let i=0;i < paragraphs.length;i++){paragraphs[i].style.border='3px solid red';}})();">Paragraph border maker</a>

Here is the code that makes up the above link:

```html
<a href="javascript:(function(){let paragraphs=document.getElementsByTagName('p');for(let i=0;i < paragraphs.length;i++){paragraphs[i].style.border='3px solid red';}})();">
  Paragraph border maker
</a>
```

## Some things to note

A browser will automatically encode any characters within a URI that it does not understand (such as quotation marks, spaces etc.) so that a bookmarklet can run smoothly.

As bookmarklets contain JS, there are security concerns to be aware of when using bookmarklets created by others. However, making a few of your own bookmarklets for personal use, or using ones that have been shown to be trustworthy, is fine. More than fine - it's great!

Why are bookmarklets so great? You can make a separate folder for your bookmarklets within your bookmarks folder. Then you can place this bookmarklets folder in your bookmark toolbar for your own list of easy-access, personal dev tools.

Sometimes browsers may cache bookmarklet code, so changes made after it is added won't show up.

Check out this [nice video on bookmarklets (Chrome-focused)](https://www.youtube.com/watch?v=DloHqUfPbJc) that covers what I have written about in the "Making your own bookmarklet" section.

I am completely new to bookmarklets so I may not have covered every essential thing regarding them. I really found them super easy and nice to get started on though. As usual I learn more about them as I keep trying them out!

