//refactored Header and Part (single line, destructuring)
const Header = ({ name }) => <h1>{name}</h1>
  
  const Part = ({ title, number }) => <li>{title}, ({number} exercices)</li>
  
  const Content = ({ parts }) => {
    return (
      <ul>
        {
        // right, I already had a .map there, but not pretty
          parts.map((part) => 
            <Part 
                key={part.id} 
                title={part.name} 
                number={part.exercises}
            />
            )
        }
      </ul>
    )
  }
  
  
  const Total = ({parts}) => {
    let total = parts.reduce((sum, part) => {
        console.log('sum', sum, 'part', part)
        return sum + part.exercises
    , 0})
    // let sum = 0
    // parts.forEach(e => {
    //   sum += e.exercises
    // })
  
    return (
      <div>
        <p>Total of exercices: {total}</p>
      </div>
    )
  }

const Course = ({course}) => {
    console.log(course);
    return (
        // could do a .map for each course...
        <div>
            <Header key={course.id} name={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course