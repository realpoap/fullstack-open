import { createSlice } from '@reduxjs/toolkit'
import blogs from '../services/blogs'

const blogSlice = createSlice({
	name: 'blogs',
	initialState: [],
	reducers: {
		setBlogs(state, action) {
			return action.payload
		},
		appendBlog(state, action) {
			state.push(action.payload)
		}
	},
})

export const { setBlogs, appendBlog } = blogSlice.actions

// ACTIONS CREATORS
export const initializeBlogs = () => {
	return async dispatch => {
		const iniBlogs = await blogs.getAll()
		dispatch(setBlogs(iniBlogs))
	}
}

export const createBlog = content => {
	return async dispatch => {
		const blog = await blogs.create(content)
		dispatch(appendBlog(blog))
	}
}

export default blogSlice.reducer