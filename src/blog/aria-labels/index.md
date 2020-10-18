---
title: ARIA labels
date: '2020-02-14'
keywords:
  [
    amber wilson,
    html,
    software engineering,
    web development,
    coding,
    accessibility,
  ]
tags: [accessibility, dev tips, advice]
---

Recently, I've been chatting about accessibility with two of the biggest experts on the subject. Also, the web developers I work with at [N26](https://n26.com/en-eu) take accessibility very seriously. This got me interested enough to read some blog posts on the subject. Many of these posts mentioned 'landmark roles' - one of which is 'navigation'. The navigation landmark is for identifying groups of links that help users navigate around a site, or within a page. You can give an HTML element a role of navigation (please see code block below):

```html
<div role="navigation" aria-label="Main navigation">
  <!-- list of links -->
</div>
```

However, the `nav` element in HTML is automatically assigned `role = navigation`, making it the best element for creating navigation sections. It is always best to use native, semantic HTML elements where possible, to avoid writing too much `ARIA`.

For developing the N26 web app, we use [agnostic axe](https://github.com/juliettepretot/agnostic-axe) to warn us when accessibility is not up to scratch. In my console, it notified me of the following:

```markdown
New aXe issues
moderate: Ensures landmarks are unique https://dequeuniversity.com/rules/axe/3.5/landmark-unique?application=axeAPI
Element: <nav>​…​</nav>​
```

I knew from my reading that this warning came from having two `nav` elements (i.e. two elements with `role=navigation`) on the same page. The `nav` elements need to be distinguished from each other in some way. This is where `aria-label` and `aria-labelledby` come in.

My first attempt at a fix involved using `aria-label` (please see code block below):

```html
<nav aria-label="Text describing the purpose this navigation">​…</nav>
<nav aria-label="Text describing the purpose this navigation">​…</nav>
```

Whatever value is given to `aria-label` will be accessible to screen reader users, making it much easier to understand a HTML page's structure and purpose. The labels should provide a concise description of what each navigation element contains.

After using `aria-label`, the warning was gone from my console! Was I all done? I could have been. However, I soon learned something else. Some translation systems (e.g. Google translate) might not translate the value of `aria-label`. Luckily, there is a way around this (please see code block below):

```html
<nav aria-labelledby="main-navigation">
  <h2 id="main-navigation">
    Text describing the purpose this navigation
  </h2>
</nav>
<nav aria-labelledby="secondary-navigation">
  <h2 id="secondary-navigation">
    Text describing the purpose this navigation
  </h2>
</nav>
```

Here, an `aria-labelledby` value of a `nav` matches the `id` value of an `h2`. The `h2` contains human-readable text. It is this text that will be accessible to screen reader users. The element containing this text can also be a hidden element which exists purely for screen readers. In this case, the hidden element of course still needs text content. This method has an advantage over `aria-label` in that the human-readable content is contained in a text node rather than an attribute. Text nodes are easier for some translation systems to access. See Heydon's [post](https://heydonworks.com/article/aria-label-is-a-xenophobe/) for more information.

I learned all of this today and I am very grateful for the knowledge. Now I know it, I'll be able to apply it wherever needed in my HTML.

For more information on the `nav` element, see this [post](http://html5doctor.com/nav-element/) from html5 doctor.
