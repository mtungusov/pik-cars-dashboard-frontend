<template>
  <tr class="tracker">
    <td class="tracker_label">{{ tracker.label }}</td>
    <td class="tracker_status" v-if="tracker.status"><span v-bind:class="statusColor">{{ stat_ru }}</span><br><time-counter :fromTime="tracker.status.changed_at"></time-counter></td><td v-else>-</td>
    <td class="tracker_zone" v-if="tracker.zone && tracker.zone.label">{{ tracker.zone.label }}<br><time-counter-color :fromTime="tracker.zone.changed_at"></time-counter-color><br><span class="inzonedate">Въезд: {{ showDate }}</span></td><td v-else>-</td>
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
        return this.tracker.status.label
      else
        return 'unknown'
    },
    stat_ru: function() {
      if (!this.tracker.status)
        return 'не ясно'
      var _st = this.tracker.status.label
      switch (_st) {
        case 'moving': return 'движется'
        case 'stopped': return 'стоит'
        case 'parked': return 'стоит'
        default: return 'не ясно'
      }
    },
    showDate: function () {
      let pad = (i) => { return ("0" + i).substr(-2) }
      var date = new Date(this.tracker.zone.changed_at * 1000)
      var y = date.getFullYear()
      var m = pad(date.getMonth() + 1)
      var d =pad(date.getDate())
      var h = pad(date.getHours())
      var minutes = pad(date.getMinutes())
      return y + '-' + m + '-' + d + ' ' + h + ':' + minutes
    }
  },
  methods: {
    now: function () {
      return Date.now()
    }
  }
}
</script>

<style scoped>
  td {
    padding: 5px 10px;
  }
  .tracker {
    color: #aaa;
    background-color: rgba(50, 50, 50, 0.5);
  }
  .tracker_label {
    color: #ccc;
    /*font-weight: bold;*/
    margin: 0;
  }
  span.parked {
      color: darkred;
  }
  span.moving {
    color: darkgreen;
  }
  span.stopped {
    color: indianred;
  }
  span.inzonedate {
    color: aqua;
  }

</style>
