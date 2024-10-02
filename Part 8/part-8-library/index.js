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

let authors = [
	{
		name: 'Robert Martin',
		id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
		born: 1952,
	},
	{
		name: 'Martin Fowler',
		id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
		born: 1963
	},
	{
		name: 'Fyodor Dostoevsky',
		id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
		born: 1821
	},
	{
		name: 'Joshua Kerievsky', // birthyear not known
		id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
	},
	{
		name: 'Sandi Metz', // birthyear not known
		id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
	},
]

let books = [
	{
		title: 'Clean Code',
		published: 2008,
		author: 'Robert Martin',
		id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring']
	},
	{
		title: 'Agile software development',
		published: 2002,
		author: 'Robert Martin',
		id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
		genres: ['agile', 'patterns', 'design']
	},
	{
		title: 'Refactoring, edition 2',
		published: 2018,
		author: 'Martin Fowler',
		id: "afa5de00-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring']
	},
	{
		title: 'Refactoring to patterns',
		published: 2008,
		author: 'Joshua Kerievsky',
		id: "afa5de01-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring', 'patterns']
	},
	{
		title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
		published: 2012,
		author: 'Sandi Metz',
		id: "afa5de02-344d-11e9-a414-719c6709cf3e",
		genres: ['refactoring', 'design']
	},
	{
		title: 'Crime and punishment',
		published: 1866,
		author: 'Fyodor Dostoevsky',
		id: "afa5de03-344d-11e9-a414-719c6709cf3e",
		genres: ['classic', 'crime']
	},
	{
		title: 'Demons',
		published: 1872,
		author: 'Fyodor Dostoevsky',
		id: "afa5de04-344d-11e9-a414-719c6709cf3e",
		genres: ['classic', 'revolution']
	},
]



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
		allAuthors: [Author!]!
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
		authorCount: () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			if (!args.author && !args.genre) {
				Book.find({})
			}
			Book.find({})
			// if (args.author) {
			// 	if (!args.genre) {
			// 		Book.find({ author: args.author })
			// 	}
			// 	Book.find({ genres: args.genre })
			// }
			// if (args.genre) {
			// 	Book.find({ genres: args.genre })
			// }
		},
		allAuthors: async (root, args) => {
			Author.find({})
		},
	},
	// Author: {
	// 	bookCount: async (root) => {
	// 		Book.collection.countDocuments({ author: root.name })
	// 	},
	Mutation: {
		addAuthor: async (root, args) => {
			// if (authors.find(a => a.name === args.name)) {
			// 	throw new GraphQLError('Author already exists', {
			// 		extension: {
			// 			code: 'BAD USER INPUT',
			// 			invalidArgs: args.name
			// 		}
			// 	})
			// }
			const author = new Author({ ...args })
			return author.save()
		},
		addBook: async (root, args) => {
			//search if author exists, if not create it
			// if (!authors.find(a => a.name === args.author)) {
			// 	const author = { name: args.author, id: uuid() }
			// 	authors = authors.concat(author)
			// }

			const book = new Book({ ...args })
			return book.save()
		},
		editAuthor: (root, args) => {
			const foundAuthor = authors.find(a => a.name === args.name)
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