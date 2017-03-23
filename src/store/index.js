import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import API from '../api/api'

const store = new Vuex.Store({
  state: {
    trackers: [
      {
        id: 1,
        label: 'Тягач №1',
        status_label: 'moving',
        zone_label: 'ОЗЖБК'
      },
      {
        id: 2,
        label: 'Тягач №2',
        status_label: 'stopped',
        zone_label: 'ОЗЖБК'
      },
      {
        id: 3,
        label: 'Тягач №3',
        status_label: '',
        zone_label: ''
      },
      {
        id: 3,
        label: 'Тягач №4',
        status_label: 'parked',
        zone_label: ''
      }
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
