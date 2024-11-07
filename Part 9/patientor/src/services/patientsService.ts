import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../types';

const getPatients = ():Patient[] => {
	return patients;
};

const getNonSensitivePatients = ():NonSensitivePatient[] => {
	return patients.map(({id, name, dateOfBirth, gender, occupation}) => (
		{
		id,
		name,
		dateOfBirth,
		gender,
		occupation
	}
));
};

const addPatient = (entry:NewPatient):Patient => {
	const newPatientEntry = {
		id: uuid(),
		...entry
	};
	patients.push(newPatientEntry);
	return newPatientEntry;
};

export default {
	getPatients,
	getNonSensitivePatients,
	addPatient
};