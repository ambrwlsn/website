---
title: How and when to use React useCallback()
date: "2020-12-22"
tags: [react]
ogImage: react.png
keywords: [amber wilson,web development,html,javascript,useCallback,useEffect,hook,hooks,objects]
---

In short, React's useCallback hook is used to wrap functions. It tells React to not re-create a wrapped function when a component re-renders, unless any of the useCallback's dependencies change. But when is it necessary to use useCallback? 

Most blog posts I have read on useCallback contain example code where a function wrapped in useCallback could just be moved outside of a component function body and into its own scope. Or placed into a useEffect instead. React is a smart library that is optimised to not need a hook like useCallback in most situations.

The example code in this post aims to be more "real-world". Because of this, it's necessarily quite complex. As well as using common React hooks such as useState, useEffect, it also uses a number of JavaScript methods such as the fetch API, promises, filtering, splicing, destructuring, and currying. 

Even if you aren't an expert in all of the methods used in the example code, I hope you can still learn something!

## Object references

I want to explain an important fundamental JavaScript concept that will make understanding useCallback easier—object references: 

Functions are objects in JavaScript. Even if two functions are identical, they won't equal each other:

```javascript
var dog1 = func(){console.log('14/10')}; // has a unique object reference
var dog2 = func(){console.log('14/10')}; // has a unique object reference

dog1 == dog2; // false
dog1 === dog2; // false
```

In comparison, if an object assigned to a variable is directly assigned to another variable, the references will match:

```javascript
var dog1 = func(){console.log('14/10')}; // has a unique object reference
var dog2 = dog1;  // assign the unique object reference of dog1 to a variable named dog2

// dog1 and dog2 point to same object reference
dog1 == dog2; // true
dog1 === dog2; // true
```

In the [next section](#example-app), we'll see why object references are fundamental to writing and understanding React apps.

## Example app

This section will go through and explain each step of a <strong>dog park</strong> example app <span aria-hidden="true">🐶</span>. If you want to take a look at the final code, here is the [Dog Park GitHub repository](https://github.com/ambrwlsn/dog-park). If you want to see a live version of the app, here is the [Dog Park app](https://the-dog-park.netlify.app/).

The initial features that I built into the dog park app were pretty cool. They let you set a name for your park and choose the number of dogs in it!

Inside the function body of the DogPark component, there is a function called fetchDog. This function fetches an array of dogs from [The Dog API by Postman](https://documenter.getpostman.com/view/4016432/the-dog-api/RW81vZ4Z#77124c23-dc8b-48f0-9cc2-7e009ecf74fe). DogPark re-renders whenever a user interacts with any of its elements, including its child component, Dogs. <strong>Whenever DogPark re-renders, fetchDog will be re-created and receive a new object reference</strong>.

```jsx
import React, { useState, useCallback } from 'react';
import Dogs from './Dogs';
import shuffle from './shuffle';

const DogPark = () => {
  const [text, setText] = useState('');

  const handleText = (event) => {
      setText(event.target.value);
  };

  // Gets a new object reference when it is re-created.
  // It is re-created whenever DogPark re-renders.
  const fetchDog = (number) => {
    const result = fetch(`https://api.thedogapi.com/v1/breeds/`)
        .then((response) => response.json())
        .then((json) =>
        shuffle(json).splice(0, number)
        );

    return result;
  };

  return (
    <>
      <h1>Welcome to {text || 'The Dog Park'}!</h1>
      <p>
        <label>
          Name your dog park:{' '}
          <input type="text" value={text} onChange={handleText} />
        </label>
      </p>
      <p>Add the perfect Dogs to your park! Maximum of 10.</p>
      <Dogs onFetchDog={fetchDog} />
    </>
  );
};

export default DogPark;
```

Let's take a look at the Dogs component:

```jsx
import React, { useEffect, useState } from 'react';

const Dogs = ({ onFetchDog }) => {
  const [number, setNumber] = useState(1);
  const [dogList, setDogList] = useState([]);

  // Runs the "fetchDog" function when either the number
  // variable or the onFetchDog variable changes.
  useEffect(
    () => {
      if (number && typeof onFetchDog === 'function') {
        async function fetchDog() {
          const response = await onFetchDog(number);
          setDogList(response);
        }
        fetchDog();
      }
    },
    [onFetchDog, number] // dependencies of the useEffect
  );

  return (
    <>
      <label>
        Number of dogs:{' '}
        <input
          max="10"
          min="1"
          value={number}
          type="number"
          onChange={(event) => setNumber(event.target.value)}
        />
      </label>
      {dogList && (
        <ul>
          {dogList.map((dog) => (
            <li key={dog.id}>{dog.name}</li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Dogs;
```

The useEffect in the Dogs component has in its dependency array the fetchDog function (which has been passed down as onFetchDog), and the numbers variable.

An input with a type of number lives inside the Dogs component. Whenever the number of dogs is changed, Dogs will re-render and fetchDog will be run. This is good! It's what we want. Note: when state that lives inside a child component changes and the child is re-rendered, this will not trigger a re-render of the parent component.

If state that lives inside the parent component changes and the parent is re-rendered, the child component will also re-render. In the majority of cases, this is normal, expected behaviour. In the small number of cases this is causing an obvious rendering issue, you can try wrapping the child component in [React.memo](https://reactjs.org/docs/react-api.html#reactmemo). However, if a value in the parent component that the child component depends on gets a new object reference, React.memo won't work. In our app, Dogs depends on the fetchDog function coming from DogPark.

Whenever a character is typed into the "Name your dog park" input in DogPark, DogPark will re-render and fetchDog will be re-created and get a new object reference. Dogs will also re-render and because the fetchDog dependency in its useEffect has changed, the useEffect will trigger, and the fetchDog function will run. This means that the list of dogs inside Dogs will refresh every time a single character is typed into the "Name your dog park" input. That is not good! It's not what we want. But what can we do?

We *could* wrap the fetchDog function inside DogPark into a useCallback to ensure it is not re-created each time DogPark re-renders. However, as the fetchDog function has no dependencies, it can safely be moved out of the function body of DogPark. This is a simpler way to ensure that fetchDog is not re-created every time DogPark re-renders:

```jsx
// This function now lives outside of the DogPark function
// body and so is not re-created whenever DogPark re-renders
const fetchDog = (number) => {
  ...
};

const DogPark = () => {
    ... // DogPark function body
```

Ok, so, useCallback wasn't needed. But now, a <strong>third feature</strong> is going to be added to the app that <em>is</em> going to require useCallback. This feature will be the ability to choose dogs that have names beginning with either A-M or N-Z.

 A new state variable and two radio buttons are added. And the fetch function is moved back into DogPark and altered a little:

```jsx
const DogPark = () => {
  const [text, setText] = useState('');
   // New state variable
  const [charRange, setCharRange] = useState('A-M');

  const handleText = (event) => {
    setText(event.target.value);
  };

  const fetchDog = (number) => {
      const result = fetch(`https://api.thedogapi.com/v1/breeds/`)
        .then((response) => response.json())
        .then((json) =>
            shuffle(
                // Filters dogs depending on the value of 
                // the new state variable "charRange"
                json.filter((dog) => { 
                    return charRange === 'A-M'
                    ? dog.name[0] < 'N'
                    : dog.name[0] > 'M';
                })
            ).splice(0, number)
        );
    return result;
  };

  return (
    <>
      <h1>Welcome to {text || 'The Dog Park'}!</h1>
      <p>
        <label>
          Name your dog park:{' '}
          <input type="text" value={text} onChange={handleText} />
        </label>
      </p>
      <p>Add the perfect Dogs to your park! Maximum of 10.</p>

       {/* Two new radio buttons */}
      <p> 
        <label>
          A-M
          <input
            type="radio"
            checked={charRange === 'A-M'}
            onChange={() => setDogHalf('A-M')}
          />
        </label>
        <label>
          N-Z
          <input
            type="radio"
            checked={charRange === 'N-Z'}
            onChange={() => setDogHalf('N-Z')}
          />
        </label>
      </p>
      <Dogs onFetchDog={fetchDog} />
    </>
  );
};
```

The fetchDog function now relies on the charRange state that lives within DogPark. This means fetchDog has to live in the function body of DogPark. I thought I could solve this issue by passing charRange to the fetchDog function that's passed down to Dogs:

```jsx
// Here, fetchDog is outside of DogPark and gets the
// charRange state as a curried value but the returned 
// function is still re-created each time DogPark re-renders
const fetchDog = (charRange) => (number) => {
    ...
};

const DogPark = () => {
    ...
    <Dogs onFetchDog={fetchDog(charRange)} />
};
```

Even though I successfully moved fetchDog out of DogPark, fetchDog is still re-created every time DogPark re-renders. 

So, fetchDog needs to stay within DogPark, and useCallback can help to avoid fetchDog being re-created every time DogPark re-renders. This means that when a character is typed into the "Name your dog park" input, even though DogPark re-renders, fetchDog keeps its object reference, and so the useEffect in Dogs is not triggered. And the dog list in Dogs is not needlessly refreshed!

```jsx
// Now the fetchDog function is wrapped in the 
// useCallback hook, with "charRange" in the hook's
// dependency array.
const fetchDog = useCallback(
    (number) => {
        const result = fetch(`https://api.thedogapi.com/v1/breeds/`)
        .then((response) => response.json())
        .then((json) =>
            shuffle(
            json.filter((dog) => {
                return charRange === 'A-M'
                ? dog.name[0] < 'N'
                : dog.name[0] > 'M';
            })
            ).splice(0, number)
        );

        return result;
    },
    [charRange]
);
```

## When to actually use useCallback

In most use cases, your application won't be affected if a function is re-created and gets a new object reference upon each render. Even so, it can be tempting to proactively wrap a function in a useCallback to improve app performance. However, this premature optimisation can actually do harm rather than doing good. A blog post by Kent Dodds explains <a href="https://kentcdodds.com/blog/usememo-and-usecallback">when and when not to use useCallback</a>.

A good way to approach using useCallback is reactively rather than proactively. This means that, depending on your components, use it when you obviously need to, and not as a premature performance optimization. In short, don't wrap every function living inside a function body in a useCallback.

It's highly recommended that you have React linting in your development environment, so that your linter can suggest appropriate times to use useCallback.

If your linter is not suggesting useCallback, but you see that your UI is re-rendering in unexpected ways (as in the example in this post), or you have an infinite loop, check to see whether useCallback helps.

<!-- useCallback() often is used in conjunction with useEffect() because it allows you to prevent the re-creation of a function. For this, it's important to understand that functions are just objects in JavaScript.
Therefore, if you have a function (B) inside of a function (A), the inner function (=B) will be re-created (i.e. a brand-new object is created) whenever the outer function (A) runs.
That means that in a functional component, any function you define inside of it is re-created whenever the component rebuilds -->

<!-- To stabilise a function passed down as a prop so it doesn't change across renders which could cause issues if said function is used in a React.useEffect further down.

Give me the previously created function unless any of the dependencies I send you change. -->

## Resources

- Official React docs for <a href="https://reactjs.org/docs/hooks-reference.html#useeffect">useEffect</a> and <a href="https://reactjs.org/docs/hooks-reference.html#usecallback">useCallback</a>
- Kent Dodd's post on [when to use (and not use) useCallback](https://kentcdodds.com/blog/usememo-and-usecallback)
- Dan Abramov's <a href="https://overreacted.io/a-complete-guide-to-useeffect/">guide on useEffect()</a> offering a deep dive into React hooks

<!-- 
useCallback caches the function so you get the same exacty value passed in, unless the prop value(s) change. Referential identity. 

useMemo caches the return value or a function, not the function itself. -->