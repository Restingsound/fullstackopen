import React from "react";

const Sum = ({ course }) => {
  const sum = course.parts.reduce((acc, { exercises }) => acc + exercises, 0);
  return (
    <p>
      <b>total of {sum} exercises</b>
    </p>
  );
};

export default Sum;
