import apiRequest from '@/utils/apiRequest'
import $router from '@/router'

export default {
    namespaced: true,

    state: {
        city: {},
        cities: [],
        filterCities: [],
        citiesMeta: [],
        citiesCore: [],
        citiesTree: [],
        countryCities: []
    },

    getters: {
        cities: state => state.cities,
        getCitiesCore: state => state.citiesCore.map(item => item.slug),
        citiesCore: state => state.citiesCore,
        citiesTree: state => state.citiesTree,
        countryCities: state => state.countryCities,
    },

    mutations: {
        SET_CITY: (state, payload) => state.city = payload,
        SET_CITIES: (state, payload) => state.cities = payload,
        SET_CITIES_COUNTRY: (state, payload) => state.countryCities = payload,

        SET_CITIES_CORE: (state, payload) => {
            state.citiesCore = payload
        },
        SET_FILTER_CITIES: (state, {headers, data}) => {
            state.filterCities = data,
            state.citiesMeta = headers
        },
        SET_CITIES_TREE: (state, payload) => {
            state.citiesTree = payload
        },
    },

    actions: {
        getFilterCities({ state, commit }, payload) {
            commit('ui/SET_LOADING', true, { root: true })
            let { perPage, page, query, sort } = payload || {}
            let q = []

            perPage = perPage || state.citiesMeta['x-pagination-per-page']
            if (perPage && perPage !== 'All') q.push(`per-page=${perPage}`)

            if (page) q.push(`page=${page}`)
            if (sort) q.push(`sort=${sort}`)
            if (query) q.push(`query=${query}`)

            let qString = '';
            if (q.length > 0) qString = `?${q.join('&')}`

            return apiRequest.get(`cities${qString}`)
                .then(({headers, data}) => {
                    commit('SET_FILTER_CITIES', {headers, data})
                    commit('ui/SET_LOADING', false, { root: true })

                    return Promise.resolve()
                }).catch(e => {
                    commit('ui/SET_LOADING', false, { root: true })
                    return Promise.reject()
                })
        },

        async deleteCity({ commit, dispatch }, id) {
            try {
                await apiRequest.delete(`cities/${id}`).then(() => {
                    dispatch('getFilterCities')
                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `City successfully deleted!`
                    }, { root: true })
                })
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async fetchCitiesCore({ commit }) {
            try {
                const cities = await apiRequest.get('cities')
                commit('SET_CITIES_CORE', cities.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async getCountryCities({ commit }, id) {
            try {
                const cities = await apiRequest.get('cities?countryId=' + id +'&per-page=300&withSettedCoordinates=1')
                commit('SET_CITIES_COUNTRY', cities.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },



        async fetchCitiesTree({ commit, state }) {
            try {
                const citiesTree = await apiRequest.get('cities')
                commit('SET_CITIES_TREE', citiesTree.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async createCity({ commit, dispatch }, city) {
            try {
                await apiRequest.post('cities', city)

                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: 'City successfully added!'
                }, { root: true })
                $router.push({name: 'city-index'})
                dispatch('getFilterCities')
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

        async getCity({ commit }, id) {
            try {
                commit('ui/SET_LOADING', true, { root: true })
                const city = await apiRequest.get(`cities/${id}?expand=frontPageContent`)
                commit('ui/SET_LOADING', false, { root: true })
                commit('SET_CITY', city.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async updateCity({ commit, state }, body) {
            try {
                const { data } = await apiRequest.patch('cities/' + state.city.id, body)
                commit('SET_CITY', data)
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: `City successfully updated!`
                }, { root: true })
                $router.push({name: 'city-index'})
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
