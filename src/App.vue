<template>
  <div id="app">
    <table>
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
import store from './store'
import Tracker from './components/Tracker'

const UPDATE_INTERVAL = 30
export default {
  name: 'app',
  components: { Tracker },
  store,
  methods: {
    trackers: function () {
      return this.$store.state.trackers
    }
  },
  mounted() {
    this.$store.dispatch('refresh')
    setInterval(() => { this.$store.dispatch('refresh') }, UPDATE_INTERVAL*1000)
  }
}
</script>

<style>
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
  th {
    color: white;
    font-weight: bold;
    height: 3em;
    background-color: #333;
  }

</style>
