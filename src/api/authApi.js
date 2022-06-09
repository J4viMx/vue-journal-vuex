

import axios from 'axios'

const authApi = axios.create({
    baseURL: 'https://identitytoolkit.googleapis.com/v1/accounts',
    params:{
        key: 'AIzaSyB3Ovszh0nsA7gkzuHZgEJ3QOkMnHjbHyM' 
    }
})


export default authApi