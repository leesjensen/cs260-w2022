# Unit 2 - CSS

## CSS Interesting Things

- **Topography** - [Great guidlines](https://www.internetingishard.com/html-and-css/web-typography/)
- **Grid Layout** - [Mozilla Tutorial](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Basic_Concepts_of_Grid_Layout)
- **Color Scheme Generator** - [Paletton](https://paletton.com)
- **Responsive Layout** - [Without media queries](https://medium.com/codex/responsive-layouts-without-media-queries-5d7fd989be72)
- **2021 Roundup** - [CSS Tricks](https://css-tricks.com/2021-roundup-of-web-research/)
- **Media Queriew** - [Mozilla](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Media_queries)

## C1 - Basics

### Submission

- Read [CSS is hard](https://www.internetingishard.com/html-and-css/hello-css/) - Hello CSS, Box Model, CSS Selectors
- Add Horizontal menu
- [W3Schools Tutorial](https://www.w3schools.com/css/css_navbar.asp)
- Deploy to website

### Ways to include styles

**HTML inline**

```
<div style="color:red;">I'm red</div>
```

**HTML style element**

```
<style>
  div { color: red; }
</style>
```

**Style file**

```
<link rel="stylesheet" href="style.css" />
```

### Box Model

- content
- padding
- border
- margin

### Selectors

```
* { margin:0;padding:0; }  /* Default */
h1 { color: red;}          /* only h1 */
h1,h2 {}                   /* both */
.className {}              /* class attribute */
#id {}                     /* ID */
li[selected] {}            /* with attribute */
div[title="life"] {}       /* attribute value */
a:hover, a:visited {}      /* pseudo classes */
h2:first-child {}          
h2:before {}          
section > p {}             /* direct child */
section p {}               /* descendant */
```

### Common styles

- background
- color
- pading
  - all: 1em;
  - clock: 1em, 10em, 5em, 15em;
  - top/bottom left/right: 1em, 5em;
- border: size style color, 1px thin blue;
- margin: transparent, no click events
- font-family
- font-weight
- text-align: start, end, center, justify
- Vertical margin collapse - sibbling elements, biggest margin used
- box-sizing: content-box, border-box
- Auto-margin: div { text-align:center; width: 200px, margin: 20px auto;}

### Display

- block - newline (h1, p)
- inline - no top/bottom, height/width (strong)
- inline-block - no newline
- flex - block with flexbox children
- inline-flex - inline with flexbox children

### Measurement

px, em, rem, vh/vw (1% of viewport), pt (1/72nd of 1in)

### References

```
body {
  background-image:
    url('PinecreekCanyon.jpg');
}
```

### Font Demo

demo of importing fonts css-intro-font/index.html

## C2 - Responsive

- Read CSS is Hard - Floats, Flex, Responsive

### Submission

- Website that uses float, flexbox, media. Throw in viewport and grid for fun.
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

### Float Layout

The float attribute allows a value of `right` or `left`. Sibling items will stack next to each other.

```
.float-box2 {
  float: right;
}
```

### Flex Layout

Flexbox allows the children of a container with the attribute of `display: flex` to be oriented and aligned.

```
.flex-wrapper {
  display: flex;
}
```

- Use display: flex; to create a flex container.
- Use justify-content to define the horizontal alignment of items.
- Use align-items to define the vertical alignment of items.
- Use flex-direction if you need columns instead of rows.
- Use the row-reverse or column-reverse values to flip item order.
- Use order to customize the order of individual elements.
- Use align-self to vertically align individual items.
- Use flex to create flexible boxes that can stretch and shrink.

### Viewport Metatag

You can use `viewport` to automatically scale your viewport to compensate for the device scaling the viewport.

```
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Media

Only work correctly if viewport metatag is set. Otherwise the browser lies about the number of pixels.

```
@media (max-width: 300px) {
  body {
    background: blue;
  }
}

@media screen and (orientation: landscape) {
  body {
    background: rgb(255, 0, 0);
  }
}
```

## Lab 1 - Photographer's

### Submission

- Expected content
- Bootstrap menu
- Grid layout
- Good design (HTML structure and UX)

## C3 - Learning Web Design Principles Part 1

- Consistency: Branding, colors, navigation
- Typography: Clean. Minimal number
- Images: Add to experience, focus on point, match color scheme
- Whitespace: Focus and clarity
- Convention
- Simplicity: Limit options, drill in for complexity, few click
- Color: Limited hues, Primary, secondary. Complementary. Dark/Light theme. HSB, RGB
- Iconography: Standard icons. Explain purpose.
- Intuative Navigation: Bread crumb, go forward, back, and where you want. Use standards.
- Responsive: different devices, vertical/horizontal, large/small
- Interactive: Pop out CTAs, visually show what is happening
- Accessibility: Color blindness, visually impaired
- Internationalized: Language and culture
- Help when needed
- Walls: pay, registration, login, click paths
- Less Thinking: Put things where they will be wanted
- Customize to role of user
- Alignment
- Engagement

- Colors: https://color.adobe.com/create/color-wheel

- HSB: Hue (the color 360 RGB), Saturation (Rich to dull), Brightness (full to black, lightbulb)
  https://learnui.design/blog/the-hsb-color-system-practicioners-primer.html

### Submission

- Two sites the show good principles
- Two that don't
- Write report and give screenshots

## C4 - Learning Web Design Principles Part 2

- Review websites

### Submission

- Make a single webpage that has good readability, usability, accessibility, and attractiveness
- Does not have to be responsive
- Turn in screenshot

## CSS Quiz
