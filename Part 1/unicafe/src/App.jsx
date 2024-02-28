import { useState } from 'react'

const Display = ({text}) => <h1>{text}</h1>

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Label = ({text, feedback, unit}) => {
  const convertedFeedback = feedback ? feedback : 0
  return (
    <p>{text}: {convertedFeedback}{unit}</p>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const sum = (good + neutral + bad)

  // not good that its NaN at the start
  const avg = (good*1 + neutral*0 + bad*(-1)) / sum
  const pos = (good/sum)*100

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
        <Label text='total' feedback={sum}/>
        <Label text='average' feedback={avg}/>
        <Label text='positive' feedback={pos} unit=' %'/>
      </div>
    </div>
  )
}

export default App