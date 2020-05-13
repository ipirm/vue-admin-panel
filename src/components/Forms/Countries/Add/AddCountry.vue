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
            </div>
        </div>
        <base-button @click.native="addUpdateCountry" class="button-add" long>Add</base-button>
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
                iso_alpha_2: '',
                international_calling_code: '',
                group_of_countries_id: '',
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

            getGroups(){
                return this.$store.getters['groups/getGroupsCore']
            },
        },

        methods: {
            ...mapActions('countries', ['createCountry']),
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
                    group_of_countries_id: this.group_of_countries_id
                }

                this.createCountry(country)
            },

            setGroup(value){
                this.group_of_countries_id = value
            },

            resetError() {
                this.RESET_ITEM_ERROR()
            },
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