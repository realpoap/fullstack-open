import { useState } from "react"

import { CHANGE_YEAR, ALL_AUTHORS } from "../queries"
import { useMutation } from "@apollo/client"

const Authors = ({ show, authors, notify }) => {

  const [birthyear, setBirthyear] = useState('')
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
    console.log(`name: ${author}, type: ${typeof (author)}`)
    console.log(`birthyear: ${birthyear}, type: ${typeof (birthyear)}`)
    const name = author
    const setBornTo = birthyear
    // YOU NEED THE EXACT SAME NAME FOR THE VARIABLES IN THE MUTATION DUHHHH
    await changeYear({ variables: { name, setBornTo } })

    setAuthor('')
    setBirthyear('')
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
              onChange={e => setAuthor(e.target.value)}
            />
          </div>
          <div>
            Birthyear
            <input
              value={birthyear}
              onChange={e => setBirthyear(parseInt(e.target.value))}
            />
          </div>
          <button type="submit">Change Year</button>
        </form>
      </div>
    </div>
  )
}

export default Authors
