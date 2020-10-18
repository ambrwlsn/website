---
title: Can You Code A Design?
date: "2018-10-31"
keywords: [amber wilson, javascript, software engineering, web development, coding, design,communication, communicate, documentation, document]
tags: [design, dev tips]
---

If you said "YES", how exciting! Well done, you :-) *But wait*... it's not always a bed of roses. If you've already developed a real web page from a design, maybe you'll nod along to some of the points I have made below. The past two weeks, I’ve learned loads from building a static page using Gatsby (React) and SCSS (in this case CSS Modules, although I'd have been partial to some Styled Components). React and SCSS get on pretty well from what I have seen. And static site generators like Gatsby help you set them up to work together. The configuration is the hardest part. Once you're past that, developing with these two is a breeze. *But wait*... is it?

In short, this post is all about **things I’ve learned from building a page from a design (so far - I am only 2 weeks in - [part two](/blog/can-you-code-a-design-part-two) of this post will come once I wrap the project up)** ✏️ 💻

So, **here is my two-weeks worth of advice**:

*   GET STANDARDS IN REALLY QUICKLY. By this, I mean that if you're a developer, sit down with the other developers working on the project, and the designers. If you are a designer, sit with the developers working on the project and the other designers. Once you're all sat down on nice seats, talk about all the good stuff like margins, paddings, deploy host, font-sizes, unit testing library, font-weights, colours, responsive behaviour, commit hooks, maximum-widths, content, naming things, linting, and where to all sit for lunch together to help strengthen your bond, etc.

*   Related to the above suggestion is COMMUNICATE WITH YOUR TEAM FROM THE BEGINNING. In fact, be each others' new best friends. This will help get your project off to the best possible start. Like nurturing a newborn baby, input and support from each other will help reduce individual stress and help you all raise something really great. Chances are high that everyone on the team would really, really love to do a good job on the project. To achieve this, please don't hesitate to reach out and talk to each other.

*   Back to point one for a minute. SET UP GLOBAL CSS STYLES and put them in a neat, tidy place. For the project I am working on, this meant getting stuck into a sass folder and setting up a few important files. For example - _constant_ values such as media query breakpoints, colours, font families/sizing and spacings, and _functions_ to plug these into and use with terrific _mixins_ that can be set free throughout your site to work their magic.

*   AVOID TECHNICAL DEBT. After a couple of weeks developing a design that was ever-changing, myself and another developer built up a shiny mountain of it. For a few moments, I became certain that if the designers had simply given us a solid, unchanging design from the beginning, we'd have done a better job. Then, I remembered that this isn't exactly the most agile idea. Waterfalls are old news. So, my developer friend and I decided that a great compromise would be to take design iteration #1 as our template and finish developing it. Then, the design would be free to change and mature, ready to be iterated on in round two of development. This way, tiny design changes would hold us back much less.

*   DAILY STANDUPS. Try to have these at a set time, or at least try to have impromptu meetings (as many as you want) with people you should be communicating design and development decisions to and with. Again, this is really important to the health of the project. If you're hesitant to communicate with other people in your team, the chances are that they are too and just wish you'd approach them so they don't have to do do the scary thing and approach you.

*   GET CODE REVIEWS FROM ALL DEVELOPERS, and I mean all developers company-wide, not only those assigned to the project. Why? This has several benefits. It helps you to increase your company's [bus factor](https://medium.com/tech-tajawal/the-bus-factor-6ea1a3ede6bd), i.e. it gives a higher chance of someone being able to pick up development tasks on the project if all assigned developers are away for whatever reason. It increases individual developer competency. Also, developers who don't have their heads stuck in the project code all day every day tend to be better at spotting things and having ideas that the assigned developers did not.

*   Related to the above suggestion is DOCUMENT ALL YOUR THINGS. This means commenting any CSS that is not obvious at first glance, commenting JavaScript functions, keeping the project readme up-to-date, shiny and fabulous. Maybe then a developer who had never seen any of the code would be able to look at the code and feel comfortable and confident about contributing within a small amount of time. Confused developers tend to be stressed, too, and this doesn't benefit anyone or anything. Writing documentation takes time and slows down development tasks, but remember this - _you_ will actually ferociously thank _yourself_ a few weeks down the line when you look back at something _you_ wrote, while slowly tilting your head to the side while thinking how that code could _possibly_ have gotten there.

You can apply all, any or none of the above suggestions, plus any others that you find. All of them will require some effort, and definitely some extra time. How much effort is the outcome of your project, and the stress levels of those involved, worth? 😉

See this post on Medium [here](https://medium.com/@ambrwlsn90/can-you-code-a-design-4d1e9f07795c).