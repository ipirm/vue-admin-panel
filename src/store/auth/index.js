import apiRequest from '@/utils/apiRequest'
import $router from '@/router'

export default {
  namespaced: true,

  state: {
    item: {},
    itemMeta: {},
    itemErrors: {},
    itemLoading: false
  },

  getters: {
    isAdmin: state => state.item.role === 'admin',
    isManager: state => state.item.role === 'manager',
    accessAllowed: (state, getters) => getters.isAdmin || getters.isManager
  },

  mutations: {
    SET_ITEM(state, { headers, data }) {
      state.item = data
      state.itemMeta = headers
    },
    SET_AUTH_DATA: (state, payload) => state.auth = payload
  },

  actions: {
    async login ({ dispatch, commit }, user) {
      try {
        commit('ui/SET_LOADING', true, { root: true })

        const { data } = await apiRequest.post('customer/login', user)
        dispatch('setAuthData', data)
        $router.push({ path: '/dashboard' })
        commit('ui/SET_LOADING', false, { root: true })
      } catch (e) {
        commit('ui/SET_ITEM_ERRORS', e, { root: true })
        commit('ui/SET_LOADING', false, { root: true })
      }
    },

    async logout ({ dispatch }) {
      try {
        await apiRequest.post('customer/logout', {token: localStorage.getItem('refreshToken')})
        dispatch('resetProfile')
        $router.push({name: 'login'})
      } catch (e) { console.log(e) }
    },

    forgotPassword ({ commit }, data) {
      return apiRequest.post('customer/request-password-reset', data)
        .then(() => {
          return Promise.resolve()
        })
        .catch(e => Promise.reject(e))
    },

    getProfile ({ commit, getters, state, dispatch, rootState }) {
      return apiRequest.get('customer')
        .then(({headers, data}) => {
          commit('SET_ITEM', {headers, data})
          localStorage.setItem('userRole', data.role)
        })

        .then(() => {
          const domain = document.domain.split('.')[0]

          if (getters.isManager && domain == 'admin') {
            $router.push('/access-denied')
          }

          if(getters.accessAllowed) return;
          $router.push('/access-denied')
        })
          
        .then(() => {
          if(getters.isManager) {
            const firmId = 1; // rootState.users.item.operator_id;
            return dispatch('getFirm', { id: firmId }, { root: true })
          }
        })

        .catch(e => {
          dispatch('resetProfile');
          console.log(e, "CUSTOMER ERROR");
        })
    },

    async resetPassword ({ commit }, data) {
      try {
        commit('ui/SET_LOADING', true, { root: true })
        await apiRequest.post('customer/reset-password', data)
        $router.push({ path: '/auth/login' })
        commit('ui/SET_LOADING', false, { root: true })
        commit('ui/PUSH_NOTIFY', {
          type: 'success',
          group: 'alert',
          title: 'Success!',
          text: `Password updated successfully!`
        }, { root: true })
      } catch(e) {
        commit('ui/SET_ITEM_ERRORS', e, { root: true })
        commit('ui/SET_LOADING', false, { root: true })
      }
    },

    resetProfile () {
      // Reset LocalStorage auth data
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('expiresIn')
      localStorage.removeItem('userRole')
    },

    setAuthData ({ commit }, auth) {
      // Set LocalStorage auth data
      localStorage.setItem('expiresIn', auth.expires_in)
      localStorage.setItem('accessToken', auth.access_token)
      localStorage.setItem('refreshToken', auth.refresh_token)
    }
  }
}
