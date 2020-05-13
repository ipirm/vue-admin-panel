<template>
    <div class="form-container">
        <div class="form-content">
            <div class="general-info">
                <h6>General Info</h6>
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
            </div>
        </div>
        <base-button @click.native="addUpdateSetting" class="button-add" long>Add</base-button>
    </div>
</template>

<script>
    import PhoneInputForm from '@/components/UILibrary/Inputs/PhoneInputForm'
    import { mapActions, mapMutations, mapState } from 'vuex'

    export default {
        components: { PhoneInputForm },
        data() {
            return {
                name: '',
                description: ''
            }
        },
        created() {
            this.fetchSettingsCore()
        },

        computed: {
            ...mapState('ui', ['itemErrors']),

            pe() {
                return this.itemErrors['settings'] && this.itemErrors['categories'][0].type || []
            },
            en() {
                return this.itemErrors['settings'] && this.itemErrors['categories'][0].name || []
            },

            getSettings() {
                return this.$store.getters['settings/getSettingsCore']
            }
        },

        methods: {
            ...mapActions('settings', ['fetchSettingsCore','createSetting']),
            ...mapMutations('ui', ['RESET_ITEM_ERROR']),

            setParentCategory(value) {
                this.type = value
            },

            addUpdateSetting() {
                let compContext = this;

                this.$store.state.settings.settingsCore.forEach(element => {
                    if (element.name === compContext.type) {
                        compContext.type = element.type;
                    }
                })


                const setting = {
                    name: this.name,
                    description: this.description,
                }

                this.createSetting(setting)
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