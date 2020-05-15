import React, {useState, useEffect} from 'react'
import axios from 'axios'
import DisplayCountries from './display'

const App2 = () => {

    const [countries, setCountries] = useState([])
    const [search, setSearch] = useState('')
    const [weather, setWeather] = useState({})
    const apiKey = process.env.REACT_APP_API_KEY
    const weatherURL = 'http://api.weatherstack.com/current?access_key='.concat(apiKey).concat('&query=')

    const hook = () => {
        if(search.length > 0)
        {
            axios
                .get('https://restcountries.eu/rest/v2/name/'.concat(search))
                    .then(response => {
                        console.log(response)
                        console.log('Country data: ', response.data)
                        setCountries(response.data)
                    })
                    .catch(error => {
                        console.log(error.response)
                        if(error.response.status === 404)
                        {
                            setCountries([])
                        }
                })
        }
        else
        {
            setCountries([])
        }
    }

    const weatherHook = () => {
        console.log("Number of countries: ", countries.length)
        if(countries.length === 1)
        {
            axios
                .get(weatherURL.concat(countries[0].capital))
                .then(response => {
                    console.log("WeatherHook Promise completed")
                    console.log('weather data: ', response.data)
                    setWeather(response.data)
                })
        }
        else
        {
            setWeather({})
        }
    }

    const countryHandler = (country) => {
        const handler = () => {
            console.log(country)
            const displayCountries = [country]
            setCountries(displayCountries)
        }

        return handler
    }

    const handleSearch = (event) => {
        console.log(event.target.value)
        setSearch(event.target.value)
    }

    useEffect(hook, [search])
    useEffect(weatherHook, [countries])

    return(
    <div>
        <form>
        <table>
            <tbody>
                <tr>
                    <td>Find Countries:</td>
                    <td><input value={search}
                         onChange={handleSearch}/></td>
                </tr>
            </tbody>
        </table>
        </form>
        <DisplayCountries search={search} countries={countries} buttonHandler={countryHandler} weather={weather}/>
    </div>
    )
}

export default App2