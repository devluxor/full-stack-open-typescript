import data from "../data/patients";
import { Patient, NewPatientData } from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = ():Omit<Patient, 'ssn'>[] => {
  return data.map(patient => {
    return {
      id: patient.id,
      name: patient.name,
      dateOfBirth: patient.dateOfBirth,
      gender: patient.gender,
      occupation: patient.occupation
    };
  });
};

const addPatient = (patientData:NewPatientData):Patient => {
  if (!validPatientData(patientData)) {
    throw new Error('Invalid new patient data');
  }

  const patient:Patient = {...patientData, id: uuid() as string};
  data.push(patient);
  return patient;
};

const validPatientData = (patientData:unknown):patientData is NewPatientData => {
  return (
    typeof patientData === 'object'
    && typeof (patientData as NewPatientData).name === 'string'
    && typeof (patientData as NewPatientData).gender === 'string'
    && typeof (patientData as NewPatientData).occupation === 'string'
    && typeof (patientData as NewPatientData).dateOfBirth === 'string'
  );
};

export default {
  getPatients,
  addPatient,
  validPatientData
};
