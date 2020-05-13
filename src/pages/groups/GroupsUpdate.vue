<template>
    <div class="card-page">
        <bread-crumbs :items="breadcrumbs" />
        <div class="form-con">
            <h1>Edit group countries</h1>
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
    import EditGroups from '@/components/Forms/Groups/Edit/EditGroup.vue'

    import { mapActions, mapState } from 'vuex'

    export default {
        props: ['id'],
        components: { EditGroups },
        data: () => ({
            breadcrumbs: [
                { pathname: "dashboard", title: 'Home' },
                { pathname: "group-index", title: 'Group Countries' },
                { pathname: "group-update", title: 'Edit group countries' }
            ],
            tabComponent: 'EditGroups'
        }),
        computed: {
            ...mapState('ui', ['loading']),
        },
        created() {
            this.getGroup(this.id)
        },
        methods: {
            ...mapActions('groups', ['getGroup']),
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
