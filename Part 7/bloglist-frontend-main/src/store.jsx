import { configureStore } from '@reduxjs/toolkit'

// import reducer
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
	reducer: {
		notification: notificationReducer,
		blogs: blogsReducer,
		users: usersReducer,
	},
})

export default store