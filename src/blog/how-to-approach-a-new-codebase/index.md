---
title: How to Approach a New Codebase
date: "2021-02-25"
tags: [tips]
ogImage: 'how-to-code.png'
keywords: [amber wilson,web development,html,javascript,cv,frontend]
---

What is your approach for understanding a brand new (complex!) codebase, whether **open source** or **at a new job**? I posted this question in the form of a tweet earlier this month and got lots of honest and heartfelt answers from developers! In this blog post, I grouped the answers to help you learn **how to approach a new codebase**.

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">What is your approach for understanding a brand new (complex!) codebase, whether open source or at a new job? ⬇️</p>&mdash; Amber Wilson (@ambrwlsn90) - Tuesday February 2nd, 2021. <a href="https://twitter.com/ambrwlsn90/status/1356681219824644098?ref_src=twsrc%5Etfw">Original Tweet <span class="read-more-arrow">&nbsp;&#8594;</span></a>.</blockquote>

I want to give a huge thanks to everyone who participated in the above Twitter thread. I have not included handles or names, and have edited responses a little to give this post a consistent tone. Please let me know if you replied to the thread and wish to be credited or are unhappy with my edits.

## Contents

### Explore

- [Start from the top](#start-from-the-top)
- [You do not need to understand the whole codebase](#you-do-not-need-to-understand-the-whole-codebase)
- [Use the finished product yourself](#use-the-finished-product-yourself)
- [Run the code locally](#run-the-code-locally)
- [Ask questions](#ask-questions)
- [Pair program](#pair-program)
- [Read and write documentation](#read-and-write-documentation)
- [Take notes](#take-notes)

### Build

- [Fix bugs and debug code](#fix-bugs-and-debug-code)
- [Tests tests tests](#tests-tests-tests)
- [Watch logs and error messages](#watch-logs-and-error-messages)
- [Build features](#build-features)

### Step by step advice

- [Step by step advice](#step-by-step-advice)

### Humour helps

- [Funny stories](#funny-stories)

## Start from the top

- Sketch out the structure of a codebase and look through it with my team or the person I am replacing.

- I agree that a high-level conceptual overview first is a good idea.

- I start by drilling down to something specific. Not “what does this do”, but “how does this do 'X'?”.

- Find the highest level of interface, whether user interface (UI) or application programming interface (API), that a customer or end-user would use. View the user interaction as the top level of a feature, and drill down from there, taking it apart piece by piece, right down to the lowest level.

- Get a high level overview of a codebase, and then learn by example. This means solving a specific problem and using this to help understand a codebase. This also works for onboarding, especially for a complex project, where it is usually best to give a high-level introduction and then learn details doing the first story or ticket.

- I like to get an overview and then go straight to work on something small. This way, the unfamiliarity fades away. Then I either find I like the code or I don't.

- Maybe [emerge](https://github.com/glato/emerge) could help to visualise, inspect and understand structure, dependencies, and some common metrics in your codebase, if the language is supported.

- Set up meetings with people on the team to understand the architecture and what parts of the software are responsible for it. Then it’s usually best starting with a small task and over time taking bigger tasks. This way I gradually get an understanding of the codebase.

- I'm a consultant, so I have to do this at least once every 6-12 months. Learn *systems*, not codebases:
  1. How does the app work from the user's point of view? Ask this first.
  2. How is the application glued together? How does data flow in the context of the architecture?
  3. How does code go from my computer into production? Understanding the details of the code is much easier in context.

## You do not need to understand the whole codebase

- When I started my 1.5 year tour at Google a long while ago, it was the first place I'd ever worked where knowing the whole codebase was clearly impossible. Accepting that was liberating. Since then I haven't concerned myself with knowing a whole codebase and I'm better for it.

## Use the finished product yourself

- Use it. Like a user. Applies to APIs and libraries too. They all have a user interface.

- Browse through the live version to get an idea of what the application does. Sort of see it from the eyes of the users.

## Run the code locally

- Set up the codebase locally and get it to run.

- I try to make sure my environment, builds, and things like that work. I can't count the number of hours I wasted trying to do something, before realising I was missing some key part of the process. Simply going from cloning a repository to building and running the latest version locally gives you loads of good information.

## Ask questions

- Do not be afraid to ask questions.

- Ask people if you can't find the answer quickly. It's better to ask than to waste time.

- I ask someone who is familiar with the codebase to give me a big picture overview.

- Keep asking questions to the person who wrote the code, with increasing urgency as they get closer and closer to leaving.

## Pair program

- Pair programming is great for getting started with a codebase. We use this technique a lot at [@qumulo](https://twitter.com/qumulo) and it is a fast way to pick up a lot of details.

- Grab hold of the nearest experienced developer and make them pair program with you until they're sick of you! Seriously though, pair or mob programming is probably the best way to introduce anyone to a new codebase or team, regardless of skill levels or complexity!

## Read and write documentation

- Try to find internal documentation for certain domain knowledge. Unfortunately, good onboarding documentation for new joiners or new contributers to a codebase is often not readily available.

- Read the documentation, perhaps find a textbook explaining how to understand a codebase based on its tech stack, and try searching for answers on Stack Overflow.

- Writing the often missing documentation is a great way to learn and a good excuse to talk people and ask questions.

- Good documentation and a code editor with the ability to jump to method definitions is essential I think. That's the number one thing that helps, for me at least.

- Read the docs if available.

## Take notes

- Take notes on everything, in whatever form works for you. You WILL forget things. That's okay and expected.

-  Ask questions and takes notes as much as possible.

## Fix bugs and debug code

- Go <dfn>spelunking</dfn> (a term used to describe exploring a cave) in order to find bugs. Reading code or documentation in isolation does not help me to <dfn>grok</dfn> (understand) a codebase, but contributing to the codebase does.

- Look at a REST endpoint then follow it to the actual data or action. Add breakpoints to debug the code bit by bit. You can add breakpoints to code within your chosen code editor or inside a browser's developer tools.

- Add a small cosmetic change somewhere - extra logging, some debug output in the user interface for example. In trying to make those kinds of changes you often learn a lot.

- Find a simple bug to fix: reproduce it, look in the code to find the call stack that leads to it. Timebox this! Don't worry if you get lost. If you are lost, ask someone who has knowledge of the codebase.

- Run the debugger with some breakpoints. Observe what's going on.

- I've been fascinated by how people use incidents as pulling back curtains on specific facets of how things are supposed to work.

- Most of the tickets for new hires should be bugs. Maybe the occasional copy change – something small like changing the default order of a list to be 'creation time' rather than 'alphabetical'.

## Tests tests tests

- This may sound aspirational, but get the project up and running and run tests.

- I expect there to be well-documented tests and overall workflow.

- Focus on parts of the system needed for a certain feature and discover things through tests and static analysis. 

- Look at the tests; hopefully they exist.

- Start with test cases.

- Hands down my preferred approach is to start writing tests for a codebase, or if it already has unit tests, find what area is under tested.

- Writing user interface tests, for example using Cypress and API mocking.

- Changing or adding some tests can help you understand how things work.

- In practice, almost everybody has to work on codebases they don't fully <dfn>grok</dfn> (understand). I forget parts I haven't touched in a while, so that's why it pays off to invest in practices enabling people to understand a codebase quickly. These practices involve good tests, good continuous integration/delivery, and ultimately good observability in production too.

## Watch logs and error messages

- If I’m trying to work out what to [grep](https://en.wikipedia.org/wiki/Grep) for, looking at logs or error messages is often helpful. For example, passing random input to a service will spit out a stack trace and an error message as it fails to parse whatever you sent, and that can be pretty revealing.

## Build features

- Dig in to wherever there are actual changes to be made, and give yourself time to learn from there.

- Splitting up a code base into smaller, self-contained pieces works especially well for Open Source. It makes one-time contributions easier by minimising the required mental overhead.

- I focus on understanding the bits I need to work on. Whether it is a bug or feature I’ve been assigned to, and I skip the rest. 95% of the time, a good choice of [grep](https://en.wikipedia.org/wiki/Grep) will help me find the files I want, and I work things out from there.

## Step by step advice

- From experience, it takes time to learn the different components of a codebase, especially ones that are large and complex. Learning comes from working on different features or components, reading documentation, and asking lots of questions.

- I recently started a new job at a company with a HUGE and very complicated codebase, for an enterprise software suite. Here's what has helped me: 
  1. Find a mentor who is familiar with the code, able to explain clearly, and whose communication style matches yours.
  2. Get a 10,000 foot overview of the codebase from your mentor: what products the projects or solutions correspond to, any external dependencies on 3rd party libs or apps, a high-level dependency tree, what projects are most relevant to you at this time. Your mentor can hopefully point you in the right direction.
  3. If you don't know where to start or what you're going to be working on, ask! When you start a new job or project, this is the time to ask questions. Ask who the best person is to talk to about each framework.
  4. Ask about the development process for the area, project, or team you're working on. What's the workflow for issues? Who will code review your stuff? Who will test it? What things need to be checked off to call the issue done. Does this involve development testing notes, pull requests or merges, documentation, etc?

- As usual, I feel like my answer leaves people pretty unsatisfied. 
  You won't get a handle on a codebase quickly. You can start to understand certain parts and let the rest unfold over time. 
  
  Whenever I talk to people about where questions like this come from, it often one of two things. "I feel like I want to learn this skill" and/or "I feel like I need to learn everything quickly in order to be productive". That second one is the challenge. I don't think the second one should be as big a concern as people make it out to be. 
  
  You can contribute without learning the whole codebase. And contributing something that actually ships is the best way to learn a codebase over time. For the first couple of months, I just focus on the thing I want to build. I ask people "where should I put this module?". More importantly, I ask them why they chose that location. Every time I ask, I get another piece of the puzzle on why the codebase is the way it is.
  
  There are lots of skills and tactics we can and should pick up as developers. For example, you can pick a feature you understand and then trace how it works. Find all the files that enable it and learn why they are in that location. Most importantly, I wish people would feel less pressure to know a whole codebase in-depth. 
  
  I've been at my current job for 2 years and I haven't seen everything. I'll learn about a new area when I'm doing something that gives me a reason to learn it. And that's totally okay. To be clear, what I'm saying is that knowing the codebase won't help you with fixing incidents as much as you think. When something is broken, it's usually not code. And if it is, roll it back and look closer at it later. There are a lot of assumptions here. Like having easy, push-button rollbacks. If you don't have that, then start fighting with whoever you need to in order to get it.

- Resource one: [Highly-recommended presentation on how to read other people's code](https://patricia.no/2018/09/19/reading_other_peoples_code.html)

- Resource two: [Reddit comment on how to approach a codebase](https://www.reddit.com/r/learnpython/comments/gjygza/completed_a_full_python_bootcamp_and_yet_unable/fqow93k/)


## Funny stories

Being a developer can be hard work. At least we can laugh about it with our fellow developers though, right? <span aria-hidden="true">&#128513;</span>

- Surprised no one has said “Build a feature using it, then have that feature burn to the ground at 2am.” Because as far as I know, that is most people’s approach.

- Panic, become convinced that the person who wrote this was a million times smarter than me, question my choice of profession, wonder how long it will take them to fire me if I can figure this out. Find someone to ask a question, lightbulb moment. All is well with the world again.

- One exercise I like is digging for the longest code block that nobody else has dared refactor, so it has survived for a long time. I start asking people about it because I know it’s going to be a mess compared to the rest of the codebase. Everyone will give different answers.


