<template>
  <div class="form-container photos-block">
    <div class="form-content">
      <h6>Add Photos</h6>
      <p
        class="title-description"
      >Use photos that highlight what’s unique about your experience and show travelers having fun. Adding 6-9 photos can increase your bookings.</p>
      <div class="info">
        <div class="info-block">
          <div class="info-block-title">
            <svg-icon name="yes" />
            <span>Do</span>
          </div>
          <div class="points">
            <div class="point">Add 6+ photos</div>
            <div class="point">Use only photos that you own</div>
            <div class="point">Use candid photos of engaged travelers</div>
          </div>
        </div>
        <div class="info-block">
          <svg-icon name="no" />
          <span>Don't</span>
          <div class="points">
            <div class="point">Use screenshots</div>
            <div class="point">Add watermarks</div>
            <div class="point">Use blurry or dark photos</div>
            <div class="point">Use photo collages</div>
          </div>
        </div>
      </div>

      <!-- Old upload data  -->
      <!--<div class="photo-upload-block">-->
        <!--<div v-if="stateTour.productPhotos" v-for="(image, index) in stateTour.productPhotos" v-bind:key="index" class="uploaded-image">-->
          <!--<span @click.prevent="remove(image.id)">-->
            <!--<svg-icon name="close_white" />-->
          <!--</span>-->
          <!--<img :src="image.filename" />-->
        <!--</div>-->
        <!--<div class="upload-image">-->
          <!--<div class="upload-image-block">-->
            <!--<label for="file-upload" class="custom-file-upload">-->
              <!--<svg-icon name="plus_upload" />-->
              <!--<div class="text">Add photos</div>-->
            <!--</label>-->
            <!--<input @change="uploadImage" id="file-upload" type="file" />-->
          <!--</div>-->
        <!--</div>-->
      <!--</div>-->

      <div class="photo-upload-block">
        <div v-if="stateTour.productPhotos" v-for="(image, index) in stateTour.productPhotos" v-bind:key="index" class="uploaded-image">
          <span @click.prevent="remove(image.id)">
            <svg-icon name="close_white" />
          </span>
          <img :src="image.thumbnails['307']" />
        </div>

        <div class="upload-image">
          <div @click="toggleShow" class="btn upload-image-block">
            <label  class="custom-file-upload">
              <svg-icon name="plus_upload" />
              <div class="text">Add photos</div>
            </label>
          </div>
          <my-upload field="photoFile"
                     @src-file-set="srcFileSet"
                     @crop-success="cropSuccess"
                     @crop-upload-success="cropUploadSuccess"
                     :width="1485"
                     :height="800"
                     :url="url"
                     :params="params"
                     :headers="headers"
                     lang-type="en"
                     :value.sync="show"
                     @click="toggleShow"
                     v-model="show"
                     noRotate
                     noCircle
                     img-format="png"></my-upload>
        </div>
      </div>
      <div class="checkboxes">
        <div key="checkboxes-is-best" class="checkbox">
          <input id="tour-is-best" v-model="is_best_tour"  type="checkbox" />
          <label for="tour-is-best">Is best tour</label>
        </div>
        <div key="checkboxes-is-featured" class="checkbox">
          <input id="tour-is-featured" v-model="is_featured_activity"  type="checkbox" />
          <label for="tour-is-featured">Is featured tour</label>
        </div>
      </div>

      <div class="checkboxes">
        <div key="checkboxes-is-best" class="checkbox">
          <input id="is-promo-active" v-model="is_active"  type="checkbox" />
          <label for="is-promo-active">Is promo title</label>
        </div>
      </div>

      <base-input
              v-if="is_active"
              v-model="title"
              label="Enter product promo title"
      />

      <div v-if="is_active" class="upload-vaucher-block">
        <label for="file-upload" class="custom-file-upload">
          <div
                  class="upload-button-div"
          >Upload Image</div>
        </label>
        <input @change="uploadImage" id="file-upload" type="file" />
      </div>

      <div v-if="promoFileName && is_active" class="photo-upload-block">
        <div class="uploaded-image">
            <span @click.prevent="removePromoFileName()">
              <svg-icon name="close_white" />
            </span>
          <img :src="promoFileName" />
        </div>
      </div>

    </div>
    <!-- Temporary swapped because the base-button does not work  -->
    <button
      @click.prevent="next(5)"
      @keyup.enter="next(5)"
      class="button dark long"
      type="button"
    >Next</button>
    <!--<base-button  @click.prevent="next(2)" long>Next</base-button>-->
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import myUpload from 'vue-image-crop-upload';

export default {
  components: { myUpload },
  data() {
    return {
      categories: ["Category1", "Category2", "Category3"],
      subCategories: [
        "Category1",
        "Category2",
        "Category3",
        "Category4",
        "Category1",
        "Category2",
        "Category3",
        "Category4",
        "Category3",
        "Category4"
      ],
      currentStep: 1,
      images: [],

      show: false,
      imgDataUrl: '', // the datebase64 url of created image,
      params: {
      },
      url: 'https://api.travel.iteora.com/v1/products/' + localStorage.getItem("tourId") + '/photo',
      headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      },
      is_best_tour: false,
      is_featured_activity: false,

      title: '',
      is_active: false,
      promoFile: null,
      promoFileName: null

    };
  },
  computed: {
      ...mapGetters({
          photos: 'tours/photos',
          stateTour: 'tours/tour',
      }),
  },
  beforeMount(){
      if(this.stateTour){
          this.is_best_tour = this.stateTour.is_best_tour;
          this.is_featured_activity = this.stateTour.is_featured_activity;
          if(this.stateTour.promo){
              this.title = this.stateTour.promo.title;
              this.is_active = this.stateTour.promo.is_active;
              this.promoFileName = this.stateTour.promo.filename;
          }
      }
  },
  methods: {
    ...mapActions("tours", ["fetchSetStep","uploadPhoto","deletePhoto","getTour","fetchFourthStep","fetchPromoData"]),

    switchTab(id) {
      var compCont = this;
      this.items.forEach(function(element, index) {
        if (element.id == id) {
          compCont.items[index].isActive = true;
        } else {
          compCont.items[index].isActive = false;
        }
      });
    },
    next(val) {
      let body = {
          is_best_tour: this.is_best_tour,
          is_featured_activity: this.is_featured_activity
      }

      let formData = new FormData();
      formData.append('imageFile', this.promoFile);
      formData.append('title', this.title);
      formData.append('is_active', this.is_active ? 1 : 0);
      this.fetchPromoData(formData);


      this.fetchFourthStep(body);
    },
    uploadImage(e) {

      const files = e.target.files;
      let formData = new FormData();
      formData.append('photoFile', files[0]);
      this.uploadPhoto(formData);

      for (var i = 0; i < files.length; i++) {
        let file = files[i];
        file.url = URL.createObjectURL(files[i]);
        this.images.push(file);

      }
    },
    remove(id) {
      this.deletePhoto(id)
    },


      toggleShow() {
        console.log('here we go')
          this.show = !this.show;
      },
      /**
       * crop success
       *
       * [param] imgDataUrl
       * [param] field
       */
      cropSuccess(imgDataUrl, field){
          console.log(field);

          this.imgDataUrl = imgDataUrl;
      },

      srcFileSet(fileName, fileType, fileSize){
          console.log(fileName, "FILE NAME")
          console.log(fileType, "FILE TYPE")
          console.log(fileSize, "FILE SIZE")
      },
      /**
       * upload success
       *
       * [param] jsonData  server api return data, already json encode
       * [param] field
       */
      cropUploadSuccess(jsonData, field){
          this.getTour();
          console.log('-------- upload success --------');
          console.log(jsonData);
          console.log('field: ' + field);
      },
      /**
       * upload fail
       *
       * [param] status    server api return error status, like 500
       * [param] field
       */
      cropUploadFail(status, field){
          console.log('-------- upload fail --------');
          console.log(status);
          console.log('field: ' + field);
      },
      getUrl(){
          const tourId = localStorage.getItem("tourId");
          return 'https://api.travel.iteora.com/v1/products/' + tourId + '/photo'
      },
      getHeaders(){
          const headers = {
              'Content-Type': 'application/json',
                  Authorization: `Bearer ${localStorage.getItem('accessToken')}`
          }
          return headers;
      },
      uploadImage(e) {

          const files = e.target.files;
          this.promoFile = files[0];
          this.getBase64(this.promoFile);

      },
      getBase64(file) {
          let compContext = this;
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function () {
              compContext.promoFileName = reader.result;
          };
          reader.onerror = function (error) {
          };
      },
      removePromoFileName(){
          this.promoFile = null;
          this.promoFileName = null;
      }
  },
  mounted(){
      this.getTour();
  }
};
</script>

<style lang="scss" scoped>
.form-content {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 315px;
  margin-top: 20px;
  margin-bottom: 15px;
}
</style>