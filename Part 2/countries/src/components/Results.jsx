import Country from "./Country"


const Results = ({filter, filteredCountries, handleSelectedCountry}) => {
 
    if (!filter) {
        return null
    }
    if (filteredCountries.length > 10) {
        return <p>Too many matches, please specify another filter</p>
    }
    
    if (filteredCountries.length <10 && filteredCountries.length > 1) {
        
        return (
            filteredCountries
                .map((country) => {
                    return (
                            <div key={country.ccn3}>
                                <p>{country.name.common}</p>
                                <button 
                                    onClick={() => handleSelectedCountry(country)}
                                >Show</button>
                            </div>
                            )
                    })
        )    
    }
    if (filteredCountries.length === 1) {
        return (
            <Country country={filteredCountries[0]} languages={Object.values(filteredCountries[0].languages)}/>
        )
    }

    
}

export default Results