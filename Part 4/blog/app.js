const express = require('express')
const app = express()

const cors = require('cors')
const mongoose = require('mongoose')

const blogRouter = require('./controllers/blog')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())

const mongoUrl = process.env.NODE_ENV === 'test'
    ? config.TEST_MONGO_URI
    : config.MONGO_URI
mongoose.set('strictQuery', false)

logger.info('connecting to ', config.MONGO_URI)

mongoose.connect(mongoUrl)
    .then(() => logger.info('connected to MongoDB'))
    .catch(err => logger.info('error connecting to MongoDB:', error.message))



app.use(middleware.requestLogger)

app.use('/api/blogs', blogRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app