const Country = ({country}) => {
    
    return (
        
        <>
            <div>
                <h2>{country.common.name}</h2>
                <p>Capital : {country.capital[0]}</p>
                <p>Area: {country.area}</p>
            </div>
            <div>
                <h3>Languages spoken</h3>
            </div>
        </>
    )
}

export default Country