# Installing Packages

You should already have node installed. If you are using nvm, be sure to use:

```
nvm use stable
```

## Mongo

Start Mongo if it is not already started:

### Mac OS

Perhaps you have it running already as a service on MacOS:

```
brew services list
brew services start mongodb-community@4.0
```

### Windows

[See the documentation for Windows](https://docs.mongodb.com/v3.2/tutorial/install-mongodb-on-windows/).

### Linux

To check whether Mongo is running:

```
sudo systemctl status mongodb
```

To stop Mongo:

```
sudo systemctl stop mongodb
```

To start or restart Mongo:

```
sudo systemctl start mongodb
sudo systemctl restart mongodb
```

## Running Node

Let's setup node and install needed packages:

```
cd back-end
npm init
npm install express mongoose multer
```

We'll be using Express for the REST API. We'll use Mongoose to provide an object
interface for the Mongo database. And we'll use multer to help us upload images.

Now run the node server:

```
node server.js
```

This will start on port 3000 to answer API queries.

## Running the front end

You can run the front by doing the following:

```
cd front-end
npm install
npm run serve
```

You should be able to browse to `localhost:8080` and see the front end as it
exists so far:

![home page at the beginning](/screenshots/home-page-beginning.png)
