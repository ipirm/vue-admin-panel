import apiRequest from '@/utils/apiRequest'
import $router from '@/router'

export default {
    namespaced: true,

    state: {
        setting: {},
        settings: [],
        filterSettings: [],
        settingsMeta: [],
        settingsCore: [],
        categoriesList: [],
        categoriesValues: []
    },

    getters: {
        settings: state => state.settings,
        categoriesList: state => state.categoriesList,
        getSettingsCore: state => state.settingsCore.map(item => item.name),
        settingsCore: state => state.settingsCore,
        categoriesValues: state => state.categoriesValues,
    },

    mutations: {
        SET_SETTING: (state, payload) => state.setting = payload,
        SET_SETTINGS: (state, payload) => state.settings = payload,
        SET_CATEGORIES: (state, payload) => {
            state.categoriesList = payload
        },
        SET_SETTINGS_CORE: (state, payload) => {
            state.settingsCore = payload
        },
        SET_FILTER_SETTINGS: (state, {headers, data}) => {
            state.filterSettings = data
        },
        SET_CATEGORIES_VALUES: (state, payload) => {
            state.categoriesValues = payload
        },
    },

    actions: {
        getFilterSettings({ state, commit }, payload) {

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

            return apiRequest.get(`product-setting-types${qString}`)
                .then(({headers, data}) => {
                    commit('SET_FILTER_SETTINGS', {headers, data})
                    commit('ui/SET_LOADING', false, { root: true })

                    return Promise.resolve()
                }).catch(e => {
                    commit('ui/SET_LOADING', false, { root: true })
                    return Promise.reject()
                })
        },

        async deleteSetting({ commit, dispatch }, id) {
            try {
                await apiRequest.delete(`product-setting-types/${id}`).then(() => {
                    dispatch('getFilterSettings')
                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Setting successfully delete!`
                    }, { root: true })
                })
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async fetchSettingsCore({ commit }) {
            try {
                const settings = await apiRequest.get('product-setting-types')
                commit('SET_SETTINGS_CORE', settings.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async createSetting({ commit, dispatch }, setting) {
            try {
                await apiRequest.post('product-setting-types', setting)

                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: 'Setting successfully added!'
                }, { root: true })
                dispatch('getFilterSettings')
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async getSetting({ commit }, id) {
            try {
                commit('ui/SET_LOADING', true, { root: true })
                const setting = await apiRequest.get(`product-setting-types/${id}`)
                commit('ui/SET_LOADING', false, { root: true })
                commit('SET_SETTING', setting.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async updateSetting({ commit, state }, setting) {
            try {
                const { data } = await apiRequest.patch('product-setting-types/' + state.setting.id, setting)
                commit('SET_SETTING', data)
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: `Setting successfully updated!`
                }, { root: true })
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async updateCategories({ commit, state }, categories) {
            try {
                const { data } = await apiRequest.patch('product-setting-types/' + state.setting.id + '/categories', categories)
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: `Setting categories successfully updated!`
                }, { root: true })
                $router.push({name: 'setting-index'})
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async getCategoriesList({ commit }, id) {
            try {
                const categories = await apiRequest.get('product-setting-types/' + id + '/categories')
                commit('SET_CATEGORIES', categories.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async getCategoriesValues({ commit }, id) {
            try {
                const categories = await apiRequest.get('product-setting-types/' + id + '/categories-list')
                commit('SET_CATEGORIES_VALUES', categories.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

    }
}
