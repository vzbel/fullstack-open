import axios from "axios";

const apiKey = import.meta.env.VITE_WEATHER_KEY;
const baseURL = "https://api.openweathermap.org/data/2.5/weather";
const units = "metric";
const iconURL = "https://openweathermap.org/img/wn/10d@2x.png";

const getWeather = (city) => {
  const req = axios.get(`${baseURL}?q=${city}&appid=${apiKey}&units=${units}`);
  return req.then((res) => res.data);
};

const getIconURL = (statusCode) => {
  return `https://openweathermap.org/img/wn/${statusCode}@2x.png`;
};

export default {
  getWeather,
  getIconURL
};
