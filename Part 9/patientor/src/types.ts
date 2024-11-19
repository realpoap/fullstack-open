import { z } from "zod";
import {NewPatientSchema} from './utils';

export enum Gender {
	Male = 'male',
	Female = 'female',
	Other = 'other',
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

const SickLeave = z.object({
	startDate: z.string(),
	endDate: z.string(),
});
export type SickLeave = z.infer<typeof SickLeave>;

const Discharge = z.object({
    date: z.string(),
    criteria: z.string(),
  });
export type Discharge = z.infer<typeof Discharge>;

interface HealthCheckEntry extends BaseEntry {
	type: "HealthCheck";
	healthCheckRating: HealthCheckRating;
}

interface OccupationalHealthcareEntry extends BaseEntry {
	type: "OccupationalHealthcare";
	employerName: string;
	sickLeave?: SickLeave;
}

interface HospitalEntry extends BaseEntry {
	type: "Hospital";
	discharge: Discharge;
}

export type Entry = 
| HospitalEntry
| OccupationalHealthcareEntry
| HealthCheckEntry;

type UnionOmit<T,K extends string|number|symbol> = 
	T extends unknown ? Omit<T,K> : never;

export type NewEntry = UnionOmit<Entry, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = z.infer<typeof NewPatientSchema>;

const Diagnosis = z.object({
	code: z.string(),
	name: z.string(),
	latin : z.string().optional(),
});
export type Diagnosis = z.infer<typeof Diagnosis>;

// export interface Diagnosis {
// 	code: string;
// 	name: string;
// 	latin? : string;
// }

export interface Patient extends NewPatient{
	id: string;
	entries: Entry[];
}