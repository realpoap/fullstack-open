import { useEffect, useState } from "react"

import { DiaryEntry, NewDiaryEntry } from "./types"
import Diary from "./components/Diary"
import { getAllDiaries, postDiary } from "./services/diariesService"

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [comment, setComment] = useState('')
  const [visibility, setVisibility] = useState('')
  const [weather, setWeather] = useState('')
  const [date, setDate] = useState('')


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
    console.log(objectDiary);
    postDiary(objectDiary as NewDiaryEntry).then(data => {
      setDiaries(diaries.concat(data as DiaryEntry));
    })
    
  }

  return (
    <>
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
