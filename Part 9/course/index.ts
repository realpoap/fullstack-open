import express, {Request, Response} from 'express';
import { calculateBMI } from './bmiCalculator';
import { isNumber } from './utils/checkNumber';

const app = express();

app.get('/hello', (_req, res) => {
	res.send('hello Full Stack');
});

app.get('/bmi', (req: Request, _res: Response) => {
	const query = req.query
	let height = 0
	let weight = 0

	if(typeof(query.height) === 'string' && typeof(query.weight) === 'string') {
		height = parseInt(query.height);
		weight = parseInt(query.weight);
		// console.log("🚀 ~ app.get ~ height:", typeof(height))
		// console.log("🚀 ~ app.get ~ weight:", typeof(weight))
	}

	if(isNumber(height) && isNumber(weight)) {
		const bmiResult = calculateBMI(height, weight)
		const result = {
			height: height,
			weight: weight,
			bmi: bmiResult,
		}
		console.log(result)
	} else {
		const error = {
			error: "malformatted parameters"
		}
		console.log(error); 
	}
});

const PORT=3003;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});