import axios from 'axios'

const base_URL = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(base_URL)
    return request.then(res => res.data)
}

const create = newObject => {
    const request = axios.post(base_URL, newObject)
    return request.then(res => res.data)
}


export default {getAll, create}