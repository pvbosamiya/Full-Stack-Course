import React from 'react'

const maxListLength = 10

const Button = ({clickHandler, buttonText}) => <button onClick={clickHandler}>{buttonText}</button>

const Show = (props) => {
    console.log(props.country.name)
    return(
        <>
            <tr>
            <td>{props.country.name}</td>
            <td><Button clickHandler={props.buttonHandler(props.country)} buttonText="show"/></td>
            </tr>
        </>
    )
}

const CountryDetails = ({name, value}) => {
    return(
        <>
            <tr>
                <td>{name}</td>
                <td>{value}</td>
            </tr>
        </>
    )
}

const isEmpty = function(obj) {
  return Object.keys(obj).length === 0;
}

const WeatherIcon = ({icon}) => {
    return (
        <>
            <img src={icon} alt="" height="120" width="100"/>
        </>
    )
}

const Weather = ({weather}) => {
    if(isEmpty(weather))
    {
        console.log("Empty weather object ...")
        return <></>
    }

    console.log(weather)
    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td><b>Temperature:</b></td>
                        <td>{weather.current.temperature} celsius</td>
                    </tr>
                    <tr>
                        <td>
                            <b>Wind:</b>
                        </td>
                        <td>{weather.current.wind_speed} mph direction {weather.current.wind_dir}</td>
                    </tr>
                </tbody>
            </table>
            <br/>
            {weather.current.weather_icons.map((icon, index) => <WeatherIcon key={index} icon={icon} />)}

         </>
    )

}

const SingleCountryShow = ({country, weather}) => {
    let flagText = (country.name).concat("'s flag")
    return (
    <>
        <h2>{country.name}</h2>
        <table>
            <tbody>
                <CountryDetails name={'capital'} value={country.capital} />
                <CountryDetails name={'population'} value={country.population} />
            </tbody>
        </table>

        <h3>Languages</h3>
        <ul>
            {country.languages.map(language => 
                <li key={language.iso639_1}> 
                    {language.name}
                </li> 
            )}
        </ul>

        <img src={country.flag} alt={flagText} height="120" width="100"/>
        <h3>Weather in {country.capital}</h3>
        <Weather weather={weather}/>

    </>
    )
}

const DisplayCountries = ({search, countries, buttonHandler, weather}) => {

    if(countries.length > maxListLength)
    {
        return <p>Too many matches, specify more precise filter.</p>
    }

    if(countries.length === 1)
    {
        console.log("Single entry")
        return <SingleCountryShow country={countries[0]} weather={weather}/>
    }

    if(countries.length === 0 & search.length !== 0)
    {
        return <p>Not a valid Country</p>
    }

    console.log("Last case of more than 1 but less than 10")
    return (
        <>
        <table>
            <tbody>
                {countries.map((country) => 
                    <Show key={country.numericCode} 
                    country={country} buttonHandler={buttonHandler}/>)}
            </tbody>
        </table>
        </>
    )
}

export default DisplayCountries