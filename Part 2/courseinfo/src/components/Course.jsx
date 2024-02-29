//refactored Header and Part (single line, destructuring)
const Header = ({ name }) => <h1>{name}</h1>
  
  const Part = ({ title, number }) => <li>{title}, ({number} exercices)</li>
  
  const Content = ({ parts }) => {
    console.log('parts', parts)
    return (
      <ul>
        {
        // right, I already had a .map there, but not pretty
          parts.map((part) => 
            <Part 
                key={parts.i} 
                title={part.name} 
                number={part.exercises}
            />
            )
        }
      </ul>
    )
  }
  
  
//   const Total = (props) => {
//     const parts= props.parts
//     let sum = 0
//     parts.forEach(e => {
//       sum += e.exercises
//     })
  
//     return (
//       <div>
//         <p>Total of exercices: {sum}</p>
//       </div>
//     )
//   }

const Course = ({course}) => {
    console.log(course);
    return (
        // could do a .map for each course...
        <div>
            <Header key={course.id} name={course.name}/>
            <Content parts={course.parts}/>
        </div>
    )
}

export default Course