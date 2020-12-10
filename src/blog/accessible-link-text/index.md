---
title: Accessible Link Text
date: "2020-11-05"
tags: [accessibility]
keywords: [amber wilson,software engineering,web development,coding,links,screen reader,html,dev-tips]
---

I use a bookmarklet tool called <a href="https://khan.github.io/tota11y/">Tota11y</a>, which gives me a quick overview of my site's accessibility. I opened it on my site's homepage and clicked "link text". The tool flagged not one, but SIX inaccessible links. Woops!

The homepage, GitHub, Twitter, and LinkedIn links were all flagged for the same reason. There was no text between their opening and closing `<a>` tags, only an SVG. Even though the tool flagged these links, I didn't have to change anything. This is because each SVG already had a `<title>` element, paired with a `<description>` element to aid accessibility. A screen reader will read out the values of the title and description elements. 

I was a bit confused why the 'learn' and 'about' navigation links were flagged, so I checked Tota11y's source code. <a href="https://github.com/Khan/tota11y/blob/master/plugins/link-text/index.js#L34-L37">The words 'learn' and 'about' are listed as stop words</a>. I believe these words are singled out because they can be used alone or out of context. However, I think that both words make sense in my navigation bar. So, I ignored the warning.

I was happy that I didn't have to add any new code in order to make the six flagged links accessible! If an accessibility audit flags any links on your site, and you determine that they are in fact inaccessible, there are a few things you can do.

One method is to add a `<span>` next to the existing text that is hidden (<a href="https://hugogiraudel.com/2016/10/13/css-hide-and-seek/">this post describes a method for visually hiding text  using CSS</a>). This would make the text invisible in the UI, but a screen reader would still read it out. 

Another similar method is to add more descriptive (non-hidden) text to links, just as I have done for the link in the previous paragraph.

The most common method is probably the `aria-label` attribute. This is popular because the value of this attribute is read out by a screen reader even if the link already has text. For example, for my 'project' link, I could have added `aria-label="a selection of my projects"`.

<figure>
  <img src="img/accessible-link-text.png" alt="A screenshot of the VoiceOver for Chrome screen reader announcing the aria-label of the 'projects' link">
  <figcaption>
    A screenshot of the VoiceOver for Chrome screen reader announcing the aria-label of the 'projects' link
  </figcaption>
</figure>

<strong>Note 1 of 2:</strong> please <a href="/blog/aria-labels/">see this post on aria labels</a> for the important difference between `aria-label` and `aria-labelledby` (hint: `aria-label` values are not always easy for translation systems to access).

<strong>Note 2 of 2:</strong> try to use a variety of accessibility tools to audit your web pages. It isn't possible to catch all accessibility issues with one tool. It's also probably not possible to catch all issues with ten of them. Manual testing is highly recommended! By that I mean using a screen reader and keyboard to tab around your web pages.

## More resources

- https://webaim.org/techniques/hypertext/
- https://www.w3.org/WAI/WCAG21/Techniques/aria/ARIA8
- https://www.washington.edu/accessibility/links/
  


