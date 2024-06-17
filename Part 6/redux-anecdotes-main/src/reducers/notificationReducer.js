import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: Notification,
	initialState: '',
	reducers: {
		changeNotification(state, action) {
			return state = action.payload
		},
		removeNotification(state) {
			return state = ''
		}
	}
})

export const { changeNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer