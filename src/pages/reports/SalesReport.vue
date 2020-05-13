<template>
    <div class="report-sales-block">
        <div class="chart-and-sales-block">
            <div class="chart-block">
                <div class="chart-block-title">Sales report</div>
                <div v-if="collection.datasets.length > 0">
                    <line-chart :width="700" :chart-data="collection"></line-chart>
                </div>
            </div>
            <div v-if="reports.data" class="sales-block">
                <div class="sales-swapper">
                    <div class="sales-swapper-header">
                        <div @click="minusActive()" :class="{'inactive': activeIndex == 0}" class="left-toggler">
                            <svg-icon name="arrow_left"></svg-icon>
                        </div>
                        <div class="sales-swapper-header-title">
                            Sales for {{ parseDate(objectKeys[activeIndex]) }}
                        </div>
                        <div @click="plusActive()" :class="{'inactive': activeIndex == 11}" class="right-toggler">
                            <svg-icon name="arrow_right"></svg-icon>
                        </div>
                    </div>
                    <div class="data-chips">
                        <div class="data-chip">
                            <div class="left-block">
                                <div class="icon-block">
                                    <svg-icon v-if="reports.data[objectKeys[activeIndex]].incomeChage && reports.data[objectKeys[activeIndex]].incomeChage < 1" name="down_red"></svg-icon>
                                    <svg-icon v-else name="up_green"></svg-icon>
                                </div>
                                <div class="texts-block">
                                    <div class="text">Revenue</div>
                                    <div class="bottom-text">Change %</div>
                                </div>
                            </div>
                            <div class="right-block">
                                <div class="prices-and-sales-block">
                                    <div class="price-sum">USD ${{ reports.data[objectKeys[activeIndex]].income }}</div>
                                    <div class="percents-block">{{ reports.data[objectKeys[activeIndex]].incomeChage ? reports.data[objectKeys[activeIndex]].incomeChage : 0 }} %</div>
                                </div>
                            </div>
                        </div>
                        <div class="data-chip">
                            <div class="left-block">
                                <div class="icon-block">
                                    <svg-icon v-if="reports.data[objectKeys[activeIndex]].bookingsCountChage && reports.data[objectKeys[activeIndex]].bookingsCountChage < 1" name="down_red"></svg-icon>
                                    <svg-icon v-else name="up_green"></svg-icon>
                                </div>
                                <div class="texts-block">
                                    <div class="text">Bookings</div>
                                    <div class="bottom-text">Change %</div>
                                </div>
                            </div>
                            <div class="right-block">
                                <div class="prices-and-sales-block">
                                    <div class="price-sum">{{ reports.data[objectKeys[activeIndex]].bookingsCount }}</div>
                                    <div class="percents-block">{{ reports.data[objectKeys[activeIndex]].bookingsCountChage ? reports.data[objectKeys[activeIndex]].bookingsCountChage : 0 }} %</div>
                                </div>
                            </div>
                        </div>
                        <div class="data-chip">
                            <div class="left-block">
                                <div class="icon-block">
                                    <svg-icon v-if="reports.data[objectKeys[activeIndex]].travelersCountChage && reports.data[objectKeys[activeIndex]].travelersCountChage < 1" name="down_red"></svg-icon>
                                    <svg-icon v-else name="up_green"></svg-icon>
                                </div>
                                <div class="texts-block">
                                    <div class="text">Travellers</div>
                                    <div class="bottom-text">Change %</div>
                                </div>
                            </div>
                            <div class="right-block">
                                <div class="prices-and-sales-block">
                                    <div class="price-sum">{{ reports.data[objectKeys[activeIndex]].travelersCount }}</div>
                                    <div class="percents-block">{{ reports.data[objectKeys[activeIndex]].travelersCountChage ? reports.data[objectKeys[activeIndex]].travelersCountChage : 0 }} %</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="sales-history-block">
            <div class="title-history">Sales history</div>
            <div class="history-table">
                <table>
                    <thead>
                    <tr>
                        <th class="title">2019</th>
                        <th v-for="month in dataLabels">{{ month }}</th>
                        <th class="total">Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="data in dataValues">
                        <td v-for="val in data" class="title">{{ val }}</td>
                    </tr>
                    </tbody>
                </table>
                <table>
                    <thead>
                    <tr>
                        <th class="title">2019</th>
                        <th v-for="month in dataLabels">{{ month }}</th>
                        <th class="total">Total</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="data in dataValues">
                        <td v-for="val in data" class="title">{{ val }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
    import SvgIcon from "../../../node_modules/vue-cli-plugin-svg-sprite/template/src/components/SvgIcon";
    import moment from 'moment';
    import { mapActions, mapState } from 'vuex'
    import LineChart from '@/components/Charts/BarChart.js'
    export default{
        components: { SvgIcon, LineChart },
        data: () => ({
            datacollection: null,
            dataLabels: ['Jan','Feb','Mar','Apr','May','Jul','Jun','Aug','Sept','Oct','Nov',"Dec"],
            dataValues: [
                ['Revenue','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k'],
                ['Revenue','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k'],
                ['Revenue','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k'],
                ['Revenue','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k'],
                ['Revenue','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k','28k']
            ],
            queryParams: {
                type: 'BY_PRODUCT_DATE',
                fromDate: '2019-01-01',
                toDate: '2019-12-31'
            },
            activeIndex: 0
        }),
        methods: {
            ...mapActions('reports', ['fetchReports']),
            fillData () {
                this.datacollection = {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    datasets: [
                        {
                            label: 'Bookings',
                            backgroundColor: '#faab1a',
                            borderWidth: 1,
                            data: [40, 20, 30, 50, 90, 10, 20, 40, 50, 70, 90, 90]
                        },
                        {
                            label: 'Bookings 2',
                            backgroundColor: '#faab1a',
                            borderWidth: 1,
                            data: [40, 20, 30, 25, 90, 10, 20, 40, 50, 70, 90, 90]
                        }
                    ],
                    options: {
                        scales: {
                            yAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    gridLines: {
                                        display: true
                                    }
                                }
                            ],
                            xAxes: [
                                {
                                    ticks: {
                                        beginAtZero: true
                                    },
                                    gridLines: {
                                        display: false
                                    }
                                }
                            ]
                        },
                        legend: {
                            display: false
                        },
                        tooltips: {
                            enabled: true,
                            mode: "single",
                            callbacks: {
                                label: function(tooltipItems, data) {
                                    return "$" + tooltipItems.yLabel;
                                }
                            }
                        },
                        responsive: true,
                        maintainAspectRatio: false,
                        height: 200
                    },
                }
            },
            getRandomInt () {
                return Math.floor(Math.random() * (50 - 5 + 1)) + 5
            },
            get(){
                this.fetchReports(this.queryParams);
            },
            getFirstDateOfCurrentYear(){
                var thisYear = (new Date()).getFullYear();
                var start = new Date("1/1/" + thisYear);
                var defaultStart = moment(start.valueOf()).format('YYYY-MM-DD');
                return defaultStart
            },
            getLastDateOfCurrentYear(){
                var thisYear = (new Date()).getFullYear();
                var start = new Date("12/31/" + thisYear);
                var defaultStart = moment(start.valueOf()).format('YYYY-MM-DD');
                return defaultStart
            },
            minusActive(){
                if(this.activeIndex > 0){
                    this.activeIndex -= 1
                }
            },
            plusActive(){
                if(this.activeIndex < 11){
                    this.activeIndex += 1
                }
            },
            parseDate(date){
                return moment(date).format("MMM,YYYY");
            }
        },
        computed: {
            ...mapState('reports', [ 'reports', 'collection', 'objectKeys' ]),
        },
        created(){
        },
        mounted(){
          this.fillData();
          this.queryParams.fromDate = this.getFirstDateOfCurrentYear();
          this.queryParams.toDate = this.getLastDateOfCurrentYear();
          this.get();
        }
    }
</script>