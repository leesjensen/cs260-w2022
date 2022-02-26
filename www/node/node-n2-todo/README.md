# Node, Express, and Vue Todo List

This is a simple todo list application built using [Node](https://nodejs.org/en/), [Express](https://expressjs.com/), and [Vue](https://vuejs.org/).

To learn how this is built, clone this repository, then follow the [tutorials](/tutorials).

I tweaked this so that you can run the Vue app underneath the express server. This was done by building a production deployment and copying the dist directory to the public directory of the backend.

One time setup after cloning the repo in order to get the packages

```
cd front-end
npm install

cd back-end
npm install
```

You can build and run the code with:

```
cd front-end
npm run deploy

cd back-end
npm run serve
```

Then open your browser to localhost:3000
