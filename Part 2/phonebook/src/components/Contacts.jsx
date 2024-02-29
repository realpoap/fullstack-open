const Contacts = ({search, persons}) => {
    const lowerSearch = search.toLowerCase()
    console.log(lowerSearch);
    const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(lowerSearch) )
    return (
      filteredPersons.map((person) => <li key={person.id}>{person.name} : {person.number}</li>)
    )
  }

export default Contacts