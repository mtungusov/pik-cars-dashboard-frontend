import axios from 'axios'

const URL = 'http://dashboard-cars.dsk2.picompany.ru'
// const URL = 'http://localhost:3000'

export default {
  getTrackers: function() {
    return axios.post(URL + '/api/v1/trackers')
  },

  getZones: function() {
    return axios.get(URL + '/api/v1/zones')
  }
}
