<template>
  <div class="popup-container">
    <cropper
      ref="cropper"
      classname="cropper"
      :src="image"
      @change="onChangeViewBox"
    />

    <div class="preview-container">
      <div class="preview-title">Preview:</div>
      <canvas ref="rsz" class="preview"></canvas>
    </div>

    <div class="buttons">
      <button class="button-upload" @click="$refs.file.click()">
        <input
          ref="file"
          type="file"
          accept="image/*"
          :style="{display:'none'}"
          @change="uploadImage"
        >
        Upload Image
      </button>

      <base-button type="light" @click.native="saveImage">
        Save
      </base-button>
    </div>
  </div>
</template>

<script>
import { Cropper } from 'vue-advanced-cropper'

export default {
  components: {
    Cropper
  },

  data() {
    return {
      image: null
    }
  },

  methods: {
    uploadImage(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.image = e.target.result
        };
        reader.readAsDataURL(input.files[0])
      }
    },

    onChangeViewBox() {
      const resizedCanvas = this.$refs.rsz;
      resizedCanvas.width = 250;
      resizedCanvas.height = 60;
      const resizedContext = resizedCanvas.getContext('2d');
      const canvas = this.$refs.cropper.getResult().canvas;
      resizedContext.drawImage(canvas, 0, 0, 250, 60)
    },

    saveImage() {
      const image = this.$refs.rsz.toDataURL('image/jpeg', 1)
      this.$emit('save-image', image)
    }
  }
}
</script>

<style lang="scss" scoped>
.cropper {
  margin-top: 20px;
  width: 360px;
  height: 300px;
  background: rgb(240, 240, 240);
}

.preview-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
}

.preview-title {
  font-weight: 500;
}

.preview {
  width: 250px;
  height: 60px;
  background: rgb(240, 240, 240);
  margin-bottom: 20px;
  margin-top: 20px;
}

.buttons {
  display: flex;
  justify-content: center;
}

.button-upload {
  color: #6b94ac;
  background-color: #e6edf1;
  border: none;
  font-size: 13px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  padding: 0 15px;
  transition: all 0.3s ease;
  margin-right: 20px;
  &:hover {
    background-color: #dbe8f0;
  }
}
</style>