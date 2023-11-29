import { valid } from "./helpers";

export default function calculateBmi(
  weightKg:number | string,
  heightCm:number | string
  ):string {
  if (!valid(heightCm) || !valid(weightKg)) {
    throw new Error('Invalid arguments');
  }

  const bmi = Number(weightKg) / ((Number(heightCm) / 100) ** 2);
  if ( bmi < 18.5 ) return "Underweight";
  else if( bmi >=18.5 && bmi <= 24.9) return "Normal(Healthy Weight)";
  else if( bmi >= 25 && bmi <= 29.9) return "Overweight";
  else return "Obese";
}

