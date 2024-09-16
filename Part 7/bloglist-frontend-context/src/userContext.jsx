import { createContext, useReducer } from 'react'
import storage from './services/storage'

const userReducer = (state, action) => {
	switch (action.type) {
		case 'SET':
			console.log('SETTING user: ', action.user)
			storage.saveUser(action.user)
			return action.user
		case 'REMOVE':
			console.log('REMOVING user')
			storage.removeUser()
			return null
		default:
			return state
	}
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
	const [user, userDispatch] = useReducer(userReducer, null)
	return (
		<UserContext.Provider value={[user, userDispatch]}>
			{props.children}
		</UserContext.Provider>
	)
}

export default UserContext