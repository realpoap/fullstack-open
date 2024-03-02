import { useState, useEffect } from "react"
import axios from 'axios'

import noteService from "./services/notes"
import Note from "./components/Note"

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote ] = useState('')
  const [showAll, setShowAll] = useState(true)

  //server import
  useEffect(() => {
    
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])
  console.log('render', notes.length, 'notes');


  const addNote = (e) => {
    e.preventDefault()
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      })
  }

  const handleNoteChange = (e) => {
    setNewNote(e.target.value)
  }

  const toggleImportanceOf = (id) => {
    //toggles property important in said note
    const foundNote = notes.find(n => n.id === id)
    const changedNote = {...foundNote, important: !foundNote.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(n => n.id !== id ? n : returnedNote))
      })
      .catch(err => {
        alert(`The note '${note.content}' was already deleted from server`)
        setNotes(notes.filter(n => n.id !== id))
      })
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
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
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