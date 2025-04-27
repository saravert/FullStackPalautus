import { useState } from 'react'

const Header = (props) =>(<h1>{props.header}</h1>)
const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}
const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
 const sum = props.good + props.bad + props.neutral
 if (sum === 0){
  return(
    <div>No feedback given</div>
  )
 }
 const average = (props.good*1 + props.bad*-1 + props.neutral*0) / sum
 const positive = ((props.good / sum)*100)
  
 return (
  <table>
  <tbody>
    <StatisticLine text="good" value ={props.good} />
    <StatisticLine text="neutral" value ={props.neutral} />
    <StatisticLine text="bad" value ={props.bad} />
    <StatisticLine text="all" value ={sum} />
    <StatisticLine text="average" value ={average} />
    <StatisticLine text="positive" value ={positive + "%"} />
  </tbody>
  </table>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const feedback = "give feedback"
  const statistics = "statistic"

  return (
    <div>
      <Header header={feedback}/>
      <Button onClick={() => setGood(good + 1)} text = "good"/>
      <Button onClick={() => setNeutral(neutral + 1)} text = "neutral"/>
      <Button onClick={() => setBad(bad + 1)} text = "bad"/>
      <Header header={statistics}/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App