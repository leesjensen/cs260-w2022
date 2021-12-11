# Current Weather Conditions

We're going to learn how to use the Open Weather Map API to fetch the current weather for a city in the US.

## Create a form

First, edit `index.html` and add a basic form:

```
<form>
  <label>Enter a U.S. city</label>
  <input id="weatherInput" type="text"></input><br/>
  <input id="weatherSubmit" type="submit" value="Submit"></input>
</form>
<div id="weatherResults">
</div>
```

## Fetching the weather

We will write JavaScript inside the `script.js` file. Notice how this file is loaded from index.html. To get our code to execute after the page loads, we wrap it in the ready event.

We will first create an event handler that is called whenever the Submit button is pressed on our form. Inside the `script.js` file, add the following event handler:

```
document.getElementById("weatherSubmit").addEventListener("click", function(event) {
  event.preventDefault();
  const value = document.getElementById("weatherInput").value;
  if (value === "")
    return;
  console.log(value);
});
```

Here, we are using `getElementById` to get the submit button. We then use `addEventListener` to attach a click event handler. This handler is a normal JavaScript function.

Inside this function, we are going to use Ajax to call the Open Weather Map API. Normally, when you submit a form on a web page, the browser packages up the form data, sends it to the server, and the server sends back a new HTML page. You will see the entire page refresh in this case. With Ajax, we instead use the form data to fetch data from a server, then update the DOM for the web page directly. Since we only update a small portion of the DOM, the browser only need to redraw that portion of the page. This is more responsive for the user, so the web application starts to feel more like a desktop application.

This explains why we use the `event` object that we is passed to the `weather` function to call `preventDefault`. This ensures that the browser doesn't try to send the form information to the server, like it normally would.

We next use `getElementById` to get the input field from the form, and we store its value in a constant. This will let us use this value to send it to the Open Weather Map server. For now, we will just output this value to the console to be sure it works.

## Call the Weather API

At this point, you should have your own API key for the Open Weather Map service. If you don't, please see the instructions at the home page of this Wiki. We will call the API by adding this to our existing function:

```
  const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial" + "&APPID=APIKEY";
  fetch(url)
    .then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log(json);
    });
```

This uses the JavaScript `fetch` method to retrieve data from the given URL. This returns a Promise. Remember that a Promise handles asynchronous execution. When we send the fetch request to the server, we don't know how long this will take. By returning a Promise, we can continue doing other work. Once the request to the server returns, JavaScript will execute the function listed in the `then` portion of the promise. In this function, we return the value of `response.json()`, which returns *another* Promise. When this Promise is finished, it will have converted the response we received from the API into a JSON object. It will call the function in the following `then`. Here we simply have a statement to print to the console so you can inspect the results. Take a look at what the JSON object contains.

Note that our URL adds text to the query to make this a city in the US, and also adds a setting so that returned values are in Imperial units. The API key is added to the end of the query.

You could also supply a function to call in case of an error.

## Format the Results

To format the results, you need to understand the JSON data that is returned. This is described in the documentation. Replace this last `console.log` with something like the following:

```
      let results = "";
      results += '<h2>Weather in ' + json.name + "</h2>";
      for (let i=0; i < json.weather.length; i++) {
	results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
      }
      results += '<h2>' + json.main.temp + " &deg;F</h2>"
      results += "<p>"
      for (let i=0; i < json.weather.length; i++) {
	results += json.weather[i].description
	if (i !== json.weather.length - 1)
	  results += ", "
      }
      results += "</p>";
      document.getElementById("weatherResults").innerHTML = results;
```

We first list the name of the city. Then we loop through the current weather and add an [image for each of the icons used to display the current weather](https://openweathermap.org/weather-conditions). We add the current temperature. We finally loop through the current weather again and add the text description of the weather.

The last thing we do is use `getElementById` and `innerHTML` to set the `#weatherResults` div to contain this list.

## Additional Details

The JSON object we get from the API has additional information on the current weather. Add this information and format it to display clearly on your web page.
