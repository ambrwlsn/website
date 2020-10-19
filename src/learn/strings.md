---
subject: Strings
number: 10
postdate: June 2018
---

- A sequence containing some letters, numbers or symbols.
- Have available methods and properties.
- Can be stored in variables.
- Sit between either single quotes (`' '`), double quotes (`" "`), or backticks ( ``).
- Can be concatenated (stuck together) with the `+` operator, or with backticks (template strings) in ES6.
- Template strings, or template literals, can take any valid JavaScript expression, allowing dynamic strings.
- Can contain special characters, such as quotation marks, as long as they are escaped - e.g. `"She'\ll be coming '\round the mountain when she comes"`.
- There's no need to escape dissimilar quote marks. For example: "This 'is' fine". This is probably why we tend to favour double quotes in HTML attribute values, and singles in JS (since it allows you to create some innerHTML without the need for escaping).
- When using template literals, you don't need to escape `'` or `"` ... and `` this` `"is"` `'also'` `fine ``
- Is either a _string primitive_ - immutable and more common, e.g. `const stringPrimitive = "Hello, I am a string.";` .
- Or a _string object_ - `const stringObject = new String("Hello, I am a string.");`
- The `typeof` operator is used to determine if a string's type is _string_ or _object_.
- Each character is indexed and can be accessed by an index number using square bracket notation (e.g. "Hello World" - `myString[0]` outputs "H").
- Similar methods to the one above include: `charAt()`, `indexOf()`, `lastIndexOf()`, `slice()`.
- Other common methods and properties are: `length`, `toUpperCase()`, `toLowerCase()`, `split()`, `trim()`, `replace()`.

This list is meant as a quick and basic introduction to the magical world of JavaScript strings. If there's something you'd like me to add, let me know!

Many thanks to my good friend <a href="https://twitter.com/qubyte">Mark</a> for suggesting additions :)
