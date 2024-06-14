const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',

]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE': {
      const id = action.payload.id
      const noteToChange = state.find(n => n.id === id)
      const changedNote = {
        ...noteToChange, votes: noteToChange.votes + 1
      }
      return state.map(n => n.id !== id ? n : changedNote)
    }
    case 'NEW_NOTE': {
      const noteToAdd = action.payload
      return state.concat(noteToAdd)
    }
    default: return state
  }

}

export const voteFor = (id) => {
  return {
    type: 'VOTE',
    payload: { id }
  }
}

export const addAnecdote = (content) => {
  return {
    type: 'NEW_NOTE',
    payload: {
      content,
      id: getId(),
      votes: 0
    }
  }
}

export default reducer