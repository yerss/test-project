import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    userEntries: []
  },
  getters: {
    getUserInfo: state => state.userInfo,
    getUserEntries: state => state.userEntries,
  },
  mutations: {
    setUserInfo(state, data) {
      state.userInfo = data
    },
    setUserEntries(state, data) {
      state.userEntries = data
    },
  },
  actions: {
    addUserInfo({commit}, data) {
      // api request
      commit('setUserInfo', data)
    },
    addUserEntries({commit}, data) {
      // api request
      commit('setUserEntries', data)
    }
  },
  modules: {
  }
})
