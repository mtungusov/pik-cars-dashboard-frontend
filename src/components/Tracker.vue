<template>
  <tr class="tracker">
    <td class="tracker_label">{{ tracker.label }}</td>
    <td class="tracker_status" v-if="tracker.status"><span v-bind:class="statusColor">{{ stat_ru }}</span><div v-if="tracker.zone && tracker.zone.label && tracker.zone.event_type == 'outzone'">Выезд из {{ tracker.zone.label }}<br>в {{ showDate }}</div></td><td v-else>-</td><td class="tracker_" v-if="tracker.status"><time-counter v-if="tracker.status.connection === 'active'" :fromTime="tracker.status.changed_at"></time-counter></td><td v-else>-</td>
    <td class="tracker_" v-if="tracker.zone && tracker.zone.label && tracker.zone.event_type == 'inzone'">{{ tracker.zone.label }}</td><td v-else>-</td>
    <td class="tracker_" v-if="tracker.zone && tracker.zone.label && tracker.zone.event_type == 'inzone'"><time-counter-color :fromTime="tracker.zone.changed_at"></time-counter-color></td><td v-else>-</td>
    <td class="tracker_" v-if="tracker.zone && tracker.zone.label && tracker.zone.event_type == 'inzone'"><span class="inzonedate">{{ showDate }}</span></td><td v-else>-</td>
  </tr>
</template>

<script>
import TimeCounter from './TimeCounter'
import TimeCounterColor from './TimeCounterColor'

export default {
  name: 'tracker',
  components: { TimeCounter, TimeCounterColor },
  props: ['tracker'],
  computed: {
    statusColor: function() {
      if (this.tracker.status)
        if (this.tracker.status.connection === 'active') {
          return this.tracker.status.label
        } else {
          return this.tracker.status.connection
        }
      else
        return 'unknown'
    },
    stat_ru: function() {
      if (!this.tracker.status)
        return 'не ясно'
      var _conn = this.tracker.status.connection
      var _st = this.tracker.status.label
      if (_conn === 'active') {
        switch (_st) {
          case 'moving': return 'движ.'
          case 'stopped': return 'стоит'
          case 'parked': return 'стоит'
          default: return 'не ясно'
        }
      }
      else {
        switch (_conn) {
          case 'offline': return 'выкл.'
          case 'signal_lost': return 'нет сигнала'
          case 'blocked': return 'заблокирован'
          default: return 'не ясно'
        }
      }
    },
    showDate: function () {
      let pad = (i) => { return ("0" + i).substr(-2) }
      var date = new Date(this.tracker.zone.changed_at * 1000)
      var y = pad(date.getFullYear())
      var m = pad(date.getMonth() + 1)
      var d =pad(date.getDate())
      var h = pad(date.getHours())
      var minutes = pad(date.getMinutes())
//      return y + '-' + m + '-' + d + ' ' + h + ':' + minutes
      return d + '.' + m + '.' + y +  ' ' + h + ':' + minutes
    }
  },
  methods: {
    now: function () {
      return Date.now()
    }
  }
}
</script>

<style lang="scss" scoped>
  td {
    padding: 5px 10px;
  }
  .tracker {
    color: black;
    background-color: white;
  }
  .tracker_label {
    color: #333;
    margin: 0;
  }
  span {
    &.offline, &.signal_lost {
      color: yellow;
      background-color: black;
    }
    &.parked {
        color: darkred;
    }
    &.moving {
      color: darkgreen;
    }
    &.stopped {
      color: indianred;
    }
    &.inzonedate {
      color: black;
    }
  }
  .tracker_status div {
    font-size: 90%;
  }

</style>
