#Unit 5 - Node and Express

## Interesting Things

- [Node as service under nginx](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04)
- [PM2 node services](https://pm2.keymetrics.io/)

## PM2

Node service package manager.

```
sudo npm install pm2@latest -g
```

- **Start node service** - `pm2 start app.js`
- **Start advanced** - `pm2 --name cities bin/www --watch --ignore-watch="node_modules"`
- **restart** - `pm2 restart app_name`
- **reload** - `pm2 reload app_name`
- **stop** - `pm2 stop app_name`
- **delete** - `pm2 delete app_name`
- **List servcies** - `pm2 ls`
- **Run on reboot** - `pm2 startup systemd`

### N2.6 Node Cities
