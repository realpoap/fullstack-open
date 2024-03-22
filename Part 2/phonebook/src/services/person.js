import axios from 'axios'

const base_URL = '/api/persons'

const getAll = () => {
    const request = axios.get(base_URL)
    return request.then(res => res.data)
}

const create = newObject => {
    const request = axios.post(base_URL, newObject)
    return request.then(res => res.data)
}

const deleteEntry = (id) => {
    console.log('in delete entry personService, id:', id);
    const req = axios.delete(`${base_URL}/${id}`)
    return req.then(res => res.data)
}

const update = (id, newObject) => {
    const req = axios.put(`${base_URL}/${id}`,newObject)
    return req.then(res => res.data)
}

export default {getAll, create, deleteEntry, update}