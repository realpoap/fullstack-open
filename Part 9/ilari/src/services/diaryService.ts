import diaries from '../../data/entries';
import { 
  DiaryEntry, 
  NewDiaryEntry, 
  NonSensitiveDiaryEntry,
} from '../types';


const getEntries = ():DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveDiariesEntries = ():NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({
    id,    
    date,    
    weather,    
    visibility,  
  }));
};

const addDiary = (entry:NewDiaryEntry):DiaryEntry => {
  const newDiaryEntry = {
    id: Math.max(...diaries.map(d => d.id))+1,
    ...entry
  };
  console.log('addDiary (backend):',newDiaryEntry);
  
  diaries.push(newDiaryEntry);
  return newDiaryEntry;
};

const findById = (id:number):DiaryEntry|undefined => {
  const entry = diaries.find(d => d.id === id);
  return entry;
  ; 
};

export default {
  getEntries,
  getNonSensitiveDiariesEntries,
  addDiary,
  findById
};