import axios from "axios";
import { NewDiaryEntry, DiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = async () => {
	return await axios
      .get<DiaryEntry[]>(`${baseUrl}/complete`)
      .then(res => res.data);
}

export const postDiary = async (object:NewDiaryEntry) => {
	return await axios
      .post<NewDiaryEntry>(baseUrl, object)
      .then(res =>res.data)
}