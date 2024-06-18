import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdoteService'
import { setAnecdote } from './reducers/anecdoteReducer'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService
      .getAll().then(anecdotes => dispatch(setAnecdote(anecdotes)))
  }, [])

  return (
    <div>
      <Filter />
      <h2>Anecdotes</h2>
      {useSelector(state => state.notification) !== '' && <Notification />}
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App