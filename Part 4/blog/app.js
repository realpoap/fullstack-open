const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')

const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())

const mongoUrl = config.MONGO_URI
mongoose.set('strictQuery', false)

logger.info('connecting to ', config.MONGO_URI)

mongoose.connect(mongoUrl)
  .then(() => logger.info('connected to MongoDB'))
  .catch(err => logger.info('error connecting to MongoDB:', err.message))

app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app