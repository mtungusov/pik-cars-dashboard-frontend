import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

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
    ],
    groups: []
  },
  mutations: {
    UPDATE_TRACKERS(state, trackers) {
      state.trackers = trackers
    },
    UPDATE_ZONES(state, zones) {
      state.zones = zones
      state.zones.push({ 'id': 0, 'label': 'ВНЕ ЗОН' })
    },
    UPDATE_GROUPS(state, groups) {
      state.groups = groups
    }
  },
  actions: {
    refresh(context) {
      API.getTrackers().then(function(response) {
        context.commit('UPDATE_TRACKERS', response.data)

        var _trackers = context.state.trackers
        var _groups = _.reduce(_trackers, function (acc, item) {
          if (item.group && item.group.id > 0)
            acc.push({ 'id': item.group.id, 'title': item.group.title })
          return acc
        }, [])
  
        context.commit('UPDATE_GROUPS', _.sortBy(_.uniqWith(_groups, _.isEqual), ['title']))
      })
    },
    refresh_zones({commit}) {
      API.getZones().then(response => commit('UPDATE_ZONES', response.data))
    }
  }
})

export default store
