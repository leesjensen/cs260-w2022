# Unit 4 - Vue

All the examples use Vue 2. The current version is 3.

## Vue Interesting Things

# Vue 4.1 - Vue Basics

**Directives**

- v-text - element's textContent
- v-html - element's innerHTML
- v-bind (or shortcut :) - bind an attribute, or component property
  ```
  <img v-bind:src="imageSrc">
  <img :src="imageSrc">
  <div :class="{ red: isRed }"></div>
  <div :class="[classA, classB]"></div>
  <div :class="[classA, { classB: isB, classC: isC }]">
  <div :style="{ fontSize: size + 'px' }"></div>
  <div :style="[styleObjectA, styleObjectB]"></div>
  <my-component :prop="someThing"></my-component>
  ```
- v-if, v-else, v-else-if - adds or removes elements
- v-show - toggles display CSS property
- v-model - two way binding
- v-once - Renders once, no binding
- v-for - iterate array or object
  ```
  <div v-for="item in items">
  <div v-for="(item, index) in items"></div>
  <div v-for="(val, key) in object"></div>
  ```
- v-on (or shortcut @) - v-on:click with modifies
  ```
  <button @click.stop.prevent="doThis"></button>
  <input @keyup.enter="onEnter">
  ```
- v-model - form inputs to components

**Components**
reusable component - picture display
You can have properties on a component that you can bind.
You can also emit events to the parent.

```
Vue.component('todo-item', {
  template: '<li>This is a todo</li>'
})

<ol>
  <todo-item></todo-item>
</ol>
```

**Computed**
vue instance properties that get computed

**Methods**
create a method on the vue instance

**Watchers**
Watch when something changes

**Lifecycle hooks**

- created, mounted, updated, destroyed

- Vue Google extension
- Components
- Templates
- Reactivity
- Transitions
- Routing

**Template**

- {{mustache}} - text output from the expression
- You can put full javascript in the template.
- Only a single expresssion.

**Filters**

**Animation**

**Mixins**

**Reactivity in Depth**
https://v2.vuejs.org/v2/guide/reactivity.html

## V0 - Vue-Rest

Step through simple Vue component for loading cities
vue-v0-rest

## V1 - Learning Vue

This tutorial steps through much of the basics fo Vue
vue-v1-learning

# Vue 4.2 Vetur development support

## V2 - Todo List

This tutorial steps you through building a todo list
vue-v2-todo

## Lab 3a - Vue XKCD Browser

# Vue 4.3 - Build toolchain CLI

## V3 - Learning Vue CLI

# Vue 4.4 -

## Lab 3b - Grocery Store

# Vue 4.5 - SPA & Router

## V4 - Vue Router

This is a non-graded activity. I actually disabled it. It is covered in the CLI activity V3.

# Vue 4.6 - TypeScript

## Vue Quiz
