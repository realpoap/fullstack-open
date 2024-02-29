import { useState } from 'react'

const Contacts = ({persons}) => {
  return (
    persons.map((person) => <li key={person.name}>{person.name}</li>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('test')

  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }

  const addPerson = (e) => {
    e.preventDefault()
    console.log(e.target);
    const nameObject = {
      name: newName,
    }
    setPersons(persons.concat(nameObject))
    setNewName('')

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <Contacts persons={persons}/>
    </div>
  )
}

export default App