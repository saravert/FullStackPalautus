import { useState } from 'react'

const Button = (props) => (
  <button onClick={props.onClick}>
    {props.text}
  </button>
)

const Header = (props) => (<h1>{props.header}</h1>)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const anectodeDay = "Anectode of the day"
  const anectodeMostVotes = "Anectode with most votes"

  const keepVotes = () => {
    const copy = [ ...votes ]
    copy[selected] += 1
    setVotes(copy)
  }

  const mostVotes = Math.max(...votes)
  const mostVotedIndex = votes.indexOf(mostVotes)

  return (
    <div>
      <Header header={anectodeDay}/>
      <div>{anecdotes[selected]}</div>
      <div>Has {votes[selected]} votes</div>
      <Button onClick={keepVotes} text="vote" />
      <Button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text="next anectode"/>
      <Header header={anectodeMostVotes}/>
      <div>{anecdotes[mostVotedIndex]}</div>
      <div>Has {mostVotes} votes</div>
    </div>
  )
}

export default App