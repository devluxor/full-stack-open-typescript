import { CoursePart } from "./types";
import { courseName, courseParts } from "./courseData";

const App = () => {
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName}/>
      <Content parts={courseParts} />
      <Total totalExercises={totalExercises}/>
    </div>
  );
};

const Header = ({name}:{name:string}) => {
  return <h1>{name}</h1>
}

const Content = ({parts}:{parts:CoursePart[]}) => {
  return (
    parts.map(part => <Part key={part.name} part={part}/>)
  )
}

const Part = ({part}:{part:CoursePart}) => {
  return (
    <div>
      <h3>{part.name} {part.exerciseCount}</h3>
      <SubPart part={part} />
    </div>
  )
}

const SubPart = ({part}:{part:CoursePart}) => {
  let subPart;
  switch (part.kind){
    case "basic":
      subPart = <p><i>{part.description}</i></p>;
      break;
    case "group":
      subPart = <p>project exercise {part.groupProjectCount}</p> ;
      break;
    case "background":
      subPart = (
        <>
          <p><i>{part.description}</i></p>
          <p>submit to {part.backgroundMaterial}</p>
        </>
      );
      break;
    case "special":
      subPart = (
        <>
          <p><i>{part.description}</i></p>
          <p>required skills: {part.requirements.join(", ")}</p>
        </>
      )
      break;
    }
  
  return subPart
}

const Total = ({totalExercises}:{totalExercises:number}) => {
  return <p>Number of exercises {totalExercises}</p>
}

export default App;