import axios from 'axios'
import storage from './storage'

const getConfig = () => ({
	headers: { Authorization: `Bearer ${storage.loadUser().token}` }
})

const baseUrl = 'http://localhost:3003/api/blogs'

export const getBlogs = () =>
	axios
		.get(baseUrl)
		.then(res => res.data)

export const createBlog = async (newBlog) => {
	//console.log(newBlog)
	await axios
		.post(baseUrl, newBlog, getConfig())
		.then(res => res.data)
}

export const updateBlog = async (newBlog) => {
	//console.log(newBlog)
	console.log('id:', newBlog.id)

	await axios
		.put(`${baseUrl}/${newBlog.id}`, newBlog, getConfig())
		.then(res => res.data)
}

export const deleteBlog = async (blog) => {
	await axios
		.delete(`${baseUrl}/${blog.id}`, getConfig())
		.then(res => res.data)
}