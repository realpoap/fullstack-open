import { useState } from 'react'


const Display = ({counter}) => <h1>{counter}</h1>

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {

  const [counter, setCounter] = useState(0)
  console.log('rendering with counter value', counter)
  const increaseByOne = () => {
    console.log('increasing, value before', counter)    
    setCounter(counter + 1)
  }

  const decreaseByOne = () => { 
    console.log('decreasing, value before', counter)   
    setCounter(counter - 1)
  }

  const setToZero = () => {
    console.log('resetting to zero, value before', counter)    
    setCounter(0)
  }


  return (
    <div>
      <Display counter={counter} />
      <Button onClick={increaseByOne} text='Add'/>
      <Button onClick={decreaseByOne} text='Substract'/>
      <Button onClick={setToZero} text='Reset'/>
    </div>
  )
}

export default App