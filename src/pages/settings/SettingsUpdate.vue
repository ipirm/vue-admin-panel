<template>
    <div class="card-page">
        <bread-crumbs :items="breadcrumbs" />
        <div class="form-con">
            <h1>Edit setting</h1>
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
    import EditSettings from '@/components/Forms/Settings/Edit/EditSetting.vue'

    import { mapActions, mapState } from 'vuex'

    export default {
        props: ['id'],
        components: { EditSettings },
        data: () => ({
            breadcrumbs: [
                { pathname: "dashboard", title: 'Home' },
                { pathname: "setting-index", title: 'Settings' },
                { pathname: "setting-update", title: 'Edit setting' }
            ],
            tabComponent: 'EditSettings'
        }),
        computed: {
            ...mapState('ui', ['loading']),
        },
        created() {
            this.getSetting(this.id)
        },
        methods: {
            ...mapActions('settings', ['getSetting']),
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
