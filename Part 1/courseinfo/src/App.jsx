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
  const parts = props.parts
  console.log(parts)
  return (
    <div>
      {
        parts.map((e,i) => <Part key={i} title={e.name} number={e.exercises}></Part>)
      }
    </div>
  )
        // or without Part component :
        // parts.map((e, i) => <p key={i}>{e.name}, {e.exercises} exercices</p>)
  }


const Total = (props) => {
  const parts= props.parts
  let sum = 0
  parts.forEach(e => {
    sum += e.exercises
  })

  return (
    <div>
      <p>Total of exercices: {sum}</p>
    </div>
  )
}



const App = () => {
  const course = 'Half Stack application development'
  // let<s do this the other way around
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

  const partList = [part1, part2, part3]

  return (
    <div>
      <Header title={course}/>
      <Content parts={partList}/>
      <Total parts={partList}/>
    </div>
  )
}

export default App