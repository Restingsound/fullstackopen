import React from "react";
import Weather from "./Weather";

const SelectedCountry = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h3>languages</h3>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.name}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} alt="flag" width="100" />
      <Weather country={country} />
    </div>
  );
};

export default SelectedCountry;
