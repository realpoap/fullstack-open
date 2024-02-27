const Header = (props) => {
  return (
    <>
    <h1>{props.title}</h1>
    </>
  )
}

const Content = (props) => {
  return (
    // use .map()
    <div> 
      <p>{props.parts[0]} ({props.exercices[0]} exercices)</p>
      <p>{props.parts[1]} ({props.exercices[1]} exercices)</p>
      <p>{props.parts[2]} ({props.exercices[2]} exercices)</p>
    </div>
  )
}

const Total = (props) => {
  const sum = parseInt(props.exercices[0]) + parseInt(props.exercices[1]) + parseInt(props.exercices[2]) 
  console.log(sum)
  // use .reduce() ?
  return (
    <div>
      <p>Total of exercices: {sum}</p>
    </div>
  )
}



const App = () => {
  const course = 'Half Stack application development'
  const partList = ['Fundamentals of React', 'Using props to pass data', 'State of a component']
  const exerciseList = [10,7,14]

  return (
    <div>
      <Header title={course}/>
      <Content parts={partList} exercices={exerciseList}/>
      <Total exercices={exerciseList}/>
    </div>
  )
}

export default App