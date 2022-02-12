var app = new Vue({
  el: '#app',
  data: {
    cities: [],
    prefix: '',
  },
  methods: {
    fetchREST() {
      let query = this.prefix;
      if (query.length > 0) {
        query = query[0].toUpperCase() + query.slice(1).toLowerCase();
      } else {
        query = '*';
      }
      var url = `https://cs260.click/api/city?q=${query}`;
      fetch(url)
        .then((data) => {
          return data.json();
        })
        .then((citylist) => {
          console.log('CityList');
          console.log(citylist);
          this.cities = [];
          for (let i = 0; i < citylist.length; i++) {
            console.log(citylist[i].city);
            this.cities.push({ name: citylist[i].city });
          }
          console.log('Got Citylist');
        });
    },
  },
});
