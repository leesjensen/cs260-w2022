# Learning Mongo: Installation

You can setup Mongo on both your laptop and your server. There is [installation documentation](https://docs.mongodb.com/manual/installation/) on the Mongo website but the below
summarizes the steps needed for each OS.

## Installing on MacOS

First, tap the official MongoDb repository:

```
brew tap mongodb/brew
```

Then install Mongo:

```
brew install mongodb-community@4.0
```

To run from the command line in the foreground:

```
mongod --config /usr/local/etc/mongod.conf
```

(you can exit with `control-c`)

To run as a service:

```
brew services start mongodb-community@4.0
```

## Installing on Windows

First, [download the Windows 64-bit](https://www.mongodb.com/download-center/community?jmp=docs), MSI installation for the current version.

Next, double-click the MSI file you downloaded. You can install with the
defaults. Install [MongoDB Compass](https://www.mongodb.com/products/compass)
for a GUI for the database.

## Installing on Linux

*Note, MongoDB recommends using their official repositories, but I've never
had a problem using the Ubuntu repositories.*

To install MongoDB:

```
sudo apt update
sudo apt install mongodb
```

Mongo will run on port `27017` by default.

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

By default Mongo is setup to run automatically. To disable/enable this behavior:

```
sudo systemctl disable mongodb
sudo systemctl enable mongodb
```
