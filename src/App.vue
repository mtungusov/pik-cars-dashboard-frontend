<template>
  <div id="app">
    <tracker v-for="tracker in trackers" :key="tracker.id" :tracker="tracker"></tracker>
  </div>
</template>

<script>
import API from './api/api'
import Tracker from './components/Tracker'

export default {
  name: 'app',
  components: { Tracker },
  data: () => {
    return {
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
    }
  },
  mounted() {
    API.getTrackers().then(response => this.trackers = response.data)
  }
}
</script>

<style>
  body {
    background-color: black;
  }
  #app {
    font-family: Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    margin-top: 20px;
  }
</style>
