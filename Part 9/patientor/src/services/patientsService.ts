import { v1 as uuid } from 'uuid';

import patients from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient } from '../types';

const getPatients = ():Patient[] => {
	return patients;
};

const getSinglePatient = (id:string):Patient => {
	const patient = patients.find(p => p.id === id);
	if (patient === undefined) {
		throw new TypeError("No patient was found.");
	}
	return patient;
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
	getSinglePatient,
	getNonSensitivePatients,
	addPatient
};