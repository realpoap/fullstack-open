import { createSlice, current } from "@reduxjs/toolkit"

const filterSlice = createSlice({
	name: 'filter',
	initialState: '',
	reducers: {
		changeFilter(state, action) {
			return state = action.payload
		}
	}
})

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer

// const filtereducer = (state = initialState, action) => {
// 	switch (action.type) {
// 		case 'CHANGE': {
// 			console.log(action.payload)
// 			return state = action.payload
// 		}
// 		default: return state
// 	}
// }

// export const changeFilter = (content) => {
// 	return {
// 		type: 'CHANGE',
// 		payload: content
// 	}
// }

// export default filtereducer