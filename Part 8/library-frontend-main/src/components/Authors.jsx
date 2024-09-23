import { useState } from "react"

import { CHANGE_YEAR, ALL_AUTHORS } from "../queries"
import { useMutation } from "@apollo/client"

const Authors = ({ show, authors, notify }) => {

  const [birthyear, setBirthyear] = useState(null)
  const [author, setAuthor] = useState('')

  const [changeYear] = useMutation(CHANGE_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      notify(messages)
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(`name: ${author}, birthyear: ${birthyear}`)
    changeYear({ variables: { author, birthyear } })

    setAuthor('')
    setBirthyear(null)
  }

  if (!show) {
    return null
  }


  return (
    <div>
      <h2>Authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={handleSubmit}>
          <div>
            Author
            <input
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            ></input>
          </div>
          <div>
            Birthyear
            <input
              type="number"
              value={birthyear}
              onChange={({ target }) => setBirthyear(parseInt(target.value))}
            ></input>
          </div>
          <button type="submit">Change Year</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
