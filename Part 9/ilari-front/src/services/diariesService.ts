import axios, {AxiosError} from "axios";
import { NewDiaryEntry, DiaryEntry } from "../types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = async () => {
	return await axios
      .get<DiaryEntry[]>(`${baseUrl}/complete`)
      .then(res => res.data);
}

export const postDiary = async (object:NewDiaryEntry) => {
	try {
		await axios
				.post<NewDiaryEntry>(baseUrl, object)
				.then(res =>res.data)
	} catch (error:unknown) {
		let errorMessage = 'Axios error: ';
		if (axios.isAxiosError(error)) {
			if(error.response){
				//console.log(error.response.data.error[0].message);
				errorMessage += `${error.response.data.error[0].message}`;
			}
		}
		throw new Error(errorMessage);
	}
}