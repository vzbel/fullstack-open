import { useState, useEffect } from 'react';
import axios from "axios";
import './App.css';
import CountriesView from './components/CountriesView';

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
    .then((res) => {
      setCountries(res.data);
    })
  }, []);

  const queryLower = query.toLowerCase();
  let countriesToShow = (query && countries) ? (
    countries.filter((country) => (
      country
        .name
        .common
        .toLowerCase()
        .includes(queryLower)
    ))
  )
  :
  [];

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <>
      <h1>Countries</h1>
      {
      countries.length > 0 ? 
        <main>
          <label htmlFor="country-search">
            find countries 
          </label>

          <br />
          <input 
            id="country-search"
            type="text" 
            placeholder="Finland..." 
            value={query}
            onChange={handleQueryChange}
          />

          <CountriesView 
            countries={countriesToShow}
          />
        </main>
      :
        <p>Loading...</p>
      }
    </>
  );
}

export default App;
