import { useState } from 'react'

const Header = (props) =>(<h1>{props.header}</h1>)
const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Statistics = (props) => {
 const sum = props.good + props.bad + props.neutral
 const average = (props.good*1 + props.bad*-1 + props.neutral*0) / sum
 const positive = ((props.good / sum)*100)
  
 return (
  <div>
    <div>good: {props.good}</div>
      <div>neutral: {props.neutral}</div>
      <div>bad: {props.bad}</div>
      <div>all: {sum}</div>
      <div>average: {average}</div>
      <div>positive: {positive} %</div>
  </div>
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