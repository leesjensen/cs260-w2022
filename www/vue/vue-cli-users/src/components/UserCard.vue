<template>
  <div class="user-card">
    <div class="close-btn" v-if="onClose" @click="onClose(userData)"></div>
    <img :src="userData.picture.large" :alt="name" :title="name" />
    <div class="attr attr-title">{{ name }}</div>
    <div class="attr attr-small">
      <a :href="`mailto:${userData.email}`">{{ userData.email }}</a>
    </div>
    <div class="attr attr-small">{{ address }}</div>
    <div class="attr attr-small">{{ birthDate }}</div>
    <div class="attr attr-small">{{ userData.gender }}</div>
  </div>
</template>

<script>
export default {
  name: "user-card",
  props: {
    userData: Object,
    onClose: Function,
  },
  computed: {
    name: function () {
      return `${this.userData.name.first} ${this.userData.name.last}`;
    },
    birthDate: function () {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(this.userData.dob.date).toLocaleDateString(
        "en-US",
        options
      );
    },
    address: function () {
      return `${this.userData.location.state} ${this.userData.location.country}`;
    },
  },
};
</script>

<style scoped>
.user-card {
  position: relative;
  display: inline-block;
  border: solid #586160 thin;
  border-radius: 10px;
  padding: 0.5em;
  margin: 10px;
  max-width: 140px;
  background: #d1dddc;
  color: #505050;
}
img {
  border-radius: 50%;
  border: thick solid whitesmoke;
}

a {
  color: inherit;
  outline: none;
}

.close-btn {
  position: absolute;
  top: -3px;
  right: -3px;
  width: 20px;
  height: 20px;
  background: rgb(87, 87, 87);
  border-radius: 3px;
  cursor: pointer;
}

.close-btn:after {
  content: "";
  width: 55%;
  height: 2px;
  background: #fff;
  position: absolute;
  top: 48%;
  left: 22%;
  transform: rotate(-45deg);
}

.close-btn:before {
  content: "";
  width: 55%;
  height: 2px;
  background: #fff;
  position: absolute;
  top: 48%;
  left: 22%;
  transform: rotate(45deg);
}

.attr {
  max-height: 1.25em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.attr-title {
  font-weight: bold;
}
.attr-small {
  font-size: 0.75em;
}
</style>
