import { useEffect, useState } from "react"

import { DiaryEntry, NewDiaryEntry } from "./types"
import Diary from "./components/Diary"
import { getAllDiaries, postDiary } from "./services/diariesService"
import Alert from "./components/Alert"

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [comment, setComment] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')


  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  },[])

  const createDiary = (e:React.SyntheticEvent) => {
    e.preventDefault()
    const objectDiary = {
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment
    }
    postDiary(objectDiary as NewDiaryEntry)
      .then(data => {
        setDiaries(diaries.concat(data));
      })
      .catch(error => notify(error.message))
  }

  const notify = (error:string) => {
    setMessage(error)
    setTimeout(()=>{
      setMessage('')
    }, 3000)
  }

  // FIXME:
  const alertStyle:React.CSSProperties = {
    color: 'red',
  };

  return (
    <>
      <Alert style={alertStyle} message={message}/>
      <h2>Add new entry :</h2>
      <form onSubmit={createDiary}>
        <div>
        <label>Date
          <input
            type="date"
            value={date}
            onChange={(e)=>setDate(e.target.value)}
          />
        </label>
        </div>
        <div>

        <label>Visibility
          <input
            type='string'
            value={visibility}
            onChange={(e)=>setVisibility(e.target.value)}
          />
        </label>
        </div>
        <div>

        <label>Weather
          <input
            type="string"
            value={weather}
            onChange={(e)=>setWeather(e.target.value)}
          />
        </label>
        </div>
        <div>

        <label>Comment
          <input
            type="string"
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
          />
        </label>
        </div>
        <button type="submit">Send</button>
      </form>
      <h2>Diary Entries</h2>
      {
        diaries.map(d => 
          <Diary key={d.id} diary={d}/>
        )
      }
    </>
  )
}

export default App
