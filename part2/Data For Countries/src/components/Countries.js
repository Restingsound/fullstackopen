import React from "react";
import SelectedCountry from "./SelectedCountry";

const Countries = ({ countries, filter, setNewFilter }) => {
  const fCountries = countries.filter((country) =>
    country.name.toUpperCase().includes(filter.toUpperCase())
  );

  if (fCountries.length === 1) {
    return <SelectedCountry country={fCountries[0]} />;
  } else {
    if (fCountries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else {
      return (
        <div>
          {fCountries.map((country) => (
            <div key={country.name}>
              {country.name}{" "}
              <button onClick={() => setNewFilter(country.name)}>show</button>
            </div>
          ))}
        </div>
      );
    }
  }
};

export default Countries;
