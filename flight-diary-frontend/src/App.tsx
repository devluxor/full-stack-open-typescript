import { useState, useEffect } from 'react'
import diaryService from './services/diaryService'
import './App.css'
import EntryList from './components/EntryList'
import AddEntry from './components/AddEntry'
import Error from './components/Error'
import { DiaryEntry, NewDiaryEntry } from './types/diaryEntry'

const App = () => {
  const [entries, setEntries] = useState<DiaryEntry[]>([])
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    diaryService.getEntries()
      .then(entries => setEntries(entries))
  }, [])

  const creationHandler = async (entry:NewDiaryEntry) => {
    try {
      const newEntry:DiaryEntry = await diaryService.addEntry(entry)
      setEntries(entries.concat(newEntry))
      return newEntry
    } catch (error:unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error && 'message' in error) {
        errorMessage += ` Error: ${error.message}`;
      }
      setError(errorMessage)
      setTimeout(() => setError(null), 4000)
      return null
    }
  }

  return (
    <>
      <h1>Ilari's Flight Diary</h1>
      <Error error={error}/>
      <EntryList entries={entries} />
      <AddEntry creationHandler={creationHandler}/>
    </>
  )
}

export default App
