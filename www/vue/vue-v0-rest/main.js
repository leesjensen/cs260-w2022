var app = new Vue({
  el: '#app',
  data: {
    cities: [],
    prefix: '',
  },
  methods: {
    fetchCities() {
      var url = `https://cs260.click/api/city?q=${this.prefix}`;
      fetch(url)
        .then((d) => d.json())
        .then((citylist) => {
          this.cities = citylist.map((entry) => entry.city);
        });
    },
  },
});
