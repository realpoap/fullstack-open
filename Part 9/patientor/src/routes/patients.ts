import express, {Request, Response, NextFunction} from 'express';
import { z } from 'zod';
import { NewPatient, Patient, NonSensitivePatient} from '../types';

import patientsService from '../services/patientsService';
import { NewPatientSchema } from '../utils';

const router = express.Router();

const errorMiddleware = (error: unknown, _req:Request, res: Response, next:NextFunction) => {
	if(error instanceof z.ZodError) {
		res.status(400).send({error: error.issues});
	} else {
		next(error);
	}
};

const newPatientParser = (req: Request, _res: Response, next: NextFunction) => {
	try {
		NewPatientSchema.parse(req.body);
		next();
	} catch (error:unknown) {
		next(error);
	}
};

router.get('/:id', (req:Request, res:Response<Patient>) => {
	const id = req.params.id;
	console.log(id);
	
	res.send(patientsService.getSinglePatient(id));
});

router.get('/', (_req, res:Response<NonSensitivePatient[]>) => {
	res.send(patientsService.getNonSensitivePatients());
});

router.post('/',newPatientParser, (req:Request<unknown, unknown, NewPatient>, res:Response<Patient>) => {
	const newEntry = patientsService.addPatient(req.body);
	res.json(newEntry);
});


router.use(errorMiddleware);

export default router;