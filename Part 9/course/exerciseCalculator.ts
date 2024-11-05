import { checkNumbers } from "./utils/checkNumber";

interface Result { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

export const calculateExercises = (target:number, exercise:number[]):Result => {
	// console.log("🚀 ~ exercise:", exercise);
	// console.log("🚀 ~ daily hours target:", target);
	let sum = 0;
	const success = exercise.includes(0) ? false : true;
	exercise.map(e => {
		sum+=e;
	});
	const avg = sum/exercise.length;
	let rating = 0;
	let ratingDescription = '';
	if (avg >= target && success) {rating=3; ratingDescription='Way to go ! You did an excellent job and a perfect streak !';} else
	if (avg >= target && !success) {rating=2; ratingDescription='Nearly there ! Let\'s try and do a perfect streak next week !';} else
	if (avg < target) {rating=2; ratingDescription='Keep up the good work, you did great!';} else
	if (avg < target/0.5 && !success) {rating=1; ratingDescription='It can be overwhelming but you\'ll get there! Stay strong !';} 

	return {
		periodLength : exercise.length,
		trainingDays : exercise.filter(e => e>0).length,
		success: success,
		rating: rating,
		ratingDescription: ratingDescription,
		target: target,
		average: avg
	};
	
};

if(require.main === module) {
	try {
		console.log('Please enter a target value and following days');
		const week = checkNumbers(process.argv);
		console.log(calculateExercises(week[0],week.slice(1)));
	} catch (error) {
		let errMessage = 'Something bad happened :';
		if (error instanceof Error) {
			errMessage += error.message;
		}
		console.log(errMessage);
	}
}