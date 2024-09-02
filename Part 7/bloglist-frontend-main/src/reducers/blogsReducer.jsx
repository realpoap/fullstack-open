import { createSlice, current } from '@reduxjs/toolkit'
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
		},
		removeBlog(state, action) {
			state.filter(b => b.id !== action.payload.id)
		},
		replaceBlog(state, action) {
			state.map(b => b.id !== action.payload.id ? b : action.payload)
		}
	}
})

export const { setBlogs, appendBlog, replaceBlog, removeBlog } = blogSlice.actions

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

export const updateBlog = content => {
	return async dispatch => {
		const blog = await blogs
			.update(content.id, content)
		dispatch(replaceBlog(blog))
	}
}

export const deleteBlog = (content) => {
	return async dispatch => {
		console.log('content.id', content.id)
		const blog = await blogs.remove(content.id)
		dispatch(removeBlog(blog))
	}
}


export default blogSlice.reducer