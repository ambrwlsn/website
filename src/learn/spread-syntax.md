---
title: Spread Syntax
number: 21
postdate: March 2020
---

New in ES6 were the three dots `...` known as the spread syntax. It's the evolution of `sum.apply`. Spread syntax can do a lot more than I can explain in this little post. All I want to share is one way it helped me greatly in real life recently. Consider the following code:

```javascript
let list = {}

const groceryList = { item1: 'bread', item2: 'flowers' }
const catToys = { toy1: 'jingly ball', toy2: 'catnip mouse' }

list = { ...groceryList, ...catToys }

console.log(list)
// {item1: "bread", item2: "flowers", toy1: "jingly ball", toy2: "catnip mouse"}
```

It merges two objects into one! Sadly, it won't work if any keys in either object are the same. In such a case, the last instances of keys that are repeated would be used and the duplicates discarded.

One more cool thing I'll mention is that spread syntax can merge the values of a good old array:

```js
let numbers = []

const catRatings = [10, 12, 14, 11]
const dogRatings = [12, 11, 14, 10]

numbers = [...dogRatings, ...catRatings]

console.log(numbers)
// [(12, 11, 14, 10, 10, 12, 14, 11)]
```

The numbers are all placed in one array! Even duplicated ones. If numbers was then re-assigned to an object, the duplicated numbers would be removed:

```javascript
numbers = { ...dogRatings, ...catRatings }

console.log(numbers)
// {0: 10, 1: 12, 2: 14, 3: 11}
```

In conclusion to this small post - the spread syntax is really useful for manipulating values in a clean and understandable way. It can be used to concatenate values of different arrays or objects, and it can also flatten nested arrays or objects! Check out this post for a [visual list of uses for the spread syntax](https://www.freecodecamp.org/news/an-introduction-to-spread-syntax-in-javascript-fba39595922c/). The post's page isn't too accessible but hey, let this be a lesson to give your images alt attributes!
