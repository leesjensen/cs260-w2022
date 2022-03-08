<template>
  <div id="app">
    <input
      type="file"
      accept="image/x-png,image/jpeg,image/gif"
      v-on:change="upload"
    />
    <img src="" id="preview" />

    <BouncyBall />
  </div>
</template>

<script>
import BouncyBall from './components/BouncyBall.vue';

export default {
  name: 'App',
  components: {
    BouncyBall,
  },
  methods: {
    upload() {
      const filePicker = document.querySelector('input');
      console.log(filePicker);

      if (!filePicker || !filePicker.files || filePicker.files.length <= 0) {
        console.log('No file selected.');
        return;
      }
      const myFile = filePicker.files[0];
      console.log(myFile);

      const fileReader = new FileReader();
      if (fileReader && myFile) {
        fileReader.readAsDataURL(myFile);
        fileReader.onload = () => {
          console.log(fileReader.result);

          const img = document.querySelector('img');
          img.setAttribute('src', fileReader.result);
        };

        fileReader.onerror = (error) => {
          console.log(error);
        };
      } else {
        console.log('No file provided');
      }

      console.log('blah');
    },
  },
};
</script>

<style>
body {
  margin-top: 0;
  background: #a3d9ff;
}
</style>
