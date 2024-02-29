import { useState } from 'react'

const Contacts = ({persons}) => {
  return (
    persons.map((person) => <li key={person.name}>{person.name} : {person.number}</li>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', 
      number: 5419653423
    }
  ]) 
  const [newName, setNewName] = useState('test')
  const [newNumber, setNewNumber]  = useState('(1)')

  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)

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
      <Contacts persons={persons}/>
    </div>
  )
}

export default App