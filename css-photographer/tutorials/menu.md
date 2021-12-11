
In this part of the lab, you're going to learn how to use the [Bootstrap](https://getbootstrap.com/) library to build a menu for a website.

## Preface

I highly recommend you install a code formatter for your editor. This will automatically indent your code for you, so that your code is always easy to read. I used [beautify](https://atom.io/packages/atom-beautify) for Atom, and set it up so that it will automatically indent my code when I save the file.

## Get Bootstrap

Visit the [Introduction](https://getbootstrap.com/docs/4.1/getting-started/introduction/) page for Bootstrap, and at the top you will see how to link to Bootstrap in your HTML files. Copy the link to the style sheet and put it in `index.html` so it looks like this:

```
<head>
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
  <link rel="stylesheet" href="/styles.css" />
  <title>Your title here</title>
</head>
```
This will give you all of Bootstrap's CSS files.

Next, copy the `script` tags and place them at the bottom of your `body` tag, so they look like this:

```
  <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>
</body>

```

These `script` tags contain links to JavaScript code that switches to a different menu system when you browse your site from a mobile device. We call this *responsive design*.

## Use a Menu

On the Bootstrap Introduction page, click on "Components" in the menu on the left, then "Navbar", and you will see Bootstrap's instructions on how to create a menu. Their menu is *responsive*, meaning it will automatically change to a mobile menu when you use a phone, or use the widescreen version if you have enough space.

Scroll down to the [Nav section](https://getbootstrap.com/docs/4.1/components/navbar/#nav) and copy the code you see there. Place it in `index.html`, right after the `body` tag.

Start a Python web server:

```
python3 -m http.server
```

and view your page in a browser. You should see this:

![screenshot of default Bootstrap navbar](https://github.com/BYU-CS-260-Winter-2019/lab1/blob/master/images/screenshots/navbar-default.png)

## Customize the content of the menu

The Bootstrap menu includes a "brand" for your website. The HTML looks like this:

```
<a class="navbar-brand" href="#">Navbar</a>
```

Change this to whatever you would like. Many sites put a logo here.

The menu also includes a set of links to different pages. They are in an unordered list -- a `ul` element. Find these and change them so that they link to the pages in this lab. For example, you can include a link to your portfolio like this:

```
        <li class="nav-item">
          <a class="nav-link" href="/pages/portfolio.html">Portfolio</a>
        </li>
```

Notice that you need to change the `href` attribute to link to your page. All pages start with "/", meaning the top folder of your site.

You will need to likewise change all the other links, so that you have working links for `Home`, `About`, `Contact`, and `Reviews`. You probably don't want any disabled links, so be sure to remove the `disabled` CSS class that is included in the default setup. You can use the `active` CSS class to indicate which link is the one for the current page.

Note, when you navigate to your other pages, they will be empty, and not even have a menu on them. We will get the menu working nicely first, then copy it to the other pages. Later, we will show you how to setup a system where you can write code for the menu in one place and then have it appear on all the pages of your site.

## Customize the style of the menu

Scroll down to the [Color Schemes](https://getbootstrap.com/docs/4.1/components/navbar/#color-schemes) section of the page and you will see that Bootstrap has some built-in color schemes you can choose from. Try changing the class on your `navbar` element to try different color schemes.

You can also change the menu to use whatever color scheme you like. All you have to do is set a style in `styles.css` that overrides the scheme you are using. For example:

```
/* Menu */
.bg-dark {
  background-color: #7DD3D8 !important;
}
```

Note that you need to use the modifier `!important` to override the style in this case, since Bootstrap sets this as important.

If you use this color, you will notice that now the text is a little faint on the background of the menu. If you right click on the menu text and choose `Inspect Element`, you can see the CSS rules that Bootstrap is using. You can copy these and change them, such as:

```
.navbar-dark .navbar-nav .nav-link:focus, .navbar-dark .navbar-nav .nav-link:hover {
  color: #333;
}

.navbar-dark .navbar-nav .nav-link {
  color: #fff;
}
```
## Test for responsive design

While viewing your site in a browser, open the developer tools. On Firefox, for example, this is under ``Web Developer:Toggle Tools``. Look for the small icon that shows a mobile phone and a tablet. If you click this, you can test your site and see how it would look on a phone or tablet.

* [Responsive design in Firefox](https://developer.mozilla.org/en-US/docs/Tools/Responsive_Design_Mode)
* [Responsive design in Chrome](https://developers.google.com/web/tools/chrome-devtools/device-mode/)

## On your own

Modify your menu look how you want.
