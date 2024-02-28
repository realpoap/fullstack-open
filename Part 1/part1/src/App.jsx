import { useState } from 'react'

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updateLeft=left+1
    setLeft(updateLeft)
    setTotal(updateLeft+right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updateRight = right+1
    setRight(updateRight)
    setTotal(left+updateRight)
  }

  const Button = ({ handleClick, text }) => (  
    <button onClick={handleClick}>{text}</button>
    )

  const History = (props) => {  
    if (props.allClicks.length === 0) {    
      return (      
      <div>the app is used by pressing the buttons</div>    
      )  
    }  
    return (    
      <div>button press history: {props.allClicks.join(' ')}</div>  
    )
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left'/>
      <Button handleClick={handleRightClick} text='right'/>
      {right}
      <History allClicks={allClicks}/>
      <p>Total: {total}</p>
      </div>
  )
}

export default App