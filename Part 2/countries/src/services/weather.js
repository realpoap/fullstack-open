import axios from 'axios'

const api_key = import.meta.env.VITE_SOME_KEY

const weatherURL = 'https://api.openweathermap.org/data/2.5/weather?lat='

const getCountryWeather = ({lat, lon}) => {
    const url = `${weatherURL}${lat}&lon=${lon}&appid=${api_key}&units=metric`
    console.log(url)
    const req = axios.get(url)
    return req.then(res => res.data)
}


export default {getCountryWeather}