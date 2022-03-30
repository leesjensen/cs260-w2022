<template>
  <div class="home">
    <div>{{ user.email }}</div>
    <ul>
      <li v-for="candidate in candidates" v-bind:key="candidate.url">
        <CandiateCard :msg="candidate.name" />
      </li>
    </ul>
  </div>
</template>

<script>
import router from '@/router.js';
import userService from '@/model/user.js';
import candidateService from '@/model/candidates.js';
import CandiateCard from '@/components/CandidateCard.vue';

export default {
  name: 'VoterView',
  components: {
    CandiateCard,
  },
  created: function () {
    this.user = userService.user;
    this.candidates = candidateService.candidates;

    if (!userService.loggedIn) {
      router.push('/');
    }
  },
  data: function () {
    return {
      user: {},
      candidates: [],
    };
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>
