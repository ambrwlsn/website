---
title: Accessible Link Text
number: 22
postdate: November 2020
---

I use a bookmarklet tool called <a href="https://khan.github.io/tota11y/">tota11y</a>, which gives me a quick overview of my site's accessibility. On my site's homepage, the tool flagged not one, but SIX inaccessible links. Woops!

There are over 20 links on the homepage. The inaccessible ones were the link to the homepage, GitHub, Twitter, LinkedIn, the learn page, and about page. The first four links simply had no text between the opening and closing `<a>` tags, only an image. So, I added a `title` attribute to them, whose value describes the purpose of the link. For example, I added `title="homepage"` to the homepage link.

I was a bit confused why the 'learn' and 'about' navigation links were flagged as inaccessible. Firstly, they had text between the opening and closing `<a>` tags, and secondly the other four navigation links were not flagged. I tried adding a `title` attribute value but this did not help. This is because screen readers will first read out the text within the `<a>` tags, and only if there is no text there, will the value in the `title` attribute be read out.

To make the 'learn' and 'about' links accessible, I could have added a hidden `<span>` next to the existing text that would be invisible in the UI, but would be read out by a screen reader. However, there is another way. The `aria-label` attribute can be added on a link. Its value is read out by the screen reader. For example, for my 'about' link, I could have added `aria-label="more information about me"`.

<strong>Note:</strong> please <a href="/blog/aria-labels/">see this post</a> for the important difference between `aria-label` and `aria-labelledby` (hint: `aria-label` values are not always easy for translation systems to access).

When trying a screen reader (in this case I used VoiceOver on Chrome), I realised that the navigation links sounded a little inconsistent. Some had the single word between the `<a>` tags read out, and the 'learn' and 'about' links had the `aria-label` values read out instead. 

I could have added `aria-label` values to all the navigation links. For example, adding `aria-label="a selection of my projects"` to the 'projects' link. 

<figure>
  <img src="../img/accessible-link-text.png" alt="A screenshot of screen reader announcing the aria-label of the 'projects' link">
  <figcaption>
    A screenshot of screen reader announcing the aria-label of the 'projects' link
  </figcaption>
</figure>

I could have also left the `aria-label` attribute out. After all, the text within the `<a>` tags would still be read out by a screen reader, and users who can both see the link text and use a screen reader at the same time would not see and hear two different values.

Whatever you or your team decide is right in situations like this, a great rule to remember is <strong>once you decide to implement something, at least make it consistent across your site</strong>. This helps screen reader users to be less confused and uncertain.



