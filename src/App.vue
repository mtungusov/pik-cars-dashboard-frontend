<template>
  <div id="app">
    <div class="zone_buttons">
      <button v-if="!zoneSelector" @click="loadZones()">Выбрать геозоны</button>
      <button v-else @click="saveZonesIds()">Закрыть</button>
    
      <ul class="zones" v-if="zoneSelector">
        <li v-for="zone in zones()"><input type="checkbox" :id="'zone'+zone.id" :value="zone.id" v-model="filteredZoneIds"><label :for="'zone'+zone.id">{{ zone.label }}</label></li>
      </ul>
    
      <div class="selectedZones"><span v-for="zoneLabel in filteredZoneLabels">{{ zoneLabel }}</span></div>
    </div>
    
    <table class="tracker_info">
      <tr>
        <th>Автомобиль</th>
        <th>Статус</th>
        <th>Геозона</th>
      </tr>
      <!--<tr v-for="tracker in trackers">-->
        <!--<td colspan="3">{{ tracker.label }}</td>-->
      <!--</tr>-->
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
//      zones: [],
      zoneSelector: false
    }
  },
  store,
  computed: {
    filteredZoneLabels: function () {
      var _zones = this.$store.state.zones
      var result = _.map(_.filter(_zones, o => { return _.includes(this.filteredZoneIds, o.id) }), (zone)=>{ return zone.label })
      return _.join(result, ', ')
    }
  },
  methods: {
    trackers: function () {
      var _trackers = this.$store.state.trackers
      var _filteredZoneIds = this.filteredZoneIds
      if (_.size(_filteredZoneIds) > 0) {
        let my_filter = (list, obj) => {
          if (obj.zone) {
            return _.includes(list, obj.zone.id)
          }
        }
        return _.filter(_trackers, function(o) { return my_filter(_filteredZoneIds, o) })
      }
      else
        return _trackers
    },
    zones: function () {
      return this.$store.state.zones
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
    }
  },
  mounted() {
    this.$store.dispatch('refresh_zones')
    this.$store.dispatch('refresh')
    var _filteredZoneIds = localStorage.getItem('filteredZoneIds')
    if (_filteredZoneIds) { this.filteredZoneIds = JSON.parse(_filteredZoneIds) }
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
    width: 860px;
    margin: 0 auto;
    /*margin-top: 20px;*/
    /*margin: 10px auto;*/
    /*display: flex;*/
    /*flex-direction: column;*/
    /*border: 1px solid red;*/
  }
  button {
    background-color: #333333;
    border: none;
    color: white;
    display: inline-block;
    font-size: 16px;
    padding: 5px 10px;
    
    &:focus {
      outline: none;
    }
  }
  
  ul.zones {
    list-style-type: none;
    margin: 0;
    padding: 0;
    
    li {
      color: #aaaaaa;
      margin: 5px 0;
    }
  }
  
  .selectedZones {
    color: #cccccc;
    font-size: 12px;
    font-style: italic;
    margin: 10px 0;
  }
  
  .tracker_info {
    margin: 0;
    padding: 0;
    border: none;
    
    th {
      color: white;
      font-weight: bold;
      height: 3em;
      background-color: #333;
    }
  
  }
  
  .zone_buttons {
    margin: 5px 2px;
  }

</style>
