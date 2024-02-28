import { useState } from 'react'

const Display = ({text}) => <h1>{text}</h1>

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>


const Label = ({text, feedback}) => <p>{text}: {feedback}</p>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <div>
        <Display text='Give Feedback'/>
        <Button text='good' onClick={() => setGood(good+1)}/>
        <Button text='neutral' onClick={() => setNeutral(neutral+1)}/>
        <Button text='bad' onClick={() => setBad(bad+1)}/>
      </div>
      <div>
        <Display text='Statistics'/>
        <Label text='good' feedback={good}/>
        <Label text='neutral' feedback={neutral}/>
        <Label text='bad' feedback={bad}/>
      </div>
    </div>
  )
}

export default App