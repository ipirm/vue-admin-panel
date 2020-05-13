import apiRequest from '@/utils/apiRequest'
import $router from '@/router'

export default {
    namespaced: true,

    state: {
        type: {},
        types: [],
        filterTypes: [],
        typesMeta: [],
        typesCore: [],
        categoriesList: [],
        categoriesValues: []
    },

    getters: {
        types: state => state.types,
        getTypesCore: state => state.typesCore.map(item => item.name),
        typesCore: state => state.typesCore,
        categoriesList: state => state.categoriesList,
        categoriesValues: state => state.categoriesValues,
    },

    mutations: {
        SET_TYPE: (state, payload) => state.type = payload,
        SET_TYPES: (state, payload) => state.types = payload,
        SET_TYPES_CORE: (state, payload) => {
            state.typesCore = payload
        },
        SET_FILTER_TYPES: (state, {headers, data}) => {
            state.filterTypes = data
        },
        SET_CATEGORIES: (state, payload) => {
            state.categoriesList = payload
        },
        SET_CATEGORIES_VALUES: (state, payload) => {
            state.categoriesValues = payload
        },

    },

    actions: {
        getFilterTypes({ state, commit }, payload) {

            commit('ui/SET_LOADING', true, { root: true })
            let { perPage, page, query, sort } = payload || {}
            let q = []

            perPage = perPage || state.categoriesMeta['x-pagination-per-page']
            if (perPage && perPage !== 'All') q.push(`per-page=${perPage}`)

            if (page) q.push(`page=${page}`)
            if (sort) q.push(`sort=${sort}`)
            if (query) q.push(`query=${query}`)

            let qString = '';
            if (q.length > 0) qString = `?${q.join('&')}`

            return apiRequest.get(`product-types${qString}`)
                .then(({headers, data}) => {
                    commit('SET_FILTER_TYPES', {headers, data})
                    commit('ui/SET_LOADING', false, { root: true })

                    return Promise.resolve()
                }).catch(e => {
                    commit('ui/SET_LOADING', false, { root: true })
                    return Promise.reject()
                })
        },

        async deleteType({ commit, dispatch }, id) {
            try {
                await apiRequest.delete(`product-types/${id}`).then(() => {
                    dispatch('getFilterTypes')
                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Type successfully delete!`
                    }, { root: true })
                })
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async fetchTypesCore({ commit }) {
            try {
                const types = await apiRequest.get('product-types')
                commit('SET_TYPES_CORE', types.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async createType({ commit, dispatch }, type) {
            try {
                await apiRequest.post('product-types', type)

                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: 'Type successfully added!'
                }, { root: true })
                dispatch('getFilterTypes')
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async getType({ commit }, id) {
            try {
                commit('ui/SET_LOADING', true, { root: true })
                const type = await apiRequest.get(`product-types/${id}`)
                commit('ui/SET_LOADING', false, { root: true })
                commit('SET_TYPE', type.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async updateType({ commit, state }, type) {
            try {
                const { data } = await apiRequest.patch('product-types/' + state.type.id, type)
                commit('SET_TYPE', data)
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: `Type successfully updated!`
                }, { root: true })
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async getCategoriesList({ commit }, id) {
            try {
                const categories = await apiRequest.get('product-types/' + id + '/categories')
                commit('SET_CATEGORIES', categories.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async getCategoriesValues({ commit }, id) {
            try {
                const categories = await apiRequest.get('product-types/' + id + '/categories-list')
                commit('SET_CATEGORIES_VALUES', categories.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async fetchTypesCore({ commit }) {
            try {
                const types = await apiRequest.get('categories-tree')
                commit('SET_TYPES_CORE', types.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async updateProductTypeCategories({ commit, state }, body) {
            try {
                const { data } = await apiRequest.patch('product-types/' + body.id + '/categories', { categoryIds: body.categories })
                commit('SET_TYPE', data)
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: `Type categories successfully updated!`
                }, { root: true })
                $router.push({name: 'type-index'})
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },


    }
}
