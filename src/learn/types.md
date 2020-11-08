---
title: Types
number: 18
postdate: "2019-07-16"
---

JavaScript has six primitive types. These all have default values and can be checked for using the `typeof` operator.

Default values:

```js
'boolean' - false
'null' - null
'number' - 0
'string' - ''
'undefined' - void 0
'symbol' - Symbol() // new in ES6
```

Checking the type of a primitive:

```js
if (typeof myPrimitive !== 'number')
  throw new TypeError('Type must be a number!')
```
