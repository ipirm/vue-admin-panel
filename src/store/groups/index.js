import apiRequest from '@/utils/apiRequest'
import $router from '@/router'

export default {
    namespaced: true,

    state: {
        group: {},
        groups: [],
        filterGroups: [],
        groupsMeta: [],
        groupsCore: [],
        groupsTree: []
    },

    getters: {
        groups: state => state.groups,
        getGroupsCore: state => state.groupsCore.map(item => item.slug),
        groupsCore: state => state.groupsCore,
        groupsTree: state => state.groupsTree,
    },

    mutations: {
        SET_GROUP: (state, payload) => state.group = payload,
        SET_GROUPS: (state, payload) => state.groups = payload,
        SET_GROUPS_CORE: (state, payload) => {
            state.groupsCore = payload
        },
        SET_FILTER_GROUPS: (state, {headers, data}) => {
            state.filterGroups = data
        },
        SET_GROUPS_TREE: (state, payload) => {
            state.groupsTree = payload
        },
    },

    actions: {
        getFilterGroups({ state, commit }, payload) {
            commit('ui/SET_LOADING', true, { root: true })
            let { perPage, page, query, sort } = payload || {}
            let q = []

            perPage = perPage || state.groupsMeta['x-pagination-per-page']
            if (perPage && perPage !== 'All') q.push(`per-page=${perPage}`)

            if (page) q.push(`page=${page}`)
            if (sort) q.push(`sort=${sort}`)
            if (query) q.push(`query=${query}`)

            let qString = '';
            if (q.length > 0) qString = `?${q.join('&')}`

            return apiRequest.get(`group-of-countries${qString}`)
                .then(({headers, data}) => {
                    commit('SET_FILTER_GROUPS', {headers, data})
                    commit('ui/SET_LOADING', false, { root: true })

                    return Promise.resolve()
                }).catch(e => {
                    commit('ui/SET_LOADING', false, { root: true })
                    return Promise.reject()
                })
        },

        async deleteGroup({ commit, dispatch }, id) {
            try {
                await apiRequest.delete(`group-of-countries/${id}`).then(() => {
                    dispatch('getFilterGroups')
                    commit('ui/PUSH_NOTIFY', {
                        type: 'success',
                        group: 'alert',
                        title: 'Success!',
                        text: `Group successfully deleted!`
                    }, { root: true })
                })
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async fetchGroupsCore({ commit }) {
            try {
                const groups = await apiRequest.get('group-of-countries')
                commit('SET_GROUPS_CORE', groups.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async fetchGroupsTree({ commit, state }) {
            try {
                const groupsTree = await apiRequest.get('group-of-countries')
                commit('SET_GROUPS_TREE', groupsTree.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async createGroup({ commit, dispatch }, group) {
            try {
                await apiRequest.post('group-of-countries', group)

                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: 'Caretogory successfully added!'
                }, { root: true })
                $router.push({name: 'group-index'})
                dispatch('getFilterGroups')
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

        async getGroup({ commit }, id) {
            try {
                commit('ui/SET_LOADING', true, { root: true })
                const group = await apiRequest.get(`group-of-countries/${id}?expand=frontPageContent`)
                commit('ui/SET_LOADING', false, { root: true })
                commit('SET_GROUP', group.data)
            } catch (e) {
                commit('ui/SET_ITEM_ERRORS', e, { root: true })
            }
        },

        async updateGroup({ commit, state }, body) {
            try {
                const { data } = await apiRequest.patch('group-of-countries/' + state.group.id, body)
                commit('SET_GROUP', data)
                commit('ui/PUSH_NOTIFY', {
                    type: 'success',
                    group: 'alert',
                    title: 'Success!',
                    text: `Group successfully updated!`
                }, { root: true })
                $router.push({name: 'group-index'})
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
