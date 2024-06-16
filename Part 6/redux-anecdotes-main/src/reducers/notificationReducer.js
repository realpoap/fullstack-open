import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
	name: Notification,
	initialState: '',
	reducers: {
		changeNotification(state, action) {
			return state = action.payload
		}
	}
})

export const { changeNotification } = notificationSlice.actions
export default notificationSlice.reducer