//https://home.openweathermap.org/api_keys
let apiKey = "";

function init() {
  getApiKey().then((key) => {
    apiKey = key;
    const defaultLocation = "provo";
    getCurrentWeather(defaultLocation);

    document
      .getElementById("weatherSubmit")
      .addEventListener("click", function (event) {
        event.preventDefault();
        const value = document.getElementById("weatherInput").value;
        if (value === "") return;

        getCurrentWeather(value);
      });
  });
}

init();

function getCurrentWeather(location) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},US&units=imperial&APPID=${apiKey}`;
  fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      displayCurrentWeather(json);
      getForecast(location, json.timezone);
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

function getForecast(location, timezone) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${location},US&units=imperial&APPID=${apiKey}`;
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      displayForecast(json, timezone);
    });
}

function displayForecast(json, timezone) {
  const dailyForecastMap = convertForecast(json, timezone);

  let forecast = `<div class="container">`;
  dailyForecastMap.forEach((times, dateDisplay) => {
    forecast += `<div class="row">`;
    forecast += `<div class="date">${dateDisplay}</div>`;

    times.forEach((hourlyForecast) => {
      forecast += `<div class="col timeCol">`;
      if (!!hourlyForecast.temp) {
        const timeText = hourlyForecast.time.format("h A");
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

function convertForecast(json, timezone) {
  const dailyForecastMap = new Map();
  json.list.forEach((hourlyForecast) => {
    let dateTime = dayjs(hourlyForecast.dt_txt);
    dateTime = dateTime.add(timezone, "second");
    console.log(dateTime);

    const day = dateTime.format("dddd, MMMM D, YYYY");
    let dailyForecast = dailyForecastMap.get(day);
    if (!dailyForecast) {
      dailyForecast = [];
      dailyForecastMap.set(day, dailyForecast);
    }
    dailyForecast.push({
      time: dateTime,
      temp: hourlyForecast.main.temp,
      icon: hourlyForecast.weather[0].icon,
    });
  });
  return dailyForecastMap;
}

async function getApiKey() {
  const response = await fetch("https://cs260.click/data.json");
  const data = await response.json();
  return data.weather;
}
