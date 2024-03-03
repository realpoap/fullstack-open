import Country from "./Country"
import Weather from "./Weather"


const Results = ({filter, filteredCountries, handleSelectedCountry, weather, setWeather}) => {
 
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
        const countryToShow = filteredCountries[0] 
        console.log('country to show:',countryToShow)
        return (
            <>
            <Country country={countryToShow} languages={Object.values(countryToShow.languages)}/>
            <Weather country={countryToShow} weather={weather} setWeather={setWeather}/>
            </>
        )
    }

    
}

export default Results