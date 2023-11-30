export interface Entry {

}

export interface Diagnosis {
  code: string,
  name: string,
  latin?: string
}

export interface Patient {
  id:string,
  name:string,
  dateOfBirth:string,
  ssn:string,
  gender:string,
  occupation:string,
  entries?:Entry[]
}

export enum Gender {
  Male = 'male',
  Female = 'female'

}

export type NewPatientData = Omit<Patient, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;