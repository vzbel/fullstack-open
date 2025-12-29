import { useState } from 'react';

const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
);

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];
  const [selected, setSelected] = useState(0);
  const initializeVotes = () => {
    const temp = {};
    for(let i = 0; i < anecdotes.length; i++){
      temp[i] = 0;
    }
    return temp;
  };
  const [votes, setVotes] = useState(initializeVotes);

  const handleVote = () => {
    const newVotes = {...votes};
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const handleAnecdoteChange = () => {
    // In range [0, lastIndex]
    const randomIndex = Math.floor(Math.random() * (anecdotes.length-1)); 
    setSelected(randomIndex);
  };

  const getMaxAnecdoteIdx = () => {
    let max = 0;
    for(let i = 0; i < anecdotes.length; i++){
      if(votes[i] > votes[max]){
        max = i;
      }
    }
    return max;
  }

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <Button onClick={handleVote} text="vote"/>
      <Button onClick={handleAnecdoteChange} text="next anecdote"/>

      <h2>Anecdote with Most Votes</h2>
      <p>{anecdotes[getMaxAnecdoteIdx()]}</p>
      <p>has {votes[getMaxAnecdoteIdx()]} votes</p> 
    </div>
  );
};

export default App;