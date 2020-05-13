<template>
    <div class="card-page">
        <bread-crumbs :items="breadcrumbs" />
        <div class="form-cont">
            <h1>Add type</h1>
            <transition name="fade" mode="out-in" appear>
                <component :is="tabComponent" />
            </transition>
        </div>
    </div>
</template>

<script>

    import AddType from '@/components/Forms/Types/Add/AddType'

    import { mapActions } from 'vuex'

    export default {
        components: { AddType },
        data: () => ({
            breadcrumbs: [
                { pathname: "dashboard", title: 'Home' },
                { pathname: "type-index", title: 'Types' },
                { pathname: "type-create", title: 'Add type' }
            ],
            tabComponent: 'AddType'
        }),
        methods: {
        }
    }
</script>

<style lang="scss" scoped>
    .form-cont {
        margin-left: 25px;
        margin-top: 30px;
    }
</style>