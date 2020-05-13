import apiRequest from '@/utils/apiRequest'
import $router from '@/router'

export default {
    namespaced: true,

    state: {
        bookings: [],
        filterBookings: [],
        bookingsMeta: {},
        queryParams: {}
    },

    getters: {
        bookings: state => state.bookings,
    },

    mutations: {
        SET_BOOKINGS: (state, payload) => state.bookings = payload,
        SET_FILTER_BOOKINGS: (state, {headers, data}) => {
            state.filterBookings = data;
            state.bookingsMeta = headers;
        },
    },

    actions: {
        async fetchBookings({ commit }) {
            try {
                const bookings = await apiRequest.get('bookings')
                commit('SET_BOOKINGS', bookings.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },
        getFilterBookings({ state, commit }, payload) {
            if(!payload){
                payload = state.queryParams;
            }
            state.queryParams = payload;
            commit('ui/SET_LOADING', true, { root: true })
            let { perPage, page, query, sort, travelDate, productId, travelDateFrom, travelDateTo } = payload || {}
            let q = []

            perPage = perPage || state.categoriesMeta['x-pagination-per-page']
            if (perPage && perPage !== 'All') q.push(`per-page=${perPage}`)

            if (page) q.push(`page=${page}`)
            if (query) q.push(`query=${query}`)
            if (travelDate) q.push(`travelDate=${travelDate}`)
            if (productId) q.push(`leaderNameOrCode=${productId}`)
            if (travelDateFrom) q.push(`travelDateFrom=${travelDateFrom}`)
            if (travelDateTo) q.push(`travelDateTo=${travelDateTo}`)
            if (travelDate) q.push(`travelDate=${travelDate}`)
            q.push(`sort=-created_at`)
            q.push(`paymentWasMade=1`)

            let qString = '';
            if (q.length > 0) qString = `?${q.join('&')}`

            return apiRequest.get(`bookings${qString}`)
                .then(({headers, data}) => {
                    commit('SET_FILTER_BOOKINGS', {headers, data})
                    commit('ui/SET_LOADING', false, { root: true })

                    return Promise.resolve()
                }).catch(e => {
                    commit('ui/SET_LOADING', false, { root: true })
                    return Promise.reject()
                })
        },
        async fetchConfirmBooking({ commit, dispatch }, id){
            try {
                console.log("WHAAAT??");
                const confirmed = await apiRequest.post('bookings/confirm/' + id)
                dispatch('getFilterBookings');
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Booking!',
                    text: `Booking has been confirmed!`
                }, { root: true })
                // commit('SET_BOOKINGS', bookings.data)
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        },
        async fetchDeclineBooking({ commit, dispatch }, id){
            try {
                console.log("WHAAAT??");
                const declined = await apiRequest.post('bookings/decline/' + id)
                dispatch('getFilterBookings');
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Booking!',
                    text: `Booking has been declined!`
                }, { root: true })
                // commit('SET_BOOKINGS', bookings.data)
            } catch (e) {
                for (let key in e) {
                    if (e.hasOwnProperty(key)) {
                        e[key].forEach(function (element, index) {

                            commit('ui/PUSH_NOTIFY', {
                                type: 'error',
                                group: 'alert',
                                title: 'Tours',
                                text: element
                            }, { root: true })

                        });
                    }
                }
            }
        }
    }
}
