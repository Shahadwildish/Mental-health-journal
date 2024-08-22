// src/components/MoodEntryForm.js
import React, { useState } from 'react';
import { createMoodEntry } from '../api';

const MoodEntryForm = () => {
  const [entry, setEntry] = useState({ moodRating: '', notes: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEntry(prevEntry => ({ ...prevEntry, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createMoodEntry(entry);
      alert('Mood entry created!');
      setEntry({ moodRating: '', notes: '' }); // Clear form after submission
    } catch (error) {
      console.error('Error creating mood entry:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        name="moodRating"
        value={entry.moodRating}
        onChange={handleChange}
        placeholder="Mood Rating"
        required
      />
      <textarea
        name="notes"
        value={entry.notes}
        onChange={handleChange}
        placeholder="Notes"
        required
      />
      <button type="submit">Add Mood Entry</button>
    </form>
  );
};

export default MoodEntryForm;
