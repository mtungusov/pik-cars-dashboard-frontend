import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import API from '../api/api'

const store = new Vuex.Store({
  state: {
    trackers: [
      {
        id: 1,
        label: 'Нет связи с сервером API !',
        status_label: '',
        zone_label: ''
      },
    ]
  },
  mutations: {
    UPDATE_TRACKERS(state, trackers) {
      state.trackers = trackers
    }
  },
  actions: {
    refresh({commit}) {
      API.getTrackers().then(response => commit('UPDATE_TRACKERS', response.data))
    }
  }
})

export default store
