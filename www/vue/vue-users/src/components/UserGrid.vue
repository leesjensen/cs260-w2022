<template>
  <h2>Users</h2>
  <dl class="inline">
    <dt>Female:</dt><dd>{{female}}</dd>
    <dt>Male:</dt><dd>{{male}}</dd>
    <dt>Total:</dt><dd>{{userData.length}}</dd>
  </dl>
  <div class="card-container">
    <user-card class="card" v-for="(n, i) in userData" :key="i" :userData="n" :onClose="closeUser"></user-card>
  </div>
</template>

<script>
import userCard from './UserCard'

export default {
  name: 'user-grid',
  props: {
    userData: Array,
    onClose: Function,
  },
  components: {
    userCard
  },
  computed: {
    male: function(){return this.genderCount('male')},
    female: function(){return this.genderCount('female')}
  },
  methods: {
    genderCount(g) {
      if (!this.userData || this.userData.length === 0) return 0;
      return this.userData.reduce((p, item) => item.gender === g ? p+1:p, 0)
    },
    closeUser(user) {
      if (this.onClose) {
        this.onClose(user);
      }
    }
  },
}
</script>

<style scoped>
h2 {
  text-align: left;
  border-top: grey solid thick;
}
 .card-container {
   display: flex;
   flex-direction: row;
   flex-wrap: wrap;
 }
 .card {
   flex: 1 1 auto;
 }
dl.inline {
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  width: 300px;
  overflow: visible;
}
dl.inline dt {
  flex: 0 0 25%;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: bold;
}
dl.inline dd {
  flex:0 0 75%;
  margin-left: auto;
  text-align: left;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
