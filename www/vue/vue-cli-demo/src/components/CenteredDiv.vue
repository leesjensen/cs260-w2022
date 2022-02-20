<template>
  <div><slot></slot></div>
</template>

<script>
export default {
  name: 'CenteredDiv',
};
</script>

<style scoped>
div {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
