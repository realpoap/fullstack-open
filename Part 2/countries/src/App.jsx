import { useState, useEffect } from 'react'

import Results from './components/Results'
import Search from './components/Search'

import countryService from './services/country'



function App() {

  const [countries, setCountries] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    countryService
      .getAll()
      .then((returnedCountries) => {
        setCountries(returnedCountries)
      })
  },[search])
  
  if (!countries) {
    return <div><p>Fetching data...</p></div>
  }

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value)
  }

    const searchLow = search.toLowerCase()
    const list = countries.filter(c => c.name.common.toLowerCase().includes(searchLow))



  
  return (
    <div>
      <h1>Country Info</h1>
      <Search 
        search={search} 
        handleChange={handleSearchChange} 
      />
      <Results search={search} countries={list}/>    
    </div>
  )
}

export default App