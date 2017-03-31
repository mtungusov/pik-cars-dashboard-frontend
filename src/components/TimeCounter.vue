<template>
  <span>{{ toString() }}</span>
</template>

<script>
  const UPDATE_INTERVAL = 10

  export default {
    name: 'time-counter',
    props: ['fromTime'],
    data() {
      return {
        now: Math.trunc(Date.now() / 1000)
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
</style>
