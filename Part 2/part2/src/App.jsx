import { useState, useEffect } from "react"
import axios from 'axios'
import Note from "./components/Note"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote ] = useState('')
  const [showAll, setShowAll] = useState(true)

  //server import
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(res => {
        console.log('promise fulfilled')
        setNotes(res.data)
      })
  }, [])
  console.log('render', notes.length, 'notes');

  const addNote = (e) => {
    e.preventDefault()
    console.log('button clicked:', e.target);
    const noteObject = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5,
    }
    setNotes(notes.concat(noteObject))
    setNewNote('')
  }

  const handleNoteChange = (e) => {
    console.log(e.target.value);
    setNewNote(e.target.value)
  }

  const notesToShow = showAll ? 
    notes : notes.filter(note => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <div>
      <button onClick={() => setShowAll(!showAll)}>
        Show {showAll ? 'important' : 'all'}
      </button>
      </div>
      <ul>        
        {notesToShow.map(note => 
          <Note key={note.id} note={note} />
        )}      
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange}/>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default App