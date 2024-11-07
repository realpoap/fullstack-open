import { NewDiaryEntry, Weather, Visibility } from "./types";
import {z} from 'zod';


// //type-guards
// const isString = (text: unknown):text is string => {
// 	return typeof text === 'string' || text instanceof String;
// };

// const isDate = (date:string):boolean => {
// 	return Boolean(Date.parse(date));
// };

// const isWeather = (param: string):param is Weather => {
// 	return Object.values(Weather).map(v => v.toString()).includes(param);
// };

// const isVisibility = (param: string): param is Visibility => {
//   return Object.values(Visibility).map(v => v.toString()).includes(param);
// };

// //parsers
// const parseComment = (comment:unknown):string => {
// 	if (!isString(comment)) {
// 		throw new Error('Incorrect or missing comment');
// 	}
// 	return comment;
// };

// const parseDate = (date: unknown):string => {
// 	if (!isString(date) || !isDate(date)) {
// 		throw new Error(`Incorrect or missing date: ${date}`);
// 	}
// 	return date;
// };

// const parseWeather = (weather: unknown): Weather => {
//   if (!isString(weather) || !isWeather(weather)) {
//       throw new Error(`Incorrect or missing weather: ${weather}`);
//   }
//   return weather;
// };


// const parseVisibility = (visibility: unknown): Visibility => {
//   if (!isString(visibility) || !isVisibility(visibility)) {
//       throw new Error(`Incorrect or missing visibility: ${visibility}`);
//   }
//   return visibility;
// };

// zod object
export const NewEntrySchema = z.object({
  weather: z.nativeEnum(Weather),
  visibility: z.nativeEnum(Visibility),
  date: z.string().date(),
  comment: z.string().optional()
});
