import { NewPatientData, Gender } from "../types";

export default function toNewPatient(data: unknown): NewPatientData {
  if( !data || typeof data !== 'object' ) {
    throw new Error('Data missing');
  }

  if ( 
    'name' in data 
    && 'ssn' in data
    && 'gender' in data
    && 'occupation' in data
    && 'dateOfBirth' in data 
  ) {
    return {
        name: parseName(data.name),
        ssn: parseSsn(data.ssn),
        gender: parseGender(data.gender),
        occupation: parseOccupation(data.occupation),
        dateOfBirth: parseDateOfBirth(data.dateOfBirth)
    };
  }

  throw new Error('Invalid data: a field missing');
}

const parseGender = (gender: unknown): Gender => {
  if(!gender || !isString(gender) || !isGender(gender)) {
    throw new Error(`Invalid gender: ${gender}`);
  }
  return gender;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
};

const isString = (text: unknown) : text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
  if(!name || !isString(name)) {
      throw new Error('Invalid name');
  }
  return name;
};

const parseSsn = (ssn: unknown): string => {
  if(!ssn || !isString(ssn)) {
    throw new Error('Invalid ssn');
  }
  return ssn;
};

const parseOccupation = (occupation: unknown): string => {
  if(!occupation || !isString(occupation)) {
    throw new Error('Invalid occupation');
  }
  return occupation;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if(!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error(`Invalid date: ${dateOfBirth}`);
  }
  return dateOfBirth;
};

const isDate = (dateOfBirth: string): boolean => {
  return Boolean(Date.parse(dateOfBirth));
};
