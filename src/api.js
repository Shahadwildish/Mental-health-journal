// src/api.js
const API_URL = 'http://localhost:5000/api';

// Mood Entries
export const createMoodEntry = async (entry) => {
  const response = await fetch(`${API_URL}/mood_entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
  return response.json();
};

export const getMoodEntries = async () => {
  const response = await fetch(`${API_URL}/mood_entries`);
  return response.json();
};

export const updateMoodEntry = async (id, entry) => {
  const response = await fetch(`${API_URL}/mood_entries/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(entry),
  });
  return response.json();
};

export const deleteMoodEntry = async (id) => {
  const response = await fetch(`${API_URL}/mood_entries/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

// Reflections
export const createReflection = async (reflection) => {
  const response = await fetch(`${API_URL}/reflections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reflection),
  });
  return response.json();
};

export const getReflections = async () => {
  const response = await fetch(`${API_URL}/reflections`);
  return response.json();
};

export const updateReflection = async (id, reflection) => {
  const response = await fetch(`${API_URL}/reflections/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reflection),
  });
  return response.json();
};

export const deleteReflection = async (id) => {
  const response = await fetch(`${API_URL}/reflections/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};
