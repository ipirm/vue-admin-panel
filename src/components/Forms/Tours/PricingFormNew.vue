<template>
    <div class="form-container price-schedule-new">
        <base-modal :class="{'wide-modal' : step2}" class="attraction-modal price-schedule-new-mod" :active="priceModal" @close="priceModal = false">
            <div v-if="step1" class="title">When does your schedule start?</div>
            <div v-if="step2" class="title">Define prices</div>
            <div v-if="step1" class="content-modal">
                <div class="radio-buttons-list">
                    <div class="radio-button-item">
                        <input v-model="tour.startType" value="start" type="radio">
                        <div class="title">Start Date</div>
                    </div>
                    <div class="radio-button-item second">
                        <input v-model="tour.startType" value="period" type="radio">
                        <div class="title">Period</div>
                    </div>
                </div>

                <div v-if="tour.startType == 'period'" class="period period-block">
                    <base-select
                            label="When does your schedule start?"
                            width="230px"
                            max-width="230px"
                            inputWidth="230px"
                            class="group-select"
                            :options="periods"
                            @option-selected="setStart"
                    ></base-select>
                    <base-select
                            label="When does your schedule start?"
                            width="230px"
                            max-width="230px"
                            inputWidth="230px"
                            class="group-select"
                            :options="periods"
                            @option-selected="setEnd"
                    ></base-select>
                </div>
                <div v-if="tour.startType == 'start'" class="start period-block">
                    <base-select label="When does your schedule start?" width="230px" max-width="230px" inputWidth="230px" class="group-select" :options="periods"></base-select>
                </div>
            </div>
            <div v-if="step2" class="content-modal define-block-new">
                <div class="main">
                    <div class="child-adult-block">
                        <div class="title-block">
                            <div class="title-item begin">
                                <div class="writing">Pricing groups</div>
                            </div>
                            <div class="title-item first">
                                <div class="writing">Suggested retail price <span><svg-icon name="help"></svg-icon></span></div>
                            </div>
                            <div class="title-item second">
                                <div class="writing">Amount you will get paid <span><svg-icon name="help"></svg-icon></span></div>
                            </div>
                        </div>
                        <div class="items-block">
                            <div v-for="(age,index) in form.prices[0].personPrices" class="item first-item">
                                <div class="title">{{ age.age_group_name }}</div>
                                <div class="input first">
                                    <div class="currency"><div class="piece">{{ tour.currency }}</div></div>
                                    <base-input v-model="form.prices[0].personPrices[index].retail_price" :disabled="form.prices[0].personPrices[index].is_free" placeholder="0.0" inputWidth="50px" class="input-value"></base-input>
                                </div>
                                <div class="input second">
                                    <div class="currency"><div class="piece">{{ tour.currency }}</div></div>
                                    <base-input v-model="form.prices[0].personPrices[index].you_will_get_paid" :disabled="form.prices[0].personPrices[index].is_free" placeholder="0.0" inputWidth="50px" class="input-value"></base-input>
                                </div>
                                <div class="ch-ad-checkbox-block">
                                    <input @change="setFree(index)" v-model="form.prices[0].personPrices[index].is_free" type="checkbox">
                                    <div class="writing">Free Price</div>
                                </div>
                            </div>
                            <!--<div class="item">-->
                                <!--<div class="title">Adult</div>-->
                                <!--<div class="input first">-->
                                    <!--<div class="currency"><div class="piece">{{ tour.currency }}</div></div>-->
                                    <!--<base-input :disabled="tour.freeAdult" placeholder="0.0" inputWidth="50px" class="input-value"></base-input>-->
                                <!--</div>-->
                                <!--<div class="input second">-->
                                    <!--<div class="currency"><div class="piece">{{ tour.currency }}</div></div>-->
                                    <!--<base-input :disabled="tour.freeAdult" placeholder="0.0" inputWidth="50px" class="input-value"></base-input>-->
                                <!--</div>-->
                                <!--<div class="ch-ad-checkbox-block">-->
                                    <!--<input v-model="tour.freeAdult" type="checkbox">-->
                                    <!--<div class="writing">Free Price</div>-->
                                <!--</div>-->
                            <!--</div>-->
                        </div>
                    </div>
                    <div class="days">
                        <label>Select the days these prices apply</label>
                        <div class="selection-block">
                            <input v-model="selectAll" @change="selectAllDays" type="checkbox">
                            <div class="checkbox-writing">Select all</div>
                        </div>
                        <div class="day-items">
                            <div @click="addDayGroup(index)" v-for="(day,index) in days" :class="{'active-chip': form.prices[0].days.indexOf(index) != -1}" class="item">
                                {{ day }}
                            </div>
                        </div>
                    </div>
                    <div class="times">
                        <label>Add the times when these prices apply</label>
                        <div class="description">
                            <span class="highlighted">Note:</span>To enter your pickup time and information, go to Meeting and Pickup.
                        </div>
                        <div class="times-container">
                            <div v-for="(time, index) in form.prices[0].dayTimes" class="item">
                                <base-select withIndex :custIndex="index" @selected-option="setTime" placeholder="Select" width="94px" max-width="94px" inputWidth="94px" class="group-select" :options="times"></base-select>
                                <base-select placeholder="Select" width="63px" max-width="63px" inputWidth="63px" class="group-select second" :options="ams"></base-select>
                                <div @click="deleteTime(index)" class="delete-block">
                                    <svg-icon name="trash"></svg-icon>
                                </div>
                            </div>
                            <div class="add-times-block">
                                <div @click.prevent="addTime" class="add-time">
                                    <svg-icon name="plus" /><label>Add time</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="buttons-block">
                <button
                        @click.prevent="priceModal = false"
                        class="button light"
                        type="button">
                    Cancel
                </button>
                <button
                        v-if="step1"
                        @click.prevent="nextStep"
                        class="button dark save-modal"
                        type="button">
                    Next
                </button>
                <button
                        v-if="step2"
                        @click.prevent="addSchedulePrice"
                        class="button dark save-modal"
                        type="button">
                    Save
                </button>
            </div>
        </base-modal>

        <base-modal class="attraction-modal price-schedule-new-mod" :active="showAddShcheduleModal" @close="showAddShcheduleModal = false">
            <div class="title">When does your schedule start?</div>
            <div class="content-modal">
                <div class="radio-buttons-list">
                    <div class="radio-button-item">
                        <input v-model="tour.startType" value="start" type="radio">
                        <div class="title">Start Date</div>
                    </div>
                    <div class="radio-button-item second">
                        <input v-model="tour.startType" value="period" type="radio">
                        <div class="title">Period</div>
                    </div>
                </div>

                <div v-if="tour.startType == 'period'" class="period period-block">
                    <!--<base-select-->
                            <!--label="When does your schedule start?"-->
                            <!--width="230px"-->
                            <!--max-width="230px"-->
                            <!--inputWidth="230px"-->
                            <!--class="group-select"-->
                            <!--:options="periods"-->
                            <!--:defaultValue="form.start_date"-->
                            <!--@selected-option="setStart"-->
                    <!--&gt;</base-select>-->
                    <label>When does your schedule start?</label>
                    <datepicker @selected="setStartDate" :value="form.start_date"></datepicker>
                    <!--<base-select-->
                            <!--label="When does your schedule start?"-->
                            <!--width="230px"-->
                            <!--max-width="230px"-->
                            <!--inputWidth="230px"-->
                            <!--class="group-select"-->
                            <!--:options="periods"-->
                            <!--:defaultValue="form.end_date"-->
                            <!--@selected-option="setEnd"-->
                    <!--&gt;</base-select>-->
                    <label>When does your schedule end?</label>
                    <datepicker @selected="setEndDate" :value="form.end_date"></datepicker>
                </div>
                <div v-if="tour.startType == 'start'" class="start period-block">
                    <label>When does your schedule start?</label>
                    <datepicker @selected="setStartDate" :value="form.start_date"></datepicker>
                    <!--<base-select :defaultValue="form.start_date" @selected-option="setStart" label="When does your schedule start?" width="230px" max-width="230px" inputWidth="230px" class="group-select" :options="periods"></base-select>-->
                </div>
            </div>

            <div class="buttons-block">
                <button
                        @click.prevent="showAddShcheduleModal = false"
                        class="button light"
                        type="button">
                    Cancel
                </button>
                <button
                        @click.prevent="nextStep"
                        class="button dark save-modal"
                        type="button">
                    Next
                </button>
            </div>
        </base-modal>

        <base-modal class="attraction-modal price-schedule-new-mod wide-modal" :active="showPriceSchedulePersonModal" @close="showPriceSchedulePersonModal = false">
            <div class="title">Define prices</div>
            <div class="content-modal define-block-new">
                <div class="main">
                    <div class="child-adult-block">
                        <div class="title-block">
                            <div class="title-item begin">
                                <div class="writing">Pricing groups</div>
                            </div>
                            <div class="title-item first">
                                <div class="writing">Suggested retail price <span><svg-icon name="help"></svg-icon></span></div>
                            </div>
                            <div class="title-item second">
                                <div class="writing">Amount you will get paid <span><svg-icon name="help"></svg-icon></span></div>
                            </div>
                        </div>
                        <div class="items-block">
                            <div v-for="(age,index) in personPricesForm.personPrices" class="item first-item">
                                <div class="title">{{ age.age_group_name }}</div>
                                <div class="input first">
                                    <div class="currency"><div class="piece">{{ tour.currency }}</div></div>
                                    <base-input :indexSet="index" @input-change="changeRetailPrice(index)" v-model="personPricesForm.personPrices[index].retail_price" :disabled="personPricesForm.personPrices[index].is_free ? true : false" placeholder="0.0" inputWidth="50px" class="input-value"></base-input>
                                </div>
                                <div class="input second">
                                    <div class="currency"><div class="piece">{{ tour.currency }}</div></div>
                                    <input placeholder="0.0" class="input-value short-input-price" disabled v-model="personPricesForm.personPrices[index].you_will_get_paid" >
                                </div>
                                <div class="ch-ad-checkbox-block">
                                    <input @change="setFree(index)" v-model="personPricesForm.personPrices[index].is_free" type="checkbox">
                                    <div class="writing">Free Price</div>
                                </div>
                            </div>
                            <!--<div class="item">-->
                            <!--<div class="title">Adult</div>-->
                            <!--<div class="input first">-->
                            <!--<div class="currency"><div class="piece">{{ tour.currency }}</div></div>-->
                            <!--<base-input :disabled="tour.freeAdult" placeholder="0.0" inputWidth="50px" class="input-value"></base-input>-->
                            <!--</div>-->
                            <!--<div class="input second">-->
                            <!--<div class="currency"><div class="piece">{{ tour.currency }}</div></div>-->
                            <!--<base-input :disabled="tour.freeAdult" placeholder="0.0" inputWidth="50px" class="input-value"></base-input>-->
                            <!--</div>-->
                            <!--<div class="ch-ad-checkbox-block">-->
                            <!--<input v-model="tour.freeAdult" type="checkbox">-->
                            <!--<div class="writing">Free Price</div>-->
                            <!--</div>-->
                            <!--</div>-->
                        </div>
                    </div>
                    <div class="days">
                        <label>Select the days these prices apply</label>
                        <div class="selection-block">
                            <input v-model="selectAll" @change="selectAllDays" type="checkbox">
                            <div class="checkbox-writing">Select all</div>
                        </div>
                        <div class="day-items">
                            <div @click="addDayGroup(index + 1)" v-for="(day,index) in days" :class="{'active-chip': personPricesForm.days.indexOf(index + 1) != -1}" class="item">
                                {{ day }}
                            </div>
                        </div>
                    </div>
                    <div class="times">
                        <label>Add the times when these prices apply</label>
                        <div class="description">
                            <span class="highlighted">Note:</span>To enter your pickup time and information, go to Meeting and Pickup.
                        </div>
                        <div class="times-container">
                            <div v-for="(time, index) in personPricesForm.dayTimes" class="item">
                                <vue-timepicker v-model="personPricesForm.dayTimes[index]" format="HH:mm"></vue-timepicker>
                                <div @click="deleteTime(index)" class="delete-block">
                                    <svg-icon name="trash"></svg-icon>
                                </div>
                            </div>
                            <div class="add-times-block">
                                <div @click.prevent="addTime" class="add-time">
                                    <svg-icon name="plus" /><label>Add time</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="buttons-block">
                <button
                        @click.prevent="showPriceSchedulePersonModal = false"
                        class="button light"
                        type="button">
                    Cancel
                </button>
                <button
                        @click.prevent="addSchedulePrice"
                        class="button dark save-modal"
                        type="button">
                    Save
                </button>
            </div>
        </base-modal>

        <base-modal class="attraction-modal price-schedule-new-mod wide-modal" :active="showPriceScheduleGroupModal" @close="showPriceScheduleGroupModal = false">
            <div class="title">Define prices</div>
            <div class="content-modal define-block-new">
                <div class="main">
                    <div class="child-adult-block groups-block">
                        <div class="title-block">
                            <div class="title-item group-first">
                                <div class="writing">Max travelers per booking</div>
                            </div>
                            <div class="title-item group-second">
                                <div class="writing">Suggested retail price <span><svg-icon name="help"></svg-icon></span></div>
                            </div>
                            <div class="title-item group-third">
                                <div class="writing">Amount you will get paid <span><svg-icon name="help"></svg-icon></span></div>
                            </div>
                        </div>
                        <div class="items-block">
                            <div  class="item first-item">
                                <div class="numeric-input">
                                    <base-input v-model="groupPricesForm.groupPrice.max_travelers_per_booking" inputWidth="111px" class="input-value"></base-input>
                                </div>
                                <div class="input first">
                                    <div class="currency"><div class="piece">{{ tour.currency }}</div></div>
                                    <base-input @input-change="changeRetailPriceGroup" v-model="groupPricesForm.groupPrice.retail_price"  placeholder="0.0" inputWidth="50px" class="input-value"></base-input>
                                </div>
                                <div class="input group-third">
                                    <div class="currency"><div class="piece">{{ tour.currency }}</div></div>
                                    <input disabled placeholder="0.0"  class="short-input-price input-value" v-model="groupPricesForm.groupPrice.you_will_get_paid">
                                    <!--<base-input v-model="groupPricesForm.groupPrice.you_will_get_paid"  placeholder="0.0" inputWidth="50px" class="input-value"></base-input>-->
                                </div>
                            </div>
                            <!--<div class="item">-->
                            <!--<div class="title">Adult</div>-->
                            <!--<div class="input first">-->
                            <!--<div class="currency"><div class="piece">{{ tour.currency }}</div></div>-->
                            <!--<base-input :disabled="tour.freeAdult" placeholder="0.0" inputWidth="50px" class="input-value"></base-input>-->
                            <!--</div>-->
                            <!--<div class="input second">-->
                            <!--<div class="currency"><div class="piece">{{ tour.currency }}</div></div>-->
                            <!--<base-input :disabled="tour.freeAdult" placeholder="0.0" inputWidth="50px" class="input-value"></base-input>-->
                            <!--</div>-->
                            <!--<div class="ch-ad-checkbox-block">-->
                            <!--<input v-model="tour.freeAdult" type="checkbox">-->
                            <!--<div class="writing">Free Price</div>-->
                            <!--</div>-->
                            <!--</div>-->
                        </div>
                    </div>
                    <div class="days">
                        <label>Select the days these prices apply</label>
                        <div class="selection-block">
                            <input v-model="selectAllGroup" @change="selectAllDaysGroup" type="checkbox">
                            <div class="checkbox-writing">Select all</div>
                        </div>
                        <div class="day-items">
                            <div @click="addDayGroupGroup(index + 1)" v-for="(day,index) in days" :class="{'active-chip': groupPricesForm.days.indexOf(index + 1) != -1}" class="item">
                                {{ day }}
                            </div>
                        </div>
                    </div>
                    <div class="times">
                        <label>Add the times when these prices apply</label>
                        <div class="description">
                            <span class="highlighted">Note:</span>To enter your pickup time and information, go to Meeting and Pickup.
                        </div>
                        <div class="times-container">
                            <div v-for="(time, index) in groupPricesForm.dayTimes" class="item">
                                <vue-timepicker v-model="groupPricesForm.dayTimes[index]" format="HH:mm"></vue-timepicker>
                                <div @click="deleteTimeGroup(index)" class="delete-block">
                                    <svg-icon name="trash"></svg-icon>
                                </div>
                            </div>
                            <div class="add-times-block">
                                <div @click.prevent="addTimeGroup" class="add-time">
                                    <svg-icon name="plus" /><label>Add time</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="buttons-block">
                <button
                        @click.prevent="showPriceScheduleGroupModal = false"
                        class="button light"
                        type="button">
                    Cancel
                </button>
                <button
                        @click.prevent="addSchedulePriceGroup"
                        class="button dark save-modal"
                        type="button">
                    Save
                </button>
            </div>
        </base-modal>

        <div class="form-content">
            <h6>Pricing schedule</h6>
            <div class="description">You can add flexible pricing schedule.</div>
            <div class="schedules-main-block">
                <div v-for="item in schedules" class="schedule-item">
                    <div class="title-row">
                        <div class="title-left">
                            <svg-icon name="calendar"></svg-icon>
                            <div v-if="item.end_date" class="title">{{ item.start_date }} - {{ item.end_date }}</div>
                            <div v-if="!item.end_date" class="title">{{ item.start_date }}</div>
                        </div>
                        <div class="title-right">
                            <div @click="editSch(item)" class="icon-block">
                                <svg-icon class="pencil-icon" name="pencil"></svg-icon>
                            </div>
                            <div class="icon-block" @click="deleteSch(item.id)">
                                <svg-icon class="trash-icon" name="trash"></svg-icon>
                            </div>
                        </div>
                    </div>
                    <div @click="addAnotherPricingSchedule(item)" class="add-another-price-type">
                        <svg-icon name="plus"></svg-icon>
                        <div class="writing">Add or modify prices</div>
                    </div>

                    <div class="price-types">
                        <div v-for="price in item.prices" class="price-type">
                            <div class="writings-block">
                                <div class="title">
                                    <span v-for="day in price.days">
                                        {{ days[day - 1] }},
                                    </span>
                                </div>
                                <div class="info">
                                    <span v-for="time in price.dayTimes">
                                        {{ getBautTime(time) }},
                                    </span>
                                </div>
                                <div v-if="productPriceSettings.type == 2" class="info">Boat: ${{ parseInt(price.groupPrice.retail_price) + '.00' }}, Max per booking ({{ price.groupPrice.max_travelers_per_booking }})</div>
                                <div v-if="productPriceSettings.type == 1" class="info" v-for="(elem,ind) in price.personPrices">{{ price.personPrices[ind].age_group_name }}: ${{ parseInt(price.personPrices[ind].retail_price) + '.00' }}</div>
                            </div>
                            <div class="buttons-block">
                                <div @click="editPriceGroup(item, price)" class="svg-pencil-div">
                                    <svg-icon class="pencil-icon" name="pencil"></svg-icon>
                                </div>
                                <div @click="deleteSchPrice(item, price)" class="svg-pencil-div">
                                    <svg-icon class="trash-icon" name="trash"></svg-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="add-prices-block">
                <div @click.prevent="addPrice" class="add-price">
                    <svg-icon name="plus" /><label>Add price schedule</label>
                </div>
            </div>
        </div>
        <!-- Temporary swapped because the base-button does not work  -->
        <button
                @click.prevent="next(11)"
                class="button dark long"
                type="button">
            Next
        </button>
        <!--<base-button  @click.prevent="next(2)" long>Next</base-button>-->
    </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex'
    import BaseModal from '@/components/UILibrary/Modals/BaseModal'
    import SvgIcon from "../../../../node_modules/vue-cli-plugin-svg-sprite/template/src/components/SvgIcon";
    import Datepicker from 'vuejs-datepicker';
    import moment from 'moment'
    import VueTimepicker from 'vue2-timepicker'
    import 'vue2-timepicker/dist/VueTimepicker.css'

    export default {
        components: {
            SvgIcon,
            BaseModal,
            Datepicker,
            VueTimepicker
        },
        data() {
            return {
                tour: {
                    startType: 'period',
                    currency: 'USD',
                    freeChildren: false,
                    freeAdult: false,
                    times: []
                },
                priceModal: false,
                periods: ['2019-11-16','2019-11-17','2019-11-18','2019-11-18','2019-11-19','2019-11-20'],
                step1: true,
                step2: false,
                currencies: [ 'USD','EUR','RUB' ],
                times: ['12','13'],
                ams: ['AM'],
                days: ['Mon','Tue','Wen','Thu','Fri','Sat','Sun'],


                selectAll: false,
                schId: null,


                form: {
                    id: 0,
                    start_date: "2019-12-16",
                    end_date: "2019-12-17",
                    availableWeekDays: [
                        0,1,2,3,4,5,6
                    ],
                    usedWeekDays: [

                    ],
                    notUsedWeekDays: [
                        0,1,2,3,4,5,6
                    ],
                    prices: [
                        {
                            productSchelduleId: 0,
                            productScheldulePriceId: 0,
                            groupPrice: {
                                max_travelers_per_booking: 0,
                                retail_price: 0,
                                you_will_get_paid: 0
                            },
                            personPrices: [
                                {
                                    age_group_id: 0,
                                    retail_price: 0,
                                    you_will_get_paid: 0,
                                    is_free: true,
                                    age_group_name: "string"
                                },
                                {
                                    age_group_id: 0,
                                    retail_price: 0,
                                    you_will_get_paid: 0,
                                    is_free: true,
                                    age_group_name: "string"
                                }
                            ],
                            days: [
                            ],
                            dayTimes: [
                            ]
                        }
                    ]
                },

                showAddShcheduleModal: false,
                showPriceSchedulePersonModal: false,
                showPriceScheduleGroupModal: false,

                personPricesForm: {
                    productSchelduleId: null,
                    productScheldulePriceId: null,
                    personPrices: [
                    ],
                    days: [
                    ],
                    dayTimes: [
                    ]
                },
                groupPricesForm: {
                    productSchelduleId: null,
                    productScheldulePriceId: null,
                    groupPrice: {
                        max_travelers_per_booking: 0,
                        retail_price: 0,
                        you_will_get_paid: 0
                    },
                    days: [
                    ],
                    dayTimes: [
                    ]
                },

                selectAllGroup: false,

            }
        },
        computed: {
            ...mapGetters({
                ages: 'tours/ageCategories',
                schedules: 'tours/schedules',
                productPriceSettings: 'tours/productPriceSettings',
                stateTour: 'tours/tour',
                operator: 'operators/operator'
            }),
        },
        watch: {
            ages: {
                handler(val){
                    let compContext = this;

                    val.forEach(function(element, index) {

                        compContext.form.prices[0].personPrices[index] = {
                            age_group_id: element.id,
                            age_group_name: element.name,
                            retail_price: 0,
                            you_will_get_paid: 0,
                            is_free: false,
                        }

                    });
                    //this.forceRerender();
                },
                deep: true
            },
            productPriceSettings: {
                handler(val){
                    let compContext = this;
                    if(val.type == 1){
                        compContext.form.type = val.type;
                        compContext.form.max_travelers_per_booking = val.max_travelers_per_booking;
                    }
                    if(val.type == 2){
                        compContext.form.type = val.type;
                        compContext.form.category_id = val.category_id;
                    }
                },
                deep: true
            }
        },
        methods:{
            ...mapActions('tours', ['fetchSetStep',"getAges","createSchedule","deleteSchedule","getSchedules","updateSchedule","createSchedulePrice", "getPriceAges","updateSchedulePrice","deleteSchedulePrice","fetchThirteenStep","getProductPriceSettings"]),
            ...mapActions('operators', ['getOperator']),
            next(val){
                this.fetchThirteenStep();
            },

            addPrice(){
                this.showAddShcheduleModal = true;
                this.schId = null;
//                this.step1 = true,
//                this.step2 = false,
//                this.schId = null;
//                this.priceModal = true;
            },

            changeRetailPrice(val){

                this.personPricesForm.personPrices[val].you_will_get_paid = this.personPricesForm.personPrices[val].retail_price * (100 - parseInt(this.operator.finance.commission))/ 100;
                let form = this.personPricesForm;
                this.personPricesForm = null;
                this.personPricesForm = form;


//                if(!val.content){
//                    this.personPricesForm.personPrices[0].you_will_get_paid = this.personPricesForm.personPrices[0].retail_price * (100 - parseInt(this.operator.finance.commission))/ 100;
//                }else{
//                    this.personPricesForm.personPrices[val.index].you_will_get_paid = this.personPricesForm.personPrices[val.index].retail_price * (100 - parseInt(this.operator.finance.commission))/ 100;
//                    console.log(this.personPricesForm.personPrices[val.index].you_will_get_paid);
//                }


                //console.log(this.personPricesForm.personPrices[index].you_will_get_paid)
            },
            changeRetailPriceGroup(val){
                console.log(this.groupPricesForm.groupPrice.retail_price, "RETAIL")
                console.log(this.groupPricesForm.groupPrice.you_will_get_paid, "GET PAID")
                this.groupPricesForm.groupPrice.you_will_get_paid = this.groupPricesForm.groupPrice.retail_price * (100 - parseInt(this.operator.finance.commission))/ 100;
//                let smth = this.groupPricesForm;
//                this.groupPricesForm = null;
//                this.groupPricesForm = smth;

//                if(!val.content){
//                    this.personPricesForm.personPrices[0].you_will_get_paid = this.personPricesForm.personPrices[0].retail_price * (100 - parseInt(this.operator.finance.commission))/ 100;
//                }else{
//                    this.personPricesForm.personPrices[val.index].you_will_get_paid = this.personPricesForm.personPrices[val.index].retail_price * (100 - parseInt(this.operator.finance.commission))/ 100;
//                    console.log(this.personPricesForm.personPrices[val.index].you_will_get_paid);
//                }

                //console.log(this.personPricesForm.personPrices[index].you_will_get_paid)
            },

            editSch(item){


                if(item.end_date == item.start_date){
                    this.tour.startType = 'start'
                    this.form.start_date = item.start_date;
                    this.form.end_date = item.end_date;
                }else{
                    this.tour.startType = 'period'
                    this.form.start_date = item.start_date;
                    this.form.end_date = item.end_date;
                }
                this.schId = item.id;
                this.showAddShcheduleModal = false;
                this.showAddShcheduleModal = true;

                console.log(this.tour.startType, "START TYPE")

            },

            nextStep(){
                if(this.tour.startType == 'period'){
                    let body = {
                        start_date: this.form.start_date,
                        end_date: this.form.end_date
                    }
                    if(this.schId){
                        const finalBody = {
                            body: body,
                            id: this.schId
                        }
                        this.updateSchedule(finalBody);
                    }else{
                        this.createSchedule(body);
                    }
                }else{
                    let body = {
                        start_date: this.form.start_date,
                    }
                    if(this.schId){
                        const finalBody = {
                            body: body,
                            id: this.schId
                        }
                        this.updateSchedule(finalBody);
                    }else{
                        this.createSchedule(body);
                    }
                }
                this.showAddShcheduleModal = false;
            },

            addSchedulePrice(){
                if(!this.personPricesForm.productScheldulePriceId){
                    let compContext = this;
                    this.personPricesForm.personPrices.forEach(function(element, index) {
                        compContext.personPricesForm.personPrices[index].retail_price = parseInt(compContext.personPricesForm.personPrices[index].retail_price);
                    });
                    this.personPricesForm.dayTimes.forEach(function(element, index) {
                        compContext.personPricesForm.dayTimes[index] = compContext.convertTimeToMinutes(compContext.personPricesForm.dayTimes[index]);
                    });
                    console.log(this.personPricesForm.personPrices);
                    this.createSchedulePrice(this.personPricesForm);
                }else{
                    let compContext = this

                    console.log(this.personPricesForm.dayTimes, "BEFORE")

                    this.personPricesForm.dayTimes.forEach(function(element, index) {
                        compContext.personPricesForm.dayTimes[index] = compContext.convertTimeToMinutes(compContext.personPricesForm.dayTimes[index]);
                    });

                    console.log(this.personPricesForm.dayTimes, "DATE TIMES")
                    this.updateSchedulePrice(this.personPricesForm);

                }
                this.showPriceSchedulePersonModal = false;
            },
            addSchedulePriceGroup(){

                if(!this.groupPricesForm.productScheldulePriceId){
                    this.groupPricesForm.groupPrice.max_travelers_per_booking = parseInt(this.groupPricesForm.groupPrice.max_travelers_per_booking);
                    let compContext = this;

                    this.groupPricesForm.dayTimes.forEach(function(element, index) {
                        compContext.groupPricesForm.dayTimes[index] = compContext.convertTimeToMinutes(compContext.groupPricesForm.dayTimes[index]);
                    });
                    this.createSchedulePrice(this.groupPricesForm);
                }else{
                    let compContext = this;
                    this.groupPricesForm.dayTimes.forEach(function(element, index) {
                        compContext.groupPricesForm.dayTimes[index] = compContext.convertTimeToMinutes(compContext.groupPricesForm.dayTimes[index]);
                    });
                    this.updateSchedulePrice(this.groupPricesForm);
                }

                this.showPriceScheduleGroupModal = false;

            },

            addTime(){
                const body = {
                    HH: '00',
                    mm: '00'
                };
                this.personPricesForm.dayTimes.push(body);
            },
            deleteTime(index){
                this.personPricesForm.dayTimes.splice(index,1);
            },
            deleteGroupTime(index){
                this.groupPricesForm.dayTimes.splice(index,1);
            },

            setStart(val){
                this.form.start_date = val;
            },
            setEnd(val){
                this.form.end_date = val;
            },
            addDayGroup(index){
                var elementPos = this.personPricesForm.days.indexOf(index);

                if(elementPos != -1){
                    this.personPricesForm.days.splice(elementPos, 1);
                }else{
                    this.personPricesForm.days.push(index);
                }
            },
            selectAllDays(){
                if(this.selectAll){
                    this.personPricesForm.days = [0,1,2,3,4,5,6]
                }else{
                    this.personPricesForm.days = [];
                }
            },

            setTime(val){
                this.personPricesForm.dayTimes[val.index] = val.value;
            },
            setFree(index){
                let smth = this.personPricesForm.days;
                this.personPricesForm.days = [];
                this.personPricesForm.days = smth;
            },
            deleteSch(id){
                this.deleteSchedule(id);
            },
            setStartDate(e){
                this.form.start_date = moment(e).format('YYYY-MM-DD');
            },
            setEndDate(e){
                this.form.end_date = moment(e).format('YYYY-MM-DD');
            },


            addAnotherPricingSchedule(item){

                if(this.productPriceSettings.type == 1){
                    this.personPricesForm.productSchelduleId = item.id;
                    this.personPricesForm.productScheldulePriceId = null;

                    this.personPricesForm.personPrices = [];
                    let compContext = this;
                    this.productPriceSettings.ageGroups.forEach(function(element, index) {
                        compContext.personPricesForm.personPrices[index] = {
                            age_group_id: parseInt(element.id),
                            age_group_name: element.categoryName,
                            retail_price: 0,
                            you_will_get_paid: 0,
                            is_free: false,
                        }
                    });

                    this.showPriceSchedulePersonModal = true;
                }else{
                    this.groupPricesForm.productSchelduleId = item.id;
                    this.groupPricesForm.productScheldulePriceId = null;

                    this.groupPricesForm.groupPrice = {
                        max_travelers_per_booking: 0,
                        retail_price: 0,
                        you_will_get_paid: 0
                    }

                    this.showPriceScheduleGroupModal = true;
                }

            },
            editPriceGroup(item, price){

                var price = JSON.parse(JSON.stringify(price));


                if(this.productPriceSettings.type == 2){
                    this.groupPricesForm.productSchelduleId = item.id;
                    this.groupPricesForm.productScheldulePriceId = price.productScheldulePriceId;

                    this.groupPricesForm.groupPrice = price.groupPrice;

                    let newDays = [];
                    price.days.forEach(function(element, index) {
                        newDays[index] = parseInt(element);
                    });

                    this.groupPricesForm.days = newDays;

                    this.groupPricesForm.dayTimes = price.dayTimes;

                    this.groupPricesForm.groupPrice.retail_price = parseFloat(this.groupPricesForm.groupPrice.retail_price).toFixed(2);
                    this.groupPricesForm.groupPrice.you_will_get_paid = parseFloat(this.groupPricesForm.groupPrice.you_will_get_paid).toFixed(2);

                    let compContext = this;
                    this.groupPricesForm.dayTimes.forEach(function(element, index) {
                        compContext.groupPricesForm.dayTimes[index] = compContext.convertMinutesToObj(compContext.groupPricesForm.dayTimes[index]);
                    });

                    this.showPriceScheduleGroupModal = true;
                }else{
                    this.personPricesForm.productSchelduleId = item.id;
                    this.personPricesForm.productScheldulePriceId = price.productScheldulePriceId;

                    this.personPricesForm.personPrices = price.personPrices;
                    let compContext = this;
                    this.personPricesForm.personPrices.forEach(function(element, index) {
                        compContext.personPricesForm.personPrices[index].retail_price = parseFloat(compContext.personPricesForm.personPrices[index].retail_price).toFixed(2);
                        compContext.personPricesForm.personPrices[index].you_will_get_paid = parseFloat(compContext.personPricesForm.personPrices[index].you_will_get_paid).toFixed(2);
                    });


                    let newDays = [];
                    price.days.forEach(function(element, index) {
                        newDays[index] = parseInt(element);
                    });


                    console.log(this.personPricesForm.dayTimes, "DATETIMES")

                    this.personPricesForm.days = newDays;

                    this.personPricesForm.dayTimes = price.dayTimes;

                    this.personPricesForm.dayTimes.forEach(function(element, index) {
                        compContext.personPricesForm.dayTimes[index] = compContext.convertMinutesToObj(compContext.personPricesForm.dayTimes[index]);
                    });


                    this.showPriceSchedulePersonModal = true;
                }

            },
            selectAllDaysGroup(){
                if(this.selectAllGroup){
                    this.groupPricesForm.days = [0,1,2,3,4,5,6]
                }else{
                    this.groupPricesForm.days = [];
                }
            },
            addDayGroupGroup(index){
                var elementPos = this.groupPricesForm.days.indexOf(index);

                if(elementPos != -1){
                    this.groupPricesForm.days.splice(elementPos, 1);
                }else{
                    this.groupPricesForm.days.push(index);
                }
            },
            setTimeGroup(val){
                this.groupPricesForm.dayTimes[val.index] = val.value;
            },
            deleteTimeGroup(index){
                this.groupPricesForm.dayTimes.splice(index,1);
            },
            addTimeGroup(){
                const body = {
                    HH: '00',
                    mm: '00'
                };
                this.groupPricesForm.dayTimes.push(body);
            },

            // Needed for person
            addAnotherPricingSchedulePerson(item){
                this.personPricesForm.productSchelduleId = item.id;
                this.personPricesForm.productScheldulePriceId = null;

                this.personPricesForm.personPrices = [];
                let compContext = this;
                this.ages.forEach(function(element, index) {
                    compContext.personPricesForm.personPrices[index] = {
                        age_group_id: parseInt(element.id),
                        age_group_name: element.name,
                        retail_price: 0,
                        you_will_get_paid: 0,
                        is_free: false,
                    }
                });

                this.showPriceSchedulePersonModal = true;
            },
            deleteSchPrice(item,price){
                let body = {
                    schId: item.id,
                    priceId: price.productScheldulePriceId
                }
                this.deleteSchedulePrice(body)
            },
            customFormatter(){
            },
            convertTimeToMinutes(val){
                return parseInt(val.HH) * 60 + parseInt(val.mm)
            },
            convertMinutesToObj(mins){
                const hours = String(Math.floor(mins/60)).length > 1 ? String(Math.floor(mins/60)) : '0' + String(Math.floor(mins/60))
                const minutes = String(mins % 60).length > 1 ? String(mins % 60) : '0' + String(mins % 60)


                let yourTimeValue = {
                    HH: hours,
                    mm: minutes
                };
                return yourTimeValue
            },
            getBautTime(mins){
                if(typeof(mins) == 'string'){
                    const hours = String(Math.floor(mins/60)).length > 1 ? String(Math.floor(mins/60)) : '0' + String(Math.floor(mins/60))
                    const minutes = String(mins % 60).length > 1 ? String(mins % 60) : '0' + String(mins % 60)

                    return hours + ':' + minutes;
                }else{
                    console.log(mins, "MINS??")
                    return mins.HH + ':' + mins.mm;
                }

            }
        },
        mounted(){
            this.getAges();
            this.getPriceAges();
            this.getSchedules();
            this.getProductPriceSettings();
            this.getOperator({ id: this.stateTour.operator_id, expand: 'finance'});
        }
    }
</script>
<style lang="scss" scoped>
    .form-content {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 315px;
        margin-top: 20px;
        margin-bottom: 15px;
    }
    .short-input-price{
        width: 50px;
    }
</style>