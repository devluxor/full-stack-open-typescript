import { Router } from "express";
import patientsService from "../services/patientsService";
import toNewPatient from "../utils/toNewPatient";
import { Patient } from "../types";

const router = Router();

router.get('/', (_req, res) => {
  res.json(patientsService.getPatients());
});

router.post('/', (req, res) => {
  try{
    const patientData = toNewPatient(req.body);
    const addedPatient = patientsService.addPatient(patientData);
    res.json(addedPatient);
  }catch(error: unknown){
    let message = 'Patient could not be added. ';
    if(error instanceof Error) message += `Error: ${error.message}`;

    res.status(400).send(message);
  }
});

router.get('/:id', (req, res) => {
  const patient:Patient | undefined = patientsService.getSinglePatient(req.params.id);
  console.log(patient)
  if (!patient) {
    res.status(404).send('Patient not found');
    return;
  }

  res.json(patient);
});

export default router;