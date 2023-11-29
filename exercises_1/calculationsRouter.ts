import { Request, Response, Router } from "express";
import { valid } from "./helpers";
import calculateBmi from "./bmiCalculator";
import calculateExercises from "./exerciseCalculator";
const router = Router();

interface RequestBody {
  daily_exercises:number[],
  target:number
}

router.get('/bmi', (req:Request, res:Response) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (!valid(weight) || !valid(height)) {
    res.status(400).json({ error: 'malformatted arguments'});
    return;
  }

  res.json({
    weight,
    height,
    bmi: calculateBmi(weight, height)
  });
});

router.post('/exercises', (req:Request, res:Response) => {
  const body = <RequestBody>req.body;
  const dailyExercises:number[] = body.daily_exercises;
  const target:number = body.target;

  if(!target || !dailyExercises){
    res.status(400).send({ error: 'parameters missing' });
  }

  if(
    !valid(target) 
    || !Array.isArray(dailyExercises) 
    ||dailyExercises.some(n => !valid(n))
  ){
    res.status(400).send({ error: 'malformatted parameters' });
  }

  res.json(
    calculateExercises(target, ...dailyExercises)
  );
});

export default router;