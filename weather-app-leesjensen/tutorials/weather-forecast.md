# Weather Forecast

Let's now use the Open Weather Map API to fetch the weather forecast for a city in the US.

## Results

First, edit `index.html` and add a new div for the results, right after the current weather conditions:

```
	<div id="forecastResults">
	</div>
```

## Fetching the forecast

We will use the same event handler, since we are getting the forecast for the same city. At the end of the function, add the following:

```
  const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ", US&units=imperial" + "&APPID=APIKEY";
  fetch(url2)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
    });
```

This is fetching the forecast, similarly to how we fetched the current weather. If you compare this to the previous code in the function, you'll see that the only thing that changes is the URL -- instead of "weather" it uses "forecast".

Inspect the JSON that is returned to see how this works. See also the [documentation](https://openweathermap.org/forecast5). In particular, note that this is a 5-day, 3-hour forecast. In other words, the forecast is for each 3 hour block of time each day. This is 8 forecast periods each day, for a total of 40.

## Format the Results

To format the results, you need to understand the JSON data that is returned. This is described in the documentation. Replace this last `console.log` with something like the following:

```
      let forecast = "";
      for (let i=0; i < json.list.length; i++) {
	forecast += "<h2>" + moment(json.list[i].dt_txt).format('MMMM Do YYYY, h:mm:ss a') + "</h2>";
	forecast += "<p>Temperature: " + json.list[i].main.temp + "</p>";
	forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>'
      }
      document.getElementById("forecastResults").innerHTML = forecast;
```

We are looping through each of the 40 forecast periods here. We use the [moment.js](https://momentjs.com/) library to convert the date/time text into something more readable. We then display the temperature and an icon for what the weather will be like during that period. We once again use the `getElementById` function and `innerHTML` to change what displays inside the div we setup.

## Additional Details

The JSON object we get from the API has additional information on the forecast. Add this information and format it to display clearly on your web page.
