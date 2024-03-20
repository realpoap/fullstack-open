const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

let notes = require('./db.json')

const generateId = () => {
  const maxId = notes.lengths > 0
  ? Math.max(...notes.map(n => n.id))
  : 0
}

// MONGOOSE DEFINITION
const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://poap:${password}@cluster-fullstack-open.ebaoy2d.mongodb.net/NoteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

noteSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Note = mongoose.model('Note', noteSchema)

// ROUTES

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes/', (request, response) => {
  Note.find({})
      .then(notes => {
        response.json(notes)
      })
})

app.get('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    console.log(id)
    const note = notes.find(note => {
        console.log(note.id, typeof note.id, id,  typeof id, note.id === id);
        return note.id === id
    })
    console.log(note)
    
    if (note) {
        response.json(note)  
    } else {
        response.statusMessage = "No note found";
        response.status(404).end()
    }
  })

app.delete('/api/notes/:id', (request, response) => {
    const id = Number(request.params.id)
    notes = notes.filter(note => note.id !== id)
  
    response.status(204).end()
  })  

app.post('/api/notes', (req, res) => {
  const body = req.body

  if(!body.content) {
    return res.statut(400).json({
      error: 'content missing'
    })
  }

  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  const note = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }

  notes = notes.concat(note)
  console.log(note)
  res.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})