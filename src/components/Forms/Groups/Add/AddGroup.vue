<template>
    <div class="form-container">
        <div class="form-content">
            <div class="general-info">
                <h6>General Info</h6>
                <!--<base-select :options="getCategories" @selected-option="setParentCategory" input-width="315px" width="315px" label="Parent Category" />-->
                <base-input
                        v-model="name"
                        label="Name"
                        :errors="pe"
                        @resetError="resetError()" />
                <base-input
                        v-model="slug"
                        label="Slug"
                        :errors="pe"
                        @resetError="resetError()" />

                <!--<div class="upload-image">-->
                    <!--<label for="file-upload" class="custom-file-upload">-->
                        <!--<div-->
                                <!--class="upload-button-div"-->
                        <!--&gt;Top Photo Upload Image</div>-->
                    <!--</label>-->
                    <!--<input @change="uploadImage" id="file-upload" type="file" />-->
                    <!--<div v-if="top_photo_filename_desktop" class="file-show-block">-->
                        <!--<div class="file-show-block-content">-->
                            <!--<div v-if="topPhotoDesktopImage" class="image-block-upload">-->
                                <!--<img :src="topPhotoDesktopImage">-->
                                <!--<div @click="deleteFile" class="delete-image-icon">-->
                                    <!--<svg-icon name="close"></svg-icon>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div v-if="!topPhotoDesktopImage" class="image-block-upload">-->
                                <!--<img :src="top_photo_filename_desktop">-->
                                <!--<div @click="deleteFile" class="delete-image-icon">-->
                                    <!--<svg-icon name="close"></svg-icon>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->

                <!--<div class="upload-image">-->
                    <!--<label for="file-upload-1" class="custom-file-upload">-->
                        <!--<div-->
                                <!--class="upload-button-div"-->
                        <!--&gt;Top Photo Mobile Image</div>-->
                    <!--</label>-->
                    <!--<input @change="uploadImageMobile" id="file-upload-1" type="file" />-->
                    <!--<div v-if="top_photo_filename_mobile" class="file-show-block">-->
                        <!--<div class="file-show-block-content">-->
                            <!--<div v-if="topPhotoMobileImage" class="image-block-upload">-->
                                <!--<img :src="topPhotoMobileImage">-->
                                <!--<div @click="deleteFileMobile" class="delete-image-icon">-->
                                    <!--<svg-icon name="close"></svg-icon>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div v-if="!topPhotoMobileImage" class="image-block-upload">-->
                                <!--<img :src="top_photo_filename_mobile">-->
                                <!--<div @click="deleteFileMobile" class="delete-image-icon">-->
                                    <!--<svg-icon name="close"></svg-icon>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->

                <!--<div class="upload-image">-->
                    <!--<label for="file-upload-2" class="custom-file-upload">-->
                        <!--<div-->
                                <!--class="upload-button-div"-->
                        <!--&gt;Useful Tips Desktop Image</div>-->
                    <!--</label>-->
                    <!--<input @change="uploadImageUsefulDesctop" id="file-upload-2" type="file" />-->
                    <!--<div v-if="useful_tips_photo_filename_desktop" class="file-show-block">-->
                        <!--<div class="file-show-block-content">-->
                            <!--<div v-if="usefulTipsPhotoDesktopImage" class="image-block-upload">-->
                                <!--<img :src="usefulTipsPhotoDesktopImage">-->
                                <!--<div @click="deleteFileUsefulDesctop" class="delete-image-icon">-->
                                    <!--<svg-icon name="close"></svg-icon>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div v-if="!usefulTipsPhotoDesktopImage" class="image-block-upload">-->
                                <!--<img :src="useful_tips_photo_filename_desktop">-->
                                <!--<div @click="deleteFileUsefulDesctop" class="delete-image-icon">-->
                                    <!--<svg-icon name="close"></svg-icon>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->

                <!--<div class="upload-image">-->
                    <!--<label for="file-upload-3" class="custom-file-upload">-->
                        <!--<div-->
                                <!--class="upload-button-div"-->
                        <!--&gt;Useful Tips Mobile Image</div>-->
                    <!--</label>-->
                    <!--<input @change="uploadImageUsefulMobile" id="file-upload-3" type="file" />-->
                    <!--<div v-if="useful_tips_photo_filename_mobile" class="file-show-block">-->
                        <!--<div class="file-show-block-content">-->
                            <!--<div v-if="usefulTipsPhotoMobileImage" class="image-block-upload">-->
                                <!--<img :src="usefulTipsPhotoMobileImage">-->
                                <!--<div @click="deleteFileUsefulMobile" class="delete-image-icon">-->
                                    <!--<svg-icon name="close"></svg-icon>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div v-if="!usefulTipsPhotoMobileImage" class="image-block-upload">-->
                                <!--<img :src="useful_tips_photo_filename_mobile">-->
                                <!--<div @click="deleteFileUsefulMobile" class="delete-image-icon">-->
                                    <!--<svg-icon name="close"></svg-icon>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->

                <!--<base-input-->
                        <!--class="full-width"-->
                        <!--v-model="description1"-->
                        <!--label="Description 1"-->
                        <!--:errors="pe"-->
                        <!--@resetError="resetError()" />-->

                <!--<base-input-->
                        <!--class="full-width"-->
                        <!--v-model="description2"-->
                        <!--label="Description 2"-->
                        <!--:errors="pe"-->
                        <!--@resetError="resetError()" />-->

                <!--<base-input-->
                        <!--class="full-width"-->
                        <!--v-model="weather_widget"-->
                        <!--label="Weather widget"-->
                        <!--:errors="pe"-->
                        <!--@resetError="resetError()" />-->

            </div>
        </div>
        <base-button @click.native="addUpdateGroup" class="button-add" long>Add</base-button>
    </div>
</template>

<script>
    import PhoneInputForm from '@/components/UILibrary/Inputs/PhoneInputForm'
    import { mapActions, mapMutations, mapState } from 'vuex'

    export default {
        components: { PhoneInputForm },
        data() {
            return {
                slug: '',
                name: '',
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
                weather_widget: ''
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
        },

        methods: {
            ...mapActions('groups', ['createGroup']),
            ...mapMutations('ui', ['RESET_ITEM_ERROR']),


            addUpdateGroup() {

                const group = {
                    slug: this.slug,
                    i18n: {
                        name: this.name
                    },
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

                this.createGroup(group)
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