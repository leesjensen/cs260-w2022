var express = require('express');
var cities = require('../cities.js');
var router = express.Router();

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

module.exports = router;
