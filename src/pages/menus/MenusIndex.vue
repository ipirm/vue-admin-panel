<template>
    <div class="card-page">
        <bread-crumbs :items="breadcrumbs" />
        <h1>Manage Nav Menus</h1>
        <alert-info
                text="Manage nav menus"
                button="Add Nav Menu"
                @buttonClick="$router.push('/menus/new')" />


        <div class="filter-entity">
            <div class="left-cont">
                <div class="wrapper-input">
                    <input class="input" type="text" @input="onQuery" v-model="query">
                    <svg-icon class="search" name="search" />
                </div>

                <div class="show-int">
                    <div class="text-show">Show:</div>
                    <base-select :default-value="showQuantity[0]" :options="showQuantity" @selected-option="paginate({perPage: $event})" mini />
                </div>

                <div class="loading-cont">
                    <loader v-if="loading" type="points" mini-points color="blue" />
                </div>
            </div>

            <div class="right-cont">
                <base-button class="delete-button" type="light">Delete</base-button>
            </div>
        </div>

        <entity-table @delete-menu="deleteMenuEmit" @click-arrow="onSort" />

        <div class="pagination-cont">
            <pagination-table :meta="menusMeta" @paginate="paginate" />
        </div>

        <base-modal :active="activeModal" @close="activeModal = false">
            <div class="confirmation">Confirmation</div>
            <div class="question">Are you sure to delete a menu pages?</div>
            <div class="name-user">{{ deleteName }}</div>
            <div class="buttons">
                <base-button type="light" @click.native="activeModal = false">Cancel</base-button>
                <base-button @click.native="modalClickDelete">Delete</base-button>
            </div>
        </base-modal>
    </div>
</template>

<script>
    import AlertInfo from '@/components/UILibrary/Alerts/AlertInfo'
    import BaseModal from '@/components/UILibrary/Modals/BaseModal'
    import EntityTable from '@/components/UILibrary/Tables/EntityTableMenus'
    import PaginationTable from '@/components/UILibrary/PaginationTable'

    import { mapActions, mapState } from 'vuex'

    export default {
        components: { AlertInfo, BaseModal, EntityTable, PaginationTable },
        data: () => ({
            showQuantity: ['All', '5', '10', '20'],
            breadcrumbs: [
                { pathname: "dashboard", title: 'Home' },
                { pathname: "menu-index", title: 'Menus' }
            ],
            queryParams: {},
            activeModal: false,
            deleteName: null,
            deleteId: null,
            query: '',
            sort: null
        }),
        mounted() {
            this.queryParams.perPage = 'All'
            this.get()
        },
        computed: {
            ...mapState('ui', ['loading']),
            ...mapState('menus', [ 'menusMeta'])
        },
        methods: {
            ...mapActions('menus', ['getFilterMenus', 'deleteMenu']),

            deleteMenuEmit(item) {
                this.deleteName = item.slug
                this.deleteId = item.id
                this.activeModal = true
            },

            modalClickDelete() {
                this.deleteMenu(this.deleteId)
                this.activeModal = false
            },

            paginate(payload) {
                this.queryParams = { ...this.queryParams, ...payload }
                this.get()
            },

            onQuery() {
                this.queryParams.query = this.query
                this.get()
            },

            onSort(payload) {
                this.sort = this.sort === payload ? null : payload;
                this.queryParams.sort = this.sort
                this.get()
            },

            get() {
                this.getFilterMenus(this.queryParams)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .confirmation {
        font-size: 22px;
        font-weight: 700;
        color: #052e46;
        margin-top: 30px;
    }

    .question {
        font-size: 14px;
        color: #052e46;
        margin: 30px 0 0 10px;
    }

    .name-user {
        font-size: 14px;
        color: #052e46;
        margin-top: 10px;
        margin-bottom: 20px;
    }

    .buttons {
        width: 190px;
        display: flex;
        justify-content: space-between;
    }

    .pagination-cont {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;
        margin-right: 3rem;
        margin-bottom: 3rem;
    }

    .filter-entity {
        display: flex;
        justify-content: space-between;
        margin-top: 1rem;
    }

    .left-cont {
        display: flex;
        align-items: flex-end;
    }

    .text-show {
        font-size: 13px;
        margin-top: 7px;
        margin-right: 10px;
    }

    .show-int {
        display: flex;
        margin-left: 2rem;
        margin-bottom: -16px;
    }

    .wrapper-input {
        border: 1px solid #b5c9d5;
        height: 30px;
        display: flex;
        align-items: center;
    }

    .search {
        color: #b5c9d5;
        margin-right: 5px;
    }

    .loading-cont {
        position: relative;
        width: 150px;
        height: 30px;
        display: flex;
        align-items: center;
    }

    .container-select {
        height: 32px;
    }

    .input {
        padding: 0px 8px;
        height: 25px;
        box-sizing: border-box;
        border: none;
        background: none;
        outline: none;
    }
</style>