# Unit 2

## CSS Interesting Things

- **Topography** - [Great guidlines](https://www.internetingishard.com/html-and-css/web-typography/)
- **Grid Layout** - [Mozilla Tutorial](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)

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

- Read CSS is Hard - Floats, Flex, Responsive
- Deploy to website

### Grid layout

A container div defines the number of columns and sizing properies. `fr` specifies a frational unit for the container. The start and stop are defined by the border lines of the grid. The far left is 1, the far right is cols+1. Same with rows. Top is 1, the bottom is rows+1.

```
.wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* three columns each 1 fractional unit */
  grid-auto-rows: minmax(100px, auto); /* at least 100px, but allow it to grow */
}

.box1 {
  grid-column-start: 1;
  grid-column-end: 4;
  grid-row-start: 1;
  grid-row-end: 3;
}
```

## Lab 1 - Photographer's

## C3 - Learning Web Design Principles Part 1

## C4 - Learning Web Design Principles Part 2

## CSS Quiz
