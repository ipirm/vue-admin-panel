import apiRequest from '@/utils/apiRequest'
import $router from '@/router'

export default {
    namespaced: true,

    state: {
        text: {},
        texts: [],
        filterTexts: [],
        textsMeta: [],
        textsCore: [],
        textsTree: [],
        languagesCore: []
    },

    getters: {
        texts: state => state.texts,
        getTextsCore: state => state.textsCore.map(item => item.slug),
        getLanguagesCore: state => state.languagesCore.map(item => item.name),
        languagesCore: state => state.languagesCore,
        textsCore: state => state.textsCore,
        textsTree: state => state.textsTree,
    },

    mutations: {
        SET_TEXT: (state, payload) => state.text = payload,
        SET_TEXTS: (state, payload) => state.texts = payload,
        SET_TEXTS_CORE: (state, payload) => {
            state.textsCore = payload
        },
        SET_LANGUAGES_CORE: (state, payload) => {
            state.languagesCore = payload
        },

        SET_FILTER_TEXTS: (state, {headers, data}) => {
            state.textsMeta = headers
            state.filterTexts = data
        },
        SET_TEXTS_TREE: (state, payload) => {
            state.textsTree = payload
        },
    },

    actions: {
        getFilterTexts({ state, commit }, payload) {
            commit('ui/SET_LOADING', true, { root: true })
            let { perPage, page, query, sort } = payload || {}
            let q = []

            perPage = perPage || state.textsMeta['x-pagination-per-page']
            if (perPage && perPage !== 'All') q.push(`per-page=${perPage}`)

            if (page) q.push(`page=${page}`)
            if (sort) q.push(`sort=${sort}`)
            if (query) q.push(`query=${query}`)

            let qString = '';
            if (q.length > 0) qString = `?${q.join('&')}`

            return apiRequest.get(`text-pages${qString}`)
                .then(({headers, data}) => {
                    commit('SET_FILTER_TEXTS', {headers, data})
                    commit('ui/SET_LOADING', false, { root: true })

                    return Promise.resolve()
                }).catch(e => {
                    commit('ui/SET_LOADING', false, { root: true })
                    return Promise.reject()
                })
        },

        async deleteText({ commit, dispatch }, id) {
            try {
                await apiRequest.delete(`text-pages/${id}`).then(() => {
                    dispatch('getFilterTexts')
                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Text page successfully deleted!`
                    }, { root: true })
                })
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async fetchTextsCore({ commit }) {
            try {
                const texts = await apiRequest.get('text-pages')
                commit('SET_TEXTS_CORE', texts.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async fetchLanguagesCore({ commit }) {
            try {
                const languages = await apiRequest.get('languages')
                commit('SET_LANGUAGES_CORE', languages.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async fetchTextsTree({ commit, state }) {
            try {
                const textsTree = await apiRequest.get('text-pages')
                commit('SET_TEXTS_TREE', textsTree.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async createText({ commit, dispatch }, text) {
            try {
                await apiRequest.post('text-pages', text)

                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: 'Caretogory successfully added!'
                }, { root: true })
                $router.push({name: 'text-index'})
                dispatch('getFilterTexts')
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

        async getText({ commit }, id) {
            try {
                commit('ui/SET_LOADING', true, { root: true })
                const text = await apiRequest.get(`text-pages/${id}`)
                commit('ui/SET_LOADING', false, { root: true })
                commit('SET_TEXT', text.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async updateText({ commit, state }, body) {
            try {
                const { data } = await apiRequest.post('text-pages/' + state.text.id, body)
                commit('SET_TEXT', data)
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: `Text successfully updated!`
                }, { root: true })
                $router.push({name: 'text-index'})
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
