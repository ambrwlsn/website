---
title: indexOf
number: 16
postdate: June 2019
---

`indexOf()` is a handy little JavaScript method that returns the **first** index (position) of an item within an array or a string. For example:

Array -

```js
const catStory = ['The', 'Cat', 'Is', 'Good', 'The', 'Cat', 'Is', 'Fluffy']
const firstCatOccurrence = 'Cat'

const firstCatPosition = catStory.indexOf(firstCatOccurrence)

console.log(firstCatPosition) // 1
```

Notes:

- `indexOf()` is case sensitive. Searching for 'cat' will return -1.
- Numbers can be searched as well, e.g. [1, 2, 3]

Or:

String -

```js
const catStory = 'Pickles the cat slept in twelve different places today'
const catOccurrence = 'cat'

const catPosition = catStory.indexOf(catOccurrence)

console.log(catPosition) // 12
```

If an occurrence is not found, `-1` will be returned. This is because the `indexOf()` method was written a long time ago, and back then it was thought of as sensible to always return a number. Methods such as `match()` and `includes()` were written later and return `null` and `false` when no occurrence is found. Therefore, to check whether an occurrence exists in your string (or array):

```js
'Kitty Litter'.indexOf('Lit') !== -1 // true
'Kitty Litter'.indexOf('Kittty') !== -1 // false
```

See more from MDN about `String.prototype.indexOf()`
[here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) and `Array.prototype.indexOf()`
[here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf).
