const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')

const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const User = require('./models/user')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')

//MONGOOSE CONNECT
require('dotenv').config()
const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to ', MONGODB_URI)
mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('\n .: connected to MongoDB')
	})
	.catch(error => {
		console.log('\n .: error connecting to MongoDB: ', error.message)
	})

// SETUP
const start = async () => {
	const app = express()
	const httpServer = http.createServer(app)

	const server = new ApolloServer({
		schema: makeExecutableSchema({ typeDefs, resolvers }),
		plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
	})

	await server.start()

	app.use(
		'/',
		cors(),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req, res }) => {
				const auth = req ? req.headers.authorization : null
				if (auth && auth.startsWith('Bearer ')) {
					const decodedToken = jwt.verify(
						auth.substring(7), process.env.JWT_SECRET
					)
					const currentUser = await User.findById(decodedToken.id).populate('favoriteGenre')
					return { currentUser }
				}
			},
		})
	)

	const PORT = 4000

	httpServer.listen(PORT, () => {
		console.log(`Server running on http://localhost:${PORT}`)
	})
}

start()