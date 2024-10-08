const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql')
const { v1: uuid } = require('uuid')

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

/*
	you can remove the placeholder query once your first one has been implemented 
*/

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
		author: String!
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
		bookCount: () => {
			return books.length
		},
		authorCount: () => authors.length,
		allBooks: (root, args) => {
			if (!args.author && !args.genre) { return books }

			if (args.author) {
				const authorBooks = books.filter(b => b.author === args.author)
				if (!args.genre) { return authorBooks }

				const genreBooks = authorBooks.filter(b => b.genres.includes(args.genre))
				return { genreBooks }

			}
			if (args.genre) {
				const genreBooks = books.filter(b => b.genres.includes(args.genre))
				return genreBooks
			}

		},
		allAuthors: (root, args) => {
			return authors
		},
	},
	Author: {
		bookCount: (root) => { return books.filter(b => b.author === root.name).length }
	},
	Mutation: {
		addAuthor: (root, args) => {
			if (authors.find(a => a.name === args.name)) {
				throw new GraphQLError('Author already exists', {
					extension: {
						code: 'BAD USER INPUT',
						invalidArgs: args.name
					}
				})
			}
			const author = { ...args, id: uuid() }
			authors = authors.concat(author)
			return author
		},
		addBook: (root, args) => {
			//search if author exists, if not create it
			if (!authors.find(a => a.name === args.author)) {
				const author = { name: args.author, id: uuid() }
				authors = authors.concat(author)
			}
			const book = { ...args, id: uuid() }
			books = books.concat(book)
			return book
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