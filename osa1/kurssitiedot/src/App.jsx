const Header = (props) => {
 return (
    <h1>{props.course}</h1>
 )
}

const Content = ({ part1, exercises1, part2, exercises2, part3, exercises3 }) => {
  return(
    <div>
      <Part name={part1} exercises={exercises1} />
      <Part name={part2} exercises={exercises2} />
      <Part name={part3} exercises={exercises3} />
    </div>
)
}

const Total = (props) => {
  return(
      <p>
        Number of exercises {props.total}
      </p>
  )
}

const Part = (props) => {
  return(
      <p>
        {props.name} {props.exercises}
      </p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header course={course} />
      <Content 
              part1={part1.name + ' ' + part1.exercises}
              part2={part2.name + ' ' + part2.exercises}
              part3={part3.name + ' ' + part3.exercises} />
      <Total total={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

export default App