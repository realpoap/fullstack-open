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
type SickLeave = z.infer<typeof SickLeave>;

const Discharge = z.object({
    date: z.string(),
    criteria: z.string(),
  });
type Discharge = z.infer<typeof Discharge>;

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

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Diagnosis {
	code: string;
	name: string;
	latin? : string;
}

export interface Patient extends NewPatient{
	id: string;
	entries: Entry[];
}