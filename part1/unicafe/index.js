import React, {useState} from 'react';
import ReactDOM from 'react-dom';

const Button = ({clickHandler, buttonText}) => <button onClick={clickHandler}>{buttonText}</button>

const Statistic = ({counter, text}) => {
    return (
        <tr>
            <td>{text}</td>
            <td>{counter}</td>
        </tr>
    )
}

const Positive = ({value, total}) =>  {
    return(
    <tr>
        <td>positive </td>
        <td>{(value/total)*100} %</td>
    </tr>
    )
}

const Statistics = (props) => {
    if (props.all === 0){
        return (
            <p>No feedback given</p>
        )
    }

    return(
        <table>
            <tbody>
                <Statistic counter={props.good} text="good" />
                <Statistic counter={props.neutral} text="neutral" />
                <Statistic counter={props.bad} text="bad" />
                <Statistic counter={props.all} text="all" />
                <Statistic counter={props.score/props.all} text="average" />
                <Positive value={props.good} total={props.all} />
            </tbody>
        </table>
    )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [score, setScore] = useState(0)

  const stateTracker = (func, value, allFunc, allValue, scoreFunc, scoreVal, increment) => {
    const handler = () => {
      func(value+1)
      allFunc(allValue+1)
      scoreFunc(scoreVal+increment)
    }
    return handler
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button clickHandler={stateTracker(setGood, good, setAll, all, setScore, score, 1)} buttonText="good" />
      <Button clickHandler={stateTracker(setNeutral, neutral, setAll, all, setScore, score, 0)} buttonText="neutral" />
      <Button clickHandler={stateTracker(setBad, bad, setAll, all, setScore, score, -1)} buttonText="bad" />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} score={score}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

ReactDOM.render(<App />, document.getElementById('root'))