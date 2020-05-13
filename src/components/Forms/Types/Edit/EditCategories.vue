<template>
    <div class="form-container">
        <div class="form-content">
            <div class="general-info">
                <h6>General Info</h6>
                <!--<select-search-input-->
                        <!--@click="categories = $event"-->
                        <!--:options="getCategories"-->
                        <!--@selected-option="setCategoriesList"-->
                        <!--:custValue="categories"-->
                        <!--label="What categories are included?"-->
                        <!--inputWidth="590px"-->
                        <!--width="590px"-->
                        <!--max-width="590px"-->
                <!--&gt;</select-search-input>-->

                <div class="category-selection-input">
                    <label class="label">What categories are included?</label>
                    <div @click="openOptions" class="select">
                        <div class="value">
                            <div v-bind:key="index" v-for="(value, index) in selectedValues" class="value-item">
                                <div @click.stop="removeOption(value.id)">
                                    {{ value.name }}<svg-icon class="close-icon" name="close" />
                                </div>
                            </div>
                        </div>
                        <svg-icon class="arrow-bottom" name="arrow_bottom" />
                    </div>
                    <div v-show="activeOptions" class="options">
                        <div @click.stop = 'doNothing' class="search-block">
                            <base-input search placeholder="Search"></base-input>
                        </div>
                        <div v-if="parentBlock" class="parent-divs-block">
                            <div v-for="(parent,index) in getCategories" @click.stop="openChildBlock(parent)" class="parent-div">
                                <div class="title">{{ parent.name }}</div>
                                <div class="svg-block">
                                    <svg-icon name="arrow_slim"></svg-icon>
                                </div>
                            </div>
                        </div>
                        <div v-if="childBlock" class="child-divs-block">
                            <div @click.stop="backToParents" class="back-block">
                                <div class="back-svg-block">
                                    <svg-icon name="arrow_slim"></svg-icon>
                                </div>
                                <div class="back-writing">
                                    {{ parentName }}
                                </div>
                            </div>
                            <div
                                    v-for="(item, key) in childs"
                                    :key="key"
                                    class="option"
                                    @click.stop = 'doNothing'
                            >
                                <input @change="selectOption(item)" :id="item.id" :checked="checkSelectedId(item.id)" class="checkbox-input" type="checkbox">
                                <label :for="item.id">{{ item.name }}</label>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
        <base-button @click.native="addUpdateProductTypeCategories" class="button-add" long>Add</base-button>
    </div>
</template>

<script>
    import SelectSearchInput from '@/components/UILibrary/Selects/SelectSearchInput'

    import { mapActions, mapMutations, mapState } from 'vuex'
    import SvgIcon from "../../../../../node_modules/vue-cli-plugin-svg-sprite/template/src/components/SvgIcon";

    export default {
        components: {
            SvgIcon,
            SelectSearchInput },
        data() {
            return {
                categories: [],
                activeOptions: true,
                stopEventClick: false,
                selectedItems: [],
                selectedValues: [],
                value: null,
                parentBlock: true,
                childBlock: false,
                childs: [],
                parentName: '',
            }
        },
        created() {
            this.fetchCategoriesTree()
        },

        beforeMount() {
            this.selectedItems = this.categoriesList;
            this.selectedValues = this.categoriesValues;
        },

        computed: {
            ...mapState('ui', ['itemErrors']),
            ...mapState('types', ['type','categoriesList','categoriesValues']),

            pe() {
                return this.itemErrors['settings'] && this.itemErrors['categories'][0].type || []
            },
            et() {
                return this.itemErrors['settings'] && this.itemErrors['categories'][0].select_catogories_title || []
            },
            en() {
                return this.itemErrors['settings'] && this.itemErrors['categories'][0].name || []
            },

            getSettings() {
                return this.$store.getters['settings/getSettingsCore']
            },

            getCategories() {
                return this.$store.getters['categories/categoriesTree']
            },
        },

        mounted(){
            document.addEventListener('click', () => this.closeOptionModal())
        },


        methods: {
            ...mapActions('types', ['updateProductTypeCategories']),
            ...mapActions('categories', ['fetchCategoriesTree']),
            ...mapMutations('ui', ['RESET_ITEM_ERROR']),

            addUpdateProductTypeCategories() {
                const body = {
                    id: this.$route.params.id,
                    categories: this.selectedItems
                };
                this.updateProductTypeCategories(body)
            },

            setCategoriesList(val){
                this.categories = val;
            },

            resetError() {
                this.RESET_ITEM_ERROR()
            },

            openOptions() {
                this.stopEventClick = true
                this.activeOptions = !this.activeOptions
            },

            openChildBlock(parent){
                this.parentBlock = false;
                this.childBlock = true;
                this.childs = parent.childs;
                this.parentName = parent.name;
            },

            backToParents(){
                this.parentBlock = true;
                this.childBlock = false;
                this.childs = [];
                this.parentName = '';
            },

            selectOption(item) {
                if (this.selectedItems.indexOf(item.id) > -1) {
                    this.selectedItems.splice(this.selectedItems.indexOf(item.id), 1);
                } else {
                    this.selectedItems.push(item.id);
                }
                if(this.selectedValues.findIndex(x => x.id === item.id) > -1){
                    this.selectedValues.splice(this.selectedValues.findIndex(x => x.id === item.id), 1);
                }else{
                    this.selectedValues.push(item);
                }
            },
            closeOptionModal() {
                if (!this.stopEventClick) {
                    this.activeOptions = false
                } else {
                    this.stopEventClick = false
                }
            },
            removeOption(id){
                if (this.selectedItems.indexOf(id) > -1) {
                    this.selectedItems.splice(this.selectedItems.indexOf(id), 1);
                }
                if(this.selectedValues.findIndex(x => x.id === id) > -1){
                    this.selectedValues.splice(this.selectedValues.findIndex(x => x.id === id), 1);
                }
            },
            checkSelectedId(id){
                if(this.selectedItems.indexOf(id) > -1 || this.selectedItems.indexOf(String(id)) > -1) {
                    return true;
                } else {
                    return false;
                }
            },
            doNothing(){

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