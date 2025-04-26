const Header = (parts) => {
  return (
    <h1>{parts.course}</h1>
 )
}

const Content = ({parts}) => {
  return(
    <div>
      {parts.map((row, i) => (
        <Part key={i} row={row} />
      ))}
    </div>
)
}

const Total = ({parts}) => {
  return(
      <p>
        Number of exercises: {parts[0].exercises + parts[1].exercises + parts[2].exercises}
      </p>
  )
}

const Part = ({row}) => {
  return(
      <p>
        {row.name}: {row.exercises}
      </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App