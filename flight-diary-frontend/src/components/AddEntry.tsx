import React from "react"
import { TextField, InputLabel, Grid, Button, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio } from "@mui/material";
import { useState } from "react";
import { NewDiaryEntry, Visibility, Weather, DiaryEntry } from "../types/diaryEntry";
import { RadioInput } from "../types/helperTypes";

const AddEntry = (
    {creationHandler}:{creationHandler:(entry: NewDiaryEntry) => Promise< DiaryEntry | null>}
  ) => {
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))
  const [weather, setWeather] = useState(Weather.Sunny);
  const [visibility, setVisiblity] = useState(Visibility.Good);
  const [comment, setComment] = useState('');

  const createEntry = async (event:React.SyntheticEvent) => {
    event.preventDefault()
    
    const success = await creationHandler({
      date,
      weather,
      visibility,
      comment
    }) 

    if (success) {
      setDate(new Date().toISOString().slice(0,10))
      setComment('')
    }
  }

  const weatherOptions =():{value: Weather, label: string}[] => {
    return Object.values(Weather).map(o => { 
      return {value: o, label: o.toString()}
    })
  }

  const visibilityOptions =():{value: Visibility, label: string}[] => {
    return Object.values(Visibility).map(o => { 
      return {value: o, label: o.toString()}
    })
  }

  const onRadioChange = (event:React.SyntheticEvent) => {
    const input = event.target as RadioInput
    switch(input.name) {
      case 'Weather':
        setWeather(input.value as Weather)
        break;
      case 'Visibility':
        setVisiblity(input.value as Visibility)
        break;
    }
  }

  return (
    <div>
      <h1>Add an Entry</h1>
      <form onSubmit={createEntry}>
        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <TextField 
          type='date'
          fullWidth
          value={date}
          onChange= {({target}) => setDate(target.value)}
        />

        <div>
          <FormControl>
            <FormLabel 
              id="demo-controlled-radio-buttons-group"
              style={{ marginTop: 20 }}
            >
              Weather
            </FormLabel>
            <RadioGroup
              row
              name="Weather"
              value={weather}
              onChange={(event) => onRadioChange(event)}
            >
            {weatherOptions().map(option => 
              <FormControlLabel
                key={option.label}
                value={option.value}
                control={<Radio />}
                label={option.value}
              />
            )}
            </RadioGroup>
          </FormControl>
        </div>

        <FormControl>
          <FormLabel 
            id="demo-controlled-radio-buttons-group"
            style={{ marginTop: 20 }}
          >
          Visibility
          </FormLabel>
          
          <RadioGroup
            name="Visibility"
            row
            value={visibility}
            onChange={(event) => onRadioChange(event)}
          >
          {visibilityOptions().map(option => 
            <FormControlLabel
              key={option.label}
              value={option.value}
              control={<Radio />}
              label={option.value}
            />
          )}
          </RadioGroup>
        </FormControl>
        
        <TextField 
          style={{ marginTop: 20 }}
          label='Comment'
          fullWidth
          value={comment}
          onChange={({target}) => setComment(target.value)}
        />

        <Grid>
          <Grid item>
            <Button
              style={{ marginTop: 25 }}
              color='primary'
              type='submit'
              fullWidth
              variant='contained'
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

export default AddEntry