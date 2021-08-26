import React from "react";

const Countries = ({ countries, filter }) => {
  const fCountries = countries.filter((country) =>
    country.name.toUpperCase().includes(filter.toUpperCase())
  );

  if (fCountries.length === 1) {
    return (
      <div>
        <h1>{fCountries[0].name}</h1>
        <div>capital {fCountries[0].capital}</div>
        <div>population {fCountries[0].population}</div>
        <h3>languages</h3>
        <ul>
          {fCountries[0].languages.map((lang) => (
            <li key={lang.name}>{lang.name}</li>
          ))}
        </ul>
        <img
          src={fCountries[0].flag}
          alt="{filteredCountries[0].name} flag"
          width="100"
        />
      </div>
    );
  } else {
    if (fCountries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else {
      return (
        <div>
          {fCountries.map((country) => (
            <div key={country.name}>{country.name}</div>
          ))}
        </div>
      );
    }
  }
};

export default Countries;
