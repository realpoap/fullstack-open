const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const { v1: uuid } = require('uuid')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')

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

	type Query {
		bookCount: Int
		authorCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allAuthors(author: String): [Author!]!
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
	},
	Mutation: {
		addAuthor: async (root, args) => {
			console.log("name:", args.name)
			const authorFound = await Author.findOne({ name: args.name })
			console.log(authorFound)
			if (authorFound === null) {
				const author = new Author({ ...args })
				return author.save()
			} else {
				throw new GraphQLError('Author already exists', {
					extension: {
						code: 'BAD USER INPUT',
						invalidArgs: args.name
					}
				})
			}
		},
		addBook: async (root, args) => {
			console.log('author:', args.author)
			const authorFound = await Author.findOne({ name: args.author })
			if (authorFound === null) {
				console.log("creating author...", args.author)
				const author = await new Author({ name: args.author })
				author.save()
				const book = await new Book({ ...args, author: author })
				return book.save()
			}
			const book = await new Book({ ...args, author: authorFound })
			return book.save()
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
		}
	}
}


const server = new ApolloServer({
	typeDefs,
	resolvers,
})

startStandaloneServer(server, {
	listen: { port: 4000 },
}).then(({ url }) => {
	console.log(`Server ready at ${url}`)
})