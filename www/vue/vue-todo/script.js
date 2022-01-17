var app = new Vue({
  el: "#app",
  data: {
    todos: [
      {
        text: "make an app",
        completed: false,
      },
      {
        text: "declare victory",
        completed: false,
      },
      {
        text: "profit",
        completed: false,
      },
    ],
    message: "",
    show: "all",
    drag: {},
  },
  methods: {
    addItem() {
      if (this.message !== "") {
        this.todos.push({ text: this.message, completed: false });
        this.message = "";
      }
    },
    deleteItem(item) {
      var index = this.todos.indexOf(item);
      if (index > -1) this.todos.splice(index, 1);
    },
    showAll() {
      this.show = "all";
    },
    showActive() {
      this.show = "active";
    },
    showCompleted() {
      this.show = "completed";
    },
    markAllCompleted() {
      this.todos.forEach((item) => (item.completed = true));
    },
    deleteCompleted() {
      this.todos = this.todos.filter((item) => {
        return !item.completed;
      });
    },
    dragItem(item) {
      this.drag = item;
    },
    dropItem(item) {
      const sourceIndex = this.todos.indexOf(this.drag);
      const targetIndex = this.todos.indexOf(item);
      this.todos.splice(sourceIndex, 1);
      this.todos.splice(targetIndex, 0, this.drag);
    },
  },
  computed: {
    activeTodos() {
      return this.todos.filter((item) => {
        return !item.completed;
      });
    },
    filteredTodos() {
      if (this.show === "all") {
        return this.todos;
      } else if (this.show === "active") {
        return this.todos.filter((item) => !item.completed);
      } else if (this.show === "completed") {
        return this.todos.filter((item) => item.completed);
      }
    },
  },
});
