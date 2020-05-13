<template>
    <div class="report-manage-block">
        <div class="main-title">
            Download report
        </div>
        <div class="selections-block">
            <div class="selections-block-label">Select a period and a format to download a report.</div>
            <div class="date-pickers-block">
                <datepicker placeholder="Date from" v-model="dateFrom" @selected="setStartDate"></datepicker>
                <datepicker placeholder="Date to" v-model="dateTo" class="right-vdp" @selected="setEndDate"></datepicker>
                <base-select placeholder="Select format" input-width="223px" width="223px" class="date-pickers-block-select" :options="formats"></base-select>
            </div>
            <div class="download-button">Download</div>
        </div>
        <div class="main-title">
            Email Notification
        </div>
        <div class="email-notification-block">
            <div class="radio-buttom-block">
                <div class="radio-buttons-label">How often would you like to get emails?</div>
                <div class="radio-buttons">
                    <div class="radio-button-item">
                        <input id="day" type="radio">
                        <label for="day">Every day</label>
                    </div>
                    <div class="radio-button-item">
                        <input id="month" type="radio">
                        <label for="month">Every month</label>
                    </div>
                    <div class="radio-button-item">
                        <input id="year" type="radio">
                        <label for="year">Every year</label>
                    </div>
                </div>
                <base-select input-width="223px" width="223px" label="Format" :options="formats"></base-select>
                <base-input class="email-field-input" inputWidth="119px" label="Type your email"></base-input>
                <div class="save-button">Save</div>
            </div>
        </div>
    </div>
</template>
<script>
    import SvgIcon from "../../../node_modules/vue-cli-plugin-svg-sprite/template/src/components/SvgIcon";
    import moment from 'moment';
    import Datepicker from 'vuejs-datepicker';
    import { mapActions, mapState } from 'vuex'
    export default{
        components: { SvgIcon, Datepicker },
        data: () => ({
            dateFrom: null,
            dateTo: null,
            queryParams: {},
            formats: ['format1','format2']
        }),
        methods: {
            ...mapActions('reports', ['fetchReports']),
            setStartDate(e){
                this.queryParams.travelDateFrom = moment(e).format('YYYY-MM-DD');
                this.get()
            },
            setEndDate(e){
                this.queryParams.travelDateTo = moment(e).format('YYYY-MM-DD');
                this.get()
            },
            get(){
                this.fetchReports(this.queryParams);
            }
        },
        computed: {
            ...mapState('reports', [ 'reports' ]),
        },
        created(){
        }
    }
</script>