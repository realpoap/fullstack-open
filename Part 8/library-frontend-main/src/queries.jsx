import { gql } from "@apollo/client"

export const CURRENT_USER = gql`
query{
  me{
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
query{
  allAuthors{
    name
    born
    bookCount
  }
}`

export const ALL_BOOKS = gql`
query{
  allBooks{
    title
    published
    genres
    author{
      name
    }
  }
}`

export const BOOKS_BY_GENRE = gql`
query {
  allBooks(genre: $genre) {
    title
    published
    genres
    author {
      name
    }
  }
}
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
    published
    genres
  }
}
`

export const CHANGE_YEAR = gql`
  mutation changeYear($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
    bookCount
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