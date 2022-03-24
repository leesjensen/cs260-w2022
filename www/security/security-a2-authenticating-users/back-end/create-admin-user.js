const reader = require('readline-sync');
const mongoose = require('mongoose');
const users = require('./users.js');

const User = users.model;

const userName = process.env.MONGOUSER;
const dbPassword = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;
const dbName = 'pagliaccio';

const url = `mongodb+srv://${userName}:${dbPassword}@${hostname}/${dbName}`;

// connect to Mongo
mongoose.connect(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

// get the needed info
let firstName = reader.question('First name: ');
let lastName = reader.question('Last name: ');
let username = reader.question('Username: ');
const password = reader.question('Password: ', {
  hideEchoBack: true,
});

if (firstName === '' || lastName === '' || username === '' || password === '') {
  console.log(
    'You need to enter a first name, last name, username, and password'
  );
  process.exit();
}

User.findOne({
  username: username,
})
  .then((user) => {
    if (user) {
      console.log('That username already exists');
      process.exit();
    }
  })
  .then(() => {
    let user = new User({
      firstName: firstName,
      lastName: lastName,
      username: username,
      password: password,
      role: 'admin',
    });
    user.save().then(() => {
      console.log(
        'OK, admin user created for',
        firstName,
        lastName,
        'with username',
        username
      );
      process.exit();
    });
  })
  .catch((error) => {
    console.log(error);
  });
