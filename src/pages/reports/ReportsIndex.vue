<template>
    <div class="card-page reports-list" >
        <bread-crumbs :items="breadcrumbs" />
        <div class="body-container">
            <tabs-router :tabs="tabs" />
            <transition name="fade" mode="out-in">
                <loader class="loader-cont" v-if="loading" />
                <router-view v-else class="view-cont" />
            </transition>
        </div>
    </div>
</template>
<script>
    import SvgIcon from "../../../node_modules/vue-cli-plugin-svg-sprite/template/src/components/SvgIcon";
    import moment from 'moment';
    import TabsRouter from '@/components/UILibrary/Tabs/TabsRouter'
    import { mapActions, mapState } from 'vuex'
    export default{
        components: { SvgIcon, TabsRouter },
        data: () => ({
            breadcrumbs: [
                {pathname: "dashboard", title: 'Home'},
                {pathname: "report-index", title: 'Reports'}
            ],
            tabs: [
                { title: 'Sales Report',               to: { name: 'sales-report', params: {} } },
                { title: 'Manage Report',              to: { name: 'manage-report', params: {} } }
            ]
        }),
        methods: {

        },
        computed: {
        },
        created(){
        },
        computed: {
            ...mapState('ui', ['loading'])
        },
    }
</script>