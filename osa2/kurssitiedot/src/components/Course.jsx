const Course = ({ course }) => (
    <div>
       <Header header={course.name} />
       <Content parts={course.parts} />
       <Total parts={course.parts} />
     </div>
    )
   
   const Header = ({header}) => <h2>{header}</h2>
   
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
     const total = parts.reduce((initialValue, currentValue) => initialValue + currentValue.exercises, 0)
     return (
     <div>
       <strong>
       total of {total} excercises
       </strong>
     </div>
     )
   }

   export default Course