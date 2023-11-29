import { Request, Response, Router } from "express";
import patientsService from "../services/patientsService";
import toNewPatient from "../utils/toNewPatient";

const router = Router();

router.get('/', (_req, res:Response) => {
  res.json(patientsService.getPatients());
});

router.post('/', (req:Request, res:Response) => {
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

export default router;