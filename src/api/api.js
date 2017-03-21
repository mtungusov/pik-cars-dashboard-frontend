import axios from 'axios'

export default {
  getTrackers: function() {
    return axios.post('http://dashboard-cars.dsk2.picompany.ru/api/v1/trackers')
  }
}
