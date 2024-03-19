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

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes/', (request, response) => {
  response.json(notes)
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