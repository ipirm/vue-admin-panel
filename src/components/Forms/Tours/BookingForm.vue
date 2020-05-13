<template>
    <div class="form-container">
        <div class="form-content booking-form">
            <h6>Now let's cusomize our booking process</h6>
            <div class="book-label">How would you like to set your cut-off time?</div>
            <base-select
                    custom
                    itemName="name"
                    valueName="id"
                    :custValue="rest.cutOffTime.type"
                    :options="cutOffTypes"
                    @selected-option="setCutOffTime"
                    width="718px"
                    max-width="718px"
                    inputWidth="315px"
                    description="This is the time when you stop accepting new bookings for this activity."
            />
            <div v-if="this.rest.cutOffTime.type == 1" class="time-selection-block">
                <label>Set your cut off time</label>
                <div class="selects-block">
                    <base-select
                            :options="times"
                            @selected-option="setTime"
                            width="75px"
                            max-width="75px"
                            inputWidth="75px"
                            custom
                            itemName="name"
                            valueName="val"
                            :custValue="rest.cutOffTime.time_of_day"
                    />
                    <base-select
                            custom
                            itemName="name"
                            valueName="id"
                            :custValue="defaultTime"
                            :options="timeDefTipes"
                            @selected-option="setTimeType"
                            width="50px"
                            max-width="50px"
                            inputWidth="50px"
                    />
                    <base-select
                            custom
                            itemName="name"
                            valueName="id"
                            :custValue="rest.cutOffTime.days_before_start"
                            :options="dayDefTypes"
                            @selected-option="setTravelType"
                            width="150px"
                            max-width="150px"
                            inputWidth="150px"
                    />
                </div>
            </div>
            <div v-if="this.rest.cutOffTime.type == 2" class="input block">
                <base-input
                    v-model="rest.cutOffTime.hours_before_start"
                    inputWidth="68px"
                />
            </div>
            <div class="book-label">Choose your confirmation method</div>
            <base-select
                    custom
                    itemName="name"
                    valueName="id"
                    :custValue="rest.confirmationMethod.type"
                    :options="confMethods"
                    @selected-option="setConfirmationMethod"
                    width="718px"
                    max-width="718px"
                    inputWidth="315px"
                    description="This will determine how you process bookings for this activity."
            />
            <div v-if="rest.confirmationMethod.type == 1" class="checkbox-book">
                <input v-model="rest.confirmationMethod.is_send_notification" id="time-before" type="checkbox"><label for="time-before">How long before the start, you can switch off manual confirmation</label>
            </div>
            <div  v-if="rest.confirmationMethod.type == 2" class="selects-block">
                <base-input
                        inputWidth="30px"
                        v-model="rest.confirmationMethod.hours_before_cut_off"
                />
                <base-select
                        width="102px"
                        max-width="104px"
                        inputWidth="104px"
                        :options="hours"
                        :defaultValue="hour"
                ></base-select>
            </div>
        </div>
        <!-- Temporary swapped because the base-button does not work  -->
        <button
                @click.prevent="next(17)"
                @keyup.enter="next(17)"
                class="button dark long"
                type="button"
        >Next</button>
        <!--<base-button  @click.prevent="next(2)" long>Next</base-button>-->
    </div>
</template>

<script>
    import { mapActions, mapGetters } from "vuex";

    export default {
        data() {
            return {
                form: {
                    cutOffTime: null,
                    time: null,
                    timeType: null,
                    travelType: null,
                    confirmationMethod: null
                },
                cutOffTime: [
                    'cat1',
                    'cat2'
                ],
                times: [
                    { val: 0.5, name:'00:30' },
                    { val: 1, name:'01:00' },
                    { val: 1.5, name:'01:30' },
                    { val: 2, name:'02:00' },
                    { val: 2.5, name:'02:30' },
                    { val: 3, name:'03:00' },
                    { val: 3.5, name:'03:30' },
                    { val: 4, name:'04:00' },
                    { val: 4.5, name:'04:30' },
                    { val: 5, name:'05:00' },
                    { val: 6.5, name:'06:30' },
                    { val: 7, name:'07:00' },
                    { val: 7.5, name:'07:30' },
                    { val: 8, name:'08:00' },
                    { val: 9.5, name:'09:30' },
                    { val: 10, name:'10:00' },
                    { val: 10.5, name:'10:30' },
                    { val: 11, name:'11:00' },
                    { val: 11.5, name:'11:30' },
                    { val: 12, name:'12:00' }
                ],
                timeTypes: [
                    'AM',
                    'PM'
                ],
                travelTypes: [
                    'type1',
                    'type2',
                ],
                confirmationMethods: [
                    'Meth1',
                    'Meth2'
                ],
                cutOffTypes: [],
                confMethods: [],
                rest: {
                    cutOffTime: {
                        type: 0,
                        time_of_day: 0,
                        days_before_start: 0,
                        hours_before_start: 0
                    },
                    confirmationMethod: {
                        type: 0,
                        is_send_notification: 0,
                        hours_before_cut_off: 0
                    }
                },
                hours: [ 'Hours' ],
                hour: 'Hours',
                timeDefTipes:[ {id:1,name:'AM'}, {id:2, name:'PM'}],
                dayDefTypes: [{id:1, name:'Day of Travel'}],
                defaultTime: 1
            };
        },
        computed: {
            ...mapGetters({
                stateTour: "tours/tour",
                cutOffCategories: "tours/cutOffCategories",
                confirmationMets: "tours/confirmationMethods",
                bookingProcess: "tours/bookingProcess",
            })
        },
        watch: {
            tour: {
                handler(val) {
                },
                deep: true
            },
            stateTour: {
                handler(val) {
                },
                deep: true
            }
        },
        methods: {
            ...mapActions("tours", ["fetchSetStep", "getTour", "getCutOffCategories", "getConfirmationMethods","fetchSeventeenStep","getBookingProcess"]),

            next(val) {
                const body = this.rest;
                body.confirmationMethod.is_send_notification = body.confirmationMethod.is_send_notification ? 1 : 0;
                this.fetchSeventeenStep(body);

//                this.fetchSetStep({
//                    step: val
//                });
            },

            setCutOffTime(val) {
                this.rest.cutOffTime.type = val;
            },

            setTime(val) {
                this.rest.cutOffTime.time_of_day = val;
            },
            setTimeType(val) {
                //this.rest.cutOffTime.days_before_start = val;
            },
            setTravelType(val) {
                this.rest.cutOffTime.days_before_start = val;
            },
            setConfirmationMethod(val){
                this.rest.confirmationMethod.type = val;
            },
        },
        beforeMount() {
            this.cutOffTypes = [];
            let compContext = this;
            let obj = this.cutOffCategories;
            Object.keys(obj).forEach(function(key) {
                compContext.cutOffTypes.push({ id: key, name: obj[key]})
            });

            this.confMethods = [];
            let object = this.confirmationMets;
            Object.keys(object).forEach(function(key) {
                compContext.confMethods.push({ id: key, name: object[key]})
            });

            this.rest = this.bookingProcess;
            console.log(this.rest, "REST")
        },
        mounted() {
            this.getCutOffCategories();
            this.getConfirmationMethods();
            this.getBookingProcess();
            this.getTour();
        }
    };
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
</style>