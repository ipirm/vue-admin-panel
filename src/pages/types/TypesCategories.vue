<template>
    <div class="card-page">
        <bread-crumbs :items="breadcrumbs" />
        <div class="form-con">
            <h1>Edit setting categories</h1>
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
    import EditCategories from '@/components/Forms/Types/Edit/EditCategories.vue'

    import { mapActions, mapState } from 'vuex'

    export default {
        props: ['id'],
        components: { EditCategories },
        data: () => ({
            breadcrumbs: [
                { pathname: "dashboard", title: 'Home' },
                { pathname: "type-index", title: 'Settings' },
                { pathname: "types-categories", title: 'Edit setting categories' }
            ],
            tabComponent: 'EditCategories'
        }),
        computed: {
            ...mapState('ui', ['loading']),
        },
        created() {
            this.getType(this.id);
            this.getCategoriesList(this.id);
            this.getCategoriesValues(this.id);
        },
        methods: {
            ...mapActions('types', ['getType','getCategoriesList','getCategoriesValues']),
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
