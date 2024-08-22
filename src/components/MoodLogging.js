
import React, { useState } from 'react';
import { TextField, Button, Slider, MenuItem, Select, InputLabel, FormControl } from '@mui/material';

const MoodLogging = () => {
  const [date, setDate] = useState('');
  const [moodRating, setMoodRating] = useState(1);
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Logic to submit data to backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        InputLabelProps={{ shrink: true }}
      />
      <Slider
        value={moodRating}
        min={1}
        max={10}
        step={1}
        onChange={(e, newValue) => setMoodRating(newValue)}
        valueLabelDisplay="auto"
        aria-labelledby="mood-rating-slider"
      />
      <TextField
        label="Notes"
        multiline
        rows={4}
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <MenuItem value="Stress">Stress</MenuItem>
          <MenuItem value="Happiness">Happiness</MenuItem>
          <MenuItem value="Sadness">Sadness</MenuItem>
          <MenuItem value="Anxiety">Anxiety</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit">Save Entry</Button>
      <Button onClick={() => {/* Cancel action */}}>Cancel</Button>
    </form>
  );
};

export default MoodLogging;
