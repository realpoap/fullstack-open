export const checkNumbers = (args:string[]):number[] => {
	const parsedNumbers:number[] = []

	args.slice(2).map(n => {
		if(!isNaN(Number(n))) {
			
			parsedNumbers.push(Number(n))
			// console.log("🚀 ~ args.slice ~ parsedNumbers:", parsedNumbers)
			
		} else {
			throw new Error('You need to provide numbers')
	}
	})
	return parsedNumbers
}


export const isNumber = (argument: any):boolean => !isNaN(Number(argument))
