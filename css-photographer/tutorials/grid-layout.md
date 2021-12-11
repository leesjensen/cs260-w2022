In this part of the lab, you'll learn how to use a variety of grid systems to layout content.

## Using the Bootstrap grid

Bootstrap uses a [grid system](https://getbootstrap.com/docs/4.1/layout/grid/)for layout. This will let you organize your content into rows and columns. For example, on the home page, you can use the following to center an image in a single column:

```
  <div class="container">
    <div class="row">
      <div class="col-lg">
        <img src="/images/horses.jpg">
      </div>
    </div>
  </div>
```

You will want to add a style to ensure the image fits in the container:

```
img {
  width: 100%;
}
```

Play with some of the styles on the Bootstrap site to try out different numbers of columns.

For example, if you want to layout photos on your portfolio page, you can manually place them into rows and columns.

## Using CSS Flexbox and Grid

An alternative is to use the CSS Flexbox or Grid. I recommend reading a good article about this:

* [The ultimate CSS battle: Grid vs Flexbox](https://hackernoon.com/the-ultimate-css-battle-grid-vs-flexbox-d40da0449faf)
* [CSS Grid VS Flexbox: A Practical Comparison](https://tutorialzine.com/2017/03/css-grid-vs-flexbox)

There is also a very good practice site called [CSS Grid Garden](http://cssgridgarden.com/) that will teach you all the details of how to use a grid graphically.

For example, I laid out images with this HTML:

```
  <section class="portfolio">
    <div class="image">
      <img src="/images/emma-senior.jpg" />
    </div>
    <div class="image">
      <img src="/images/DSC_0025.JPG" />
    </div>
    <div class="image">
      <img src="/images/DSC_0087.JPG" />
    </div>
    <div class="image">
      <img src="/images/20141005_142107.jpg" />
    </div>
...
```

and this CSS grid:

```
/* Image Grid */
.portfolio {
  display: grid;
  grid-template: auto auto auto auto auto / 1fr 1fr 1fr;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
}

.image img {
  width: 100%;
}
```
Here is a screenshot:

![screenshot of grid layout for portfolio](https://github.com/BYU-CS-260-Winter-2019/lab1/blob/master/images/screenshots/portfolio-grid.png)


## Masonry

Sometimes you will have a variety of images with different sizes. In this case, it can be helpful to use a masonry layout. You can do this with pure CSS.

* [Creating a CSS-only Responsive Masonry](https://w3bits.com/css-masonry/)

I followed this and got the following result:

![screenshot of portfolio using a CSS masonry layout](https://github.com/BYU-CS-260-Winter-2019/lab1/blob/master/images/screenshots/portfolio-masonry.png)
