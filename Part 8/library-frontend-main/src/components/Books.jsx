import { useEffect } from "react"
import { useState } from "react"

const Books = ({ show, books }) => {
  const [list, setList] = useState([])
  const [genre, setGenre] = useState('')

  useEffect(() => {
    const genreList = []
    books.map((b) => {
      b.genres.map((genre) => {
        genreList.indexOf(genre) === -1 ? genreList.push(genre) : null
      })
    })
    setList(genreList)
  }, [books])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Books</h2>
      <h4>{genre !== '' ? `filtering by : ${genre}` : 'no filter'}</h4>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => {
            const elemGenres = a.genres
            console.log(elemGenres, ' | ', elemGenres.includes(genre))
            if (elemGenres.includes(genre) || genre === '') {
              return (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              )
            }
          })
          }
        </tbody>
      </table>
      <div>
        <div>
          {list.map((g) => (
            <button key={`btn-${g}`} onClick={() => setGenre(g)}>{g}</button>
          ))}
          <button key={'all'} onClick={() => setGenre('')}>all genres</button>
        </div>
      </div>
    </div >
  )
}

export default Books
