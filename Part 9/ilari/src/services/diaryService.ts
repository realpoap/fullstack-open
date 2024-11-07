import diaries from '../../data/entries';
import { DiaryEntry, NonSensitiveDiaryEntry } from '../types';


const getEntries = ():DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveDiariesEntries = ():NonSensitiveDiaryEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => ({    id,    date,    weather,    visibility,  }));
};

const addDiary = () => {
  return null;
};

export default {
  getEntries,
  getNonSensitiveDiariesEntries,
  addDiary
};