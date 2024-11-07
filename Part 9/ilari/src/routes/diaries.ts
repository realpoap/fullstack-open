import express, {Response} from 'express';
import diaryService from '../services/diaryService';
import { DiaryEntry } from '../types';
import toNewDiaryEntry from '../utils';

const router  = express.Router();

router.get('/', (_req, res:Response<DiaryEntry[]>) => {
	res.send(diaryService.getNonSensitiveDiariesEntries());
});

router.post('/', (req, res) => {
	try {
		const newDiaryEntry = toNewDiaryEntry(req.body);
		const addedEntry = diaryService.addDiary(newDiaryEntry);
		res.json(addedEntry);
	} catch (err:unknown) {
		let errorMessage = 'Something went wrong. ';
		if (err instanceof Error) {
			errorMessage += `Error: ${err.message}`;
		}
		res.status(400).send(errorMessage);
	}
});

router.get('/:id', (req, res) => {
	const diary = diaryService.findById(Number(req.params.id));
	if (diary) {
		res.send(diary);
	} else {
		res.sendStatus(404);
	} 
});

export default router;