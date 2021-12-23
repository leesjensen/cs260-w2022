var app = new Vue({
  el: '#app',
  data: {
    items: [{
      text: "make an app",
      completed: false,
    }, {
      text: "declare victory",
      completed: false,
    }, {
      text: "profit",
      completed: false
    }],
    text: '',
    show: 'all',
  },
  computed: {
    activeItems() {
      return this.items.filter(item => {
        return !item.completed;
      });
    },
    filteredItems() {
      if (this.show === 'active')
        return this.items.filter(item => {
          return !item.completed;
        });
      if (this.show === 'completed')
        return this.items.filter(item => {
          return item.completed;
        });
      return this.items;
    },
  },
  methods: {
    addItem() {
      this.items.push({
        text: this.text,
        completed: false
      });
      this.text = '';
    },
    deleteItem(item) {
      var index = this.items.indexOf(item);
      if (index > -1)
        this.items.splice(index, 1);
    },
    showAll() {
      this.show = 'all';
    },
    showActive() {
      this.show = 'active';
    },
    showCompleted() {
      this.show = 'completed';
    },
    deleteCompleted() {
      this.items = this.items.filter(item => {
        return !item.completed;
      });
    },
  }
});