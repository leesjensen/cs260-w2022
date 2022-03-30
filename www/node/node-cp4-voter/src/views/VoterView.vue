<template>
  <div class="home">
    <ul>
      <li v-for="candidate in candidates" v-bind:key="candidate.url">
        <CandiateCard :msg="candidate.name" />
      </li>
    </ul>
  </div>
</template>

<script>
import CandiateCard from '@/components/CandidateCard.vue';

export default {
  name: 'VoterView',
  components: {
    CandiateCard,
  },
  data: function () {
    return {
      candidates: [
        {
          name: 'joe',
          url: 'https://cs260.click',
        },
        {
          name: 'cindy',
          url: 'https://cs260.click',
        },
        {
          name: 'lara',
          url: 'https://cs260.click',
        },
      ],
    };
  },
};
</script>

<style scoped>
li {
  list-style-type: none;
}
</style>
