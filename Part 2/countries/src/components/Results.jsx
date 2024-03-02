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
        return <p>implement country detail</p>
    }
}

export default Results