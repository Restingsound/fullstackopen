import React, { useState, useEffect } from "react";
import axios from "axios";

const api_key = process.env.REACT_APP_API_KEY;

const Weather = ({ country }) => {
  const [weather, setWeather] = useState({});
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, [country.capital]);

  if (weather.current) {
    return (
      <div>
        <h3>Weather in {country.capital}</h3>
        <b>temperature:</b> {weather.current.temperature} Celsuis
        <br />
        <img src={weather.current.weather_icons[0]} alt="weather icon" />
        <br />
        <b>wind:</b> {weather.current.wind_speed} mph direction{" "}
        {weather.current.wind_dir}
      </div>
    );
  } else {
    return <div>No Weather Data Available</div>;
  }
};

export default Weather;
