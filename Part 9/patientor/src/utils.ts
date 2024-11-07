import { Gender, NewPatient } from "./types";

// TYPE-GUARDS
const isString = (text: unknown):text is string => {
	return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string):boolean => {
	return Boolean(Date.parse(date));
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

// PARSERS
const parseString = (text: unknown):string => {
	if(!isString(text)) {
		throw new Error(`Incorrect or missing argument: ${text}`);
	}
	return text;
};

const parseDate = (date: unknown):string => {
	if(!isString(date) || !isDate(date)) {
		throw new Error(`Incorrect or missing date: ${date}`);
	}
	return date;
};

const parseSsn = (ssn: unknown):string => {
	const re = new RegExp('[0-9]+-[A-Za-z0-9]+');
	if(!isString(ssn) || !re.test(ssn)){
		throw new Error(`Incorrect or missing ssn: ${ssn}`);
	}
	return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const toNewPatient = (object:unknown):NewPatient => {
	if(!object || typeof object !== 'object') {
      throw new Error(`Incorrect or missing data`);
	}
	if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
		const newEntry = {
			name:parseString(object.name),
			dateOfBirth:parseDate(object.dateOfBirth),
			ssn:parseSsn(object.ssn),
			gender:parseGender(object.gender),
			occupation:parseString(object.occupation),
		};
		return newEntry;
	}
	throw new Error(`Incorrect data: some fields are missing`);
	
};

export default toNewPatient;