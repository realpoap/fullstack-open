import { useState } from 'react'
import {
  Routes, Route, Link
} from 'react-router-dom'

import About from './component/About'
import Anecdote from './component/Anecdote'
import AnecdoteList from './component/AnecdoteList'
import CreateNew from './component/CreateNew'
import Footer from './component/Footer'


const App = () => {
  const [notification, setNotification] = useState('this is a notification')

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])



  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }




  const padding = {
    paddingRight: 5
  }

  return (
    <div>

      <h1>Software anecdotes</h1>

      <div><p>{notification}</p>
      </div>
      <div>
        <Link style={padding} to='/'>Home</Link>
        <Link style={padding} to='/create'>Create</Link>
        <Link style={padding} to='/about'>About</Link>
      </div>




      <Routes>
        <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes} />} />
        <Route path='/anecdotes' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/create' element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
        <Route path='/about' element={<About />} />
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
