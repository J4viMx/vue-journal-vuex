

import axios from 'axios'

const journalApi = axios.create({
    baseURL: 'https://vue-demos-20026-default-rtdb.firebaseio.com'
})


export default journalApi