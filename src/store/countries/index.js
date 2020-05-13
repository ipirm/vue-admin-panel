import apiRequest from '@/utils/apiRequest'
import $router from '@/router'

export default {
    namespaced: true,

    state: {
        country: {},
        countries: [],
        filterCountries: [],
        countriesMeta: [],
        countriesCore: [],
        countriesTree: [],
        codes: [],
        tourCountries: []
    },

    getters: {
        countries: state => state.countries,
        getCountriesCore: state => state.countriesCore.map(item => item.slug),
        countriesCore: state => state.countriesCore,
        countriesTree: state => state.countriesTree,
        codes: state => state.codes,
        tourCountries: state => state.tourCountries,
    },

    mutations: {
        SET_COUNTRY: (state, payload) => state.country = payload,
        SET_COUNTRIES: (state, payload) => state.countries = payload,
        SET_COUNTRIES_TOUR: (state, payload) => state.tourCountries = payload,

        SET_COUNTRIES_CORE: (state, payload) => {
            state.countriesCore = payload
        },
        SET_COUNTRIES_CODES: (state, payload) => {
            state.codes = payload
        },
        SET_FILTER_COUNTRIES: (state, {headers, data}) => {
            state.filterCountries = data
            state.countriesMeta = headers
        },
        SET_COUNTRIES_TREE: (state, payload) => {
            state.countriesTree = payload
        },
    },

    actions: {
        getFilterCountries({ state, commit }, payload) {
            commit('ui/SET_LOADING', true, { root: true })
            let { perPage, page, query, sort } = payload || {}
            let q = []

            perPage = perPage || state.countriesMeta['x-pagination-per-page']
            if (perPage && perPage !== 'All') q.push(`per-page=${perPage}`)

            if (page) q.push(`page=${page}`)
            if (sort) q.push(`sort=${sort}`)
            if (query) q.push(`query=${query}`)

            let qString = '';
            if (q.length > 0) qString = `?${q.join('&')}`

            return apiRequest.get(`countries${qString}`)
                .then(({headers, data}) => {
                    commit('SET_FILTER_COUNTRIES', {headers, data})
                    commit('ui/SET_LOADING', false, { root: true })

                    return Promise.resolve()
                }).catch(e => {
                    commit('ui/SET_LOADING', false, { root: true })
                    return Promise.reject()
                })
        },

        async deleteCountry({ commit, dispatch }, id) {
            try {
                await apiRequest.delete(`countries/${id}`).then(() => {
                    dispatch('getFilterCountries')
                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Country successfully deleted!`
                    }, { root: true })
                })
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async fetchCountriesCore({ commit }) {
            try {
                const countries = await apiRequest.get('countries?per-page=300')
                console.log(countries, "Countries");

                commit('SET_COUNTRIES_CORE', countries.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },
        async getTourCountries({ commit }) {
            try {
                const countries = await apiRequest.get('countries?per-page=300')

                commit('SET_COUNTRIES_TOUR', countries.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },


        async fetchCountriesCodes({ commit }) {
            try {
                const codes = await apiRequest.get('country/international-calling-codes')
                commit('SET_COUNTRIES_CODES', codes.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async fetchCountriesTree({ commit, state }) {
            try {
                const countriesTree = await apiRequest.get('countries')
                commit('SET_COUNTRIES_TREE', countriesTree.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async createCountry({ commit, dispatch }, country) {
            try {
                await apiRequest.post('countries', country)

                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: 'Caretogory successfully added!'
                }, { root: true })
                $router.push({name: 'country-index'})
                dispatch('getFilterCountries')
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

        async getCountry({ commit }, id) {
            try {
                commit('ui/SET_LOADING', true, { root: true })
                const country = await apiRequest.get(`countries/${id}?expand=frontPageContent`)
                commit('ui/SET_LOADING', false, { root: true })
                commit('SET_COUNTRY', country.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async updateCountry({ commit, state }, body) {
            try {
                const { data } = await apiRequest.patch('countries/' + state.country.id, body)
                commit('SET_COUNTRY', data)
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: `Country successfully updated!`
                }, { root: true })
                $router.push({name: 'country-index'})
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
