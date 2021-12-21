# Getting Started

To begin this lab, you should already have Node.js and the Vue CLI installed. If
you have not already done that, see [Learning the Vue
CLI](https://github.com/BYU-CS-260/learning-vue-cli).

Assuming you have that done, you can create a new Vue CLI project. These instructions also assume you are working in the directory where you have cloned this lab.

```
vue create grocery-store
```

Be sure to select **Manually select features** and choose **Router**. If there is an option to "choose a version of Vue.js that you want to start the project with" be sure to select v.2.  For all other choices you can use the default. **If you are using Windows and having trouble selecting the options you can run "winpty vue.cmd create grocery-store" for interactive feature selection.**

This will create everything needed for this project in a directory called `grocery-store`.
If you are in your GitHub classroom repo, this will look like:

```
lab-first-last/
  grocery-store/
    README.md
    node_modules/
    package.json
    ...
```

If you would like, you can move all those files into the top part of your lab directory:

```
mv grocery-store/* .
mv grocery-store/.[a-z]* .
rmdir grocery-store
```

You can now run:

```
git add .
git commit -a
git push
```

To commit all your code to this repo and push it to GitHub.

Run

```
npm run serve
```

so that you can have a web server running your code. If you visit `localhost:8080`
you should see the default Vue application:

![default Vue Application](/screenshots/vue-default-app-home.png)

## Overview of files
These are the files we are editing for this project and a good reference to check whenever you have questions.

- main.js -- global data structures (products, cart)
- App.vue -- code that goes on all your pages, like a menu or a footer
- router/index.js -- configure which view to use for each URL
- views/Home.vue -- view/component for the home page. Shows a search box and retrieves the product list from the global data structure. Uses the ProductList component to display a list of all products.
- views/Browse.vue -- view/component for the browse page. Shows a menu and keeps track of which menu item the user clicks on. Based on the menu item, calculates a subset of products that are from that country. Uses the ProductList component to display a list of the products for the selected country.
- components/ProductList.vue -- component that takes a list of products (in a props list) and displays them on the page. The component that uses the ProductList as a child component has to import it and pass it a list of products using a prop (from its props list).

## Next Tutorial

[Setup and Navigation](/tutorials/2-Setup-and-Navigation.md)
