const initialState = ''

const filtereducer = (state = initialState, action) => {
	switch (action.type) {
		case 'CHANGE': {
			console.log(action.payload)
			return state = action.payload
		}
		default: return state
	}
}

export const changeFilter = (content) => {
	return {
		type: 'CHANGE',
		payload: content
	}
}

export default filtereducer