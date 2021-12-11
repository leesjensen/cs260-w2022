# Vue-REST

You can also access REST services from Vue.  This example will show you how easy it is to mix fetch calls with Vue to display the data.  In this tutorial, we will show you how to access the Utah cities REST service from your Vue application.

1. First create your index.html file with a form where the user can type in the first letters of a city:
```
<body>
  <div id="app">
    <h1>Select a City</h1>
    <form v-on:keyup.prevent="fetchREST">
      <input type="text" v-model="prefix">
    </form>
    <ul>
      <li v-for="item in cities">
        {{ item.name }}
      </li>
    </ul>
  </div>
  <script src="https://cdn.jsdelivr.net/npm/vue@2.6.2/dist/vue.js"></script>
  <script src="script.js"></script>
</body>
```
Notice that we are going to capture the keyup event and will call 'fetchREST' when this occurs.  The model variable 'prefix' will contain the characters that have been typed into the box.  We will use an array of objects called 'cities' that will have objects with a 'name' field that will be displayed using the mustache syntax.

2. Now build your script.js file using the 'app' id.

```
var app = new Vue({
  el: '#app',
  data: {
    cities: [],
    prefix: '',
  },
});
```
Notice that we define the 'cities' array and the 'prefix' model variable.

3. Add the 'fetchREST' function and make sure that it is called with the correct 'prefix'.
```
  methods: {
    fetchREST() {
      console.log("In Fetch " + this.prefix);
    },
  },
```
4. Now add the code to fetch the cities that start with 'prefix' from the REST service. Once the data has been returned, the 'then' promise calls the 'json()' promise to convert the json to a javascript array.  Since this is an asynchronous call, we add another then when the conversion completes.  At this point, the 'cities' array is truncated and the cities from the REST service are pushed onto the 'cities' array.  They will then automatically be displayed with the mustache syntax in the html file.
```
      var url = "http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=" + this.prefix;
      console.log("URL " + url);
      fetch(url)
        .then((data) => {
          return (data.json());
        })
        .then((citylist) => {
          console.log("CityList");
          console.log(citylist);
          this.cities = [];
          for (let i = 0; i < citylist.length; i++) {
            console.log(citylist[i].city);
            this.cities.push({ name: citylist[i].city });
          };
          console.log("Got Citylist");
        });
```
