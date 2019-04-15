import axios from 'axios'
import { api } from './constants'

axios.defaults.baseURL = api.BASE_URL
axios.defaults.timeout = 10000
axios.defaults.headers.common['Content-Type'] = 'application/json'
