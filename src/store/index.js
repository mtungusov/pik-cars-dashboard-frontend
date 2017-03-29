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
    ],
    zones: [
      {
        id: 1,
        label: 'Нет связи с сервером API !'
      }
    ]
  },
  mutations: {
    UPDATE_TRACKERS(state, trackers) {
      state.trackers = trackers
    },
    UPDATE_ZONES(state, zones) {
      state.zones = zones
      state.zones.push({ 'id': 0, 'label': 'ВНЕ ЗОН' })
    }
  },
  actions: {
    refresh({commit}) {
      API.getTrackers().then(response => commit('UPDATE_TRACKERS', response.data))
    },
    refresh_zones({commit}) {
      API.getZones().then(response => commit('UPDATE_ZONES', response.data))
    }
  }
})

export default store
