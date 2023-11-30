import { DiaryEntry } from "../types/diaryEntry"
import Entry from "./Entry"

const EntryList = ({entries}:{entries: DiaryEntry[]} ) => {
  return (
    <div>
      <h1>Diary Entries</h1>
      {entries.map(entry => <Entry key={entry.id} entry={entry} />)}
    </div>
  )
}

export default EntryList