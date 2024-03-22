require('dotenv').config()

const express = require('express')
const cors = require('cors')
const Note = require('./models/note') 

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static('dist'))

// ERROR HANDLER
const errorHandler = (error, request, response, next) => {
  console.error(error.message)
  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformed id'})
  }
  next(error)
}

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

app.get('/api/notes/:id', (request, response, next) => {
    Note.findById(request.params.id)
        .then(note => {
          if (note) {
            response.json(note)
          } else {
            response.status(404).end
          }
        })
        .catch(err => next(err))
  })

app.put('/api/notes/:id', (req, res) => {
  const body = req.body
  const note = {
    content: body.content,
    important: body.important,
  }

  //the optional { new: true } parameter, which will cause our event handler to be called with the new modified document instead of the original
  Note.findByIdAndUpdate(req.params.id, note, {new: true})
      .then(updatedNote => {
        res.json(updatedNote)
      })
      .catch(err => next(err))
})

app.delete('/api/notes/:id', (request, response, next) => {
    Note.findByIdAndDelete(request.params.id)
        .then(result => response.status(204).end)
        .catch(error => next(error))
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})