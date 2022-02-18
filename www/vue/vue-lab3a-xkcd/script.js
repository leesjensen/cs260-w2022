Vue.component('star-rating', VueStarRating.default);

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum and minimum are inclusive
}

let app = new Vue({
  el: '#app',
  data: {
    loaded: false,
    maxComic: Number.MAX_SAFE_INTEGER,
    current: {
      title: '',
      img: '',
      alt: '',
      num: -1,
      day: 0,
      month: 0,
      year: 0,
      date: '',
    },
    addedName: '',
    addedComment: '',
    ratings: {},
    comments: {},
  },
  created() {
    this.xkcd(-1);
  },
  computed: {
    starRating: function () {
      const ratingInfo = this.ratings[this.current.num];
      return ratingInfo.sum / ratingInfo.total;
    },
  },
  methods: {
    xkcd(comicNumber) {
      if (comicNumber === -1) {
        comicNumber = 'latest';
      }
      const url = `https://cs260.click/api/xkcd/${comicNumber}`;
      console.log(url);

      this.loaded = false;
      fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then((json) => {
          this.loaded = true;
          this.current = json;
          const date = dayjs([json.year, json.month, json.day]);
          this.current.date = date.format('dddd, MMMM D, YYYY');
          if (comicNumber === 'latest') {
            this.maxComic = json.num;
          }
          if (!(this.current.num in this.ratings)) {
            app.ratings[this.current.num] = { sum: 0, total: 0 };
            //Vue.set(app.ratings, this.current.num, { sum: 0, total: 0 });
          }
          if (!(this.current.num in this.comments)) {
            Vue.set(app.comments, this.current.num, new Array());
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
    firstComic() {
      return this.xkcd(1);
    },
    lastComic() {
      return this.xkcd(this.maxComic);
    },
    randomComic() {
      this.xkcd(getRandom(1, this.maxComic));
    },
    addRating(rating) {
      this.ratings[this.current.num].sum += rating;
      this.ratings[this.current.num].total += 1;
    },
    addComment() {
      this.comments[this.current.num].push({
        author: this.addedName,
        text: this.addedComment,
        date: dayjs().format('dddd, MMMM D, YYYY HH:mm:ss'),
      });
      this.addedName = '';
      this.addedComment = '';
    },
  },
});
