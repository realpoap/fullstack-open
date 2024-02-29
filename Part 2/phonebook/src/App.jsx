import { useState } from 'react'
import Contacts from './components/Contacts'


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('John Doe')
  const [searchName, setSearchName] = useState('')
  const [newNumber, setNewNumber]  = useState('(1)')

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleSearchChange = (e) => setSearchName(e.target.value)

  const addPerson = (e) => {
    e.preventDefault()
    console.log(e.target);
    if (newName === '' || persons.find((person) => person.name === newName) ) {
      alert(`${newName} is invalid `)
    }
    else {
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      // chose to keep the reset outside so we can make changes to the newName in case of typo
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }
  

  return (
    <div>
      <div>
        <h2>Search</h2>
        Search: 
        <input
          value={searchName}
          onChange={handleSearchChange}
        />
      </div>

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
          number: 
          <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <Contacts search={searchName} persons={persons}/>
    </div>
  )
}

export default App