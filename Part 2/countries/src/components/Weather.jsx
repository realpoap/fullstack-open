import { useEffect } from 'react'

import weatherService from '../services/weather'

const Weather = ({country, weather, setWeather}) => {
    
useEffect(() => {
    console.log('in weather, country:', country.name.common)
    const lat = country.latlng[0]
    const lon = country.latlng[1]
    console.log('lat', lat, 'lon', lon)
    weatherService
    .getCountryWeather({lat, lon})
    .then((geoData) => {
        console.log(geoData)
        setWeather(geoData)
        }
    )
    .catch(err => console.log(err))
},[country])

    if(!weather) {
        //takes some time to get the weather it seems
        return null
    } else {

    return (
        <div>
            <h2>Weather</h2>
            <p>Temperature: {weather.main.temp} Celsius</p>
            <p className='weather'>{weather.weather[0].description}</p>
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`} alt={weather.weather[0].description}/>
            <p>Wind: {weather.wind.speed}m/s</p>
        </div>
    )
    }
        
}

export default Weather