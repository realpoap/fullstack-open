import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { ALL_AUTHORS, ALL_BOOKS, ADD_BOOK } from "./queries";


import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notify from "./components/Notify";



const App = () => {
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState("")
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
        <button onClick={() => setPage("add")}>add book</button>
      </div>
      <Notify errorMessage={errorMessage} />
      <Authors show={page === "authors"} authors={allAuthorsQResults.data.allAuthors} />

      <Books show={page === "books"} books={allBooksQResults.data.allBooks} />

      <NewBook show={page === "add"} createBook={createBook} />
    </div>
  );
};

export default App;
