import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../types/diaryEntry';

const baseUrl = 'http://localhost:3000/api/diaries'

export const getEntries = async () => {
  const response = await axios.get<DiaryEntry[]>(baseUrl)
  return response.data
}

export const addEntry = async (object: NewDiaryEntry) => {
  const response = await axios.post<DiaryEntry>(baseUrl, object)
  return response.data
}

export default {
  getEntries,
  addEntry
}