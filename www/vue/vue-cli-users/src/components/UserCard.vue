<template>
<div class="user-card">
  <button class="right-align" v-if="onClose" @click="onClose(userData)">x</button>
  <img :src="userData.picture.large" :alt="name" :title="name" />
  <div class="attr attr-title">{{name}}</div>
  <div class="attr attr-small"><a :href="`mailto:${userData.email}`">{{userData.email}}</a></div>
  <div class="attr attr-small">{{address}}</div>
  <div class="attr attr-small">{{birthDate}}</div>
  <div class="attr attr-small">{{userData.gender}}</div>
</div>
</template>

<script>
export default {
  name: 'user-card',
  props: {
    userData: Object,
    onClose: Function,
  },
  computed: {
    name: function() {
      return `${this.userData.name.first} ${this.userData.name.last}`
    },
    birthDate: function() {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(this.userData.dob.date).toLocaleDateString('en-US', options);
    },
    address: function() {
      return `${this.userData.location.state} ${this.userData.location.country}`
    }
  }
}
</script>

<style scoped>
.user-card {
  display: inline-block;
  border: solid #586160 thin;
  border-radius: 10px;
  padding: .5em;
  margin: 10px;
  max-width: 140px;
  background: #d1dddc;
  color:#505050;
}
img {
  border-radius: 50%;
  border:thick solid whitesmoke;
}

.right-align {
  float:right;
}

.attr {
  max-height: 1.25em;
  white-space: nowrap;
  overflow:hidden;
  text-overflow: ellipsis;

}
.attr-title {
  font-weight: bold;
}
.attr-small {
  font-size: .75em;
}
</style>
