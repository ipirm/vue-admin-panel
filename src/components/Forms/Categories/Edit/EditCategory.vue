<template>
    <div class="form-container">
        <div class="form-content">
            <div class="general-info">
                <h6>General Info</h6>
                <!--<base-select :defaultValue = "parent_category_id" :options="getCategories" @selected-option="setParentCategory" input-width="315px" width="315px" label="Parent Category" />-->
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
                        v-model="description"
                        label="description"
                        :errors="pe"
                        @resetError="resetError()" />
            </div>
        </div>
        <base-button @click.native="addUpdateCategory" class="button-add" long>Update</base-button>
    </div>
</template>

<script>
    import PhoneInputForm from '@/components/UILibrary/Inputs/PhoneInputForm'
    import { mapActions, mapMutations, mapState } from 'vuex'

    export default {
        components: { PhoneInputForm },
        data() {
            return {
                parent_category_id: '',
                slug: '',
                name: '',
                description: '',
                custVal: null
            }
        },
        created() {
//            this.fetchCategoriesCore()
        },

        computed: {
            ...mapState('ui', ['itemErrors']),
            ...mapState('categories', ['category','getCategoriesCore']),

            pe() {
                return this.itemErrors['categories'] && this.itemErrors['categories'][0].parent_category_id || []
            },
            et() {
                return this.itemErrors['categories'] && this.itemErrors['categories'][0].slug || []
            },
            en() {
                return this.itemErrors['categories'] && this.itemErrors['categories'][0].name || []
            },

            getCompanies() {
                return this.$store.getters['operators/getCompanies']
            },

            getCategories() {
                return this.$store.getters['categories/getCategoriesCore']
            }
        },
        beforeMount() {
//            this.parent_category_id = this.category.parent_category_id
            let compContext = this;
            this.$store.state.categories.categoriesCore.forEach(element => {


                if (element.id == compContext.category.parent_category_id) {
                    compContext.parent_category_id = element.slug
                }
            })


//            this.parent_category_id = this.category.parent_category_id
//            console.log(this.parent_category_id,'CUSTOM VALUE')

            this.slug = this.category.slug
            this.name = this.category.name
            this.description = this.category.description
        },
        methods: {
            ...mapActions('users', ['createUser']),
            ...mapActions('categories', ['fetchCategoriesCore','updateCategory']),
            ...mapMutations('ui', ['RESET_ITEM_ERROR']),

            setPhone(value) {
                this.phone_country_id = value[0]
                this.phone_number = value[1]
            },

            setParentCategory(value) {
                this.parent_category_id = value
            },

            addUpdateCategory() {
                let compContext = this;
                this.$store.state.categories.categoriesCore.forEach(element => {
                    if (element.slug === compContext.parent_category_id) {
                        compContext.parent_category_id = element.id
                    }
                })

                const category = {
                    slug: this.slug,
                    i18n: {
                        name: this.name,
                        description: this.description
                    }
                }

                this.updateCategory(category)
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