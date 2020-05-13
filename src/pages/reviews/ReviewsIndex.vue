<template>
    <div class="card-page reviews-list" >
        <bread-crumbs :items="breadcrumbs" />
        <div class="body-container">
            <h1>Manage reviews</h1>
            <div class="content">
                <div class="search-select-block">
                    <div v-if="!hideSelects" class="select-block">
                        <base-select @selected-option="selectRating" placeholder="Select rating" width="54px" inputWidth="54px" :options="ratings" />
                    </div>
                    <div v-if="!hideSelects" class="select-block">
                        <base-select custom
                                     itemName="name"
                                     valueName="id"
                                     placeholder="Select tour"
                                     width="154px"
                                     inputWidth="154px"
                                     :options="reviewTours"
                                     @selected-option="selectTour"
                        />
                    </div>
                    <datepicker v-model="dateFrom" @selected="setStartDate"></datepicker>
                    <datepicker v-model="dateTo" class="right-vdp" @selected="setEndDate"></datepicker>
                </div>
                <div class="sort-by-block">
                    <span>Sort by:</span>
                    <button @click='sortByNewFirst' :class="this.isActiveFirst ? 'button-passive button-active':'button-passive'">New reviews first</button>
                    <button @click='sortFromHighToLow' :class="this.isActiveSecond ? 'button-active button-passive' : 'button-passive'">Rating from high to low</button>
                    <button @click='sortFromLowToHigh' :class="this.isActiveThird ? 'button-active button-passive' : 'button-passive'">Rating from low to high</button>
                </div>
                <div class="clear-filter-row">
                    <div @click.stop="clearFilters" class="clear-filters-button">Clear Filters</div>
                </div>
                <div class="responses">
                    <div v-for="item in filterReviews" class="response">
                        <div class="user-left-block">
                            <div class="avatar-block">
                                <svg-icon name="review"></svg-icon>
                            </div>
                            <div class="name-block">{{ item.creator.full_name }}</div>
                            <div class="rating-block">
                                <svg-icon name="star-2"></svg-icon>
                                <div class="count-block">{{ item.rating }}</div>
                            </div>
                        </div>
                        <div class="content-right-block">
                            <div class="date">{{ parseDate(item.created_at) }}</div>
                            <div class="right-title">{{ item.product.name }}</div>
                            <div class="review-body-content">
                                <div v-if="item.text.length < 100" class="body-of-review">{{ item.text }}</div>
                                <div v-if="item.text.length > 100" class="body-of-review">{{ showMore && activeShowMoreId == item.id ? item.text : getFirstSymbols(item.text) }}</div>
                                <div v-if="item.text.length > 100" @click="showMoreToggle(item.id)" class="show-more">
                                    <div class="writing">{{ showMore && activeShowMoreId == item.id ? 'Hide' : 'Show More' }}</div>
                                    <svg-icon :class="{'rotated': showMore && activeShowMoreId == item.id }" name="arrow_bottom"></svg-icon>
                                </div>
                                <div v-if="!item.responseToReview && !(showTextArea && activeId == item.id)" class="respond-button-block">
                                    <div @click="showRespondInput(item.id)" class="button-respond">Respond</div>
                                </div>
                                <div v-if="showTextArea && activeId == item.id" class="reposponse-textarea-block">
                                    <div class="head-title">Response</div>
                                    <textarea v-model="addResponseText" class="respond-block-textarea"></textarea>
                                    <div class="buttons-block">
                                        <div @click="saveRespondInput(item.id)" class="done-button">Done</div>
                                        <div @click="hideRespondInput" class="cancel-button">Cancel</div>
                                    </div>
                                </div>
                                <div v-if="item.responseToReview && !(showTextArea && activeId == item.id)" class="written-block-review">
                                    <div class="title">Response</div>
                                    <div class="main-content">
                                        <div class="main-content-user">
                                            <svg-icon name="review"></svg-icon>
                                        </div>
                                        <div class="main-content-right">
                                            <div @click="editResponseInput(item.responseToReview.text, item.id)" class="update-block">
                                                <svg-icon name="pencil"></svg-icon>
                                            </div>

                                            <div class="main-content-title-block">
                                                <div class="main-content-name"> {{ item.responseToReview.creator.full_name }}</div>
                                                <div class="main-content-date">{{ parseDate(item.responseToReview.created_at) }}</div>
                                            </div>
                                            <div class="main-content-body-text">
                                                {{ item.responseToReview.text }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="message-administrator">
                                <div class="messaging-block">
                                    <svg-icon name="alarm"></svg-icon>
                                    <div class="writing">Message administrator</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="pagination-cont">
                    <pagination-table :meta="reviewsMeta" @paginate="paginate" />
                </div>
            </div>


            <div v-if="currentTour" class="statistics-block">
                <div v-if="currentTour.reviewsCount > 0">
                    <div class="title">Statistic</div>
                    <div class="statistic-rating-row">
                        <div class="rating-block">
                            <svg-icon name="star-2"></svg-icon>
                            <div class="count-block">{{ currentTour.rating }}</div>
                        </div>
                        <div class="reviews-block">
                            <div class="reviews-count">{{ currentTour.reviewsCount }} reviews</div>
                        </div>
                    </div>
                    <div v-if="currentTour.ratingStats" class="statistics-rows">
                        <div class="statistic-row">
                            <div class="row-title">Excellent</div>
                            <div class="progress-block">
                                <div :style="'width:' + calculateWidth(currentTour.ratingStats[0].reviewsCount, currentTour.reviewsCount)" class="active-progress"></div>
                            </div>
                            <div class="percents">{{ calculatePercents(currentTour.ratingStats[0].reviewsCount, currentTour.reviewsCount) }} %</div>
                        </div>
                        <div class="statistic-row">
                            <div class="row-title row-title-blank">Good</div>
                            <div class="progress-block">
                                <div :style="'width:' + calculateWidth(currentTour.ratingStats[1].reviewsCount, currentTour.reviewsCount)" class="active-progress"></div>
                            </div>
                            <div class="percents percents-blank">{{ calculatePercents(currentTour.ratingStats[1].reviewsCount, currentTour.reviewsCount) }} %</div>
                        </div>
                        <div class="statistic-row">
                            <div class="row-title row-title-blank">Average</div>
                            <div class="progress-block">
                                <div :style="'width:' + calculateWidth(currentTour.ratingStats[2].reviewsCount, currentTour.reviewsCount)" class="active-progress"></div>
                            </div>
                            <div class="percents percents-blank">{{ calculatePercents(currentTour.ratingStats[2].reviewsCount, currentTour.reviewsCount) }} %</div>
                        </div>
                        <div class="statistic-row">
                            <div class="row-title row-title-blank">Rather Poor</div>
                            <div class="progress-block">
                                <div :style="'width:' + calculateWidth(currentTour.ratingStats[3].reviewsCount, currentTour.reviewsCount)" class="active-progress"></div>
                            </div>
                            <div class="percents percents-blank">{{ calculatePercents(currentTour.ratingStats[3].reviewsCount, currentTour.reviewsCount) }} %</div>
                        </div>
                        <div class="statistic-row">
                            <div class="row-title">Bad</div>
                            <div class="progress-block">
                                <div :style="'width:' + calculateWidth(currentTour.ratingStats[4].reviewsCount, currentTour.reviewsCount)" class="active-progress"></div>
                            </div>
                            <div class="percents">{{ calculatePercents(currentTour.ratingStats[4].reviewsCount, currentTour.reviewsCount) }} %</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>
<script>
import SvgIcon from "../../../node_modules/vue-cli-plugin-svg-sprite/template/src/components/SvgIcon";
import moment from 'moment';
import PaginationTable from '@/components/UILibrary/PaginationTable'
import Datepicker from 'vuejs-datepicker';
import { mapActions, mapState } from 'vuex'
export default{
    components: { SvgIcon, PaginationTable, Datepicker },
    data: () => ({
        breadcrumbs: [
            {pathname: "dashboard", title: 'Home'},
            {pathname: "review-index", title: 'Reviews'}
        ],
        ratings: [
            'All',
            '1',
            '2',
            '3',
            '4',
            '5'
        ],
        reviewTypes: [
            'review1',
            'review2'
        ],
        isActiveFirst: false,
        isActiveSecond: false,
        isActiveThird: false,
        showTextArea: false,
        addResponseText: '',
        editResponseText: '',
        showMore: false,
        activePage: 1,
        queryParams: {},
        activeId: null,
        activeShowMoreId: null,

        dateFrom: null,
        dateTo: null,
        currentTour: {},
        hideSelects: false,
        rating: null
    }),
    watch: {
        currentPage(val) {
            this.activePage = val;
            this.paginate()
        }
    },
    methods: {
        ...mapActions('reviews', ['getFilterReviews', 'fetchCreateTestReview','respondToReview']),
        ...mapActions('tours', ['getReviewTours']),
        sortByNewFirst(){
            this.isActiveFirst = !this.isActiveFirst;
            this.isActiveSecond = false;
            this.isActiveThird = false;

            this.queryParams.sort = '-created_at';
            this.get()
        },
        sortFromHighToLow(){
            this.isActiveSecond = !this.isActiveSecond;
            this.isActiveFirst = false;
            this.isActiveThird = false;

            this.queryParams.sort = '-rating';
            this.get()
        },
        sortFromLowToHigh(){
            this.isActiveThird = !this.isActiveThird;
            this.isActiveFirst = false;
            this.isActiveSecond = false;

            this.queryParams.sort = 'rating';
            this.get()
        },
        showRespondInput(id){
            this.showTextArea = true;
            this.addResponseText = '';
            this.activeId = id;
        },
        editResponseInput(text, id){
            this.showTextArea = true;
            this.addResponseText = text;
            this.activeId = id;
        },
        clearFilters(){
            this.queryParams.dateTo = null;
            this.queryParams.dateFrom = null;
            this.queryParams.productId = null;
            this.queryParams.sort = null;
            this.queryParams.rating = null;
            this.currentTour = {};
            this.dateFrom = null;
            this.dateTo = null;
            this.isActiveThird = false;
            this.isActiveFirst = false;
            this.isActiveSecond = false;
            this.hideSelects = true;
            let compContext = this;
            setTimeout(function(){
                compContext.hideSelects = false;
            }, 100);
            //this.hideSelects = false;
            this.get()
        },
        hideRespondInput(){
            this.showTextArea = false;
        },
        saveRespondInput(id){
            let body = {
                id: id,
                text: this.addResponseText
            }
            this.respondToReview(body)
            this.showTextArea = false;
        },
        parseDate(date){
            return moment(String(date)).format('MMMM DD, YYYY')
        },
        getFirstSymbols(text){
           return text.substring(0,100);
        },
        showMoreToggle(id){
            this.activeShowMoreId = id;
            this.showMore = !this.showMore;
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
        setStartDate(e){
            this.queryParams.dateFrom = moment(e).format('YYYY-MM-DD');
            this.get()
        },
        setEndDate(e){
            this.queryParams.dateTo = moment(e).format('YYYY-MM-DD');
            this.get()
        },
        selectRating(val){
            this.queryParams.rating = val;
            if(val == 'All'){
                this.queryParams.rating = null;
            }
            this.get()
        },
        selectTour(val){
            const ind = this.reviewTours.findIndex(x => x.id == val);
            this.currentTour = this.reviewTours[ind];
            this.queryParams.productId = val;
            console.log(this.currentTour);
            this.get();
        },
        get(){
            this.getFilterReviews(this.queryParams)
        },
        calculatePercents(count, all){
            if(all){
                return parseFloat(count/all * 100).toFixed(0,2)
            }else{
                return 0;
            }
        },
        calculateWidth(count, all){
            if(all){
                return parseFloat(count/all * 100).toFixed(0,2)*1.3 + 'px';
            }else{
                return 0 + 'px';
            }
        }
    },
    computed: {
        ...mapState('reviews', [ 'reviews', 'reviewsMeta', 'filterReviews']),
        ...mapState('tours', [ 'reviewTours']),
    },
    created(){
        this.getFilterReviews();
        this.getReviewTours();
    }
}
</script>