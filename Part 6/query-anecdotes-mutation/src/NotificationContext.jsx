import { useContext, createContext, useReducer } from "react";

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SET':
			return state = action.payload
		case 'RESET':
			return state = ''
		default:
			return state
	}
}

export const NotifContext = createContext()

export const NotifContextProvider = (props) => {
	const [notif, notifDispatch] = useReducer(notificationReducer, '')
	return (
		<NotifContext.Provider value={[notif, notifDispatch]}>
			{props.children}
		</NotifContext.Provider>
	)
}

export default NotifContext