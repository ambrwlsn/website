---
title: Array Prototype Methods
number: 15
postdate: "2018-07-30"
---

`Array.prototype` methods are super useful for transforming array data and cover a lot of common needs in modern applications! They are a form of higher-order function (HOC), which are functions that take another function as their argument, or return one as a result. A good way to view functions is as values, because then it's easier to imagine being able to pass them around. For me, they've been a great introduction into the world of functional programming. In functional programming, the functions you create are _pure_, i.e. they have no side effects, rely on the input you give them, and will always produce the same output given the same input.

So, I use array methods more and more at work and they are definitely a pleasure to work with! There are quite a lot of them (I think around 50), but there are some more frequently used ones that cover most use cases, such as `sort()`, `map()`, `filter()`, and `reduce()`. I was inspired to write about them after reading [this](https://hackernoon.com/a-quick-introduction-to-functional-javascript-7e6fe520e7fa) post by [Angelos Chalaris](https://twitter.com/chalarangelo)! Please check out his post because there are _great_ examples & explanations in there!

Of course, since I like them so much, I wanted to give an example here. The one I used most at work is `map()` but I didn't choose it because I gave an example of it in [Day 2](./learn#ArrowFunctions) :) As a side note, if you look carefully at the example in Day 2's lesson, you'll see how the elements array takes the map function, which in turn takes a function as its input, and returns a value based on the input. Below, I decided to create an example of `reduce()`.

```js
const initialCatRating = [10, 10, 10]
const accurateCatRating = initialCatRating.reduce((total, amount) => {
  total.push(amount * 2)
  return total
}, [])

accurateCatRating // [20, 20, 20]
```

This example shows one of the **many** things reduce can do - alter values in an array, and push the altered values into a new array! This means a brand new array is returned, rather than altering the initial array. Let me explain what's happening:

There is an `initialCatRating` variable, which shows ratings of cats out of ten. In the `accurateCatRating` variable, `reduce()` is called on `initialCatRating`.

The first argument in `reduce()` is a callback function (see this in <span class="text__highlight">pink</span> above). The callback takes at least two and up to four arguments (`accumulator, currentValue, currentIndex, array`). The above example has taken two - `total` and `amount`, which are actually `accumulator` and `currentValue`. Naming doesn't matter here, but order does.

The second argument in `reduce()` is `initialValue`, which is optional. In the above example, `initialValue` is an empty array. The callback only operates on every element in an _array_ when `initialValue` is present, so for the above example it is not optional.

Putting the callback and `initialValue` together allows `reduce()` to take each element in the given array and operate on it, then push the returned values (using `push()` - another array method) into a new array.

Of course, to make it re-usable, you can extract the callback function from the above example into something like:

```js
const doubleMyValue = (total, amount) => {
  total.push(amount * 2)
  return total
}
```

Then, it can be put straight into `reduce()` (as an argument), to read:

```js
const initialCatRating = [10, 10, 10]
const accurateCatRating = initialCatRating.reduce(doubleMyValue, [])

accurateCatRating // [20, 20, 20]
```

The `reduce()` callback above is actually not a pure function, because it modifies one of its parameters. To keep `reduce()` pure/functional, the callback can only take primitive values. See the [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) article for examples. And see some more examples [here](https://medium.freecodecamp.org/reduce-f47a7da511a9). Try some `Array.prototype` methods out in your browser console! :)
