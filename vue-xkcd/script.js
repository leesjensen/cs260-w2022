let app = new Vue({
  el: "#app",
  data: {
    loaded: false,
    current: {
      title: "",
      img: "",
      alt: "",
      num: -1,
      day: 0,
      month: 0,
      year: 0,
      date: "",
    },
  },
  created() {
    this.xkcd(-1);
  },
  methods: {
    xkcd(comicNumber) {
      if (comicNumber === -1) {
        comicNumber = "latest";
      }
      const url = `https://xkcd.now.sh/?comic=${comicNumber}`;
      console.log(url);

      this.loaded = false;
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then((json) => {
          this.loaded = true;
          this.current = json;
          const date = dayjs([json.year, json.month - 1, json.day]);
          this.current.date = date.format("dddd, MMMM D, YYYY");
        });
    },
    previousComic() {
      this.xkcd(this.current.num - 1);
    },
    nextComic() {
      this.xkcd(this.current.num + 1);
    },
  },
});
