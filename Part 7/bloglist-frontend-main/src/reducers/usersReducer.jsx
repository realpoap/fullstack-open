import { createSlice } from '@reduxjs/toolkit'

const userSlice = createSlice({
	name: 'users',
	initialState: null,
	reducers: {
		saveUser(state, action) {
			return action.payload
		},
		forgetUser(state, action) {
			return null
		}
	}
})

export const { saveUser, forgetUser } = userSlice.actions

export default userSlice.reducer