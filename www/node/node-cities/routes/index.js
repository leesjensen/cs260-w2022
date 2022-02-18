const express = require('express');
const axios = require('axios');
const cities = require('../cities.js');
const router = express.Router();

/* GET home page. */
// - From express template. Not used since we expose the entire public directory in app.js
// - with app.use(express.static(path.join(__dirname, 'public')));
// router.get('/', function (req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/api/city', function (req, res, next) {
  const cityQuery = req.query.q || '.*';

  try {
    const cityQueryRegEx = new RegExp(cityQuery, 'i');

    cities.get().then((data) => {
      const result = data.filter((item) => cityQueryRegEx.test(item.city));
      res.json(result);
    });
  } catch (error) {
    res
      .status(400)
      .send({ message: `'${cityQuery}' is not a valid regular expression` });
  }
});

router.get('/api/xkcd/:number?', function (req, res, next) {
  let comicNumber = req.query.number || '';
  if (comicNumber) {
    comicNumber += '/';
  }

  const xkcdUrl = `https://xkcd.com/${comicNumber}info.0.json`;
  console.log(xkcdUrl);
  axios
    .get(xkcdUrl)
    .then((response) => res.json(response.data))
    .catch((error) => {
      res.status(500).send({ message: `failed to get result from XKCD` });
    });
  // fetch(xkcdUrl)
  //   .then((result) => result.json())
  //   .then((json) => res.json(json))
  //   .catch((error) => res.status(500).send({ message: `failed to get result from XKCD` }));
});

module.exports = router;
