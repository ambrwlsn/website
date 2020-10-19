---
subject: Flux
number: 5
postdate: May 2018
---

Recently, I began to write React at work and I've been doing okay with presentational components, but much less so with business logic (I hear ya [Brad Frost](http://bradfrost.com/blog/post/my-struggle-to-learn-react/)). I've heard that improving my ES6 will really help, so you'll see more little lessons on it, but I also want to touch on how to manage dynamic state. Despite the popularity of Redux, one of my developer friends recommended covering Flux.

Flux is an application architecture for React (that can also be used elsewhere) utilizing a unidirectional data flow. In essence, it is an observer pattern that offers one-way data binding. Very useful when you need to keep lots of components in sync.

**action -> dispatcher -> store -> view**

- The **action** creator formats messages (what the user does) from the UI
- The **dispatcher** takes the formatted messages and synchronously sends them to different stores
- The **store** holds all state logic and changes it by deciding what actions it wants to pay attention to
- The **view** takes changes from the store and updates the UI

Please look at Lin Clark's great [cartoon guide](https://code-cartoons.com/a-cartoon-guide-to-flux-6157355ab207) for more details. For a more code-heavy example, see [here](https://blog.andrewray.me/flux-for-stupid-people/). I feel like the best way to learn about Flux is to build things in tandem with reading about it (and finding nice developers who can guide you)!
