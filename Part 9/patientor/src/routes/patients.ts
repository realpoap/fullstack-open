import express, {Response} from 'express';
import { Patient } from '../types';

import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res:Response<Patient[]>) => {
	res.send(patientsService.getNonSensitivePatients());
});

export default router;