import React from "react";

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <p>
        {props.name} {props.exercises}
      </p>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part name={props.name[0]} exercises={props.exercises[0]} />
      <Part name={props.name[1]} exercises={props.exercises[1]} />
      <Part name={props.name[2]} exercises={props.exercises[2]} />
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
      <Content name={parts} exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  );
};

export default App;
