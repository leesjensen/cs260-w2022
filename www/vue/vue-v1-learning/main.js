'use strict';

const taskData = [
  {
    description: 'Create some loaves of bread',
    completed: true,
  },
  {
    description: 'Create some fish',
    completed: true,
  },
  {
    description: 'Create more loaves of bread',
    completed: false,
  },
  {
    description: 'Create more fish',
    completed: false,
  },
  {
    description: 'Create more loaves of bread',
    completed: false,
  },
  {
    description: 'Tell Peter to clean up the mess',
    completed: false,
  },
];

let app = new Vue({
  // bind it to the #root div in the DOM
  el: '#root',
  // provide data for bindings
  data: {
    message: 'Hello World',
    newName: '',
    newMember: '',
    names: ['Emma', 'Brandon', 'Lucy', 'Jorge'],
    divAlign: 'center',
    isInColor: false,
    tasks: taskData,
  },
  // methods you can call on the app
  methods: {
    addName() {
      if (this.newName != '') {
        this.names.push(this.newName);
        this.newMember = this.newName;
        this.newName = '';
      }
    },
    toggleColor() {
      this.isInColor = !this.isInColor;
    },
  },
  // computed properties
  computed: {
    screaming() {
      return this.message.toUpperCase();
    },
    incomplete() {
      return this.tasks.filter((task) => !task.completed);
    },
  },
});
