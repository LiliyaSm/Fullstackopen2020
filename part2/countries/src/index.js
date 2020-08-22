import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";

// api-key for the weather service
const api_key = process.env.REACT_APP_API_KEY;

const Button = ({ country, handleShowCountry }) => {
    return <button onClick={handleShowCountry}>show</button>;
};

const Country = ({ country, handleShowCountryOf }) => {
    return (
        <div>
            {country.name}
            <Button
                country={country}
                handleShowCountry={() => handleShowCountryOf(country)}
            />
            ;
        </div>
    );
};

const CountryDetail = ({ country }) => {
    const [weather, setWeather] = useState("");

    // console.log(weather);
    useEffect(() => {
        axios
            .get(
                `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
            )
            .then((response) => {
                console.log(response);
                setWeather(response.data);
            });
    }, []);

    return (
        <div>
            <h1>{country.name}</h1>
            <div>capital : {country.capital}</div>
            <div>population: {country.population}</div>
            <h2>Languages:</h2>
            <ul>
                {country.languages.map((language, index) => (
                    <li key={index}>{language.name}</li>
                ))}
            </ul>
            <img src={country.flag} width="100px" alt="flag" />
            <h2>Weather in {country.capital}</h2>
            <div>
                {!weather ? (
                    "Loading..."
                ) : (
                    <div>
                        <p>
                            <strong>temparature:</strong>{" "}
                            {weather.current.temperature} Celcius
                        </p>
                        <p>
                            <img
                                src={weather.current.weather_icons}
                                width="50px"
                                alt="weather"
                            />
                        </p>
                        <p>
                            <strong>wind speed:</strong>{" "}
                            {weather.current.wind_speed} mph direction{" "}
                            {weather.current.wind_dir}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const Countries = ({ countriesToShow, handleShowCountryOf }) => {
    if (countriesToShow.length === 0) {
        return <div>nothing found</div>;
    } else if (countriesToShow.length === 1) {
        console.log(countriesToShow[0]);
        return <CountryDetail country={countriesToShow[0]} />;
    } else if (countriesToShow.length <= 10) {
        return (
            <div>
                {countriesToShow.map((country) => (
                    <Country
                        key={country.name}
                        country={country}
                        handleShowCountryOf={handleShowCountryOf}
                    />
                ))}
            </div>
        );
    } else {
        return <div>Too many matches, specify filter</div>;
    }
};

const App = () => {
    const [filter, setFilter] = useState("");
    const [countries, setCountries] = useState([]);
    const [countriesToShow, setCountriesToShow] = useState([]);

    const handleShowCountryOf = (country) => {
        setCountriesToShow([country]);
        console.log(country);
    };

    const handleFilter = (event) => {
        const filterValue = event.target.value;
        setFilter(filterValue);
        let filterResult = countries.filter((country) =>
            country.name.toLowerCase().includes(filterValue.toLowerCase())
        );
        setCountriesToShow(filterResult);
    };

    useEffect(() => {
        console.log("effect");
        axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
            console.log("promise fulfilled");
            setCountries(response.data);
        });
    }, []);

    return (
        <div>
            find countries: <input value={filter} onChange={handleFilter} />
            <Countries
                countriesToShow={countriesToShow}
                handleShowCountryOf={handleShowCountryOf}
            />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
