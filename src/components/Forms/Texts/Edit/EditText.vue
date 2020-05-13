<template>
    <div class="form-container">
        <div class="form-content">
            <div class="general-info">
                <h6>General Info</h6>
                <base-select :defaultValue = "language_id" :options="getLanguages" @selected-option="setLanguage" input-width="315px" width="315px" label="Language" />
                <base-input
                        v-model="slug"
                        label="Slug"
                        :errors="pe"
                        @resetError="resetError()" />

                <base-input
                        v-model="title"
                        label="Title"
                        :errors="pe"
                        @resetError="resetError()" />

                <label style="display: block;" class="default-label">Text</label>
                <froala :tag="'textarea'" :config="config" v-model="text1"></froala>

                <select-search-country-input
                        @click="coutryIds = $event"
                        :options="getCountries"
                        @selected-option="setCountries"
                        :custValue="coutryIds"
                        label="Select Countries"
                        inputWidth="590px"
                        width="590px"
                        max-width="590px"
                ></select-search-country-input>

                <select-search-city-input
                        @click="cityIds = $event"
                        :custValue="cityIds"
                        :options="getCities"
                        @selected-option="setCities"
                        label="Select Cities"
                        inputWidth="590px"
                        width="590px"
                        max-width="590px"
                ></select-search-city-input>

                <base-select :defaultValue = "nav_menu_id" :options="getMenus" @selected-option="setMenu" input-width="315px" width="315px" label="Nav Menu" />
                <div class="upload-image">
                    <label for="file-upload-top" class="custom-file-upload">
                        <div
                                class="upload-button-div"
                        >Top Photo Upload Image</div>
                    </label>
                    <input @change="uploadImageTop" id="file-upload-top" type="file" />

                    <div v-if="top_image_filename || topImage" class="file-show-block">
                        <div class="file-show-block-content">
                            <div v-if="topImage" class="image-block-upload">
                                <img :src="topImage">
                                <div @click="deleteTopImage" class="delete-image-icon">
                                    <svg-icon name="close"></svg-icon>
                                </div>
                            </div>
                            <div v-if="!topImage" class="image-block-upload">
                                <img :src="top_image_filename">
                                <div @click="deleteTopImage" class="delete-image-icon">
                                    <svg-icon name="close"></svg-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="upload-image">
                    <!--<div @click="toggleShowFeaturedImage" class="btn upload-image-block">-->
                        <!--<label  class="custom-file-upload">-->
                            <!--<div-->
                                    <!--class="upload-button-div"-->
                            <!--&gt;Featured Photo Image</div>-->
                        <!--</label>-->
                    <!--</div>-->
                    <!--<my-upload field="photoFile"-->
                               <!--@crop-success="cropSuccessFeaturedImage"-->
                               <!--@src-file-set="setFeaturedImage"-->
                               <!--:width="700"-->
                               <!--:height="700"-->
                               <!--lang-type="en"-->
                               <!--:value.sync="showFeaturedImage"-->
                               <!--@click="toggleShowFeaturedImage"-->
                               <!--v-model="showFeaturedImage"-->
                               <!--noRotate-->
                               <!--noCircle-->
                               <!--img-format="png"></my-upload>-->
                    <label for="file-upload" class="custom-file-upload">
                        <div
                                class="upload-button-div"
                        >Featured Photo Upload Image</div>
                    </label>
                    <input @change="uploadImage" id="file-upload" type="file" />

                    <div v-if="featured_image_filename || featuredImage" class="file-show-block">
                        <div class="file-show-block-content">
                            <div v-if="featuredImage" class="image-block-upload">
                                <img :src="featuredImage">
                                <div @click="deleteFeaturedImage" class="delete-image-icon">
                                    <svg-icon name="close"></svg-icon>
                                </div>
                            </div>
                            <div v-if="!featuredImage" class="image-block-upload">
                                <img :src="featured_image_filename">
                                <div @click="deleteFeaturedImage" class="delete-image-icon">
                                    <svg-icon name="close"></svg-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <base-button @click.native="addUpdateText" class="button-add" long>Add</base-button>
    </div>
</template>

<script>
    import PhoneInputForm from '@/components/UILibrary/Inputs/PhoneInputForm'
    import { mapActions, mapMutations, mapState } from 'vuex'
    import "vue-wysiwyg/dist/vueWysiwyg.css";
    import SelectSearchCityInput from '@/components/UILibrary/Selects/SelectSearchCityInput'
    import SelectSearchCountryInput from '@/components/UILibrary/Selects/SelectSearchCityInput'
    import myUpload from 'vue-image-crop-upload';

    export default {
        components: { PhoneInputForm, SelectSearchCountryInput, SelectSearchCityInput, myUpload },
        data() {
            return {
                language_id: '',
                slug: '',
                title: '',
                text1: '',
                coutryIds: this.coutryIds,
                cityIds: this.cityIds,
                nav_menu_id: null,

                image: {
                    uploadURL: "https://api.travel.iteora.com/v1/text-pages/upload-file",
                    dropzoneOptions: {}
                },
                config: {
                    events: {
                        initialized: function () {
                            console.log('initialized')
                        }
                    },
                    placeholderText: 'Edit Your Content Here!',
                    charCounterCount: false,
                    width: '1000',
                    key: 'WE1B5dG3F4A3A7C10B6cbnmhmkaB6B-13fC-9yC-7A3md1C-13mD6F5F4I4E1A9A6C3C4F4==',
                    toolbarButtons: ['fullscreen', 'bold', 'italic','textColor', 'backgroundColor','inlineClass', 'underline', 'strikeThrough', 'subscript', 'superscript', '|', 'fontFamily', 'fontSize', 'color', 'inlineStyle', 'paragraphStyle', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'outdent', 'indent', 'quote', '-', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', 'insertTable', '|', 'emoticons', 'specialCharacters', 'insertHR', 'selectAll', 'clearFormatting', '|', 'print', 'help', 'html', '|', 'undo', 'redo'],
                    wordAllowedStyleProps: ['margin-top'],
                    inlineClasses: {
                        'fr-class-code': 'Code',
                        'fr-class-highlighted': 'Highlighted',
                        'fr-class-transparency': 'Transparent'
                    }
                },
                showTopImage: false,
                top_image_filename: null,
                showFeaturedImage: false,
                featured_image_filename: null,
                topImage: null,
                featuredImage: null,
                featuredImageFile: null,
                topImageFilename: null
            }
        },
        created() {
        },

        computed: {
            ...mapState('ui', ['itemErrors']),
            ...mapState('texts', ['text']),

            pe() {
                return this.itemErrors['categories'] && this.itemErrors['categories'][0].parent_category_id || []
            },
            et() {
                return this.itemErrors['categories'] && this.itemErrors['categories'][0].slug || []
            },
            en() {
                return this.itemErrors['categories'] && this.itemErrors['categories'][0].name || []
            },

            getLanguages() {
                return this.$store.getters['texts/getLanguagesCore']
            },

            getCountries() {
                return this.$store.getters['countries/countriesCore']
            },

            getCities() {
                return this.$store.getters['cities/citiesCore']
            },

            getMenus() {
                return this.$store.getters['menus/getMenusCore']
            }
        },

        beforeMount() {

            this.slug = this.text.slug
            this.title = this.text.title
            this.text1 = this.text.text
            this.coutryIds = this.text.coutryIds
            this.cityIds = this.text.cityIds
            this.top_image_filename = this.text.top_image_filename
            this.featured_image_filename = this.text.featured_image_filename

            let compContext = this;

            this.$store.state.texts.languagesCore.forEach(element => {


                if (element.id == compContext.text.language_id) {

                    compContext.language_id = element.name
                }
            });

            this.$store.state.menus.menusCore.forEach(element => {


                if (element.id == compContext.text.nav_menu_id) {

                    compContext.nav_menu_id = element.title
                }
            });
        },

        methods: {
            ...mapActions('texts', ['updateText']),
            ...mapMutations('ui', ['RESET_ITEM_ERROR']),

            setPhone(value) {
                this.phone_country_id = value[0]
                this.phone_number = value[1]
            },

            addUpdateText() {

                let compContext = this;
                this.$store.state.texts.languagesCore.forEach(element => {
                    if (element.name === compContext.language_id) {
                        compContext.language_id = element.id
                    }
                })

                this.$store.state.menus.menusCore.forEach(element => {
                    if (element.title === compContext.nav_menu_id) {
                        compContext.nav_menu_id = element.id
                    }
                })

                const text = {
                    language_id: this.language_id,
                    slug: this.slug,
                    title: this.title,
                    text: this.text1,
                    coutryIds: this.coutryIds,
                    cityIds: this.cityIds,
                    nav_menu_id: this.nav_menu_id,
                    featuredImageFile: this.featuredImageFile,
                    topImageFilename: this.topImageFilename
                }

                let formData = new FormData();
                if(this.featuredImageFile){
                    formData.append('featuredImageFile', this.featuredImageFile);
                }
                if(this.topImageFilename){
                    formData.append('topImageFilename', this.topImageFilename);
                }

                formData.append('language_id', this.language_id);
                formData.append('slug', this.slug);
                formData.append('title', this.title);
                formData.append('text', this.text1);

//                formData.append('coutryIds', JSON.stringify(this.coutryIds));
//                formData.append('cityIds', JSON.stringify(this.cityIds));
                formData.append('nav_menu_id', this.nav_menu_id);

                this.updateText(formData)
            },

            setLanguage(val){
                this.language_id = val;
            },

            setCountries(val){
                this.coutryIds = val;
            },

            setCities(val){
                this.cityIds = val;
            },

            setMenu(val){
                this.nav_menu_id = val;
            },

            toggleShowTopImage() {
                this.showTopImage = !this.showTopImage;
            },
            deleteTopImage(){
                this.topImage = null;
                this.top_image_filename = null;
            },
            cropSuccessTopImage(imgDataUrl, field){
                console.log(field, 'here we go');
                this.topImage = imgDataUrl;
            },
            cropSuccessFeaturedImage(imgDataUrl, field){
                console.log(field, 'here we go');
                this.featuredImage = imgDataUrl;
            },
            toggleShowFeaturedImage() {
                this.showFeaturedImage = !this.showFeaturedImage;
            },
            deleteFeaturedImage(){
                this.featuredImage = null;
                this.featured_image_filename = null;
            },
            setFeaturedImage(fileName, fileType, fileSize){
                this.featuredImageFile = fileName;
            },
            setTopImage(fileName, fileType, fileSize){
                this.topImageFilename = fileName;
            },
            uploadImageTop(e){
                const files = e.target.files;
                this.topImageFilename = files[0];
                this.getBase64Top(files[0])
            },
            uploadImage(e) {

                const files = e.target.files;
                this.featuredImageFile = files[0];
                this.getBase64(files[0])
            },

            getBase64(file) {
                let compContext = this;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    compContext.featuredImage = reader.result;
                };
                reader.onerror = function (error) {
                };

            },
            getBase64Top(file) {
                let compContext = this;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function () {
                    compContext.topImage = reader.result;
                };
                reader.onerror = function (error) {
                };

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