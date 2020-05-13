<template>
    <div class="card-page tours promotions-list">
        <bread-crumbs :items="breadcrumbs" />
        <h1>Promotions</h1>
        <div class="content">
            <base-modal class="create-promotion-modal" :active="createModalActive" v-on:close="closeCreateModal" maxWidth="663px">
                <div class="title">{{ id ? 'Edit' : 'Create new' }} promotion</div>
                <div class="tour-search-block">
                    <label>Tours</label>
                    <search-select :coreArray="toursCore" width="550px" maxWidth="550px" isPhone @selected-option="setTour" class="tour-search-select" :options="tours" :default-option="product_id" placeholder="Type tour name or product code" />
                </div>
                <div class="datepickers-block">
                    <div class="datepicker-item">
                        <label>Promo date from</label>
                        <datepicker v-model="departure_from" @selected="setStartDate"></datepicker>
                    </div>
                    <div class="datepicker-item datepicker-item-second">
                        <label>Promo date to</label>
                        <datepicker v-model="departure_to" class="right-vdp" @selected="setEndDate"></datepicker>
                    </div>
                </div>
                <div class="datepickers-block">
                    <div class="datepicker-item">
                        <label>Promo valid from</label>
                        <datepicker v-model="valid_from" @selected="setStartValidDate"></datepicker>
                    </div>
                    <div class="datepicker-item datepicker-item-second">
                        <label>Promo valid to</label>
                        <datepicker v-model="valid_to" class="right-vdp" @selected="setEndValidDate"></datepicker>
                    </div>
                </div>
                <div class="amount-type-block">
                    <base-input isNumber v-model="value" :maxValue="value_type == 2 && productPrice ? productPrice : 100" inputWidth="239px" class="amount-input" label="Discount amount"></base-input>
                    <div class="radio-buttons-list">
                        <label class="main-label">Discount Type</label>
                        <div v-for="(type,index) in promoTypes" class="radio-button-element">
                            <input v-bind:key="index" :id="index" :value="index" v-model="value_type" type="radio">
                            <label :for="index">{{ type == 'PER_CENT' ? 'Percent' : 'Absolute' }}</label>
                        </div>
                    </div>
                </div>


                <div class="buttons">
                    <base-button type="light" @click.native="createModalActive = false">Cancel</base-button>
                    <base-button class="save-button" @click.native="submitPromo">Save</base-button>
                </div>
            </base-modal>
            <div class="search-create-block">
                <base-input v-model="query" @input-change="onQuery" width="210px" max-width="210px" inputWidth="210px" search></base-input>
                <button
                        @click.stop="openPromotionModal"
                        class="button dark long"
                        type="button">
                    Create a product
                </button>
            </div>
            <div class="items">
                <div v-for="item in filterPromos" class="item">
                    <div class="avatar-block">
                        <div class="circle">
                            <div class="number-block">{{ item.valueTypeName == 'PER_CENT' ? item.value + '%' : item.value + '$' }}</div>
                        </div>
                    </div>
                    <div class="info-block">
                        <div class="title">
                            <!--<svg-icon name="warning"></svg-icon>-->
                            {{ item.product.name }}
                        </div>
                        <div class="code">Product code: {{ item.product.id }}</div>
                        <div class="date-block">{{ convertDate(item.valid_from_time) }} - {{ convertDate(item.valid_to_time) }}</div>
                        <div class="checkbox-block">
                            <div class="writing">Active:</div>
                            <div class="checkbox-item">
                                <base-checkbox></base-checkbox>
                            </div>
                        </div>
                    </div>
                    <div class="icons-block">
                        <div @click="editPromotion(item)" class="edit">
                            <svg-icon name="pencil"></svg-icon>
                        </div>
                        <div @click="deletePromotion(item.id)" class="delete">
                            <svg-icon name="trash"></svg-icon>
                        </div>
                    </div>
                </div>
            </div>
            <div class="pagination-cont">
                <pagination-table :meta="promosMeta" @paginate="paginate" />
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions, mapState } from 'vuex'
    import SvgIcon from "../../../node_modules/vue-cli-plugin-svg-sprite/template/src/components/SvgIcon";
    import moment from 'moment';
    import BaseModal from '@/components/UILibrary/Modals/BaseModal'
    import Datepicker from 'vuejs-datepicker';
    import SearchSelect from '@/components/UILibrary/Selects/BasicSelectNew'
    import PaginationTable from '@/components/UILibrary/PaginationTable'

    export default {
        components: { SvgIcon, BaseModal, Datepicker, SearchSelect, PaginationTable },
        data: () => ({
            breadcrumbs: [
                { pathname: "dashboard", title: 'Home' },
                { pathname: "promotion-index", title: 'Promotions' }
            ],
            query: '',
            queryParams: {},
            createModalActive: false,

            id: null,
            product_id: null,
            departure_from: null,
            departure_to: null,
            valid_from: null,
            valid_to: null,
            value_type: null,
            value: null,

            productPrice: 0
        }),
        computed: {
            ...mapState('promos', [ 'filterPromos','promoTypes','promoTypesCore','tours','toursCore','promosMeta'])
        },
        watch: {
            currentPage(val) {
                this.activePage = val;
                this.paginate()
            },
            value(val){
                if(this.value_type == 1 && val > 100){
                    this.notifyPromos('Value cannot be greater than 100.');
                }
                if(this.value_type == 2 && val > this.productPrice){
                    this.notifyPromos('Value cannot be greater than '+ this.productPrice +'.');
                }
            }
        },
        methods: {
            ...mapActions('promos', ['getFilterPromos','getPromoTypes','getTours','createPromo','updatePromo','deletePromo','notifyPromos']),
            onQuery(){
                this.queryParams.query = this.query
                this.get()
            },
            get(){
                this.getFilterPromos(this.queryParams);
            },
            convertDate(unixDate){
                return moment.unix(unixDate).format('MMMM DD, YYYY');
            },
            closeCreateModal(){
                this.createModalActive = false;
            },
            openPromotionModal(){
                this.id = null;
                this.product_id = null;
                this.departure_from = null;
                this.departure_to = null;
                this.valid_from = null;
                this.valid_to = null;
                this.value_type = null;
                this.value = null;

                this.createModalActive = true;
            },
            setStartDate(e){
                this.departure_from = moment(e).format('YYYY-MM-DD');
            },
            setEndDate(e){
                this.departure_to = moment(e).format('YYYY-MM-DD');
            },
            setStartValidDate(e){
                this.valid_from = moment(e).format('YYYY-MM-DD');
            },
            setEndValidDate(e){
                this.valid_to = moment(e).format('YYYY-MM-DD');
            },
            createPromotion(){

            },
            setTour(val){
                this.product_id = val;
                let product = this.toursCore.find(x => x.name == val)
                if(product){
                    this.productPrice = product.minPrice;
                }
            },
            submitPromo(){

                if(this.value_type == 1 && this.value > 100){
                    this.notifyPromos('Value cannot be greater than 100.');
                    return true;
                }
                if(this.value_type == 2 && this.value > this.productPrice){
                    this.notifyPromos('Value cannot be greater than '+ this.productPrice +'.');
                    return true;
                }

                let compContext = this;
                this.toursCore.forEach(element => {
                    if (element.name === this.product_id) {
                        compContext.product_id = element.id
                    }
                })
                let body = {
                    product_id: this.product_id,
                    departure_from: moment(this.departure_from).format('YYYY-MM-DD'),
                    departure_to: moment(this.departure_to).format('YYYY-MM-DD'),
                    valid_from: moment(this.valid_from).format('YYYY-MM-DD'),
                    valid_to: moment(this.valid_to).format('YYYY-MM-DD'),
                    value_type: this.value_type,
                    value: this.value
                }
                if(this.id){
                    body.id = this.id;
                    this.updatePromo(body);
                }else{
                    this.createPromo(body);
                }
                this.createModalActive = false;
            },
            deletePromotion(id){
                this.deletePromo(id)
            },
            editPromotion(item){

                this.id = item.id;
                this.product_id = item.product_id;
                this.departure_from = item.departure_from;
                this.departure_to = item.departure_to;
                this.valid_from = item.valid_from;
                this.valid_to = item.valid_to;
                this.value_type = item.value_type;
                this.value = item.value;
                this.createModalActive = item.createModalActive;

                this.productPrice = item.product.minPrice;

                let compContext = this;

                this.toursCore.forEach(element => {
                    if (element.id == compContext.product_id) {
                        compContext.product_id = element.name
                    }
                })

                this.createModalActive = true;
            },
            paginate(payload) {
                this.queryParams = { ...this.queryParams, ...payload }
                this.get()
            },
            go(page) {
                this.activePage = page;
                this.paginate()
            },

            next() {
                if (this.activePage + 1 <= this.pageCount) this.activePage = this.activePage + 1
                this.paginate()
            },

            prev() {
                if (this.activePage > 1) this.activePage = this.activePage - 1
                this.paginate()
            },
        },
        mounted(){
            this.get();
            this.getPromoTypes();
            this.getTours();
        }
    }
</script>
