---
title: Debugging
number: 8
postdate: June 2018
---

Recently at work, I've watched other developers use `console.log` a lot in code to find desired values given by certain functions. I am often still confused where to put `console.log`, and it is definitely not the only way to debug, so I've also begun to use the developer tools JavaScript debugger in Firefox and Chrome. These tools allow you to pause the execution of your code, and walk through it to help you find bugs.

The debugger can do a lot, and it'd take a much longer post to walk through this tool's UI, so I'll mention four of the most commonly used debugging methods here.

- **Step over code**

  - Steps over a function that doesn't contain a bug and runs its code

- **Step into code**

  - Steps inside a function and allows you to run each part separately

- **Step out of code**

  - Steps out of a function you are inside, and runs its code

- **Resume execution of code**

Debugging is something developers have to be really good at. So don't be scared to do it! Or, be scared but do it anyway, you'll get better :)

Check out the docs on the [Firefox](https://developer.mozilla.org/en-US/docs/Tools/Debugger) debugger and the [Chrome](https://developers.google.com/web/tools/chrome-devtools/javascript/reference#breakpoints) debugger. Lots of great info there to help you get started. Also check out [this article](https://peterlyons.com/js-debug) from Peter Lyons. He explains debugging of both front-end and back-end JavaScript code.

Also, check [this](https://daverupert.com/2018/05/my-struggle-with-testing-code/) out - an honest post about how even experienced devs find it hard to debug.
