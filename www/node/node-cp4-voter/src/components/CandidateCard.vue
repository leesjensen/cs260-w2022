<template>
  <div
    :class="['candidate-card', { 'voted-for': votedFor }]"
    @click="changeVote"
  >
    {{ candidate.name }} - {{ candidate.votes }}
  </div>
</template>

<script>
import userService from "@/model/user.js";
export default {
  name: "CandiateCard",
  props: {
    candidate: {},
  },
  created() {
    this.votedFor = userService.votedFor(this.candidate.id);
  },
  data: function () {
    return {
      votedFor: false,
    };
  },
  methods: {
    changeVote(e) {
      userService.vote(this.candidate.id, !this.votedFor);
      this.votedFor = userService.votedFor(this.candidate.id);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.candidate-card {
  border: thin black solid;
  background: rgb(89, 88, 106);
  color: whitesmoke;
  margin: 1em 0;
  padding: 0.5em 1em;
  border-radius: 10px;
}
.voted-for {
  background: red;
}
</style>
