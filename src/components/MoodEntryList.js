// src/components/MoodEntryList.js
import React, { useState, useEffect } from 'react';
import { getMoodEntries, deleteMoodEntry } from '../api';

const MoodEntryList = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const data = await getMoodEntries();
      setEntries(data);
    };
    fetchEntries();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteMoodEntry(id);
      setEntries(entries.filter(entry => entry._id !== id));
    } catch (error) {
      console.error('Error deleting mood entry:', error);
    }
  };

  return (
    <div>
      <h2>Mood Entries</h2>
      <ul>
        {entries.map(entry => (
          <li key={entry._id}>
            {entry.moodRating} - {entry.notes}
            <button onClick={() => handleDelete(entry._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoodEntryList;
