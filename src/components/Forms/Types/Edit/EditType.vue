<template>
    <div class="form-container">
        <div class="form-content">
            <div class="general-info">
                <h6>General Info</h6>
                <!--<base-select :options="getTypes" @selected-option="setParentCategory" input-width="315px" width="315px" label="Type" />-->
                <base-input
                        v-model="name"
                        label="Name"
                        :errors="pe"
                        @resetError="resetError()" />
                <base-input
                        v-model="select_catogories_title"
                        label="Select Categories Title"
                        :errors="pe"
                        @resetError="resetError()" />
                <base-input
                        v-model="description"
                        label="Description"
                        :errors="pe"
                        @resetError="resetError()" />
            </div>
        </div>
        <base-button @click.native="addUpdateType" class="button-add" long>Add</base-button>
    </div>
</template>

<script>
    import PhoneInputForm from '@/components/UILibrary/Inputs/PhoneInputForm'
    import { mapActions, mapMutations, mapState } from 'vuex'

    export default {
        components: { PhoneInputForm },
        data() {
            return {
                typeEdit: '',
                select_catogories_title: '',
                name: '',
                description: ''
            }
        },
        created() {
            this.fetchTypesCore()
        },

        beforeMount() {
            this.select_catogories_title = this.type.select_catogories_title
            this.typeEdit = this.type.type
            this.name = this.type.name
            this.description = this.type.description
        },

        computed: {
            ...mapState('ui', ['itemErrors']),
            ...mapState('types', ['type']),

            pe() {
                return this.itemErrors['types'] && this.itemErrors['categories'][0].type || []
            },
            et() {
                return this.itemErrors['types'] && this.itemErrors['categories'][0].select_catogories_title || []
            },
            en() {
                return this.itemErrors['types'] && this.itemErrors['categories'][0].name || []
            },

            getTypes() {
                return this.$store.getters['types/getTypesCore']
            }
        },


        methods: {
            ...mapActions('types', ['fetchTypesCore','updateType']),
            ...mapMutations('ui', ['RESET_ITEM_ERROR']),

            setParentCategory(value) {
                this.typeEdit = value
            },

            addUpdateType() {
                let compContext = this;

                this.$store.state.types.typesCore.forEach(element => {
                    if (element.name === compContext.typeEdit) {
                        compContext.typeEdit = element.type;
                    }
                })


                const type = {
                    type: this.typeEdit,
                    select_catogories_title: this.select_catogories_title,
                    name: this.name,
                    description: this.description,
                }

                this.updateType(type)
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