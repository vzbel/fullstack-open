import { useState, useEffect } from "react";
import weatherService from "../services/weather.js";

const Country = ({ country }) => {
    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        weatherService
            .getWeather(country.capital[0])
            .then((data) => {
                setWeatherData(data);
            })
            .catch((er) => {
                console.log(`No weather data for ${country.capital[0]}`);
            });
    }, [country]);

    return (
        <article>
            <h2>{country.name.common}</h2>
            <p>Capital : {country.capital[0]}</p>
            <p>Area: {country.area}</p>

            <h3>Languages</h3>
            <ul>
                {
                Object.values(country.languages)
                    .map((lang) => (
                        <li key={lang}>
                            {lang}
                        </li>
                    ))
                }
            </ul>

            <img 
                src={country.flags.png} 
                alt={country.flags.alt} 
            />

            {
                weatherData &&
                <div>
                    <p>Temperature: {weatherData.main.temp} Celsius</p>
                    <img 
                        src={
                            weatherService
                            .getIconURL(
                                weatherData.weather[0].icon
                            )} 
                    />
                    <p>Wind: {weatherData.wind.speed} m/s</p>
                </div>
            }
        </article>
    );
};

export default Country;