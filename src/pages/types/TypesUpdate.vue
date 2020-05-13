<template>
    <div class="card-page">
        <bread-crumbs :items="breadcrumbs" />
        <div class="form-con">
            <h1>Edit type</h1>
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
    import EditTypes from '@/components/Forms/Types/Edit/EditType'

    import { mapActions, mapState } from 'vuex'

    export default {
        props: ['id'],
        components: { EditTypes },
        data: () => ({
            breadcrumbs: [
                { pathname: "dashboard", title: 'Home' },
                { pathname: "type-index", title: 'Types' },
                { pathname: "type-update", title: 'Edit type' }
            ],
            tabComponent: 'EditTypes'
        }),
        computed: {
            ...mapState('ui', ['loading']),
        },
        created() {
            this.getType(this.id)
        },
        methods: {
            ...mapActions('types', ['getType','']),
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
