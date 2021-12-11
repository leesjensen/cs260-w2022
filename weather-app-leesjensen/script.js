const apiKey = "eee30ee681c790618bc05b7129191cef";

function init() {
  const defaultLocation = "provo";
  getCurrentWeather(defaultLocation);
  getForecast(defaultLocation);

  document
    .getElementById("weatherSubmit")
    .addEventListener("click", function (event) {
      event.preventDefault();
      const value = document.getElementById("weatherInput").value;
      if (value === "") return;

      getCurrentWeather(value);
      getForecast(value);
    });
}

init();

function getCurrentWeather(location) {
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location},US&units=imperial&APPID=${apiKey}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      displayCurrentWeather(json);
    });
}

function displayCurrentWeather(json) {
  let results = "";
  results += `<h2>Weather in ${json.name}</h2>`;
  for (let i = 0; i < json.weather.length; i++) {
    results += `<img src="http://openweathermap.org/img/w/${json.weather[i].icon}.png"/>`;
  }
  results += `<h2>${json.main.temp} &deg;F</h2>`;

  const description = json.weather.map((e) => e.description).join(", ");
  results += `<p>${description}</p>`;

  document.getElementById("weatherResults").innerHTML = results;
}

function getForecast(location) {
  const url = `http://api.openweathermap.org/data/2.5/forecast?q=${location},US&units=imperial&APPID=${apiKey}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      displayForecast(json);
    });
}

function displayForecast(json) {
  const dailyForecastMap = convertForecast(json);

  let forecast = `<div class="container">`;
  dailyForecastMap.forEach((times, date) => {
    const dateText = dayjs(date).format("dddd, MMMM D, YYYY");

    forecast += `<div class="date">${dateText}</div>`;
    forecast += `<div class="row">`;

    times.forEach((hourlyForecast) => {
      forecast += `<div class="col timeCol">`;
      if (!!hourlyForecast.temp) {
        const timeText = dayjs().hour(hourlyForecast.time).format("h A");
        forecast += `<div class="time">${timeText}</div>`;
        forecast += `<div class="temperature">${hourlyForecast.temp}°F</div>`;
        forecast += `<img src="http://openweathermap.org/img/w/${hourlyForecast.icon}.png"/>`;
      }
      forecast += `</div>`;
    });
    forecast += `</div>`;
  });
  forecast += `</div>`;

  document.getElementById("forecastResults").innerHTML = forecast;
}

function convertForecast(json) {
  const dailyForecastMap = new Map();
  json.list.forEach((hourlyForecast) => {
    const date = hourlyForecast.dt_txt.split(" ")[0];
    let dailyForecast = dailyForecastMap.get(date);
    if (!dailyForecast) {
      dailyForecast = initializeForecast();
      dailyForecastMap.set(date, dailyForecast);
    }

    const dateTime = dayjs(hourlyForecast.dt_txt);

    dailyForecast[dateTime.hour() / 3] = {
      time: dateTime.hour(),
      temp: hourlyForecast.main.temp,
      icon: hourlyForecast.weather[0].icon,
    };
  });
  return dailyForecastMap;
}

function initializeForecast() {
  const dailyForecast = new Array(8);
  for (let i = 0; i < dailyForecast.length; i++) {
    dailyForecast[i] = {
      time: 3 * i,
    };
  }
  return dailyForecast;
}
