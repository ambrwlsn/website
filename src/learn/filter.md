---
subject: filter
number: 20
postdate: October 2019
---

Howdy, sorry for the long hiatus. I was busy... planning an underwater holiday park. Nah, I was working hard and getting a little too much imposter syndrome. But now I've taken some helpful advice from myself to cut all that out and acknowledge the brilliant and hardworking developer that I am! And you should do the same. It does wonders for your self-esteem and sanity :)

Anyway, I've been playing with some Codewars katas and getting into the `Array.prototype.filter()` method in JS, and I like it. It's an almost disturbingly simple way to get some things done.

I was scratching my head about how to complete this task today:

Return an array that contains all values of array `a`, apart from those that exist in array `b`.

```js
arrayA = [1, 2, 2, 2, 3]
arrayB = [2]

newArray = [1, 3] // <- make this magic happen!
```

What `filter` does for you is filter out any value you wish. You can attach the fitler method to an array, give it a condition, and it will return everything in the array that matches the condition. Note: when I first began using filter, I thought it would remove all values that match the condition, however the values that match the condition are actually kept. This seems a little unintuitive to me, but hey, I didn't write JS ;)

Here is ~~the~~ a solution:

```js
newArray = arrayA.filter(value => !arrayB.includes(value))
```

In it, we are taking each value of `arrayA` and if `arrayB` contains any of these values, we do not display them in our `newArray`. If the `!` was not present, we would create an array containing the values of `arrayB` that match values in `arrayA` (i.e. `[2, 2, 2]`).

Using the `filter` method takes time to get your head around, but it's worth it! Play around with the example above in your browser console. Also note the `Array.prototype.includes()` method being used in the example. I will cover this next time. Over and out for now.
