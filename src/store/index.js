import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import ui from './ui'
import tours from './tours'
import users from './users'
import operators from './operators'
import categories from './categories'
import types from './types'
import settings from './settings'
import childs from './childs'
import groups from './groups'
import countries from './countries'
import cities from './cities'
import texts from './texts'
import bookings from './bookings'
import reviews from './reviews'
import menus from './menus'
import promos from './promos'
import reports from './reports'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { auth, ui, tours, users, operators, categories, types, settings, childs, groups, countries, cities, texts, bookings, reviews, menus, promos, reports }
})