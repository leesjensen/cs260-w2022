<template>
  <div id="app">
    <h1>&#128515; PWA Demo</h1>

    <div class="chooser">
      <label for="file-upload" class="button">Capture</label>
      <input
        id="file-upload"
        type="file"
        accept="image/x-png,image/jpeg,image/gif"
        @change="captureImage"
      />
      <div :class="['button', { disabled: !image }]" @click="storeImage">
        Save
      </div>
      <div :class="['button', { disabled: !image }]" @click="deleteImage">
        Delete
      </div>
    </div>

    <div class="img-viewer">
      <img :src="image" id="preview" />
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
  data: function () {
    return { image: '', store: window.localStorage };
  },
  created: function () {
    this.readImage();
  },
  methods: {
    captureImage() {
      const filePicker = document.querySelector('#file-upload');
      if (filePicker?.files?.length > 0) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(filePicker.files[0]);
        fileReader.onload = () => {
          this.image = fileReader.result;
        };
      }
    },
    storeImage() {
      if (this.image) {
        this.store.setItem('image', this.image);
      }
    },
    readImage() {
      this.image = this.store.getItem('image');
    },
    deleteImage() {
      this.store.removeItem('image');
      this.image = '';
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

.button {
  border: 1px solid #ccc;
  background: whitesmoke;
  color: black;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  margin: 5px;
}

.disabled {
  pointer-events: none;
  opacity: 0.4;
}

input[type='file'] {
  display: none;
}
</style>
