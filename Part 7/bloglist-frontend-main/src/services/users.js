import axios from 'axios'

const getAll = () => {
	const request = axios.get('/api/users')
	return request.then(res => res.data)
}

export default { getAll }