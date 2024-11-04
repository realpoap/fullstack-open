const calculateBMI = (height: number, mass:number) => {
	const cm = height / 100
	const result = mass / (cm*cm);
	console.log("🚀 ~ calculateBMI ~ result:", result)
	switch (true) {
		case (result < 16) :
			console.log('Underweight (Severe thinness)');
			return
		case (result <=16.9):
			console.log('Underweight (Moderate thinness)');
			return
		case (result <=18.4):
			console.log('Underweight (Mild thinness)');
			return
		case (result <=24.9):
			console.log('Normal range');
			return
		case (result <=29.9):
			console.log('Overweight (Pre-obese)');
			return
		case (result <=34.9):
			console.log('Obese (Class I) ');
			return
		case (result <=39.9):
			console.log('Obese (Class II)');
			return
		case ( result > 40):
			console.log('Obese (Class III)');
			return
		default:
			console.log('There has been an error');
			return
	}
	
}

calculateBMI(180,65);



