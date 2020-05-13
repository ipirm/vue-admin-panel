<template>
    <div class="card-page">
        <bread-crumbs :items="breadcrumbs" />
        <div class="form-cont">
            <h1>Add setting</h1>
            <transition name="fade" mode="out-in" appear>
                <component :is="tabComponent" />
            </transition>
        </div>
    </div>
</template>

<script>

    import AddSetting from '@/components/Forms/Settings/Add/AddSetting'

    import { mapActions } from 'vuex'

    export default {
        components: { AddSetting },
        data: () => ({
            breadcrumbs: [
                { pathname: "dashboard", title: 'Home' },
                { pathname: "setting-index", title: 'Settings' },
                { pathname: "setting-create", title: 'Add setting' }
            ],
            tabComponent: 'AddSetting'
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