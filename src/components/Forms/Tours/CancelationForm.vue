<template>
    <div class="form-container">
        <div class="form-content cancellation-form">
            <h6>Your cancellation policy</h6>
            <div class="description">Select your cancellation policy</div>
            <div class="radio-buttons-block">
                <div v-for="(item,index) in cancellationTypes" class="radio-item">
                    <input :value="index" v-model="form.type" type="radio">
                    <div class="label-block">
                        <div class="label-title">
                            <div class="text">{{ item }}</div>
                            <div v-if="index == 1" class="tag">Recommended</div>
                        </div>
                        <div class="label-description">To receive a full refund, travelers may cancel up to 24 hours before the experience start date in the local timezone. No refunds will be given after that time period.</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Temporary swapped because the base-button does not work  -->
        <button
                @click.prevent="next(18)"
                @keyup.enter="next(18)"
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
                    type: null,
                },
            };
        },
        computed: {
            ...mapGetters({
                stateTour: "tours/tour",
                cancellationTypes: "tours/cancellationTypes",
                productCancellationPolicy: "tours/productCancellationPolicy",
            })
        },
        watch: {
            productCancellationPolicy: {
                handler(val) {
                    if(val.type){
                        this.form.type = val.type;
                    }
                },
                deep: true
            }
        },
        beforeMount() {
        },
        methods: {
            ...mapActions("tours", ["fetchSetStep","getCancellationTypes","fetchEightTeenStep","getCancellationPolicy","getTour"]),

            next(val) {
                const body = this.form;
                this.fetchEightTeenStep(body);
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
            this.getCancellationTypes();
            this.getCancellationPolicy();
            this.getTour();
//    this.tour = this.stateTour;
//            this.getLanguages();
//            this.getTour();
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