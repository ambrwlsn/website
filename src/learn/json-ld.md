---
title: JSON-LD
number: 6
postdate: "2018-05-29"
---

JSON, or JavaScript Object Notation, is a simple language that represents objects on the Web and facilitates data exchange. LD, or Linked Data, allows for the expression of critical data on a site, and for it to be shared across sites. I first heard of it at [Beyond Tellerrand](https://beyondtellerrand.com/events/duesseldorf-2018/speakers) in Düsseldorf on May 7th, during a talk about web annotations by [Lyza Danger Gardner](https://lyza.com). JSON-LD allows expressions of linked data in JavaScript. It's like grammar for describing strutured data. It can be thought of as JSON, but with added semantics. And it can be easily implemented into existing JSON structures. Here's some example JSON:

```js
{
    "name": "Amber Wilson",
    "homepage": "https://amberwilson.co.uk",
    "picture": "https://twitter.com/account/
    profil_image/ambrwlsn90"
}
```

Here is similar information in JSON-LD format:

```js
{
    "@context": {
        "xsd": "http://www.w3c.org/2001/XMLSchema#",
        "foaf": "http://xmlns.com/foaf/0.1/",
    },
    "@id": "http://me.amberwilson.co.uk",
    "@type": "foaf:Person",
    "foaf:name": "Amber Wilson",
}
```

Above, we see that `context` can be added to data. `foaf` stands for "friend of a friend" (see [here](http://www.foaf-project.org/)), which deals with people-related terms. `id` and `type`, like `context`, assist in making our data shareable and semantic.

The concept of JSON-LD is simple, but using it can take getting used to. For more in-depth information, see [here](https://json-ld.org/primer/latest/).
