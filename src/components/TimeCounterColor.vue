<template>
  <span v-bind:class="statusColor">{{ toString() }}</span>
</template>

<script>
  const UPDATE_INTERVAL = 10
  
  export default {
    name: 'time-counter-color',
    props: ['fromTime'],
    data() {
      return {
        now: Math.trunc(Date.now() / 1000)
      }
    },
    computed: {
      statusColor: function () {
        let _time = this.fromTime
        let timeDiff = (this.now - _time)/60
        switch (true) {
          case (timeDiff > 120): return 'gt120'
          case (timeDiff > 60): return 'gt60'
          default: return ''
        }
      }
    },
    methods: {
      toString: function () {
        let pad = (i) => { return ("0" + i).substr(-2) }
        let _time = this.fromTime
        let timeDiff = this.now - _time
        let days = Math.floor(timeDiff/(3600*24))
        let hours = Math.floor((timeDiff % (3600*24))/3600)
        let minutes = pad(Math.floor(((timeDiff % (3600*24))%3600)/60))
        let result = hours > 0 ? pad(hours) + ':' + minutes : '00:' + minutes
        return days > 0 ? pad(days) + 'д.' + result : result
      }
    },
    mounted() {
      setInterval(() => { this.now = Math.trunc(Date.now() / 1000) }, UPDATE_INTERVAL * 1000)
    }
  }
</script>

<style lang="scss" scoped>
  span {
    color: black;
    
    &.gt60 {
      color: black;
      background-color: yellow;
    }
    &.gt120 {
      color: white;
      background-color: darkred;
    }
  }
</style>
