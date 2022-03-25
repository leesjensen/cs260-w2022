const express = require('express');
const app = express();

app.use(express.static('public'));

app.get('/dynamic', (req, res, next) => {
  res.send('<h1>Hello from dynamic content!<h1>');
});

app.use(express.json());
app.post('/user/:id', function (req, res) {
  res.send({ responseName: req.body.name });
});

app.listen(5090, () => {
  console.log(`Listening on port 5090`);
});
