import React, { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <>
      {text} {value}
    </>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad;
  const average = (good * 1 + neutral * 0 + bad * -1) / total;
  const positive = (good / total) * 100;
  if (total === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <p>
          <StatisticLine text="good" value={good} />
          <br />
          <StatisticLine text="neutral" value={neutral} />
          <br />
          <StatisticLine text="bad" value={bad} />
          <br />
          <StatisticLine text="all" value={total} />
          <br />
          <StatisticLine text="average" value={average} />
          <br />
          <StatisticLine text="positive" value={positive} /> % <br />
        </p>
      </div>
    );
  }
};

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };

  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };

  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
