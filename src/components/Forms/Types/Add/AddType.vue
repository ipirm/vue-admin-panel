<template>
    <div class="form-container">
        <div class="form-content">
            <div class="general-info">
                <h6>General Info</h6>
                <base-select :options="getTypes" @selected-option="setParentCategory" input-width="315px" width="315px" label="Type" />
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
                type: '',
                select_catogories_title: '',
                name: '',
                description: ''
            }
        },
        created() {
            this.fetchTypesCore()
        },

        computed: {
            ...mapState('ui', ['itemErrors']),

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
            ...mapActions('types', ['fetchTypesCore','createType']),
            ...mapMutations('ui', ['RESET_ITEM_ERROR']),

            setParentCategory(value) {
                this.type = value
            },

            addUpdateType() {
                let compContext = this;

                this.$store.state.types.typesCore.forEach(element => {
                    if (element.name === compContext.type) {
                        compContext.type = element.type;
                    }
                })


                const type = {
                    type: this.type,
                    select_catogories_title: this.select_catogories_title,
                    name: this.name,
                    description: this.description,
                }

                this.createType(type)
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