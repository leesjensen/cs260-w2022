# Lesson 1: Preliminaries

I have supplied you with some code that has an empty ticket server and a bare-bones client that shows only a home page. The back end is in the `back-end` directory and the
front end is in the `front-end` directory. (Surprise!)

These tutorials will show you how to build an application that uses authentication,
from the ground up. The back end will use Node, Express, and Mongo, and the front
end uses Vue CLI.

To get this code running, you'll need to clone this repository.

If you are using nvm:

```
nvm use stable
```

Start by looking at the front end:

```
cd front-end
npm install
npm run serve
```

If you browse to `localhost:8080`, you should see:

![home page](/screenshots/home.png)

I have created a home page for you, with a logo across the top and forms for registration and login. This mimics a popular style for web applications. These forms are currently do not have event handlers.

If you dive into the code, you will see that `App.vue` has the branding, so it appears on every page. The `Home.vue` view uses a `HomePage` component for the front page. We are starting with a component here because we are going to eventually replace the home page view with different content if the user is logged in.

Kindly proceed to [Lesson 2](/tutorials/lesson2.md).
