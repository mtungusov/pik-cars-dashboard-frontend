import axios from 'axios'

export default {
  getTrackers: function() {
    return axios.post('http://dashboard-cars.dsk2.picompany.ru/api/v1/trackers')
    // return axios.post('http://localhost:3000/api/v1/trackers')
  },

  getZones: function() {
    return axios.get('http://dashboard-cars.dsk2.picompany.ru/api/v1/zones')
  }
}
