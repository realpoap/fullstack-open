import Person from "./Person";


const Contacts = ({ search, persons, deletePerson }) => {
  const lowerSearch = search.toLowerCase()
  const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(lowerSearch))

  return (
    filteredPersons.map((person) =>
      <Person
        key={person.id}
        name={person.name}
        number={person.number}
        id={person.id}
        handleClick={() => deletePerson(person)} />)
  )
}

export default Contacts