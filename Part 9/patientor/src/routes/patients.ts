import express, {Response} from 'express';
import { NonSensitivePatient} from '../types';

import patientsService from '../services/patientsService';
import toNewPatient from '../utils';

const router = express.Router();

router.get('/', (_req, res:Response<NonSensitivePatient[]>) => {
	res.send(patientsService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
	try {
	const newPatientEntry = toNewPatient(req.body);
	const newEntry = patientsService.addPatient(newPatientEntry);
	res.json(newEntry);
	} catch (error) {
		let errorMessage = 'Something went wrong. ';
		if (error instanceof Error) {
			errorMessage += `Error: ${error.message}`;
		}
		res.status(400).send(errorMessage);
	}

	
});

export default router;