---
title: BEM
number: 1
postdate: May 2018
---

I keep getting tripped up at work by forgetting to write modular CSS classes. There are so many benefits to a robust CSS architecture that I really want to get it right. BEM is a methodology to achieve this. `Block`, `Element` and `Modifier`. A `Block` is a component or feature than can stand alone and is not dependent on any other code. It can be re-used anywhere. Next, an `Element`. This is always part of a `Block` and has no meaning on its own. Lastly, there is the `Modifier`. This changes the behaviour and/or appearance of a `Block` or `Element`.

Example:

**`.button`** is a block.

**`.button__label`** is an element.

**`.button--confirm`** is a modifier.

See resources [here](http://getbem.com/introduction/) and [here](https://zellwk.com/blog/css-architecture-1/).
