import React from "react";

const Person = ({ person, handleDelete }) => {
  //console.log("test");
  return (
    <div key={person.name}>
      {person.name} {person.number}
      <button name={person.name} onClick={handleDelete}>
        delete
      </button>
    </div>
  );
};

export default Person;
