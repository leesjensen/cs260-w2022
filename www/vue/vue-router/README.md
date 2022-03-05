# Vue Router

This repository is a slimmed down clone of the vue router repo that I have included only for the examples.

To install the examples on a server I used PM2. (See Unit5.md for details.)

1. cd /var/www/html/node/node-n2-todo/back-end; npm install
1. pm2 start --name vue-router server.js --watch --ignore-watch="node_modules"
1. pm2 save

I set the default port to be 3105 and load it under a subdomain `vue-router`.
