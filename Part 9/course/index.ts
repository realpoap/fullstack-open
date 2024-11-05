import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { isNumber } from './utils/checkNumber';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
	res.send('hello Full Stack');
});

app.get('/bmi', (req, res) => {
	const query = req.query;
	let height = 0;
	let weight = 0;

	if(typeof(query.height) === 'string' && typeof(query.weight) === 'string') {
		height = parseInt(query.height);
		weight = parseInt(query.weight);
		// console.log("🚀 ~ app.get ~ height:", typeof(height))
		// console.log("🚀 ~ app.get ~ weight:", typeof(weight))
	}

	if(isNumber(height) && isNumber(weight)) {
		const bmiResult = calculateBMI(height, weight);
		const result = {
			height: height,
			weight: weight,
			bmi: bmiResult,
		};
		res.send(result);
	} else {
		const error = {
			error: "malformatted parameters"
		};
		res.send(error);
	}
});

app.post('/exercises', (req, res) => {
	console.log(req.body);
	
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const { daily_exercises, target} = req.body;
	if (!daily_exercises || !target) {
		res.status(400).send({error: `missing argument`});
		return;
	}
	if (!isNumber(target)) {
		res.status(400).send({error: 'Invalid argument : target is not a number'});
		return;
	}
	const exercises:number[] = [];
	if(Array.isArray(daily_exercises)) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		daily_exercises.filter((e:any) => {
			if(!isNumber(e)) {
				res.status(400).send({error: `Invalid argument : ${e} is not a number`});
			} else {
				// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
				exercises.push(parseInt(e));
			}
		});
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	const result = calculateExercises(parseInt(target), exercises);
	console.log("🚀 ~ app.post ~ result:", result);
	res.send(result);
});

const PORT=3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});