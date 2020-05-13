<template>
    <div class="form-container">
        <div class="form-content extra-form">
            <h6>Do you need extra information for travelers?</h6>
            <label class="checkbox-label">Here's what we'll collect automatically</label>
            <div class="automatic-block">
                <div class="automatic-item">
                    <svg-icon name="completed"></svg-icon>
                    <div class="titles-block">
                        <div class="title">Lead Travelers Name</div>
                        <div class="description">(first and last name)</div>
                    </div>
                </div>
                <div class="automatic-item">
                    <svg-icon name="completed"></svg-icon>
                    <div class="titles-block">
                        <div class="title">Phone number</div>
                        <div class="description">(including country code)</div>
                    </div>
                </div>
            </div>
            <label class="checkbox-label">Select any personal information you need from all travelers:</label>
            <div class="checkbox-description">Travelers are less likely to book if they have to enter lots of information. Only select what's absolutely necessary.</div>
            <div class="checkbox-buttons-block">
                <div class="checkbox-item">
                    <input v-model="newForm.is_full_name_needed" type="checkbox">
                    <div class="label-block">
                        <div class="label-title">Is Full Name needed</div>
                    </div>
                </div>
                <div class="checkbox-item">
                    <input v-model="newForm.is_weight_needed" type="checkbox">
                    <div class="label-block">
                        <div class="label-title">Is Weight needed</div>
                    </div>
                </div>
                <div class="checkbox-item">
                    <input v-model="newForm.is_date_of_birth_needed" type="checkbox">
                    <div class="label-block">
                        <div class="label-title">Is Date of Birth needed</div>
                    </div>
                </div>
                <div class="checkbox-item">
                    <input v-model="newForm.is_gender_needed" type="checkbox">
                    <div class="label-block">
                        <div class="label-title">Is Gender needed</div>
                    </div>
                </div>
                <div class="checkbox-item">
                    <input v-model="newForm.is_nationality_needed" type="checkbox">
                    <div class="label-block">
                        <div class="label-title">Is Nationality needed</div>
                    </div>
                </div>
                <div class="checkbox-item">
                    <input v-model="newForm.is_passport_details_needed" type="checkbox">
                    <div class="label-block">
                        <div class="label-title">Is Passport Details needed</div>
                    </div>
                </div>
                <div class="checkbox-item">
                    <input v-model="newForm.is_arrival_flight_details_needed" type="checkbox">
                    <div class="label-block">
                        <div class="label-title">Is Arrival Flight Details needed</div>
                    </div>
                </div>
                <div class="checkbox-item">
                    <input v-model="newForm.is_departure_flight_details_needed" type="checkbox">
                    <div class="label-block">
                        <div class="label-title">Is Departure Flight Details needed</div>
                    </div>
                </div>
                <div class="checkbox-item">
                    <input v-model="newForm.is_arrival_ship_details_needed" type="checkbox">
                    <div class="label-block">
                        <div class="label-title">Is Arrival Ship Details needed</div>
                    </div>
                </div>
                <div class="checkbox-item">
                    <input v-model="newForm.is_departure_ship_details_needed" type="checkbox">
                    <div class="label-block">
                        <div class="label-title">Is Departure Ship Details needed</div>
                    </div>
                </div>
                <div class="checkbox-item">
                    <input v-model="newForm.is_arrival_train_details_needed" type="checkbox">
                    <div class="label-block">
                        <div class="label-title">Is Arrival Train Details needed</div>
                    </div>
                </div>
                <div class="checkbox-item">
                    <input v-model="newForm.is_departure_train_details_needed" type="checkbox">
                    <div class="label-block">
                        <div class="label-title">Is Departure Train Details needed</div>
                    </div>
                </div>

                <!-- Old styles to be deleted -->
                <!--<div v-for="(category,index) in personalCategories" class="checkbox-item">-->
                    <!--<input :value="category.id" v-model="checkedCategories" type="checkbox">-->
                    <!--<div class="label-block">-->
                        <!--<div class="label-title">{{ category.name }}</div>-->
                    <!--</div>-->
                <!--</div>-->
            </div>

            <!-- Old styles to be deleted -->

            <!--<label class="checkbox-label">Select any arrival/departure information you need:</label>-->
            <!--<div class="checkbox-description-similar">Flight Information</div>-->
            <!--<div class="checkbox-buttons-block">-->
                <!--<div v-for="(category,index) in flightCategories" class="checkbox-item">-->
                    <!--<input v-model="checkedFlights" :value="category.id"  type="checkbox">-->
                    <!--<div class="label-block">-->
                        <!--<div class="label-title">{{ category.name }}</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="checkbox-description-similar">Ship Information</div>-->
            <!--<div class="checkbox-buttons-block">-->
                <!--<div v-for="(category,index) in shipCategories" class="checkbox-item">-->
                    <!--<input v-model="checkedShips" :value="category.id"  type="checkbox">-->
                    <!--<div class="label-block">-->
                        <!--<div class="label-title">{{ category.name }}</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
            <!--<div class="checkbox-description-similar">Train Information</div>-->
            <!--<div class="checkbox-buttons-block">-->
                <!--<div v-for="(category,index) in trainCategories" class="checkbox-item">-->
                    <!--<input v-model="checkedTrains" :value="category.id"  type="checkbox">-->
                    <!--<div class="label-block">-->
                        <!--<div class="label-title">{{ category.name }}</div>-->
                    <!--</div>-->
                <!--</div>-->
            <!--</div>-->
        </div>
        <!-- Temporary swapped because the base-button does not work  -->
        <button
                @click.prevent="next(19)"
                @keyup.enter="next(19)"
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
                    cancelationPolicy: null,
                },
                categories: [
                    'Cat1',
                    'Cat2',
                    'Cat3',
                    'Cat4',
                    'Cat5'
                ],
                checkedCategories: [],
                checkedFlights: [],
                checkedShips: [],
                checkedTrains: [],

                newForm: {
                    is_full_name_needed: false,
                    is_weight_needed: false,
                    is_date_of_birth_needed: false,
                    is_gender_needed: false,
                    is_nationality_needed: false,
                    is_passport_details_needed: false,
                    is_arrival_flight_details_needed: false,
                    is_departure_flight_details_needed: false,
                    is_arrival_ship_details_needed: false,
                    is_departure_ship_details_needed: false,
                    is_arrival_train_details_needed: false,
                    is_departure_train_details_needed: false
                },
            };
        },
        computed: {
            ...mapGetters({
                stateTour: "tours/tour",
                personalCategories: "tours/personalCategories",
                flightCategories: "tours/flightCategories",
                shipCategories: "tours/shipCategories",
                trainCategories: "tours/trainCategories",
                bookingNeedInfo: "tours/bookingNeedInfo"
            })
        },
        watch: {
            stateTour: {
                handler(val) {
                    this.checkedCategories = val.personalInformationYouNeedCategories;
                    this.checkedFlights = val.flightInformationYouNeedCategories;
                    this.checkedShips = val.shipInformationYouNeedCategories;
                    this.checkedTrains = val.trainInformationYouNeedCategories;
                },
                deep: true
            },
            bookingNeedInfo: {
                handler(val) {
                    this.newForm = val;
                },
                deep: true
            }
        },
        beforeMount() {
        },
        methods: {
            ...mapActions("tours", ["fetchSetStep","getTour","getPersonalInformationCategories","getFlightCategories","getShipCategories","getTrainCategories", "fetchNineteenStep","fetchNineteenStepNew","getBookingInfo"]),

            next(val) {
//                let body = {
//                    personalInformationYouNeedCategories: this.checkedCategories,
//                    flightInformationYouNeedCategories: this.checkedFlights,
//                    shipInformationYouNeedCategories: this.checkedShips,
//                    trainInformationYouNeedCategories: this.checkedTrains
//                }
//                this.fetchNineteenStep(body);

                let body = this.newForm;
                this.fetchNineteenStepNew(body);
//                const body = this.tour;
//                this.fetchSetStep({
//                    step: val
//                });
            },

            setCutOffTime(val) {
                this.form.cutOffTime = val;
            },
            setTime(val) {
                this.form.time = val;
            },
            setTimeType(val) {
                this.form.timeType = val;
            },
            setTravelType(val) {
                this.form.travelType = val;
            },
            setConfirmationMethod(val){
                this.form.confirmationMethod = val;
            }
        },
        mounted() {
            this.getTour();
            this.getPersonalInformationCategories();
//            this.getFlightCategories();
//            this.getShipCategories();
//            this.getTrainCategories();
            this.getBookingInfo();
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