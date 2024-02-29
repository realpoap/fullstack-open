import { useState } from "react"

import Note from "./components/Note"

const App = (props) => {
  const [notes, setNotes] = useState(props.notes)
  const [newNote, setNewNote ] = useState('')
  const [showAll, setShowAll] = useState(true)

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