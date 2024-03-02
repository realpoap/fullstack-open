import Country from "./Country"

const Results = ({search, countries}) => {

    if (search === '') {
        return null
    }
    if (countries.length > 10) {
        return <p>Too many matches, please specify another filter</p>
    }
    
    if (countries.length !== 1 && countries.length <10) {
        return (
            countries.map((country) => <p key={country.ccn3}>{country.name.common}</p>
            )
        )
    }
    if (countries.length === 1) {
        const countryResult = countries[0]
        const countryLanguages = Object.values(countryResult.languages)
        console.log(countryLanguages)
        // it keeps spawning the languages, why ?
        return <Country country={countryResult} languages={countryLanguages}/>
    }
}

export default Results