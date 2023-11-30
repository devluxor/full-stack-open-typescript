import data from "../data/patients";
import { Patient, NewPatientData, NonSensitivePatient} from "../types";
import { v1 as uuid } from 'uuid';

const getPatients = ():Patient[] => {
  return data;
};

const getPatientsNoSensitive = ():NonSensitivePatient[] => {
  return data.map(({id, name, dateOfBirth, gender, occupation}) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    };
  });
};

const addPatient = (patientData:NewPatientData):Patient => {
  if (!validPatientData(patientData)) {
    throw new Error('Invalid new patient data');
  }

  const patient:Patient = {...patientData, id: uuid()};
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

const getSinglePatient = (id: string): Patient | undefined => {
  return data.find(p => p.id === id);
};


export default {
  getPatients,
  getPatientsNoSensitive,
  addPatient,
  validPatientData,
  getSinglePatient
};
