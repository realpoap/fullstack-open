import { useState, useEffect } from 'react'

import personService from './services/person'

import Contacts from './components/Contacts'
import Form from './components/Form'
import Search from './components/Search'
import Message from './components/Message'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('John Doe')
  const [searchName, setSearchName] = useState('')
  const [newNumber, setNewNumber]  = useState('(1)')
  const [message, setMessage]  = useState(null)
  const [messageType, setMessageType]  = useState('')

useEffect(() => {
  personService
    .getAll()
    .then((initialPersons)=> {
      setPersons(initialPersons)
    })
}, [])

  const resetPersons = () => {
    personService
    .getAll()
    .then((initialPersons)=> {
      setPersons(initialPersons)
    })
  }


  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleSearchChange = (e) => setSearchName(e.target.value)

  const addPerson = (e) => {
    e.preventDefault()
    if (newName === '') {
      setMessage(`You didn't enter a name`)
      setMessageType('error')
    }
    else {
      const matchingObject = persons.find((p) => p.name === newName)
      const updatedObject = { ...matchingObject, number: newNumber}

      if (matchingObject) {
        if (confirm(`replace ${newName} number with ${newNumber}?`)) {
          setTimeout(() => {
            personService
              .update(matchingObject.id, updatedObject)
              .then(() => {
                resetPersons()
                setMessageType('success')
                setMessage(`${newName} was successfully updated`)
                setTimeout(() => { 
                setMessage(null)
              }, 3000)
              })
              .catch(err => {
                setMessage(`${matchingObject.name} was removed from the server`)
                setMessageType('error')
              })

          },5000)
        }
      } else {
        const newObject = {
          name: newName,
          number: newNumber,
        }
        // chose to keep the reset outside so we can make changes to the newName in case of typo
        personService
          .create(newObject)
          .then((returnedPerson) => {
            setPersons(persons.concat(returnedPerson))
            setMessageType('success')
            setMessage(`${newObject.name} was successfully added`)
            setTimeout(() => { 
              setMessage(null)
            }, 3000)
            
          })      
        
        setNewName('')  
        setNewNumber('')
      }  
    }
  }

 

  return (
    <div>
      <Message 
        message={message} 
        messageType={messageType}
      />
      <h2>Search</h2>
      <Search 
        searchName={searchName}
        handleSearchChange={handleSearchChange}
      />

      <h2>Phonebook</h2>
      <Form 
        // Is there no better way for this ?
        addPerson={addPerson} 
        newNumber={newNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>
      <Contacts 
        search={searchName} 
        persons={persons} 
        setPersons={setPersons}
      />
    </div>
  )
}

export default App