# Unit 2

## CSS Interesting Things

- **Topography** - [Great guidlines](https://www.internetingishard.com/html-and-css/web-typography/)

## C1 - Learning Part 1

- Read CSS is Hard - Hello CSS, Box Model, CSS Selectors
- Add Horizontal menu
- [W3Schools Tutorial](https://www.w3schools.com/css/css_navbar.asp)
- Deploy to website

[CSS is hard](https://www.internetingishard.com/html-and-css/hello-css/)

**HTML inline**

```
<div style="color:red;">I'm red</div>
```

**HTML style block**

```
<style>
  div { color: red; }
</style>
```

**Style file**

```
<link rel="stylesheet" href="stylesheet.css" type="text/css" charset="utf-8" />
```

### Demonstrate

Use debugger to demonstrate.

### Ways to include styles

- **unit of measurement** - px, em, vh/vw (1% of viewport), pt (1/72nd of 1in)
- **common styles**
  - font-family
  - font-weight
  - color
  - background-color
  - text-align: start, end, center, justify
- Box Model
  - padding
    - all: 1em;
    - top & bottom: 1em, 5em;
    - clock: 1em, 10em, 5em, 15em;
  - border: size style color, 1px thin blue;
  - margin: transparent, no click events
  - Block and inline boxes
- Vertical margin collapse - sibbling elements, biggest margin used
- Generic boxes: span, div
- Box-sizing: content-box, border-box
- Auto-margin: div { text-align:center; width: 200px, margin: 20px auto;

### Selectors

** Standard selectors **

```
* { margin:0;padding:0; } /* Default */
h1 { color: red;} /* only h1 */
h1,h2 {} /* both */
.className {} /* class attribute */
#id {} /* ID */
li[selected] {} /* with attribute */
div[title="life"] {} /* attribute value */
a:hover, a:visited {} /* User-action pseudo classes */
section > p {} /* direct child */
section p {} /* descendant */
```

### Font Demo

demo of importing fonts css-intro-font/index.html

## C2 - Learning Part 2

- Read CSS is Hard 4, 5, 6

## Lab 1 - Photographer's

## C3 - Learning Web Design Principles Part 1

## C4 - Learning Web Design Principles Part 2

## CSS Quiz
