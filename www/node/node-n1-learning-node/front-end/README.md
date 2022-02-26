# learning-vue-cli-solution

The exercise builds a backend server found in `server.js` and front end written in Vue. The exercise is
set up to run locally as the server is hosted on port 3000. The client then runs on 8080. The Vue CLI
proxies server requests in order to avoid CORS errors.

```
module.exports = {
  devServer: {
    proxy: 'http://localhost:3000',
  }
}
```

I changed this so I could run in production. These are the steps I followed.

1. Build the front end distribution `npm run build` in the `front-end` direction. Commit the dist result.
2. Change the server router `/server.js` to point to the `front-end/dist` directory for the route path.
