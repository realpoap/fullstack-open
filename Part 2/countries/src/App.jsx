import { useState, useEffect } from 'react'

import Results from './components/Results'
import Country from './components/Country'
import Search from './components/Search'

import countryService from './services/country'



function App() {

  const [countries, setCountries] = useState(null)
  const [filter, setFilter] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null)


  useEffect(() => {
    countryService
      .getAll()
      .then((returnedCountries) => {
        setCountries(returnedCountries)
      })
      .catch(err => console.log('error', err))
  },[])
  
  if (!countries) {
    return <div><p>Fetching data...</p></div>
  }


  console.log(filter);

  const handleFilterChange = (e) => {
    setFilter(e.target.value)
    setSelectedCountry('')
  }

  const handleSelectedCountry = (country) => {
    console.log('in handleSelectedCountry');
    setSelectedCountry(country)
  }

  return (

    <div>
      <h1>Country Info</h1>
      <Search 
        filter={filter} 
        handleFilterChange={handleFilterChange}
      />
      {!selectedCountry && (
        <Results
          filter={filter} 
          filteredCountries={countries.filter((country) => country.name.common.toLowerCase().includes(filter.toLowerCase()))} 
          handleSelectedCountry={handleSelectedCountry} 
          selectedCountry={selectedCountry}/>)}
      {selectedCountry && (
                <Country country={selectedCountry} languages={Object.values(selectedCountry.languages)}/>
            )}
    </div>
  )
}

export default App
