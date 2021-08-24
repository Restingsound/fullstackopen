import React from "react";

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.exercises}
      </p>
    </div>
  );
};

const Total = (props) => {
  var exerciseCount = 0;
  for (var i = 0; i < props.exercises.length; i++) {
    exerciseCount += props.exercises[i];
  }
  return (
    <div>
      <p>Number of exercises {exerciseCount}</p>
    </div>
  );
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    "Fundamentals of React",
    "Using props to pass data",
    "State of a component",
  ];
  const exercises = [10, 7, 14];

  return (
    <div>
      <Header course={course} />
      <Content name={parts[0]} exercises={exercises[0]} />
      <Content name={parts[1]} exercises={exercises[1]} />
      <Content name={parts[2]} exercises={exercises[2]} />
      <Total exercises={exercises} />
    </div>
  );
};

export default App;
