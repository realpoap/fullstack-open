import { checkNumbers } from "./utils/checkNumber";

export const calculateBMI = (height: number, mass:number) => {
	const cm = height / 100;
	const result = mass / (cm*cm);
	console.log("🚀 ~ calculateBMI ~ result:", result);
	switch (true) {
		case (result < 16) :
			return ('Underweight (Severe thinness)');
		case (result <=16.9):
			return ('Underweight (Moderate thinness)');
		case (result <=18.4):
			return ('Underweight (Mild thinness)');
		case (result <=24.9):
			return ('Normal range');
		case (result <=29.9):
			return('Overweight (Pre-obese)');
		case (result <=34.9):
			return('Obese (Class I) ');
		case (result <=39.9):
			return('Obese (Class II)');
		case ( result > 40):
			return('Obese (Class III)');
		default:
			return('There has been an error');
	}
};

// Checks if run from command line
if (require.main === module) {
	try {
		const values = checkNumbers(process.argv);
		console.log(calculateBMI(values[0],values[1]));
	} catch (err:unknown) {
		let errMessage = 'Something bad happened :';
		if (err instanceof Error) {
			errMessage += err.message;
		}
		console.log(errMessage);
	}
}

