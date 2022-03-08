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
      const filePicker = document.querySelector('#file-upload');
      if (filePicker?.files?.length > 0) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(filePicker.files[0]);
        fileReader.onload = () => {
          const img = document.querySelector('img');
          img.setAttribute('src', fileReader.result);
        };
      }
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
  margin: 1em;
}

.img-viewer img {
  max-width: 100%;
  max-height: 60vh;
}

.chooser {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1em;
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
