import axios from 'axios'

const requestFeed = page => axios.get(`profile/?user_id=71&page=${page || 1}`)

export default {
  requestFeed,
}
