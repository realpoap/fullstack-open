import Person from "./Person";

import personService from '../services/person'


const Contacts = ({search, persons, setPersons}) => {
    const lowerSearch = search.toLowerCase()
    const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(lowerSearch) )
    
    // I don't like that the function shall be there in order to work
    // I tried to elevate it, but then how do I get the person.id  in the call as prop of Contacts ?
    const deletePerson = (id) => {
      console.log(id)
      const personToDelete = persons.find(p => p.id === id)
      console.log('person by id', personToDelete)
      if (confirm(`Are you sure you want to delete ${personToDelete.name}?`)) {
        personService
        .deleteEntry(id)
        .then(() => {
          personService
            .getAll()
            .then((initialPersons)=> {
              setPersons(initialPersons)
            })
            // here, person.map breaks the rendering of the list (person.name doesn't exists)

        })
      }
    }

    return (
      filteredPersons.map((person) =>
      <Person 
        key={person.id} 
        name={person.name} 
        number={person.number}
        id={person.id} 
        handleClick={() => deletePerson(person.id)}/>)
    )
  }

export default Contacts