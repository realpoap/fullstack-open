const Results = ({search, countries}) => {
    if (search === '') {
        return null
    }
    console.log(countries)
    return (
        countries.map((country) => <p key={country.ccn3}>{country.name.common}</p>
        )
    )
}

export default Results