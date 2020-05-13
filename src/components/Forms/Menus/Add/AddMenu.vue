<template>
    <div class="form-container">
        <div class="form-content">
            <div class="general-info">
                <h6>General Info</h6>
                <base-input
                        v-model="title"
                        label="Title"
                        :errors="pe"
                        @resetError="resetError()" />
                <base-input
                        v-model="location"
                        label="Location"
                        :errors="pe"
                        @resetError="resetError()" />
                <div class="items">
                    <div v-for="(item,index) in items" class="item">
                        <div class="title">
                            <span>Item no {{ index + 1 }}</span>
                            <div class="delete-item-block" @click.stop="deleteItem(index)">
                                <svg-icon name="trash"></svg-icon>
                            </div>
                        </div>
                        <base-input
                                v-model="items[index].title"
                                label="Title"
                                :errors="pe"
                                @resetError="resetError()" />
                        <base-input
                                v-model="items[index].url"
                                label="Url"
                                :errors="pe"
                                @resetError="resetError()" />
                    </div>
                    <div @click="addItem" class="add-item">Add Item</div>
                </div>

            </div>
        </div>
        <base-button @click.native="addUpdateMenu" class="button-add" long>Add</base-button>
    </div>
</template>

<script>
    import PhoneInputForm from '@/components/UILibrary/Inputs/PhoneInputForm'
    import SelectSearchCountryInput from '@/components/UILibrary/Selects/SelectSearchCountryInput'
    import SelectSearchCityInput from '@/components/UILibrary/Selects/SelectSearchCityInput'
    import { mapActions, mapMutations, mapState } from 'vuex'
    import "vue-wysiwyg/dist/vueWysiwyg.css";

    export default {
        components: { PhoneInputForm, SelectSearchCityInput, SelectSearchCountryInput },
        data() {
            return {
                title: '',
                location: '',
                items: []
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
            ...mapActions('users', ['createUser']),
            ...mapActions('menus', ['createMenu']),
            ...mapMutations('ui', ['RESET_ITEM_ERROR']),

            setPhone(value) {
                this.phone_country_id = value[0]
                this.phone_number = value[1]
            },

            addUpdateMenu() {

                const menu = {
                    title: this.title,
                    location: this.location,
                    items: this.items
                }

                this.createMenu(menu)
            },

            addItem(){
                this.items.push({title:'',url:''})
            },
            deleteItem(index){
                this.items.slice(index,1)
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