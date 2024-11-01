const { GraphQLError } = require('graphql')
const jwt = require('jsonwebtoken')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const resolvers = {
	Book: {
		author: async (parent) => {
			console.log('searching for author in Book : ', parent.author.toString())
			const author = await Author.findOne({ _id: parent.author.toString() })
			console.log('author is : ', author.name)
			return author
		}
	},
	Query: {
		bookCount: async () => await Book.collection.countDocuments(),
		authorCount: async () => await Author.collection.countDocuments(),

		allBooks: async (root, args) => {
			if (!args.author && !args.genre) {
				try {
					return await Book.find({})
				}
				catch (err) {
					throw new GraphQLError('Error when querying books', {
						extensions: {
							code: 'BAD USER INPUT',
							invalidArgs: args.author,
							err
						}
					})
				}
			}
			if (args.author) {
				console.log("author:", args.author)
				const author = await Author.findOne({ name: args.author })
				console.log(author._id)
				if (!args.genre) {
					return await Book.find({ author: author })
				}
				return await Book.find({ genres: { $in: args.genre }, author: author })
			}
			if (args.genre) {
				console.log("genre:", args.genre)
				return await Book.find({ genres: { $in: args.genre } })
			}
		},
		allAuthors: async (root, args) => {
			if (args.author) {
				console.log("author:", args.author)
				return await Author.findOne({ name: args.author })
			}
			return await Author.find({})
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
			console.log('authorFound: ', authorFound)
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
			// IF LOGGED IN
			if (!context.currentUser) {
				throw new GraphQLError('You need to log in', {
					extensions: {
						code: 'BAD USER INPUT',
					}
				})
			}
			// DO
			console.log('author input:', args.author)
			const authorFound = await Author.findOne({ name: args.author })
			console.log('Author found as : ', authorFound)

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
			console.log('the book is :', book)
			try {
				await book.save()
			} catch (err) {
				throw new GraphQLError('Saving book failed', {
					extensions: {
						code: 'BAD USER INPUT',
						invalidArgs: args.genres,
						err
					}
				})
			}
			return book
		},
		editAuthor: async (root, args, context) => {
			if (!context.currentUser) {
				throw new GraphQLError('You need to log in', {
					extensions: {
						code: 'BAD USER INPUT',
					}
				})
			}
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
			foundAuthor.save()
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
		changeGenre: async (root, args, context) => {
			if (!context.currentUser) {
				throw new GraphQLError('You need to log in', {
					extensions: {
						code: 'BAD USER INPUT',
					}
				})
			}
			console.log('trying to edit the favoriteGenre :', args.favoriteGenre)
			const user = await User.findOne({ username: args.username })
			if (!user) {
				throw new GraphQLError('User does not exist', {
					extensions: {
						code: 'BAD USER INPUT',
					}
				})
			}
			user.favoriteGenre = args.favoriteGenre
			user.save()
			console.log('favoriteGenre edited ! :', user.favoriteGenre)
			return user
		},
		login: async (root, args) => {
			console.log('username input:', args.username)
			const user = await User.findOne({ username: args.username })
			console.log('user:', user.data)

			if (!user || args.password !== 'secret') {
				throw new GraphQLError('Login failed', {
					extensions: {
						code: 'BAD_USER_INPUT'
					}
				})
			}

			const userForToken = {
				username: user.username,
				id: user._id,
			}
			console.log('logging in with :', userForToken)
			const token = jwt.sign(userForToken, process.env.JWT_SECRET)
			console.log(token)
			return { value: token }
		}
	}
}

module.exports = resolvers