import { useEffect, useState } from "react";
import { useQuery, useMutation, useApolloClient } from "@apollo/client";

import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK, BOOKS_BY_GENRE, CURRENT_USER } from "./queries";


import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";
import LoginForm from "./components/LoginForm";
import Account from "./components/Account";



const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState("")
  const [token, setToken] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [favoriteGenre, setFavoriteGenre] = useState('')
  const client = useApolloClient()


  const allAuthorsQResults = useQuery(ALL_AUTHORS)
  const allBooksQResults = useQuery(ALL_BOOKS)

  const [createBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      notify(messages)
    }
  })


  if (allAuthorsQResults.loading || allBooksQResults.loading) {
    return <div>Loading data...</div>
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }


  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token ? <button onClick={() => setPage("add")}>add book</button> : <button onClick={() => setPage("login")}>login</button>}
        {token ? <button onClick={() => setPage("account")}>account</button> : null}
        {token ? <button onClick={logout}>logout</button> : null}

      </div>
      <Notify errorMessage={errorMessage} />
      <Authors
        show={page === "authors"}
        authors={allAuthorsQResults.data.allAuthors}
        notify={notify}
      />
      <Books show={page === "books"} books={allBooksQResults.data.allBooks} />
      <NewBook show={page === "add"} createBook={createBook} />
      <Account
        show={page === "account"}
        books={allBooksQResults.data.allBooks}
        user={currentUser}
        favoriteGenre={favoriteGenre}
        setFavoriteGenre={setFavoriteGenre}
        notify={notify} />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setError={notify}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
};

export default App;
