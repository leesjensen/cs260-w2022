<template>
  <div class="home">
    <ul>
      <li v-for="candidate in candidates" v-bind:key="candidate.url">
        <CandiateCard :candidate="candidate" />
      </li>
    </ul>
  </div>
</template>

<script>
import router from "@/router.js";
import userService from "@/model/user.js";
import candidateService from "@/model/candidate.js";
import CandiateCard from "@/components/CandidateCard.vue";

export default {
  name: "VoterView",
  components: {
    CandiateCard,
  },
  created: async function () {
    this.user = userService.user;
    this.candidates = await candidateService.candidates();

    if (!userService.loggedIn) {
      router.push("/");
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
ul {
  padding: 0;
  list-style-type: none;
}
.user-name {
}
</style>
