import { useState } from 'react'

const Display = ({text}) => <h1>{text}</h1>

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const StatLine = ({text, feedback, unit}) => {
  const convertedFeedback = feedback ? feedback : 0
  return (
    <p>{text}: {convertedFeedback}{unit}</p>
  )
}

const Statistic = ({good, bad, neutral, sum, avg, pos}) => {
  console.log(good)
  if (sum>0) {
    return (
      <div>
        <Display text='Statistics'/>
  
          <StatLine text='good' feedback={good}/>
          <StatLine text='neutral' feedback={neutral}/>
          <StatLine text='bad' feedback={bad}/>
          <StatLine text='total' feedback={sum}/>
          <StatLine text='average' feedback={avg}/>
          <StatLine text='positive' feedback={pos} unit=' %'/>
      </div>
    )
  }
  return (
    <div>
      <Display text='Statistics'/>
      <p>No feedback given</p>
    </div>
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
      {/* Oh I don't like that at all, couldn<t we pass everything as props={[a,b,c]} */}
      <Statistic 
        good={good}
        bad={bad}
        neutral={neutral}
        sum={sum}
        avg={avg}
        pos={pos}  
      />
    </div>
  )
}

export default App