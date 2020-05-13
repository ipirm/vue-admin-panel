import apiRequest from '@/utils/apiRequest'
import $router from '@/router'

export default {
    namespaced: true,

    state: {
        category: {},
        categories: [],
        filterCategories: [],
        categoriesMeta: {},
        categoriesCore: [],
        categoriesTree: []
    },

    getters: {
        categories: state => state.categories,
        getCategoriesCore: state => state.categoriesCore.map(item => item.slug),
        categoriesCore: state => state.categoriesCore,
        categoriesTree: state => state.categoriesTree,
    },

    mutations: {
        SET_CATEGORY: (state, payload) => state.category = payload,
        SET_CATEGORIES: (state, payload) => state.categories = payload,
        SET_CATEGORIES_CORE: (state, payload) => {
            state.categoriesCore = payload
        },
        SET_FILTER_CATEGORIES: (state, {headers, data}) => {
            state.filterCategories = data;
            state.categoriesMeta = headers;
            console.log(headers);
        },
        SET_CATEGORIES_TREE: (state, payload) => {
            state.categoriesTree = payload
        },
    },

    actions: {
        getFilterCategories({ state, commit }, payload) {
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

            return apiRequest.get(`categories${qString}`)
                .then(({headers, data}) => {
                    commit('SET_FILTER_CATEGORIES', {headers, data})
                    commit('ui/SET_LOADING', false, { root: true })

                    return Promise.resolve()
                }).catch(e => {
                    commit('ui/SET_LOADING', false, { root: true })
                    return Promise.reject()
                })
        },

        async deleteCategory({ commit, dispatch }, id) {
            try {
                await apiRequest.delete(`categories/${id}`).then(() => {
                    dispatch('getFilterCategories')
                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Category successfully delete!`
                    }, { root: true })
                })
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async fetchCategoriesCore({ commit }) {
            try {
                const categories = await apiRequest.get('categories')
                commit('SET_CATEGORIES_CORE', categories.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async fetchCategoriesTree({ commit, state }) {
            try {
                const categoriesTree = await apiRequest.get('categories-tree')
                commit('SET_CATEGORIES_TREE', categoriesTree.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async createCategory({ commit, dispatch }, category) {
            try {
                await apiRequest.post('categories', category)

                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: 'Caretogory successfully added!'
                }, { root: true })
                $router.push({name: 'category-index'})
                dispatch('getFilterCategories')
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async getCategory({ commit }, id) {
            try {
                commit('ui/SET_LOADING', true, { root: true })
                const cat = await apiRequest.get(`categories/${id}`)
                commit('ui/SET_LOADING', false, { root: true })
                commit('SET_CATEGORY', cat.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async updateCategory({ commit, state }, user) {
            try {
                const { data } = await apiRequest.patch('categories/' + state.category.id, user)
                commit('SET_CATEGORY', data)
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: `Category successfully updated!`
                }, { root: true })
                $router.push({name: 'category-index'})
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

    }
}
