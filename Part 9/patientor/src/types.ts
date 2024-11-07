export type Gender = 'male' | 'female' | 'other';

export type NonSensitivePatient = Omit<Patient, 'ssn'>;

export interface Diagnosis {
	code: string;
	name: string;
	latin? : string;
}

export interface Patient {
	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: Gender;
	occupation?: string; 
}