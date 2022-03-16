#Unit 5 - Node and Express

## Work to do

- Setup Mongo local and on server
  > I did this on cs260.click and on MongoCloud Atlas. I installed mongodbsh and also the vs code extension.
- N3: Learning Mongo
  > The quiz has some problems. It should really use async/await. I rewrote the quiz.
  > Done all of this except Lesson 3: ticket database. This looks like a simple step through.
  > I need to learn mongoose better as it does seem to help with converting data to objects.
- N4: Mongo Pokemon
- N5: Full stack
- Lab4: Museum

## Interesting Things

- [Node as service under nginx](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-18-04)
- [PM2 node services](https://pm2.keymetrics.io/)
- [Node and Express Overview](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction)

## Modules

The problem of mixing ES Modules and CommonJS Modules is that
ES Modules load asynchronously. So we need to wrap them in a
promise in order to load them in generic JS files. Alternatively
you can import them into an existing Module or make your JS file
into a module with the file extension `.mjs` or `<script module>`
This won't work unless it is loaded in a module

```
import chalk from 'chalk';
console.log(chalk.white.bgBlue.underline(' 😀 BYU 😀 '));
```

You can work around it by doing a dynamic import through a promise

```
import('chalk').then((c) => {
const chalk = c.default;
console.log(chalk.white.bgBlue.underline(' 😀 BYU 😀 '));
});
```

## PM2

[PM2](https://pm2.keymetrics.io/docs/usage/quick-start/)
Node service package manager.

```
sudo npm install pm2@latest -g
```

- **Start node service** - `pm2 start app.js`
- **Start advanced** - `pm2 start --name cities bin/www --watch --ignore-watch="node_modules"`
- **restart** - `pm2 restart app_name`
- **reload** - `pm2 reload app_name`
- **stop** - `pm2 stop app_name`
- **delete** - `pm2 delete app_name`
- **List servcies** - `pm2 ls`
- **Run on reboot** - `pm2 startup systemd`

You still need to do 'npm install' when you first deploy a new dependency for the node application.
Also I don't think the --watch is working.

## Install Mongosh

https://docs.mongodb.com/mongodb-shell/install/

`brew install mongosh`

## Mongo Install Steps for Ubuntu server

Instead of doing this I think we should just use MongoCloud. It's free and easy to setup.

### Creating OS user

This doesn't seem to be necessary. In a real production system you would want to install Mongo under this user.

1. adduser mongouser
   Give junk learning user password
1. usermod -aG sudo mongouser

### Useful links

https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-18-04-source

https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/

https://www.digitalocean.com/community/tutorials/how-to-configure-remote-access-for-mongodb-on-ubuntu-20-04

https://www.digitalocean.com/community/tutorials/how-to-secure-mongodb-on-ubuntu-20-04

### Step for server install

1. Install Mongo DB

   `sudo apt update`
   `sudo apt install mongodb`
   `sudo service mongodb status`

1. Use the client to make sure you can connect locally

   `mongo`

1. Expose the mongo port through the firewall

   Get the port mongodb is listening on.

   `sudo lsof -i | grep mongo`

   This returned that port 27017 was used

   `mongod 391524 mongodb 11u IPv4 3770333 0t0 TCP localhost:27017 (LISTEN)`

   `sudo ufw allow 27017`

1. Modify Mongo to bind to the public IP

   `sudo vi /etc/mongodb.conf`

   Add your server's public IP address to the end of the bindIp value.

   `bind_ip = 127.0.0.1,<yourServerIPHere>`

1. Restart MongoDB

   `sudo service mongodb restart`

1. From your development machine test the connection

   `nc -zv <yourServerIPHere> 27017`

   `Connection to cs260.click port 27017 [tcp/*] succeeded!`

### Enabling security

### Create Mongo user

1. Add Mongo admin user
   `mongo`

   ```
   db.createUser({
     user: "yourUserNameHere",
     pwd: passwordPrompt(),
     roles: [ { role: "userAdminAnyDatabase", db: "admin" }, "readWriteAnyDatabase" ]
   })
   ```

1. Enable authentication

   `sudo vi /etc/mongodb.conf`

   Uncomment the line:

   `auth = true`

### Connecting

1. Log into Mongo using the credentials

   `mongo -u <yourUserNameHere> -p --authenticationDatabase admin`

1. Remotely login

```
 mongosh "mongodb://mongouser@cs260.click/admin"
```

## MongoDB Atlas

cloud.mongodb.com

### Connecting

```
mongosh "mongodb+srv://cluster0.2iaao.mongodb.net/myFirstDatabase" --apiVersion 1 --username cs260mongo
```
