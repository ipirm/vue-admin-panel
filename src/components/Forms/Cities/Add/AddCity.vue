<template>
    <div class="form-container">
        <div class="form-content">
            <div class="general-info">
                <h6>General Info</h6>
                <base-select :options="getCountries" @selected-option="setCountry" input-width="315px" width="315px" label="Country" />
                <base-input
                        v-model="name"
                        label="Name"
                        :errors="pe"
                        @resetError="resetError()" />
                <base-input
                        v-model="description"
                        label="Description"
                        :errors="pe"
                        @resetError="resetError()" />
                <base-input
                        v-model="slug"
                        label="Slug"
                        :errors="pe"
                        @resetError="resetError()" />
                <base-input
                        v-model="lat"
                        label="Lat"
                        :errors="pe"
                        @resetError="resetError()" />
                <base-input
                        v-model="lng"
                        label="Lng"
                        :errors="pe"
                        @resetError="resetError()" />

                <div class="upload-image">
                    <div @click="toggleShowMD" class="btn upload-image-block">
                        <label  class="custom-file-upload">
                            <div
                                    class="upload-button-div"
                            >Top Photo Upload Image</div>
                        </label>
                    </div>
                    <my-upload field="photoFile"
                               @crop-success="cropSuccessMD"
                               :width="1485"
                               :height="800"
                               lang-type="en"
                               :value.sync="showMD"
                               @click="toggleShowMD"
                               v-model="showMD"
                               noRotate
                               noCircle
                               img-format="png"></my-upload>

                    <div v-if="top_photo_filename_desktop || topPhotoDesktopImage" class="file-show-block">
                        <div class="file-show-block-content">
                            <div v-if="topPhotoDesktopImage" class="image-block-upload">
                                <img :src="topPhotoDesktopImage">
                                <div @click="deleteFileUsefulMobile" class="delete-image-icon">
                                    <svg-icon name="close"></svg-icon>
                                </div>
                            </div>
                            <div v-if="!topPhotoDesktopImage" class="image-block-upload">
                                <img :src="top_photo_filename_desktop">
                                <div @click="deleteFileUsefulDesctop" class="delete-image-icon">
                                    <svg-icon name="close"></svg-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="upload-image">
                    <div @click="toggleShowMM" class="btn upload-image-block">
                        <label  class="custom-file-upload">
                            <div
                                    class="upload-button-div"
                            >Top Photo Mobile Image</div>
                        </label>
                    </div>
                    <my-upload field="photoFile"
                               @crop-success="cropSuccessMM"
                               :width="640"
                               :height="1136"
                               lang-type="en"
                               :value.sync="showMM"
                               @click="toggleShowMM"
                               v-model="showMM"
                               noRotate
                               noCircle
                               img-format="png"></my-upload>

                    <div v-if="top_photo_filename_mobile || topPhotoMobileImage" class="file-show-block">
                        <div class="file-show-block-content">
                            <div v-if="topPhotoMobileImage" class="image-block-upload">
                                <img :src="topPhotoMobileImage">
                                <div @click="deleteFileUsefulMobile" class="delete-image-icon">
                                    <svg-icon name="close"></svg-icon>
                                </div>
                            </div>
                            <div v-if="!topPhotoMobileImage" class="image-block-upload">
                                <img :src="top_photo_filename_mobile">
                                <div @click="deleteFileUsefulMobile" class="delete-image-icon">
                                    <svg-icon name="close"></svg-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="upload-image">
                    <div @click="toggleShowUD" class="btn upload-image-block">
                        <label  class="custom-file-upload">
                            <div
                                    class="upload-button-div"
                            >Useful Tips Desktop Image</div>
                        </label>
                    </div>
                    <my-upload field="photoFile"
                               @crop-success="cropSuccessUD"
                               :width="1485"
                               :height="800"
                               lang-type="en"
                               :value.sync="showUD"
                               @click="toggleShowUD"
                               v-model="showUD"
                               noRotate
                               noCircle
                               img-format="png"></my-upload>

                    <div v-if="useful_tips_photo_filename_desktop || usefulTipsPhotoDesktopImage" class="file-show-block">
                        <div class="file-show-block-content">
                            <div v-if="usefulTipsPhotoDesktopImage" class="image-block-upload">
                                <img :src="usefulTipsPhotoDesktopImage">
                                <div @click="deleteFileUsefulMobile" class="delete-image-icon">
                                    <svg-icon name="close"></svg-icon>
                                </div>
                            </div>
                            <div v-if="!usefulTipsPhotoDesktopImage" class="image-block-upload">
                                <img :src="useful_tips_photo_filename_desktop">
                                <div @click="deleteFileUsefulDesctop" class="delete-image-icon">
                                    <svg-icon name="close"></svg-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="upload-image">
                    <div @click="toggleShowUM" class="btn upload-image-block">
                        <label  class="custom-file-upload">
                            <div
                                    class="upload-button-div"
                            >Useful Tips Mobile Image</div>
                        </label>
                    </div>
                    <my-upload field="photoFile"
                               @crop-success="cropSuccessUM"
                               :width="640"
                               :height="1136"
                               lang-type="en"
                               :value.sync="showUM"
                               @click="toggleShowUM"
                               v-model="showUM"
                               noRotate
                               noCircle
                               img-format="png"></my-upload>

                    <div v-if="useful_tips_photo_filename_mobile || usefulTipsPhotoMobileImage" class="file-show-block">
                        <div class="file-show-block-content">
                            <div v-if="usefulTipsPhotoMobileImage" class="image-block-upload">
                                <img :src="usefulTipsPhotoMobileImage">
                                <div @click="deleteFileUsefulMobile" class="delete-image-icon">
                                    <svg-icon name="close"></svg-icon>
                                </div>
                            </div>
                            <div v-if="!usefulTipsPhotoMobileImage" class="image-block-upload">
                                <img :src="useful_tips_photo_filename_mobile">
                                <div @click="deleteFileUsefulMobile" class="delete-image-icon">
                                    <svg-icon name="close"></svg-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="textarea-block">
                    <textarea placeholder="Description 1" v-model="description1" class="custom-textarea"></textarea>
                </div>
                <div class="textarea-block">
                    <textarea placeholder="Description 2" v-model="description2" class="custom-textarea"></textarea>
                </div>

                <base-input
                        class="full-width"
                        v-model="weather_widget"
                        label="Weather widget"
                        :errors="pe"
                        @resetError="resetError()" />
            </div>
        </div>
        <base-button @click.native="addUpdateCity" class="button-add" long>Add</base-button>
    </div>
</template>

<script>
    import { mapActions, mapMutations, mapState } from 'vuex'
    import myUpload from 'vue-image-crop-upload';

    export default {
        components: { myUpload },
        data() {
            return {
                slug: '',
                name: '',
                time_zone: '',
                description: '',
                lat: '',
                lng: '',
                country_id: '',
                top_photo_filename_desktop: null,
                top_photo_filename_mobile: null,
                topPhotoDesktopImage: null,
                topPhotoMobileImage: null,
                useful_tips_photo_filename_desktop: null,
                useful_tips_photo_filename_mobile: null,
                usefulTipsPhotoDesktopImage: null,
                usefulTipsPhotoMobileImage: null,
                description1: '',
                description2: '',
                weather_widget: '',

                showUM: false,
                showUD: false,
                showMM: false,
                showMD: false,
            }
        },
        created() {
        },

        computed: {
            ...mapState('ui', ['itemErrors']),

            pe() {
                return this.itemErrors['categories'] && this.itemErrors['categories'][0].parent_category_id || []
            },
            et() {
                return this.itemErrors['categories'] && this.itemErrors['categories'][0].slug || []
            },
            en() {
                return this.itemErrors['categories'] && this.itemErrors['categories'][0].name || []
            },
            getCountries() {
                return this.$store.getters['countries/getCountriesCore']
            },
        },

        methods: {
            ...mapActions('cities', ['createCity']),
            ...mapMutations('ui', ['RESET_ITEM_ERROR']),


            addUpdateCity() {

                let compContext = this;
                this.$store.state.countries.countriesCore.forEach(element => {
                    if (element.slug === compContext.country_id) {
                        compContext.country_id = element.id
                    }
                })

                const city = {
                    slug: this.slug,
                    time_zone: this.time_zone,
                    i18n: {
                        name: this.name,
                        description: this.description
                    },
                    coordinates: {
                        lat: this.lat,
                        lng: this.lng
                    },
                    country_id: this.country_id,
                    frontPageContent: {
                        topPhotoDesktopImage: this.topPhotoDesktopImage,
                        topPhotoMobileImage: this.topPhotoMobileImage,
                        weather_widget: this.weather_widget,
                        usefulTipsPhotoDesktopImage: this.usefulTipsPhotoDesktopImage,
                        usefulTipsPhotoMobileImage: this.usefulTipsPhotoMobileImage,
                        i18n: {
                            description1: this.description1,
                            description2: this.description2
                        }
                    }
                }

                this.createCity(city)
            },
            uploadImage(e) {

                const files = e.target.files;
                this.getBase64(files[0]);
                this.top_photo_filename_desktop = files[0].name;
            },
            uploadImageMobile(e){
                const files = e.target.files;
                this.getBase64Mobile(files[0]);
                this.top_photo_filename_mobile = files[0].name;
            },
            uploadImageUsefulDesctop(e){
                const files = e.target.files;
                this.getBase64UsefulDesctop(files[0]);
                this.useful_tips_photo_filename_desktop = files[0].name;
            },
            uploadImageUsefulMobile(e){
                const files = e.target.files;
                this.getBase64UsefulMobile(files[0]);
                this.useful_tips_photo_filename_mobile = files[0].name;
            },

            getBase64(file) {
                let compContext = this;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    compContext.topPhotoDesktopImage = reader.result;
                };
                reader.onerror = function (error) {
                };

            },
            getBase64Mobile(file) {
                let compContext = this;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    compContext.topPhotoMobileImage = reader.result;
                };
                reader.onerror = function (error) {
                };
            },
            getBase64UsefulDesctop(file){
                let compContext = this;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    compContext.usefulTipsPhotoDesktopImage = reader.result;
                };
                reader.onerror = function (error) {
                };
            },
            getBase64UsefulMobile(file){
                let compContext = this;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    compContext.usefulTipsPhotoMobileImage = reader.result;
                };
                reader.onerror = function (error) {
                };
            },

            deleteFile(){
                this.topPhotoDesktopImage = null;
                this.top_photo_filename_desktop = null;
            },
            deleteFileMobile(){
                this.topPhotoMobileImage = null;
                this.top_photo_filename_mobile = null;
            },
            deleteFileUsefulDesctop(){
                this.usefulTipsPhotoDesktopImage = null;
                this.useful_tips_photo_filename_desktop = null;
            },
            deleteFileUsefulMobile(){
                this.usefulTipsPhotoMobileImage = null;
                this.useful_tips_photo_filename_mobile = null;
            },
            setCountry(value){
              this.country_id = value;
            },

            toggleShowUM() {
                this.showUM = !this.showUM;
            },
            toggleShowUD() {
                this.showUD = !this.showUD;
            },
            toggleShowMM() {
                this.showMM = !this.showMM;
            },
            toggleShowMD() {
                this.showMD = !this.showMD;
            },
            /**
             * crop success
             *
             * [param] imgDataUrl
             * [param] field
             */
            cropSuccessUM(imgDataUrl, field){
                this.usefulTipsPhotoMobileImage = imgDataUrl;
            },
            cropSuccessUD(imgDataUrl, field){
                this.usefulTipsPhotoDesktopImage = imgDataUrl;
            },
            cropSuccessMM(imgDataUrl, field){
                this.topPhotoMobileImage = imgDataUrl;
            },
            cropSuccessMD(imgDataUrl, field){
                this.topPhotoDesktopImage = imgDataUrl;
            },

            resetError() {
                this.RESET_ITEM_ERROR()
            }
        }
    }
</script>

<style lang="scss" scoped>
    .form-content {
        display: flex;
        justify-content: space-between;
        max-width: 620px;
        margin-top: 20px;
    }

    .general-info {
        width: 315px;
    }

    .rights {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-width: 250px;
        max-height: 350px;
    }

    .checkbox-container {
        display: flex;
        justify-content: space-between;
    }

    .checkbox-label {
        font-size: 13px;
        color: #052e46;
    }

    .hr-vertical {
        padding-top: 2rem;
    }

    .button-add {
        margin-top: 15px;
    }
</style>