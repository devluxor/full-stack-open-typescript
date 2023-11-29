import { Request, Response } from "express";
import calculateBmi from "./bmiCalculator";
import { valid } from "./helpers";

export default (req:Request, res:Response):void => {
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
};
