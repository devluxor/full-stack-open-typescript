// import axios from 'axios';
// import { useState } from 'react';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
// import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Typography } from '@mui/material';
import { Box } from '@mui/material';
// import { BoxProps } from '@mui/material';
// import { useTheme } from '@mui/material';
// import patientService from '../../services/patients';
// import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import { 
  Patient, 
  Gender, 
  Diagnosis, 
  Entry,
  Discharge,
  SickLeave
} from '../../types';

interface Props {
  patient : Patient | null | undefined
  diagnoses: Diagnosis[]
}

const SinglePatientPage = ({ patient, diagnoses }: Props) => {
  if (!patient) return;

  return(
    <div>
      <Typography
       style={{marginTop: 30}}
       component='h5' 
       variant='h5'>
         {patient.name} {genderId(patient.gender)}
      </Typography>
      <p>SSN: {patient.ssn}</p>
      <p>Occupation: {patient.occupation}</p>
      <EntryList entries={patient.entries} diagnoses={diagnoses}/>
    </div>
  );
};

const genderId = (gender: Gender ) => {
  switch(gender){
    case 'female': return <FemaleIcon />;
    case 'male': return <MaleIcon/>; 
  }
};

const EntryList = (
    {entries, diagnoses}:{entries:Entry[] | undefined, diagnoses:Diagnosis[]}
  ) => {
  const header = (
    <Typography
    style={{marginTop: 30}}
    component='h6' 
    variant='h6'>
      Entries
   </Typography>
  );

  if (!entries || entries.length === 0) return header;

  return (
    <div>
      {header}
      {entries.map(e => <EntryComponent key={e.id} entry={e} diagnoses={diagnoses}/>)}
    </div>
  );
};

const EntryComponent = ({entry, diagnoses}:{entry:Entry, diagnoses:Diagnosis[]}) => {
  return (
    <div>
      <Box sx={{ border: '1px solid grey', borderRadius: 4, padding: 2, margin: 1  }} >
        <p>{entry.date} <i>{entry.description}</i></p>
        <DiagnosesCodes codes={entry?.diagnosisCodes} diagnoses={diagnoses}/>
        <p>diagnose by {entry.specialist}</p>
        <EntryDetails entry={entry} />
      </Box>
    </div>
  );
};

const DiagnosesCodes = ({codes, diagnoses}:{codes: string[] | undefined, diagnoses:Diagnosis[]}) => {
  if (!codes) return;

  const mappedCodes = codes.map(code => diagnoses.find(d => d.code === code));

  return (
    <ul>
      {mappedCodes.map(code => <li key={code?.code}>{code?.code} {code?.name}</li> )}
    </ul>
  );
};


const EntryDetails = ({ entry }: { entry: Entry } ) => { 
  switch(entry.type) {
  case 'HealthCheck': 
    return <HealthCheckEntryComponent health={entry.healthCheckRating}/>;
  case 'Hospital':
    return <HospitalEntryComponent discharge={entry.discharge} />;
  case 'OccupationalHealthcare':
    return <OccupationalHealthcareEntryComponent sickLeave={entry.sickLeave}/>;
  default:
    const value:never = entry;
    throw new Error(
      `Error handling Entry Type Discriminant Property: ${JSON.stringify(value)}`
    );
  }
};

const HealthCheckEntryComponent = ({health}:{health:number}) => {
  switch(health){
    case 0: return <FavoriteIcon sx={{color: 'green' }}/>;
    case 1: return <FavoriteIcon sx={{color: 'yellow' }}/>;
    case 2: return <FavoriteIcon sx={{color: 'blue' }}/>;
    case 3: return <FavoriteIcon sx={{color: 'red' }}/>;
  }
};

const HospitalEntryComponent = ({discharge}:{discharge:Discharge}) => {
  return <p>Discharge date: {discharge.date} <i>{discharge.criteria}</i></p>;
};

const OccupationalHealthcareEntryComponent = (
  {sickLeave}:{sickLeave:SickLeave | undefined}
) => {
  if (!sickLeave) return;

  return <p>Sick leave: {sickLeave.startDate} - {sickLeave.endDate}</p>;
};


export default SinglePatientPage;