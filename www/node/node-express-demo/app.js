const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello Express!<h1>');
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
