import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import "./index.css";

const Button = ({ country, setCountriesToShow }) => {
    const handleShowCountry = () => {
        setCountriesToShow([country]);
        console.log(country);
    };
    return <button onClick={handleShowCountry}>show</button>;
};

const Country = ({ country, setCountriesToShow }) => {
    return (
        <div>
            {country.name}
            <Button country={country} setCountriesToShow={setCountriesToShow} />;
        </div>
    );
};

const CountryDetail = ({ country }) => {
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
            <img src={country.flag} width="300px" alt="flag" />
        </div>
    );
};

const Countries = ({ countriesToShow, setCountriesToShow }) => {
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
                        setCountriesToShow={setCountriesToShow}
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

    const handleFilter = (event) => {
        const filterValue = event.target.value;
        setFilter(filterValue);
        let filterResult = countries.filter((country) =>
            country.name.toLowerCase().includes(filterValue.toLowerCase())
        );
        setCountriesToShow(filterResult)

        // axios.get("https://restcountries.eu/rest/v2/all").then((response) => {
        //     console.log("promise fulfilled");
        //     setCountries(response.data);
        // });
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
                setCountriesToShow={setCountriesToShow}
            />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
