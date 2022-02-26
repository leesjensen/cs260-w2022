var app = new Vue({
  el: '#app',
  data: {
    cities: [],
    prefix: '',
  },
  methods: {
    fetchREST() {
      let url = '/api/city?q=' + this.prefix;
      fetch(url)
        .then((data) => {
          return data.json();
        })
        .then((citylist) => {
          this.cities = [];
          for (let i = 0; i < citylist.length; i++) {
            console.log(citylist[i].city);
            this.cities.push({ name: citylist[i].city });
          }
        });
    },

    // Original method call bioresearch service.
    // fetchREST() {
    //   console.log("In Fetch " + this.prefix);
    //   var url = "http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=" + this.prefix;
    //   console.log("URL " + url);
    //   fetch(url)
    //     .then((data) => {
    //       return (data.json());
    //     })
    //     .then((citylist) => {
    //       console.log("CityList");
    //       console.log(citylist);
    //       this.cities = [];
    //       for (let i = 0; i < citylist.length; i++) {
    //         console.log(citylist[i].city);
    //         this.cities.push({ name: citylist[i].city });
    //       };
    //       console.log("Got Citylist");
    //     });
    // },
  },
});
