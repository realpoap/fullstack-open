const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
// const { v1: uuid } = require('uuid')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI)
	.then(() => {
		console.log('\n .: connected to MongoDB!')
	})
	.catch(error => {
		console.log('\n .: error connecting to MongoDB: ', error.message)
	})


const typeDefs = `
	type Author {
		name: String!
		id: ID!
		born: Int
		bookCount: Int
	}

  type Book {
    title: String!
		published: Int!
		author: Author!
		id: ID!
		genres: [String!]!
  }

	type User {
		username: String!
		favoriteGenre: String
		id: ID!
	}

	type Token {
		value: String
	}

	type Query {
		bookCount: Int
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors(author: String): [Author!]!
		me: User
	}

	type Mutation {
		addBook(
			title: String!
			published: Int!
			author: String!
			genres: [String!]!
		) : Book
		addAuthor(
			name: String!
			born: Int
		) : Author
		editAuthor(
			name: String!
			setBornTo: Int!
		) : Author
		createUser(
		 username: String!
		 favoriteGenre: String
		):User
		login(
		 username: String!
		 password: String!
		):Token
	}
`

const resolvers = {
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			if (!args.author && !args.genre) {
				return Book.find({})
			}
			if (args.author) {
				console.log("author:", args.author)
				const author = await Author.find({ name: args.author })
				console.log(author._id)
				if (!args.genre) {
					return Book.find({ author: author })
				}
				return Book.find({ genres: { $in: args.genre }, author: author })
			}
			if (args.genre) {
				console.log("genre:", args.genre)
				return Book.find({ genres: { $in: args.genre } })
			}
		},
		allAuthors: async (root, args) => {
			if (args.author) {
				console.log("author:", args.author)
				return Author.find({ name: args.author })
			}
			return Author.find({})
		},
		me: async (root, args, context) => {
			return context.currentUser
		}
	},
	Mutation: {
		addAuthor: async (root, args, context) => {
			if (!context.currentUser) {
				throw new GraphQLError('You need to log in', {
					extensions: {
						code: 'BAD USER INPUT',
					}
				})
			}
			console.log("name:", args.name)
			const authorFound = await Author.findOne({ name: args.name })
			console.log(authorFound)
			if (authorFound === null) {
				const author = new Author({ ...args })
				return author.save()
					.catch(err => {
						throw new GraphQLError('Saving author failed', {
							extensions: {
								code: 'BAD USER INPUT',
								invalidArgs: args.name,
								err
							}
						})
					})
			} else {
				throw new GraphQLError('User not logged in', {
					extensions: {
						code: 'BAD USER INPUT',
					}
				})
			}

		},
		addBook: async (root, args, context) => {
			if (!context.currentUser) {
				throw new GraphQLError('You need to log in', {
					extensions: {
						code: 'BAD USER INPUT',
					}
				})
			}
			console.log('author:', args.author)
			const authorFound = await Author.findOne({ name: args.author })
			if (authorFound === null) {
				console.log("creating author...", args.author)
				const author = await new Author({ name: args.author })
				try {
					await author.save()
				}
				catch (err) {
					throw new GraphQLError('Saving author failed', {
						extensions: {
							code: 'BAD USER INPUT',
							invalidArgs: args.name,
							err
						}
					})
				}
				//THEN
				const book = await new Book({ ...args, author: author })
				try {
					await book.save()
				} catch (err) {
					throw new GraphQLError('Saving book failed', {
						extensions: {
							code: 'BAD USER INPUT',
							invalidArgs: args.title,
							err
						}
					})
				}
				return book
			}
			const book = await new Book({ ...args, author: authorFound })
			try {
				await book.save()
			} catch (err) {
				throw new GraphQLError('Saving book failed', {
					extensions: {
						code: 'BAD USER INPUT',
						invalidArgs: args.title,
						err
					}
				})
			}
			return book
		},
		editAuthor: async (root, args) => {
			const foundAuthor = await Author.findOne({ name: args.name })
			if (!foundAuthor) {
				throw new GraphQLError('Author does not exists', {
					extension: {
						code: 'BAD USER INPUT',
						invalidArgs: args.name
					}
				})
			}
			foundAuthor.born = args.setBornTo
			return foundAuthor
		},
		createUser: async (root, args) => {
			const user = new User({ username: args.username })
			return user.save()
				.catch(err => {
					throw new GraphQLError('Failed creating new user', {
						extensions: {
							code: 'BAD_USER_INPUT',
							invalidArgs: args.username,
							err
						}
					})
				})
		},
		login: async (root, args) => {
			const user = User.findOne({ username: args.username })

			if (!user || args.password !== 'secret') {
				throw new GraphQLError('Login failed', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				})
			}

			const userForToken = {
				username: user.username,
				id: user._id
			}

			return {
				value: jwt.sign(userForToken, process.env.JWT_SECRET)
			}
		}
	}
}


const server = new ApolloServer({
	typeDefs,
	resolvers,
})

startStandaloneServer(server, {
	listen: { port: 4000 },
	context: async ({ req, res }) => {
		const auth = req ? req.headers.authorization : null
		if (auth && auth.startsWith('Bearer ')) {
			const decodedToken = jwt.verify(
				auth.substring(7), process.env.JWT_SECRET
			)
			const currentUser = await User.findById(decodedToken.id)
			return currentUser
		}
	},
})
	.then(({ url }) => {
		console.log(`Server ready at ${url}`)
	})