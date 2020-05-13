import apiRequest from '@/utils/apiRequest'
import $router from '@/router'

export default {
    namespaced: true,

    state: {
        menu: {},
        menus: [],
        filterMenus: [],
        menusMeta: {},
        menusCore: [],
        menusTree: [],
    },

    getters: {
        menus: state => state.menus,
        getMenusCore: state => state.menusCore.map(item => item.title),
        menusCore: state => state.menusCore,
        menusTree: state => state.menusTree,
    },

    mutations: {
        SET_MENU: (state, payload) => state.menu = payload,
        SET_MENUS: (state, payload) => state.menus = payload,
        SET_MENUS_CORE: (state, payload) => {
            state.menusCore = payload
        },

        SET_FILTER_MENUS: (state, {headers, data}) => {
            state.menusMeta = headers
            state.filterMenus = data
        },
        SET_MENUS_TREE: (state, payload) => {
            state.menusTree = payload
        },
    },

    actions: {
        getFilterMenus({ state, commit }, payload) {
            commit('ui/SET_LOADING', true, { root: true })
            let { perPage, page, query, sort } = payload || {}
            let q = []

            perPage = perPage || state.menusMeta['x-pagination-per-page']
            if (perPage && perPage !== 'All') q.push(`per-page=${perPage}`)

            if (page) q.push(`page=${page}`)
            if (sort) q.push(`sort=${sort}`)
            if (query) q.push(`query=${query}`)

            let qString = '';
            if (q.length > 0) qString = `?${q.join('&')}`

            return apiRequest.get(`nav-menus${qString}`)
                .then(({headers, data}) => {
                    commit('SET_FILTER_MENUS', {headers, data})
                    commit('ui/SET_LOADING', false, { root: true })

                    return Promise.resolve()
                }).catch(e => {
                    commit('ui/SET_LOADING', false, { root: true })
                    return Promise.reject()
                })
        },

        async deleteMenu({ commit, dispatch }, id) {
            try {
                await apiRequest.delete(`nav-menus/${id}`).then(() => {
                    dispatch('getFilterMenus')
                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Nav menu successfully deleted!`
                    }, { root: true })
                })
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async fetchMenusCore({ commit }) {
            try {
                const menus = await apiRequest.get('nav-menus')
                commit('SET_MENUS_CORE', menus.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async createMenu({ commit, dispatch }, menu) {
            try {
                await apiRequest.post('nav-menus', menu)

                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: 'Menu successfully added!'
                }, { root: true })
                $router.push({name: 'menu-index'})
                dispatch('getFilterMenus')
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

        async getMenu({ commit }, id) {
            try {
                commit('ui/SET_LOADING', true, { root: true })
                const menu = await apiRequest.get(`nav-menus/${id}`)
                commit('ui/SET_LOADING', false, { root: true })
                commit('SET_MENU', menu.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async updateMenu({ commit, state }, body) {
            try {
                const { data } = await apiRequest.patch('nav-menus/' + state.menu.id, body)
                commit('SET_MENU', data)
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: `Menu successfully updated!`
                }, { root: true })
                $router.push({name: 'menu-index'})
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
