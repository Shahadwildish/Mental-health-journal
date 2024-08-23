// src/pages/CreateMoodEntry.js

import React, { useState, useContext } from 'react';
import { TextField, Button, Slider, MenuItem, Select, InputLabel, FormControl, Container, Typography, Alert } from '@mui/material';
import { createMoodEntry } from '../api';
import { useAuth } from '../contexts/AuthContext'; 

const CreateMoodEntry = () => {
  const [date, setDate] = useState('');
  const [moodRating, setMoodRating] = useState(1);
  const [notes, setNotes] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const { user, isAuthenticated, login, logout } = useAuth(); // Access the authenticated user from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('User not authenticated');
      return;
    }
    
    try {
      const entry = {
        date,
        moodRating,
        notes,
        category,
        userId: user.userId // Include the authenticated user ID
      };
      await createMoodEntry(entry);
      setSuccess('Mood entry created successfully!');
      setDate('');
      setMoodRating(1);
      setNotes('');
      setCategory('');
    } catch (error) {
      console.error('Error creating mood entry:', error);
      setError('Failed to create mood entry.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Create Mood Entry
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
          margin="normal"
          required
        />
        <Slider
          value={moodRating}
          min={1}
          max={10}
          step={1}
          onChange={(e, newValue) => setMoodRating(newValue)}
          valueLabelDisplay="auto"
          aria-labelledby="mood-rating-slider"
          fullWidth
          margin="normal"
        />
        <TextField
          label="Notes"
          multiline
          rows={4}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          fullWidth
          margin="normal"
        />
        <FormControl fullWidth margin="normal">
          <InputLabel>Category</InputLabel>
          <Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <MenuItem value="Stress">Stress</MenuItem>
            <MenuItem value="Happiness">Happiness</MenuItem>
            <MenuItem value="Sadness">Sadness</MenuItem>
            <MenuItem value="Anxiety">Anxiety</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save Entry
        </Button>
      </form>
    </Container>
  );
};

export default CreateMoodEntry;
