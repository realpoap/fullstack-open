import { z } from "zod";
import { Gender } from "./types";

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