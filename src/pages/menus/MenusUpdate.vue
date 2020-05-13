<template>
    <div class="card-page">
        <bread-crumbs :items="breadcrumbs" />
        <div class="form-con">
            <h1>Edit Nav Menu</h1>
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
    import EditMenus from '@/components/Forms/Menus/Edit/EditMenu.vue'

    import { mapActions, mapState } from 'vuex'

    export default {
        props: ['id'],
        components: { EditMenus },
        data: () => ({
            breadcrumbs: [
                { pathname: "dashboard", title: 'Home' },
                { pathname: "menu-index", title: 'Menu pages' },
                { pathname: "menu-update", title: 'Edit menu page' }
            ],
            tabComponent: 'EditMenus'
        }),
        computed: {
            ...mapState('ui', ['loading']),
        },
        created() {
            this.getMenu(this.id)
        },
        methods: {
            ...mapActions('menus', ['getMenu'])
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
