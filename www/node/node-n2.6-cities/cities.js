var fs = require("fs");

let cities;
function get() {
  return new Promise((resolve) => {
    if (!!cities) {
      resolve(cities);
    } else {
      fs.readFile(__dirname + "/public/cities.json", function (err, data) {
        if (err) throw err;
        cities = JSON.parse(data.toString());
        cities.push({ city: "Leetown" });
        resolve(cities);
      });
    }
  });
}

module.exports = { get };
