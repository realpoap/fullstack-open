import { gql } from "@apollo/client"

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  published
  author  {
    name
    born
  }
  genres
}
`
const AUTHOR_DETAILS = gql`
fragment AuthorDetails on Author {
  name
  born
  authorCount
}
`

export const BOOK_ADDED = gql`
  ${BOOK_DETAILS}  
  subscription {
      bookAdded {
        ...BookDetails
      }
    }
  `

export const CURRENT_USER = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`
export const CHANGE_GENRE = gql`
  mutation changeGenre($username: String!, $favoriteGenre: String!) {
    changeGenre(username: $username, favoriteGenre: $favoriteGenre) {
      username
      favoriteGenre  
    }
  }
  `

export const ALL_AUTHORS = gql`
  ${AUTHOR_DETAILS}
  query{
    allAuthors {
      ...AuthorDetails
    }
  }`

export const ALL_BOOKS = gql`
  ${BOOK_DETAILS}
  query{
    allBooks{
      ...BookDetails
    }
  }`

export const BOOKS_BY_GENRE = gql`
  ${BOOK_DETAILS}
  query {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  `

export const ADD_BOOK = gql`
  ${BOOK_DETAILS}
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    ...BookDetails
  }
}
`

export const CHANGE_YEAR = gql`
  ${AUTHOR_DETAILS}
    mutation changeYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuthorDetails
    }
  }
  `

export const LOGIN = gql`
  mutation login ($username: String!, $password: String!) {
    login(username: $username, password: $password){
      value
    }
  }
`