---
title: Console debugging
number: 19
postdate: "2019-07-25"
---

A lot of people use `console.log` to debug in the console.

The `log()` method of `console` logs things to the web console. What some people may not know is that you can log things in nice ways! Here are three:

## 1. Computed property names -

The following objects could be logged one at a time:

```js
const cat = { name: 'Fluffy', colour: 'orange', specialSkill: 'staring' }
const dog = { name: 'Thor', colour: 'brown', specialSkill: 'running' }
const fish = { name: 'Glub', colour: 'blue', specialSkill: 'blowing bubbles' }
```

And the results would be as follows:

```js
console.log(cat) // {name: "Fluffy", colour: "orange", specialSkill: "staring"}
console.log(dog) // {name: "Thor", colour: "brown", specialSkill: "running"}
console.log(fish) // {name: "Glub", colour: "blue", specialSkill: "blowing bubbles"}
```

Or, they could be logged with a name label using 'computed property names'. To do this, create an object with the variables as keys:

```js
console.log({ cat, dog, fish }) // {cat: {…}, dog: {…}, fish: {…}}
```

Inside this object, there will be the details of each variable with its corresponding key:

```js
cat: {name: "Fluffy", colour: "orange", specialSkill: "staring"}
dog: {name: "Thor", colour: "brown", specialSkill: "running"}
fish: {name: "Glub", colour: "blue", specialSkill: "blowing bubbles"}
```

## 2. CSS in the console -

Define styles like this in the console:

```js
var styles = [
  'background: linear-gradient(#21618C, #5DADE2)',
  'padding: 5px',
  'border-radius: 8px',
  'text-align: center',
  'color: white',
  'display: block',
].join(';')
```

Then prefix console log with the `%c` flag, adding the `styles` variable to the end:

```js
console.log(
  `%c My cat is ${cat.name}, ${cat.colour}, ${cat.specialSkill}`,
  styles
)
```

Try it in your console or look at [this](https://codesandbox.io/embed/determined-wozniak-4lt93) example on CodeSandbox!

## 3. Tables in the console -

To display objects in a table in order to more easily compare them, try using `console.table`. You can do so with the animal objects above by running:

```js
console.table([cat, dog, fish])
```

Not only will there be a nicely-formatted table to see in the console, but the (unlabeled) objects will also be displayed as well.

## Note

All of these things make console logging a little better. Not sure how many I will start using myself, but I'll give them a go to see whether I like them :)
