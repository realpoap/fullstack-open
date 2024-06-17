import { useSelector } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {


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