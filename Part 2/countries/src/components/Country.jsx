import Language from "./Language"


const Country = ({country, languages}) => {

    return (
        <>
            <div>
                <h2>{country.name.common}</h2>
                <p>Capital : {country.capital[0]}</p>
                <p>Area: {country.area}</p>
            </div>
            <div>
                <h3>Languages spoken</h3>
                <ul>
                    {languages.map(l => <Language key={`&{country.ccn3}${l}`} language={l}/>)}
                </ul>
            </div>
            <img src={country.flags.png} alt={country.flags.alt}></img>
            
        </>
    )
}

export default Country