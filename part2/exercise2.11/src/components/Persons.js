import React from "react";

const Persons = ({ persons, filter }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toUpperCase().includes(filter.toUpperCase())
        )
        .map((person) => (
          <div key={person.name}>
            {person.name} {person.number}
          </div>
        ))}
    </div>
  );
};

export default Persons;
