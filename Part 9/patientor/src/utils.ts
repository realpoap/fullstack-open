import { z } from "zod";
import { Gender, HealthCheckRating } from "./types";


// const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
//   if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
//     // we will just trust the data to be in correct form
//     return [] as Array<Diagnosis['code']>;
//   }

//   return object.diagnosisCodes as Array<Diagnosis['code']>;
// };

// ssn regex
const re = new RegExp('[0-9]+-[A-Za-z0-9]+');

export const NewPatientSchema = z.object(
	{
		name: z.string(),
		dateOfBirth: z.string().date(),
		ssn: z.string().refine((value)=>re.test(value??""),'Incorrect ssn'),
		gender: z.nativeEnum(Gender),
		occupation: z.string().optional(),
		}
);

export const NewEntrySchema = z.object(
	{
		type:z.string(),
		description: z.string(),
  	date: z.string().date(),
  	specialist: z.string().optional(),
  	employerName: z.string().optional(),
  	healthCheckRating:z.nativeEnum(HealthCheckRating).optional(),
		diagnosisCodes: z.string().array().optional(),
  	discharge: z.object({
			date: z.string().date(),
			criteria: z.string()
		}).optional(),
		sickLeave: z.object({
			startDate: z.string().date(),
			endDate: z.string().date(),
		}).optional(),
	}
);