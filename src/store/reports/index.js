import apiRequest from '@/utils/apiRequest'
import $router from '@/router'

export default {
    namespaced: true,

    state: {
        reports: {},
        objectKeys: [],
        collection: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
            datasets: []
        }
    },

    getters: {
        reports: state => state.reports,
    },

    mutations: {
        SET_REPORTS: (state, payload) => {
            state.reports = payload

            if(payload.data){

                state.collection.datasets = [];

                let bookingDataArray = [];
                let travellerDataArray = [];
                let revenueArray = [];
                let objectKeys = [];

                Object.keys(payload.data).forEach(function (item) {
                    bookingDataArray.push(payload.data[item].bookingsCount)
                    travellerDataArray.push(payload.data[item].travelersCount)
                    revenueArray.push(payload.data[item].income/1000)
                    objectKeys.push(item);
                });
                state.objectKeys = objectKeys;

                state.collection.datasets = [
                    {
                        label: 'Revenue in Thousands',
                        backgroundColor: '#80CF5F',
                        borderColor: '#80CF5F',
                        borderWidth: 2,
                        data: revenueArray,
                        type: 'line',
                        fill: false,
                        tension: 0
                    },
                    {
                        label: 'Travellers',
                        backgroundColor: '#2980b9',
                        borderColor: '#2980b9',
                        borderWidth: 2,
                        data: travellerDataArray,
                        type: 'line',
                        fill: false,
                        borderDash: [10, 10]
                    },
                    {
                        label: 'Bookings',
                        backgroundColor: '#faab1a',
                        borderWidth: 1,
                        data: bookingDataArray
                    },
                ];
            }

        }
    },

    actions: {
        async fetchReports({ commit }, payload) {
            try {
                let q = []
                let { type, fromDate, toDate } = payload || {}
                if (type) q.push(`type=${type}`)
                if (fromDate) q.push(`fromDate=${fromDate}`)
                if (toDate) q.push(`toDate=${toDate}`)

                let qString = '';
                if (q.length > 0) qString = `?${q.join('&')}`

                const reports = await apiRequest.get(`report/sales${qString}`)
                commit('SET_REPORTS', reports.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },
    }
}
