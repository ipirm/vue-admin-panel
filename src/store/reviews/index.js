import apiRequest from '@/utils/apiRequest'
import $router from '@/router'

export default {
    namespaced: true,

    state: {
        reviews: [],
        filterReviews: [],
        reviewsMeta: {},
        queryParams: {},
    },

    getters: {
        reviews: state => state.reviews,
    },

    mutations: {
        SET_REVIEWS: (state, payload) => state.reviews = payload,
        SET_FILTER_REVIEWS: (state, {headers, data}) => {
            state.filterReviews = data;
            state.reviewsMeta = headers;
        },
    },

    actions: {
        async fetchReviews({ commit }) {
            try {
                const reviews = await apiRequest.get('reviews')
                commit('SET_REVIEWS', reviews.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },
        async respondToReview({ commit, dispatch }, payload) {
            try {
                const reviews = await apiRequest.post('reviews/response/'+ payload.id, {'text': payload.text})
                dispatch('getFilterReviews');
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Response',
                    text: `Response added successfully`
                }, { root: true })
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },
        getFilterReviews({ state, commit }, payload) {
            if(!payload){
                payload = state.queryParams;
            }
            state.queryParams = payload;
            commit('ui/SET_LOADING', true, { root: true })
            let { perPage, page, query, sort, dateFrom, dateTo, productId, rating } = payload || {}
            let q = []

            perPage = perPage || state.reviewsMeta['x-pagination-per-page']
            if (perPage && perPage !== 'All') q.push(`per-page=${perPage}`)

            if (page) q.push(`page=${page}`)
            if (sort) q.push(`sort=${sort}`)
            if (query) q.push(`query=${query}`)
            if (dateFrom) q.push(`dateFrom=${dateFrom}`)
            if (dateTo) q.push(`dateTo=${dateTo}`)
            if (productId) q.push(`productId=${productId}`)
            if (rating) q.push(`rating=${rating}`)
            q.push(`expand=product`)

            let qString = '';
            if (q.length > 0) qString = `?${q.join('&')}`

            return apiRequest.get(`reviews${qString}`)
                .then(({headers, data}) => {
                    commit('SET_FILTER_REVIEWS', {headers, data})
                    commit('ui/SET_LOADING', false, { root: true })

                    return Promise.resolve()
                }).catch(e => {
                    commit('ui/SET_LOADING', false, { root: true })
                    return Promise.reject()
                })
        },
    }
}
