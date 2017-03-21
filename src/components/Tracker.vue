<template>
  <div class="tracker">
    <span class="tracker_label">{{ tracker.label }}</span><br>
    <div v-if="tracker.status">Статус: <span v-bind:class="statusColor">{{ stat_ru }}</span> <time-counter :changedAtTime="tracker.status.changed_at"></time-counter></div>
    <div v-if="tracker.zone && tracker.zone.label">Зона: {{ tracker.zone.label }} <time-counter :changedAtTime="tracker.zone.changed_at"></time-counter></div>
  </div>
</template>

<script>
import TimeCounter from './TimeCounter'
export default {
  name: 'tracker',
  components: { TimeCounter },
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
        case 'parked': return 'на парковке'
        default: return 'не ясно'
      }
    },
  },
  methods: {
    now: function () {
      return Date.now()
    }
  }
}
</script>

<style scoped>
  div.tracker {
    color: #aaa;
    background-color: rgba(50, 50, 50, 0.5);
    margin-bottom: 10px;
    padding: 10px;
  }
  span.tracker_label {
    font-weight: bold;
  }
  span.parked {
      color: white;
  }
  span.moving {
      color: darkgreen;
  }
  span.stopped {
      color: darkred;
  }

</style>
