import React from "react";
import Person from "./Person";

const Persons = ({ persons, filter, handleDelete }) => {
  return (
    <div>
      {persons
        .filter((person) =>
          person.name.toUpperCase().includes(filter.toUpperCase())
        )
        .map((person) => (
          <Person
            key={person.name}
            person={person}
            handleDelete={handleDelete}
          />
        ))}
    </div>
  );
};

export default Persons;
