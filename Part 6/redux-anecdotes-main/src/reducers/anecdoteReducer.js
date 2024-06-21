import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdoteService"

// const getId = () => (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const object = action.payload
      console.log('object', object);
      return state.map(n => n.id !== object.id ? n : object)
    }
  },
})

export const { appendAnecdote, setAnecdote, updateAnecdote } = anecdoteSlice.actions

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

export const voteForAnecdote = (id) => {
  return async dispatch => {
    // console.log('id', id)
    // const anecdoteToChange = await anecdoteService.getById(id)
    // console.log('anecdoteToChange:', anecdoteToChange)
    // const changedAnecdote = {
    //   ...anecdoteToChange, votes: anecdoteToChange.votes + 1
    // }
    // console.log('changedAnecdote:', changedAnecdote)
    // const updatedAnecdote = await anecdoteService.updateAnecdote(id, changedAnecdote)
    // dispatch(updateAnecdote(updatedAnecdote))

    const changedAnecdote = await anecdoteService
      .getById(id)
      .then((anecdote) => {
        const newAnecdote = {
          ...anecdote, votes: anecdote.votes + 1
        }
        return newAnecdote
      })

    console.log('changedAnecdote:', changedAnecdote)
    await anecdoteService
      .updateAnecdote(id, changedAnecdote)
      .then(anecdote => dispatch(updateAnecdote(anecdote)))

  }
}

// export const updateAnecdote = createAsyncThunk('anecdotes/updateAnecdote', async (id, object) => {
//   console.log('object in thunk', object)
//   const response = await anecdoteService.updateAnecdote(id, object)
//   return response.data
// },
// )

export default anecdoteSlice.reducer

