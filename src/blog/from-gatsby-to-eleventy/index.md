---
title: From Gatsby to Eleventy
date: "2020-11-20"
tags: [static-site-generation]
keywords: [amber wilson, software engineering, web development, performance, accessibility, gatsby, eleventy, static site, static site generator, javascript, html]
---

In this post I'll compare my experience building my personal blogging site (the one you're on now) with two static site generators (SSGs) - Gatsby and Eleventy.

The first version of my site was rolled out with Bootstrap CSS and no framework, the second and third used SCSS and again no framework. The fourth version was built with a popular <a href="https://www.gatsbyjs.com/">static site generator (SSG) called Gatsby</a>. This SSG uses React and GraphQL. My learning curve from using no framework to using Gatsby was not huge though, as I use React and GraphQL at work.

The fifth, and at the time of publishing this post, current, version of this site uses a <a href="https://www.11ty.dev/">static site generator called Eleventy</a>. I was a bit daunted about using this SSG, because the tools I was used to working with all day weren't baked in. This meant no default React, or GraphQL. This SSG would be a new paradigm for me to learn from scratch. I'd have to pick a templating language I had never used before, and learn how Eleventy manages data. Even so, there were a number of reasons I wanted to move from Gatsby to Eleventy.

Firstly, I'll summarise the reasons that I decided to use Gatsby in the first place. It lets people write React, takes care of a lot of performance concerns for you, and has a lot of good starter templates. So, it's excellent for getting started quickly, getting a reasonably good site created, and offers a good developer experience. This was a big pull for me, in addition to all the hype it was creating a few years ago, and the fact I could already use its baked-in tools. Also, the fact I could have my very own, nice and shiny single page app (SPA) was a plus for me, at the time.

Gatsby sounds really good, so why did I move to Eleventy? This is a question I've put a lot of thought in to. First, I want to explain that I didn't add any new features to the site between the Gatsby and Eleventy versions. The only thing that changed is that now, all the <a href="/learn">learn posts</a> have their own page, instead of existing on one page.

<div class="heading-wrapper">
    <h2 id="benefits-gained">
        Benefits Gained
    </h2>
    <a aria-label="link to this heading" aria-describedby="benefits-gained" class="anchor-link" href="#benefits-gained"></a>
</div>

- As my Eleventy site outputs a non-SPA, I didn't need to check or ensure that it is server-rendered, is able to be crawled by search engines to allow good search engine optimisation (SEO), or works without JavaScript. Non-SPAs do all of this by default.
- A number of Gatsby plugins stopped some of the functionality on my site working. For example, Gatsby's progressive web app plugin caused my server-side rendering to stop working.
- My site is a personal blog site that does not have thousands of users or masses of data. So, I don't need to make sure I'm saving on bandwidth or server resources. If I <strong>did</strong> need that, I would consider creating a SPA, as they tend to request fewer server resources across page views, compared to non-SPAs.
- I don't need to force users to download large chunks of React library in their browsers. Gatsby by default forces this, and requires a plugin to ensure that React is only used on the server.
- I didn't need to bother code-splitting any React components to ensure users aren't downloading my whole site on initial page load.
- I was able to gain more control over performance optimisations such as image rendering. When I first released my Gatsby site, I used their image plugin but ended up disliking several things about it, such as styling inflexibility, and inability to use the `<picture>` element.
- I know enough about web development that I can write performant code on my own. Therefore, I can do without plugins that enhance performance, but don't make it clear how they do so. Also, I prefer using my own skills to create things wherever possible, as it teaches me how things really work.
- I could pick and choose what JavaScript is necessary in the client (browser), thereby limiting the size of the JavaScript a user needs to download. The only JavaScript my site needs on the client-side is for the dark mode toggle, the blog search input, a tiny (and privacy-first) analytics tool, and some linked data (JSON-LD) for SEO.
- By writing lower-level template code (Nunjucks vs JSX), I felt like I had more control over the generated code, which allowed me to output better and more consistent HTML.
- Gatsby has GraphQL baked in. For a lot of use cases, especially a personal blog site, GraphQL is overpowered and can be a large learning curve for some.

<div class="heading-wrapper">
    <h2 id="challenges-faced">
        Challenges Faced
    </h2>
    <a aria-label="link to this heading" aria-describedby="challenges-faced" class="anchor-link" href="#challenges-faced"></a>
</div>

- Eleventy is newer and maintained by less people than Gatsby. Therefore, I felt that Eleventy is a bit less feature-rich and has less documentation. Although honestly, this isn't a huge deal. Firstly, I found Eleventy simpler to use (less abstract), and found the documentation covers all the most important aspects of the SSG. Secondly, almost any time I needed extra help or information, I found it in the form of excellent blog posts or example repositories created by other web developers.
- One of the very few issues I couldn't find help with was the sharing of one type of data (blog post excerpts) across my Eleventy-powered site. Gatsby, along with React, makes it easy to see what data is being shared and how. Eleventy has a fantastic data-sharing API (in my case the data sharing was orchestrated between Nunjucks and the Eleventy config file). However, I found it to be quite abstracted and struggled a lot trying to get my blog post excerpt data to be easily shared across pages. In the end, I created a workaround for this, but this workaround is quite hacky. I plan to write about it in a separate post.
- I had to learn how to use the Nunjucks templating language. This is only a small nitpick, as the learning curve was in no way steep.

<div class="heading-wrapper">
    <h2 id="concluding-thoughts">
        Concluding Thoughts
    </h2>
    <a aria-label="link to this heading" aria-describedby="concluding-thoughts" class="anchor-link" href="#concluding-thoughts"></a>
</div>

Using Gatsby has taught me a lot about single page apps, and that's important! Sometimes using it was frustrating, and a few things broke without me realising why or even when, but these experiences can be good lessons. Also, I am employed to work on a large SPA, and probably will continue to work on SPAs professionally for years to come, so any experience working with them is good!

I believe it is a good idea to use the <a href="https://adactio.com/journal/14327">least-powerful technology possible for any given task</a>. Building with Eleventy made this possible for me. I find React and GraphQL nice to use, and I was daunted at the thought of not being able to use JSX. But, using simpler and lower-level tools such as Nunjucks made me feel more confident about my site's output (robust HTML and the least JavaScript possible), and I enjoyed the experience much more than I thought I would.

Please don't take what I've written here as a reason not to choose Gatsby over Eleventy. I chose to re-write my site in Eleventy for several reasons. I have the knowledge to build in performance and accessibility myself, I realised I didn't need an SPA for my use case, and I wanted to use simpler, less powerful developer tools. I think developers should use the tools that suit them best. There is only one thing I want to encourage you to do: no matter what tools you use, please pay attention to your site or app's final output! It's never a good idea to make users pay for your technology choices.
