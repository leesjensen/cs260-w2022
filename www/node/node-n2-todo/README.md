# N2 todo

This is the front end for the Todo List app. See the tutorials for how it
is built. This is very similar to the N1 ticket activity.

The exercise builds a backend server found in `back-end/server.js` and front end written in Vue that is located in the `front-end` directory. The exercise is set up to run locally with the server hosted on port 3000. The client then runs on 8080. The Vue CLI
proxies server requests in order to avoid CORS errors.

```
module.exports = {
  devServer: {
    proxy: 'http://localhost:3000',
  }
}
```

I changed this so I could run in production and only run a single server listening on port 3102. These are the steps I followed.

1. Moved the server into the root of the project. There is no need for `back-end` and it messed up the relative pathing.
1. Make sure Vue doesn't prefix path to the root.
   ```
   module.exports = {
       publicPath: '',
       configureWebpack: {
           devtool: 'source-map',
       },
   };
   ```
1. Build the front end distribution `npm run build` in the `front-end` directory. Commit the `dist` directory.
1. Change the server router `/server.js` to point to the `front-end/dist` directory for the route path.
1. The server is set to run on port 3102.
1. Change all the API endpoints to be prefixed with `/api/n1` so that they don't conflict with my other endpoints (`/api/cities` or `/api/xkcd`).
1. The whole thing can be ran by executing `node index.js`. Then open your browser to port 3102.

This is installed on the production server using PM2. (See Unit5.md for details.)

1. cd /var/www/html/node/node-n2-todo/back-end; npm install
1. pm2 start --name tickets server.js --watch --ignore-watch="node_modules"
1. pm2 save

The NGINX config is then modified to pass requests for this execise through to the node server running under PM2.

1. Edit `/etc/nginx/sites-available/default` and add the following to the main server config section.

   ```
   location /node/node-n2-todo/ {
       proxy_pass http://localhost:3102/;
   }

   location ~ ^/api/n2/.+ {
       proxy_pass    http://localhost:3102;
   }

   ```

1. `service nginx reload`

Note that the Vue Router will manipulate the URL so that everything appears at the root path.
