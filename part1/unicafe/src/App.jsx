import {useState} from "react";


const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
);

// Display cafe ratings
const Display = ({good, neutral, bad}) => {
  return (
    <div>
      <h2>statistics</h2>
      <p>good: {good}</p>
      <p>neutral: {neutral}</p>
      <p>bad: {bad}</p>
    </div>
  );
} 

const App = () => {
  // Clicks for each btn
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => setGood(good + 1);
  const handleNeutral = () => setNeutral(neutral + 1);
  const handleBad = () => setBad(bad + 1);

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handleNeutral} text="neutral"/>
      <Button onClick={handleBad} text="bad"/>
      <Display good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;