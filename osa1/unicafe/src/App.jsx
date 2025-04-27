import { useState } from 'react'

const Header = (props) =>{
  return (
    <h1>{props.header}</h1>
 )
}

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

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
      <div>good: {good}</div>
      <div>neutral: {neutral}</div>
      <div>bad: {bad}</div>
    </div>
  )
}

export default App