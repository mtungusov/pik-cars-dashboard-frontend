<template>
  <div id="app">
    <table class="filter_buttons">
      <tr>
        <td>
          <div class="zone_buttons">
            <button v-if="!zoneSelector" @click="loadZones()">Выбрать геозоны</button>
            <button v-else @click="saveZonesIds()">Закрыть</button>
    
            <ul class="zones" v-if="zoneSelector">
              <li v-for="zone in zones()"><input type="checkbox" :id="'zone'+zone.id" :value="zone.id" v-model="filteredZoneIds"><label :for="'zone'+zone.id">{{ zone.label }}</label></li>
            </ul>
    
            <div class="selectedZones"><span v-for="zoneLabel in filteredZoneLabels">{{ zoneLabel }}</span></div>
          </div>
        </td>
        <td>
          <div class="group_buttons">
            <button v-if="!groupSelector" @click="loadGroups()">Выбрать группы транспорта</button>
            <button v-else @click="saveGroupsIds()">Закрыть</button>
  
            <ul class="groups" v-if="groupSelector">
              <li v-for="group in groups()"><input type="checkbox" :id="'group'+group.id" :value="group.id" v-model="filteredGroupIds"><label :for="'group'+group.id">{{ group.title }}</label></li>
            </ul>
  
            <div class="selectedGroups"><span v-for="groupTitle in filteredGroupLabels">{{ groupTitle }}</span></div>
          </div>
        </td>
      </tr>
    </table>
    
    <table class="tracker_info">
      <tr>
        <th class="tracker_label">Автомобиль</th>
        <th class="tracker_">Статус</th>
        <th class="tracker_">Интервал</th>
        <th class="tracker_">Геозона</th>
        <th class="tracker_">Время в зоне</th>
        <th class="tracker_">Въезд</th>
      </tr>
      <tracker v-for="tracker in trackers()" :key="tracker.id" :tracker="tracker"></tracker>
    </table>
  </div>
</template>

<script>
import _ from 'lodash'
import store from './store'
import Tracker from './components/Tracker'

const UPDATE_INTERVAL = 30
export default {
  name: 'app',
  components: { Tracker },
  data: function() {
    return {
      filteredZoneIds: [],
      zoneSelector: false,
      groupSelector: false,
      filteredGroupIds: []
    }
  },
  store,
  computed: {
    filteredZoneLabels: function () {
      var _zones = this.$store.state.zones
      var result = _.map(_.filter(_zones, o => { return _.includes(this.filteredZoneIds, o.id) }), (zone)=>{ return zone.label })
      return _.join(result, ', ')
    },
    filteredGroupLabels: function () {
      var _groups = this.$store.state.groups
      var result = _.map(_.filter(_groups, o => { return _.includes(this.filteredGroupIds, o.id) }), (group)=>{ return group.title })
      return _.join(result, ', ')
    }
  },
  methods: {
    trackers: function () {
      var _trackers = this.$store.state.trackers
      var _filteredZoneIds = this.filteredZoneIds
      var _filteredGroupIds = this.filteredGroupIds
      if (_.size(_filteredZoneIds) == 0 && _.size(_filteredGroupIds) == 0) {
        return _trackers
      }
      let filter_by_zones = (list, obj) => {
        if (obj.zone) {
          return _.includes(list, obj.zone.id)
        }
      }
      let filter_by_groups = (list, obj) => {
        if (obj.group) {
          return _.includes(list, obj.group.id)
        }
      }
      if (_.size(_filteredZoneIds) > 0) {
        var _result = _.filter(_trackers, function(o) { return filter_by_zones(_filteredZoneIds, o) })
        if (_.size(_filteredGroupIds) > 0) {
          return _.filter(_result, function(o) { return filter_by_groups(_filteredGroupIds, o) })
        }
        else {
          return _result
        }
      }
      else {
        return _.filter(_trackers, function(o) { return filter_by_groups(_filteredGroupIds, o) })
      }
    },
    zones: function () {
      return this.$store.state.zones
    },
    groups: function () {
      return this.$store.state.groups
    },
//    loadZones: function () {
//      var _trackers = this.$store.state.trackers
//      var _filteredIds = this.filteredZoneIds
//      var _zones = _.reduce(_trackers, function (acc, item) {
//        if (item.zone && item.zone.id > 0)
////          var _selected = _.includes(_filteredIds, item.zone.id)
////          acc.push({ 'id': item.zone.id, 'label': item.zone.label, 'selected': _selected })
//          acc.push({ 'id': item.zone.id, 'label': item.zone.label })
//        return acc
//      }, [])
//      this.zones = _.sortBy(_.uniqWith(_zones, _.isEqual), ['label'])
//      this.zones.push({ 'id': 0, 'label': 'ВНЕ ЗОН' })
//      this.zoneSelector = true
//    },
    loadZones: function () {
      this.$store.dispatch('refresh_zones')
      this.zoneSelector = true
    },
    saveZonesIds: function () {
      localStorage.setItem('filteredZoneIds', JSON.stringify(this.filteredZoneIds))
      this.zoneSelector = false
    },
    loadGroups: function () {
      this.groupSelector = true
    },
    saveGroupsIds: function () {
      localStorage.setItem('filteredGroupIds', JSON.stringify(this.filteredGroupIds))
      this.groupSelector = false
    }
  },
  mounted() {
    this.$store.dispatch('refresh')
    this.$store.dispatch('refresh_zones')
    var _filteredZoneIds = localStorage.getItem('filteredZoneIds')
    if (_filteredZoneIds) { this.filteredZoneIds = JSON.parse(_filteredZoneIds) }
    var _filteredGroupIds = localStorage.getItem('filteredGroupIds')
    if (_filteredGroupIds) { this.filteredGroupIds = JSON.parse(_filteredGroupIds) }
    setInterval(() => { this.$store.dispatch('refresh') }, UPDATE_INTERVAL*1000)
  }
}
</script>

<style lang="scss">
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  body {
    background-color: black;
    display: block;
    margin: 0 auto;
  }
  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    width: 940px;
    margin: 0 auto;
  }
  
  table.filter_buttons {
    width: 100%;
    vertical-align: text-top;
    
    td {
      width: 50%;
      /*text-align: center;*/
      vertical-align: top;
      background-color: black;
      padding: 5px 10px 5px 0;
      
      button {
        background-color: #333333;
        border: none;
        color: white;
        display: inline-block;
        font-size: 16px;
        padding: 5px 10px;
        width: 70%;
    
        &:focus {
          outline: none;
        }
      }
    }
  }
  
  
  
  ul.zones, ul.groups {
    list-style-type: none;
    margin: 0;
    padding: 0;
    
    li {
      color: #aaaaaa;
      margin: 5px 0;
    }
  }
  
  .selectedZones, .selectedGroups {
    color: #cccccc;
    font-size: 12px;
    font-style: italic;
    margin: 10px 0;
  }

  table.tracker_info {
    margin: 0;
    padding: 0;
    border: none;
    width: 100%;
    
    th {
      color: white;
      font-weight: bold;
      height: 3em;
      background-color: #333;
      
      &.tracker_label {
        /*min-width: 534px;*/
      }
    }
  
  }
  
</style>
