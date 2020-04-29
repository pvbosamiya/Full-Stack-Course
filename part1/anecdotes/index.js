import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({clickHandler, buttonText}) => <button onClick={clickHandler}>{buttonText}</button>

const Statistic = ({index, count, anecdotes}) => {
  if (index === -1){
    return (<>No votes received yet</>)
  }

  return (
      <>
      {anecdotes[index]}<br/>
       has {count} votes
      </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const numberAnecdotes = anecdotes.length

  const initialVoteCount = Array(numberAnecdotes).fill(0)
  const [votes, setVotes] = useState(initialVoteCount)
  const [topVote, setTopVote] = useState({maxVotes: 0, index: -1})

  const nextAnecdoteHandler = () => {
    let nextAnecdoteIndex = Math.floor(Math.random() * Math.floor(numberAnecdotes))
    setSelected(nextAnecdoteIndex)
  }

  const voteHandler = () => {
    const votesCopy = [...votes]
    votesCopy[selected] += 1

    if (votesCopy[selected] > topVote.maxVotes)
    {
      const topVoteCopy = {...topVote}
      topVoteCopy["maxVotes"] = votesCopy[selected]
      topVoteCopy["index"] = selected
      setTopVote(topVoteCopy)
    }

    setVotes(votesCopy)
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {props.anecdotes[selected]} <br/>
      has {votes[selected]} votes <br/>
      <Button clickHandler={voteHandler} buttonText='vote' />
      <Button clickHandler={nextAnecdoteHandler} buttonText='next anecdote' />
      <h2>Anecdote with most votes</h2>
      <Statistic anecdotes={props.anecdotes} count={topVote.maxVotes} index={topVote.index} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(<App anecdotes={anecdotes}/>, document.getElementById('root'))