import { createSlice, current } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: null,
	reducers: {
		setNotif(state, action) {
			const content = action.payload

			return content
		},
		clearNotif(state) {
			return null
		}
	}
})

export const { setNotif, clearNotif } = notificationSlice.actions

export default notificationSlice.reducer