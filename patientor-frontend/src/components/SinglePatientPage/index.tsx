import axios from "axios";
import { useState } from "react";
import { Patient, Gender, Diagnosis} from "../../types";
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import WorkIcon from '@mui/icons-material/Work';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Typography, Button } from "@mui/material";
import Box from '@mui/material/Box';
import patientService from "../../services/patients";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

interface Props {
  patient : Patient | null | undefined
  diagnoses: Diagnosis[]
}

// const HealthRating = (health: HealthCheckRating) => {
//     switch(health){
//         case 0:
//             return <FavoriteIcon sx={{ color: "green" }}/>;
//         case 1:
//             return <FavoriteIcon sx={{ color: "yellow" }}/>;
//         case 2:
//             return <FavoriteIcon sx={{ color: "blue" }}/>;
//         case 3:
//             return <FavoriteIcon sx={{ color: "red" }}/>;
//     }
// }

// const assertNever = (value: never): never => {
//     throw new Error(
//       `Unhandled discriminated union member: ${JSON.stringify(value)}`
//     );
//   };

// const EntryDetails = ({ entry }: { entry: Entry } ) => {
//     switch(entry.type){
//         case "HealthCheck": 
//             return (
//                 <div>
//                     {HealthRating(entry.healthCheckRating)}
//                 </div>
//             );
//         case "Hospital":
//             return (
//                 <div>
//                     <p>Discharge date: {entry.discharge.date}</p>
//                     <ul>
//                        <li>criteria: <i>{entry.discharge.criteria}</i></li> 
//                     </ul>
                    
//                 </div>
//             );
//         case "OccupationalHealthcare":
//             return (
//                 <div>
//                     {entry.sickLeave? 
//                       <p>SICK LEAVE: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}</p>
//                        : null
//                     }
//                 </div>
//             );
//         default:
//             return assertNever(entry);
//     }
// }

const SinglePatientPage = ({ patient, diagnoses }: Props) => {

    // const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>();
    
    // const openModal = (): void => setModalOpen(true);

    // const closeModal = (): void => {
    //     setModalOpen(false);
    //     setError(undefined);
    //   };
  
    // const submitNewEntry = async (values: EntryWithoutId) => {
    //     try {
    //         if(patient){
    //             const entry = await patientService.addEntry(patient.id, values);
    //             patient = {...patient, entries: patient.entries.concat(entry)};
    //             setModalOpen(false);
    //         }
    //     } catch (e: unknown) {
    //     if (axios.isAxiosError(e)) {
    //       if (e?.response?.data && typeof e?.response?.data === "string") {
    //         const message = e.response.data.replace('Something went wrong. Error: ', '');
    //         console.error(message);
    //         setError(message);
    //       } else {
    //         setError("Unrecognized axios error");
    //       }
    //     } else {
    //       console.error("Unknown error", e);
    //       setError("Unknown error");
    //     }
    //   }
    // };
  console.log(patient)
   return(
    <div>
       <Typography
        style={{marginTop: 30}}
        component="h5" 
        variant="h5">
          {patient?.name} {genderId(patient?.gender)}
       </Typography>
       <p>ssn: {patient?.ssn}</p>
       <p>occupation: {patient?.occupation}</p>
    </div>
   )
}

const genderId = (gender: Gender | undefined ) => {
  switch(gender){
    case "female":
      return <FemaleIcon />;
    case "male":
      return <MaleIcon/>;
    default:
      return null;
  }
};

export default SinglePatientPage;