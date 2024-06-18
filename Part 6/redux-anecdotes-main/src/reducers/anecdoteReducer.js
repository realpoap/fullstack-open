import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

// const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const id = action.payload
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange, votes: noteToChange.votes + 1
      }
      return state.map(n => n.id !== id ? n : changedNote)

    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  }
})

export const { voteFor, addAnecdote, appendAnecdote, setAnecdote } = anecdoteSlice.actions

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(anecdote))
  }
}


export default anecdoteSlice.reducer



// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'VOTE': {
//       const id = action.payload.id
//       const noteToChange = state.find(n => n.id === id)
//       const changedNote = {
//         ...noteToChange, votes: noteToChange.votes + 1
//       }
//       return state.map(n => n.id !== id ? n : changedNote)
//     }
//     case 'NEW_NOTE': {
//       const noteToAdd = action.payload
//       return state.concat(noteToAdd)
//     }
//     default: return state
//   }

// }

// export const voteFor = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }

// export const addAnecdote = (content) => {
//   return {
//     type: 'NEW_NOTE',
//     payload: {
//       content,
//       id: getId(),
//       votes: 0
//     }
//   }
// }

// export default reducer