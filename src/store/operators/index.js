import apiRequest from '@/utils/apiRequest'

export default {
  namespaced: true,

  state: {
    operators: [],
    operator: {},
    filterOperators: [],
    operatorsMeta: {}
  },

  getters: {
    getCompanies: state => state.operators.map(item => item.name),
    getIdOperator: state => state.operator.id,
    operators: state => state.operators,
    operator: state => state.operator,
  },

  mutations: {
    SET_OPERATORS: (state, operators) => state.operators = operators,
    SET_OPERATOR: (state, operator) => state.operator = operator,
    SET_FILTER_OPERATORS: (state, {headers, data}) => {
      state.filterOperators = data
      state.operatorsMeta = headers
    }
  },

  actions: {
    async createOperator({ commit, dispatch }, payload) {
      try {
        await apiRequest.post(`operators`, payload)
        commit('ui/PUSH_NOTIFY', {
          type: 'success',
          group: 'alert',
          title: 'Success!',
          text: `Operator successfully add!`
        }, { root: true })
        dispatch('getFilterOperators')
      } catch (e) {
        console.log(e)
      }
    },

    async getOperators({ commit }) {
      try {
        const operators = await apiRequest.get('operators')
        commit('SET_OPERATORS', operators.data)
      } catch (e) {
        console.log(e)
      }
    },

    async updateOperator({ commit, getters, dispatch }, operator) {
      const id = getters.getIdOperator
      try {
        const { data } = await apiRequest.patch('operators/' + id, operator)
        commit('SET_OPERATOR', data)
        commit('ui/PUSH_NOTIFY', {
          type: 'success',
          group: 'alert',
          title: 'Success!',
          text: `Operator successfully update!`
        }, { root: true })
        const expand = 'contactData,webSocialNetworks,companyProfile,i18n,tourGroup,notificationEmails,booking,finance';
        dispatch('getOperator', {id, expand}).then(() => Promise.resolve())
      } catch (e) {
        console.log(e)
      }
    },

    async getOperator({ commit }, {id, expand}) {
      commit('ui/SET_LOADING', true, { root: true })

      try {
        let q = []
        if (expand) q.push(`expand=${expand}`)
  
        let qString = ''
        if (q.length > 0) qString = `?${q.join('&')}`
        
        const operator = await apiRequest.get(`operators/${id}${qString}`)
        commit('SET_OPERATOR', operator.data)
        commit('ui/SET_LOADING', false, { root: true })
      } catch (e) {
        commit('ui/SET_LOADING', false, { root: true })
        console.log(e)
      }
    },

    getFilterOperators({ state, commit }, payload) {
      commit('ui/SET_LOADING', true, { root: true })
      let { perPage, page, query, expand, sort } = payload || {}
      let q = []

      perPage = perPage || state.operatorsMeta['x-pagination-per-page']
      if (perPage && perPage !== 'All') q.push(`per-page=${perPage}`)

      if (page) q.push(`page=${page}`)
      if (sort) q.push(`sort=${sort}`)
      if (query) q.push(`query=${query}`)
      if (expand) q.push(`expand=${expand}`)

      let qString = ''
      if (q.length > 0) qString = `?${q.join('&')}`

      return apiRequest.get(`operators${qString}`)
        .then(({headers, data}) => {
          commit('SET_FILTER_OPERATORS', {headers, data})
          commit('ui/SET_LOADING', false, { root: true })
          return Promise.resolve()
        }).catch(e => {
          commit('ui/SET_LOADING', false, { root: true })
          return Promise.reject()
        })
    },

    async deleteOperator({ commit, dispatch }, id) {
      try {
        await apiRequest.delete(`operators/${id}`).then(() => {
          dispatch('getFilterOperators')
          commit('ui/PUSH_NOTIFY', {
            type: 'success',
            group: 'alert',
            title: 'Success!',
            text: `Operator successfully delete!`
          }, { root: true })
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
