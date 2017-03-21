<template>
  <span v-bind:class="statusColor">{{ toString() }}</span>
</template>

<script>
  export default {
    name: 'time-counter',
    props: ['changedAtTime'],
    computed: {
      statusColor: function () {
        let _time = this.changedAtTime
        let timeDiff = (Date.now()/1000 - _time)/60
        switch (true) {
          case (timeDiff > 60): return 'gt60'
          case (timeDiff > 40): return 'gt40'
          default: return ''
        }
      }
    },
    methods: {
      toString: function () {
        let pad = (i) => { return ("0" + i).substr(-2) }
        let _time = this.changedAtTime
        let timeDiff = Date.now()/1000 - _time
        let days = Math.floor(timeDiff/(3600*24))
        let hours = Math.floor((timeDiff % (3600*24))/3600)
        let minutes = pad(Math.floor(((timeDiff % (3600*24))%3600)/60)) + 'мин.'
        let result = hours > 0 ? pad(hours) + 'ч:' + minutes : minutes
        return days > 0 ? pad(days) + 'д.:' + result : result
      }
    }
  }
</script>

<style scoped>
  span {
    color: black;
    background-color: white;
  }
  .gt40 {
    color: black;
    background-color: yellow;
  }
  .gt60 {
    color: white;
    background-color: darkred;
  }
</style>
