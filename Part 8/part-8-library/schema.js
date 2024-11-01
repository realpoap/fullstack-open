const typeDefs = `
	type Author {
		name: String!
		id: ID!
		born: Int!
		authorCount: Int!
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
		favoriteGenre: String!
		id: ID!
	}

	type Token {
		value: String!
	}

	type Subscription {
		bookAdded: Book!
	}

	type Query {
		bookCount: Int!
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

		changeGenre(
			username: String!
			favoriteGenre: String!
		):User

		login(
		 username: String!
		 password: String!
		):Token
	}
`
module.exports = typeDefs