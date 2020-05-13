<template>
    <div class="card-page">
        <bread-crumbs :items="breadcrumbs" />
        <div class="form-con">
            <h1>Edit category</h1>
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
    import EditCategories from '@/components/Forms/Childs/Edit/EditChild'

    import { mapActions, mapState } from 'vuex'

    export default {
        props: ['id','catId'],
        components: { EditCategories },
        data: () => ({
            breadcrumbs: [
                { pathname: "dashboard", title: 'Home' },
                { pathname: "category-index", title: 'Categories' },
                { pathname: "child-index", title: 'Child Categories' },
                { pathname: "child-update", title: 'Child Categories Update' },
            ],
            tabComponent: 'EditCategories'
        }),
        computed: {
            ...mapState('ui', ['loading']),
        },
        created() {
            console.log("SORRY??");
            this.getCategory(this.catId)
            this.fetchCategoriesCore()
        },
        methods: {
            ...mapActions('categories', ['getCategory','fetchCategoriesCore']),
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
