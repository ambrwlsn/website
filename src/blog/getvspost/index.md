---
title: GET vs. POST Requests
date: "2017-03-27"
tags: [learning]
keywords: [amber wilson,software engineering,web development,coding, get, post, https request]
---

Amidst a learning spree on semantic HTML and the ways servers communicate with web browsers, I was introduced to 'GET' and 'POST' requests.

These are HTTP (Hypertext Transfer Protocol - the language the browser uses to 'speak' with servers) request methods, typically used for sending and receiving data in forms. They are written like this inside the HTML5 form element:

```jsx
<form method="GET"> 
<form method="POST">
```

The semantics behind the form element could form (see what I did there?) another lesson entirely. They are explained nicely [here](https://internetingishard.com/html-and-css/forms/).

GET and POST requests can be tricky to understand because some explanations are too techincal and miss the big picture. Here are some basics:

*   GET requests are the default method used by browsers, meaning that if no method is specified, a GET request will be issued automatically.
*   Both methods are able to send to and retrieve from data a server, however GET should only really be used as a 'getter' for retrieving data, because using it to send data raises some privacy issues.
*   GET requests send information (name and value pairs in forms) within the URL of HTTP requests, rather than in the body. This means information submitted in a form will be visible in the URL. For example, when logging into a site, sensitive information such as a password would be part of the URL.
*   In addition, a limited amount of data can be displayed in a URL. This means submitted data could be lost.
*   POST requests send information in a separate header file. Data sent this way is also not encrypted, but is safer.

This [video](https://www.youtube.com/watch?v=9o_4lsOkQ3g&t=307s) gives a practical example and describes further differences between GET and POST (skip to 5:19).