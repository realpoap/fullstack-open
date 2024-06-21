import axios from "axios";

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const createNew = async (content) => {
	const object = { content, votes: 0 }

	const response = await axios.post(baseUrl, object)
	return response.data
}

const getById = async (id) => {
	const response = await axios.get(`${baseUrl}/${id}`)
	return response.data
}

const updateAnecdote = async (id, object) => {
	console.log('url:', `${baseUrl}/${id}`)
	console.log('object', object);
	const response = await axios.put(`${baseUrl}/${id}`, object)
	return response.data
}

export default { getAll, createNew, getById, updateAnecdote }