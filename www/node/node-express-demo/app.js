const express = require('express');
const app = express();

// Middleware of your own creation
app.use(function (req, res, next) {
  console.log('hello');
  next();
});

// Static content
app.use(express.static('public'));

// Dynamic content
app.get('/dynamic', (req, res, next) => {
  res.send('<h1>Hello from dynamic content!<h1>');
});

// Router and parameters
var userRouter = express.Router();
app.use('/user', userRouter);
userRouter.get('/:id', (req, res) => {
  res.send(`User Page for ${req.params.id}`);
});

// JSON body parsing using built-in middleware
app.use(express.json());
app.post('/user/:id', function (req, res) {
  res.send({ responseName: req.body.name });
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
