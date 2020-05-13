import apiRequest from '@/utils/apiRequest'
import Vue from 'vue'

export default {
  namespaced: true,

  state: {
    phoneIndexes: [],
    loading: false,
    queue: [],
    max: 5,
    currency: [],
    itemErrors: {},
    itemsErrors: {}
  },

  mutations: {
    SET_PHONE_INDEXES: (state, payload) => state.phoneIndexes = payload,
    SET_LOADING: (state, payload) => state.loading = payload,
    SET_CURRENCY: (state, payload) => state.currency = payload,
    RESET_ITEM_ERRORS: (state) => state.itemErrors = [],
    PUSH_NOTIFY: (state, notification) => {
      state.queue.push(notification)

      if (state.queue.length > state.max) {
        state.queue.shift()
      }
    },
    SET_ITEM_ERRORS(state, errors) {
      state.loading = false
      state.itemErrors = errors
    },
    RESET_ITEM_ERROR: (state, property, propertyChild) => {
      state.itemErrors = []
    }
  },

  actions: {
    async getPhoneIndexes({ state, commit }) {
      if (state.phoneIndexes.length) return

      try {
        let { data } = await apiRequest.get('country/international-calling-codes')
        commit('SET_PHONE_INDEXES', data)
      } catch (e) { console.log(e) }
    },
    async getCurrency({ commit }) {
      try {
        const currency = await apiRequest.getPublic('currencies')
        commit('SET_CURRENCY', currency.data)
      } catch (e) { console.log(e) }
    }
  }
}
