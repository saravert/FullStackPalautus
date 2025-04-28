const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = ({ course }) => (
 <div>
    <Header header={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
  </div>
 )

const Header = ({header}) => <h1>{header}</h1>

const Content = ({ parts }) => (
  <div>
    {parts.map(part => (
      <Part key={part.id} part={part} />
    ))}
  </div>
)

const Part = ({ part }) => (
  <div>
    {part.name} {part.exercises}
  </div>
)

const Total = ({parts}) => {
  console.log(parts)
  const total = parts.reduce((initialValue, currentValue) => initialValue + currentValue.exercises, 0)
  console.log(total)
  return (
  <div>total of {total} excercises</div>
  )
}

export default App