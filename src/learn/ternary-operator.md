---
title: Ternary Operator
number: 14
postdate: July 2018
---

This is one of my favourite things in JavaScript. Not only is it simple and easy to use but it's also applicable to lots of situations **and** it can replace more verbose syntax (like `if` statements). It looks something like this:

```js
const hoursOfSleep = 5
const timeForSleep =
  hoursOfSleep < 8
    ? 'Yup, no more phone for you'
    : "Ah nah, a few more minutes of phone time won't hurt"
```

Notice the **?** and the **:**

These are the important parts.

If the condition (in this case `hoursOfSleep`) in front of the question mark evaluates to true, the value of the first expression before the colon is returned. If the condition in front of the question mark evaluates to false, the value of the second expression after the colon is returned. As you can see, if you have had less than 8 hours of sleep, you shouldn't be using your phone.

Ternary operators are really flexible and can be used in a number of ways. You can stack them together:

```js
const catsRule = true,
const dogsDrool = false,
const catDog = catsRule ?
    (dogsDrool ? "Let's all live in harmony": "Both cats and dogs drool") :
    (dogsDrool ? "Dogs are cool, nearly as cool as cats" : "Dogs and cats can be friends");
```

This outputs `"Both cats and dogs drool"`, and it's also total nonsense but I hope you had fun staring at it and trying to figure it out. You don't even need to use the parentheses, and can also use multiple statements separated by commas. You can return statements in functions. You can use them in place of bulky `if/else` statements with much nicer-to-read code. The question mark means `if` and the colon means `else`.

I use ternary operators at work all the time. I hope you enjoy them as much as I do. Check out the [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_Operator) page for some examples. This [post](https://scotch.io/tutorials/understand-the-javascript-ternary-operator-like-abc) is lovely too.
