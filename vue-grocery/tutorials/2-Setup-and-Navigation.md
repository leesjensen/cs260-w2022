# Setup and Navigation

## Title and Libraries

We want to change the title of our application. To do this, edit public/index.html and change the title. While you're there, also add some useful libraries:

```
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.12.1/css/all.min.css" integrity="sha256-mmgLkCYLUQbXn0B1SRqzHar6dCnv9oZFPEC1g1cwlkk=" crossorigin="anonymous" />
<link rel="stylesheet" href="https://unpkg.com/purecss@1.0.1/build/pure-min.css" integrity="sha384-oAOxQR6DkCoMliIh8yFnu25d7Eq/PHS21PClpwjOTeU2jRSq11vu66rf90/cZr47" crossorigin="anonymous">
<title>Mother Earth</title>
```

We'll be using [Font Awesome](https://fontawesome.com/) to provide useful icons.
All you have to do is include the library and then you can easily include them in
your HTML code.

We'll also be using [Pure CSS](https://purecss.io/) for some styling help.

## Navigation

We want to include a navigation header on the website, including the brand and
several links. The first step is to copy in some images we have provided:

```
cp -r images public/
```

This copies the entire images directory to the public directory of your project.

Now we can modify the HTML template in `src/App.vue` so that it contains the following:

```
<template>
<div id="app">
  <div id="menu">
    <div id="brand">
      <router-link to="/">
        <img src="/images/logo.png">
      </router-link>
    </div>
    <div id="side">
      <router-link to="/browse">
        <div class="menu-item browse">
          <img src="/images/globe.png">
          <p>Browse</p>
        </div>
      </router-link>
      <router-link to="/cart">
        <div class="menu-item">
          <img src="/images/love.png">
          <p>0 items</p>
        </div>
      </router-link>
    </div>
  </div>
  <router-view />
</div>
</template>
```

This creates a menu using two `div` elements, one for the brand (a logo) and the
other for two menu items (browse, cart). Each of these also uses `router-link`
to create links that use [Vue Router](https://router.vuejs.org/). This is instead
of the usual `a` elements in HTML. Marking our links in this way ensures that
Vue will load them using Vue Router, which in turn places their content into the
`router-view` tag.

In this same area, replace the `style` section so it has the following CSS styles:

```
<style>
* {
  box-sizing: border-box;
}

body {
  margin: 50px 100px;

}

#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "none brand side";
  margin-bottom: 50px;
}

#menu a {
  color: #B84901;
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}

#brand img {
  height: 200px;
}

#side {
  grid-area: side;
  display: flex;
  justify-content: flex-end;
}

#side img {
  width: 50px;
}

.menu-item {
  display: flex;
  flex-direction: column;
}

.menu-item p {
  margin: 0px;
}

.browse {
  margin-right: 50px;
}
</style>
```

If you do this, you should see the menu at the top:

![navigation](/screenshots/navigation.png)

## CSS tricks

Getting this menu to work was a little tricky, because it has a centered brand
and then links justified to the right. The easiest way I found to do that is
to use flexbox nested inside of a grid.

So let's see how this is done. Notice the `div` wrapping the entire menu
has a `#menu` id on it. These are the relevant styles:

```
#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "none brand side";
}
```

This sets up a [CSS grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout)
that has three columns, each one taking up one third of the space using `grid-template-columns`.
The `1fr` indicates one equal fraction of the width of the screen. Each column has a `5px`
gap between it. We then name these three columns `none`, `brand`, and `side`. These
names can be anything you want. I use `none` to mean we will not put any content there.

Next, if you look at the brand, it is wrapped in a `div` with a `#brand` id. This
has these important styles:

```
#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}
```

The first one, `grid-area`, places this div into the column named `brand`. This
`brand` matches the `brand` from `grid-template-areas`. Note, I used the same
name for the column area (`brand`) as the id (`#brand`) but these don't have to
match.

We also style `#brand` with a flexbox (`flex`) and justify its content to align
in the center. This is nesting a flexbox within the second grid column. The grid ensures
that the `#brand` content is placed in the center of the page. The flexbox ensures that
the image inside the `#brand` div is centered.

Now, if you look at the menu links, they are wrapped in a `div` with a `#side` id.
This has these important styles:

```
#side {
  grid-area: side;
  display: flex;
  justify-content: right;
}
```

This puts the `#side` div into the third column of the grid layout. Like with
the `#brand`, we use a flexbox here, which is nested inside the third column.
We justify this content to the right instead of center.

If you keep looking, you'll see we also used yet another flexbox to get the logo
for each menu item to be on top of the text for that menu item. I was being
really picky with how I wanted this laid out, but flexbox lets you do this
pretty easily.

## Next Tutorial

[Products](/tutorials/3-Products.md)
