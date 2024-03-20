require('dotenv').config()

const express = require('express')
const cors = require('cors')
const Note = require('./models/note') 

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))



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
    Note.findById(request.params.id)
        .then(note => {
          response.json(note)
        })
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

  const note = new Note ({
    content: body.content,
    important: body.important || false,
  })

  note.save()
      .then(savedNote => {
        res.json(savedNote)
      })

})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})