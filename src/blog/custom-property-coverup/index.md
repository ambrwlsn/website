---
title: Custom Property Coverup
date: "2020-07-22"
keywords: [amber wilson, custom properties, css variables, software engineering, web development, coding,communication, styles, document]
tags: [css, dev tools]
---

The other day I was discussing CSS custom properties with <a href="https://adactio.com">Jeremy</a> when I noticed something. When using custom properties, some (but not all) of the custom property values do not show up in the computed values in Chrome dev tools. Jeremy tried the dev tools in Firefox and found the same thing. However, when the same values declared as custom properties are declared as regular CSS properties, the values show up in the computed values section.

Neither of us had noticed this behaviour before and we were both a bit baffled. Why would the makers of these dev tools purposefully leave out some of the CSS custom property values from the computed values section while the same values declared without custom properties are shown?

It should be noted that computed custom properties can be shown in dev tools by toggling on browser styles. However when toggled on in this way, the custom property values are not interactive. And, more importantly, custom property values are not browser styles.

I made a reduced test case in Codepen to show <a href="https://codepen.io/ambrwlsn90/full/eYJxmrO">how custom properties are treated by browser dev tools</a>.

The test case has three divs - one not using any custom properties, one using some custom properties, and one using only custom properties. Each div has exactly the same styles. Below is what the computed styles section in Chrome, Firefox and Safari dev tools shows for each div (<a href="#why-do-browsers-differ">skip to next paragraph</a>).

## Calculated Custom Property Results Per Browser (Chrome, Firefox, Safari)

### Chrome

Chrome - no custom properties:
```css
background-color:rgb(198, 255, 133);
border-bottom-color:rgb(0, 128, 0);
border-bottom-left-radius:15px;
border-bottom-right-radius:15px;
border-bottom-style:solid;
border-bottom-width:5px;
border-left-color:rgb(0, 128, 0);
border-left-style:solid;
border-left-width:5px;
border-right-color:rgb(0, 128, 0);
border-right-style:solid;
border-right-width:5px;
border-top-color:rgb(0, 128, 0);
border-top-left-radius:15px;
border-top-right-radius:15px;
border-top-style:solid;
border-top-width:5px;
color:rgb(3, 3, 3);
display:block;
height:100px;
margin-bottom:10px;
padding-bottom:20px;
padding-left:20px;
padding-right:20px;
padding-top:20px;
width:200px;
```

Chrome - some custom properties:
```css
background-color:rgb(198, 255, 133);
color:rgb(0, 0, 0);
display:block;
height:100px;
margin-bottom:10px;
padding-bottom:20px;
padding-left:20px;
padding-right:20px;
padding-top:20px;
width:200px;
```

Chrome - only custom properties:
```css
background-color:rgb(198, 255, 133);
color:rgb(0, 0, 0);
display:block;
height:100px;
width:200px;
```

### Firefox

Firefox - no custom properties:
```css
background-color: rgb(198, 255, 133);
border-bottom-color: rgb(0, 128, 0);
border-bottom-left-radius: 15px;
border-bottom-right-radius: 15px;
border-bottom-style: solid;
border-bottom-width: 5px;
border-left-color: rgb(0, 128, 0);
border-left-style: solid;
border-left-width: 5px;
border-right-color: rgb(0, 128, 0);
border-right-style: solid;
border-right-width: 5px;
border-top-color: rgb(0, 128, 0);
border-top-left-radius: 15px;
border-top-right-radius: 15px;
border-top-style: solid;
border-top-width: 5px;
color: rgb(3, 3, 3);
height: 100px;
margin-bottom: 10px;
padding-bottom: 20px;
padding-left: 20px;
padding-right: 20px;
padding-top: 20px;
width: 200px;
```

Firefox - some custom properties:
```css
background-color: rgb(198, 255, 133);
color: rgb(0, 0, 0);
height: 100px;
margin-bottom: 10px;
padding-bottom: 20px;
padding-left: 20px;
padding-right: 20px;
padding-top: 20px;
width: 200px;
```

Firefox - only custom properties:
```css
background-color: rgb(198, 255, 133);
color: rgb(0, 0, 0);
height: 100px;
width: 200px;
```

### Safari

Safari - no custom properties:
```css
background-color: rgb(198, 255, 133);
border-bottom-color: rgb(0, 128, 0);
border-bottom-left-radius: 15px;
border-bottom-right-radius: 15px;
border-bottom-style: solid;
border-bottom-width: 5px;
border-left-color: rgb(0, 128, 0);
border-left-style: solid;
border-left-width: 5px;
border-right-color: rgb(0, 128, 0);
border-right-style: solid;
border-right-width: 5px;
border-top-color: rgb(0, 128, 0);
border-top-left-radius: 15px;
border-top-right-radius: 15px;
border-top-style: solid;
border-top-width: 5px;
color: rgb(2, 2, 2);
display: block;
height: 100px;
margin-bottom: 10px;
padding-bottom: 20px;
padding-left: 20px;
padding-right: 20px;
padding-top: 20px;
width: 200px;
```

Safari- some custom properties:
```css
background-color: rgb(198, 255, 133);
border-bottom-color: rgb(0, 128, 0);
border-bottom-left-radius: 15px;
border-bottom-right-radius: 15px;
border-bottom-style: solid;
border-bottom-width: 5px;
border-left-color: rgb(0, 128, 0);
border-left-style: solid;
border-left-width: 5px;
border-right-color: rgb(0, 128, 0);
border-right-style: solid;
border-right-width: 5px;
border-top-color: rgb(0, 128, 0);
border-top-left-radius: 15px;
border-top-right-radius: 15px;
border-top-style: solid;
border-top-width: 5px;
color: rgb(0, 0, 0);
display: block;
height: 100px;
margin-bottom: 10px;
padding-bottom: 20px;
padding-left: 20px;
padding-right: 20px;
padding-top: 20px;
width: 200px;
```

Safari - only custom properties:
```css
background-color: rgb(198, 255, 133);
border-bottom-color: rgb(0, 128, 0);
border-bottom-left-radius: 15px;
border-bottom-right-radius: 15px;
border-bottom-style: solid;
border-bottom-width: 5px;
border-left-color: rgb(0, 128, 0);
border-left-style: solid;
border-left-width: 5px;
border-right-color: rgb(0, 128, 0);
border-right-style: solid;
border-right-width: 5px;
border-top-color: rgb(0, 128, 0);
border-top-left-radius: 15px;
border-top-right-radius: 15px;
border-top-style: solid;
border-top-width: 5px;
color: rgb(0, 0, 0);
display: block;
height: 100px;
padding-bottom: 20px;
padding-left: 20px;
padding-right: 20px;
padding-top: 20px;
width: 200px;
```

<a href="#" role="link">
<span role="img" aria-label="up arrow">&uarr;</span>
<span>Back to the top</span>
</a>
<h2 id="why-do-browsers-differ">Why do browsers differ? <a href="#why-do-browsers-differ" role="link" aria-hidden="true">#</a></h2>

Interesting! Why is it that Safari shows all the custom properties in the computed styles list? I am not sure. In Safari they are also interactive. Clicking a computed style directs you to the location of the style and allows you to edit it in the dev tools. This is not the case in Chrome or Firefox.

Does anyone know why this is? 

