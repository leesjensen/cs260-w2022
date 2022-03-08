<template>
  <div class="dialog" v-if="show">
    <p>
      Install this application on your home screen for quick and easy access.
    </p>
    <p>
      Just tap <img src="@/assets/ios-action.png" /> then 'Add to Home Screen'
    </p>
    <p>{{ info }}</p>
    <div class="button" @click="close">Close</div>
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
  methods: {
    close() {
      this.display = false;
    },
  },
  computed: {
    show() {
      return (
        ['iPhone', 'iPad', 'iPod'].includes(window.navigator.platform) &&
        !window.navigator.standalone &&
        this.display
      );
    },
    info() {
      const info = {
        platform: window.navigator.platform || 'undefined',
        standalone: window.navigator.standalone || 'undefined',
      };
      const x = JSON.stringify(info, undefined, 2);
      return x;
    },
  },
};
</script>

<style scoped>
.dialog {
  padding: 1em;
  margin: 1em;
  background: #fdffee;
  color: rgb(46, 46, 46);
}
</style>

<!-- showHomeScreenPrompt() {
    // Only show on iOS
    if (!['iPhone', 'iPad', 'iPod'].includes(this.window.navigator.platform)) {
      return;
    }
    // Do not show if launching from home screen
    const parameters = new URLSearchParams(this.window.location.search);
    if (
      this.window.navigator.standalone ||
      parameters.get('utm_source') === 'homescreen'
    ) {
      return;
    }
    // Only show once a week
    const lastPrompt = this.localStorage.get('lastHomescreenPrompt');
    if (lastPrompt && differenceInDays(new Date(), new Date(lastPrompt)) < 7) {
      return;
    }

    Util.getImageData(`${this.assetBase}/customer-icon.png`).subscribe(
      dataUrl => {
        this.homeIcon = this.sanitizer.bypassSecurityTrustStyle(
          `url('${dataUrl}')`,
        );
      },
    );

    timer(3000).subscribe(() => {
      this.localStorage.set('lastHomescreenPrompt', new Date().toISOString());
      this.dialog.open(this.showHomeScreenTemplate);
    });
  } -->
