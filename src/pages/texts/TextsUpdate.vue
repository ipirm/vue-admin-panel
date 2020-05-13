<template>
    <div class="card-page">
        <bread-crumbs :items="breadcrumbs" />
        <div class="form-con">
            <h1>Edit Text Page</h1>
            <transition name="fade" mode="out-in" appear>
                <loader v-if="loading" class="loader-cont" />
                <div class="container-fade" v-else>
                    <component :is="tabComponent" />
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
    import EditTexts from '@/components/Forms/Texts/Edit/EditText.vue'

    import { mapActions, mapState } from 'vuex'

    export default {
        props: ['id'],
        components: { EditTexts },
        data: () => ({
            breadcrumbs: [
                { pathname: "dashboard", title: 'Home' },
                { pathname: "text-index", title: 'Text pages' },
                { pathname: "text-update", title: 'Edit text page' }
            ],
            tabComponent: 'EditTexts'
        }),
        computed: {
            ...mapState('ui', ['loading']),
        },
        created() {
            this.getText(this.id)
            this.fetchLanguagesCore()
            this.fetchCountriesCore()
            this.fetchCitiesCore()
            this.fetchMenusCore();
        },
        methods: {
            ...mapActions('texts', ['getText','fetchLanguagesCore']),
            ...mapActions('countries', ['fetchCountriesCore']),
            ...mapActions('cities', ['fetchCitiesCore']),
            ...mapActions('menus', ['fetchMenusCore']),
        }
    }
</script>

<style lang="scss" scoped>
    .form-cont {
        margin-left: 25px;
        margin-top: 30px;
    }

    .loader-cont {
        max-width: 400px;
        max-height: 400px;
    }

    .container-fade {
        margin-left: 20px;
    }
</style>
