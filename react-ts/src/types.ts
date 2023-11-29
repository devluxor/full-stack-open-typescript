export interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

export interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

export interface CoursePartEssential extends CoursePartBase{
  description: string
}

export interface CoursePartBasic extends CoursePartEssential {
  kind: "basic"
}

export interface CoursePartBackground extends CoursePartEssential {
  backgroundMaterial: string;
  kind: "background"
}

export interface CoursePartSpecial extends CoursePartEssential {
  kind: "special";
  requirements: string[]
}

export type CoursePart = 
  CoursePartBasic | 
  CoursePartGroup | 
  CoursePartBackground | 
  CoursePartSpecial;

