function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
}

let app = new Vue({
  el: "#app",
  data: {
    loaded: false,
    maxComic: Number.MAX_SAFE_INTEGER,
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
    addedName: "",
    addedComment: "",
    comments: {},
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
          if (comicNumber === "latest") {
            this.maxComic = json.num;
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    hasPrevious() {
      return this.current.num > 0;
    },
    previousComic() {
      this.xkcd(this.current.num - 1);
    },
    hasNext() {
      return this.current.num < this.maxComic;
    },
    nextComic() {
      this.xkcd(this.current.num + 1);
    },
    randomComic() {
      console.log(getRandom(0, 100));
      console.log(this.maxComic);
    },
    addComment() {
      if (!(this.current.num in this.comments)) {
        Vue.set(app.comments, this.current.num, new Array());
      }
      this.comments[this.current.num].push({
        author: this.addedName,
        text: this.addedComment,
      });
      this.addedName = "";
      this.addedComment = "";
    },
  },
});
