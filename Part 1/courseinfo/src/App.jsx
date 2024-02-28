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
  const course = {
    name: 'Half Stack application development',
    parts: [
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
  }

  console.log(course.name)

  return (
    <div>
      <Header title={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App