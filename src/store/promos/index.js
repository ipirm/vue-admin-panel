import apiRequest from '@/utils/apiRequest'
import $router from '@/router'

export default {
    namespaced: true,

    state: {
        promo: {},
        promos: [],
        filterPromos: [],
        promosMeta: {},
        promosCore: [],
        promosTree: [],
        promoTypes: [],
        tours: [],
        toursCore: [],
    },

    getters: {
        promos: state => state.promos,
        getPromosCore: state => state.promosCore.map(item => item.slug),
        promosCore: state => state.promosCore,
        promosTree: state => state.promosTree,
    },

    mutations: {
        SET_PROMO: (state, payload) => state.promo = payload,
        SET_PROMOS: (state, payload) => state.promos = payload,
        SET_PROMOS_CORE: (state, payload) => {
            state.promosCore = payload
        },

        SET_FILTER_PROMOS: (state, {headers, data}) => {

            state.promosMeta = headers
            state.filterPromos = data
        },
        SET_PROMOS_TREE: (state, payload) => {
            state.promosTree = payload
        },
        SET_PROMO_TYPES: (state, payload) => {
            state.promoTypes = payload
        },
        SET_PROMO_TOURS: (state, payload) => {
            state.tours = payload.map(item => item.name)
            state.toursCore = payload
        }
    },

    actions: {
        getFilterPromos({ state, commit }, payload) {
            commit('ui/SET_LOADING', true, { root: true })
            let { perPage, page, query, sort, productId } = payload || {}
            let q = []

            perPage = perPage || state.promosMeta['x-pagination-per-page']
            if (perPage && perPage !== 'All') q.push(`per-page=${perPage}`)

            if (page) q.push(`page=${page}`)
            if (sort) q.push(`sort=${sort}`)
            if (query) q.push(`query=${query}`)
            if (productId) q.push(`productId=${productId}`)

            q.push(`expand=product.minPrice`)

            let qString = '';
            if (q.length > 0) qString = `?${q.join('&')}`

            return apiRequest.get(`product-discounts${qString}`)
                .then(({headers, data}) => {
                    commit('SET_FILTER_PROMOS', {headers, data})
                    commit('ui/SET_LOADING', false, { root: true })

                    return Promise.resolve()
                }).catch(e => {
                    commit('ui/SET_LOADING', false, { root: true })
                    return Promise.reject()
                })
        },

        async deletePromo({ commit, dispatch }, id) {
            try {
                await apiRequest.delete(`product-discounts/${id}`).then(() => {
                    dispatch('getFilterPromos')
                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Product discont page successfully deleted!`
                    }, { root: true })
                })
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async fetchPromosCore({ commit }) {
            try {
                const promos = await apiRequest.get('product-discounts')
                commit('SET_PROMOS_CORE', promos.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async createPromo({ commit, dispatch }, promo) {
            try {
                await apiRequest.post('product-discounts', promo)

                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: 'Product discont successfully added!'
                }, { root: true })
                dispatch('getFilterPromos')
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
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async getPromo({ commit }, id) {
            try {
                commit('ui/SET_LOADING', true, { root: true })
                const promo = await apiRequest.get(`product-discounts/${id}`)
                commit('ui/SET_LOADING', false, { root: true })
                commit('SET_PROMO', promo.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async getPromoTypes({ commit }, id) {
            try {
                const promo = await apiRequest.get(`product-discounts/value-types`)
                commit('SET_PROMO_TYPES', promo.data)
            } catch (e) {
                commit('SET_PROMO_TYPES', [])
            }
        },

        async getTours({ commit }, id) {
            try {
                const tours = await apiRequest.get(`products?status[]=active&status[]=inactive&expand=minPrice`)
                commit('SET_PROMO_TOURS', tours.data)
            } catch (e) {
                commit('SET_PROMO_TOURS', [])
            }
        },

        async notifyPromos({ commit }, message) {
            try {
                commit('ui/PUSH_NOTIFY', {
                    type: 'error',
                    group: 'alert',
                    title: 'Promotion',
                    text: message
                }, { root: true })
            } catch (e) {
            }
        },

        async updatePromo({ commit, state, dispatch }, body) {
            try {
                const { data } = await apiRequest.patch('product-discounts/' + body.id, body)
                commit('SET_PROMO', data)
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: `Discont successfully updated!`
                }, { root: true })
                dispatch('getFilterPromos')
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
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

    }
}
