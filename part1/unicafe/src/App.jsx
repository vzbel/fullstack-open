import {useState} from "react";


const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
);

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <th>{text}</th>
      <td>{value}</td>
    </tr>
  );
};

// Display cafe ratings
const Statistics = (props) => {
  if(props.all === 0){
    return <p>No feedback given</p>
  }
  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <StatisticLine 
            text="good" 
            value={props.good} 
          />
          <StatisticLine 
            text="neutral" 
            value={props.neutral} 
          />
          <StatisticLine 
            text="bad" 
            value={props.bad} 
          />
          <StatisticLine 
            text="all" 
            value={props.all} 
          />
          <StatisticLine 
            text="avg" 
            value={props.avg} 
          />
          <StatisticLine 
            text="positive" 
            value={props.positivePct + " %"} 
          />
        </tbody>
      </table>
    </>
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

  const weights = {
    good: 1,
    neutral: 0,
    bad: -1
  };

  const calculateTotal = () => {
    return good + neutral + bad;
  }

  const calculateRatingAvg = () => {
    const total = calculateTotal();
    if(total === 0){
      return 0;
    }
    return ((good * weights.good + neutral * weights.neutral +
    bad * weights.bad) / total)
  };

  const calculatePositivePct = () => {
    const total = calculateTotal();
    if(total === 0){
      return 0;
    }
    return good / total * 100.0;
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text="good"/>
      <Button onClick={handleNeutral} text="neutral"/>
      <Button onClick={handleBad} text="bad"/>
      <Statistics 
        good={good} 
        neutral={neutral} 
        bad={bad} 
        all={calculateTotal()}
        avg={calculateRatingAvg()}
        positivePct={calculatePositivePct()}
      />
    </div>
  );
};

export default App;