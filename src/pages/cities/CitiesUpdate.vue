<template>
    <div class="card-page">
        <bread-crumbs :items="breadcrumbs" />
        <div class="form-con">
            <h1>Edit city</h1>
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
    import EditCities from '@/components/Forms/Cities/Edit/EditCity.vue'

    import { mapActions, mapState } from 'vuex'

    export default {
        props: ['id'],
        components: { EditCities },
        data: () => ({
            breadcrumbs: [
                { pathname: "dashboard", title: 'Home' },
                { pathname: "city-index", title: 'Cities' },
                { pathname: "city-update", title: 'Edit city' }
            ],
            tabComponent: 'EditCities'
        }),
        computed: {
            ...mapState('ui', ['loading']),
        },
        created() {
            this.getCity(this.id);
            this.fetchCountriesCore();
        },
        methods: {
            ...mapActions('cities', ['getCity']),
            ...mapActions('countries', ['fetchCountriesCore']),
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
