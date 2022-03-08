<template>
  <div class="dialog" v-if="show">
    <p>
      Install this application on your home screen for quick and easy access.
    </p>
    <p>
      Just tap <img src="@/assets/ios-action.png" /> then 'Add to Home Screen'
    </p>
    <div class="button" @click="display = false">Close</div>
  </div>
</template>

<script>
export default {
  name: 'DesktopInstall',
  data: function () {
    return {
      display: true,
    };
  },
  computed: {
    show() {
      return (
        ['iPhone', 'iPad', 'iPod'].includes(window.navigator.platform) &&
        !window.navigator.standalone &&
        this.display
      );
    },
  },
};
</script>

<style scoped>
.dialog {
  padding: 1em;
  margin: 1em;
  background: #fdffee;
  border: solid #b38c8c 2px;
  color: rgb(46, 46, 46);
}
</style>
