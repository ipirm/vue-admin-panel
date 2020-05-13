<template>
    <div class="form-container">
        <div class="form-content">
            <div class="general-info">
                <h6>General Info</h6>
                <base-select :defaultValue = "group_of_countries_id" :options="getGroups" @selected-option="setGroup" input-width="315px" width="315px" label="Group of country" />
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
                <base-input
                        v-model="iso_alpha_2"
                        label="Iso Alpha 2"
                        :errors="pe"
                        @resetError="resetError()" />
                <base-input
                        v-model="international_calling_code"
                        label="International calling code"
                        :errors="pe"
                        @resetError="resetError()" />


                <div class="upload-image">
                    <label for="file-upload" class="custom-file-upload">
                        <div
                                class="upload-button-div"
                        >Top Photo Upload Image</div>
                    </label>
                    <input @change="uploadImage" id="file-upload" type="file" />
                    <div v-if="top_photo_filename_desktop || topPhotoDesktopImage" class="file-show-block">
                        <div class="file-show-block-content">
                            <div v-if="topPhotoDesktopImage" class="image-block-upload">
                                <img :src="topPhotoDesktopImage">
                                <div @click="deleteFile" class="delete-image-icon">
                                    <svg-icon name="close"></svg-icon>
                                </div>
                            </div>
                            <div v-if="!topPhotoDesktopImage" class="image-block-upload">
                                <img :src="top_photo_filename_desktop">
                                <div @click="deleteFile" class="delete-image-icon">
                                    <svg-icon name="close"></svg-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="upload-image">
                    <label for="file-upload-2" class="custom-file-upload">
                        <div
                                class="upload-button-div"
                        >Top Photo Mobile Image</div>
                    </label>
                    <input @change="uploadImageMobile" id="file-upload-2" type="file" />
                    <div v-if="top_photo_filename_mobile || topPhotoMobileImage" class="file-show-block">
                        <div class="file-show-block-content">
                            <div v-if="topPhotoMobileImage" class="image-block-upload">
                                <img :src="topPhotoMobileImage">
                                <div @click="deleteFileMobile" class="delete-image-icon">
                                    <svg-icon name="close"></svg-icon>
                                </div>
                            </div>
                            <div v-if="!topPhotoMobileImage" class="image-block-upload">
                                <img :src="top_photo_filename_mobile">
                                <div @click="deleteFileMobile" class="delete-image-icon">
                                    <svg-icon name="close"></svg-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="upload-image">
                    <label for="file-upload-3" class="custom-file-upload">
                        <div
                                class="upload-button-div"
                        >Useful Tips Desktop Image</div>
                    </label>
                    <input @change="uploadImageUsefulDesctop" id="file-upload-3" type="file" />
                    <div v-if="useful_tips_photo_filename_desktop || usefulTipsPhotoDesktopImage" class="file-show-block">
                        <div class="file-show-block-content">
                            <div v-if="usefulTipsPhotoDesktopImage" class="image-block-upload">
                                <img :src="usefulTipsPhotoDesktopImage">
                                <div @click="deleteFileUsefulDesctop" class="delete-image-icon">
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
                    <label for="file-upload-4" class="custom-file-upload">
                        <div
                                class="upload-button-div"
                        >Useful Tips Mobile Image</div>
                    </label>
                    <input @change="uploadImageUsefulMobile" id="file-upload-4" type="file" />
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



                <!--<div class="upload-image">-->
                    <!--<div @click="toggleShowMD" class="btn upload-image-block">-->
                        <!--<label  class="custom-file-upload">-->
                            <!--<div-->
                                    <!--class="upload-button-div"-->
                            <!--&gt;Top Photo Upload Image</div>-->
                        <!--</label>-->
                    <!--</div>-->
                    <!--<my-upload field="photoFile"-->
                               <!--@crop-success="cropSuccessMD"-->
                               <!--:width="1485"-->
                               <!--:height="800"-->
                               <!--lang-type="en"-->
                               <!--:value.sync="showMD"-->
                               <!--@click="toggleShowMD"-->
                               <!--v-model="showMD"-->
                               <!--noRotate-->
                               <!--noCircle-->
                               <!--img-format="png"></my-upload>-->

                    <!--<div v-if="top_photo_filename_desktop || topPhotoDesktopImage" class="file-show-block">-->
                        <!--<div class="file-show-block-content">-->
                            <!--<div v-if="topPhotoDesktopImage" class="image-block-upload">-->
                                <!--<img :src="topPhotoDesktopImage">-->
                                <!--<div @click="deleteFileUsefulMobile" class="delete-image-icon">-->
                                    <!--<svg-icon name="close"></svg-icon>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div v-if="!topPhotoDesktopImage" class="image-block-upload">-->
                                <!--<img :src="top_photo_filename_desktop">-->
                                <!--<div @click="deleteFileUsefulDesctop" class="delete-image-icon">-->
                                    <!--<svg-icon name="close"></svg-icon>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="upload-image">-->
                    <!--<div @click="toggleShowMM" class="btn upload-image-block">-->
                        <!--<label  class="custom-file-upload">-->
                            <!--<div-->
                                    <!--class="upload-button-div"-->
                            <!--&gt;Top Photo Mobile Image</div>-->
                        <!--</label>-->
                    <!--</div>-->
                    <!--<my-upload field="photoFile"-->
                               <!--@crop-success="cropSuccessMM"-->
                               <!--:width="640"-->
                               <!--:height="1136"-->
                               <!--lang-type="en"-->
                               <!--:value.sync="showMM"-->
                               <!--@click="toggleShowMM"-->
                               <!--v-model="showMM"-->
                               <!--noRotate-->
                               <!--noCircle-->
                               <!--img-format="png"></my-upload>-->

                    <!--<div v-if="top_photo_filename_mobile || topPhotoMobileImage" class="file-show-block">-->
                        <!--<div class="file-show-block-content">-->
                            <!--<div v-if="topPhotoMobileImage" class="image-block-upload">-->
                                <!--<img :src="topPhotoMobileImage">-->
                                <!--<div @click="deleteFileUsefulMobile" class="delete-image-icon">-->
                                    <!--<svg-icon name="close"></svg-icon>-->
                                <!--</div>-->
                            <!--</div>-->
                            <!--<div v-if="!topPhotoMobileImage" class="image-block-upload">-->
                                <!--<img :src="top_photo_filename_mobile">-->
                                <!--<div @click="deleteFileUsefulMobile" class="delete-image-icon">-->
                                    <!--<svg-icon name="close"></svg-icon>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                    <!--</div>-->
                <!--</div>-->
                <!--<div class="upload-image">-->
                    <!--<div @click="toggleShowUD" class="btn upload-image-block">-->
                        <!--<label  class="custom-file-upload">-->
                            <!--<div-->
                                    <!--class="upload-button-div"-->
                            <!--&gt;Useful Tips Desktop Image</div>-->
                        <!--</label>-->
                    <!--</div>-->
                    <!--<my-upload field="photoFile"-->
                               <!--@crop-success="cropSuccessUD"-->
                               <!--:width="1485"-->
                               <!--:height="800"-->
                               <!--lang-type="en"-->
                               <!--:value.sync="showUD"-->
                               <!--@click="toggleShowUD"-->
                               <!--v-model="showUD"-->
                               <!--noRotate-->
                               <!--noCircle-->
                               <!--img-format="png"></my-upload>-->

                    <!--<div v-if="useful_tips_photo_filename_desktop || usefulTipsPhotoDesktopImage" class="file-show-block">-->
                        <!--<div class="file-show-block-content">-->
                            <!--<div v-if="usefulTipsPhotoDesktopImage" class="image-block-upload">-->
                                <!--<img :src="usefulTipsPhotoDesktopImage">-->
                                <!--<div @click="deleteFileUsefulMobile" class="delete-image-icon">-->
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
                    <!--<div @click="toggleShowUM" class="btn upload-image-block">-->
                        <!--<label  class="custom-file-upload">-->
                            <!--<div-->
                                    <!--class="upload-button-div"-->
                            <!--&gt;Useful Tips Mobile Image</div>-->
                        <!--</label>-->
                    <!--</div>-->
                    <!--<my-upload field="photoFile"-->
                               <!--@crop-success="cropSuccessUM"-->
                               <!--:width="640"-->
                               <!--:height="1136"-->
                               <!--lang-type="en"-->
                               <!--:value.sync="showUM"-->
                               <!--@click="toggleShowUM"-->
                               <!--v-model="showUM"-->
                               <!--noRotate-->
                               <!--noCircle-->
                               <!--img-format="png"></my-upload>-->

                    <!--<div v-if="useful_tips_photo_filename_mobile || usefulTipsPhotoMobileImage" class="file-show-block">-->
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

                <div class="text-blocks">
                    <h6>Useful tips</h6>
                    <div v-for="(block,index) in textBlocks" class="text-block">
                        <base-input
                                v-model="textBlocks[index].title"
                                label="Title"
                                placeholder="Title"
                                :errors="pe"
                                @resetError="resetError()" />
                        <div class="textarea-block">
                            <textarea placeholder="Text" v-model="textBlocks[index].text" class="custom-textarea"></textarea>
                        </div>
                        <div @click="removeTextBlock" class="remove-text-block">
                            Remove
                        </div>
                    </div>
                    <div @click="addTextBlock" class="add-new-text-block">
                        Add new text block
                    </div>
                </div>


            </div>
        </div>
        <base-button @click.native="addUpdateCountry" class="button-add" long>Update</base-button>
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
                iso_alpha_2: '',
                international_calling_code: '',
                group_of_countries_id: '',
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
                textBlocks: []
            }
        },
        created() {
//            this.fetchCategoriesCore()
        },

        computed: {
            ...mapState('ui', ['itemErrors']),
            ...mapState('countries', ['country']),

            pe() {
                return this.itemErrors['categories'] && this.itemErrors['categories'][0].parent_category_id || []
            },
            et() {
                return this.itemErrors['categories'] && this.itemErrors['categories'][0].slug || []
            },
            en() {
                return this.itemErrors['categories'] && this.itemErrors['categories'][0].name || []
            },
            getGroups(){
                return this.$store.getters['groups/getGroupsCore']
            },
        },
        beforeMount() {
            let compContext = this;

            this.slug = this.country.slug
            this.name = this.country.i18n.name,
            this.iso_alpha_2 = this.country.iso_alpha_2
            this.international_calling_code = this.country.international_calling_code

            this.$store.state.groups.groupsCore.forEach(element => {


                if (element.id == compContext.country.group_of_countries_id) {

                    compContext.group_of_countries_id = element.slug
                }
            })

            if(this.country.frontPageContent){
                this.top_photo_filename_desktop = this.country.frontPageContent.top_photo_filename_desktop;
                this.top_photo_filename_mobile = this.country.frontPageContent.top_photo_filename_mobile;
                this.useful_tips_photo_filename_desktop = this.country.frontPageContent.useful_tips_photo_filename_desktop;
                this.useful_tips_photo_filename_mobile = this.country.frontPageContent.useful_tips_photo_filename_mobile;
                this.weather_widget = this.country.frontPageContent.weather_widget;
                if(this.country.frontPageContent.i18n){
                    this.description1 = this.country.frontPageContent.i18n.description1;
                    this.description2 = this.country.frontPageContent.i18n.description2;
                    this.textBlocks = this.country.frontPageContent.i18n.text_blocks;
                }
            }
        },
        methods: {
            ...mapActions('countries', ['updateCountry']),
            ...mapMutations('ui', ['RESET_ITEM_ERROR']),

            addUpdateCountry() {

                let compContext = this;
                this.$store.state.groups.groupsCore.forEach(element => {
                    if (element.slug === compContext.group_of_countries_id) {
                        compContext.group_of_countries_id = element.id
                    }
                })

                const country = {
                    slug: this.slug,
                    i18n: {
                        name: this.name
                    },
                    iso_alpha_2: this.iso_alpha_2,
                    international_calling_code: this.international_calling_code,
                    group_of_countries_id: this.group_of_countries_id,
                    frontPageContent: {
                        topPhotoDesktopImage: this.topPhotoDesktopImage,
                        topPhotoMobileImage: this.topPhotoMobileImage,
                        weather_widget: this.weather_widget,
                        usefulTipsPhotoDesktopImage: this.usefulTipsPhotoDesktopImage,
                        usefulTipsPhotoMobileImage: this.usefulTipsPhotoMobileImage,
                        i18n: {
                            description1: this.description1,
                            description2: this.description2,
                            text_blocks: this.textBlocks
                        }
                    }
                }

                this.updateCountry(country)
            },

            setGroup(value){
                this.group_of_countries_id = value
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
            },
            addTextBlock(){
                const body = {
                    title: '',
                    text: ''
                }
                this.textBlocks.push(body);
            },
            removeTextBlock(index){
                this.textBlocks.splice(index, 1);
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