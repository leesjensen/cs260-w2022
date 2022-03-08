<template>
  <div id="app">
    <h1>PWA Demo</h1>

    <div class="chooser">
      <label for="file-upload" class="custom-file-upload">
        <i class="fa fa-cloud-upload"></i> Capture Image
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/x-png,image/jpeg,image/gif"
        v-on:change="upload"
      />
    </div>

    <div class="img-viewer">
      <img src="" id="preview" />
    </div>

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
  background: #432c29;
  color: whitesmoke;
  font-family: Montserrat;
}

.img-viewer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-viewer img {
  max-width: 100%;
  max-height: 80vh;
}

input[type='file'] {
  display: none;
}
.custom-file-upload {
  border: 1px solid #ccc;
  background: whitesmoke;
  color: black;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
