/*global axios */
/*global Vue */
var app = new Vue({
  el: '#app',
  data: {
    pokis: [],
    politics: [],
    pokiName: '',
    pokiURL: '',
  },
  created: function () {
    this.getpokis();
    this.getpolitics();
  },
  methods: {
    addItem() {
      var url = 'pokemon';
      axios
        .post(url, {
          name: this.pokiName,
          avatarUrl: this.pokiURL,
        })
        .then((response) => {})
        .catch((e) => {
          console.log(e);
        });
      this.pokiName = '';
      this.pokiURL = '';
      this.getpokis();
    },
    async getpokis() {
      // `this` points to the vm instance
      console.log('get pokis');
      var url = 'pokemon';
      try {
        let response = await axios.get(url);
        this.pokis = response.data;
        console.log(this.pokis);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getpolitics() {
      // `this` points to the vm instance
      console.log('politics');
      var url = 'politics';
      try {
        let response = await axios.get(url);
        this.politics = response.data;
        console.log(this.politics);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
