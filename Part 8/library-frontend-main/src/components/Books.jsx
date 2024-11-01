import { useLazyQuery } from "@apollo/client"
import { useEffect } from "react"
import { useState } from "react"

import { BOOKS_BY_GENRE } from "../queries"

const Books = ({ show, books }) => {
  const [list, setList] = useState([])
  const [chosenGenre, setChosenGenre] = useState('')
  const [filteredBooks, setFilteredBooks] = useState([])

  const [loadBooksByGenre, { called, loading, data }] = useLazyQuery(
    BOOKS_BY_GENRE,
    { variables: { genre: chosenGenre } }
  )

  useEffect(() => {
    const genreList = []
    books.map((b) => {
      b.genres.map((g) => {
        genreList.indexOf(g) === -1 ? genreList.push(g) : null
      })
    })
    setList(genreList)
  }, [books])

  useEffect(() => {
    console.log('chosenGenre:', chosenGenre);
    loadBooksByGenre()
  }, [chosenGenre])



  if (!show) {
    return null
  }

  const listOfBooks = data ? data.allBooks : books

  return (
    <div>
      <h2>Books</h2>
      <h4>{chosenGenre !== '' ? `filtering by : ${chosenGenre}` : 'no filter'}</h4>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {listOfBooks.map((a) => {
            return (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )
          })
          }
        </tbody>
      </table>
      <div>
        <div>
          {list.map((g) => (
            <button key={`btn-${g}`} value={g} onClick={() => setChosenGenre(g)}>{g}</button>
          ))}
          <button key={'all'} value={''} onClick={() => setChosenGenre('')}>all genres</button>
        </div>
      </div>
    </div >
  )
}

export default Books
