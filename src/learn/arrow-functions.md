---
title: Arrow Functions
number: 2
postdate: May 2018
---

Also known as a fat arrow, `=>`. This ES6 feature is a fat topic, so I'll concentrate on one aspect today.

```jsx
var elements = ['Hydrogen', 'Helium', 'Lithium', 'Beryllium']

elements.map(function(element) {
  return element.length
})(
  elements.map(element => {
    return element.length
  })
)(elements.map(element => element.length))(elements.map(({ length }) => length))
```

Above is an altered version of the [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) JavaScript Demo, where you will find a wealth of information on what fat arrows can do for you. The first function in the list is written without fat arrows. The last three functions are variations of the first function, showing how fat arrows can be used to write shorter function expressions, and therefore less code. You will need a code compiler like [Babel](https://babeljs.io/) to compile fat arrows into ES5 syntax so older browsers can use your JavaScript.

There are a _lot_ of resources that try explaining this syntax. Try Wes Bos's [introduction](https://wesbos.com/arrow-functions/) for a start. This is complicated subject matter, though, so I suggest searching around for different posts, reading a few and finding ones that make most sense to you.
