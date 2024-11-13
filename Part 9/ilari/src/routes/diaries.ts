import express, {Request, Response, NextFunction} from 'express';
import diaryService from '../services/diaryService';
import { DiaryEntry, NewDiaryEntry } from '../types';
import NewEntrySchema from '../utils';
import {z} from 'zod';


const router  = express.Router();

const errorMiddleware = (error: unknown, _req: Request, res: Response, next: NextFunction) => { 
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};

const newDiaryParser = (req: Request, _res: Response, next: NextFunction) => { 
  try {
    NewEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

router.get('/', (_req, res:Response<DiaryEntry[]>) => {
	res.send(diaryService.getNonSensitiveDiariesEntries());
});

router.get('/complete', (_req, res:Response<DiaryEntry[]>) => {
  res.send(diaryService.getEntries());
});

router.post('/', newDiaryParser, (req:Request<unknown, unknown,NewDiaryEntry>, res:Response<DiaryEntry>) => {
		const addedEntry = diaryService.addDiary(req.body);
    console.log('added Entry (backend):',addedEntry);
		res.json(addedEntry);
});

router.get('/:id', (req, res) => {
	const diary = diaryService.findById(Number(req.params.id));
	if (diary) {
		res.send(diary);
	} else {
		res.sendStatus(404);
	} 
});

router.use(errorMiddleware);

export default router;