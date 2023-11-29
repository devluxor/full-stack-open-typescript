import { Response, Router } from "express";
import diagnosesService from "../services/diagnosesService";

const router = Router();

router.get('/', (_req, res:Response) => {
  res.json(diagnosesService.getDiagnoses());
});

export default router;