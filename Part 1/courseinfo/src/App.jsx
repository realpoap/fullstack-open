const Header = (props) => {
  return (
    <>
    <h1>{props.title}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.title}, ({props.number} exercices)</p>
    </>
  )
}

const Content = (props) => {
  console.log(props.exercises)
  return (
    // use .map()
    <div> 
      <Part title={props.parts[0]} number={props.exercises[0]}/>
      <Part title={props.parts[1]} number={props.exercises[1]}/>
      <Part title={props.parts[2]} number={props.exercises[2]}/>
    </div>
  )
}

const Total = (props) => {
  const sum = parseInt(props.exercises[0]) + parseInt(props.exercises[1]) + parseInt(props.exercises[2]) 
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
      <Content parts={partList} exercises={exerciseList}/>
      <Total exercises={exerciseList}/>
    </div>
  )
}

export default App