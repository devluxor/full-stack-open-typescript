import { DiaryEntry } from "../types/diaryEntry"

const Entry = ({entry}:{entry:DiaryEntry}) => {
  return (
    <div key={entry.id}>
      <h3 >{entry.date}</h3>
      <p>visibility: {entry.visibility}</p>
      <p>weather: {entry.weather}</p>
    </div>
  )
}

export default Entry