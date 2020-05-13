import apiRequest from '@/utils/apiRequest'

export default {
  namespaced: true,

  state: {
    user: {},
    users: [],
    filterUsers: [],
    usersMeta: {},
    userRole: ''
  },

  getters: {
    users: state => state.users
  },

  mutations: {
    SET_USER: (state, payload) => state.user = payload,
    SET_USERS: (state, payload) => state.users = payload,
    SET_USER_ROLE: (state, payload) => state.userRole = payload,
    SET_FILTER_USERS: (state, {headers, data}) => {
      state.filterUsers = data
      state.usersMeta = headers
    }
  },

  actions: {
    async createUser({ commit, dispatch }, user) {
      try {
        await apiRequest.post('users', user)
        commit('ui/PUSH_NOTIFY', {
          type: 'success',
          group: 'alert',
          title: 'Success!',
          text: `${user.role !== 'customer' ? user.role[0].toUpperCase() + user.role.slice(1) : 'Traveller'} successfully added!`
        }, { root: true })
        dispatch('getFilterOperators')
      } catch (e) {
        commit('ui/SET_ITEM_ERRORS', e, { root: true })
      }
    },

    async updateUser({ commit, state }, user) {
      try {
        const { data } = await apiRequest.patch('users/' + state.user.id, user)
        commit('SET_USER', data)
        commit('ui/PUSH_NOTIFY', {
          type: 'success',
          group: 'alert',
          title: 'Success!',
          text: `User successfully update!`
        }, { root: true })
      } catch (e) {
        commit('ui/SET_ITEM_ERRORS', e, { root: true })
      }
    },

    async getUser({ commit }, id) {
      try {
        commit('ui/SET_LOADING', true, { root: true })
        const user = await apiRequest.get(`users/${id}`)
        commit('SET_USER_ROLE', user.data.role)
        commit('ui/SET_LOADING', false, { root: true })
        commit('SET_USER', user.data)
      } catch (e) {
        commit('ui/SET_ITEM_ERRORS', e, { root: true })
      }
    },

    async getUsers({ commit }) {
      try {
        const users = await apiRequest.get('users')
        commit('SET_USERS', users.data)
      } catch (e) {
        commit('ui/SET_ITEM_ERRORS', e, { root: true })
      }
    },

    getFilterUsers({ state, commit }, payload) {
      commit('ui/SET_LOADING', true, { root: true })
      let { perPage, page, query, sort } = payload || {}
      let q = []

      perPage = perPage || state.usersMeta['x-pagination-per-page']
      if (perPage && perPage !== 'All') q.push(`per-page=${perPage}`)

      if (page) q.push(`page=${page}`)
      if (sort) q.push(`sort=${sort}`)
      if (query) q.push(`query=${query}`)

      let qString = '';
      if (q.length > 0) qString = `?${q.join('&')}`

      return apiRequest.get(`users${qString}`)
        .then(({headers, data}) => {
          commit('SET_FILTER_USERS', {headers, data})
          commit('ui/SET_LOADING', false, { root: true })

          return Promise.resolve()
        }).catch(e => {
          commit('ui/SET_LOADING', false, { root: true })
          return Promise.reject()
        })
    },
    
    async deleteUser({ commit, dispatch }, id) {
      try {
        await apiRequest.delete(`users/${id}`).then(() => {
          dispatch('getFilterUsers')
          commit('ui/PUSH_NOTIFY', {
            type: 'success',
            group: 'alert',
            title: 'Success!',
            text: `User successfully delete!`
          }, { root: true })
        })
      } catch (e) {
        commit('ui/SET_ITEM_ERRORS', e, { root: true })
      }
    }
  }
}
