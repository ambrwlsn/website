---
title: Readable Code
number: 9
postdate: June 2018
---

There are so many books, articles, and videos about how to make code readable, so I'll keep this short and from my perspective (as a new developer who works mainly with JavaScript).

- **Code style** of your project. This is specific to each project and covers things like indentation, levels of nesting, naming, spacing etc. There are some nice tools to help with this - for example _ESLint_ that you can configure to auto-format your code to your specified style upon file save.

- **Structure**. This is about how you organise your code and files in a project. I have been taught the benefit of abstracting and modularising code, making it easier to tell what each part does and easier to test. In React, I've been writing components that are either presentational (how things look) or containers (how things work). Between different projects and programming languages, there are many, many ways to structure code well, and opinions tend to differ.

- **Commenting**. There are three ways I've been doing this - either in my CSS, or in one of two ways (single-line with `//` or the [JSDoc](http://usejsdoc.org/index.html) way) in my JS. The most important way to comment CSS is when _magic numbers_, i.e. seemingly random numbers that don't use pre-defined mixins or seem to relate to the rest of the code, are present. Leaving a note about these numbers can help other developers (or yourself a few months later) understand why the CSS is written that way. An important thing to remember when commenting JS code is that comments should state what the expected results of the code (e.g. a function) is, and not a description of what the code is doing.

- **Naming**. This is well-known as one of the hardest things in programming. But it pays off big time. It helps developers get as close a possible to the coveted _self-documenting code_ that doesn't need any comments (although I think no comments at all is probably a bad thing). I feel some developers keep function and variable names short in order to make their code look cleaner and keep file sizes small. However, on my latest project at work, without some of the really long and descriptive naming going on, I'd have a much harder time understanding the complex codebase.

These are the four areas around readable code that popped into my mind. There are definitely more, and there are _so_ many resources on this. Go check 'em out, and discuss them with people! I know I'll continue to do both those things for a long time to come.
