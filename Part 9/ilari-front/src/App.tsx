import { useEffect, useState } from "react"

import { DiaryEntry, Visibility, Weather } from "./types"
import Diary from "./components/Diary"
import { getAllDiaries, postDiary } from "./services/diariesService"
import Alert from "./components/Alert"

function App() {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [comment, setComment] = useState('')
  const [visibility, setVisibility] = useState<Visibility>()
  const [weather, setWeather] = useState<Weather>()
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')


  useEffect(() => {
    getAllDiaries().then(data => {
      setDiaries(data)
    })
  },[])

  const createDiary = (e:React.SyntheticEvent) => {
    e.preventDefault()
    console.log(date, visibility, weather);
    
    if (date && visibility && weather) {
      const newDiaryObject = {
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment
      }
      console.log('newDiary:',newDiaryObject);
      
      if(newDiaryObject !== undefined){
        postDiary(newDiaryObject)
          .then((data:any) => {
            console.log('received data:', data);
            if (data !== undefined) {
                setDiaries(diaries.concat(data));
                notify('all good');
              }
            }
          )
          .catch(error => notify(error.message))
      }
    }
    
    setComment('');
    setDate('');
  }

  const notify = (error:string) => {
    setMessage(error)
    setTimeout(()=>{
      setMessage('');
    }, 3000)
  }

  const alertStyle:React.CSSProperties = {
    color: 'red',
  };

  return (
    <>
      <Alert style={alertStyle} message={message}/>
      <h2>Add new entry :</h2>
      <form onSubmit={createDiary}>
        <>
          <label>Date
            <input
              type="date"
              value={date}
              onChange={(e)=>setDate(e.target.value)}
            />
          </label>
          <div id="visibility">
            Visibility
            <label>
              <input
                type='radio'
                name="visibility"
                value='poor'
                onChange={()=>setVisibility(Visibility.Poor)}
              />poor
            </label>
            <label>
              <input
                type='radio'
                name="visibility"
                value='ok'
                onChange={()=>setVisibility(Visibility.Ok)}
              />ok
            </label>
            <label>
              <input
                type='radio'
                name="visibility"
                value='good'
                onChange={()=>setVisibility(Visibility.Good)}
              />good
            </label>
            <label>
              <input
                type='radio'
                name="visibility"
                value='great'
                onChange={()=>setVisibility(Visibility.Great)}
              />great
            </label>
          </div>
          <div id="weather">
            Weather
            <label>
              <input
                type="radio"
                name="weather"
                value='sunny'
                onChange={()=>setWeather(Weather.Sunny)}
              />sunny
            </label>
            <label>
              <input
                type="radio"
                name="weather"
                value='rainy'
                onChange={()=>setWeather(Weather.Rainy)}
              />rainy
            </label>
            <label>
              <input
                type="radio"
                name="weather"
                value='cloudy'
                onChange={()=>setWeather(Weather.Cloudy)}
              />cloudy
            </label>
            <label>
              <input
                type="radio"
                name="weather"
                value='stormy'
                onChange={()=>setWeather(Weather.Stormy)}
              />stormy
            </label>
            <label>
              <input
                type="radio"
                name="weather"
                value='windy'
                onChange={()=>setWeather(Weather.Windy)}
              />windy
            </label>
          </div>
          <label>Comment
            <input
              type="string"
              value={comment}
              onChange={(e)=>setComment(e.target.value)}
            />
          </label>
        </>
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
