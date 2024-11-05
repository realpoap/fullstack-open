import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { isNumber } from './utils/checkNumber';

const app = express();

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

const PORT=3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});