import { useState, useEffect } from 'react';
import './App.css';
import CountriesView from './components/CountriesView';
import countryService from "./services/countries.js";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    countryService
      .getAll()
      .then((data) => {
        setCountries(data)
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
