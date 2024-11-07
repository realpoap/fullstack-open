import express, {Response} from 'express';
import diaryService from '../services/diaryService';
import { DiaryEntry } from '../types';

const router  = express.Router();

router.get('/', (_req, res:Response<DiaryEntry[]>) => {
	res.send(diaryService.getNonSensitiveDiariesEntries());
});

router.post('/', (_req, res) => {
	res.send('posting a diary');
});

export default router;