import { useState } from "react";
import { gql, useQuery } from "@apollo/client";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

const ALL_AUTHORS = gql`
query{
  allAuthors{
    name
    born
    bookCount
  }
}`

const ALL_BOOKS = gql`
query{
allBooks{
  title
  author
  published
  }}`

const App = () => {
  const [page, setPage] = useState("authors");
  const allAuthorsQResults = useQuery(ALL_AUTHORS)
  const allBooksQResults = useQuery(ALL_BOOKS)

  if (allAuthorsQResults.loading) {
    return <div>Loading data...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
      </div>

      <Authors show={page === "authors"} authors={allAuthorsQResults.data.allAuthors} />

      <Books show={page === "books"} books={allBooksQResults.data.allBooks} />

      <NewBook show={page === "add"} />
    </div>
  );
};

export default App;
