const app = new Vue({
  el: '#app',
  data: {
    newComment: '',
    comments: [],
  },
  created: function () {
    this.getAll();
  },
  methods: {
    addComment() {
      const comment = { title: this.newComment, upvotes: 0 };
      fetch('comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(comment),
      })
        .then((r) => r.json())
        .then((response) => {
          this.comments.push(response);
        });
    },
    incrementUpvotes(item) {
      fetch(`comments/${item._id}/upvote`, {
        method: 'PUT',
      })
        .then((r) => r.json())
        .then((response) => {
          item.upvotes = response.upvotes;
        });
    },
    getAll() {
      const url = 'comments';
      fetch(url)
        .then((r) => r.json())
        .then((response) => {
          this.comments = response;
        });
    },
  },
  computed: {
    sortedComments() {
      return this.comments.sort((a, b) => {
        return b.upvotes - a.upvotes;
      });
    },
  },
});
