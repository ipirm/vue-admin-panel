<template>
    <div class="card-page">
        <bread-crumbs :items="breadcrumbs" />
        <div class="form-con">
            <h1>Edit country</h1>
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
    import EditCountries from '@/components/Forms/Countries/Edit/EditCountry'

    import { mapActions, mapState } from 'vuex'

    export default {
        props: ['id'],
        components: { EditCountries },
        data: () => ({
            breadcrumbs: [
                { pathname: "dashboard", title: 'Home' },
                { pathname: "country-index", title: 'Countries' },
                { pathname: "country-update", title: 'Edit countries' }
            ],
            tabComponent: 'EditCountries'
        }),
        computed: {
            ...mapState('ui', ['loading']),
        },
        created() {
            this.getCountry(this.id),
            this.fetchGroupsCore();
        },
        methods: {
            ...mapActions('countries', ['getCountry']),
            ...mapActions('groups', ['fetchGroupsCore']),
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
