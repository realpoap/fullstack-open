import Person from "./Person";

const Contacts = ({search, persons}) => {
    const lowerSearch = search.toLowerCase()
    console.log(lowerSearch);
    const filteredPersons = persons.filter((person) => person.name.toLowerCase().includes(lowerSearch) )
    return (
      filteredPersons.map((person) => <Person key={person.id} name={person.name} number={person.number}/>)
    )
  }

export default Contacts