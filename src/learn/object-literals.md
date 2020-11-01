---
title: Object Literals
number: 13
postdate: July 2018
---

I didn't learn about these at work but rather from a [video](https://www.youtube.com/watch?v=1DMolJ2FrNY) on the JavaScript reduce function by the wonderful [MPJ](https://twitter.com/mpjme).

Object literals are a data structure that can be used in JavaScript. I really like seeing how data can be organised and object literals do this really nice and tidily. Here's an example:

```js
var cat = {
  myCat: 'Tabby',
  getCat: catTypes('Siamese'),
}
```

The above code is an alteration of the MDN [example](https://developer.mozilla.org/bm/docs/Web/JavaScript/Guide/Grammar_and_types#Object_literals). I found MDN's explanation of object literals a little mechanical (compared to other resources I found), but it does give quite a clear portrayal of how flexible object literals can be. For instance, the typical combination of a key (`myCat`), value (`Tabby`) pair can be accessed and used in other places in your code, without these values polluting the global scope\*. You can use the `catTypes` function like so:

```js
function catTypes(type) {
  if (type !== 'Siamese') {
    return type
  } else {
    return 'Many ' + type + ' cats have blue eyes.'
  }
}

console.log(cat.getCat) // Many Siamese cats have blue eyes.
```

If this was not exciting enough, there are many other data types (not only functions) that can be organised using object literals - e.g. array literals (see an example of this in MPJ's video), nested object literals, numbers, any string, etc.

My friend [Mark](https://qubyte.codes/) also informed me that an object can contain itself (which is not recommend because it breaks JSON.stringify)!

Of course as with any programming language, there are rules. Some of these are that a colon separates the key from the value, a comma separates key-value pairs, there shouldn't be a comma after the last value-pair (well, it's fine to have a dangling comma, but many style guides don't want you to do it), etc.

For more rules and when to use, check out [this](http://www.dyn-web.com/tutorials/object-literal/#f2) nice post, and the MDN page.

I haven't had much of a chance to use object literals in the wild yet, but I hope to soon. After I have, I hope to write an updated post that describes my new insights.

- An object (literal) can be used like a namespace to avoid polluting the global object, but there's still the reference of the object attached to global. If you want to completely eliminate variables polluting the global object as fields, then IIFEs are for you. Some modules are also isolated from global. So, object literals limit pollution through namespacing, but do not entirely eliminate it. (Thanks, [Mark](https://qubyte.codes/), for the information).
