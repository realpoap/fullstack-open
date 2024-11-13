import { z } from "zod";
import {NewPatientSchema} from './utils';

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Diagnosis {
	code: string;
	name: string;
	latin? : string;
}

export interface Patient extends NewPatient{
	id: string;
	entries: string[];
}