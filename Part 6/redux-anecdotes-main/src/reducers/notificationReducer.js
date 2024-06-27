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

export const setNotification = (content, time) => {
	return async dispatch => {
		dispatch(changeNotification(`you voted '${content}'`))
		setTimeout(() => {
			dispatch(removeNotification())
		}, time * 1000
		)
	}
}

export default notificationSlice.reducer