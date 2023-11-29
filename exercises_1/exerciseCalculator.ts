import { valid } from "./helpers";

interface Result {
  periodLength:number,
  trainingDays:number,
  target:number,
  average:number,
  success:boolean,
  rating:number,
  ratingDescription:string
}

export default function calculateExercises(target:number, ...exerciseHours:number[]):Result {
  if (
    !valid(target) 
    || exerciseHours.length < 1
    || exerciseHours.some(n => !valid(n))
  ) {
    throw new Error('Invalid arguments');
  }

  return { 
    periodLength: exerciseHours.length,
    trainingDays: exerciseHours.filter(t => t > 0).length,
    success: !!(Math.random() < 0.5),
    rating: Math.floor(Math.random() * 3),
    ratingDescription: 'not too bad but could be better',
    target,
    average: exerciseHours.reduce((p, c) => p + c) / exerciseHours.length
  };
}

