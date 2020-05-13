<template>
    <div class="card-page booking-list" >
        <bread-crumbs :items="breadcrumbs" />
        <h1>Booking</h1>
        <div class="content">
            <div class="search-create-block">
                <div class="search-input-container">
                    <input
                            class="search-input"
                            placeholder="Search"
                            @input="onQuery" v-model="productId"
                    />
                    <svg-icon class="search-icon" name="search"></svg-icon>
                </div>
                <datepicker v-model="dateFrom" @selected="setStartDate"></datepicker>
                <datepicker v-model="dateTo" class="right-vdp" @selected="setEndDate"></datepicker>
                <!--<input @input="onQueryTravelDate" v-model="travelDate" class="dates-input" placeholder="Travel Dates"/>-->
            </div>
            <div class="clear-filter-row">
                <div @click.stop="clearFilters" class="clear-filters-button">Clear Filters</div>
            </div>
            <!--<div class="sort-by-block">-->
                <!--<span>Sort by:</span>-->
                <!--<button @click='sortByBookingsFirst' :class="this.isActiveFirst ? 'button-passive button-active':'button-passive'">New bookings first</button>-->
                <!--<button @click='sortByTravelDate' :class="this.isActiveSecond ? 'button-active button-passive' : 'button-passive'">Travel Date</button>-->
                <!--<button @click='sortByDateSubmitted' :class="this.isActiveThird ? 'button-active button-passive' : 'button-passive'">Date Submitted</button>-->
            <!--</div>-->

            <div v-for="(data,index) in filterBookings" class="booking-information-block">
                <div :class="data.status==='Cancelled' ? 'lineCancelled' : 'line'"></div>
                <div class="booking-information-content">
                    <div class="first-block">
                        <span class="block-header">Travel Date:</span>
                        <span class="travel-date">{{ formatDate(data.trip_time)  }}</span>
                        <span class="block-header">Status:</span>
                        <button :class="'button-' + data.confirmationStatusName" @click="makePending">{{data.confirmationStatusName}}</button>
                        <div class="bookingHistory">
                            <base-modal :active="bookingHistoryModelActive" v-on:close="closeModalbookingHistory" maxWidth="600px">
                                <div class="bookingHistoryModalContainer">
                                    <div >
                                        <p class="modalHeader">Booking History</p>
                                    </div>
                                    <div class="modalContent">
                                        <div class="table">
                                            <div class="thead">
                                                <span>Date / Time</span>
                                                <span>Status</span>
                                                <span>Author</span>
                                                <span>Notes</span>
                                            </div>
                                            <div class="tbody">
                                                <span>Oct 9, 2019 2:41 PM</span>
                                                <span><button class="buttonConfirmed" @click="makePending">Confirmed</button></span>
                                                <span>sasas</span>
                                                <span></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="modalFooter">
                                        <button @click="closeModalbookingHistory" class="modal-booking-history-button">Close</button>
                                    </div>
                                </div>
                            </base-modal>
                        </div>
                        <span class="block-header">Product Code:</span>
                        <span class="product-code">{{ data.code }}</span>
                    </div>
                    <div class="second-block">
                        <span class="block-header">{{ data.bookingTravelers.length ? 'Multiple Travellers':'Single Traveler' }} {{ getTime(data.time) }}</span>
                        <span class="span-first-2">{{ data.product_state.name }}</span>
                        <span class="span-second-2">Lead Traveler: {{ getLeadTravelerName(data) }}</span>
                        <span class="span-second-2">{{ getTravelerGroups(data) }}</span>
                        <div v-if="isOpenIndex !== index " @click='showMainDetails(index)'>
                            <span class="showDetailed">Show detailed info <svg-icon name="arrow_bottom"></svg-icon></span>
                            <div class="dotted-border"></div>
                        </div>
                        <div v-if="isOpenIndex === index"  class="detailed-info">
                            <div class="detailed-info-dotted" >
                                <span  @click='hideMainDetails(index)' class="hideDetailed">Hide detailed info <svg-icon name="arrow_bottom"></svg-icon></span>
                                <div class="dotted-border"></div>
                            </div>
                            <span class="main-text"><svg-icon name="UXPinIcon"></svg-icon> Instant Confirmation</span>
                            <p class="detailed-information-header">Customer phone number:<span class="main-text">{{ getLeadPhone(data) }}</span></p>
                            <div class="detailed-information-content">
                                <div class="first-block-detailed">
                                    <span v-if="data.product_state.bookingNeededInformationFromTraveler.is_full_name_needed" class="detailed-information-header">Travelers names:</span>
                                    <span v-if="data.product_state.bookingNeededInformationFromTraveler.is_full_name_needed" v-for="tr in data.bookingTravelers" class="main-text">{{ tr.first_name + ' ' + tr.last_name }}</span>
                                    <span class="detailed-information-header">Inclusions:</span>
                                    <ul class="main-text">
                                        <li v-for="incl in data.product_state.whatsIncludedCategoriesList">{{ incl.name }}</li>
                                    </ul>
                                </div>
                                <div class="second-block-detailed">
                                    <span v-if="data.arrival_flight_details" class="detailed-information-header">Arrival Flight Details:</span>
                                    <span v-if="data.arrival_flight_details" class="main-text">{{ data.arrival_flight_details }}</span>
                                    <span v-if="data.arrival_ship_details" class="detailed-information-header">Arrival Ship Details:</span>
                                    <span v-if="data.arrival_ship_details" class="main-text">{{ data.arrival_ship_details }}</span>
                                    <span v-if="data.arrival_train_details" class="detailed-information-header">Arrival Train Details:</span>
                                    <span v-if="data.arrival_train_details" class="main-text">{{ data.arrival_train_details }}</span>
                                    <span v-if="data.departure_flight_details" class="detailed-information-header">Departure Flight Details:</span>
                                    <span v-if="data.departure_flight_details" class="main-text">{{ data.departure_flight_details }}</span>
                                    <span v-if="data.departure_ship_details" class="detailed-information-header">Departure Ship Details:</span>
                                    <span v-if="data.departure_ship_details" class="main-text">{{ data.departure_ship_details }}</span>
                                    <span v-if="data.departure_train_details" class="detailed-information-header">Departure Train Details:</span>
                                    <span v-if="data.departure_train_details" class="main-text">{{ data.departure_train_details }}</span>

                                    <span class="detailed-information-header">Starting location:</span>
                                    <span class="main-text">{{ data.product_state.productPickUpDropOff.pickUpPoints[0].place_name }}</span>
                                    <p class="detailed-information-header">Net price: <span class="main-text">{{ data.payment.currency }} {{ parseFloat(data.payment.amount).toFixed(2) }}</span></p>
                                    <!--<span class="text-with-dot">Booking history</span>-->
                                    <!--<div class="dotted-border-details"></div>-->
                                    <span v-if="data.product_state.ticket.vaucher_filename" @click="printTicket(data)" class="text-with-dot">Print ticket</span>
                                    <div v-if="data.product_state.ticket.vaucher_filename" class="dotted-border-details min-width-line"></div>
                                </div>
                            </div>
                        </div>
                        <div v-if="data.confirmationTypeName != 'MANUAL'" class="buttons-container">
                            <button @click="confirmBooking(data.id)" v-if="data.confirmationStatusName == 'pending'" class="button-acknowledge">Confirm</button>
                            <button @click="openCancelModal(data)" v-if="data.confirmationStatusName == 'confirmed'" class="button-acknowledge">Decline</button>
                            <button v-if="data.confirmationStatusName == 'pending'" @click="openCancelModal(data)" class="button-cancel">Decline</button>
                        </div>
                    </div>
                    <div class="third-block">
                        <span class="submited-info">Submitted {{ getDateCreated(data.created_at) }}</span>
                        <!--<span class="message-chat" ><svg-icon name="chat"></svg-icon>Message traveler</span>-->
                    </div>
                </div>
            </div>

            <base-modal :active="cancelModelActive" v-on:close="closeModalCancel" maxWidth="526px">
                <div class="cancelModalContainer">
                    <div >
                        <p class="modalHeader">Decline booking</p>
                    </div>
                    <div class="modalContent">
                        <p class="confirm-text">Are you sure you want to decline this?</p>
                        <span class="content-header">Travel Date:</span>
                        <span class="content-data">{{ cancelModalTime }}</span>
                        <span class="content-header">{{ cancelModalIsSingle }} {{ cancelModalTimeStart }}</span>
                        <span class="content-data">{{ cancelModalName }}</span>
                    </div>
                    <div class="modalFooter">
                        <button @click="closeModalCancel()" class="modal-cancel-button">Cancel</button>
                        <button @click="confirmCancelBooking(cancelModalId)" class="modal-conform-button">Confirm</button>
                    </div>
                </div>
            </base-modal>

            <!--<div v-for="(data,index) in testData" class="booking-information-block">-->
                <!--<div :class="data.status==='Cancelled' ? 'lineCancelled' : 'line'"></div>-->
                <!--<div class="booking-information-content">-->
                    <!--<div class="first-block">-->
                        <!--<span class="block-header">Travel Date:</span>-->
                        <!--<span class="travel-date">Wed,Oct 9,2019</span>-->
                        <!--<span class="block-header">Status:</span>-->
                        <!--<button :class="'button' +data.status" @click="makePending">{{data.status}}</button>-->
                        <!--<div class="bookingHistory">-->
                            <!--<base-modal :active="bookingHistoryModelActive" v-on:close="closeModalbookingHistory" maxWidth="600px">-->
                                <!--<div class="bookingHistoryModalContainer">-->
                                    <!--<div >-->
                                        <!--<p class="modalHeader">Booking History</p>-->
                                    <!--</div>-->
                                    <!--<div class="modalContent">-->
                                        <!--<div class="table">-->
                                            <!--<div class="thead">-->
                                                <!--<span>Date / Time</span>-->
                                                <!--<span>Status</span>-->
                                                <!--<span>Author</span>-->
                                                <!--<span>Notes</span>-->
                                            <!--</div>-->
                                            <!--<div class="tbody">-->
                                                <!--<span>Oct 9, 2019 2:41 PM</span>-->
                                                <!--<span><button class="buttonConfirmed" @click="makePending">Confirmed</button></span>-->
                                                <!--<span>sasas</span>-->
                                                <!--<span></span>-->
                                            <!--</div>-->
                                        <!--</div>-->
                                    <!--</div>-->
                                    <!--<div class="modalFooter">-->
                                        <!--<button @click="closeModalbookingHistory" class="modal-booking-history-button">Close</button>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</base-modal>-->
                        <!--</div>-->
                        <!--<span class="block-header">Product Code:</span>-->
                        <!--<span class="product-code">989895</span>-->
                    <!--</div>-->
                    <!--<div :class="isOpenIndex === index ? 'second-block second-block-posision-change' : 'second-block ' ">-->
                        <!--<span class="block-header">Single Traveler 06:40</span>-->
                        <!--<span class="span-first-2">Perta 2-day Tour from Tel-Aviv</span>-->
                        <!--<span class="span-second-2">Lead Traveler: Calor Marcus</span>-->
                        <!--<span class="span-second-2">1 adult</span>-->
                        <!--<div v-if="isOpenIndex !== index " @click='showMainDetails(index)'>-->
                            <!--<span class="showDetailed">Show detailed info <svg-icon name="arrow_bottom"></svg-icon></span>-->
                            <!--<div class="dotted-border"></div>-->
                        <!--</div>-->
                        <!--<div v-if="isOpenIndex === index"  class="detailed-info">-->
                            <!--<div class="detailed-info-dotted" >-->
                                <!--<span  @click='hideMainDetails(index)' class="hideDetailed">Hide detailed info <svg-icon name="arrow_bottom"></svg-icon></span>-->
                                <!--<div class="dotted-border"></div>-->
                            <!--</div>-->
                            <!--<span class="main-text"><svg-icon name="UXPinIcon"></svg-icon> Instant Confirmation</span>-->
                            <!--<p class="detailed-information-header">Customer phone number:<span class="main-text">+1828-772-0843</span></p>-->
                            <!--<div class="detailed-information-content">-->
                                <!--<div class="first-block-detailed">-->
                                    <!--<span class="detailed-information-header">Travelers names:</span>-->
                                    <!--<span class="main-text">Richald Ross</span>-->
                                    <!--<span class="main-text">Richald Ross</span>-->
                                    <!--<span class="detailed-information-header">Inclusions:</span>-->
                                    <!--<ul class="main-text">-->
                                        <!--<li>Pick up and drop off from hotel</li>-->
                                        <!--<li>Entrance fees</li>-->
                                        <!--<li>English speaking guide</li>-->
                                        <!--<li>Group tour</li>-->
                                        <!--<li>Entry/Admission - Masada National Park</li>-->

                                    <!--</ul>-->
                                <!--</div>-->
                                <!--<div class="second-block-detailed">-->
                                    <!--<span class="detailed-information-header">Hotel Pickup:</span>-->
                                    <!--<span class="main-text">Inbal Jerusalem Hotel - Zeev Jabotinsky St 3</span>-->
                                    <!--<span class="detailed-information-header">Starting location:</span>-->
                                    <!--<span class="main-text">Jerusalem, Israel</span>-->
                                    <!--<p class="detailed-information-header">Net price: <span class="main-text">USD 190.50</span></p>-->
                                    <!--<span class="text-with-dot">Booking history</span>-->
                                    <!--<div class="dotted-border-details"></div>-->
                                    <!--<span class="text-with-dot">Print ticket</span>-->
                                    <!--<div class="dotted-border-details min-width-line"></div>-->
                                <!--</div>-->
                            <!--</div>-->
                        <!--</div>-->
                        <!--<div class="buttons-container">-->
                            <!--<button v-if="data.status==='Pending'||data.status==='Standard'" class="button-acknowledge">Acknowledge</button>-->
                            <!--<button @click="openCancelModal" class="button-cancel">Cancel</button>-->
                            <!--<base-modal :active="cancelModelActive" v-on:close="closeModalCancel" maxWidth="526px">-->
                                <!--<div class="cancelModalContainer">-->
                                    <!--<div >-->
                                        <!--<p class="modalHeader">Cancel booking</p>-->
                                    <!--</div>-->
                                    <!--<div class="modalContent">-->
                                        <!--<p class="confirm-text">Are you sure you want to cancel this?</p>-->
                                        <!--<span class="content-header">Travel Date:</span>-->
                                        <!--<span class="content-data">Wed, Oct 9, 2019</span>-->
                                        <!--<span class="content-header">Single traveller 06:40</span>-->
                                        <!--<span class="content-data">Petra 2-Day Tour from Tel-Aviv</span>-->
                                    <!--</div>-->
                                    <!--<div class="modalFooter">-->
                                        <!--<button @click="closeModalCancel" class="modal-cancel-button">Cancel</button>-->
                                        <!--<button class="modal-conform-button">Confirm</button>-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</base-modal>-->
                        <!--</div>-->
                    <!--</div>-->
                    <!--<div class="third-block">-->
                        <!--<span class="submited-info">Submitted jul 22,2019</span>-->
                        <!--<span class="message-chat" ><svg-icon name="chat"></svg-icon>Message traveler</span>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->



            <div class="pagination-cont">
                <pagination-table :meta="bookingsMeta" @paginate="paginate" />
            </div>
        </div>
    </div>
</template>
<script>
    import SvgIcon from "../../../node_modules/vue-cli-plugin-svg-sprite/template/src/components/SvgIcon";
    import BaseModal from '@/components/UILibrary/Modals/BaseModal'
    import { mapActions, mapState } from 'vuex'
    import PaginationTable from '@/components/UILibrary/PaginationTable'
    import moment from 'moment';
    import Datepicker from 'vuejs-datepicker';

    export default{
        components: {BaseModal, PaginationTable, Datepicker},
        data: () => ({
            breadcrumbs: [
                {pathname: "dashboard", title: 'Home'},
                {pathname: "tour-index", title: 'Booking'}
            ],
            isActiveFirst:0,
            isActiveSecond:0,
            isActiveThird:0,
            showDetails:false,
            activePage: 1,
            meta: {
                type: Object,
                required: true
            },
            testData:[
                {status:'Pending'},
                {status:'Standard'},
                {status:'Confirmed'},
                {status:'Cancelled'}
            ],
            isOpenIndex:-1,
            cancelModelActive:false,
            bookingHistoryModelActive:false,
            cancelModalName: null,
            cancelModalTime: null,
            cancelModalId: null,
            cancelModalTimeStart: null,
            cancelModalIsSingle: null,

            queryParams: {},
            query: '',
            travelDate: '',
            productId: '',
            dateFrom: null,
            dateTo: null
        }),
        computed: {

            pageCount() {

                return 6
//                return Number(this.meta['x-pagination-page-count']) || 0
            },
            currentPage() {
                return Number(this.meta['x-pagination-current-page']) || 1
            },
            totalCount() {
                return Number(this.meta['x-pagination-total-count']) || 0
            },
            ...mapState('bookings', [ 'bookings','filterBookings', 'bookingsMeta']),
        },
        watch: {
            currentPage(val) {
                this.activePage = val;
                this.paginate()
            }
        },
        methods: {
            ...mapActions('bookings', ['fetchBookings','fetchConfirmBooking','fetchDeclineBooking','getFilterBookings']),
            sortByBookingsFirst(){
                this.isActiveFirst=1
                this.isActiveSecond=0
                this.isActiveThird=0

                this.queryParams.sort = 'created_at'
                this.get()
            },
            sortByTravelDate(){
                this.isActiveFirst=0
                this.isActiveSecond=1
                this.isActiveThird=0

                this.queryParams.sort = '-date'
                this.get()
            },
            sortByDateSubmitted(){
                this.isActiveFirst=0
                this.isActiveSecond=0
                this.isActiveThird=1

                this.queryParams.sort = 'created_at'
                this.get()
            },
            showMainDetails(index){
                this.isOpenIndex=index
            },
            hideMainDetails(){
                this.isOpenIndex=-1
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
//
//            paginate() {
//                this.$emit('paginate', { page: this.activePage })
//            },
            makePending() {
//                this.bookingHistoryModelActive=true
            },
            openCancelModal(data){
                this.cancelModalName = data.product_state.name;
                this.cancelModalTime = moment.unix(data.trip_time).format('MMMM DD, YYYY');
                this.cancelModalId = data.id;
                this.cancelModalTimeStart = this.getTime(data.time);
                this.cancelModalIsSingle = data.bookingTravelers.length ? 'Multiple Travellers': 'Single Traveler';
                this.cancelModelActive = true
            },
            confirmCancelBooking(id) {
                this.fetchDeclineBooking(id);
                this.cancelModelActive = false;
            },
            closeModalCancel(){
                this.cancelModelActive=false
            },
            closeModalbookingHistory(){
                this.bookingHistoryModelActive=false
            },

            formatDate(val){
                return moment.unix(val).format('MMMM DD, YYYY')
            },
            getTime(mins){
                const hours = String(Math.floor(mins/60)).length > 1 ? String(Math.floor(mins/60)) : '0' + String(Math.floor(mins/60))
                const minutes = String(mins % 60).length > 1 ? String(mins % 60) : '0' + String(mins % 60)


                let yourTimeValue = hours + ':' + minutes;

                return yourTimeValue
            },
            getLeadTravelerName(item){
                const index = item.bookingTravelers.findIndex(x => x.is_lead_traveler === 1)
                const name = index != -1 ? item.bookingTravelers[index].first_name + ' ' + item.bookingTravelers[index].last_name : '';
                return name
            },
            getLeadPhone(item){
                const index = item.bookingTravelers.findIndex(x => x.is_lead_traveler === 1)
                const name = index != -1 ? item.bookingTravelers[index].fullPhone : '';
                return name
            },
            getTravelerGroups(item){
                let string = '';
                item.bookingPriceItems.forEach(function (element, index) {
                    if(element.quantity > 0){
                        let strToAdd = element.age_group_name + ' ' + element.quantity + ', ';
                        string += strToAdd;
                    }
                });
                if(string.length > 0){
                    string = string.substring(0, string.length - 2);
                }
                return string;
            },
            getDateCreated(val){
                return moment(String(val)).format('MMMM DD, YYYY')
            },
            confirmBooking(id){
                this.fetchConfirmBooking(id)
            },
            declineBooking(id){
                this.fetchDeclineBooking(id)
            },
            get(){
                this.getFilterBookings(this.queryParams)
            },
            onQuery() {
                this.queryParams.productId = this.productId
                this.get()
            },
            onQueryTravelDate() {
                this.queryParams.travelDate = this.travelDate
                this.get()
            },
            setStartDate(e){
                this.queryParams.travelDateFrom = moment(e).format('YYYY-MM-DD');
                this.get()
            },
            setEndDate(e){
                this.queryParams.travelDateTo = moment(e).format('YYYY-MM-DD');
                this.get()
            },
            clearFilters(){
                this.queryParams.travelDateTo = null;
                this.queryParams.travelDateFrom = null;
                this.queryParams.productId = null;
                this.productId = null;
                this.dateFrom = null;
                this.dateTo = null;
                this.get()
            },
            printTicket(data){
                window.open('https://' + window.location.hostname + data.product_state.ticket.vaucher_filename, '_blank');
            }
        },
        created(){
            this.fetchBookings();
        },
        mounted() {
            this.queryParams.perPage = 'All'
            this.get()
        },
    }
</script>